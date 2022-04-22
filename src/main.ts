import { Application } from './application';
import { echoRouter } from './echo/echo.router';

const app = new Application([echoRouter]);
app.listen();
