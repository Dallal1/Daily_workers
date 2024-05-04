sap.ui.define(["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;class t{static hasGroup(e){return this.groups.has(e)}static getGroup(e){return this.groups.get(e)}static getCheckedRadioFromGroup(e){return this.checkedRadios.get(e)}static removeGroup(e){this.checkedRadios.delete(e);return this.groups.delete(e)}static addToGroup(e,t){if(this.hasGroup(t)){this.enforceSingleSelection(e,t);if(this.getGroup(t)){this.getGroup(t).push(e)}}else{this.createGroup(e,t)}this.updateTabOrder(t)}static removeFromGroup(e,t){const i=this.getGroup(t);if(!i){return}const s=this.getCheckedRadioFromGroup(t);i.forEach((t,i,s)=>{if(e._id===t._id){return s.splice(i,1)}});if(s===e){this.checkedRadios.set(t,null)}if(!i.length){this.removeGroup(t)}this.updateTabOrder(t)}static createGroup(e,t){if(e.checked){this.checkedRadios.set(t,e)}this.groups.set(t,[e])}static selectNextItem(e,t){const i=this.getGroup(t);if(!i){return}const s=i.length,r=i.indexOf(e);if(s<=1){return}const c=this._nextSelectable(r,i);if(!c){return}this.updateSelectionInGroup(c,t)}static updateFormValidity(e){const t=this.getGroup(e);if(!t){return}t.forEach(e=>e._resetFormValidity());const i=t.some(e=>e.required)&&t.every(e=>!e.checked);if(i){t[0]._invalidateForm()}}static updateTabOrder(e){const t=this.getGroup(e);if(!t){return}const i=t.some(e=>e.checked);t.filter(e=>!e.disabled).forEach((e,t)=>{if(i){e._tabIndex=e.checked?"0":"-1"}else{e._tabIndex=t===0?"0":"-1"}})}static selectPreviousItem(e,t){const i=this.getGroup(t);if(!i){return}const s=i.length,r=i.indexOf(e);if(s<=1){return}const c=this._previousSelectable(r,i);if(!c){return}this.updateSelectionInGroup(c,t)}static selectItem(e,t){this.updateSelectionInGroup(e,t);this.updateTabOrder(t)}static updateSelectionInGroup(e,t){const i=this.getCheckedRadioFromGroup(t);if(i){this._deselectRadio(i)}this._selectRadio(e);this.checkedRadios.set(t,e)}static _deselectRadio(e){if(e){e.checked=false}}static _selectRadio(e){if(e){e.focus();e.checked=true;e._checked=true;e.fireEvent("change")}}static _nextSelectable(e,t){if(!t){return null}const i=t.length;let s=null;if(e===i-1){if(t[0].disabled||t[0].readonly){return this._nextSelectable(1,t)}s=t[0]}else if(t[e+1].disabled||t[e+1].readonly){return this._nextSelectable(e+1,t)}else{s=t[e+1]}return s}static _previousSelectable(e,t){const i=t.length;let s=null;if(e===0){if(t[i-1].disabled||t[i-1].readonly){return this._previousSelectable(i-1,t)}s=t[i-1]}else if(t[e-1].disabled||t[e-1].readonly){return this._previousSelectable(e-1,t)}else{s=t[e-1]}return s}static enforceSingleSelection(e,t){const i=this.getCheckedRadioFromGroup(t);if(e.checked){if(!i){this.checkedRadios.set(t,e)}else if(e!==i){this._deselectRadio(i);this.checkedRadios.set(t,e)}}else if(e===i){this.checkedRadios.set(t,null)}this.updateTabOrder(t);this.updateFormValidity(t)}static get groups(){if(!this._groups){this._groups=new Map}return this._groups}static get checkedRadios(){if(!this._checkedRadios){this._checkedRadios=new Map}return this._checkedRadios}}var i=t;e.default=i});
//# sourceMappingURL=RadioButtonGroup.js.map