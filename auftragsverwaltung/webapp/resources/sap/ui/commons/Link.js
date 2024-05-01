/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/LabelEnablement","./LinkRenderer"],function(e,t,a,r,i){"use strict";var o=t.extend("sap.ui.commons.Link",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.commons.FormattedTextViewControl","sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{text:{type:"string",group:"Appearance",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},helpId:{type:"string",group:"Behavior",defaultValue:""},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},target:{type:"string",group:"Data",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{allowPreventDefault:true}}}});a.call(o.prototype);o.prototype.onBeforeRendering=function(){this.removeAssociation("ariaLabelledBy",this.getId(),true);if(this.getAriaLabelledBy().length>0||r.getReferencingLabels(this).length>0){this.addAssociation("ariaLabelledBy",this.getId(),true)}};o.prototype.onsapspace=function(e){o.prototype.onclick.apply(this,arguments)};o.prototype.onclick=function(e){if(this.getEnabled()){if(!this.firePress()||!this.getHref()){e.preventDefault()}}else{e.preventDefault()}};o.prototype.onsapenter=function(e){e.stopPropagation()};o.prototype.getAccessibilityInfo=function(){return{role:"link",type:sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons").getText("ACC_CTR_TYPE_LINK"),description:this.getText()||this.getHref()||"",focusable:this.getEnabled(),enabled:this.getEnabled()}};return o});
//# sourceMappingURL=Link.js.map