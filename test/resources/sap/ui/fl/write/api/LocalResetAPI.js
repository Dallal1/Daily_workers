/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/write/api/PersistenceWriteAPI","sap/ui/fl/write/api/ChangesWriteAPI","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/Utils","sap/ui/fl/ChangePersistenceFactory","sap/base/util/restricted/_union"],function(e,r,t,n,i,a,u){"use strict";var o={};function c(r,t,n){var i={includeDirtyChanges:true,layer:t};var u=a.getChangePersistenceForControl(r);return u.getAllUIChanges(i).filter(function(r){return r.getState()!==e.LifecycleState.DELETED&&r.getVariantReference()===(n||undefined)})}function s(e){var r=i.getAppComponentForControl(e);var t=[];var a=[];function o(r,n){var i=(n||[]).concat(r);if(r===e||t.includes(r)){t=u(t,i);return true}var c=r.getParent();if(a.includes(r)||!c){a=u(a,i);return false}return o(c,i)}function c(e){return e.getDependentSelectorList().map(function(e){return n.bySelector(e,r)}).filter(Boolean).some(function(e){return o(e)})}return c}o.resetChanges=function(e,a){var u=e.slice().reverse();var o=u.map(function(e){var r=n.bySelector(e.getSelector(),a);return function(){e.setQueuedForRevert();return t.revert({change:e,element:r})}});return r.remove({flexObjects:u,selector:a}).then(i.execPromiseQueueSequentially.bind(i,o))};o.restoreChanges=function(u,o){var c=u.map(function(r){return function(){r.restorePreviousState();var i=n.bySelector(r.getSelector(),o);if(r.getState()===e.LifecycleState.PERSISTED){var u=a.getChangePersistenceForControl(o);var c=u.getDirtyChanges();var s=c.indexOf(r);if(s>=0){c.splice(s,1)}}return t.apply({change:r,element:i,modifier:n})}});r.add({flexObjects:u,selector:o});return i.execPromiseQueueSequentially(c)};o.getNestedUIChangesForControl=function(e,r){var t=c(e,r.layer,r.currentVariant);var n=s(e);return t.filter(n)};o.isResetEnabled=function(e,r){var t=c(e,r.layer,r.currentVariant);var n=s(e);return t.some(n)};return o});
//# sourceMappingURL=LocalResetAPI.js.map