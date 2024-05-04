/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PropertyHelper","sap/base/i18n/Localization","sap/m/Button","sap/m/Bar","sap/m/Title","sap/base/util/merge","sap/m/MessageBox","sap/ui/Device","sap/ui/core/Lib","sap/ui/core/Locale","sap/ui/core/library"],(e,t,n,o,r,i,s,a,c,l,u)=>{"use strict";const p=c.getResourceBundleFor("sap.ui.mdc");const{TitleLevel:g}=u;const d={createP13nPopover:function(e,t){return new Promise((n,o)=>{sap.ui.require(["sap/m/ResponsivePopover"],r=>{d["_checkSettings"](e,t,o);const i=new r({title:t.title,horizontalScrolling:t.hasOwnProperty("horizontalScrolling")?t.horizontalScrolling:false,verticalScrolling:t.hasOwnProperty("verticalScrolling")?t.verticalScrolling:false,contentWidth:t.contentWidth?t.contentWidth:"24rem",resizable:t.hasOwnProperty("resizable")?t.resizable:true,contentHeight:t.contentHeight?t.contentHeight:"35rem",placement:t.placement?t.placement:"Bottom",content:e,afterClose:t.afterClose?t.afterClose:function(){}});if(t.reset){const e=d._createResetHeader({title:t.title,reset:t.reset.onExecute,idResetButton:t.reset.idButton,warningText:t.reset.warningText});i.setCustomHeader(e)}n(i)},o)})},createP13nDialog:function(e,t){return new Promise((n,o)=>{d["_checkSettings"](e,t,o);const r=t.id;sap.ui.require(["sap/m/Dialog","sap/m/Button"],(i,s)=>{const l=c.getResourceBundleFor("sap.ui.mdc");const u=new i(r,{title:t.title,horizontalScrolling:t.hasOwnProperty("horizontalScrolling")?t.horizontalScrolling:false,verticalScrolling:t.hasOwnProperty("verticalScrolling")?t.verticalScrolling:true,contentWidth:t.contentWidth?t.contentWidth:"40rem",contentHeight:t.contentHeight?t.contentHeight:"55rem",draggable:true,resizable:true,stretch:a.system.phone,content:e,afterClose:t.afterClose?t.afterClose:function(){},buttons:[new s(r?r+"-confirmBtn":undefined,{text:t.confirm&&t.confirm.text?t.confirm.text:l.getText("p13nDialog.OK"),type:"Emphasized",press:function(){if(t.confirm&&t.confirm.handler){t.confirm.handler.apply(u,arguments)}}}),new s(r?r+"-cancelBtn":undefined,{text:l.getText("p13nDialog.CANCEL"),press:function(){t.cancel.apply(u,arguments)}})]});if(t.reset){const e=d._createResetHeader({title:t.title,idResetButton:t.reset.idButton,reset:t.reset.onExecute,warningText:t.reset.warningText});u.setCustomHeader(e)}const p=t.additionalButtons;if(p instanceof Array){p.forEach(e=>{if(!e.isA("sap.m.Button")){o("Please only provide sap.m.Button instances as 'additionalButtons'")}u.addButton(e)})}n(u)},o)})},_createResetHeader:function(e){const t=new o({contentLeft:[new r({text:e.title,level:g.H1})]});if(e.reset){const o=e.idResetButton;t.addContentRight(new n(o,{text:c.getResourceBundleFor("sap.ui.mdc").getText("p13nDialog.RESET"),press:function(t){const n=t.getSource().getParent().getParent();const o=n.getParent();const r=e.warningText?e.warningText:c.getResourceBundleFor("sap.ui.mdc").getText("filterbar.ADAPT_RESET_WARNING");s.warning(r,{actions:[s.Action.OK,s.Action.CANCEL],emphasizedAction:s.Action.OK,onClose:function(t){if(t===s.Action.OK){n.getButtons()[0].focus();e.reset(o)}}})}}))}return t},prepareAdaptationData:function(t,n,o){const r=t&&t.getProperties instanceof Function?t:new e(t);const i=[];const s=o?{}:null;const a=n instanceof Function;r.getProperties().forEach(e=>{const t={};t.name=e.name;if(a){const o=n(t,e);if(!o){return}}t.label=e.label||e.name;t.tooltip=e.tooltip;if(s){t.group=e.group?e.group:"BASIC";t.groupLabel=e.groupLabel;s[t.group]=s[t.group]?s[t.group]:[];s[t.group].push(t)}i.push(t)});const c={items:i};if(s){c.itemsGrouped=this._buildGroupStructure(s)}return c},sortP13nData:function(e,n){const o=e;const r=o.position;const i=o.visible;const s=new l(t.getLanguageTag()).toString();const a=window.Intl.Collator(s,{});n.sort((e,t)=>{if(e[i]&&t[i]){return(e[r]||0)-(t[r]||0)}else if(e[i]){return-1}else if(t[i]){return 1}else if(!e[i]&&!t[i]){return a.compare(e.label,t.label)}})},_buildGroupStructure:function(e){const t=[];Object.keys(e).forEach(n=>{this.sortP13nData("generic",e[n]);t.push({group:n,groupLabel:e[n][0].groupLabel||p.getText("p13nDialog.FILTER_DEFAULT_GROUP"),groupVisible:true,items:e[n]})});return t},_isExcludeProperty:function(e,t){return t.some(t=>{const n=t.ignoreKey;const o=t.ignoreValue;return e[n]===o})},_checkSettings:function(e,t,n){if(!t){n("Please provide a settings object for p13n creation")}if(!t.title&&!t.customHeader){n("Please provide a title or customHeader in the settings object for p13n creation")}},arrayToMap:function(e){return e.reduce((e,t,n)=>{e[t.name]=t;e[t.name].position=n;return e},{})},addRTACustomFieldButton:function(e,t){let i=false,s=e.getParent();if(t&&t.isA("sap.ui.comp.smarttable.SmartTable")){s=t}return new Promise(t=>{sap.ui.require(["sap/ui/fl/write/api/FieldExtensibility","sap/ui/core/EventBus"],(a,l)=>{const u=s&&s.getModel();const p=u&&u.sServiceUrl?u.sServiceUrl:"";const d=Promise.all([a.onControlSelected(s),a.isServiceOutdated(p),a.isExtensibilityEnabled(s)]);return d.then(e=>{if(e[1]){a.setServiceValid(p);l.getInstance().publish("sap.ui.core.UnrecoverableClientStateCorruption","RequestReload",{})}i=!!e[2];return i}).then(i=>{let l=e.getCustomHeader();const u=s&&s.getId?s.getId():undefined,p=c.getResourceBundleFor("sap.ui.mdc");if(!l){const t=new o({contentLeft:[new r({text:e.getTitle(),level:g.H1})]});e.setCustomHeader(t);l=e.getCustomHeader()}if(i){l.addContentRight(new n(u+"-addCustomField",{icon:"sap-icon://add",enabled:i,tooltip:p.getText("p13nDialog.rtaAddTooltip"),press:function(e){const t="sapUiRTABorder",n=e.getSource().getParent().getParent();a.getExtensionData().then(e=>{a.onTriggerCreateExtensionData(e,t);n.close()})}}));e.setCustomHeader(l);t(e)}})})})}};return d});
//# sourceMappingURL=P13nBuilder.js.map