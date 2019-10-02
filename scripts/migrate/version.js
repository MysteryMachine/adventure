const faunadb = require('faunadb');
const path = require('path');
const fs = require('fs');
const { getMigrationTable } = require('../_util/utils');

const directoryPath = path.resolve('./migrations');

const parentClient = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET });
const q = faunadb.query;
const env = process.env.CI_COMMIT_REF_NAME;

const myDB = `${env || process.env.FAUNA_DB_NAME}`;

if (!myDB) {
  console.log('No DB name set for dev environment, please set a FAUNA_DB_NAME');
  process.exit(2);
}

(async () => {
  const secret =
    process.env.FAUNA_DB_SUB_SECRET ||
    (await parentClient.query(q.Get(q.Match(q.Index('_keys_by_name'), myDB)))).data.secret;

  const client = new faunadb.Client({ secret });

  const migrationEntry = await client.query(q.Get(q.Match(q.Index('_migrations_by_name'), 'main')));
  const lastMigrationId = migrationEntry.data.id;

  fs.readdir(directoryPath, async (err, files) => {
    if (err) {
      return console.log('Unable to scan directory', err);
    }

    const migrationTable = getMigrationTable(files);
    let currentMigration = migrationTable[lastMigrationId];
    console.log(`${currentMigration.name}`);
  });
})().catch(e => {
  console.log('Error running migrations', e);
});
