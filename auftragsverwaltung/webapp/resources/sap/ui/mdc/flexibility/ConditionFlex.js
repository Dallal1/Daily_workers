/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/base/Log","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/flexibility/Util","sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/changeHandler/common/ChangeCategories"],(e,t,n,i,o,r)=>{"use strict";const a=function(e,t){const n=function(t){if(e._pQueue===t){delete e._pQueue}};e._pQueue=e._pQueue instanceof Promise?e._pQueue.then(t):t();e._pQueue.then(n.bind(null,e._pQueue));return e._pQueue};const l=function(o,r,l,c){const s=c===i.REVERT;const d=s?o.getRevertData():o.getContent();let u,g=null;const f=l.modifier;return a(r,()=>f.getProperty(r,"filterConditions").then(a=>{u=e({},a);if(u){for(const e in u){if(e===d.name){g=u[e];break}}}if(!g){u[d.name]=[];g=u[d.name]}if(!s){o.setRevertData({name:d.name,condition:d.condition})}const c=n.indexOfCondition(d.condition,g);if(c<0){g.push(d.condition);f.setProperty(r,"filterConditions",u);return f.getProperty(r,"delegate").then(e=>i.getModule(e.name)).then(e=>{const n=e&&(e.getFilterDelegate?e.getFilterDelegate().addCondition:e.addCondition);if(n){return n(r,d.name,l).catch(e=>{t.error("Error during Delegate.addCondition call: "+e)})}}).finally(()=>{if(s){o.resetRevertData()}})}}))};const c=function(o,r,l,c){const s=c===i.REVERT;const d=s?o.getRevertData():o.getContent();let u,g,f=-1;const p=l.modifier;return a(r,()=>p.getProperty(r,"filterConditions").then(a=>{u=e({},a);if(u){for(const e in u){if(e===d.name){g=u[e];break}}}if(!s){o.setRevertData({name:d.name,condition:d.condition})}if(g&&g.length>0){f=n.indexOfCondition(d.condition,g);if(f>=0){g.splice(f,1);p.setProperty(r,"filterConditions",u);return p.getProperty(r,"delegate").then(e=>i.getModule(e.name)).then(e=>{const n=e&&(e.getFilterDelegate?e.getFilterDelegate().removeCondition:e.removeCondition);if(n){return n(r,d.name,l).catch(e=>{t.error("Error during Delegate.removeCondition call: "+e)})}}).finally(()=>{if(s){o.resetRevertData()}})}}}))};const s=function(e,t){const n=e.getContent();return{classification:o.Reverse,affectedControl:e.getSelector(),uniqueKey:n.name+"_"+JSON.stringify(n.condition)}};const d=function(e,t){const o=e.getContent();const a=t.byId(e.getSelector().id);const l={descriptionPayload:{}};let c;let s=[o.name,o.condition.operator];let d;if(e.getChangeType()==="addCondition"){l.descriptionPayload.category=r.ADD;c="filterbar.COND_ADD_CHANGE"}else{l.descriptionPayload.category=r.REMOVE;c="filterbar.COND_DEL_CHANGE"}const u=a?.getPropertyHelper()?.getProperty(o.name);if(u){s.splice(0,1,u.label);const e=n.getOperator(o.condition.operator);if(e){const t=e.getLongText(u.dataType);if(t){s.splice(1,1,t)}let n=null;if(a.getInternalConditions){n=a.getInternalConditions()}else if(a.getInbuiltFilter&&a.getInbuiltFilter()&&a.getInbuiltFilter().getInternalConditions){n=a.getInbuiltFilter().getInternalConditions()}if(o.condition.values.length>0&&n){const t=n[o.name];const i=t?.find(e=>e.values[0]===o.condition.values[0]);if(i){d=e.format(i,u.typeConfig.typeInstance,u.display,true);if(d){s.push(d)}}}}}if(!d){if(o.condition.values.length===2){c+="_2";s=s.concat(o.condition.values)}else if(o.condition.values.length>2){c+="_3";s=s.concat(o.condition.values)}else if(o.condition.values.length===0){c+="_0"}}s=s.concat(d?d:o.condition.values);return i.getMdcResourceText(c,s).then(e=>{l.descriptionPayload.description=e;l.updateRequired=true;return l})};const u={};u.addCondition=i.createChangeHandler({apply:l,revert:c,getCondenserInfo:s,getChangeVisualizationInfo:d});u.removeCondition=i.createChangeHandler({apply:c,revert:l,getCondenserInfo:s,getChangeVisualizationInfo:d});return u});
//# sourceMappingURL=ConditionFlex.js.map