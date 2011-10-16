//// ensure the Argon namespace exists
//var Argon = Argon || {};
//
//// Singleton ComponentManager to cache all control components for easy access.  These components are the actual Titanium controls or Argon Views
//Argon.ComponentManager = function() {
//    var components = {};
//    var views = {};
//    var listeners = {};
//    var subItems = {};
//
//    return {
//        getComponentCount: function() {
//            var i = 0;
//            for (var key in components) {
//                i++;
//            }
//            return i;
//        },
//        getSubItemIds: function(component){
//            var id = Argon.ComponentManager.getId(component);
//            if(id){
//                if(subItems[id] && Argon.isArray(subItems[id])){
//                    return subItems[id];
//                }
//            }
//
//            return [];
//        },
//        getId: function(component) {
//            if (component) {
//                if (component.customConfig) {
//                    return component.customConfig.id;
//                }
//                else if (component.name) {
//                    if (views[component.name]) {
//                        return component.name;
//                    }
//                    else {
//                        return null;
//                    }
//                }
//            }
//            return null;
//        },
//        getXType: function(component) {
//            if (component) {
//                if (component.customConfig) {
//                    return component.customConfig.xtype;
//                }
//                else if (component.name) {
//                    if (views[component.name]) {
//                        return 'argon view'
//                    }
//                }
//            }
//            return 'unknown type';
//        },
//        put: function(component, containerId) {
//
//            var id = component.customConfig.id;
//            if (id) {
//                if (Argon.ComponentManager.contains(id)) {
//                    Ti.API.warn('Component ' + id + ' is already registered with the ComponentManager.  Overwriting old model with new one.');
//                }
//                components[id] = component;
//                if(component.customConfig && component.customConfig.items && Argon.isArray(component.customConfig.items)){
//                    subItems[id] = component.customConfig.items;
//                }
//               // Ti.API.info(component.customConfig.xtype + ' component was registered with ComponentManager.');
//                // if a containerId has been provided, then add this component id to the container's items collection so that they are linked
//                if (containerId) {
//                    var container = Argon.ComponentManager.get(containerId);
//                    var subs = Argon.ComponentManager.getSubItemIds(container);
//                    var itemExists = false;
//                    for (var i = 0; i < subs.length; i++) {
//                        if (subs[i] == id) {
//                            itemExists = true;
//                            break;
//                        }
//                    }
//                    if (!itemExists) {
//                        subs.push(id);
//                        subItems[id] = subs;
//                    }
//                }
//            }
//        },
//        putView: function(component) {
//            var id = component.name;
//            if (!id)
//                throw 'A view must contain a property of name that identifies it as a unique component with the ComponentManager.';
//
//            if (Argon.ComponentManager.contains(id)) {
//                Ti.API.warn('Component ' + id + ' is already registered with the ComponentManager.  Overwriting old model with new one.');
//            }
//            components[id] = component;
//            views[id] = true;
//            Ti.API.info(id + ' component has been registered with the component manager.');
//
//        },
//        get: function(id) {
//            return components[id];
//        },
//        getView: function(id) {
//            return components[id];
//        },
//        contains: function(id) {
//            return components[id] != null;
//        },
//        remove: function(component, view, suppressContainerDetachment) {
//            var id = (Argon.isString(component) ? component : Argon.ComponentManager.getId(component));
//            var componentObj = (Argon.isString(component) ? Argon.ComponentManager.get(component) : component);
//            var viewObj = view;
//            if (id) {
//                if (views[id]) {
//                    Ti.API.info('removing view ' + id + ' from component manager.');
//                    delete views[id];
//                    // TODO: implement.  probably delete the view container and then some other cleanup stuff
//                    viewObj = componentObj;
//                    componentObj = componentObj.container;
//                }
//                // remove all ref property pointers
//                if (viewObj && componentObj.customConfig.ref) {
//                    delete viewObj[componentObj.customConfig.ref];
//                }
//                if (componentObj.customConfig.items && Argon.isArray(componentObj.customConfig.items)) {
//                    for (var i = 0; i < componentObj.customConfig.items.length; i++) {
//                        var subComponent = Argon.ComponentManager.get(componentObj.customConfig.items[i]);
//                        if (subComponent) {
//                            Argon.ComponentManager.remove(subComponent, view, true);
//                        }
//                    }
//                }
//
//                delete components[id];
//                if (listeners[id]) {
//                    for (var evt in listeners[id]) {
//                        Ti.API.info('REMOVING EVENT LISTENER FOR ' + evt + ' component ' + id);
////                        componentObj.removeEventListener(evt, listeners[id][evt]);
//                    }
//
//                    delete listeners[id];
//                }
//
//                // if the component has a containerId, then remove itself from the items list of that container
//                if(!suppressContainerDetachment){
//                    var containerId = componentObj.customConfig.containerId;
//                    if (containerId) {
//                        var container = Argon.ComponentManager.get(containerId);
//                        var subs = Argon.ComponentManager.getSubItemIds(container);
//                        for (var i = 0; i < subs.length; i++) {
//                            if (subs[i] == id) {
//                                subs.splice(i,1);
//                                subItems[containerId] = subs;
//                                break;
//                            }
//                        }
//                    }
//                }
//            }
//
//            //Ti.API.info('the control being deleted is ' + componentObj);
//            //Argon.MemoryManager.dispose(componentObj);
//        },
//        addEventListener: function(component, evtName, callback, scope) {
//            var componentId = Argon.ComponentManager.getId(component);
//            if (componentId) {
//                Ti.API.info('ADDING EVENT LISTENER FOR ' + evtName + ' component ' + Argon.ComponentManager.getXType(component) + ' ' + componentId);
//                if(Argon.ComponentManager.registerDispatcher(componentId, evtName, callback, scope)){
//                    component.addListener(evtName, function(e) {
//                        var id = Argon.ComponentManager.getId(e);
//                        var eName = e.xtype;
//                        Ti.API.info('dispatching event ' + eName + ' for component ' + Argon.ComponentManager.getXType(component) + ' ' + id);
//                        if (id && eName) {
//                            Argon.ComponentManager.dispatchEvent(id, eName, e);
//                        }
//                        else {
//                            Ti.API.error('could not dispatch event because the component was not registered with Component Manager.');
//                        }
//                    });
//                }
//            }
//            else {
//                Ti.API.error('Non optimal event binding...was unable to bind to a component registered with the Component Manager.');
//                component.addEventListener(evtName, function(e) {
//                    callback.call(scope, e);
//                });
//            }
//
//        },
//        // return true if it registered it, false if it already exists
//        registerDispatcher: function(componentId, evtName, callback, scope) {
//            Ti.API.info('Component Manager Registering Dispatcher for event ' + evtName + ' to component ' + componentId);
//            if (!listeners[componentId]) {
//                listeners[componentId] = {};
//            }
//            if (!listeners[componentId][evtName]) {
//                listeners[componentId][evtName] = {callback: callback, scope: scope};
//                return true;
//            }
//            return false;
//        },
//        getDispatcher: function(componentId, evtName) {
//            if (listeners[componentId] && listeners[componentId][evtName]) {
//                return listeners[componentId][evtName];
//            }
//            return null;
//        },
//        dispatchEvent: function(componentId, evtName, args) {
//            var dispatcher = Argon.ComponentManager.getDispatcher(componentId, evtName);
//            if (dispatcher) {
//                Ti.API.info('Component Manager Dispatching event ' + evtName);
//                dispatcher.callback.call(dispatcher.scope, args);
//            }
//            else {
//                var component = Argon.ComponentManager.get(componentId);
//                if(component && component.customConfig && component.customConfig.containerId){
//                    Argon.ComponentManager.dispatchEvent(component.customConfig.containerId, evtName, args);
//                }
//                else{
//                    Ti.API.error('Unable to dispatch event ' + evtName + ' for component ' + componentId + ' ' + Argon.ComponentManager.getXType(component) + ' because dispatcher was not registered with the Component Manager.');
//                }
//            }
//        }
//    };
//}();
//
//// TESTS
//
//
