/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build Functions */

function togglePlay() {
    /*if (video.paused) {
        video.play();
    } else {
        video.pause();
    }*/
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() { //play and pause button
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('Update the button');
}

function skip() { //add skip functionality
    //console.log('skipping');
    console.log(this.dataset.skip);
    video.currentTim += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    //console.log(this.name);
    //console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.getElementsByClassName.flexBasis = `${percent}%`;
}

function scrub(e) { //updates the video's progress bar to where the user clicks on it
    //console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth)* video.duration;
    video.currentTime = scrubTime;
}

/* Hook up Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);