/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.render=function(e,s){e.write("<div");e.writeControlData(s);e.addClass("sapUiUx3Overlay");if(this.addRootClasses){this.addRootClasses(e,s)}e.writeClasses();e.write(">");e.write("<div role='presentation'");e.addClass("sapUiUx3OverlayOverlay");if(this.addOverlayClasses){this.addOverlayClasses(e,s)}e.writeClasses();e.write(">");e.write("</div>");e.write("<span class='sapUiUx3OverlayFocusDummyPane' id='"+s.getId()+"-firstFocusDummyPaneFw'></span>");e.write("<span class='sapUiUx3OverlayFocusDummyPane' id='"+s.getId()+"-firstFocusDummyPaneBw'></span>");if(s.getOpenButtonVisible()){e.write('<a role="button" aria-disabled="false" class=\'sapUiUx3OverlayOpenButton\' id=\''+s.getId()+'-openNew\' tabindex="0" title="'+s._getText("OVERLAY_OPEN_BUTTON_TOOLTIP")+'">'+s._getText("OVERLAY_OPEN_BUTTON_TEXT")+"</a>")}if(s.getCloseButtonVisible()){e.write('<a role="button" aria-disabled="false" class=\'sapUiUx3OverlayCloseButton\' id=\''+s.getId()+"-close' tabindex=\"0\" aria-label='"+s._getText("OVERLAY_CLOSE_BUTTON_TOOLTIP")+"'></a>")}if(this.renderContent){this.renderContent(e,s)}e.write("<span class='sapUiUx3OverlayFocusDummyPane' id='"+s.getId()+"-LastFocusDummyPane'></span>");e.write("</div>")};return e},true);
//# sourceMappingURL=OverlayRenderer.js.map