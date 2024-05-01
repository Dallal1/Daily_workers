/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/webc/WebComponent","./library","sap/ui/core/EnabledPropagator","sap/ui/core/library","./thirdparty/features/InputElementsFormSupport","./thirdparty/Select"],function(e,t,a,p){"use strict";var r=p.ValueState;var l=e.extend("sap.ui.webc.main.Select",{metadata:{library:"sap.ui.webc.main",tag:"ui5-select-ui5",interfaces:["sap.ui.core.IFormContent"],properties:{accessibleName:{type:"string",defaultValue:""},enabled:{type:"boolean",defaultValue:true,mapping:{type:"property",to:"disabled",formatter:"_mapEnabled"}},name:{type:"string",defaultValue:""},required:{type:"boolean",defaultValue:false},valueState:{type:"sap.ui.core.ValueState",defaultValue:r.None},valueStateMessage:{type:"string",defaultValue:"",mapping:{type:"slot",to:"div"}},width:{type:"sap.ui.core.CSSSize",mapping:"style"}},defaultAggregation:"options",aggregations:{label:{type:"sap.ui.core.Control",multiple:true,slot:"label"},options:{type:"sap.ui.webc.main.ISelectOption",multiple:true}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,mapping:{type:"property",to:"accessibleNameRef",formatter:"_getAriaLabelledByForRendering"}},menu:{type:"sap.ui.core.Control",multiple:false,mapping:{type:"property",to:"menu"}}},events:{change:{allowPreventDefault:true,parameters:{selectedOption:{type:"HTMLElement"}}},close:{parameters:{}},liveChange:{parameters:{selectedOption:{type:"HTMLElement"}}},open:{parameters:{}}},getters:["selectedOption"]}});a.call(l.prototype);return l});
//# sourceMappingURL=Select.js.map