const initial_dialogue = [{ speaker: "Sherlock", text: "This is the place of disappearance, Watson. Even though the violinist has vanished, an envelope has appeared. Just click and open to see whats inside." }];
const dialogues = [
  { speaker: "Watson", text: "That’s Moriarty’s signature, isn’t it? But why would he care about a violinist?" },
  { speaker: "Sherlock", text: "Because it isn’t about the violinist, Watson. It’s about the performance she was a part of. He is hinting us to play this card game he has given. I guess this has the clue." }
];

const letter_content = "Dear Holmes, the melody fractured, yet a name hides in its echoes. A game awaits, should you wish to hear it.";

let index = 0;
const sherlocks_container = document.querySelector(".sherlock-container");
const watsons_container = document.querySelector(".watson-container");
const sherlocks_dialogue = document.getElementById("dialogue-sherlock");
const watsons_dialogue = document.getElementById("dialogue-watson");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const letter_text = document.getElementById("letter-text");
const transition = document.getElementById("transition");

const type_sound_effect = new Audio("../audio/typewriter.mp3");
type_sound_effect.loop = true;
type_sound_effect.volume = 0.2;

let is_typing = false;

function text_type_effect(dialogueEl, text, callback) {
  let i = 0;
  is_typing = true;
  dialogueEl.textContent = "";
  type_sound_effect.currentTime = 0;
  type_sound_effect.play();

  const interval = setInterval(() => {
    if (i < text.length) {
      dialogueEl.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      type_sound_effect.pause();
      type_sound_effect.currentTime = 0;
      is_typing = false;
      if (callback) callback();
    }
  }, 45);
}

function show_next_dialogue() {
  if (is_typing) return;

  console.log("Current index:", index, "Total dialogues:", dialogues.length);

  if (index < dialogues.length) {
    const current_dialogue = dialogues[index]; // Use the current index

    if (current_dialogue.speaker === "Sherlock") {
      sherlocks_container.classList.remove("hidden");
      watsons_container.classList.add("hidden");
      text_type_effect(sherlocks_dialogue, current_dialogue.text, () => {
        index++; // Increment the index after Sherlock's dialogue
        show_next_dialogue(); // Proceed to the next dialogue
      });
    } else if (current_dialogue.speaker === "Watson") {
      watsons_container.classList.remove("hidden");
      sherlocks_container.classList.add("hidden");
      text_type_effect(watsons_dialogue, current_dialogue.text, () => {
        // Add a delay of 1400ms before proceeding to the next dialogue
        setTimeout(() => {
          index++; // Increment the index after Watson's dialogue
          show_next_dialogue(); // Proceed to the next dialogue
        }, 1400);
      });
    }
  } else {
    console.log("Creating Continue button..."); // Debugging log

    // Determine the current speaker's dialogue bubble
    const current_dialogueBubble =
      dialogues[index - 1].speaker === "Sherlock"
        ? sherlocks_dialogue
        : watsons_dialogue;

    // Create a "Continue" button after the last dialogue
    const continue_button2 = document.createElement("button");
    continue_button2.textContent = "Continue →";
    continue_button2.classList.add("continue-button2"); // Add the CSS class

    // Append the button to the current speaker's dialogue bubble
    current_dialogueBubble.appendChild(continue_button2);

    // Add an event listener to the button
    continue_button2.addEventListener("click", () => {
      console.log("Continue button clicked!"); // Debugging log
      transitionToCardGame(); // Trigger the transition to the card game
    });
  }
}

function highlightEnvelope() {
  envelope.classList.add("highlight");
  envelope.addEventListener("click", () => {
    envelope.classList.remove("highlight");
    envelope.style.display = "none";
    showLetter();
  });
}

function showLetter() {
  console.log("Showing letter..."); // Debugging log
  letter.classList.remove("hidden"); // Remove the hidden class
  letter.style.display = "block"; // Ensure the letter is visible

  text_type_effect(letter_text, letter_content, () => {
    const continue_button = document.createElement("button");
    continue_button.textContent = "Continue →";
    continue_button.classList.add("continue-button"); // Add the CSS class
    letter.appendChild(continue_button); // Append the button to the letter

    continue_button.addEventListener("click", () => {
      letter.style.display = "none"; // Hide the letter
      show_next_dialogue(); // Proceed to the next dialogue
    });
  });
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
    window.location.href = "./4x4/card.html"; // Redirect to the card game
  }, 2000);
}

// Start the scene
text_type_effect(sherlocks_dialogue, initial_dialogue[0].text, highlightEnvelope);

