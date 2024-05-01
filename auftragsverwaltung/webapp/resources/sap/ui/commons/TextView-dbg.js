/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.commons.TextView.
sap.ui.define([
 './library',
 'sap/ui/core/Control',
 './TextViewRenderer',
 'sap/ui/core/library',
 'sap/base/security/encodeXML'
],
	function(library, Control, TextViewRenderer, coreLibrary, encodeXML) {
	"use strict";

	// shortcut for sap.ui.core.TextAlign
	var TextAlign = coreLibrary.TextAlign;

	// shortcut for sap.ui.commons.TextViewColor
	var TextViewColor = library.TextViewColor;

	// shortcut for sap.ui.commons.TextViewDesign
	var TextViewDesign = library.TextViewDesign;

	// shortcut for sap.ui.core.TextDirection
	var TextDirection = coreLibrary.TextDirection;

	/**
	 * Constructor for a new TextView.
	 *
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * Is used to display some continous text. The control can inherit the text direction from its parent control.
	 * @extends sap.ui.core.Control
	 * @implements sap.ui.commons.ToolbarItem, sap.ui.core.IFormContent
	 *
	 * @author SAP SE
	 * @version 1.121.0
	 *
	 * @constructor
	 * @public
	 * @deprecated Since version 1.38.
	 * @alias sap.ui.commons.TextView
	 */
	var TextView = Control.extend("sap.ui.commons.TextView", /** @lends sap.ui.commons.TextView.prototype */ { metadata : {

		interfaces : [
			"sap.ui.commons.ToolbarItem",
			"sap.ui.core.IFormContent"
		],
		library : "sap.ui.commons",
		deprecated: true,
		properties : {

			/**
			 * Text to be displayed.
			 */
			text : {type : "string", defaultValue : '', bindable : "bindable"},

			/**
			 * Determines the text directionality. Available options are LTR and RTL. Alternatively, the control can inherit the text direction from its parent control.
			 */
			textDirection : {type : "sap.ui.core.TextDirection", group : "Appearance", defaultValue : TextDirection.Inherit},

			/**
			 * Switches the enabled state of the control. When the control is disabled, it is greyed out and no longer focusable.
			 */
			enabled : {type : "boolean", group : "Behavior", defaultValue : true},

			/**
			 * Unique identifier used for help services.
			 */
			helpId : {type : "string", group : "Behavior", defaultValue : ''},

			/**
			 * The ARIA role for the control.
			 */
			accessibleRole : {type : "sap.ui.core.AccessibleRole", group : "Accessibility"},

			/**
			 * Defines the visual appearance of the control.
			 */
			design : {type : "sap.ui.commons.TextViewDesign", group : "Data", defaultValue : TextViewDesign.Standard},

			/**
			 * Disabled automatic wrapping of the text.
			 */
			wrapping : {type : "boolean", group : "Appearance", defaultValue : true},

			/**
			 * Semantic color of the text View
			 */
			semanticColor : {type : "sap.ui.commons.TextViewColor", group : "Appearance", defaultValue : TextViewColor.Default},

			/**
			 * Sets the horizontal alignment of the text.
			 */
			textAlign : {type : "sap.ui.core.TextAlign", group : "Appearance", defaultValue : TextAlign.Begin},

			/**
			 * Width of the TextView
			 */
			width : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : null}
		},
		associations : {

			/**
			 * Association to controls / IDs which describe this control (see WAI-ARIA attribute aria-describedby).
			 */
			ariaDescribedBy : {type : "sap.ui.core.Control", multiple : true, singularName : "ariaDescribedBy"},

			/**
			 * Association to controls / IDs which label this control (see WAI-ARIA attribute aria-labelledby).
			 */
			ariaLabelledBy : {type : "sap.ui.core.Control", multiple : true, singularName : "ariaLabelledBy"}
		}
	}});


	/*
	 * @see JSDoc generated by SAPUI5 Control API generator
	 */
	TextView.prototype.setText = function(sText) {
		this.setProperty("text", sText, true); // no re-rendering!
		var oDomRef = this.getDomRef();

		if (oDomRef) {
			// in case of
			sText = this.getText(); // the default value '' ensures valid text string
			oDomRef.innerHTML = encodeXML(sText).replace(/&#xa;/g, "<br>");
			// when no tooltip is applied use the text as tooltip
			if (!this.getTooltip_AsString()) {
				oDomRef.title = sText;
			}
		}

		return this;
	};

	/**
	 * @see sap.ui.core.Control#getAccessibilityInfo
	 * @returns {sap.ui.core.AccessibilityInfo} The accessibility info
	 * @protected
	 */
	TextView.prototype.getAccessibilityInfo = function() {
		return {description: this.getText()};
	};

	return TextView;

});
