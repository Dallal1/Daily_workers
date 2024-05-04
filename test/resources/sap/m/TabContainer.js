/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Element","sap/ui/core/IconPool","sap/ui/core/Lib","sap/ui/core/RenderManager","sap/ui/core/util/ResponsivePaddingsEnablement","./TabContainerRenderer","./TabStrip","./TabStripItem","./Button","sap/ui/Device"],function(t,e,i,o,r,n,a,s,p,d,u,g){"use strict";var m=t.ButtonType;var l=t.PageBackgroundDesign;var c=e.extend("sap.m.TabContainer",{metadata:{library:"sap.m",properties:{showAddNewButton:{type:"boolean",group:"Misc",defaultValue:false},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:l.List}},aggregations:{items:{type:"sap.m.TabContainerItem",multiple:true,singularName:"item",bindable:"bindable"},_addNewButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_tabStrip:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.m.TabContainerItem",multiple:false}},events:{itemClose:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}},itemSelect:{allowPreventDefault:true,parameters:{item:{type:"sap.m.TabContainerItem"}}},addNewButtonPress:{}},designtime:"sap/m/designtime/TabContainer.designtime",dnd:{draggable:false,droppable:true}},constructor:function(t,i){var o=[];if(!i&&typeof t==="object"){i=t}if(i&&Array.isArray(i["items"])){o=i["items"];delete i["items"]}e.prototype.constructor.apply(this,arguments);var r=new p(this.getId()+"--tabstrip",{hasSelect:true,itemSelect:function(t){var e=t.getParameter("item"),i=this._fromTabStripItem(e);this.setSelectedItem(i,t)}.bind(this),itemClose:function(t){var e=t.getParameter("item"),i=this._fromTabStripItem(e);t.preventDefault();if(this.fireItemClose({item:i})){if(!this.getBinding("items")){this.removeItem(i)}}}.bind(this)});this.setAggregation("_tabStrip",r,true);if(i&&i["showAddNewButton"]){this.setShowAddNewButton(true)}o.forEach(function(t){this.addItem(t)},this);this.data("sap-ui-fastnavgroup","true",true)},renderer:s});var h={name:"text",additionalText:"additionalText",icon:"icon",iconTooltip:"iconTooltip",modified:"modified"};a.call(c.prototype,{header:{selector:".sapMTabStripContainer"}});c.prototype.init=function(){this._initResponsivePaddingsEnablement()};c.prototype.onBeforeRendering=function(){if(this.getSelectedItem()){return}this._setDefaultTab()};c.prototype._getAddNewTabButton=function(){var t=this.getAggregation("_addNewButton");var e=r.getResourceBundleFor("sap.m");if(!t){t=new u({type:m.Transparent,tooltip:e.getText("TABCONTAINER_ADD_NEW_TAB"),icon:o.getIconURI("add"),press:function(){this.getParent().getParent().fireAddNewButtonPress()}});t.addStyleClass("sapMTSAddNewTabBtn");this.setAggregation("_addNewButton",t,true)}return t};c.prototype._getTabStrip=function(){return this.getAggregation("_tabStrip")};c.prototype._fromTabStripItem=function(t){var e=this.getItems()||[],i=e.length,o=0;for(;o<i;o++){if(e[o].getId()===t.getKey()){return e[o]}}return null};c.prototype._toTabStripItem=function(t){var e=0,i=t,o,r,n=this._getTabStrip();if(!n){return null}o=n.getItems();r=o.length;if(typeof t==="object"){i=t.getId()}for(;e<r;e++){if(o[e].getKey()===i){return o[e]}}return null};c.prototype._getSelectedItemContent=function(){var t=this._getTabStrip(),e=this.getSelectedItem(),o=i.getElementById(e),r=this._toTabStripItem(o);if(t){t.setSelectedItem(r)}return o?o.getContent():null};c.prototype._moveToNextItem=function(t){if(!this._getTabStrip()._oItemNavigation){return}var e=this.getItems().length,i=this._getTabStrip()._oItemNavigation.getFocusedIndex(),o=e===i?--i:i,r=this.getItems()[o],n=function(){if(this._getTabStrip()._oItemNavigation){this._getTabStrip()._oItemNavigation.focusItem(o)}},a=document.activeElement.classList;if(t){this.setSelectedItem(r);this.fireItemSelect({item:r})}if(a.contains("sapMTabStripSelectListItemCloseBtn")||a.contains("sapMTabStripItem")){setTimeout(n.bind(this),0)}};c.prototype._attachItemPropertyChanged=function(t){t.attachItemPropertyChanged(function(t){var e=t["mParameters"].propertyKey;if(h[e]){e=h[e];var i=this._toTabStripItem(t.getSource());var o="set"+e.substr(0,1).toUpperCase()+e.substr(1);i&&i[o](t["mParameters"].propertyValue)}}.bind(this))};c.prototype.removeItem=function(t){var e=this._getTabStrip(),i,o;if(typeof t==="undefined"||t===null){return null}t=this.removeAggregation("items",t);i=t.getId()===this.getSelectedItem();o=this._toTabStripItem(t);if(o.getId()===e.getSelectedItem()){e.removeAllAssociation("selectedItem",true)}e.removeItem(o);this._moveToNextItem(i);return t};c.prototype.addAggregation=function(t,i,o){if(t==="items"){this._attachItemPropertyChanged(i)}return e.prototype.addAggregation.call(this,t,i,o)};c.prototype.insertAggregation=function(t,i,o,r){if(t==="items"){this._attachItemPropertyChanged(i)}return e.prototype.insertAggregation.call(this,t,i,o,r)};c.prototype.addItem=function(t){this.addAggregation("items",t,false);this._getTabStrip().addItem(new d({key:t.getId(),text:t.getName(),additionalText:t.getAdditionalText(),icon:t.getIcon(),iconTooltip:t.getIconTooltip(),modified:t.getModified(),tooltip:t.getTooltip(),customData:t.getCustomData()}));return this};c.prototype.destroyItems=function(){this._getTabStrip().destroyItems();this.setAssociation("selectedItem",null);return this.destroyAggregation("items")};c.prototype.insertItem=function(t,e){this._getTabStrip().insertItem(new d({key:t.getId(),text:t.getName(),additionalText:t.getAdditionalText(),icon:t.getIcon(),iconTooltip:t.getIconTooltip(),modified:t.getModified(),tooltip:t.getTooltip(),customData:t.getCustomData()}),e);return this.insertAggregation("items",t,e)};c.prototype.removeAllItems=function(){this._getTabStrip().removeAllItems();this.setSelectedItem(null);return this.removeAllAggregation("items")};c.prototype.setAddButton=function(t){return this._getTabStrip().setAddButton(t)};c.prototype.getAddButton=function(){return this._getTabStrip().getAddButton()};c.prototype.setShowAddNewButton=function(t){this.setProperty("showAddNewButton",t,true);if(g.system.phone){t?this.addStyleClass("sapUiShowAddNewButton"):this.removeStyleClass("sapUiShowAddNewButton")}var e=this._getTabStrip();if(e){e.setAddButton(t?this._getAddNewTabButton():null)}return this};c.prototype.setSelectedItem=function(t,e){if(this.fireItemSelect({item:t})){var i=this._getTabStrip();if(t&&i){i.setSelectedItem(this._toTabStripItem(t));this._rerenderContent(t.getContent())}this.setAssociation("selectedItem",t,true);return this}if(e){e.preventDefault()}return this};c.prototype._rerenderContent=function(t){var e=this.$("content"),i;if(!t||e.length<=0){return}i=(new n).getInterface();for(var o=0;o<t.length;o++){i.renderControl(t[o])}i.flush(e[0]);i.destroy()};c.prototype._setDefaultTab=function(){var t=this.getItems()[0]||null;this.setSelectedItem(t);return t};return c});
//# sourceMappingURL=TabContainer.js.map