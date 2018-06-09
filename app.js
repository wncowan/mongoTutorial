// Require the Express Module
var express = require('express');
// Require the Mongoose Module
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of our db in mongodb -- this should match the name of the db you are going to use for your project.
// Note: If you connect to a database that doesn't exist, mongoose WILL create the DB for you!
mongoose.connect('mongodb://localhost/basic_mongoose');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

//Create schema
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User'); // We are retrieving this Schema from our Models, named 'User'   

// Routes
// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {users: users});
        }
    });
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
})
// Add User Request 
app.post('/users', function(req, res) {
    console.log("req.body~~~", req.body);
    User.create(req.body.body, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            console.log(user + " created.");
            res.redirect('/');
        }
    });
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})