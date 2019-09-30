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

const client = new faunadb.Client({ secret: process.env.FAUNA_DB_SECRET });
const q = faunadb.query;

const up = () => {

};
  
const down = () => {

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
