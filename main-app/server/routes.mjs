import registrationRoutes from './routes/registration-routes.mjs';
import logoutRoutes from './routes/logout-routes.mjs';
import loginRoutes from './routes/login-routes.mjs';
import verifyTokenRoutes from './routes/verify-token-route.mjs';

export const applyRoutes = (app) => {
    app.use('/', registrationRoutes);
    app.use('/', logoutRoutes);
    app.use('/', loginRoutes);
    app.use('/', verifyTokenRoutes);
}