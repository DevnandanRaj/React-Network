self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const startTime = Date.now(); // Record the start time of the request

  event.respondWith(
    fetch(request)
      .then((response) => {
        const clonedResponse = response.clone();

        // Calculate the duration of the request
        const duration = Date.now() - startTime;

        // Get content length from response headers
        const contentLength = response.headers.get('content-length');
        const size = contentLength ? parseInt(contentLength, 10) : 'N/A';

        // Determine the initiator based on request type or other context
        // For simplicity, assuming all requests are initiated by 'user' here
        const initiator = 'user';

        // Collect request information
        const requestInfo = {
          url: request.url,
          method: request.method,
          headers: Array.from(request.headers.entries()),
          status: response.status,
          statusText: response.statusText,
          type: request.destination || 'other',
          time: duration,   // Duration in milliseconds
          size: size,       // Size in bytes or 'N/A'
          initiator: initiator,
        };

        // Send the request info to the main thread
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage(requestInfo);
          });
        });

        return clonedResponse;
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        throw error;
      })
  );
});
