import { NextFunction, Request, Response } from 'express';
import { Logger } from '../logger';

export class EchoController {
  private storage: any;

  public async record(req: Request, res: Response, next: NextFunction) {
    try {
      Logger.debug('Method:  ' + req.method);
      Logger.debug('Path:    ' + req.path);
      Logger.debug('Headers: ' + JSON.stringify(req.headers));
      Logger.debug('Body   : ' + JSON.stringify(req.body));
      this.storage = req.body;
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  public async play(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).render(__dirname + '/replay.html', {
        application_title: 'Echo Server',
        body: this.storage ? JSON.stringify(this.storage) : 'None',
      });
    } catch (error) {
      next(error);
    }
  }
}
