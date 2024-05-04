/*
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./SelectionPlugin","./PluginBase","../library","../utils/TableUtils","sap/ui/core/Icon","sap/ui/core/IconPool"],function(e,t,i,n,o,l){"use strict";var r=i.plugins.SelectionMode;var a=i.SelectionMode;var s=e.extend("sap.ui.table.plugins.ODataV4Selection",{metadata:{library:"sap.ui.table",properties:{selectionMode:{type:"sap.ui.table.plugins.SelectionMode",group:"Behavior",defaultValue:r.MultiToggle},limit:{type:"int",group:"Behavior",defaultValue:200},enableNotification:{type:"boolean",group:"Behavior",defaultValue:false},hideHeaderSelector:{type:"boolean",group:"Appearance",defaultValue:false}},events:{selectionChange:{}}}});s.findOn=t.findOn;s.prototype.init=function(){e.prototype.init.apply(this,arguments);var t=new o({src:l.getIconURI(n.ThemeParameters.clearSelectionIcon),useIconTooltip:false});t.addStyleClass("sapUiTableSelectClear");this._bLimitReached=false;this.oDeselectAllIcon=t;this._oRangeSelectionStartContext=null};s.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this.oDeselectAllIcon){this.oDeselectAllIcon.destroy();this.oDeselectAllIcon=null}};s.prototype.onActivate=function(t){e.prototype.onActivate.apply(this,arguments);t.setProperty("selectionMode",this.getSelectionMode())};s.prototype.onDeactivate=function(t){e.prototype.onDeactivate.apply(this,arguments);t.setProperty("selectionMode",a.None);this.clearSelection()};s.prototype.setSelected=function(e,t,i){var n=e.getRowBindingContext();if(!n||!f(n)){return}if(i&&i.range){c(this,e);return}if(this.isSelected(e)===t){return}if(this.getSelectionMode()===r.Single){this._bSuppressSelectionChangeEvent=true;this.clearSelection()}n.setSelected(t);this._oRangeSelectionStartContext=t&&this.getSelectionMode()===r.MultiToggle?n:null;this.fireSelectionChange()};function c(e,t){if(!e._oRangeSelectionStartContext){return}var i=e._oRangeSelectionStartContext.getIndex();var n=t.getRowBindingContext();var o=n?n.getIndex():-1;if(i!==o){i+=o>i?1:-1}g(e,i,o)}s.prototype.isSelected=function(e){var t=e.getRowBindingContext();return t?t.isSelected():false};s.prototype.getSelectedCount=function(){return this.getSelectedContexts().length};s.prototype.getRenderConfig=function(){if(!this.isActive()){return e.prototype.getRenderConfig.apply(this,arguments)}return{headerSelector:{type:this._isLimitDisabled()?"toggle":"clear",icon:this.oDeselectAllIcon,visible:this.getSelectionMode()===r.MultiToggle&&!this.getHideHeaderSelector(),enabled:this._isLimitDisabled()||this.getSelectedCount()>0,selected:d(this)}}};function u(e){if(d(e)){e.clearSelection();return false}else if(e._isLimitDisabled()){var t=e.getTableBinding();if(t&&t.getLength()){g(e,0,t.getLength()-1);return true}}return undefined}function d(e){var t=e.getTableBinding();if(!t||!t.isLengthFinal()){return false}var i=t.getAllCurrentContexts().filter(function(e){return f(e)}).length;var n=e.getSelectedContexts().filter(function(e){return f(e)}).length;return i>0&&i===n}s.prototype.onHeaderSelectorPress=function(){var e=this.getRenderConfig();if(!e.headerSelector.visible||!e.headerSelector.enabled){return}if(e.headerSelector.type==="toggle"){u(this)}else if(e.headerSelector.type==="clear"){this.clearSelection()}};s.prototype.onKeyboardShortcut=function(e,t){if(e==="toggle"){if(this._isLimitDisabled()&&u(this)===false){t?.setMarked("sapUiTableClearAll")}}else if(e==="clear"){this.clearSelection();t?.setMarked("sapUiTableClearAll")}};s.prototype.setSelectionMode=function(e){var t=this.getTable();this.setProperty("selectionMode",e,true);this._oRangeSelectionStartContext=null;this.clearSelection();if(t){t.setProperty("selectionMode",this.getSelectionMode())}return this};s.prototype.onTableRowsBound=function(e){if(!e.getModel().isA("sap.ui.model.odata.v4.ODataModel")){this.deactivate()}};s.prototype._isLimitDisabled=function(){return this.getLimit()===0};s.prototype.isLimitReached=function(){return this._bLimitReached};function g(e,t,i){var o=e.getTable();var l=e.getLimit();var r=i<t;var a=r?i:t;var s=Math.abs(i-t)+1;if(!e._isLimitDisabled()){e._bLimitReached=s>l;if(e._bLimitReached){if(r){i=t-l+1;a=i}else{i=t+l-1}s=l+1}}var c=false;n.loadContexts(e.getTableBinding(),a,s).then(function(t){t.forEach(function(t){if(!f(t)||t.isSelected()){return}if(r&&t.getIndex()>=i||t.getIndex()<=i){t.setSelected(true);c=true}if(t.getIndex()===i){e._oRangeSelectionStartContext=t}});if(e.isLimitReached()){n.scrollTableToIndex(o,i,r).then(function(){if(e.getEnableNotification()){n.showNotificationPopoverAtIndex(o,i,e.getLimit())}})}if(c){e.fireSelectionChange()}})}function f(e){var t="hierarchyQualifier"in(e.getBinding().getAggregation()||{});return t||e.getProperty("@$ui5.node.isExpanded")===undefined&&!e.getProperty("@$ui5.node.isTotal")}s.prototype.clearSelection=function(){var e=false;this.getSelectedContexts().forEach(function(t){if(!e&&t.isSelected()){e=true}t.setSelected(false)});if(e&&!this._bSuppressSelectionChangeEvent){this.fireSelectionChange()}this._bSuppressSelectionChangeEvent=false};s.prototype.getSelectedContexts=function(){var e=this.getTableBinding();return e?e.getAllCurrentContexts().filter(function(e){return e.isSelected()}):[]};s.prototype.onThemeChanged=function(){this.oDeselectAllIcon.setSrc(l.getIconURI(n.ThemeParameters.clearSelectionIcon))};return s});
//# sourceMappingURL=ODataV4Selection.js.map