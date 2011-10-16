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

Argon.Ajax = {
	request: function (config) {
		//url:
		//scope:
		//success:
		//failure:
		//method:
		
		if (config.url == null || config.url==''){
			throw "Attempted an Ajax call without a url defined.";
		}
		var xhr = Titanium.Network.createHTTPClient();			
		var success = config.success == null ? function(){} : config.success;
		var failure = config.failure == null ? function(){} : config.failure;
		
		xhr.onload = function() {									
			var body = {
				status:this.status,
				responseText:this.responseText
			};
			var scope = config.scope != null ? config.scope : body;					
			if (body.status==200){
				success.call(scope, body);				
			} else {
				failure.call(scope,body);				
			}			
		};
		var method = config.method ? config.method : 'GET';
		xhr.open(method, config.url);
		xhr.setRequestHeader('Content-type', 'application/json');
		Ti.API.info('Sending request to url ' + config.url);
		xhr.send();
	}
};
