ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var i=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},i.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]}};r.inherits(i,o);i.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}};i.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}};i.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}};t.DocCommentHighlightRules=i});ace.define("ace/mode/sac_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./doc_comment_highlight_rules").DocCommentHighlightRules;var i=e("./text_highlight_rules").TextHighlightRules;var a=function(){var e="break|continue|do|else|for|if|"+"return|with|while|use|class|all|void";var t="bool|char|complex|double|float|"+"byte|int|short|long|longlong|"+"ubyte|uint|ushort|ulong|ulonglong|"+"struct|typedef";var n="inline|external|specialize";var r="step|width";var i="true|false";var a=this.$keywords=this.createKeywordMapper({"keyword.control":e,"storage.type":t,"storage.modifier":n,"keyword.operator":r,"constant.language":i},"identifier");var s="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b";var l=/\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source;var g="%"+/(\d+\$)?/.source+/[#0\- +']*/.source+/[,;:_]?/.source+/((-?\d+)|\*(-?\d+\$)?)?/.source+/(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source+/(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source+/(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source;this.$rules={start:[{token:"comment",regex:"//$",next:"start"},{token:"comment",regex:"//",next:"singleLineComment"},o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:"'(?:"+l+"|.)?'"},{token:"string.start",regex:'"',stateName:"qqstring",next:[{token:"string",regex:/\\\s*$/,next:"qqstring"},{token:"constant.language.escape",regex:l},{token:"constant.language.escape",regex:g},{token:"string.end",regex:'"|$',next:"start"},{defaultToken:"string"}]},{token:"string.start",regex:'R"\\(',stateName:"rawString",next:[{token:"string.end",regex:'\\)"',next:"start"},{defaultToken:"string"}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"keyword",regex:"#\\s*(?:include|import|pragma|line|define|undef)\\b",next:"directive"},{token:"keyword",regex:"#\\s*(?:endif|if|ifdef|else|elif|ifndef)\\b"},{token:"support.function",regex:"fold|foldfix|genarray|modarray|propagate"},{token:a,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*"},{token:"keyword.operator",regex:/--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],singleLineComment:[{token:"comment",regex:/\\$/,next:"singleLineComment"},{token:"comment",regex:/$/,next:"start"},{defaultToken:"comment"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]};this.embedRules(o,"doc-",[o.getEndRule("start")]);this.normalizeRules()};r.inherits(a,i);t.sacHighlightRules=a});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop");var o=e("../../range").Range;var i=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(a,i);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var o=this._getFoldWidgetBase(e,t,n);if(!o&&this.startRegionRe.test(r))return"start";return o};this.getFoldWidgetRange=function(e,t,n,r){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,a);var s=e.getCommentFoldRange(n,a+i[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;if(i[1])return this.closingBracketBlock(e,i[1],n,a);return e.getCommentFoldRange(n,a,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var i=t;var a=n.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){n=e.getLine(t);var g=n.search(/\S/);if(g===-1)continue;if(r>g)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=i){break}else if(c.isMultiLine()){t=c.end.row}else if(r==g){break}}s=t}return new o(i,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var i=e.getLength();var a=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++n<i){t=e.getLine(n);var g=s.exec(t);if(!g)continue;if(g[1])l--;else l++;if(!l)break}var c=n;if(c>a){return new o(a,r,c,t.length)}}}).call(a.prototype)});ace.define("ace/mode/sac",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sac_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop");var o=e("./text").Mode;var i=e("./sac_highlight_rules").sacHighlightRules;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=i;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};r.inherits(s,o);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/sac"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/sac"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-sac.js.map