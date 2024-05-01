/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Lib"],function(e,t){"use strict";var o={apiVersion:2};var r=t.getResourceBundleFor("sap.m");o.render=function(t,o){t.openStart("div",o);t.class("sapMColorPalette");t.openEnd();if(o._getShowDefaultColorButton()){this.renderDefaultColorButton(t,o);this.renderSeparator(t)}this.renderSwatches(t,o);if(o._getShowMoreColorsButton()){this.renderSeparator(t);this.renderMoreColorsButton(t,o);if(e.system.phone){this.renderSeparator(t)}}if(o._getShowRecentColorsSection()){if(!o._getShowMoreColorsButton()||!e.system.phone){this.renderSeparator(t)}this.renderRecentColorsSection(t,o);if(e.system.phone){this.renderSeparator(t)}}t.close("div")};o.renderSwatches=function(e,t){var o=t.getColors();e.openStart("div",t.getId()+"-swatchCont-paletteColor");e.class("sapMColorPaletteContent");e.accessibilityState(t,{role:"region",label:r.getText("COLOR_PALETTE_SWATCH_CONTAINER_TITLE")});e.openEnd();o.forEach(function(o,r){this.renderSquare(e,t,o,r,false)},this);e.close("div")};o.renderSquare=function(e,t,o,n,a){var s=t._ColorsHelper.getNamedColor(o),i=s===undefined?r.getText("COLOR_PALETTE_PREDEFINED_COLOR_CUSTOM"):r.getText("COLOR_PALETTE_PREDEFINED_COLOR_"+s.toUpperCase()),l=a?r.getText("COLOR_PALETTE_RECENT_COLOR",[n+1,i]):r.getText("COLOR_PALETTE_PREDEFINED_COLOR",[n+1,i]);e.openStart("div");e.class("sapMColorPaletteSquare");if(a&&o===""){e.class("sapMRecentColorSquareDisabled")}e.attr("data-sap-ui-color",o);e.attr("tabindex","-1");e.attr("title",l);e.accessibilityState(t,{role:"button",label:l});e.openEnd();e.openStart("div");e.style("background-color",o);e.openEnd();e.close("div");e.close("div")};o.renderSeparator=function(e){e.openStart("div");e.class("sapMColorPaletteSeparator");e.openEnd();e.voidStart("hr");e.voidEnd();e.close("div")};o.renderDefaultColorButton=function(e,t){e.renderControl(t._getDefaultColorButton())};o.renderMoreColorsButton=function(e,t){e.renderControl(t._getMoreColorsButton())};o.renderRecentColorsSection=function(e,t){var o,n=t._getRecentColors(),a=5,s=r.getText("COLOR_PALETTE_SWATCH_RECENT_COLOR_CONTAINER_TITLE");e.openStart("div",t.getId()+"-swatchCont-recentColors");e.class("sapMColorPaletteContent");e.attr("role","region");e.attr("aria-label",s);e.openEnd();for(var i=0;i<a;i++){if(n[i]){o=n[i]}else{o=""}this.renderSquare(e,t,o,i,true)}e.close("div")};return o},true);
//# sourceMappingURL=ColorPaletteRenderer.js.map