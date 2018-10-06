import restify from 'restify';
import mongoose from 'mongoose';

/**
 * Create server
 * @type {*|Server}
 */
const server = restify.createServer({
    name: 'nodejs-mongoose-geospatial',
    ignoreTrailingSlash: true
});

/**
 * Configure restify plugin
 */
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.acceptParser(server.acceptable));

require('dotenv').config({
    path: './.env'
});

/**
 * Attempt to onnect to DB
 * @type {MongooseThenable}
 */
mongoose.connect(process.env.DB_HOST).then(() => {
    console.log("Database connection established successfully!");
}, (err) => {
    throw err;
});

/**
 * Register routers
 */
const router = require("./app/Http/Routes/index");
router.applyRoutes(server);

/**
 * Starting server
 */
server.listen(3000, () => {
    console.log('%s listening at %s', server.name, server.url);
});