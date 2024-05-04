/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_intersection","sap/base/util/restricted/_uniq","sap/ui/core/StaticArea","sap/ui/base/ManagedObject","sap/ui/dt/DOMUtil","sap/ui/dt/OverlayUtil","sap/ui/thirdparty/jquery"],function(t,e,i,n,o,r,jQuery){"use strict";var a=n.extend("sap.ui.dt.MutationObserver",{metadata:{library:"sap.ui.dt",events:{domChanged:{parameters:{type:{type:"string"},targetNodes:{type:"element[]"}}}}}});a.prototype.init=function(){this._mutationOnTransitionend=this._callDomChangedCallback.bind(this,"MutationOnTransitionend");this._mutationOnAnimationEnd=this._callDomChangedCallback.bind(this,"MutationOnAnimationEnd");this._fireDomChangeOnScroll=this._fireDomChangeOnScroll.bind(this);this._mutationOnResize=this._callDomChangedOnResizeWithRoot.bind(this,"MutationOnResize");window.addEventListener("transitionend",this._mutationOnTransitionend,true);window.addEventListener("animationend",this._mutationOnAnimationEnd,true);window.addEventListener("scroll",this._fireDomChangeOnScroll,true);jQuery(window).on("resize",this._mutationOnResize);this._aIgnoredMutations=[];this._bHandlerRegistered=false;this._mMutationHandlers={};this._aRootIds=[];this._startMutationObserver()};a.prototype.exit=function(){this._stopMutationObserver();window.removeEventListener("transitionend",this._mutationOnTransitionend,true);window.removeEventListener("animationend",this._mutationOnAnimationEnd,true);window.removeEventListener("scroll",this._fireDomChangeOnScroll,true);jQuery(window).off("resize",this._mutationOnResize);this._aIgnoredMutations=[];this._bHandlerRegistered=false;this._mMutationHandlers={}};a.prototype.ignoreOnce=function(t){this._aIgnoredMutations.push(t)};a.prototype.registerHandler=function(t,e,i){if(!this._mMutationHandlers[t]){this._mMutationHandlers[t]=[];this._bHandlerRegistered=true}this._mMutationHandlers[t].push(e);if(i&&this._aRootIds.indexOf(t)===-1){this._aRootIds.push(t)}};a.prototype.deregisterHandler=function(t){delete this._mMutationHandlers[t];if(Object.keys(this._mMutationHandlers).length===0){this._bHandlerRegistered=false}this._aRootIds=this._aRootIds.filter(function(e){return e!==t})};a.prototype._hasScrollbar=function(t,e){return t||o.hasScrollBar(e)};a.prototype._getIdsWhenRegistered=function(t,e,i){var n;if(e&&this._mMutationHandlers[e]){n=e;i.closestElementInWhitlist||=e}i.result=t?n:i.closestElementInWhitlist;return i};a.prototype._getClosestParentIdForNodeRegisteredWithScrollbar=function(t,e){var i={closestElementInWhitlist:undefined,result:undefined};var n=false;var o=jQuery(e);var r=t;do{n=this._hasScrollbar(n,o);i=this._getIdsWhenRegistered(n,r,i);o=o.parent();r=o.attr("data-sap-ui")}while(!(i.result&&n)&&o.length&&o[0]!==document);return i.result||i.closestElementInWhitlist};a.prototype._isNodeOverlayRelated=function(t,e){var i="overlay-container";if(o.contains(i,t)){return true}if(t===document.body){return e&&e.addedNodes&&e.addedNodes[0]&&e.addedNodes[0].getAttribute&&e.addedNodes[0].getAttribute("id")===i}return false};a.prototype._getRelevantElementId=function(t,e){var n=t&&t.getAttribute&&t.getAttribute("id");var r;if(!this._isNodeOverlayRelated(t,e)&&document.body.contains(t)&&n!==i.STATIC_UIAREA_ID&&!o.contains("sap-ui-preserve",t)){var a=0;while(this._aRootIds.length>a&&!r){if(o.contains(this._aRootIds[a],t)||t.contains(document.getElementById(this._aRootIds[a]))){r=this._aRootIds[a]}a++}}return r};a.prototype._getRelevantElementIdsFromStaticArea=function(e){return e.target.id===i.STATIC_UIAREA_ID&&t([].concat(Array.prototype.slice.call(e.addedNodes),Array.prototype.slice.call(e.removedNodes)).map(function(t){return t.id}),Object.keys(this._mMutationHandlers))};a.prototype._ignoreMutation=function(t){return this._aIgnoredMutations.some(function(e,i,n){if(e.target===t.target&&(!e.type||e.type===t.type)){n.splice(i,1);return true}return false})};a.prototype._getTargetNode=function(t){var e=t.type==="characterData"?t.target.parentNode:t.target;if(e&&e.getRootNode()&&e.getRootNode().host){return e.getRootNode().host}return e};a.prototype._callRelevantCallbackFunctions=function(t,i){t=e(t);t.forEach(function(t){(this._mMutationHandlers[t]||[]).forEach(function(t){t({type:i})})}.bind(this))};function s(t){this._oMutationObserver.observe(t,{childList:true,subtree:true,attributes:true,attributeFilter:["style","class","width","height","border"],characterData:true})}a.prototype._startMutationObserver=function(){this._oMutationObserver=new window.MutationObserver(function(t){if(this._bHandlerRegistered){var e=t.reduce(function(t,e){var i=[];var n=this._getTargetNode(e);var o=this._getRelevantElementId(n,e);if(o){i.push(o)}else{i=this._getRelevantElementIdsFromStaticArea(e)}if(i.length&&!this._ignoreMutation(e)){return t.concat(i)}return t}.bind(this),[]);if(e.length){this._callRelevantCallbackFunctions(e,"MutationObserver")}}}.bind(this));s.call(this,window.document)};a.prototype.addNode=function(t){s.call(this,t)};a.prototype._stopMutationObserver=function(){if(this._oMutationObserver){this._oMutationObserver.disconnect();delete this._oMutationObserver}};a.prototype._callDomChangedCallback=function(t,e){var i=e.target;if(this._bHandlerRegistered&&i!==window){var n=this._getRelevantElementId(i);if(n){this._callRelevantCallbackFunctions([n],t)}}};a.prototype._callDomChangedOnResizeWithRoot=function(t){if(this._aRootIds.length){if(this._iApplyStylesRequest){window.cancelAnimationFrame(this._iApplyStylesRequest)}this._iApplyStylesRequest=window.requestAnimationFrame(function(){this._callRelevantCallbackFunctions(this._aRootIds,t);delete this._iApplyStylesRequest}.bind(this))}};a.prototype._fireDomChangeOnScroll=function(t){var e=t.target;var n=[];if(this._bHandlerRegistered&&e!==document){var o=this._getRelevantElementId(e);if(o){n.push(o)}else if(e.getAttribute("id")!==i.STATIC_UIAREA_ID){n=this._aRootIds.filter(function(t){return e.contains(document.getElementById(t))})}if(n.length&&!r.getClosestOverlayForNode(e)){this._callRelevantCallbackFunctions(n,"MutationOnScroll")}}};return a});
//# sourceMappingURL=MutationObserver.js.map