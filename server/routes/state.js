const { Router } = require('express');
const router = Router();
const State = require('../model/state');

router.get('/', async (req, res) => {
  const states = await State.find();
  const obj = {};
  for (let state of states) {
    obj[state.name] = state.cities;
  }
  res.send(obj);
});

module.exports = router;
