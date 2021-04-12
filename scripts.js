"use strict";

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/** Function handles playing or pausing the video */
function togglePlay() {
  const isPaused = video.paused ? true : false; //paused is a property on video
  
  if (isPaused) { 
    video.play();
  } else {
    video.pause();
  }
}

/** Function updates toggle button if playing or paused */
function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  toggleButton.textContent = icon;
}

/** Function skips video player forward or backward */
function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

/** Function handles changes to range sliders */
function handleRangeUpdate(){
  video[this.name] = this.value; // element has name equal to video property
}

/** Function updates progressBar for video in realtime */
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/** Function handles clicks on progress bar to update video player */
function scrub(evt){
  const scrubTime = (evt.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); // also can use an event called progress on video

toggleButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate));
ranges.forEach(slider => slider.addEventListener(
  'mousemove', handleRangeUpdate
)); // update to include flag for when mouse done

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (evt) => mousedown && scrub(evt));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
