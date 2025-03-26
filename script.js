// Sample song data
const songs = [
    {
        title: "Thank God I do",
        artist: "Lauren Daigle",
        src: "./Music/music1.m4a", 
        cover: "./Image/cover1.jpg",
        lyrics: "Lyrics for song 1..."
    },
    {
        title: "Wede Teraraw Chaf",
        artist: "Aster Abebe",
        src: "./Music/music2.mp3",
        cover: "./Image/cover2.jpg",
        lyrics: "Lyrics for song 2..."
    },
    {
        title: "Eyemarkegn",
        artist: "Kingdom Sound",
        src: "./Music/music3.m4a",
        cover: "./Image/cover3.jpg",
        lyrics: "Lyrics for song 3..."
    },
    {
        title: "Eyesus Deg neh",
        artist: "Biniyam Desalgn",
        src: "./Music/music4.mp3",
        cover: "./Image/cover4.jpg",
        lyrics: "Lyrics for song 4..."
    },
    {
        title: "Simhn",
        artist: "Yossef Kassa",
        src: "./Music/music5.mp3",
        cover: "./Image/cover5.jpg",
        lyrics: "Lyrics for song 5..."
    }
];

let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false; 

const audioPlayer = document.getElementById('audioPlayer');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const albumCover = document.getElementById('albumCover');
const playBtn = document.getElementById('playBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumCover.src = song.cover;

    audioPlayer.load(); 
}

function playPauseSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(currentSongIndex);
    audioPlayer.play();
    playBtn.innerHTML= '<i class="fas fa-pause"></i>'; 
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play(); 
    playBtn.innerHTML = '<i class="fas fa-pause"></i>'; 
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
}


function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat); 
}


audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        audioPlayer.currentTime = 0; 
        audioPlayer.play(); 
    } else {
        nextSong(); 
    }
});

loadSong(currentSongIndex);


songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => {
        currentSongIndex = index;
        loadSong(currentSongIndex); 
        playPauseSong();  
        isRepeat = true;  
        repeatBtn.classList.add('active'); 
    };
    playlistList.appendChild(li);
});
