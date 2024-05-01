/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/core/Lib","sap/ui/core/library","sap/m/library","sap/f/library","sap/ui/unified/library","sap/ui/layout/library"],function(a,t){"use strict";var i=t.init({apiVersion:2,name:"sap.ui.integration",version:"1.121.0",dependencies:["sap.ui.core","sap.f","sap.m","sap.ui.unified","sap.ui.layout"],types:["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode","sap.ui.integration.CardMenuAction","sap.ui.integration.CardDesign","sap.ui.integration.CardDisplayVariant","sap.ui.integration.CardBlockingMessageType","sap.ui.integration.CardPreviewMode","sap.ui.integration.AttributesLayoutType"],controls:["sap.ui.integration.widgets.Card","sap.ui.integration.cards.filters.FilterBar","sap.ui.integration.cards.Header","sap.ui.integration.cards.NumericHeader","sap.ui.integration.controls.ListContentItem","sap.ui.integration.controls.BlockingMessage","sap.ui.integration.controls.ImageWithOverlay"],elements:["sap.ui.integration.ActionDefinition","sap.ui.integration.Host","sap.ui.integration.Extension"],extensions:{"sap.ui.integration":{customElements:{card:"sap/ui/integration/customElements/CustomElementCard"}}}});i.CardActionType={Navigation:"Navigation",Submit:"Submit",Custom:"Custom",DateChange:"DateChange",MonthChange:"MonthChange",ShowCard:"ShowCard",HideCard:"HideCard"};i.CardDataMode={Active:"Active",Inactive:"Inactive",Auto:"Auto"};i.CardDesign={Solid:"Solid",Transparent:"Transparent"};i.CardDisplayVariant={Standard:"Standard",TileStandard:"TileStandard",TileStandardWide:"TileStandardWide",TileFlat:"TileFlat",TileFlatWide:"TileFlatWide"};i.CardActionArea={None:"None",Content:"Content",ContentItem:"ContentItem",ActionsStrip:"ActionsStrip",ContentItemDetail:"ContentItemDetail",Header:"Header"};i.CardBlockingMessageType={Error:"Error",NoData:"NoData",Information:"Information"};i.CardArea={Header:"Header",Filters:"Filters",Content:"Content"};i.CardPreviewMode={Off:"Off",MockData:"MockData",Abstract:"Abstract"};i.AttributesLayoutType={OneColumn:"OneColumn",TwoColumns:"TwoColumns"};i.CardMenuAction=a.createType("sap.ui.integration.CardMenuAction",{isValid:function(a){var t=["type","text","icon","tooltip","buttonType","enabled","visible","action","parameters","target","url"];return Object.keys(a).every(function(a){return t.indexOf(a)!==-1})}},"object");a.registerEnum("sap.ui.integration.CardActionType",i.CardActionType);a.registerEnum("sap.ui.integration.CardDataMode",i.CardDataMode);a.registerEnum("sap.ui.integration.CardDesign",i.CardDesign);a.registerEnum("sap.ui.integration.CardDisplayVariant",i.CardDisplayVariant);a.registerEnum("sap.ui.integration.CardBlockingMessageType",i.CardBlockingMessageType);a.registerEnum("sap.ui.integration.CardPreviewMode",i.CardPreviewMode);a.registerEnum("sap.ui.integration.AttributesLayoutType",i.AttributesLayoutType);return i});
//# sourceMappingURL=library.js.map