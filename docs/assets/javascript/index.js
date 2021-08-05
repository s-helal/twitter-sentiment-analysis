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
const userTwt = document.getElementById("user-twitter");
const allInputs = [userEmail, userName, userAge, userTwt];

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
    // check input validity
    for (let i=0; i < allInputs.length; i++) {
        if (!(allInputs[i].checkValidity()) | allInputs[i].value == "") {
            alert("Please check that all inputs are valid");
            return; 
        }
    }
    
    // close the modal
    hideModalFun();

    // hide login button
    loginBtn.style.display = "none";

    // show logout button
    logoutBtn.style.display = "block";

    // store user info in json
    var userInfo = {
        "email":userEmail.value,
        "name":userName.value,
        "age":userAge.value,
        "twitter":userTwt.value
    };

    // clear input values
    allInputs.forEach(field => {field.value = ""});

    // update user info in local storage
    localStorage.setItem('user',JSON.stringify(userInfo));

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
    // check if user info exists
    if (localStorage.length == 0) {
        // remove welcome with name
        welcomeArea.textContent = "";

        // hide logout button
        logoutBtn.style.display = "none";

        // show login button
        loginBtn.style.display = "block";
    } else {
        // get user name from local storage
        var storedName = JSON.parse(localStorage.getItem("user")).name;

        // show welcome with name
        welcomeArea.textContent = "Welcome, " + storedName;

        // hide login button
        loginBtn.style.display = "none";
        
        // show logout button
        logoutBtn.style.display = "block";
    }
}

// CHECK IF LOGGED IN
checkLoggedIn();

// SCRAPE GOOGLE
// get search buttons
const searchBtn1 = document.getElementById('search-btn-1');
const searchBtn2 = document.getElementById('search-btn-2');
const searchBtn3 = document.getElementById('search-btn-3');
const resultCards = document.getElementsByClassName("result-card");

// listen for search button click
searchBtn1.addEventListener('click',scrapeSiteFun);
searchBtn2.addEventListener('click',scrapeSiteFun);
searchBtn3.addEventListener('click',scrapeSiteFun);

// function to scrape 
function scrapeSiteFun(event){
    // hide all article display cards
    for (let i=0; i < 10; i++){
        resultCards[i].style.display = 'none';
    }
    
    // send POST request for article data
    fetch('/api/?userQuery=' + event.target.textContent, {
        method: 'GET',
        // body: JSON.stringify({searchUrl: searchUrl}),
        headers: {"Content-Type": "application/json"}
    }).then(response => {
        // parse response from json into an object
        return(response.json())}
        ).then(data => {
            console.log(data);
            // loop through articles
            for (let i=1; i < 10; i++){
                // get a tile for displaying
                var currentTile = document.getElementById('result-' + i)

                // show tile and populate with article info
                currentTile.style.display = 'block';
                currentTile.childNodes[0].textContent = data[i].title;
                currentTile.childNodes[0].href = data[i].link;
                currentTile.childNodes[1].textContent = data[i].article;
            }
        }
    ).catch(error => console.log(error))      
}