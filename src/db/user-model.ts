import nanoid from 'nanoid';
import { LowdbSync } from 'lowdb';
import { CreateUser, User } from '../types';

const createUserModel = (db: LowdbSync<any>) => {
  return {
    findOne(filter: { [key: string]: any }) {
      return db
        .get('users')
        .find(filter)
        .value();
    },

    create(user: CreateUser): User {
      const newUser = { id: nanoid(), createdAt: Date.now(), ...user };
      db.get('users')
        .push(newUser)
        .write();
      return newUser;
    },
  };
};

export default createUserModel;
