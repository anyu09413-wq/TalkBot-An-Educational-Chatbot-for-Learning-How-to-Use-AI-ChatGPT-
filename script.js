const chatData = {
    "main_menu": {
        message: "Welcome to TalkBot! 🎓 I'm here to help you master AI prompts. What would you like to learn first?",
        options: [
            { text: "📝 Prompt Writing 101", next: "prompts_intro" },
            { text: "🏫 AI for Homework", next: "homework" },
            { text: "🕵️ Fact-Checking AI", next: "verification" },
            { text: "🛡️ Ethical AI Use", next: "ethics" }
        ]
    },
    
    "prompts_intro": {
        message: "Effective prompts are **Specific** and **Detailed**. Instead of saying 'Tell me about Science', try giving the AI a role!",
        options: [
            { text: "Give me an example", next: "example_prompt" },
            { text: "Back to Menu", next: "main_menu" }
        ]
    },

    "homework": {
        message: "Using AI for homework works best when you ask for **explanations**, not just answers. Which do you need help with?",
        options: [
            { text: "Explain a topic", next: "homework_explain" },
            { text: "Check my grammar", next: "homework_grammar" }
        ]
    },

    "homework_explain": {
        message: "💡 **Pro-Tip:** Ask: 'Explain photosynthesis like I'm a secondary school student, including one real-life example.'",
        options: [{ text: "Got it!", next: "main_menu" }]
    },

    "ethics": {
        message: "Responsible AI means using it as a **Learning Assistant**, not a shortcut. Never share private info and always cite your sources!",
        options: [{ text: "I agree!", next: "main_menu" }]
    }
};

function renderStep(stepId) {
    const step = chatData[stepId];
    const display = document.getElementById('chatDisplay');
    const optionsArea = document.getElementById('optionsArea');

    // Bot message with "Thinking" state
    const botMsg = document.createElement('div');
    botMsg.className = "msg bot";
    botMsg.innerHTML = "<em>TalkBot is typing...</em>";
    display.appendChild(botMsg);

    setTimeout(() => {
        botMsg.innerHTML = `✨ ${step.message}`;
        optionsArea.innerHTML = "";
        
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
    }, 500);
}

function addUserMessage(text) {
    const display = document.getElementById('chatDisplay');
    const userMsg = document.createElement('div');
    userMsg.className = "msg user";
    userMsg.textContent = text;
    display.appendChild(userMsg);
}

function resetChat() {
    document.getElementById('chatDisplay').innerHTML = "";
    renderStep("main_menu");
}

// Initialize
window.onload = () => renderStep("main_menu");
