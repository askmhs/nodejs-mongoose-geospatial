import { ResponseBuilder } from "./../ResponseBuilder";
import { RestaurantController } from "./../../Controllers/RestaurantController";

const RouterInstance = require('restify-router').Router;
const router = new RouterInstance();

/**
 * Get nearby or all restaurant data
 */
router.get("/", async(req, res) => {
    try {
        const coords = [];
        coords[0] = req.query.longitude || 0;
        coords[1] = req.query.latitude || 0;
        
        const result = new RestaurantController().all(coords, req.query.radius);
        return new ResponseBuilder().success(res, "List nearby restaurant", result);
    } catch (exception) {
        return new ResponseBuilder().internalServerError([exception.message]);
    }
});

/**
 * Create restaurant data
 */
router.post("/", async(req, res) => {
    try {
        const result = new RestaurantController().store(req.body);
        return new ResponseBuilder().success(res, "Successfully create new restaurant data!", result);
    } catch (exception) {
        return new ResponseBuilder().internalServerError([exception.message]);
    }
});

module.exports = router;