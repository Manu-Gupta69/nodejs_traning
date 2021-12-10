const express = require('express');

const inventoryController = require('../controllers/inventory');

const router = express.Router();

router.get('/inventory', inventoryController.getInventorydata);
router.post('/inventory', inventoryController.postInventorydata);

module.exports = router;
