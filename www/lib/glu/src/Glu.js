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
Argon = {

    emptyFn : function() {
    },
    apply : function(target, src) {
        if (target && src && typeof src == 'object') {
            for (var p in src) {
                target[p] = src[p];
            }
        }
//        for (var key in src){
//            if(src.hasOwnProperty(key)){
//			    target[key]=src[key];
//            }
//		}
        return target;
    },
    S4: function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    // generate a guid - not really, but this will act as a stub
    guid: function(prefix) {
        return ((prefix?prefix:'a') + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4());
    },
    isArray: function(value) {
        return Object.prototype.toString.apply(value) === '[object Array]';
    },
    isObject: function(target) {
        //return typeof(target)=='object';
        return !!target && Object.prototype.toString.call(target) === '[object Object]';
    },
    isDate: function(value) {
        return Object.prototype.toString.apply(value) === '[object Date]';
    },
    isFunction: function(target) {
        return typeof(target) == 'function';
    },
    isString: function(target) {
        return typeof(target) == 'string';
    },
    toCamelCase:function(theString) {
        return theString.substring(0, 1).toLowerCase() + theString.substring(1);
    },
    toPascalCase:function(theString) {
        return theString.substring(0, 1).toUpperCase() + theString.substring(1);
    },
    getCmp: function(id) {
        return Argon.ComponentManager.get(id);
    },
    convertJSONToTable: function(objArray, theme, enableHeader) {
        // set optional theme parameter
        if (!theme) {
            theme = 'json-table'; //default theme
        }

        if (enableHeader === undefined) {
            enableHeader = true; //default enable headers
        }

        // If the returned data is an object do nothing, else try to parse
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

        var str = '<table class="' + theme + '">';

        // table head
        if (enableHeader) {
            str += '<thead><tr>';
            for (var index in array[0]) {
                str += '<th scope="col">' + index + '</th>';
            }
            str += '</tr></thead>';
        }

        // table body
        str += '<tbody>';
        for (var i = 0; i < array.length; i++) {
            str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
            for (var index in array[i]) {
                str += '<td>' + array[i][index] + '</td>';
            }
            str += '</tr>';
        }
        str += '</tbody>'
        str += '</table>';
        return str;
    },
    //Returns a prototype function off of the other one...
    extend : function() {
        // inline overrides
        var io = function(o) {
            for (var m in o) {
                if (o.hasOwnProperty(m)) {
                    this[m] = o[m];
                }
            }
        };
        var oc = Object.prototype.constructor;

        return function(sb, sp, overrides) {
            if (Argon.isObject(sp)) {
                overrides = sp;
                sp = sb;
                sb = overrides.constructor != oc ? overrides.constructor : function() {
                    sp.apply(this, arguments);
                };
            }
            var F = function() {
            },
                    sbp,
                    spp = sp.prototype;

            F.prototype = spp;
            sbp = sb.prototype = new F();
            sbp.constructor = sb;
            sb.superclass = spp;
            if (spp.constructor == oc) {
                spp.constructor = sp;
            }
            sb.override = function(o) {
                Ext.override(sb, o);
            };
            sbp.superclass = sbp.supr = (function() {
                return spp;
            });
            sbp.override = io;
            Argon.override(sb, overrides);


            sb.extend = function(o) { //allow for short cut...
                return Argon.extend(sb, o);
            };
            return sb;
        };
    }(),
    override: function(origclass, overrides) {
        if (overrides) {
            var p = origclass.prototype;
            Argon.apply(p, overrides);
        }
    },

    /*
     * Mixins or Traits are object snippets with properties and behavior that are added into an object
     * Unlike extjs plugins, they are parameterless and have a correctly scoped 'this' on initialization
     * In other words, they really are "mixed in" to the javascript object
     * This eliminates much of the syntactic cruft of trying to make javascript 'object-oriented'
     * While still giving the same basic feel
     * Mixins are the preferred way to go when you can do it as it makes things very simple...
     */
    traitReg:{},

    regTrait:function(name, trait) {
        this.traitReg[name] = trait;
    },

    mixin:function() {
        var target = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            this.mixinSingleTrait(target, arguments[i]);
        }
    },

    mixinSingleTrait: function(target, traitName) {
        Ti.API.info('asked to mixin trait ' + traitName);
        if (!Argon.isString(traitName)) {
            throw "You must pass in the short string name of the trait, not the trait itself";
        }
        if (target.traits == null) {
            target.traits = {};
        }
        if (target.traits[trait] != null) {
            return;
        }

        var trait = new this.traitReg[traitName];
        if (trait == null) {
            throw "no such trait '" + traitName + "' exists";
        }

        if (trait.requiresTrait != null) {
            Ti.API.info('processing ' + trait.requiresTrait.length + ' requirements');
            for (var i = 0; i < trait.requiresTrait.length; i++) {
                var traitRef = trait.requiresTrait[i];
                this.mixin(target, traitRef);
            }
        }
        //apply everything...


        var stripped = Argon.apply({}, trait); //clone
        var initTrait = stripped.initTrait; //some traits have an initializer
        delete stripped.initTrait; //don't mixin the init funciton!
        delete stripped.requiresTrait;
        this.apply(target, trait);
        Ti.API.info(initTrait);
        if (initTrait != null) {
            initTrait.call(target);
        }
        target.traits[trait] = true;
    }
};

// Array.prototype.contains = function(value){
// 	for (var i =0; i<this.length; i++){
// 		if (this[i] == value) return true;
// 	}
// 	return false;
// }

// Array.prototype.indexOfValue = function(value){
// 	for (var i =0; i<this.length; i++){
// 		if (this[i] == value) return i;
// 	}
// 	return -1;
// }


//TESTS BELOW--->

// ClassA = Argon.extend(Argon.emptyFn,{
// 	printFromA: function() {
// 		Ti.API.info('I am in class A');
// 	},
// })
// 
// ClassB = Argon.extend(ClassA,{
// 	printFromB: function() {
// 		Ti.API.info('I am in class B');
// 	},
// 	// constructor: function(){
// 	// 	Ti.API.info('Now in Class B constructor');
// 	// }
// });
// 
// ClassD = Argon.extend(ClassB,{
// 	printFromB: function() {
// 		ClassD.superclass.printFromB.apply(this,arguments);
// 		Ti.API.info ('   Now doing the override of print from b');
// 	},
// 	printFromD: function() {
// 		Ti.API.info('I am in class D');
// 	}
// })
// 
// ClassC = Argon.extend (ClassB, {
// 	// constructor: function(config){
// 	// 	ClassC.superclass.constructor.apply(this,arguments)
// 	// 	Ti.API.info('In class C constructor');
// 	// 	this.test = config.test;
// 	// },
// 	printFromC: function() {
// 		Ti.API.info('In class c with member test of ' + this.test);
// 	}
// })
// 
// var instance= new ClassD();
// instance.printFromA();
// instance.printFromB();
// instance.printFromD();
// 
// var instance2 = new ClassC({test:'hello'});
// instance2.printFromC();
