import { Request, Response } from 'express';

export default abstract class CrudController {
  public abstract create(req: Request, res: Response): Response;
  public abstract read(req: Request, res: Response): Response;
  public abstract update(req: Request, res: Response): Response;
  public abstract delete(req: Request, res: Response): Response;
}