const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Function to add a message to the chat window
function addMessage(message, isBot = false) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container', isBot ? 'bot-container' : 'user-container');

    const profilePic = document.createElement('img');
    profilePic.classList.add('pfp');
    profilePic.src = isBot ? '/pookie-ai//assets/ai-cat.jpg' : '/pookie-ai//assets/ai-sherk.jpg'; 

    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isBot ? 'bot-message' : 'user-message');
    messageElement.textContent = message;

    messageContainer.appendChild(isBot ? profilePic : messageElement);
    messageContainer.appendChild(isBot ? messageElement : profilePic);

    chatWindow.appendChild(messageContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the bottom
}

// Function to send the message to the API and get the response
function fetchBotResponse(userMessage) {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API_KEY': '30b104a287904d289ab37ad2aa5611a5' // Replace with your API key
        },
        body: JSON.stringify({
            model: 'chai_v1',
            messages: [{ content: userMessage, role: 'user' }]
        })
    };

    fetch('https://api.chai-research.com/v1/chat/completions', options)
        .then(res => res.json())
        .then(data => {
            const botMessage = data.choices[0].message.content; // Adjust based on API response structure
            addMessage(botMessage, true); // Display bot message
        })
        .catch(err => {
            console.error(err);
            addMessage("Error: Unable to reach the bot.", true);
        });
}

// Event listener for the send button
sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage); // Display user's message
        userInput.value = ''; // Clear the input field
        
        // Fetch bot response
        fetchBotResponse(userMessage);
    }
});

// Event listener for Enter key
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

