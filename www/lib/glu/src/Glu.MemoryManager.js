/**
 * Copyright (c) 2011 Nick Tackes, Travis Barajas and Michael Gai
 *
 * Permission is not granted, without the express consent of Nick Tackes, Travis Barajas and Michael Gai, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software, including the rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
 * copies of the Software.
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 *
 */
// ensure the Argon namespace exists
var Argon = Argon || {};

// Singleton MemoryManager to allow for disposal of controls and reclamation of memory
Argon.MemoryManager = function() {
    var mWindow;
    var controlsInTrash = 0;
    // set this level to control how often reclamation occurs.  as soon as this amount of controls have been disposed, reclaim is automatically called.
    var reclamationThreshold = 1;

    return {

        dispose: function(control, supressAutoReclamation) {
            // if no window construct one
            Argon.MemoryManager.init(false);

            // add the control to the window.
            mWindow.add(control);
            controlsInTrash++;
            Ti.API.info('A CONTROL WAS ADDED TO THE TRASH.  THE COUNT IS ' + controlsInTrash);

            // if we hit the threshold of controls in trash, then reclaim automatically.
            if(!supressAutoReclamation){
                if(controlsInTrash >=reclamationThreshold){
                    Argon.MemoryManager.reclaim();
                }
            }
        },
        disposeBatch: function(controls) {
            if(controls && Argon.isArray(controls)){
                for(var i = 0; i < controls.length; i++){
                    // wait to dispose until entire batch is trashed.
                    Argon.MemoryManager.dispose(controls[i], true);
                }
            }

            // if we hit the threshold of controls in trash, then reclaim automatically.
            if(controlsInTrash >=reclamationThreshold){
                Argon.MemoryManager.reclaim();
            }
        },
        reclaim: function() {
            Ti.API.info('memory before reclamation ' + Ti.Platform.availableMemory);
            Argon.MemoryManager.init(true);
            Ti.API.info('memory after reclamation ' + Ti.Platform.availableMemory);
        },
        init: function(flushFirst) {
            if (mWindow && flushFirst) {
                // flush anything to be collected.
                mWindow.close();
                Ti.API.info('MEMORY RECLAIMED for ' + controlsInTrash + ' controls');
                controlsInTrash = 0;
            }
            // reconstitute the hidden window used as the garbage state container
            mWindow = Ti.UI.createWindow();
            mWindow.open();
            mWindow.hide();

        }
    };
}();

// TESTS


