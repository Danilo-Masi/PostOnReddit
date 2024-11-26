import registrationRoutes from './routes/registration-routes.mjs';

export const applyRoutes = (app) => {
    app.use('/', registrationRoutes);
}