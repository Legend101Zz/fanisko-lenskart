(function(){"use strict";var e={function:!0,object:!0},t=e[typeof window]&&window||this,i=e[typeof exports]&&exports,r=e[typeof module]&&module&&!module.nodeType&&module,n=i&&r&&"object"==typeof global&&global;n&&(n.global===n||n.window===n||n.self===n)&&(t=n);var a=/\bOpera/,o=Object.prototype,l=o.hasOwnProperty,s=o.toString;function b(e){return(e=String(e)).charAt(0).toUpperCase()+e.slice(1)}function c(e){return e=_(e),/^(?:webOS|i(?:OS|P))/.test(e)?e:b(e)}function p(e,t){for(var i in e)l.call(e,i)&&t(e[i],i,e)}function d(e){return null==e?b(e):s.call(e).slice(8,-1)}function u(e){return String(e).replace(/([ -])(?!$)/g,"$1?")}function f(e,t){var i=null;return!function e(t,i){var r=-1,n=t?t.length:0;if("number"==typeof n&&n>-1&&n<=9007199254740991)for(;++r<n;)i(t[r],r,t);else p(t,i)}(e,function(r,n){i=t(i,r,n,e)}),i}function _(e){return String(e).replace(/^ +| +$/g,"")}var S=function e(i){var r,n,o=t,l=i&&"object"==typeof i&&"String"!=d(i);l&&(o=i,i=null);var b,S,h,m,$=o.navigator||{},x=$.userAgent||"";i||(i=x);var O=l?!!$.likeChrome:/\bChrome\b/.test(i)&&!/internal|\n/i.test(s.toString()),y="Object",g=l&&o.java?"JavaPackage":d(o.java),M=/\bJava/.test(g)&&o.java,v=M&&d(o.environment)==(l?y:"Environment"),w=o.document||{},P=o.operamini||o.opera,C=a.test(C=l&&P?P["[[Class]]"]:d(P))?C:P=null,B=i,E=[],W=null,k=i==x,A=k&&P&&"function"==typeof P.version&&P.version(),I=(b=[{label:"EdgeHTML",pattern:"Edge"},"Trident",{label:"WebKit",pattern:"AppleWebKit"},"iCab","Presto","NetFront","Tasman","KHTML","Gecko"],f(b,function(e,t){return e||RegExp("\\b"+(t.pattern||u(t))+"\\b","i").exec(i)&&(t.label||t)})),T=(S=["Adobe AIR","Arora","Avant Browser","Breach","Camino","Electron","Epiphany","Fennec","Flock","Galeon","GreenBrowser","iCab","Iceweasel","K-Meleon","Konqueror","Lunascape","Maxthon",{label:"Microsoft Edge",pattern:"(?:Edge|Edg|EdgA|EdgiOS)"},"Midori","Nook Browser","PaleMoon","PhantomJS","Raven","Rekonq","RockMelt",{label:"Samsung Internet",pattern:"SamsungBrowser"},"SeaMonkey",{label:"Silk",pattern:"(?:Cloud9|Silk-Accelerated)"},"Sleipnir","SlimBrowser",{label:"SRWare Iron",pattern:"Iron"},"Sunrise","Swiftfox","Vivaldi","Waterfox","WebPositive",{label:"Yandex Browser",pattern:"YaBrowser"},{label:"UC Browser",pattern:"UCBrowser"},"Opera Mini",{label:"Opera Mini",pattern:"OPiOS"},"Opera",{label:"Opera",pattern:"OPR"},"Chromium","Chrome",{label:"Chrome",pattern:"(?:HeadlessChrome)"},{label:"Chrome Mobile",pattern:"(?:CriOS|CrMo)"},{label:"Firefox",pattern:"(?:Firefox|Minefield)"},{label:"Firefox for iOS",pattern:"FxiOS"},{label:"IE",pattern:"IEMobile"},{label:"IE",pattern:"MSIE"},"Safari"],f(S,function(e,t){return e||RegExp("\\b"+(t.pattern||u(t))+"\\b","i").exec(i)&&(t.label||t)})),G=K([{label:"BlackBerry",pattern:"BB10"},"BlackBerry",{label:"Galaxy S",pattern:"GT-I9000"},{label:"Galaxy S2",pattern:"GT-I9100"},{label:"Galaxy S3",pattern:"GT-I9300"},{label:"Galaxy S4",pattern:"GT-I9500"},{label:"Galaxy S5",pattern:"SM-G900"},{label:"Galaxy S6",pattern:"SM-G920"},{label:"Galaxy S6 Edge",pattern:"SM-G925"},{label:"Galaxy S7",pattern:"SM-G930"},{label:"Galaxy S7 Edge",pattern:"SM-G935"},"Google TV","Lumia","iPad","iPod","iPhone","Kindle",{label:"Kindle Fire",pattern:"(?:Cloud9|Silk-Accelerated)"},"Nexus","Nook","PlayBook","PlayStation Vita","PlayStation","TouchPad","Transformer",{label:"Wii U",pattern:"WiiU"},"Wii","Xbox One",{label:"Xbox 360",pattern:"Xbox"},"Xoom"]),F=(h={Apple:{iPad:1,iPhone:1,iPod:1},Alcatel:{},Archos:{},Amazon:{Kindle:1,"Kindle Fire":1},Asus:{Transformer:1},"Barnes & Noble":{Nook:1},BlackBerry:{PlayBook:1},Google:{"Google TV":1,Nexus:1},HP:{TouchPad:1},HTC:{},Huawei:{},Lenovo:{},LG:{},Microsoft:{Xbox:1,"Xbox One":1},Motorola:{Xoom:1},Nintendo:{"Wii U":1,Wii:1},Nokia:{Lumia:1},Oppo:{},Samsung:{"Galaxy S":1,"Galaxy S2":1,"Galaxy S3":1,"Galaxy S4":1},Sony:{PlayStation:1,"PlayStation Vita":1},Xiaomi:{Mi:1,Redmi:1}},f(h,function(e,t,r){return e||(t[G]||t[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)]||RegExp("\\b"+u(r)+"(?:\\b|\\w*\\d)","i").exec(i))&&r})),X=(m=["Windows Phone","KaiOS","Android","CentOS",{label:"Chrome OS",pattern:"CrOS"},"Debian",{label:"DragonFly BSD",pattern:"DragonFly"},"Fedora","FreeBSD","Gentoo","Haiku","Kubuntu","Linux Mint","OpenBSD","Red Hat","SuSE","Ubuntu","Xubuntu","Cygwin","Symbian OS","hpwOS","webOS ","webOS","Tablet OS","Tizen","Linux","Mac OS X","Macintosh","Mac","Windows 98;","Windows "],f(m,function(e,t){var r,n,a,o,l=t.pattern||u(t);return!e&&(e=RegExp("\\b"+l+"(?:/[\\d.]+|[ \\w.]*)","i").exec(i))&&(e=(r=e,n=l,a=t.label||t,o={"10.0":"10","6.4":"10 Technical Preview","6.3":"8.1","6.2":"8","6.1":"Server 2008 R2 / 7","6.0":"Server 2008 / Vista","5.2":"Server 2003 / XP 64-bit","5.1":"XP","5.01":"2000 SP1","5.0":"2000","4.0":"NT","4.90":"ME"},n&&a&&/^Win/i.test(r)&&!/^Windows Phone /i.test(r)&&(o=o[/[\d.]+$/.exec(r)])&&(r="Windows "+o),r=String(r),n&&a&&(r=r.replace(RegExp(n,"i"),a)),r=c(r.replace(/ ce$/i," CE").replace(/\bhpw/i,"web").replace(/\bMacintosh\b/,"Mac OS").replace(/_PowerPC\b/i," OS").replace(/\b(OS X) [^ \d]+/i,"$1").replace(/\bMac (OS X)\b/,"$1").replace(/\/(\d)/," $1").replace(/_/g,".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i,"").replace(/\bx86\.64\b/gi,"x86_64").replace(/\b(Windows Phone) OS\b/,"$1").replace(/\b(Chrome OS \w+) [\d.]+\b/,"$1").split(" on ")[0]))),e}));function K(e){return f(e,function(e,t){var r=t.pattern||u(t);return!e&&(e=RegExp("\\b"+r+" *\\d+[.\\w_]*","i").exec(i)||RegExp("\\b"+r+" *\\w+-[\\w]*","i").exec(i)||RegExp("\\b"+r+"(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)","i").exec(i))&&((e=String(t.label&&!RegExp(r,"i").test(t.label)?t.label:e).split("/"))[1]&&!/[\d.]+/.test(e[0])&&(e[0]+=" "+e[1]),t=t.label||t,e=c(e[0].replace(RegExp(r,"i"),t).replace(RegExp("; *(?:"+t+"[_-])?","i")," ").replace(RegExp("("+t+")[-_.]?(\\w)","i"),"$1 $2"))),e})}function N(e){return f(e,function(e,t){return e||(RegExp(t+"(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)","i").exec(i)||0)[1]||null})}if(I&&(I=[I]),/\bAndroid\b/.test(X)&&!G&&(r=/\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(i))&&(G=_(r[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i,"")||null),F&&!G?G=K([F]):F&&G&&(G=G.replace(RegExp("^("+u(F)+")[-_.\\s]","i"),F+" ").replace(RegExp("^("+u(F)+")[-_.]?(\\w)","i"),F+" $2")),(r=/\bGoogle TV\b/.exec(G))&&(G=r[0]),/\bSimulator\b/i.test(i)&&(G=(G?G+" ":"")+"Simulator"),"Opera Mini"==T&&/\bOPiOS\b/.test(i)&&E.push("running in Turbo/Uncompressed mode"),"IE"==T&&/\blike iPhone OS\b/.test(i)?(F=(r=e(i.replace(/like iPhone OS/,""))).manufacturer,G=r.product):/^iP/.test(G)?(T||(T="Safari"),X="iOS"+((r=/ OS ([\d_]+)/i.exec(i))?" "+r[1].replace(/_/g,"."):"")):"Konqueror"==T&&/^Linux\b/i.test(X)?X="Kubuntu":F&&"Google"!=F&&(/Chrome/.test(T)&&!/\bMobile Safari\b/i.test(i)||/\bVita\b/.test(G))||/\bAndroid\b/.test(X)&&/^Chrome/.test(T)&&/\bVersion\//i.test(i)?(T="Android Browser",X=/\bAndroid\b/.test(X)?X:"Android"):"Silk"==T?(/\bMobi/i.test(i)||(X="Android",E.unshift("desktop mode")),/Accelerated *= *true/i.test(i)&&E.unshift("accelerated")):"UC Browser"==T&&/\bUCWEB\b/.test(i)?E.push("speed mode"):"PaleMoon"==T&&(r=/\bFirefox\/([\d.]+)\b/.exec(i))?E.push("identifying as Firefox "+r[1]):"Firefox"==T&&(r=/\b(Mobile|Tablet|TV)\b/i.exec(i))?(X||(X="Firefox OS"),G||(G=r[1])):!T||(r=!/\bMinefield\b/i.test(i)&&/\b(?:Firefox|Safari)\b/.exec(T))?(T&&!G&&/[\/,]|^[^(]+?\)/.test(i.slice(i.indexOf(r+"/")+8))&&(T=null),(r=G||F||X)&&(G||F||/\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(X))&&(T=/[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(X)?X:r)+" Browser")):"Electron"==T&&(r=(/\bChrome\/([\d.]+)\b/.exec(i)||0)[1])&&E.push("Chromium "+r),A||(A=N(["(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)","Version",u(T),"(?:Firefox|Minefield|NetFront)"])),(r="iCab"==I&&parseFloat(A)>3&&"WebKit"||/\bOpera\b/.test(T)&&(/\bOPR\b/.test(i)?"Blink":"Presto")||/\b(?:Midori|Nook|Safari)\b/i.test(i)&&!/^(?:Trident|EdgeHTML)$/.test(I)&&"WebKit"||!I&&/\bMSIE\b/i.test(i)&&("Mac OS"==X?"Tasman":"Trident")||"WebKit"==I&&/\bPlayStation\b(?! Vita\b)/i.test(T)&&"NetFront")&&(I=[r]),"IE"==T&&(r=(/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(i)||0)[1])?(T+=" Mobile",X="Windows Phone "+(/\+$/.test(r)?r:r+".x"),E.unshift("desktop mode")):/\bWPDesktop\b/i.test(i)?(T="IE Mobile",X="Windows Phone 8.x",E.unshift("desktop mode"),A||(A=(/\brv:([\d.]+)/.exec(i)||0)[1])):"IE"!=T&&"Trident"==I&&(r=/\brv:([\d.]+)/.exec(i))&&(T&&E.push("identifying as "+T+(A?" "+A:"")),T="IE",A=r[1]),k){var R,j,V="global";if(j=null!=(R=o)?typeof R[V]:"number",/^(?:boolean|number|string|undefined)$/.test(j)||"object"==j&&!R[V])d(r=o.runtime)==(l?y:"ScriptBridgingProxyObject")?(T="Adobe AIR",X=r.flash.system.Capabilities.os):d(r=o.phantom)==(l?y:"RuntimeObject")?(T="PhantomJS",A=(r=r.version||null)&&r.major+"."+r.minor+"."+r.patch):"number"==typeof w.documentMode&&(r=/\bTrident\/(\d+)/i.exec(i))?(A=[A,w.documentMode],(r=+r[1]+4)!=A[1]&&(E.push("IE "+A[1]+" mode"),I&&(I[1]=""),A[1]=r),A="IE"==T?String(A[1].toFixed(1)):A[0]):"number"==typeof w.documentMode&&/^(?:Chrome|Firefox)\b/.test(T)&&(E.push("masking as "+T+" "+A),T="IE",A="11.0",I=["Trident"],X="Windows");else if(M&&(B=(r=M.lang.System).getProperty("os.arch"),X=X||r.getProperty("os.name")+" "+r.getProperty("os.version")),v){try{A=o.require("ringo/engine").version.join("."),T="RingoJS"}catch(z){(r=o.system)&&r.global.system==o.system&&(T="Narwhal",X||(X=r[0].os||null))}T||(T="Rhino")}else"object"==typeof o.process&&!o.process.browser&&(r=o.process)&&("object"==typeof r.versions&&("string"==typeof r.versions.electron?(E.push("Node "+r.versions.node),T="Electron",A=r.versions.electron):"string"==typeof r.versions.nw&&(E.push("Chromium "+A,"Node "+r.versions.node),T="NW.js",A=r.versions.nw)),T||(T="Node.js",B=r.arch,X=r.platform,A=(A=/[\d.]+/.exec(r.version))?A[0]:null));X=X&&c(X)}if(A&&(r=/(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A)||/(?:alpha|beta)(?: ?\d)?/i.exec(i+";"+(k&&$.appMinorVersion))||/\bMinefield\b/i.test(i)&&"a")&&(W=/b/i.test(r)?"beta":"alpha",A=A.replace(RegExp(r+"\\+?$"),"")+("beta"==W?M?"b":"β":M?"a":"α")+(/\d+\+?/.exec(r)||"")),"Fennec"==T||"Firefox"==T&&/\b(?:Android|Firefox OS|KaiOS)\b/.test(X))T="Firefox Mobile";else if("Maxthon"==T&&A)A=A.replace(/\.[\d.]+/,".x");else if(/\bXbox\b/i.test(G))"Xbox 360"==G&&(X=null),"Xbox 360"==G&&/\bIEMobile\b/.test(i)&&E.unshift("mobile mode");else if((/^(?:Chrome|IE|Opera)$/.test(T)||T&&!G&&!/Browser|Mobi/.test(T))&&("Windows CE"==X||/Mobi/i.test(i)))T+=" Mobile";else if("IE"==T&&k)try{null===o.external&&E.unshift("platform preview")}catch(H){E.unshift("embedded")}else(/\bBlackBerry\b/.test(G)||/\bBB10\b/.test(i))&&(r=(RegExp(G.replace(/ +/g," *")+"/([.\\d]+)","i").exec(i)||0)[1]||A)?(X=((r=[r,/BB10/.test(i)])[1]?(G=null,F="BlackBerry"):"Device Software")+" "+r[0],A=null):this!=p&&"Wii"!=G&&(k&&P||/Opera/.test(T)&&/\b(?:MSIE|Firefox)\b/i.test(i)||"Firefox"==T&&/\bOS X (?:\d+\.){2,}/.test(X)||"IE"==T&&(X&&!/^Win/.test(X)&&A>5.5||/\bWindows XP\b/.test(X)&&A>8||8==A&&!/\bTrident\b/.test(i)))&&!a.test(r=e.call(p,i.replace(a,"")+";"))&&r.name&&(r="ing as "+r.name+((r=r.version)?" "+r:""),a.test(T)?(/\bIE\b/.test(r)&&"Mac OS"==X&&(X=null),r="identify"+r):(r="mask"+r,T=C?c(C.replace(/([a-z])([A-Z])/g,"$1 $2")):"Opera",/\bIE\b/.test(r)&&(X=null),k||(A=null)),I=["Presto"],E.push(r));(r=(/\bAppleWebKit\/([\d.]+\+?)/i.exec(i)||0)[1])&&(r=[parseFloat(r.replace(/\.(\d)$/,".0$1")),r],"Safari"==T&&"+"==r[1].slice(-1)?(T="WebKit Nightly",W="alpha",A=r[1].slice(0,-1)):(A==r[1]||A==(r[2]=(/\bSafari\/([\d.]+\+?)/i.exec(i)||0)[1]))&&(A=null),r[1]=(/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(i)||0)[1],537.36==r[0]&&537.36==r[2]&&parseFloat(r[1])>=28&&"WebKit"==I&&(I=["Blink"]),k&&(O||r[1])?(I&&(I[1]="like Chrome"),r=r[1]||((r=r[0])<530?1:r<532?2:r<532.05?3:r<533?4:r<534.03?5:r<534.07?6:r<534.1?7:r<534.13?8:r<534.16?9:r<534.24?10:r<534.3?11:r<535.01?12:r<535.02?"13+":r<535.07?15:r<535.11?16:r<535.19?17:r<536.05?18:r<536.1?19:r<537.01?20:r<537.11?"21+":r<537.13?23:r<537.18?24:r<537.24?25:r<537.36?26:"Blink"!=I?"27":"28")):(I&&(I[1]="like Safari"),r=(r=r[0])<400?1:r<500?2:r<526?3:r<533?4:r<534?"4+":r<535?5:r<537?6:r<538?7:r<601?8:r<602?9:r<604?10:r<606?11:r<608?12:"12"),I&&(I[1]+=" "+(r+="number"==typeof r?".x":/[.+]/.test(r)?"":"+")),"Safari"==T&&(!A||parseInt(A)>45)?A=r:"Chrome"==T&&/\bHeadlessChrome/i.test(i)&&E.unshift("headless")),"Opera"==T&&(r=/\bzbov|zvav$/.exec(X))?(T+=" ",E.unshift("desktop mode"),"zvav"==r?(T+="Mini",A=null):T+="Mobile",X=X.replace(RegExp(" *"+r+"$"),"")):"Safari"==T&&/\bChrome\b/.exec(I&&I[1])?(E.unshift("desktop mode"),T="Chrome Mobile",A=null,/\bOS X\b/.test(X)?(F="Apple",X="iOS 4.3+"):X=null):/\bSRWare Iron\b/.test(T)&&!A&&(A=N("Chrome")),A&&0==A.indexOf(r=/[\d.]+$/.exec(X))&&i.indexOf("/"+r+"-")>-1&&(X=_(X.replace(r,""))),X&&-1!=X.indexOf(T)&&!RegExp(T+" OS").test(X)&&(X=X.replace(RegExp(" *"+u(T)+" *"),"")),I&&!/\b(?:Avant|Nook)\b/.test(T)&&(/Browser|Lunascape|Maxthon/.test(T)||"Safari"!=T&&/^iOS/.test(X)&&/\bSafari\b/.test(I[1])||/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(T)&&I[1])&&(r=I[I.length-1])&&E.push(r),E.length&&(E=["("+E.join("; ")+")"]),F&&G&&0>G.indexOf(F)&&E.push("on "+F),G&&E.push((/^on /.test(E[E.length-1])?"":"on ")+G),X&&(n=(r=/ ([\d.+]+)$/.exec(X))&&"/"==X.charAt(X.length-r[0].length-1),X={architecture:32,family:r&&!n?X.replace(r[0],""):X,version:r?r[1]:null,toString:function(){var e=this.version;return this.family+(e&&!n?" "+e:"")+(64==this.architecture?" 64-bit":"")}}),(r=/\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(B))&&!/\bi686\b/i.test(B)?(X&&(X.architecture=64,X.family=X.family.replace(RegExp(" *"+r),"")),T&&(/\bWOW64\b/i.test(i)||k&&/\w(?:86|32)$/.test($.cpuClass||$.platform)&&!/\bWin64; x64\b/i.test(i))&&E.unshift("32-bit")):X&&/^OS X/.test(X.family)&&"Chrome"==T&&parseFloat(A)>=39&&(X.architecture=64),i||(i=null);var L={};return L.description=i,L.layout=I&&I[0],L.manufacturer=F,L.name=T,L.prerelease=W,L.product=G,L.ua=i,L.version=T&&A,L.os=X||{architecture:null,family:null,version:null,toString:function(){return"null"}},L.parse=e,L.toString=function e(){return this.description||""},L.version&&E.unshift(A),L.name&&E.unshift(T),X&&T&&!(X==String(X).split(" ")[0]&&(X==T.split(" ")[0]||G))&&E.push(G?"("+X+")":"on "+X),E.length&&(L.description=E.join(" ")),L}();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(t.platform=S,define(function(){return S})):i&&r?p(S,function(e,t){i[t]=e}):t.platform=S}).call(this);