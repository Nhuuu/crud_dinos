var express = require('express');
var router = express.Router();
var fs = require('fs');
var creaturesData = fs.readFileSync('./prehistoric_creatures.json')
creaturesData = JSON.parse(creaturesData);


router.get('/', (req, res) => {
	res.render('prehistoric_creatures/index', {myCreatures: creaturesData});
})



router.get('/', (req, res) => {
	var typeFilter = req.query.typeFilter;
	if(typeFilter){
		var filteredData = creaturesData.filter(function(creature){
			return creature.type.toLowerCase() === typeFilter.toLowerCase();	
		});
		res.render('prehistoric_creatures/index', {myCreatures: filteredData});
	} else {
		res.render('prehistoric_creatures/index', {myCreatures: creaturesData});
	}
})


// edit a post route  >>>>>>>>>> help
router.put('/edit/:idx', (req, res) => {
	if(creaturesData[req.params.idx - 1]){
		res.render('prehistoric_creatures/edit', {creature: creaturesData[req.params.idx - 1]})
	} else {
		res.send(`Uh Oh! This creature doesn't exist, can't edit it!`)
	}
})



// Prehistoric creatures new route
router.get('/new', (req, res) => {
	res.render('prehistoric_creatures/new');
})



// Show route for prehistoric creatures
router.get('/:idx', (req, res) => {
	if(creaturesData[req.params.idx - 1]){
		res.render('prehistoric_creatures/show', {creature: creaturesData[req.params.idx - 1]})
	} else {
		res.send(`Uh Oh! This creature doesn't exist!`)
	}
})


// new creature post route
router.post('/', (req, res) =>{
	creaturesData.push(req.body);
	fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData));
	res.redirect('/prehistoric_creatures');
})





module.exports = router;