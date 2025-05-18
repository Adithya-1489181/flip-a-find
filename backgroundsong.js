const background_songs = [
    new Audio("/audio/1.mp3"),
    new Audio("/audio/2.mp3"),
    new Audio("/audio/3.mp3")
];

let current_song = 0;
let resume_time = 0;

// Restore state from localStorage if available
if (localStorage.getItem("bg_song_index")) {
    current_song = parseInt(localStorage.getItem("bg_song_index"), 10) || 0;
}
if (localStorage.getItem("bg_song_time")) {
    resume_time = parseFloat(localStorage.getItem("bg_song_time")) || 0;
}

function play_next_song() {
    const song = background_songs[current_song];
    song.currentTime = resume_time;
    song.volume = 0.5;
    song.play();
    song.onended = () => {
        current_song = (current_song + 1) % background_songs.length;
        resume_time = 0;
        localStorage.setItem("bg_song_index", current_song);
        localStorage.setItem("bg_song_time", 0);
        play_next_song();
    };
    // Save playback position every second
    song.ontimeupdate = () => {
        localStorage.setItem("bg_song_index", current_song);
        localStorage.setItem("bg_song_time", song.currentTime);
    };
}

play_next_song();