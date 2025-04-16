const Ornithology = require('../models/ornithology'); // Adjust the path as needed

// GET all ornithology records
exports.ornithology_list = async function(req, res) {
    try {
        const result = await Ornithology.find();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// GET one ornithology record by ID
exports.ornithology_detail = async function(req, res) {
    console.log("detail " + req.params.id);
    try {
        const result = await Ornithology.findById(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500);
        res.send(`{"error": document for id ${req.params.id} not found}`);
    }
};

// POST a new ornithology record
exports.ornithology_create_post = async function(req, res) {
    console.log(req.body);
    let document = new Ornithology();
    document.bird_species = req.body.bird_species;
    document.habitat = req.body.habitat;
    document.region = req.body.region;

    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// PUT update an ornithology record
exports.ornithology_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Ornithology.findById(req.params.id);

        if (req.body.bird_species) toUpdate.bird_species = req.body.bird_species;
        if (req.body.habitat) toUpdate.habitat = req.body.habitat;
        if (req.body.region) toUpdate.region = req.body.region;

        let result = await toUpdate.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed}`);
    }
};

// DELETE an ornithology record
exports.ornithology_delete = async function(req, res) {
    try {
        const result = await Ornithology.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


const Ornithology = require('../models/ornithology');  // Adjust the path if necessary

// Handle a show one view with id specified by query
exports.ornithology_view_one_Page = async function(req, res) {
  console.log("single view for id " + req.query.id);
  try {
    const result = await Ornithology.findById(req.query.id);
    res.render('ornithologydetail', {
      title: 'Ornithology Detail',
      toShow: result
    });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};
