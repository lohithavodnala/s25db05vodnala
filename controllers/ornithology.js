var ornithology = require('../models/ornithology');
// List of all Costumes
//exports.ornithology_list = function(req, res) {
//res.send('NOT IMPLEMENTED: ornithology  list');
//};
//List of all Costumes
exports.ornithology_list = async function (req, res) {
    try {
        theornithology = await ornithology.find();
        res.send(theornithology);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific Costume.
exports.ornithology_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: ornithology  detail: ' + req.params.id);
};
// Handle Costume create on POST.
//exports.ornithology_create_post = function (req, res) {
// res.send('NOT IMPLEMENTED: ornithology  create POST');
//};

// Handle Costume create on POST.
exports.ornithology_create_post = async function (req, res) {
    console.log(req.body)
    let document = new ornithology();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.ornithology_location = req.body.ornithology_location;
    document.species_spotted = req.body.species_spotted;
    document.duration_days = req.body.duration_days;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


// Handle Costume delete from on DELETE.
exports.ornithology_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: ornithology  delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.ornithology_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: ornithology  update PUT' + req.params.id);
};
// VIEWS
// Handle a show all view
exports.ornithology_view_all_Page = async function (req, res) {
    try {
        theornithology = await ornithology.find();
        res.render('ornithology', { title: 'ornithology Search Results', results: theornithology });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


