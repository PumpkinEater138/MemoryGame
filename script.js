// global constants
//how long to hold each clue's light/sound
const cluePauseTime = 250; //how long to pause in between clues
const nextClueWaitTime = 200; //how long to wait before starting playback of the clue sequence



// Setting a random number for each array 
let num1 = Math.floor(Math.random()*9);
let num2 = Math.floor(Math.random()*9);
let num3 = Math.floor(Math.random()*9);
let num4 = Math.floor(Math.random()*9);
let num5 = Math.floor(Math.random()*9);
let num6 = Math.floor(Math.random()*9);
let num7 = Math.floor(Math.random()*9);
let num8 = Math.floor(Math.random()*9);



var pattern = [num1, num2, num3, num4, num5, num6, num7, num8];// Sets a random pattern for the game
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; 
var guessCounter = 0;
var clueHoldTime = 200;




function startGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = true;


  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}



function stopGame() {
  //initialize game variables
  progress = 0;
  gamePlaying = false;

  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  
 //tone for new buttons 
  5: 499,
  6: 568,
  7: 634,
  8: 800
};




function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}




function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}




function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}


// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);



function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}



function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}


function playSingleClue(btn) {
  if (gamePlaying) 
  {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}


function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    
 
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}


function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame() {
  stopGame();
  alert("Game Over. You won! :D");
}


function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
   if(pattern[guessCounter] == btn){
    if(guessCounter == progress){
      if(progress == pattern.length - 1){
        winGame();
      }
      
      else
      {
        progress++;
        playClueSequence();
      }
      
    }else{
      guessCounter++;
    }
  }else{

    loseGame();
  }

}