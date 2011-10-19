Ext.define('app.view.ContactList', {
    xtype:'contactlist',
    extend: 'Ext.Panel',
    config:{
        layout: 'fit',
        listeners:{
            'painted': function(panel) {
                console.log('list rendered');
            }
        },
        items: [
            {
                xtype: 'toolbar',
                title: 'Contacts',
                docked: 'top'
            },
            {
                xtype: 'list',
                store: 'Contacts',
                itemTpl: '{givenName} {familyName}',
                grouped: true,
                indexBar: true,
                onItemDisclosure: function (record) {
                    this.getController('Contract').show({id: record.getId()});
//                    Ext.dispatch({
//                        controller: app.controller.Contact,
//                        action: 'show',
//                        id: record.getId()
//                    });
                }
            }
        ]
    }
});