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
//exports.ornithology_update_put = function (req, res) {
    //res.send('NOT IMPLEMENTED: ornithology  update PUT' + req.params.id);
    //Handle Costume update form on PUT.
    exports.ornithology_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await ornithology.findById( req.params.id)
    // Do updates of properties
    if(req.body.ornithology_location)
    toUpdate.ornithology_location = req.body.ornithology_location;
    if(req.body.species_spotted) toUpdate.species_spotted = req.body.species_spotted;
    if(req.body.duration_days) toUpdate.duration_days = req.body.duration_days;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
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

// for a specific ornithology.
exports.ornithology_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await ornithology.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };

    // Handle Costume delete on DELETE.
exports.ornithology_delete = async function(req, res) {
    console.log("delete " + req.params.id);
    try {
        const result = await Costume.findByIdAndDelete(req.params.id);
        console.log("Removed " + result);
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": Error deleting ${err}}`);
    }
};
    


