/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/webc/WebComponent","./library","sap/ui/core/EnabledPropagator","./thirdparty/Link"],function(e,t,a){"use strict";var i=t.LinkDesign;var p=t.WrappingType;var n=e.extend("sap.ui.webc.main.Link",{metadata:{library:"sap.ui.webc.main",tag:"ui5-link-ui5",properties:{accessibilityAttributes:{type:"object",defaultValue:{}},accessibleName:{type:"string",defaultValue:""},accessibleRole:{type:"string",defaultValue:"link"},design:{type:"sap.ui.webc.main.LinkDesign",defaultValue:i.Default},enabled:{type:"boolean",defaultValue:true,mapping:{type:"property",to:"disabled",formatter:"_mapEnabled"}},href:{type:"string",defaultValue:""},target:{type:"string",defaultValue:""},text:{type:"string",defaultValue:"",mapping:"textContent"},wrappingType:{type:"sap.ui.webc.main.WrappingType",defaultValue:p.None}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,mapping:{type:"property",to:"accessibleNameRef",formatter:"_getAriaLabelledByForRendering"}}},events:{click:{allowPreventDefault:true,parameters:{altKey:{type:"boolean"},ctrlKey:{type:"boolean"},metaKey:{type:"boolean"},shiftKey:{type:"boolean"}}}},designtime:"sap/ui/webc/main/designtime/Link.designtime"}});a.call(n.prototype);return n});
//# sourceMappingURL=Link.js.map