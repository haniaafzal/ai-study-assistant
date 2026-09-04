console.log("StudyAI is working!");
const askButton = document.getElementById("askButton");
const aiResponse = document.getElementById("aiResponse");
askButton.addEventListener("click", function () {
    aiResponse.textContent = "Hello! StudyAI is ready.";
});