const Joi = require('joi');
const db = require('../../database');

const { insertIntoTableAndValidate } = require('../index');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  short: Joi.string().min(3).max(3).required(),
});

module.exports = {
  findAll() {
    return db('roles').select();
  },
  findByName(name) {
    return db('roles').where('name', name).first();
  },
  findById(id) {
    return db('roles').where('id', id).first();
  },
  async update(id, role) {
    const rows = await db('roles').where('id', id).update(role, '*');
    return rows[0];
  },
  async delete(id) {
    return db('roles').where('id', id).del();
  },
  insert(role) {
    return insertIntoTableAndValidate('roles', role, schema);
  },
};
