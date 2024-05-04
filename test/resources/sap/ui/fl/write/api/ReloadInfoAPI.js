/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/initial/_internal/FlexInfoSession","sap/ui/fl/initial/api/Version","sap/ui/fl/write/_internal/flexState/compVariants/CompVariantState","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/write/api/PersistenceWriteAPI","sap/ui/fl/write/api/VersionsAPI","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/registry/Settings","sap/ui/fl/Utils"],function(e,r,t,a,n,i,l,o,s,f,c){"use strict";function u(e,t){if(r.getByReference(t).version){return Promise.resolve(false)}return n.isVersioningEnabled(e.layer).then(function(r){return r&&l.isDraftAvailable({control:e.selector,layer:e.layer})})}function v(e,t){var a=r.getByReference(t);var n=e.layer===o.USER;if(n||a.maxLayer&&a.maxLayer===e.layer){return Promise.resolve(false)}return i.hasHigherLayerChanges({selector:e.selector,ignoreMaxLayerParameter:e.ignoreMaxLayerParameter,upToLayer:e.layer,includeCtrlVariants:e.includeCtrlVariants,includeDirtyChanges:true}).then(function(r){return r||g(e)})}function g(r){if(s.isOverLayer(o.USER,r.layer)){return a.checkSVMControlsForDirty(e.getFlexReferenceForControl(r.selector))}return false}function y(e,t){var a=r.getByReference(t);if(a.initialAllContexts){return false}if(a.allContextsProvided===undefined){var n={selector:e.selector,layer:e.layer};return i.getResetAndPublishInfo(n).then(function(e){if(!a.initialAllContexts){e.initialAllContexts=true}r.setByReference(e,t);return!e.allContextsProvided})}a.initialAllContexts=true;r.setByReference(a,t);return!a.allContextsProvided}function d(e,t){if(!f.getInstanceOrUndef()?.isContextSharingEnabled(t)){return false}return r.getByReference(e).allContextsProvided===false}function h(e){return r.getByReference(e).isEndUserAdaptation===false}var R={getReloadReasonsForStart(r){const t=e.getFlexReferenceForControl(r.selector);return Promise.all([v.call(this,r,t),u(r,t),y(r,t)]).then(function(e){[r.hasHigherLayerChanges,r.isDraftAvailable,r.allContexts]=e;return r})},hasVersionStorage(t,a){const n=e.getFlexReferenceForControl(a);var i=r.getByReference(n);return!!(i.version&&i.version===t.value)},removeInfoSessionStorage(t){const a=e.getFlexReferenceForControl(t);r.removeByReference(a)},hasMaxLayerStorage(t,a){const n=e.getFlexReferenceForControl(a);var i=r.getByReference(n);return!!(i.maxLayer&&i.maxLayer===t.value)},handleReloadInfo(a){const n=e.getFlexReferenceForControl(a.selector);var i=false;var l=r.getByReference(n);if(!a.ignoreMaxLayerParameter&&a.hasHigherLayerChanges){delete l.maxLayer;delete l.adaptationLayer;i=true}if(a.versionSwitch&&l.version!==a.version){l.version=a.version;i=true}if(l.version&&a.removeVersionParameter||l.version===t.Number.Draft&&a.removeDraft){delete l.version;i=true}r.setByReference(l,n);return i},handleReloadInfoOnStart(a){const n=e.getFlexReferenceForControl(a.selector);var i=false;var l=r.getByReference(n);if(a.hasHigherLayerChanges){l.maxLayer=a.layer;i=true}if(a.isDraftAvailable){l.version=t.Number.Draft;i=true}r.setByReference(l,n);return i},initialDraftGotActivated(e){if(e.versioningEnabled){var r=this.hasVersionStorage({value:t.Number.Draft},e.selector);return!l.isDraftAvailable({control:e.selector,layer:e.layer})&&r}return false},getReloadMethod(a){const n=e.getFlexReferenceForControl(a.selector);var i={NOT_NEEDED:"NO_RELOAD",RELOAD_PAGE:"HARD_RELOAD",VIA_HASH:"CROSS_APP_NAVIGATION"};a.reloadMethod=i.NOT_NEEDED;a.isDraftAvailable||=R.hasVersionStorage({value:t.Number.Draft},a.selector);a.isDraftAvailable||=R.hasVersionStorage({value:t.Number.Draft},a.selector);a.hasVersionStorage=!!r.getByReference(n).version;if(a.activeVersion&&a.activeVersion!==t.Number.Original&&a.hasVersionStorage){a.activeVersionNotSelected=!R.hasVersionStorage({value:a.activeVersion},a.selector)}a.hasHigherLayerChanges=R.hasMaxLayerStorage({value:a.layer},a.selector);a.initialDraftGotActivated=R.initialDraftGotActivated(a);if(a.initialDraftGotActivated){a.isDraftAvailable=false}a.allContexts=d(n,a.layer);a.switchEndUserAdaptation=h(n);if(a.changesNeedReload||a.isDraftAvailable||a.hasHigherLayerChanges||a.initialDraftGotActivated||a.activeVersionNotSelected||a.allContexts||a.switchEndUserAdaptation){a.reloadMethod=i.RELOAD_PAGE;if(!a.changesNeedReload&&c.getUshellContainer()){a.reloadMethod=i.VIA_HASH}}r.removeByReference(n);return a}};return R});
//# sourceMappingURL=ReloadInfoAPI.js.map