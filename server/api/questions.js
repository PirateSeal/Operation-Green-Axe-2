const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const questions = require('../queries/Questionnaires/questions');

router.get('/', async (req, res, next) => {
  try {
    const all = await questions.findAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
  try {
    const question = await questions.insert(req.body);
    res.json(question);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
