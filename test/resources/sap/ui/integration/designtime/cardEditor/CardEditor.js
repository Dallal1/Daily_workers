/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_CancelablePromise","sap/base/util/restricted/_isEqual","sap/base/util/restricted/_omit","sap/base/util/restricted/_castArray","sap/base/util/deepEqual","sap/base/util/each","sap/base/util/merge","sap/base/util/deepClone","sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/ui/integration/designtime/baseEditor/BaseEditor","sap/ui/integration/util/CardMerger","sap/ui/thirdparty/jquery","./config/index"],function(t,e,i,a,n,s,r,o,u,p,d,g,jQuery,l){"use strict";var c=d.extend("sap.ui.integration.designtime.cardEditor.CardEditor",{metadata:{library:"sap.ui.integration",properties:{layout:{type:"string",defaultValue:"form"},designtimeChanges:{type:"array",defaultValue:[]},baseUrl:{type:"sap.ui.core.URI",defaultValue:null},config:{type:"object",defaultValue:{i18n:[].concat(d.getMetadata().getProperty("config").getDefaultValue().i18n,"sap/ui/integration/designtime/cardEditor/i18n/i18n.properties")}}}},constructor:function(t){t=t||{};d.prototype.constructor.apply(this,arguments);if(!t["config"]){this.addConfig(l,true)}},renderer:d.getMetadata().getRenderer()});c.prototype.init=function(){d.prototype.init.apply(this,arguments);this.attachJsonChange(function(t){if(!this._oInitialJson){this._oInitialJson=t.getParameter("json")}},this)};c.prototype.setJson=function(){d.prototype.setJson.apply(this,arguments);var e=this.getJson();var i=u.get(["sap.app","id"],e);if(this._bDesigntimeInit&&this._bCardId!==i){if(this._oDesigntimePromise){this._oDesigntimePromise.cancel()}delete this._bCardId;delete this._bDesigntimeInit}if(!this._bDesigntimeInit){this.setPreventInitialization(true);this._bDesigntimeInit=true;this._bCardId=i;var n=f(u.get(["sap.card","configuration","editor"],e)||"");if(n===""){n=f(u.get(["sap.card","designtime"],e)||"")}var s=f(this.getBaseUrl()||"");if(s&&n){var o={};var l=f(s);var c=m(n);var b=l+"/"+c;var y=i.replace(/\./g,"/")+"/"+c;o[y]=b;sap.ui.loader.config({paths:o});var _=y+"/editor.config";var v=y+"/i18n/i18n.properties";var C=b+"/metadata.json";this._oDesigntimePromise=new t(function(t){Promise.all([new Promise(function(t){sap.ui.require([_],t,function(){t({})})}),new Promise(function(t){jQuery.getJSON(C).done(t).fail(function(){t({})})})]).then(t)});this._oDesigntimePromise.then(function(t){this.setPreventInitialization(false);var e=t[1];e=g.mergeCardDesigntimeMetadata(e,this.getDesigntimeChanges());this._oInitialDesigntimeMetadata=e;this.setDesigntimeMetadata(h(e),true);var i=t[0];if(p(i)){this.addConfig({i18n:v})}else{i=r({},i);i.i18n=i.i18n?a(i.i18n):[];i.i18n.push(v);this._addSpecificConfig(i)}}.bind(this))}else{this.setPreventInitialization(false);this.addConfig({})}}};c.prototype.setDesigntimeChanges=function(t){if(this._oInitialDesigntimeMetadata){throw Error("Designtime Changes can only be set initially")}this.setProperty("designtimeChanges",t)};function h(t){var e={};Object.keys(t).forEach(function(i){u.set(i.split("/"),{__value:o(t[i])},e)});return e}function f(t){return t.trim().replace(/\/*$/,"")}function m(t){return t.replace(/^\.\//,"")}return c});
//# sourceMappingURL=CardEditor.js.map