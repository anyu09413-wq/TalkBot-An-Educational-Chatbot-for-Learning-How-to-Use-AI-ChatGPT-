// 1. DATA - Massive Keyword Library for "Keyword Magic"
const customQA = [
    // --- AI CORE CONCEPTS ---
    { k: ["spec", "prompt", "rule", "formula", "technique"], a: "The **S.P.E.C. Rule** is your formula for success:<br>• <b>S</b>pecific (Role/Task)<br>• <b>P</b>urpose (Goal)<br>• <b>E</b>xample (Sample data)<br>• <b>C</b>onstraints (Limits). It turns a vague question into a professional answer!" },
    { k: ["hallucination", "wrong", "lie", "fake", "mistake", "error", "fact"], a: "<b>Hallucinations</b> happen because AI is a 'prediction engine,' not a database. It predicts the next word based on probability. Sometimes, it predicts a word that sounds right but is factually false!" },
    { k: ["ai", "artificial intelligence", "robot", "machine", "intelligence"], a: "AI is technology that mimics human intelligence. It can recognize images, translate languages, and solve problems! I am a simple example of 'Rule-based AI'." },
    { k: ["chatgpt", "gpt", "openai", "claude", "gemini", "llm"], a: "Those are 'Large Language Models' (LLMs). They are like my super-intelligent cousins! They use trillions of data points, while I use a set of smart JavaScript rules." },
    { k: ["learn", "training", "algorithm", "dataset", "machine learning"], a: "AI learns through **Machine Learning**. It processes a 'Dataset' (like thousands of cat photos) to learn patterns without being told the rules explicitly." },
    { k: ["future", "job", "danger", "terminator", "scary", "replace"], a: "AI is a tool, not a replacement for humans! The future is about **AI-Human Collaboration**. People who learn to 'prompt' will have a huge advantage." },
    { k: ["ethics", "safe", "privacy", "bias", "fair"], a: "AI Ethics is crucial! We must ensure AI is fair, doesn't leak private data, and isn't used to spread misinformation. Always use AI responsibly!" },

    // --- WEB TECHNOLOGY (HTML/CSS/JS) ---
    { k: ["html", "skeleton", "structure", "tags"], a: "<b>HTML (HyperText Markup Language)</b> is my skeleton. It defines where the buttons, chat window, and text go. Without it, I'd have no body!" },
    { k: ["css", "style", "design", "purple", "glass", "glow", "aesthetic"], a: "<b>CSS (Cascading Style Sheets)</b> is my fashion sense! It creates my purple glow, the 'Glassmorphism' (the blurry transparent look), and the cool animations you see." },
    { k: ["javascript", "js", "brain", "logic", "script"], a: "<b>JavaScript</b> is my brain! 🧠 It allows me to 'think,' check your quiz answers, and match your keywords to these responses in real-time." },
    { k: ["vanilla", "framework", "react", "vue", "angular"], a: "I am built with **Vanilla JS**—that means no heavy frameworks! It's the purest way to learn web development." },
    { k: ["web", "internet", "browser", "chrome", "safari"], a: "I live inside your web browser! Every website you visit is a mix of the same three ingredients: HTML, CSS, and JavaScript." },

    // --- DEVELOPER & TALKBOT INFO ---
    { k: ["who are you", "what is your name", "talkbot", "bot name"], a: "I am **TalkBot X**, your personal AI Learning Assistant. I was built to show how easy it is to start learning about technology." },
    { k: ["developer", "creator", "who made", "ayu", "anyu", "author", "zhang"], a: "I was created by **Anyu Zhang**, a student leader and web developer based in Malaysia 🇲🇾. Anyu loves sociology, psychology, and building clean web apps!" },
    { k: ["malaysia", "kl", "home", "reside"], a: "Terima Kasih! My creator is based in Malaysia, a beautiful country known for its amazing food and diversity!" },
    { k: ["school", "international", "leader", "peer mediator", "leadership"], a: "My creator is a head of a peer mediation group at an international school! That's why I'm designed to be helpful and calm." },

    // --- INTERACTION & CHAT ---
    { k: ["hi", "hello", "hey", "hola", "morning", "afternoon", "yo"], a: "Hello! 👋 Ready to explore the world of AI? Ask me about **SPEC** or try the **Quiz**!" },
    { k: ["thank", "thanks", "good", "cool", "awesome", "nice", "love", "great"], a: "You're very welcome! I'm glad you're enjoying the experience. Let's keep learning!" },
    { k: ["bye", "goodbye", "exit", "stop", "see ya"], a: "Goodbye! Don't forget: stay curious and keep prompting! See you next time. ✨" },
    { k: ["help", "what can i do", "commands", "how to"], a: "You can ask me about **AI basics, Web Development, or the SPEC rule**. You can also play the **Quiz** on the left to test your knowledge!" },
    { k: ["joke", "funny", "laugh"], a: "Why did the computer show up late to work? <br>...Because it had a hard drive! 💾 (Sorry, that's my only joke!)" }
];

// --- LOGIC SECTION ---
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

let currentQuizIdx = 0; let userScore = 0; let masteredCount = 0; let unlockedWikis = new Set();

// CORE FUNCTIONS
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
        // Default response if no keyword is found
        let reply = "That's an interesting question! My database is currently focused on **AI Basics, the SPEC rule, and Web Dev**. Try asking about those keywords!";
        
        // Keyword Matching Algorithm
        for (let item of customQA) {
            if (item.k.some(keyword => text.includes(keyword))) { 
                reply = item.a; 
                break; 
            }
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
    addBotMsg("Hi! 🎓 I'm TalkBot. Ask me anything about AI or try the quiz!");
    document.getElementById('q-text').innerText = quizData[0].q;
};
