import WineTypesRoutes from '@domainsPath/wineTypes/routes/wineTypes.routes';
import UsersRoutes from '@srcPath/domains/users/routes/users.routes';
import { Application } from 'express';

const routes = (app: Application) => [
  new WineTypesRoutes(app),
  new UsersRoutes(app),
];

export default routes;
