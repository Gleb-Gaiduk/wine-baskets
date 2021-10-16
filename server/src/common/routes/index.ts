import AuthRoutes from '@srcPath/domains/auth/routes/auth.routes';
import RolesRoutes from '@srcPath/domains/roles/routes/roles.routes';
import UsersRoutes from '@srcPath/domains/users/routes/users.routes';
import WineTypesRoutes from '@srcPath/domains/wine/wineTypes/routes/wineTypes.routes';
import { Application } from 'express';

const routes = (app: Application) => [
  new WineTypesRoutes(app),
  new UsersRoutes(app),
  new RolesRoutes(app),
  new AuthRoutes(app),
];

export default routes;
