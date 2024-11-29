// Auth
import registrationRoutes from './routes/auth/registration-routes.mjs';
import logoutRoutes from './routes/auth/login-routes.mjs';
import loginRoutes from './routes/auth/login-routes.mjs';
// Supabase
import verifyTokenRoutes from './routes/supabase/verify-token-route.mjs';
import retrieveDataRoute from './routes/supabase/retrieve-data-route.mjs';
// Reddit
import redditRedirectRoute from './routes/reddit/reddit-redirect-route.mjs';
import redditCallbackRoute from './routes/reddit/reddit-callback-route.mjs';

export const applyRoutes = (app) => {
    // Auth
    app.use('/', registrationRoutes);
    app.use('/', logoutRoutes);
    app.use('/', loginRoutes);
    // Supabase
    app.use('/', verifyTokenRoutes);
    app.use('/', retrieveDataRoute);
    // Reddit 
    app.use('/api', redditRedirectRoute);
    app.use('/api/', redditCallbackRoute);
}