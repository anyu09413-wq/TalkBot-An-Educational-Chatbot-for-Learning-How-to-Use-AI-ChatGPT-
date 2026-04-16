const customQA = [
    { q: ["hi", "hello", "hey"], a: "Hello! How can I help you today?" },
    { q: ["name"], a: "I’m an AI assistant. You can call me ChatGPT." },
    { q: ["how are you"], a: "I’m doing well, thank you! How can I assist you?" },
    { q: ["what can you do"], a: "I can answer questions, explain topics, help with homework, write text, and more." },
    { q: ["what is ai"], a: "AI (Artificial Intelligence) is technology that allows machines to learn, think, and solve problems like humans." },
    { q: ["photosynthesis"], a: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce food (glucose) and oxygen." }
];

const quizData = [
    { q: "Is AI always 100% accurate?", a: false },
    { q: "Does ChatGPT 'think' exactly like a human?", a: false },
    { q: "Can AI help you brainstorm ideas?", a: true },
    { q: "Should you share passwords with AI?", a: false },
    { q: "Is 'Hallucination' when AI makes up facts?", a: true },
    { q: "Does AI have real human feelings?", a: false },
    { q: "Can AI summarize long articles?", a: true },
    { q: "Should you check AI facts with a source?", a: true },
    { q: "Is AI better than a real teacher?", a: false },
    { q: "Can AI write creative stories?", a: true }
];

const wikiDetails = {
    hallucination: {
        title: "📖 AI Hallucination",
        content: `
            <h3>What is a Hallucination?</h3>
            <p>It happens when an AI generates <strong>confident but incorrect</strong> information as if it were fact.</p>
            <h3>Why does it happen?</h3>
            <p>AI models are <strong>probability engines</strong>. They don't 'know' facts like we do; they predict the next word based on patterns. When they are unsure, they prioritize being fluent over being true.</p>
            <p><strong>💡 Tip:</strong> Never trust AI blindly for dates, specific names, or medical advice.</p>
        `
    },
    spec: {
        title: "✍️ The S.P.E.C. Prompt Rule",
        content: `
            <h3>4 Steps to a Perfect Prompt:</h3>
            <ul>
                <li><strong>S - Specific:</strong> Assign a role (e.g., 'Act as a programmer').</li>
                <li><strong>P - Purpose:</strong> Tell the AI your ultimate goal.</li>
                <li><strong>E - Example:</strong> Give a sample of the style you want.</li>
                <li><strong>C - Constraints:</strong> Set limits like word count or tone.</li>
            </ul>
            <p><strong>Example:</strong> 'As a chef (S), explain a recipe (P). Use simple language (C) like you are talking to a kid (E).'</p>
        `
    },
    ethics: {
        title: "🛡️ AI Ethics & Integrity",
        content: `
            <h3>AI is a Tool, Not a Replacement</h3>
            <p><strong>Co-pilot Principle:</strong> Use AI to brainstorm and refine, but do not let it do 100% of your work. It's there to help you learn, not to skip the learning.</p>
            <p><strong>Honesty:</strong> If you use AI for a project, be transparent about it. Mastering the tool is impressive; pretending you did it all alone is not.</p>
        `
    }
};

let currentQuizIdx = 0;
let masteredCount = 0;

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
    }, 1200);
}

function openWiki(topic) {
    const data = wikiDetails[topic];
    const overlay = document.getElementById('wikiOverlay');
    const body = document.getElementById('wikiBody');
    body.innerHTML = `<h1>${data.title}</h1><div>${data.content}</div>`;
    overlay.classList.add('active');
}

function closeWiki() { document.getElementById('wikiOverlay').classList.remove('active'); }

document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    const text = input.value.trim().toLowerCase();
    if(!text) return;
    addUserMsg(input.value); input.value = "";
    setTimeout(() => {
        let reply = "Interesting! Check my knowledge cards or try a quiz!";
        for (let item of customQA) { if (item.q.some(k => text.includes(k))) { reply = item.a; break; } }
        addBotMsg(reply);
    }, 600);
};

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
    addBotMsg("Hi! 🎓 I'm TalkBot. Ask me about AI or try the quiz on the left!");
    document.getElementById('q-text').innerText = quizData[0].q;
};
// 1. Precise Q&A Database (Ensures no "interesting question" generic replies)
const customQA = [
    { 
        q: ["what is ai", "define ai"], 
        a: "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that normally require human intelligence, such as visual perception, speech recognition, and decision-making." 
    },
    { 
        q: ["how does ai learn", "training"], 
        a: "AI learns through **Machine Learning**. It processes massive amounts of data to find patterns. For example, by looking at millions of cat photos, it learns to identify a cat without being told its specific features." 
    },
    { 
        q: ["prompt rules", "spec", "how to ask"], 
        a: "The best way to talk to AI is the **S.P.E.C. Rule**: be **S**pecific, state your **P**urpose, provide an **E**xample, and set **C**onstraints!" 
    },
    { 
        q: ["is ai always right", "correct", "accurate"], 
        a: "No! AI can make mistakes called **Hallucinations**. It predicts the most likely next word, not necessarily the truth. Always double-check facts with reliable sources." 
    },
    { q: ["hi", "hello"], a: "Hi there! I'm ready to help you explore the world of AI!" }
];

// 2. Quiz Data
const quizData = [
    { q: "Is AI always 100% accurate?", a: false },
    { q: "Does ChatGPT think exactly like a human?", a: false },
    { q: "Can AI help you brainstorm ideas?", a: true },
    { q: "Should you share passwords with AI?", a: false },
    { q: "Is 'Hallucination' when AI makes up facts?", a: true },
    { q: "Does AI have real human feelings?", a: false },
    { q: "Can AI summarize long articles?", a: true },
    { q: "Should you check AI facts with a source?", a: true },
    { q: "Is AI better than a real teacher?", a: false },
    { q: "Can AI write creative stories?", a: true }
];

let currentQuizIdx = 0;
let userScore = 0;

// --- Quiz Logic with Scoring ---
function playGame(choice) {
    const fb = document.getElementById('q-feedback');
    const correct = quizData[currentQuizIdx].a;
    
    if (choice === correct) {
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
            // Display Final Score
            let evaluation = userScore > 7 ? "Excellent! 🏆" : (userScore > 4 ? "Good job! 👍" : "Keep learning! 📖");
            document.getElementById('q-text').innerHTML = `<strong>Quiz Finished!</strong><br>Score: ${userScore}/10<br>${evaluation}`;
            document.getElementById('quiz-controls').style.display = 'none';
            fb.innerHTML = "";
        }
    }, 1000);
}

// --- Suggested Questions Interaction ---
function askSuggested(questionText) {
    addUserMsg(questionText);
    processReply(questionText.toLowerCase());
}

// --- Chat Logic ---
document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if(!text) return;
    addUserMsg(text);
    processReply(text.toLowerCase());
    input.value = "";
};

function processReply(text) {
    setTimeout(() => {
        let reply = "I'm not sure about that specific topic yet. Try asking one of the suggested questions on the left!";
        for (let item of customQA) {
            if (item.q.some(k => text.includes(k))) {
                reply = item.a;
                break;
            }
        }
        addBotMsg(reply);
    }, 600);
}

// --- UI Helpers ---
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

function openWiki(topic) {
    const wikiDetails = {
        hallucination: { title: "Hallucination", content: "AI doesn't 'know' facts; it predicts words. This leads to confident but false claims." },
        spec: { title: "S.P.E.C. Rule", content: "Specific, Purpose, Example, Constraints. Use these to get high-quality AI answers." },
        ethics: { title: "AI Ethics", content: "Always use AI to assist your brain, not replace it. Be honest about using AI in your work." }
    };
    const data = wikiDetails[topic];
    document.getElementById('wikiBody').innerHTML = `<h1>${data.title}</h1><p>${data.content}</p>`;
    document.getElementById('wikiOverlay').classList.add('active');
}

function closeWiki() { document.getElementById('wikiOverlay').classList.remove('active'); }
function resetChat() { location.reload(); }

window.onload = () => {
    addBotMsg("Hi! 🎓 I'm TalkBot. You can ask me questions using the suggestions on the left, or try the quiz!");
    document.getElementById('q-text').innerText = quizData[0].q;
};
