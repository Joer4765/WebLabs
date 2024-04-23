const gameBoard = document.querySelector('.game-board');
const gridSizeSelect = document.getElementById('grid-size');
const difficultySelect = document.getElementById('difficulty');
const newGameButton = document.getElementById('new-game');
const startGameButton = document.getElementById('start-game');
const timerDisplay = document.getElementById('timer');
const playerModeSelect = document.getElementById('player-mode');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const roundsSelect = document.getElementById('rounds');
const player2NameInputDiv = document.getElementById('player2-name-input');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const turn = document.getElementById('turn');
const round = document.getElementById('round');
const rounds = document.getElementById("rounds")
const roundsLabel = document.getElementById('rounds-label');

let gridSize = 4;
let difficulty = 'easy';
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let timer;
let timeLeft;
let time;
let playerMode = 1;
let player1Name = '';
let player2Name = '';
let currentRound = 1;
let totalRounds = 1;
let player1Score = 0;
let player2Score = 0;
let currentPlayerID = 0;


// Update player mode
playerModeSelect.addEventListener('change', function() {
    playerMode = parseInt(this.value);
    if (playerMode === 2) {
        player2NameInputDiv.style.display = 'block';
        name2.style.display = 'inline';
        score2.style.display = 'inline-block';
        rounds.style.display = 'inline-block';
        roundsLabel.style.display = 'inline';
    } else {
        player2NameInputDiv.style.display = 'none';
        name2.style.display = 'none';
        score2.style.display = 'none';
        rounds.style.display = 'none';
        roundsLabel.style.display = 'none';
    }
});


// Start a new game with updated settings
function startGameWithSettings() {
    player1Name = player1NameInput.value || 'Player 1';
    player2Name = player2NameInput.value || 'Player 2';
    totalRounds = parseInt(roundsSelect.value);
    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    currentPlayerID = 0;
    startGame();
}

// Initialize game
function initGame() {
    timerDisplay.textContent = "Time: 00:00";
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedPairs = 0;

    name1.textContent = player1Name;
    name2.textContent = player2Name;

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
    cards.forEach(card => gameBoard.append(card));

    clearInterval(timer);

}

// Create a card element
function createCard(id) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = id;

    const img = document.createElement('img');
    img.src = `images/Group ${id}.png`;
    card.append(img);

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
        if (currentPlayerID === 0) {
            player1Score++;
        } else if (currentPlayerID === 1) {
            player2Score++;
        }
        matchedPairs++;
        updateScoreDisplay();

        if (matchedPairs === gridSize * gridSize / 2) {
            clearInterval(timer);
            endRound();
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            if (playerMode === 2) {
                endTurn();
            }
        }, 1000);
    }


}

// Start a new round
function startRound() {
    round.textContent = `Round ${currentRound}`;
    initGame();
    startTimer();
}

function endTurn() {
    currentPlayerID = currentPlayerID === 1 ? 0 : 1;
    startTurn();
}

function startTurn() {
    turn.textContent = `${currentPlayerID ? player2Name : player1Name}`;
}

// End round
function endRound() {
    if (currentRound < totalRounds) {
        currentRound++;
        currentPlayerID = 0;
        startRound();
    } else {
        endGame();
    }
}

// End game and show winner
function endGame() {
    clearInterval(timer);
    let winner;
    if (playerMode === 1) {
        winner = `${player1Name} finished with a score of ${player1Score}`;
    } else {
        if (player1Score > player2Score) {
            winner = `${player1Name} wins with a score of ${player1Score} to ${player2Score}`;
        } else if (player2Score > player1Score) {
            winner = `${player2Name} wins with a score of ${player2Score} to ${player1Score}`;
        } else {
            winner = `It's a tie! Both players scored ${player1Score}`;
        }
    }
    alert(`Game over! ${winner}`);
}

// Update score display
function updateScoreDisplay() {
    score1.textContent = `${player1Score}`
    score2.textContent = `${player2Score}`;

}

function startTimer() {
    timeLeft = time;
    // Start timer
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${formatTime(timeLeft)}`;

        if (timeLeft === 0) {
            clearInterval(timer);
            alert('Time is up! You lost.');
            newGame();
        }
    }, 1000);
}

function newGame() {
    resetScore();
    initGame();
}

// Start a new game
function startGame() {
    resetScore()

    matchedPairs = 0;

    // Set difficulty
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

    if (playerMode === 2) {
        startTurn();
        startRound();
    }
    else if (playerMode === 1) {
        initGame();
        startTimer();
    }

}

// Format time for display
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function resetScore() {
    player1Score = 0;
    player2Score = 0;
    score1.textContent = player1Score;
    score2.textContent = player2Score;
}

// Event listeners
newGameButton.addEventListener('click', newGame);
startGameButton.addEventListener('click', startGameWithSettings);

// Initialize game on page load
initGame();