/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/appVariant/AppVariantUtils","sap/ui/fl/registry/Settings","sap/ui/fl/Utils","sap/base/i18n/ResourceBundle","sap/ui/fl/write/api/AppVariantWriteAPI","sap/ui/core/IconPool"],function(t,e,a,i,r,n){"use strict";var s={};var p=`${sap.ui.require.toUrl("sap/ui/rta/appVariant/manageApps/")}webapp`;var u=i.create({url:`${p}/i18n/i18n.properties`});s._checkNavigationSupported=function(t){var e=a.getUshellContainer();return e.getServiceAsync("Navigation").then(function(e){return e.getLinks([t])}).catch(function(t){throw new Error(`Error retrieving ushell service Navigation: ${t}`)})};s._checkAppType=function(t,e){if(t&&e){return u.getText("MAA_ORIGINAL_TYPE")}else if(e){return u.getText("MAA_APP_VARIANT_TYPE")}else if(t){return u.getText("MAA_ORIGINAL_TYPE")}return undefined};s._calculateCurrentStatus=function(e,a){var i=t.getNewAppVariantId();if(a==="R"){return u.getText("MAA_OPERATION_IN_PROGRESS")}else if(i===e){t.setNewAppVariantId(null);if(a!=="E"){return u.getText("MAA_NEW_APP_VARIANT")}}};s._checkMenuItemOptions=function(t,e){var a={};if(t.isKeyUser){if(t.isOriginal){a.delAppVarButtonVisibility=false;a.adaptUIButtonVisibility=false;return a}if(t.appVarStatus==="U"||t.appVarStatus==="E"||t.appVarStatus==="R"){a.saveAsButtonEnabled=false}a.adaptUIButtonVisibility=true;if(e){if(t.isS4HanaCloud){a.delAppVarButtonEnabled=true;a.delAppVarButtonVisibility=true}else{a.delAppVarButtonEnabled=false;a.delAppVarButtonVisibility=true}}else{a.delAppVarButtonVisibility=true;if(t.appVarStatus==="R"){a.delAppVarButtonEnabled=false}else{a.delAppVarButtonEnabled=true}}}else{a.delAppVarButtonVisibility=false;a.adaptUIButtonVisibility=false}return a};s._getNavigationInfo=function(t){var e={};var a=t.startWith.semanticObject;var i=t.startWith.action;var r=t.startWith.parameters;var n={semanticObject:a,action:i,params:r};return this._checkNavigationSupported(n).then(function(n){var s;if(n.length&&t.isKeyUser){e.adaptUIButtonEnabled=true;if(t.appVarStatus==="R"||t.appVarStatus==="U"||t.appVarStatus==="E"){e.adaptUIButtonEnabled=false;e.appVarStatus=t.appVarStatus}}else{e.adaptUIButtonEnabled=false}s=this._checkMenuItemOptions(t,e.adaptUIButtonEnabled);e.semanticObject=a;e.action=i;if(r){Object.keys(r).forEach(function(t){if(r[t].value){r[t]=r[t].value}});e.params=r}e=Object.assign({},e,s);return e}.bind(this))};s._prepareAppVariantAttributes=function(t){return{appId:t.appId,title:t.title||"",subTitle:t.subTitle||"",description:t.description||"",icon:t.iconUrl||"",iconText:t.iconText,isOriginal:t.isOriginal,isAppVariant:t.isAppVariant,descriptorUrl:t.descriptorUrl,appVarStatus:t.appVarStatus}};s.getAppVariantOverviewAttributes=function(a,i){var r;var s=a.iconUrl;if(s&&n.isIconURI(s)){a.iconText=s.split("//")[1]}r=this._prepareAppVariantAttributes(a);r.isKeyUser=i;r.typeOfApp=this._checkAppType(a.isOriginal,a.isAppVariant);r.currentStatus=this._calculateCurrentStatus(a.appId,a.appVarStatus);var p;return e.getInstance().then(function(e){p=t.isS4HanaCloud(e);r.isS4HanaCloud=p;var n={isKeyUser:i,isOriginal:a.isOriginal,isS4HanaCloud:p,appVarStatus:a.appVarStatus};if(a.hasStartableIntent){n.startWith=a.startWith;return this._getNavigationInfo(n).then(function(t){r=Object.assign({},r,t);return r})}r.adaptUIButtonEnabled=false;var s=this._checkMenuItemOptions(n,false);r=Object.assign({},r,s);return Promise.resolve(r)}.bind(this))};s.getAppVariantOverview=function(t,e){var a=e?"CUSTOMER*":"VENDOR";var i={selector:{appId:t},layer:a};return r.listAllAppVariants(i).then(function(t){var a=[];var i;if(t.response&&t.response.items){i=t.response.items}else{return Promise.resolve([])}i.forEach(function(t){if(!t.isDescriptorVariant){a.push(this.getAppVariantOverviewAttributes(t,e))}},this);return Promise.all(a).then(function(t){return t})}.bind(this))};s.getDescriptor=function(t){return r.getManifest(t).then(function(t){return t.response})};return s},true);
//# sourceMappingURL=Utils.js.map