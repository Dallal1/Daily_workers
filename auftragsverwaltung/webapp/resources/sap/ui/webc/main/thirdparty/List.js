sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation","sap/ui/webc/common/thirdparty/base/decorators/property","sap/ui/webc/common/thirdparty/base/decorators/event","sap/ui/webc/common/thirdparty/base/decorators/customElement","sap/ui/webc/common/thirdparty/base/decorators/slot","sap/ui/webc/common/thirdparty/base/Render","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/types/NavigationMode","sap/ui/webc/common/thirdparty/base/util/AriaLabelHelper","sap/ui/webc/common/thirdparty/base/util/getNormalizedTarget","sap/ui/webc/common/thirdparty/base/util/getEffectiveScrollbarStyle","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/util/debounce","sap/ui/webc/common/thirdparty/base/util/isElementInView","./types/ListMode","./types/ListGrowingMode","./types/ListSeparators","./BusyIndicator","./generated/templates/ListTemplate.lit","./generated/themes/List.css","./generated/themes/BrowserScrollbar.css","./generated/i18n/i18n-defaults"],function(e,t,i,s,o,r,n,l,a,d,u,c,h,f,m,g,p,b,y,I,v,w,E,S,_,L,F){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=A(t);i=A(i);s=A(s);o=A(o);r=A(r);n=A(n);l=A(l);a=A(a);c=A(c);h=A(h);m=A(m);g=A(g);b=A(b);y=A(y);I=A(I);v=A(v);w=A(w);E=A(E);S=A(S);_=A(_);L=A(L);function A(e){return e&&e.__esModule?e:{default:e}}var M=void 0&&(void 0).__decorate||function(e,t,i,s){var o=arguments.length,r=o<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,i):s,n;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(e,t,i,s);else for(var l=e.length-1;l>=0;l--)if(n=e[l])r=(o<3?n(r):o>3?n(t,i,r):n(t,i))||r;return o>3&&r&&Object.defineProperty(t,i,r),r};var B;const R=250;const T=10;let P=B=class e extends t.default{static async onDefine(){B.i18nBundle=await(0,p.getI18nBundle)("@ui5/webcomponents")}constructor(){super();this._previouslyFocusedItem=null;this._forwardingFocus=false;this.resizeListenerAttached=false;this.listEndObserved=false;this._itemNavigation=new o.default(this,{skipItemsSize:T,navigationMode:h.default.Vertical,getItemsCallback:()=>this.getEnabledItems()});this._handleResize=this.checkListInViewport.bind(this);this._handleResize=this.checkListInViewport.bind(this);this.initialIntersection=true}onExitDOM(){this.unobserveListEnd();this.resizeListenerAttached=false;s.default.deregister(this.getDomRef(),this._handleResize)}onBeforeRendering(){this.prepareListItems()}onAfterRendering(){if(this.growsOnScroll){this.observeListEnd()}else if(this.listEndObserved){this.unobserveListEnd()}if(this.grows){this.checkListInViewport();this.attachForResize()}}attachForResize(){if(!this.resizeListenerAttached){this.resizeListenerAttached=true;s.default.register(this.getDomRef(),this._handleResize)}}get shouldRenderH1(){return!this.header.length&&this.headerText}get headerID(){return`${this._id}-header`}get modeLabelID(){return`${this._id}-modeLabel`}get listEndDOM(){return this.shadowRoot.querySelector(".ui5-list-end-marker")}get hasData(){return this.getItems().length!==0}get showNoDataText(){return!this.hasData&&this.noDataText}get isDelete(){return this.mode===I.default.Delete}get isSingleSelect(){return[I.default.SingleSelect,I.default.SingleSelectBegin,I.default.SingleSelectEnd,I.default.SingleSelectAuto].includes(this.mode)}get isMultiSelect(){return this.mode===I.default.MultiSelect}get ariaLabelledBy(){if(this.accessibleNameRef||this.accessibleName){return undefined}const e=[];if(this.isMultiSelect||this.isSingleSelect||this.isDelete){e.push(this.modeLabelID)}if(this.shouldRenderH1){e.push(this.headerID)}return e.length?e.join(" "):undefined}get ariaLabelTxt(){return(0,f.getEffectiveAriaLabelText)(this)}get ariaLabelModeText(){if(this.isMultiSelect){return B.i18nBundle.getText(F.ARIA_LABEL_LIST_MULTISELECTABLE)}if(this.isSingleSelect){return B.i18nBundle.getText(F.ARIA_LABEL_LIST_SELECTABLE)}if(this.isDelete){return B.i18nBundle.getText(F.ARIA_LABEL_LIST_DELETABLE)}return""}get grows(){return this.growing!==v.default.None}get growsOnScroll(){return this.growing===v.default.Scroll}get growsWithButton(){return this.growing===v.default.Button}get _growingButtonText(){return B.i18nBundle.getText(F.LOAD_MORE_TEXT)}get busyIndPosition(){if(!this.grows){return"absolute"}return this._inViewport?"absolute":"sticky"}get styles(){return{busyInd:{position:this.busyIndPosition}}}get classes(){return{root:{"ui5-list-root":true,"ui5-content-native-scrollbars":(0,g.default)()}}}prepareListItems(){const e=this.getItemsForProcessing();e.forEach((t,i)=>{const s=i===e.length-1;const o=this.separators===w.default.All||this.separators===w.default.Inner&&!s;if(t.hasConfigurableMode){t._mode=this.mode}t.hasBorder=o})}async observeListEnd(){if(!this.listEndObserved){await(0,d.renderFinished)();this.getIntersectionObserver().observe(this.listEndDOM);this.listEndObserved=true}}unobserveListEnd(){if(this.growingIntersectionObserver){this.growingIntersectionObserver.disconnect();this.growingIntersectionObserver=null;this.listEndObserved=false}}onInteresection(e){if(this.initialIntersection){this.initialIntersection=false;return}e.forEach(e=>{if(e.isIntersecting){(0,b.default)(this.loadMore.bind(this),R)}})}onSelectionRequested(e){const t=this.getSelectedItems();let i=false;this._selectionRequested=true;if(this.mode!==I.default.None&&this[`handle${this.mode}`]){i=this[`handle${this.mode}`](e.detail.item,!!e.detail.selected)}if(i){const i=!this.fireEvent("selection-change",{selectedItems:this.getSelectedItems(),previouslySelectedItems:t,selectionComponentPressed:e.detail.selectionComponentPressed,targetItem:e.detail.item,key:e.detail.key},true);if(i){this._revertSelection(t)}}}handleSingleSelect(e){if(e.selected){return false}this.deselectSelectedItems();e.selected=true;return true}handleSingleSelectBegin(e){return this.handleSingleSelect(e)}handleSingleSelectEnd(e){return this.handleSingleSelect(e)}handleSingleSelectAuto(e){return this.handleSingleSelect(e)}handleMultiSelect(e,t){e.selected=t;return true}handleDelete(e){this.fireEvent("item-delete",{item:e});return true}deselectSelectedItems(){this.getSelectedItems().forEach(e=>{e.selected=false})}getSelectedItems(){return this.getItems().filter(e=>e.selected)}getEnabledItems(){return this.getItems().filter(e=>!e.disabled)}getItems(){return this.getSlottedNodes("items")}getItemsForProcessing(){return this.getItems()}_revertSelection(e){this.getItems().forEach(t=>{const i=e.indexOf(t)!==-1;const s=t.shadowRoot.querySelector(".ui5-li-multisel-cb");const o=t.shadowRoot.querySelector(".ui5-li-singlesel-radiobtn");t.selected=i;if(s){s.checked=i}else if(o){o.checked=i}})}_onkeydown(e){if((0,u.isTabNext)(e)){this._handleTabNext(e)}}_onLoadMoreKeydown(e){if((0,u.isSpace)(e)){e.preventDefault();this._loadMoreActive=true}if((0,u.isEnter)(e)){this._onLoadMoreClick();this._loadMoreActive=true}if((0,u.isTabNext)(e)){this.focusAfterElement()}if((0,u.isTabPrevious)(e)){if(this.getPreviouslyFocusedItem()){this.focusPreviouslyFocusedItem()}else{this.focusFirstItem()}e.preventDefault()}}_onLoadMoreKeyup(e){if((0,u.isSpace)(e)){this._onLoadMoreClick()}this._loadMoreActive=false}_onLoadMoreMousedown(){this._loadMoreActive=true}_onLoadMoreMouseup(){this._loadMoreActive=false}_onLoadMoreClick(){this.loadMore()}checkListInViewport(){this._inViewport=(0,y.default)(this.getDomRef())}loadMore(){this.fireEvent("load-more")}_handleTabNext(e){let t;const i=(0,m.default)(e.target);if(!t){return}if(t===i){if(this.getFirstItem(e=>e.selected&&!e.disabled)){this.focusFirstSelectedItem()}else if(this.getPreviouslyFocusedItem()){this.focusPreviouslyFocusedItem()}else{this.focusFirstItem()}e.stopImmediatePropagation();e.preventDefault()}}_onfocusin(e){const t=(0,m.default)(e.target);if(!this.isForwardElement(t)){e.stopImmediatePropagation();return}if(!this.getPreviouslyFocusedItem()){if(this.growsWithButton&&this.isForwardAfterElement(t)){this.focusGrowingButton()}else{this.focusFirstItem()}e.stopImmediatePropagation();return}if(!this.getForwardingFocus()){if(this.growsWithButton&&this.isForwardAfterElement(t)){this.focusGrowingButton();e.stopImmediatePropagation();return}this.focusPreviouslyFocusedItem();e.stopImmediatePropagation()}this.setForwardingFocus(false)}isForwardElement(e){const t=e.id;const i=this.getBeforeElement();if(this._id===t||i&&i.id===t){return true}return this.isForwardAfterElement(e)}isForwardAfterElement(e){const t=e.id;const i=this.getAfterElement();return i&&i.id===t}onItemFocused(e){const t=e.target;e.stopPropagation();this._itemNavigation.setCurrentItem(t);this.fireEvent("item-focused",{item:t});if(this.mode===I.default.SingleSelectAuto){const i={item:t,selectionComponentPressed:false,selected:true,key:e.detail.key};this.onSelectionRequested({detail:i})}}onItemPress(e){const t=e.detail.item;if(!this.fireEvent("item-click",{item:t},true)){return}if(!this._selectionRequested&&this.mode!==I.default.Delete){this._selectionRequested=true;const i={item:t,selectionComponentPressed:false,selected:!t.selected,key:e.detail.key};this.onSelectionRequested({detail:i})}this._selectionRequested=false}onItemClose(e){const t=e.target;const i=t?.hasAttribute("ui5-li-notification")||t?.hasAttribute("ui5-li-notification-group");if(i){this.fireEvent("item-close",{item:e.detail?.item})}}onItemToggle(e){this.fireEvent("item-toggle",{item:e.detail.item})}onForwardBefore(e){this.setPreviouslyFocusedItem(e.target);this.focusBeforeElement();e.stopPropagation()}onForwardAfter(e){this.setPreviouslyFocusedItem(e.target);if(!this.growsWithButton){this.focusAfterElement()}else{this.focusGrowingButton();e.preventDefault()}e.stopPropagation()}focusBeforeElement(){this.setForwardingFocus(true);this.getBeforeElement().focus()}focusAfterElement(){this.setForwardingFocus(true);this.getAfterElement().focus()}focusGrowingButton(){const e=this.getGrowingButton();if(e){e.focus()}}getGrowingButton(){return this.shadowRoot.querySelector(`#${this._id}-growing-btn`)}focusFirstItem(){const e=this.getFirstItem(e=>!e.disabled);if(e){e.focus()}}focusPreviouslyFocusedItem(){const e=this.getPreviouslyFocusedItem();if(e){e.focus()}}focusFirstSelectedItem(){const e=this.getFirstItem(e=>e.selected&&!e.disabled);if(e){e.focus()}}focusItem(e){this._itemNavigation.setCurrentItem(e);e.focus()}onFocusRequested(e){setTimeout(()=>{this.setPreviouslyFocusedItem(e.target);this.focusPreviouslyFocusedItem()},0)}setForwardingFocus(e){this._forwardingFocus=e}getForwardingFocus(){return this._forwardingFocus}setPreviouslyFocusedItem(e){this._previouslyFocusedItem=e}getPreviouslyFocusedItem(){return this._previouslyFocusedItem}getFirstItem(e){const t=this.getItems();let i=null;if(!e){return t.length?t[0]:null}for(let s=0;s<t.length;s++){if(e(t[s])){i=t[s];break}}return i}getAfterElement(){if(!this._afterElement){this._afterElement=this.shadowRoot.querySelector(`#${this._id}-after`)}return this._afterElement}getBeforeElement(){if(!this._beforeElement){this._beforeElement=this.shadowRoot.querySelector(`#${this._id}-before`)}return this._beforeElement}getIntersectionObserver(){if(!this.growingIntersectionObserver){this.growingIntersectionObserver=new IntersectionObserver(this.onInteresection.bind(this),{root:null,rootMargin:"0px",threshold:1})}return this.growingIntersectionObserver}};M([(0,r.default)()],P.prototype,"headerText",void 0);M([(0,r.default)()],P.prototype,"footerText",void 0);M([(0,r.default)({type:Boolean})],P.prototype,"indent",void 0);M([(0,r.default)({type:I.default,defaultValue:I.default.None})],P.prototype,"mode",void 0);M([(0,r.default)()],P.prototype,"noDataText",void 0);M([(0,r.default)({type:w.default,defaultValue:w.default.All})],P.prototype,"separators",void 0);M([(0,r.default)({type:v.default,defaultValue:v.default.None})],P.prototype,"growing",void 0);M([(0,r.default)({type:Boolean})],P.prototype,"busy",void 0);M([(0,r.default)({validator:c.default,defaultValue:1e3})],P.prototype,"busyDelay",void 0);M([(0,r.default)()],P.prototype,"accessibleName",void 0);M([(0,r.default)({defaultValue:""})],P.prototype,"accessibleNameRef",void 0);M([(0,r.default)({defaultValue:"list"})],P.prototype,"accessibleRole",void 0);M([(0,r.default)({defaultValue:undefined,noAttribute:true})],P.prototype,"accessibleRoleDescription",void 0);M([(0,r.default)({type:Boolean})],P.prototype,"_inViewport",void 0);M([(0,r.default)({type:Boolean})],P.prototype,"_loadMoreActive",void 0);M([(0,a.default)({type:HTMLElement,default:true})],P.prototype,"items",void 0);M([(0,a.default)()],P.prototype,"header",void 0);P=B=M([(0,l.default)({tag:"ui5-list",fastNavigation:true,renderer:i.default,template:S.default,styles:[L.default,_.default],dependencies:[E.default]}),(0,n.default)("item-click",{detail:{item:{type:HTMLElement}}}),(0,n.default)("item-close",{detail:{item:{type:HTMLElement}}}),(0,n.default)("item-toggle",{detail:{item:{type:HTMLElement}}}),(0,n.default)("item-delete",{detail:{item:{type:HTMLElement}}}),(0,n.default)("selection-change",{detail:{selectedItems:{type:Array},previouslySelectedItems:{type:Array},targetItem:{type:HTMLElement},selectionComponentPressed:{type:Boolean}}}),(0,n.default)("load-more"),(0,n.default)("item-focused",{detail:{item:{type:HTMLElement}}})],P);P.define();var D=P;e.default=D});
//# sourceMappingURL=List.js.map