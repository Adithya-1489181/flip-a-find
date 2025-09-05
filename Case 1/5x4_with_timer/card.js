// script.js
const board = document.getElementById('gameBoard');
const instructions = document.getElementById('instructions');
const playButton = document.getElementById('playButton');
const finalWordDiv = document.getElementById('finalWord');
const finalOverlay = document.getElementById('finalOverlay'); // Final overlay div
const finalMessage = document.getElementById('finalMessage'); // Final word message
const continueButton = document.getElementById('continueButton'); // Continue button
const emojis = ['V', 'O', 'L', 'U', 'M', 'E', '🎼', '🎵', '🎤', '🎹']; // Add more emojis
let cards = [...emojis, ...emojis]; // duplicate for matching
let firstCard, secondCard;
let lockBoard = false;
const finalWord = "VOLUME";
let revealedLetters = Array(finalWord.length).fill('_');
let matchedPairs = 0; // Counter for matched pairs
let timeLeft = 180; // Set the time limit in seconds
let timerInterval;

// Add a failed overlay
const failedOverlay = document.createElement('div');
failedOverlay.classList.add('failed-overlay');
failedOverlay.innerHTML = `
  <h2>Oops! Sorry, Wanna try again?</h2>
  <button id="restartButton">Restart</button>
`;
document.body.appendChild(failedOverlay);

// Display the dashes for the final word
function updateFinalWord() {
  finalWordDiv.textContent = revealedLetters.join(' ');
}

// Hide instructions when "Play" button is clicked
playButton.addEventListener('click', () => {
  instructions.style.display = 'none';
  updateFinalWord();

  // Reveal all cards
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => card.classList.add('flipped'));

  // Wait for 5 seconds, then flip them back and start the timer
  setTimeout(() => {
    allCards.forEach(card => card.classList.remove('flipped'));
    startTimer(); // Start the timer after flipping back
  }, 5000);
});

// Shuffle
cards = cards.sort(() => 0.5 - Math.random());

// Create cards
cards.forEach(emoji => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">${emoji}</div>
    </div>
  `;
  card.addEventListener('click', flipCard);
  board.appendChild(card);
});

function flipCard() {
  if (lockBoard) return;
  if (this.classList.contains('flipped')) return;

  this.classList.add('flipped');
  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const emoji1 = firstCard.querySelector('.card-back').textContent;
  const emoji2 = secondCard.querySelector('.card-back').textContent;

  if (emoji1 === emoji2) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    revealLetter(emoji1);
    matchedPairs++; // Increment matched pairs counter
    if (matchedPairs === 10) {
      showFinalOverlay(); // Show overlay when all pairs are matched
    }
    resetTurn();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function revealLetter(letter) {
  // Reveal the letter in the final word
  for (let i = 0; i < finalWord.length; i++) {
    if (finalWord[i] === letter) {
      revealedLetters[i] = letter;
    }
  }
  updateFinalWord();
}

// Timer function
function startTimer() {
  const timerElement = document.getElementById('timer');
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showFailedOverlay();
    }
  }, 1000);
}

// Show the failed overlay
function showFailedOverlay() {
  failedOverlay.style.display = 'flex';
  clearInterval(timerInterval);
}

// Restart button functionality
document.getElementById('restartButton').addEventListener('click', () => {
  location.reload(); // Reload the page
});

// Stop the timer when the game is won
function showFinalOverlay() {
  clearInterval(timerInterval); // Stop the timer
  finalOverlay.style.display = 'flex'; // Show the overlay
  finalMessage.textContent = finalWord; // Display the final word
}

// Handle continue button click
continueButton.addEventListener('click', () => {
  window.location.href = "../part3scene2.html"; // Redirect to the next scene
});

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
