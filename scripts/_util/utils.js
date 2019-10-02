module.exports = {
  getMigrationTable: files => {
    let migrationTable = {};
    files.forEach(fileName => {
      const file = require(`../../migrations/${fileName}`);
      migrationTable[file.id] = file;
    });
    return migrationTable;
  },
  orderedMigrations: migrationTable => {
    const ids = Object.keys(migrationTable);
    let nextItem = migrationTable[ids.find(id => migrationTable[id].prev === '')];
    let orderedTable = [];
    while (nextItem) {
      orderedTable.push(nextItem);
      console.log(ids.find(id => id === nextItem.next));
      nextItem = migrationTable[ids.find(id => id === nextItem.next)];
    }
    return orderedTable;
  },
  newId: migrationTable => {
    let id;
    while (!id && !migrationTable[id]) {
      id = `${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 9 + 1)}${Math.floor(
        Math.random() * 9 + 1,
      )}${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 9 + 1)}${Math.floor(
        Math.random() * 9 + 1,
      )}${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 9 + 1)}${Math.floor(
        Math.random() * 9 + 1,
      )}`;
    }
    return id;
  },
};
