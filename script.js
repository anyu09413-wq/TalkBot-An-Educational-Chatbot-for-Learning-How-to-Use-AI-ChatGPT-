// Add a "Thinking" state to make it look premium
function renderStep(stepId) {
    const step = chatData[stepId];
    const display = document.getElementById('chatDisplay');
    const optionsArea = document.getElementById('optionsArea');

    // Bot Typing Animation...
    const botMsg = document.createElement('div');
    botMsg.className = "msg bot";
    botMsg.innerHTML = "<i>TalkBot is thinking...</i>";
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
    }, 600); // 0.6 second delay for realism
}
