// eslint-disable-next-line no-undef
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
const URL_REGEX = new RegExp('^https://api.coingecko.com/api/v3');
// eslint-disable-next-line no-undef
workbox.core.skipWaiting();
// eslint-disable-next-line no-undef
workbox.core.clientsClaim();

// eslint-disable-next-line no-undef
workbox.routing.registerRoute(
  ({ event, request, url }) => URL_REGEX.test(url.href) && request.method === 'GET',
  // eslint-disable-next-line no-undef
  new workbox.strategies.CacheFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'cryptocurrencies',
    plugins: [
      // eslint-disable-next-line no-undef
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// eslint-disable-next-line no-undef,no-restricted-globals
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
