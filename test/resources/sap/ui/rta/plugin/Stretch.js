/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/dt/OverlayRegistry","sap/ui/dt/OverlayUtil","sap/base/util/restricted/_debounce"],function(e,t,n,i){"use strict";var r=e.extend("sap.ui.rta.plugin.Stretch",{metadata:{library:"sap.ui.rta",properties:{},associations:{stretchCandidates:{type:"sap.ui.core.Control",multiple:true}},events:{}}});r.STRETCHSTYLECLASS="sapUiRtaStretchPaddingTop";function a(e,t){return e&&e.getGeometry()&&t.getGeometry()&&e.getGeometry().position.top===t.getGeometry().position.top&&e.getGeometry().position.left===t.getGeometry().position.left}function s(e,t){var n=e.getElement();if(n.addStyleClass&&n.removeStyleClass){if(t){n.addStyleClass(r.STRETCHSTYLECLASS)}else{n.removeStyleClass(r.STRETCHSTYLECLASS)}}else{var i=e.getAssociatedDomRef()&&e.getAssociatedDomRef().get(0);if(i){if(t){i.classList.add(r.STRETCHSTYLECLASS)}else{i.classList.remove(r.STRETCHSTYLECLASS)}}}}function l(e,t,i){var r=e.getGeometry();if(!r){return false}var a=r.size.height;if(i){a-=parseInt(window.getComputedStyle(r.domRef,null).getPropertyValue("padding-top"))}var s=Math.round(r.size.width)*Math.round(a);t||=n.getAllChildOverlays(e);var l=t.map(function(e){return e.getGeometry()});var o=n.getGeometry(l);if(!o){return false}var d=Math.round(o.size.width)*Math.round(o.size.height);return d===s}function o(e,t){var i=t.some(function(e){return e.getEditable()&&e.getGeometry()});if(i){return true}var r=[];t.forEach(function(e){r=r.concat(n.getAllChildOverlays(e))});if(!r.length){return false}if(l(e,r)){return o(e,r)}return false}r.prototype.setDesignTime=function(...t){const[n]=t;e.prototype.setDesignTime.apply(this,t);if(n){n.attachEventOnce("synced",this._onDTSynced,this)}};r.prototype.exit=function(){if(this.getDesignTime()){this.getDesignTime().detachEvent("elementOverlayAdded",this._onElementOverlayChanged);this.getDesignTime().detachEvent("elementOverlayMoved",this._onElementOverlayChanged);this.getDesignTime().detachEvent("elementPropertyChanged",this._onElementPropertyChanged);this.getDesignTime().detachEvent("elementOverlayEditableChanged",this._onElementOverlayEditableChanged);this.getDesignTime().detachEvent("elementOverlayDestroyed",this._onElementOverlayDestroyed)}};r.prototype.addStretchCandidate=function(e){var t=e.getElement();if(!this.getStretchCandidates().includes(t.getId())){this.addAssociation("stretchCandidates",t)}};r.prototype.removeStretchCandidate=function(e){this.removeAssociation("stretchCandidates",e.getElement());s(e,false)};r.prototype.registerElementOverlay=function(...t){const[n]=t;this._checkParentAndAddToStretchCandidates(n);n.attachElementModified(this._onElementModified,this);e.prototype.registerElementOverlay.apply(this,t)};r.prototype.deregisterElementOverlay=function(...t){const[n]=t;s(n,false);e.prototype.deregisterElementOverlay.apply(this,t)};r.prototype._isEditable=function(){return false};r.prototype._onDTSynced=function(){this._setStyleClassForAllStretchCandidates();this.getDesignTime().attachEvent("elementOverlayAdded",this._onElementOverlayChanged,this);this.getDesignTime().attachEvent("elementOverlayMoved",this._onElementOverlayChanged,this);this.getDesignTime().attachEvent("elementPropertyChanged",this._onElementPropertyChanged,this);this.getDesignTime().attachEvent("elementOverlayEditableChanged",this._onElementOverlayEditableChanged,this);this.getDesignTime().attachEvent("elementOverlayDestroyed",this._onElementOverlayDestroyed,this)};r.prototype._onElementModified=function(e){if(this.getDesignTime().getBusyPlugins().length){return}var t=e.getParameters();var n=e.getSource();if(t.type==="afterRendering"){this.fnDebounced||=i(function(){this._setStyleClassForAllStretchCandidates(this._getNewStretchCandidates(this._aOverlaysCollected));this._aOverlaysCollected=[];this.fnDebounced=undefined}.bind(this),16);this._aOverlaysCollected||=[];if(!this._aOverlaysCollected.includes(n)){this._aOverlaysCollected.push(n);this.fnDebounced()}}};r.prototype._onElementOverlayDestroyed=function(e){if(this.getDesignTime().getBusyPlugins().length){return}var t=[];var n=e.getParameters().elementOverlay.getParentElementOverlay();if(n&&!n._bIsBeingDestroyed){var i=this._getRelevantOverlays(n).filter(function(e){return e.getElement()});t=this._getNewStretchCandidates(i)}this._setStyleClassForAllStretchCandidates(t)};r.prototype._onElementOverlayEditableChanged=function(e){var n=t.getOverlay(e.getParameters().id);if(this.getDesignTime().getBusyPlugins().length||!n){return}var i=this._getRelevantOverlaysOnEditableChange(n);this._setStyleClassForAllStretchCandidates(i)};r.prototype._onElementPropertyChanged=function(e){var n=t.getOverlay(e.getParameters().id);if(this.getDesignTime().getBusyPlugins().length||!n){return}var r=this._getRelevantOverlays(n);var a=i(function(){if(!this.bIsDestroyed&&!n.bIsDestroyed){var e=this._getNewStretchCandidates(r).concat(this._getRelevantOverlaysOnEditableChange(n));e=e.filter(function(e,t,n){return n.indexOf(e)===t});this._setStyleClassForAllStretchCandidates(e)}}.bind(this));r.forEach(function(e){e.attachEventOnce("geometryChanged",a)})};r.prototype._onElementOverlayChanged=function(e){var n=t.getOverlay(e.getParameters().id);if(this.getDesignTime().getBusyPlugins().length||!n){return}var i=this._getRelevantOverlays(n);var r=this._getNewStretchCandidates(i);this._setStyleClassForAllStretchCandidates(r)};r.prototype._getRelevantOverlaysOnEditableChange=function(e){var t=this.getStretchCandidates().includes(e.getElement().getId())?[e.getElement().getId()]:[];var n=e.getParentAggregationOverlay();if(!n){return t}var i=n.getChildren();i.splice(i.indexOf(e),1);var r=i.some(function(e){return e.getEditable()&&e.getGeometry()});if(r){return t}return t.concat(this._getRelevantParents(e))};r.prototype._getRelevantParents=function(e){var t=[];for(var n=0;n<25;n++){e=e.getParentElementOverlay();if(!e){return t}if(!this.getStretchCandidates().includes(e.getElement().getId())){return t}t.push(e.getElement().getId())}return t};r.prototype._getNewStretchCandidates=function(e){var t=[];e.forEach(function(e){if(this._reevaluateStretching(e)){t.push(e.getElement().getId())}},this);return t};r.prototype._reevaluateStretching=function(e){if(!e.bIsDestroyed){var t=e.getAssociatedDomRef()&&e.getAssociatedDomRef().get(0);if(t){var n=t.classList.contains(r.STRETCHSTYLECLASS);var i=l(e,undefined,n);if(n&&!i){this.removeStretchCandidate(e)}else if(!n&&i){this.addStretchCandidate(e);return true}}}return false};r.prototype._checkParentAndAddToStretchCandidates=function(e){var t=e.getParentElementOverlay();var n=t&&t.getAssociatedDomRef()&&t.getAssociatedDomRef().get(0);if(n){if(a(t,e)){if(l(t)){this.addStretchCandidate(t)}}}};r.prototype._setStyleClassForAllStretchCandidates=function(e){if(!Array.isArray(e)){e=this.getStretchCandidates()}e.forEach(function(e){var i=t.getOverlay(e);var r=n.getAllChildOverlays(i);var a=i.getEditable()&&o(i,r);s(i,a)},this)};return r});
//# sourceMappingURL=Stretch.js.map