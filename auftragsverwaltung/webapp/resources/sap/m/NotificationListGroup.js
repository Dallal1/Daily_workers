/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./NotificationListBase","sap/ui/core/InvisibleText","sap/ui/core/IconPool","sap/ui/core/Lib","sap/ui/core/library","sap/ui/Device","sap/m/Button","./NotificationListGroupRenderer"],function(t,e,i,o,r,s,n,a,p){"use strict";var l=s.Priority;var u=t.ButtonType;var g=r.getResourceBundleFor("sap.m"),h=g.getText("NOTIFICATION_LIST_GROUP_EXPAND"),I=g.getText("NOTIFICATION_LIST_GROUP_COLLAPSE"),f=g.getText("NOTIFICATION_LIST_GROUP_READ"),d=g.getText("NOTIFICATION_LIST_GROUP_UNREAD"),c="sap-icon://slim-arrow-right",T="sap-icon://slim-arrow-down";var y=n.system.desktop?400:100;var _=e.extend("sap.m.NotificationListGroup",{metadata:{library:"sap.m",properties:{collapsed:{type:"boolean",group:"Behavior",defaultValue:false},autoPriority:{type:"boolean",group:"Behavior",defaultValue:true},showEmptyGroup:{type:"boolean",group:"Behavior",defaultValue:false},enableCollapseButtonWhenEmpty:{type:"boolean",group:"Behavior",defaultValue:false},showItemsCounter:{type:"boolean",group:"Behavior",defaultValue:true},authorName:{type:"string",group:"Appearance",defaultValue:"",deprecated:true},authorPicture:{type:"sap.ui.core.URI",deprecated:true},datetime:{type:"string",group:"Appearance",defaultValue:"",deprecated:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.NotificationListItem",multiple:true,singularName:"item"},_collapseButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{onCollapse:{parameters:{collapsed:{type:"boolean"}}}}},renderer:p});_.prototype._getCollapseButton=function(){var t=this.getAggregation("_collapseButton"),e=this.getCollapsed();if(!t){t=new a(this.getId()+"-collapseButton",{type:u.Transparent,press:function(){var t=!this.getCollapsed();this.setCollapsed(t);this.fireOnCollapse({collapsed:t});this.getAggregation("_collapseButton").focus()}.bind(this)});this.setAggregation("_collapseButton",t,true)}t.setIcon(e?c:T);t.setTooltip(e?h:I);return t};_.prototype.init=function(){this._groupTitleInvisibleText=new i({id:this.getId()+"-invisibleGroupTitleText"})};_.prototype.onAfterRendering=function(){e.prototype.onAfterRendering.apply(this,arguments);var t=this._getCollapseButton().getDomRef();if(t){t.setAttribute("aria-expanded",!this.getCollapsed());t.setAttribute("aria-controls",this.getId()+"-childrenList")}};_.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._groupTitleInvisibleText){this._groupTitleInvisibleText.destroy();this._groupTitleInvisibleText=null}};_.prototype.getVisibleItems=function(){var t=this.getItems().filter(function(t){return t.getVisible()});return t};_.prototype._getVisibleItemsCount=function(){return this.getVisibleItems().length};_.prototype._getGroupTitleInvisibleText=function(){var t=this.getUnread()?d:f,e,i=this.getPriority(),o,r=[t];if(i!==l.None){e=g.getText("NOTIFICATION_LIST_GROUP_PRIORITY",i);r.push(e)}if(this.getShowItemsCounter()){o=g.getText("LIST_ITEM_COUNTER",[this._getVisibleItemsCount()]);r.push(o)}return this._groupTitleInvisibleText.setText(r.join(" "))};_.prototype.getPriority=function(){if(!this.getAutoPriority()){return this.getProperty("priority")}var t=this.getAggregation("items");var e=l.None;if(t){t.forEach(function(t){e=m(e,t.getPriority())})}else{e=this.getProperty("priority")}return e};function m(t,e){if(t==e){return t}if(t=="None"){return e}if(t=="Low"&&e!="None"){return e}if(t=="Medium"&&(e!="None"&&e!="Low")){return e}return t}_.prototype.onBeforeRendering=function(){e.prototype.onBeforeRendering.apply(this,arguments);this._getCollapseButton().setVisible(this.getEnableCollapseButtonWhenEmpty()||this._getVisibleItemsCount()>0)};_.prototype._isMaxNumberReached=function(){return this.getItems().length>y};_.prototype._getMaxNumberReachedMsg=function(){return{title:g.getText("NOTIFICATION_LIST_GROUP_MAX_NOTIFICATIONS_TITLE",this.getItems().length-y),description:g.getText("NOTIFICATION_LIST_GROUP_MAX_NOTIFICATIONS_BODY")}};_.prototype._collapse=function(t){if(!this.getCollapsed()){this.setCollapsed(true);this.fireOnCollapse({collapsed:true});t.stopImmediatePropagation()}};_.prototype._expand=function(t){if(this.getCollapsed()){this.setCollapsed(false);this.fireOnCollapse({collapsed:false});t.stopImmediatePropagation()}};return _});
//# sourceMappingURL=NotificationListGroup.js.map