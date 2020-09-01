const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and the game

recognition.start();

// Capture the speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
    <span class="box">${msg}</span>
    
    `;
}

// to check if it is a number
function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>This is not valid</div>`;
    return;
  }

  //   Checking the range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>It should be between 1 and 100</div>`;
    return;
  }

  // Check the number
  if (num == randomNum) {
    document.body.innerHTML = `
      <h2>Congrats!You have guessed the right number <br><br>It was ${num}</h2>
      <button class='play-again' id='play-again'>Play Again</button>
      `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>Go Lower</div>`;
  } else {
    msgEl.innerHTML += `<div>Go Higher</div>`;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

// GEt input
recognition.addEventListener("result", onSpeak);

// Ending Speech Recognition
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
