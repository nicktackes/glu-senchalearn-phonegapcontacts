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
//
//{
//    name: 'User',
//    idProperty: 'id',  (optional: if not provided, the first field in fields array is used)
//    fields: [
//        {name: id, type: 'string'},
//        {name: first, type: 'string'},
//        {name: last, type: 'string'},
//        {name: age, type: 'number'},
//        {name: dob, type: 'date'}
//    ]
//}
//
// this is the base model.  override as needed to provide custom model implementations.
Argon.Model = function(config){
    this.config = Argon.Model.verifyStructure(config, true);
    this.name = config.name;
}
// STATIC METHODS
// static method to verify that the model is valid in structure.
Argon.Model.verifyStructure = function(config, throwIfInvalid){
    var eStr;
    config.fields = config.fields || [];
    // validate that the model has a name
    if(!config.name){
        eStr = 'Model did not provide name. ' + JSON.stringify(config);
        if(throwIfInvalid){
            throw eStr;
        }
        else{
            Ti.API.error(eStr);
            return;
        }
    }
    // if no fields provided, then initialize
    // verify that at least one field is present
    if(config.fields.length == 0){
        eStr = 'Model must contain at least one field.  ' + JSON.stringify(config);
        if(throwIfInvalid){
            throw eStr;
        }
        else{
            Ti.API.error(eStr);
            return;
        }
    }
    // if no idProperty has been provided, use the first field in the fields array
    if(!config.idProperty){
        config.idProperty = this.fields[0].name;
        Ti.API.warn('No idProperty was specified for Model ' + this.name + ', so the first field provided, ' + this.fields[0].name + ', will be used as the id.');
    }
    else{
        if(!Argon.Model.hasField(config.idProperty, config.fields)){
            eStr = 'The specified idProperty could not be located in the Fields array provided.  ' + JSON.stringify(config);
            if(throwIfInvalid){
                throw eStr;
            }
            else{
                Ti.API.error(eStr);
                return;
            }
            
        }
    }
    Ti.API.info(config.name + ' model created successfully.');
    return config;
}

// static method to check if a field exists in an array of fields
Argon.Model.hasField=function(name, fields){
    if(fields && Argon.isArray(fields)){
        for(var i = 0; i < fields.length; i++){
            if(fields[i].name == name){
                return true;
            }
        }
    }
    return false;
}

// INSTANCE METHODS
Argon.Model.prototype.fields = function(){
    return this.config.fields;
}

Argon.Model.prototype.getField = function(name){
    for(var i = 0; i < this.config.fields.length; i++){
        if(this.config.fields[i].name == name){
            return this.config.fields[i];
        }
    }
    return null;
}

Argon.Model.prototype.hasField=function(name){
    return this.getField(name) != null;
}

Argon.Model.prototype.getKeyField=function(){
    return this.getField(this.config.idProperty);
}

Argon.Model.prototype.getKeyFieldName=function(){
    return this.getKeyField().name;
}

Argon.Model.prototype.getKeyValue=function(data){
    var keyField = this.getKeyField().name;
    if(data){
        return data[keyField];
    }
    return null;
}

Argon.Model.prototype.getFieldValue=function(name, data){
    var field = this.getField(name);
    if(field){
        return data[field.name];
    }
    return null;
}

Argon.Model.prototype.validate=function(data, throwIfInvalid){
    var errStr;
    // default validation

    // verify a value for the key exists.
    if(!data[this.config.idProperty]){
        errStr = 'No key value was provided for ' + this.config.name + ' model data ' + JSON.stringify(data);
        Ti.API.error(errStr);
        if(throwIfInvalid){
            throw errStr;
        }
        else{
            return false;
        }
    }
    // verify all fields exist in model
    for(var key in data){
        if(!this.hasField(key)){
            errStr = 'The field ' + key + ' is not defined in model ' + this.config.name + '.  The data provided was ' + JSON.stringify(data);
            Ti.API.error(errStr);
            if(throwIfInvalid){
                throw errStr;
            }
            else{
                // will allow app to still operate even though the model is not consistent with the data.
                return true;
            }
        }
    }
    return true;

}

// TESTS

//var testModel = new Argon.Model({
//    name: 'test',
//    idProperty: 'id',
//    fields:[
//        {name: 'id', type: 'string'},
//        {name: 'name', type: 'string'},
//        {name: 'longitude', type: 'number'},
//        {name: 'latitude', type: 'number'}
//    ]
//});
//
//var testModelFields = testModel.fields();
//if(testModelFields){
//    for(var i = 0; i < testModelFields.length; i++){
//        var field = testModel.getField(testModelFields[i].name);
//        if(field){
//            Ti.API.info(testModel.config.name + ' model has a field named ' + field.name + ' with a type of ' + field.type );
//        }
//    }
//}
//
//Ti.API.info(testModel.config.name + ' has a keyField of ' + testModel.getKeyField().name);

