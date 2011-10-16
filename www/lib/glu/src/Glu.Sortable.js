/**
 * Copyright (c) 2011 Nick Tackes, Travis Barajas and Michael Gai
 *
 * Permission is not granted, without the express consent of Nick Tackes,, Travis Barajas and Michael Gai to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software, including the rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
 * copies of the Software.
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 *
 */

Argon.SortableTrait = function() {
    this._sorts = [];

    this.initTrait = function(){
    };
    this.clearSort = function(){
        this._sorts = [];
    };
    this.hasSort = function(){
      return this._sorts.length > 0;
    };
    this.sort = function(sorts){
        if(sorts && Argon.isArray(sorts)){
            for(var i = 0; i < sorts.length; i++){
                if(sorts[i].field){
                    if(this.model){
                        var field = this.model.getField(sorts[i].field);
                        if(!field){
                            Ti.API.error('Failure attempting to perform sort.  Field ' + sorts[i].field + ' does not exist in model ' + this.model.name);
                            return;
                        }
                        sorts[i].type = sorts[i].type || field.type;
                    }
                    // if no type at this point, use string as default
                    sorts[i].type = sorts[i].type || 'string';
                    sorts[i].descending = (sorts[i].descending===true?true:false);
                    this._sorts.push(sorts[i]);
                }
            }
        }
    };
    this.isSorted = function(record1, record2, sort){
        var value1 = record1[sort.field];
        var value2 = record2[sort.field];
        if(Argon.Types[this.type]){
            return Argon.Types[this.type].isSorted(value1, value2, sort.descending);
        }
        else{
            return Argon.Types.string.isSorted(value1, value2, sort.descending);
        }
    };
}

Argon.regTrait('sortable',Argon.SortableTrait);

