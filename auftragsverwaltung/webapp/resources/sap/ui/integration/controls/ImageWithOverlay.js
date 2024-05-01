/*!
* OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./ImageWithOverlayRenderer","sap/m/Text","sap/ui/core/Control","sap/m/VBox","sap/m/library"],function(t,e,i,s,r){"use strict";var o=r.FlexJustifyContent;var l=r.FlexAlignItems;var a=r.FlexDirection;var n=r.FlexRendertype;var u=i.extend("sap.ui.integration.controls.ImageWithOverlay",{metadata:{library:"sap.ui.integration",properties:{supertitle:{type:"string",group:"Misc",defaultValue:""},title:{type:"string",group:"Misc",defaultValue:""},subTitle:{type:"string",group:"Misc",defaultValue:""},verticalPosition:{type:"sap.m.FlexJustifyContent",group:"Appearance",defaultValue:o.Start},horizontalPosition:{type:"sap.m.FlexAlignItems",group:"Appearance",defaultValue:l.Start},textColor:{type:"string",group:"Misc",defaultValue:""},textFilter:{type:"string",group:"Misc",defaultValue:""},background:{type:"string",group:"Misc",defaultValue:""},padding:{type:"string",group:"Misc",defaultValue:""}},aggregations:{image:{type:"sap.m.Image",multiple:false},_textsLayout:{type:"sap.m.VBox",multiple:false,visibility:"hidden"}}},renderer:t});u.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.apply(this,arguments);this._getSupertitleText().setText(this.getSupertitle());this._getTitleText().setText(this.getTitle());this._getSubTitleText().setText(this.getSubTitle());this._getTextsLayout().setJustifyContent(this.getVerticalPosition()).setAlignItems(this.getHorizontalPosition())};u.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.apply(this,arguments);var t=this.getTextColor(),e=this.getTextFilter(),s=this.getBackground(),r;if(t||e){r=this.getDomRef().getElementsByClassName("sapMText");for(let i=0;i<r.length;i++){const s=r[i];if(t){s.style.color=t}if(e){s.style.filter=e}}}if(s){this.getDomRef().getElementsByClassName("sapUiIntImgWithOverlayLayout")[0].style.background=s}};u.prototype._getSupertitleText=function(){if(!this._oSupertitleText){this._oSupertitleText=new e({text:this.getSupertitle()})}return this._oSupertitleText};u.prototype._getTitleText=function(){if(!this._oTitleText){this._oTitleText=new e({text:this.getTitle()}).addStyleClass("sapUiIntImgWithOverlayTitle")}return this._oTitleText};u.prototype._getSubTitleText=function(){if(!this._oSubTitleText){this._oSubTitleText=new e({text:this.getSubTitle()})}return this._oSubTitleText};u.prototype._getTextsLayout=function(){var t=this.getAggregation("_textsLayout");if(!t){t=new s({direction:a.Column,renderType:n.Bare,justifyContent:this.getVerticalPosition(),alignItems:this.getHorizontalPosition(),items:[this._getSupertitleText(),this._getTitleText(),this._getSubTitleText()]}).addStyleClass("sapUiIntImgWithOverlayLayout");this.setAggregation("_textsLayout",t)}return t};return u});
//# sourceMappingURL=ImageWithOverlay.js.map