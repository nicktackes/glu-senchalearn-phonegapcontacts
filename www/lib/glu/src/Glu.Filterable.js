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
// supported operators are 'is', 'not', 'has', 'isin' (in), lt, le, gt, ge, startsWith

Argon.FilterableTrait = function() {
    this._filters = [];
    this._staticFilters = [];

    this.initTrait = function() {

    };
    this.clearFilter = function() {
        this._filters = [];
    };
    this.filter = function(filters) {
        if (Argon.isArray(filters)) {
            this._filters = filters;
        }
        else if (Argon.isObject(filters)) {
            this._filters.push(filters);
        }
    };
    this.getAllFilters = function() {
        var f = this._filters || [];
        var f1 = this._staticFilters || [];
        var f2 = f.concat(f1);
        return f2;
    };
    this.hasFilter = function() {
        return (this.getAllFilters().length > 0);
    };
    this.filterIsValid = function(filter) {
        if (filter) {
            // field exists
            if (!filter.field) {
                Ti.API.error('Filter ' + JSON.stringify(filter) + ' does not contain a field.');
            }
            // field exists in model
            if (!this.getModel().hasField(filter.field)) {
                Ti.API.error('Filter ' + JSON.stringify(filter) + ' contains a field that doesnt exist in model ' + this._config.modelName);
            }

            return true;
        }
        return false;
    };
    this.isFiltered = function(record, model) {
        var filters = this.getAllFilters();
        if (filters.length == 0)
            return false;
        var jsonObj;
        // if json is in string form, then parse first
        if (Argon.isString(record)) {
            jsonObj = JSON.parse(data);
        }
        else {
            jsonObj = record;
        }

        for (var x = 0; x < filters.length; x++) {
            // if no operator, default to has
            if (!filters[x].operator) {
                filters[x].operator = 'is';
            }
            // if no field, fail
            if (!filters[x].field) {
                Ti.API.warn('Filter was not applied because a field property was missing in filter, ' + JSON.stringify((filters[x])));
                return false;
            }
            // if no value, default to empty string
            if (!filters[x].value) {
                filters[x].value = '';
            }
        }

        // filter is in the form of [{field: 'city', operator: 'is', value: 'Pasadena'}]
        // operator support is registered with Argon.Filter.Operator object
        for (var j = 0; j < filters.length; j++) {
            if (Argon.Filter.Operator[filters[j].operator]
                    && Argon.Filter.Operator[filters[j].operator].isFiltered
                    && Argon.isFunction(Argon.Filter.Operator[filters[j].operator].isFiltered)
                    && Argon.Filter.Operator[filters[j].operator].isFiltered(jsonObj, filters[j], model)) {
                return true;
            }
        }

        return false;
    }
}


Argon.regTrait('filterable', Argon.FilterableTrait);


