/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/extend","sap/ui/base/BindingParser","sap/ui/performance/Measurement"],function(e,t,a,n){"use strict";var i="sap.ui.model.odata.AnnotationHelper",r=/[\\\{\}:]/,o,u=/^(\/dataServices\/schema\/\d+\/entityContainer\/\d+\/entitySet\/\d+)(?:\/|$)/,d=[i],s=i+"/followPath",p=/^(\/dataServices\/schema\/\d+\/(?:complex|entity)Type\/\d+)(?:\/|$)/,f={"Edm.Boolean":"sap.ui.model.odata.type.Boolean","Edm.Byte":"sap.ui.model.odata.type.Byte","Edm.Date":"sap.ui.model.odata.type.Date","Edm.DateTime":"sap.ui.model.odata.type.DateTime","Edm.DateTimeOffset":"sap.ui.model.odata.type.DateTimeOffset","Edm.Decimal":"sap.ui.model.odata.type.Decimal","Edm.Double":"sap.ui.model.odata.type.Double","Edm.Float":"sap.ui.model.odata.type.Single","Edm.Guid":"sap.ui.model.odata.type.Guid","Edm.Int16":"sap.ui.model.odata.type.Int16","Edm.Int32":"sap.ui.model.odata.type.Int32","Edm.Int64":"sap.ui.model.odata.type.Int64","Edm.SByte":"sap.ui.model.odata.type.SByte","Edm.Single":"sap.ui.model.odata.type.Single","Edm.String":"sap.ui.model.odata.type.String","Edm.Stream":"sap.ui.model.odata.type.Stream","Edm.Time":"sap.ui.model.odata.type.Time","Edm.TimeOfDay":"sap.ui.model.odata.type.TimeOfDay"};o={descend:function(e,a,n){var i=t({},e);o.expectType(e,typeof a==="number"?"array":"object");i.path=e.path+"/"+a;i.value=e.value[a];if(n===true){i.asExpression=true}else if(n){o.expectType(i,n)}return i},error:function(t,a,n){a=t.path+": "+a;e.error(a,o.toErrorString(t.value),n||i);throw new SyntaxError(a)},expectType:function(e,t){var a,n=e.value;if(t==="array"){a=!Array.isArray(n)}else{a=typeof n!==t||n===null||Array.isArray(n)}if(a){o.error(e,"Expected "+t)}},followPath:function(e,t){var a,i,r,u,p=e.getModel(),f,l={associationSetEnd:undefined,navigationAfterMultiple:false,isMultiple:false,navigationProperties:[],resolvedPath:undefined},m,y;n.average(s,"",d);i=o.getPath(t);r=i!==undefined&&o.getStartingPoint(e,i);if(!r){n.end(s);return undefined}f=i.split("/");if(i){while(f.length&&r){m=f[0];u=m.indexOf("@");if(u===0){r+="/"+m.slice(1);f.shift();continue}y=p.getObject(r);a=p.getODataAssociationEnd(y,m);if(a){l.associationSetEnd=p.getODataAssociationSetEnd(y,m);l.navigationProperties.push(m);if(l.isMultiple){l.navigationAfterMultiple=true}l.isMultiple=a.multiplicity==="*";r=p.getODataEntityType(a.type,true);f.shift();continue}r=p.getODataProperty(y,f,true)}}l.resolvedPath=r;n.end(s);return l},getPath:function(e){if(e){if(e.hasOwnProperty("AnnotationPath")){return e.AnnotationPath}if(e.hasOwnProperty("Path")){return e.Path}if(e.hasOwnProperty("PropertyPath")){return e.PropertyPath}if(e.hasOwnProperty("NavigationPropertyPath")){return e.NavigationPropertyPath}}return undefined},getStartingPoint:function(e,t){var a,n=p.exec(e.getPath()),i;if(n){return n[1]}n=u.exec(e.getPath());if(n){if(!t){return n[1]}i=e.getModel();a=i.getObject(n[1]);return i.getODataEntityType(a.entityType,true)}return undefined},property:function(e,t,a){return o.descend(e,t,a).value},resultToString:function(e,t,n,i){var u=e.value;function d(t){var a,n,i=e.parameters&&o.toJSON(e.parameters),d=i&&i!=="{}",s,p=f[e.type];t=t&&!e.ignoreTypeInPath&&p;if(t||r.test(u)||d){s="{path:"+o.toJSON(u);if(t){s+=",type:'"+p+"'";a=o.toJSON(e.constraints);if(a&&a!=="{}"){s+=",constraints:"+a}n=e.formatOptions&&o.toJSON(e.formatOptions);if(n&&n!=="{}"){s+=",formatOptions:"+n}}if(d){s+=",parameters:"+i}return s+"}"}return"{"+u+"}"}function s(e){switch(e.type){case"Edm.Boolean":case"Edm.Double":case"Edm.Int32":return String(e.value);default:return o.toJSON(e.value)}}switch(e.result){case"binding":if(t){return(i?"%":"$")+d(n)}return d(n);case"composite":if(t){throw new Error("Trying to embed a composite binding into an expression binding")}return u;case"constant":if(e.type==="edm:Null"){if(e.value===undefined){return t?"undefined":undefined}return t?"null":null}if(t){return s(e)}return typeof u==="string"?a.complexParser.escape(u):String(u);case"expression":return t?u:"{="+u+"}";default:return undefined}},toErrorString:function(e){var t;if(typeof e!=="function"){try{t=o.toJSON(e);if(t!==undefined&&t!=="null"){return t}}catch(e){}}return String(e)},toJSON:function(e){var t,a=false,n="",i,r;t=JSON.stringify(e);if(t===undefined){return undefined}for(i=0;i<t.length;i+=1){switch(r=t.charAt(i)){case"'":n+="\\'";break;case'"':if(a){n+=r;a=false}else{n+="'"}break;case"\\":if(a){n+="\\\\"}a=!a;break;default:if(a){n+="\\";a=false}n+=r}}return n}};return o});
//# sourceMappingURL=_AnnotationHelperBasics.js.map