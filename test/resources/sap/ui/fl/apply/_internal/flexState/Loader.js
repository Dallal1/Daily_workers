/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/initial/_internal/Storage","sap/ui/fl/registry/Settings"],function(e,t,n,a){"use strict";function r(e){if(typeof e==="string"){e={id:e}}e.idIsLocal=true;return e}function i(e,t){if(e){[t.changes,t.variantChanges,t.variantDependentControlChanges,t.variantManagementChanges].forEach(function(e){e.forEach(function(e){if(!e.selector.idIsLocal){e.selector=r(e.selector);if(e.dependentSelector){Object.keys(e.dependentSelector).forEach(function(t){if(Array.isArray(e.dependentSelector[t])){e.dependentSelector[t]=e.dependentSelector[t].map(r)}else{e.dependentSelector[t]=r(e.dependentSelector[t])}})}}})})}return t}function s(t){["changes","variantChanges","variantDependentControlChanges","variantManagementChanges"].forEach(function(n){t[n]=t[n].filter(function(t){try{var n=new e(t.fileName)}catch(e){return false}n.destroy();return true})});return t}function o(e){return e&&!!t.getOvpEntry(e)}function c(e){return{changes:e,cacheKey:e.cacheKey}}function l(e){if(e&&e.startupParameters&&Array.isArray(e.startupParameters.hcpApplicationId)){return e.startupParameters.hcpApplicationId[0]}}return{loadFlexData(e){var a=t.getBaseComponentNameFromManifest(e.manifest);if(e.partialFlexData){return n.completeFlexData({reference:e.reference,componentName:a,partialFlexData:e.partialFlexData}).then(c)}var r=e.reInitialize?undefined:t.getCacheKeyFromAsyncHints(e.reference,e.asyncHints);return n.loadFlexData({preview:t.getPreviewSectionFromAsyncHints(e.asyncHints),reference:e.reference,componentName:a,cacheKey:r,siteId:l(e.componentData),appDescriptor:e.manifest.getRawJson?e.manifest.getRawJson():e.manifest,version:e.version,allContexts:e.allContexts,adaptationId:e.adaptationId}).then(s.bind()).then(i.bind(undefined,o(e.manifest))).then(c)},async loadVariantsAuthors(e){const t=await a.getInstance();return t?.isVariantAuthorNameAvailable()?n.loadVariantsAuthors(e):{}}}});
//# sourceMappingURL=Loader.js.map