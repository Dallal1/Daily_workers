/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../../TableDelegate","../../table/V4AnalyticsPropertyHelper","sap/ui/mdc/enums/TableP13nMode","sap/ui/mdc/enums/TableType","sap/ui/mdc/enums/TableSelectionMode","sap/ui/mdc/odata/v4/TypeMap","sap/ui/mdc/util/loadModules","sap/m/plugins/PluginBase","sap/ui/core/Lib","sap/ui/core/library","sap/ui/core/format/ListFormat","sap/ui/base/ManagedObjectObserver"],(e,t,n,r,o,i,s,a,l,u,p,c)=>{"use strict";const g=new window.WeakMap;const f=Object.assign({},e);f.getTypeMap=function(e){return i};f.getPropertyHelperClass=function(){return t};f.getGroupSorter=function(t){const n=t._getGroupedProperties()[0];if(!n||!t._isOfType(r.ResponsiveTable)){return undefined}if(!S(t).includes(n.name)){return undefined}return e.getGroupSorter.apply(this,arguments)};f.getSorters=function(t){let n=e.getSorters.apply(this,arguments);if(v(t)){const e=t.getPropertyHelper();const r=S(t).map(t=>e.getProperty(t).path);n=n.filter(e=>r.includes(e.sPath))}return n};f.updateBinding=function(e,t,n,r){if(!n||n.getPath()!=t.path){this.rebind(e,t);return}const o=n.getRootBinding();let i=o&&!o.isSuspended();try{if(i){o.suspend()}h(e,t);n.changeParameters(t.parameters);n.filter(t.filters,"Application");n.sort(t.sorter);if(r&&r.forceRefresh){n.refresh()}}catch(r){this.rebind(e,t);if(o==n){i=false}}finally{if(i&&o.isSuspended()){o.resume()}}};f.rebind=function(t,n){h(t,n);e.rebind.apply(this,arguments)};f.expandAllRows=function(e){if(!this.getSupportedFeatures(e).expandAllRows){throw Error("Unsupported operation: Not supported for the current table type")}const t=e.getRowBinding();if(t){t.setAggregation(Object.assign(t.getAggregation(),{expandTo:Number.MAX_SAFE_INTEGER}))}};f.collapseAllRows=function(e){if(!this.getSupportedFeatures(e).collapseAllRows){throw Error("Unsupported operation: Not supported for the current table type")}const t=e.getRowBinding();if(t){t.setAggregation(Object.assign(t.getAggregation(),{expandTo:1}))}};f.getSupportedFeatures=function(t){const o=e.getSupportedFeatures.apply(this,arguments);const i=t._isOfType(r.TreeTable);if(t._isOfType(r.Table)){const e=o.p13nModes;if(!e.includes(n.Group)){e.push(n.Group)}if(!e.includes(n.Aggregate)){e.push(n.Aggregate)}}return{...o,expandAllRows:i,collapseAllRows:i}};f.validateState=function(t,n,r){const o=e.validateState.apply(this,arguments);let i;if(r=="Sort"){i=d(t,n)}else if(r=="Group"){i=T(t,n)}else if(r=="Column"){i=m(t,n)}return R(o,i)};function d(e,t){if(v(e)&&_(e,t.items,t.sorters)){return{validation:u.MessageType.Information,message:l.getResourceBundleFor("sap.ui.mdc").getText("table.PERSONALIZATION_DIALOG_SORT_RESTRICTION")}}return null}function T(e,t){const n=l.getResourceBundleFor("sap.ui.mdc");if(t.aggregations){const r=Object.keys(t.aggregations);const o=[];const i=p.getInstance();r.forEach(t=>{const n=e.getPropertyHelper().getProperty(t);if(n&&n.groupable){o.push(t)}});if(o.length>0){return{validation:u.MessageType.Information,message:n.getText("table.PERSONALIZATION_DIALOG_GROUP_RESTRICTION_TOTALS",[i.format(o)])}}}else if(e._isOfType(r.ResponsiveTable)){if(_(e,t.items,t.groupLevels)){return{validation:u.MessageType.Information,message:n.getText("table.PERSONALIZATION_DIALOG_GROUP_RESTRICTION_VISIBLE")}}}return null}function m(e,t){const n=l.getResourceBundleFor("sap.ui.mdc");const o=t.aggregations&&Object.keys(t.aggregations);let i;if(e._isOfType(r.ResponsiveTable)){if(_(e,t.items,t.groupLevels)){return{validation:u.MessageType.Information,message:n.getText("table.PERSONALIZATION_DIALOG_GROUP_RESTRICTION_VISIBLE")}}}if(_(e,t.items,o)){i=n.getText("table.PERSONALIZATION_DIALOG_TOTAL_RESTRICTION")}if(v(e)&&_(e,t.items,t.sorters)){const e=n.getText("table.PERSONALIZATION_DIALOG_SORT_RESTRICTION");i=i?i+"\n"+e:e}if(i){return{validation:u.MessageType.Information,message:i}}return null}f.preInit=function(){return Promise.resolve()};f.initializeContent=function(t){return e.initializeContent.apply(this,arguments).then(()=>{if(!g.has(t)){g.set(t,{})}return E(t)}).then(()=>{h(t)})};f.initializeSelection=function(t){if(t._isOfType(r.Table,true)){return b(t)}else{return e.initializeSelection.apply(this,arguments)}};function b(e){const t={Single:"Single",SingleMaster:"Single",Multi:"MultiToggle"};return s("sap/ui/table/plugins/ODataV4Selection").then(n=>{const r=n[0];e._oTable.addDependent(new r({limit:"{$sap.ui.mdc.Table#type>/selectionLimit}",enableNotification:true,hideHeaderSelector:"{= !${$sap.ui.mdc.Table#type>/showHeaderSelector} }",selectionMode:{path:"$sap.ui.mdc.Table>/selectionMode",formatter:function(e){return t[e]}},enabled:{path:"$sap.ui.mdc.Table>/selectionMode",formatter:function(e){return e in t}},selectionChange:function(t){e._onSelectionChange({selectAll:t.getParameter("selectAll")})}}))})}function y(e,t){e.clearSelection();for(const e of t){e.setSelected(true)}e._oTable.invalidate()}f.setSelectedContexts=function(t,n){if(t._isOfType(r.Table,true)){const e=t.getSelectionMode();if(e===o.None||(e===o.Single||e===o.SingleMaster)&&n.length>1){throw Error("Unsupported operation: Cannot select the given number of contexts in the current selection mode")}y(t,n)}else{e.setSelectedContexts.apply(this,arguments)}};f.getSelectedContexts=function(t){if(!t._oTable){return[]}if(t._isOfType(r.Table,true)){const e=a.getPlugin(t._oTable,"sap.ui.table.plugins.ODataV4Selection");return e?e.getSelectedContexts():[]}return e.getSelectedContexts.apply(this,arguments)};function h(e,t){const n=g.get(e).plugin;if(!n||n.isDestroyed()){return}const r=e._getGroupedProperties().map(e=>e.name);const o=Object.keys(e._getAggregatedProperties());const i=t?t.parameters["$search"]:undefined;if(i){delete t.parameters["$search"]}const s={visible:S(e),groupLevels:r,grandTotal:o,subtotals:o,columnState:P(e,o),search:i};n.setAggregationInfo(s)}function S(e){const t=new Set;e.getColumns().forEach(n=>{const r=e.getPropertyHelper().getProperty(n.getPropertyKey());if(!r){return}r.getSimpleProperties().forEach(e=>{t.add(e.name)})});return Array.from(t)}function P(e,t){const n={};e.getColumns().forEach(r=>{let o=r.getId()+"-innerColumn";const i=I(e,r,t);const s=i.length>0;if(o in n){n[o].subtotals=s||n[o].subtotals;n[o].grandTotal=s||n[o].grandTotal;return}n[o]={subtotals:s,grandTotal:s};A(e,i).forEach(e=>{o=e.getId()+"-innerColumn";if(o in n){n[o].subtotals=s||n[o].subtotals;n[o].grandTotal=s||n[o].grandTotal}else{n[o]={subtotals:s,grandTotal:s}}})});return n}function O(e,t){const n=e.getPropertyHelper().getProperty(t.getPropertyKey());if(!n){return[]}else{return n.getSimpleProperties()}}function I(e,t,n){return O(e,t).filter(e=>n.includes(e.name))}function A(e,t){const n=[];t.forEach(e=>{if(e.unitProperty){n.push(e.unitProperty)}});return e.getColumns().filter(t=>O(e,t).some(e=>n.includes(e)))}function _(e,t,n){const r=[];if(t){t.forEach(t=>{e.getPropertyHelper().getProperty(t.name).getSimpleProperties().forEach(e=>{r.push(e.name)})})}const o=n?n.every(e=>r.find(t=>e.name?e.name===t:e===t)):true;return!o}function R(e,t){const n={Error:1,Warning:2,Information:3,None:4};if(!t||n[t.validation]-n[e.validation]>0){return e}else{return t}}function v(e){return(e.isGroupingEnabled()||e.isAggregationEnabled())&&e._isOfType(r.Table)}function E(e){if(e._isOfType(r.Table)){return(v(e)?N(e):C(e)).then(()=>M(e))}return Promise.resolve()}function N(e){const t=g.get(e);let n=t.plugin;if(n&&!n.isDestroyed()){n.activate();return Promise.resolve()}return Promise.all([e.awaitPropertyHelper(),s("sap/ui/table/plugins/V4Aggregation")]).then(r=>{const o=r[1][0];const i=e.getControlDelegate();n=new o({groupHeaderFormatter:function(t,n){return i.formatGroupHeader(e,t,n)}});n.setPropertyInfos(e.getPropertyHelper().getPropertiesForPlugin());e.propertiesFinalized().then(()=>{n.setPropertyInfos(e.getPropertyHelper().getPropertiesForPlugin())});e._oTable.addDependent(n);t.plugin=n})}function C(e){const t=g.get(e);if(t.plugin){t.plugin.deactivate()}return Promise.resolve()}function M(e){const t=g.get(e);if(!t.observer){t.observer=new c(t=>{E(e)});t.observer.observe(e,{properties:["p13nMode"]})}}return f});
//# sourceMappingURL=TableDelegate.js.map