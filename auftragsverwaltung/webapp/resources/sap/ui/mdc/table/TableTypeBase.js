/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/dnd/DragDropInfo","sap/ui/model/base/ManagedObjectModel","sap/ui/mdc/enums/TableP13nMode"],(t,e,o,n)=>{"use strict";const r=t.extend("sap.ui.mdc.table.TableTypeBase",{metadata:{library:"sap.ui.mdc",abstract:true,properties:{}}});r.prototype.init=function(){t.prototype.init.apply(this,arguments);this._oManagedObjectModel=new o(this)};r.prototype.exit=function(){this._disconnectFromTable();this._oManagedObjectModel.destroy();delete this._oManagedObjectModel;t.prototype.exit.apply(this,arguments)};r.prototype.setParent=function(){this._disconnectFromTable();t.prototype.setParent.apply(this,arguments);this._connectToTable()};r.prototype._connectToTable=function(){const t=this.getTable();if(t){t.setModel(this._oManagedObjectModel,"$sap.ui.mdc.Table#type")}};r.prototype._disconnectFromTable=function(){const t=this.getTable();if(t&&!t.isDestroyStarted()){t.setModel(null,"$sap.ui.mdc.Table#type")}};r.prototype.getSupportedP13nModes=function(){return Object.keys(n)};r.prototype.callHook=function(t,e,o){const n="_on"+t;if(!e||!(e[n]instanceof Function)){throw new Error(this+": Hook '"+t+"' does not exist on "+e)}e[n].call(e,o)};r.prototype.getTable=function(){const t=this.getParent();return t&&t.isA("sap.ui.mdc.Table")?t:null};r.prototype.getInnerTable=function(){const t=this.getTable();return t?t._oTable:null};r.prototype.setProperty=function(e,o){t.prototype.setProperty.apply(this,arguments);this.updateTableByProperty(e,o);return this};r.prototype.updateTable=function(){for(const t in this.getMetadata().getAllProperties()){this.updateTableByProperty(t,this.getProperty(t))}};r.prototype.getTableSettings=function(){const t=this.getTable();if(!t){return{}}const o=new e({sourceAggregation:"columns",targetAggregation:"columns",dropPosition:"Between",enabled:t.getActiveP13nModes().includes(n.Column),drop:[this._onColumnMove,this]});o.bIgnoreMetadataCheck=true;return{dragDropConfig:[o],busyIndicatorDelay:t.getBusyIndicatorDelay(),paste:[this._onPaste,this]}};r.prototype.getThreshold=function(){const t=this.getTable();const e=t?t.getThreshold():-1;return e>-1?e:undefined};r.prototype.getRowSettingsConfig=function(){const t=this.getTable();const e=t?t.getRowSettings():null;return e?e.getAllSettings():null};r.prototype.getRowActionsConfig=function(){const t=this.getTable();const e=t?t.getRowSettings():null;return e?e.getAllActions():null};r.prototype._onColumnMove=function(t){const e=this.getTable();const o=this.getInnerTable();const n=t.getParameter("draggedControl");const r=t.getParameter("droppedControl");if(n===r){return}const i=t.getParameter("dropPosition");const s=o.indexOfColumn(n);const p=o.indexOfColumn(r);const a=p+(i=="Before"?0:1)+(s<p?-1:0);this.callHook("ColumnMove",e,{column:e.getColumns()[s],newIndex:a})};r.prototype._onPaste=function(t){this.callHook("Paste",this.getTable(),{data:t.getParameter("data")})};r.prototype._onColumnInsert=function(t){};r.prototype.loadModules=function(){return Promise.reject(this+" does not implement #loadModules")};r.prototype.updateTableByProperty=function(t,e){};r.prototype.removeToolbar=function(){};r.prototype.scrollToIndex=function(t){return Promise.reject()};r.prototype.updateRowSettings=function(){};r.prototype.prepareRowPress=function(){};r.prototype.cleanupRowPress=function(){};r.prototype.createTable=function(t){};r.prototype.getRowBinding=function(){};r.prototype.bindRows=function(t){};r.prototype.isTableBound=function(){};r.prototype.createRowTemplate=function(t){};r.prototype.insertFilterInfoBar=function(t,e){};r.prototype.enableColumnResize=function(){};r.prototype.disableColumnResize=function(){};r.prototype.createColumnResizeMenuItem=function(){};r.prototype.updateRowActions=function(){};r.prototype.updateSortIndicator=function(t,e){};r.prototype.getTableStyleClasses=function(){return[]};return r});
//# sourceMappingURL=TableTypeBase.js.map