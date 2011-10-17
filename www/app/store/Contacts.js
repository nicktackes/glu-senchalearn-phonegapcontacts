Ext.define('app.store.Contacts',{
    extend: 'Ext.data.Store',
    model: "app.model.Contact",
    requires: ['app.model.Contact'],
    sorters: 'familyName',
    getGroupString : function(record) {
        return record.get('familyName')[0];
    }
});