const dialogues = [
  { speaker: "Watson", text: "Dahlia… She was Elira’s accompanist. Is she missing too?" },
  { speaker: "Sherlock", text: "Dahlia isn’t missing. I believe she’s involved. And Moriarty’s using her as his instrument. Let's give her a visit." }
];

let index = 0;
const sherlockContainer = document.querySelector(".sherlock-container");
const watsonContainer = document.querySelector(".watson-container");
const dialogueSherlock = document.getElementById("dialogue-sherlock");
const dialogueWatson = document.getElementById("dialogue-watson");
const transition = document.getElementById("transition");

const typeSound = new Audio("../audio/typewriter.mp3");
typeSound.loop = true;
typeSound.volume = 0.2;

let isTyping = false;

function typeText(dialogueEl, text, callback) {
  let i = 0;
  isTyping = true;
  dialogueEl.textContent = "";
  typeSound.currentTime = 0;
  typeSound.play();

  const interval = setInterval(() => {
    if (i < text.length) {
      dialogueEl.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      typeSound.pause();
      typeSound.currentTime = 0;
      isTyping = false;
      if (callback) callback();
    }
  }, 45);
}

function showNextDialogue() {
  if (isTyping) return;

  console.log("Current index:", index, "Total dialogues:", dialogues.length);

  if (index < dialogues.length) {
    const currentDialogue = dialogues[index]; // Use the current index

    if (currentDialogue.speaker === "Sherlock") {
      sherlockContainer.classList.remove("hidden");
      watsonContainer.classList.add("hidden");
      typeText(dialogueSherlock, currentDialogue.text, () => {
        index++; // Increment the index after Sherlock's dialogue
        showNextDialogue(); // Proceed to the next dialogue
      });
    } else if (currentDialogue.speaker === "Watson") {
      watsonContainer.classList.remove("hidden");
      sherlockContainer.classList.add("hidden");
      typeText(dialogueWatson, currentDialogue.text, () => {
        setTimeout(() => {
          index++; // Increment the index after Watson's dialogue
          showNextDialogue(); // Proceed to the next dialogue
        }, 1800);
      });
    }
  } else {
    console.log("Creating Continue button..."); // Debugging log

    // Determine the current speaker's dialogue bubble
    const currentDialogueBubble =
      dialogues[index - 1].speaker === "Sherlock"
        ? dialogueSherlock
        : dialogueWatson;

    // Create a "Continue" button after the last dialogue
    const continueButton2 = document.createElement("button");
    continueButton2.textContent = "Continue →";
    continueButton2.classList.add("continue-button2"); // Add the CSS class

    // Append the button to the current speaker's dialogue bubble
    currentDialogueBubble.appendChild(continueButton2);

    // Add an event listener to the button
    continueButton2.addEventListener("click", () => {
      console.log("Continue button clicked!"); // Debugging log
      transitionToCardGame(); // Trigger the transition to the card game
    });
  }
}

function transitionToCardGame() {
  // Remove the 'hidden' class to show the transition overlay
  transition.classList.remove("hidden");

  // Wait for 2 seconds before redirecting
  setTimeout(() => {
    window.location.href = "./part2scene1.html"; // Redirect to the card game
  }, 2000);
}

showNextDialogue(); // Start the dialogue sequence

