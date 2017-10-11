import restify from 'restify';
import promise from 'bluebird';
import mongoose from 'mongoose';

/**
 * Set mongoose promise
 */
mongoose.Promise = promise;
mongoose.Promise = global.Promise;

/**
 * Create server
 * @type {*|Server}
 */
const server = restify.createServer({
    name: 'nodejs-mongoose-geonear'
});

/**
 * Configure restify plugin
 */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

require('dotenv').config({
    path: './config/.env'
});

/** @namespace process.env.DB_HOST */
const MONGO_URI = process.env.DB_HOST;

/**
 * Connect to DB
 * @type {MongooseThenable}
 */
mongoose.connect(MONGO_URI, {
    useMongoClient: true
}).then(() => {
    console.log('Connected to DB');
}, (err) => {
    console.log(err);
    throw new Error('An error occurred while connecting to DB!')
});

/**
 * Registering route
 */
require('./src/Http/Route/Restaurant')(server);

/**
 * Starting server
 */
server.listen(8000, () => {
    console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;