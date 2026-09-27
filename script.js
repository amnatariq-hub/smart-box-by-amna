// Smart Box by Amna - Main Logic

// 1. Google Gemini API Key (Aap apni free key yahan replace kar sakti hain)
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

// 2. DOM Elements Selection
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');

// 3. Form Submit Event Handler
chatForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const messageText = userInput.value.trim();
    if (!messageText) return;

    // User Message Window Mein Add Karein
    appendMessage(messageText, 'user');
    userInput.value = '';

    // Typing Indicator Show Karein
    const typingElement = showTypingIndicator();

    // AI Response Fetch Karein
    try {
        const response = await fetchAIResponse(messageText);
        // Typing dots ko remove karein aur real AI reply add karein
        typingElement.remove();
        appendMessage(response, 'ai');
    } catch (error) {
        typingElement.remove();
        appendMessage("Sorry, main abhi connect nahi ho pa raha. Kripya thori der baad koshish karein ya API Key check karein.", 'ai');
        console.error(error);
    }
});

// 4. Function: Screen par Message Box Create karna
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

    // Auto-scroll down
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 5. Function: Typing Animation Show karna
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

// 6. Function: Google Gemini API se Response mangwana
async function fetchAIResponse(promptText) {
    // Agar API Key add nahi ki to demo reply dega
    if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        await new Promise(resolve => setTimeout(resolve, 1200)); // Fake delay
        return "Aapka project tayar hai! Live AI API connect karne ke liye Google AI Studio se FREE Gemini API Key lekar script.js mein replace karein.";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

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

    if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error("Invalid API response");
    }
}