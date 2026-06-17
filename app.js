// ============================================
// 🔥 FIREBASE CONFIG (ਤੁਹਾਡੀਆਂ KEYS ਪਾਓ)
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyC0KNFMjfrbBiifyP4kkcqxz-O8tzM2ak0",
  authDomain: "punjabpoliceb1-821e2.firebaseapp.com",
  projectId: "punjabpoliceb1-821e2",
  storageBucket: "punjabpoliceb1-821e2.firebasestorage.app",
  messagingSenderId: "62742364086",
  appId: "1:62742364086:web:ef97fb8ad9f4d114bc8b17"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ============================================
// 💳 RAZORPAY KEY
// ============================================
const RAZORPAY_KEY_ID = "rzp_test_T2n61qsuDtS9f5";

// ============================================
// 🔊 SOUND EFFECTS (Base64 Embedded)
// ============================================
let soundEnabled = true;

// ਛੋਟੇ ਸਾਊਂਡ ਫਾਈਲਾਂ (Base64)
const SOUNDS = {
  correct: 'data:audio/wav;base64,UklGRlQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAFAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC......',
  wrong: 'data:audio/wav;base64,UklGRlQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAFAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC......',
  click: 'data:audio/wav;base64,UklGRlQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAFAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC......'
};

function playSound(type) {
  if (!soundEnabled) return;
  try {
    const audio = new Audio(SOUNDS[type]);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Sound error:', e));
  } catch(e) {}
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById('sound-btn').textContent = soundEnabled ? '🔊' : '🔇';
  localStorage.setItem('soundEnabled', soundEnabled);
}

// Load sound preference
if (localStorage.getItem('soundEnabled') === 'false') {
  soundEnabled = false;
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('sound-btn');
    if (btn) btn.textContent = '🔇';
  });
}

// ============================================
// 📚 6 ਵਿਸ਼ੇ (B1 Test Subjects)
// ============================================
const SUBJECTS = [
  { id: 'pp_rules', name: 'Punjab Police Rules, 1934', icon: '📕', desc: 'PP Rules, ਚੈਪਟਰ ਅਤੇ ਨਿਯਮ' },
  { id: 'pp_act', name: 'Punjab Police Act', icon: '📗', desc: 'ਪੰਜਾਬ ਪੁਲਿਸ ਐਕਟ ਦੀਆਂ ਧਾਰਾਵਾਂ' },
  { id: 'bnss_bns_bsa', name: 'BNSS / BNS / BSA', icon: '📘', desc: 'ਨਵੇਂ ਕ੍ਰਿਮੀਨਲ ਕਾਨੂੰਨ 2023' },
  { id: 'dept_orders', name: 'ਵਿਭਾਗੀ ਹੁਕਮ', icon: '📙', desc: 'Departmental Orders & SOPs' },
  { id: 'gk', name: 'General Knowledge', icon: '🌍', desc: 'ਸਧਾਰਨ ਗਿਆਨ ਅਤੇ ਕਰੰਟ ਅਫੇਅਰਜ਼' },
  { id: 'math', name: 'Mathematics', icon: '🔢', desc: 'ਗਣਿਤ ਅਤੇ ਰੀਜ਼ਨਿੰਗ' }
];

// ============================================
// 🚫 DISPOSABLE EMAIL BLOCKER
// ============================================
const disposableDomains = [
  'temp-mail.org', '10minutemail.com', 'guerrillamail.com', 
  'mailinator.com', 'yopmail.com', 'throwawaymail.com',
  'tempmail.com', 'dispostable.com', 'fakeinbox.com'
];

function isDisposableEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}

// ============================================
// 🔐 AUTH - REGISTER FLOW (3 Steps)
// ============================================
let regData = {};
let confirmationResult = null;

function toggleAuthMode(mode) {
  playSound('click');
  if (mode === 'register') {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  } else {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
    // Reset register steps
    document.getElementById('reg-step1').style.display = 'block';
    document.getElementById('reg-step2').style.display = 'none';
    document.getElementById('reg-step3').style.display = 'none';
  }
}

function goToStep2() {
  playSound('click');
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const pass = document.getElementById('reg-pass').value;

  if (!name || !email || !pass) {
    alert('❌ ਸਾਰੇ ਖੇਤਰ ਭਰੋ!');
    return;
  }
  if (pass.length < 6) {
    alert('❌ ਪਾਸਵਰਡ ਘੱਟੋ-ਘੱਟ 6 ਅੱਖਰ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ!');
    return;
  }
  if (isDisposableEmail(email)) {
    alert('❌ ਨਕਲੀ/ਡਿਸਪੋਜੇਬਲ ਈਮੇਲ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਅਸਲੀ ਈਮੇਲ (Gmail/Yahoo) ਵਰਤੋ।');
    return;
  }

  regData = { name, email, pass };
  document.getElementById('reg-step1').style.display = 'none';
  document.getElementById('reg-step2').style.display = 'block';
}

function sendOTP() {
  playSound('click');
  const phone = document.getElementById('reg-phone').value.trim();
  
  if (!phone.startsWith('+91') || phone.length < 13) {
    alert('❌ ਕਿਰਪਾ ਕਰਕੇ +91 ਨਾਲ ਪੂਰਾ ਮੋਬਾਈਲ ਨੰਬਰ ਪਾਓ');
    return;
  }

  const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('reg-phone', {
    'size': 'invisible'
  });

  auth.signInWithPhoneNumber(phone, recaptchaVerifier)
    .then(result => {
      confirmationResult = result;
      document.getElementById('reg-step2').style.display = 'none';
      document.getElementById('reg-step3').style.display = 'block';
      alert('✅ OTP ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ!');
    })
    .catch(error => {
      alert('❌ ਗਲਤੀ: ' + error.message);
      console.error(error);
    });
}

async function verifyOTPAndRegister() {
  const otp = document.getElementById('reg-otp').value.trim();
  
  try {
    await confirmationResult.confirm(otp);
    
    // ਹੁਣ Firebase Email/Password Auth ਨਾਲ ਅਕਾਊਂਟ ਬਣਾਓ
    const userCred = await auth.createUserWithEmailAndPassword(regData.email, regData.pass);
    const user = userCred.user;
    
    // Display name set ਕਰੋ
    await user.updateProfile({ displayName: regData.name });
    
    // Firestore ਵਿੱਚ user data ਸੇਵ ਕਰੋ
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      name: regData.name,
      email: regData.email,
      phone: regData.phone || document.getElementById('reg-phone').value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      hasTrialUsed: false,
      subscriptionStatus: 'free',
      streak: 1,
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
      totalScore: 0
    });
    
    playSound('correct');
    alert('✅ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲ! ਸਵਾਗਤ ਹੈ, ' + regData.name + ' ਜੀ!');
    showApp(user.uid);
    
  } catch (error) {
    alert('❌ ਗਲਤੀ: ' + error.message);
    console.error(error);
  }
}

// ============================================
// 🔐 AUTH - LOGIN FLOW (Email + Password)
// ============================================
async function handleLogin(e) {
  e.preventDefault();
  playSound('click');
  
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pass = document.getElementById('login-pass').value;

  try {
    const userCred = await auth.signInWithEmailAndPassword(email, pass);
    const user = userCred.user;
    
    // Streak update
    await updateStreak(user.uid);
    playSound('correct');
    showApp(user.uid);
    
  } catch (error) {
    let msg = '❌ ਲੌਗਇਨ ਫੇਲ!';
    if (error.code === 'auth/user-not-found') msg = '❌ ਇਸ ਈਮੇਲ ਨਾਲ ਕੋਈ ਅਕਾਊਂਟ ਨਹੀਂ ਮਿਲਿਆ';
    else if (error.code === 'auth/wrong-password') msg = '❌ ਗਲਤ ਪਾਸਵਰਡ!';
    else if (error.code === 'auth/invalid-email') msg = '❌ ਗਲਤ ਈਮੇਲ ਫਾਰਮੈਟ';
    else if (error.code === 'auth/too-many-requests') msg = '❌ ਬਹੁਤ ਜ਼ਿਆਦਾ ਕੋਸ਼ਿਸ਼ਾਂ। ਬਾਅਦ ਵਿੱਚ ਕੋਸ਼ਿਸ਼ ਕਰੋ।';
    alert(msg);
  }
}

async function updateStreak(uid) {
  const today = new Date().toDateString();
  const doc = await db.collection('users').doc(uid).get();
  const data = doc.data();
  const lastLogin = data.lastLogin?.toDate()?.toDateString();
  
  if (lastLogin === today) return;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastLogin === yesterday.toDateString()) {
    await db.collection('users').doc(uid).update({
      streak: firebase.firestore.FieldValue.increment(1),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
  } else {
    await db.collection('users').doc(uid).update({
      streak: 1,
      lastLogin: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

async function showApp(uid) {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
  document.getElementById('sound-btn').style.display = 'block';
  
  const doc = await db.collection('users').doc(uid).get();
  const data = doc.data();
  
  document.getElementById('user-greeting').innerHTML = 
    `ਸਵਾਗਤ ਹੈ, ${data.name}! <span id="streak-badge" class="streak-badge">🔥 ${data.streak || 0} ਦਿਨ</span>`;
  
  loadTopics();
  loadLeaderboard();
  loadHistory(uid);
}

function handleLogout() {
  if (confirm('ਕੀ ਤੁਸੀਂ ਲੌਗਆਊਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?')) {
    playSound('click');
    auth.signOut();
    location.reload();
  }
}

// ============================================
// 📚 STUDY
// ============================================
async function loadTopics() {
  const grid = document.getElementById('topics-grid');
  const testGrid = document.getElementById('test-topics-grid');
  
  let topicsHTML = '';
  
  for (const subject of SUBJECTS) {
    const snapshot = await db.collection('questions')
      .where('topic', '==', subject.id)
      .get();
    
    topicsHTML += `
      <div class="topic-card" onclick="openTopic('${subject.id}', '${subject.name}')">
        <h3>${subject.icon} ${subject.name}</h3>
        <p>${subject.desc}</p>
        <span class="count">${snapshot.size} ਸਵਾਲ</span>
      </div>
    `;
  }
  
  grid.innerHTML = topicsHTML;
  testGrid.innerHTML = topicsHTML.replace(/openTopic/g, 'startTopicTest');
}

async function openTopic(topicId, topicName) {
  playSound('click');
  document.getElementById('topic-content').style.display = 'block';
  document.getElementById('topic-title').textContent = topicName;
  
  const materialDiv = document.getElementById('topic-material');
  materialDiv.innerHTML = '<div class="loader"><div class="spinner"></div>ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...</div>';
  
  const snapshot = await db.collection('study_material')
    .where('topic', '==', topicId)
    .get();
  
  if (snapshot.empty) {
    materialDiv.innerHTML = '<p style="text-align:center; padding:2rem;">ਇਸ ਵਿਸ਼ੇ ਲਈ ਸਟੱਡੀ ਮਟੀਰੀਅਲ ਜਲਦੀ ਹੀ ਉਪਲਬਧ ਹੋਵੇਗਾ।</p>';
    return;
  }
  
  let html = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    html += `
      <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border-left: 4px solid var(--primary);">
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">${data.heading}</h3>
        <div style="color: var(--text-light); line-height: 1.8;">${data.content}</div>
      </div>
    `;
  });
  
  materialDiv.innerHTML = html;
}

function backToTopics() {
  playSound('click');
  document.getElementById('topic-content').style.display = 'none';
}

// ============================================
// 📝 TEST
// ============================================
let currentTest = [];
let currentQuestion = 0;
let userAnswers = [];
let score = 0;
let currentTopicId = '';
let timeLeft = 600;
let timerInterval;

async function startTopicTest(topicId, topicName) {
  playSound('click');
  
  const uid = auth.currentUser.uid;
  const userDoc = await db.collection('users').doc(uid).get();
  const userData = userDoc.data();
  
  if (userData.subscriptionStatus === 'free' && userData.hasTrialUsed) {
    showPaymentOptions();
    return;
  }
  
  currentTopicId = topicId;
  
  const snapshot = await db.collection('questions')
    .where('topic', '==', topicId)
    .get();
  
  if (snapshot.empty) {
    alert('❌ ਇਸ ਵਿਸ਼ੇ ਲਈ ਹਾਲੇ ਕੋਈ ਸਵਾਲ ਉਪਲਬਧ ਨਹੀਂ ਹਨ।');
    return;
  }
  
  currentTest = [];
  snapshot.forEach(doc => {
    currentTest.push({ id: doc.id, ...doc.data() });
  });
  
  currentTest = currentTest.sort(() => Math.random() - 0.5).slice(0, 10);
  
  currentQuestion = 0;
  userAnswers = new Array(currentTest.length).fill(null);
  score = 0;
  timeLeft = 600;
  
  document.getElementById('test-home').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('q-total').textContent = currentTest.length;
  
  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const q = currentTest[currentQuestion];
  document.getElementById('q-num').textContent = currentQuestion + 1;
  document.getElementById('question-text').textContent = `${currentQuestion + 1}. ${q.question}`;
  document.getElementById('progress').style.width = `${((currentQuestion + 1)/currentTest.length)*100}%`;

  const optsDiv = document.getElementById('options-container');
  optsDiv.innerHTML = '';
  
  const options = [q.optionA, q.optionB, q.optionC, q.optionD];
  options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option' + (userAnswers[currentQuestion] === i ? ' selected' : '');
    div.textContent = opt;
    div.onclick = () => selectOption(i);
    optsDiv.appendChild(div);
  });

  document.getElementById('prev-btn').disabled = currentQuestion === 0;
  document.getElementById('next-btn').style.display = currentQuestion === currentTest.length - 1 ? 'none' : 'inline-block';
  document.getElementById('submit-btn').style.display = currentQuestion === currentTest.length - 1 ? 'inline-block' : 'none';
}

function selectOption(idx) {
  playSound('click');
  userAnswers[currentQuestion] = idx;
  renderQuestion();
}

function nextQuestion() { 
  playSound('click');
  if(currentQuestion < currentTest.length - 1) { 
    currentQuestion++; 
    renderQuestion(); 
  } 
}
function prevQuestion() { 
  playSound('click');
  if(currentQuestion > 0) { 
    currentQuestion--; 
    renderQuestion(); 
  } 
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    document.getElementById('timer').textContent = `${m}:${s.toString().padStart(2,'0')}`;
    if(timeLeft <= 0) submitQuiz();
  }, 1000);
}

async function submitQuiz() {
  clearInterval(timerInterval);
  
  score = 0;
  currentTest.forEach((q, i) => {
    const userAns = userAnswers[i];
    const correctMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const correctIdx = correctMap[q.correctAnswer.toUpperCase()];
    if (userAns === correctIdx) score++;
  });
  
  const uid = auth.currentUser.uid;
  const timeTaken = 600 - timeLeft;
  
  await db.collection('users').doc(uid)
    .collection('testHistory').add({
      topic: currentTopicId,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      score: score,
      total: currentTest.length,
      timeTaken: timeTaken,
      answers: userAnswers
    });
  
  await db.collection('users').doc(uid).update({
    totalScore: firebase.firestore.FieldValue.increment(score),
    hasTrialUsed: true
  });
  
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'block';
  document.getElementById('score-display').textContent = `${score}/${currentTest.length}`;
  
  const percent = (score / currentTest.length) * 100;
  if (percent >= 80) {
    playSound('correct');
    document.getElementById('result-msg').textContent = "🏆 ਬਹੁਤ ਵਧੀਆ!";
  } else if (percent >= 50) {
    playSound('correct');
    document.getElementById('result-msg').textContent = "👍 ਵਧੀਆ ਪ੍ਰੋਗਰੈਸ!";
  } else {
    playSound('wrong');
    document.getElementById('result-msg').textContent = "📚 ਹੋਰ ਸਟੱਡੀ ਦੀ ਲੋੜ";
  }
  
  document.getElementById('result-desc').textContent = 
    percent >= 50 ? "ਤੁਸੀਂ B1 Test ਲਈ ਤਿਆਰ ਹੋ। ਅਭਿਆਸ ਜਾਰੀ ਰੱਖੋ!" : 
    "ਸਟੱਡੀ ਸੈਕਸ਼ਨ ਤੋਂ ਰਿਵਾਈਜ਼ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਟੈਸਟ ਦਿਓ।";
  
  const rev = document.getElementById('review-section');
  rev.innerHTML = '<h3 style="margin-bottom: 1rem;">📖 ਜਵਾਬ ਰਿਵਿਊ</h3>';
  
  currentTest.forEach((q, i) => {
    const userAns = userAnswers[i] !== null ? [q.optionA, q.optionB, q.optionC, q.optionD][userAnswers[i]] : 'ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ';
    const correctMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    const correctAns = [q.optionA, q.optionB, q.optionC, q.optionD][correctMap[q.correctAnswer.toUpperCase()]];
    const isCorrect = userAnswers[i] === correctMap[q.correctAnswer.toUpperCase()];
    
    rev.innerHTML += `
      <div style="margin: 1rem 0; padding: 1rem; background: #f8fafc; border-radius: 8px;">
        <div style="font-weight: 600; margin-bottom: 0.5rem;">ਸ${i+1}: ${q.question}</div>
        <div style="padding: 0.4rem; border-radius: 6px; background: ${isCorrect ? '#d1fae5' : '#fee2e2'};">
          ਤੁਹਾਡਾ ਜਵਾਬ: ${userAns} ${isCorrect ? '✅' : '❌'}
        </div>
        ${!isCorrect ? `<div style="padding: 0.4rem; border-radius: 6px; background: #d1fae5; margin-top: 0.3rem;">ਸਹੀ ਜਵਾਬ: ${correctAns}</div>` : ''}
        ${q.explanation ? `<div style="margin-top: 0.5rem; font-size: 0.9rem; color: #64748b;">💡 ${q.explanation}</div>` : ''}
      </div>
    `;
  });
  
  loadHistory(uid);
  loadLeaderboard();
}

function resetQuiz() {
  playSound('click');
  document.getElementById('quiz-results').style.display = 'none';
  document.getElementById('test-home').style.display = 'block';
}

function backToTestHome() {
  resetQuiz();
}

// ============================================
// 💰 PAYMENT
// ============================================
function showPaymentOptions() {
  const choice = confirm(
    'ਤੁਹਾਡਾ ਫ੍ਰੀ ਟ੍ਰਾਇਲ ਖਤਮ ਹੋ ਗਿਆ ਹੈ!\n\n' +
    '✅ "ਹਾਂ" = ₹20 ਦਾ 1 ਟੈਸਟ ਖਰੀਦੋ\n' +
    '❌ "ਨਹੀਂ" = ₹149 ਦਾ ਮਾਸਿਕ ਸਬਸਕ੍ਰਿਪਸ਼ਨ'
  );
  
  if (choice) {
    initiatePayment(20, 'per_test');
  } else {
    initiatePayment(149, 'monthly');
  }
}

function initiatePayment(amount, type) {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100,
    currency: 'INR',
    name: 'Punjab Police B1 Test Prep',
    description: type === 'per_test' ? 'ਇੱਕ ਟੈਸਟ' : 'ਮਾਸਿਕ ਸਬਸਕ੍ਰਿਪਸ਼ਨ',
    handler: async function(response) {
      const uid = auth.currentUser.uid;
      const expiryDate = type === 'monthly' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
        : null;
      
      await db.collection('users').doc(uid).update({
        subscriptionStatus: 'active',
        hasTrialUsed: true,
        paymentId: response.razorpay_payment_id,
        subscriptionType: type,
        subscriptionExpiry: expiryDate
      });
      
      playSound('correct');
      alert('✅ ਪੇਮੈਂਟ ਸਫਲ! ਹੁਣ ਤੁਸੀਂ ਟੈਸਟ ਦੇ ਸਕਦੇ ਹੋ।');
      location.reload();
    },
    prefill: {
      email: auth.currentUser.email
    },
    theme: { color: '#1e3a8a' }
  };
  
  const rzp = new Razorpay(options);
  rzp.open();
}

// ============================================
// 🏆 LEADERBOARD
// ============================================
async function loadLeaderboard() {
  const snapshot = await db.collection('users')
    .orderBy('totalScore', 'desc')
    .limit(10)
    .get();
  
  const list = document.getElementById('leaderboard-list');
  
  if (snapshot.empty) {
    list.innerHTML = '<p style="text-align:center; padding:2rem;">ਹਾਲੇ ਕੋਈ ਡਾਟਾ ਨਹੀਂ। ਪਹਿਲਾਂ ਟੈਸਟ ਦਿਓ!</p>';
    return;
  }
  
  let html = '';
  let rank = 1;
  snapshot.forEach(doc => {
    const data = doc.data();
    const name = data.name || 'ਯੂਜ਼ਰ';
    html += `
      <div class="leaderboard-item">
        <div>
          <span class="rank">#${rank}</span>
          <span>${name}</span>
        </div>
        <div><strong>${data.totalScore || 0} ਅੰਕ</strong></div>
      </div>
    `;
    rank++;
  });
  
  list.innerHTML = html;
}

// ============================================
// 📊 HISTORY
// ============================================
async function loadHistory(uid) {
  const snapshot = await db.collection('users').doc(uid)
    .collection('testHistory')
    .orderBy('date', 'desc')
    .limit(20)
    .get();
  
  const list = document.getElementById('history-list');
  
  if (snapshot.empty) {
    list.innerHTML = '<p style="text-align:center; padding:2rem;">ਹਾਲੇ ਕੋਈ ਟੈਸਟ ਨਹੀਂ ਦਿੱਤਾ।</p>';
    return;
  }
  
  let html = '';
  snapshot.forEach(doc => {
    const data = doc.data();
    const date = data.date?.toDate()?.toLocaleDateString('pa-IN') || 'ਅੱਜ';
    const subjectName = SUBJECTS.find(s => s.id === data.topic)?.name || data.topic;
    html += `
      <div class="leaderboard-item">
        <div>
          <div style="font-weight: 600;">${subjectName}</div>
          <div style="font-size: 0.85rem; color: var(--text-light);">${date}</div>
        </div>
        <div><strong>${data.score}/${data.total}</strong></div>
      </div>
    `;
  });
  
  list.innerHTML = html;
}

// ============================================
// 🌙 DARK MODE
// ============================================
function toggleDarkMode() {
  playSound('click');
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// ============================================
// 🧭 NAVIGATION
// ============================================
function switchSection(id) {
  playSound('click');
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.nav-btn[data-target="${id}"]`).classList.add('active');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchSection(btn.dataset.target));
});

// ============================================
// 🔍 AUTH STATE
// ============================================
auth.onAuthStateChanged(user => {
  if (user) {
    showApp(user.uid);
  }
});
