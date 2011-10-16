/**
 * Copyright (c) 2011 Nick Tackes, Travis Barajas and Michael Gai
 *
 * Permission is not granted, without the express consent of Nick Tackes, Travis Barajas and Michael Gai, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software, including the rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
 * copies of the Software.
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 *
 */
Argon.Binder = {
    //returns an array of items to be bound
    collectBindings: function(config, customConfig, viewModel) {
        //first, look for conventional name binding.
        var adapterName = Argon.toPascalCase(config.xtype) + 'BindingAdapter';
        var bindingAdapter = Argon.UI[adapterName];
        if (bindingAdapter == null) {
            throw 'no binding adapter for ' + config.xtype;
        }
        Ti.API.info('GOT binding adapter called ' + adapterName + ' with value ' + bindingAdapter + (config.name ? ' for config.name ' + config.name : ''));

        if (config.name != null) {
            //automatically find the best default property to bind to when binding by name
            if (bindingAdapter.isCommandOriented == true) {
                //do nothing here...
            } else if (bindingAdapter.byNameProperty) {
                config[bindingAdapter.byNameProperty] = '${' + config.name + '}';
            }
        }

        //convert all bindings
        var bindings = [];
        for (var propName in config) {
            if (config.hasOwnProperty(propName)) {
                var value = config[propName];
                if (!Argon.isString(value)) {
                    continue;
                }
                if (value.indexOf('${') == -1) {
                    continue;
                }

                // TODO: convert to regexp
                // locate all occurances of model properties in the binding
                var replacedValue = value;
                var sp = value.split('${');
                for (var i = 0; i < sp.length; i++) {
                    if (sp[i].indexOf('}') == -1) {
                        sp.splice(i, 1);
                        i--;
                    }
                    else {
                        sp[i] = sp[i].substr(0, sp[i].indexOf('}'));
                        if(Ext.isObject(viewModel[sp[i]])){
                         replacedValue = viewModel[sp[i]];
                        }
                        else{
                        replacedValue = replacedValue.replace('${'+ sp[i] + '}', viewModel[sp[i]]);
                        }
                    }
                }
                customConfig[propName + '_replacementVariables'] = sp;
                // TODO:
                // hack: place the bindContext name in customConfig if its a store.  needed to assist with setValue when more than one modelPropName is a part of a computed value
                if (viewModel.storeId)
                    customConfig['_storeName'] = viewModel.storeId;

                var binding = {
                    controlPropName: propName,
                    modelPropName: sp,
                    buffer: (isNaN(config['buffer']) ? 0 : config['buffer'])
                };

                bindings.push(binding);

                var adapterBindings = bindingAdapter[binding.controlPropName + 'Bindings'];
                //make substitution:
                config[binding.controlPropName] = replacedValue;
            }
        }
        return bindings;
    },
    //now actually walk through created objects and apply the bindings
    applyBindings: function(config, viewModel, bindings, control) {

        var bindingAdapter = Argon.UI[Argon.toPascalCase(config.xtype) + 'BindingAdapter'];
        if (bindingAdapter == null) {
            throw 'no binding adapter for ' + config.xtype;
        }
        //bind command...
        if (bindingAdapter.isCommandOriented == true && config.name != null) {
            //bind to command on vm. Walk up vm parent structure as needed
            var foundVM, cmd, parent = viewModel;
            var level = 0;
            do {
                foundVM = parent;
                cmd = foundVM[config.name];
                parent = foundVM.parentVM;
                if (cmd != null) {

                    Ti.API.info('FOUND command ' + config.name + ' at ' + level + ' up ');
                }
                level++;
            } while (cmd == null && parent != null);
            if (cmd != null) {
                control.addListener('click',function(e) {
                    if(control.name){
                        var mdl = this[control.name];
                        if(mdl){
                            mdl.apply(this);
                        }
                    }
                }, foundVM);
            } else {
                Ti.API.info('NOT FOUND command ' + config.name);
            }
        }

        for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            var adapterBindings = bindingAdapter[binding.controlPropName + 'Bindings'];
            //from model -> control

            if (viewModel._on != null) {//only listen to model when model is observable
                for (var x = 0; x < binding.modelPropName.length; x++) {
                    var modelEventName = binding.modelPropName[x] + 'Changed';
                    Ti.API.debug('binding model event name of ' + modelEventName);
                    // use the bindingAdapter level setValue to bind to the control.  Since we are binding to the control
                    // need to to use a single override that has the logic to dispatch based on the binding controlPropName.
                    var valueSetter = bindingAdapter.setValue;
                    var internalSetter;
                    if (valueSetter == null) { //default to the form 'control.setFoo(value)', where foo is the name
                        internalSetter = control['set' + Argon.toPascalCase(binding.controlPropName)];
                        Ti.API.info('using default setter of set' + Argon.toPascalCase(binding.controlPropName) + ':' + internalSetter);
                        valueSetter = function(value) {
                            control['set'+Argon.toPascalCase(binding.controlPropName)](value);
//                            internalSetter(value);
                        };
                    }

                    var applyOnlyIfNecessary = function(value, oldValue, options) {

                        Ti.API.debug('Received changed value of ' + JSON.stringify(value));
                        if (control[binding.controlPropName] == value && !binding.isComputedOutput) {
                            return;
                        }
                        // a bit risky if the value setter is the control's internal setter since it will take only a single param and we
                        // may be invoking overloaded methods inadvertantly, therefore, we will ensure that the internal setter only
                        // receives the value property.
                        if (internalSetter) {
                            valueSetter(value);
                        }
                        else {
                            valueSetter(value, oldValue, options, control);
                        }
                    };
                    Ti.API.info('LISTENING on viewmodel property ' + modelEventName);
                    viewModel._on(modelEventName, applyOnlyIfNecessary, viewModel);//, binding['buffer']);
                }
            }
            // control is now built and all bindings are applied.
            // invoke an onInit handler defined in the binding to allow for any additional initialization after bind has occurred.
            if (adapterBindings && adapterBindings.onInit) {
                adapterBindings.onInit.call(viewModel, binding, control);
            }
            //now from control -> model
            //unlike other way, we don't just try to add eventListener unless specified, because that could be fatal...
            if (adapterBindings == null || adapterBindings.suppressViewModelUpdate) {
                continue;
            }
            // bind back if there is a single modelPropName.  would be illogical for a binding with multiple prop names
            if (binding.modelPropName.length == 1) {
                var modelSetter = viewModel['set' + Argon.toPascalCase(binding.modelPropName[0])];
                Ti.API.info('LISTENING on control property ' + adapterBindings.eventName);
                control.addListener(adapterBindings.eventName,function(e) {
                    Ti.API.info('Control reports event ' + adapterBindings.eventName + ' of ' + JSON.stringify(e));
                    var adaptedValue = adapterBindings.eventConverter(e);
                    Ti.API.info('Control reports value of ' + adapterBindings.eventName + ' changed to ' + JSON.stringify(adaptedValue));
                    modelSetter.call(this, adaptedValue);
                }, viewModel);
            }

        }
    },
    // within a custom config structure, search for the corresponding control property bound to a model property.
    // the rule is that only a single control property can be bound to a given model property within the same control.
    findControlProperty: function(modelPropName, customConfig) {
        if (customConfig) {
            for (var prop in customConfig) {
                if (customConfig.hasOwnProperty(prop)) {
                    if (customConfig[prop] == '${'+ modelPropName + '}') {
                        return prop;
                    }
                }
            }
        }
        return null;
    }
};



