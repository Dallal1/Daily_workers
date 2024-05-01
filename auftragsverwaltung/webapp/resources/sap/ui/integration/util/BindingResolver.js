/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/Log","sap/ui/model/Model","sap/ui/integration/util/BindingHelper","sap/base/util/extend","sap/base/util/isPlainObject"],function(e,r,n,i,t,a){"use strict";var s=e.extend("sap.ui.integration.util.SimpleControl",{metadata:{library:"sap.ui.integration",properties:{resolved:{type:"any"}}}});var o=new s;var u={};function l(e,n,t,s,o,u){if(s===o){r.warning("BindingResolver maximum level processing reached. Please check for circular dependencies.");return e}if(Array.isArray(e)){return e.map(function(e){return l(e,n,t,s+1,o,u)})}if(e&&a(e)&&!i.isBindingInfo(e)){var f={};for(var p in e){f[p]=l(e[p],n,t,s+1,o,u)}return f}if(typeof e==="string"&&!u){return d(e,n,t)}if(typeof e==="object"&&i.isBindingInfo(e)){return d(e,n,t)}return e}function d(r,a,s){if(!r){return r}var u=typeof r==="string"?e.bindingParser(r):t({},r);if(!u){return r}if(!s){s="/"}o.unbindProperty("resolved");o.unbindObject();o.setModel(null);if(a instanceof n){o.setModel(a)}else{i.propagateModels(a,o)}o.bindObject(s);o.bindProperty("resolved",u);var l=o.getResolved();return l}u.resolveValue=function(e,r,n,i){var t=0,a=30;if(r){return l(e,r,n,t,a,i)}else{return e}};return u});
//# sourceMappingURL=BindingResolver.js.map