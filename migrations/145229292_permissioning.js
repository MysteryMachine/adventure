const faunadb = require('faunadb');

const name = '145229292_permissioning';
const id = '145229292';
const prev = '217638241';
const next = '255883297';
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
  client.query(
    q.Update(q.Collection('users'), {
      permissions: {
        create: 'public',
        write: undefined,
        read: 'public',
      },
    }),
  );
};

const down = async () => {
  const client = await getClient();
  client.query(
    q.Update(q.Collection('users'), {
      permissions: {
        create: 'public',
        write: 'public',
        read: 'public',
      },
    }),
  );
};

module.exports = {
  name,
  id,
  prev,
  next,
  up,
  down,
};
