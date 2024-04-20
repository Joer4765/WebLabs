const gameBoard = document.querySelector('.game-board');
const gridSizeSelect = document.getElementById('grid-size');
const difficultySelect = document.getElementById('difficulty');
const newGameButton = document.getElementById('new-game');
const startGameButton = document.getElementById('start-game');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const playerModeSelect = document.getElementById('player-mode');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const roundsSelect = document.getElementById('rounds');
const player2NameInputDiv = document.getElementById('player2-name-input');

let gridSize = 4;
let difficulty = 'easy';
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft;
let time;
let playerMode = 1;
let player1Name = 'Player 1';
let player2Name = 'Player 2';
let currentRound = 1;
let totalRounds = 1;
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

// Update player mode
playerModeSelect.addEventListener('change', function() {
    playerMode = parseInt(this.value);
    player2NameInputDiv.style.display = playerMode === 2 ? 'block' : 'none';
});

// Start a new game with updated settings
function startGameWithSettings() {
    player1Name = player1NameInput.value || 'Player 1';
    player2Name = player2NameInput.value || 'Player 2';
    totalRounds = parseInt(roundsSelect.value);
    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    startGame();
}

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
        if (playerMode === 2) {
            if (currentPlayer === 1) {
                player1Score++;
            } else {
                player2Score++;
            }
            updateScoreDisplay();
        }

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
        if (playerMode === 2) {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
    }
}

// End round
function endRound() {
    if (currentRound < totalRounds) {
        currentRound++;
        initGame();
    } else {
        endGame();
    }
}

// End game and show winner
function endGame() {
    clearInterval(timer);
    let winner = player1Score > player2Score ? player1Name : player2Name;
    if (player1Score === player2Score) {
        winner = 'It\'s a tie!';
    }
    alert(`Game over! Winner: ${winner}\nPlayer 1 Score: ${player1Score}\nPlayer 2 Score: ${player2Score}`);
}

// Update score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Player 1: ${player1Score} - Player 2: ${player2Score}`;
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
// startGameButton.addEventListener('click', startGame);
startGameButton.addEventListener('click', startGameWithSettings);

// Initialize game on page load
initGame();