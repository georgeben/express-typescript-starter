import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import createUserModel from './user-model';
import { Schema } from '../types';
import config from '../config';
const { dbUrl } = config();

const adapter = new FileSync<Schema>(dbUrl);
const db = low(adapter);

db.defaults({ users: [] }).write()

const models = {
  User: createUserModel(db),
}

export {
  db,
  models,
};
