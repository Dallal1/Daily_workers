ace.define("ace/mode/fsl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){"use strict";var i=e("../lib/oop");var o=e("./text_highlight_rules").TextHighlightRules;var a=function(){this.$rules={start:[{token:"punctuation.definition.comment.mn",regex:/\/\*/,push:[{token:"punctuation.definition.comment.mn",regex:/\*\//,next:"pop"},{defaultToken:"comment.block.fsl"}]},{token:"comment.line.fsl",regex:/\/\//,push:[{token:"comment.line.fsl",regex:/$/,next:"pop"},{defaultToken:"comment.line.fsl"}]},{token:"entity.name.function",regex:/\${/,push:[{token:"entity.name.function",regex:/}/,next:"pop"},{defaultToken:"keyword.other"}],comment:"js outcalls"},{token:"constant.numeric",regex:/[0-9]*\.[0-9]*\.[0-9]*/,comment:"semver"},{token:"constant.language.fslLanguage",regex:"(?:"+"graph_layout|machine_name|machine_author|machine_license|machine_comment|machine_language"+"|machine_version|machine_reference|npm_name|graph_layout|on_init|on_halt|on_end|on_terminate|on_finalize|on_transition"+"|on_action|on_stochastic_action|on_legal|on_main|on_forced|on_validation|on_validation_failure|on_transition_refused|on_forced_transition_refused"+"|on_action_refused|on_enter|on_exit|start_states|end_states|terminal_states|final_states|fsl_version"+")\\s*:"},{token:"keyword.control.transition.fslArrow",regex:/<->|<-|->|<=>|=>|<=|<~>|~>|<~|<-=>|<=->|<-~>|<~->|<=~>|<~=>/},{token:"constant.numeric.fslProbability",regex:/[0-9]+%/,comment:"edge probability annotation"},{token:"constant.character.fslAction",regex:/\'[^']*\'/,comment:"action annotation"},{token:"string.quoted.double.fslLabel.doublequoted",regex:/\"[^"]*\"/,comment:"fsl label annotation"},{token:"entity.name.tag.fslLabel.atom",regex:/[a-zA-Z0-9_.+&()#@!?,]/,comment:"fsl label annotation"}]};this.normalizeRules()};a.metaData={fileTypes:["fsl","fsl_state"],name:"FSL",scopeName:"source.fsl"};i.inherits(a,o);t.FSLHighlightRules=a});ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){"use strict";var i=e("../../lib/oop");var o=e("../../range").Range;var a=e("./fold_mode").FoldMode;var r=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};i.inherits(r,a);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)){if(!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return""}var o=this._getFoldWidgetBase(e,t,n);if(!o&&this.startRegionRe.test(i))return"start";return o};this.getFoldWidgetRange=function(e,t,n,i){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var a=o.match(this.foldingStartMarker);if(a){var r=a.index;if(a[1])return this.openingBracketBlock(e,a[1],n,r);var s=e.getCommentFoldRange(n,r+a[0].length,1);if(s&&!s.isMultiLine()){if(i){s=this.getSectionRange(e,n)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var a=o.match(this.foldingStopMarker);if(a){var r=a.index+a[0].length;if(a[1])return this.closingBracketBlock(e,a[1],n,r);return e.getCommentFoldRange(n,r,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var i=n.search(/\S/);var a=t;var r=n.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){n=e.getLine(t);var c=n.search(/\S/);if(c===-1)continue;if(i>c)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=a){break}else if(g.isMultiLine()){t=g.end.row}else if(i==c){break}}s=t}return new o(a,r,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,n){var i=t.search(/\s*$/);var a=e.getLength();var r=n;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++n<a){t=e.getLine(n);var c=s.exec(t);if(!c)continue;if(c[1])l--;else l++;if(!l)break}var g=n;if(g>r){return new o(r,i,g,t.length)}}}).call(r.prototype)});ace.define("ace/mode/fsl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/fsl_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){"use strict";var i=e("../lib/oop");var o=e("./text").Mode;var a=e("./fsl_highlight_rules").FSLHighlightRules;var r=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=a;this.foldingRules=new r};i.inherits(s,o);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/fsl";this.snippetFileId="ace/snippets/fsl"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/fsl"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=mode-fsl.js.map