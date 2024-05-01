/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/IconPool","sap/m/library","sap/m/OverflowToolbarLayoutData","sap/ui/core/Messaging","sap/ui/core/Lib"],function(e,t,n,i,r,o){"use strict";var a=n.OverflowToolbarPriority;var c=n.ButtonType;var s=e.extend("sap.f.semantic.SemanticConfiguration",{getInterface:function(){return this}});s._Placement={titleText:"titleText",titleIcon:"titleIcon",footerLeft:"footerLeft",footerRight:"footerRight",shareMenu:"shareMenu"};s.isKnownSemanticType=function(e){return s.getConfiguration(e)!==null};s.getConfiguration=function(e){return s._oTypeConfigs[e]||null};s.getSettings=function(e){if(s.isKnownSemanticType(e)){return s._oTypeConfigs[e].getSettings()}return null};s.getConstraints=function(e){if(s.isKnownSemanticType(e)){return s._oTypeConfigs[e].constraints||null}return null};s.getPlacement=function(e){if(s.isKnownSemanticType(e)){return s._oTypeConfigs[e].placement}return null};s.getOrder=function(e){if(s.isKnownSemanticType(e)){return s._oTypeConfigs[e].order}return null};s.shouldBePreprocessed=function(e){if(s.isKnownSemanticType(e)){return s._oTypeConfigs[e].needPreprocesing||false}return false};s.isMainAction=function(e){if(s.isKnownSemanticType(e)){return s._oTypeConfigs[e].mainAction||false}return false};s.isNavigationAction=function(e){if(s.isKnownSemanticType(e)){return s._oTypeConfigs[e].navigation||false}return false};s._oTypeConfigs=function(){var e={},n=o.getResourceBundleFor("sap.f");e["sap.f.semantic.TitleMainAction"]={placement:s._Placement.titleText,order:0,mainAction:true,getSettings:function(){return{type:c.Emphasized,layoutData:new i({priority:a.NeverOverflow})}}};e["sap.f.semantic.EditAction"]={placement:s._Placement.titleText,order:1,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_EDIT"),tooltip:n.getText("SEMANTIC_CONTROL_EDIT"),type:c.Transparent}}};e["sap.f.semantic.DeleteAction"]={placement:s._Placement.titleText,order:2,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_DELETE"),type:c.Transparent}}};e["sap.f.semantic.CopyAction"]={placement:s._Placement.titleText,order:3,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_COPY"),type:c.Transparent}}};e["sap.f.semantic.AddAction"]={placement:s._Placement.titleText,order:4,getSettings:function(){return{text:n.getText("SEMANTIC_CONTROL_ADD"),tooltip:n.getText("SEMANTIC_CONTROL_ADD"),type:c.Transparent}}};e["sap.f.semantic.FavoriteAction"]={placement:s._Placement.titleIcon,order:0,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("favorite"),text:n.getText("SEMANTIC_CONTROL_FAVORITE"),type:c.Transparent}}};e["sap.f.semantic.FlagAction"]={placement:s._Placement.titleIcon,order:1,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("flag"),text:n.getText("SEMANTIC_CONTROL_FLAG"),type:c.Transparent}}};e["sap.f.semantic.FullScreenAction"]={placement:s._Placement.titleIcon,order:0,constraints:"IconOnly",navigation:true,getSettings:function(){return{icon:t.getIconURI("full-screen"),tooltip:n.getText("SEMANTIC_CONTROL_FULL_SCREEN"),layoutData:new i({priority:a.NeverOverflow}),type:c.Transparent}}};e["sap.f.semantic.ExitFullScreenAction"]={placement:s._Placement.titleIcon,order:1,constraints:"IconOnly",navigation:true,getSettings:function(){return{icon:t.getIconURI("exit-full-screen"),tooltip:n.getText("SEMANTIC_CONTROL_EXIT_FULL_SCREEN"),layoutData:new i({priority:a.NeverOverflow}),type:c.Transparent}}};e["sap.f.semantic.CloseAction"]={placement:s._Placement.titleIcon,order:2,constraints:"IconOnly",navigation:true,getSettings:function(){return{icon:t.getIconURI("decline"),tooltip:n.getText("SEMANTIC_CONTROL_CLOSE"),layoutData:new i({priority:a.NeverOverflow}),type:c.Transparent}}};e["sap.f.semantic.MessagesIndicator"]={placement:s._Placement.footerLeft,order:0,mainAction:false,getSettings:function(){return{icon:t.getIconURI("message-popup"),text:{path:"message>/",formatter:function(e){return e.length||0}},tooltip:n.getText("SEMANTIC_CONTROL_MESSAGES_INDICATOR"),type:c.Emphasized,visible:{path:"message>/",formatter:function(e){return e&&e.length>0}},models:{message:r.getMessageModel()},layoutData:new i({priority:a.NeverOverflow})}}};e["sap.m.DraftIndicator"]={placement:s._Placement.footerRight,order:0,needPreprocesing:true,mainAction:false,getSettings:function(){return{layoutData:new i({shrinkable:false})}}};e["sap.f.semantic.FooterMainAction"]={placement:s._Placement.footerRight,order:1,mainAction:true,getSettings:function(){return{type:c.Emphasized,text:n.getText("SEMANTIC_CONTROL_SAVE"),layoutData:new i({priority:a.NeverOverflow})}}};e["sap.f.semantic.PositiveAction"]={placement:s._Placement.footerRight,order:2,mainAction:false,getSettings:function(){return{type:c.Accept,text:n.getText("SEMANTIC_CONTROL_ACCEPT"),layoutData:new i({priority:a.NeverOverflow})}}};e["sap.f.semantic.NegativeAction"]={placement:s._Placement.footerRight,order:3,mainAction:false,getSettings:function(){return{type:c.Reject,text:n.getText("SEMANTIC_CONTROL_REJECT"),layoutData:new i({priority:a.NeverOverflow})}}};e["sap.f.semantic.SendEmailAction"]={placement:s._Placement.shareMenu,order:0,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("email"),text:n.getText("SEMANTIC_CONTROL_SEND_EMAIL"),type:c.Transparent}}};e["sap.f.semantic.DiscussInJamAction"]={placement:s._Placement.shareMenu,order:1,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("discussion-2"),text:n.getText("SEMANTIC_CONTROL_DISCUSS_IN_WORK_ZONE"),type:c.Transparent}}};e["sap.f.semantic.ShareInJamAction"]={placement:s._Placement.shareMenu,order:2,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("share-2"),text:n.getText("SEMANTIC_CONTROL_SHARE_ON_WORK_ZONE"),type:c.Transparent}}};e["sap.f.semantic.SendMessageAction"]={placement:s._Placement.shareMenu,order:3,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("discussion"),text:n.getText("SEMANTIC_CONTROL_SEND_MESSAGE"),type:c.Transparent}}};e["saveAsTileAction"]={placement:s._Placement.shareMenu,order:4,constraints:"IconOnly"};e["sap.f.semantic.PrintAction"]={placement:s._Placement.shareMenu,order:5,constraints:"IconOnly",getSettings:function(){return{icon:t.getIconURI("print"),text:n.getText("SEMANTIC_CONTROL_PRINT"),type:c.Transparent}}};return e}();return s});
//# sourceMappingURL=SemanticConfiguration.js.map