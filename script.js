// 1. The "Brain" of TalkBot - Content & Game Logic
const chatData = {
    "main_menu": {
        message: "Hello! I'm TalkBot, your pink AI tutor. 🌸 What would you like to explore today?",
        options: [
            { text: "🕵️ The Story of ChatGPT", next: "history" },
            { text: "💡 How to write better prompts", next: "better_prompts" },
            { text: "🎮 Play: Prompt Challenge", next: "game_start" },
            { text: "🛡️ Stay safe with AI", next: "responsible_use" }
        ]
    },

    // --- SECTION: ChatGPT History & Facts ---
    "history": {
        message: "🤖 ChatGPT was created by **OpenAI** (led by Sam Altman). It's a 'Large Language Model' that was trained on almost all the text on the internet! It launched in Nov 2022.",
        options: [
            { text: "What does GPT mean?", next: "gpt_meaning" },
            { text: "How was it made?", next: "how_it_made" },
            { text: "Back to Menu", next: "main_menu" }
        ]
    },
    "gpt_meaning": {
        message: "GPT stands for **Generative Pre-trained Transformer**. Basically, it means it's a super-smart 'prediction machine' that guesses the next word in a sentence! 🧠",
        options: [{ text: "Cool! What else?", next: "history" }]
    },
    "how_it_made": {
        message: "It used a technique called **RLHF** (Reinforcement Learning from Human Feedback). Real humans 'graded' the AI's answers to teach it how to be helpful and polite! ✨",
        options: [{ text: "Got it!", next: "history" }]
    },

    // --- SECTION: Prompting Skills ---
    "better_prompts": {
        message: "To get the best out of AI, follow the **S.P.E.C.** rule: \n✅ **S**pecific \n✅ **P**urpose \n✅ **E**xamples \n✅ **C**onstraints",
        options: [
            { text: "Show me a GOOD prompt", next: "good_prompt" },
            { text: "Show me a BAD prompt", next: "bad_prompt" },
            { text: "Back to Menu", next: "main_menu" }
        ]
    },
    "good_prompt": {
        message: "🌟 **GOOD:** 'Act as a travel guide. Create a 3-day budget itinerary for Tokyo focusing on cute cafes and anime shops.'",
        options: [{ text: "Why is this good?", next: "why_good" }, { text: "Back", next: "better_prompts" }]
    },
    "why_good": {
        message: "It gives the AI a **Role** (Travel Guide), a **Target** (Tokyo), and **Constraints** (3 days, Budget, Specific themes). 🏆",
        options: [{ text: "I see!", next: "main_menu" }]
    },
    "bad_prompt": {
        message: "❌ **BAD:** 'Tell me what to do in Japan.' \n(This is too vague! The AI doesn't know your budget, interests, or how long you're staying.)",
        options: [{ text: "Try to fix it", next: "better_prompts" }]
    },

    // --- SECTION: Mini-Game ---
    "game_start": {
        message: "🎮 **PROMPT CHALLENGE!** \n\nScenario: You want AI to help you study for a Math test. Which choice is better?",
        options: [
            { text: "A: 'Help me with Math.'", next: "game_wrong" },
            { text: "B: 'Explain Pythagoras' Theorem to me using a Pizza analogy.'", next: "game_right" }
        ]
    },
    "game_wrong": {
        message: "Oh no! 🙀 Prompt A is too simple. The AI won't know where to start. Try again!",
        options: [{ text: "🔄 Try Again", next: "game_start" }]
    },
    "game_right": {
        message: "🎉 **YOU WIN!** By asking for a 'Pizza analogy,' you made the explanation much easier to understand. You're an AI Master! 🏅",
        options: [
            { text: "Play Again", next: "game_start" },
            { text: "Finish Game", next: "main_menu" }
        ]
    },

    // --- SECTION: Responsibility ---
    "responsible_use": {
        message: "Remember: AI is smart but not perfect. It can 'hallucinate' (make up facts). Always check your homework against a textbook! 📚🛡️",
        options: [{ text: "I'll be careful!", next: "main_menu" }]
    }
};

// 2. Core Logic Functions
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startLearning() {
    showSection('chat');
    document.getElementById('chatDisplay').innerHTML = "";
    renderStep("main_menu");
}

function renderStep(stepId) {
    const step = chatData[stepId];
    const display = document.getElementById('chatDisplay');
    const optionsArea = document.getElementById('optionsArea');

    // Bot Message with "Cute" Emojis
    const emojis = ["💖", "✨", "🌸", "🍭", "🎀", "🦄"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    const botMsg = document.createElement('div');
    botMsg.className = "msg bot";
    botMsg.innerHTML = `<strong>TalkBot:</strong> ${randomEmoji} ${step.message}`;
    display.appendChild(botMsg);

    // Clear and build new choice buttons
    optionsArea.innerHTML = "";
    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "choice-btn";
        btn.textContent = opt.text;
        
        btn.onclick = () => {
            addUserMessage(opt.text);
            optionsArea.innerHTML = ""; // Prevent double clicks
            setTimeout(() => renderStep(opt.next), 400); // Small delay for "thinking" feel
        };
        optionsArea.appendChild(btn);
    });

    // Auto-scroll to bottom
    display.scrollTo({ top: display.scrollHeight, behavior: 'smooth' });
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
    renderStep("main_menu");
}
