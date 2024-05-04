/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./NavigationListItemBase"],function(t,e){"use strict";const n=e.extend("sap.tnt.NavigationListGroup",{metadata:{library:"sap.tnt",aggregations:{items:{type:"sap.tnt.NavigationListItem",multiple:true,singularName:"item"}},defaultAggregation:"items"}});n.prototype.render=function(t,e,n){if(!this.getVisible()||!e){return}const s=this.getItems(),a=this.getEnabled();if(n){this._renderSeparator(t)}if(!e.getExpanded()){s.forEach(n=>{if(!a){n.setEnabled(false)}n.render(t,e)});this._renderSeparator(t);return}t.openStart("li",this).attr("role","none").openEnd();t.openStart("div").class("sapTntNLI").class("sapTntNLGroup");if(!a){t.class("sapTntNLIDisabled")}const r=`${this.getId()}-subtree`;if(a){t.attr("tabindex","-1").accessibilityState({role:"treeitem",owns:r,expanded:e.getExpanded()&&this.getExpanded()?"true":"false"})}t.openEnd();t.openStart("span").class("sapTntNLGroupText").openEnd().text(this.getText()).close("span");t.renderControl(this._getExpandIconControl());t.close("div");t.openStart("ul",r).class("sapTntNLIItemsContainer").accessibilityState({role:"group",label:this.getText()});if(!this.getExpanded()){t.class("sapTntNLIItemsContainerHidden")}t.openEnd();s.forEach(n=>{n.render(t,e)});t.close("ul").close("li");this._renderSeparator(t)};n.prototype._renderSeparator=function(t){t.openStart("li").class("sapTntNLSeparator").attr("role","none").openEnd().close("li")};n.prototype._getFocusDomRefs=function(){const t=this.getFocusDomRef(),e=this.getItems().flatMap(t=>t._getFocusDomRefs());if(!this.getEnabled()||!this.getVisible()){return[]}if(this._isListExpanded()){e.unshift(t)}return e};n.prototype._getAccessibilityRef=function(){return this.getDomRef().querySelector(".sapTntNLGroup")};n.prototype._getExpandIconStyleClass=function(){return"sapTntNLGroupIcon"};n.prototype._getExpanderActivationTarget=function(){return".sapTntNLGroup"};return n});
//# sourceMappingURL=NavigationListGroup.js.map