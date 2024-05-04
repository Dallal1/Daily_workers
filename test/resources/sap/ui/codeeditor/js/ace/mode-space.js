ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(e,t,i){"use strict";var r=e("../../lib/oop");var o=e("./fold_mode").FoldMode;var a=e("../../range").Range;var n=t.FoldMode=function(){};r.inherits(n,o);(function(){this.commentBlock=function(e,t){var i=/\S/;var r=e.getLine(t);var o=r.search(i);if(o==-1||r[o]!="#")return;var n=r.length;var l=e.getLength();var s=t;var c=t;while(++t<l){r=e.getLine(t);var d=r.search(i);if(d==-1)continue;if(r[d]!="#")break;c=t}if(c>s){var g=e.getLine(c).length;return new a(s,n,c,g)}};this.getFoldWidgetRange=function(e,t,i){var r=this.indentationBlock(e,i);if(r)return r;r=this.commentBlock(e,i);if(r)return r};this.getFoldWidget=function(e,t,i){var r=e.getLine(i);var o=r.search(/\S/);var a=e.getLine(i+1);var n=e.getLine(i-1);var l=n.search(/\S/);var s=a.search(/\S/);if(o==-1){e.foldWidgets[i-1]=l!=-1&&l<s?"start":"";return""}if(l==-1){if(o==s&&r[o]=="#"&&a[o]=="#"){e.foldWidgets[i-1]="";e.foldWidgets[i+1]="";return"start"}}else if(l==o&&r[o]=="#"&&n[o]=="#"){if(e.getLine(i-2).search(/\S/)==-1){e.foldWidgets[i-1]="start";e.foldWidgets[i+1]="";return""}}if(l!=-1&&l<o)e.foldWidgets[i-1]="start";else e.foldWidgets[i-1]="";if(o<s)return"start";else return""}}).call(n.prototype)});ace.define("ace/mode/space_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var a=function(){this.$rules={start:[{token:"empty_line",regex:/ */,next:"key"},{token:"empty_line",regex:/$/,next:"key"}],key:[{token:"variable",regex:/\S+/},{token:"empty_line",regex:/$/,next:"start"},{token:"keyword.operator",regex:/ /,next:"value"}],value:[{token:"keyword.operator",regex:/$/,next:"start"},{token:"string",regex:/[^$]/}]}};r.inherits(a,o);t.SpaceHighlightRules=a});ace.define("ace/mode/space",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/folding/coffee","ace/mode/space_highlight_rules"],function(e,t,i){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var a=e("./folding/coffee").FoldMode;var n=e("./space_highlight_rules").SpaceHighlightRules;var l=function(){this.HighlightRules=n;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};r.inherits(l,o);(function(){this.$id="ace/mode/space"}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/space"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-space.js.map