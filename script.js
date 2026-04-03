/**
 * TalkBot Engine v2.0
 * Logic: Finite State Machine (FSM) for choice-based learning
 */

const chatData = {
    "start": {
        message: "Hello! I'm TalkBot. 🎓 I'm here to help you master AI tools like ChatGPT. What would you like to explore first?",
        options: [
            { text: "📝 Prompt Basics", next: "prompts_intro" },
            { text: "🏫 Homework Help", next: "homework" },
            { text: "🛡️ Safe & Ethical Use", next: "ethics" },
            { text: "🌍 What is ChatGPT?", next: "history" }
        ]
    },

    // --- MODULE: PROMPT WRITING ---
    "prompts_intro": {
        message: "Effective prompts are **Specific**. Instead of saying 'Tell me about Science', try giving the AI a **Role** and a **Target**.",
        options: [
            { text: "Show me a Good Example", next: "prompt_good" },
            { text: "Show me a Bad Example", next: "prompt_bad" },
            { text: "Main Menu", next: "start" }
        ]
    },
    "prompt_good": {
        message: "✅ **Good Prompt:** 'Act as a history teacher. Explain the causes of World War II in 3 simple bullet points for a 10th-grade student.'",
        options: [
            { text: "Why is this good?", next: "prompt_why" },
            { text: "Back", next: "prompts_intro" }
        ]
    },
    "prompt_why": {
        message: "It works because it includes: \n1. **Role** (History Teacher) \n2. **Task** (Explain causes) \n3. **Constraints** (3 points, 10th-grade level).",
        options: [{ text: "I see! Main Menu", next: "start" }]
    },
    "prompt_bad": {
        message: "❌ **Bad Prompt:** 'Explain history.' \nThis is too vague! The AI doesn't know which time period, which country, or how much detail you need.",
        options: [{ text: "Let's try again", next: "prompts_intro" }]
    },

    // --- MODULE: HOMEWORK HELP ---
    "homework": {
        message: "When using AI for study, ask for **explanations**, not just answers. Which do you need help with?",
        options: [
            { text: "Explain a Topic", next: "hw_explain" },
            { text: "Check my Grammar", next: "hw_grammar" },
            { text: "Back", next: "start" }
        ]
    },
    "hw_explain": {
        message: "Try this: 'Explain photosynthesis using a **Pizza analogy** so it's easier to remember.'",
        options: [{ text: "That's clever!", next: "start" }]
    },
    "hw_grammar": {
        message: "Ask: 'Check my paragraph for grammar mistakes, but **don't rewrite it**. Explain the mistakes so I can learn.'",
        options: [{ text: "Got it!", next: "start" }]
    },

    // --- MODULE: ETHICS & SAFETY ---
    "ethics": {
        message: "AI can 'hallucinate' (make up facts). Always verify important info with a textbook and never share your passwords! 🛡️",
        options: [
            { text: "Why check answers?", next: "hallucination" },
            { text: "Main Menu", next: "start" }
        ]
    },
    "hallucination": {
        message: "AI doesn't 'know' facts; it predicts patterns. If it's unsure, it might invent a very convincing lie. Always double-check! 🕵️",
        options: [{ text: "I'll be careful", next: "start" }]
    },

    // --- MODULE: HISTORY ---
    "history": {
        message: "ChatGPT was created by **OpenAI**. It uses 'Transformer' technology to process language like a human would.",
        options: [
            { text: "Who is the CEO?", next: "ceo" },
            { text: "Main Menu", next: "start" }
        ]
    },
    "ceo": {
        message: "The CEO of OpenAI is **Sam Altman**. The company's goal is to make sure AI benefits all of humanity.",
        options: [{ text: "Interesting!", next: "start" }]
    }
};

/**
 * CORE FUNCTIONS
 */

function renderStep(stepId) {
    const step = chatData[stepId];
    const display = document.getElementById('chatDisplay');
    const optionsArea = document.getElementById('optionsArea');

    // 1. Create Bot Typing Placeholder
    const typingIndicator = document.createElement('div');
    typingIndicator.className = "msg bot";
    typingIndicator.innerHTML = "<em>TalkBot is thinking...</em>";
    display.appendChild(typingIndicator);
    
    // Auto-scroll
    display.scrollTo({ top: display.scrollHeight, behavior: 'smooth' });

    // 2. Clear old buttons immediately so user can't double-click
    optionsArea.innerHTML = "";

    // 3. Reveal the real response after a small delay (The "Thinking" feel)
    setTimeout(() => {
        // Random "Cute" Emoji for personality
        const emojis = ["✨", "🌸", "🤖", "🎓", "🌟"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        typingIndicator.innerHTML = `<strong>${randomEmoji} TalkBot:</strong> <br>${step.message}`;
        
        // 4. Inject new Choice Buttons
        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = "choice-btn";
            btn.textContent = opt.text;
            
            btn.onclick = () => {
                addUserMessage(opt.text);
                renderStep(opt.next);
            };
            optionsArea.appendChild(btn);
        });

        display.scrollTo({ top: display.scrollHeight, behavior: 'smooth' });
    }, 600);
}

function addUserMessage(text) {
    const display = document.getElementById('chatDisplay');
    const userMsg = document.createElement('div');
    userMsg.className = "msg user";
    userMsg.textContent = text;
    display.appendChild(userMsg);
    display.scrollTo({ top: display.scrollHeight, behavior: 'smooth' });
}

function resetChat() {
    document.getElementById('chatDisplay').innerHTML = "";
    renderStep("start");
}

// Start the bot when the page loads
window.onload = () => {
    renderStep("start");
};
