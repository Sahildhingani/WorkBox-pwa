// PWA - with the vite-pwa-plugin 


//step-1 : install - npm install @vite-pwa/plugin -D

// create a manifest.js file in the public 
// {
//   "name": "My PWA App",
//   "short_name": "PWAApp",
//   "start_url": "/",
//   "display": "standalone",
//   "background_color": "#ffffff",
//   "theme_color": "#000000",
//   "icons": [
//     {
//       "src": "/icon-192.png",
//       "sizes": "192x192",
//       "type": "image/png"
//     },
//     {
//       "src": "/icon-512.png",
//       "sizes": "512x512",
//       "type": "image/png"
//     }
//   ]
// }



// step:3 Add Two Icons in /public which we use in mainifest


// step:4 Register Service Worker 

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then(() => console.log("Service Worker Registered"))
//       .catch(err => console.log("SW Registration Failed", err));
//   });
// }



// explain all the caching stratigies 
// 🔥 1. Cache First

// Meaning:
// → Always try cache first.
// → If not found, go to network.

// Best for:
// ✔ Icons
// ✔ CSS
// ✔ JS
// ✔ Static UI files


// 🔥 2. Network First

// Meaning:
// → Try network first.
// → If offline, fallback to cache.

// Best for:
// ✔ Dynamic content
// ✔ API data (posts, messages)

// 🔥 3. Stale While Revalidate

// Meaning:
// → Return cache immediately
// → Fetch new version in background
// → Update cache for next time

// Best for:
// ✔ CSS changes
// ✔ UI updates
// ✔ Product list that updates sometimes




// Explain me All the Event Listners 


// 1. install
// 🔵 When it runs?

// When the browser installs your service worker for the first time.

// 🟢 Why is it used?

// To cache all the important files required for offline mode.

// 🟩 Simple meaning:

// “I just got installed. Let me save all the files I will need.”

// self.addEventListener("install", event => {
//   console.log("SW Installed");
//   event.waitUntil(
//     caches.open("my-cache").then(cache => {
//       return cache.addAll(["/", "/index.html", "/style.css"]);
//     })
//   );
// });


// ✅ 2. activate
// 🔵 When it runs?

// After installation, when the SW becomes active.

// 🟢 Why is it used?

// To clean old caches

// To ensure new service worker controls the page

// 🟩 Simple meaning:

// “I’m now active. Let me remove old garbage cache.”

// ✔ Example:
// self.addEventListener("activate", event => {
//   console.log("SW Activated");
//   event.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(
//         keys.map(key => {
//           if (key !== "my-cache") return caches.delete(key);
//         })
//       );
//     })
//   );
// });


// ✅ 3. fetch
// 🔵 When it runs?

// This runs for every network request your app makes.

// 🟢 Why is it used?

// To decide:

// Should I return cache?

// Or fetch from network?

// Or use a cache strategy?

// 🟩 Simple meaning:

// “Someone requested a file. Should I give cache or download from internet?”

// ✔ Example:
// self.addEventListener("fetch", event => {
//   event.respondWith(
//     caches.match(event.request).then(cached => {
//       return cached || fetch(event.request);
//     })
//   );
// });




// ✅ 5. sync (Background Sync)
// 🔵 When it runs?

// When the user goes offline and then comes back online.

// 🟢 Why is it used?

// To sync:

// send stored messages

// upload pending data

// 🟩 Simple meaning:

// “User is online again. Let me finish the pending work.”

// ✔ Example:
// self.addEventListener("sync", event => {
//   if (event.tag === "sync-data") {
//     console.log("Syncing your data...");
//   }
// });

// ✅ 6. push (Push Notifications)
// 🔵 When it runs?

// When your backend sends a push notification.

// 🟢 Why is it used?

// To show notifications even if app is closed.

// 🟩 Simple meaning:

// “Server sent a push message. Let me show notification.”

// ✔ Example:
// self.addEventListener("push", event => {
//   self.registration.showNotification("New Message!", {
//     body: event.data.text()
//   });
// });

// ✅ 7. notificationclick
// 🔵 When it runs?

// When user clicks a notification.

// 🟢 Why is it used?

// To:

// open a page

// focus an existing tab

// 🟩 Simple meaning:

// “User clicked the notification. What should I open?”

// ✔ Example:
// self.addEventListener("notificationclick", event => {
//   event.notification.close();
//   event.waitUntil(
//     clients.openWindow("/")
//   );
// });