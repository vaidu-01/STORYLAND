const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const timeBoard = document.querySelector('#time');
const startBtn = document.querySelector('#start-btn');

let score = 0;
let timeLeft = 30;
let timer;
let gameRunning = false;
let moleInterval;

// Randomly select a hole for the mole to pop up
function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

// Make a mole appear
function popUpMole() {
    if (!gameRunning) return;

    const hole = randomHole();
    hole.classList.add('active');

    setTimeout(() => {
        hole.classList.remove('active');
        if (gameRunning) popUpMole(); // Keep popping moles
    }, 800);
}

// Start the game
function startGame() {
    if (gameRunning) return;
    
    gameRunning = true;
    score = 0;
    timeLeft = 30;
    scoreBoard.textContent = score;
    timeBoard.textContent = timeLeft;

    startBtn.disabled = true;
    popUpMole();

    // Countdown timer
    timer = setInterval(() => {
        timeLeft--;
        timeBoard.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    gameRunning = false;
    clearInterval(timer);
    startBtn.disabled = false;
    alert(`Game Over! Your score: ${score}`);
}

// Whack the mole!
holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole.classList.contains('active')) {
            score++;
            scoreBoard.textContent = score;
            hole.classList.remove('active');
        }
    });
});

// Start button event
startBtn.addEventListener('click', startGame);