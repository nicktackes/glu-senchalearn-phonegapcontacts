Ext.define('app.controller.Contact', {
    extend: 'Ext.app.Controller',
    views : [
        'Main',
        'Detail',
        'List',
        'Form'
    ],
    stores:[
            'Contacts'
    ],
    refs: [
        {
            ref       : 'main',
            selector  : 'mainview',
            xtype     : 'mainview',
            autoCreate: true
        }
    ],
    index: function(options) {
        Ext.Viewport.setActiveItem(
            app.view.List, options.animation
        );
    },
    show: function(options) {
        var id = parseInt(options.id),
            contact = app.store.Contacts.getById(id);
        if (contact) {
            app.view.Detail.updateWithRecord(contact);
            Ext.Viewport.setActiveItem(
                app.view.Detail, options.animation
            );
        }
    },
    edit: function(options) {
        var id = parseInt(options.id),
            contact = app.store.Contacts.getById(id);
        if (contact) {
            app.view.Form.updateWithRecord(contact);
            Ext.Viewport.setActiveItem(
                app.view.Form, options.animation
            );
        }
    }
});