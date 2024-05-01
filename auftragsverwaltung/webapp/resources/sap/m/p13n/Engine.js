/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/modules/AdaptationProvider","sap/base/util/merge","sap/base/Log","sap/m/p13n/modification/FlexModificationHandler","sap/m/MessageStrip","sap/ui/core/library","sap/ui/core/Element","sap/ui/core/ElementRegistry","sap/m/p13n/modules/DefaultProviderRegistry","sap/m/p13n/modules/UIManager","sap/m/p13n/modules/StateHandlerRegistry","sap/m/p13n/modules/xConfigAPI","sap/m/p13n/enums/ProcessingStrategy"],(t,e,n,o,r,i,s,a,c,l,g,h,p)=>{"use strict";const f="Engine: This class is a singleton. Please use the getInstance() method instead.";const d=i.MessageType;const y=new WeakMap;let u;const C=t.extend("sap.m.p13n.Engine",{constructor:function(){t.call(this);if(u){throw Error(f)}this._aRegistry=[];this._aStateHandlers=[];this.defaultProviderRegistry=c.getInstance(this);this.uimanager=l.getInstance(this);this.stateHandlerRegistry=g.getInstance()}});C.prototype.register=function(t,e){if(!e.hasOwnProperty("controller")){throw new Error("Please provide at least a configuration 'controller' containing a map of key-value pairs (key + Controller class) in order to register adaptation.")}let n=this._getRegistryEntry(t);if(n){this.deregister(t)}n=this._createRegistryEntry(t,e);const o=Object.keys(e.controller);o.forEach(n=>{const o=e.controller[n];if(!this.getController(t,n)){if(this._aRegistry.indexOf(t.getId())<0){this._aRegistry.push(t.getId())}this.addController(o,n)}});const r=t.getCustomData().find(t=>t.getKey()=="xConfig");if(r&&JSON.parse(r.getValue().replace(/\\/g,""))?.modified){this.fireStateChange(t)}};C.prototype.deregister=function(t){const e=this._getRegistryEntry(t);Object.keys(e.controller).forEach(t=>{const n=e.controller[t];n.destroy();delete e.controller[t]});y.delete(t);const n=this._aRegistry.indexOf(t.getId());this._aRegistry.splice(n,1)};C.prototype.show=function(t,e,n){return this.hasChanges(t,e).catch(t=>false).then(o=>this.uimanager.show(t,e,{...n,enableReset:o}))};C.prototype.attachStateChange=function(t){return this.stateHandlerRegistry.attachChange(t)};C.prototype.detachStateChange=function(t){return this.stateHandlerRegistry.detachChange(t)};C.prototype.hasChanges=function(t,e){const n=this.getController(t,e)?.getChangeOperations();let o;if(n){o=[];Object.values(n).forEach(t=>{if(Array.isArray(t)){o=o.concat(t)}else{o.push(t)}})}let r=[];if(this.getController(t,e)?.getSelectorsForHasChanges){r=r.concat(this.getController(t,e).getSelectorsForHasChanges())}else{r.push(t)}const i=this._determineModification(t);return this.getModificationHandler(t).hasChanges({selector:t,selectors:r,changeTypes:o},i?.payload).then(t=>t)};C.prototype.reset=function(t,e){if(e===undefined){e=this.getRegisteredControllers(t)}e=e instanceof Array?e:[e];let n=[];e.forEach(e=>{n=n.concat(this.getController(t,e).getSelectorForReset())});const o={selectors:n,selector:t};if(e){let n=[];e.forEach(e=>{n=n.concat(Object.values(this.getController(t,e).getChangeOperations()))});o.changeTypes=[].concat(...n)}const r=this._determineModification(t);return r.handler.reset(o,r.payload).then(()=>this.initAdaptation(t,e).then(n=>{e.forEach(e=>{const o=this.getController(t,e);o.update(n)})}))};C.prototype.applyState=function(t,e){return this.retrieveState(t).then(o=>{const r=[];let i=[];let s={};if(t.validateState instanceof Function){s=t.validateState(this.externalizeKeys(t,e))}if(s.validation===d.Error){n.error(s.message)}const a=Object.keys(e);a.forEach(n=>{const o=this.getController(t,n);if(!o){return}const i=this.createChanges({control:t,key:n,state:o.sanityCheck(e[n]),suppressAppliance:true,applyAbsolute:false});r.push(i)});return Promise.all(r).then(e=>{const n={};e.forEach((t,e)=>{if(t&&t.length>0){i=i.concat(t);const o=a[e];n[o]=t}});return this._processChanges(t,n)})})};C.prototype.retrieveState=function(t){return this.checkControlInitialized(t).then(()=>C.getInstance().waitForChanges(t).then(()=>{const n={};C.getInstance().getRegisteredControllers(t).forEach(e=>{n[e]=C.getInstance().getController(t,e).getCurrentState(true)});return e({},n)}))};C.prototype._setModificationHandler=function(t,e){if(!e.isA("sap.m.p13n.modification.ModificationHandler")){throw new Error("Only sap.m.p13n.modification.ModificationHandler derivations are allowed for modification")}const n=this._determineModification(t);n.handler=e;this._getRegistryEntry(t).modification=n};C.prototype._addToQueue=function(t,e){const n=this._getRegistryEntry(t);const o=t=>{if(n.pendingModification===t){n.pendingModification=null}};n.pendingModification=n.pendingModification instanceof Promise?n.pendingModification.then(e):e();n.pendingModification.then(o.bind(null,n.pendingModification));return n.pendingModification};C.prototype.createChanges=function(t){const n=C.getControlInstance(t.control);const o=t.key;const r=t.state;const i=!!t.suppressAppliance;if(!o||!t.control||!r){return Promise.resolve([])}const s=()=>this.initAdaptation(n,o).then(()=>r).then(r=>{const s=this.getController(n,o);const a=s.getChangeOperations();const c=this._getRegistryEntry(n);const l=s.getCurrentState();const g=e(l instanceof Array?[]:{},l);const h=s.getMetadataHelper();const p=h?h:c.helper;const f=p.getProperties().map(t=>({key:t.key,name:t.name}));const d={existingState:t.stateBefore||g,applyAbsolute:t.applyAbsolute,changedState:r,control:s.getAdaptationControl(),changeOperations:a,deltaAttributes:["key"],propertyInfo:f};const y=s.getDelta(d);if(!i){const t={};t[o]=y;return this._processChanges(n,t).then(()=>y)}return y||[]});return this._addToQueue(n,s)};C.prototype.waitForChanges=function(t){const e=this._determineModification(t);const n=this._getRegistryEntry(t);return n&&n.pendingModification?n.pendingModification:Promise.resolve().then(()=>e.handler.waitForChanges({element:t},e.payload))};C.prototype.isModificationSupported=function(t){const e=this._determineModification(t);return e.handler.isModificationSupported({element:t},e.payload)};C.prototype.fireStateChange=function(t){return this.retrieveState(t).then(e=>{this.stateHandlerRegistry.fireChange(t,e)})};C.prototype._processChanges=function(t,e){let n=[];const o=Object.keys(e);const r={};o.forEach(o=>{r[o]=this.getController(t,o).changesToState(e[o]);n=n.concat(e[o])});if(n instanceof Array&&n.length>0){const e=this._determineModification(t);return e.handler.processChanges(n,e.payload)}else{return Promise.resolve([])}};C.prototype.getRTASettingsActionHandler=function(t,e,n){let r;const i=this.hasForReference(t,"sap.m.p13n.PersistenceProvider");if(i.length>0&&!t.isA("sap.ui.mdc.link.Panel")){return Promise.reject("Please do not use a PeristenceProvider in RTA.")}const s=this.getModificationHandler(t);const a=new o;const c=new Promise((t,e)=>{r=t});a.processChanges=t=>{r(t);return Promise.resolve(t)};this._setModificationHandler(t,a);this.uimanager.show(t,n,{showReset:false}).then(t=>{const n=t.getCustomHeader();if(n){n.getContentRight()[0].setVisible(false)}t.addStyleClass(e.styleClass);if(e.fnAfterClose instanceof Function){t.attachAfterClose(e.fnAfterClose)}});c.then(()=>{this._setModificationHandler(t,s);a.destroy()});return c};C.prototype.enhanceXConfig=function(t,e){const n=C.getControlInstance(t);const o=this._getRegistryEntry(t);const r=e&&e.value&&e.value.controllerKey?e.value.controllerKey:undefined;e.currentState=C.getInstance().getController(n,e.changeType,r)?.getCurrentState();return h.enhanceConfig(n,e).then(t=>{if(o){o.xConfig=t}return t})};C.prototype.readXConfig=(t,e)=>{const n=C.getControlInstance(t);return h.readConfig(n,e)||{}};C.prototype.externalizeKeys=function(t,e){const n={};Object.keys(e).forEach(o=>{const r=this.getController(C.getControlInstance(t),o);if(r){n[r.getStateKey()]=e[o]}});return n};C.prototype.internalizeKeys=function(t,e){const n=this.getRegisteredControllers(t),o={};n.forEach(n=>{const r=this.getController(t,n).getStateKey();if(e.hasOwnProperty(r)){o[n]=e[r]}});return o};C.prototype.diffState=function(t,n,o){const r=[],i={};n=e({},n);o=e({},o);Object.keys(o).forEach(e=>{r.push(this.createChanges({control:t,stateBefore:n[e],state:this.getController(t,e).sanityCheck(o[e]),applyAbsolute:p.FullReplace,key:e,suppressAppliance:true}))});return Promise.all(r).then(e=>{Object.keys(o).forEach((r,s)=>{if(o[r]){const a=this.getController(t,r).changesToState(e[s],n[r],o[r]);i[r]=a}});return i})};C.prototype.checkControlInitialized=t=>{const e=C.getControlInstance(t);const n=e.initialized instanceof Function?e.initialized():Promise.resolve();return n||Promise.resolve()};C.prototype.checkPropertyHelperInitialized=t=>{const e=C.getControlInstance(t);return e.initPropertyHelper instanceof Function?e.initPropertyHelper():Promise.resolve()};C.prototype.initAdaptation=function(t,e){this.verifyController(t,e);const n=this._getRegistryEntry(t);const o=C.getControlInstance(t);if(n.helper){return Promise.resolve(n.helper)}return this.checkPropertyHelperInitialized(o).then(t=>{n.helper=t;return t},t=>{throw new Error(t)})};C.prototype.addController=function(t,e,n){const o=this._getRegistryEntry(t.getAdaptationControl(),n);o.controller[e]=t};C.prototype.getController=function(t,e,n){const o=this._getRegistryEntry(t);let r;if(o&&o.controller.hasOwnProperty(e)){r=o.controller[e]}if(r){return r}this.getRegisteredControllers(t).forEach(o=>{const i=this.getController(t,o);if(i){Object.keys(i.getChangeOperations()).forEach(t=>{if(i.getChangeOperations()[t]===e){if(!n||n===i.getPersistenceIdentifier()){r=i}}})}});return r};C.prototype.verifyController=function(t,e){const n=e instanceof Array?e:[e];n.forEach(e=>{if(!this.getController(t,e)){const n=C.getControlInstance(t);throw new Error("No controller registered yet for "+n.getId()+" and key: "+e)}})};C.prototype.getUISettings=function(t,e){const n=Array.isArray(e)?e:[e];this.verifyController(t,n);const o=this._getRegistryEntry(t).helper;const r={},i=[];n.forEach(e=>{const n=this.getController(t,e);const r=n.initAdaptationUI(o);if(r instanceof Promise){i.push(r)}});return Promise.all(i).then(t=>{t.forEach((t,e)=>{const o=n[e];r[o]={panel:t}});return r})};C.prototype.isRegistered=function(t){const e=this._getRegistryEntry(t);return!!e};C.prototype.isRegisteredForModification=function(t){const e=this._getRegistryEntry(t);return e&&!!e.modification};C.prototype.getRegisteredControllers=function(t){const e=this._getRegistryEntry(t);return e?Object.keys(e.controller):[]};C.prototype._getRegistryEntry=t=>{const e=C.getControlInstance(t);return y.get(e)};C.prototype.getModificationHandler=function(t){const e=this._determineModification(t);return e.handler};C.prototype._createRegistryEntry=(t,e)=>{const n=C.getControlInstance(t);if(!y.has(n)){y.set(n,{modification:e&&e.modification?{handler:e.modification,payload:{mode:"Auto",hasVM:true,hasPP:false}}:null,controller:{},activeP13n:null,helper:e&&e.helper?e.helper:null,xConfig:null,pendingAppliance:{}})}return y.get(n)};C.prototype.trace=function(t,e){const n=this._getRegistryEntry(t);this.getRegisteredControllers(t).forEach(o=>{const r=this.getController(t,o);const i=r.getChangeOperations();Object.keys(i).forEach(t=>{if(i[t]===e.changeSpecificData.changeType){n.pendingAppliance[o]=[].concat(n.pendingAppliance[o]||[]).concat(e)}})})};C.prototype.getTrace=function(t,e){const n=this._getRegistryEntry(t);let o;if(n){o=Object.keys(n.pendingAppliance)}return o};C.prototype.clearTrace=function(t,e){const n=this._getRegistryEntry(t);if(n){n.pendingAppliance={}}};C.prototype._determineModification=function(t){const e=this._getRegistryEntry(t);if(e&&e.modification){return e.modification}const n=this.hasForReference(t,"sap.m.p13n.PersistenceProvider").concat(this.hasForReference(t,"sap.ui.mdc.p13n.PersistenceProvider"));const r=this.hasForReference(t,"sap.ui.fl.variants.VariantManagement");const i=n.length?n:undefined;const s=i?i[0].getMode():"Standard";const a={handler:o.getInstance(),payload:{hasVM:r&&r.length>0,hasPP:n&&n.length>0,mode:s}};if(e&&!e.modification){e.modification=a}return a};C.prototype.hasForReference=(t,e)=>{const n=t&&t.getId?t.getId():t;const o=a.filter(t=>{if(!t.isA(e)){return false}const o=t.getFor instanceof Function?t.getFor():[];for(let t=0;t<o.length;t++){if(o[t]===n||u.hasControlAncestorWithId(n,o[t])){return true}}return false});return o};C.prototype.hasControlAncestorWithId=(t,e)=>{let n;if(t===e){return true}n=s.getElementById(t);while(n){if(n.getId()===e){return true}if(typeof n.getParent==="function"){n=n.getParent()}else{return false}}return false};C.getControlInstance=t=>typeof t=="string"?s.getElementById(t):t;C.prototype.hasActiveP13n=function(t){return!!this._getRegistryEntry(t).activeP13n};C.prototype.setActiveP13n=function(t,e,n){this._getRegistryEntry(t).activeP13n=e?{usedControllers:e,modified:n}:null};C.prototype.validateP13n=function(t,e,o){const i=this.getController(t,e);const s=C.getControlInstance(t);const a=this._getRegistryEntry(t).controller;const c={};Object.keys(a).forEach(t=>{c[t]=a[t].getCurrentState()});if(i&&i.model2State instanceof Function){c[e]=i.model2State();let t={validation:d.None};if(s.validateState instanceof Function){t=s.validateState(this.externalizeKeys(s,c),e)}let a;if(t.validation!==d.None){a=new r({type:t.validation,text:t.message})}if(o.setMessageStrip instanceof Function){o.setMessageStrip(a)}else{n.warning("message strip could not be provided - the adaptation UI needs to implement 'setMessageStrip'")}}};C.prototype.handleP13n=function(t,e){const n=[];e.forEach(e=>{const o=this.getController(t,e);const r=o.getP13nData();if(r){const i=this.createChanges({control:t,key:e,state:r,suppressAppliance:true,applyAbsolute:true}).then(t=>o.getBeforeApply().then(e=>{const n=e?e.concat(t):t;return n}));n.push(i)}});return Promise.all(n).then(n=>{let o=[];const r={};n.forEach((t,n)=>{o=o.concat(t);const i=e[n];r[i]=t});if(o.length>0){C.getInstance()._processChanges(t,r)}})};C.getInstance=()=>{if(!u){u=new C}return u};C.prototype._getRegistry=function(){const t={stateHandlerRegistry:this.stateHandlerRegistry,defaultProviderRegistry:this.defaultProviderRegistry,controlRegistry:{}};this._aRegistry.forEach(e=>{const n=s.getElementById(e);t.controlRegistry[e]=y.get(n)});return t};C.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);u=null;this._aRegistry=null;y.delete(this);this.defaultProviderRegistry.destroy();this.defaultProviderRegistry=null;this.stateHandlerRegistry.destroy();this.stateHandlerRegistry=null;this.uimanager.destroy();this.uimanager=null};return C});
//# sourceMappingURL=Engine.js.map