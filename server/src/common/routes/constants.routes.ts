import config from '@srcPath/common/config';

const apiUrlPrefix = `${config.api.prefix}`;

export const productRoutes = {
  getAll: `${apiUrlPrefix}/products`,
  getById: `${apiUrlPrefix}/product/:productId`,
};

// Wine types
export const WINE_TYPES_ROUTE = `${apiUrlPrefix}/wine-types`;
export const WINE_TYPE_ROUTE = WINE_TYPES_ROUTE + '/:wineTypeId';

// Users
export const USERS_ROUTE = `${apiUrlPrefix}/users`;
export const USER_ROUTE = USERS_ROUTE + '/:userId';
export const USERS_REGISTER_ROUTE = USERS_ROUTE + '/register';

export const LOGIN_ROUTE = `${apiUrlPrefix}/login`;
export const LOGOUT_ROUTE = `${apiUrlPrefix}/logout`;
export const ACTIVATION_ROUTE = `${apiUrlPrefix}/activate/:activationLink`;
export const REFRESH_ROUTE = `${apiUrlPrefix}` + '/refresh';

// Roles
export const ROLES_ROUTE = `${apiUrlPrefix}/roles`;
