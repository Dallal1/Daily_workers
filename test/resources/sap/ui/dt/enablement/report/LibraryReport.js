/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Lib","sap/ui/dt/enablement/Test","sap/ui/dt/enablement/ElementEnablementTest"],function(e,t,r){"use strict";var a=t.extend("sap.ui.dt.enablement.report.LibraryReport",{metadata:{library:"sap.ui.dt",properties:{libraryName:{type:"string"},testData:{type:"object"}}}});a.prototype.run=function(){this._aResult=[];var t=this.getTestData()||{};var a=this.getLibraryName();var n=[];var i=e.all()[a];if(i){var s=i.controls;s.forEach(function(e){var a=t[e];if(!a&&a!==false){a={}}if(a!==false){a.type=e;var i=null;if(a.create){i=Object.assign({},a);delete i.create;a.groupPostfix="with create method"}n.push(new r(a));if(i){n.push(new r(i))}}})}var u=[];var c=function(e){if(e){u.push(e)}var t=n.shift();if(t){return t.run().then(function(e){t.destroy();return c(e)})}return Promise.resolve(u)};return c().then(function(e){var t=this.createSuite("Library Enablement Test");e.forEach(function(e){var r=e.children[0];var a=t.children[t.children.length-1];if(a&&r.name===a.name){a.children=a.children.concat(r.children)}else{t.children.push(r)}});t=this.aggregate(t);return t}.bind(this))};return a});
//# sourceMappingURL=LibraryReport.js.map