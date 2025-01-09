// Auth
import registrationRoutes from './routes/auth/registration-routes.mjs';
import logoutRoutes from './routes/auth/login-routes.mjs';
import loginRoutes from './routes/auth/login-routes.mjs';
// Supabase
import verifyTokenRoutes from './routes/supabase/verify-token-route.mjs';
import retrieveDataRoute from './routes/supabase/retrieve-data-route.mjs';
import verifiyRedditRoute from './routes/supabase/verify-reddit-route.mjs';
import createPostRoute from './routes/supabase/create-post-route.mjs';
import retrievePostsRoute from './routes/supabase/retrieve-posts-route.mjs';
import deletePostRoute from './routes/supabase/delete-post-route.mjs';
// Reddit
import redditRedirectRoute from './routes/reddit/reddit-redirect-route.mjs';
import redditCallbackRoute from './routes/reddit/reddit-callback-route.mjs';
import redditSubredditRoute from './routes/reddit/reddit-subreddit-route.mjs';
import redditFlairRoute from './routes/reddit/reddit-flair-route.mjs';
import redditStats from './routes/reddit/reddit-stats-route.mjs';

export const applyRoutes = (app) => {
    // Auth
    app.use('/', registrationRoutes);
    app.use('/auth', logoutRoutes);
    app.use('/', loginRoutes);
    // Supabase
    app.use('/', verifyTokenRoutes);
    app.use('/', retrieveDataRoute);
    app.use('/', verifiyRedditRoute);
    app.use('/', createPostRoute);
    app.use('/', retrievePostsRoute);
    app.use('/', deletePostRoute);
    // Reddit 
    app.use('/api', redditRedirectRoute);
    app.use('/api', redditCallbackRoute);
    app.use('/api', redditSubredditRoute);
    app.use('/api', redditFlairRoute);
    app.use('/api/', redditStats);
}