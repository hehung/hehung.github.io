// build time:Sun Dec 01 2019 15:30:20 GMT+0800 (GMT+08:00)
window.Modernizr=function(e,t,n){function r(e){y.cssText=e}function o(e,t){return r(b.join(e+";")+(t||""))}function i(e,t){return typeof e===t}function a(e,t){return!!~(""+e).indexOf(t)}function c(e,t){for(var r in e){var o=e[r];if(!a(o,"-")&&y[o]!==n)return t=="pfx"?o:!0}return!1}function l(e,t,r){for(var o in e){var a=t[e[o]];if(a!==n)return r===!1?e[o]:i(a,"function")?a.bind(r||t):a}return!1}function s(e,t,n){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+w.join(r+" ")+r).split(" ");return i(t,"string")||i(t,"undefined")?c(o,t):(o=(e+" "+C.join(r+" ")+r).split(" "),l(o,t,n))}var u="2.7.1",f={},d=!0,p=t.documentElement,h="modernizr",m=t.createElement(h),y=m.style,v,g={}.toString,b=" -webkit- -moz- -o- -ms- ".split(" "),E="Webkit Moz O ms",w=E.split(" "),C=E.toLowerCase().split(" "),j={},x={},S={},N=[],F=N.slice,k,M=function(e,n,r,o){var i,a,c,l,s=t.createElement("div"),u=t.body,f=u||t.createElement("body");if(parseInt(r,10))while(r--)c=t.createElement("div"),c.id=o?o[r]:h+(r+1),s.appendChild(c);return i=["&#173;",'<style id="s',h,'">',e,"</style>"].join(""),s.id=h,(u?s:f).innerHTML+=i,f.appendChild(s),u||(f.style.background="",f.style.overflow="hidden",l=p.style.overflow,p.style.overflow="hidden",p.appendChild(f)),a=n(s,e),u?s.parentNode.removeChild(s):(f.parentNode.removeChild(f),p.style.overflow=l),!!a},O={}.hasOwnProperty,T;!i(O,"undefined")&&!i(O.call,"undefined")?T=function(e,t){return O.call(e,t)}:T=function(e,t){return t in e&&i(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if(typeof t!="function")throw new TypeError;var n=F.call(arguments,1),r=function(){if(this instanceof r){var o=function(){};o.prototype=t.prototype;var i=new o,a=t.apply(i,n.concat(F.call(arguments)));return Object(a)===a?a:i}return t.apply(e,n.concat(F.call(arguments)))};return r}),j.csstransforms3d=function(){var e=!!s("perspective");return e&&"webkitPerspective"in p.style&&M("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t,n){e=t.offsetLeft===9&&t.offsetHeight===3}),e},j.csstransitions=function(){return s("transition")};for(var L in j)T(j,L)&&(k=L.toLowerCase(),f[k]=j[L](),N.push((f[k]?"":"no-")+k));return f.addTest=function(e,t){if(typeof e=="object")for(var r in e)T(e,r)&&f.addTest(r,e[r]);else{e=e.toLowerCase();if(f[e]!==n)return f;t=typeof t=="function"?t():t,typeof d!="undefined"&&d&&(p.className+=" "+(t?"":"no-")+e),f[e]=t}return f},r(""),m=v=null,function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=g.elements;return typeof e=="string"?e.split(" "):e}function o(e){var t=y[e[h]];return t||(t={},m++,e[h]=m,y[m]=t),t}function i(e,n,r){n||(n=t);if(v)return n.createElement(e);r||(r=o(n));var i;return r.cache[e]?i=r.cache[e].cloneNode():d.test(e)?i=(r.cache[e]=r.createElem(e)).cloneNode():i=r.createElem(e),i.canHaveChildren&&!f.test(e)&&!i.tagUrn?r.frag.appendChild(i):i}function a(e,n){e||(e=t);if(v)return e.createDocumentFragment();n=n||o(e);var i=n.frag.cloneNode(),a=0,c=r(),l=c.length;for(;a<l;a++)i.createElement(c[a]);return i}function c(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return g.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(g,t.frag)}function l(e){e||(e=t);var r=o(e);return g.shivCSS&&!p&&!r.hasCSS&&(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),v||c(e,r),e}var s="3.7.0",u=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,d=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,p,h="_html5shiv",m=0,y={},v;(function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",p="hidden"in e,v=e.childNodes.length==1||function(){t.createElement("a");var e=t.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(n){p=!0,v=!0}})();var g={elements:u.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:s,shivCSS:u.shivCSS!==!1,supportsUnknownElements:v,shivMethods:u.shivMethods!==!1,type:"default",shivDocument:l,createElement:i,createDocumentFragment:a};e.html5=g,l(t)}(this,t),f._version=u,f._prefixes=b,f._domPrefixes=C,f._cssomPrefixes=w,f.testProp=function(e){return c([e])},f.testAllProps=s,f.testStyles=M,f.prefixed=function(e,t,n){return t?s(e,t,n):s(e,"pfx")},p.className=p.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(d?" js "+N.join(" "):""),f}(this,this.document),function(e,t,n){function r(e){return"[object Function]"==h.call(e)}function o(e){return"string"==typeof e}function i(){}function a(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function c(){var e=m.shift();y=1,e?e.t?d(function(){("c"==e.t?F.injectCss:F.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),c()):y=0}function l(e,n,r,o,i,l,s){function u(t){if(!h&&a(f.readyState)&&(E.r=h=1,!y&&c(),f.onload=f.onreadystatechange=null,t)){"img"!=e&&d(function(){b.removeChild(f)},50);for(var r in x[n])x[n].hasOwnProperty(r)&&x[n][r].onload()}}var s=s||F.errorTimeout,f=t.createElement(e),h=0,v=0,E={t:r,s:n,e:i,a:l,x:s};1===x[n]&&(v=1,x[n]=[]),"object"==e?f.data=n:(f.src=n,f.type=e),f.width=f.height="0",f.onerror=f.onload=f.onreadystatechange=function(){u.call(this,v)},m.splice(o,0,E),"img"!=e&&(v||2===x[n]?(b.insertBefore(f,g?null:p),d(u,s)):x[n].push(f))}function s(e,t,n,r,i){return y=0,t=t||"j",o(e)?l("c"==t?w:E,e,t,this.i++,n,r,i):(m.splice(this.i++,0,e),1==m.length&&c()),this}function u(){var e=F;return e.loader={load:s,i:0},e}var f=t.documentElement,d=e.setTimeout,p=t.getElementsByTagName("script")[0],h={}.toString,m=[],y=0,v="MozAppearance"in f.style,g=v&&!!t.createRange().compareNode,b=g?f:p.parentNode,f=e.opera&&"[object Opera]"==h.call(e.opera),f=!!t.attachEvent&&!f,E=v?"object":f?"script":"img",w=f?"script":E,C=Array.isArray||function(e){return"[object Array]"==h.call(e)},j=[],x={},S={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}},N,F;F=function(e){function t(e){var e=e.split("!"),t=j.length,n=e.pop(),r=e.length,n={url:n,origUrl:n,prefixes:e},o,i,a;for(i=0;i<r;i++)a=e[i].split("="),(o=S[a.shift()])&&(n=o(n,a));for(i=0;i<t;i++)n=j[i](n);return n}function a(e,o,i,a,c){var l=t(e),s=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(o&&(o=r(o)?o:o[e]||o[a]||o[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,o,i,a,c):(x[l.url]?l.noexec=!0:x[l.url]=1,i.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(r(o)||r(s))&&i.load(function(){u(),o&&o(l.origUrl,c,a),s&&s(l.origUrl,c,a),x[l.url]=2})))}function c(e,t){function n(e,n){if(e){if(o(e))n||(s=function(){var e=[].slice.call(arguments);u.apply(this,e),f()}),a(e,s,t,0,c);else if(Object(e)===e)for(p in d=function(){var t=0,n;for(n in e)e.hasOwnProperty(n)&&t++;return t}(),e)e.hasOwnProperty(p)&&(!n&&!--d&&(r(s)?s=function(){var e=[].slice.call(arguments);u.apply(this,e),f()}:s[p]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),f()}}(u[p])),a(e[p],s,t,p,c))}else!n&&f()}var c=!!e.test,l=e.load||e.both,s=e.callback||i,u=s,f=e.complete||i,d,p;n(c?e.yep:e.nope,!!l),l&&n(l)}var l,s,f=this.yepnope.loader;if(o(e))a(e,0,f,0);else if(C(e))for(l=0;l<e.length;l++)s=e[l],o(s)?a(s,0,f,0):C(s)?F(s):Object(s)===s&&c(s,f);else Object(e)===e&&c(e,f)},F.addPrefix=function(e,t){S[e]=t},F.addFilter=function(e){j.push(e)},F.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",N=function(){t.removeEventListener("DOMContentLoaded",N,0),t.readyState="complete"},0)),e.yepnope=u(),e.yepnope.executeStack=c,e.yepnope.injectJs=function(e,n,r,o,l,s){var u=t.createElement("script"),f,h,o=o||F.errorTimeout;u.src=e;for(h in r)u.setAttribute(h,r[h]);n=s?c:n||i,u.onreadystatechange=u.onload=function(){!f&&a(u.readyState)&&(f=1,n(),u.onload=u.onreadystatechange=null)},d(function(){f||(f=1,n(1))},o),l?u.onload():p.parentNode.insertBefore(u,p)},e.yepnope.injectCss=function(e,n,r,o,a,l){var o=t.createElement("link"),s,n=l?c:n||i;o.href=e,o.rel="stylesheet",o.type="text/css";for(s in r)o.setAttribute(s,r[s]);a||(p.parentNode.insertBefore(o,p),d(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
//rebuild by neat 