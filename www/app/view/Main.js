Ext.define('app.view.Main', {
    xtype:'mainview',
    extend: 'Ext.Container',
    requires: [
        'app.view.Detail',
        'app.view.Form',
        'app.view.List'
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