/**
 * TalkBot Engine v4.0 - Full Featured Dashboard
 * Includes 10-Question Quiz & Custom Q&A Logic
 */

// 1. Hard-coded Q&A for Free Typing (Audience interaction)
const customQA = [
    { q: ["hi", "hello", "hey"], a: "Hello! How can I help you today?" },
    { q: ["name", "who are you"], a: "I’m an AI assistant. You can call me ChatGPT." },
    { q: ["how are you", "how's it going"], a: "I’m doing well, thank you! How can I assist you?" },
    { q: ["what can you do", "help me"], a: "I can answer questions, explain topics, help with homework, write text, and more." },
    { q: ["what is ai", "define ai"], a: "AI (Artificial Intelligence) is technology that allows machines to learn, think, and solve problems like humans." },
    { q: ["photosynthesis"], a: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce food (glucose) and oxygen." }
];

// 2. 10-Question Speed Quiz Data
const quizData = [
    { q: "Is AI always 100% accurate?", a: false },
    { q: "Does ChatGPT 'think' like a human?", a: false },
    { q: "Can AI help you brainstorm ideas?", a: true },
    { q: "Should you share passwords with AI?", a: false },
    { q: "Is 'Hallucination' when AI lies?", a: true },
    { q: "Does AI have real feelings?", a: false },
    { q: "Can AI summarize long books?", a: true },
    { q: "Should you check AI facts with a book?", a: true },
    { q: "Is AI better than a teacher?", a: false },
    { q: "Can AI write creative stories?", a: true }
];

let currentQuizIdx = 0;
let masteredCount = 0;

// 3. Dialogue Data (Choice-based)
const chatData = {
    "start": {
        message: "Welcome to the Learning Hub! 🎓 I'm TalkBot. Use the buttons below or type your own question in the box!",
        options: [
            { text: "📝 Prompt Rules", next: "rules" },
            { text: "🛡️ Safety Tips", next: "safety" }
        ],
        unlock: "card-2"
    },
    "rules": {
        message: "Remember the **S.P.E.C.** rule: Specific, Purpose, Examples, and Constraints. This makes your prompts 10x better!",
        options: [{ text: "Got it!", next: "start" }],
        mastered: true
    },
    "safety": {
        message: "Never copy AI work without checking it first. Use it to *learn*, not just to *finish*.",
        options: [{ text: "I agree", next: "start" }],
        mastered: true
    }
};

// --- CORE FUNCTIONS ---

// Handle Free Typing (Audience Interaction)
document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    const text = input.value.trim().toLowerCase();
    if(!text) return;

    addUserMsg(input.value);
    input.value = "";

    setTimeout(() => {
        // Search for a match in our custom Q&A list
        let response = "That's a great question! I'm still learning that specific topic. Try asking about AI or Photosynthesis!";
        
        for (let item of customQA) {
            if (item.q.some(keyword => text.includes(keyword))) {
                response = item.a;
                break;
            }
        }

        addBotMsg(response);
    }, 600);
};

// Handle Quiz Logic
function playGame(userChoice) {
    const fb = document.getElementById('q-feedback');
    const questionText = document.getElementById('q-text');
    const correct = quizData[currentQuizIdx].a;

    if (userChoice === correct) {
        fb.innerHTML = "✅ Correct!";
        fb.style.color = "#00b894";
    } else {
        fb.innerHTML = "❌ Wrong!";
        fb.style.color = "#ff8fb1";
    }

    // Move to next question after delay
    setTimeout(() => {
        currentQuizIdx++;
        if (currentQuizIdx < quizData.length) {
            questionText.innerText = quizData[currentQuizIdx].q;
            fb.innerHTML = "";
        } else {
            questionText.innerText = "Quiz Finished! 🏆";
            document.querySelectorAll('.game-btn').forEach(b => b.style.display = 'none');
        }
    }, 1200);
}

// Bot Message Helper
function addBotMsg(text) {
    const display = document.getElementById('chatDisplay');
    const botMsg = document.createElement('div');
    botMsg.className = "msg bot";
    botMsg.innerHTML = `✨ <strong>TalkBot:</strong><br>${text}`;
    display.appendChild(botMsg);
    scrollChat();
}

// User Message Helper
function addUserMsg(text) {
    const display = document.getElementById('chatDisplay');
    const userMsg = document.createElement('div');
    userMsg.className = "msg user";
    userMsg.innerText = text;
    display.appendChild(userMsg);
    scrollChat();
}

function scrollChat() {
    const display = document.getElementById('chatDisplay');
    display.scrollTo({ top: display.scrollHeight, behavior: 'smooth' });
}

// Choice-based render
function renderStep(id) {
    const step = chatData[id];
    addBotMsg(step.message);
    
    const optionsArea = document.getElementById('optionsArea');
    optionsArea.innerHTML = "";
    
    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.innerText = opt.text;
        btn.onclick = () => {
            addUserMsg(opt.text);
            renderStep(opt.next);
        };
        optionsArea.appendChild(btn);
    });

    if(step.unlock) document.getElementById(step.unlock).classList.add('unlocked');
}

// Support Enter Key
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('sendBtn').click();
});

window.onload = () => renderStep('start');
