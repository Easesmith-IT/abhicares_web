export const startCountdown = (durationInSeconds) => {
    let timer = durationInSeconds;
    // const countdownElement = document.getElementById('countdown');

    const updateDisplay = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;


        const time = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        console.log("time", time);
    }

    const countdown = () => {
        updateDisplay();

        if (timer <= 0) {
            clearInterval(interval);
            // countdownElement.textContent = "Time's up!";
        } else {
            timer--;
        }
    }

    // Initial call to display the countdown immediately
    countdown();

    // Update the countdown every 1000 milliseconds (1 second)
    const interval = setInterval(countdown, 1000);
}

// Start a 1-minute countdown
// startCountdown(60);