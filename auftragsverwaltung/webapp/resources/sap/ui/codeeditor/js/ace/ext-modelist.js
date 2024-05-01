ace.define("ace/ext/modelist",["require","exports","module"],function(e,s,t){"use strict";var a=[];function l(e){var s=c.text;var t=e.split(/[\/\\]/).pop();for(var l=0;l<a.length;l++){if(a[l].supportsFile(t)){s=a[l];break}}return s}var r=function(){function e(e,s,t){this.name=e;this.caption=s;this.mode="ace/mode/"+e;this.extensions=t;var a;if(/\^/.test(t)){a=t.replace(/\|(\^)?/g,function(e,s){return"$|"+(s?"^":"^.*\\.")})+"$"}else{a="^.*\\.("+t+")$"}this.extRe=new RegExp(a,"gi")}e.prototype.supportsFile=function(e){return e.match(this.extRe)};return e}();var o={ABAP:["abap"],ABC:["abc"],ActionScript:["as"],ADA:["ada|adb"],Alda:["alda"],Apache_Conf:["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],Apex:["apex|cls|trigger|tgr"],AQL:["aql"],AsciiDoc:["asciidoc|adoc"],ASL:["dsl|asl|asl.json"],Assembly_x86:["asm|a"],Astro:["astro"],AutoHotKey:["ahk"],BatchFile:["bat|cmd"],BibTeX:["bib"],C_Cpp:["cpp|c|cc|cxx|h|hh|hpp|ino"],C9Search:["c9search_results"],Cirru:["cirru|cr"],Clojure:["clj|cljs"],Cobol:["CBL|COB"],coffee:["coffee|cf|cson|^Cakefile"],ColdFusion:["cfm|cfc"],Crystal:["cr"],CSharp:["cs"],Csound_Document:["csd"],Csound_Orchestra:["orc"],Csound_Score:["sco"],CSS:["css"],Curly:["curly"],Cuttlefish:["conf"],D:["d|di"],Dart:["dart"],Diff:["diff|patch"],Django:["djt|html.djt|dj.html|djhtml"],Dockerfile:["^Dockerfile"],Dot:["dot"],Drools:["drl"],Edifact:["edi"],Eiffel:["e|ge"],EJS:["ejs"],Elixir:["ex|exs"],Elm:["elm"],Erlang:["erl|hrl"],Flix:["flix"],Forth:["frt|fs|ldr|fth|4th"],Fortran:["f|f90"],FSharp:["fsi|fs|ml|mli|fsx|fsscript"],FSL:["fsl"],FTL:["ftl"],Gcode:["gcode"],Gherkin:["feature"],Gitignore:["^.gitignore"],Glsl:["glsl|frag|vert"],Gobstones:["gbs"],golang:["go"],GraphQLSchema:["gql"],Groovy:["groovy"],HAML:["haml"],Handlebars:["hbs|handlebars|tpl|mustache"],Haskell:["hs"],Haskell_Cabal:["cabal"],haXe:["hx"],Hjson:["hjson"],HTML:["html|htm|xhtml|vue|we|wpy"],HTML_Elixir:["eex|html.eex"],HTML_Ruby:["erb|rhtml|html.erb"],INI:["ini|conf|cfg|prefs"],Io:["io"],Ion:["ion"],Jack:["jack"],Jade:["jade|pug"],Java:["java"],JavaScript:["js|jsm|jsx|cjs|mjs"],JEXL:["jexl"],JSON:["json"],JSON5:["json5"],JSONiq:["jq"],JSP:["jsp"],JSSM:["jssm|jssm_state"],JSX:["jsx"],Julia:["jl"],Kotlin:["kt|kts"],LaTeX:["tex|latex|ltx|bib"],Latte:["latte"],LESS:["less"],Liquid:["liquid"],Lisp:["lisp"],LiveScript:["ls"],Log:["log"],LogiQL:["logic|lql"],Logtalk:["lgt"],LSL:["lsl"],Lua:["lua"],LuaPage:["lp"],Lucene:["lucene"],Makefile:["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],Markdown:["md|markdown"],Mask:["mask"],MATLAB:["matlab"],Maze:["mz"],MediaWiki:["wiki|mediawiki"],MEL:["mel"],MIPS:["s|asm"],MIXAL:["mixal"],MUSHCode:["mc|mush"],MySQL:["mysql"],Nasal:["nas"],Nginx:["nginx|conf"],Nim:["nim"],Nix:["nix"],NSIS:["nsi|nsh"],Nunjucks:["nunjucks|nunjs|nj|njk"],ObjectiveC:["m|mm"],OCaml:["ml|mli"],Odin:["odin"],PartiQL:["partiql|pql"],Pascal:["pas|p"],Perl:["pl|pm"],pgSQL:["pgsql"],PHP:["php|inc|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module"],PHP_Laravel_blade:["blade.php"],Pig:["pig"],PLSQL:["plsql"],Powershell:["ps1"],Praat:["praat|praatscript|psc|proc"],Prisma:["prisma"],Prolog:["plg|prolog"],Properties:["properties"],Protobuf:["proto"],PRQL:["prql"],Puppet:["epp|pp"],Python:["py"],QML:["qml"],R:["r"],Raku:["raku|rakumod|rakutest|p6|pl6|pm6"],Razor:["cshtml|asp"],RDoc:["Rd"],Red:["red|reds"],RHTML:["Rhtml"],Robot:["robot|resource"],RST:["rst"],Ruby:["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],Rust:["rs"],SaC:["sac"],SASS:["sass"],SCAD:["scad"],Scala:["scala|sbt"],Scheme:["scm|sm|rkt|oak|scheme"],Scrypt:["scrypt"],SCSS:["scss"],SH:["sh|bash|^.bashrc"],SJS:["sjs"],Slim:["slim|skim"],Smarty:["smarty|tpl"],Smithy:["smithy"],snippets:["snippets"],Soy_Template:["soy"],Space:["space"],SPARQL:["rq"],SQL:["sql"],SQLServer:["sqlserver"],Stylus:["styl|stylus"],SVG:["svg"],Swift:["swift"],Tcl:["tcl"],Terraform:["tf","tfvars","terragrunt"],Tex:["tex"],Text:["txt"],Textile:["textile"],Toml:["toml"],TSX:["tsx"],Turtle:["ttl"],Twig:["twig|swig"],Typescript:["ts|mts|cts|typescript|str"],Vala:["vala"],VBScript:["vbs|vb"],Velocity:["vm"],Verilog:["v|vh|sv|svh"],VHDL:["vhd|vhdl"],Visualforce:["vfp|component|page"],Wollok:["wlk|wpgm|wtest"],XML:["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],XQuery:["xq"],YAML:["yaml|yml"],Zeek:["zeek|bro"]};var i={ObjectiveC:"Objective-C",CSharp:"C#",golang:"Go",C_Cpp:"C and C++",Csound_Document:"Csound Document",Csound_Orchestra:"Csound",Csound_Score:"Csound Score",coffee:"CoffeeScript",HTML_Ruby:"HTML (Ruby)",HTML_Elixir:"HTML (Elixir)",FTL:"FreeMarker",PHP_Laravel_blade:"PHP (Blade Template)",Perl6:"Perl 6",AutoHotKey:"AutoHotkey / AutoIt"};var c={};for(var p in o){var m=o[p];var n=(i[p]||p).replace(/_/g," ");var u=p.toLowerCase();var h=new r(u,n,m[0]);c[u]=h;a.push(h)}t.exports={getModeForPath:l,modes:a,modesByName:c}});(function(){ace.require(["ace/ext/modelist"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();
//# sourceMappingURL=ext-modelist.js.map