
// swiper
var swiper = new Swiper(".popular-content", {
    slidesPerView:1,
    spaceBetween:10,
    autoplay: {
      delay:5500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        280:{
            slidesPerView:1,
            spaceBetween:10,
        },
        320:{
            slidesPerView:2,
            spaceBetween:10,
        },
        510:{
            slidesPerView:2,
            spaceBetween:10,
        },    
        758:{
            slidesPerView:3,
            spaceBetween:15,
        },
        900:{
            slidesPerView:4,
            spaceBetween:20,
        },         
    },
});
// show video
let playButton=document.querySelector(".play-movie");
let video=document.querySelector(".video-container");
let myvideo=document.querySelector("#myvideo");
let closebtn=document.querySelector(".close-video");

playButton.onclick = () => {
    video.classList.add("show-video");
    // autoplay when click on button
    myvideo.play();
};


closebtn.onclick = () => {
    video.classList.remove("show-video");
    // autoplay when click on button
    myvideo.pause();
};
// Chatbot Logic + Speech-to-Text (Responsive Version)
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbot = document.getElementById('close-chatbot');
    const micButton = document.getElementById('mic-button');
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Responsive adjustments
    function adjustChatbotSize() {
        if (window.innerWidth < 768) {
            chatbotContainer.style.width = '90vw';
            chatbotContainer.style.height = '60vh';
            chatbotContainer.style.bottom = '70px'; // Avoid overlap with toggle button
        } else {
            chatbotContainer.style.width = '350px';
            chatbotContainer.style.height = '500px';
            chatbotContainer.style.bottom = '20px';
        }
    }

    // Initial adjustment
    adjustChatbotSize();
    window.addEventListener('resize', adjustChatbotSize);

    // Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        micButton.addEventListener('click', () => {
            try {
                recognition.start();
                micButton.classList.add('listening');
                addBotMessage("Listening...");
            } catch (e) {
                addBotMessage("Microphone access denied. Please allow permissions.");
                micButton.classList.remove('listening');
            }
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            userInput.value = transcript;
            micButton.classList.remove('listening');
            handleUserQuery(transcript); // Fixed typo (was 'transcript')
        };

        recognition.onerror = (event) => {
            micButton.classList.remove('listening');
            addBotMessage("Error: " + event.error);
        };
    } else {
        micButton.style.display = 'none';
        addBotMessage("Voice commands not supported in your browser. Try Chrome or Edge.");
    }

    // Input handling (optimized)
    function processInput() {
        const query = userInput.value.trim();
        if (query) {
            handleUserQuery(query);
            userInput.value = '';
        }
    }

    sendButton.addEventListener('click', processInput);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && processInput());

    // Enhanced movie search function
    function searchMovies(query) {
        const lowerQuery = query.toLowerCase();
        
        // Get all movie elements from the page
        const movieBoxes = document.querySelectorAll('.movie-box');
        const matchedMovies = [];
        
        movieBoxes.forEach(movie => {
            const title = movie.querySelector('.movie-title').textContent.toLowerCase();
            const genre = movie.querySelector('.movie-type').textContent.toLowerCase();
            
            if (title.includes(lowerQuery) || genre.includes(lowerQuery)) {
                matchedMovies.push(movie.querySelector('.movie-title').textContent);
            }
        });
        
        return matchedMovies;
    }

    // Process User Query
    // Input handling
    function processInput() {
        const query = userInput.value.trim();
        if (query) {
            handleUserQuery(query);
            userInput.value = '';
        }
    }

    sendButton.addEventListener('click', processInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processInput();
    });

    // Process User Query
    function handleUserQuery(query){
addUserMessage(query);

const lowerQuery = query.toLowerCase();
let response = "";
//enhanced responses 
if(lowerQuery.includes('action')){
const movies = searchMovies('action'); 
response = movies.length>0
? `Action Movies : ${movies.join(', ')}`
: "No action movies found.";
}
else if (lowerQuery.includes('comedy') || lowerQuery.includes('funny')) {
const movies = searchMovies('comedy');
response = movies.length > 0 
    ? `Comedy movies: ${movies.join(', ')}` 
    : "No comedies found.";
}
else if (lowerQuery.match(/(hi|hello|hey)/)) {
response = "Hello! Try asking: 'Show action movies', 'Find comedies', or search by title.";
}
else if (lowerQuery.match(/(how are you)/i)) {
response = "IM good ;)! how are you?";
}
else if (lowerQuery.match(/(I'm fine)/i)) {
response = "Great! Happy to hear that";
}
else if (lowerQuery.match(/(Suggest some movies)/i)) {
response = "Wait! I'll search in the web for you";
}else if (lowerQuery.match(/(What are you doing)/i)) {
response = "im here ready to help you! what would you like to search";
}else if (lowerQuery.match(/(Why were you made)/i)) {
response = "To simply assist you and guide you :)";
}else if (lowerQuery.match(/(Who created you?)/i)) {
response = "i was created by a team of amazing developers :)";
}
else if (lowerQuery.match(/(What can you do?)/i)) {
response = "i can help you find movies, answer questions, and assist with suggestions";
}
else if (lowerQuery.match(/(Are you a robot?)/i)) {
response = "i am an AI, here to assist you like a helpful robot!";
}else if (lowerQuery.match(/(Thank You | Thanks)/i)) {
response = "You're welcome! Happy to help!";
}else if (lowerQuery.match(/(GoodBye|Bye)/i)) {
response = "GoodBye! See you soon!";
}else if (lowerQuery.match(/(Help)/i)) {
response = "You can ask me about movies, or just chat with me!";
}else if (lowerQuery.match(/(say some about our teachers)/i)) {
response = "they are hardworking";
}else if (lowerQuery.match(/(Tell me a pickup line)/i)) {
response = "Are you French? Because Eiffel for you ❤️";
}else if (lowerQuery.match(/(Suggest some horror movies)/i)) {
    response = "The Conjuring, Hereditary, Insidious, The Babadook, It, A Quiet Place, Get Out.";
}else if (lowerQuery.match(/(Suggest some comedy movies)/i)) {
    response = "The Hangover, Superbad, Step Brothers, 21 Jump Street, Deadpool, The Grand Budapest Hotel.";
}else if (lowerQuery.match(/(Suggest some hindi comedy movies)/i)) {
    response = "Hera Pheri, Dhamaal, Chupke Chupke, Andaz Apna Apna, Bhool Bhulaiyaa, 3 Idiots.";
}else if (lowerQuery.match(/(Tell me a joke)/i)) {
const jokes = ["Why did the scarecrow win an award? beacause he was outstanding in his field!",
"im reading a book on anti-gravity. It's impossible to put down",
"Why was the math book sad? It had too many problems.",
" Parallel lines have so much in common.It’s a shame they’ll never meet.",


];
response=jokes[Math.floor(Math.random()*jokes.length)];
}
else {
// Search for any matching movies
const movies = searchMovies(lowerQuery);
response = movies.length > 0 
? `Found: ${movies.join(', ')}` 
: "I couldn't find matching movies. Try being more specific.";
}

addBotMessage(response);
// Optional: Auto-scroll to movie results
if (response.includes("movies:")) {
setTimeout(() => {
document.querySelector('.movies').scrollIntoView({ behavior: 'smooth' });
}, 500);
}
}
// Helper functions
function addUserMessage(text) {
const messageDiv = document.createElement('div');
messageDiv.classList.add('user-message');
messageDiv.textContent = text;
chatbotMessages.appendChild(messageDiv);
scrollToBottom();
}

function addBotMessage(text) {
const messageDiv = document.createElement('div');
messageDiv.classList.add('bot-message');
messageDiv.textContent = text;
chatbotMessages.appendChild(messageDiv);
scrollToBottom();
}

function scrollToBottom() {
chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
});
// movie-data.js
const movieData = {
    "jumanji": {
        title: "Jumanji: Welcome to the Jungle",
        background: "play-page/play-background.jpg",
        video: "play-page/Jumanji.mp4",
        rating: 4.5,
        tags: ["Action", "Adventure", "4K"],
        description: "When four students play with a magical video game, they are drawn to the jungle world of Jumanji...",
        cast: [
            { name: "Dwayne Johnson", image: "play-page/cast1.jpg" },
            { name: "Karen Gillan", image: "play-page/cast2.jpg" },
            // more cast
        ],
    },
    "shangchi": {
        title: "Shang-Chi",
        background: "play-page/shangchi-background.jpg",
        video: "play-page/ShangChi.mp4",
        rating: 4.8,
        tags: ["Action", "Sci-Fi"],
        description: "Shang-Chi must confront the past he thought he left behind...",
        cast: [
            { name: "Simu Liu", image: "play-page/shangchi-cast1.jpg" },
            // more cast
        ],
    }
};
// main.js
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movie'); // like "jumanji" or "shangchi"

const movie = movieData[movieId];

// Set background
document.querySelector('.play-img').src = movie.background;

// Set title
document.querySelector('.play-text h2').innerText = movie.title;

// Set video source
document.querySelector('#myvideo').src = movie.video;

// Set description
document.querySelector('.about-movie p').innerText = movie.description;

// Set tags
const tagsContainer = document.querySelector('.tags');
tagsContainer.innerHTML = movie.tags.map(tag => `<span>${tag},</span>`).join(' ');

// Set cast
const castContainer = document.querySelector('.cast');
castContainer.innerHTML = movie.cast.map(member => `
    <div class="cast-box">
        <img src="${member.image}" alt="">
        <span class="cast-title">${member.name}</span>
    </div>
`).join('');
