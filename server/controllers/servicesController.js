const { services, savedServices, hiredServices } = require('../data/services');

const getAllServices = (req, res) => {
  const { search, category } = req.query;
  let result = services;

  if (search) {
    const searchLower = search.toLowerCase();
    result = result.filter(service => 
      service.title.toLowerCase().includes(searchLower)
    );
  }

  if (category) {
    result = result.filter(service => service.category === category);
  }

  res.status(200).json(result);
};

const getServiceById = (req, res) => {
  const id = parseInt(req.params.id);
  const service = services.find(s => s.id === id);

  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }

  res.status(200).json(service);
};

const addService = (req, res) => {
  const { title, category, description, price } = req.body;

  if (!title || !category || !description || price === undefined) {
    return res.status(400).json({ error: "Missing required fields: title, category, description, price" });
  }

  const newId = Math.max(...services.map(s => s.id), 0) + 1;
  const newService = {
    id: newId,
    title,
    category,
    description,
    price,
    rating: 0,
    reviews: 0,
    deliveryDays: 3,
    seller: "anonymous",
    image: `https://picsum.photos/seed/${newId}/400/250`
  };

  services.push(newService);
  res.status(201).json(newService);
};

const saveService = (req, res) => {
  const { serviceId } = req.body;

  if (!serviceId && serviceId !== 0) {
    return res.status(400).json({ error: "serviceId is required" });
  }

  const service = services.find(s => s.id === serviceId);
  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }

  if (savedServices.some(s => s.id === serviceId)) {
    return res.status(409).json({ error: "Already saved" });
  }

  savedServices.push(service);
  res.status(200).json({ message: "Service saved", service });
};

const hireService = (req, res) => {
  const { serviceId } = req.body;

  if (!serviceId && serviceId !== 0) {
    return res.status(400).json({ error: "serviceId is required" });
  }

  const service = services.find(s => s.id === serviceId);
  if (!service) {
    return res.status(404).json({ error: "Service not found" });
  }

  if (hiredServices.some(s => s.id === serviceId)) {
    return res.status(409).json({ error: "Already hired" });
  }

  hiredServices.push(service);
  res.status(200).json({ message: "Service hired", service });
};

const getSaved = (req, res) => {
  res.status(200).json(savedServices);
};

const getHired = (req, res) => {
  res.status(200).json(hiredServices);
};

module.exports = {
  getAllServices,
  getServiceById,
  addService,
  saveService,
  hireService,
  getSaved,
  getHired
};
