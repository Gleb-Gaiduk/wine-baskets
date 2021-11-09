import config from '@srcPath/common/config';
import { oneDayMilliSec } from '@srcPath/common/utils/constants';
import { Application } from 'express';
import session from 'express-session';

const sessionMiddleware = (app: Application) => {
  const pgSession = require('connect-pg-simple')(session);
  const sessionStore = new pgSession({
    conString: `postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`,
  });

  app.use(
    session({
      secret: config.session.secretKey,
      store: sessionStore,
      resave: false,
      saveUninitialized: true,
      rolling: true,
      cookie: {
        httpOnly: true,
        maxAge: config.session.expirationDays * oneDayMilliSec,
        // secure: true,
        // sameSite: true,
      },
    })
  );
};

export default sessionMiddleware;
