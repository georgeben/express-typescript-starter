import CrudController from '../CrudController';
import { Request, Response } from 'express';
import { ApiResponse } from '../../../types';

export default class UserController extends CrudController{
  public create(req: Request, res: Response): Response {
    const { name, email, password } = req.body;
    return res.status(201).json({
      message: 'Successfully created user',
      data: {
        user: {
          name,
          email,
        }
      }
    })
  }
  public read(req: Request, res: Response): Response {
    const { id } = req.params;
    return res.status(200).json({
      message: 'Successfully fetched user',
      data: {
        user: {
          id,
          name: "George",
          email: "george@gmail.com"
        }
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