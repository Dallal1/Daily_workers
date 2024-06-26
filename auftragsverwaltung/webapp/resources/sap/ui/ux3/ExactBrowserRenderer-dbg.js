/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for the sap.ui.ux3.ExactBrowser
sap.ui.define(["sap/base/security/encodeXML"],
	function(encodeXML) {
	"use strict";


	/**
	 * ExactBrowser renderer.
	 * @namespace
	 */
	var ExactBrowserRenderer = {
	};


	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	 */
	ExactBrowserRenderer.render = function(rm, oControl){
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("sapUiUx3ExactBrwsr");
		rm.writeClasses();
		rm.writeAttribute("role", "region");
		if (oControl.getShowHeader()) {
			rm.writeAttribute("aria-labelledby", oControl.getId() + "-hdtitle");
		}
		if (oControl.getFollowUpControl()) {
			rm.writeAttribute("aria-controls", oControl.getFollowUpControl());
		}

		var sTooltip = oControl.getTooltip_AsString();
		if (sTooltip) {
			rm.writeAttributeEscaped("title", sTooltip);
		}
		rm.write(">");

		if (oControl.getShowHeader()) {
			rm.write("<div class=\"sapUiUx3ExactBrwsrHd\"><h2 id=\"" + oControl.getId() + "-hdtitle\">");
			rm.write(encodeXML(oControl.getHeaderTitle()));
			rm.write("</h2><div class=\"sapUiUx3ExactBrwsrHdTool\" role=\"toolbar\">");
			if (oControl.getEnableSave()) {
				rm.renderControl(oControl._saveButton);
			}
			if (oControl.getEnableReset()) {
				rm.renderControl(oControl._resetButton);
			}
			rm.write("</div></div>");
		}
		rm.renderControl(oControl._rootList);
		rm.write("</div>");
	};

	return ExactBrowserRenderer;

}, /* bExport= */ true);
