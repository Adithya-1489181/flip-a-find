const storyText = `23rd April, London - Elira Serafin the well-known violinist, is missing from her concert. Audience who were waiting for her show was shocked when the curtains rose and Elira was missing. The only clue left behind is a mirror box note. No one knows where she is. The police are baffled. `;

let index = 0;
const speed = 50;
const textEl = document.getElementById('story-text');
const startBtn = document.getElementById('start-btn');
const playBtn = document.getElementById('play-btn');
const notepad = document.getElementById('notepad');

const typeSound = new Audio('../audio/typewriter.mp3');
typeSound.loop = true;
typeSound.volume = 0.2; 

playIntro();

function playIntro() {
  setTimeout(() => {
    notepad.classList.remove('hidden');
    typeWriter();
  },1000);
}

function typeWriter() {
  if (index === 0) {
    typeSound.play(); 
  }

  if (index < storyText.length) {
    textEl.innerHTML += storyText.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  } else {
    typeSound.pause(); 
    typeSound.currentTime = 0;

    startBtn.classList.remove("hidden");
    startBtn.style.opacity = 1;
  }
}

startBtn.addEventListener('click', () => {
  window.location.href = "./part1scene1.html";
});
