// Require Libraries
const express = require('express');
const http = require('http')

 // Require tenorjs near the top of the file
 const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": "2DHFVUUVH6SA", // https://tenor.com/developer/keyregistration
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});
// App Setup
const app = express();
// Middleware
const exphbs  = require('express-handlebars');
var hbs = exphbs.create({
    defaultLayout: 'main',
});
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');
app.use(express.static('public'));
// Routes
// app.get('/', (req, res) => {
//     res.render('home')
//   })

  app.get('/', (req, res) => {
    // Handle the home page when we haven't queried yet
    term = ""
    if (req.query.term) {
        term = req.query.term
    }
    console.log(http.get(`http://g.tenor.com/v1/search?${term}`));
    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    Tenor.Search.Query(term, "4")
        .then(response => {
            // store the gifs we get back from the search
            const gifs = response;
            // pass the gifs as an object into the home page
            res.render('home', { gifs })
        }).catch(console.error);
  })
// Start Server
const PORT = 3000;
app.listen(3000, () => {
  console.log(`Giffy App listening on port localhost: ${3000}!`);
});