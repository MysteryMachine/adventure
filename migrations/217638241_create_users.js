const faunadb = require('faunadb');

const name = '217638241_create_users';
const id = '217638241';
const prev = '';
const next = '145229292';
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
  await client.query(q.CreateCollection({ name: 'users' }));
  await client.query(
    q.Do(
      q.CreateIndex({
        name: 'all_users',
        source: q.Collection('users'),
      }),
      q.CreateIndex({
        name: 'users_by_email',
        source: q.Collection('users'),
        terms: [{ field: ['data', 'email'] }],
        unique: true,
      }),
      q.CreateRole({
        name: 'normal_user',
        membership: {
          resource: q.Collection('users'),
        },
        privileges: [{ resource: q.Collection('users'), actions: { read: true } }],
      }),
    ),
  );
};

const down = async () => {
  const client = await getClient();
  await client.query(q.Do(q.Delete(q.Collection('users')), q.Delete(q.Role('normal_user'))));
};

module.exports = {
  name,
  id,
  prev,
  next,
  up,
  down,
};
