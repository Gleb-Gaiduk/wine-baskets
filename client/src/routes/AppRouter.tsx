import { Redirect, Route, Switch } from 'react-router-dom';
import { publicRoutes } from './routesConfig';
import { HOME_ROUTE } from './routesConstants';

const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route exact key={path} path={path} component={Component} />
      ))}
      <Redirect to={HOME_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
