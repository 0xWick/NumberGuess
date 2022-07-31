const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognising incoming audio
recognition.start();

// Using User Speech
function onSpeak(e) {
  let msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div class="upperClass">You said:</div>
    <span class="box">${msg}</span>
    `;
}

// Checking Number
function checkNumber(msg) {
  // Converting str to number
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div class="range" style="color: red;"> That is not a valid number</div>`;
    return;
  }

  // Check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div class="range" style="color: white;"> Out of Range </div>`;
    return;
  }

  // Check Number
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2> Congrats! <br> You are now a true Magician! <br><br><br>
    It was ${num} </h2>
    <button class="play-again" id="play-again"> Play Again</button>

    <video width="320" height="240" autoplay muted>
      <source src="/media/dance.mp4" type="video/mp4">
    </video>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div class="range">GO LOWER!</div>`;
  } else {
    msgEl.innerHTML += `<div class="range">GO HIGHER!</div>`;
  }
}

// Random Number Generator
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Getting user's voice
recognition.addEventListener("result", onSpeak);

// End SR Service

recognition.addEventListener("end", () => {
  recognition.start();
});

// Restart the game
document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
