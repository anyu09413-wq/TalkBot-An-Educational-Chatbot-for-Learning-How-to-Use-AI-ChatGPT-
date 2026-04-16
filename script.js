const customQA = [
    { q: ["hi", "hello"], a: "Hello! How can I help you today?" },
    { q: ["name"], a: "I’m an AI assistant. You can call me ChatGPT." },
    { q: ["how are you"], a: "I’m doing well, thank you! How can I assist you?" },
    { q: ["what can you do"], a: "I can answer questions, explain topics, help with homework, and more." },
    { q: ["what is ai"], a: "AI is technology that allows machines to learn and solve problems like humans." },
    { q: ["photosynthesis"], a: "Photosynthesis is how plants use sunlight to make food and oxygen." }
];

const quizData = [
    { q: "Is AI always 100% accurate?", a: false },
    { q: "Does ChatGPT think like a human?", a: false },
    { q: "Can AI brainstorm ideas?", a: true },
    { q: "Should you share passwords with AI?", a: false },
    { q: "Is 'Hallucination' when AI lies?", a: true },
    { q: "Does AI have real feelings?", a: false },
    { q: "Can AI summarize books?", a: true },
    { q: "Should you verify AI facts?", a: true },
    { q: "Is AI better than a teacher?", a: false },
    { q: "Can AI write stories?", a: true }
];

let currentQuizIdx = 0;
let masteredCount = 0;

const chatData = {
    "start": { message: "Welcome! 🎓 Use the buttons below or type your questions!", options: [{ text: "Prompt Rules", next: "rules" }, { text: "Safety Tips", next: "safety" }] },
    "rules": { message: "Remember S.P.E.C: Specific, Purpose, Example, Constraints!", options: [{ text: "Got it!", next: "start" }], mastered: true },
    "safety": { message: "Never copy AI work without understanding it first.", options: [{ text: "Understood", next: "start" }], mastered: true }
};

function playGame(choice) {
    const fb = document.getElementById('q-feedback');
    const correct = quizData[currentQuizIdx].a;
    fb.innerHTML = (choice === correct) ? "✅ Correct!" : "❌ Wrong!";
    fb.style.color = (choice === correct) ? "#00b894" : "#ff8fb1";

    setTimeout(() => {
        currentQuizIdx++;
        if (currentQuizIdx < quizData.length) {
            document.getElementById('q-text').innerText = quizData[currentQuizIdx].q;
            fb.innerHTML = "";
        } else {
            document.getElementById('q-text').innerText = "Quiz Finished! 🏆";
            document.querySelectorAll('.quiz-opt').forEach(b => b.style.display = 'none');
        }
    }, 1000);
}

document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    const text = input.value.trim().toLowerCase();
    if(!text) return;
    addUserMsg(input.value); input.value = "";
    setTimeout(() => {
        let reply = "Great question! I'm still learning, but check my knowledge cards!";
        for (let item of customQA) { if (item.q.some(k => text.includes(k))) { reply = item.a; break; } }
        addBotMsg(reply);
    }, 600);
};

function clickWiki(topic) {
    let res = "";
    if(topic === 'hallucination') res = "**Hallucination** 🕵️: AI predicts words, it doesn't 'know' facts. Always verify!";
    else if(topic === 'spec') res = "**S.P.E.C.** ✍️: Specific, Purpose, Example, Constraints. Try it now!";
    else if(topic === 'ethics') res = "**Ethics** 🛡️: Use AI to enhance your learning, not to cheat. Be responsible!";
    addBotMsg(res);
}

function addBotMsg(text) {
    const display = document.getElementById('chatDisplay');
    const botMsg = document.createElement('div');
    botMsg.className = "msg bot"; botMsg.innerHTML = `✨ <strong>TalkBot:</strong><br>${text}`;
    display.appendChild(botMsg); scrollChat();
}

function addUserMsg(text) {
    const display = document.getElementById('chatDisplay');
    const userMsg = document.createElement('div');
    userMsg.className = "msg user"; userMsg.innerText = text;
    display.appendChild(userMsg); scrollChat();
}

function renderStep(id) {
    const step = chatData[id]; addBotMsg(step.message);
    const area = document.getElementById('optionsArea'); area.innerHTML = "";
    step.options.forEach(opt => {
        const btn = document.createElement('button'); btn.className = "choice-btn"; btn.innerText = opt.text;
        btn.onclick = () => { addUserMsg(opt.text); renderStep(opt.next); };
        area.appendChild(btn);
    });
    if(step.mastered) { masteredCount++; document.getElementById('mastered-count').innerText = masteredCount; document.getElementById('progress-fill').style.width = (masteredCount*50)+"%"; }
}

function scrollChat() { const d = document.getElementById('chatDisplay'); d.scrollTo({top: d.scrollHeight, behavior: 'smooth'}); }
function resetChat() { location.reload(); }
window.onload = () => { renderStep('start'); document.getElementById('q-text').innerText = quizData[0].q; };
