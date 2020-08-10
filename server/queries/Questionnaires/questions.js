const Joi = require('joi');
const db = require('../../database');

const { insertIntoTableAndValidate } = require('../index');

const schema = Joi.object().keys({
  name: Joi.string().required(),
  questionnaire_id: Joi.number().required(),
});

module.exports = {
  findByQuestionnaireId(id) {
    return db('questions').where('questionnaire_id', id);
  },
  findById(id) {
    return db('questions').where('id', id).first();
  },
  async update(id, question) {
    const rows = await db('questions').where('id', id).update(question, '*');
    return rows[0];
  },
  async delete(id) {
    return db('questions').where('id', id).del();
  },
  insert(question) {
    return insertIntoTableAndValidate('questions', question, schema);
  },
};
