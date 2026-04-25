// Force la mise à jour immédiate du Service Worker sans attendre la fermeture des onglets
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Prend le contrôle des pages dès l'activation
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', (event) => {
    const notification = event.notification;
    const urlToOpen = notification.data?.url || 'forum.html'; // Utilise l'URL passée dans les data ou par défaut

    notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // 1. Vérifie si l'onglet est déjà ouvert
                for (let client of windowClients) {
                    if (client.url.includes(urlToOpen) && 'focus' in client) {
                        return client.focus();
                    }
                }
                // 2. Si aucun onglet n'est ouvert, on en crée un nouveau
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});
