const dialogues = [
  { speaker: "Watson", text: "Sherlock!! You were correct, Elira got caught at an blackmarket aution and she was about to sell it to someone who was with Moriarty" },
  { speaker: "Sherlock", text: "Amazing. Well then, now you can blog this case with the title ``The Vanishing Violinist``, Watson!!" }
];


let index = 0;
const sherlocks_container = document.querySelector(".sherlock-container");
const watsons_container = document.querySelector(".watson-container");
const dialogue_sherlock = document.getElementById("dialogue-sherlock");
const dialogue_watson = document.getElementById("dialogue-watson");
const transition = document.getElementById("transition");


const typing_sound = new Audio("../audio/typewriter.mp3");
typing_sound.loop = true;
typing_sound.volume = 0.2;


let is_typing = false;


function type_text(dialogueEl, text, callback) {
  let i = 0;
  is_typing = true;
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
    const current_dialogueBubble =
      dialogues[index - 1].speaker === "Sherlock"
        ? dialogue_sherlock
        : dialogue_watson;


    // Create a "Continue" button after the last dialogue
    const continue_button2 = document.createElement("button");
    continue_button2.textContent = "Continue →";
    continue_button2.classList.add("continue-button2"); // Add the CSS class


    // Append the button to the current speaker's dialogue bubble
    current_dialogueBubble.appendChild(continue_button2);


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
    window.location.href = "./endcredits.html"; // Redirect to the card game
  }, 2000);
}


show_next_dialogue(); // Start the dialogue sequence





