Ext.Loader.setConfig({ enabled: true });


Ext.application({
            name: 'app',
            controllers: ['Contact'],
            models: ['Contact'],
            launch: function() {
                this.launched = true;
                this.mainLaunch();
                console.log('launched!');
            },
            mainLaunch: function() {
                try {
                    if (!device || !this.launched) {
                        return;
                    }
                }
                catch(exc) {
                    // eat so that in Chrome we can test.
                    console.log(exc);
                }

//        this.view.viewport = new this.view.Viewport();
            }
        });


