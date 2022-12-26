// Get all the keys in the keyboard
const keys = document.querySelectorAll(".key");
let currentKey = document.querySelector(".jiggle");
const keysArray = Array.from(keys);
let totalScore = 0;

window.addEventListener("keyup", (e) => {
    let userResponse = e.key.toLowerCase();
    let correctAnswer = currentKey.dataset.key.toLowerCase();
    if (userResponse === correctAnswer) {
        getRandomKey();
        totalScore++;
    } else {
        alert("Your score is " + totalScore);
    }
});

function getRandomKey() {
    currentKey.classList.remove("jiggle");
    currentKey = keysArray[Math.floor(Math.random() * keysArray.length)];
    currentKey.classList.add("jiggle");
    return currentKey;
}
