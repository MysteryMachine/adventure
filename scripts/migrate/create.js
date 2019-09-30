const path = require('path');
const fs = require('fs');
const { getMigrationTable, orderedMigrations, newId } = require('../_util/utils');

const directoryPath = path.resolve('./migrations');
const name = process.argv[process.argv.length - 1];

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory', err);
  }

  const migrationTable = getMigrationTable(files);
  const ordered = orderedMigrations(migrationTable);
  const lastMigration = ordered[ordered.length - 1];

  const prev = lastMigration ? lastMigration.id : '',
    next = newId(migrationTable),
    id = lastMigration ? lastMigration.next : newId(migrationTable);

  const fileContents = `const faunadb = require('faunadb');

const name = '${id}_${name}';
const id = '${id}';
const prev = '${prev || ''}';
const next = '${next}';
const client =
  process.env.FAUNA_DB_SUB_SECRET ||
  (await new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET }).query(
    q.Get(q.Match(q.Index('_keys_by_name'), db)),
  )).data.secret;
  
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
};
  
const down = async () => {
  const client = await getClient();
};

module.exports = {
  name,
  id,
  prev,
  next,
  up,
  down,
};`;
  const fileName = `./migrations/${id}_${name}.js`;
  fs.writeFile(fileName, fileContents, err => {
    if (err) {
      console.log('Error creating file', err);
    }

    console.log(`Created migration ${fileName}`);
  });
});
