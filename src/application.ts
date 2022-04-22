import express from 'express';
import { Router } from 'express';
import { config } from './config';
import morgan, { StreamOptions } from 'morgan';
import { Logger } from './logger';
import mustacheExpress from 'mustache-express';

export class Application {
  public app: express.Application;

  constructor(routes: Router[]) {
    this.app = express();

    this.initializeLogger();
    this.initializeAuthentication();
    this.initializeBodyParse();
    this.initializeEngine();
    this.initializeErrorHandling();
    this.initializeStaticFiles();
    this.initializeRoutes(routes);
  }

  private initializeLogger() {
    const stream: StreamOptions = {
      write: message => Logger.http(message),
    };
    this.app.use(morgan(config.morgan.format, { stream }));
  }

  private initializeAuthentication() {
    // No authentication needed
  }

  private initializeBodyParse() {
    //No body parser so far...
  }

  private initializeEngine() {
    this.app.engine('html', mustacheExpress());
    this.app.set('view engine', 'html');
    this.app.set('views', __dirname + '/partialViews');
  }

  private initializeErrorHandling() {
    // Default error handling is fine
  }

  private initializeStaticFiles() {
    this.app.use('/static/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist'));
    this.app.use('/static', express.static(__dirname + '/static'));
  }

  private initializeRoutes(routes: Router[]) {
    routes.forEach(route => {
      this.app.use('/', route);
    });
  }

  public listen() {
    this.app.listen(config.port, () => {
      Logger.info(`=================================`);
      Logger.info(`======= ENV: ${config.env} =======`);
      Logger.info(`🚀 App listening on the port ${config.port}`);
      Logger.info(`=================================`);
    });
  }
}
