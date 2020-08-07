const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const reponses = require('../queries/Questionnaires/reponses');

router.get('/', async (req, res, next) => {
  try {
    const all = await reponses.findAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
  try {
    const reponse = await reponses.insert(req.body);
    res.json(reponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
