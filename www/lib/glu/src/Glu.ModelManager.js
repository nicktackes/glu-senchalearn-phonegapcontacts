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
// ensure the Argon namespace exists
var Argon = Argon || {};

// Singleton ModelManager to cache all model definitions for easy access
Argon.ModelManager = function() {
    var models = {};

    return {

        put: function(name, model) {
            if (Argon.ModelManager.contains(name)) {
                Ti.API.warn('Model ' + name + ' is already registered with the ModelManager.  Overwriting old model with new one.');
            }
            models[name] = model;
            Ti.API.info(name + ' model has been registered with the model manager.');
        },
        get: function(name) {
            return models[name];
        },
        contains: function(name) {
            return models[name] != null;
        },
        getFieldModel: function(dataModel, fieldName) {
            for(var i = 0; i < dataModel.fields.items.length; i++){
                if(dataModel.fields.items[i].name == fieldName){
                    return dataModel.fields.items[i];
                }
            }
            return null;
        }
    };
}();

// TESTS

//Argon.ModelManager.put('test', testModel);

