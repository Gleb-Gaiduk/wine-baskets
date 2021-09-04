import config from '@srcPath/common/config';

// Wine types
export const WINE_TYPES_ROUTE = `${config.api.prefix}/wine-types`;
export const WINE_TYPE_ROUTE = WINE_TYPES_ROUTE + '/:wineTypeId';

// Users
export const USERS_ROUTE = `${config.api.prefix}/users`;
export const USER_ROUTE = USERS_ROUTE + '/:userId';
