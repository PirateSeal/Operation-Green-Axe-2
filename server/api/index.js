const express = require('express');

const router = express.Router();

const roles = require('./roles');
const teams = require('./teams');
const squads = require('./squads');
const reponses = require('./reponses');
const questions = require('./questions');
const questionnaires = require('./questionnaires');

router.use('/roles', roles);
router.use('/teams', teams);
router.use('/squads', squads);
router.use('/reponses', reponses);
router.use('/questions', questions);
router.use('/questionnaires', questionnaires);

module.exports = router;
