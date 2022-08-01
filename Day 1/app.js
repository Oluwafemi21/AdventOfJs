// Get all the interactive elements on the page
const ring = document.querySelector('.ring');
const minutes = document.querySelector('.minutes input');
const seconds = document.querySelector('.seconds input');
const startBtn = document.querySelector('.start');
const settingsBtn = document.querySelector('.settings');
let myInterval;

//Create functions for interactivity
function reduceTime() {
    let timeInSeconds = seconds.value;
    let timeInMinutes = minutes.value;
    myInterval = setInterval(() => {
        const iterator = timeInMinutes.split('').find(minus => minus === '-');
        if (timeInMinutes.includes(iterator)) {
            reset();
        } else {

            timeInSeconds -= 1;
            //Check if the time is less than 0
            if (timeInSeconds < 0) {
                timeInSeconds = 59;
                if (timeInMinutes > 10) {
                    timeInMinutes -= 1
                } else {
                    timeInMinutes -= 1
                    timeInMinutes = "0" + timeInMinutes
                }
            }
            //Check if the seconds is less than 10
            if (timeInSeconds < 10) {
                timeInSeconds = "0" + timeInSeconds
            }
        }


        //Set the time to the input value
        seconds.value = timeInSeconds;
        minutes.value = timeInMinutes;
    }, 1000);

}

function reset() {
    ring.classList.add('ending');
    startBtn.textContent = 'start';
    clearInterval(myInterval);
    setTimeout(() => {
        alert("Time's up!")
    }, 100)
}

function editTime() {
    //Stop the timer and allow editing
    minutes.disabled = !minutes.disabled;
    seconds.disabled = !seconds.disabled;
}


//Call the functions
startBtn.addEventListener('click', function () {
    if (startBtn.textContent === 'start') {
        startBtn.textContent = 'stop';
        minutes.disabled = true;
        seconds.disabled = true;
        reduceTime();
    } else if (startBtn.textContent === 'stop') {
        clearInterval(myInterval);
        startBtn.textContent = 'start';
    }
})


settingsBtn.addEventListener('click', function () {
    editTime();
})




