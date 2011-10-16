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
/**
 * @class Argon.DelayedTask

The DelayedTask class provides a convenient way to "buffer" the execution of a method,
performing setTimeout where a new timeout cancels the old timeout. When called, the
task will wait the specified time period before executing. If during that time period,
the task is called again, the original call will be cancelled. This continues so that
the function is only called a single time for each iteration.

This method is especially useful for things like detecting whether a user has finished
typing in a text field. An example would be performing validation on a keypress. You can
use this class to buffer the keypress events for a certain number of milliseconds, and
perform only if they stop for that amount of time.

**Usage:**

    var task = new Argon.DelayedTask(function(){
        Ti.API.info(control.value.length);
    });

    // Wait 500ms before calling our function. If the user presses another key
    // during that 500ms, it will be cancelled and we'll wait another 500ms.
    control.on('keypress', function(){
        task.{@link #delay}(500);
    });

Note that we are using a DelayedTask here to illustrate a point. The configuration
option `buffer` for {@link Argon.Observable#addListener addListener/on} will
also setup a delayed task for you to buffer events.

 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn (optional) The default function to call.
 * @param {Object} scope The default scope (The <code><b>this</b></code> reference) in which the
 * function is called. If not specified, <code>this</code> will refer to the browser window.
 * @param {Array} args (optional) The default Array of arguments.
 * @markdown
 */

Argon.DelayedTask = function(fn, scope, args) {
    var me = this,
        id,
        call = function() {
            clearInterval(id);
            id = null;
            fn.apply(scope, args || []);
        };

    /**
     * Cancels any pending timeout and queues a new one
     * @param {Number} delay The milliseconds to delay
     * @param {Function} newFn (optional) Overrides function passed to constructor
     * @param {Object} newScope (optional) Overrides scope passed to constructor. Remember that if no scope
     * is specified, <code>this</code> will refer to the browser window.
     * @param {Array} newArgs (optional) Overrides args passed to constructor
     */
    this.delay = function(delay, newFn, newScope, newArgs) {
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay);
    };

    /**
     * Cancel the last queued timeout
     */
    this.cancel = function(){
        if (id) {
            clearInterval(id);
            id = null;
        }
    };
};