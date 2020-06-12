import firebase from "firebase";

export const inicializarFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyDbpq57nN6MN41OT2-PMbVaM8AoE8l0_jg",
        authDomain: "hangeddraw.firebaseapp.com",
        databaseURL: "https://hangeddraw.firebaseio.com",
        projectId: "hangeddraw",
        storageBucket: "hangeddraw.appspot.com",
        messagingSenderId: "914178032199",
        appId: "1:914178032199:web:d1ede70a9769df92d32762"
    });
};

export const preguntarPermisos = async () => {
    try {
        const messaging = firebase.messaging();

        //await messaging.requestPermission();
        await Notification.requestPermission().then(async permission => {
            if (permission === "denied") {
                console.log("Permission wasn't granted. Allow a retry.");
                return;
            } else if (permission === "default") {
                console.log("The permission request was dismissed.");
                return;
            }
            const token = await messaging.getToken();
            console.log("user token: ", token);

            return token;
        });
    } catch (error) {
        console.error(error);
    }
};