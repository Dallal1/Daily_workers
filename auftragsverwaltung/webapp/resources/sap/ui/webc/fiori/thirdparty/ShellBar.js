sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/decorators/property","sap/ui/webc/common/thirdparty/base/decorators/slot","sap/ui/webc/common/thirdparty/base/decorators/customElement","sap/ui/webc/common/thirdparty/base/decorators/event","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/FeaturesRegistry","sap/ui/webc/common/thirdparty/base/types/AnimationMode","sap/ui/webc/common/thirdparty/base/config/AnimationMode","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/Render","sap/ui/webc/main/thirdparty/StandardListItem","sap/ui/webc/main/thirdparty/List","sap/ui/webc/main/thirdparty/Popover","sap/ui/webc/main/thirdparty/Button","sap/ui/webc/main/thirdparty/types/HasPopup","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/icons/search","sap/ui/webc/common/thirdparty/icons/bell","sap/ui/webc/common/thirdparty/icons/overflow","sap/ui/webc/common/thirdparty/icons/grid","./generated/templates/ShellBarTemplate.lit","./generated/templates/ShellBarPopoverTemplate.lit","./generated/themes/ShellBar.css","./generated/themes/ShellBarPopover.css","./generated/i18n/i18n-defaults"],function(e,t,i,o,s,r,l,n,a,h,u,c,d,p,f,b,m,v,_,g,w,y,P,I,S,R,A,O){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=B(t);i=B(i);o=B(o);s=B(s);r=B(r);l=B(l);n=B(n);h=B(h);p=B(p);f=B(f);b=B(b);m=B(m);v=B(v);I=B(I);S=B(S);R=B(R);A=B(A);function B(e){return e&&e.__esModule?e:{default:e}}var T=void 0&&(void 0).__decorate||function(e,t,i,o){var s=arguments.length,r=s<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,i):o,l;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(e,t,i,o);else for(var n=e.length-1;n>=0;n--)if(l=e[n])r=(s<3?l(r):s>3?l(t,i,r):l(t,i))||r;return s>3&&r&&Object.defineProperty(t,i,r),r};var x;const L=200;let E=x=class e extends t.default{static get FIORI_3_BREAKPOINTS(){return[599,1023,1439,1919,1e4]}static get FIORI_3_BREAKPOINTS_MAP(){return{599:"S",1023:"M",1439:"L",1919:"XL",1e4:"XXL"}}constructor(){super();this._itemsInfo=[];this._isInitialRendering=true;this._defaultItemPressPrevented=false;this.menuItemsObserver=new MutationObserver(()=>{this._updateClonedMenuItems()});this._headerPress=async()=>{this._updateClonedMenuItems();if(this.hasMenuItems){const e=await this._getMenuPopover();e.showAt(this.shadowRoot.querySelector(".ui5-shellbar-menu-button"),true)}};this._handleResize=()=>{this._debounce(async()=>{await this._getResponsivePopover();this.overflowPopover.close();this._overflowActions()},L)}}_debounce(e,t){clearTimeout(this._debounceInterval);this._debounceInterval=setTimeout(()=>{this._debounceInterval=null;e()},t)}_menuItemPress(e){this.menuPopover.close();this.fireEvent("menu-item-click",{item:e.detail.selectedItems[0]},true)}_logoPress(){this.fireEvent("logo-click",{targetRef:this.shadowRoot.querySelector(".ui5-shellbar-logo")})}_menuPopoverBeforeOpen(){this._menuPopoverExpanded=true;if(this.menuPopover.content&&this.menuPopover.content.length){this.menuPopover.content[0].focusFirstItem()}}_menuPopoverAfterClose(){this._menuPopoverExpanded=false}_overflowPopoverBeforeOpen(){this._overflowPopoverExpanded=true;if(this.overflowPopover.content&&this.overflowPopover.content.length){this.overflowPopover.content[0].focusFirstItem()}}_overflowPopoverAfterClose(){this._overflowPopoverExpanded=false}_logoKeyup(e){if((0,c.isSpace)(e)){this._logoPress()}}_logoKeydown(e){if((0,c.isSpace)(e)){e.preventDefault();return}if((0,c.isEnter)(e)){this._logoPress()}}_fireCoPilotClick(){this.fireEvent("co-pilot-click",{targetRef:this.shadowRoot.querySelector(".ui5-shellbar-coPilot")})}_coPilotClick(){this._fireCoPilotClick()}_coPilotKeydown(e){if((0,c.isSpace)(e)){this.coPilotActive=true;e.preventDefault();return}if((0,c.isEnter)(e)){this.coPilotActive=true;this._fireCoPilotClick()}}_coPilotKeyup(e){if((0,c.isSpace)(e)){this._fireCoPilotClick()}this.coPilotActive=false}onBeforeRendering(){const e=(0,u.getAnimationMode)()===h.default.Full;const t=(0,a.getFeature)("CoPilotAnimation");this.coPilot=t&&e?t:{animated:false};this.withLogo=this.hasLogo;this._hiddenIcons=this._itemsInfo.filter(e=>{const t=e.classes.indexOf("ui5-shellbar-hidden-button")!==-1;const i=e.classes.indexOf("ui5-shellbar-invisible-button")===-1;const o=e.classes.indexOf("ui5-shellbar-overflow-button")!==-1;const s=e.classes.indexOf("ui5-shellbar-image-button")!==-1;const r=o||s&&this.hasProfile;return t&&i&&!r});this._observeMenuItems()}onAfterRendering(){this._overflowActions();this._fullWidthSearch=this._showFullWidthSearch}closeOverflow(){if(this.overflowPopover){this.overflowPopover.close()}}_handleBarBreakpoints(){const e=this.getBoundingClientRect().width;const t=x.FIORI_3_BREAKPOINTS;const i=t.find(t=>e<=t)||x.FIORI_3_BREAKPOINTS[x.FIORI_3_BREAKPOINTS.length-1];const o=x.FIORI_3_BREAKPOINTS_MAP[i];if(this.breakpointSize!==o){this.breakpointSize=o}return o}_handleSizeS(){const e=this.showNotifications||this.showProductSwitch||!!this.searchField.length||!!this.items.length;const t=this._getAllItems(e).map(e=>{const t=e.classes.indexOf("ui5-shellbar-overflow-button")!==-1;const i=e.classes.indexOf("ui5-shellbar-image-button")!==-1;const o=t||i&&this.hasProfile;return{...e,classes:`${e.classes} ${o?"":"ui5-shellbar-hidden-button"} ui5-shellbar-button`,styles:{order:o?1:-1}}});this._updateItemsInfo(t)}_handleActionsOverflow(){const e=this.shadowRoot.querySelector(".ui5-shellbar-overflow-container-right").getBoundingClientRect();let t=".ui5-shellbar-button:not(.ui5-shellbar-overflow-button):not(.ui5-shellbar-invisible-button)";if(this.showSearchField){t+=",.ui5-shellbar-search-field"}const i=this.shadowRoot.querySelectorAll(t);const o=this.effectiveDir==="rtl";const s=[...i].filter(t=>{const i=t.getBoundingClientRect();if(o){return i.left+i.width>e.left+e.width}return i.left<e.left});const r=!!s.length;const l=this._getAllItems(r).filter(e=>e.show);const n=l.sort((e,t)=>{if(e.priority>t.priority){return 1}if(e.priority<t.priority){return-1}return 0});for(let e=0;e<n.length;e++){if(e<s.length){n[e].classes=`${n[e].classes} ui5-shellbar-hidden-button`;n[e].styles={order:-1}}}return n}_overflowActions(){const e=this._handleBarBreakpoints();if(e==="S"){return this._handleSizeS()}const t=this._handleActionsOverflow();this._updateItemsInfo(t)}async _toggleActionPopover(){const e=this.shadowRoot.querySelector(".ui5-shellbar-overflow-button");const t=await this._getOverflowPopover();t.showAt(e,true)}onEnterDOM(){n.default.register(this,this._handleResize)}onExitDOM(){this.menuItemsObserver.disconnect();n.default.deregister(this,this._handleResize);clearTimeout(this._debounceInterval);this._debounceInterval=null}_handleSearchIconPress(){this.showSearchField=!this.showSearchField;if(!this.showSearchField){return}const e=this.searchField[0];if(e){e.focused=true}setTimeout(()=>{if(e){e.focus()}},100)}async _handleActionListClick(){if(!this._defaultItemPressPrevented){this.closeOverflow();await(0,d.renderFinished)()}this._defaultItemPressPrevented=false}_handleCustomActionPress(e){const t=e.target;const i=t.getAttribute("data-ui5-external-action-item-id");if(i){const t=this.items.find(e=>e._id===i);const o=t.fireClickEvent(e);this._defaultItemPressPrevented=o}}_handleOverflowPress(){this._toggleActionPopover()}_handleNotificationsPress(e){const t=this.shadowRoot.querySelector(".ui5-shellbar-bell-button"),i=e.target;this._defaultItemPressPrevented=!this.fireEvent("notifications-click",{targetRef:t.classList.contains("ui5-shellbar-hidden-button")?i:t},true)}_handleProfilePress(){this.fireEvent("profile-click",{targetRef:this.shadowRoot.querySelector(".ui5-shellbar-image-button")})}_handleCancelButtonPress(){this.showSearchField=false}_handleProductSwitchPress(e){const t=this.shadowRoot.querySelector(".ui5-shellbar-button-product-switch"),i=e.target;this._defaultItemPressPrevented=!this.fireEvent("product-switch-click",{targetRef:t.classList.contains("ui5-shellbar-hidden-button")?i:t},true)}get logoDomRef(){return this.shadowRoot.querySelector(`*[data-ui5-stable="logo"]`)}get copilotDomRef(){return this.shadowRoot.querySelector(`*[data-ui5-stable="copilot"]`)}get notificationsDomRef(){return this.shadowRoot.querySelector(`*[data-ui5-stable="notifications"]`)}get overflowDomRef(){return this.shadowRoot.querySelector(`*[data-ui5-stable="overflow"]`)}get profileDomRef(){return this.shadowRoot.querySelector(`*[data-ui5-stable="profile"]`)}get productSwitchDomRef(){return this.shadowRoot.querySelector(`*[data-ui5-stable="product-switch"]`)}_getAllItems(e){let t=-1;const i=[{icon:"search",text:this._searchText,classes:`${this.searchField.length?"":"ui5-shellbar-invisible-button"} ui5-shellbar-search-button ui5-shellbar-button`,priority:4,domOrder:this.searchField.length?++t:-1,styles:{order:this.searchField.length?1:-10},id:`${this._id}-item-${1}`,press:this._handleSearchIconPress.bind(this),show:!!this.searchField.length},...this.items.map(e=>{e._getRealDomRef=()=>this.getDomRef().querySelector(`*[data-ui5-stable=${e.stableDomRef}]`);return{icon:e.icon,id:e._id,count:e.count||undefined,refItemid:e._id,text:e.text,classes:"ui5-shellbar-custom-item ui5-shellbar-button",priority:1,domOrder:++t,styles:{order:2},show:true,press:this._handleCustomActionPress.bind(this),custom:true,title:e.title,stableDomRef:e.stableDomRef}}),{icon:"bell",text:this._notificationsText,classes:`${this.showNotifications?"":"ui5-shellbar-invisible-button"} ui5-shellbar-bell-button ui5-shellbar-button`,priority:3,styles:{order:this.showNotifications?3:-10},id:`${this._id}-item-${2}`,show:this.showNotifications,domOrder:this.showNotifications?++t:-1,press:this._handleNotificationsPress.bind(this)},{icon:"overflow",text:"Overflow",classes:`${e?"":"ui5-shellbar-hidden-button"} ui5-shellbar-overflow-button-shown ui5-shellbar-overflow-button ui5-shellbar-button`,priority:5,order:4,styles:{order:e?4:-1},domOrder:e?++t:-1,id:`${this.id}-item-${5}`,press:this._handleOverflowPress.bind(this),show:true},{text:"Person",classes:`${this.hasProfile?"":"ui5-shellbar-invisible-button"} ui5-shellbar-image-button ui5-shellbar-button`,priority:4,styles:{order:this.hasProfile?5:-10},profile:true,id:`${this._id}-item-${3}`,domOrder:this.hasProfile?++t:-1,show:this.hasProfile,press:this._handleProfilePress.bind(this)},{icon:"grid",text:this._productsText,classes:`${this.showProductSwitch?"":"ui5-shellbar-invisible-button"} ui5-shellbar-button ui5-shellbar-button-product-switch`,priority:2,styles:{order:this.showProductSwitch?6:-10},id:`${this._id}-item-${4}`,show:this.showProductSwitch,domOrder:this.showProductSwitch?++t:-1,press:this._handleProductSwitchPress.bind(this)}];return i}_updateItemsInfo(e){const t=JSON.stringify(this._itemsInfo)!==JSON.stringify(e);if(t){this._itemsInfo=e}}_updateClonedMenuItems(){this._menuPopoverItems=[];this.menuItems.forEach(e=>{const t=e.cloneNode(true);t.removeAttribute("slot");this._menuPopoverItems.push(t)})}_observeMenuItems(){this.menuItems.forEach(e=>{this.menuItemsObserver.observe(e,{characterData:true,childList:true,subtree:true,attributes:true})})}async _getResponsivePopover(){const e=await this.getStaticAreaItemDomRef();this.overflowPopover=e.querySelector(".ui5-shellbar-overflow-popover");this.menuPopover=e.querySelector(".ui5-shellbar-menu-popover")}async _getOverflowPopover(){const e=await this.getStaticAreaItemDomRef();return e.querySelector(".ui5-shellbar-overflow-popover")}async _getMenuPopover(){const e=await this.getStaticAreaItemDomRef();return e.querySelector(".ui5-shellbar-menu-popover")}isIconHidden(e){const t=this._itemsInfo.find(t=>t.icon===e);if(!t){return false}return t.classes.indexOf("ui5-shellbar-hidden-button")!==-1}get classes(){return{wrapper:{"ui5-shellbar-root":true,"ui5-shellbar-with-searchfield":this.hasSearchField},button:{"ui5-shellbar-menu-button--interactive":this.hasMenuItems,"ui5-shellbar-menu-button":true},items:{notification:{"ui5-shellbar-hidden-button":this.isIconHidden("bell")},product:{"ui5-shellbar-hidden-button":this.isIconHidden("grid")},search:{"ui5-shellbar-hidden-button":this.isIconHidden("search")},overflow:{"ui5-shellbar-hidden-button":this.isIconHidden("overflow")}}}}get styles(){return{items:{notification:{order:this.isIconHidden("bell")?"-1":"3"},overflow:{order:this.isIconHidden("overflow")?"-1":"4"},profile:{order:this.hasProfile?"5":"-1"},product:{order:this.isIconHidden("grid")?"-1":"6"}},searchField:{display:this.correctSearchFieldStyles}}}get correctSearchFieldStyles(){if(this.showSearchField){return"flex"}return"none"}get customItemsInfo(){return this._itemsInfo.filter(e=>!!e.custom)}get hasLogo(){return!!this.logo.length}get showLogoInMenuButton(){return this.hasLogo&&this.breakpointSize==="S"}get showTitleInMenuButton(){return this.primaryTitle&&!this.showLogoInMenuButton}get showMenuButton(){return this.primaryTitle||this.showLogoInMenuButton}get popoverHorizontalAlign(){return this.effectiveDir==="rtl"?"Left":"Right"}get hasSearchField(){return!!this.searchField.length}get hasProfile(){return!!this.profile.length}get hasMenuItems(){return this.menuItems.length>0}get _shellbarText(){return x.i18nBundle.getText(O.SHELLBAR_LABEL)}get _logoText(){return this.accessibilityTexts.logoTitle||x.i18nBundle.getText(O.SHELLBAR_LOGO)}get _copilotText(){return x.i18nBundle.getText(O.SHELLBAR_COPILOT)}get _notificationsText(){return x.i18nBundle.getText(O.SHELLBAR_NOTIFICATIONS,this.notificationsCount)}get _cancelBtnText(){return x.i18nBundle.getText(O.SHELLBAR_CANCEL)}get _showFullWidthSearch(){const e=this._handleBarBreakpoints();const t=!!this.shadowRoot.querySelector(".ui5-shellbar-search-button.ui5-shellbar-hidden-button");return e==="S"||t}get _profileText(){return this.accessibilityTexts.profileButtonTitle||x.i18nBundle.getText(O.SHELLBAR_PROFILE)}get _productsText(){return x.i18nBundle.getText(O.SHELLBAR_PRODUCTS)}get _searchText(){return x.i18nBundle.getText(O.SHELLBAR_SEARCH)}get _overflowText(){return x.i18nBundle.getText(O.SHELLBAR_OVERFLOW)}get accInfo(){return{notifications:{title:this._notificationsText,accessibilityAttributes:{hasPopup:this._notificationsHasPopup}},profile:{title:this._profileText,accessibilityAttributes:{hasPopup:this._profileHasPopup}},products:{title:this._productsText,accessibilityAttributes:{hasPopup:this._productsHasPopup}},search:{title:this._searchText,accessibilityAttributes:{hasPopup:this._searchHasPopup,expanded:this.showSearchField}},overflow:{title:this._overflowText,accessibilityAttributes:{hasPopup:this._overflowHasPopup,expanded:this._overflowPopoverExpanded}}}}get _notificationsHasPopup(){const e=this.accessibilityAttributes.notifications;return e?e.ariaHasPopup:null}get _profileHasPopup(){const e=this.accessibilityAttributes.profile;return e?e.ariaHasPopup:null}get _productsHasPopup(){const e=this.accessibilityAttributes.product;return e?e.ariaHasPopup:null}get _searchHasPopup(){const e=this.accessibilityAttributes.search;return e?e.ariaHasPopup:null}get _overflowHasPopup(){const e=this.accessibilityAttributes.overflow;return e?e.ariaHasPopup:v.default.Menu}get accLogoRole(){return this.accessibilityRoles.logoRole||"button"}static async onDefine(){x.i18nBundle=await(0,_.getI18nBundle)("@ui5/webcomponents-fiori")}};T([(0,i.default)()],E.prototype,"primaryTitle",void 0);T([(0,i.default)()],E.prototype,"secondaryTitle",void 0);T([(0,i.default)()],E.prototype,"notificationsCount",void 0);T([(0,i.default)({type:Boolean})],E.prototype,"showNotifications",void 0);T([(0,i.default)({type:Boolean})],E.prototype,"showProductSwitch",void 0);T([(0,i.default)({type:Boolean})],E.prototype,"showCoPilot",void 0);T([(0,i.default)({type:Boolean})],E.prototype,"showSearchField",void 0);T([(0,i.default)({type:Object})],E.prototype,"accessibilityRoles",void 0);T([(0,i.default)({type:Object})],E.prototype,"accessibilityTexts",void 0);T([(0,i.default)({type:Object})],E.prototype,"accessibilityAttributes",void 0);T([(0,i.default)()],E.prototype,"breakpointSize",void 0);T([(0,i.default)({type:Boolean})],E.prototype,"coPilotActive",void 0);T([(0,i.default)({type:Boolean})],E.prototype,"withLogo",void 0);T([(0,i.default)({type:Object})],E.prototype,"_itemsInfo",void 0);T([(0,i.default)({type:Object,multiple:true})],E.prototype,"_menuPopoverItems",void 0);T([(0,i.default)({type:Boolean,noAttribute:true})],E.prototype,"_menuPopoverExpanded",void 0);T([(0,i.default)({type:Boolean,noAttribute:true})],E.prototype,"_overflowPopoverExpanded",void 0);T([(0,i.default)({type:Boolean,noAttribute:true})],E.prototype,"_fullWidthSearch",void 0);T([(0,o.default)({type:HTMLElement,default:true,invalidateOnChildChange:true})],E.prototype,"items",void 0);T([(0,o.default)()],E.prototype,"profile",void 0);T([(0,o.default)()],E.prototype,"logo",void 0);T([(0,o.default)()],E.prototype,"menuItems",void 0);T([(0,o.default)()],E.prototype,"searchField",void 0);T([(0,o.default)()],E.prototype,"startButton",void 0);E=x=T([(0,s.default)({tag:"ui5-shellbar",fastNavigation:true,languageAware:true,renderer:l.default,template:I.default,staticAreaTemplate:S.default,styles:R.default,staticAreaStyles:[A.default],dependencies:[m.default,f.default,b.default,p.default]}),(0,r.default)("notifications-click",{detail:{targetRef:{type:HTMLElement}}}),(0,r.default)("profile-click",{detail:{targetRef:{type:HTMLElement}}}),(0,r.default)("product-switch-click",{detail:{targetRef:{type:HTMLElement}}}),(0,r.default)("logo-click",{detail:{targetRef:{type:HTMLElement}}}),(0,r.default)("co-pilot-click",{detail:{targetRef:{type:HTMLElement}}}),(0,r.default)("menu-item-click",{detail:{item:{type:HTMLElement}}})],E);E.define();var H=E;e.default=H});
//# sourceMappingURL=ShellBar.js.map