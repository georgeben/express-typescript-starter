import CrudController from '../crud-controller';
import { Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById } from '../../../services/User/user-service';

export default class UserController extends CrudController{
  public create(req: Request, res: Response): Response {
    const { name, email, password } = req.body;
    const existingUser = findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: 'User is already registered',
      })
    }

    const newUser = createUser({ name, email, password });
    return res.status(201).json({
      message: 'Successfully created user',
      data: {
        user: newUser,
      }
    })
  }

  public read(req: Request, res: Response): Response {
    const { id } = req.params;
    const user = findUserById(id);
    if (!user) {
      return res.status(404).json({
        error: 'The user does not exist'
      })
    }
    return res.status(200).json({
      message: 'Successfully fetched user',
      data: {
        user,
      }
    })
  }

  public update(req: Request, res: Response):Response {
    return res.status(200).json({
      message: 'Successfully updated user',
      data: {
        user: {
          name: "George",
          email: "george@gmail.com"
        }
      }
    })
  }
  public delete(req: Request, res: Response):Response {
    return res.status(200).json({
      message: 'Successfully deleted user',
      data: {
        user: {
          name: "George",
          email: "george@gmail.com"
        }
      }
    })
  }
  
}