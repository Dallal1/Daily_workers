/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/base/util/isPlainObject","sap/base/util/ObjectPath","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Element","sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/apply/_internal/flexObjects/UIChange","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/write/_internal/condenser/classifications/LastOneWins","sap/ui/fl/write/_internal/condenser/classifications/Reverse","sap/ui/fl/write/_internal/condenser/classifications/Update","sap/ui/fl/write/_internal/condenser/UIReconstruction","sap/ui/fl/write/_internal/condenser/Utils","sap/ui/fl/Utils","sap/ui/performance/Measurement","sap/base/util/restricted/_isEqual"],function(e,n,t,r,a,i,o,s,c,f,u,d,l,p,g,h,C,v){"use strict";var E={};var S="unclassified";var y={lastOneWins:u,reverse:d,update:l};var _=["affectedControl","sourceContainer","targetContainer","updateControl"];function I(e,n){var t=e[o.Move];return n.classification===o.Create&&t&&t[t.length-1].targetContainer===n.targetContainer}function N(e,n){return n.classification===o.Move&&e[o.Destroy]}function m(e,n){return n.classification===o.Create&&e[o.Destroy]}function T(e,n,t,r){if(!N(e,t)&&!m(e,t)){var a=t.classification;if(!e[a]){t.change=r;r.condenserState="select";e[a]=[t]}else{r.condenserState="delete"}e[a][0].updateChange=r}else{r.condenserState="delete"}if(I(e,t)||m(e,t)){if(e[o.Move]){e[o.Move].forEach(function(e){e.change.condenserState="delete"});delete e[o.Move]}if(e[o.Destroy]){e[o.Destroy].forEach(function(e){e.change.condenserState="delete"});delete e[o.Destroy]}}return p.addChange(n,t)}function D(e,n,t){e[n.classification]||={};var r=e[n.classification];y[n.classification].addToChangesMap(r,n,t);return Promise.resolve()}function O(e,n,t,r,a){e[r.type]||={};var i=e[r.type];if(r.type===g.NOT_INDEX_RELEVANT){return D(i,r,a)}t.push(a);i[r.targetAggregation]||={};return T(i[r.targetAggregation],n,r,a)}function A(e,n,t){e[n]||=[];e[n].push(t);t.condenserState="select"}function R(e,n){var t=a.getControlIdBySelector(n.getSelector(),e);var r=i.getElementById(t);if(r){var o={modifier:a,appComponent:e,view:h.getViewForControl(r)};var c=s.getControlIfTemplateAffected(n,r,o);return Promise.resolve(s.getChangeHandler(n,c,o)).then(function(e){if(e&&typeof e.getCondenserInfo==="function"){return e.getCondenserInfo(n,o)}return undefined}).then(function(e){if(e&&c.bTemplateAffected){L(e,n)}return e}).catch(function(){return undefined})}return Promise.resolve()}function L(e,n){var t=n.getOriginalSelector();var r=n.getSelector();_.forEach(function(n){if(e[n]&&e[n]===r){e[n]=t}})}function x(e,n,r,i){var s=n!==undefined?n.affectedControl:a.getControlIdBySelector(r.getSelector(),i);e[s]||={};if(n&&n.updateControl){var c=n.updateControl;var f=[g.NOT_INDEX_RELEVANT,o.Update,n.uniqueKey];var u=t.get(f,e[c]);if(u){t.set(f,u,e[s]);delete e[c][g.NOT_INDEX_RELEVANT][o.Update][n.uniqueKey]}}return e[s]}function b(e,n,t,r,a){return a.reduce(function(a,i){return a.then(M.bind(this,e,n,t,r,i))}.bind(this),Promise.resolve())}function M(e,n,t,r,a){return R(e,a).then(function(i){w(i,e);var o=x(n,i,a,e);if(i!==undefined){U(i);return O(o,t,r,i,a).then(function(){if(i.update){V(o,i,a)}})}A(o,S,a);n[S]=true;return undefined})}function U(e){if(y[e.classification]){e.type=g.NOT_INDEX_RELEVANT}else{e.type=g.INDEX_RELEVANT}}function w(e,n){_.forEach(function(t){if(e&&e[t]){e[t]=a.getControlIdBySelector(e[t],n)}})}function V(e,n,r){var a=[g.NOT_INDEX_RELEVANT,o.Update,n.uniqueKey];var i=t.get(a,e);if(i){i.change.condenserState="delete";if(r.condenserState==="delete"){return}if(r.isPersisted()){r.condenserState="update"}n.update(r,i.updateContent);r.setState(f.LifecycleState.DIRTY);delete e[g.NOT_INDEX_RELEVANT][o.Update][n.uniqueKey]}}function P(t,r){e(t,function(e,a){if(y[e]&&y[e].getChangesFromMap){y[e].getChangesFromMap(t,e).forEach(function(e){r.push(e)})}else if(n(a)){return P(a,r)}else if(Array.isArray(a)){a.forEach(function(e){if(e instanceof c){r.push(e)}else{r.push(e.change)}})}});return r}function X(e){return P(e,[])}function q(t,r){e(t,function(e,t){if(n(t)){q(t,r)}else if(Array.isArray(t)){t.forEach(function(e){if(!(e instanceof c)){r.push(e)}})}});return r}function j(e,n){n.sort(function(n,t){return e.indexOf(n)-e.indexOf(t)})}function B(e,n){n.sort(function(n,t){return e.indexOf(n.change)-e.indexOf(t.change)})}function K(e,n){var t=e.map(function(e){return e.getId()});n.forEach(function(n){if(t.indexOf(n.getId())===-1){e.push(n)}})}function F(e,n,t){e.forEach(function(e){var r=e.updateChange;if(r&&!v(r.getContent(),e.change.getContent())&&r.getState()!==f.LifecycleState.NEW){var a=e.change;if(r.getId()!==a.getId()){var i=a.getContent();r.setContent(i);r.setRevertData(a.getRevertData());a.condenserState="delete";n=n.map(function(e){if(e.getId()===a.getId()){return r}return e});t.forEach(function(e,n){t[n]=e.map(function(e){if(e.getId()===a.getId()){return r}return e})})}else{r.setState(f.LifecycleState.DIRTY)}r.condenserState="update"}});return n}E.condense=function(e,n){C.start("Condenser_overall","Condenser overall - CondenserClass",["sap.ui.fl","Condenser"]);var t={};var a={};var i=[];var o=[];var s=[];n.slice(0).reverse().forEach(function(e){if(e instanceof c){if(e.getState()===f.LifecycleState.DELETED){e.condenserState="delete"}else if(e.isSuccessfullyApplied()){s.push(e)}else{o.push(e)}}else{o.push(e)}});C.start("Condenser_defineMaps","defining of maps - CondenserClass",["sap.ui.fl","Condenser"]);return b(e,t,a,i,s).then(function(){C.end("Condenser_defineMaps");var e=t[S];if(!e){p.compareAndUpdate(t,a)}var s=X(t);if(e){i.forEach(function(e){if(e.condenserState!=="update"){e.condenserState="select"}});K(s,i)}s=s.concat(o);j(n,s);if(!e){C.start("Condenser_handleIndexRelatedChanges","handle index related changes - CondenserClass",["sap.ui.fl","Condenser"]);var c=true;var f=q(t,[]);B(n,f);var u;try{C.start("Condenser_sort","sort index related changes - CondenserClass",["sap.ui.fl","Condenser"]);u=p.sortIndexRelatedChanges(a,f)}catch(e){r.error(`Error during Condensing: ${e.message}`,"No Condensing performed for index-relevant changes.");c=false}C.end("Condenser_sort");if(c){s=s.filter(function(e){return e.condenserState!=="delete"});f=f.filter(function(e){return e.change.condenserState!=="delete"});s=F(f,s,u);j(n,s);u.forEach(function(e){p.swapChanges(e,s)})}else{i.forEach(function(e){e.condenserState="select"});K(s,i);j(n,s)}C.end("Condenser_handleIndexRelatedChanges")}C.end("Condenser_overall");return s})};return E});
//# sourceMappingURL=Condenser.js.map