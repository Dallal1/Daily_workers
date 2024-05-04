/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/ui/core/Control","./ProgressIndicatorRenderer","sap/ui/core/library"],function(jQuery,e,t,i,a){"use strict";var r=a.BarColor;var s=t.extend("sap.ui.commons.ProgressIndicator",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},barColor:{type:"sap.ui.core.BarColor",group:"Appearance",defaultValue:r.NEUTRAL},displayValue:{type:"string",group:"Appearance",defaultValue:"0%"},percentValue:{type:"int",group:"Data",defaultValue:0},showValue:{type:"boolean",group:"Appearance",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}}}});s.prototype.onclick=function(e){this.focus()};s.prototype.onselectstart=function(e){return false};s.prototype.setEndBar=function(){var e=this.getPercentValue();var t;var i=this.getBarColor();var a;this.oBar=this.getDomRef("bar");this.oEnd=this.getDomRef("end");this.oBox=this.getDomRef("box");jQuery(this.oEnd).removeClass("sapUiProgIndEndHidden");jQuery(this.oEnd).addClass(this._getProgIndTypeClass(i));if(e>100){t=1e4/e+"%"}else{t="100%"}if(e>100){a=(e-100)*20}else{a=(100-e)*20}jQuery(this.oBox).animate({width:t},0,"linear");if(this.bRtl){jQuery(this.oEnd).animate({right:t},a,"linear")}else{jQuery(this.oEnd).animate({left:t},a,"linear")}jQuery(this.oBar).animate({width:e+"%"},a,"linear");if(!this.oThis){this.oThis=this.$()}this.oThis.attr("aria-valuenow",e+"%")};s.prototype.setEndBarGoesBack=function(e){var t=this.getPercentValue();var i;var a=this.getBarColor();var r;this.oBar=this.getDomRef("bar");this.oEnd=this.getDomRef("end");this.oBox=this.getDomRef("box");if(e>100){i=1e4/e+"%"}else{i="100%"}jQuery(this.oEnd).removeClass(this._getProgIndTypeClass(a));jQuery(this.oEnd).addClass("sapUiProgIndEndHidden");if(t>100){r=(t-100)*20}else{r=(100-t)*20}jQuery(this.oBox).animate({width:i},0,"linear");if(this.bRtl){jQuery(this.oEnd).animate({right:i},r,"linear")}else{jQuery(this.oEnd).animate({left:i},r,"linear")}jQuery(this.oBar).animate({width:t+"%"},r,"linear");if(!this.oThis){this.oThis=this.$()}this.oThis.attr("aria-valuenow",t+"%")};s.prototype.setPercentValue=function(e){var t=this.getPercentValue();var i;this.oBar=this.getDomRef("bar");this.oEnd=this.getDomRef("end");this.oBox=this.getDomRef("box");var a=this;var r;if(e<0){e=0}if(e>100){i=1e4/e+"%"}else{i="100%"}if(!this.oBar){r=e*20;this.setProperty("percentValue",e,true);jQuery(this.oBar).animate({width:e+"%"},r,"linear");return this}if(e>100&&t<=100){r=(100-t)*20;this.setProperty("percentValue",e,true);jQuery(this.oBar).animate({width:"100%"},r,"linear",function(){a.setEndBar()})}else if(e<=100&&t>100){r=(t-100)*20;this.setProperty("percentValue",e,true);jQuery(this.oBar).animate({width:"100%"},r,"linear",function(){a.setEndBarGoesBack()})}else if(e>100&&t>100){if(e>t){r=(e-t)*20}else{r=(t-e)*20}i=1e4/e+"%";this.setProperty("percentValue",e,true);jQuery(this.oBox).animate({width:i},0,"linear");if(this.bRtl){jQuery(this.oEnd).animate({right:i},r,"linear")}else{jQuery(this.oEnd).animate({left:i},r,"linear")}jQuery(this.oBar).animate({width:e+"%"},r,"linear",function(){});if(!this.oThis){this.oThis=this.$()}this.oThis.attr("aria-valuenow",e+"%")}else{if(e>t){r=(e-t)*20}else{r=(t-e)*20}this.setProperty("percentValue",e,true);jQuery(this.oBar).animate({width:e+"%"},r,"linear");if(!this.oThis){this.oThis=this.$()}this.oThis.attr("aria-valuenow",e+"%")}return this};s.prototype._getProgIndTypeClass=function(e){switch(e){case"POSITIVE":return"sapUiProgIndPosEnd";case"NEGATIVE":return"sapUiProgIndNegEnd";case"CRITICAL":return"sapUiProgIndCritEnd";case"NEUTRAL":return"sapUiProgIndEnd";default:return"sapUiProgIndEnd"}};s.prototype.getAccessibilityInfo=function(){var e=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");return{role:"progressbar",type:e.getText("ACC_CTR_TYPE_PROGRESS"),description:e.getText("ACC_CTR_STATE_PROGRESS",[this.getPercentValue()]),focusable:this.getEnabled(),enabled:this.getEnabled()}};return s});
//# sourceMappingURL=ProgressIndicator.js.map