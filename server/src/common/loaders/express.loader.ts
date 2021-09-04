import loadAppRoutes from '@srcPath/common/routes';
import cors from 'cors';
import express, { Request, Response } from 'express';

export default app => {
  // Health check: @Todo read more on that, consider taking this logic out
  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Transforms the raw string of req.body into json
  app.use(express.json());

  // Load API routes
  // app.use(config.api.prefix, routes());
  loadAppRoutes(app);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not found');
    err['status'] = 404;
    return next(err);
  });

  // Handle 401 thrown by express-jwt library
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
