/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Anthony Su Student ID: 142714229 Date: 14/02/2024
*
********************************************************************************/

const legoData = require("./modules/legoSets");

const express = require('express');

const app = express();

const path = require('path');

// Assign port
const HTTP_PORT = process.env.PORT || 8080;

// Make the public folder to public
app.use(express.static('public'));

// Initialize the lego set data first
legoData.initialize().then(() => {});

// Route to default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
}); 

// Route to about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"))
}); 

// Route to views 404.html
app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/404.html"))
}); 

// Route to lego sets
app.get('/lego/sets', (req, res) => {
    // Example http://localhost:8080/lego/sets?theme=Supplemental only return supplemental
    if (req.query.theme) {
        legoData.getSetsByTheme(req.query.theme)
            .then(sets => res.json(sets))
            .catch(err => res.status(404).send(`Theme: ${req.query.theme} cannot be found, error: ${err.message}`));
    } else {
        legoData.getAllSets()
            .then(sets => res.json(sets))
            .catch(err => res.status(404).send(`No sets have found, error: ${err.message}`));
    }
});

// Route to lego set by number demo
app.get('/lego/sets/:set_num', (req, res) => {
    
    const setNum = req.params.set_num;

    legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(err => res.status(404).send(`Dataset cannot be found. Error ${err.message}`));
});

// Route to lego set by theme demo
app.get('/lego/sets/theme-demo', (req, res) => {

    // send request to get the set by theme
    legoData.getSetsByTheme('tech')
        .then(sets => res.json(sets))

        .catch(err => res.status(404).send(`Theme cannot be found, error: ${err.message}`));
});



app.listen(HTTP_PORT, () => {
    console.log(`Server running on port localhost:${HTTP_PORT}`);
});