/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/dt/ElementUtil","sap/ui/dt/Util","sap/base/util/isEmptyObject"],function(e,t,a,r){"use strict";var i={};var n="sap.ui.dt.ElementOverlay";var s="sap.ui.dt.AggregationOverlay";var g={};var l={};i.getOverlay=function(e){var a=typeof e==="string"?e:t.getElementInstance(e)&&t.getElementInstance(e).getId();return g[a]||l[a]};i.getOverlays=function(){return Object.values(g)};i.register=function(e){if(!u(e)){var t="sap.ui.dt.OverlayRegistry#register";var a=new Error(`${t} / Attempt to register illegal overlay`);a.name=t;throw a}g[e.getId()]=e;if(e.getMetadata().getName()===n){l[e.getAssociation("element")]=e}};i.deregister=function(e){if(!u(e)){var t="sap.ui.dt.OverlayRegistry#deregister";var a=new Error(`${t} / Attempt to deregister illegal overlay`);a.name=t;throw a}delete g[e.getId()];if(e.getMetadata().getName()===n){delete l[e.getAssociation("element")]}};i.hasOverlays=function(){return!r(g)};function u(t){return t instanceof e&&[n,s].indexOf(t.getMetadata().getName())>-1}return i},true);
//# sourceMappingURL=OverlayRegistry.js.map