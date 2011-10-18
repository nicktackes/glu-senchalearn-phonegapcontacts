Ext.define('app.controller.Contact', {
    extend: 'Ext.app.Controller',
    views : [
        'Main',
        'ContactDetail',
        'ContactForm',
        'ContactList'
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
    init: function() {
        this.getMainView().create();
    },
    index: function(options) {
        Ext.Viewport.setActiveItem(
                app.view.ContactList, options.animation
        );
    },
    show: function(options) {
        var id = parseInt(options.id),
                contact = app.store.Contacts.getById(id);
        if (contact) {
            app.view.ContactDetail.updateWithRecord(contact);
            Ext.Viewport.setActiveItem(
                    app.view.ContactDetail//, options.animation
            );
        }
    },
    edit: function(options) {
        var id = parseInt(options.id),
                contact = app.store.Contacts.getById(id);
        if (contact) {
            app.view.ContactForm.updateWithRecord(contact);
            Ext.Viewport.setActiveItem(
                    app.view.ContactForm, options.animation
            );
        }
    }
});