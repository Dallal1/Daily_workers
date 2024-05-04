/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/ManagedObject","./Component","./Element","sap/ui/core/mvc/ViewType","sap/ui/core/mvc/XMLProcessingMode","./UIComponentMetadata","./mvc/Controller","./mvc/View","sap/base/util/ObjectPath","sap/base/future","sap/base/Log"],function(t,e,o,n,r,i,s,a,u,c,p){"use strict";var f=e.extend("sap.ui.core.UIComponent",{constructor:function(t,o){var n=false;try{if(typeof t!=="string"){o=t;t=undefined}if(o&&o.hasOwnProperty("_routerHashChanger")){this._oRouterHashChanger=o._routerHashChanger;delete o._routerHashChanger}if(o&&o.hasOwnProperty("_propagateTitle")){this._bRoutingPropagateTitle=o._propagateTitle;delete o._propagateTitle}e.apply(this,arguments);n=true}finally{if(!n){this._destroyCreatedInstances()}}},metadata:{abstract:true,rootView:null,publicMethods:["render"],aggregations:{rootControl:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},designtime:"sap/ui/core/designtime/UIComponent.designtime",routing:{}}},i);f._fnOnInstanceInitialized=null;f._fnOnInstanceDestroy=null;f.prototype.init=function(){var e=this;var o={};var n;if(this.getAutoPrefixId()){o.id=function(t){return e.createId(t)}}function r(t){var o=function(){if(typeof f._fnOnInstanceInitialized==="function"){f._fnOnInstanceInitialized(e)}};var n=function(t){e.setAggregation("rootControl",t)};if(t instanceof Promise){e.pRootControlLoaded=e.pRootControlLoaded.then(function(t){n(t);o();return t})}else if(t instanceof a&&t.oAsyncState&&t.oAsyncState.promise){n(t);e.pRootControlLoaded=e.pRootControlLoaded.then(function(t){o();return t})}else{n(t);o()}}function i(t,o){var n;if(t instanceof Promise){n=e.pRootControlLoaded.then(function(t){return t instanceof a?t.getId():undefined})}else if(t instanceof a){n=t.getId()}if(n){if(o.targetParent===undefined){o.targetParent=n}if(e._oTargets){e._oTargets._setRootViewId(n)}}}function s(t){p.error(`The routing related class '${t}' was loaded synchronously as a result of a synchronous Component creation. Resolving a class in this fashion is deprecated. `+`Please use the asynchronous Component.create() factory instead and ensure all non-default routing relevant classes are maintained in the manifest.json.`)}var u=this._getManifestEntry("/sap.ui5/routing",true)||{},c=u.config||{},g=u.routes;if(this.isA("sap.ui.core.IAsyncContentCreation")){c.async=true}if(g){var d;var h=this._getRouterClassName();if(h){d=l(h)}else{d=sap.ui.require("sap/ui/core/routing/Router");if(!d){d=sap.ui.requireSync("sap/ui/core/routing/Router");s("sap/ui/core/routing/Router")}}this._oRouter=new d(g,c,this,u.targets,this._oRouterHashChanger);this._oTargets=this._oRouter.getTargets();this._oViews=this._oRouter.getViews()}else if(u.targets){var y=sap.ui.require("sap/ui/core/routing/Views");if(!y){y=sap.ui.requireSync("sap/ui/core/routing/Views")}this._oViews=new y({component:this});var C;if(c.targetsClass){C=l(c.targetsClass)}else{C=sap.ui.require("sap/ui/core/routing/Targets");if(!C){C=sap.ui.requireSync("sap/ui/core/routing/Targets");s("sap/ui/core/routing/Targets")}}this._oTargets=new C({targets:u.targets,config:c,views:this._oViews})}this.runAsOwner(function(){t.runWithPreprocessors(function(){n=e.createContent()},o)});if(n instanceof Promise){if(this.isA("sap.ui.core.IAsyncContentCreation")){this.pRootControlLoaded=n}else{throw new Error("Interface 'sap.ui.core.IAsyncContentCreation' must be implemented for component '"+this.getMetadata().getComponentName()+"' when 'createContent' is implemented asynchronously")}}else if(n instanceof a&&n.oAsyncState&&n.oAsyncState.promise){this.pRootControlLoaded=n.loaded()}else{this.pRootControlLoaded=Promise.resolve(n)}i(n,c);r(n)};function l(t){var e;if(typeof t==="string"){e=sap.ui.require(t.replace(/\./g,"/"));if(!e){e=u.get(t);if(e){p.error(`The class '${t}' was accessed via globals. `+"Retrieving routing classes via globals is deprecated and a result of synchronous Component creation, "+"please use the asynchronous sap.ui.core.Component.create() factory instead.")}}if(!e){c.errorThrows("The specified class for router or targets '"+t+"' is undefined.",this)}}else{e=t}return e}f.prototype.rootControlLoaded=function(){if(!this.pRootControlLoaded){c.errorThrows("Mandatory init() not called for UIComponent: '"+this.getManifestObject().getComponentName()+"'. This is likely caused by a missing super call in the component's init implementation.",null,"sap.ui.support",function(){return{type:"missingInitInUIComponent"}})}return this.pRootControlLoaded||Promise.resolve(this.getRootControl())};f.prototype.destroy=function(){if(typeof f._fnOnInstanceDestroy==="function"){f._fnOnInstanceDestroy(this)}this._destroyCreatedInstances();return e.prototype.destroy.apply(this,arguments)};f.prototype._destroyCreatedInstances=function(){if(this._oRouter){this._oRouter.destroy();delete this._oRouter}else{if(this._oTargets){this._oTargets.destroy();this._oTargets=null}if(this._oViews){this._oViews.destroy();this._oViews=null}}};f.getRouterFor=function(t){var o=t;if(o instanceof s){o=o.getView()}if(o instanceof a){var n=e.getOwnerComponentFor(o);if(n){return n.getRouter()}else{return undefined}}};f.prototype.getRouter=function(){return this._oRouter};f.prototype.hasNativeRouter=function(){return this._oRouter===this.getRouter()};f.prototype.getTargets=function(){return this._oTargets};f.prototype.getAutoPrefixId=function(){return!!this.getManifestObject().getEntry("/sap.ui5/autoPrefixId")};f.prototype.byId=function(t){return o.getElementById(this.createId(t))};f.prototype.createId=function(t){if(!this.isPrefixedId(t)){t=this.getId()+"---"+t}return t};f.prototype.getLocalId=function(t){var e=this.getId()+"---";return t&&t.indexOf(e)===0?t.slice(e.length):null};f.prototype.isPrefixedId=function(t){return!!(t&&t.indexOf(this.getId()+"---")===0)};f.prototype.createContent=function(){var t=this._getManifestEntry("/sap.ui5/rootView",true);if(t&&typeof t==="string"){return a._create({viewName:t,type:n.XML})}else if(t&&typeof t==="object"){if(!t.type&&!a._getModuleName(t)){t.type=n.XML}if(t.id){t.id=this.createId(t.id)}if(t.async&&t.type===n.XML){t.processingMode=r.Sequential}if(this.isA("sap.ui.core.IAsyncContentCreation")){return a.create(t)}return a._create(t)}else if(t){throw new Error("Configuration option 'rootView' of component '"+this.getMetadata().getName()+"' is invalid! 'rootView' must be type of string or object!")}return null};f.prototype.getRootControl=function(){return this.getAggregation("rootControl")};f.prototype.render=function(t){var e=this.getRootControl();if(e&&t){t.renderControl(e)}};f.prototype.getUIArea=function(){return this.oContainer?this.oContainer.getUIArea():null};f.prototype.getEventingParent=function(){return this.getUIArea()};f.prototype.setContainer=function(e){this.oContainer=e;if(e){this._applyContextualSettings(e._getContextualSettings())}else{this._oContextualSettings=t._defaultContextualSettings;if(!this._bIsBeingDestroyed){setTimeout(function(){if(!this.oContainer){this._propagateContextualSettings()}}.bind(this),0)}}return this};f.prototype.onBeforeRendering=function(){};f.prototype.onAfterRendering=function(){};f.prototype._getRouterClassName=function(){var t=this._getManifestEntry("/sap.ui5/routing",true)||{},e=t.config||{};return e.routerClass};return f});
//# sourceMappingURL=UIComponent.js.map