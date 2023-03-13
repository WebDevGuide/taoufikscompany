let timerInterval;
let buttonsDisabled = false;

function startPomodoro(minutes) {
  if (buttonsDisabled) {
    return;
  }
  buttonsDisabled = true;
  let seconds = minutes * 60;
  timerInterval = setInterval(() => {
    seconds--;
    updateTimer(formatTime(seconds));
    updateTitle(formatTime(seconds));
    if (seconds <= 0) {
      clearInterval(timerInterval);
      updateTitle("Time's Up");
      playBeep();
      buttonsDisabled = false;
      startBreak(minutes === 25 ? 5 : 10); // Start break time after 25 or 50 minute pomodoro
    }
  }, 1000);
}

function startBreak(minutes) {
  let seconds = minutes * 60;
  timerInterval = setInterval(() => {
    seconds--;
    updateTimer(formatTime(seconds));
    updateTitle(formatTime(seconds) + " | Break Time");
    if (seconds <= 0) {
      clearInterval(timerInterval);
      updateTitle("Break Time Ended");
      playBeep();
      buttonsDisabled = false;
    }
  }, 1000);
}

function playBeep() {
  let beep = new Audio('bell-ringing-05.mp3');
  beep.play();
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer(time) {
  document.getElementById("timer").textContent = time;
}

function updateTitle(time) {
  document.title = time + " | TimeMaster";
  if (time === "Time's Up" || time === "Break Time's Up") {
    setTimeout(() => {
      document.title = "TimeMaster";
    }, 5000);
  }
}

// Disable buttons if timer is running
if (timerInterval) {
  buttonsDisabled = true;
  document.getElementById("pomodoro25").disabled = true;
  document.getElementById("pomodoro50").disabled = true;
}


const dateDisplay = document.querySelector('.date');
const today = new Date();

const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);

dateDisplay.textContent = formattedDate;

function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {hour24: true, hour: '2-digit', minute:'2-digit'});
  document.getElementById('local-time').textContent = timeString;
}

// Update the time every second
setInterval(updateTime, 1000);