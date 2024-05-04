/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/m/Button","./ObjectImageHelper","./ObjectPageHeaderContentRenderer","sap/ui/core/Lib"],function(e,t,a,r,o,n){"use strict";var i=t.ObjectPageHeaderDesign;var g=e.extend("sap.uxap.ObjectPageHeaderContent",{metadata:{library:"sap.uxap",interfaces:["sap.uxap.IHeaderContent"],properties:{contentDesign:{type:"sap.uxap.ObjectPageHeaderDesign",group:"Misc",defaultValue:i.Light,deprecated:true}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},_editHeaderButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_objectImage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_placeholder:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}}},renderer:o});g.prototype.onBeforeRendering=function(){var e=this.getParent(),t=this.getAggregation("_editHeaderButton");if(t){return}if(e&&e.isA("sap.uxap.ObjectPageLayout")&&e.getShowEditHeaderButton()){t=this._getInternalBtnAggregation("_editHeaderButton","EDIT_HEADER","-editHeaderBtn","Transparent");t.attachPress(this._handleEditHeaderButtonPress,this)}};g.prototype.exit=function(){var e=this.getAggregation("_editHeaderButton");if(e){e.detachPress(this._handleEditHeaderButtonPress,this)}};g.prototype._handleEditHeaderButtonPress=function(e){this.getParent().fireEditHeaderButtonPress()};g.prototype._getInternalBtnAggregation=function(e,t,r,o){if(!this.getAggregation(e)){var i=new a({text:n.getResourceBundleFor("sap.uxap").getText(t),type:o,id:this.getId()+r});this.setAggregation(e,i)}return this.getAggregation(e)};g.prototype._getObjectImage=function(){if(!this.getAggregation("_objectImage")){var e=this.getParent(),t=e&&e.getHeaderTitle&&e.getHeaderTitle(),a=t&&r.createObjectImage(t);if(a){this.setAggregation("_objectImage",a,true)}}return this.getAggregation("_objectImage")};g.prototype._destroyObjectImage=function(e){var t=this.getAggregation("_objectImage");if(t){t.destroy();this.getAggregation("_objectImage",null,e)}};g.prototype._getPlaceholder=function(){if(!this.getAggregation("_placeholder")){var e=this.getParent(),t=e&&e.getHeaderTitle&&e.getHeaderTitle(),a=t.getShowPlaceholder();var o=a&&r.createPlaceholder();if(o){this.setAggregation("_placeholder",o,true)}}return this.getAggregation("_placeholder")};g.prototype._getLayoutDataForControl=function(e){var t=e.getLayoutData();if(!t){return}else if(t.isA("sap.uxap.ObjectPageHeaderLayoutData")){return t}else if(t.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var a=t.getMultipleLayoutData();for(var r=0;r<a.length;r++){var o=a[r];if(o.isA("sap.uxap.ObjectPageHeaderLayoutData")){return o}}}};g.prototype.setVisible=function(e){this.getParent()&&this.getParent().toggleStyleClass("sapUxAPObjectPageLayoutNoHeaderContent",!e);return this.setProperty("visible",e)};g.createInstance=function(e,t,a,r,o){return new g({content:e,visible:t,id:o})};g.prototype.supportsPinUnpin=function(){return false};g.prototype.supportsChildPageDesign=function(){return true};g.prototype.supportsAlwaysExpanded=function(){return true};g.prototype._toggleCollapseButton=function(e){};g.prototype._setShowCollapseButton=function(e){};g.prototype._focusCollapseButton=function(){};g.prototype._focusPinButton=function(){};return g});
//# sourceMappingURL=ObjectPageHeaderContent.js.map