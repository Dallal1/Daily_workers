/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/i18n/Localization","sap/ui/core/Renderer","./InputRenderer","sap/ui/Device","sap/ui/core/LabelEnablement"],function(e,t,i,n,a){"use strict";var r=t.extend(i);r.apiVersion=2;r.writeInnerAttributes=function(t,i){var a=i.getParent(),s=this.getAccessibilityState(i);t.attr("type",n.system.desktop?"text":"number");if(e.getRTL()){t.attr("dir","ltr")}s.disabled=null;if(r._isStepInput(a)){t.accessibilityState(a,s)}};r.getAriaRole=function(e){return"spinbutton"};r.getAccessibilityState=function(e){var t=i.getAccessibilityState.apply(this,arguments),s,u,l,p,c,o,b,f,g,d=e.getParent(),y=e.getValue();if(!r._isStepInput(d)){return t}s=d._getMin();u=d._getMax();l=d.getValue();p=d.getDescription();o=d.getAriaLabelledBy();b=a.getReferencingLabels(d);f=d.getAriaDescribedBy().join(" ");t.valuenow=l;if(n.system.desktop&&y){t.valuetext=y}if(p){c=d._getInput().getId()+"-descr";if(o.indexOf(c)===-1){o.push(c)}}g=b.concat(o).join(" ");if(typeof s==="number"){t.valuemin=s}if(typeof u==="number"){t.valuemax=u}if(!d.getEditable()){t.readonly=true}if(f){t.describedby=f}if(g){t.labelledby=g}return t};r._isStepInput=function(e){return e&&e.getMetadata().getName()==="sap.m.StepInput"};return r});
//# sourceMappingURL=NumericInputRenderer.js.map