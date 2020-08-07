const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const squads = require('../queries/Teams/squads');

router.get('/', async (req, res, next) => {
  try {
    const all = await squads.findAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
  try {
    const squad = await squads.insert(req.body);
    res.json(squad);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
