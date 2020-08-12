const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const roles = require('../queries/Teams/roles');

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res) => {
  try {
    const resp = await roles.insert(req.body);
    res.status(201).send(resp);
  } catch (error) {
    res.status(409).send(error);
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

router.get('/:id(\\d+)', async (req, res) => {
  const resp = await roles.findById(req.params.id);
  switch (resp) {
    case null:
    case undefined:
      res.status(404).send(`Couldn't find this role`);
      break;
    default:
      res.json(resp);
      break;
  }
});

router.get('/:name', async (req, res) => {
  const resp = await roles.findByName(req.params.name);
  switch (resp) {
    case null:
    case undefined:
      res.status(404).send(`Couldn't find this role`);
      break;
    default:
      res.json(resp);
      break;
  }
});

router.patch('/:id(\\d+)', async (req, res) => {
  const resp = await roles.update(req.params.id, req.body);
  switch (resp) {
    case null:
    case undefined:
      res.status(404).send(`Couldn't find this role`);
      break;
    default:
      res.json(resp);
      break;
  }
});

router.delete(
  '/:id(\\d+)',
  checkAuthHeaderSetUserUnAuthorized,
  async (req, res) => {
    const resp = await roles.delete(req.params.id);
    switch (resp) {
      case null:
      case undefined:
        res.status(404).send(`Couldn't find this role`);
        break;
      default:
        res.json(resp);
        break;
    }
  },
);

module.exports = router;
