import nanoid from 'nanoid';
import { LowdbSync } from 'lowdb';
import { CreateUser, User, UpdateUser } from '../types';

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

    updateOne(id: string, updatedUserData: UpdateUser): User {
      const updatedUser = db.get('users')
        .find({ id, })
        .assign(updatedUserData)
        .write();
      return updatedUser;
    },
  };
};

export default createUserModel;
