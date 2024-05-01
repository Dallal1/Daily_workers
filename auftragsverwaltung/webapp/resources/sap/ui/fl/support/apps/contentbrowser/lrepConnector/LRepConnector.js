/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/thirdparty/jquery"],function(e,jQuery){"use strict";var t={};t.sContentPathPrefix="/sap/bc/lrep/content";t.sGetXcsrfTokenUrl="/sap/bc/lrep/actions/getcsrftoken/";t._sXcsrfToken=undefined;t.getContent=function(e,n,r,s,i){var o=this;var u=new Promise(function(u,f){n=encodeURI(n);var a=o._getLayerSuffix(e);var c=o._getContextSuffix(a,s,r);var d=t.sContentPathPrefix+(n?"":"/")+n+a+c;o._sendContentRequest(d,u,f,i)});return u};t.saveFile=function(e,n,r,s,i,o,u,f){return new Promise(function(a,c){if(!e||n===undefined||!r||!s){c()}var d=`${n+r}.${s}`;d=encodeURI(d);var p=this._getLayerSuffix(e);var _=this._getChangeListSuffix(o);var g=this._getPackageSuffix(u);var l=t.sContentPathPrefix+d+p+_+g;if(f){l=`${l}&support=true`}this._getTokenAndSendPutRequest(l,i,a,c)}.bind(this))};t.deleteFile=function(e,n,r,s,i,o){return new Promise(function(u,f){if(!e||n===undefined||!r||!s){f()}var a=`${n+r}.${s}`;a=encodeURI(a);var c=this._getLayerSuffix(e);var d=this._getChangeListSuffix(i);var p=t.sContentPathPrefix+a+c+d;if(o){p=`${p}&support=true`}this._getTokenAndSendDeletionRequest(p,u,f)}.bind(this))};t._getXcsrfToken=function(){var n=this;return new Promise(function(r,s){if(n._sXcsrfToken){r(n._sXcsrfToken)}jQuery.ajax({url:t.sGetXcsrfTokenUrl,type:"HEAD",beforeSend(t){t.setRequestHeader("X-CSRF-Token","fetch");var n=e.getClient();if(n){t.setRequestHeader("sap-client",n)}},success(e,t,s){n._sXcsrfToken=s.getResponseHeader("x-csrf-token");r(n._sXcsrfToken)},error(e,n,r){t._reportError(e,n,r);s(r)}})})};t._getLayerSuffix=function(e){if(e==="All"){return""}return`?layer=${e}`};t._getChangeListSuffix=function(e){return e?`&changelist=${e}`:""};t._getPackageSuffix=function(e){return e?`&package=${e}`:""};t._getContextSuffix=function(e,t,n){var r="";if(!t){r+=e?"&":"?";r+="dt=true"}if(n){r+=e||r?"&":"?";r+="metadata=true"}return r};t._reportError=function(e,t,n){sap.ui.require(["sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils"],function(r){r.displayError("Error",e.status,`${t}: ${n}`)})};t._sendContentRequest=function(e,n,r,s){var i={url:e,type:"GET",success(e){n(e)},error(e,n,s){t._reportError(e,n,s);r(s)}};if(s){i.dataType="text"}jQuery.ajax(i)};t._getTokenAndSendPutRequest=function(e,n,r,s){var i=this;t._getXcsrfToken().then(function(t){i._sendPutRequest(t,e,n,r,s)})};t._sendPutRequest=function(e,n,r,s,i){jQuery.ajax({url:n,contentType:"text/plain",dataType:"text",data:r,beforeSend(t){t.setRequestHeader("X-CSRF-Token",e)},type:"PUT",success(){s()},error(e,n,r){t._reportError(e,n,r);i(r)}})};t._getTokenAndSendDeletionRequest=function(e,t,n){var r=this;this._getXcsrfToken().then(function(s){r._sendDeletionRequest(s,e,t,n)})};t._sendDeletionRequest=function(e,n,r,s){jQuery.ajax({url:n,beforeSend(t){t.setRequestHeader("X-CSRF-Token",e)},type:"DELETE",success(e){r(e)},error(e,n,r){t._reportError(e,n,r);s(r)}})};return t});
//# sourceMappingURL=LRepConnector.js.map