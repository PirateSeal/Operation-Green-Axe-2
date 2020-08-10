const Joi = require('joi');
const db = require('../../database');

const { insertIntoTableAndValidate } = require('../index');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  short: Joi.string().min(3).max(3).required(),
});

module.exports = {
  findAll() {
    return db('teams').select();
  },
  findByName(name) {
    return db('teams').where('name', name).first();
  },
  findById(id) {
    return db('teams').where('id', id).first();
  },
  async update(id, team) {
    const rows = await db('teams').where('id', id).update(team, '*');
    return rows[0];
  },
  async delete(id) {
    return db('teams').where('id', id).del();
  },
  insert(team) {
    return insertIntoTableAndValidate('teams', team, schema);
  },
};
