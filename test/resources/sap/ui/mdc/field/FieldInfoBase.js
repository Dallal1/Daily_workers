/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/mdc/Element","sap/m/library","sap/m/ResponsivePopover"],(e,t,r,i)=>{"use strict";const{PlacementType:o}=r;const n=t.extend("sap.ui.mdc.field.FieldInfoBase",{metadata:{library:"sap.ui.mdc",events:{dataUpdate:{},popoverAfterOpen:{}}}});n.prototype.isTriggerable=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method isTriggerable must be redefined")};n.prototype.getTriggerHref=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getTriggerHref must be redefined")};n.prototype.getDirectLinkHrefAndTarget=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getDirectLinkHrefAndTarget must be redefined")};n.prototype.open=async function(e,t){e=e?e:this.getParent();if(!e){throw new Error("sap.ui.mdc.field.FieldInfoBase: popover can not be open because the control is undefined")}let r=this.getDependents().find(e=>e.isA("sap.m.ResponsivePopover"));if(r&&r.isOpen()){return Promise.resolve()}const i=await this.checkDirectNavigation(t);if(i===false){r=await this.createPopover();if(r){r.openBy(e);r.attachAfterOpen(()=>{this.firePopoverAfterOpen()})}}return Promise.resolve()};n.prototype.getContent=function(e){throw new Error("sap.ui.mdc.field.FieldInfoBase: method getContent must be redefined")};n.prototype.checkDirectNavigation=function(){throw new Error("sap.ui.mdc.field.FieldInfoBase: method checkDirectNavigation must be redefined")};n.prototype.getSourceControl=function(){return this.getParent()};n.prototype.createPopover=function(){let t;return this.getContent(()=>t).then(r=>{t=new i(this.getId()+"-popover",{contentWidth:"380px",horizontalScrolling:false,showHeader:e.system.phone,placement:o.Auto,content:[r],afterClose:function(e){if(e.getSource()){e.getSource().destroy()}}});this.addDependent(t);return new Promise((e,i)=>{sap.ui.require(["sap/ui/fl/apply/api/FlexRuntimeInfoAPI"],async i=>{if(i.isFlexSupported({element:r})){await i.waitForChanges({element:r})}if(this.retrievePopoverTitle){const{sTitle:e,oLabelledByControl:i}=await this.retrievePopoverTitle(r);t.setTitle(e);t.addAriaLabelledBy(i)}e(t)})})})};return n});
//# sourceMappingURL=FieldInfoBase.js.map