const RouterInstance = require('restify-router').Router;
const router = new RouterInstance();

/**
 * Register restaurant routes
 */
router.add("/restaurant", require("./restaurant"));

module.exports = router;