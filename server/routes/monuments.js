const { Router } = require('express');
const router = Router();
const Monument = require('../model/monument');
const { storage } = require('../cloudinary/cloudinary');
const multer = require('multer');
const uploads = multer({ storage });

const { adminAuthMiddleware } = require('../middleware.utils');

router.get('/', async (req, res) => {
  const resp = await Monument.find();
  res.status(200).send(resp);
});

router.get('/:name', adminAuthMiddleware, async (req, res) => {
  const { name } = req.params;
  const resp = await Monument.findOne({ name });
  res.status(200).send(resp);
});

router.post(
  '/upload',
  adminAuthMiddleware,
  uploads.array('image'),
  async (req, res) => {
    try {
      const {
        name,
        tags,
        foreign_tourist_pricing,
        indian_tourinst_pricing,
        children_below_15_years_pricing
      } = req.body;
      const images = req.files.map(file => file.filename);
      const newMonument = new Monument({
        ...req.body,
        name: name,
        images,
        tags: tags.split(','),
        ticket_pricing: {
          foreign_tourist: `Rs. ${foreign_tourist_pricing}`,
          indian_tourist: `Rs. ${indian_tourinst_pricing}`,
          children_below_15_years: `Rs. ${children_below_15_years_pricing}`
        }
      });

      await newMonument.save();
      res.status(200).send(`${name} has been added to the monuments db`);
    } catch (err) {
      console.log(err.message);
      res.status(300).send(err.message);
    }
  }
);

module.exports = router;
