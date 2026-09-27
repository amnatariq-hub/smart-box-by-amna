// Smart Box by Amna - Real AI Direct Response Engine

const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const setKeyBtn = document.getElementById('setKeyBtn');

if (setKeyBtn) {
    setKeyBtn.style.display = 'none'; // Hide key button as key is handled internally
}

// Form submit event
chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const messageText = userInput.value.trim();
    if (!messageText) return;

    // User Message Add Karein
    appendMessage(messageText, 'user');
    userInput.value = '';

    // Typing Animation Show Karein
    const typingElement = showTypingIndicator();

    // Real AI Response Fetch
    try {
        const response = await fetchRealAI(messageText);
        typingElement.remove();
        appendMessage(response, 'ai');
    } catch (error) {
        typingElement.remove();
        appendMessage("Sorry, server busy hai. Please 2 second baad dobara koshish karein.", 'ai');
        console.error(error);
    }
});

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    
    if (sender === 'ai') {
        avatarDiv.innerHTML = '<i class="fa-solid fa-robot"></i>';
    } else {
        avatarDiv.innerHTML = '<i class="fa-solid fa-user"></i>';
    }

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
    contentDiv.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

// Real Free Open AI Fetcher
async function fetchRealAI(promptText) {
    const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(promptText)}?model=openai`);
    if (!response.ok) {
        throw new Error("Network error");
    }
    const text = await response.text();
    return text;
}
