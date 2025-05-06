const dialogues = [
  { speaker: "Watson", text: "Sherlock! Elira Serafin, the famous violinist, vanished just before her concert. The only thing left behind was her violin. No signs of a struggle." },
  { speaker: "Sherlock", text: "Disappearance during a concert? A performance interrupted? That’s more than suspicious. There’s a melody to this mystery, Watson. And someone is conducting it." },
  { speaker: "Watson", text: "You think this is foul play?" },
  { speaker: "Sherlock", text: "Not just foul play — a performance for us. Get your coat we are going to the hall." },
  { speaker: "Watson", text: "Right away, Sherlock. Let's solve this mystery." },
  { speaker: "Sherlock", text: "Let's begin the investigation." }
];

let index = 0;
const dialogueSherlock = document.getElementById("dialogue");
const dialogueWatson = document.getElementById("dialogue-watson");
const nextBtn = document.getElementById("nextBtn");
const nextBtnWatson = document.getElementById("nextBtnWatson"); // Add this line to select Watson's button
const sherlockContainer = document.querySelector(".sherlock-container");
const watsonContainer = document.querySelector(".watson-container");

const typeSound = new Audio("../audio/typewriter.mp3");
typeSound.loop = true;
typeSound.volume = 0.2;

let isTyping = false; // Flag to track typing status

function typeText(dialogueEl, text, i = 0) {
  if (!dialogueEl) {
    console.error("Dialogue element not found in the DOM.");
    return;
  }

  if (i === 0) {
    dialogueEl.textContent = ""; // Clear the content at the start of typing
    typeSound.currentTime = 0;
    typeSound.play(); // 🔊 Start sound on new dialogue
  }

  if (i < text.length) {
    dialogueEl.textContent += text.charAt(i); // Append one character at a time
    setTimeout(() => typeText(dialogueEl, text, i + 1), 30); // Continue typing
  } else {
    typeSound.pause(); // ⏹ Stop sound after full text typed
    typeSound.currentTime = 0;
    isTyping = false; // Reset typing flag
  }
}

function showNextDialogue() {
  if (isTyping) return; // Prevent starting a new dialogue while typing

  if (index < dialogues.length) {
    const currentDialogue = dialogues[index];

    // Show the correct character and dialogue
    if (currentDialogue.speaker === "Sherlock") {
      sherlockContainer.classList.remove("hidden");
      watsonContainer.classList.add("hidden");
      typeText(dialogueSherlock, currentDialogue.text); // Use Sherlock's dialogue element
    } else if (currentDialogue.speaker === "Watson") {
      watsonContainer.classList.remove("hidden");
      sherlockContainer.classList.add("hidden");
      typeText(dialogueWatson, currentDialogue.text); // Use Watson's dialogue element
    }

    index++;
    if (index === dialogues.length) {
      nextBtn.textContent = "Play Game ▶";
    }
  } else {
    window.location.href = "./part1scene2.html"; // Redirect to your game
  }
}

// Attach event listeners to both buttons
nextBtn.addEventListener("click", showNextDialogue);
nextBtnWatson.addEventListener("click", showNextDialogue); // Add this line

// Start first dialogue
showNextDialogue();


