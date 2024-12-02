// Auth
import registrationRoutes from './routes/auth/registration-routes.mjs';
import logoutRoutes from './routes/auth/login-routes.mjs';
import loginRoutes from './routes/auth/login-routes.mjs';
// Supabase
import verifyTokenRoutes from './routes/supabase/verify-token-route.mjs';
import retrieveDataRoute from './routes/supabase/retrieve-data-route.mjs';
import verifiyRedditRoute from './routes/supabase/verify-reddit-route.mjs';
// Reddit
import redditRedirectRoute from './routes/reddit/reddit-redirect-route.mjs';
import redditCallbackRoute from './routes/reddit/reddit-callback-route.mjs';
import redditSubredditRoute from './routes/reddit/reddit-subreddit-route.mjs';
import redditFlairRoute from './routes/reddit/reddit-flair-route.mjs';

export const applyRoutes = (app) => {
    // Auth
    app.use('/', registrationRoutes);
    app.use('/', logoutRoutes);
    app.use('/', loginRoutes);
    // Supabase
    app.use('/', verifyTokenRoutes);
    app.use('/', retrieveDataRoute);
    app.use('/', verifiyRedditRoute);
    // Reddit 
    app.use('/api', redditRedirectRoute);
    app.use('/api', redditCallbackRoute);
    app.use('/api', redditSubredditRoute);
    app.use('/api', redditFlairRoute);
}