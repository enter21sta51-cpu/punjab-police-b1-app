// ====== FIREBASE CONFIGURATION ======
const firebaseConfig = {
    apiKey: "AIzaSyDkctgrKz4k_DJfsedIHPzFpYSePOyDj1o",
    authDomain: "punjab-police-b1.firebaseapp.com",
    projectId: "punjab-police-b1",
    storageBucket: "punjab-police-b1.firebasestorage.app",
    messagingSenderId: "806170691611",
    appId: "1:806170691611:web:2ad1f4ca71b9c4ce9b50be",   
    measurementId: "G-29Y2TPQQTT"};
};  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const ADMIN_EMAIL = "ppb1testapp@protonmail.com";

// ====== 1. AUTH STATE CHECKER ======
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User logged in:", user.email);
        
        // Check if Admin
        if (user.email === ADMIN_EMAIL) {
            const adminBtn = document.getElementById('admin-panel-btn');
            if (adminBtn) adminBtn.style.display = 'block';
        }

        // Load User Details
        db.collection('users').doc(user.uid).get().then((doc) => {
            if (doc.exists) {
                document.getElementById('user-welcome-name').innerText = `ਜੀ ਆਇਆਂ ਨੂੰ, ${doc.data().name}!`;
                document.getElementById('user-status-badge').innerText = (doc.data().subscriptionStatus || "free").toUpperCase();
            }
            switchView('dashboard-screen');
        }).catch(err => {
            switchView('dashboard-screen');
        });
    } else {
        switchView('auth-screen');
    }
});

// ====== 2. LOGIN LOGIC ======
function processLogin() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;

    if (!email || !password) {
        alert("Kripya Email ate Password bharein!");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            alert("Login Fail: " + error.message);
        });
}

// ====== 3. REGISTER LOGIC ======
function processRegister() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value.trim();
    const phone = document.getElementById('auth-phone').value.trim();

    if (!email || !password || !name || !phone) {
        alert("Kripya saariya details bharein!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                phone: phone,
                subscriptionStatus: "free",
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("Registration Successful! Hun Login karo.");
            switchAuthTab('login');
        })
        .catch((error) => {
            alert("Register Fail: " + error.message);
        });
}

// ====== 4. ADMIN SAVE QUESTION ======
function saveQuestionToFirestore() {
    const question = document.getElementById('admin-question').value;
    const optA = document.getElementById('admin-opt-a').value;
    const optB = document.getElementById('admin-opt-b').value;
    const optC = document.getElementById('admin-opt-c').value;
    const optD = document.getElementById('admin-opt-d').value;
    const correct = document.getElementById('admin-correct').value.toUpperCase();

    if(!question || !optA || !optB || !optC || !optD || !correct) {
        alert("Kripya saare fields bharein!");
        return;
    }

    db.collection("questions").add({
        question: question,
        options: [optA, optB, optC, optD],
        correctAnswer: correct,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Sawaal safalta purvak save ho gya hai! 🎉");
        document.getElementById('admin-question').value = "";
        document.getElementById('admin-opt-a').value = "";
        document.getElementById('admin-opt-b').value = "";
        document.getElementById('admin-opt-c').value = "";
        document.getElementById('admin-opt-d').value = "";
        document.getElementById('admin-correct').value = "";
    })
    .catch((error) => {
        alert("Error saving question: " + error.message);
    });
}
