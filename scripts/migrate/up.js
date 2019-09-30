const faunadb = require('faunadb');
const path = require('path');
const fs = require('fs');
const { getMigrationTable, orderedMigrations } = require('../_util/utils');

const directoryPath = path.resolve('./migrations');

const parentClient = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET });
const q = faunadb.query;
const env = process.env.CI_COMMIT_REF_NAME;

const myDB = `${env || process.env.FAUNA_DB_NAME}_db`;

if (!myDB) {
  console.log('No DB name set for dev environment, please set a FAUNA_DB_NAME');
  process.exit(2);
}

(async () => {
  try {
    await parentClient.query(q.Get(q.Collection('_keys')));
  } catch (e) {
    console.log('Initializing db for development');
    await parentClient.query(q.CreateCollection({ name: '_keys', permissions: {} }));
    await parentClient.query(
      q.CreateIndex({
        name: '_keys_by_name',
        source: q.Collection('_keys'),
        values: [{ field: ['data', 'name'] }],
        terms: [{ field: ['data', 'name'] }],
        unique: true,
      }),
    );
  }

  try {
    await parentClient.query(q.Get(q.Database(myDB)));
  } catch (e) {
    console.log(`${myDB} does not exist, creating`);
    await parentClient.query(q.CreateDatabase({ name: myDB }));
    if (env === 'master') {
      console.log(
        'Will not create and store keys for production environment, create key manually and set it as FAUNA_DB_SUB_SECRET and rerun',
      );
      process.exit();
    }

    console.log(
      'Generating key. If this is a production environment, please store key outside of db and delete it',
    );
    const secret = (await parentClient.query(
      q.CreateKey({ role: 'admin', database: q.Database(myDB) }),
    )).secret;

    await parentClient.query(q.Create(q.Collection('_keys'), { data: { name: myDB, secret } }));
    console.log(`Database ${myDB} created`);

    console.log('Building the migrations table');
    const client = new faunadb.Client({ secret });
    await client.query(q.CreateCollection({ name: '_migrations' }));
    await client.query(
      q.CreateIndex({
        name: '_migrations_by_name',
        source: q.Collection('_migrations'),
        values: [{ field: ['data', 'name'] }],
        terms: [{ field: ['data', 'name'] }],
        unique: true,
      }),
    );
    await client.query(q.Create(q.Collection('_migrations'), { data: { id: '', name: 'main' } }));
  }

  const secret =
    process.env.FAUNA_DB_SUB_SECRET ||
    (await parentClient.query(q.Get(q.Match(q.Index('_keys_by_name'), myDB)))).data.secret;

  const client = new faunadb.Client({ secret });

  const migrationEntry = await client.query(q.Get(q.Match(q.Index('_migrations_by_name'), 'main')));
  const lastMigrationId = migrationEntry.data.id;

  fs.readdir(directoryPath, async (err, files) => {
    try {
      if (err) {
        return console.log('Unable to scan directory', err);
      }

      const migrationTable = getMigrationTable(files);
      const lastMigration = migrationTable[lastMigrationId];
      let currentMigration = lastMigration
        ? migrationTable[lastMigration.next]
        : orderedMigrations(migrationTable)[0];
      console.log('Migrating...');
      while (currentMigration) {
        console.log(currentMigration.name);
        await currentMigration.up();
        await client.query(
          q.Update(migrationEntry.ref, { data: { name: 'main', id: currentMigration.id } }),
        );
        currentMigration = migrationTable[currentMigration.next];
      }
    } catch (e) {
      console.log('Error running migrations', e);
    }
  });
})().catch(e => {
  console.log('Error running migrations', e);
});
