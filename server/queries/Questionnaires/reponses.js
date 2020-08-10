const Joi = require('joi');
const db = require('../../database');

const { insertIntoTableAndValidate } = require('../index');

const schema = Joi.object().keys({
  reponse: Joi.string().required(),
  question_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

module.exports = {
  findByUserId(id) {
    return db('reponses').where('user_id', id);
  },
  findByQuestionId(id) {
    return db('reponses').where('question_id', id);
  },
  findById(id) {
    return db('reponses').where('id', id).first();
  },
  async update(id, reponse) {
    const rows = await db('reponses').where('id', id).update(reponse, '*');
    return rows[0];
  },
  async delete(id) {
    return db('reponses').where('id', id).del();
  },
  insert(reponse) {
    return insertIntoTableAndValidate('reponses', reponse, schema);
  },
};
