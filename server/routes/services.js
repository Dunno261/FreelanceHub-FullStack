const express = require('express');
const router = express.Router();
const {
  getAllServices,
  getServiceById,
  addService,
  saveService,
  hireService,
  getSaved,
  getHired
} = require('../controllers/servicesController');

// GET all services (supports ?search= and ?category= query params)
router.get('/services', getAllServices);

// GET single service by id
router.get('/services/:id', getServiceById);

// POST new service
router.post('/services', addService);

// POST save a service
router.post('/save', saveService);

// POST hire a service
router.post('/hire', hireService);

// GET saved services
router.get('/saved', getSaved);

// GET hired services
router.get('/hired', getHired);

module.exports = router;
