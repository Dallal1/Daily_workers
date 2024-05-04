ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var n=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var i=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},i.getTagRule(),{defaultToken:"comment.doc",caseInsensitive:true}]}};n.inherits(i,o);i.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}};i.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}};i.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}};t.DocCommentHighlightRules=i});ace.define("ace/mode/d_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t,r){"use strict";var n=e("../lib/oop");var o=e("./doc_comment_highlight_rules").DocCommentHighlightRules;var i=e("./text_highlight_rules").TextHighlightRules;var a=function(){var e="this|super|import|module|body|mixin|__traits|invariant|alias|asm|delete|"+"typeof|typeid|sizeof|cast|new|in|is|typedef|__vector|__parameters";var t="break|case|continue|default|do|else|for|foreach|foreach_reverse|goto|if|"+"return|switch|while|catch|try|throw|finally|version|assert|unittest|with";var r="auto|bool|char|dchar|wchar|byte|ubyte|float|double|real|"+"cfloat|creal|cdouble|cent|ifloat|ireal|idouble|"+"int|long|short|void|uint|ulong|ushort|ucent|"+"function|delegate|string|wstring|dstring|size_t|ptrdiff_t|hash_t|Object";var n="abstract|align|debug|deprecated|export|extern|const|final|in|inout|out|"+"ref|immutable|lazy|nothrow|override|package|pragma|private|protected|"+"public|pure|scope|shared|__gshared|synchronized|static|volatile";var i="class|struct|union|template|interface|enum|macro";var a={token:"constant.language.escape",regex:"\\\\(?:(?:x[0-9A-F]{2})|(?:[0-7]{1,3})|(?:['\"\\?0abfnrtv\\\\])|"+"(?:u[0-9a-fA-F]{4})|(?:U[0-9a-fA-F]{8}))"};var s="null|true|false|"+"__DATE__|__EOF__|__TIME__|__TIMESTAMP__|__VENDOR__|__VERSION__|"+"__FILE__|__MODULE__|__LINE__|__FUNCTION__|__PRETTY_FUNCTION__";var g="/|/\\=|&|&\\=|&&|\\|\\|\\=|\\|\\||\\-|\\-\\=|\\-\\-|\\+|"+"\\+\\=|\\+\\+|\\<|\\<\\=|\\<\\<|\\<\\<\\=|\\<\\>|\\<\\>\\=|\\>|\\>\\=|\\>\\>\\=|"+"\\>\\>\\>\\=|\\>\\>|\\>\\>\\>|\\!|\\!\\=|\\!\\<\\>|\\!\\<\\>\\=|\\!\\<|\\!\\<\\=|"+"\\!\\>|\\!\\>\\=|\\?|\\$|\\=|\\=\\=|\\*|\\*\\=|%|%\\=|"+"\\^|\\^\\=|\\^\\^|\\^\\^\\=|~|~\\=|\\=\\>|#";var l=this.$keywords=this.createKeywordMapper({"keyword.modifier":n,"keyword.control":t,"keyword.type":r,keyword:e,"keyword.storage":i,punctation:"\\.|\\,|;|\\.\\.|\\.\\.\\.","keyword.operator":g,"constant.language":s},"identifier");var c="[a-zA-Z_¡-￿][a-zA-Z\\d_¡-￿]*\\b";this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},o.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"star-comment"},{token:"comment.shebang",regex:"^\\s*#!.*"},{token:"comment",regex:"\\/\\+",next:"plus-comment"},{onMatch:function(e,t,r){r.unshift(this.next,e.substr(2));return"string"},regex:'q"(?:[\\[\\(\\{\\<]+)',next:"operator-heredoc-string"},{onMatch:function(e,t,r){r.unshift(this.next,e.substr(2));return"string"},regex:'q"(?:[a-zA-Z_]+)$',next:"identifier-heredoc-string"},{token:"string",regex:'[xr]?"',next:"quote-string"},{token:"string",regex:"[xr]?`",next:"backtick-string"},{token:"string",regex:"[xr]?['](?:(?:\\\\.)|(?:[^'\\\\]))*?['][cdw]?"},{token:["keyword","text","paren.lparen"],regex:/(asm)(\s*)({)/,next:"d-asm"},{token:["keyword","text","paren.lparen","constant.language"],regex:"(__traits)(\\s*)(\\()("+c+")"},{token:["keyword","text","variable.module"],regex:"(import|module)(\\s+)((?:"+c+"\\.?)*)"},{token:["keyword.storage","text","entity.name.type"],regex:"("+i+")(\\s*)("+c+")"},{token:["keyword","text","variable.storage","text"],regex:"(alias|typedef)(\\s*)("+c+")(\\s*)"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F_]+(l|ul|u|f|F|L|U|UL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d[\\d_]*(?:(?:\\.[\\d_]*)?(?:[eE][+-]?[\\d_]+)?)?(l|ul|u|f|F|L|U|UL)?\\b"},{token:"entity.other.attribute-name",regex:"@"+c},{token:l,regex:"[a-zA-Z_][a-zA-Z0-9_]*\\b"},{token:"keyword.operator",regex:g},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\.|\\:"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],"star-comment":[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],"plus-comment":[{token:"comment",regex:"\\+\\/",next:"start"},{defaultToken:"comment"}],"quote-string":[a,{token:"string",regex:'"[cdw]?',next:"start"},{defaultToken:"string"}],"backtick-string":[a,{token:"string",regex:"`[cdw]?",next:"start"},{defaultToken:"string"}],"operator-heredoc-string":[{onMatch:function(e,t,r){e=e.substring(e.length-2,e.length-1);var n={">":"<","]":"[",")":"(","}":"{"};if(Object.keys(n).indexOf(e)!=-1)e=n[e];if(e!=r[1])return"string";r.shift();r.shift();return"string"},regex:'(?:[\\]\\)}>]+)"',next:"start"},{token:"string",regex:"[^\\]\\)}>]+"}],"identifier-heredoc-string":[{onMatch:function(e,t,r){e=e.substring(0,e.length-1);if(e!=r[1])return"string";r.shift();r.shift();return"string"},regex:'^(?:[A-Za-z_][a-zA-Z0-9]+)"',next:"start"},{token:"string",regex:"[^\\]\\)}>]+"}],"d-asm":[{token:"paren.rparen",regex:"\\}",next:"start"},{token:"keyword.instruction",regex:"[a-zA-Z]+",next:"d-asm-instruction"},{token:"text",regex:"\\s+"}],"d-asm-instruction":[{token:"constant.language",regex:/AL|AH|AX|EAX|BL|BH|BX|EBX|CL|CH|CX|ECX|DL|DH|DX|EDX|BP|EBP|SP|ESP|DI|EDI|SI|ESI/i},{token:"identifier",regex:"[a-zA-Z]+"},{token:"string",regex:'"[^"]*"'},{token:"comment",regex:"//.*$"},{token:"constant.numeric",regex:"[0-9.xA-F]+"},{token:"punctuation.operator",regex:"\\,"},{token:"punctuation.operator",regex:";",next:"d-asm"},{token:"text",regex:"\\s+"}]};this.embedRules(o,"doc-",[o.getEndRule("start")])};a.metaData={comment:"D language",fileTypes:["d","di"],firstLineMatch:"^#!.*\\b[glr]?dmd\\b.",foldingStartMarker:"(?x)/\\*\\*(?!\\*)|^(?![^{]*?//|[^{]*?/\\*(?!.*?\\*/.*?\\{)).*?\\{\\s*($|//|/\\*(?!.*?\\*/.*\\S))",foldingStopMarker:"(?<!\\*)\\*\\*/|^\\s*\\}",keyEquivalent:"^~D",name:"D",scopeName:"source.d"};n.inherits(a,i);t.DHighlightRules=a});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,r){"use strict";var n=e("../../lib/oop");var o=e("../../range").Range;var i=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};n.inherits(a,i);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,r){var n=e.getLine(r);if(this.singleLineBlockCommentRe.test(n)){if(!this.startRegionRe.test(n)&&!this.tripleStarBlockCommentRe.test(n))return""}var o=this._getFoldWidgetBase(e,t,r);if(!o&&this.startRegionRe.test(n))return"start";return o};this.getFoldWidgetRange=function(e,t,r,n){var o=e.getLine(r);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,r);var i=o.match(this.foldingStartMarker);if(i){var a=i.index;if(i[1])return this.openingBracketBlock(e,i[1],r,a);var s=e.getCommentFoldRange(r,a+i[0].length,1);if(s&&!s.isMultiLine()){if(n){s=this.getSectionRange(e,r)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var i=o.match(this.foldingStopMarker);if(i){var a=i.index+i[0].length;if(i[1])return this.closingBracketBlock(e,i[1],r,a);return e.getCommentFoldRange(r,a,-1)}};this.getSectionRange=function(e,t){var r=e.getLine(t);var n=r.search(/\S/);var i=t;var a=r.length;t=t+1;var s=t;var g=e.getLength();while(++t<g){r=e.getLine(t);var l=r.search(/\S/);if(l===-1)continue;if(n>l)break;var c=this.getFoldWidgetRange(e,"all",t);if(c){if(c.start.row<=i){break}else if(c.isMultiLine()){t=c.end.row}else if(n==l){break}}s=t}return new o(i,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,r){var n=t.search(/\s*$/);var i=e.getLength();var a=r;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var g=1;while(++r<i){t=e.getLine(r);var l=s.exec(t);if(!l)continue;if(l[1])g--;else g++;if(!g)break}var c=r;if(c>a){return new o(a,n,c,t.length)}}}).call(a.prototype)});ace.define("ace/mode/d",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/d_highlight_rules","ace/mode/folding/cstyle"],function(e,t,r){"use strict";var n=e("../lib/oop");var o=e("./text").Mode;var i=e("./d_highlight_rules").DHighlightRules;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=i;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};n.inherits(s,o);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/d"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/d"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-d.js.map