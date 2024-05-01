//@ui5-bundle sap/ui/mdc/designtime/library-preload.designtime.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/Util", [],()=>{"use strict";function e(){return{actions:{},aggregations:{},description:"{description}",name:"{name}",properties:{}}}function t(e,t,i){const n=e.includes(t);const r=n&&i[t]||{};if(!Object.keys(r).length){r[t]={ignore:!n};Object.assign(i,r)}}return{getDesignTime:function(i,n,r,s){s=s?s:e();s.actions=s.actions?s.actions:{};s.properties=s.properties?s.properties:{};s.aggregations=s.aggregations?s.aggregations:{};n=n?n:[];r=r?r:[];const g=i.getMetadata(),o=Object.keys(g.getAllProperties()).concat(Object.keys(g.getAllPrivateProperties())),a=Object.keys(g.getAllAggregations()).concat(Object.keys(g.getAllPrivateAggregations()));o.forEach(e=>{t(n,e,s.properties)});a.forEach(e=>{t(r,e,s.aggregations)});return s}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/actiontoolbar/ActionToolbar.designtime", ["sap/ui/mdc/ActionToolbar","sap/m/p13n/Engine","../Util"],(n,t,e)=>{"use strict";const a={description:"{description}",name:"{name}",aggregations:{between:{propagateMetadata:function(n){if(n.isA("sap.ui.fl.variants.VariantManagement")){return null}return{actions:"not-adaptable"}}}},properties:{},actions:{settings:{"sap.ui.mdc":{name:"actiontoolbar.RTA_SETTINGS_NAME",handler:function(n,e){return t.getInstance().getRTASettingsActionHandler(n,e,"actionsKey").then(n=>n)},CAUTION_variantIndependent:true}}}},i=["actions","between"],r=[];return e.getDesignTime(n,r,i,a)});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/actiontoolbar/ActionToolbarAction.designtime", ["sap/ui/mdc/actiontoolbar/ActionToolbarAction","../Util"],(t,e)=>{"use strict";const n={description:"{description}",name:"{name}",aggregations:{action:{propagateMetadata:function(t){return{actions:{rename:{changeType:"rename",domRef:function(t){return t.$()},getTextMutators:function(t){return{getText:function(){return t.getDomRef().textContent},setText:function(e){t.getDomRef().textContent=e}}}},remove:null,reveal:null}}}}},properties:{},actions:{}},o=["action"],i=[];return e.getDesignTime(t,i,o,n)});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/chart/Chart.designtime", ["sap/m/p13n/Engine","sap/ui/mdc/Chart","../Util"],(e,t,n)=>{"use strict";const i={actions:{settings:{"sap.ui.mdc":{name:"p13nDialog.VIEW_SETTINGS",handler:function(t,n){const i=t.getP13nMode();const a=i.indexOf("Type");if(a>-1){i.splice(a,1)}if(t.isPropertyHelperFinal()){return e.getInstance().getRTASettingsActionHandler(t,n,i)}else{return t.finalizePropertyHelper().then(()=>e.getInstance().getRTASettingsActionHandler(t,n,i))}}}}},aggregations:{_toolbar:{propagateMetadata:function(e){return null}}}};const a=["_toolbar"],r=["headerLevel","headerVisible"];return n.getDesignTime(t,r,a,i)});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/Field.designtime", ["sap/ui/core/Element","sap/ui/fl/Utils","sap/ui/fl/apply/api/FlexRuntimeInfoAPI","sap/m/p13n/Engine"],(e,t,n,o)=>{"use strict";return{properties:{value:{ignore:true},additionalValue:{ignore:true}},getStableElements:function(n){if(!n.getFieldInfo()){return[]}const o=n.getFieldInfo();let r=typeof o.getSourceControl()==="string"?e.getElementById(o.getSourceControl()):o.getSourceControl();if(!r){r=n}const l=t.getAppComponentForControl(r)||t.getAppComponentForControl(n);const i=o.getControlDelegate().getPanelId(o);return[{id:i,appComponent:l}]},actions:{settings:{"sap.ui.mdc":{name:"info.POPOVER_DEFINE_LINKS",isEnabled:e=>!!e.getFieldInfo(),handler:function(e,r){const l=e.getFieldInfo();return l.getContent().then(i=>{l.addDependent(i);return n.waitForChanges({element:i}).then(()=>{r.fnAfterClose=function(){i.destroy()};const l=function(){return o.getInstance().getRTASettingsActionHandler(i,r,"LinkItems").then(n=>{n.forEach(n=>{const o=n.selectorElement;delete n.selectorElement;const r=t.getAppComponentForControl(e);n.selectorControl={id:typeof o==="string"?o:o.getId(),controlType:o===i?"sap.ui.mdc.link.Panel":"sap.ui.mdc.link.PanelItem",appComponent:r}});return n})};const s=i.getItems();if(s.length>0){return n.waitForChanges({selectors:s}).then(()=>l())}else{return l()}})})},CAUTION_variantIndependent:true}}},tool:{start:function(e){e.getFieldInfo()?.setEnablePersonalization(false)},stop:function(e){e.getFieldInfo()?.setEnablePersonalization(true)}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/FieldBase.designtime", ["sap/ui/mdc/field/FieldBase","../Util"],(e,i)=>{"use strict";const s={};const t=[],n=[];return i.getDesignTime(e,n,t,s)});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/FilterField.designtime", [],()=>{"use strict";return{properties:{operators:{ignore:true},defaultOperator:{ignore:true}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/field/MultiValueField.designtime", [],()=>{"use strict";return{properties:{delegate:{ignore:true}},aggregations:{items:{ignore:true}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/filterbar/FilterBar.designtime", ["sap/m/p13n/Engine"],e=>{"use strict";return{actions:{settings:{"sap.ui.mdc":{name:"filterbar.ADAPT_TITLE",handler:function(t,n){return t.initializedWithMetadata().then(()=>e.getInstance().getRTASettingsActionHandler(t,n,"Item"))}}}},aggregations:{layout:{ignore:true},basicSearchField:{ignore:true},filterItems:{ignore:true}},properties:{showAdaptFiltersButton:{ignore:false},showClearButton:{ignore:false},p13nMode:{ignore:false}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/filterbar/FilterBarBase.designtime", [],()=>{"use strict";return{properties:{showGoButton:{ignore:false},delegate:{ignore:true},liveMode:{ignore:false},showMessages:{ignore:false},filterConditions:{ignore:true},propertyInfo:{ignore:true},suspendSelection:{ignore:true}}}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/library.designtime", [],()=>{"use strict";return{}});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/mdc/designtime/table/Table.designtime", ["sap/m/p13n/Engine","sap/ui/mdc/Table","../Util"],(e,t,n)=>{"use strict";const a={name:"{name}",description:"{description}",actions:{settings:{"sap.ui.mdc":{name:"p13nDialog.VIEW_SETTINGS",handler:function(t,n){return t.finalizePropertyHelper().then(()=>e.getInstance().getRTASettingsActionHandler(t,n,t.getActiveP13nModes()))}}}},properties:{},aggregations:{_content:{domRef:":sap-domref",propagateMetadata:function(e){if(e.isA("sap.ui.fl.variants.VariantManagement")||e.isA("sap.ui.mdc.ActionToolbar")||e.isA("sap.ui.mdc.actiontoolbar.ActionToolbarAction")||e.isA("sap.ui.mdc.Field")||e.getParent()&&(e.getParent().isA("sap.ui.mdc.actiontoolbar.ActionToolbarAction")||e.getParent().isA("sap.ui.mdc.Field"))){return null}return{actions:"not-adaptable"}}}}};const i=["width","headerLevel","header","headerVisible","showRowCount","threshold","enableExport","busyIndicatorDelay","enableColumnResize","showPasteButton","multiSelectMode"],o=["_content"];return n.getDesignTime(t,i,o,a)});
//# sourceMappingURL=library-preload.designtime.js.map
