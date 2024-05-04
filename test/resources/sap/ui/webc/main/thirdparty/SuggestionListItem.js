sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/decorators/customElement","sap/ui/webc/common/thirdparty/base/decorators/slot","./StandardListItem","./generated/templates/SuggestionListItemTemplate.lit"],function(e,t,i,r,o){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=n(t);i=n(i);r=n(r);o=n(o);function n(e){return e&&e.__esModule?e:{default:e}}var l=void 0&&(void 0).__decorate||function(e,t,i,r){var o=arguments.length,n=o<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,l;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)if(l=e[a])n=(o<3?l(n):o>3?l(t,i,n):l(t,i))||n;return o>3&&n&&Object.defineProperty(t,i,n),n};let a=class e extends r.default{onBeforeRendering(){super.onBeforeRendering();this.hasTitle=!!this.titleText.length}get effectiveTitle(){return this.titleText.filter(e=>e.nodeType!==Node.COMMENT_NODE).map(e=>e.textContent).join("")}get hasDescription(){return this.richDescription.length||this.description}get groupItem(){return false}};l([(0,i.default)({type:HTMLElement})],a.prototype,"richDescription",void 0);l([(0,i.default)({type:Node,default:true})],a.prototype,"titleText",void 0);a=l([(0,t.default)({tag:"ui5-li-suggestion-item",template:o.default})],a);a.define();var s=a;e.default=s});
//# sourceMappingURL=SuggestionListItem.js.map