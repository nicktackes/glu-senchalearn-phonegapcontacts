
Ext.namespace('Argon');

Ext.define('Argon.Store',  {
    extend: 'Ext.data.Store',
    alias: 'store.argon',

    /**
     * @cfg {Ext.data.DataReader} reader @hide
     */
    constructor: function(config) {
        config = config || {};
        Argon.mixin(this, 'viewmodel');
        this.callParent([config]);
    }
});