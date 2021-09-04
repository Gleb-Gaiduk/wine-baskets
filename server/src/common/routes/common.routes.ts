import { Application } from 'express';

abstract class CommonRoutesConfig {
  app: Application;
  routeName: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.routeName = name;
    this.configureRoutes();
  }

  public get RouteName(): string {
    return this.routeName;
  }

  abstract configureRoutes(): Application;
}

export default CommonRoutesConfig;
