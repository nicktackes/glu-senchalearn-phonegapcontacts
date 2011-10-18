Ext.define('app.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'app.view.ContactDetail',
        'app.view.ContactForm',
        'app.view.ContactList'
    ],
    config: {
        fullscreen: true,
        layout: 'card',
        activeItem: 0,
        cardSwitchAnimation: 'slide',
        items: [
            {
                xtype: 'contactlist'
            },
            {
                xtype: 'contactdetail'
            },
            {
                xtype: 'contactform'
            }
        ]
    }
});