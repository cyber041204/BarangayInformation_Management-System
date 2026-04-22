// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyDwq_1UDjJm1WZe-_JMNwE4K0nmLL0ZiNs",
  authDomain: "barangay-ims-7f0ec.firebaseapp.com",
  databaseURL: "https://barangay-ims-7f0ec-default-rtdb.firebaseio.com",
  projectId: "barangay-ims-7f0ec",
  storageBucket: "barangay-ims-7f0ec.firebasestorage.app",
  messagingSenderId: "1074229770454",
  appId: "1:1074229770454:web:e684062d0448f9e8a2b177"
};

// --- INITIALIZE FIREBASE ---
firebase.initializeApp(firebaseConfig);
console.log("✅ Using Firebase Cloud Database");

async function apiGet(endpoint) {
    try {
        const snapshot = await firebase.database().ref(endpoint).once('value');
        if (!snapshot.exists()) return [];
        const val = snapshot.val();
        // Convert object to array if it's not already an array
        return Array.isArray(val) ? val : Object.values(val);
    } catch (e) {
        console.error("Firebase read error:", e);
        return [];
    }
}

async function apiPost(endpoint, data) {
    try {
        await firebase.database().ref(endpoint).set(data);
        return { success: true };
    } catch (e) {
        console.error("Firebase write error:", e);
        return { success: false };
    }
}

function apiListen(endpoint, callback) {
    firebase.database().ref(endpoint).on('value', (snapshot) => {
        if (!snapshot.exists()) {
            callback([]);
            return;
        }
        const val = snapshot.val();
        const arr = Array.isArray(val) ? val : Object.values(val);
        callback(arr);
    });
}

function showNotification(title, body) {
    if (Notification.permission === "granted") {
        new Notification(title, { body, icon: '1.png' });
    }
}

