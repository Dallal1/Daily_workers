/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/base/Log","sap/base/security/URLListValidator"],function(e,r,t){"use strict";function i(e){return(!!e.getTitle()||e._isDisplayDownloadButton())&&!e._bIsPopupOpen}var n=Object.freeze(["application/pdf","application/x-google-chrome-pdf"]);var s={apiVersion:2};s._isSupportedMimeType=function(e){var r=n.indexOf(e);return r>-1};s._isPdfPluginEnabled=function(){var r=true;if(e.browser.firefox){return r}if(typeof navigator.pdfViewerEnabled!=="undefined"){if(navigator.pdfViewerEnabled||/HeadlessChrome/.test(window.navigator.userAgent)){return r}else{r=false}}else{var t=navigator.mimeTypes;r=n.some(function(e){var r=t.namedItem(e);return r!==null})}return r};s.render=function(r,t){r.openStart("div",t);r.style("width",t._getRenderWidth());r.style("height",t._getRenderHeight());this._writeAccessibilityTags(r,t);r.openEnd();if(i(t)){r.renderControl(t._objectsRegister.getOverflowToolbarControl())}if(!t._isDisplayTypeLink()&&!this._isPdfPluginEnabled()&&e.system.desktop){this.renderErrorContent(r,t)}else if(t._isEmbeddedModeAllowed()&&this._isPdfPluginEnabled()){this.renderPdfContent(r,t)}r.close("div")};s._writeAccessibilityTags=function(e,r){e.attr("role","document");e.attr("aria-label",r._getLibraryResourceBundle().getText("PDF_VIEWER_ACCESSIBILITY_LABEL"))};s.renderPdfContent=function(r,n){if(n._shouldRenderPdfContent()&&!/HeadlessChrome/.test(window.navigator.userAgent)){r.openStart("iframe",n.getId()+"-iframe");var s=n.getSource();var o=n.getSource().indexOf("#");if(o>-1){s=s.substr(0,o)}if(!(e.browser.safari&&s.startsWith("blob:"))){s+="#view=FitH"}if(!t.validate(s)){s=encodeURI(s)}if(t.validate(s)){r.attr("src",s)}else{n._fireErrorEvent()}r.class("sapMPDFViewerContent");r.class("sapMPDFViewerLoading");r.attr("aria-label",n._getLibraryResourceBundle().getText("PDF_VIEWER_CONTENT_ACCESSIBILITY_LABEL"));if(i(n)){r.class("sapMPDFViewerReducedContent")}r.openEnd();r.close("iframe")}else{this.renderErrorContent(r,n)}};s.renderErrorContent=function(e,t){var i=t.getErrorPlaceholder()?t.getErrorPlaceholder():t._objectsRegister.getPlaceholderIllustratedMessageControl();e.openStart("div");e.class("sapMPDFViewerError");if(!t._bIsPopupOpen){e.class("sapMPDFViewerEmbeddedContent")}e.openEnd();e.renderControl(i);e.close("div");if(!s._isPdfPluginEnabled()){r.warning("Either Inline viewing of pdf is disabled or pdf plug-in is unavailable on this device.");t.fireEvent("error",{},true)}};return s},true);
//# sourceMappingURL=PDFViewerRenderer.js.map