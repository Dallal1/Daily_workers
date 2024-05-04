sap.ui.define(["exports","../Keys","../util/getActiveElement","../types/NavigationMode","../types/ItemNavigationBehavior","../UI5Element"],function(e,t,i,n,s,r){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;i=h(i);n=h(n);s=h(s);function h(e){return e&&e.__esModule?e:{default:e}}class o{constructor(e,t){if(!e.isUI5Element){throw new Error("The root web component must be a UI5 Element instance")}this.rootWebComponent=e;this.rootWebComponent.addEventListener("keydown",this._onkeydown.bind(this));this.rootWebComponent._onComponentStateFinalized=()=>{this._init()};if(typeof t.getItemsCallback!=="function"){throw new Error("getItemsCallback is required")}this._getItems=t.getItemsCallback;this._currentIndex=t.currentIndex||0;this._rowSize=t.rowSize||1;this._behavior=t.behavior||s.default.Static;this._navigationMode=t.navigationMode||n.default.Auto;this._affectedPropertiesNames=t.affectedPropertiesNames||[];this._skipItemsSize=t.skipItemsSize||null}setCurrentItem(e){const t=this._getItems().indexOf(e);if(t===-1){console.warn(`The provided item is not managed by ItemNavigation`,e);return}this._currentIndex=t;this._applyTabIndex()}setRowSize(e){this._rowSize=e}_init(){this._getItems().forEach((e,t)=>{e._tabIndex=t===this._currentIndex?"0":"-1"})}_onkeydown(e){if(!this._canNavigate()){return}const i=this._navigationMode===n.default.Horizontal||this._navigationMode===n.default.Auto;const s=this._navigationMode===n.default.Vertical||this._navigationMode===n.default.Auto;const r=this.rootWebComponent.effectiveDir==="rtl";if(r&&(0,t.isLeft)(e)&&i){this._handleRight()}else if(r&&(0,t.isRight)(e)&&i){this._handleLeft()}else if((0,t.isLeft)(e)&&i){this._handleLeft()}else if((0,t.isRight)(e)&&i){this._handleRight()}else if((0,t.isUp)(e)&&s){this._handleUp()}else if((0,t.isDown)(e)&&s){this._handleDown()}else if((0,t.isHome)(e)){this._handleHome()}else if((0,t.isEnd)(e)){this._handleEnd()}else if((0,t.isPageUp)(e)){this._handlePageUp()}else if((0,t.isPageDown)(e)){this._handlePageDown()}else{return}e.preventDefault();this._applyTabIndex();this._focusCurrentItem()}_handleUp(){const e=this._getItems().length;if(this._currentIndex-this._rowSize>=0){this._currentIndex-=this._rowSize;return}if(this._behavior===s.default.Cyclic){const t=this._currentIndex%this._rowSize;const i=t===0?this._rowSize-1:t-1;const n=Math.ceil(e/this._rowSize);let s=i+(n-1)*this._rowSize;if(s>e-1){s-=this._rowSize}this._currentIndex=s}else{this._currentIndex=0}}_handleDown(){const e=this._getItems().length;if(this._currentIndex+this._rowSize<e){this._currentIndex+=this._rowSize;return}if(this._behavior===s.default.Cyclic){const e=this._currentIndex%this._rowSize;const t=(e+1)%this._rowSize;this._currentIndex=t}else{this._currentIndex=e-1}}_handleLeft(){const e=this._getItems().length;if(this._currentIndex>0){this._currentIndex-=1;return}if(this._behavior===s.default.Cyclic){this._currentIndex=e-1}}_handleRight(){const e=this._getItems().length;if(this._currentIndex<e-1){this._currentIndex+=1;return}if(this._behavior===s.default.Cyclic){this._currentIndex=0}}_handleHome(){const e=this._rowSize>1?this._rowSize:this._getItems().length;this._currentIndex-=this._currentIndex%e}_handleEnd(){const e=this._rowSize>1?this._rowSize:this._getItems().length;this._currentIndex+=e-1-this._currentIndex%e}_handlePageUp(){if(this._rowSize>1){return}this._handlePageUpFlat()}_handlePageDown(){if(this._rowSize>1){return}this._handlePageDownFlat()}_handlePageUpFlat(){if(this._skipItemsSize===null){this._currentIndex-=this._currentIndex;return}if(this._currentIndex+1>this._skipItemsSize){this._currentIndex-=this._skipItemsSize}else{this._currentIndex-=this._currentIndex}}_handlePageDownFlat(){if(this._skipItemsSize===null){this._currentIndex=this._getItems().length-1;return}const e=this._getItems().length-this._currentIndex-1;if(e>this._skipItemsSize){this._currentIndex+=this._skipItemsSize}else{this._currentIndex=this._getItems().length-1}}_applyTabIndex(){const e=this._getItems();for(let t=0;t<e.length;t++){e[t]._tabIndex=t===this._currentIndex?"0":"-1"}this._affectedPropertiesNames.forEach(e=>{const t=this.rootWebComponent[e];this.rootWebComponent[e]=Array.isArray(t)?[...t]:{...t}})}_focusCurrentItem(){const e=this._getCurrentItem();if(e){e.focus()}}_canNavigate(){const e=this._getCurrentItem();const t=(0,i.default)();return e&&e===t}_getCurrentItem(){const e=this._getItems();if(!e.length){return}while(this._currentIndex>=e.length){this._currentIndex-=this._rowSize}if(this._currentIndex<0){this._currentIndex=0}const t=e[this._currentIndex];if(!t){return}if((0,r.instanceOfUI5Element)(t)){return t.getFocusDomRef()}const i=this.rootWebComponent.getDomRef();if(!i){return}if(t.id){return i.querySelector(`[id="${t.id}"]`)}}}var _=o;e.default=_});
//# sourceMappingURL=ItemNavigation.js.map