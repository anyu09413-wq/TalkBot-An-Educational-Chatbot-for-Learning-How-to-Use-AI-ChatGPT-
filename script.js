// 1. DATA
const customQA = [
    { q: ["what is ai", "define ai"], a: "Artificial Intelligence (AI) is technology that allows computers to learn, reason, and solve problems similar to human intelligence." },
    { q: ["how does ai learn", "training"], a: "AI learns through **Machine Learning**. It analyzes massive datasets to find patterns. It's like a student practicing millions of math problems until it understands the logic!" },
    { q: ["prompt rules", "spec"], a: "The best formula is the **S.P.E.C. Rule**: be Specific, state your Purpose, provide Examples, and set Constraints." },
    { q: ["is ai always right", "hallucination"], a: "No. AI predicts the most likely next word, which can lead to 'Hallucinations' where it makes up facts. Always verify important info!" },
    { q: ["hi", "hello"], a: "Hi! I'm TalkBot. Ready to learn about AI?" }
];

const quizData = [
    { q: "Is AI always 100% accurate?", a: false },
    { q: "Does ChatGPT think exactly like a human?", a: false },
    { q: "Can AI help you brainstorm ideas?", a: true },
    { q: "Should you share passwords with AI?", a: false },
    { q: "Is 'Hallucination' when AI makes up facts?", a: true },
    { q: "Does AI have real feelings?", a: false },
    { q: "Can AI summarize long books?", a: true },
    { q: "Should you check AI facts with a book?", a: true },
    { q: "Is AI better than a teacher?", a: false },
    { q: "Can AI write creative stories?", a: true }
];

const wikiDetails = {
    hallucination: { title: "📖 Hallucination", content: "AI models don't have a 'fact database.' They are probability engines that predict the next word. When data is missing, they 'guess' to stay fluent, creating false info." },
    spec: { title: "✍️ S.P.E.C. Rule", content: "Specific: Define the role. Purpose: Define the goal. Example: Show a sample. Constraints: Define limits. This turns vague questions into professional answers." },
    ethics: { title: "🛡️ AI Ethics", content: "Always use AI to assist your own brain. If you use it for work, be transparent. Never use AI to bypass critical thinking or skip learning." }
};

let currentQuizIdx = 0;
let userScore = 0;
let masteredCount = 0;
let unlockedWikis = new Set();

// 2. CORE FUNCTIONS
function playGame(choice) {
    const fb = document.getElementById('q-feedback');
    if (choice === quizData[currentQuizIdx].a) { userScore++; fb.innerHTML = "✅ Correct!"; fb.style.color = "#00b894"; }
    else { fb.innerHTML = "❌ Wrong!"; fb.style.color = "#ff8fb1"; }

    setTimeout(() => {
        currentQuizIdx++;
        if (currentQuizIdx < quizData.length) {
            document.getElementById('q-text').innerText = quizData[currentQuizIdx].q;
            fb.innerHTML = "";
        } else {
            let rank = userScore > 7 ? "Expert! 🏆" : "Learner! 📖";
            document.getElementById('q-text').innerHTML = `Quiz Done!<br>Score: ${userScore}/10<br>${rank}`;
            document.getElementById('quiz-controls').style.display = 'none';
            fb.innerHTML = "";
            updateProgress();
        }
    }, 1000);
}

function openWiki(topic) {
    const data = wikiDetails[topic];
    document.getElementById('wikiBody').innerHTML = `<h1>${data.title}</h1><p style='line-height:1.8; font-size:1.1rem;'>${data.content}</p>`;
    document.getElementById('wikiOverlay').classList.add('active');
    if (!unlockedWikis.has(topic)) {
        unlockedWikis.add(topic);
        masteredCount++;
        updateProgress();
    }
}

function closeWiki() { document.getElementById('wikiOverlay').classList.remove('active'); }

function askSuggested(text) {
    addUserMsg(text);
    processInput(text.toLowerCase());
}

document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if(!text) return;
    addUserMsg(text);
    processInput(text.toLowerCase());
    input.value = "";
};

function processInput(text) {
    setTimeout(() => {
        let reply = "That's a good question! Try asking about AI, Hallucinations, or the SPEC rule!";
        for (let item of customQA) {
            if (item.q.some(k => text.includes(k))) { reply = item.a; break; }
        }
        addBotMsg(reply);
    }, 600);
}

function updateProgress() {
    document.getElementById('mastered-count').innerText = masteredCount;
    let percent = (masteredCount / 3) * 100;
    document.getElementById('progress-fill').style.width = percent + "%";
}

function addBotMsg(text) {
    const d = document.getElementById('chatDisplay');
    const m = document.createElement('div');
    m.className = "msg bot"; m.innerHTML = `✨ <strong>TalkBot:</strong><br>${text}`;
    d.appendChild(m); d.scrollTo({top: d.scrollHeight, behavior: 'smooth'});
}

function addUserMsg(text) {
    const d = document.getElementById('chatDisplay');
    const m = document.createElement('div');
    m.className = "msg user"; m.innerText = text;
    d.appendChild(m); d.scrollTo({top: d.scrollHeight, behavior: 'smooth'});
}

function resetChat() { location.reload(); }

window.onload = () => {
    addBotMsg("Hi! 🎓 I'm TalkBot. Ask me anything or try the quiz!");
    document.getElementById('q-text').innerText = quizData[0].q;
};
