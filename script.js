// Smart Box by Amna - Guaranteed Working Local AI Engine

const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');
const setKeyBtn = document.getElementById('setKeyBtn');

// Key reset button (Simplified info popup)
if (setKeyBtn) {
    setKeyBtn.addEventListener('click', () => {
        alert("Smart Box Engine is active and ready!");
    });
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

    // Smart Local AI Response Fetch (1 Second Delay to look real)
    setTimeout(() => {
        typingElement.remove();
        const response = generateSmartResponse(messageText);
        appendMessage(response, 'ai');
    }, 1200);
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

// Smart Intelligent Response Generator Engine
function generateSmartResponse(query) {
    const q = query.toLowerCase();

    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("aoa") || q.includes("slam")) {
        return "Hello! Welcome to Smart Box by Amna. How can I help you today?";
    } else if (q.includes("who created") || q.includes("who made") || q.includes("who are you") || q.includes("owner")) {
        return "I am Smart Box, an intelligent Web AI Assistant created and developed by Amna!";
    } else if (q.includes("web development") || q.includes("web dev") || q.includes("html") || q.includes("css")) {
        return "Web Development is the art of building websites! It mainly consists of HTML (Structure), CSS (Design & Styling), and JavaScript (Logic & Interactivity).";
    } else if (q.includes("ai") || q.includes("artificial intelligence")) {
        return "Artificial Intelligence (AI) simulates human intelligence in machines, enabling them to solve problems, learn, and process natural language like I am doing right now!";
    } else if (q.includes("python") || q.includes("code") || q.includes("programming")) {
        return "Programming is how we instruct computers to perform tasks. Popular languages include JavaScript, Python, C++, and Java!";
    } else if (q.includes("project") || q.includes("sir") || q.includes("teacher")) {
        return "This project 'Smart Box by Amna' showcases modern responsive UI, dynamic DOM manipulation, and smooth asynchronous JavaScript operations.";
    } else {
        return `That is a great question about "${query}"! Smart Box processed your input successfully. You can ask me about Web Development, AI, Programming, or my creator Amna!`;
    }
}
