/**
 * Copyright (c) 2011 Nick Tackes, Travis Barajas and Michael Gai
 *
 * Permission is not granted, without the express consent of Nick Tackes, Travis Barajas and Michael Gai to any person obtaining a copy
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

// Singleton StoreManager to cache all store definitions for easy access
Argon.StoreManager = function() {
	var stores = {};

	return {

		put: function(store) {
            var name = store.getName();
            if(Argon.StoreManager.contains(name)){Ti.API.warn('Store ' + name + ' is already registered with the StoreManager.  Overwriting old store with new one.');}
			stores[name] = store;
            Ti.API.info(name + ' store has been registered with the store manager.');
		},
		get: function(name) {
			return stores[name];
		},
        contains: function(name){
            return stores[name] != null;
        }
    };
}();

// TESTS


