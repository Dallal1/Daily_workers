/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/BaseDelegate","sap/ui/mdc/enums/LinkType","sap/ui/fl/Utils","sap/ui/fl/apply/api/FlexRuntimeInfoAPI"],(e,t,n,o)=>{"use strict";const r=Object.assign({},e);r.fetchLinkItems=function(e,t,n){return Promise.resolve(null)};r.fetchLinkType=function(e){return Promise.resolve({initialType:{type:t.Popover,directLink:undefined},runtimeType:null})};r.fetchAdditionalContent=function(e){return Promise.resolve([])};r.modifyLinkItems=function(e,t,n){return Promise.resolve(n)};r.beforeNavigationCallback=function(e,t){return Promise.resolve(true)};r.getPanelId=function(e){let t;if(e.getParent()){t=e.getParent()}let r=e._getSourceControl();if(!r){e.setSourceControl(t);r=t}if(!o.isFlexSupported({element:e})||!o.isFlexSupported({element:r})){return e.getId()+"-idInfoPanel"}else{const e=n.getAppComponentForControl(r)||n.getAppComponentForControl(t);return e.createId("idInfoPanel")}};r.fetchPopoverTitle=function(e,t){if(!e){const e="";return Promise.resolve({sTitle:e,undefined:undefined})}const n=e.getParent()?.getValue();const o=r._getLabelledByControl(t);return Promise.resolve({sTitle:n,oLabelledByControl:o})};r._getLabelledByControl=function(e){const t=e._getAdditionalContentArea().getItems();let n=e._getPersonalizationButton();if(t.length>0){[n]=t}else{const t=e._getLinkControls();if(t.length>0){[n]=t}}return n};return r});
//# sourceMappingURL=LinkDelegate.js.map