const Joi = require('joi');
const db = require('../database');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
  short: Joi.string().min(3).max(3).required(),
});

module.exports = {
  findById(id) {
    return db('roles').where('id', id).first();
  },
  findName(name) {
    return db('roles').where('name', name).first();
  },
  findAll() {
    return db('roles');
  },
  async update(id, role) {
    const rows = await db('roles').where('id', id).update(role, '*');
    return rows[0];
  },
  insert(role) {
    const result = schema.validate(role);
    if (result.error === null || result.error === undefined) {
      return db('roles').insert(role);
    }
    return Promise.reject(result.error);
  },
};
