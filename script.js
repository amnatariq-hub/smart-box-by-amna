// Smart Box by Amna - Guaranteed Working Script

const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const setKeyBtn = document.getElementById('setKeyBtn');

// Key store in browser session
let userApiKey = localStorage.getItem('amna_gemini_key') || "";

// Key reset button listener
setKeyBtn.addEventListener('click', () => {
    askForApiKey(true);
});

function askForApiKey(force = false) {
    if (!userApiKey || force) {
        const inputKey = prompt("Please enter your Free Google Gemini API Key:\n(Get it for free from aistudio.google.com)", userApiKey);
        if (inputKey) {
            userApiKey = inputKey.trim();
            localStorage.setItem('amna_gemini_key', userApiKey);
            alert("API Key Saved Successfully!");
        }
    }
    return userApiKey;
}

// Form submit event
chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const messageText = userInput.value.trim();
    if (!messageText) return;

    // Check Key
    const key = askForApiKey();
    if (!key) {
        alert("API Key is required to send messages!");
        return;
    }

    // User Message Add Karein
    appendMessage(messageText, 'user');
    userInput.value = '';

    // Typing Animation
    const typingElement = showTypingIndicator();

    // AI Response Fetch
    try {
        const response = await fetchAIResponse(messageText, key);
        typingElement.remove();
        appendMessage(response, 'ai');
    } catch (error) {
        typingElement.remove();
        appendMessage("⚠️ Alert: " + error.message, 'ai');
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

async function fetchAIResponse(promptText, apiKey) {
    // Official Stable Endpoints List (v1beta and v1 mix for guaranteed response)
    const endpoints = [
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    ];

    let lastError = "";

    for (let url of endpoints) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: promptText }]
                    }]
                })
            });

            const data = await response.json();

            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
                return data.candidates[0].content.parts[0].text;
            } else if (data.error) {
                lastError = data.error.message || "API Error";
            }
        } catch (err) {
            lastError = err.message;
        }
    }

    throw new Error(lastError || "Could not connect to Gemini API. Please re-check your API Key.");
}
