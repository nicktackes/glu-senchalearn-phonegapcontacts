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
Argon.Filter.Operator = Argon.Filter.Operator || {};


Argon.Filter.Operator.Utilities = function() {

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
        dtIsFiltered: function(record, filter, model, operator){
            var type = Argon.Filter.Operator.Utilities.getType(filter, model);
            if(Argon.Types[type] && Argon.Types[type]['operator_'+operator]){
                return Argon.Types[type]['operator_'+operator](record, filter);
            }
            else{
                if(!Argon.Types['string']['operator_'+operator]){
                    Ti.API.error('The string datatype must implement every operator isFiltered method.  An implementation is missing for operator ' + operator);
                    return false;
                }
                return Argon.Types['string']['operator_'+operator](record, filter);
            }
        }
    };
}();


Argon.Filter.Operator.has = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'has');
        }
    };
}();

Argon.Filter.Operator.is = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'is');
        }
    };
}();

Argon.Filter.Operator.not = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'not');
        }
    };
}();

Argon.Filter.Operator.isin = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'isin');
        }
    };
}();

Argon.Filter.Operator.startsWith = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'startsWith');
        }
    };
}();

Argon.Filter.Operator.gt = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'gt');
        }
    };
}();

Argon.Filter.Operator.ge = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'ge');
        }
    };
}();

Argon.Filter.Operator.lt = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'lt');
        }
    };
}();

Argon.Filter.Operator.le = function() {

    return {

        isFiltered: function(record, filter, model) {
            return Argon.Filter.Operator.Utilities.dtIsFiltered(record, filter, model, 'le');
        }
    };
}();
