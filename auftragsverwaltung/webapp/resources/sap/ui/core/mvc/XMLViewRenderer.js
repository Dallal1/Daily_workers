/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ViewRenderer","../RenderManager","sap/ui/thirdparty/jquery"],function(e,t,jQuery){"use strict";var n=t.RenderPrefixes.Dummy,r=t.RenderPrefixes.Invisible,i=t.RenderPrefixes.Temporary;var s={apiVersion:2};s.render=function(s,d){function a(t){s.openStart("div",d);s.class("sapUiView");s.class("sapUiXMLView");e.addDisplayClass(s,d);if(t){s.attr("data-sap-ui-preserve",d.getId())}s.style("width",d.getWidth());s.style("height",d.getHeight());s.openEnd()}function o(){s.close("div")}var l=d._aParsedContent,f;if(d.isBound("content")){a();var p=d.getContent();for(f=0;f<p.length;f++){s.renderControl(p[f])}o()}else{var v=d._$oldContent=t.findPreservedContent(d.getId());if(v.length===0){var c=d.isSubView();if(!c){a(!d.oAsyncState||!d.oAsyncState.suppressPreserve)}if(l){for(f=0;f<l.length;f++){var g=l[f];if(Array.isArray(g)){s[g[0]].apply(s,g[1])}else if(!g._isExtensionPoint){s.renderControl(g);if(!g.bOutput){s.openStart("div",n+g.getId());s.class("sapUiHidden");s.openEnd();s.close("div")}}}}if(!c){o()}}else{s.renderControl(d.oAfterRenderingNotifier);s.openStart("div",i+d.getId());s.class("sapUiHidden");s.openEnd();for(f=0;f<l.length;f++){var u=l[f];if(!Array.isArray(u)&&!u._isExtensionPoint){s.renderControl(u);var y=u.getId(),h=jQuery(document.getElementById(y));if(h.length==0){h=jQuery(document.getElementById(r+y))}if(!t.isPreservedContent(h[0])){h.replaceWith('<div id="'+n+y+'" class="sapUiHidden"></div>')}}}s.close("div")}}};return s},true);
//# sourceMappingURL=XMLViewRenderer.js.map