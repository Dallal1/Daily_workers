/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_ODataMetaModelUtils","sap/base/Log","sap/base/util/extend","sap/base/util/isEmptyObject","sap/base/util/UriParameters","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/model/_Helper","sap/ui/model/BindingMode","sap/ui/model/ClientContextBinding","sap/ui/model/Context","sap/ui/model/FilterProcessor","sap/ui/model/MetaModel","sap/ui/model/json/JSONListBinding","sap/ui/model/json/JSONModel","sap/ui/model/json/JSONPropertyBinding","sap/ui/model/json/JSONTreeBinding","sap/ui/performance/Measurement"],function(e,t,n,o,i,r,a,s,d,l,u,c,p,h,f,y,g,m,C){"use strict";var O=new Map,M="sap.ui.model.odata.ODataMetaModel",v=[M],S=M+"/load",b=/^((\/dataServices\/schema\/\d+)\/(?:complexType|entityType)\/\d+)\/property\/\d+$/;var D=f.extend("sap.ui.model.odata.ODataMetaListBinding"),P=a.extend("sap.ui.model.odata._resolver",{metadata:{properties:{any:"any"}}});D.prototype.applyFilter=function(){var e=this,t=p.combineFilters(this.aFilters,this.aApplicationFilters);this.aIndices=p.apply(this.aIndices,t,function(t,n){return n==="@sapui.name"?t:e.oModel.getProperty(n,e.oList[t])},this.mNormalizeCache);this.iLength=this.aIndices.length};var w=h.extend("sap.ui.model.odata.ODataMetaModel",{constructor:function(t,n,o){var i=o.annotationsLoaded(),r=this;function a(){var i;if(r.bDestroyed){throw new Error("Meta model already destroyed")}C.average(S,"",v);i=JSON.parse(JSON.stringify(t.getServiceMetadata()));r.oModel=new y(i);r.oModel.setDefaultBindingMode(r.sDefaultBindingMode);e.merge(n?n.getData():{},i,r,o.bIgnoreAnnotationsFromMetadata);C.end(S)}h.apply(this);this.oModel=null;this.mContext2Promise={};this.sDefaultBindingMode=l.OneTime;this.oLoadedPromise=i?i.then(a):new Promise(function(e){a();e()});this.oLoadedPromiseSync=s.resolve(this.oLoadedPromise);this.oMetadata=t;this.oDataModel=o;this.mQueryCache={};this.mQName2PendingRequest={};this.oResolver=undefined;this.mSupportedBindingModes={OneTime:true}}});w.prototype._getObject=function(e,n){var o=n,i,a,s,d,l,u,p,h=e||"",f;if(!n||n instanceof c){h=this.resolve(e||"",n);if(!h){t.error("Invalid relative path w/o context",e,M);return null}}if(h.charAt(0)==="/"){o=this.oModel._getObject("/");h=h.slice(1)}p="/";l=o;while(h){u=undefined;i=undefined;if(h.charAt(0)==="["){try{f=r.parseExpression(h,1);d=f.at;if(h.length===d+1||h.charAt(d+1)==="/"){i=f.result;u=h.slice(0,d+1);h=h.slice(d+2)}}catch(e){if(!(e instanceof SyntaxError)){throw e}}}if(u===undefined){d=h.indexOf("/");if(d<0){u=h;h=""}else{u=h.slice(0,d);h=h.slice(d+1)}}if(!l){if(t.isLoggable(t.Level.WARNING,M)){t.warning("Invalid part: "+u,"path: "+e+", context: "+(n instanceof c?n.getPath():n),M)}break}if(i){if(o===n){t.error("A query is not allowed when an object context has been given",e,M);return null}if(!Array.isArray(l)){t.error("Invalid query: '"+p+"' does not point to an array",e,M);return null}a=p+u;u=this.mQueryCache[a];if(u===undefined){this.oResolver=this.oResolver||new P({models:this.oModel});for(s=0;s<l.length;s+=1){this.oResolver.bindObject(p+s);this.oResolver.bindProperty("any",i);try{if(this.oResolver.getAny()){this.mQueryCache[a]=u=s;break}}finally{this.oResolver.unbindProperty("any");this.oResolver.unbindObject()}}}}l=l[u];p=p+u+"/"}return l};w.prototype._getOrCreateSharedModelCache=function(){var e=this.oDataModel;if(!this.oSharedModelCache){this.oSharedModelCache={bFirstCodeListRequested:false,oModel:new e.constructor(e.getCodeListModelParameters())}}return this.oSharedModelCache};w.prototype._mergeMetadata=function(t){var n=this.getODataEntityContainer(),o=e.getChildAnnotations(t.annotations,n.namespace+"."+n.name,true),i=n.entitySet.length,r=this.oModel.getObject("/dataServices/schema"),a=this;t.entitySets.forEach(function(o){var i,s,d=o.entityType,l=d.slice(0,d.lastIndexOf("."));if(!a.getODataEntitySet(o.name)){n.entitySet.push(JSON.parse(JSON.stringify(o)));if(!a.getODataEntityType(d)){i=a.oMetadata._getEntityTypeByName(d);s=e.getSchema(r,l);s.entityType.push(JSON.parse(JSON.stringify(i)));e.visitParents(s,t.annotations,"entityType",e.visitEntityType,s.entityType.length-1)}}});e.visitChildren(n.entitySet,o,"EntitySet",r,null,i);e.addUnitAnnotations(r,this)};w.prototype._sendBundledRequest=function(){var e=this.mQName2PendingRequest,t=Object.keys(e),n=this;if(!t.length){return}this.mQName2PendingRequest={};t=t.sort();t.forEach(function(e,n){t[n]=encodeURIComponent(e)});this.oDataModel.addAnnotationUrl("$metadata?sap-value-list="+t.join(",")).then(function(t){var o;n._mergeMetadata(t);for(o in e){try{e[o].resolve(t)}catch(t){e[o].reject(t)}}},function(t){var n;for(n in e){e[n].reject(t)}})};w.prototype.bindContext=function(e,t,n){return new u(this,e,t,n)};w.prototype.bindList=function(e,t,n,o,i){return new D(this,e,t,n,o,i)};w.prototype.bindProperty=function(e,t,n){return new g(this,e,t,n)};w.prototype.bindTree=function(e,t,n,o){return new m(this,e,t,n,o)};w.prototype.destroy=function(){h.prototype.destroy.apply(this,arguments);if(this.oSharedModelCache){this.oSharedModelCache.oModel.destroy();delete this.oSharedModelCache}return this.oModel&&this.oModel.destroy.apply(this.oModel,arguments)};w.prototype.fetchCodeList=function(e){var n=this;return this.oLoadedPromiseSync.then(function(){var o,r,a,d,l,u,c,p,h,f="com.sap.vocabularies.CodeList.v1."+e,y=n.getODataEntityContainer()[f];if(!y||!y.Url.String){return null}if(y.Url.String!=="./$metadata"){throw new Error(f+"/Url/String has to be './$metadata' for the service "+n.oDataModel.getCodeListModelParameters().serviceUrl)}l=y.CollectionPath.String;c=n.oDataModel.getMetadataUrl();o=c+"#"+l;p=O.get(o);if(p){return p}r=o+"#"+n.getId();p=O.get(r);if(p){return p}d=n._getOrCreateSharedModelCache();a=d.oModel;h=new s(function(e,t){var n=i.fromURL(c),o=n.get("sap-client"),r=n.get("sap-language"),s={$skip:0,$top:5e3};if(o){s["sap-client"]=o}if(r){s["sap-language"]=r}a.read("/"+l,{error:t,success:e,urlParameters:s})});u=new s(function(e,t){try{e(n._getPropertyNamesForCodeListCustomizing(l))}catch(e){t(e)}});p=s.all([h,u]).then(function(e){var i=e[0].results,a=e[1];O.set(o,p);O.delete(r);return i.reduce(function(e,o){var i=o[a.code],r={Text:o[a.text],UnitSpecificScale:o[a.unitSpecificScale]};if(a.standardCode){r.StandardCode=o[a.standardCode]}if(r.UnitSpecificScale===null){t.error("Ignoring customizing w/o unit-specific scale for code "+i+" from "+l,n.oDataModel.getCodeListModelParameters().serviceUrl,M)}else{e[i]=r}return e},{})}).catch(function(e){if(a.bDestroyed){O.delete(o);O.delete(r)}else{t.error("Couldn't load code list: "+l+" for "+n.oDataModel.getCodeListModelParameters().serviceUrl,e,M)}throw e}).finally(function(){if(d.bFirstCodeListRequested){if(!a.bDestroyed){a.destroy()}delete n.oSharedModelCache}else{d.bFirstCodeListRequested=true}});O.set(r,p);return p})};w.prototype.getMetaContext=function(e){var t,n,o,i,r,a,s,d,l;function u(e){var t=e.indexOf("(");return t>=0?e.slice(0,t):e}if(!e){return null}d=e.split("/");if(d[0]!==""){throw new Error("Not an absolute path: "+e)}d.shift();s=u(d[0]);n=this.getODataEntitySet(s);if(n){l=n.entityType}else{i=this.getODataFunctionImport(s);if(i){if(d.length===1){r=this.getODataFunctionImport(s,true)}l=i.returnType;if(l.lastIndexOf("Collection(",0)===0){l=l.slice(11,-1)}}else{throw new Error("Entity set or function import not found: "+s)}}d.shift();while(d.length){o=this.getODataEntityType(l);if(o){a=u(d[0]);t=this.getODataAssociationEnd(o,a)}else{o=this.getODataComplexType(l)}if(t){l=t.type;if(t.multiplicity==="1"&&a!==d[0]){throw new Error("Multiplicity is 1: "+d[0])}d.shift()}else{r=this.getODataProperty(o,d,true);if(d.length){throw new Error("Property not found: "+d.join("/"))}break}}r=r||this.getODataEntityType(l,true);return this.createBindingContext(r)};w.prototype.getODataAssociationEnd=function(t,n){var o=t?e.findObject(t.navigationProperty,n):null,i=o?e.getObject(this.oModel,"association",o.relationship):null,r=i?e.findObject(i.end,o.toRole,"role"):null;return r};w.prototype.getODataAssociationSetEnd=function(t,n){var o,i=null,r=this.getODataEntityContainer(),a=t?e.findObject(t.navigationProperty,n):null;if(r&&a){o=e.findObject(r.associationSet,a.relationship,"association");i=o?e.findObject(o.end,a.toRole,"role"):null}return i};w.prototype.getODataComplexType=function(t,n){return e.getObject(this.oModel,"complexType",t,n)};w.prototype.getODataEntityContainer=function(t){var n=t?undefined:null,o=this.oModel.getObject("/dataServices/schema");if(o){o.forEach(function(o,i){var r=e.findIndex(o.entityContainer,"true","isDefaultEntityContainer");if(r>=0){n=t?"/dataServices/schema/"+i+"/entityContainer/"+r:o.entityContainer[r]}});if(!n&&o.length===1&&o[0].entityContainer&&o[0].entityContainer.length===1){n=t?"/dataServices/schema/0/entityContainer/0":o[0].entityContainer[0]}}return n};w.prototype.getODataEntitySet=function(t,n){return e.getFromContainer(this.getODataEntityContainer(),"entitySet",t,n)};w.prototype.getODataEntityType=function(t,n){return e.getObject(this.oModel,"entityType",t,n)};w.prototype.getODataFunctionImport=function(t,n){var o=t&&t.indexOf("/")>=0?t.split("/"):undefined,i=o?e.getObject(this.oModel,"entityContainer",o[0]):this.getODataEntityContainer();return e.getFromContainer(i,"functionImport",o?o[1]:t,n)};w.prototype.getODataProperty=function(t,n,o){var i,r=Array.isArray(n)?n:[n],a=null,s;while(t&&r.length){i=e.findIndex(t.property,r[0]);if(i<0){break}r.shift();a=t.property[i];s=t.$path+"/property/"+i;if(r.length){t=this.getODataComplexType(a.type)}}return o?s:a};w.prototype.getODataValueLists=function(t){var i=false,r,a=t.getPath(),s=this.mContext2Promise[a],d=this;if(s){return s}r=b.exec(a);if(!r){throw new Error("Unsupported property context with path "+a)}s=new Promise(function(s,l){var u=t.getObject(),c,p=e.getValueLists(u);const h=""in p&&d.getODataEntitySet(p[""].CollectionPath.String);if(!h&&u["sap:value-list"]){i=true;c=d.oModel.getObject(r[2]).namespace+"."+d.oModel.getObject(r[1]).name;d.mQName2PendingRequest[c+"/"+u.name]={resolve:function(t){n(u,(t.annotations.propertyAnnotations[c]||{})[u.name]);p=e.getValueLists(u);if(o(p)){l(new Error("No value lists returned for "+a))}else{delete d.mContext2Promise[a];s(p)}},reject:l};setTimeout(d._sendBundledRequest.bind(d),0)}else{s(p)}});if(i){this.mContext2Promise[a]=s}return s};w.prototype.getProperty=function(){return this._getObject.apply(this,arguments)};w.prototype.isList=function(){return this.oModel.isList.apply(this.oModel,arguments)};w.prototype.loaded=function(){return this.oLoadedPromise};w.prototype.refresh=function(){throw new Error("Unsupported operation: ODataMetaModel#refresh")};w.prototype.requestCurrencyCodes=function(){return Promise.resolve(this.fetchCodeList("CurrencyCodes")).then(function(e){return e?d.merge({},e):e})};w.prototype.requestUnitsOfMeasure=function(){return Promise.resolve(this.fetchCodeList("UnitsOfMeasure")).then(function(e){return e?d.merge({},e):e})};w.prototype.setLegacySyntax=function(e){if(e){throw new Error("Legacy syntax not supported by ODataMetaModel")}};w.prototype.setProperty=function(){throw new Error("Unsupported operation: ODataMetaModel#setProperty")};w.prototype._getPropertyNamesForCodeListCustomizing=function(e){var t="/"+e+"/##",n=this.oDataModel.getObject(t),o=n["Org.OData.Core.V1.AlternateKeys"],i=w._getKeyPath(n,t),r=this.oDataModel.getObject("/"+e+"/"+i+"/##");if(o){if(o.length!==1){throw new Error("Single alternative expected: "+t+"Org.OData.Core.V1.AlternateKeys")}else if(o[0].Key.length!==1){throw new Error("Single key expected: "+t+"Org.OData.Core.V1.AlternateKeys/0/Key")}i=o[0].Key[0].Name.Path}return{code:i,standardCode:r["com.sap.vocabularies.CodeList.v1.StandardCode"]&&r["com.sap.vocabularies.CodeList.v1.StandardCode"].Path,text:r["com.sap.vocabularies.Common.v1.Text"].Path,unitSpecificScale:r["com.sap.vocabularies.Common.v1.UnitSpecificScale"].Path}};w._getKeyPath=function(e,t){var n=e.key.propertyRef;if(n&&n.length===1){return n[0].name}throw new Error("Single key expected: "+t)};w.getCodeListTerm=function(e){if(e==="/##@@requestCurrencyCodes"){return"CurrencyCodes"}else if(e==="/##@@requestUnitsOfMeasure"){return"UnitsOfMeasure"}return undefined};return w});
//# sourceMappingURL=ODataMetaModel.js.map