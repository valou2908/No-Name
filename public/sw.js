// sw.js - Ce code tourne en arrière-plan, même site fermé
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'EcoApp', body: 'Nouveau message !' };
    
    const options = {
        body: data.body,
        icon: 'Icone.png',
        badge: 'Icone.png',
        vibrate: [100, 50, 100],
        data: {
            url: 'forum.html'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Quand on clique sur la notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('forum.html')
    );
});
