const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const teams = require('../queries/Teams/teams');

router.get('/', async (req, res, next) => {
  try {
    const all = await teams.findAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
  try {
    const team = await teams.insert(req.body);
    res.json(team);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
