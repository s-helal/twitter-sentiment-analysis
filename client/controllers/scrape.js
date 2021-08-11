
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
    
    // send GET request for article data
    fetch('/gsearch/?userQuery=' + event.target.textContent, {
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