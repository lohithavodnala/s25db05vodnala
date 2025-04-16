var express = require('express');
var router = express.Router();

/* GET ornithology expeditions listing. */
router.get('/', function(req, res, next) {
  let ornithology = [
    { ornithology_location: "Amazon Rainforest", species_spotted: "Harpy Eagle", duration_days: 10 },
    { ornithology_location: "Himalayan Foothills", species_spotted: "Himalayan Monal", duration_days: 7 },
    { ornithology_location: "Sundarbans Mangrove", species_spotted: "Masked Finfoot", duration_days: 5 }
  ];
  res.render('ornithology', { title: "Search Results - Ornithology ", ornithology });
});
var express = require('express');
const ornithology_controlers= require('../controllers/ornithology');
var router = express.Router();
/* GET costumes */
router.get('/', ornithology_controlers.ornithology_view_all_Page );
module.exports = router;

router.delete('/:id', ornithology_controlers.ornithology_delete);






