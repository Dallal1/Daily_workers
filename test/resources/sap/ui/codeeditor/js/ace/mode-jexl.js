ace.define("ace/mode/jexl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./text_highlight_rules").TextHighlightRules;var o=function(){var e="return|var|function|and|or|not|if|for|while|do|continue|break";var t="null";var n="empty|size|new";var r=this.createKeywordMapper({keyword:e,"constant.language":t,"support.function":n},"identifier");var i="\\\\(?:x[0-9a-fA-F]{2}|"+"u[0-9a-fA-F]{4}|"+"u{[0-9a-fA-F]{1,6}}|"+"|.)";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},{token:"comment",regex:"##.*$"},{token:"comment",regex:"\\/\\*",next:"comment"},{token:["comment","text"],regex:"(#pragma)(\\s.*$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"`",push:[{token:"constant.language.escape",regex:i},{token:"string",regex:"`",next:"pop"},{token:"lparen",regex:"\\${",push:[{token:"rparen",regex:"}",next:"pop"},{include:"start"}]},{defaultToken:"string"}]},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/},{token:"constant.numeric",regex:/[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"string.regexp",regex:"~/",push:[{token:"constant.language.escape",regex:"\\\\/"},{token:"string.regexp",regex:"$|/",next:"pop"},{defaultToken:"string.regexp"}]},{token:r,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"&&|\\|\\||!|&|\\||\\^|~|\\?|:|\\?\\?|==|!=|<|<=|>|>=|=~|!~|=\\^|=\\$|!\\$|\\+|\\-|\\*|%|\\/|="},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"},{token:"punctuation",regex:"[,.]"},{token:"storage.type.annotation",regex:"@[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]};this.normalizeRules()};r.inherits(o,i);t.JexlHighlightRules=o});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var r=e("../../lib/oop");var i=e("../../range").Range;var o=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(a,o);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var i=this._getFoldWidgetBase(e,t,n);if(!i&&this.startRegionRe.test(r))return"start";return i};this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var o=i.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,a);var s=e.getCommentFoldRange(n,a+o[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var o=i.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;if(o[1])return this.closingBracketBlock(e,o[1],n,a);return e.getCommentFoldRange(n,a,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var r=n.search(/\S/);var o=t;var a=n.length;t=t+1;var s=t;var g=e.getLength();while(++t<g){n=e.getLine(t);var l=n.search(/\S/);if(l===-1)continue;if(r>l)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=o){break}else if(c.isMultiLine()){t=c.end.row}else if(r==l){break}}s=t}return new i(o,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/);var o=e.getLength();var a=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var g=1;while(++n<o){t=e.getLine(n);var l=s.exec(t);if(!l)continue;if(l[1])g--;else g++;if(!g)break}var c=n;if(c>a){return new i(a,r,c,t.length)}}}).call(a.prototype)});ace.define("ace/mode/jexl",["require","exports","module","ace/lib/oop","ace/mode/jexl_highlight_rules","ace/mode/text","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var r=e("../lib/oop");var i=e("./jexl_highlight_rules").JexlHighlightRules;var o=e("./text").Mode;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=i;this.$behaviour=this.$defaultBehaviour;this.foldingRules=new a};r.inherits(s,o);(function(){this.lineCommentStart=["//","##"];this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/jexl"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/jexl"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-jexl.js.map