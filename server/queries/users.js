const Joi = require('joi');
const db = require('../database');

const { insertIntoTableAndValidate } = require('./index');

const schema = Joi.object().keys({
  display_name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  google_id: Joi.string().required(),
  image_url: Joi.string().uri({
    scheme: [/https/],
  }),
});

module.exports = {
  findAll() {
    return db('users').select();
  },
  findAdmins() {
    return db('users').where('role_id', 3);
  },
  findByEmail(email) {
    return db('users').where('email', email).first();
  },
  async update(id, user) {
    const rows = await db('users').where('id', id).update(user, '*');
    return rows[0];
  },
  insert(user) {
    return insertIntoTableAndValidate('users', user, schema);
  },
};
