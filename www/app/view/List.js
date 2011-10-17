Ext.define('app.view.List', {
    xtype:'contactlist',
    extend: 'Ext.Panel',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Contacts'
    }],
    layout: 'fit',
    items: [{
        xtype: 'list',
        store: 'Contacts',
        itemTpl: '{givenName} {familyName}',
        grouped: true,
        indexBar: true,
        onItemDisclosure: function (record) {
            Ext.dispatch({
                controller: app.controller.Contact,
                action: 'show',
                id: record.getId()
            });
        }
    }],
    initialize: function() {
        app.store.Contacts.load();
        this.callParent(arguments);
    }
});