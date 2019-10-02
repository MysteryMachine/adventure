const faunadb = require('faunadb');

const name = '255883297_create_game';
const id = '255883297';
const prev = '217638241';
const next = '619789283';
const env = process.env.CI_COMMIT_REF_NAME;
const db = `${env || process.env.FAUNA_DB_NAME}`;

const q = faunadb.query;
const getClient = async () => {
  const parentClient = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET });
  return new faunadb.Client({
    secret:
      process.env.FAUNA_DB_SUB_SECRET ||
      (await parentClient.query(q.Get(q.Match(q.Index('_keys_by_name'), db)))).data.secret,
  });
};

const up = async () => {
  const client = await getClient();
  await client.query(q.CreateCollection({ name: 'games' }));
};

const down = async () => {
  const client = await getClient();
  await client.query(q.Delete(q.Collection('games')));
};

module.exports = {
  name,
  id,
  prev,
  next,
  up,
  down,
};
