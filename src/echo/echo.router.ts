import { Router } from 'express';
import { EchoController } from './echo.controller';

const echoRoute = '/echo';
const replayRoute = '/replay';
const echoController = new EchoController();

export const echoRouter = Router();
echoRouter.get(echoRoute, (req, res, next) => echoController.record(req, res, next));
echoRouter.post(echoRoute, (req, res, next) => echoController.record(req, res, next));
echoRouter.put(echoRoute, (req, res, next) => echoController.record(req, res, next));
echoRouter.delete(echoRoute, (req, res, next) => echoController.record(req, res, next));
echoRouter.get(replayRoute, (req, res, next) => echoController.play(req, res, next));
