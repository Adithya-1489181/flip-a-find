// script.js
const board = document.getElementById('gameBoard');
const instructions = document.getElementById('instructions');
const playButton = document.getElementById('playButton');
const finalWordDiv = document.getElementById('finalWord');
const finalOverlay = document.getElementById('finalOverlay'); // Final overlay div
const finalMessage = document.getElementById('finalMessage'); // Final word message
const continueButton = document.getElementById('continueButton'); // Continue button
const emojis = ['S', 'T', 'R', 'A', 'I', 'N', '🎼', '🎵', '🎤', '🎹']; // Add more emojis
let cards = [...emojis, ...emojis]; // duplicate for matching
let firstCard, secondCard;
let lockBoard = false;
const finalWord = "STRAIN"; // Final word to reveal
let revealedLetters = Array(finalWord.length).fill('_');
let matchedPairs = 0; // Counter for matched pairs

// Display the dashes for the final word
function updateFinalWord() {
  finalWordDiv.textContent = revealedLetters.join(' ');
}

// Hide instructions when "Play" button is clicked
playButton.addEventListener('click', () => {
  instructions.style.display = 'none';
  updateFinalWord();
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

function showFinalOverlay() {
  finalOverlay.style.display = 'flex'; // Show the overlay
  finalMessage.textContent = finalWord; // Display the final word
}

// Handle continue button click
continueButton.addEventListener('click', () => {
  transitionToCardGame();
});

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function transitionToCardGame() {
  console.log("Transition to card game started..."); // Debugging log

  // Check if the transition element exists
  if (!transition) {
    console.error("Transition element not found!");
    return;
  }

  // Log the current class list of the transition element
  console.log("Before removing 'hidden':", transition.classList);

  // Remove the 'hidden' class to show the transition overlay
  transition.classList.remove("hidden");
  console.log("After removing 'hidden':", transition.classList);

  // Wait for 2 seconds before redirecting
  setTimeout(() => {
    console.log("Redirecting to memory-game.html..."); // Debugging log
    window.location.href = "../part2scene2.html"; // Redirect to the card game
  }, 2000);
}

