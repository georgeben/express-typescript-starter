import CrudController from '../crud-controller';
import { Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById, updateUser } from '../../../services/User/user-service';
import { signJwt, hashPassword, comparePassword } from '../../../helpers/auth-helper';

export default class UserController extends CrudController{
  public create(req: Request, res: Response): Response {
    const { name, email, password } = req.body;
    const existingUser = findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: 'User is already registered',
      })
    }
    const hash = hashPassword(password);
    const newUser = createUser({ name, email, password: hash });
    const token = signJwt({ id: newUser.id, email });
    return res.status(201).json({
      message: 'Successfully created user',
      data: {
        user: newUser,
        token
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

  public update(req: Request, res: Response): Response {
    if (!req.user) {
      return res.status(401).json({
        error: 'You can\'t perform this action'
      })
    }
    const updatedData = req.body;
    const updatedUser = updateUser(req.user.id, updatedData);
    const token = signJwt({ id: updatedData.id, email: updatedData.email });
    return res.json({
      message: 'Successfully updated user',
      data: {
        user: updatedUser,
        token
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

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        error: 'Invalid username or password'
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({
        error: 'Invalid username or password'
      });
    }
    const token = signJwt({ id: user.id, email: user.email });
    return res.status(200).json({
      message: 'Signed in successfully',
      data: {
        user,
        token
      }
    })
  }

  
}