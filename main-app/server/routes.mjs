// Auth
import registrationRoutes from './routes/auth/registration-routes.mjs';
import logoutRoutes from './routes/auth/logout-routes.mjs';
import loginRoutes from './routes/auth/login-routes.mjs';
// Supabase
import verifyTokenRoutes from './routes/supabase/verify-token-route.mjs';
import retrieveDataRoute from './routes/supabase/retrieve-data-route.mjs';
import verifiyRedditRoute from './routes/supabase/verify-reddit-route.mjs';
import createPostRoute from './routes/supabase/create-post-route.mjs';
import retrievePostsRoute from './routes/supabase/retrieve-posts-route.mjs';
import deletePostRoute from './routes/supabase/delete-post-route.mjs';
import deletePermissionsRoute from './routes/supabase/delete-permissions-route.mjs';
// Reddit
import redditRedirectRoute from './routes/reddit/reddit-redirect-route.mjs';
import redditCallbackRoute from './routes/reddit/reddit-callback-route.mjs';
import redditSubredditRoute from './routes/reddit/reddit-subreddit-route.mjs';
import redditFlairRoute from './routes/reddit/reddit-flair-route.mjs';
import redditStats from './routes/reddit/reddit-stats-route.mjs';

export const applyRoutes = (app) => {
    // Auth
    app.use('/auth', registrationRoutes);
    app.use('/auth', logoutRoutes);
    app.use('/auth', loginRoutes);
    // Supabase
    app.use('/supabase', verifyTokenRoutes);
    app.use('/supabase', retrieveDataRoute);
    app.use('/supabase', verifiyRedditRoute);
    app.use('/supabase', createPostRoute);
    app.use('/supabase', retrievePostsRoute);
    app.use('/supabase', deletePostRoute);
    app.use('/supabase', deletePermissionsRoute);
    // Reddit 
    app.use('/api', redditRedirectRoute);
    app.use('/api', redditCallbackRoute);
    app.use('/api', redditSubredditRoute);
    app.use('/api', redditFlairRoute);
    app.use('/api', redditStats);
}