/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/commons/CalloutBase","sap/ui/core/delegate/ItemNavigation","./ActionBar","./library","./QuickViewRenderer","sap/ui/core/TooltipBase"],function(jQuery,t,e,i,o,n,a){"use strict";var r=o.FollowActionState;var s=t.extend("sap.ui.ux3.QuickView",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{type:{type:"string",group:"Misc",defaultValue:null},firstTitle:{type:"string",group:"Misc",defaultValue:null},firstTitleHref:{type:"string",group:"Misc",defaultValue:null},secondTitle:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showActionBar:{type:"boolean",group:"Misc",defaultValue:true},followState:{type:"sap.ui.ux3.FollowActionState",group:"Misc",defaultValue:r.Default},flagState:{type:"boolean",group:"Misc",defaultValue:false},favoriteState:{type:"boolean",group:"Misc",defaultValue:false},favoriteActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},updateActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},followActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},flagActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},openActionEnabled:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{content:{type:"sap.ui.core.Element",multiple:true,singularName:"content"},actions:{type:"sap.ui.ux3.ThingAction",multiple:true,singularName:"action"},actionBar:{type:"sap.ui.ux3.ActionBar",multiple:false}},events:{actionSelected:{parameters:{id:{type:"string"},action:{type:"sap.ui.ux3.ThingAction"},newState:{type:"string"}}},feedSubmit:{parameters:{text:{type:"string"}}},navigate:{allowPreventDefault:true,parameters:{href:{type:"string"}}}}}});s.prototype.init=function(){var e;function o(t){var e=t.getParameters();this.fireActionSelected(e)}function n(t){var e=t.getParameters();this.fireFeedSubmit(e)}t.prototype.init.call(this);if(!this.getActionBar()){e=new i;e.attachActionSelected(jQuery.proxy(o,this));e.attachFeedSubmit(jQuery.proxy(n,this));this.setAggregation("actionBar",e,true)}};s.prototype.onmouseover=function(t){var e=this._getPopup();if(e.isOpen()&&e.getContent()==this){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null}return}a.prototype.onmouseover.call(this,t)};s.prototype.onAfterRendering=function(){var t=this.getDomRef(),i=[];var o=this.$("title");i.push(o);o=this.$("link");if(!o.length){o=this.$("name")}if(!o.length){return}i.push(o);o=this.$("descr");if(o.length){i.push(o)}if(!this.oItemNavigation){this.oItemNavigation=new e(null,null,false);this.addDelegate(this.oItemNavigation)}this.oItemNavigation.setRootDomRef(t);this.oItemNavigation.setItemDomRefs(i);this.oItemNavigation.setCycling(false);this.oItemNavigation.setSelectedIndex(1);this.oItemNavigation.setPageSize(i.length)};s.prototype.onclick=function(t){var e=t.target;if(!e||!e.hasAttribute("href")){return}if(!this.fireEvent("navigate",{href:e.href},true,false)){t.preventDefault()}};s.prototype.exit=function(){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation}};s.prototype.insertAction=function(t,e){if(this.getActionBar()){this.getActionBar().insertBusinessAction(t,e)}return this};s.prototype.addAction=function(t){if(this.getActionBar()){this.getActionBar().addBusinessAction(t)}return this};s.prototype.removeAction=function(t){if(this.getActionBar()){this.getActionBar().removeBusinessAction(t)}return this};s.prototype.removeAllActions=function(){if(this.getActionBar()){this.getActionBar().removeAllBusinessActions()}return this};s.prototype.getActions=function(){if(this.getActionBar()){this.getActionBar().getBusinessActions()}return this};s.prototype.destroyActions=function(){if(this.getActionBar()){this.getActionBar().destroyBusinessActions()}return this};s.prototype.setFollowState=function(t){if(this.getActionBar()){this.getActionBar().setFollowState(t)}return this};s.prototype.getFollowState=function(){var t=null;if(this.getActionBar()){t=this.getActionBar().getFollowState()}return t};s.prototype.setFlagState=function(t){if(this.getActionBar()){this.getActionBar().setFlagState(t)}return this};s.prototype.getFlagState=function(){var t=null;if(this.getActionBar()){t=this.getActionBar().getFlagState()}return t};s.prototype.setFavoriteState=function(t){if(this.getActionBar()){this.getActionBar().setFavoriteState(t)}return this};s.prototype.getFavoriteState=function(){var t=null;if(this.getActionBar()){t=this.getActionBar().getFavoriteState()}return t};s.prototype.setFavoriteActionEnabled=function(t){if(this.getActionBar()){this.getActionBar().setShowFavorite(t)}return this};s.prototype.getFavoriteActionEnabled=function(){var t;if(this.getActionBar()){t=this.getActionBar().getShowFavorite()}return t};s.prototype.setFlagActionEnabled=function(t){if(this.getActionBar()){this.getActionBar().setShowFlag(t)}return this};s.prototype.getFlagActionEnabled=function(){var t;if(this.getActionBar()){t=this.getActionBar().getShowFlag()}return t};s.prototype.setUpdateActionEnabled=function(t){if(this.getActionBar()){this.getActionBar().setShowUpdate(t)}return this};s.prototype.getUpdateActionEnabled=function(){var t;if(this.getActionBar()){t=this.getActionBar().getShowUpdate()}return t};s.prototype.setFollowActionEnabled=function(t){if(this.getActionBar()){this.getActionBar().setShowFollow(t)}return this};s.prototype.getFollowActionEnabled=function(){var t;if(this.getActionBar()){t=this.getActionBar().getShowFollow()}return t};s.prototype.setOpenActionEnabled=function(t){if(this.getActionBar()){this.getActionBar().setShowOpen(t)}return this};s.prototype.getOpenActionEnabled=function(){var t;if(this.getActionBar()){t=this.getActionBar().getShowOpen()}return t};s.prototype.setIcon=function(t){this.setProperty("icon",t);if(this.getActionBar()){this.getActionBar().setThingIconURI(t)}return this};s.prototype.setActionBar=function(t){this.setAggregation("actionBar",t,true);if(this.getIcon()&&this.getActionBar()){this.getActionBar().setThingIconURI(this.getIcon())}return this};return s});
//# sourceMappingURL=QuickView.js.map