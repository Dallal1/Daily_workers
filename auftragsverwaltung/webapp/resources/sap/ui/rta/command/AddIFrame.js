/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/command/FlexCommand"],function(t){"use strict";var e=t.extend("sap.ui.rta.command.AddIFrame",{metadata:{library:"sap.ui.rta",properties:{baseId:{type:"string",group:"content"},targetAggregation:{type:"string",group:"content"},index:{type:"int",group:"content"},url:{type:"string",group:"content"},width:{type:"string",group:"content"},height:{type:"string",group:"content"},title:{type:"string",group:"content"},useLegacyNavigation:{type:"boolean",defaultValue:false,group:"content"},changeType:{type:"string",defaultValue:"addIFrame"}},associations:{},events:{}}});e.prototype.applySettings=function(...e){const n=e[0];var a={};Object.keys(n).filter(function(t){return t!=="url"}).forEach(function(t){a[t]=n[t]});e[0]=a;t.prototype.applySettings.apply(this,e);this.setUrl(n.url)};e.prototype._getChangeSpecificData=function(){var e=t.prototype._getChangeSpecificData.call(this);var n=e.changeType;delete e.changeType;return{changeType:n,content:e}};return e},true);
//# sourceMappingURL=AddIFrame.js.map