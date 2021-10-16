import config from '@srcPath/common/config';

// Wine types
export const WINE_TYPES_ROUTE = `${config.api.prefix}/wine-types`;
export const WINE_TYPE_ROUTE = WINE_TYPES_ROUTE + '/:wineTypeId';

// Users
export const USERS_ROUTE = `${config.api.prefix}/users`;
export const USER_ROUTE = USERS_ROUTE + '/:userId';
export const USERS_REGISTER_ROUTE = USERS_ROUTE + '/register';

export const LOGIN_ROUTE = `${config.api.prefix}/login`;
export const LOGOUT_ROUTE = `${config.api.prefix}/logout`;
export const ACTIVATION_ROUTE = `${config.api.prefix}/activate/:activationLink`;
export const REFRESH_ROUTE = `${config.api.prefix}` + '/refresh';

// Roles
export const ROLES_ROUTE = `${config.api.prefix}/roles`;
