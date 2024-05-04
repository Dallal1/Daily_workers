/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper","./_Cache","./_ConcatHelper","./_GroupLock","./_Helper","./_MinMaxHelper","./_TreeState","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/odata/ODataUtils"],function(e,t,n,i,r,o,a,s,l,u){"use strict";function d(i,o,s,u,d){var c=function(){},h=null,f,p=this;t.call(this,i,o,u,true);this.oAggregation=s;this.sDownloadUrl=t.prototype.getDownloadUrl.call(this,"");this.aElements=[];this.aElements.$byPredicate={};this.aElements.$count=undefined;this.aElements.$created=0;this.oCountPromise=undefined;if(u.$count){if(s.hierarchyQualifier){this.oCountPromise=new l(function(e){f=e});this.oCountPromise.$resolve=f}else if(s.groupLevels.length){u.$$leaves=true;this.oCountPromise=new l(function(e){h=function(t){e(parseInt(t.UI5__leaves))}})}}this.oFirstLevel=this.createGroupLevelCache(null,d||!!h);this.addKeptElement=this.oFirstLevel.addKeptElement;this.removeKeptElement=this.oFirstLevel.removeKeptElement;this.requestSideEffects=this.oFirstLevel.requestSideEffects;this.oGrandTotalPromise=undefined;if(d){this.oGrandTotalPromise=new l(function(t){n.enhanceCache(p.oFirstLevel,s,[h,function(n){var i;if(s["grandTotal like 1.84"]){e.removeUI5grand__(n)}e.setAnnotations(n,true,true,0,e.getAllProperties(s));if(s.grandTotalAtBottomOnly===false){i=Object.assign({},n,{"@$ui5.node.isExpanded":undefined});r.setPrivateAnnotation(n,"copy",i);r.setPrivateAnnotation(i,"predicate","($isTotal=true)")}r.setPrivateAnnotation(n,"predicate","()");t(n)},c])})}else if(h){n.enhanceCache(p.oFirstLevel,s,[h,c])}this.oTreeState=new a(s.$NodeProperty);this.bUnifiedCache=false}d.prototype=Object.create(t.prototype);d.prototype.addTransientCollection=null;d.prototype._delete=function(e,n,i,o,a){let s=parseInt(i);if(isNaN(s)){throw new Error(`Unsupported kept-alive entity: ${this.sResourcePath}${i}`)}const u=this.aElements[s];const d=r.getPrivateAnnotation(u,"predicate");if(u["@$ui5.node.isExpanded"]){throw new Error(`Unsupported expanded node: ${this.sResourcePath}${d}`)}const c=r.getPrivateAnnotation(u,"parent");if(u["@$ui5.context.isTransient"]){return c._delete(e,n,r.getPrivateAnnotation(u,"transientPredicate"))}return l.resolve(this.oRequestor.request("DELETE",n,e,{"If-Match":u})).then(()=>{s=t.getElementIndex(this.aElements,d,s);const e=c.removeElement(r.getPrivateAnnotation(u,"rank",0),d);const n=r.getPrivateAnnotation(u,"descendants",0);for(let t=0;t<n;t+=1){c.removeElement(e)}const i=n+1;if(c===this.oFirstLevel){this.adjustDescendantCount(u,s,-i)}else if(!c.getValue("$count")){this.makeLeaf(this.aElements[s-1])}this.shiftRank(s,-i);this.removeElement(s,d);a(s,-1)})};d.prototype.addElements=function(t,n,i,o){var a=this.aElements,s=this.oAggregation.hierarchyQualifier,u=this.oAggregation.$NodeProperty,d=this;function c(t,c){var h=a[n+c],f,p=r.getPrivateAnnotation(t,"predicate"),g=r.getPrivateAnnotation(t,"transientPredicate");if(h){if(h===t){return}e.beforeOverwritePlaceholder(h,t,i,o===undefined?undefined:o+c,u)}else if(n+c>=a.length){throw new Error("Array index out of bounds: "+(n+c))}f=a.$byPredicate[p];if(f&&f!==t&&!(f instanceof l)){if(!s){throw new Error("Duplicate predicate: "+p)}if(!f["@odata.etag"]||t["@odata.etag"]===f["@odata.etag"]){r.updateNonExisting(t,f)}else if(d.hasPendingChangesForPath(p)){throw new Error("Modified on client and on server: "+d.sResourcePath+p)}}if(p){a.$byPredicate[p]=t}if(g){a.$byPredicate[g]=t}a[n+c]=t;if(i){r.setPrivateAnnotation(t,"parent",i)}if(g){o-=1}else{r.setPrivateAnnotation(t,"rank",o+c)}}if(n<0){throw new Error("Illegal offset: "+n)}if(Array.isArray(t)){t.forEach(c)}else{c(t,0)}};d.prototype.adjustDescendantCount=function(e,t,n){let i=e["@$ui5.node.level"];let o=false;for(let e=t-1;e>=0&&i>1;e-=1){const a=this.aElements[e];const s=a["@$ui5.node.level"];if(s===0){o=true}else if(s<i){if(!o||this.isAncestorOf(e,t)){const i=r.getPrivateAnnotation(a,"descendants",0)+n;r.setPrivateAnnotation(a,"descendants",i);if(i===0){this.makeLeaf(a)}t=e;o=false}i=s}}};d.prototype.beforeRequestSideEffects=function(e){if(!this.oAggregation.hierarchyQualifier){throw new Error("Missing recursive hierarchy")}delete e.$apply;if(!e.$select.includes(this.oAggregation.$NodeProperty)){e.$select.push(this.oAggregation.$NodeProperty)}};d.prototype.beforeUpdateSelected=function(t,n){e.checkNodeProperty(this.aElements.$byPredicate[t],n,this.oAggregation.$NodeProperty,true)};d.prototype.collapse=function(t){const n=this.getValue(t);const i=e.getCollapsedObject(n);r.updateAll(this.mChangeListeners,t,n,i);this.oTreeState.collapse(n);const o=this.aElements;const a=o.indexOf(n);let s=this.countDescendants(n,a);if(this.oAggregation.subtotalsAtBottomOnly!==undefined&&Object.keys(i).length>1){s+=1}for(let e=a+1;e<a+1+s;e+=1){delete o.$byPredicate[r.getPrivateAnnotation(o[e],"predicate")];delete o.$byPredicate[r.getPrivateAnnotation(o[e],"transientPredicate")]}const l=o.splice(a+1,s);l.$rank=r.getPrivateAnnotation(n,"rank");r.setPrivateAnnotation(n,"spliced",l);o.$count-=s;return s};d.prototype.countDescendants=function(e,t){var n;let i=e["@$ui5.node.level"];let o=r.getPrivateAnnotation(e,"descendants");if(o){i=this.oAggregation.expandTo}if(this.bUnifiedCache){i=Infinity}const a=this.aElements;for(n=t+1;n<a.length;n+=1){if(a[n]["@$ui5.node.level"]<=i){if(!o){break}o-=1;if(a[n]["@$ui5.node.isExpanded"]===false){o-=r.getPrivateAnnotation(a[n],"descendants",0)}}}return n-(t+1)};d.prototype.create=function(e,t,n,i,o,a,s,l){if(a){throw new Error("Unsupported bAtEndOfCreated")}const u=o["@$ui5.node.parent"];delete o["@$ui5.node.parent"];const d=u?.slice(u.indexOf("("));const c=this.aElements;const h=c.$byPredicate[d];if(h?.["@$ui5.node.isExpanded"]===false){throw new Error("Unsupported collapsed parent: "+u)}if(h&&h["@$ui5.node.isExpanded"]===undefined){r.updateAll(this.mChangeListeners,d,h,{"@$ui5.node.isExpanded":true})}const f=h?h["@$ui5.node.level"]+1:1;let p=f>this.oAggregation.expandTo?r.getPrivateAnnotation(h,"cache"):this.oFirstLevel;if(!p){p=this.createGroupLevelCache(h);p.setEmpty();r.setPrivateAnnotation(h,"cache",p)}const g=c.indexOf(h)+1;const v=p.create(e,t,n,i,o,a,s,l,()=>{if(p===this.oFirstLevel){this.adjustDescendantCount(o,g,-1)}c.$count-=1;delete c.$byPredicate[i];c.splice(g,1)});if(u){r.getPrivateAnnotation(o,"postBody")[this.oAggregation.$ParentNavigationProperty+"@odata.bind"]=r.makeRelativeUrl("/"+u,"/"+this.sResourcePath)}o["@$ui5.node.level"]=f;c.splice(g,0,null);this.addElements(o,g,p);c.$count+=1;if(p===this.oFirstLevel){this.adjustDescendantCount(o,g,+1)}return v.then(async()=>{c.$byPredicate[r.getPrivateAnnotation(o,"predicate")]=o;o["@$ui5.node.level"]=f;if(p===this.oFirstLevel&&this.oAggregation.expandTo>1){const[t]=await Promise.all([this.requestRank(o,e),this.requestNodeProperty(o,e)]);p.removeElement(0,i);r.deletePrivateAnnotation(o,"transientPredicate");p.restoreElement(t,o);delete this.aElements.$byPredicate[i];r.setPrivateAnnotation(o,"rank",t);this.shiftRank(g,+1)}else{await this.requestNodeProperty(o,e)}return o})};d.prototype.createGroupLevelCache=function(n,i){var o=this.oAggregation,a=n?n["@$ui5.node.level"]+1:1,s,l,u,c,h,f;if(o.hierarchyQualifier){h=Object.assign({},this.mQueryOptions)}else{s=e.getAllProperties(o);c=a>o.groupLevels.length;u=c?o.groupLevels.concat(Object.keys(o.group).sort()):o.groupLevels.slice(0,a);h=e.filterOrderby(this.mQueryOptions,o,a);f=!c&&Object.keys(o.aggregate).some(function(e){return o.aggregate[e].subtotals})}if(n){const e=r.getPrivateAnnotation(n,"filter")||r.getKeyFilter(n,o.$metaPath,this.getTypes());h.$$filterBeforeAggregate=e+(h.$$filterBeforeAggregate?" and ("+h.$$filterBeforeAggregate+")":"")}if(!i){delete h.$count;h=e.buildApply(o,h,a)}h.$count=true;l=t.create(this.oRequestor,this.sResourcePath,h,true);l.calculateKeyPredicate=o.hierarchyQualifier?d.calculateKeyPredicateRH.bind(null,n,o):d.calculateKeyPredicate.bind(null,n,u,s,c,f);return l};d.prototype.expand=function(t,n,o){var a,s=typeof n==="string"?this.getValue(n):n,u=r.getPrivateAnnotation(s,"spliced"),d=this;if(n!==s){r.updateAll(this.mChangeListeners,n,s,e.getOrCreateExpandedObject(this.oAggregation,s));this.oTreeState.expand(s)}if(u){r.deletePrivateAnnotation(s,"spliced");const e=this.aElements;const t=e.indexOf(s)+1;this.aElements=e.concat(u,e.splice(t));this.aElements.$byPredicate=e.$byPredicate;a=u.length;this.aElements.$count=e.$count+a;const n=s["@$ui5.node.level"]+1-u[0]["@$ui5.node.level"];const o=r.getPrivateAnnotation(s,"rank")-u.$rank;u.forEach(function(e){var t=r.getPrivateAnnotation(e,"predicate");if(e["@$ui5.node.level"]){e["@$ui5.node.level"]+=n}if(r.getPrivateAnnotation(e,"parent")===d.oFirstLevel){const t=r.getPrivateAnnotation(e,"rank");if(t!==undefined){r.setPrivateAnnotation(e,"rank",t+o)}}if(!r.hasPrivateAnnotation(e,"placeholder")){if(u.$stale){d.turnIntoPlaceholder(e,t)}else{d.aElements.$byPredicate[t]=e;const n=r.getPrivateAnnotation(e,"transientPredicate");if(n){d.aElements.$byPredicate[n]=e}if(r.hasPrivateAnnotation(e,"expanding")){r.deletePrivateAnnotation(e,"expanding");a+=d.expand(i.$cached,e).getResult()}}}});return l.resolve(a)}if(this.bUnifiedCache){return l.resolve(-1)}let c=r.getPrivateAnnotation(s,"cache");if(!c){c=this.createGroupLevelCache(s);r.setPrivateAnnotation(s,"cache",c)}return c.read(0,this.iReadLength,0,t,o).then(function(t){var i=d.aElements.indexOf(s)+1,o=s["@$ui5.node.level"],l=e.getCollapsedObject(s),u=d.oAggregation.subtotalsAtBottomOnly!==undefined&&Object.keys(l).length>1,h;if(!s["@$ui5.node.isExpanded"]){r.deletePrivateAnnotation(s,"spliced");return 0}if(!i){r.setPrivateAnnotation(s,"expanding",true);return 0}a=t.value.$count;if(r.hasPrivateAnnotation(s,"groupLevelCount")&&r.getPrivateAnnotation(s,"groupLevelCount")!==a){throw new Error("Unexpected structural change: groupLevelCount")}r.setPrivateAnnotation(s,"groupLevelCount",a);r.updateAll(d.mChangeListeners,n,s,{"@$ui5.node.groupLevelCount":a});if(u){a+=1}if(i===d.aElements.length){d.aElements.length+=a}else{for(h=d.aElements.length-1;h>=i;h-=1){d.aElements[h+a]=d.aElements[h];delete d.aElements[h]}}d.addElements(t.value,i,c,0);for(h=i+t.value.length;h<i+t.value.$count;h+=1){d.aElements[h]=e.createPlaceholder(o+1,h-i,c)}if(u){l=Object.assign({},l);e.setAnnotations(l,undefined,true,o,e.getAllProperties(d.oAggregation));r.setPrivateAnnotation(l,"predicate",r.getPrivateAnnotation(s,"predicate").slice(0,-1)+",$isTotal=true)");d.addElements(l,i+a-1)}d.aElements.$count+=a;return a},function(t){r.updateAll(d.mChangeListeners,n,s,e.getCollapsedObject(s));d.oTreeState.collapse(s);throw t})};d.prototype.fetchParentIndex=function(e,t){const n=r.getKeyFilter(this.aElements[e],this.oAggregation.$metaPath,this.getTypes());const i=Object.assign({},this.mQueryOptions);i.$apply="ancestors($root"+this.oAggregation.$path+","+this.oAggregation.hierarchyQualifier+","+this.oAggregation.$NodeProperty+",filter("+n+"),1)";const o=this.sResourcePath+this.oRequestor.buildQueryString(null,i);return this.oRequestor.request("GET",o,t).then(async e=>{const n=e.value[0];r.setPrivateAnnotation(n,"parent",this.oFirstLevel);const i=[this.oAggregation.$DistanceFromRoot,this.oAggregation.$DrillState,this.oAggregation.$LimitedDescendantCount];const[o]=await Promise.all([this.requestRank(n,t),this.requestProperties(n,i,t,true),this.requestNodeProperty(n,t)]);this.oFirstLevel.calculateKeyPredicate(n,this.getTypes(),r.getMetaPath(r.buildPath(this.sMetaPath,"")));const a=this.getArrayIndex(o);this.addElements(n,a,this.oFirstLevel,o);this.oFirstLevel.removeElement(o);this.oFirstLevel.restoreElement(o,n);return a})};d.prototype.fetchValue=function(e,t,n,i){var r=this;if(t==="$count"){if(this.oCountPromise){return this.oCountPromise}if(this.oAggregation.hierarchyQualifier||this.oAggregation.groupLevels.length){s.error("Failed to drill-down into $count, invalid segment: $count",this.toString(),"sap.ui.model.odata.v4.lib._Cache");return l.resolve()}return this.oFirstLevel.fetchValue(e,t,n,i)}return l.resolve(this.aElements.$byPredicate[t.split("/")[0]]).then(function(){r.registerChangeListener(t,i);return r.drillDown(r.aElements,t,e)})};d.prototype.getAllElements=function(e){var t;if(e){throw new Error("Unsupported path: "+e)}t=this.aElements.map(function(e){return r.hasPrivateAnnotation(e,"placeholder")?undefined:e});t.$count=this.aElements.$count;return t};d.prototype.getArrayIndex=function(e){let t=e;for(let n=0;n<t;n+=1){const i=this.aElements[n];if(i["@$ui5.node.isExpanded"]===false){t-=r.getPrivateAnnotation(i,"descendants",0)}if(r.getPrivateAnnotation(i,"parent")!==this.oFirstLevel||r.getPrivateAnnotation(i,"rank")>e){t+=1}}return t};d.prototype.getCreatedElements=function(e){return[]};d.prototype.getDownloadQueryOptions=function(t){if(this.oAggregation.hierarchyQualifier){if("$count"in t){t=Object.assign({},t);delete t.$count}}else{t=e.filterOrderby(t,this.oAggregation)}return e.buildApply(this.oAggregation,t,0,true)};d.prototype.getDownloadUrl=function(e,t){return this.sDownloadUrl};d.prototype.getParentIndex=function(e){const t=this.aElements[e]["@$ui5.node.level"];if(t<=1){return-1}let n=false;for(let i=e;i>=0;i-=1){const r=this.aElements[i];const o=r["@$ui5.node.level"];if(o===0){n=true}else if(o<t){if(o===t-1&&(!n||this.isAncestorOf(i,e))){return i}break}}};d.prototype.getValue=function(e){var t;t=this.fetchValue(i.$cached,e);if(t.isFulfilled()){return t.getResult()}t.caught()};d.prototype.isAncestorOf=function(e,t){if(t===e){return true}if(t<e||!this.aElements[e]["@$ui5.node.isExpanded"]||this.aElements[e]["@$ui5.node.level"]>=this.aElements[t]["@$ui5.node.level"]){return false}return t<=e+this.countDescendants(this.aElements[e],e)};d.prototype.isDeletingInOtherGroup=function(e){return false};d.prototype.keepOnlyGivenElements=function(t){var n={},i=this;t.forEach(function(e){n[e]=true});return this.aElements.filter(function(t){var o=r.getPrivateAnnotation(t,"predicate");if(!o){return}if(n[o]){e.markSplicedStale(t);return true}i.turnIntoPlaceholder(t,o)})};d.prototype.makeLeaf=function(e){r.updateAll(this.mChangeListeners,r.getPrivateAnnotation(e,"predicate"),e,{"@$ui5.node.isExpanded":undefined});delete e["@$ui5.node.isExpanded"]};d.prototype.move=function(e,t,n=null){const o="($uid="+r.uid()+")";const a=t.slice(t.indexOf("("));const s=this.aElements.$byPredicate[a];const u=n?.slice(n.indexOf("("));const d=this.aElements.$byPredicate[u];let c;let h=d?r.getPrivateAnnotation(d,"cache"):this.oFirstLevel;if(this.oAggregation.expandTo>1){c=this.requestRank(s,e)}else if(!h&&d["@$ui5.node.isExpanded"]===false){h=this.createGroupLevelCache(d);h.restoreElement(0,s,undefined,o);c=h.read(0,this.iReadLength,0,e.getUnlockedCopy())}return l.all([this.oRequestor.request("PATCH",t,e,{"If-Match":s,Prefer:"return=minimal"},{[this.oAggregation.$ParentNavigationProperty+"@odata.bind"]:n},null,function e(){}),c]).then(([e,t])=>{const n=()=>{r.updateExisting(this.mChangeListeners,a,s,{"@odata.etag":e["@odata.etag"],"@$ui5.node.level":d?d["@$ui5.node.level"]+1:1})};const l=this.aElements.indexOf(s);let f=1;if(this.oAggregation.expandTo>1){const e=r.getPrivateAnnotation(s,"descendants",0)+1;this.adjustDescendantCount(s,l,-e);this.shiftRank(l,-e);this.aElements.splice(l,1);this.oFirstLevel.move(r.getPrivateAnnotation(s,"rank"),t,e);n();r.setPrivateAnnotation(s,"rank",t);switch(d?d["@$ui5.node.isExpanded"]:true){case false:f=this.expand(i.$cached,u).unwrap()+1;case true:break;default:r.updateAll(this.mChangeListeners,u,d,{"@$ui5.node.isExpanded":true})}const o=this.aElements.indexOf(d)+1;this.aElements.splice(o,0,s);this.shiftRank(o,+e);this.adjustDescendantCount(s,o,+e);return f}const p=r.getPrivateAnnotation(s,"parent");p.removeElement(r.getPrivateAnnotation(s,"rank",0),a);if(p.getValue("$count")===0){const e=this.aElements[l-1];this.makeLeaf(e);r.deletePrivateAnnotation(e,"cache");p.setActive(false)}if(!r.hasPrivateAnnotation(s,"transientPredicate")){r.setPrivateAnnotation(s,"transientPredicate",o);this.aElements.$byPredicate[o]=s;r.updateAll(this.mChangeListeners,a,s,{"@$ui5.context.isTransient":false});this.shiftRank(l,-1)}r.deletePrivateAnnotation(s,"rank");this.aElements.splice(l,1);n();if(c){r.setPrivateAnnotation(s,"parent",h);r.setPrivateAnnotation(d,"cache",h);this.aElements.$count-=1;f=this.expand(i.$cached,u).unwrap()}else{if(!h){h=this.createGroupLevelCache(d);h.setEmpty();r.setPrivateAnnotation(d,"cache",h);r.updateAll(this.mChangeListeners,u,d,{"@$ui5.node.isExpanded":true})}r.setPrivateAnnotation(s,"parent",h);h.restoreElement(0,s);const e=this.aElements.indexOf(d)+1;const t=d&&r.getPrivateAnnotation(d,"spliced");if(t){s["@$ui5.node.level"]=t[0]["@$ui5.node.level"];t.unshift(s);this.aElements.$count-=1;f=this.expand(i.$cached,u).unwrap()}else{this.aElements.splice(e,0,s)}}return f})};d.prototype.read=function(e,t,n,i,o){var a,s,d=e,c=t,h,f,p=this.oGrandTotalPromise&&this.oAggregation.grandTotalAtBottomOnly!==true,g=[],v,P=this;function m(e,t){g.push(P.readGap(h,e,t,i.getUnlockedCopy(),o))}if(p&&!e&&t===1){if(n!==0){throw new Error("Unsupported prefetch length: "+n)}i.unlock();return this.oGrandTotalPromise.then(function(e){return{value:[e]}})}if(this.aElements.$count===undefined){this.iReadLength=t+n;if(p){if(d){d-=1}else{c-=1}}g.push(this.readCount(i),this.readFirst(d,c,n,i,o))}else{const o=u._getReadRange(this.aElements,e,t,n,e=>{switch(r.getPrivateAnnotation(e,"placeholder")){case true:return r.getPrivateAnnotation(e,"parent").isMissing(r.getPrivateAnnotation(e,"rank"));case 1:return!(this.aElements.$byPredicate[r.getPrivateAnnotation(e,"predicate")]instanceof l);default:return false}});const d=Math.min(o.start+o.length,this.aElements.length);for(v=o.start;v<d;v+=1){s=this.aElements[v];a=r.hasPrivateAnnotation(s,"placeholder")?r.getPrivateAnnotation(s,"parent"):undefined;if(a!==h){if(f!==undefined){m(f,v);h=f=undefined}if(a){f=v;h=a}}else if(f!==undefined&&r.getPrivateAnnotation(s,"rank")!==r.getPrivateAnnotation(this.aElements[v-1],"rank")+1){m(f,v);f=v}}if(f!==undefined){m(f,v)}i.unlock()}return l.all(g).then(function(){var n=P.aElements.slice(e,e+t).map(function(e){return r.hasPrivateAnnotation(e,"placeholder")?undefined:e});n.$count=P.aElements.$count;return{value:n}})};d.prototype.readCount=function(e){var t,n=this.oCountPromise&&this.oCountPromise.$resolve,i;if(n){delete this.oCountPromise.$resolve;t=Object.assign({},this.mQueryOptions);delete t.$apply;delete t.$count;delete t.$expand;delete t.$orderby;if(this.oAggregation.search){t.$search=this.oAggregation.search}delete t.$select;i=this.sResourcePath+"/$count"+this.oRequestor.buildQueryString(null,t);return this.oRequestor.request("GET",i,e.getUnlockedCopy()).then(n)}};d.prototype.readFirst=function(t,n,i,o,a){var s=this;return this.oFirstLevel.read(t,n+i,0,o,a).then(function(n){var i,o,a=0,l;s.aElements.length=s.aElements.$count=n.value.$count;if(s.oGrandTotalPromise){s.aElements.$count+=1;s.aElements.length+=1;i=s.oGrandTotalPromise.getResult();switch(s.oAggregation.grandTotalAtBottomOnly){case false:a=1;s.aElements.$count+=1;s.aElements.length+=1;s.addElements(i,0);o=r.getPrivateAnnotation(i,"copy");s.addElements(o,s.aElements.length-1);break;case true:s.addElements(i,s.aElements.length-1);break;default:a=1;s.addElements(i,0)}}s.addElements(n.value,t+a,s.oFirstLevel,t);for(l=0;l<s.aElements.$count;l+=1){if(!s.aElements[l]){s.aElements[l]=e.createPlaceholder(s.oAggregation.expandTo>1||s.bUnifiedCache?0:1,l-a,s.oFirstLevel)}}})};d.prototype.readGap=function(e,t,n,i,o){const a=this.aElements[t];const s=r.getPrivateAnnotation(a,"rank");if(s===undefined){if(n-t!==1){throw new Error("Not just a single created persisted")}const s=r.getPrivateAnnotation(a,"predicate");const l=e.refreshSingle(i,"",-1,s,true,false,o).then(n=>{r.inheritPathValue(this.oAggregation.$NodeProperty.split("/"),a,n,true);r.copyPrivateAnnotation(a,"context",n);this.addElements(n,t,e)});this.aElements.$byPredicate[s]=l;return l}const l=e.getQueryOptions();if(l.$count){delete l.$count;e.setQueryOptions(l,true)}const u=e.read(s,n-t,0,i,o,true).then(n=>{var i=false,r;if(a!==this.aElements[t]&&n.value[0]!==this.aElements[t]){i=true;t=this.aElements.indexOf(a);if(t<0){t=this.aElements.indexOf(n.value[0]);if(t<0){r=new Error("Collapse before read has finished");r.canceled=true;throw r}}}this.addElements(n.value,t,e,s);if(i){r=new Error("Collapse or expand before read has finished");r.canceled=true;throw r}});if(u.isPending()){for(let e=t;e<n;e+=1){const t=r.getPrivateAnnotation(this.aElements[e],"predicate");if(t){this.aElements.$byPredicate[t]=u}}}return u};d.prototype.refreshKeptElements=function(e,t){return this.oFirstLevel.refreshKeptElements.call(this,e,t,true)};d.prototype.requestNodeProperty=async function(e,t){if(r.drillDown(e,this.oAggregation.$NodeProperty)!==undefined){return}await this.requestProperties(e,[this.oAggregation.$NodeProperty],t,true)};d.prototype.requestProperties=async function(e,t,n,i){const o=this.oAggregation.$metaPath;const a={$apply:r.getPrivateAnnotation(e,"parent").getQueryOptions().$apply,$filter:r.getKeyFilter(e,o,this.getTypes())};const s=this.sResourcePath+this.oRequestor.buildQueryString(o,a,false,true);const l=await this.oRequestor.request("GET",s,n.getUnlockedCopy(),undefined,undefined,undefined,undefined,o,undefined,false,{$select:t},this);const u=l.value[0];if(i){t.forEach(t=>{r.inheritPathValue(t.split("/"),u,e,true)})}else{return u}};d.prototype.requestRank=async function(e,t){const n=await this.requestProperties(e,[this.oAggregation.$LimitedRank],t);return parseInt(r.drillDown(n,this.oAggregation.$LimitedRank))};d.prototype.reset=function(e,n,i,o,a){var s,u=this;if(a){throw new Error("Unsupported grouping via sorter")}e.forEach(function(e){var t=u.aElements.$byPredicate[e];if(r.hasPrivateAnnotation(t,"placeholder")){throw new Error("Unexpected placeholder")}delete t["@$ui5.node.isExpanded"];delete t["@$ui5.node.level"];delete t["@$ui5._"];r.setPrivateAnnotation(t,"predicate",e)});this.oAggregation=o;this.oFirstLevel.reset.call(this,e,n,i);this.sDownloadUrl=t.prototype.getDownloadUrl.call(this,"");if(n){this.oBackup.oCountPromise=this.oCountPromise;this.oBackup.oFirstLevel=this.oFirstLevel;this.oBackup.bUnifiedCache=this.bUnifiedCache;this.bUnifiedCache=true}else{this.oTreeState.reset()}this.oAggregation.$ExpandLevels=this.oTreeState.getExpandLevels();this.oCountPromise=undefined;if(i.$count){this.oCountPromise=new l(function(e){s=e});this.oCountPromise.$resolve=s}this.oFirstLevel=this.createGroupLevelCache()};d.prototype.resetChangesForPath=function(e){r.getPrivateAnnotation(this.getValue(e),"parent").resetChangesForPath(e)};d.prototype.restore=function(e){if(e){this.oCountPromise=this.oBackup.oCountPromise;this.oFirstLevel=this.oBackup.oFirstLevel;this.bUnifiedCache=this.oBackup.bUnifiedCache}this.oFirstLevel.restore.call(this,e)};d.prototype.shiftRank=function(e,t){const n=this.aElements[e];const i=r.getPrivateAnnotation(n,"rank");if(i===undefined){return}const o=r.getPrivateAnnotation(n,"parent");if(o===this.oFirstLevel){e=-1}for(let a=e+1;a<this.aElements.length;a+=1){const e=this.aElements[a];if(e===n){continue}if(r.getPrivateAnnotation(e,"parent")===o){const n=r.getPrivateAnnotation(e,"rank");if(n>=i){r.setPrivateAnnotation(e,"rank",n+t)}}if(o!==this.oFirstLevel&&e["@$ui5.node.level"]<n["@$ui5.node.level"]){break}}};d.prototype.toString=function(){return this.sDownloadUrl};d.prototype.turnIntoPlaceholder=function(t,n){if(r.hasPrivateAnnotation(t,"placeholder")){return}r.setPrivateAnnotation(t,"placeholder",1);e.markSplicedStale(t);delete this.aElements.$byPredicate[n];const i=r.getPrivateAnnotation(t,"rank");if(i!==undefined){r.getPrivateAnnotation(t,"parent").drop(i,n,true)}};d.calculateKeyPredicate=function(t,n,i,o,a,s,l,u){var d;if(!(u in l)){return undefined}if(t){i.forEach(function(e){if(Array.isArray(e)){r.inheritPathValue(e,t,s)}else if(!(e in s)){s[e]=t[e]}})}d=o&&r.getKeyPredicate(s,u,l)||r.getKeyPredicate(s,u,l,n,true);r.setPrivateAnnotation(s,"predicate",d);if(!o){r.setPrivateAnnotation(s,"filter",r.getKeyFilter(s,u,l,n))}e.setAnnotations(s,o?undefined:false,a,t?t["@$ui5.node.level"]+1:1,t?null:i);return d};d.calculateKeyPredicateRH=function(t,n,i,o,a){var s,l,u=1,d,c;if(!(a in o)){return undefined}c=r.getKeyPredicate(i,a,o);r.setPrivateAnnotation(i,"predicate",c);if(a!==n.$metaPath){return c}switch(r.drillDown(i,n.$DrillState)){case"expanded":l=true;break;case"collapsed":l=false;break;default:}r.deleteProperty(i,n.$DrillState);if(t){u=t["@$ui5.node.level"]+1}else{s=r.drillDown(i,n.$DistanceFromRoot);if(s){r.deleteProperty(i,n.$DistanceFromRoot);u=parseInt(s)+1}}e.setAnnotations(i,l,undefined,u);if(n.$LimitedDescendantCount){d=r.drillDown(i,n.$LimitedDescendantCount);if(d){r.deleteProperty(i,n.$LimitedDescendantCount);if(d!=="0"){r.setPrivateAnnotation(i,"descendants",parseInt(d))}}}return c};d.create=function(n,i,r,a,s,l,u,c){var h,f;function p(){if("$expand"in a){throw new Error("Unsupported system query option: $expand")}if("$select"in a){throw new Error("Unsupported system query option: $select")}}if(s){h=e.hasGrandTotal(s.aggregate);f=s.groupLevels&&!!s.groupLevels.length;if(e.hasMinOrMax(s.aggregate)){if(h){throw new Error("Unsupported grand totals together with min/max")}if(f){throw new Error("Unsupported group levels together with min/max")}if(s.hierarchyQualifier){throw new Error("Unsupported recursive hierarchy together with min/max")}if(u){throw new Error("Unsupported $$sharedRequest together with min/max")}p();return o.createCache(n,i,s,a)}if(a.$filter&&(h&&!s["grandTotal like 1.84"]||f)){throw new Error("Unsupported system query option: $filter")}if(h||f||s.hierarchyQualifier){if(a.$search){throw new Error("Unsupported system query option: $search")}if(!s.hierarchyQualifier){p()}if(c){throw new Error("Unsupported grouping via sorter")}if(u){throw new Error("Unsupported $$sharedRequest")}return new d(n,i,s,a,h)}}if(a.$$filterBeforeAggregate){a.$apply="filter("+a.$$filterBeforeAggregate+")/"+a.$apply;delete a.$$filterBeforeAggregate}return t.create(n,i,a,l,r,u)};return d},false);
//# sourceMappingURL=_AggregationCache.js.map