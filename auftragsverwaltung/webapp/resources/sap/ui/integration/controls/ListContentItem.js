/*!
* OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/core/Lib","sap/ui/integration/library","./ListContentItemRenderer","./ActionsStrip","sap/ui/integration/controls/ObjectStatus","sap/m/library","sap/m/Avatar","sap/m/AvatarShape","sap/m/AvatarSize","sap/m/ListItemBase","sap/ui/core/library","sap/ui/integration/util/BindingResolver"],function(t,e,i,a,s,n,o,r,l,u,p,c){"use strict";var g=e.AttributesLayoutType;var h=p.ValueState;var f=n.EmptyIndicatorMode;var y=n.AvatarImageFitType;var b=u.extend("sap.ui.integration.controls.ListContentItem",{metadata:{library:"sap.ui.integration",properties:{title:{type:"string",group:"Misc",defaultValue:null},description:{type:"string",group:"Misc",defaultValue:null},descriptionVisible:{type:"boolean",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconAlt:{type:"string",defaultValue:""},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:r.Square},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:l.XS},iconBackgroundColor:{type:"sap.m.AvatarColor"},iconVisible:{type:"boolean",defaultValue:true},info:{type:"string",group:"Misc",defaultValue:null},infoVisible:{type:"boolean",defaultValue:true},infoState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:h.None},showInfoStateIcon:{type:"boolean",defaultValue:false},customInfoStatusIcon:{type:"string",group:"Misc",defaultValue:null},attributesLayoutType:{type:"sap.ui.integration.AttributesLayoutType",defaultValue:g.TwoColumns}},aggregations:{microchart:{type:"sap.ui.integration.controls.Microchart",multiple:false},actionsStrip:{type:"sap.ui.integration.controls.ActionsStrip",multiple:false},attributes:{type:"sap.m.ObjectStatus",multiple:true},_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"},_objectStatus:{type:"sap.m.ObjectStatus",multiple:false,visibility:"hidden"}}},renderer:i});b.getPlaceholderInfo=function(t,e){const i=t?.attributes?.filter(function(t){return t.hasOwnProperty("visible")?t.visible:true});const s=t?.icon?.hasOwnProperty("visible")?t?.icon.visible:!!t?.icon;const n=t?.actionsStrip?a.hasVisibleTemplateItems(t.actionsStrip,e):false;return{hasIcon:s,attributesLength:i?i.length:0,hasChart:!!t?.chart,hasActionsStrip:n,hasDescription:!!t?.description}};b.getLinesCount=function(t,e){let i=1;const a=c.resolveValue(t,e);const s=b.getPlaceholderInfo(a,e);const n=a.description?.hasOwnProperty("visible")?a.description?.visible:true;if(a.description&&n){i+=1}const o=s.attributesLength;if(a.attributesLayoutType===g.OneColumn){i+=o}else{i+=Math.ceil(o/2)}const r=a.chart?.hasOwnProperty("visible")?a.chart?.visible:true;if(a.chart&&r){i+=1}return i};b.prototype.onBeforeRendering=function(){u.prototype.onBeforeRendering.apply(this,arguments);if(this.isPropertyInitial("iconSize")){if(this.getLinesCount()===1){this._getAvatar().setDisplaySize(l.XS)}else{this._getAvatar().setDisplaySize(l.S)}}else{this._getAvatar().setDisplaySize(this.getIconSize())}};b.prototype.getLinesCount=function(){var t=1;if(this.getDescription()&&this.getDescriptionVisible()){t+=1}if(this.getAttributesLayoutType()===g.OneColumn){t+=this._getVisibleAttributes().length}else{t+=Math.ceil(this._getVisibleAttributes().length/2)}if(this.getMicrochart()&&this.getMicrochart().getVisible()){t+=1}return t};b.prototype.getContentAnnouncement=function(){var e=this.getInfoState(),i=this.getTitle(),a=this.getDescription(),s=[],n=this.getInfo(),o=t.getResourceBundleFor("sap.m");if(i){s.push(i)}if(a){s.push(a)}if(n){s.push(n)}if(e!=h.None&&e!==this.getHighlight()){s.push(o.getText("LIST_ITEM_STATE_"+e.toUpperCase()))}return s.join(" . ").trim()};b.prototype._getAvatar=function(){var t=this.getAggregation("_avatar");if(!t){t=new o({imageFitType:y.Contain}).addStyleClass("sapFCardIcon");this.setAggregation("_avatar",t)}t.setSrc(this.getIcon()).setDisplayShape(this.getIconDisplayShape()).setTooltip(this.getIconAlt()).setInitials(this.getIconInitials()).setBackgroundColor(this.getIconBackgroundColor()).setVisible(this.getIconVisible());return t};b.prototype._getObjectStatus=function(){var t=this.getAggregation("_objectStatus");if(!t){t=new s;this.setAggregation("_objectStatus",t)}t.setText(this.getInfo()).setState(this.getInfoState()).setShowStateIcon(this.getShowInfoStateIcon()).setIcon(this.getCustomInfoStatusIcon()).setEmptyIndicatorMode(f.On);return t};b.prototype._getVisibleAttributes=function(){return this.getAttributes().filter(function(t){return t.getVisible()})};return b});
//# sourceMappingURL=ListContentItem.js.map