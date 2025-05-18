const dialogues = [
  { speaker: "Sherlock", text: "There --- between the notes. A cipher embedded in the time signatures... brilliant. She was not just playing music. She was passing a message." },
  { speaker: "Watson", text: "A message!! Interesting. But for whom?" },
  { speaker: "Sherlock", text: "To Moriarty. She wasn't abducted. She vanished by design. If that's the case then something valued is missing. Let's check the vault"}
];
const notes = ["♪", "♫N", "♬O", "♩", "♭S", "♮H", "♯O", "𝄞W"];

let index = 0;
const sherlocks_container = document.querySelector(".sherlock-container");
const watsons_container = document.querySelector(".watson-container");
const dialogue_sherlock = document.getElementById("dialogue-sherlock");
const dialogue_watson = document.getElementById("dialogue-watson");
const transition = document.getElementById("transition");
const musical_lines = document.getElementById("musical-lines");

const typing_sound = new Audio("../audio/typewriter.mp3");
typing_sound.loop = true;
typing_sound.volume = 0.2;

let isTyping = false;

function type_text(dialogueEl, text, callback) {
  let i = 0;
  isTyping = true;
  dialogueEl.textContent = "";
  typing_sound.currentTime = 0;
  typing_sound.play();

  const interval = setInterval(() => {
    if (i < text.length) {
      dialogueEl.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      typing_sound.pause();
      typing_sound.currentTime = 0;
      isTyping = false;
      if (callback) callback();
    }
  }, 45);
}

function show_next_dialogue() {
  if (isTyping) return;

  console.log("Current index:", index, "Total dialogues:", dialogues.length);

  if (index < dialogues.length) {
    const current_dialogue = dialogues[index]; // Use the current index

    if (current_dialogue.speaker === "Sherlock") {
      sherlocks_container.classList.remove("hidden");
      watsons_container.classList.add("hidden");
      type_text(dialogue_sherlock, current_dialogue.text, () => {
        index++; // Increment the index after Sherlock's dialogue
        show_next_dialogue(); // Proceed to the next dialogue
      });
    } else if (current_dialogue.speaker === "Watson") {
      watsons_container.classList.remove("hidden");
      sherlocks_container.classList.add("hidden");
      type_text(dialogue_watson, current_dialogue.text, () => {
        setTimeout(() => {
          index++; // Increment the index after Watson's dialogue
          show_next_dialogue(); // Proceed to the next dialogue
        }, 1800);
      });
    }
  } else {
    console.log("Creating Continue button..."); // Debugging log

    // Determine the current speaker's dialogue bubble
    const current_dialogue_bubble =
      dialogues[index - 1].speaker === "Sherlock"
        ? dialogue_sherlock
        : dialogue_watson;

    // Create a "Continue" button after the last dialogue
    const continue_button2 = document.createElement("button");
    continue_button2.textContent = "Continue →";
    continue_button2.classList.add("continue-button2"); // Add the CSS class

    // Append the button to the current speaker's dialogue bubble
    current_dialogue_bubble.appendChild(continue_button2);

    // Add an event listener to the button
    continue_button2.addEventListener("click", () => {
      console.log("Continue button clicked!"); // Debugging log
      transition_to_cardgame(); // Trigger the transition to the card game
    });
  }
}

function transition_to_cardgame() {
  // Remove the 'hidden' class to show the transition overlay
  transition.classList.remove("hidden");

  // Wait for 2 seconds before redirecting
  setTimeout(() => {
    window.location.href = "./part3scene1.html"; // Redirect to the card game
  }, 2000);
}

function add_musical_notes() {
  let noteindex = 0; // Initialize note index
  // Create 5 horizontal lines
  for (let i = 0; i < 5; i++) {
    const line = document.createElement("div");
    line.classList.add("line");

    // Add random notes to each line
    for (let j = 0; j < 4; j++) {
      const note = document.createElement("span");
      note.classList.add("note");
      note.textContent = notes[noteindex % notes.length]; // Cycle through the notes
      note.style.left = `${j * 30}%`; // Position notes evenly across the line
      noteindex++; // Increment note index
      line.appendChild(note);
    }

    musical_lines.appendChild(line);
  }
}

add_musical_notes();
show_next_dialogue(); // Start the dialogue sequence

