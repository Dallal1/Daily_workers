/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_omit","sap/base/util/restricted/_pick","sap/base/util/ObjectPath","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/apply/_internal/flexState/changes/DependencyHandler","sap/ui/fl/apply/_internal/flexState/DataSelector","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/LayerUtils","sap/ui/fl/Utils"],function(e,t,n,r,a,i,c,f,s,o,l){"use strict";var u={};var g={};function v(e,t,r){var i=s.getComponentData(e);var c=n.get(["technicalParameters",a.VARIANT_TECHNICAL_PARAMETER],i)||[];var f=r.filter(e=>e.visible).map(e=>e.key);var o=f.find(e=>c.includes(e));if(o){return o}return t.reverse().map(e=>e.getContent().defaultVariant).find(e=>f.includes(e))}function d(e,t,n){var r=(g[t]||{})[n];return{defaultVariant:n,currentVariant:r,variants:[],variantManagementChanges:e.filter(function(e){return e.getFileType()==="ctrl_variant_management_change"&&e.getSelector().id===n})}}function p(e,t){return e.find(e=>e.getId()===t)}function h(e,t){const n=[];let r=t;let a;do{a=p(e,r.getVariantReference());if(a){n.push(r);r=a}}while(a);return n.map(e=>e.getId())}function m(e,t){return{instance:t,variantChanges:e.filter(function(e){return e.getFileType()==="ctrl_variant_change"&&e.getSelector().id===t.getId()}),controlChanges:e.filter(function(n){var r=n.isA("sap.ui.fl.apply._internal.flexObjects.UIChange");if(!r){return false}var a=n.getVariantReference()===t.getId();var i=h(e,t);var c=i.indexOf(n.getVariantReference())>-1;var f=o.compareAgainstCurrentLayer(n.getLayer(),t.getLayer())===-1;return a||c&&f}),key:t.getId(),title:t.getName(),layer:t.getLayer(),favorite:t.getFavorite(),executeOnSelect:t.getExecuteOnSelection(),visible:t.getVisible(),author:t.getAuthor(),contexts:t.getContexts(),isStandardVariant:t.getStandardVariant()}}function y(e,t){switch(t.getChangeType()){case"setTitle":e.title=t.getText("title");break;case"setFavorite":e.favorite=t.getContent().favorite;break;case"setExecuteOnSelect":e.executeOnSelect=t.getContent().executeOnSelect;break;case"setVisible":e.visible=t.getContent().visible;break;case"setContexts":e.contexts=t.getContent().contexts;break;default:throw Error("Unknown ctrl_variant_change type")}}function V(e,t){var n=t.getContent().defaultVariant;e.variants.forEach(t=>{if(t.key===n&&t.visible){e.defaultVariant=n}})}function b(e){const t=e[0]?.getFlexObjectMetadata().reference;const r=e.filter(e=>e.getFileType()==="ctrl_variant");const a={};r.forEach(n=>{var r=n.getVariantManagementReference();a[r]||=d(e,t,r);a[r].variants.push(m(e,n))});e.filter(e=>e.getFileType()==="ctrl_variant_change").forEach(e=>{const n=C(a,e);if(n){y(n,e,t,a)}});const i=e.filter(e=>e.getFileType()==="ctrl_variant_management_change");i.forEach(e=>{const t=a[e.getSelector().id];if(t){V(t,e)}});Object.keys(a).forEach(e=>{const r=a[e];if(!r.currentVariant||!r.variants.some(e=>e.key===r.currentVariant)){const a=v(t,i,r.variants)||e;r.currentVariant=a;n.set([t,e],a,g)}r.variants.sort((e,t)=>{if(e.isStandardVariant){return-1}if(t.isStandardVariant){return 1}return e.title.toLowerCase()<t.title.toLowerCase()?-1:1});var c=r.variants.find(e=>e.key===r.currentVariant).controlChanges;r.modified=c.some(e=>!e.isPersisted()&&!e.getSavedToVariant());r.variants.some(e=>{if(!e.favorite&&e.key===r.defaultVariant){e.favorite=true;return true}return false})});return a}function C(e,t){var n;Object.values(e).some(function(e){return e.variants.some(function(e){if(t.getSelector().id===e.key){n=e;return true}return false})});return n}var R=new c({id:"variantManagementMap",parentDataSelector:s.getFlexObjectsDataSelector(),executeFunction:b,checkInvalidation(e,t){if(t.type==="switchVariant"){return true}const n=["addFlexObject","updateFlexObject","removeFlexObject"];const r=n.includes(t.type);const a=["ctrl_variant","ctrl_variant_change","ctrl_variant_management_change"];const i=a.includes(t.updatedObject?.getFileType?.());const c=t.updatedObject?.getVariantReference?.();return r&&(i||c)}});var O=new c({id:"variantManagements",parameterKey:"variantManagementReference",parentDataSelector:R,executeFunction(e,t){return e[t.variantManagementReference]}});var S=new c({id:"variants",parameterKey:"variantReference",parentDataSelector:O,executeFunction(e,t){return e.variants.find(e=>e.instance.getId()===t.variantReference)}});const _=new c({id:"vmDependentDependencyMap",parentDataSelector:R,executeFunction(e,t){let n=[];Object.entries(e).forEach(([e,r])=>{n=n.concat(u.getControlChangesForVariant({vmReference:e,vReference:r.currentVariant,reference:t.reference}))});const r=i.createEmptyDependencyMap();const a=s.getComponentIdForReference(t.reference);n.forEach(e=>{i.addChangeAndUpdateDependencies(e,a,r)});return r},checkInvalidation(e,t){if(t.type==="switchVariant"){return true}const n=["addFlexObject","removeFlexObject"].includes(t.type);const r=t.updatedObject.getFileType()==="change";const a=Object.values(g[e.reference]||{});return r&&n&&a.includes(t.updatedObject.getVariantReference())}});var x=new c({id:"variantDependentFlexObjects",parentDataSelector:s.getFlexObjectsDataSelector(),executeFunction(e){return e.filter(function(e){const t=e.getVariantReference?.();const n=["ctrl_variant","ctrl_variant_change","ctrl_variant_management_change"].indexOf(e.getFileType())>-1;return n||t})}});u.getDependencyMap=function(e){return _.get({reference:e})};u.getVariantDependentFlexObjects=function(e){return x.get({reference:e})};u.resetCurrentVariantReference=function(e){delete g[e];R.checkUpdate({reference:e})};u.getVariantManagementMap=function(){return R};u.addRuntimeSteadyObject=function(e,t,n){s.addRuntimeSteadyObject(e,t,n)};u.clearRuntimeSteadyObjects=function(e,t){s.clearRuntimeSteadyObjects(e,t)};u.getControlChangesForVariant=function(e){var t=[];var n=u.getVariant(e);if(n){t=n.controlChanges.filter(function(t){return e.includeDirtyChanges!==false||t.getState()===f.LifecycleState.PERSISTED})}return t};u.getVariantChangesForVariant=function(e){var t=u.getVariant(e);return t&&t.variantChanges||{}};u.getVariant=function(e){var t=e.vReference||O.get({variantManagementReference:e.vmReference,reference:e.reference}).defaultVariant;return S.get({variantManagementReference:e.vmReference,variantReference:t,reference:e.reference})};u.getCurrentVariantReference=function(e){var t=O.get({variantManagementReference:e.vmReference,reference:e.reference});return t.currentVariant};u.getVariantManagementReferences=function(e){var t=R.get({reference:e});return Object.keys(t)};u.getAllVariants=function(e){var t=R.get({reference:e});return Object.keys(t).reduce(function(e,n){return e.concat(t[n].variants)},[])};u.getInitialChanges=function(e){var t=R.get({reference:e.reference});return Object.keys(t).reduce(function(n,r){if(e.vmReference&&e.vmReference===r||!e.vmReference){var a=Object.assign({},e,{vmReference:r,vReference:t[r].currentVariant,includeDirtyChanges:false});return n.concat(u.getControlChangesForVariant(a))}return n},[])};u.filterHiddenFlexObjects=function(e,t){const n=R.get({reference:t});const r=[];Object.values(n).forEach(e=>{e.variants.forEach(e=>{if(e.visible===false){r.push(e.key)}})});return e.filter(e=>{const t={ctrl_variant:()=>e.getVariantId(),ctrl_variant_change:()=>e.getSelector().id,change:()=>e.getVariantReference()}[e.getFileType()]?.();return!r.includes(t)})};u.setCurrentVariant=function(e){n.set([e.reference,e.vmReference],e.newVReference,g);R.checkUpdate({reference:e.reference},[{type:"switchVariant"}])};u.waitForInitialVariantChanges=function(e){var t=u.getInitialChanges({vmReference:e.vmReference,reference:e.reference});var n=t.reduce(function(t,n){var a=n.getSelector();var i=r.bySelector(a,e.appComponent);if(i&&l.indexOfObject(t,{selector:i})===-1){t.push({selector:i})}return t},[]);return n.length?e.flexController.waitForChangesToBeApplied(n):Promise.resolve()};return u});
//# sourceMappingURL=VariantManagementState.js.map