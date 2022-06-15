import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import * as models from './models';
import * as services from './services';
import { schema } from './schema/schema';

// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI =
  'mongodb+srv://deanhall:deanhall@cluster0.5boem.mongodb.net/?retryWrites=true&w=majority';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', (error) => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      mongoUrl: MONGO_URI
    })
  })
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(4000, () => {
  console.log('Listening');
});
