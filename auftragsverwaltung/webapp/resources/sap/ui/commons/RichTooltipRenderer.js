/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","sap/ui/core/library","sap/ui/core/Configuration"],function(t,i,e){"use strict";var a=i.ValueState;var r={};r.render=function(i,r){var s=r.getId();i.write("<div ");i.writeControlData(r);i.addClass("sapUiRtt");i.writeClasses();i.write(" ><div><div>");i.write("<div class='sapUiRttTopL'></div><div class='sapUiRttTopR'></div>");i.write("<div class='sapUiRttCL'>");i.write("<div class='sapUiRttCR'>");i.write("<div class='sapUiRttContent'>");var d=r.getTitle();if(d){i.write("<div id='"+s+"-title' role='tooltip' class='sapUiRttTitle'>");i.writeEscaped(d);i.write("</div>");i.write("<div class='sapUiRttSep'></div>")}var v=t.getAdditionalText(r.getParent());var l=r.getAggregation("individualStateText");if(v||l){i.write('<div class="sapUiRttValueStateContainer">');if(v){var p=r.getParent().getValueState();var o=p!==a.None?"ValueState_"+p+".png":"";if(o!==""){o=sap.ui.require.toUrl("sap/ui/commons/themes/"+e.getTheme()+"/img/richtooltip/"+o);i.write('<img id="'+s+'-valueStateImage" class="sapUiRttValueStateImage" src="');i.writeEscaped(o);i.write('">')}}if(l){i.renderControl(l)}else{i.write('<div id="'+s+'-valueStateText" class="sapUiRttValueStateText">');i.writeEscaped(v);i.write("</div>")}i.write("</div>");i.write("<div class='sapUiRttSep'></div>")}i.write('<div class="sapUiRttContentContainer">');var c=r.getImageSrc();if(c){var n=r.getImageAltText();i.write('<img id="'+s+'-image" class="sapUiRttImage"');i.writeAttributeEscaped("alt",n);i.writeAttributeEscaped("src",c);i.write(">")}var w=r.getAggregation("formattedText");if(w){i.renderControl(w)}i.write("</div>");i.write("</div></div></div>");i.write("<div class='sapUiRttBotL'></div>");i.write("<div class='sapUiRttBotR'></div>");i.write("</div></div></div>")};return r},true);
//# sourceMappingURL=RichTooltipRenderer.js.map