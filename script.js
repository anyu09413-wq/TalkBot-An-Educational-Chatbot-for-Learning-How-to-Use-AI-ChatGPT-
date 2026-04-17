// ==========================================
// 1. KNOWLEDGE DATABASE (Keyword Magic)
// ==========================================
const customQA = [
    { k: ["spec", "prompt", "rule", "formula"], a: "The **S.P.E.C. Rule** is your formula for success:<br>• <b>S</b>pecific<br>• <b>P</b>urpose<br>• <b>E</b>xample<br>• <b>C</b>onstraints." },
    { k: ["hallucination", "wrong", "lie", "fake", "fact"], a: "<b>Hallucinations</b> happen because AI is a 'prediction engine.' It predicts words based on probability, which can sometimes lead to confident but false information!" },
    { k: ["ai", "artificial intelligence", "robot"], a: "AI is technology that mimics human intelligence. I am a 'Rule-based AI' built to teach you the basics of Prompt Engineering!" },
    { k: ["chatgpt", "gpt", "openai", "gemini"], a: "Those are Large Language Models (LLMs). They are like my super-intelligent cousins! I am a lightweight version focused on education." },
    { k: ["html", "css", "javascript", "js", "code"], a: "I was built using **HTML** for structure, **CSS** for my purple glow, and **JavaScript** for my brain. No frameworks, just pure code!" },
    { k: ["developer", "creator", "who made", "anyu"], a: "I was created by **Anyu Zhang**, a student leader and developer based in Malaysia 🇲🇾 who loves sociology and technology!" },
    { k: ["hi", "hello", "hey"], a: "Hello! 👋 I'm TalkBot. Ready to explore the world of AI? Ask me about **SPEC** or try the **Quiz**!" },
    { k: ["thank", "cool", "awesome"], a: "You're welcome! I'm happy to help. Keep exploring!" }
];

// ==========================================
// 2. QUIZ & WIKI DATA
// ==========================================
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
    ethics: { title: "🛡️ AI Ethics", content: "Always use AI to assist your own brain. If you use it for work, be transparent. Never use AI to bypass critical thinking." }
};

const labExperiments = [
    {
        title: "Exp 1: Persona",
        bad: "Write a healthy recipe.",
        good: "Act as a **[Persona]** nutritionist. Write a **[Specific]** breakfast recipe with **[Constraints]** under 500 calories.",
        lesson: "Personas give the AI an expert 'voice'."
    },
    {
        title: "Exp 2: Purpose",
        bad: "Explain gravity.",
        good: "Explain gravity **[Purpose]** to a 5-year-old using **[Example]** a trampoline analogy.",
        lesson: "Defining your audience changes the complexity of the answer."
    },
    {
        title: "Exp 3: Examples",
        bad: "Write a business email.",
        good: "Write a formal follow-up. **[Example]** Use a tone like: 'Dear [Name], just checking in...' but more professional.",
        lesson: "Examples help the AI match your specific style."
    },
    {
        title: "Exp 4: Constraints",
        bad: "Summarize a book.",
        good: "Summarize 'The Great Gatsby' **[Constraints]** in exactly 3 bullet points, 10 words each.",
        lesson: "Constraints keep the output focused and concise."
    }
];

// ==========================================
// 3. CORE LOGIC
// ==========================================
let currentQuizIdx = 0, userScore = 0, masteredCount = 0, unlockedWikis = new Set();

// --- Quiz Function ---
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
            document.getElementById('q-text').innerHTML = `Quiz Done!<br>Score: ${userScore}/10`;
            document.getElementById('quiz-controls').style.display = 'none';
            fb.innerHTML = "";
        }
    }, 1000);
}

// --- Wiki & Lab Function ---
function openWiki(topic) {
    const data = wikiDetails[topic];
    document.getElementById('wikiBody').innerHTML = `<h1>${data.title}</h1><p>${data.content}</p>`;
    document.getElementById('wikiOverlay').classList.add('active');
    handleMastery(topic);
}

function openLab() {
    let labHTML = `
        <h1>🔬 Prompt Lab</h1>
        <p>Select an experiment to see the <b>S.P.E.C. Rule</b> in action:</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:20px 0;">
            ${labExperiments.map((exp, i) => `<button class="suggest-item" onclick="runExp(${i})">${exp.title}</button>`).join('')}
        </div>
        <div id="exp-res" style="display:none; padding:15px; background:#f0f0ff; border-radius:15px; border:1px dashed var(--primary);"></div>
    `;
    document.getElementById('wikiBody').innerHTML = labHTML;
    document.getElementById('wikiOverlay').classList.add('active');
}

function runExp(i) {
    const e = labExperiments[i];
    const res = document.getElementById('exp-res');
    res.style.display = "block";
    res.innerHTML = `<b>${e.title}</b><br><small>Bad:</small> "${e.bad}"<br><br><small>SPEC:</small> ${e.good}<br><hr>${e.lesson}`;
    addBotMsg(`Experiment **${e.title}** completed!`);
}

function closeWiki() { document.getElementById('wikiOverlay').classList.remove('active'); }

// --- Chat Logic ---
function processInput(text) {
    setTimeout(() => {
        let reply = "Interesting! Try asking about **SPEC, Hallucinations, or HTML**.";
        for (let item of customQA) {
            if (item.k.some(kw => text.includes(kw))) { reply = item.a; break; }
        }
        addBotMsg(reply);
    }, 600);
}

function askSuggested(text) { addUserMsg(text); processInput(text.toLowerCase()); }

document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    if(!input.value.trim()) return;
    addUserMsg(input.value);
    processInput(input.value.toLowerCase());
    input.value = "";
};

// --- Helpers ---
function handleMastery(id) {
    if (!unlockedWikis.has(id)) {
        unlockedWikis.add(id);
        masteredCount++;
        document.getElementById('mastered-count').innerText = masteredCount;
        document.getElementById('progress-fill').style.width = (masteredCount / 4 * 100) + "%";
    }
}

function addBotMsg(t) {
    const d = document.getElementById('chatDisplay');
    const m = document.createElement('div');
    m.className = "msg bot"; m.innerHTML = `✨ <strong>TalkBot:</strong><br>${t}`;
    d.appendChild(m); d.scrollTop = d.scrollHeight;
}

function addUserMsg(t) {
    const d = document.getElementById('chatDisplay');
    const m = document.createElement('div');
    m.className = "msg user"; m.innerText = t;
    d.appendChild(m); d.scrollTop = d.scrollHeight;
}

function resetChat() { location.reload(); }

window.onload = () => {
    addBotMsg("Welcome! I'm TalkBot. Ready to master AI?");
    document.getElementById('q-text').innerText = quizData[0].q;
};
