/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/GroupHeaderListItem"],function(e){"use strict";var r=[{category:"NS",name:"LREP_HOME_CONTENT",ns:"UIF/"},{category:"NS",name:"virtual~",ns:"/"}];var t={formatData(e,r){if(r==="js"||r==="properties"){return e}try{e=JSON.parse(e);return JSON.stringify(e,null,"\t")}catch(r){var t=sap.ui.require("sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils");t.displayError("Error",r.name,r.message);return e}},getGroupHeader(r){var t="{i18n>systemData}";if(r.key==="custom"){t="{i18n>externalReferences}"}return new e({title:t,upperCase:false})},isNotExcluded(e){var t=true;r.forEach(function(r){var n=true;Object.entries(r).forEach(function(r){var t=r[0];var a=r[1];n&&=e[t]===a});if(n){t=false;return false}});return t},cleanLeadingAndTrailingSlashes(e){if(!e){return""}if(e[0]==="/"){var r=e.substring(1,e.length);return this.cleanLeadingAndTrailingSlashes(r)}if(e[e.length-1]==="/"){var t=e.substring(0,e.length-1);return this.cleanLeadingAndTrailingSlashes(t)}return e},formatItemTitle(e){return`${e.namespace+e.fileName}.${e.fileType}`},endsStringWith(e,r){return e.indexOf(r,e.length-r.length)!==-1}};return t},true);
//# sourceMappingURL=DataUtils.js.map