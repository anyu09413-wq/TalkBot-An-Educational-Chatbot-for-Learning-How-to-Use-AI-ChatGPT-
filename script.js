// ==========================================
// 1. KNOWLEDGE DATABASE (Keyword Magic)
// ==========================================
const customQA = [
    { k: ["spec", "prompt", "rule", "formula", "technique"], a: "The **S.P.E.C. Rule** is your formula for success:<br>• <b>S</b>pecific (Role/Task)<br>• <b>P</b>urpose (Goal)<br>• <b>E</b>xample (Sample data)<br>• <b>C</b>onstraints (Limits). It turns a vague question into a professional answer!" },
    { k: ["hallucination", "wrong", "lie", "fake", "fact", "mistake"], a: "<b>Hallucinations</b> happen because AI is a 'prediction engine.' It predicts words based on probability, which can sometimes lead to confident but false information! Always verify important facts." },
    { k: ["ai", "artificial intelligence", "robot", "machine"], a: "AI is technology that mimics human intelligence. I am a 'Rule-based AI' built to teach you the basics of Prompt Engineering!" },
    { k: ["chatgpt", "gpt", "openai", "gemini", "claude"], a: "Those are Large Language Models (LLMs). They are like my super-intelligent cousins! I am a lightweight version focused on education." },
    { k: ["html", "css", "javascript", "js", "code", "built"], a: "I was built using **HTML** for structure, **CSS** for my purple glow, and **JavaScript** for my brain. No frameworks, just pure vanilla code!" },
    { k: ["developer", "creator", "who made", "ayu", "anyu", "author"], a: "I was created by **Anyu Zhang**, a student leader and developer based in Malaysia 🇲🇾 who loves sociology, psychology, and clean web design!" },
    { k: ["hi", "hello", "hey", "yo"], a: "Hello! 👋 I'm TalkBot. Ready to explore the world of AI? Ask me about **SPEC**, **Hallucinations**, or try the **Quiz**!" },
    { k: ["thank", "thanks", "cool", "awesome", "nice"], a: "You're very welcome! I'm happy to help. Do you want to try the **Prompt Lab** experiments next?" }
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
    ethics: { title: "🛡️ AI Ethics", content: "Always use AI to assist your own brain. If you use it for work, be transparent. Never use AI to bypass critical thinking or skip the learning process." }
};

const labExperiments = [
    {
        title: "Exp 1: Persona",
        bad: "Write a healthy recipe.",
        good: "Act as a **[Persona]** professional nutritionist. Write a **[Specific]** breakfast recipe with **[Constraints]** under 500 calories.",
        lesson: "Adding a Persona makes the AI sound like an expert rather than a generic search engine."
    },
    {
        title: "Exp 2: Purpose",
        bad: "Explain gravity.",
        good: "Explain gravity **[Purpose]** to a 5-year-old using **[Example]** a trampoline analogy to make it easy to visualize.",
        lesson: "Defining your audience (Purpose) changes the complexity of the answer."
    },
    {
        title: "Exp 3: Examples",
        bad: "Write a business email.",
        good: "Write a formal follow-up. **[Example]** Use a tone similar to: 'Dear [Name], I am writing to check in...' but make it more professional.",
        lesson: "Providing a sample 'tone' or format (Example) helps the AI match your specific style."
    },
    {
        title: "Exp 4: Constraints",
        bad: "Summarize this book.",
        good: "Summarize 'The Great Gatsby' **[Constraints]** in exactly 3 bullet points, using no more than 15 words per bullet.",
        lesson: "Constraints prevent the AI from rambling and keep the output focused."
    }
];

// ==========================================
// 3. CORE LOGIC
// ==========================================
let currentQuizIdx = 0, userScore = 0, masteredCount = 0, unlockedWikis = new Set();

// --- Quiz Logic ---
function playGame(choice) {
    const fb = document.getElementById('q-feedback');
    if (choice === quizData[currentQuizIdx].a) { 
        userScore++; 
        fb.innerHTML = "✅ Correct!"; 
        fb.style.color = "#00b894"; 
    } else { 
        fb.innerHTML = "❌ Wrong!"; 
        fb.style.color = "#ff8fb1"; 
    }

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
        }
    }, 1000);
}

// --- Wiki & Lab Logic ---
function openWiki(topic) {
    const data = wikiDetails[topic];
    document.getElementById('wikiBody').innerHTML = `<h1>${data.title}</h1><p style='line-height:1.8; font-size:1.1rem;'>${data.content}</p>`;
    document.getElementById('wikiOverlay').classList.add('active');
    handleMastery(topic);
}

function openLab() {
    let labHTML = `
        <h1 style="color:var(--primary)">🔬 Prompt Lab</h1>
        <p>Select an experiment to see the <b>S.P.E.C. Rule</b> in action:</p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:20px 0;">
            ${labExperiments.map((exp, i) => `<button class="suggest-item" onclick="runExp(${i})" style="margin:0; height:auto; padding:15px;"><b>${exp.title}</b></button>`).join('')}
        </div>
        <div id="exp-res" style="display:none; padding:20px; background:#f9f9f9; border-radius:20px; border:1px dashed var(--primary); animation: fadeInUp 0.4s ease;"></div>
    `;
    document.getElementById('wikiBody').innerHTML = labHTML;
    document.getElementById('wikiOverlay').classList.add('active');
    handleMastery('lab');
}

function runExp(i) {
    const e = labExperiments[i];
    const res = document.getElementById('exp-res');
    res.style.display = "block";
    res.innerHTML = `
        <h3 style="margin-top:0">${e.title}</h3>
        <p><b>Bad Prompt:</b> <span style="color:var(--text-muted)">"${e.bad}"</span></p>
        <p><b>SPEC Prompt:</b> ${e.good}</p>
        <hr style="border:none; border-top:1px solid #eee; margin:10px 0;">
        <p><small><b>Lesson:</b> ${e.lesson}</small></p>
    `;
    addBotMsg(`You've explored **${e.title}** in the Lab!`);
}

function closeWiki() { document.getElementById('wikiOverlay').classList.remove('active'); }

// --- Chat Logic ---
function processInput(text) {
    setTimeout(() => {
        let reply = "That's an interesting question! My training is currently focused on **AI Basics, the SPEC rule, and Web Dev**. Try asking about those!";
        for (let item of customQA) {
            if (item.k.some(kw => text.includes(kw))) { reply = item.a; break; }
        }
        addBotMsg(reply);
    }, 600);
}

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

// --- Progress & UI Helpers ---
function handleMastery(id) {
    if (!unlockedWikis.has(id)) {
        unlockedWikis.add(id);
        masteredCount++;
        document.getElementById('mastered-count').innerText = masteredCount;
        // Total of 4 concepts (3 wikis + 1 lab)
        let percent = (masteredCount / 4) * 100;
        document.getElementById('progress-fill').style.width = percent + "%";
    }
}

function addBotMsg(t) {
    const d = document.getElementById('chatDisplay');
    const m = document.createElement('div');
    m.className = "msg bot"; m.innerHTML = `✨ <strong>TalkBot:</strong><br>${t}`;
    d.appendChild(m); d.scrollTo({top: d.scrollHeight, behavior: 'smooth'});
}

function addUserMsg(t) {
    const d = document.getElementById('chatDisplay');
    const m = document.createElement('div');
    m.className = "msg user"; m.innerText = t;
    d.appendChild(m); d.scrollTo({top: d.scrollHeight, behavior: 'smooth'});
}

function resetChat() { location.reload(); }

window.onload = () => {
    addBotMsg("Hi! 🎓 I'm TalkBot. Ask me anything about AI or master concepts on the right!");
    document.getElementById('q-text').innerText = quizData[0].q;
};
