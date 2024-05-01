/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Element","sap/ui/dt/Plugin","sap/ui/dt/DOMUtil","sap/ui/dt/OverlayUtil","sap/ui/dt/OverlayRegistry","sap/ui/thirdparty/jquery","sap/ui/Device"],function(t,e,r,a,o,n,jQuery,i){"use strict";var g=r.extend("sap.ui.dt.plugin.DragDrop",{metadata:{abstract:true,library:"sap.ui.dt",properties:{},associations:{},events:{}}});var s=7;var h=false;var c;g.prototype._preventScrollOnTouch=function(t){if(h){t.preventDefault()}};g.prototype.init=function(...t){r.prototype.init.apply(this,t);document.addEventListener("touchmove",this._preventScrollOnTouch,true);this._dragScrollHandler=this._dragScroll.bind(this);this._dragLeaveHandler=this._dragLeave.bind(this);this._mScrollIntervals={}};g.prototype.exit=function(...t){r.prototype.exit.apply(this,t);document.removeEventListener("touchmove",this._preventScrollOnTouch);delete this._mElementOverlayDelegate;delete this._mAggregationOverlayDelegate;delete this._dragScrollHandler};g.prototype.registerElementOverlay=function(t){t.attachEvent("movableChange",this._onMovableChange,this);if(t.isMovable()){this._attachDragEvents(t)}t.attachBrowserEvent("dragover",this._onDragOver,this);t.attachBrowserEvent("dragenter",this._onDragEnter,this);t.attachBrowserEvent("dragleave",this._onDragLeave,this)};g.prototype.registerAggregationOverlay=function(t){t.attachTargetZoneChange(this._onAggregationTargetZoneChange,this);if(!i.browser.webkit){this._attachDragScrollHandler(t)}};g.prototype.deregisterElementOverlay=function(t){t.detachEvent("movableChange",this._onMovableChange,this);this._detachDragEvents(t);t.detachBrowserEvent("dragover",this._onDragOver,this);t.detachBrowserEvent("dragenter",this._onDragEnter,this);t.detachBrowserEvent("dragleave",this._onDragLeave,this)};g.prototype.deregisterAggregationOverlay=function(t){t.detachTargetZoneChange(this._onAggregationTargetZoneChange,this);if(!i.browser.webkit){this._removeDragScrollHandler(t);if(t.getDomRef()){this._clearScrollIntervalFor(t.getDomRef().getAttribute("id"))}}};g.prototype._attachDragEvents=function(t){t.attachBrowserEvent("dragstart",this._onDragStart,this);t.attachBrowserEvent("drag",this._onDrag,this);t.attachBrowserEvent("dragend",this._onDragEnd,this);t.attachBrowserEvent("touchstart",this._onTouchStart,this)};g.prototype._detachDragEvents=function(t){t.detachBrowserEvent("dragstart",this._onDragStart,this);t.detachBrowserEvent("drag",this._onDrag,this);t.detachBrowserEvent("dragend",this._onDragEnd,this);t.detachBrowserEvent("touchstart",this._onTouchStart,this)};g.prototype.onMovableChange=function(){};g.prototype.onDragStart=function(){};g.prototype.onDragEnd=function(){};g.prototype.onDrag=function(){};g.prototype.onDragEnter=function(){};g.prototype.onDragLeave=function(){};g.prototype.onDragOver=function(){};g.prototype.onAggregationDragEnter=function(){};g.prototype.onAggregationDragOver=function(){};g.prototype.onAggregationDragLeave=function(){};g.prototype.onAggregationDrop=function(){};g.prototype._onMovableChange=function(t){var e=t.getSource();if(e.isMovable()){this._attachDragEvents(e)}else{this._detachDragEvents(e)}this.onMovableChange(e)};g.prototype._onDragStart=function(t){var e=n.getOverlay(t.currentTarget.id);t.stopPropagation();if(i.browser.firefox&&t&&t.originalEvent&&t.originalEvent.dataTransfer&&t.originalEvent.dataTransfer.setData){t.originalEvent.dataTransfer.setData("text/plain","")}this.setBusy(true);this.showGhost(e,t);this.onDragStart(e)};g.prototype._attachTouchDragEvents=function(t){t.attachBrowserEvent("touchmove",this._onTouchMove,this);t.attachBrowserEvent("touchend",this._onTouchEnd,this)};g.prototype._detachTouchDragEvents=function(t){t.detachBrowserEvent("touchmove",this._onTouchMove,this);t.detachBrowserEvent("touchend",this._onTouchEnd,this)};g.prototype._onTouchStart=function(t){var e=t.touches[0].pageX;var r=t.touches[0].pageY;var a=n.getOverlay(t.currentTarget.id);function o(){a.detachBrowserEvent("touchmove",g,this);a.detachBrowserEvent("touchend",c,this);a.detachBrowserEvent("contextmenu",c,this)}function i(t,a){var o=e-t;var n=r-a;return Math.sqrt(o*o+n*n)}function g(t){var e=t.touches[0].pageX;var r=t.touches[0].pageY;var n=i(e,r);if(n>s){this.onDragStart(a);o.call(this);this._attachTouchDragEvents(a)}}function c(){o.call(this);h=false}h=true;t.stopPropagation();a.attachBrowserEvent("touchmove",g,this);a.attachBrowserEvent("contextmenu",c,this);a.attachBrowserEvent("touchend",c,this)};g.prototype._getTargetOverlay=function(e){if(t.isObjectA(e,"sap.ui.dt.Overlay")){var r;if(t.isObjectA(e,"sap.ui.dt.AggregationOverlay")&&e.getTargetZone()){r=e}else if(t.isObjectA(e,"sap.ui.dt.ElementOverlay")&&o.isInTargetZoneAggregation(e)){r=e}return r||this._getTargetOverlay(e.getParent())}};g.prototype._findTargetOverlayFromCoordinates=function(t,r){var a=document.elementFromPoint(t,r);var o=a?e.getElementById(a.id):undefined;return this._getTargetOverlay(o)};g.prototype._onTouchMove=function(e){var r=n.getOverlay(e.currentTarget.id);this.onDrag(r);var a=e.touches||e.changedTouches;var{pageX:o}=a[0];var{pageY:i}=a[0];var g=this._findTargetOverlayFromCoordinates(o,i);if(!g){return}if(g!==c){if(c){if(t.isObjectA(c,"sap.ui.dt.AggregationOverlay")){this.onAggregationDragLeave(c)}else{this.onDragLeave(c)}}c=g;if(t.isObjectA(g,"sap.ui.dt.AggregationOverlay")){this.onAggregationDragEnter(g)}else{this.onDragEnter(g)}}if(t.isObjectA(g,"sap.ui.dt.AggregationOverlay")){this.onAggregationDragOver(g)}else{this.onDragOver(g)}e.stopPropagation()};g.prototype._getValidTargetZoneAggregationOverlay=function(e){if(t.isObjectA(e,"sap.ui.dt.AggregationOverlay")&&e.getTargetZone()){return e}return this._getValidTargetZoneAggregationOverlay(e.getParent())};g.prototype._onTouchEnd=function(t){var e=n.getOverlay(t.currentTarget.id);var r=this._getValidTargetZoneAggregationOverlay(e);if(r){this.onAggregationDrop(r)}this.onDragEnd(e);this._detachTouchDragEvents(e);c=undefined;h=false};g.prototype.showGhost=function(t,e){if(e&&e.originalEvent&&e.originalEvent.dataTransfer){if(e.originalEvent.dataTransfer.setDragImage){this._oGhost=this.createGhost(t,e);document.getElementById("overlay-container").append(this._oGhost);setTimeout(function(){this._removeGhost()}.bind(this),0);e.originalEvent.dataTransfer.setDragImage(this._oGhost,e.originalEvent.pageX-a.getOffset(t.getDomRef()).left,e.originalEvent.pageY-a.getOffset(t.getDomRef()).top)}}};g.prototype._removeGhost=function(){this.removeGhost();delete this._oGhost};g.prototype.removeGhost=function(){var t=this.getGhost();if(t){t.remove()}};g.prototype.createGhost=function(t){var e=t.getAssociatedDomRef();var r;if(!e){e=this._getAssociatedDomCopy(t);r=e.get(0)}else{r=document.createElement("div");[].slice.call(e).forEach(function(t){a.cloneDOMAndStyles(t,r)})}var o=document.createElement("div");o.classList.add("sapUiDtDragGhostWrapper");r.classList.add("sapUiDtDragGhost");o.append(r);return o};g.prototype._getAssociatedDomCopy=function(t){var e=document.createElement("div");t.getChildren().forEach(function(t){t.getChildren().forEach(function(t){var r=t.getAssociatedDomRef();if(r){a.cloneDOMAndStyles(r,e)}else{a.cloneDOMAndStyles(this._getAssociatedDomCopy(t).get(0),e)}},this)},this);return jQuery(e)};g.prototype.getGhost=function(){return this._oGhost};g.prototype._onDragEnd=function(t){this.setBusy(false);var e=n.getOverlay(t.currentTarget.id);this._removeGhost();this._clearAllScrollIntervals();this.onDragEnd(e);t.stopPropagation()};g.prototype._onDrag=function(t){var e=n.getOverlay(t.currentTarget.id);this.onDrag(e);t.stopPropagation()};g.prototype._onDragEnter=function(t){var e=n.getOverlay(t.currentTarget.id);if(o.isInTargetZoneAggregation(e)){if(!this.onDragEnter(e)){t.stopPropagation()}}t.preventDefault()};g.prototype._onDragLeave=function(t){var e=n.getOverlay(t.currentTarget.id);if(o.isInTargetZoneAggregation(e)){if(!this.onDragLeave(e)){t.stopPropagation()}}else{t.stopPropagation()}t.preventDefault()};g.prototype._onDragOver=function(t){var e=n.getOverlay(t.currentTarget.id);if(o.isInTargetZoneAggregation(e)){if(!this.onDragOver(e)){t.stopPropagation()}}else{t.stopPropagation()}t.preventDefault()};g.prototype._onAggregationTargetZoneChange=function(t){var e=t.getSource();var r=t.getParameter("targetZone");if(r){this._attachAggregationOverlayEvents(e)}else{this._detachAggregationOverlayEvents(e)}};g.prototype._attachAggregationOverlayEvents=function(t){t.attachBrowserEvent("dragenter",this._onAggregationDragEnter,this);t.attachBrowserEvent("dragover",this._onAggregationDragOver,this);t.attachBrowserEvent("dragleave",this._onAggregationDragLeave,this);t.attachBrowserEvent("drop",this._onAggregationDrop,this)};g.prototype._detachAggregationOverlayEvents=function(t){t.detachBrowserEvent("dragenter",this._onAggregationDragEnter,this);t.detachBrowserEvent("dragover",this._onAggregationDragOver,this);t.detachBrowserEvent("dragleave",this._onAggregationDragLeave,this);t.detachBrowserEvent("drop",this._onAggregationDrop,this)};g.prototype._onAggregationDragEnter=function(t){var e=n.getOverlay(t.currentTarget.id);this.onAggregationDragEnter(e);t.preventDefault();t.stopPropagation()};g.prototype._onAggregationDragOver=function(t){var e=n.getOverlay(t.currentTarget.id);this.onAggregationDragOver(e);t.preventDefault();t.stopPropagation()};g.prototype._onAggregationDragLeave=function(t){var e=n.getOverlay(t.currentTarget.id);this.onAggregationDragLeave(e);t.preventDefault();t.stopPropagation()};g.prototype._onAggregationDrop=function(t){var e=n.getOverlay(t.currentTarget.id);this.onAggregationDrop(e);t.preventDefault();t.stopPropagation()};var l=100;var v=20;var p=50;g.prototype._clearScrollInterval=function(t,e){if(this._mScrollIntervals[t]){window.clearInterval(this._mScrollIntervals[t][e]);delete this._mScrollIntervals[t][e]}};g.prototype._clearScrollIntervalFor=function(t){if(this._mScrollIntervals[t]){Object.keys(this._mScrollIntervals[t]).forEach(function(e){this._clearScrollInterval(t,e)},this)}};g.prototype._clearAllScrollIntervals=function(){Object.keys(this._mScrollIntervals).forEach(this._clearScrollIntervalFor.bind(this))};g.prototype._checkScroll=function(t,e,r){var a;var o;var n=1;if(e==="top"||e==="bottom"){a=t.outerHeight();o=t.scrollTop.bind(t)}else{a=t.outerWidth();o=t.scrollLeft.bind(t)}if(e==="top"||e==="left"){n=-1}var i=Math.floor(a/4);var g=l;if(i<l){g=i}if(r<g){this._mScrollIntervals[t.attr("id")]=this._mScrollIntervals[t.attr("id")]||{};if(!this._mScrollIntervals[t.attr("id")][e]){this._mScrollIntervals[t.attr("id")][e]=window.setInterval(function(){var t=o();o(t+n*v)},p)}}else{this._clearScrollInterval(t.attr("id"),e)}};g.prototype._dragLeave=function(t){var e=n.getOverlay(t.currentTarget.id);this._clearScrollIntervalFor(e.$().attr("id"))};g.prototype._dragScroll=function(t){var e=n.getOverlay(t.currentTarget.id);var r=e.$();var a=t.clientX;var o=t.clientY;var i=r.offset();var g=r.height();var s=r.width();var h=i.top;var c=i.left;var l=h+g;var v=c+s;this._checkScroll(r,"bottom",l-o);this._checkScroll(r,"top",o-h);this._checkScroll(r,"right",v-a);this._checkScroll(r,"left",a-c)};g.prototype._attachDragScrollHandler=function(e){var r;if(t.isObjectA(e,"sap.ui.dt.AggregationOverlay")){r=e}else{r=e.srcControl}var o=r.getDomRef();if(o&&Object.keys(o).length>0&&a.hasScrollBar(o)){o.addEventListener("dragover",this._dragScrollHandler,true);o.addEventListener("dragleave",this._dragLeaveHandler,true)}};g.prototype._removeDragScrollHandler=function(e){var r;if(t.isObjectA(e,"sap.ui.dt.AggregationOverlay")){r=e}else{r=e.srcControl}var a=r.getDomRef();if(a){a.removeEventListener("dragover",this._dragScrollHandler,true)}};return g});
//# sourceMappingURL=DragDrop.js.map