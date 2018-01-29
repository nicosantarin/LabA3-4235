

// This is project entry point. If you start the
// server by typing node expresstut.js and then open the
// browser at localhost:3000 you'll get a 404 error if
// you haven't defined any routes
// Import the express module
var express = require('express');
 
var app = express();

app.disable('x-powered-by');


var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//imported filesystem
var fs = require('file-system');
 
// fs.mkdir('1/2/3/4/5', [0o777], function(err) {});
// fs.mkdirSync('1/2/3/4/5', [0o777]);
// fs.writeFile('path/test.txt', 'aaa', function(err) {})

//using RESTful
//routing request to add user
app.post('/users/:userid',1001);



//more imports
//define port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));




//routes
app.get('/', function(req, res){
  // Point at the home.handlebars view
  res.render('home');
});

//middleware example
app.use(function(req, res, next){
  console.log('Looking for URL : ' + req.url);
  next();
});
//middleware report and throw errors
app.get('/junk', function(req, res, next){
  console.log('Tried to access /junk');
  throw new Error('/junk does\'t exist');
});
// Catches the error and logs it and then continues
// down the pipeline
app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});


//define about route
app.get('/about', function(req, res){
  // Point at the about.handlebars view
  res.render('about');
});






// Defines a custom 404 Page and we use app.use because
// the request didn't match a route (Must follow the routes)
app.use(function(req, res) {
  // Define the content type
  res.type('text/html');
// The default status is 200
  res.status(404);
// Point to 404.handlebars view
  res.render('404');
});


// Custom 500 Page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
// Point to 500.handlebars view
  res.render('500');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});