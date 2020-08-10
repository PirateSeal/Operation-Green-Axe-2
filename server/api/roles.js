const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const roles = require('../queries/Teams/roles');

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
  try {
    const resp = await roles.insert(req.body);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const resp = await roles.findAll();
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.get('/:name', async (req, res, next) => {
  try {
    const resp = await roles.findByName(req.params.name);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.patch('/:name', async (req, res, next) => {
  try {
    const resp = await roles.update(req.params.name, req.body);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});



router.delete(
  '/:name',
  checkAuthHeaderSetUserUnAuthorized,
  async (req, res, next) => {
    try {
      const resp = await roles.delete(req.params.name);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
