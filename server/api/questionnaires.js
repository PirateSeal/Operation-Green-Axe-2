const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const questionnaires = require('../queries/Questionnaires/questionnaires');

router.get('/', async (req, res, next) => {
  try {
    const all = await questionnaires.findAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
  try {
    const questionnaire = await questionnaires.insert(req.body);
    res.json(questionnaire);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
