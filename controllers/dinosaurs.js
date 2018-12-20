var express = require('express');
var router = express.Router();
var fs = require('fs');
var dinoData = fs.readFileSync('./dinosaurs.json');
dinoData = JSON.parse(dinoData);


// display all dinos
router.get('/', (req, res) => {
	res.render('dinosaurs/index', {myDino: dinoData});
})


// Filter for name
router.get('/', (req, res) => {
	console.log(req.query);
	var nameFilter = req.query.nameFilter;
	if(nameFilter){
		var filteredData = dinoData.filter(function(dino){
			return dino.name.toLowerCase() === nameFilter.toLowerCase();	
		});
		res.render('dinosaurs/index', {myDinos: filteredData});
	} else {
		res.render('dinosaurs/index', {myDinos: dinoData});
	}
})


// new route
router.get('/new', (req, res) => {
	res.render('dinosaurs/new');
})

// Show route
router.get('/:idx', (req, res) => {
	if(dinoData[req.params.idx - 1]){
		res.render('dinosaurs/show', {dino: dinoData[req.params.idx - 1]})
	} else {
		res.send(`Uh Oh! This dino doesn't exist!`)
	}
})

// post the route
router.post('/', (req, res) =>{
	dinoData.push(req.body);
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
	res.redirect('/dinosaurs');
})


module.exports = router;


