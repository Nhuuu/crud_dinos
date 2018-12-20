var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');


app.set('view engine', 'ejs');
app.use(ejsLayouts);

// body parser middleware. tells the system that you want the json to be used. false is shallow, true is a deeper dive nested objects/algorithms.
app.use(express.urlencoded({extended: false}));

// Controllers 
app.use('/dinosaurs', require('./controllers/dinosaurs'));
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'));


app.get('/', (req, res) => {
	res.send('home');
})



app.listen(8000, () => {
	console.log('alexa is listening');
})
