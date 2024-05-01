/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/BindingMode","sap/ui/model/Context","sap/ui/base/ManagedObject","sap/ui/core/mvc/Controller","sap/base/Log","sap/base/util/each","sap/base/util/isEmptyObject"],function(e,t,r,n,o,a,i){"use strict";return n.extend("sap.uxap.component.ObjectPageLayoutUXDrivenFactory",{connectToComponent:function(r){var n=i(r.getData());r.setDefaultBindingMode(e.OneWay);var a=function(){if(n){r.detachRequestCompleted(a)}var e=new t(r,"/headerTitle"),i=this.getView().byId("ObjectPageLayout");if(e.getProperty("")){try{this.controlFactoryAsync(i.getId(),e).then(function(e){i.setHeaderTitle(e)})}catch(e){o.error("ObjectPageLayoutFactory :: error in header creation from config: "+e)}}}.bind(this);if(n){r.attachRequestCompleted(a)}else{a()}},controlFactory:function(e,t){var n=t.getProperty(""),i,c,u;try{c=sap.ui.requireSync(n.Type.replace(/\./g,"/"));u=c.getMetadata();a(u._mAllEvents,function(e,t){if(typeof n[e]=="string"){n[e]=this.convertEventHandler(n[e])}}.bind(this));i=r.create(n);a(u._mAllProperties,function(e,r){if(n[e]){i.bindProperty(e,"objectPageLayoutMetadata>"+t.getPath()+"/"+e)}})}catch(e){o.error("ObjectPageLayoutFactory :: error in control creation from config: "+e)}return i},controlFactoryAsync:function(e){var t=e.getProperty(""),n,i;var c=new Promise(function(c,u){try{sap.ui.require([t.Type.replace(/\./g,"/")],function(o){i=o.getMetadata();a(i._mAllEvents,function(e){if(typeof t[e]=="string"){t[e]=this.convertEventHandler(t[e])}}.bind(this));n=r.create(t);a(i._mAllProperties,function(r,o){if(t[r]){n.bindProperty(r,"objectPageLayoutMetadata>"+e.getPath()+"/"+r)}});c(n)})}catch(e){o.error("ObjectPageLayoutFactory :: error in control creation from config: "+e);u()}});return c},convertEventHandler:function(e){var t=window,r=e.split(".");try{a(r,function(e,r){t=t[r]})}catch(r){o.error("ObjectPageLayoutFactory :: undefined event handler: "+e+". Did you forget to require its static class?");t=undefined}return t}})});
//# sourceMappingURL=ObjectPageLayoutUXDrivenFactory.controller.js.map