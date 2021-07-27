// load packages
const cheerio = require('cheerio');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

// create express application
const app = express();

// middleware to serve static files from the ./docs directory
app.use(express.static('docs'))

// middleware to parse request bodies
app.use(bodyParser.json());

// listen for post request to this file
app.post('/',(req,res) => {
    // log data
    console.log('RECEIVED DATA FROM CLIENT:', req.body);

    // initialize data array
    var data = [];  

    // request articles from url
    request(req.body.searchUrl,(err,response,html) => {   
        // check for successful request
        if(response.statusCode === 200){
            // store scraped html in $
            const $ = cheerio.load(html);

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
        }
        if(err){
            console.log("error in request to external site:", err);
        }
        
        // respond to client with article data
        console.log("SENDING DATA TO CLIENT:", data);
        res.send(JSON.stringify(data));
    })
})

// create server and start listening for requests
app.listen(3000,() => {
    console.log("server is running on port 3000");
})
