
console.log("hello world");

// get modal
const loginModal = document.getElementById("login-modal");

// get modal trigger button
const loginBtn = document.getElementById("login-button");

// get close button
const closeBtn = document.getElementById("close-modal-button");

// listen for showing modal
loginBtn.addEventListener("click", showModalFun);

// listen for hiding modal
closeBtn.addEventListener('click', hideModalFun);
window.addEventListener('click', windowHideModal);

// function to show modal
function showModalFun() {
    loginModal.style.display = "block";
}

// function to hide modal
function hideModalFun() {
    loginModal.style.display = "none";
}

// function to hide modal if click outside of modal
function windowHideModal(event) {
    if (event.target == loginModal) {
        hideModalFun();
    }
}