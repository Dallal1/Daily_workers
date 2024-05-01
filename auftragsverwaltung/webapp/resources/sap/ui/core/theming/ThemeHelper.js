/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/future","sap/base/Log"],function(e,r){"use strict";var t={};const a="sap_horizon";const n=window.matchMedia("(prefers-color-scheme: dark)").matches;const s=/^([a-zA-Z0-9_]*)(_(hcb|hcw|dark))$/g;const i=["sap_horizon","sap_horizon_dark","sap_horizon_hcb","sap_horizon_hcw","sap_fiori_3","sap_fiori_3_dark","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_belize","sap_belize_plus","sap_belize_hcb","sap_belize_hcw","sap_bluecrystal","sap_hcb"];const l={};var c={};c.reset=function(){t={}};c.getMetadata=function(r){if(!r){return null}var a=r.replace("sap-ui-theme-","").replace(/\./g,"-");if(t[a]){return t[a]}var n=document.createElement("span");n.classList.add("sapThemeMetaData-UI5-"+a);document.documentElement.appendChild(n);var s=window.getComputedStyle(n).getPropertyValue("background-image");document.documentElement.removeChild(n);var i=/\(["']?data:text\/plain;utf-8,(.*?)['"]?\)/i.exec(s);if(!i||i.length<2){return null}var l=i[1];if(l.charAt(0)!=="{"&&l.charAt(l.length-1)!=="}"){try{l=decodeURI(l)}catch(e){}}l=l.replace(/\\"/g,'"');var c=l.replace(/%20/g," ");var o;try{o=JSON.parse(c);t[a]=o}catch(r){e.errorThrows("Could not parse theme metadata for library "+a+".")}return o};c.checkAndRemoveStyle=function(t){var a=t.prefix||"",n=t.id;var s=function(t,a){var n=document.getElementById(t);try{var s=false,i=false,l=false,o=false;s=!n;i=!!(n&&(n.getAttribute("data-sap-ui-ready")==="true"||n.getAttribute("data-sap-ui-ready")==="false"));l=!!(n&&n.sheet&&n.sheet.href===n.href&&c.hasSheetCssRules(n.sheet));o=!!(n&&n.innerHTML&&n.innerHTML.length>0);var u=s||l||o||i;if(a){r.debug("ThemeHelper: "+t+": "+u+" (noLinkElement: "+s+", sheet: "+l+", innerHtml: "+o+", linkElementFinishedLoading: "+i+")")}return u}catch(r){if(a){e.errorThrows("ThemeHelper: "+t+": Error during check styles '"+t+"'",r)}}return false};var i=s(a+n,true);if(i){var l=document.querySelectorAll("link[data-sap-ui-foucmarker='"+a+n+"']");if(l.length>0){for(var o=0,u=l.length;o<u;o++){l[o].remove()}r.debug("ThemeManager: Old stylesheets removed for library: "+n)}}return i};c.safeAccessSheetCssRules=function(e){try{return e.cssRules}catch(e){return null}};c.hasSheetCssRules=function(e){var r=c.safeAccessSheetCssRules(e);return!!r&&r.length>0};c.validateAndFallbackTheme=function(e,t){if(t==null&&l[e]){return l[e]}let n=e;if(t==null&&e.startsWith("sap_")&&i.indexOf(e)==-1){const t=s.exec(e)||[];const i=t[2];if(i){n=`${a}${i}`}else{n=a}l[e]=n;r.warning(`The configured theme '${e}' is not yet or no longer supported in this version. The valid fallback theme is '${n}'.`,"Theming")}return n};c.getDefaultThemeInfo=function(){return{DEFAULT_THEME:a,DARK_MODE:n}};return c});
//# sourceMappingURL=ThemeHelper.js.map