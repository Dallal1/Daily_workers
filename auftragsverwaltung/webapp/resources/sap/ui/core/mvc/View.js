/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/future","sap/base/Log","sap/base/util/extend","sap/base/util/isEmptyObject","sap/base/util/merge","sap/ui/base/ManagedObject","sap/ui/core/Control","sap/ui/base/DesignTime","sap/ui/core/Element","./Controller","./ViewRenderer","./ViewType","./XMLProcessingMode"],function(e,t,r,o,n,i,s,a,c,p,u,f,l,d){"use strict";var g=a.extend("sap.ui.core.mvc.View",{metadata:{interfaces:["sap.ui.core.IDScope"],abstract:true,library:"sap.ui.core",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},viewName:{type:"string",group:"Misc",defaultValue:null},displayBlock:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{afterInit:{},beforeExit:{},afterRendering:{},beforeRendering:{}},specialSettings:{controller:"sap.ui.core.mvc.Controller",controllerName:"string",preprocessors:"Object",resourceBundleName:"string",resourceBundleUrl:"sap.ui.core.URI",resourceBundleLocale:"string",resourceBundleAlias:"string",type:"string",definition:"any",viewContent:{type:"any",deprecated:true},viewData:"any",async:{type:"boolean",defaultValue:false}},designtime:"sap/ui/core/designtime/mvc/View.designtime"},renderer:f});g._mPreprocessors={};function m(e){e._settings={};for(var t in e){if(t.indexOf("_")!==0){e._settings[t]=e[t]}}}function h(e,t){var r;if(typeof e.preprocessor==="string"){var o=e.preprocessor.replace(/\./g,"/");if(t){return new Promise(function(e,t){sap.ui.require([o],function(t){e(t)},t)})}else{return sap.ui.requireSync(o)}}else if(typeof e.preprocessor==="function"&&!e.preprocessor.process){r={process:e.preprocessor}}else{r=e.preprocessor}if(t){return Promise.resolve(r)}else{return r}}function y(e,t){var r=this.mPreprocessors[t]||[],n=[],i,s,a,c=[];if(g._mPreprocessors[e]&&g._mPreprocessors[e][t]){n=g._mPreprocessors[e][t].map(function(e){return Object.assign({},e)})}for(i=0,s=n.length;i<s;i++){if(n[i]._onDemand){a=n[i]}else{c.push(n[i])}}for(i=0,s=r.length;i<s;i++){var p=!r[i].preprocessor;if(p&&a){c.unshift(o(r[i],a))}else if(!p){c.push(r[i])}}return c}function w(e,t){var r=e.getMetadata().getClass();function o(e){e.preprocessor=h(e,t.async)}e.mPreprocessors=Object.assign({},t.preprocessors);for(var n in r.PreprocessorType){var i=r.PreprocessorType[n];if(e.mPreprocessors[i]&&!Array.isArray(e.mPreprocessors[i])){e.mPreprocessors[i]=[e.mPreprocessors[i]]}else if(!e.mPreprocessors[i]){e.mPreprocessors[i]=[]}e.mPreprocessors[i].forEach(m);e.mPreprocessors[i]=y.call(e,r._sType,i);e.mPreprocessors[i].forEach(o)}}function v(e){e.oAsyncState={};e.oAsyncState.promise=null}var P=function(e,t){var r=t.async;var o=function(t){e.oController=t;t.oView=e};if(!c.isControllerCodeDeactivated()){var n=t.controller,i=n&&typeof n.getMetadata==="function"&&n.getMetadata().getName();if(!n&&e.getControllerName){e.bControllerIsViewManaged=true;var a=e.getControllerName();if(a){var p=sap.ui.require("sap/ui/core/Component");if(p){var f=p.getCustomizing(e,{type:"sap.ui.controllerReplacements",name:a});if(f){a=typeof f==="string"?f:f.controllerName}}if(r){n=u.create({name:a,_viewId:e.sId})}else{n=sap.ui.controller(a,true,false,e.sId)}}}else if(n){e.bControllerIsViewManaged=false;var l=s._sOwnerId;if(!n._isExtended()){n=u.applyExtensions(n,i,l,e.sId,r)}else if(r){n=Promise.resolve(n)}}if(n){if(r){if(!e.oAsyncState){throw new Error("The view "+e.sViewName+" runs in sync mode and therefore cannot use async controller extensions!")}return n.then(o)}else{o(n)}}}else if(r){const e=Object.assign(new u,{"_sap.ui.core.mvc.EmptyControllerImpl":true});return Promise.resolve(e).then(o)}else{sap.ui.controller("sap.ui.core.mvc.EmptyControllerImpl",{"_sap.ui.core.mvc.EmptyControllerImpl":true});e.oController=sap.ui.controller("sap.ui.core.mvc.EmptyControllerImpl")}};g.prototype._initCompositeSupport=function(i){i=i||{};e(!i.preprocessors||this.getMetadata().getName().indexOf("XMLView"),"Preprocessors only available for XMLView");this.oViewData=i.viewData;this.sViewName=i.viewName;if(this.sViewName&&this.sViewName.startsWith("module:")){this.sViewName=this.sViewName.slice("module:".length).replace(/\//g,".")}var s=this;w(this,i);if(i.async){v(this)}var a=sap.ui.require("sap/ui/core/Component");if(a){var c=a.getCustomizing(this,{type:"sap.ui.viewModifications",name:this.sViewName});if(!n(c)){this._fnSettingsPreprocessor=function(e){var n=this.getId();if(n){if(s.isPrefixedId(n)){n=n.substring((s.getId()+"--").length)}var i=Object.assign({},c[n]);if(i){for(var a in i){if(a!=="visible"){t.warningThrows("Customizing: custom value for property '"+a+"' of control '"+n+"' in View '"+s.sViewName+"' ignored: only the 'visible' property can be customized.");delete i[a]}}r.info("Customizing: custom value for property 'visible' of control '"+n+"' in View '"+s.sViewName+"' applied: "+i.visible);e=o(e,i)}}}}}var p=function(t,r){e(typeof t==="function","fn must be a function");var o=a&&a.getOwnerComponentFor(s);if(o){if(r){s.fnScopedRunWithOwner=s.fnScopedRunWithOwner||function(e){return o.runAsOwner(e)}}return o.runAsOwner(t)}return t()};var u=function(e){if(e.oController&&e.oController.connectToView){return e.oController.connectToView(e)}};var f=function(e){if(s.onControllerConnected){return s.onControllerConnected(s.oController,e)}};if(i.async){this.oAsyncState.promise=this.initViewSettings(i).then(function(){return p(P.bind(null,s,i),true)}).then(function(){return p(f.bind(null,i),true)}).then(function(){return u(s)}).then(function(){return s.runPreprocessor("controls",s,false)}).then(function(){return p(s.fireAfterInit.bind(s),true)}).then(function(){return s}).catch(function(e){this.deregister();throw e}.bind(this))}else{this.initViewSettings(i);P(this,i);f(i);u(this);this.runPreprocessor("controls",this,true);this.fireAfterInit()}};g.prototype.getController=function(){return this.oController};g.prototype.byId=function(e){return p.getElementById(this.createId(e))};g.prototype.createId=function(e){if(!this.isPrefixedId(e)){e=this.getId()+"--"+e}return e};g.prototype.getLocalId=function(e){var t=this.getId()+"--";return e&&e.indexOf(t)===0?e.slice(t.length):null};g.prototype.isPrefixedId=function(e){return!!(e&&e.indexOf(this.getId()+"--")===0)};g.prototype.getViewData=function(){return this.oViewData};function C(){this.oAsyncState=null}g.prototype.exit=function(){this.fireBeforeExit();if(this.oController&&this.bControllerIsViewManaged){this.oController.destroy();delete this.oController}delete this.oPreprocessorInfo;if(this.oAsyncState){var e=C.bind(this);this.oAsyncState.promise.then(e,e)}};g.prototype.onAfterRendering=function(){this.fireAfterRendering()};g.prototype.onBeforeRendering=function(){this.fireBeforeRendering()};g.prototype.clone=function(e,r){t.errorThrows("Cloning a View and/or using a View as a binding template is deprecated. Please call the corresponding View factory instead, e.g. XMLView.create()");var o={},n,i;for(n in this.mProperties&&!(this.isBound&&this.isBound(n))){if(this.mProperties.hasOwnProperty(n)){o[n]=this.mProperties[n]}}i=a.prototype.clone.call(this,e,r,{cloneChildren:false,cloneBindings:true});var s,c,p;for(s in i.mEventRegistry){c=i.mEventRegistry[s];for(p=c.length-1;p>=0;p--){if(c[p].oListener===this.getController()){c[p]={oListener:i.getController(),fFunction:c[p].fFunction,oData:c[p].oData}}}}i.applySettings(o);return i};g.prototype.getPreprocessors=function(){return this.mPreprocessors};g.prototype.getPreprocessorInfo=function(e){if(!this.oPreprocessorInfo){this.oPreprocessorInfo={name:this.sViewName,componentId:this._sOwnerId,id:this.getId(),caller:this+" ("+this.sViewName+")",sync:!!e}}if(g._supportInfo){this.oPreprocessorInfo._supportInfo=g._supportInfo}return this.oPreprocessorInfo};g.prototype.runPreprocessor=function(e,t,o){var n=this.getPreprocessorInfo(o),i=this.mPreprocessors&&this.mPreprocessors[e]||[],s,a,c;if(!o){a=function(e,t){return function(r){return t.preprocessor.then(function(o){return o.process(r,e,t._settings)})}};c=Promise.resolve(t)}for(var p=0,u=i.length;p<u;p++){if(o&&i[p]._syncSupport===true){s=i[p].preprocessor.process;t=s(t,n,i[p]._settings)}else if(!o){c=c.then(a(n,i[p]))}else{r.debug('Async "'+e+'"-preprocessor was skipped in sync view execution for '+this.getMetadata().getClass()._sType+"View",this.getId())}}return o?t:c};function V(e,t){if(!g._mPreprocessors[t]){g._mPreprocessors[t]={}}if(!g._mPreprocessors[t][e]){g._mPreprocessors[t][e]=[]}}function b(e,t){return g._mPreprocessors[e][t].some(function(e){return!!e._onDemand})}g.registerPreprocessor=function(e,o,n,i,s,a){if(typeof s!=="boolean"){a=s;s=false}if(o){V(e,n);if(s&&b(n,e)){t.errorThrows('Registration for "'+e+'" failed, only one on-demand-preprocessor allowed',this.getMetadata().getName());return}g._mPreprocessors[n][e].push({preprocessor:o,_onDemand:s,_syncSupport:i,_settings:a});r.debug("Registered "+(s?"on-demand-":"")+'preprocessor for "'+e+'"'+(i?" with syncSupport":""),this.getMetadata().getName())}else{t.errorThrows('Registration for "'+e+'" failed, no preprocessor specified',this.getMetadata().getName())}};g.prototype.hasPreprocessor=function(e){return!!this.mPreprocessors[e].length};g.create=function(e){var t=i({},e);t.async=true;t.viewContent=t.definition;var r=sap.ui.require("sap/ui/core/Component");var o;if(r&&s._sOwnerId){o=r.getComponentById(s._sOwnerId)}function n(){return I(t.id,t,t.type).loaded()}return new Promise(function(e,r){var o=g._getViewClassName(t);sap.ui.require([o],function(t){e(t)},r)}).then(function(e){if(e.getMetadata().isA("sap.ui.core.mvc.XMLView")){t.processingMode=d.Sequential}if(o){return o.runAsOwner(n)}else{return n()}})};g._create=I;sap.ui.view=function(e,t,o){var n=typeof e==="string"?e:t;n=typeof n==="object"?n.viewName:n;r.warning("Do not use deprecated view factory functions (View: "+n+"). "+"Use the static create function on the view module instead: [XML|HTML|JSON]View.create().","sap.ui.view",null,function(){return{type:"sap.ui.view",name:n}});return I(e,t,o)};function I(t,n,i){var a=null,c={};if(typeof t==="object"||typeof t==="string"&&n===undefined){n=t;t=undefined}if(n){if(typeof n==="string"){c.viewName=n}else{c=n}}e(!c.async||typeof c.async==="boolean","sap.ui.view factory: Special setting async has to be of the type 'boolean'!");if(t){c.id=t}if(i){c.type=i}if(c.type===l.XML&&c.async){c.processingMode=c.processingMode||d.SequentialLegacy}var p=sap.ui.require("sap/ui/core/Component");if(p&&s._sOwnerId){var u=p.getCustomizing(s._sOwnerId,{type:"sap.ui.viewReplacements",name:c.viewName});if(u){delete u.async;r.info("Customizing: View replacement for view '"+c.viewName+"' found and applied: "+u.viewName+" (type: "+u.type+")");o(c,u)}else{r.debug("Customizing: no View replacement found for view '"+c.viewName+"'.")}}var f=g._getViewClassName(c);a=_(f,c);return a}g._getViewClassName=function(e,t){var o=g._getModuleName(e);if(o){if(e.type&&!t){r.error("When using the view factory, the 'type' setting must be omitted for typed views. When embedding typed views in XML, don't use the <JSView> tag, use the <View> tag instead.")}return o}if(!e.type){throw new Error("No view type specified.")}if(e.type===l.XML){return"sap/ui/core/mvc/XMLView"}if(e.type===l.JS){o="sap/ui/core/mvc/JSView"}else if(e.type===l.JSON){o="sap/ui/core/mvc/JSONView"}else if(e.type===l.HTML){o="sap/ui/core/mvc/HTMLView"}else if(e.type===l.Template){o="sap/ui/core/mvc/TemplateView"}if(!o){throw new Error("Unknown view type "+e.type+" specified.")}return o};function _(e,t){var o=sap.ui.require(e);if(!o){o=sap.ui.requireSync(e);if(t.async){r.warning("sap.ui.view was called without requiring the according view class.")}}return new o(t)}g.prototype.loaded=function(){if(this.oAsyncState&&this.oAsyncState.promise){return this.oAsyncState.promise}else{return Promise.resolve(this)}};g._getModuleName=function(e){var t;if(e.viewName&&e.viewName.startsWith("module:")){t=e.viewName.slice("module:".length)}return t};g.prototype.getAutoPrefixId=function(){return false};g.prototype.onControllerConnected=function(e,t){if(!this.createContent&&typeof this.createContent!=="function"){return}var r={id:this.getAutoPrefixId()?this.createId.bind(this):undefined,settings:this._fnSettingsPreprocessor};return s.runWithPreprocessors(function(){var r=this.createContent(e);if(t.async){r=Promise.resolve(r);return r.then(function(e){this.applySettings({content:e})}.bind(this))}else if(r instanceof Promise){throw new Error("An asynchronous view (createContent) cannot be instantiated synchronously. Affected view: '"+this.getMetadata().getName()+"'.")}else{this.applySettings({content:r})}}.bind(this),r)};g.prototype.initViewSettings=function(e){if(!this.getMetadata()._oRenderer){this.getMetadata().getRenderer=function(){return g.getMetadata().getRenderer()};this.getMetadata().getRendererName=function(){return g.getMetadata().getRendererName()}}if(e.async){return Promise.resolve()}};return g});
//# sourceMappingURL=View.js.map