const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const setKeyBtn = document.getElementById('setKeyBtn');

if (setKeyBtn) setKeyBtn.style.display = 'none';

chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const messageText = userInput.value.trim();
    if (!messageText) return;

    appendMessage(messageText, 'user');
    userInput.value = '';

    const typingElement = showTypingIndicator();

    try {
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(messageText)}`);
        const text = await response.text();
        typingElement.remove();
        appendMessage(text, 'ai');
    } catch (error) {
        typingElement.remove();
        appendMessage("Connection error. Please try again.", 'ai');
    }
});

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    avatarDiv.innerHTML = sender === 'ai' ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerText = text;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');

    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    avatarDiv.innerHTML = '<i class="fa-solid fa-robot"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}
