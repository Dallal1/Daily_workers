sap.ui.define(["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const r=/('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g;const t=(e,t)=>{t=t||[];return e.replace(r,(e,r,n,o,s)=>{if(r){return"'"}if(n){return n.replace(/''/g,"'")}if(o){const e=typeof o==="string"?parseInt(o):o;return String(t[e])}throw new Error(`[i18n]: pattern syntax error at pos ${s}`)})};var n=t;e.default=n});
//# sourceMappingURL=formatMessage.js.map