// --- Game State & Data ---
let xp = 0;
let currentQuizIdx = 0;
const totalQuestions = 10;

const quizData = [
    { q: "Is AI always 100% accurate?", a: false, expl: "AI can hallucinate and make mistakes." },
    { q: "Can AI feel human emotions?", a: false, expl: "AI simulates emotion; it doesn't feel them." },
    { q: "Should you share passwords with AI?", a: false, expl: "Never share PII with public AI models." },
    { q: "Does 'S' in SPEC stand for Specific?", a: true, expl: "Specific, Persona, Exact Format, Constraints." },
    { q: "Can AI help with brainstorming?", a: true, expl: "AI is excellent at divergent thinking." },
    { q: "Is AI a 'Prediction Engine'?", a: true, expl: "It predicts the next likely word in a sequence." },
    { q: "Do AI models have real souls?", a: false, expl: "They are complex mathematical algorithms." },
    { q: "Can AI summarize long articles?", a: true, expl: "Summarization is one of AI's core strengths." },
    { q: "Is 'Hallucination' a technical term?", a: true, expl: "It describes confident but false outputs." },
    { q: "Should you fact-check AI results?", a: true, expl: "Always verify important information." }
];

const botResponses = {
    "spec": "The <b>S.P.E.C. Rule</b> is your formula for success:<br>• <b>S</b>pecific<br>• <b>P</b>ersona<br>• <b>E</b>xact Format<br>• <b>C</b>onstraints",
    "hallucination": "<b>Hallucination</b> happens when AI creates facts that sound true but are totally made up. Always double-check!",
    "safety": "<b>Safety First:</b> Never input private data like passwords, addresses, or sensitive health info into AI chats.",
    "ai": "AI is a <b>Prediction Engine</b>. It uses patterns from massive amounts of data to guess what should come next.",
    "hello": "Hello! I am TalkBot X. How can I help you master AI today?",
    "hi": "Hi there! Ready to level up your prompting skills?",
    "default": "That's an interesting point! Try asking me about 'SPEC', 'Hallucinations', or 'AI Logic'."
};

// --- Initialization ---
window.onload = () => {
    addMessage("TalkBot X <b>System Initialized</b>. Ready for instructions.", "bot");
    loadQuizQuestion();
    updateProgress();

    // Event Listeners
    document.getElementById('sendBtn').onclick = handleUserInput;
    document.getElementById('userInput').onkeypress = (e) => {
        if (e.key === 'Enter') handleUserInput();
    };
};

// --- Chat Logic ---
function handleUserInput() {
    const inputField = document.getElementById('userInput');
    const text = inputField.value.trim();
    
    if (text) {
        processQuery(text);
        inputField.value = "";
    }
}

function processQuery(text) {
    addMessage(text, "user");

    // Artificial delay for "thinking" feel
    setTimeout(() => {
        const lowerText = text.toLowerCase();
        let reply = botResponses.default;

        if (lowerText.includes("spec")) reply = botResponses.spec;
        else if (lowerText.includes("hallucination")) reply = botResponses.hallucination;
        else if (lowerText.includes("safe") || lowerText.includes("ethic")) reply = botResponses.safety;
        else if (lowerText.includes("what is ai")) reply = botResponses.ai;
        else if (lowerText.includes("hi") || lowerText.includes("hello")) reply = botResponses.hello;

        addMessage(reply, "bot");
    }, 600);
}

function addMessage(text, sender) {
    const chatDisplay = document.getElementById('chatDisplay');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg msg-${sender}`;
    msgDiv.innerHTML = text;
    
    chatDisplay.appendChild(msgDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Shortcut for the Right-Side Quick Actions
function ask(topic) {
    processQuery(topic);
}

// --- Quiz Logic ---
function loadQuizQuestion() {
    const qText = document.getElementById('q-text');
    const feedback = document.getElementById('q-feedback');
    const options = document.getElementById('q-options');

    if (currentQuizIdx < totalQuestions) {
        qText.innerText = quizData[currentQuizIdx].q;
        feedback.innerText = "";
        options.style.display = "flex";
    } else {
        qText.innerHTML = "<b>Quiz Complete!</b><br>You are an AI Master.";
        options.style.display = "none";
        confettiEffect();
    }
}

function checkQuiz(userChoice) {
    const feedback = document.getElementById('q-feedback');
    const correct = quizData[currentQuizIdx].a;

    if (userChoice === correct) {
        feedback.innerText = "Correct! +10 XP";
        feedback.style.color = "var(--success)";
        xp += 10;
    } else {
        feedback.innerText = "Incorrect. " + quizData[currentQuizIdx].expl;
        feedback.style.color = "var(--danger)";
    }

    setTimeout(() => {
        currentQuizIdx++;
        updateProgress();
        loadQuizQuestion();
    }, 1500);
}

function updateProgress() {
    const masteredCount = document.getElementById('mastered-count');
    const progressFill = document.getElementById('progress-fill');
    
    masteredCount.innerText = `${currentQuizIdx}/${totalQuestions}`;
    const percentage = (currentQuizIdx / totalQuestions) * 100;
    progressFill.style.width = `${percentage}%`;
}

function confettiEffect() {
    const panel = document.querySelector('.sidebar-left');
    // Just a quick visual "pop" to signify completion
    document.body.style.boxShadow = "inset 0 0 100px var(--primary-glow)";
    setTimeout(() => document.body.style.boxShadow = "none", 500);
}
