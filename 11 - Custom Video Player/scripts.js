//elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullSc = document.querySelector(".fullscreen");

//functions

function togglePlay() {
    if(video.paused) {
        video.play();
    }else{
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(event) {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime= scrubTime;

}

// function changeMe() {
//     if (this.name === "volume"){
//         let volumeLevel = this.value;
//         video.volume = volumeLevel;
//     }else {
//         video.playbackRate = this.value;
//     }
// }

//quick and nice
function changeMe() {
    video[this.name] = this.value;
}

function fullsize() {
    player.classList.add("fullscreen");

}

//events

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);


toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", changeMe));

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (event) => mousedown && scrub(event));
progress.addEventListener("mousedown", () => mousedown = true );
progress.addEventListener("mouseup", () => mousedown = false );


fullSc.addEventListener("click", fullsize);
