const { warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
const { StaleWhileRevalidate } = require("workbox-strategies");
precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    // cache responses from a server, in this case 0 and 200.
new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
   // set the expiration time to 30 days for the cached files
 new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// The warmStrategyCache function will use the URLs and caching strategy to pre-cache the specified pages.
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

//register route with a condition that checks if the request mode is "navigate", if it is use the pageCache.
registerRoute(({ request }) => request.mode === "navigate", pageCache);

registerRoute(
  // define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: "asset-cache",
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 30 days
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
