const express = require('express');

const router = express.Router();

const { checkAuthHeaderSetUserUnAuthorized } = require('../middlewares');

const squads = require('../queries/Teams/squads');

router.post('/', checkAuthHeaderSetUserUnAuthorized, async (req, res) => {
  try {
    const resp = await squads.insert(req.body);
    res.status(201).send(resp);
  } catch (error) {
    res.status(409).send(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const resp = await squads.findAll();
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.get('/:id(\\d+)', async (req, res) => {
  const resp = await squads.findById(req.params.id);
  switch (resp) {
    case null:
    case undefined:
      res.status(404).send(`Couldn't find this squad`);
      break;
    default:
      res.json(resp);
      break;
  }
});

router.get('/:name([a-zA-Z])', async (req, res) => {
  const resp = await squads.findByName(req.params.name);
  switch (resp) {
    case null:
    case undefined:
      res.status(404).send(`Couldn't find this squad`);
      break;
    default:
      res.json(resp);
      break;
  }
});

router.patch('/:id(\\d+)', async (req, res) => {
  const resp = await squads.update(req.params.id, req.body);
  switch (resp) {
    case null:
    case undefined:
      res.status(404).send(`Couldn't find this squad`);
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
    const resp = await squads.delete(req.params.id);
    switch (resp) {
      case null:
      case undefined:
        res.status(404).send(`Couldn't find this squad`);
        break;
      default:
        res.json(resp);
        break;
    }
  },
);

module.exports = router;
