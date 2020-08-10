const Joi = require('joi');
const db = require('../../database');

const { insertIntoTableAndValidate } = require('../index');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
});

module.exports = {
  findAll() {
    return db('questionnaires').select();
  },
  findByName(name) {
    return db('questionnaires').where('name', name).first();
  },
  findById(id) {
    return db('questionnaires').where('id', id).first();
  },
  async update(id, questionnaire) {
    const rows = await db('questionnaires')
      .where('id', id)
      .update(questionnaire, '*');
    return rows[0];
  },
  async delete(id) {
    return db('questionnaires').where('id', id).del();
  },
  insert(questionnaire) {
    return insertIntoTableAndValidate('questionnaires', questionnaire, schema);
  },
};
