ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop");var i=e("../../range").Range;var o=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(a,o);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var i=this._getFoldWidgetBase(e,t,n);if(!i&&this.startRegionRe.test(r))return"start";return i};this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var o=i.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,a);var s=e.getCommentFoldRange(n,a+o[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var o=i.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;if(o[1])return this.closingBracketBlock(e,o[1],n,a);return e.getCommentFoldRange(n,a,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var o=t;var a=n.length;t=t+1;var s=t;var g=e.getLength();while(++t<g){n=e.getLine(t);var c=n.search(/\S/);if(c===-1)continue;if(r>c)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=o){break}else if(l.isMultiLine()){t=l.end.row}else if(r==c){break}}s=t}return new i(o,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var o=e.getLength();var a=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var g=1;while(++n<o){t=e.getLine(n);var c=s.exec(t);if(!c)continue;if(c[1])g--;else g++;if(!g)break}var l=n;if(l>a){return new i(a,r,l,t.length)}}}).call(a.prototype)});ace.define("ace/mode/tcl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var o=function(){this.$rules={start:[{token:"comment",regex:"#.*\\\\$",next:"commentfollow"},{token:"comment",regex:"#.*$"},{token:"support.function",regex:"[\\\\]$",next:"splitlineStart"},{token:"text",regex:/\\(?:["{}\[\]$\\])/},{token:"text",regex:"^|[^{][;][^}]|[/\r/]",next:"commandItem"},{token:"string",regex:'[ ]*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:'[ ]*["]',next:"qqstring"},{token:"variable.instance",regex:"[$]",next:"variable"},{token:"support.function",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|{\\*}|;|::"},{token:"identifier",regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"paren.lparen",regex:"[[{]",next:"commandItem"},{token:"paren.lparen",regex:"[(]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],commandItem:[{token:"comment",regex:"#.*\\\\$",next:"commentfollow"},{token:"comment",regex:"#.*$",next:"start"},{token:"string",regex:'[ ]*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"variable.instance",regex:"[$]",next:"variable"},{token:"support.function",regex:"(?:[:][:])[a-zA-Z0-9_/]+(?:[:][:])",next:"commandItem"},{token:"support.function",regex:"[a-zA-Z0-9_/]+(?:[:][:])",next:"commandItem"},{token:"support.function",regex:"(?:[:][:])",next:"commandItem"},{token:"paren.rparen",regex:"[\\])}]"},{token:"paren.lparen",regex:"[[({]"},{token:"support.function",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|{\\*}|;|::"},{token:"keyword",regex:"[a-zA-Z0-9_/]+",next:"start"}],commentfollow:[{token:"comment",regex:".*\\\\$",next:"commentfollow"},{token:"comment",regex:".+",next:"start"}],splitlineStart:[{token:"text",regex:"^.",next:"start"}],variable:[{token:"variable.instance",regex:"[a-zA-Z_\\d]+(?:[(][a-zA-Z_\\d]+[)])?",next:"start"},{token:"variable.instance",regex:"{?[a-zA-Z_\\d]+}?",next:"start"}],qqstring:[{token:"string",regex:'(?:[^\\\\]|\\\\.)*?["]',next:"start"},{token:"string",regex:".+"}]}};r.inherits(o,i);t.TclHighlightRules=o});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range;var i=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var i=n.match(/^(\s*\})/);if(!i)return 0;var o=i[1].length;var a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new r(t,0,t,o-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype);t.MatchingBraceOutdent=i});ace.define("ace/mode/tcl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/folding/cstyle","ace/mode/tcl_highlight_rules","ace/mode/matching_brace_outdent","ace/range"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text").Mode;var o=e("./folding/cstyle").FoldMode;var a=e("./tcl_highlight_rules").TclHighlightRules;var s=e("./matching_brace_outdent").MatchingBraceOutdent;var g=e("../range").Range;var c=function(){this.HighlightRules=a;this.$outdent=new s;this.foldingRules=new o;this.$behaviour=this.$defaultBehaviour};r.inherits(c,i);(function(){this.lineCommentStart="#";this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var i=this.getTokenizer().getLineTokens(t,e);var o=i.tokens;if(o.length&&o[o.length-1].type=="comment"){return r}if(e=="start"){var a=t.match(/^.*[\{\(\[]\s*$/);if(a){r+=n}}return r};this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)};this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)};this.$id="ace/mode/tcl";this.snippetFileId="ace/snippets/tcl"}).call(c.prototype);t.Mode=c});(function(){ace.require(["ace/mode/tcl"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-tcl.js.map