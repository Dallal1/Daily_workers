/*!
 * OpenUI5
 * (c) Copyright 2009-2024 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Lib","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/mdc/field/ConditionTypeMixin","sap/ui/mdc/enums/FieldDisplay","sap/ui/mdc/enums/OperatorName","sap/ui/mdc/enums/OperatorValueType","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/condition/Condition","sap/ui/mdc/condition/ConditionValidateException","sap/ui/mdc/enums/BaseType","sap/ui/mdc/enums/ConditionValidated","sap/base/util/merge","sap/base/strings/whitespaceReplacer","sap/ui/base/SyncPromise"],(t,e,i,n,s,o,a,l,r,u,c,p,d,f,h,m,g,y)=>{"use strict";const _="sap.ui.mdc.raw";const C="sap.ui.mdc.raw:";const v=i.extend("sap.ui.mdc.field.ConditionType",{constructor:function(t,n){i.apply(this,arguments);this.sName="Condition";this._oResourceBundle=e.getResourceBundleFor("sap.ui.mdc");this._oCalls={active:0,last:0,condition:undefined,exception:undefined}}});v.prototype.destroy=function(){i.prototype.destroy.apply(this,arguments);if(this._oDefaultType){this._oDefaultType.destroy();delete this._oDefaultType}this._bDestroyed=true};v.prototype.formatValue=function(t,e){if(t==undefined||t==null||this._bDestroyed){return null}if(typeof t!=="object"||!t.operator||!t.values||!Array.isArray(t.values)){throw new n("No valid condition provided")}if(!e){e="string"}let i=this._getValueType();const s=this._getAdditionalValueType();const o=this._isUnit(i);const a=this.oFormatOptions.preventGetDescription;P.call(this,t,i);let r,u,p,d,f;switch(this.getPrimitiveType(e)){case"string":case"any":r=this._getDisplay();u=this._getOperators();p=c.getEQOperator(u);if(!this.oFormatOptions.maxConditions||this.oFormatOptions.maxConditions===1){this._oCalls.active++;this._oCalls.last++}d=this._oCalls.last;if(!a&&r!==l.Value&&t.validated===h.Validated&&(o||t.operator===p.name&&!t.values[1])){const e=this.oFormatOptions.bindingContext;const a=o?t.values[0][1]:t.values[0];return y.resolve().then(()=>I.call(this,a,t,i,s,e)).then(e=>{if(e){t=m({},t);if(o){i=this._getDefaultType();t.operator=p.name;if(typeof e!=="object"){e={key:a,description:e}}}if(typeof e==="object"){t=b.call(this,t,e)}else if(t.values.length===1){t.values.push(e)}else{t.values[1]=e}}return T.call(this,t,undefined,d,true,i,s)}).catch(e=>{let o;if(!(e instanceof n)||!N.call(this)){o=e}return T.call(this,t,o,d,true,i,s)}).unwrap()}return T.call(this,t,undefined,d,true,i,s);default:f=S(e);if(f>=0){if(this._isCompositeType(i)){return t.values.length>=1?t.values[0][f]:null}}else if(e===_){return t.values.length>=1?t.values[0]:null}else if(i&&t.values.length>=1){return i.formatValue(t.values[0],e)}throw new n("Don't know how to format Condition to "+e)}};function V(t,e,i){const s=this._getDisplay();const o=this._isUnit(e);if(o&&t.values.length>1&&t.values[0][1]===t.values[1][1]){t=m({},t);t.operator=r.EQ;t.values.splice(1)}const a=this.oFormatOptions.hideOperator&&t.values.length===1||o;const u=c.getOperator(t.operator);const p=this._getCompositeTypes();const d=this._getAdditionalCompositeTypes();if(!u){throw new n("No valid condition provided, Operator wrong.")}let h=u.format(t,e,s,a,p,i,d);const y=this.oFormatOptions.convertWhitespaces;if(y&&(this._getBaseType(e)===f.String||s!==l.Value)){h=g(h)}return h}function T(t,e,i,n,s,o){if(this._oCalls.active>0){this._oCalls.active--}if(i<this._oCalls.last&&(this._oCalls.condition!==undefined||this._oCalls.exception!==undefined)){t=this._oCalls.condition;e=this._oCalls.exception}if(i===this._oCalls.last&&this._oCalls.active>0){this._oCalls.condition=m({},t);this._oCalls.exception=e}else if(this._oCalls.active===0&&this._oCalls.last>0){this._oCalls={active:0,last:0,condition:undefined,exception:undefined}}if(e){throw e}let a;if(n){a=V.call(this,t,s,o)}else{a=O.call(this,t,s)}return a}v.prototype.parseValue=function(t,e){const i=A.call(this);if(!e){e="string"}else if(e==="any"&&typeof t==="string"){e="string"}return this._parseValue(t,e,i)};v.prototype._parseValue=function(t,e,i){if(this._bDestroyed){return null}let n;const o=this.oFormatOptions.navigateCondition;if(o){let i;if(o.hasOwnProperty("output")){i=o.output}else{i=this.formatValue(o,e)}if(i===t){n=m({},o);delete n.output;return n}}const a=this._getDisplay();const l=this._getValueType();const r=this._getOriginalType();const u=this._getOperators();const d=this._isUnit(l);let f;if(t===null||t===undefined||t===""&&!i){if(!this._isCompositeType(l)){return null}}E.call(this,l);let g,y,C;switch(this.getPrimitiveType(e)){case"string":g;y=false;C=false;if(u.length===1){g=c.getOperator(u[0]);C=true}else{const e=c.getMatchingOperators(u,t);if(e.length===0){g=this._getDefaultOperator(u,l);if(i&&!this._isCompositeType(l)){const t=c.getEQOperator(u);if(u.indexOf(t.name)>=0){y=!!g&&g.name!==t.name;g=t}}C=true}else{const t=e.filter(t=>t.valueTypes.length===0);if(t.length>=1){g=t[0]}else{g=e[0]}}}if(g){if(d&&g!==c.getEQOperator(u)){throw new s("unsupported operator")}const e=this._isCompositeType(l);const o=this._getCompositeTypes();const f=this._getAdditionalValueType();const m=this._getAdditionalCompositeTypes();this._oCalls.active++;this._oCalls.last++;const _=this._oCalls.last;if((!e||d)&&g.validateInput&&i){n=w.call(this,g,t,l,f,C,y,u,a,true);return this._fnReturnPromise(n)}else{try{if(t===""&&e&&C){n=p.createCondition(g.name,[l.parseValue(t,"string",l._aCurrentValue)],undefined,undefined,h.NotValidated)}else{n=g.getCondition(t,l,a,C,o,f,m)}}catch(i){let n=i;if(n instanceof s&&r&&!e){try{r.parseValue(t,"string",r._aCurrentValue)}catch(t){n=t}}return T.call(this,undefined,n,_,false,l)}}if(n){return T.call(this,n,undefined,_,false,l)}}throw new s("Cannot parse value "+t);default:if(l){if(u.length===1){f=u[0]}else{f=this._getDefaultOperator(u,l).name;if(u.indexOf(f)<0){f=undefined}}if(f){const i=S(e);if(i>=0){if(this._isCompositeType(l)){const e=m([],l._aCurrentValue);e[i]=t;return p.createCondition(f,[e],undefined,undefined,h.NotValidated)}}else if(e===_){return p.createCondition(f,[t],undefined,undefined,h.NotValidated)}else{return p.createCondition(f,[l.parseValue(t,e)],undefined,undefined,h.NotValidated)}}}throw new s("Don't know how to parse Condition from "+e)}};function O(t,e){const i=this._isUnit(e);const n=this._isCompositeType(e);if(t&&!i&&n){const i=this._getOriginalType()||e;const n=i.getMetadata().getName();const s=i.getFormatOptions();const o=i.getConstraints();const a=this.oFormatOptions.delegate;const l=this.oFormatOptions.control;const u=a&&a.getTypeMap(l).getBaseType(n,s,o);if((u===f.Unit||u===f.DateTime)&&!t.values[0][1]&&e._aCurrentValue){const i=e._aCurrentValue[1]===undefined?null:e._aCurrentValue[1];t.values[0][1]=i;if(t.operator===r.BT){t.values[1][1]=i}}}P.call(this,t,e);return t}function w(t,e,i,a,c,d,f,m,g){let _;let C;let v=true;let V=false;let O;let F;const P=this.oFormatOptions.bindingContext;let E;if(e===""){E=[];_=e;O=e}else{E=t.getValues(e,m,c);_=g?E[0]:E[1];C=g?E[1]:E[0];V=m!==l.Value;O=_||C}const b=function(o){if(o&&!(o instanceof s)&&!(o instanceof n)){throw o}if(!o._bNotUnique){if(e===""){return null}if(g&&E[0]&&E[1]){return w.call(this,t,e,i,a,c,d,f,m,false)}if(d){return x.call(this,i,f,e,m)}}if(N.call(this)){return D.call(this,i,f,e,m)}throw new s(o.message)};const A=function(i){if(i){const e=[i.key];if(t.valueTypes.length>1&&t.valueTypes[1]!==u.Static){e.push(i.description)}return p.createCondition(t.name,e,i.inParameters,i.outParameters,h.Validated,i.payload)}else if(e===""){return null}else{return b.call(this,new s(this._oResourceBundle.getText("valuehelp.VALUE_NOT_EXIST",[e])))}};const I=this._oCalls.last;const S=function(n,o){let a;let l;try{a=o.call(this,n);if(this._isUnit(i)){if(a){if(a.operator!==r.EQ){throw new s("unsupported operator")}const t=i._aCurrentValue&&i._aCurrentValue[0]!==undefined?i._aCurrentValue[0]:null;const e=a.values[0];a.values=[[t,e]]}else if(e===""){a=p.createCondition(t.name,[i.parseValue(e,"string",i._aCurrentValue)],undefined,undefined,h.NotValidated)}}}catch(t){l=t}return T.call(this,a,l,I,false,i)};const k=function(t,e,i,n){let a;try{if(this._isUnit(t)){const t=e&&e.length>1&&e[1]?e[1]:this._getDefaultType();a=t.parseValue(i,"string");t.validateValue(a)}else{a=t.parseValue(i,"string");t.validateValue(a)}}catch(t){if(t&&!(n&&(t instanceof s||t instanceof o))&&i!==""){throw t}a=undefined}return a}.bind(this);const B=k(i,this._getCompositeTypes(),_||O,V);v=B!==undefined;if(V){F=k(a,this._getAdditionalCompositeTypes(),C||O,v);V=F!==undefined}if(!v&&!V){return null}return y.resolve().then(()=>U.call(this,O,B,F,i,a,P,v,V)).then(t=>S.call(this,t,A)).catch(t=>S.call(this,t,b)).unwrap()}function x(t,e,i,n){const s=this._getDefaultOperator(e,t);let o;if(s&&e.indexOf(s.name)>=0){o=s.getCondition(i,t,l.Value,true);o.validated=h.NotValidated}return o}function D(t,e,i,n){let o;if(this._isUnit(t)){o=c.getEQOperator()}else if(e.length===1){o=c.getOperator(e[0])}else{o=c.getEQOperator(e);if(e.indexOf(o.name)<0){o=undefined}}if(!o){throw new s("Cannot parse value "+i)}const a=o.getCondition(i,t,l.Value,true);if(a){a.validated=h.NotValidated;if(this._isUnit(t)&&Array.isArray(a.values[0])){a.values[0]=a.values[0][1]}}return a}v.prototype.validateValue=function(t){const e=this._getValueType();const i=this._getOriginalType();const n=this._getOperators();const s=this._isUnit(e);const a=this._isCompositeType(e);const l=this._getCompositeTypes();let r=0;const u=this._getAdditionalValueType();const p=this._getAdditionalCompositeTypes();if(t===undefined||this._bDestroyed){return null}else if(t===null){if(c.onlyEQ(n)){let t=null;try{if(e.hasOwnProperty("_sParsedEmptyString")&&e._sParsedEmptyString!==null){t=e._sParsedEmptyString}e.validateValue(t)}catch(e){if(e instanceof o){try{if(i&&!a){i.validateValue(t)}throw e}catch(t){if(t instanceof o){throw new d(t.message,t.violatedConstraints,null)}throw t}}else{return null}}}return null}if(typeof t!=="object"||!t.operator||!t.values||!Array.isArray(t.values)){throw new d(this._oResourceBundle.getText("field.VALUE_NOT_VALID"),undefined,typeof t==="object"?m({},t):t)}let f=c.getOperator(t.operator);if(s){f=c.getEQOperator();r=1}if(!f||n.indexOf(f.name)===-1){throw new d("No valid condition provided, Operator wrong.",undefined,m({},t))}try{f.validate(t.values,e,l,r,u,p)}catch(e){try{if(e instanceof o&&i&&!a){f.validate(t.values,i,l,r,u,p)}throw e}catch(e){if(e instanceof o){throw new d(e.message,e.violatedConstraints,m({},t))}throw e}}};function F(){const e=this.oFormatOptions.valueHelpID;if(e){const i=t.getElementById(e);if(i&&i.isValidationSupported()){return i}}return null}function P(t,e){if(this._isCompositeType(e)&&t&&t.values[0]){e._aCurrentValue=m([],t.values[0]);const i=this._getAdditionalType();if(this._isCompositeType(i)){i._aCurrentValue=m([],t.values[0])}const n=this._getOriginalType();if(this._isCompositeType(n)){n._aCurrentValue=m([],t.values[0])}}}function E(t){if(this._isCompositeType(t)){const e=this._getAdditionalType();if(this._isCompositeType(e)){if(!e._aCurrentValue){e._aCurrentValue=[]}t._aCurrentValue=e._aCurrentValue}}}function b(t,e){t.values=[e.key,e.description];if(e.inParameters){t.inParameters=e.inParameters}if(e.outParameters){t.outParameters=e.outParameters}if(e.payload){t.payload=e.payload}return t}function A(){const t=F.call(this);const e=this.oFormatOptions.delegate;if(e){return e.isInputValidationEnabled(this.oFormatOptions.control,t)}else{return!!t}}function N(){const t=F.call(this);const e=this.oFormatOptions.delegate;if(e){return e.isInvalidInputAllowed(this,t)}else if(t){return!t.getValidateInput()}else{return true}}function U(t,e,i,n,o,a,l,r){const u=F.call(this);const c=this.oFormatOptions.delegate;const p=this.oFormatOptions.control;const d={value:t,parsedValue:e,parsedDescription:i,dataType:n,bindingContext:a,checkKey:l,checkDescription:r,exception:s,control:p};if(c){return c.getItemForValue(p,u,d)}else if(u){return u.getItemForValue(d)}}function I(t,e,i,s,o){const a=F.call(this);const l=this.oFormatOptions.delegate;const r=this.oFormatOptions.control;if(l){return l.getDescription(r,a,t,e.inParameters,e.outParameters,o,undefined,undefined,e.payload,r,i)}else if(a){const s={value:t,parsedValue:t,parsedDescription:undefined,dataType:i,context:{inParameters:e.inParameters,outParameters:e.outParameters,payload:e.payload},bindingContext:o,checkKey:true,checkDescription:false,caseSensitive:true,exception:n,control:r};return a.getItemForValue(s)}}function S(t){let e=-1;if(t.startsWith(C)){e=parseInt(t[C.length])}return e}a.call(v.prototype);return v});
//# sourceMappingURL=ConditionType.js.map