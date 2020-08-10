const Joi = require('joi');
const db = require('../../database');

const { insertIntoTableAndValidate } = require('../index');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
});

module.exports = {
  findAll() {
    return db('squads').select();
  },
  findByName(name) {
    return db('squads').where('name', name).first();
  },
  findById(id) {
    return db('squads').where('id', id).first();
  },
  async update(id, squad) {
    const rows = await db('squads').where('id', id).update(squad, '*');
    return rows[0];
  },
  async delete(id) {
    return db('squads').where('id', id).del();
  },
  insert(squad) {
    return insertIntoTableAndValidate('squads', squad, schema);
  },
};
