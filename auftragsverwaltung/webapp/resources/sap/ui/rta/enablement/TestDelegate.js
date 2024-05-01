/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/isPlainObject","sap/base/util/merge"],function(e,r){"use strict";function t(e,r){return e[r]&&typeof e[r]==="string"}function n(r){if(!r.appComponent.isA("sap.ui.core.Component")){return false}if(!e(r.modifier)){return false}if(r.modifier.targets==="xmlTree"&&!t(r.view,"nodeName")){return false}if(r.payload&&!e(r.payload)){return false}return["aggregationName","bindingPath"].every(t.bind(null,r))}var o={getPropertyInfo(e){return Promise.resolve().then(function(){var r=e.element.isA("sap.ui.core.Element")&&e.aggregationName&&typeof e.aggregationName==="string"&&(!e.payload||typeof e.payload==="object");if(r){return[]}return undefined})},createLabel(e){return Promise.resolve().then(function(){var r=n(e)&&t(e,"labelFor");if(r){return e.modifier.createControl("sap.m.Label",e.appComponent,e.view,`${e.labelFor}-label`,{labelFor:e.labelFor,text:e.bindingPath},true)}return undefined})},createControlForProperty(o){return Promise.resolve().then(function(){var a=n(o)&&(t(o.element,"nodeName")||o.element.isA("sap.ui.core.Element"))&&e(o.fieldSelector)&&t(o.fieldSelector,"id");if(a){var i=[o.modifier.createControl("sap.m.Text",o.appComponent,o.view,o.fieldSelector,{text:`{${o.bindingPath}}`})];if(o.payload.valueHelpId){var l=r({},o.fieldSelector,{id:`${o.fieldSelector.id}-${o.payload.valueHelpId}`});i.push(o.modifier.createControl("sap.ui.core.Element",o.appComponent,o.view,l,true))}return Promise.all(i).then(function(e){return{control:e[0],valueHelp:e[1]}})}return undefined})},createLayout(e){var t=n(e)&&e.fieldSelector&&typeof e.fieldSelector==="object"&&typeof e.fieldSelector.id==="string";if(t){if(!e.payload.useCreateLayout){return Promise.resolve()}var a;var i;var l;var u=r({},e);var f=u.modifier;u.fieldSelector.id+="-field";return o.createControlForProperty(u).then(function(r){l=r;i=l.valueHelp;return f.createControl(u.payload.layoutType,u.appComponent,u.view,e.fieldSelector)}).then(function(e){a=e;return f.insertAggregation(a,u.payload.aggregation,l.control,0,u.view)}).then(function(){if(u.payload.labelAggregation){var e=Object.assign({labelFor:f.getId(l.control)},u);return o.createLabel(e)}return undefined}).then(function(e){if(e){return f.insertAggregation(a,u.payload.labelAggregation,e,0,u.view)}return undefined}).then(function(){return{control:a,valueHelp:i}})}return undefined}};return o});
//# sourceMappingURL=TestDelegate.js.map