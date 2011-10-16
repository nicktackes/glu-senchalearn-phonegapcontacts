Ext.namespace('Ti');
Ext.namespace('Ti.UI.iPhone');
Ext.namespace('Titanium');
Ext.namespace('Argon.utils');

Ti.API = function() {
    return {
        info: function(msg) {
            console.log(msg);
        },
        debug: function(msg) {
            console.log(msg);
        }    };
}();

Ti.Platform = function() {
    return {
        availableMemory:0
    };
}();

Ti.Platform.availableMemory

Ti.UI.iPhone.AnimationStyle = function() {
    return {
        FLIP_FROM_RIGHT: 0
    };
}();

Titanium.Map = function() {
    return {
        STANDARD_TYPE: 0
    };
}();



