/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger","sap/ui/fl/apply/_internal/flexState/compVariants/Utils","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/LayerUtils","sap/ui/fl/Utils"],function(t,a,e,n,r,i){"use strict";function o(t){const r=n.getFlexReferenceForControl(t);const i=a.getPersistencyKey(t);const o=e.getCompVariantsMap(r);return o._getOrCreate(i)}function s(t){var r=t.control;var o=r.getVariantManagement?.()||r;var s=o.getId();var l=n.getFlexReferenceForControl(r);return e.initialize({reference:l,componentData:{},manifest:i.getAppDescriptor(r),componentId:i.getAppComponentForControl(r).getId()}).then(function(){var n=a.getPersistencyKey(r);var i=e.getCompVariantsMap(l);e.setInitialNonFlCompVariantData(l,n,t.standardVariant,t.variants,s);return i._initialize(n,t.variants,s)})}var l={async loadVariants(e){const n=await s(e);const r=a.getPersistencyKey(e.control);const i=a.getDefaultVariantId(o(e.control));const l=t.merge(r,n,e.standardVariant,e.control);l.defaultVariantId=i;return l},isVendorLayer(){return r.isVendorLayer()},isVariantDownport(){var t=new URLSearchParams(window.location.search);var a=t.get("hotfix");return l.isVendorLayer()&&a==="true"},getDefaultVariantId(t){var a=o(t.control).defaultVariants;var e=a[a.length-1];return e?e.getContent().defaultVariantName:""}};return l});
//# sourceMappingURL=SmartVariantManagementApplyAPI.js.map