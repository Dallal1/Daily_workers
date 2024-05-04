/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ObjectPageSectionBase","sap/ui/Device","sap/m/Button","sap/ui/core/Element","sap/ui/core/Lib","sap/ui/core/ResizeHandler","sap/ui/core/StashedControlSupport","sap/ui/base/ManagedObjectObserver","./ObjectPageSubSection","./library","sap/m/library","./ObjectPageSectionRenderer"],function(t,e,i,o,n,s,r,a,u,l,p,d){"use strict";var h=p.ButtonType;var c=t.extend("sap.uxap.ObjectPageSection",{metadata:{library:"sap.uxap",properties:{showTitle:{type:"boolean",group:"Appearance",defaultValue:true},titleUppercase:{type:"boolean",group:"Appearance",defaultValue:true},wrapTitle:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"subSections",aggregations:{subSections:{type:"sap.uxap.ObjectPageSubSection",multiple:true,singularName:"subSection",forwarding:{getter:"_getGrid",aggregation:"content"}},heading:{type:"sap.ui.core.Control",multiple:false},_showHideAllButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_showHideButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{selectedSubSection:{type:"sap.uxap.ObjectPageSubSection",multiple:false}},designtime:"sap/uxap/designtime/ObjectPageSection.designtime"},renderer:d});c.MEDIA_RANGE=e.media.RANGESETS.SAP_STANDARD;c._getClosestSection=function(t){var e=typeof t==="string"&&o.getElementById(t)||t;return e instanceof u?e.getParent():e};c._getLibraryResourceBundle=function(){return n.getResourceBundleFor("sap.uxap")};c.prototype.getSectionText=function(t){return c._getLibraryResourceBundle().getText("SECTION_CONTROL_NAME")};c.prototype._expandSection=function(){t.prototype._expandSection.call(this)._updateShowHideAllButton(!this._thereAreHiddenSubSections())};c.prototype.init=function(){t.prototype.init.call(this);this._sContainerSelector=".sapUxAPObjectPageSectionContainer";this._onResizeRef=this._onResize.bind(this);this._oGridContentObserver=new a(this._onGridContentChange.bind(this))};c.prototype.exit=function(){this._detachMediaContainerWidthChange(this._updateImportance,this);if(this._iResizeHandlerId){s.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}if(t.prototype.exit){t.prototype.exit.call(this)}};c.prototype._onResize=function(){this._updateMultilineContent()};c.prototype._getImportanceLevelToHide=function(t){var e=this._getObjectPageLayout(),i=t||this._getCurrentMediaContainerRange(),o=e&&e.getShowOnlyHighImportance();return this._determineTheLowestLevelOfImportanceToShow(i.name,o)};c.prototype._updateImportance=function(t){var e=this._getObjectPageLayout(),i=this._getImportanceLevelToHide(t),o=this.bOutput&&this.getDomRef("header");this.getSubSections().forEach(function(t){t._applyImportanceRules(i)});this._applyImportanceRules(i);this._updateShowHideAllButton(false);o&&o.classList.toggle("sapUxAPObjectPageSectionHeaderHidden",!this._isTitleVisible());o&&o.setAttribute("aria-hidden",!this._isTitleAriaVisible());if(e&&this.getDomRef()){e._requestAdjustLayout()}};c.prototype._updateMultilineContent=function(){var t=this.getSubSections(),e=t.find(function(t){return t.getVisible()});if(e&&e.getDomRef()){var i=e._getTitleDomId(),o,n,s,r,a;if(!i){return}a=document.getElementById(e._getTitleDomId());o=a?a.offsetWidth:0;n=this.$().find(".sapUxAPObjectPageSubSectionHeaderActions").width();s=this.$("header").width();r=o+n>s;e._toggleMultiLineSectionContent(r)}};c.prototype._determineTheLowestLevelOfImportanceToShow=function(t,e){if(e||t==="Phone"){return l.Importance.High}if(t==="Tablet"){return l.Importance.Medium}return l.Importance.Low};c.prototype.connectToModels=function(){this.getSubSections().forEach(function(t){t.connectToModels()})};c.prototype._allowPropagationToLoadedViews=function(t){this.getSubSections().forEach(function(e){e._allowPropagationToLoadedViews(t)})};c.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.call(this);this._detachMediaContainerWidthChange(this._updateImportance,this);this._updateImportance();this._applyLayout()};c.prototype.onAfterRendering=function(){this._updateMultilineContent();this._attachMediaContainerWidthChange(this._updateImportance,this);this._iResizeHandlerId=s.register(this,this._onResizeRef)};c.prototype._applyLayout=function(){var t={M:2,L:3,XL:4},e=this.getSubSections();this._resetLayoutData(e);this._assignLayoutData(e,t);return this};c.prototype._getMinRequiredColspanForChild=function(t){return t?t._getMinRequiredColspan():0};c.prototype._allowAutoextendColspanForChild=function(t){return true};c.prototype._onGridContentChange=function(t){var e;if(t.type==="aggregation"&&["content","subSections"].indexOf(t.name)>-1){this.invalidate();e=t.mutation;if(e==="add"||e==="insert"){this._oGridContentObserver.observe(t.child,{properties:["visible","importance"]})}else if(t.mutation==="remove"){this._oGridContentObserver.unobserve(t.child)}}if(t.type==="property"){if(t.name==="visible"){this.invalidate()}else if(t.name==="importance"){this.setTitleVisible()}}};c.prototype._isTitleVisible=function(){return this.getShowTitle()&&this._getInternalTitleVisible()||this._getInternalTitleForceVisible()};c.prototype._isTitleAriaVisible=function(){return this.getShowTitle()||this._getInternalTitleForceVisible()};c.prototype._getInternalTitleForceVisible=function(){return this._getShouldDisplayExpandCollapseButton()||this._getShouldDisplayShowHideAllButton()};c.prototype._setSubSectionsFocusValues=function(){var t=this._getVisibleSubSections()||[],e=this.getSelectedSubSection(),i;if(t.length===0){return this}if(t.length===1){t[0]._setToFocusable(false);return this}t.forEach(function(t){if(e===t.getId()){t._setToFocusable(true);i=true}else{t._setToFocusable(false)}});if(!i){t[0]._setToFocusable(true)}return this};c.prototype._disableSubSectionsFocus=function(){var t=this.getSubSections()||[];t.forEach(function(t){t._setToFocusable(false)});return this};c.prototype._thereAreHiddenSubSections=function(){return this.getSubSections().some(function(t){return t._getIsHidden()})};c.prototype._updateShowHideSubSections=function(t){this.getSubSections().forEach(function(e){if(t&&e._shouldBeHidden()){e._updateShowHideState(true)}else if(!t){e._updateShowHideState(false)}})};c.prototype._getShouldDisplayShowHideAllButton=function(){return this.getSubSections().some(function(t){return t._shouldBeHidden()})};c.prototype._getShouldDisplayExpandCollapseButton=function(){return this._getIsHidden()};c.prototype._showHideContentAllContent=function(){var t=this._thereAreHiddenSubSections();if(this._getIsHidden()&&t){this._updateShowHideState(false)}this._updateShowHideSubSections(!t);this._updateShowHideAllButton(t)};c.prototype._updateShowHideState=function(e){if(this._getIsHidden()===e){return this}this._updateShowHideButton(e);this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton());return t.prototype._updateShowHideState.call(this,e)};c.prototype._updateShowHideAllButton=function(t){this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton()).setText(this._getShowHideAllButtonText(t))};c.prototype._getVisibleSubSections=function(){return this.getSubSections().filter(function(t){return t.getVisible()&&t._getInternalVisible()})};c.prototype._getShowHideAllButton=function(){if(!this.getAggregation("_showHideAllButton")){this.setAggregation("_showHideAllButton",new i({visible:this._getShouldDisplayShowHideAllButton(),text:this._getShowHideAllButtonText(!this._thereAreHiddenSubSections()),press:this._showHideContentAllContent.bind(this),type:h.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"),true)}return this.getAggregation("_showHideAllButton")};c.prototype._getShowHideButtonText=function(t){return c._getLibraryResourceBundle().getText(t?"HIDE":"SHOW")};c.prototype._getShowHideAllButtonText=function(t){return c._getLibraryResourceBundle().getText(t?"HIDE_ALL":"SHOW_ALL")};c.prototype._updateShowHideButton=function(t){this._getShowHideButton().setVisible(this._shouldBeHidden()).setText(this._getShowHideButtonText(!t))};c.prototype._getShowHideButton=function(){if(!this.getAggregation("_showHideButton")){this.setAggregation("_showHideButton",new i({visible:this._shouldBeHidden(),text:this._getShowHideButtonText(!this._getIsHidden()),press:this._showHideContent.bind(this),type:h.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"),true)}return this.getAggregation("_showHideButton")};r.mixInto(c);return c});
//# sourceMappingURL=ObjectPageSection.js.map