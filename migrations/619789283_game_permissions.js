const faunadb = require('faunadb');

const name = '619789283_game_permissions';
const id = '619789283';
const prev = '217638241';
const next = '394855579';
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
  await client.query(
    q.Do(
      q.CreateIndex({
        name: 'all_games',
        source: q.Collection('games'),
      }),
      q.CreateIndex({
        name: 'games_by_user',
        source: q.Collection('games'),
        terms: [{ field: ['data', 'user'] }],
        unique: true,
      }),
      q.Update(q.Role('normal_user'), {
        membership: {
          class: q.Collection('users'),
        },
        privileges: [
          { resource: q.Collection('users'), actions: { read: true } },
          {
            resource: q.Collection('games'),
            actions: {
              read: true,
              create: q.Query(
                q.Lambda(newVal => q.Equals(q.Identity(), q.Select(['data', 'user'], newVal))),
              ),

              write: q.Query(
                q.Lambda((newVal, oldVal) =>
                  q.And(
                    q.Equals(q.Identity(), q.Select(['data', 'user'], oldVal)),
                    q.Equals(
                      q.Select(['data', 'user'], oldVal),
                      q.Select(['data', 'user'], newVal),
                    ),
                  ),
                ),
              ),
            },
          },
        ],
      }),
    ),
  );
};

const down = async () => {
  const client = await getClient();
  await client.query(
    q.Do(
      q.Delete(q.Index('all_games')),
      q.Delete(q.Index('games_by_user')),
      q.Update(q.Role('normal_user'), {
        membership: {
          resource: q.Collection('users'),
        },
        privileges: [{ resource: q.Collection('users'), actions: { read: true } }],
      }),
    ),
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
