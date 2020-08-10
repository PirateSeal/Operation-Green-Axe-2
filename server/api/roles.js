const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const roles = require('../queries/Teams/roles');

router.get('/', async (req, res, next) => {
  try {
    const all = await roles.findAll();
    res.json(all);
  } catch (error) {
    next(error);
  }
});

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res, next) => {
  try {
    const resp = await roles.insert(req.body);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.delete(
  '/:id',
  checkAuthHeaderSetUserUnAuthorized,
  async (req, res, next) => {
    try {
      const resp = await roles.delete(req.params.id);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
