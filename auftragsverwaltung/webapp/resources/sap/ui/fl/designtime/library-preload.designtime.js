//@ui5-bundle sap/ui/fl/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/fl/designtime/library.designtime", [],function(){"use strict";return{}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/fl/designtime/util/IFrame.designtime", ["sap/ui/fl/designtime/util/editIFrame"],function(e){"use strict";return{actions:{settings(){return{icon:"sap-icon://write-new",name:"CTX_EDIT_IFRAME",isEnabled:true,handler:e}},remove:{changeType:"hideControl"},reveal:{changeType:"unhideControl"}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/fl/designtime/util/editIFrame", ["sap/ui/core/Element","sap/ui/rta/plugin/iframe/AddIFrameDialog"],function(e,t){"use strict";return async function i(a){const r=new t;const n=a.get_settings();const o=a.getRenameInfo();if(o){const t=e.getElementById(o.sourceControlId);n.title=t.getProperty(o.propertyName)}const g=await t.buildUrlBuilderParametersFor(a);const c={parameters:g,frameUrl:n.url,frameWidth:n.width,frameHeight:n.height,title:n.title,asContainer:!!n.title,useLegacyNavigation:n.useLegacyNavigation,updateMode:true};const s=await r.open(c,a);if(!s){return[]}const u=[];let l=false;const h={url:n.url,height:n.height,width:n.width,useLegacyNavigation:n.useLegacyNavigation};if(s.frameHeight+s.frameHeightUnit!==n.height){l=true;h.height=s.frameHeight+s.frameHeightUnit}if(s.frameWidth+s.frameWidthUnit!==n.width){l=true;h.width=s.frameWidth+s.frameWidthUnit}if(s.frameUrl!==n.url){l=true;h.url=s.frameUrl}if(s.useLegacyNavigation!==!!n.useLegacyNavigation){l=true;h.useLegacyNavigation=s.useLegacyNavigation}if(l){u.push({selectorControl:a,changeSpecificData:{changeType:"updateIFrame",content:h}})}if(s.title!==n.title){const t={selectorControl:e.getElementById(o.selectorControlId),changeSpecificData:{changeType:"rename",content:{value:s.title}}};u.push(t)}return u}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/fl/designtime/variants/VariantManagement.designtime", ["sap/ui/core/Lib","sap/ui/fl/apply/api/ControlVariantApplyAPI","sap/ui/fl/Utils"],function(e,t,r){"use strict";var a=function(e,a){var o=r.getAppComponentForControl(e);var n=e.getId();var i=o.getModel(t.getVariantModelName());var l=o.getLocalId(n)||n;if(!i){return}if(a){i.waitForVMControlInit(l).then(function(){i.setModelPropertiesForControl(l,a,e);i.checkUpdate(true)})}else{i.setModelPropertiesForControl(l,a,e);i.checkUpdate(true)}};return{annotations:{},properties:{showSetAsDefault:{ignore:false},inErrorState:{ignore:false},editable:{ignore:false},modelName:{ignore:false},updateVariantInURL:{ignore:true},resetOnContextChange:{ignore:true},executeOnSelectionForStandardDefault:{ignore:false},displayTextForExecuteOnSelectionForStandardVariant:{ignore:false},headerLevel:{ignore:false}},variantRenameDomRef(e){return e.getTitle().getDomRef("inner")},customData:{},tool:{start(e){var t=true;a(e,t);e.enteringDesignMode()},stop(e){var t=false;a(e,t);e.leavingDesignMode()}},actions:{controlVariant(a){var o=r.getAppComponentForControl(a);var n=a.getId();var i=o.getModel(t.getVariantModelName());var l=o.getLocalId(n)||n;return{validators:["noEmptyText",{validatorFunction(e){var t=i._getVariantTitleCount(e,l)||0;return t===0},errorMessage:e.getResourceBundleFor("sap.m").getText("VARIANT_MANAGEMENT_ERROR_DUPLICATE")}]}}}}});
//# sourceMappingURL=library-preload.designtime.js.map
