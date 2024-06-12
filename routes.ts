

export const publicRoutes = [
    "/"
];


/**
 * An array of routes that require authentication
 * These routes will redirect to the /settings page if the user is not authenticated
 * @type {string[]}
 */
export const privateRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"

];
/**
 * The prefix for all API routes
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default route to redirect to after a successful login
 */
export const DEFAULT_LOGIN_REDIRECT = "/properties"