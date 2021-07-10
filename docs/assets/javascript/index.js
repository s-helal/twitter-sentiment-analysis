// MODAL VISIBILITY FUNCTIONS
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

// USER INFO STORAGE FUNCTIONS
// get form contents
const userEmail = document.getElementById("user-email");
const userName = document.getElementById("user-name");
const userAge = document.getElementById("user-age");

// get form submit button
const submitBtn = document.getElementById("login-submit-btn");

// get welcome name header
const welcomeArea = document.getElementById("welcome-name");

// get logout button
const logoutBtn = document.getElementById("logout-button");

// listen for submitting login form
submitBtn.addEventListener('click',submitLoginFun);

// listen for logging out
logoutBtn.addEventListener('click',logoutFun);

// function on submit
function submitLoginFun() {
    // close the modal
    hideModalFun();

    // hide login button
    loginBtn.style.display = "none";

    // show logout button
    logoutBtn.style.display = "block";

    // update user info in local storage
    localStorage.setItem('email',userEmail.value);
    localStorage.setItem('name', userName.value);
    localStorage.setItem('age',userAge.value);

    // check if the user is logged in: add welcome and logout
    checkLoggedIn();
}

function logoutFun() {
    // clear storage
    localStorage.clear();

    // check if the user is logged in: remove welcome and logout
    checkLoggedIn();
}

// function to check if logged in
function checkLoggedIn() {
    // check if name exists
    if (localStorage.getItem("name") == null) {
        // remove welcome with name
        welcomeArea.textContent = "";

        // hide logout button
        logoutBtn.style.display = "none";

        // show login button
        loginBtn.style.display = "block";
    } else {
        // show welcome with name
        welcomeArea.textContent = "Welcome, " + localStorage.getItem("name");

        // hide login button
        loginBtn.style.display = "none";
        
        // show logout button
        logoutBtn.style.display = "block";
    }
}

// CHECK IF LOGGED IN
checkLoggedIn();