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
Argon.UI = {
	_registry: {},
    _customProps: {},
	reg : function (xtype, cls) { //convert into a factory
		this._registry[xtype]= function(config) {
			return new cls(config);
		};
	},
	regFactory: function(xtype,factory) {
		this._registry[xtype]=factory;
	},
    regCustomProps: function(xtype, props){
        this._customProps[xtype] = props;
    },
    // TODO: temporary.  Instead of calling Titanium.UI.createXYZ methods to construct controls (as we often do in handlers such as listview expand/collapse
    // call into Argon.UI.  eventually, this will be folded into the create function below, but in the meantime, it gives us the ability to manage the controls
    // created, i.e. control pools.
    createControl: function(xtype, config){
        var factory = this._registry[xtype];
        if(!factory){
            throw 'A control factory for ' + xtype + ' does not exist';
        }
        var component = factory(config);
        var ctrlId = config.id || Argon.guid();
        var customConfig = {id: ctrlId,xtype: xtype, items:[]};
        component.customConfig = customConfig;
        Argon.ComponentManager.put(component);

        return component;
    },
	//create recursively, parent first/down
	create: function(config, root, viewModel, suppressContainerAttachment) {
		//Ti.API.debug('creating component: ' + JSON.stringify(config));
		if (config.xtype == null){return config;} //can't do anything without an xtype so just return object
        // construct a custom config object that contains any binding information or any properties designated
        // as custom and therefore, deleted from config prior to building the titanium object
        config.id = config.id || Argon.guid();

        // look for a containerId.  if one is provided, then report to the ComponentManager that this control is attached
        // to this container.  this will allow for the container to be aware of its children so that upon removal, all children
        // get unregistered.  equally important, it allows for an event at a low level control to bubble up to a dispatcher attached to
        // a container somewhere up the chain.
        var containerId = config.containerId;
        delete config.containerId;
        var customConfig = {id: config.id, containerId: containerId, xtype: config.xtype, items:[]};
        // add in any properties that are used for purposes of model binding.  this will allow for
        // lookup of these properties during the setValue dispatching by the custom binding configuration if any exists
        // for a specific control type.
        for(var prop in config){
            if(config.hasOwnProperty(prop)){
                if(config[prop] && Argon.isString(config[prop]) && config[prop].indexOf('${')>-1){
                    customConfig[prop] = config[prop];//
                }
                if(prop == 'ref'){
                    customConfig[prop] = config[prop];//
                }
            }
        }

		if (config.bindContext!=null) {
			var newConfig = Argon.apply({},config);
			delete newConfig.bindContext;
            var newVm = viewModel[config.bindContext];
			return this.create(newConfig,root,newVm);
		}
		var factory = this._registry[config.xtype];

		//TODO: step through config to find ${} pattern
		//to use as bindings. Save as bindings property...

//		var listeners = config.listeners;
//		delete config.listeners; //bad news if it's in there as it conflicts with a private variable and crashes strangely'

		//now pass through pre-binder if not here...
		var bindings=[];
		if (viewModel!=null) {
            // pass in the customConfig because if the binding is not a direct modelProperty to control, meaning it is a template with replacement variables,
            // then we will need to add an array of modelProperties with their initialized state.  we will use a Template.compile() approach where we retain
            // the template with replacement tokens and then we apply an array of modelPropNames with their values to the template.
			bindings = Argon.Binder.collectBindings(config, customConfig, viewModel);
		}

        // move any properties designed as custom to the customConfig object and delete them from config prior
        // to attempting to build the titanium control.
        if(this._customProps[config.xtype]){
            var customProps = this._customProps[config.xtype];
            if(customProps && Argon.isArray(customProps) && customProps.length > 0){
                for(var i = 0; i < customProps.length; i++){
                    if(!customConfig){
                        customConfig = {};
                    }
                    if(!customConfig[customProps[i]]){
                        customConfig[customProps[i]] = config[customProps[i]];
                    }
                    delete config[customProps[i]];
                }
            }
        }
		//create component
        var items = config.items;
//        var dockedItems = config.dockedItems;
        delete config.items;
//        delete config.dockedItems;
		var component = factory(config); //call factory function
        // needed for the apply binding although this is an incomplete version because the subcontrols are not accounted for in customConfig yet.
         component.customConfig = customConfig;

		//apply bindings
		if (viewModel!=null) {
			Argon.Binder.applyBindings(config,viewModel,bindings, component);
		}

		if (root==null) {
			root=component;
		}
		if (items !=null) {
			for (var i=0;i<items.length;i++) {
                var childConfig = items[i];
                // link the child to the parent container. use underscore to indicate that its not necessary to manually attach to the container because
                // its inline notation.
                childConfig.containerId = config.id;
				var child = this.create(childConfig, root, viewModel, true);
                if(child.customConfig && child.customConfig.id){
                    customConfig.items.push(child.customConfig.id);
                }
				component.add(child);
			}
		}

//        if (dockedItems !=null) {
//            for (var i=0;i<dockedItems.length;i++) {
//                var childConfig = dockedItems[i];
//                // link the child to the parent container. use underscore to indicate that its not necessary to manually attach to the container because
//                // its inline notation.
//                childConfig.containerId = config.id;
//                var child = this.create(childConfig, root, viewModel, true);
//                if(child.customConfig && child.customConfig.id){
//                    customConfig.items.push(child.customConfig.id);
//                }
//                // TODO: remove all uses of dockedItems in sencha touch components
////                child.docked = dockedItems[i].dock;
////                component.add(child);
//            }
//        }

		if (config.ref != null) {
			root[config.ref]=component;
		}
         component.customConfig = customConfig;
//        Argon.ComponentManager.put(component, (suppressContainerAttachment?null:containerId));
//
//        if (listeners!=null) {
//            for (var evtName in listeners) {
//                if(listeners.hasOwnProperty(evtName)){
//                    if (evtName=='scope'){continue;}
//                    var scope = listeners.scope!=null?listeners.scope:component;
//                    Argon.ComponentManager.addEventListener(component, evtName, listeners[evtName], scope);
//                }
//            }
//        }
                
		return component;
	},
	openWindow: function() {
		var mapWindow = Titanium.UI.createWindow({});
	}
	
};
