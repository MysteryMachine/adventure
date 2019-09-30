const faunadb = require('faunadb');

const name = '217638241_create_users';
const id = '217638241';
const prev = '';
const next = '145229292';

const client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET });
const q = faunadb.query;

const up = () => {
  console.log('Going up!');
};

const down = () => {
  console.log('Going down!');
};

module.exports = {
  name,
  id,
  prev,
  next,
  up,
  down,
};
