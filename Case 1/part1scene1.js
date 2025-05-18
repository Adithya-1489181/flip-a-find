const dialogues = [
  { speaker: "Watson", text: "Sherlock! Elira Serafin, the famous violinist, vanished just before her concert. The only thing left behind was her violin. No signs of a struggle." },
  { speaker: "Sherlock", text: "Disappearance during a concert? A performance interrupted? That’s more than suspicious. There’s a melody to this mystery, Watson. And someone is conducting it." },
  { speaker: "Watson", text: "You think this is foul play?" },
  { speaker: "Sherlock", text: "Not just foul play — a performance for us. Get your coat we are going to the hall." },
  { speaker: "Watson", text: "Right away, Sherlock. Let's solve this mystery." },
  { speaker: "Sherlock", text: "Let's begin the investigation." }
];

let index = 0;
const sherlocks_dialogue = document.getElementById("dialogue");
const watsons_dialogue = document.getElementById("dialogue-watson");
const next_button = document.getElementById("nextBtn");
const next_button_watson = document.getElementById("nextBtnWatson"); // Add this line to select Watson's button
const sherlocks_container = document.querySelector(".sherlock-container");
const watsons_container = document.querySelector(".watson-container");

const text_type_sound = new Audio("../audio/typewriter.mp3");
text_type_sound.loop = true;
text_type_sound.volume = 0.2;

let is_typing = false; // Flag to track typing status

function typing_text(dialogueEl, text, i = 0) {
  if (!dialogueEl) {
    console.error("Dialogue element not found in the DOM.");
    return;
  }

  if (i === 0) {
    dialogueEl.textContent = ""; // Clear the content at the start of typing
    text_type_sound.currentTime = 0;
    text_type_sound.play(); // 🔊 Start sound on new dialogue
  }

  if (i < text.length) {
    dialogueEl.textContent += text.charAt(i); // Append one character at a time
    setTimeout(() => typing_text(dialogueEl, text, i + 1), 30); // Continue typing
  } else {
    text_type_sound.pause(); // ⏹ Stop sound after full text typed
    text_type_sound.currentTime = 0;
    is_typing = false; // Reset typing flag
  }
}

function show_next_dialogue() {
  if (is_typing) return; // Prevent starting a new dialogue while typing

  if (index < dialogues.length) {
    const current_dialogue= dialogues[index];

    // Show the correct character and dialogue
    if (current_dialogue.speaker === "Sherlock") {
      sherlocks_container.classList.remove("hidden");
      watsons_container.classList.add("hidden");
      typing_text(sherlocks_dialogue, current_dialogue.text); // Use Sherlock's dialogue element
    } else if (current_dialogue.speaker === "Watson") {
      watsons_container.classList.remove("hidden");
      sherlocks_container.classList.add("hidden");
      typing_text(watsons_dialogue, current_dialogue.text); // Use Watson's dialogue element
    }

    index++;
    if (index === dialogues.length) {
      next_button.textContent = "Play Game ▶";
    }
  } else {
    window.location.href = "./part1scene2.html"; // Redirect to your game
  }
}

// Attach event listeners to both buttons
next_button.addEventListener("click", show_next_dialogue);
next_button_watson.addEventListener("click", show_next_dialogue); // Add this line

// Start first dialogue
show_next_dialogue();




