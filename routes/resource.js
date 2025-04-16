var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var ornithology_controller = require('../controllers/ornithology');  // Adjusted to use 'ornithology' controller

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);

/// ORNITHOLOGY ROUTES ///
// POST request for creating an Ornithology entry.
router.post('/ornithologies', ornithology_controller.ornithology_create_post);

// DELETE request to delete an Ornithology entry.
router.delete('/ornithologies/:id', ornithology_controller.ornithology_delete);

// PUT request to update an Ornithology entry.
router.put('/ornithologies/:id', ornithology_controller.ornithology_update_put);

// GET request for one Ornithology entry.
router.get('/ornithologies/:id', ornithology_controller.ornithology_detail);

// GET request for list of all Ornithology items.
router.get('/ornithologies', ornithology_controller.ornithology_list);

module.exports = router;
