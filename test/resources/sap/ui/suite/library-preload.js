//@ui5-bundle sap/ui/suite/library-preload.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/suite/QuickViewUtils", ["sap/base/util/each","sap/ui/commons/Label","sap/ui/commons/Link","sap/ui/commons/TextView","sap/ui/commons/layout/MatrixLayout","sap/ui/commons/layout/MatrixLayoutCell","sap/ui/commons/layout/MatrixLayoutRow","sap/ui/core/Control","sap/ui/core/Element","sap/ui/model/odata/ODataModel","sap/ui/ux3/QuickView"],function(e,t,n,i,r,a,o,s,u,l,d){"use strict";var c={createQuickView:function(e,t,n,i){var r=new l(e,false);var a=new d({firstTitle:"{title}",firstTitleHref:"{titleLinkURL}",type:"{Thing/text}",icon:"{imageURL}"});a.setModel(r);a.bindObject("/QuickviewConfigs(name='"+t+"',thingKey='"+n+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var o=new g;o.bindAggregation("items",{path:"QVAttributes",factory:function(e,t){var n=new f(e,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});n.bindProperty("value","value",i&&i[t.getProperty("Attribute/name")]);return n}});a.addContent(o);return a},createQuickViewData:function(e,t,n,i,r){var a=new l(t,false);e.removeAllContent();e.setModel(a);e.bindProperty("firstTitle","title");e.bindProperty("firstTitleHref","titleLinkURL");e.bindProperty("type","Thing/text");e.bindProperty("icon","imageURL");e.bindObject("/QuickviewConfigs(name='"+n+"',thingKey='"+i+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var o=new g;o.bindAggregation("items",{path:"QVAttributes",factory:function(e,t){var n=new f(e,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});n.bindProperty("value","value",r&&r[t.getProperty("Attribute/name")]);return n}});e.addContent(o)},createDataSetQuickView:function(e,t,n,i,r){var a=new l(e,false);if(r){a.setSizeLimit(r)}var o=new d({type:n,showActionBar:false});o.setModel(a);o.addContent(this._createDSContent(o,t,i));return o},createDataSetQuickViewData:function(e,t,n,i,r,a){var o=new l(t,false);if(a){o.setSizeLimit(a)}e.removeAllContent();e.setType(i);e.setShowActionBar(false);e.setModel(o);e.addContent(this._createDSContent(e,n,r))},_createDSContent:function(t,s,u){var l=new r;var d=new o;e(u,function(e,t){var r;if(t.href){r=new n({text:t.value,href:t.href})}else{r=new i({text:t.value})}var o=new a({content:[r]});o.addStyleClass("quickViewDS");d.addCell(o)});l.bindAggregation("rows",s,d);return l}};var f=u.extend("sap.ui.suite.hcm.QvItem",{metadata:{library:"sap.ui.suite",properties:{label:"string",value:"string",link:"string",order:"string",type:"string"}}});var g=s.extend("sap.ui.suite.hcm.QvContent",{metadata:{library:"sap.ui.suite",aggregations:{items:{type:"sap.ui.suite.hcm.QvItem",multiple:true}}},init:function(){this._sorted=false},exit:function(){if(this._oML){this._oML.destroy()}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.openEnd();e.renderControl(t._createQVContent(t));e.close("div")}},_createQVContent:function(e){var s=new r({widths:["75px"]}),u=e.getItems(),l,d,c,f,g;if(this._oML){this._oML.destroy()}e._sortItems(e);for(var p=0;p<u.length;p++){l=new o;d=new a({vAlign:"Top"});c=new t({text:u[p].getLabel()+":"});d.addContent(c);l.addCell(d);d=new a;if(u[p].getLink()){g=new n({text:u[p].getValue(),href:u[p].getLink()});d.addContent(g)}else{f=new i({text:u[p].getValue()});d.addContent(f)}l.addCell(d);s.addRow(l)}this._oML=s;return s},_sortItems:function(e){if(!e._sorted){var t=e.removeAllAggregation("items",true);t.sort(function(e,t){return parseInt(e.getOrder())-parseInt(t.getOrder())});t.forEach(function(t){e.addAggregation("items",t,false)});e._sorted=true}}});return c},true);
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/suite/TaskCircle", ["sap/ui/core/Control","sap/ui/core/EnabledPropagator","./library","./TaskCircleRenderer"],function(e,r,a,t){"use strict";var i=a.TaskCircleColor;var o=e.extend("sap.ui.suite.TaskCircle",{metadata:{library:"sap.ui.suite",deprecated:true,properties:{value:{type:"int",group:"Misc",defaultValue:0},maxValue:{type:"int",group:"Misc",defaultValue:100},minValue:{type:"int",group:"Misc",defaultValue:0},color:{type:"sap.ui.suite.TaskCircleColor",group:"Misc",defaultValue:i.Gray}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}}},renderer:t});r.call(o.prototype);o.prototype.init=function(){};o.prototype.onclick=function(e){this.firePress({});e.preventDefault();e.stopPropagation()};o.prototype.focus=function(){var e=this.getDomRef();if(e){e.focus()}};return o});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/suite/TaskCircleRenderer", ["sap/ui/core/ControlBehavior","sap/ui/core/Core","./library"],function(e,a,r){"use strict";var i=r.TaskCircleColor;var t={apiVersion:2};t.render=function(a,r){var t=r.getMinValue();var s=r.getMaxValue();var l=r.getValue();if(t<0){t=0}if(s<0){s=1}if(l<0){l=0}var o=l.toString();var c=r.getColor();var n="sapUiTaskCircleColorGray";switch(c){case i.Red:n="sapUiTaskCircleColorRed";break;case i.Yellow:n="sapUiTaskCircleColorYellow";break;case i.Green:n="sapUiTaskCircleColorGreen";break;case i.Gray:n="sapUiTaskCircleColorGray";break;default:break}if(l<t){t=l}if(l>s){s=l}var p=24;if(t>10){p=32}if(t>100){p=46}var v=62;var u=parseInt(Math.sqrt((l-t)/(s-t)*(v*v-p*p)+p*p));var C=(l+"").length;var b=u*.55;if(C>1){b=u/C}a.openStart("div",r);a.attr("tabindex","0");if(r.getTooltip_AsString()){a.attr("title",r.getTooltip_AsString())}else{a.attr("title",o)}if(e.isAccessibilityEnabled()){a.attr("role","progressbar");a.accessibilityState(r,{valuemin:t});a.accessibilityState(r,{valuemax:s});a.accessibilityState(r,{valuenow:l})}a.attr("class","sapUiTaskCircle "+n);a.style("width",u+"px");a.style("height",u+"px");a.style("line-height",u+"px");a.style("font-size",parseInt(b)+"px");a.style("border-radius",u+"px");a.style("-moz-border-radius",u+"px");a.openEnd();a.text(l);a.close("div")};return t},true);
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/suite/VerticalProgressIndicator", ["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/EnabledPropagator","./library","./VerticalProgressIndicatorRenderer"],function(jQuery,e,t,r,i){"use strict";var a=e.extend("sap.ui.suite.VerticalProgressIndicator",{metadata:{library:"sap.ui.suite",deprecated:true,properties:{percentage:{type:"int",group:"Misc",defaultValue:null}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}}},renderer:i});t.call(a.prototype);a.prototype.setPercentage=function(e){var t=this.getPercentage();if(t==e){return this}this.oBar=this.getDomRef("bar");t=e;if(t<0){t=0}if(t>100){t=100}var r=Math.round(t*58/100);var i=58-r;this.setProperty("percentage",e,true);jQuery(this.oBar).css("top",i);jQuery(this.oBar).css("height",r);if(!this.oThis){this.oThis=this.$()}this.oThis.attr("aria-valuenow",e+"%");return this};a.prototype.onclick=function(e){this.firePress({});e.preventDefault();e.stopPropagation()};a.prototype.focus=function(){var e=this.getDomRef();if(e){e.focus()}};return a});
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/suite/VerticalProgressIndicatorRenderer", ["sap/ui/core/ControlBehavior"],function(t){"use strict";var e={apiVersion:2};e.render=function(e,i){var r=i.getPercentage();if(r<0){r=0}if(r>100){r=100}var a=Math.round(r*58/100);var s=58-a;var n=r.toString();e.openStart("div",i);e.attr("tabindex","0");if(i.getTooltip_AsString()){e.attr("title",i.getTooltip_AsString())}else{e.attr("title",n)}if(t.isAccessibilityEnabled()){e.attr("role","progressbar");e.accessibilityState(i,{valuemin:"0%"});e.accessibilityState(i,{valuemax:"100%"});e.accessibilityState(i,{valuenow:r+"%"})}e.class("sapUiVerticalProgressOuterContainer");e.openEnd();e.openStart("div",i.getId()+"-bar");e.class("sapUiVerticalProgressInnerContainer");e.style("top",s+"px");e.style("height",a+"px");e.openEnd();e.close("div");e.close("div")};return e},true);
/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("sap/ui/suite/library", ["sap/ui/core/Core","sap/ui/core/library"],function(e){"use strict";var r=sap.ui.getCore().initLibrary({name:"sap.ui.suite",version:"1.121.0",dependencies:["sap.ui.core"],types:["sap.ui.suite.TaskCircleColor"],interfaces:[],controls:["sap.ui.suite.TaskCircle","sap.ui.suite.VerticalProgressIndicator"],elements:[]});r.TaskCircleColor={Red:"Red",Yellow:"Yellow",Green:"Green",Gray:"Gray"};return r});
sap.ui.require.preload({
	"sap/ui/suite/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.ui.suite","type":"library","embeds":[],"applicationVersion":{"version":"1.121.0"},"title":"SAP UI library: sap.ui.suite (by SAP, Author)","description":"SAP UI library: sap.ui.suite (by SAP, Author)","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.121","libs":{"sap.ui.core":{"minVersion":"1.121.0"}}},"library":{"i18n":false,"content":{"controls":["sap.ui.suite.TaskCircle","sap.ui.suite.VerticalProgressIndicator"],"elements":[],"types":["sap.ui.suite.TaskCircleColor"],"interfaces":[]}}}}'
});
//# sourceMappingURL=library-preload.js.map
