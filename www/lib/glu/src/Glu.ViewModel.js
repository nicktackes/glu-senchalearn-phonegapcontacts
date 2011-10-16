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
Argon.ViewModelTrait = function() {
    this.requiresTrait = ['observable'];
    this.activeView = {};
    this.itemStack = [];
    //the following activation pieces are for when the viewmodel has a set of "cards".
    //it could be its own mixin 'activationContainer'
    this.isActivated = false;
    // perform a basic transition toggle.
    this.transition = Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT;
    this.conductorItems = [];
    this.activeItem = null;
    this.previousItem = null;

    this.setProperty = function(propName, value) {
        //Ti.API.info ('setting property "'  + propName + '" to ' + JSON.stringify(value))
        var oldValue = this[propName];
        this[propName] = value;
        if (this[propName] == oldValue) {
            return;
        }

        // add in newValue, oldValue and propName.  The reason for the property name is that a control may have multiple
        // setValue property bindings and corresponding handlers.  we will use the propName to locate the control property specific
        // handler and initiate that setValue logic.
        this._fireEvent(propName + 'Changed', value, oldValue, {modelPropName: propName});
    };

    this.initTrait = function() {
        function set(propName, value) {

        }

        for (var propName in this) {
            if (this.hasOwnProperty(propName)) {

                if (propName == 'events' || propName == 'autoWire' || propName == 'on' || propName == 'constructAsNeeded' || propName == '_fireEvent' || propName == 'requiresTrait' || propName == 'setProperty') {
                    continue;
                }
                var propValue = this[propName];
                if (Argon.isFunction(propValue)) {
                    //fooFormula = formula
                    //onFoo = observer of foo
                    //[otherwise] = command
                    continue;
                }
                if (Argon.isObject(propValue) && propValue !== null && propValue.xtype != null) { //wants to do sub-configuration
                    propValue.parentVM = this; //at least for now parent it...
                    this['set' + Argon.toPascalCase(propName)] =
                            (function(propName, parentVM) { //to get around closure-in-a-loop issue
                                return function(value) {
                                    value.parentVM = parentVM; //for now, just always re-add the parent whenever setting the value
                                    this.setProperty(propName, value);
                                };
                            })(propName, this);
                    continue;
                }
                //a regular property
                Ti.API.info('Adding viewmodel behavior for "' + propName + '"');

                this['set' + Argon.toPascalCase(propName)] =
                        (function(propName) { //to get around closure-in-a-loop issue
                            return function(value) {
                                this.setProperty(propName, value);
                            };
                        })(propName);
            }
        }
        if (this.activeItem) {

        }
    };

    this.resolveItem = function (key) {
        var objName = Argon.toPascalCase(key);
        var viewScreen = Argon.ComponentManager.getView(objName);
        return viewScreen;
    };


    /*
     * This activates an item but instead of switching to it it puts the item on the top of the stack.
     */
    this.openItem = function(itemKey) {

        this.itemStack.push(this.activeViewScreen);
        var item = this.resolveItem(itemKey);
        item.initialized = false;
        this.activateItem(itemKey);
    };

    /*
     * This removes the item from the stack and restores the next underneath.
     * By default, it destroys the closed item
     */
    this.closeTopItem = function() {
        //Save current ViewScreen
        var toDispose = this.activeViewScreen;

        //Pop "activated" ViewScreen
        var toRestore = this.itemStack.pop();

        this.rootContainer.animate({view:toRestore.container,transition:this.toggleTransition()});

        delete toDispose.container;
        toDispose.initialized = false;


        this._fireEvent('viewChanged', toRestore.name);
    };


    this.toggleTransition = function() {
        // set the transition to the return state
        this.transition = (this.transition == Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT ? Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT);
        return this.transition;
    };

    this.createMainWindow = function() {

        //Create Root Window and rootContainer
        var mainViewScreen = Argon.ComponentManager.getView("Authentication");
        if (mainViewScreen.initialized != true) {
            mainViewScreen.initialized = true;

//            Ti.API.info('Creating root window.');
//            this.rootWindow = new Ext.Panel({
//                fullscreen: true,
//                id:'tsm_mainPanel',
//                width:'100%',
//                height:'100%',
//                monitorOrientation:true,
//                layout: 'card',
//                scrollable:false
//            });
//
//
//            this.rootWindow.add(mainViewScreen.create(this));
//            this.rootWindow.setActiveItem('Authentication');
//            this.rootWindow.show();
Ext.Viewport.add(mainViewScreen.create(this));
            Ext.Viewport.setActiveItem('Authentication');
        }
    };

    this.getViewScreen = function(item) {
        var objName = Argon.toPascalCase(item); //temporary hack for now
        return Argon.ComponentManager.getView(objName);
    };

    this.initItem = function(item) {
        if (!Argon.isString(item)) {
            return;
        }

        var objName = Argon.toPascalCase(item); //temporary hack for now
        var viewScreen = Argon.ComponentManager.getView(objName);

        //Check if this view has been created yet.
        if (viewScreen.initialized != true) {
            var newView = viewScreen.create(this);
            Ti.API.info('Just created View: ' + objName)
            viewScreen.initialized = true;
            Ext.Viewport.add(newView);
        }
    };

    this.activateItem = function(item, backward) {
        var animation = {
            type: 'slide',
            direction: (backward ? 'right' : 'left')
        }
        if (!Argon.isString(item)) {
            return;
        }

        var objName = Argon.toPascalCase(item); //temporary hack for now
        if(objName != this.activeItem){
            var viewScreen = Argon.ComponentManager.getView(objName);
            //Check if this view has been created yet.
            if (viewScreen.initialized != true) {
                var newView = viewScreen.create(this);
                Ti.API.info('Just created View: ' + objName)
                viewScreen.initialized = true;
                Ti.API.info('About to add view to rootContainer for View: ' + objName)
                Ext.Viewport.add(newView);

                Ti.API.info('About to show newly created View: ' + objName)
            }
            Ext.Viewport.setActiveItem(newView);
            this.previousItem = this.activeItem;
            this.activeItem = objName;
            this._fireEvent('viewChanged', viewScreen.name);
        }
    };

    this.deactivateItem = function(item) {
        if (!Argon.isString(item)) {
            return;
        }
        var objName = Argon.toPascalCase(item) + 'View';
        obj.deactivate();
    };
}

Argon.regTrait('viewmodel', Argon.ViewModelTrait);
