async function fetchAIResponse(promptText, apiKey) {
    // Active Gemini Models List (2026)
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError = "";

    for (let model of models) {
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            
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
