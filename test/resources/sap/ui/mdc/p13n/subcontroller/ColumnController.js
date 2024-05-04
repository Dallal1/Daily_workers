/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SelectionController","sap/m/p13n/SelectionPanel","sap/ui/core/Lib"],(e,t,n)=>{"use strict";const o=n.getResourceBundleFor("sap.ui.mdc");const r=e.extend("sap.ui.mdc.p13n.subcontroller.ColumnController");r.prototype.getUISettings=function(){return{title:o.getText("table.SETTINGS_COLUMN"),tabText:o.getText("p13nDialog.TAB_Column")}};r.prototype.model2State=function(){const e=[];this._oPanel.getP13nData(true).forEach(t=>{if(t.visible){e.push({name:t.name})}});return e};r.prototype.createUI=function(e){const n=new t({showHeader:true,enableCount:true,title:o.getText("fieldsui.COLUMNS"),fieldColumn:o.getText("fieldsui.COLUMNS")});n.setEnableReorder(this._bReorderingEnabled);return n.setP13nData(e.items)};r.prototype.getChangeOperations=function(){return{add:"addColumn",remove:"removeColumn",move:"moveColumn"}};return r});
//# sourceMappingURL=ColumnController.js.map