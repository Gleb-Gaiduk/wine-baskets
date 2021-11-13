import AuthRoutes from '@srcPath/domains/auth/auth.routes';
import ProductsRoutes from '@srcPath/domains/products/products.routes';
import RolesRoutes from '@srcPath/domains/roles/roles.routes';
import UsersRoutes from '@srcPath/domains/users/users.routes';
import { Application } from 'express';

const routes = (app: Application) => [
  new ProductsRoutes(app),
  new UsersRoutes(app),
  new RolesRoutes(app),
  new AuthRoutes(app),
];

export default routes;
