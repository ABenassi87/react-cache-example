!function(e){var r={};function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,r,t){o.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,r){if(1&r&&(e=o(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)o.d(t,n,function(r){return e[r]}.bind(null,n));return t},o.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(r,"a",r),r},o.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},o.p="/",o(o.s=0)}([function(e,r){importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"),workbox.core.skipWaiting(),workbox.core.clientsClaim(),workbox.routing.registerRoute(new RegExp("^https://api.coingecko.com/api/v3"),new workbox.strategies.CacheFirst({networkTimeoutSeconds:3,cacheName:"cryptocurrencies",plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:50,maxAgeSeconds:300,purgeOnQuotaError:!0})]})),workbox.precaching.precacheAndRoute([{'revision':'7e227b6bd6fa017e80e48edb6602b60f','url':'/index.html'},{'revision':'e46c773e2702141ddaa34c1c375194f9','url':'/static/css/main.51172d99.chunk.css'},{'revision':'e27709d59269adf8364117cca7e6055f','url':'/static/js/2.a61b7ef6.chunk.js'},{'revision':'e88a3e95b5364d46e95b35ae8c0dc27d','url':'/static/js/2.a61b7ef6.chunk.js.LICENSE.txt'},{'revision':'ca03340574ad75d8599ae05237946b1c','url':'/static/js/main.37454605.chunk.js'},{'revision':'7f1ea3f3381ada3db04df38570e90ee2','url':'/static/js/runtime-main.9f17263e.js'}]||[])}]);
//# sourceMappingURL=service-worker.js.map