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
Argon.ObservableTrait = function() {
    this.events = {};

    this.initTrait = function(){
        this.autoWire(this);
    };
    this.constructAsNeeded = function(){ //constructor is not yet working
        if (this._constructed==true){return;}
        this.events={};
        this._constructed=true;
    };

    this._fireEvent = function(){
        this.constructAsNeeded();
        var eventName = arguments[0].toLowerCase();
        Ti.API.debug ('Firing event ' + eventName + ' with ' + (arguments.length -1) + ' arguments');

        var actualArgs =[];
        for (var i = 1;i<arguments.length;i++){
            actualArgs.push(arguments[i]);
        }

        if (this.events[eventName]!=null){

            var evt = this.events[eventName];
            Ti.API.debug ('Notifying ' + evt.listeners.length + ' listeners of ' + eventName );
            for (var i = 0; i<evt.listeners.length;i++){
                var listener = evt.listeners[i];
                var scope = listener.scope !=null ? listener.scope: this;
                listener.fn.apply(scope, actualArgs);
            }
            for (var i = 0; i<evt.delayedTasks.length;i++){
                var delayedTask = evt.delayedTasks[i].task;
                var scope = evt.delayedTasks[i].scope !=null ? evt.delayedTasks[i].scope: this;
                delayedTask.delay(evt.delayedTasks[i].buffer, null, scope, actualArgs);
            }
        }
    };

    this._on = function(eventName, callback, scope, buffer){
        this.constructAsNeeded();
        eventName = eventName.toLowerCase();
        if (this.events[eventName]==null){
            Ti.API.info('CREATING EVENT '+  eventName);
            this.events[eventName]={listeners:[], delayedTasks:[]};
        }
        var evt = this.events[eventName];
        if(!isNaN(buffer) && buffer > 0){
            var delayedTask = new Argon.DelayedTask(callback, scope);
            evt.delayedTasks.push({task: delayedTask, scope: scope, buffer: buffer});
        }
        else{
            var listener = {
                fn: callback,
                scope:scope
            };
            //TODO: should check to see if function already exists

            evt.listeners.push(listener);
        }
    };

    this.autoWire = function(target){
        this.constructAsNeeded();
        if (target==null) { target = this;}

        var targetMethods ={};
        for (var propName in target){

            if (Argon.isFunction(target[propName]) && propName.substring(0,2) =='on'){
                targetMethods[propName.toLowerCase()] = target[propName];
                this._on(propName.substring(2),target[propName], target);
            }
        }
        return;
        //the below would assume that we were pre-setting up all events...
        for (var evtName in this.events){
            if (targetMethods[evtName] != null){
                this._on(evtName,targetMethods[evtName],target);
            }
        }
    };
}

Argon.regTrait('observable',Argon.ObservableTrait);
