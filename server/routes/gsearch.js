// load packages
const cheerio = require('cheerio');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// initialize router
var router = express.Router()

// middleware to parse request bodies
router.use(bodyParser.json());

// listen for get request to this file
router.get('/', (req,res) => {
    // get search url
    const searchUrl = "https://scholar.google.com/scholar?q=" + encodeURI(req.query.userQuery);
    
    // log data
    console.log('RECEIVED DATA FROM CLIENT:', req.body);

    // initialize data array
    var data = [];  

    // get html from url
    axios.get(searchUrl).then(axiosRes => {
        // store scraped html in $
        const $ = cheerio.load(axiosRes.data);

        // loops through each div with class gs_scl (a tile for an article)
        $('.gs_scl').each((i,el) => {
            // extract and store header, description, and link of each element
            const title = $(el).find('h3').text(); // find header in div
            const article = $(el).find('.gs_rs').text(); // find description in div
            const link = $(el).find('h3').find('a').attr('href'); // find link in div
            
            let element_data = {
                title,
                article,
                link
            }; // store in object

            data.push(element_data); // push to array
        })

        // respond to client with article data
        console.log("SENDING DATA TO CLIENT:", data);
        res.send(JSON.stringify(data));

        }).catch(err => {
            console.log("error in request to external site:", err);
            return(err);
        })    
})

// export router
module.exports = router;