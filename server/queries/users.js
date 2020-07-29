const Joi = require('joi');
const db = require('../database');

const schema = Joi.object().keys({
  display_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  google_id: Joi.string().required(),
  image_url: Joi.string().uri({
    scheme: [/https/],
  }),
  role_id: Joi.number().integer(),
  team_id: Joi.number().integer(),
});

module.exports = {
  findByEmail(email) {
    return db('users').where('email', email).first();
  },
  async update(id, user) {
    const rows = await db('users').where('id', id).update(user, '*');
    return rows[0];
  },
  insert(user) {
    const result = schema.validate(user);
    if (result.error === null || result.error === undefined) {
      return db('users').insert(user);
    }
    return Promise.reject(result.error);
  },
};
