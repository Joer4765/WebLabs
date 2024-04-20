const gameBoard = document.querySelector('.game-board');
const gridSizeSelect = document.getElementById('grid-size');
const difficultySelect = document.getElementById('difficulty');
const newGameButton = document.getElementById('new-game');
const startGameButton = document.getElementById('start-game');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');

let gridSize = 4;
let difficulty = 'easy';
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft;
let time;

// Initialize game
function initGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    scoreDisplay.textContent = 'Score: 0';

    // Set grid size
    gridSize = parseInt(gridSizeSelect.value);
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;

    // Create cards
    for (let i = 1; i <= gridSize * gridSize / 2; i++) {
        const card1 = createCard(i);
        const card2 = createCard(i);
        cards.push(card1, card2);
    }

    // Shuffle cards
    cards.sort(() => 0.5 - Math.random());

    // Add cards to game board
    cards.forEach(card => gameBoard.appendChild(card));
}

// Create a card element
function createCard(id) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = id;

    const img = document.createElement('img');
    img.src = `images/Group ${id}.png`;
    card.appendChild(img);

    card.addEventListener('click', flipCard);
    return card;
}

// Flip a card
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        matchedPairs++;
        scoreDisplay.textContent = `Score: ${matchedPairs}`;
        flippedCards = [];

        if (matchedPairs === gridSize * gridSize / 2) {
            clearInterval(timer);
            alert(`You won! Time: ${formatTime(time - timeLeft)}`);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Start a new game
function startGame() {
    initGame();
    matchedPairs = 0;
    scoreDisplay.textContent = 'Score: 0';

    // Set difficulty and timer
    difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            time = 180;
            break;
        case 'normal':
            time = 120;
            break;
        case 'hard':
            time = 60;
            break;
    }

    timeLeft = time;
    // Start timer
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert('Time is up! You lost.');
            initGame();
        }
    }, 1000);
}

// Format time for display
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Event listeners
newGameButton.addEventListener('click', initGame);
startGameButton.addEventListener('click', startGame);

// Initialize game on page load
initGame();