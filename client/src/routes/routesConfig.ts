import BasketContentPage from '../pages/BasketContentPage/BasketContentPage';
import BasketTypePage from '../pages/BasketTypePage/BasketTypePage';
import HomePage from '../pages/HomePage/HomePage';
import {
  BASKET_CONTENT_ROUTE,
  BASKET_TYPE_ROUTE,
  HOME_ROUTE,
} from './routesConstants';

interface IRouteItem {
  path: string;
  Component: React.FC;
}
type TRoute = Array<IRouteItem>;

export const publicRoutes: TRoute = [
  {
    path: HOME_ROUTE,
    Component: HomePage,
  },

  {
    path: BASKET_TYPE_ROUTE,
    Component: BasketTypePage,
  },

  {
    path: BASKET_CONTENT_ROUTE,
    Component: BasketContentPage,
  },
];
