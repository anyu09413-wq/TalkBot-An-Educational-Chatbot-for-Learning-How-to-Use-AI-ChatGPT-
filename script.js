// 1. 精准问答数据库
const customQA = [
    { q: ["hi", "你好", "hello"], a: "Hello! 今天我能帮你学习什么 AI 技巧？" },
    { q: ["名字", "你是谁", "name"], a: "我是一个 AI 助教 TalkBot。你可以叫我 ChatGPT。" },
    { q: ["你好吗", "how are you"], a: "我感觉棒极了！准备好开始学习了吗？" },
    { q: ["你能做什么", "功能"], a: "我可以回答问题、解释复杂概念、辅助作业，还能教你如何写提示词！" },
    { q: ["什么是ai", "什么是人工智能"], a: "AI（人工智能）是让机器像人类一样学习、思考和解决问题的技术。" },
    { q: ["光合作用", "photosynthesis"], a: "光合作用是植物利用阳光、水和二氧化碳产生食物（葡萄糖）和氧气的过程。" }
];

// 2. 10 题 Speed Quiz
const quizData = [
    { q: "AI 总是 100% 准确吗？", a: false },
    { q: "ChatGPT 的思考方式和人类完全一样吗？", a: false },
    { q: "AI 可以帮你头脑风暴创意吗？", a: true },
    { q: "应该把账号密码告诉 AI 吗？", a: false },
    { q: "‘幻觉’是指 AI 编造事实吗？", a: true },
    { q: "AI 有真实的情感和感觉吗？", a: false },
    { q: "AI 可以帮你总结长文章吗？", a: true },
    { q: "使用 AI 生成的事实需要去核实吗？", a: true },
    { q: "AI 很快就会完全取代老师吗？", a: false },
    { q: "AI 能写出富有想象力的故事吗？", a: true }
];

// 3. 详细解释页面数据库 (用于跳转显示)
const wikiDetails = {
    hallucination: {
        title: "📖 Hallucination (AI 幻觉)",
        content: `
            <h3>什么是幻觉？</h3>
            <p>当 AI 听起来非常有信心，但实际上是在胡编乱造事实时，我们就称之为“幻觉”。</p>
            <h3>为什么会发生？</h3>
            <p>AI 的本质是一个<strong>概率预测引擎</strong>。它不是在查字典，而是在根据概率猜测下一个字该说什么。当它没有足够数据时，它会优先选择让句子“听起来通顺”，而不是“事实正确”。</p>
            <p><strong>💡 秘诀：</strong> 永远对 AI 给出的具体数字、人名和日期保持警惕。</p>
        `
    },
    spec: {
        title: "✍️ S.P.E.C. 提示词法则",
        content: `
            <h3>写出完美 Prompt 的 4 要素：</h3>
            <ul>
                <li><strong>S - Specific (明确):</strong> 明确任务背景。</li>
                <li><strong>P - Purpose (目的):</strong> 告诉 AI 你的目标。</li>
                <li><strong>E - Example (示例):</strong> 给 AI 一个参考范例。</li>
                <li><strong>C - Constraints (限制):</strong> 规定字数、语气或格式。</li>
            </ul>
            <p><strong>范例：</strong> “作为一名生物老师 (S)，请解释光合作用 (P)。请用篮球比赛做类比 (E)，不要超过 100 字 (C)。”</p>
        `
    },
    ethics: {
        title: "🛡️ AI 伦理与诚信",
        content: `
            <h3>AI 是工具，不是替代品</h3>
            <p><strong>副驾驶原则：</strong> AI 应该是你的 Co-pilot（副驾驶），它可以帮你润色思路，但不应该直接替你完成作业。</p>
            <p><strong>诚信准则：</strong> 使用 AI 辅助并不丢人，但如果你直接复制粘贴却不承认，那就是学术不端。学会如何声明 AI 的使用，是现代学生必备的素养。</p>
        `
    }
};

let currentQuizIdx = 0;
let masteredCount = 0;

// --- 游戏逻辑 ---
function playGame(choice) {
    const fb = document.getElementById('q-feedback');
    const correct = quizData[currentQuizIdx].a;
    fb.innerHTML = (choice === correct) ? "✅ 回答正确！" : "❌ 哎呀，错了。";
    fb.style.color = (choice === correct) ? "#00b894" : "#ff8fb1";

    setTimeout(() => {
        currentQuizIdx++;
        if (currentQuizIdx < quizData.length) {
            document.getElementById('q-text').innerText = quizData[currentQuizIdx].q;
            fb.innerHTML = "";
        } else {
            document.getElementById('q-text').innerText = "挑战结束！🏆 你真棒！";
            document.querySelectorAll('.quiz-opt').forEach(b => b.style.display = 'none');
        }
    }, 1200);
}

// --- 跳转/打开新页面逻辑 ---
function openWiki(topic) {
    const data = wikiDetails[topic];
    const overlay = document.getElementById('wikiOverlay');
    const body = document.getElementById('wikiBody');

    body.innerHTML = `
        <h1 style="color:var(--primary); font-size: 2rem;">${data.title}</h1>
        <div style="font-size: 1.1rem; line-height: 1.8; margin-top: 20px;">${data.content}</div>
    `;
    overlay.classList.add('active');
}

function closeWiki() {
    document.getElementById('wikiOverlay').classList.remove('active');
}

// --- 聊天逻辑 ---
document.getElementById('sendBtn').onclick = () => {
    const input = document.getElementById('userInput');
    const text = input.value.trim().toLowerCase();
    if(!text) return;

    addUserMsg(input.value);
    input.value = "";

    setTimeout(() => {
        let reply = "这是一个好问题！你可以尝试在右侧知识卡片中寻找答案，或者问问我关于 AI 的基础。";
        for (let item of customQA) {
            if (item.q.some(k => text.includes(k))) {
                reply = item.a;
                break;
            }
        }
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
    addBotMsg("你好！🎓 我是 TalkBot。我们可以聊聊 AI 的技巧，或者你也可以试试左边的 10 题挑战！");
    document.getElementById('q-text').innerText = quizData[0].q;
};
