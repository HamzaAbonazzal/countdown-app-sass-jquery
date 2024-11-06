$(document).ready(function () {
  const minutesInput = $("#minutes-input");
  const secondsInput = $("#seconds-input");
  const startButton = $("#start-button");
  const pauseButton = $("#pause-button");
  const stopButton = $("#stop-button");
  const timeDisplay = $("#time-display");
  const darkModeToggle = $("#dark-mode-toggle");
  let countdownInterval;
  let isPaused = false;
  let totalTimeInSeconds;

  function startTimer() {
    const minutes = parseInt(minutesInput.val()) || 0;
    const seconds = parseInt(secondsInput.val()) || 0;
    totalTimeInSeconds = minutes * 60 + seconds;

    if (countdownInterval) {
      clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(function () {
      if (!isPaused) {
        const displayMinutes = Math.floor(totalTimeInSeconds / 60);
        const displaySeconds = totalTimeInSeconds % 60;

        timeDisplay.text(
          `${String(displayMinutes).padStart(2, "0")}:${String(
            displaySeconds
          ).padStart(2, "0")}`
        );

        if (totalTimeInSeconds > 0) {
          totalTimeInSeconds--;
        } else {
          clearInterval(countdownInterval);
          alert("Time is up!");
        }
      }
    }, 1000);
  }

  startButton.click(function () {
    isPaused = false;
    startTimer();
  });

  pauseButton.click(function () {
    isPaused = !isPaused;
    if (isPaused) {
      pauseButton.text("Resume");
    } else {
      pauseButton.text("Pause");
    }
  });

  stopButton.click(function () {
    clearInterval(countdownInterval);
    timeDisplay.text("00:00");
    minutesInput.val("");
    secondsInput.val("");
    isPaused = false;
    pauseButton.text("Pause");
  });

  $(document).keypress(function (e) {
    if (e.which == 13) {
      // Key code for Enter is 13
      isPaused = false;
      startTimer();
    }
  });

  darkModeToggle.click(function () {
    $("body").toggleClass("light-mode");
    if ($("body").hasClass("light-mode")) {
      darkModeToggle.text("🌙");
    } else {
      darkModeToggle.text("🌞");
    }
  });
});
