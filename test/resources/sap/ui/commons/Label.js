/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/LabelEnablement","./LabelRenderer","sap/ui/core/library"],function(e,t,o,i,r){"use strict";var n=r.TextAlign;var a=r.TextDirection;var p=e.LabelDesign;var l=t.extend("sap.ui.commons.Label",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.core.Label"],library:"sap.ui.commons",deprecated:true,properties:{design:{type:"sap.ui.commons.LabelDesign",group:"Appearance",defaultValue:p.Standard},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:a.Inherit},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:""},text:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:n.Begin},required:{type:"boolean",group:"Appearance",defaultValue:false},requiredAtBegin:{type:"boolean",group:"Misc",defaultValue:null}},associations:{labelFor:{type:"sap.ui.core.Control",multiple:false}}}});l.prototype.onAfterRendering=function(){var e=this._getLabeledControl();if(e){if(this.getTooltip_AsString()==""||!(this.getTooltip()instanceof sap.ui.core.TooltipBase)){if(e.getTooltip()instanceof sap.ui.core.TooltipBase){this.oForTooltip=e.getTooltip();this.addDelegate(this.oForTooltip)}}this._oFor=e}};l.prototype.onBeforeRendering=function(){if(this.oForTooltip){this.removeDelegate(this.oForTooltip);this.oForTooltip=null}if(this._oFor){this._oFor=undefined}};l.prototype.exit=function(){if(this.oForTooltip){this.removeDelegate(this.oForTooltip);this.oForTooltip=null}if(this._oFor){this._oFor=undefined}};l.prototype.setReqiuredAtBegin=function(e){return this.setRequiredAtBegin(e)};l.prototype.getReqiuredAtBegin=function(){return this.getRequiredAtBegin()};l.prototype._getLabeledControl=function(){var e=this.getLabelForRendering();if(!e){return null}return sap.ui.getCore().byId(e)};l.prototype.getAccessibilityInfo=function(){return{description:this.getText()}};o.enrich(l.prototype);return l});
//# sourceMappingURL=Label.js.map