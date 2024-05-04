/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Device","sap/base/security/encodeXML","sap/ui/core/Configuration","sap/ui/thirdparty/jqueryui/jquery-ui-position"],function(jQuery,e,t,a){"use strict";var i={};i.render=function(e,t){t.doBeforeRendering();e.write("<div");e.writeControlData(t);e.addClass("sapUiRoadMap");e.writeClasses();e.writeAttribute("tabindex","0");var i=t.getTooltip_AsString();if(i){e.writeAttributeEscaped("title",i)}e.writeAttribute("style","width:"+(t.getWidth()?t.getWidth():"100%")+";");e.write(">");s(e,t,true);e.write("<ul");e.writeAttribute("id",t.getId()+"-steparea");e.addClass("sapUiRoadMapStepArea");e.writeClasses();if(a.getAccessibility()){e.writeAttribute("role","group");e.writeAttributeEscaped("aria-label",b("RDMP_DEFAULT_TOOLTIP",[]));if(i){e.writeAttributeEscaped("title",i)}}e.write(">");var r=t.getSteps();for(var l=0;l<r.length;l++){var n=r[l];if(n.getSubSteps().length>0){v(e,t,n)}else{d(e,t,n)}}e.write("</ul>");s(e,t,false);e.write("</div>")};i.selectStepWithId=function(e,t){var i=e.getSelectedStep();if(i){r(i).removeClass("sapUiRoadMapSelected")}if(t){r(t).addClass("sapUiRoadMapSelected")}if(a.getAccessibility()){if(i){r(i+"-box").removeAttr("aria-checked")}if(t){r(t+"-box").attr("aria-checked",true)}}};i.selectStep=function(e,t,s,d,l,n){if(!n){i.selectStepWithId(e,t.getId())}if(!s&&t.getSubSteps().length>0){var p=t.getSubSteps();var o=t.$();var f=o.hasClass("sapUiRoadMapExpanded");var u=1;var v=function(){u--;if(u>0){return}if(l){l(!f?"expanded":"collapsed")}i.updateStepArea(e)};var g=function(t,a,i){var s=r(t);if(!jQuery.fx.off&&!d){s.width(a?"0px":e.iStepWidth);var l=r(t+"-label");l.addClass("sapUiRoadMapHidden");if(a){s.toggleClass("sapUiRoadMapHidden")}s.animate({width:a?e.iStepWidth:"0px"},"fast",function(){if(!a){s.toggleClass("sapUiRoadMapHidden")}s.width("");l.removeClass("sapUiRoadMapHidden");if(i){i()}})}else{s.toggleClass("sapUiRoadMapHidden");if(i){i()}}};o.toggleClass("sapUiRoadMapExpanded");if(a.getAccessibility()){var c=o.hasClass("sapUiRoadMapExpanded");t.$("box").attr("aria-expanded",c);t.$("expandend-box").attr("aria-expanded",c)}for(var b=0;b<p.length;b++){if(p[b].getVisible()){u++;g(p[b].getId(),!f,v)}}g(t.getId()+"-expandend",!f,v)}else{if(l){l("selected")}}};i.updateStepArea=function(e){if(e.iStepWidth!=-1){var t=e.$("steparea");var a=e.$("Start");var i=e.$("End");var r=e.$();var s=t.scrollLeft();var d=r.width()-a.outerWidth(true)-i.outerWidth(true);var l=e.getNumberOfVisibleSteps();var n=S(e);if(l<1){l=n}else{l=Math.min(l,n)}var p=Math.floor(d/e.iStepWidth);var o=Math.min(l,p);t.width(o*e.iStepWidth).scrollLeft(s);c(e)}};i.updateScrollArea=function(e,t){i.updateStepArea(e);if(!t){var a=e.$("steparea");var s=M(e,false);if(e.getFirstVisibleStep()){var d=r(e.getFirstVisibleStep());if(d.length){s=h(a,d)}}C(e,s+w()*a.scrollLeft(),true)}};i.isVisibleRef=function(e,t){var a=e.$("steparea");var i=a.children(":visible");for(var r=0;r<i.length;r++){var s=jQuery(i.get(r));if(s.attr("id")==t){var d=h(a,s);return d>=0&&d<a.width()}}return false};i.getFirstVisibleRef=function(e){var t=e.$("steparea");var a=t.children(":visible");for(var i=0;i<a.length;i++){var r=jQuery(a.get(i));if(h(t,r)==0){return r}}return null};i.setStepLabel=function(e,i){var r=i?t(i):"";e.$("label").html(r);e.$("expandend-label").html(r);if(!a.getAccessibility()){return}e.$("box").attr("aria-label",o(e,i));e.$("expandend-box").attr("aria-label",o(e,i))};i.setStepEnabled=function(e,t,i){var r=t.$();var s=t.$("expandend");if(i){r.removeClass("sapUiRoadMapDisabled");s.removeClass("sapUiRoadMapDisabled");if(a.getAccessibility()){t.$("box").removeAttr("aria-disabled");t.$("expandend-box").removeAttr("aria-disabled")}return false}else{var d=e.getSelectedStep()==t.getId();if(d){r.removeClass("sapUiRoadMapSelected")}r.addClass("sapUiRoadMapDisabled");s.addClass("sapUiRoadMapDisabled");if(a.getAccessibility()){var l=t.$("box");l.attr("aria-disabled",true);if(d){l.removeAttr("aria-checked")}t.$("expandend-box").attr("aria-disabled",true)}return d}};i.setStepVisible=function(e,t,a,i){var r=t.$();var s=t.$("expandend");var d=e.getSelectedStep()==t.getId();var l=t.getParent();if(a){if(l.getEnabled()&&l.getVisible()&&l.getExpanded()){if(i){r.removeClass("sapUiRoadMapHidden")}else{r.addClass("sapUiRoadMapHidden")}}}else{if(i){r.removeClass("sapUiRoadMapHidden")}else{r.addClass("sapUiRoadMapHidden")}var n=t.getSubSteps();if(n.length>0&&t.getExpanded()){if(i){s.removeClass("sapUiRoadMapHidden")}else{s.addClass("sapUiRoadMapHidden")}for(var p=0;p<n.length;p++){if(n[p].getVisible()){var o=n[p].$();if(e.getSelectedStep()==n[p].getId()){d=true;o.removeClass("sapUiRoadMapSelected");n[p].$("box").removeAttr("aria-checked")}if(i){o.removeClass("sapUiRoadMapHidden")}else{o.addClass("sapUiRoadMapHidden")}}}}}return d};i.setRoadMapWidth=function(e,t){var a=e.$();a.attr("style","width:"+(t?t:"100%")+";")};i.scrollToNextStep=function(e,t,a){var i=t;if(t=="first"||t=="last"){i=M(e,t=="last")}C(e,i,false,a)};i.addEllipses=function(e){if(!e){return}var a=e.$("label");var i=e.getLabel();var r=i+"";var s=jQuery('<label class="sapUiRoadMapTitle" style="display:none;position:absolute;overflow:visible;font-weight:bold;height:auto">'+r+"</label>");s.width(a.width());jQuery(sap.ui.getCore().getStaticAreaRef()).append(s);var d=false;while(r.length>0&&s.height()>a.height()){r=r.substr(0,r.length-1);s.html(t(r+"..."));d=true}if(d){a.html("<span>"+t(r)+"</span>");a.attr("title",e.getLabel())}else{a.attr("title",l(e))}s.remove()};i.updateStepAria=function(e){if(!a.getAccessibility()){return}var t=e.getParent()instanceof sap.ui.commons.RoadMap;var i=e.getParent()[t?"getSteps":"getSubSteps"]();for(var r=0;r<i.length;r++){var s=f(i[r]);var d=u(i[r]);var l=i[r].$("box");l.attr("aria-posinset",s);l.attr("aria-setsize",d);if(t&&i[r].getSubSteps().length>0){l=i[r].$("expandend-box");l.attr("aria-posinset",s);l.attr("aria-setsize",d)}}};var r=function(e){return jQuery(e?document.getElementById(e):null)};var s=function(e,t,a){var i=a?"Start":"End";e.write("<div");e.writeAttribute("id",t.getId()+"-"+i);e.writeAttribute("tabindex","-1");var r=true;e.addClass(r?"sapUiRoadMap"+i+"Scroll":"sapUiRoadMap"+i+"Fixed");e.addClass("sapUiRoadMapDelim");e.addClass("sapUiRoadMapContent");e.writeClasses();e.write("></div>")};var d=function(e,t,a,i,r,s){e.write("<li");if(s){e.writeAttribute("id",s)}else{e.writeElementData(a)}var d=g(t,a);a.__stepName=d;var o=l(a);e.addClass("sapUiRoadMapContent");e.addClass("sapUiRoadMapStep");if(!a.getVisible()){e.addClass("sapUiRoadMapHidden")}if(a.getEnabled()){if(t.getSelectedStep()==a.getId()){e.addClass("sapUiRoadMapSelected")}}else{e.addClass("sapUiRoadMapDisabled")}if(i){for(var f=0;f<i.length;f++){e.addClass(i[f])}}e.writeClasses();e.write(">");n(e,s?s:a.getId(),1);e.write("<div");e.writeAttribute("id",(s?s:a.getId())+"-box");e.writeAttribute("tabindex","-1");e.addClass("sapUiRoadMapStepBox");e.writeClasses();e.writeAttributeEscaped("title",o);p(e,t,a,r?true:false);e.write("><span>");e.write(d);e.write("</span>");if(r){r(e,t,a)}e.write("</div>");e.write("<label");e.writeAttribute("id",(s?s:a.getId())+"-label");e.addClass("sapUiRoadMapTitle");e.writeAttributeEscaped("title",o);e.writeClasses();e.write(">");var u=a.getLabel();if(u){e.writeEscaped(u)}e.write("</label>");n(e,s?s:a.getId(),2);e.write("</li>")};var l=function(e){var t=e.getTooltip_AsString();if(!t&&!e.getTooltip()&&a.getAccessibility()){t=b("RDMP_DEFAULT_STEP_TOOLTIP",[e.__stepName])}return t||""};var n=function(e,t,a){e.write("<div");e.writeAttribute("id",t+"-add"+a);e.addClass("sapUiRoadMapStepAdd"+a);e.writeClasses();e.write("></div>")};var p=function(e,t,i,r){if(!a.getAccessibility()){return}e.writeAttribute("role","treeitem");if(i.getEnabled()){e.writeAttribute("aria-checked",t.getSelectedStep()==i.getId())}else{e.writeAttribute("aria-disabled",true)}e.writeAttribute("aria-haspopup",r);e.writeAttribute("aria-level",i.getParent()instanceof sap.ui.commons.RoadMap?1:2);e.writeAttribute("aria-posinset",f(i));e.writeAttribute("aria-setsize",u(i));e.writeAttributeEscaped("aria-label",o(i,i.getLabel()));if(!r){return}e.writeAttribute("aria-expanded",i.getExpanded())};var o=function(e,t){var a=e.getParent()instanceof sap.ui.commons.RoadMap&&e.getSubSteps().length>0;var i=t||"";if(e.getEnabled()){i=b(a?"RDMP_ARIA_EXPANDABLE_STEP":"RDMP_ARIA_STANDARD_STEP",[i])}return i};var f=function(e){var t=e.getParent()instanceof sap.ui.commons.RoadMap;var a=e.getParent()[t?"indexOfStep":"indexOfSubStep"](e);var i=0;var r=e.getParent()[t?"getSteps":"getSubSteps"]();for(var s=0;s<a;s++){if(!r[s].getVisible()){i++}}return a+1-i};var u=function(e){var t=e.getParent()instanceof sap.ui.commons.RoadMap;var a=e.getParent()[t?"getSteps":"getSubSteps"]();var i=a.length;for(var r=0;r<a.length;r++){if(!a[r].getVisible()){i--}}return i};var v=function(e,t,a){var i=function(e,t,a,i,r){e.write("<div");e.writeAttribute("id",a+"-ico");e.addClass("sapUiRoadMapStepIco");if(r){e.addClass(r)}e.writeClasses();e.write("></div>")};var r=a.getExpanded();d(e,t,a,r?["sapUiRoadMapExpanded"]:null,function(e,t,a){i(e,t,a.getId(),r?"roundtripstart.gif":"roundtrip.gif")});var s=a.getSubSteps();for(var l=0;l<s.length;l++){var n=["sapUiRoadMapSubStep"];if(!r&&s[l].getVisible()){n.push("sapUiRoadMapHidden")}d(e,t,s[l],n)}n=["sapUiRoadMapExpanded","sapUiRoadMapStepEnd"];if(!r){n.push("sapUiRoadMapHidden")}d(e,t,a,n,function(e,t,a){i(e,t,a.getId()+"-expandend","roundtripend.gif")},a.getId()+"-expandend")};var g=function(e,t){var a=t.getParent();if(a===e){return a.indexOfStep(t)+1}var i=a.indexOfSubStep(t);if(i<26){return String.fromCharCode(97+i)}var r=Math.floor(i/26)-1;var s=i%26;return String.fromCharCode(97+r,97+s)};var c=function(e){var t=w();var a=e.$("steparea");var i=R(a);var r=e.$("Start");r.removeClass("sapUiRoadMapStartScroll").removeClass("sapUiRoadMapStartFixed");r.addClass(t*i>=e.iStepWidth?"sapUiRoadMapStartScroll":"sapUiRoadMapStartFixed");var s=e.$("End");s.removeClass("sapUiRoadMapEndScroll").removeClass("sapUiRoadMapEndFixed");var d=a.get(0).scrollWidth-t*i-a.width()<e.iStepWidth;s.addClass(d?"sapUiRoadMapEndFixed":"sapUiRoadMapEndScroll")};var b=function(e,t){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");if(a){return a.getText(e,t)}return e};var S=function(e){var t=0;var a=e.getSteps();for(var i=0;i<a.length;i++){if(a[i].getVisible()){t++;if(a[i].getExpanded()){t++;var r=a[i].getSubSteps();for(var s=0;s<r.length;s++){if(r[s].getVisible()){t++}}}}}return t};var h=function(e,t){var i=t.position().left;if(a.getRTL()){i=e.width()-i-t.outerWidth()}return i};var w=function(){return a.getRTL()?-1:1};var R=function(t){if(a.getRTL()&&e.browser.webkit){return-1*(t.get(0).scrollWidth-t.scrollLeft()-t.width())}return t.scrollLeft()};var M=function(t,i){var r=t.$("steparea").get(0).scrollWidth;if(a.getRTL()&&e.browser.webkit){return i?0:-1*r}return i?r:0};var C=function(e,t,a,r){var s=e.$("steparea");s.stop(false,true);if(t=="next"){t=s.scrollLeft()+e.iStepWidth*w()}else if(t=="prev"){t=s.scrollLeft()-e.iStepWidth*w()}else if(t=="keep"){t=s.scrollLeft()}else{t=t*w()}var d=function(){c(e);if(r){var t=i.getFirstVisibleRef(e);r(t.attr("id"))}};if(!jQuery.fx.off&&!a){s.animate({scrollLeft:t},"fast",d)}else{s.scrollLeft(t);d()}};return i},true);
//# sourceMappingURL=RoadMapRenderer.js.map