/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge"],function(e){"use strict";var a={isKeyUser:false,isKeyUserTranslationEnabled:false,isVariantSharingEnabled:false,isPublicFlVariantEnabled:false,isVariantPersonalizationEnabled:true,isContextSharingEnabled:true,isAtoAvailable:false,isAtoEnabled:false,versioning:{},isProductiveSystem:true,isPublicLayerAvailable:false,isLocalResetEnabled:false,isZeroDowntimeUpgradeRunning:false,isVariantAuthorNameAvailable:false,system:"",client:""};function i(e){var a={};var i=!!e.features.isVersioningEnabled;if(e.layers){e.layers.forEach(function(e){a[e]=i})}return a}return{mergeResults(n){var s=a;n.forEach(function(a){Object.keys(a.features).forEach(function(e){if(e!=="isVersioningEnabled"){s[e]=a.features[e]}});s.versioning=e(s.versioning,i(a));if(a.isContextSharingEnabled!==undefined){s.isContextSharingEnabled=a.isContextSharingEnabled}});return s}}});
//# sourceMappingURL=StorageFeaturesMerger.js.map