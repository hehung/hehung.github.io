// build time:Sun Dec 01 2019 15:30:19 GMT+0800 (GMT+08:00)
(function(s){"use strict";function e(s){return new RegExp("(^|\\s+)"+s+"(\\s+|$)")}var n,a,t;if("classList"in document.documentElement){n=function(s,e){return s.classList.contains(e)};a=function(s,e){s.classList.add(e)};t=function(s,e){s.classList.remove(e)}}else{n=function(s,n){return e(n).test(s.className)};a=function(s,e){if(!n(s,e)){s.className=s.className+" "+e}};t=function(s,n){s.className=s.className.replace(e(n)," ")}}function c(s,e){var c=n(s,e)?t:a;c(s,e)}var i={hasClass:n,addClass:a,removeClass:t,toggleClass:c,has:n,add:a,remove:t,toggle:c};if(typeof define==="function"&&define.amd){define(i)}else{s.classie=i}})(window);
//rebuild by neat 