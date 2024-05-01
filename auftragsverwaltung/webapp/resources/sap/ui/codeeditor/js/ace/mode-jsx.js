ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},o.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]}};r.inherits(o,i);o.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}};o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}};o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}};t.DocCommentHighlightRules=o});ace.define("ace/mode/jsx_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop");var i=e("../lib/lang");var o=e("./doc_comment_highlight_rules").DocCommentHighlightRules;var a=e("./text_highlight_rules").TextHighlightRules;var s=function(){var e=i.arrayToMap(("break|do|instanceof|typeof|case|else|new|var|catch|finally|return|void|continue|for|switch|default|while|function|this|"+"if|throw|"+"delete|in|try|"+"class|extends|super|import|from|into|implements|interface|static|mixin|override|abstract|final|"+"number|int|string|boolean|variant|"+"log|assert").split("|"));var t=i.arrayToMap("null|true|false|NaN|Infinity|__FILE__|__LINE__|undefined".split("|"));var n=i.arrayToMap(("debugger|with|"+"const|export|"+"let|private|public|yield|protected|"+"extern|native|as|operator|__fake__|__readonly__").split("|"));var r="[a-zA-Z_][a-zA-Z0-9_]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:["storage.type","text","entity.name.function"],regex:"(function)(\\s+)("+r+")"},{token:function(r){if(r=="this")return"variable.language";else if(r=="function")return"storage.type";else if(e.hasOwnProperty(r)||n.hasOwnProperty(r))return"keyword";else if(t.hasOwnProperty(r))return"constant.language";else if(/^_?[A-Z][a-zA-Z0-9_]*$/.test(r))return"language.support.class";else return"identifier"},regex:r},{token:"keyword.operator",regex:"!|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({<]"},{token:"paren.rparen",regex:"[\\])}>]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]};this.embedRules(o,"doc-",[o.getEndRule("start")])};r.inherits(s,a);t.JsxHighlightRules=s});ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t,n){"use strict";var r=e("../range").Range;var i=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var i=n.match(/^(\s*\})/);if(!i)return 0;var o=i[1].length;var a=e.findMatchingBracket({row:t,column:o});if(!a||a.row==t)return 0;var s=this.$getIndent(e.getLine(a.row));e.replace(new r(t,0,t,o-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype);t.MatchingBraceOutdent=i});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop");var i=e("../../range").Range;var o=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(a,o);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var i=this._getFoldWidgetBase(e,t,n);if(!i&&this.startRegionRe.test(r))return"start";return i};this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var o=i.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,a);var s=e.getCommentFoldRange(n,a+o[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var o=i.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;if(o[1])return this.closingBracketBlock(e,o[1],n,a);return e.getCommentFoldRange(n,a,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var o=t;var a=n.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){n=e.getLine(t);var g=n.search(/\S/);if(g===-1)continue;if(r>g)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=o){break}else if(c.isMultiLine()){t=c.end.row}else if(r==g){break}}s=t}return new i(o,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var o=e.getLength();var a=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++n<o){t=e.getLine(n);var g=s.exec(t);if(!g)continue;if(g[1])l--;else l++;if(!l)break}var c=n;if(c>a){return new i(a,r,c,t.length)}}}).call(a.prototype)});ace.define("ace/mode/jsx",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/jsx_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text").Mode;var o=e("./jsx_highlight_rules").JsxHighlightRules;var a=e("./matching_brace_outdent").MatchingBraceOutdent;var s=e("./folding/cstyle").FoldMode;function l(){this.HighlightRules=o;this.$outdent=new a;this.$behaviour=this.$defaultBehaviour;this.foldingRules=new s}r.inherits(l,i);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);var i=this.getTokenizer().getLineTokens(t,e);var o=i.tokens;if(o.length&&o[o.length-1].type=="comment"){return r}if(e=="start"){var a=t.match(/^.*[\{\(\[]\s*$/);if(a){r+=n}}return r};this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)};this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)};this.$id="ace/mode/jsx"}).call(l.prototype);t.Mode=l});(function(){ace.require(["ace/mode/jsx"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-jsx.js.map