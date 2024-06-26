/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([],
	function() {
	"use strict";


	/**
	 * SegmentedButton renderer.
	 * @namespace
	 */
	var SegmentedButtonRenderer = {
	};


	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} rm the RenderManager that can be used for writing to the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	 */
	SegmentedButtonRenderer.render = function(rm, oControl){
		// convenience variable
		var rb = sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons"),
			// ResourceBundle always returns the key if the text is not found
			sText = rb.getText("SEGMENTEDBUTTON_ARIA_SELECT");

		// write the HTML into the render manager
		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("sapUiSegmentedButton");
		rm.writeClasses();
		rm.write(">"); // SPAN element
		rm.write('<span id="' + oControl.getId() + '-radiogroup"');
		// ARIA
		rm.writeAccessibilityState(oControl, {
			role: "radiogroup",
			disabled: !oControl.getEnabled()
		});
		if (oControl.getEnabled()) {
			rm.writeAttribute("tabindex", "0");
		} else {
			rm.writeAttribute("tabindex", "-1");
		}
		rm.write(">"); // SPAN element
		this.renderButtons(rm, oControl);
		rm.write("</span>");
		rm.write('<span id="' + oControl.getId() + '-label" style="visibility: hidden; display: none;">');
		rm.writeEscaped(sText);
		rm.write('</span>');
		rm.write("</span>");
	};

	SegmentedButtonRenderer.renderButtons = function(rm, oControl) {
		oControl.getButtons().forEach(function(oButton) {
			rm.renderControl(oButton);
		});
	};

	return SegmentedButtonRenderer;

}, /* bExport= */ true);
