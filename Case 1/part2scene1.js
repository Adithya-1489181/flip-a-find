const initial_dialogue = [{ speaker: "Sherlock", text: "Dahlia's Flat and look what we found!! Another letter by our beloved friend, Watson. He is hinting us that he is behind all of these." }];
const dialogues = [
  { speaker: "Watson", text: "Is this a trap ?" },
  { speaker: "Sherlock", text: "No its a test, Watson. A riddle which he loves to play!!" }
];


const letter_content = "You seek the melody, Holmes. But the music will stop when you reach the wrong note. I'll be waiting";


let index = 0;
const sherlock_container = document.querySelector(".sherlock-container");
const watson_container = document.querySelector(".watson-container");
const dialogue_sherlock = document.getElementById("dialogue-sherlock");
const dialogue_watson = document.getElementById("dialogue-watson");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const letter_text = document.getElementById("letter-text");
const transition = document.getElementById("transition");


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
      sherlock_container.classList.remove("hidden");
      watson_container.classList.add("hidden");
      type_text(dialogue_sherlock, current_dialogue.text, () => {
        index++; // Increment the index after Sherlock's dialogue
        show_next_dialogue(); // Proceed to the next dialogue
      });
    } else if (current_dialogue.speaker === "Watson") {
      watson_container.classList.remove("hidden");
      sherlock_container.classList.add("hidden");
      type_text(dialogue_watson, current_dialogue.text, () => {
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


function highlight_envelope() {
  envelope.classList.add("highlight");
  envelope.addEventListener("click", () => {
    envelope.classList.remove("highlight");
    envelope.style.display = "none";
    show_letter();
  });
}


function show_letter() {
  console.log("Showing letter..."); // Debugging log
  letter.classList.remove("hidden"); // Remove the hidden class
  letter.style.display = "block"; // Ensure the letter is visible


  type_text(letter_text, letter_content, () => {
    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue →";
    continueButton.classList.add("continue-button"); // Add the CSS class
    letter.appendChild(continueButton); // Append the button to the letter


    continueButton.addEventListener("click", () => {
      letter.style.display = "none"; // Hide the letter
      show_next_dialogue(); // Proceed to the next dialogue
    });
  });
}


function transition_to_cardgame() {
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
    window.location.href = "./5x4/card.html"; // Redirect to the card game
  }, 2000);
}


// Start the scene
type_text(dialogue_sherlock, initial_dialogue[0].text, highlight_envelope);


// const notebook = document.getElementById('notebook');
// const btn = document.getElementById('notebook-btn');
// const next = document.getElementById('nextPage');
// const prev = document.getElementById('prevPage');
// const container = document.getElementById('notebookInner');
// const mainScreen = document.getElementById('mainScreen');


// let current = 1;


// document.addEventListener('DOMContentLoaded', () => {
//   notebook.style.display = 'none'; // Ensure notebook is hidden on load
// });


// btn.addEventListener('click', () => {
//   const isNotebookVisible = notebook.style.display === 'block';


//   if (isNotebookVisible) {
//     // Hide the notebook and update button text
//     notebook.style.display = 'none';
//     btn.textContent = '📓'; // Closed state
//   } else {
//     // Show the notebook and update button text
//     notebook.style.display = 'block';
//     btn.textContent = '📖'; // Open state
//   }
// });


// // Dummy page content
// const pages = [
//   {
//     title: "",
//     content: ``
//   },
//   {
//     title: "Fun Fact",
//     content: `<p>Sherlock never said "Elementary, my dear Watson" in Conan Doyle’s original books!</p>`
//   },
//   {
//     title: "Enemy File",
//     content: `<p><strong>Moriarty:</strong> The Napoleon of Crime. Always watching, always waiting...</p>`
//   },
//   {
//     title: "Case #1: The Vanishing Violinist",
//     content: `<ul><li>Victim: Elira Serafin</li><li>No witnesses</li><li>Only a mirror box note</li></ul>`
//   }
// ];


// function renderPages() {
//   container.innerHTML = '';
//   const fontFamilies = ['Handlee', 'Patrick Hand', 'Indie Flower', 'Shadows Into Light', 'Caveat', 'Dancing Script']; // Handwritten fonts


//   for (let i = 0; i < pages.length; i++) {
//     const page = document.createElement('div');
//     page.classList.add('page');
//     page.style.left = i % 2 === 0 ? '0' : '50%';
//     page.style.zIndex = pages.length - i;
//     page.style.transform = 'rotateY(0deg)'; // Start all unflipped


//     // Randomize styles for handwritten effect
//     const randomFontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
//     const randomFontSize = (0.9 + Math.random() * 0.2).toFixed(2) + 'rem'; // Font size between 0.9rem and 1.1rem
//     const randomLineHeight = (1.5 + Math.random() * 0.2).toFixed(2); // Line height between 1.5 and 1.7
//     const randomPadding = (5 + Math.random() * 10).toFixed(0) + 'px'; // Padding between 5px and 15px
//     const randomSkew = (Math.random() * 2 - 1).toFixed(2) + 'deg'; // Skew between -1deg and 1deg
//     const randomTextAlign = ['left', 'center', 'justify'][Math.floor(Math.random() * 3)]; // Random text alignment
//     const randomFontWeight = Math.random() > 0.5 ? 'normal' : 'bold'; // Random font weight


//     // Replace each <li> with a unique random bullet
//     const randomBulletMarks = ['•', '◦', '▪', '✦', '✧'];
//     const contentWithRandomBullets = pages[i].content.replace(/<li>(.*?)<\/li>/g, (match, text) => {
//       const randomBullet = randomBulletMarks[Math.floor(Math.random() * randomBulletMarks.length)];
//       return `<li>${randomBullet} ${text}</li>`;
//     });


//     // Apply styles and content
//     page.innerHTML = `
//       <div class="page-content" style="
//         font-family: '${randomFontFamily}', cursive;
//         font-size: ${randomFontSize};
//         line-height: ${randomLineHeight};
//         text-align: ${randomTextAlign};
//         padding: ${randomPadding};
//         font-weight: ${randomFontWeight};
//         transform: skew(${randomSkew});
//       ">
//         <h3>${pages[i].title}</h3>
//         ${addDisturbanceToText(contentWithRandomBullets)}
//       </div>
//     `;
//     container.appendChild(page);
//   }
// }


// // Function to add disturbance to text
// function addDisturbanceToText(content) {
//   const wrapper = document.createElement('div');
//   wrapper.innerHTML = content;


//   // Apply disturbance to all elements except <ul>, <ol>, and <li>
//   wrapper.querySelectorAll('*').forEach((element) => {
//     if (
//       element.tagName.toLowerCase() === 'li' || // Skip <li> elements
//       element.tagName.toLowerCase() === 'ul' || // Skip <ul> elements
//       element.tagName.toLowerCase() === 'ol'    // Skip <ol> elements
//     ) {
//       return; // Do not apply disturbance to these elements
//     }


//     // Apply disturbance to all other elements
//     element.innerHTML = element.textContent
//       .split('')
//       .map((char) => {
//         if (char === ' ') {
//           // Preserve spaces without wrapping them
//           return char;
//         }
//         const randomRotation = (Math.random() * 2 - 1).toFixed(2); // Rotation between -1deg and 1deg
//         const randomOffsetX = (Math.random() * 1 - 0.5).toFixed(2) + 'px'; // Horizontal offset between -0.5px and 0.5px
//         const randomOffsetY = (Math.random() * 1 - 0.5).toFixed(2) + 'px'; // Vertical offset between -0.5px and 0.5px
//         return `<span style="
//           display: inline-block;
//           transform: translate(${randomOffsetX}, ${randomOffsetY}) rotate(${randomRotation}deg);
//         ">${char}</span>`;
//       })
//       .join('');
//   });


//   return wrapper.innerHTML;
// }


// function updatePages() {
//   const allPages = container.querySelectorAll('.page');


//   allPages.forEach((p, i) => {
//     if (i % 2 === 0) {
//       // Even-indexed pages (left side)
//       if (i < current) {
//         p.style.transform = 'rotateY(-180deg)';
//       } else {
//         p.style.transform = 'rotateY(0deg)';
//       }
//     } else {
//       // Odd-indexed pages (right side)
//       if (i < current) {
//         p.style.transform = 'rotateY(-180deg)';
//       } else {
//         p.style.transform = 'rotateY(0deg)';
//       }
//     }


//     // Stack correctly
//     p.style.zIndex = pages.length - i;
//   });
// }




// next.addEventListener('click', () => {
//   const allPages = container.querySelectorAll('.page');
//   if (current < pages.length - 1) {
//     // Flip current (right-side odd page)
//     if (current % 2 === 1) {
//       allPages[current].style.transform = 'rotateY(-180deg)';
//       allPages[current].style.zIndex = pages.length + current; // Bring flipped page on top
//     }


//     // Update left page z-index
//     if (current + 1 < pages.length) {
//       allPages[current +1].style.zIndex = pages.length + current - 1;
//     }


//     current += 2;
//   }
// });




// prev.addEventListener('click', () => {
//   const allPages = container.querySelectorAll('.page');
//   if (current > 1) {
//     current -= 2;


//     // Unflip current (right-side odd page)
//     if (current % 2 === 1) {
//       allPages[current].style.transform = 'rotateY(0deg)';
//       allPages[current].style.zIndex = pages.length - current;
//     }


//     // Update left page z-index
//     if (current + 1 < pages.length) {
//       allPages[current + 1].style.zIndex = pages.length - current - 1;
//     }
//   }
// });




// renderPages();

