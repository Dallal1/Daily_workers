sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/decorators/property","sap/ui/webc/common/thirdparty/base/decorators/customElement","sap/ui/webc/common/thirdparty/base/decorators/slot","sap/ui/webc/common/thirdparty/base/decorators/event","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/types/ValueState","sap/ui/webc/common/thirdparty/base/CustomElementsScope","./ListItem","./Icon","sap/ui/webc/common/thirdparty/icons/navigation-right-arrow","sap/ui/webc/common/thirdparty/icons/navigation-down-arrow","./generated/i18n/i18n-defaults","./generated/templates/TreeItemBaseTemplate.lit","./generated/themes/TreeItem.css","./types/HasPopup"],function(e,t,i,a,o,n,s,r,l,d,u,p,f,c,h,g,m,y){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=v(t);i=v(i);a=v(a);o=v(o);n=v(n);l=v(l);u=v(u);p=v(p);g=v(g);m=v(m);y=v(y);function v(e){return e&&e.__esModule?e:{default:e}}var _=void 0&&(void 0).__decorate||function(e,t,i,a){var o=arguments.length,n=o<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,i):a,s;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")n=Reflect.decorate(e,t,i,a);else for(var r=e.length-1;r>=0;r--)if(s=e[r])n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n;return o>3&&n&&Object.defineProperty(t,i,n),n};var b;let w=b=class e extends u.default{onBeforeRendering(){this.actionable=false;this.showToggleButton=this.requiresToggleButton}get classes(){const e=super.classes;e.main["ui5-li-root-tree"]=true;return e}get styles(){return{preContent:{"padding-inline-start":`calc(var(${(0,d.getScopedVarName)("--_ui5-tree-indent-step")}) * ${this.effectiveLevel})`}}}get requiresToggleButton(){return!this._fixed?this.hasChildren||this.items.length>0:false}get effectiveLevel(){return this.level-1}get hasParent(){return this.level>1}get _toggleIconName(){return this.expanded?"navigation-down-arrow":"navigation-right-arrow"}get _showToggleButtonBeginning(){return this.showToggleButton&&!this._minimal&&!this._toggleButtonEnd}get _showToggleButtonEnd(){return this.showToggleButton&&!this._minimal&&this._toggleButtonEnd}get _ariaLabel(){return this.accessibleRoleDescription?undefined:b.i18nBundle.getText(h.TREE_ITEM_ARIA_LABEL)}get _accInfo(){const e={role:this._minimal?"menuitemradio":"treeitem",ariaExpanded:this.showToggleButton&&!this._minimal?this.expanded:undefined,ariaLevel:this._minimal?undefined:this.level,posinset:this._posinset,setsize:this._setsize,ariaSelectedText:this.ariaSelectedText,listItemAriaLabel:!this.accessibleName?this._ariaLabel:undefined,ariaOwns:this.expanded?`${this._id}-subtree`:undefined,ariaHaspopup:this.ariaHaspopup||undefined,ariaChecked:false,ariaSelected:false};if(this._minimal){e.ariaChecked=this.selected}else{e.ariaSelected=this.selected}return{...super._accInfo,...e}}get isTreeItem(){return true}toggle(){this.expanded=!this.expanded}_toggleClick(e){e.stopPropagation();this.fireEvent("toggle",{item:this})}_onkeydown(e){super._onkeydown(e);if(!this._fixed&&this.showToggleButton&&(0,s.isRight)(e)){if(!this.expanded){this.fireEvent("toggle",{item:this})}else{this.fireEvent("step-in",{item:this})}}if(!this._fixed&&(0,s.isLeft)(e)){if(this.expanded){this.fireEvent("toggle",{item:this})}else if(this.hasParent){this.fireEvent("step-out",{item:this})}}}get iconAccessibleName(){return this.expanded?b.i18nBundle.getText(h.TREE_ITEM_COLLAPSE_NODE):b.i18nBundle.getText(h.TREE_ITEM_EXPAND_NODE)}static async onDefine(){[b.i18nBundle]=await Promise.all([(0,r.getI18nBundle)("@ui5/webcomponents"),super.onDefine()])}};_([(0,t.default)({validator:n.default,defaultValue:1})],w.prototype,"level",void 0);_([(0,t.default)()],w.prototype,"icon",void 0);_([(0,t.default)({type:Boolean})],w.prototype,"showToggleButton",void 0);_([(0,t.default)({type:Boolean})],w.prototype,"expanded",void 0);_([(0,t.default)({type:Boolean})],w.prototype,"indeterminate",void 0);_([(0,t.default)({type:Boolean})],w.prototype,"hasChildren",void 0);_([(0,t.default)({type:l.default,defaultValue:l.default.None})],w.prototype,"additionalTextState",void 0);_([(0,t.default)()],w.prototype,"accessibleName",void 0);_([(0,t.default)({type:Boolean})],w.prototype,"_toggleButtonEnd",void 0);_([(0,t.default)({type:Boolean})],w.prototype,"_minimal",void 0);_([(0,t.default)({validator:n.default,defaultValue:1,noAttribute:true})],w.prototype,"_setsize",void 0);_([(0,t.default)({validator:n.default,defaultValue:1,noAttribute:true})],w.prototype,"_posinset",void 0);_([(0,t.default)({type:String,defaultValue:undefined,noAttribute:true})],w.prototype,"accessibleRoleDescription",void 0);_([(0,t.default)({type:Boolean})],w.prototype,"_fixed",void 0);_([(0,t.default)({type:y.default,noAttribute:true})],w.prototype,"ariaHaspopup",void 0);_([(0,a.default)({type:HTMLElement,default:true})],w.prototype,"items",void 0);w=b=_([(0,i.default)({languageAware:true,template:g.default,styles:[u.default.styles,m.default],dependencies:[...u.default.dependencies,p.default]}),(0,o.default)("toggle",{detail:{item:{type:HTMLElement}}}),(0,o.default)("step-in",{detail:{item:{type:HTMLElement}}}),(0,o.default)("step-out",{detail:{item:{type:HTMLElement}}})],w);var B=w;e.default=B});
//# sourceMappingURL=TreeItemBase.js.map