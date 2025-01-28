
const chatInput = document.querySelector(".chat_input textarea");
const sendChatBtn = document.querySelector(".chat_input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

let userMessage;
const API_KEY = "";

const createChatLi = (message, className) => {
    //Creates a chat <li> element with passed msg and className.
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : ` <span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLI) => {
    const API_URL = "";
    const messageElement = incomingChatLI.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            // model : "gpt-3.5-turbo",
            // messages : [{role:"user",content :userMessage}]
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "user",
                    "content": "Hello!"
                }]
        })
    }

    //send post request to api, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        messageElement.textContent = data.choices[0].message.content;
    } ).catch((error) => {
        messageElement.textContent = "Oops ! something went wrong. Please try again later.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}




const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    // Append the user's message to chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);

    setTimeout(() => {
        //display thinking msg while waiting for response
        const incomingChatLI = createChatLi("Thinking..", "incoming");
        chatbox.appendChild(incomingChatLI);
        chatbox.scrollTo(0,chatbox.scrollHeight)
        generateResponse(incomingChatLI);
    }, 600);

}
sendChatBtn.addEventListener("click",handleChat)
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))
