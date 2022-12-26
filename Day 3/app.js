// Get all the white keys and black keys
const whiteKeys = document.querySelectorAll(".white-keys");
const blackKeys = document.querySelectorAll(".black-keys");

const newWhiteKeys = [...whiteKeys];
const newBlackKeys = [...blackKeys];

newWhiteKeys.forEach((key) => {
    key.addEventListener("click", () => {
        let index = newWhiteKeys.indexOf(key);
        playAudio(index + 1);
    });
});

newBlackKeys.forEach((key) => {
    key.addEventListener("click", () => {
        let index = newBlackKeys.indexOf(key);
        playAudio(index + 1);
    });
});

function playAudio(id) {
    const audio = new Audio(`audio/key-${id}.mp3`);
    audio.play();
}
