/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Lib","sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/CustomData","sap/ui/Device","sap/m/Breadcrumbs","./ObjectPageHeaderActionButton","sap/ui/core/ResizeHandler","sap/m/Button","sap/m/ActionSheet","./ObjectImageHelper","./ObjectPageHeaderContent","./library","sap/m/library","./ObjectPageHeaderRenderer"],function(t,e,jQuery,i,o,n,a,r,s,l,c,u,p,h,g,d,f){"use strict";var _=g.Importance;var y=d.ButtonType;var b=d.PlacementType;var I=g.ObjectPageHeaderDesign;var A=d.AvatarShape;var m=d.AvatarColor;function P(t){return typeof t==="function"}var v=i.extend("sap.uxap.ObjectPageHeader",{metadata:{library:"sap.uxap",interfaces:["sap.uxap.IHeaderTitle"],properties:{objectImageURI:{type:"string",defaultValue:null},objectImageAlt:{type:"string",defaultValue:""},objectImageDensityAware:{type:"boolean",defaultValue:false},objectTitle:{type:"string",defaultValue:null},objectSubtitle:{type:"string",defaultValue:null},objectImageShape:{type:"sap.m.AvatarShape",group:"Appearance",defaultValue:A.Square},objectImageBackgroundColor:{type:"sap.m.AvatarColor",group:"Appearance",defaultValue:m.Accent6},isObjectIconAlwaysVisible:{type:"boolean",defaultValue:false},isObjectTitleAlwaysVisible:{type:"boolean",defaultValue:true},isObjectSubtitleAlwaysVisible:{type:"boolean",defaultValue:true},isActionAreaAlwaysVisible:{type:"boolean",defaultValue:true},headerDesign:{type:"sap.uxap.ObjectPageHeaderDesign",defaultValue:I.Light,deprecated:true},showTitleSelector:{type:"boolean",group:"Misc",defaultValue:false},markFavorite:{type:"boolean",group:"Misc",defaultValue:false},markFlagged:{type:"boolean",group:"Misc",defaultValue:false},showMarkers:{type:"boolean",group:"Misc",defaultValue:false},markLocked:{type:"boolean",group:"Misc",defaultValue:false},showPlaceholder:{type:"boolean",group:"Misc",defaultValue:false},markChanges:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"actions",aggregations:{_breadCrumbs:{type:"sap.m.Breadcrumbs",multiple:false,visibility:"hidden"},breadcrumbs:{type:"sap.m.Breadcrumbs",multiple:false,singularName:"breadcrumb"},breadCrumbsLinks:{type:"sap.m.Link",multiple:true,singularName:"breadCrumbLink",deprecated:true},_overflowButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_objectImage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_placeholder:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"},_lockIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_lockIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_titleArrowIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_titleArrowIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_favIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_flagIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_overflowActionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_changesIconCont:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_changesIcon:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_sideContentBtn:{type:"sap.m.Button",multiple:false,visibility:"hidden"},navigationBar:{type:"sap.m.Bar",multiple:false},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},sideContentButton:{type:"sap.m.Button",multiple:false},titleSelectorTooltip:{type:"sap.ui.core.TooltipBase",altTypes:["string"],multiple:false}},events:{titleSelectorPress:{parameters:{domRef:{type:"string"}}},markLockedPress:{parameters:{domRef:{type:"string"}}},markChangesPress:{parameters:{domRef:{type:"string"}}}},designtime:"sap/uxap/designtime/ObjectPageHeader.designtime"},renderer:f});v.prototype._iAvailablePercentageForActions=.3;v.prototype.init=function(){this._bFirstRendering=true;if(!this.oLibraryResourceBundle){this.oLibraryResourceBundle=e.getResourceBundleFor("sap.m")}if(!this.oLibraryResourceBundleOP){this.oLibraryResourceBundleOP=e.getResourceBundleFor("sap.uxap")}this._oOverflowActionSheet=this._lazyLoadInternalAggregation("_overflowActionSheet",true);this._oOverflowButton=this._lazyLoadInternalAggregation("_overflowButton",true).attachPress(this._handleOverflowButtonPress,this);this._oExpandButton=this._lazyLoadInternalAggregation("_expandButton",true);this._oActionSheetButtonMap={};this._oFlagIcon=this._lazyLoadInternalAggregation("_flagIcon",true);this._oFavIcon=this._lazyLoadInternalAggregation("_favIcon",true);this._oTitleArrowIcon=this._lazyLoadInternalAggregation("_titleArrowIcon",true).attachPress(this._handleArrowPress,this);this._oTitleArrowIconCont=this._lazyLoadInternalAggregation("_titleArrowIconCont",true).attachPress(this._handleArrowPress,this);this._oLockIcon=this._lazyLoadInternalAggregation("_lockIcon",true).attachPress(this._handleLockPress,this);this._oLockIconCont=this._lazyLoadInternalAggregation("_lockIconCont",true).attachPress(this._handleLockPress,this);this._oChangesIcon=this._lazyLoadInternalAggregation("_changesIcon",true).attachPress(this._handleChangesPress,this);this._oChangesIconCont=this._lazyLoadInternalAggregation("_changesIconCont",true).attachPress(this._handleChangesPress,this)};v.getMetadata().forwardAggregation("breadCrumbsLinks",{getter:function(){return this._lazyLoadInternalAggregation("_breadCrumbs")},aggregation:"links"});v.prototype._handleOverflowButtonPress=function(t){this._oOverflowActionSheet.openBy(this._oOverflowButton)};v.prototype._handleArrowPress=function(t){this.fireTitleSelectorPress({domRef:t.getSource().getDomRef()})};v.prototype._handleLockPress=function(t){this.fireMarkLockedPress({domRef:t.getSource().getDomRef()})};v.prototype._handleChangesPress=function(t){this.fireMarkChangesPress({domRef:t.getSource().getDomRef()})};v._internalAggregationFactory={_objectImage:p.createObjectImage,_placeholder:p.createPlaceholder,_overflowActionSheet:function(){return new u({placement:b.Bottom})},_lockIconCont:function(t){return this._getButton(t,"sap-icon://private","lock-cont",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_LOCK_MARK_VALUE"))},_breadCrumbs:function(t){return new r({links:t.getAggregation("breadCrumbLinks")})},_lockIcon:function(t){return this._getButton(t,"sap-icon://private","lock",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_LOCK_MARK_VALUE"))},_titleArrowIconCont:function(t){return this._getButton(t,"sap-icon://slim-arrow-down","titleArrow-cont",t.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP"))},_titleArrowIcon:function(t){return this._getButton(t,"sap-icon://slim-arrow-down","titleArrow",t.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP"))},_favIcon:function(t){return this._getIcon(t,"favorite",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_FAVORITE_MARK_VALUE"))},_flagIcon:function(t){return this._getIcon(t,"flag",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_FLAG_MARK_VALUE"))},_overflowButton:function(t){return this._getButton(t,"sap-icon://overflow","overflow",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_OVERFLOW_BTN"))},_expandButton:function(t){return this._getButton(t,"sap-icon://slim-arrow-down","expand",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_EXPAND_HEADER_BTN"))},_changesIconCont:function(t){return this._getButton(t,"sap-icon://user-edit","changes-cont",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_CHANGES_MARK_VALUE"))},_changesIcon:function(t){return this._getButton(t,"sap-icon://user-edit","changes",t.oLibraryResourceBundleOP.getText("TOOLTIP_OP_CHANGES_MARK_VALUE"))},_getIcon:function(t,e,i){return o.createControlByURI({id:this._getParentAugmentedId(t,e),tooltip:i,src:o.getIconURI(e),visible:false})},_getButton:function(t,e,i,o){return new c({id:this._getParentAugmentedId(t,i),tooltip:o,icon:e,type:y.Transparent})},_getParentAugmentedId:function(t,e){return t.getId()+"-"+e}};v.prototype._lazyLoadInternalAggregation=function(t,e){if(!this.getAggregation(t)){this.setAggregation(t,v._internalAggregationFactory[t](this),e)}return this.getAggregation(t)};v.prototype._applyActionProperty=function(t,e){var i=e[0];if(this.getProperty(t)!==i){e.unshift(t);this.setProperty.apply(this,e);if(!this._bFirstRendering){this._notifyParentOfChanges()}}return this};v.prototype._applyObjectImageProperty=function(t,e){var i=e[0];if(this.getProperty(t)!==i){e.unshift(t);this.setProperty.apply(this,e);this._destroyObjectImage();if(!this._bFirstRendering){this._notifyParentOfChanges(true)}}return this};v.prototype._setAggregationTooltip=function(t,e){var i=this.getAggregation(t);if(i){i.setTooltip(e)}return this};v.prototype._setTitleSelectorTooltip=function(t){if(t===null||t===undefined){t=this.oLibraryResourceBundleOP.getText("OP_SELECT_ARROW_TOOLTIP")}this._setAggregationTooltip("_titleArrowIcon",t);this._setAggregationTooltip("_titleArrowIconCont",t);return this};v.prototype.setHeaderDesign=function(t){this.setProperty("headerDesign",t);if(this.getParent()){this.getParent().invalidate()}return this};v.prototype.setObjectTitle=function(t){var e=this.getParent(),i=this.getProperty("objectTitle"),o=i!==t;this._applyActionProperty("objectTitle",Array.prototype.slice.call(arguments));e&&P(e._updateAriaLabels)&&e._updateAriaLabels();if(o&&this.mEventRegistry["_titleChange"]){this.fireEvent("_titleChange",{id:this.getId(),name:"objectTitle",oldValue:i,newValue:t})}return this};var O=["objectSubtitle","showTitleSelector","markLocked","markFavorite","markFlagged","showMarkers","showPlaceholder","markChanges"],T=["objectImageURI","objectImageAlt","objectImageDensityAware","objectImageShape","objectImageBackgroundColor"];var B=function(t){var e="set"+t.charAt(0).toUpperCase()+t.slice(1);v.prototype[e]=function(){var e=Array.prototype.slice.call(arguments);this._applyActionProperty.call(this,t,e);return this}};var L=function(t){var e="set"+t.charAt(0).toUpperCase()+t.slice(1);v.prototype[e]=function(){var e=Array.prototype.slice.call(arguments);this._applyObjectImageProperty.call(this,t,e);return this}};var w=function(t,e,i){var o="set"+t.charAt(0).toUpperCase()+t.slice(1);e[o]=function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);i.setProperty.apply(i,e);return this.setProperty.apply(this,e)}};O.forEach(B);T.forEach(L);v.prototype._destroyObjectImage=function(){var t="_objectImage",e=this.getAggregation(t);if(e){e.destroy();this.setAggregation(t,null)}};v.prototype.onBeforeRendering=function(){var t=this.getSideContentButton(),e=this;if(t&&!t.getTooltip()){t.setTooltip(this.oLibraryResourceBundleOP.getText("TOOLTIP_OP_SHOW_SIDE_CONTENT"))}var i=this.getActions()||[];this._oOverflowActionSheet.removeAllButtons();this._resetActionSheetMap();if(i.length>1||this._hasOneButtonShowText(i)){i.forEach(function(t){if(t instanceof c&&!(t instanceof s)){t._bInternalVisible=t.getVisible();t._getInternalVisible=function(){return this._bInternalVisible};t._setInternalVisible=function(t,e){this.$().toggle(t);if(t!=this._bInternalVisible){this._bInternalVisible=t;if(e){this.invalidate()}}};t.setVisible=function(i){t._setInternalVisible(i,true);c.prototype.setVisible.call(this,i);e._adaptLayout()};t.onAfterRendering=function(){if(!this._getInternalVisible()){this.$().hide()}e._resizeIdentifierLineContainer(e.$())}}if(t instanceof c&&t.getVisible()){var i=this._createActionSheetButton(t);this._oActionSheetButtonMap[t.getId()]=i;this._oOverflowActionSheet.addButton(i);w("text",t,i);w("icon",t,i);w("enabled",t,i);w("type",t,i)}},this)}this._oTitleArrowIcon.setVisible(this.getShowTitleSelector());this._oFavIcon.setVisible(this.getMarkFavorite());this._oFlagIcon.setVisible(this.getMarkFlagged());this._attachDetachActionButtonsHandler(false);if(this._iResizeId){l.deregister(this._iResizeId);this._iResizeId=null}this._bFirstRendering=false};v.prototype._resetActionSheetMap=function(){Object.keys(this._oActionSheetButtonMap).forEach(function(t){this._oActionSheetButtonMap[t].destroy()}.bind(this));this._oActionSheetButtonMap={}};v.prototype._createActionSheetButton=function(t){return new c({press:jQuery.proxy(this._onSeeMoreContentSelect,this),enabled:t.getEnabled(),text:t.getText(),icon:t.getIcon(),type:t.getType(),tooltip:t.getTooltip(),customData:new n({key:"originalId",value:t.getId()})})};v.prototype._handleImageNotFoundError=function(){var t=this._lazyLoadInternalAggregation("_objectImage"),e=this.getParent(),i=e?e.$():this.$();if(this.getShowPlaceholder()){i.find(".sapMImg.sapUxAPObjectPageHeaderObjectImage").hide();i.find(".sapUxAPObjectPageHeaderPlaceholder").removeClass("sapUxAPHidePlaceholder")}else{t.addStyleClass("sapMNoImg")}};v.prototype._clearImageNotFoundHandler=function(){this._lazyLoadInternalAggregation("_objectImage").$().off("error")};v.prototype.onAfterRendering=function(){var t=this._lazyLoadInternalAggregation("_objectImage").$();if(this._adaptLayoutTimeout){clearTimeout(this._adaptLayoutTimeout)}this._adaptLayout();this._clearImageNotFoundHandler();t.on("error",this._handleImageNotFoundError.bind(this));if(!this.getObjectImageURI()){this._handleImageNotFoundError()}if(!this._iResizeId){this._iResizeId=l.register(this,this._onHeaderResize.bind(this))}this._attachDetachActionButtonsHandler(true)};v.prototype._onHeaderResize=function(t){this._adaptLayout();if(this.getParent()&&typeof this.getParent()._onUpdateHeaderTitleSize==="function"){this.getParent()._onUpdateHeaderTitleSize(t)}};v.prototype._attachDetachActionButtonsHandler=function(t){var e=this.getActions()||[];if(e.length<1){return}e.forEach(function(e){if(e instanceof c){var i=this._oActionSheetButtonMap[e.getId()];if(t){e.attachEvent("_change",this._adaptLayoutDelayed,this);if(i){i.attachEvent("_change",this._adaptOverflow,this)}}else{e.detachEvent("_change",this._adaptLayoutDelayed,this);if(i){i.detachEvent("_change",this._adaptOverflow,this)}}}},this)};v.prototype._onSeeMoreContentSelect=function(e){var i=e.getSource(),o=t.getElementById(i.data("originalId"));if(o.firePress){o.firePress({overflowButtonId:this._oOverflowButton.getId(),bInOverflow:true})}this._oOverflowActionSheet.close()};v._actionImportanceMap={Low:3,Medium:2,High:1};v._sortActionsByImportance=function(t,e){var i=t instanceof s?t.getImportance():_.High,o=e instanceof s?e.getImportance():_.High,n=v._actionImportanceMap[i]-v._actionImportanceMap[o];if(n===0){return t.position-e.position}return n};v.prototype._hasOneButtonShowText=function(t){var e=false;if(t.length!==1){return e}if(t[0]instanceof s){e=!t[0].getHideText()&&t[0].getText()!=""}else if(t[0]instanceof c){e=t[0].getText()!=""}return e};v.prototype._adaptLayout=function(t){var e=this.$("identifierLine"),i=e.width(),o=this._getActionsWidth(),n=o/i,r=this._iAvailablePercentageForActions*i,l=this._oOverflowButton.$();if(i===0){return}if(n>this._iAvailablePercentageForActions){this._adaptActions(r)}else if(t&&t.getSource()instanceof s){t.getSource()._setInternalVisible(true)}if(a.system.phone){this.getActions().forEach(function(t){if(t instanceof c){t.$().css("visibility","visible")}})}var u=this.$("actions");var p=u.find(".sapMBtn").not(".sapUxAPObjectPageHeaderExpandButton");if(p.filter(":visible").length===p.length){l.hide()}this._adaptObjectPageHeaderIndentifierLine(this.$())};v.prototype._adaptLayoutDelayed=function(){if(this._adaptLayoutTimeout){clearTimeout(this._adaptLayoutTimeout)}this._adaptLayoutTimeout=setTimeout(function(){this._adaptLayoutTimeout=null;this._adaptLayout()}.bind(this),0)};v.prototype._adaptObjectPageHeaderIndentifierLine=function(t){var e=this._findById(t,"identifierLine"),i=e.find(".sapUxAPObjectPageHeaderIdentifierTitle");this._adaptObjectPageHeaderTitle(i);this._resizeIdentifierLineContainer(t)};v.prototype._resizeIdentifierLineContainer=function(t){var e=this._findById(t,"identifierLineContainer"),i=this._findById(t,"actions"),o=this._findById(t,"identifierLine"),n=o.width(),a=t?t.find(".sapUxAPObjectPageHeaderObjectImageContainer"):this.$().find(".sapUxAPObjectPageHeaderObjectImageContainer"),r=i.width()+a.width();e.width((.95-r/n)*100+"%")};v.prototype._adaptObjectPageHeaderTitle=function(t){var e=t.width(),i=t.find(".sapUxAPObjectPageHeaderTitleText"),o=i.length,n;for(var a=0;a<o;a++){n=jQuery(i.get(a));n.toggleClass("sapUxAPObjectPageHeaderTitleTextRestrictedWidth",false);if(n.width()>e){n.toggleClass("sapUxAPObjectPageHeaderTitleTextRestrictedWidth",true)}}};v.prototype._adaptActions=function(t){var e=g.Utilities.isPhoneScenario(this._getCurrentMediaContainerRange())||a.system.phone,i=this._oOverflowButton.$(),o=i.show().width(),n=this.getActions(),r=n.length,s;for(var l=0;l<r;l++){n[l].position=l}n.sort(v._sortActionsByImportance);n.forEach(function(n){s=this._oActionSheetButtonMap[n.getId()];if(s){o+=n.$().width();if(t>o&&!e){this._setActionButtonVisibility(n,true);i.hide()}else{this._setActionButtonVisibility(n,false);i.show()}}},this)};v.prototype._adaptOverflow=function(){var t=this._oOverflowActionSheet.getButtons();var e=t.some(function(t){return t.getVisible()});this._oOverflowButton.$().toggle(e)};v.prototype._setActionButtonVisibility=function(t,e){var i=this._oActionSheetButtonMap[t.getId()];if(i){if(t.getVisible()){t._setInternalVisible(e);i.setVisible(!e)}else{i.setVisible(false)}}};v.prototype._getActionsWidth=function(){var t=0;this.getActions().forEach(function(e){if(e instanceof c){e.$().show();if(a.system.phone){e.$().css("visibility","hidden")}t+=e.$().outerWidth(true)}});return t};v.prototype._findById=function(t,e){var i;if(!e||!t){return null}e=this.getId()+"-"+e;i="#"+e.replace(/(:|\.)/g,"\\$1");return t.find(i)};v.prototype._getBreadcrumbsAggregation=function(){var t=this.getBreadcrumbs(),e=this._lazyLoadInternalAggregation("_breadCrumbs",true);return t||(e&&e.getLinks().length?e:null)};v.prototype._notifyParentOfChanges=function(t){var e=this.getParent();if(e&&typeof e._headerTitleChangeHandler==="function"){e._headerTitleChangeHandler(t)}};v.prototype.setTitleSelectorTooltip=function(t){this._setTitleSelectorTooltip(t);this.setAggregation("titleSelectorTooltip",t,true);return this};v.prototype.destroyTitleSelectorTooltip=function(){this._setTitleSelectorTooltip(null);this.destroyAggregation("titleSelectorTooltip",true);return this};v.prototype.exit=function(){this._clearImageNotFoundHandler();if(this._iResizeId){l.deregister(this._iResizeId);this._iResizeId=null}this._resetActionSheetMap()};v.prototype.setNavigationBar=function(t){this.setAggregation("navigationBar",t);if(t&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{parent:this,adaptableContent:t})}return this};v.prototype._getAdaptableContent=function(){return this.getNavigationBar()};v.prototype.isDynamic=function(){return false};v.prototype.getCompatibleHeaderContentClass=function(){return h};v.prototype.supportsToggleHeaderOnTitleClick=function(){return false};v.prototype.supportsTitleInHeaderContent=function(){return true};v.prototype.supportsAdaptLayoutForDomElement=function(){return true};v.prototype.supportsBackgroundDesign=function(){return false};v.prototype.getTitleText=function(){return this.getObjectTitle()};v.prototype.snap=function(){this._adaptLayout()};v.prototype.unSnap=function(){this._adaptLayout()};v.prototype._toggleExpandButton=function(t){};v.prototype._setShowExpandButton=function(t){};v.prototype._focusExpandButton=function(){};v.prototype._toggleFocusableState=function(t){};return v});
//# sourceMappingURL=ObjectPageHeader.js.map