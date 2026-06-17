// ====== FIREBASE CONFIGURATION ======
const firebaseConfig = {
    apiKey: "AIzaSyDkctgrKz4k_DJfsedIHPzFpYSePOyDj1o",
    authDomain: "punjab-police-b1.firebaseapp.com",
    projectId: "punjab-police-b1",
    storageBucket: "punjab-police-b1.firebasestorage.app",
    messagingSenderId: "806170691611",
    appId: "1:806170691611:web:2ad1f4ca71b9c4ce9b50be"
, measurementId: "G-29Y2TPQQTT"};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ====== AUDIO EFFECTS (Base64 Embedded) ======
const sounds = {
    correct: new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==\n"), // Replace with actual short Ting sound Base64
    incorrect: new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==\n"), // Replace with actual short Buzz sound Base64
    click: new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==\n")
};

function playSound(type) {
    try { sounds[type].play(); } catch(e) { console.log("Audio play deferred"); }
}

// ====== DISPOSABLE EMAIL BLOCKER LIST ======
const blockedDomains = ['temp-mail.org', '10minutemail.com', 'yopmail.com', 'mailinator.com'];

// ====== APPLICATION STATE ======
let currentUser = null;
let userData = null;
let activeTestQuestions = [];
let userAnswers = {}; // { qIndex: "A" }
let currentQuestionIndex = 0;
let testTimerInterval = null;
let testTimeLeft = 600; // 10 minutes

// ====== UI VIEW ROUTER ======
const app = {
    switchView: function(screenId) {
        playSound('click');
        document.querySelectorAll('.view-section').forEach(s => s.style.display = 'none');
        document.getElementById(screenId).style.style.display = 'block';
        
        if(screenId === 'dashboard-screen') this.loadDashboardData();
        if(screenId === 'test-selection-screen') this.loadAvailableTests();
        if(screenId === 'study-screen') this.loadStudyMaterial();
        if(screenId === 'leaderboard-screen') this.loadLeaderboard();
        if(screenId === 'history-screen') this.loadHistoryAndMistakes();
    },

    // ====== AUTHENTICATION LOGIC ======
    initAuth: function() {
        // Toggle tabs
        document.getElementById('tab-login').addEventListener('click', () => {
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
            document.getElementById('tab-login').classList.add('active');
            document.getElementById('tab-register').classList.remove('active');
        });

        document.getElementById('tab-register').addEventListener('click', () => {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('register-form').style.display = 'block';
            document.getElementById('tab-register').classList.add('active');
            document.getElementById('tab-login').classList.remove('active');
        });

        // Phone Invisible Recaptcha
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        });

        // Register Flow: Send OTP
        document.getElementById('send-otp-btn').addEventListener('click', e => {
            const email = document.getElementById('reg-email').value;
            const phone = document.getElementById('reg-phone').value;
            const domain = email.split('@')[1];

            if (blockedDomains.includes(domain)) {
                alert("Disposable/Fake emails are not allowed! ਕਿਰਪਾ ਕਰਕੇ ਅਸਲੀ ਈਮੇਲ ਵਰਤੋ।");
                return;
            }

            auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
                .then(confirmationResult => {
                    window.confirmationResult = confirmationResult;
                    document.getElementById('otp-section').style.display = 'block';
                    alert("OTP Sent Successfully!");
                }).catch(err => alert("Error sending OTP: " + err.message));
        });

        // Complete Verification and Create Firebase Account
        document.getElementById('register-form').addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const phone = document.getElementById('reg-phone').value;
            const code = document.getElementById('otp-input').value;
            const refBy = document.getElementById('reg-referral').value;

            window.confirmationResult.confirm(code).then(result => {
                // Link with Email/Password credential
                return auth.createUserWithEmailAndPassword(email, password);
            }).then(userCred => {
                const uid = userCred.user.uid;
                const referralCode = name.substring(0,3).toUpperCase() + Math.floor(1000 + Math.random() * 9000);
                
                // Save to Firestore
                return db.collection('users').doc(uid).set({
                    uid: uid,
                    name: name,
                    email: email,
                    phone: phone,
                    hasTrialUsed: false,
                    subscriptionStatus: "free",
                    subscriptionType: "none",
                    subscriptionExpiry: null,
                    streak: 1,
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                    totalScore: 0,
                    referralCode: referralCode,
                    referredBy: refBy || ""
                });
            }).then(() => {
                alert("Registration Complete!");
                location.reload();
            }).catch(err => alert("Registration Failed: " + err.message));
        });

        // Email Login Flow
        document.getElementById('login-form').addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            auth.signInWithEmailAndPassword(email, password)
                .then(() => alert("Logged In Successfully!"))
                .catch(err => alert("Login Error: " + err.message));
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            auth.signOut().then(() => location.reload());
        });

        // Auth Observer
        auth.onAuthStateChanged(user => {
            if (user) {
                currentUser = user;
                document.getElementById('logout-btn').style.display = 'inline-block';
                // Check Admin Access
                if(user.email === "ppb1testapp@protonmail.com") {
                    document.getElementById('admin-tile').style.display = 'block';
                }
                db.collection('users').doc(user.uid).get().then(doc => {
                    userData = doc.data();
                    this.updateStreak(user.uid);
                    this.switchView('dashboard-screen');
                });
            } else {
                this.switchView('auth-screen');
            }
        });
    },

    // ====== DAILY STREAK LOGIC ======
    updateStreak: function(uid) {
        if (!userData) return;
        const now = new Date();
        const lastLoginDate = userData.lastLogin ? userData.lastLogin.toDate() : new Date();
        const diffTime = Math.abs(now - lastLoginDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let currentStreak = userData.streak || 0;
        if(diffDays === 1) {
            currentStreak += 1;
        } else if(diffDays > 1) {
            currentStreak = 1;
        }

        db.collection('users').doc(uid).update({
            streak: currentStreak,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });

        document.getElementById('streak-count').innerText = currentStreak;
        document.getElementById('streak-badge').style.display = 'inline-block';
    },

    // ====== DASHBOARD VIEW ======
    loadDashboardData: function() {
        document.getElementById('user-display-name').innerText = userData.name;
        document.getElementById('my-referral-code').innerText = userData.referralCode;
        const subBadge = document.getElementById('sub-status-badge');
        subBadge.innerText = userData.subscriptionStatus.toUpperCase();
        subBadge.className = userData.subscriptionStatus === 'active' ? 'badge' : 'badge-free';
    },

    // ====== MOCK TEST SELECTION & ACCESS LOGIC ======
    loadAvailableTests: function() {
        const listDiv = document.getElementById('tests-list');
        listDiv.innerHTML = "<p>Loading Tests...</p>";

        // Fetch unique test types or topics from Firestore 'questions'
        db.collection('questions').limit(30).get().then(snapshot => {
            listDiv.innerHTML = "";
            // Simulating multiple Mock Tests grouped by Topics
            let topics = {};
            snapshot.forEach(doc => {
                let q = doc.data();
                topics[q.topic] = (topics[q.topic] || 0) + 1;
            });

            Object.keys(topics).forEach((topic, idx) => {
                const itemCard = document.createElement('div');
                itemCard.className = "card";
                itemCard.innerHTML = `
                    <h3>📌 Mock Test ${idx + 1}: ${topic}</h3>
                    <p>Total: 10 MCQs | Duration: 10 Mins</p>
                    <button onclick="app.startTestFlow('${topic}')">Start Test</button>
                `;
                listDiv.appendChild(itemCard);
            });
        });
    },

    startTestFlow: function(topic) {
        // Access Control Verification
        if (userData.subscriptionStatus !== 'active' && userData.hasTrialUsed === true) {
            alert("🔒 ਇਹ ਟੈਸਟ ਲਾਕ ਹੈ! ਕਿਰਪਾ ਕਰਕੇ ਪ੍ਰੀਮੀਅਮ ਪਲਾਨ ਖਰੀਦੋ।");
            this.switchView('pricing-screen');
            return;
        }
        
        // Load 10 random questions for that topic
        db.collection('questions').where('topic', '==', topic).limit(10).get().then(snapshot => {
            activeTestQuestions = [];
            userAnswers = {};
            currentQuestionIndex = 0;
            
            snapshot.forEach(doc => {
                let data = doc.data();
                data.id = doc.id;
                activeTestQuestions.push(data);
            });

            if(activeTestQuestions.length === 0) {
                alert("ਇਸ ਟੌਪਿਕ ਵਿੱਚ ਹਾਲੇ ਸਵਾਲ ਨਹੀਂ ਹਨ!");
                return;
            }

            this.switchView('test-window-screen');
            this.launchTestTimer();
            this.renderQuestion();
        });
    },

    // ====== TEST ENGINE ======
    renderQuestion: function() {
        const q = activeTestQuestions[currentQuestionIndex];
        document.getElementById('q-topic').innerText = `Topic: ${q.topic} (${q.difficulty})`;
        document.getElementById('q-text').innerText = `${currentQuestionIndex + 1}. ${q.question}`;
        document.getElementById('opt-A').innerText = `A) ${q.optionA}`;
        document.getElementById('opt-B').innerText = `B) ${q.optionB}`;
        document.getElementById('opt-C').innerText = `C) ${q.optionC}`;
        document.getElementById('opt-D').innerText = `D) ${q.optionD}`;

        // Reset Selection States
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        const savedAns = userAnswers[currentQuestionIndex];
        if(savedAns) {
            document.getElementById(`opt-${savedAns}`).classList.add('selected');
        }

        // Progress bar calculation
        let progressPercent = ((currentQuestionIndex + 1) / activeTestQuestions.length) * 180; // normalized layout
        document.getElementById('test-progress').style.width = `${(currentQuestionIndex + 1) * 10}%`;
    },

    selectOption: function(optionLetter) {
        playSound('click');
        userAnswers[currentQuestionIndex] = optionLetter;
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById(`opt-${optionLetter}`).classList.add('selected');
    },

    navigateQuestion: function(direction) {
        let targetIndex = currentQuestionIndex + direction;
        if(targetIndex >= 0 && targetIndex < activeTestQuestions.length) {
            currentQuestionIndex = targetIndex;
            this.renderQuestion();
        }
    },

    toggleBookmark: function() {
        const q = activeTestQuestions[currentQuestionIndex];
        const bRef = db.collection('users').doc(currentUser.uid).collection('bookmarks').doc(q.id);
        bRef.set(q).then(() => alert("Question Bookmarked ⭐"));
    },

    launchTestTimer: function() {
        testTimeLeft = 600;
        clearInterval(testTimerInterval);
        testTimerInterval = setInterval(() => {
            testTimeLeft--;
            let mins = Math.floor(testTimeLeft / 60);
            let secs = testTimeLeft % 60;
            document.getElementById('test-timer').innerText = `Time: ${mins}:${secs < 10 ? '0':''}${secs}`;
            
            if(testTimeLeft <= 0) {
                clearInterval(testTimerInterval);
                this.endTest();
            }
        }, 1000);
    },

    endTest: function() {
        clearInterval(testTimerInterval);
        let score = 0;
        let reviewHtml = "";
        let mistakesBatch = [];

        activeTestQuestions.forEach((q, index) => {
            const userAns = userAnswers[index] || "Not Answered";
            const isCorrect = userAns === q.correctAnswer;
            if(isCorrect) score++;

            reviewHtml += `
                <div class="card" style="border-left: 5px solid ${isCorrect ? 'green':'red'}">
                    <h4>${index+1}. ${q.question}</h4>
                    <p>Your Answer: <strong>${userAns}</strong> | Correct: <strong style="color:green;">${q.correctAnswer}</strong></p>
                    <p><small>Explanation: ${q.explanation}</small></p>
                </div>
            `;

            // If incorrect, add to automatic Mistake Tracker
            if(!isCorrect) {
                db.collection('users').doc(currentUser.uid).collection('mistakes').doc(q.id).set(q);
            }
        });

        // Update Score state
        document.getElementById('final-score').innerText = score;
        document.getElementById('review-container').innerHTML = reviewHtml;
        
        if(score >= 7) { playSound('correct'); document.getElementById('result-message').innerText = "ਬਹੁਤ ਵਧੀਆ! Excellent Performance."; }
        else { playSound('incorrect'); document.getElementById('result-message').innerText = "ਹੋਰ ਤਿਆਰੀ ਦੀ ਲੋੜ ਹੈ! Keep Learning."; }

        // Save History to user sub-collection & increment total global scores
        db.collection('users').doc(currentUser.uid).collection('testHistory').add({
            date: firebase.firestore.FieldValue.serverTimestamp(),
            score: score,
            total: 10
        });

        db.collection('users').doc(currentUser.uid).update({
            hasTrialUsed: true,
            totalScore: firebase.firestore.FieldValue.increment(score)
        });

        // Sync Leaderboard Engine
        db.collection('leaderboard').doc(currentUser.uid).set({
            uid: currentUser.uid,
            name: userData.name,
            totalScore: (userData.totalScore || 0) + score
        });

        this.switchView('result-screen');
    },

    // ====== STUDY MATERIAL LAYER ======
    loadStudyMaterial: function() {
        const container = document.getElementById('study-material-list');
        container.innerHTML = "Loading Notes...";
        db.collection('study_material').get().then(snapshot => {
            container.innerHTML = "";
            snapshot.forEach(doc => {
                let m = doc.data();
                let div = document.createElement('div');
                div.className = "card";
                div.innerHTML = `<h3>📘 [${m.category}] ${m.heading}</h3><p>${m.content}</p>`;
                container.appendChild(div);
            });
        });
    },

    // ====== LEADERBOARD ENGINE ======
    loadLeaderboard: function() {
        const tbody = document.getElementById('leaderboard-rows');
        tbody.innerHTML = "<tr><td colspan='3'>Updating ranks...</td></tr>";
        db.collection('leaderboard').orderBy('totalScore', 'desc').limit(10).get().then(snapshot => {
            tbody.innerHTML = "";
            let rank = 1;
            snapshot.forEach(doc => {
                let row = doc.data();
                tbody.innerHTML += `<tr><td>#${rank++}</td><td>${row.name}</td><td>${row.totalScore} pts</td></tr>`;
            });
        });
    },

    // ====== HISTORY & MISTAKE TRACKER VIEW ======
    loadHistoryAndMistakes: function() {
        const bList = document.getElementById('bookmarks-list');
        const mList = document.getElementById('mistakes-list');
        
        db.collection('users').doc(currentUser.uid).collection('bookmarks').get().then(snap => {
            bList.innerHTML = snap.empty ? "<p>No bookmarks saved yet.</p>" : "";
            snap.forEach(doc => { bList.innerHTML += `<div class='card'><p>⭐ <strong>${doc.data().question}</strong> (Ans: ${doc.data().correctAnswer})</p></div>`; });
        });

        db.collection('users').doc(currentUser.uid).collection('mistakes').get().then(snap => {
            mList.innerHTML = snap.empty ? "<p>Great job! No recorded errors.</p>" : "";
            snap.forEach(doc => { mList.innerHTML += `<div class='card' style='border-left:3px solid red'><p>❌ <strong>${doc.data().question}</strong><br><small>Correct Explanation: ${doc.data().explanation}</small></p></div>`; });
        });
    },

    // ====== RAZORPAY INTREGRATION SYSTEM ======
    initiatePayment: function(type, amount) {
        // Open Razorpay Checkout Window directly via dynamic testing options
        const options = {
            "key": "rzp_test_T2bxanmhGBmThJ", // Test mode Public Key
            "amount": amount * 100, // Converts rupees into paise
            "currency": "INR",
            "name": "Punjab Police B1 TEST App",
            "description": `${type === 'monthly' ? 'Monthly Access Pack':'Single Test Key'} Activation`,
            "handler": function (response){
                // Payment Success Handler
                alert("Payment Successful! TXN ID: " + response.razorpay_payment_id);
                
                // Update Client Access state in Firestore securely
                db.collection('users').doc(currentUser.uid).update({
                    subscriptionStatus: "active",
                    subscriptionType: type,
                    subscriptionExpiry: type === 'monthly' ? new Date(Date.now() + 30*24*60*60*1000) : null
                }).then(() => {
                    location.reload();
                });
            },
            "prefill": {
                "name": userData.name,
                "email": userData.email,
                "contact": userData.phone
            },
            "theme": { "color": "#1e3a8a" }
        };
        const rzp = new Razorpay(options);
        rzp.open();
    }
};

// ====== THEME TOGGLER (DARK MODE) ======
document.getElementById('theme-toggle').addEventListener('click', () => {
    let mode = document.body.getAttribute('data-theme');
    if(mode === 'dark') {
        document.body.removeAttribute('data-theme');
        document.getElementById('theme-toggle').innerText = "🌙 Dark Mode";
    } else {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle').innerText = "☀️ Light Mode";
    }
});

// ====== ADMIN PANEL FORM INTERFACING ======
document.getElementById('admin-add-q-form').addEventListener('submit', e => {
    e.preventDefault();
    db.collection('questions').add({
        question: document.getElementById('adm-q').value,
        optionA: document.getElementById('adm-a').value,
        optionB: document.getElementById('adm-b').value,
        optionC: document.getElementById('adm-c').value,
        optionD: document.getElementById('adm-d').value,
        correctAnswer: document.getElementById('adm-correct').value,
        explanation: document.getElementById('adm-exp').value,
        topic: document.getElementById('adm-topic').value,
        difficulty: document.getElementById('adm-diff').value
    }).then(() => {
        alert("Question Added Successfully into Firestore!");
        document.getElementById('admin-add-q-form').reset();
    });
});

// DOMContentLoaded Core Bootstrap
window.addEventListener('DOMContentLoaded', () => {
    app.initAuth();
});

// ====== AUTH TAB SWITCHING LOGIC ======
function switchAuthTab(tab) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const submitBtn = document.getElementById('auth-submit-btn');
    const regFields = document.querySelectorAll('.reg-field');
    const toggleMsg = document.getElementById('auth-toggle-msg');

    if (tab === 'login') {
        // Login tab nu active karo
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        submitBtn.innerText = 'Login Karo 🚀';
        
        // Register waale extra fields nu huta do
        regFields.forEach(field => {
            field.style.display = 'none';
        });
        
        // Thalle waala text badlo
        toggleMsg.innerHTML = 'Account nahi hai? <span onclick="switchAuthTab(\'register\')">Register karo</span>';
    } else {
        // Register tab nu active karo
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        submitBtn.innerText = 'Register Karo 🎉';
        
        // Full Name ate Phone Number waale fields dikhao
        regFields.forEach(field => {
            field.style.display = 'block';
        });
        
        // Thalle waala text badlo
        toggleMsg.innerHTML = 'Already have an account? <span onclick="switchAuthTab(\'login\')">Login karo</span>';
    }
}

// ====== ਐਡਮਿਨ ਚੈੱਕ ਕਰਨ ਵਾਲਾ ਆਸਾਨ ਕੋਡ ======
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // ਜੇਕਰ ਲਾਗਿਨ ਕਰਨ ਵਾਲੀ ਈਮੇਲ ਤੁਹਾਡੀ ਐਡਮਿਨ ਈਮੇਲ ਹੈ
        if (user.email === "ppb1testapp@protonmail.com") {
            alert("Welcome ਐਡਮਿਨ ਸਾਹਿਬ! ⚙️");
            
            // ਇਹ ਲਾਈਨ ਤੁਹਾਡੇ ਡੈਸ਼ਬੋਰਡ ਉੱਤੇ ਐਡਮਿਨ ਪੈਨਲ ਦਾ ਬਟਨ ਦਿਖਾ ਦੇਵੇਗੀ
            const adminBtn = document.getElementById('admin-panel-btn');
            if(adminBtn) {
                adminBtn.style.display = 'block';
            }
        }
    }
});

// ====== LOGIN & REGISTER SUBMIT LOGIC ======
function handleAuthSubmit() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const loginTab = document.getElementById('login-tab');
    
    // ਇਹ ਚੈੱਕ ਕਰੇਗਾ ਕਿ ਇਸ ਵੇਲੇ Login ਟੈਬ ਖੁੱਲ੍ਹੀ ਹੈ ਜਾਂ Register
    const isLoginMode = loginTab.classList.contains('active');

    if (!email || !password) {
        alert("Kripya email ate password bharein!");
        return;
    }

    if (isLoginMode) {
        // ====== LOGIN LOGIC ======
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("Logged in successfully!");
            })
            .catch((error) => {
                alert("Login Error: " + error.message);
            });
    } else {
        // ====== REGISTER LOGIC ======
        const name = document.getElementById('auth-name').value.trim();
        const phone = document.getElementById('auth-phone').value.trim();

        if (!name || !phone) {
            alert("Kripya Full Name ate Phone Number v bharein!");
            return;
        }

        // 1. ਫਾਇਰਬੇਸ ਵਿੱਚ ਨਵਾਂ ਯੂਜ਼ਰ ਬਣਾਓ
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // 2. ਯੂਜ਼ਰ ਦਾ ਡਾਟਾ ਫਾਇਰਸਟੋਰ (Database) ਵਿੱਚ ਸੇਵ ਕਰੋ
                return db.collection('users').doc(user.uid).set({
                    name: name,
                    email: email,
                    phone: phone,
                    subscriptionStatus: "free", // ਸ਼ੁਰੂ ਵਿੱਚ ਸਭ ਫ੍ਰੀ ਹੋਣਗੇ
                    streak: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                alert("Account successfully register ho gya ਹੈ! 🎉");
            })
            .catch((error) => {
                alert("Registration Error: " + error.message);
            });
    }
}
