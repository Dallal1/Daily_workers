/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Util","sap/ui/fl/changeHandler/Base","sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/changeHandler/common/ChangeCategories"],(e,t,n,o)=>{"use strict";const r=function(e,t,n,o){if(o){e.resetRevertData()}else{e.setRevertData(n)}};const a=function(t,n,o,a){return new Promise((i,s)=>{const g=a===e.REVERT;const c=o.modifier;const d=g?t.getRevertData():t.getContent();Promise.resolve().then(c.getProperty.bind(c,n,"groupConditions")).then(e=>{const o=e?e.groupLevels:[];const a={name:d.name};o.splice(d.index,0,a);e={groupLevels:o};c.setProperty(n,"groupConditions",e);r(t,n,a,g);i()}).catch(e=>{s(e)})})};const i=function(n,o,a,i){return new Promise((s,g)=>{const c=i===e.REVERT;const d=a.modifier;const p=c?n.getRevertData():n.getContent();Promise.resolve().then(d.getProperty.bind(d,o,"groupConditions")).then(e=>{const a=e?e.groupLevels:[];if(!a){g()}const i=a.filter(e=>e.name===p.name);const l=a.indexOf(i[0]);if(l>-1){a.splice(l,1)}else{return t.markAsNotApplicable("The specified change is already existing - change appliance ignored",true)}e={groupLevels:a};d.setProperty(o,"groupConditions",e);r(n,o,p,c);s()}).catch(e=>{g(e)})})};const s=function(t,n,o,a){return new Promise((i,s)=>{const g=a===e.REVERT;const c=o.modifier;const d=g?t.getRevertData():t.getContent();Promise.resolve().then(c.getProperty.bind(c,n,"groupConditions")).then(e=>{const o=e?e.groupLevels:[];const a=o.filter(e=>e.name===d.name);const s=o.indexOf(a[0]);o.splice(d.index,0,o.splice(s,1)[0]);e={groupLevels:o};c.setProperty(n,"groupConditions",e);r(t,n,d,g);i()}).catch(e=>{s(e)})})};const g=function(t,n){const r=t.getContent();const a=n.byId(t.getSelector().id);let i;const s=[r.name];const g={descriptionPayload:{}};if(t.getChangeType()==="addGroup"){g.descriptionPayload.category=o.ADD;i="table.GROUP_ITEM_ADD_CHANGE";s.push(r.index)}else if(t.getChangeType()==="removeGroup"){g.descriptionPayload.category=o.REMOVE;i="table.GROUP_ITEM_DEL_CHANGE"}else if(t.getChangeType()==="moveGroup"){g.descriptionPayload.category=o.MOVE;i="table.GROUP_ITEM_MOVE_CHANGE";s.push(t.getRevertData().index);s.push(r.index)}if(a){const e=a.getPropertyHelper()?.getProperty(r.name);if(e){s.splice(0,1,e.label)}}return e.getMdcResourceText(i,s).then(e=>{g.descriptionPayload.description=e;g.updateRequired=true;return g})};const c={};c.addGroup=e.createChangeHandler({apply:a,revert:i,getCondenserInfo:function(e,t){return{affectedControl:{id:e.getContent().name},affectedControlIdProperty:"name",targetContainer:e.getSelector(),targetAggregation:"groupLevels",customAggregation:t.modifier.bySelector(e.getSelector(),t.appComponent).getGroupConditions().groupLevels,classification:n.Create,setTargetIndex:function(e,t){e.getContent().index=t},getTargetIndex:function(e){return e.getContent().index}}},getChangeVisualizationInfo:g});c.removeGroup=e.createChangeHandler({apply:i,revert:a,getCondenserInfo:function(e,t){return{affectedControl:{id:e.getContent().name},affectedControlIdProperty:"name",targetContainer:e.getSelector(),targetAggregation:"groupLevels",customAggregation:t.modifier.bySelector(e.getSelector(),t.appComponent).getGroupConditions().groupLevels,classification:n.Destroy,sourceIndex:e.getRevertData().index,setIndexInRevertData:function(e,t){const n=e.getRevertData();n.index=t;e.setRevertData(n)}}},getChangeVisualizationInfo:g});c.moveGroup=e.createChangeHandler({apply:s,revert:s,getCondenserInfo:function(e,t){return{affectedControl:{id:e.getContent().name},affectedControlIdProperty:"name",targetContainer:e.getSelector(),targetAggregation:"groupLevels",classification:n.Move,sourceIndex:e.getRevertData().index,customAggregation:t.modifier.bySelector(e.getSelector(),t.appComponent).getGroupConditions().groupLevels,sourceContainer:e.getSelector(),sourceAggregation:"groupLevels",setTargetIndex:function(e,t){e.getContent().index=t},getTargetIndex:function(e){return e.getContent().index},setIndexInRevertData:function(e,t){const n=e.getRevertData();n.index=t;e.setRevertData(n)}}},getChangeVisualizationInfo:g});return c});
//# sourceMappingURL=GroupFlex.js.map