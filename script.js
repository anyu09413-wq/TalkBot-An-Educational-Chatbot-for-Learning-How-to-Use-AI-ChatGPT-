/**
 * TalkBot Engine v3.0 - Professional Dashboard Edition
 * 功能：状态机对话、成就解锁、自由输入匹配、小游戏逻辑
 */

// 1. 核心对话数据库 (Guided Conversation Data)
const chatData = {
    "start": {
        message: "Hello student! 🎓 I'm TalkBot. I'll help you master AI prompts through a guided journey. Where shall we begin?",
        options: [
            { text: "📝 Prompting 101", next: "prompting" },
            { text: "🏫 Homework Helper", next: "homework" },
            { text: "🛡️ Safety Tips", next: "safety" }
        ],
        unlock: "card-2" // 初始解锁知识卡片2
    },
    "prompting": {
        message: "A good prompt needs a **Role** and a **Task**. Instead of saying 'Tell me about Science', try giving the AI a specific context!",
        options: [
            { text: "Show Example", next: "p_ex" },
            { text: "Main Menu", next: "start" }
        ]
    },
    "p_ex": {
        message: "🌟 **Example:** 'Act as a physics teacher. Explain gravity using a sports analogy for a middle school student.'",
        options: [{ text: "I'll try that!", next: "start" }],
        mastered: true // 增加进度条
    },
    "homework": {
        message: "Don't just ask for the answer. Ask: 'Explain the logic behind this math problem so I can solve the next one myself.'",
        options: [{ text: "Good strategy!", next: "start" }],
        mastered: true
    },
    "safety": {
        message: "Be careful! AI can **hallucinate**. Never trust AI for medical, legal, or ultra-important facts without checking sources.",
        options: [{ text: "What is hallucination?", next: "h_info" }],
        unlock: "card-1" // 解锁知识卡片1
    },
    "h_info": {
        message: "It's when the AI sounds very confident but is actually making things up. It predicts words, it doesn't 'know' facts. 🕵️",
        options: [{ text: "Understood!", next: "start" }],
        unlock: "card-3" // 解锁知识卡片3
    }
};

let masteredCount = 0;

// 2. 渲染对话步骤 (Render Steps)
function renderStep(id) {
    const step = chatData[id];
    const display = document.getElementById('chatDisplay');
    const optionsArea = document.getElementById('optionsArea');

    // 清空当前选项，防止连点
    optionsArea.innerHTML = "";

    // 创建机器人气泡（带打字动画感）
    const botMsg = document.createElement('div');
    botMsg.className = "msg bot";
    botMsg.innerHTML = `<strong>✨ TalkBot:</strong><br><em>Typing...</em>`;
    display.appendChild(botMsg);
    
    // 模拟思考延迟
    setTimeout(() => {
        botMsg.innerHTML = `<strong>✨ TalkBot:</strong><br>${step.message}`;
        
        // 处理知识卡片解锁
        if(step.unlock) {
            const card = document.getElementById(step.unlock);
            card.classList.add('unlocked');
            card.style.transform = "scale(1.05)";
            setTimeout(() => card.style.transform = "scale(1)", 300);
        }

        // 更新学习进度
        if(step.mastered) {
            masteredCount++;
            updateStats();
        }

        // 渲染新选项
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

        scrollChat();
    }, 600);
}

// 3. 用户消息与自由输入 (User Messages & Free Input)
function addUserMsg(text) {
    const display = document.getElementById('chatDisplay');
    const userMsg = document.createElement('div');
    userMsg.className = "msg user";
    userMsg.innerText = text;
    display.appendChild(userMsg);
    scrollChat();
}

// 处理底部输入框的打字逻辑
document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if(!text) return;

    addUserMsg(text);
    input.value = "";

    // 自由问答匹配逻辑 (Keywords Matching)
    setTimeout(() => {
        let reply = "That's an interesting point! I recommend exploring the guided lessons below to see how I can help with that specifically.";
        
        const lowerText = text.toLowerCase();
        if(lowerText.includes("hello") || lowerText.includes("hi")) {
            reply = "Hello there! 👋 I'm ready to help you navigate the world of AI. What's on your mind?";
        } else if(lowerText.includes("who are you")) {
            reply = "I'm TalkBot, an educational tool designed to help students use ChatGPT more effectively and safely!";
        } else if(lowerText.includes("wrong") || lowerText.includes("lie")) {
            reply = "Exactly! That's why we emphasize 'Hallucination'. Check the card on your right for more details!";
        } else if(lowerText.includes("thank")) {
            reply = "You're very welcome! Keep practicing those prompts! 🌟";
        }

        const display = document.getElementById('chatDisplay');
        const botMsg = document.createElement('div');
        botMsg.className = "msg bot";
        botMsg.innerHTML = `<strong>✨ TalkBot:</strong><br>${reply}`;
        display.appendChild(botMsg);
        scrollChat();
    }, 800);
};

// 支持 Enter 键发送
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('sendBtn').click();
});

// 4. 小游戏逻辑 (Mini-Game)
function playGame(isYes) {
    const fb = document.getElementById('q-feedback');
    if(!isYes) {
        fb.innerHTML = "✅ Correct! AI often makes logic errors.";
        fb.style.color = "#00b894";
    } else {
        fb.innerHTML = "❌ Careful! Trusting AI blindly is risky.";
        fb.style.color = "#ff8fb1";
    }
}

// 5. 辅助功能 (Helpers)
function updateStats() {
    document.getElementById('mastered-count').innerText = masteredCount;
    const progress = Math.min((masteredCount / 4) * 100, 100);
    document.getElementById('progress-fill').style.width = progress + "%";
}

function scrollChat() {
    const display = document.getElementById('chatDisplay');
    display.scrollTo({ top: display.scrollHeight, behavior: 'smooth' });
}

function resetChat() {
    document.getElementById('chatDisplay').innerHTML = "";
    masteredCount = 0;
    updateStats();
    document.querySelectorAll('.wiki-card').forEach(c => c.classList.remove('unlocked'));
    renderStep('start');
}

// 页面加载启动
window.onload = () => renderStep('start');
