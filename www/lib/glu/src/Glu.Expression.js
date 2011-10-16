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
Argon.Filter = Argon.Filter || {};

// Singleton Expression class to evaluate expressions
Argon.Filter.Expression = function() {

	return {
		evaluate: function(records, filter, model) {
            // i.e. {function: 'count', model: 'specials', filters:[{field: 'title', operator: 'is', value: this.filterText}]}
            
		}
    };
}();

// TESTS

