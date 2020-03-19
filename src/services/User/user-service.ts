import { models } from '../../db';
import { CreateUser, User } from '../../types';

export function createUser(user: CreateUser): User {
  const newUser = models.User.create(user);
  return newUser;
}

export function findUserByEmail(email: String): User| null {
  const user = models.User.findOne({ email, });
  return user;
}

export function findUserById(id: string): User | null{
  const user = models.User.findOne({ id });
  return user;
}