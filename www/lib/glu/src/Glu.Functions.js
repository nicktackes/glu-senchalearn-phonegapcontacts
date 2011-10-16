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

var Argon = Argon || {};
Argon.Filter = Argon.Filter || {};
Argon.Filter.Function = Argon.Filter.Function || {};


Argon.Filter.Function.Utilities = function() {

    return {

        getType: function(filter, model) {
            var field = model.getField(filter.field);
            var type = 'string';
            if(field && field.type){
                type = field.type;
            }
            return type;
        },
        // dispatch to data type specific isFiltered if an impl exists for a particular operator.
        dtCompute: function(record, filter, model, operator){
            var type = Argon.Filter.Function.Utilities.getType(filter, model);
            if(Argon.Types[type] && Argon.Types[type]['function_'+operator]){
                return Argon.Types[type]['function_'+operator](record, filter, model);
            }
            else{
                if(!Argon.Types['string']['function_'+operator]){
                    Ti.API.error('The string data type must implement every function compute method.  An implementation is missing for function ' + operator);
                    return false;
                }
                return Argon.Types['string']['function_'+operator](record, filter, model);
            }
        }
    };
}();


Argon.Filter.Function.count = function() {

    return {

        compute: function(record, filter, model) {
            return Argon.Filter.Function.Utilities.dtCompute(record, filter, model, 'count');
        }
    };
}();

Argon.Filter.Function.sum = function() {

    return {

        compute: function(record, filter, model) {
            return Argon.Filter.Function.Utilities.dtCompute(record, filter, model, 'sum');
        }
    };
}();

Argon.Filter.Function.min = function() {

    return {

        compute: function(record, filter, model) {
            return Argon.Filter.Function.Utilities.dtCompute(record, filter, model, 'min');
        }
    };
}();

Argon.Filter.Function.max = function() {

    return {

        compute: function(record, filter, model) {
            return Argon.Filter.Function.Utilities.dtCompute(record, filter, model, 'max');
        }
    };
}();
