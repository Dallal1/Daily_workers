/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/webc/WebComponent","./library","./thirdparty/TabContainer"],function(e,a){"use strict";var t=a.TabContainerBackgroundDesign;var i=a.TabLayout;var n=a.TabsOverflowMode;var o=e.extend("sap.ui.webc.main.TabContainer",{metadata:{library:"sap.ui.webc.main",tag:"ui5-tabcontainer-ui5",properties:{collapsed:{type:"boolean",defaultValue:false},contentBackgroundDesign:{type:"sap.ui.webc.main.TabContainerBackgroundDesign",defaultValue:t.Solid},fixed:{type:"boolean",defaultValue:false},headerBackgroundDesign:{type:"sap.ui.webc.main.TabContainerBackgroundDesign",defaultValue:t.Solid},height:{type:"sap.ui.core.CSSSize",mapping:"style"},tabLayout:{type:"sap.ui.webc.main.TabLayout",defaultValue:i.Standard},tabsOverflowMode:{type:"sap.ui.webc.main.TabsOverflowMode",defaultValue:n.End},width:{type:"sap.ui.core.CSSSize",mapping:"style"}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.webc.main.ITab",multiple:true},overflowButton:{type:"sap.ui.webc.main.IButton",multiple:false,slot:"overflowButton"},startOverflowButton:{type:"sap.ui.webc.main.IButton",multiple:false,slot:"startOverflowButton"}},events:{tabSelect:{allowPreventDefault:true,parameters:{tab:{type:"HTMLElement"},tabIndex:{type:"int"}}}},getters:["allItems"],designtime:"sap/ui/webc/main/designtime/TabContainer.designtime"}});return o});
//# sourceMappingURL=TabContainer.js.map