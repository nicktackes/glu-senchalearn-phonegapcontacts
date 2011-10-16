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
Argon.Types = Argon.Types || {};

Argon.Types.string = function() {

	return {
		isSorted: function(value1, value2, descending) {
            var array = [value1, value2];
            array.sort();
            var idx = (descending?1:0);
            return value1 == array[idx];
		},
        operator_has: function(record, filter){
            // make case insensitive
            var fv = (filter.value?filter.value:'');
            if(Argon.isString(fv)){
                fv = fv.toLowerCase();
            }
            var v = (record[filter.field]?record[filter.field]:'');
            if(Argon.isString(v)){
                v = v.toLowerCase();
            }
            return v.indexOf(fv) == -1;
        },
        operator_is: function(record, filter){
            // make case insensitive
            var fv = (filter.value?filter.value:'');
            if(Argon.isString(fv)){
                fv = fv.toLowerCase();
            }
            var v = (record[filter.field]?record[filter.field]:'');
            if(Argon.isString(v)){
                v = v.toLowerCase();
            }
            return fv != v;
        },
        operator_not: function(record, filter){
            return record[filter.field] == filter.value;
        },
        operator_isin: function(record, filter){
            var filterValues = [];
            if (Argon.isString(filter.value)) {
                filterValues.push(filter.value);
            }
            else if (Argon.isArray(filter.value)) {
                filterValues = filter.value;
            }
            for (var i = 0; i < filterValues.length; i++) {
                if (record[filter.field] == filterValues[i]) {
                    return false;
                }
            }
            return true;
        },
        operator_startsWith: function(record, filter){
            return record[filter.field].indexOf(filter.value) != 0;
        },
        operator_gt: function(record, filter){
            return record[filter.field] <= filter.value;
        },
        operator_ge: function(record, filter){
            return record[filter.field] < filter.value;
        },
        operator_lt: function(record, filter){
            return record[filter.field] >= filter.value;
        },
        operator_le: function(record, filter){
            return record[filter.field] > filter.value;
        }
    };
}();

Argon.Types.number = function() {

	return {
		isSorted: function(value1, value2, descending) {
            var val1 = (descending?value2:value1);
            var val2 = (descending?value1:value2);
            return val1 <= val2;
		}
    };
}();

Argon.Types.date = function() {

	return {
		isSorted: function(value1, value2, descending) {
            try{

                // if strings then convert to date
                var val1 = value1 || Date.parse("Jan 1, 1900");
                var val2 = value2 || Date.parse("Jan 1, 1900");
                if(value1){
                    if(Argon.isString(value1)){
                        val1 = Date.parse(value1);
                    }
                }
                if(value2){
                    if(Argon.isString(value2)){
                        val2 = Date.parse(value2);
                    }
                }
                if(Argon.isDate(val1) && Argon.isDate(val2)){
                    if(desending){
                        return value2.getUTCMilliseconds() <= value1.getUTCMilliseconds();
                    }
                    else{
                        return value1.getUTCMilliseconds() <= value2.getUTCMilliseconds();
                    }
                }
                else{
                    return true;
                }
            }
            catch(exc){
                return true;
            }
		}
    };
}();

Argon.Types.time = function() {

	return {
		isSorted: function(value1, value2, descending) {
            try{
                //TODO implement
                return true;
            }
            catch(exc){
                return true;
            }
		}
    };
}();

Argon.Types.tboolean = function() {

	return {
		isSorted: function(value1, value2, desending) {
            if(desending){
                // if value2 is false or they are equal, then its sorted in descending order
                return !value2 ||  (value1 == value2);
            }
            else{
                // if value1 is false or they are equal, then its sorted in ascending order
                return !value1 ||  (value1 == value2);
            }
		}
    };
}();

Argon.Types.array = function() {

	return {
		isSorted: function(value1, value2) {
            var val1 = value1 || [];
            var val2 = value2 || [];
            if(descending){
                return val2.length <= val1.length;
            }
            else{
                return val1.length <= val2.length;
            }
		}
    };
}();
