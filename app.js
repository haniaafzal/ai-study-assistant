console.log("StudyAI app is working!");
const notesInput = document.getElementById("notesInput");
const characterCount = document.getElementById("characterCount");
const validationMessage = document.getElementById("validationMessage");
const generateQuizButton = document.getElementById("generateQuizButton");
notesInput.addEventListener("input", function () {
    const noteLength = notesInput.value.length;
    characterCount.textContent = noteLength + " / 20,000 characters";
    if (noteLength < 200) {
    generateQuizButton.disabled = true;
}
else {
    generateQuizButton.disabled = false;

}
if (noteLength < 200) {
    validationMessage.textContent =
        "Add more notes to generate a good quiz (at least 200 characters).";
} else {
    validationMessage.textContent = "";
}
});