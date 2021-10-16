import config from '@srcPath/common/config';
import errorMiddleware from '@srcPath/common/middlewares/error.middleware';
import loadAppRoutes from '@srcPath/common/routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import sessions from 'express-session';
import { oneDayMilliSec } from '../utils/constants';

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

  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));

  // Session middleware
  app.use(
    sessions({
      secret: config.session.secretKey,
      saveUninitialized: true,
      cookie: { maxAge: config.session.expirationDays * oneDayMilliSec },
      resave: false,
    })
  );

  // Load API routes
  loadAppRoutes(app);

  app.use(errorMiddleware);
};
