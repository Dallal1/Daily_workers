/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Element","sap/ui/core/Lib","sap/ui/integration/library","sap/ui/core/Control","sap/m/HBox","sap/m/Image","sap/m/ToggleButton","./Card","sap/ui/core/Core","sap/ui/dom/includeStylesheet"],function(e,t,i,o,r,s,a,n,l,g,d){"use strict";var u=o.CardDataMode,h=o.CardPreviewMode;var p=r.extend("sap.ui.integration.designtime.editor.CardPreview",{metadata:{library:"sap.ui.integration",properties:{settings:{type:"any"},card:{type:"object"},parentWidth:{type:"sap.ui.core.CSSSize"},parentHeight:{type:"sap.ui.core.CSSSize"}},aggregations:{cardPreview:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{_editor:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:2,render:function(t,i){if(i._getCurrentMode()==="None"){t.openStart("div",i);t.openEnd();t.close("div");return}t.openStart("div",i);t.class("sapUiIntegrationDTPreview");if((!i.getSettings().preview||i.getSettings().preview.scaled!==false)&&i._getCurrentSize()!=="Full"){t.class("sapUiIntegrationDTPreviewScaleBackground")}if(c()){t.class("sapUiIntegrationDTPreviewDark")}var o=i.getSettings().preview.position;if(o==="separate"){t.class("sapUiIntegrationDTPreviewSeparate");document.body.style.setProperty("--sapUiIntegrationEditorPreviewWidth","100%");document.body.style.setProperty("--sapUiIntegrationEditorPreviewHeight","100%")}t.openEnd();t.openStart("div",i.getId()+"-card");if(!i.getSettings().preview||i.getSettings().preview.scaled!==false){if(i._getCurrentSize()!=="Full"){t.class("sapUiIntegrationDTPreviewScale");var r=e.getLanguage().replaceAll("_","-");if(r.startsWith("ar")||r.startsWith("he")){t.class("withSpec")}else{t.class("noSpec")}}else{t.class("sapUiIntegrationDTPreviewNoScale")}}else{t.class("sapUiIntegrationDTPreviewNoScale")}t.openEnd();t.openStart("div",i.getId()+"-before");t.attr("tabindex","-1");t.openEnd();t.close("div");t.renderControl(i._getCardPreview());t.openStart("div",i.getId()+"-after");t.attr("tabindex","-1");t.openEnd();t.close("div");t.close("div");var s=i._getModes();if(s.indexOf("Abstract")>-1&&(s.indexOf("Live")>-1||s.indexOf("MockData")>-1)){t.renderControl(i._getModeToggleButton())}if(s!=="Abstract"&&(!o||o==="right"||o==="left")){t.renderControl(i._getResizeToggleButton())}if(o==="top"||o==="bottom"){document.body.style.setProperty("--sapUiIntegrationEditorPreviewWidth",i.getEditor().getWidth())}document.body.style.setProperty("--sapUiIntegrationEditorPreviewHeight",i.getEditor().getHeight());t.close("div")}}});p.prototype.init=function(){this._oResourceBundle=i.getResourceBundleFor("sap.ui.integration");g.attachThemeChanged(function(){if(this.getDomRef()){if(c()){this.getDomRef().classList.add("sapUiIntegrationDTPreviewDark")}else{this.getDomRef().classList.remove("sapUiIntegrationDTPreviewDark")}}else{this.update()}}.bind(this))};p.prototype.destroy=function(){if(this._oModeToggleButton){this._oModeToggleButton.destroy()}if(this._oCardPreview){this._oCardPreview.destroy()}if(this._oImagePlaceholder){this._oImagePlaceholder.destroy()}if(this._oCardPlaceholder){this._oCardPlaceholder.destroy()}r.prototype.destroy.apply(this,arguments);document.body.style.removeProperty("--sapUiIntegrationEditorPreviewWidth");document.body.style.removeProperty("--sapUiIntegrationEditorPreviewHeight");document.body.style.removeProperty("--sapUiIntegrationEditorPreviewCardHeight")};p.prototype.onAfterRendering=function(){var e=this.getAggregation("cardPreview"),i=this._getModes();if((i.indexOf("Live")>-1||i.indexOf("MockData")>-1)&&e&&e.getDomRef()&&e.getDomRef().getElementsByClassName("sapVizFrame")){window.setTimeout(function(){try{var i=e.getDomRef().getElementsByClassName("sapVizFrame")[0].id;var o=t.getElementById(i);if(o.getVizProperties()&&o.getVizProperties().legendGroup.layout.position==="bottom"&&o.getVizProperties().legendGroup.layout.alignment==="center"){e.getDomRef().getElementsByClassName("v-m-legend")[0].transform.baseVal[0].matrix.e=110}}catch(e){}},500)}};p.prototype.getEditor=function(){var e=this.getAssociation("_editor");return t.getElementById(e)};p.prototype._getCardPreview=function(){var e=null;if(this._getCurrentMode()==="Abstract"&&this.getSettings().preview.src){e=this._getImagePlaceholder()}else if(this._getCurrentMode()!=="None"){e=this._getCardRealPreview()}if(e){this.setAggregation("cardPreview",e);e.removeStyleClass("sapUiIntegrationDTPreviewCard");e.addStyleClass("sapUiIntegrationDTPreviewCard")}return e};p.prototype.getTransformContentInfo=function(){return{transformStyle:"scale3d(0.45, 0.45, 1)",transformFactor:.45,transformOriginStyle:"0 0",widthStyle:"400px + 10rem",heightStyle:"700px - 1.5rem",zIndex:this.getEditor()._iZIndex}};p.prototype._getCardRealPreview=function(){var e=this;if(!this._oCardPreview){var t=!this.getSettings().preview.interactive;this._oCardPreview=new l({dataMode:u.Active,readonly:t,readonlyZIndex:this.getEditor()._iZIndex+1});this._oCardPreview.setBaseUrl(this.getCard().getBaseUrl());if(t){this._oCardPreview.onfocusin=this._onfocusin.bind(this)}this._oCardPreview.attachEvent("_ready",function(){var e=this._oCardPreview.getCardContent();if(e){e.addEventDelegate({onAfterRendering:function(){this._resetHeight()}},this)}}.bind(this));this._oCardPreview.onAfterRendering=function(){l.prototype.onAfterRendering.call(this);e._resetHeight()}}if(this._currentMode==="MockData"){this._oCardPreview.setPreviewMode(h.MockData)}else if(this._currentMode==="Abstract"){this._oCardPreview.setPreviewMode(h.Abstract)}else if(this._currentMode==="Live"){this._oCardPreview.setPreviewMode(h.Off)}this._initalChanges=this._initalChanges||this._oCardPreview.getManifestChanges()||[];var i=this._initalChanges.concat([this.getEditor().getCurrentSettings()]);this._oCardPreview.setManifestChanges(i);this._oCardPreview.setManifest(this.getCard()._oCardManifest._oManifest.getRawJson());this._oCardPreview.setHost(this.getCard().getHost());this._oCardPreview.refresh();this._oCardPreview.editor=this._oCardPreview.editor||{};this._oCardPreview.preview=this._oCardPreview.editor.preview=this;return this._oCardPreview};p.prototype._resetHeight=function(){var e=this._oCardPreview.getDomRef();if(e){var t=e.offsetHeight;if(this._getCurrentSize()!=="Full"){document.body.style.setProperty("--sapUiIntegrationEditorPreviewCardHeight",t*.45+"px")}else{document.body.style.setProperty("--sapUiIntegrationEditorPreviewCardHeight",t+"px")}}};p.prototype._getImagePlaceholder=function(){var e=this.getSettings();if(e.preview.src){if(!this._oImagePlaceholder){var t=new s;t.addStyleClass("sapFCard");var i=this.getCard().getBaseUrl();if(!i&&typeof this.getCard().getManifest()==="string"){i=this.getCard().getManifest();i=i.substring(0,i.lastIndexOf("/")+1)}var o=i+"/"+e.preview.src;var r=new a({src:o});r.addStyleClass("sapUiIntegrationDTPreviewImg");t.addItem(r);this._oImagePlaceholder=t}}return this._oImagePlaceholder};p.prototype._onfocusin=function(e){if(this._oModeToggleButton){if(e.srcControl!==this._oModeToggleButton&&e.relatedTarget!==this._oModeToggleButton.getDomRef()&&e.relatedTarget!==this.getDomRef("after")){this.getDomRef("after").focus()}else{this.getDomRef("before").focus()}}else if(this._oSizeToggleButton){if(e.srcControl!==this._oSizeToggleButton&&e.relatedTarget!==this._oSizeToggleButton.getDomRef()&&e.relatedTarget!==this.getDomRef("after")){this.getDomRef("after").focus()}else{this.getDomRef("before").focus()}}else if(e.srcControl.isA("sap.f.cards.BaseHeader")){this.getDomRef("after").focus()}else{this.getDomRef("before").focus()}};p.prototype._getModes=function(){var e=this.getSettings();e.preview=e.preview||{};e.preview.modes=e.preview.modes||"Abstract";var t=this.getCard().getManifestEntry("/sap.card/type");if(t!=="Component"){e.preview.modes=e.preview.modes.replace("MockData","Live")}return e.preview.modes};p.prototype._getCurrentMode=function(){var e=this._getModes();if(!this._currentMode){switch(e){case"Abstract":case"AbstractLive":case"AbstractMockData":this._currentMode="Abstract";break;case"Live":case"LiveAbstract":this._currentMode="Live";break;case"MockData":case"MockDataAbstract":this._currentMode="MockData";break;default:this._currentMode="None"}}return this._currentMode};p.prototype._toggleCurrentMode=function(){var e=this._getModes();if(e.indexOf("Abstract")>-1){if(e.indexOf("Live")>-1){this._currentMode=this._getCurrentMode()==="Abstract"?"Live":"Abstract"}else if(e.indexOf("MockData")>-1){this._currentMode=this._getCurrentMode()==="Abstract"?"MockData":"Abstract"}}};p.prototype._getModeToggleButton=function(){var t=i.getResourceBundleFor("sap.ui.integration");if(!this._oModeToggleButton){this._oModeToggleButton=new n;this._oModeToggleButton.setTooltip();this._oModeToggleButton.attachPress(function(){this._toggleCurrentMode();this.update()}.bind(this))}this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewModeButton");this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewModeButtonSpec");this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewModeButtonFull");this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewModeButtonFullSpec");this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewModeButtonVerticalFull");this._oModeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewModeButtonVerticalFullSpec");var o=e.getLanguage().replaceAll("_","-");if(this._getCurrentSize()==="Full"){var r=this.getSettings().preview.position;if(o.startsWith("ar")||o.startsWith("he")){if(r==="top"||r==="bottom"||r==="separate"){this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewModeButtonVerticalFullSpec")}else{this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewModeButtonFullSpec")}}else if(r==="top"||r==="bottom"||r==="separate"){this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewModeButtonVerticalFull")}else{this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewModeButtonFull")}}else if(o.startsWith("ar")||o.startsWith("he")){this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewModeButtonSpec")}else{this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewModeButton")}var s=this._oModeToggleButton,a=this._getCurrentMode();if(a==="None"){s.setVisible(false)}if(a==="Abstract"){s.setIcon("sap-icon://media-play");s.setPressed(false);if(this._getModes().indexOf("MockData")>-1){s.setTooltip(t.getText("CARDEDITOR_PREVIEW_BTN_MOCKDATAPREVIEW"))}else{s.setTooltip(t.getText("CARDEDITOR_PREVIEW_BTN_LIVEPREVIEW"))}}else if(a==="Live"||a==="MockData"){s.setIcon("sap-icon://media-pause");s.setPressed(true);s.setTooltip(t.getText("CARDEDITOR_PREVIEW_BTN_SAMPLEPREVIEW"))}return this._oModeToggleButton};p.prototype._getCurrentSize=function(){this._currentSize=this._currentSize||"Normal";var e=this.getSettings();if(e.preview.position&&(e.preview.position==="top"||e.preview.position==="bottom"||e.preview.position==="separate")){this._currentSize="Full"}return this._currentSize};p.prototype._toggleCurrentSize=function(){this._currentSize=this._currentSize!=="Normal"?"Normal":"Full";if(this._currentSize==="Normal"){this.getEditor().setWidth(this.getParentWidth());document.body.style.removeProperty("--sapUiIntegrationEditorPreviewWidth")}else{this.getEditor().setWidth("0");document.body.style.setProperty("--sapUiIntegrationEditorPreviewWidth",this.getParentWidth())}};p.prototype._getResizeToggleButton=function(){var t=i.getResourceBundleFor("sap.ui.integration");if(!this._oSizeToggleButton){this._oSizeToggleButton=new n;this._oSizeToggleButton.setTooltip();this._oSizeToggleButton.attachPress(function(){this._toggleCurrentSize();this.update();this.getDomRef("before").focus()}.bind(this))}this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButton");this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButtonSpec");this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButtonFull");this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButtonFullSpec");this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButtonOnly");this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButtonOnlySpec");this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButtonOnlyFull");this._oSizeToggleButton.removeStyleClass("sapUiIntegrationDTPreviewResizeButtonOnlyFullSpec");var o=e.getLanguage().replaceAll("_","-");if(this._getModes()==="MockData"||this._getModes()==="Live"){if(this._getCurrentSize()==="Full"){if(o.startsWith("ar")||o.startsWith("he")){this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButtonOnlyFullSpec")}else{this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButtonOnlyFull")}}else if(o.startsWith("ar")||o.startsWith("he")){this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButtonOnlySpec")}else{this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButtonOnly")}}else{if(this._getCurrentSize()==="Full"){if(o.startsWith("ar")||o.startsWith("he")){this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButtonFullSpec")}else{this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButtonFull")}}else if(o.startsWith("ar")||o.startsWith("he")){this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButtonSpec")}else{this._oSizeToggleButton.addStyleClass("sapUiIntegrationDTPreviewResizeButton")}}var r=this._oSizeToggleButton,s=this._getCurrentMode(),a=this._getCurrentSize();if(s==="None"){r.setVisible(false)}if(a==="Normal"){r.setIcon("sap-icon://full-screen");r.setPressed(false);r.setTooltip(t.getText("CARDEDITOR_PREVIEW_BTN_FULLSIZE"))}else if(a==="Full"){r.setIcon("sap-icon://exit-full-screen");r.setPressed(true);r.setTooltip(t.getText("CARDEDITOR_PREVIEW_BTN_NORMALSIZE"))}return this._oSizeToggleButton};p.prototype.update=function(){this.invalidate()};function c(e){e=e||window.getComputedStyle(document.body).backgroundColor;var t=/rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(e);if(!t){return false}var i=parseInt(t[1]),o=parseInt(t[2]),r=parseInt(t[3]),s=(i*299+o*587+r*114)/1e3;return s<=128}p.init=function(){var e=sap.ui.require.toUrl("sap.ui.integration.designtime.editor.css.CardPreview".replace(/\./g,"/")+".css");d(e);this.init=function(){}};p.init();return p});
//# sourceMappingURL=CardPreview.js.map