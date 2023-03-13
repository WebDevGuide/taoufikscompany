const clipboardButton = document.querySelector("#copy-to-clipboard");
const clearButton = document.querySelector(".clear");
const notesInput = document.querySelector(".notes-input");
const clipboardMessage = document.querySelector("#clipboard-message");

clipboardButton.addEventListener("click", () => {
  notesInput.select();
  document.execCommand("copy");
  clipboardMessage.style.display = "block";
  setTimeout(() => {
    clipboardMessage.style.display = "none";
  }, 2000);
});

clearButton.addEventListener("click", () => {
  notesInput.value = "";
});
