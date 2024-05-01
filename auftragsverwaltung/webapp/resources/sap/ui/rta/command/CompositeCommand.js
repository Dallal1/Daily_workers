/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/command/BaseCommand","sap/ui/rta/command/FlexCommand","sap/ui/fl/Utils"],function(t,e,o){"use strict";var n=t.extend("sap.ui.rta.command.CompositeCommand",{metadata:{library:"sap.ui.rta",properties:{},aggregations:{commands:{type:"sap.ui.rta.command.BaseCommand",multiple:true}},events:{}}});n.prototype.execute=function(){var t=[];this._forEachCommand(function(e){t.push(e.execute.bind(e))});return o.execPromiseQueueSequentially(t,true).catch(function(t){var o=this.getCommands();o.forEach(function(t){if(t instanceof e){this.removeCommand(t)}}.bind(this));return this.undo().then(function(){return Promise.reject(t)})}.bind(this))};n.prototype.undo=function(){var t=[];this._forEachCommandInReverseOrder(function(e){t.push(e.undo.bind(e))});return o.execPromiseQueueSequentially(t)};n.prototype._forEachCommand=function(t){var e=this.getCommands();e.forEach(t,this)};n.prototype._forEachCommandInReverseOrder=function(t){var e=this.getCommands();for(var o=e.length-1;o>=0;o--){t.call(this,e[o])}};n.prototype._addCompositeIdToChange=function(t){this._sCompositeId||=o.createDefaultFileName("composite");var e=t.getPreparedChange&&t.getPreparedChange();if(e){var n=e.getSupportInformation();if(!n.compositeCommand){n.compositeCommand=this._sCompositeId;e.setSupportInformation(n)}}else if(t.setCompositeId){t.setCompositeId(this._sCompositeId)}};n.prototype.addCommand=function(t,e){this._addCompositeIdToChange(t);return this.addAggregation("commands",t,e)};n.prototype.insertCommand=function(t,e,o){this._addCompositeIdToChange(t);return this.insertAggregation("commands",t,e,o)};return n});
//# sourceMappingURL=CompositeCommand.js.map