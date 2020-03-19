import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import createUserModel from './user-model';

const adapter = new FileSync('./src/db/db.json');
const db = low(adapter);

db.defaults({ users: [] }).write()

const models = {
  User: createUserModel(db),
}

export {
  db,
  models,
};
