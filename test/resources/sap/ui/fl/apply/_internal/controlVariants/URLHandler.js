/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Component","sap/base/Log","sap/base/util/deepEqual","sap/base/util/merge","sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/ui/base/ManagedObjectObserver","sap/ui/thirdparty/hasher","sap/ui/fl/apply/_internal/controlVariants/Utils"],function(e,a,r,t,n,o,i,s,l){"use strict";var m={};var p={};function c(e,a){var r=[];return e.reduce(function(e,t){var n=a.getVariantManagementReference(t).variantManagementReference;if(n){if(r.includes(n)){e.updateRequired=true;return e}r.push(n)}if(n&&a.oData[n].currentVariant!==t){e.updateRequired=true;if(a.oData[n].currentVariant!==a.oData[n].defaultVariant){e.parameters.push(a.oData[n].currentVariant)}}else{e.parameters.push(t)}return e},{updateRequired:false,parameters:[]})}function d(e,a){var r=n.get(["params",l.VARIANT_TECHNICAL_PARAMETER],e);if(r){var t=c(r,a);if(t.updateRequired){p.update({updateURL:!a._bDesignTimeMode,parameters:t.parameters,updateHashEntry:true,model:a})}}}function u(e,r){try{var t=e.getUShellService("URLParsing");if(t){var n=t.parseShellHash(r);d(n,e)}}catch(e){a.error(e.message)}var o=e.getUShellService("ShellNavigation");return o&&o.NavigationFilterStatus.Continue}function f(e){var a=e.getUShellService("ShellNavigation");if(!m[e.sFlexReference]){m[e.sFlexReference]=u.bind(null,e);if(a){a.registerNavigationFilter(m[e.sFlexReference])}}}function v(e){var a=e.getUShellService("ShellNavigation");if(a){a.unregisterNavigationFilter(m[e.sFlexReference]);delete m[e.sFlexReference]}}function A(e){var t=e.model;var n=t.getUShellService("URLParsing");var o=t.getUShellService("Navigation");var i=n&&n.parseShellHash(s.getHash());if(i&&i.params){var m=Object.assign({},i.params);var p=t.oAppComponent&&t.oAppComponent.getComponentData&&t.oAppComponent.getComponentData()&&t.oAppComponent.getComponentData().technicalParameters;if(!p){a.warning("Component instance not provided, so technical parameters in component data and browser history remain unchanged")}if(e.parameters.length===0){delete i.params[l.VARIANT_TECHNICAL_PARAMETER];p&&delete p[l.VARIANT_TECHNICAL_PARAMETER]}else{i.params[l.VARIANT_TECHNICAL_PARAMETER]=e.parameters;p&&(p[l.VARIANT_TECHNICAL_PARAMETER]=e.parameters)}if(e.silent){s.changed.active=false;s.replaceHash(n.constructShellHash(i));s.changed.active=true}else if(!r(m,i.params)){o.navigate({target:{semanticObject:i.semanticObject,action:i.action,context:i.contextRaw},params:i.params,appSpecificRoute:i.appSpecificRoute,writeHistory:false})}}}function h(e){var a={index:-1};var r=e.model;var n=r.getUShellService("URLParsing");var i=n&&n.parseShellHash(s.getHash()).params;if(i){a.parameters=[];if(r._bDesignTimeMode){i[l.VARIANT_TECHNICAL_PARAMETER]=p.getStoredHashParams(e)}if(Array.isArray(i[l.VARIANT_TECHNICAL_PARAMETER])){i[l.VARIANT_TECHNICAL_PARAMETER]=i[l.VARIANT_TECHNICAL_PARAMETER].map(decodeURIComponent);i[l.VARIANT_TECHNICAL_PARAMETER].some(function(t,n){if(!o(r.getVariant(t,e.vmReference))){a.index=n;return true}return false})}}return t(a,i&&i[l.VARIANT_TECHNICAL_PARAMETER]&&{parameters:i[l.VARIANT_TECHNICAL_PARAMETER]})}function R(e){var a=e.getUShellService("URLParsing");var r=a&&a.parseShellHash(s.getHash());return r&&r.params&&r.params[l.VARIANT_TECHNICAL_PARAMETER]}p.variantTechnicalParameterName="sap-ui-fl-control-variant-id";p.initialize=function(e){var a=e.model;var r=a.getUShellService("URLParsing");var t=r&&r.parseShellHash(s.getHash());var n=t&&t.params&&t.params[l.VARIANT_TECHNICAL_PARAMETER];p.attachHandlers(e);p.update({model:a,parameters:n,updateHashEntry:Array.isArray(n)&&n.length>0});d(t,a)};p.updateVariantInURL=function(e){var a=p.removeURLParameterForVariantManagement(e);if(!a.parameters){return}var r=a.parameters||[];var t=a.index;var n=e.newVReference===e.model.oData[e.vmReference].defaultVariant;if(!n){if(t===-1){r=r.concat([e.newVReference])}else{r=r.slice(0,t).concat([e.newVReference],r.slice(t))}}if(!n||t>-1){p.update({parameters:r,updateURL:!e.model._bDesignTimeMode,updateHashEntry:true,model:e.model})}};p.removeURLParameterForVariantManagement=function(e){var a=h(e);if(a.index>-1){a.parameters.splice(a.index,1)}return a};p.attachHandlers=function(a){function r(){return a.model._oVariantSwitchPromise.then(function(){a.model._oHashData.controlPropertyObservers.forEach(function(e){e.destroy()});v(a.model);a.model.destroy();a.model.oComponentDestroyObserver.unobserve(a.model.oAppComponent,{destroy:true});a.model.oComponentDestroyObserver.destroy()})}f(a.model);if(!a.model.oComponentDestroyObserver&&a.model.oAppComponent instanceof e){a.model.oComponentDestroyObserver=new i(r.bind(null));a.model.oComponentDestroyObserver.observe(a.model.oAppComponent,{destroy:true})}};p.registerControl=function(e){if(e.updateURL){e.model._oHashData.variantControlIds.push(e.vmReference)}};p.update=function(e){e.model._oHashData||={hashParams:[],controlPropertyObservers:[],variantControlIds:[]};if(!e||!Array.isArray(e.parameters)){a.info("Variant URL parameters could not be updated since invalid parameters were received");return}if(e.updateURL){A(e)}if(e.updateHashEntry&&!o(e.model)){e.model._oHashData.hashParams=e.parameters}};p.getStoredHashParams=function(e){return Array.prototype.slice.call(e.model._oHashData.hashParams)};p.handleModelContextChange=function(e){var a="modelContextChange";function r(a,r){var t=r.model.getVariantManagementReferenceForControl(a.getSource());var n=r.model._oHashData.variantControlIds;var o=n.indexOf(t);if(o>-1){n.slice(o).forEach(function(a){if(h({vmReference:a,model:e.model}).index===-1){r.model.switchToDefaultForVariantManagement(a)}})}}var t=new i(function(t){if(t.current===true&&t.old===false){t.object.attachEvent(a,{model:e.model},r)}else if(t.current===false&&t.old===true){t.object.detachEvent(a,r)}});t.observe(e.vmControl,{properties:["resetOnContextChange"]});e.model._oHashData.controlPropertyObservers.push(t);if(e.vmControl.getResetOnContextChange()!==false){e.vmControl.attachEvent(a,{model:e.model},r)}};p.clearAllVariantURLParameters=function(e){if(R(e.model)){p.update({updateURL:true,parameters:[],updateHashEntry:false,model:e.model})}};return p});
//# sourceMappingURL=URLHandler.js.map