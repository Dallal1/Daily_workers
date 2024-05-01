/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/base/ManagedObjectObserver","./FormRenderer","./FormHelper"],function(e,t,i,o){"use strict";var r=e.extend("sap.ui.layout.form.Form",{metadata:{library:"sap.ui.layout",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},editable:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"formContainers",aggregations:{formContainers:{type:"sap.ui.layout.form.FormContainer",multiple:true,singularName:"formContainer"},title:{type:"sap.ui.core.Title",altTypes:["string"],multiple:false},toolbar:{type:"sap.ui.core.Toolbar",multiple:false},layout:{type:"sap.ui.layout.form.FormLayout",multiple:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/ui/layout/designtime/form/Form.designtime"},renderer:i});r.prototype.init=function(){this._oInitPromise=o.init();this._oObserver=new t(a.bind(this));this._oObserver.observe(this,{properties:["editable"],aggregations:["formContainers"]})};r.prototype.exit=function(){this._oObserver.disconnect();this._oObserver=undefined};r.prototype.toggleContainerExpanded=function(e){var t=this.getLayout();if(t){t.toggleContainerExpanded(e)}};r.prototype.contentOnAfterRendering=function(e,t){var i=this.getLayout();if(i&&i.contentOnAfterRendering){i.contentOnAfterRendering(e,t)}};r.prototype.onLayoutDataChange=function(e){var t=this.getLayout();if(t&&t.onLayoutDataChange){t.onLayoutDataChange(e)}};r.prototype.onBeforeFastNavigationFocus=function(e){var t=this.getLayout();if(t&&t.onBeforeFastNavigationFocus){t.onBeforeFastNavigationFocus(e)}};r.prototype.setEditable=function(e){this.setProperty("editable",e,true);return this};function n(e,t){if(e!=t&&this.getDomRef()){if(e){this.$().addClass("sapUiFormEdit").addClass("sapUiFormEdit-CTX");this.$().removeAttr("aria-readonly")}else{this.$().removeClass("sapUiFormEdit").removeClass("sapUiFormEdit-CTX");this.$().attr("aria-readonly","true")}}var i=this.getFormContainers();for(var o=0;o<i.length;o++){var r=i[o];r._setEditable(e)}}r.prototype.setToolbar=function(e){const t=this.getToolbar();this.setAggregation("toolbar",e);if(this._oInitPromise){this._oInitPromise.then(function(){delete this._oInitPromise;e=o.setToolbar(e,t)}.bind(this))}else{e=o.setToolbar(e,t)}return this};r.prototype.invalidate=function(t){if(!this._bNoInvalidate){e.prototype.invalidate.apply(this,arguments)}};r.prototype.getContainerRenderedDomRef=function(e){var t=this.getLayout();if(t&&t.getContainerRenderedDomRef){return t.getContainerRenderedDomRef(e)}else{return null}};r.prototype.getElementRenderedDomRef=function(e){var t=this.getLayout();if(t&&t.getElementRenderedDomRef){return t.getElementRenderedDomRef(e)}else{return null}};r.prototype.getVisibleFormContainers=function(){var e=this.getFormContainers();var t=[];for(var i=0;i<e.length;i++){var o=e[i];if(o.isVisible()){t.push(o)}}return t};r.prototype._suggestTitleId=function(e){this._sSuggestedTitleId=e;if(this.getDomRef()){this.invalidate()}return this};function a(e){if(e.name==="editable"){n.call(this,e.current,e.old)}else if(e.name==="formContainers"){s.call(this,e.mutation,e.child)}}function s(e,t){if(e==="insert"){t._setEditable(this.getEditable())}}return r});
//# sourceMappingURL=Form.js.map