import {CreateNewRestaurantCommand} from "../../Domain/Module/Restaurant/Command/CreateNewRestaurantCommand";
import {CreateNewRestaurantCommandHandler} from "../../Domain/Module/Restaurant/Handler/CreateNewRestaurantCommandHandler";
import {Decorator} from "../../Domain/Module/Decorator";
import SuccessResponse from "../Response/SuccessResponse";
import {InvalidException} from "../../Domain/Exception/InvalidException";
import BadRequestResponse from "../Response/BadRequestResponse";
import InternalServerErrorResponse from "../Response/InternalServerErrorResponse";
import RestaurantDB from "../../Domain/Module/Restaurant/Projection/RestaurantDB";
import NotFoundResponse from "../Response/NotFoundResponse";
import {Restaurant} from "../../Domain/Module/Restaurant/Model/Restaurant";

module.exports = (server) => {
    const director = require('director.js');
    const promiseBus = director();

    server.post('/restaurant/create', (req, res) => {
        CreateNewRestaurantCommand.prototype.ID = 'createNewRestaurantCommand';

        /** @namespace promiseBus.registry */
        promiseBus.registry.register(CreateNewRestaurantCommand.prototype.ID, new CreateNewRestaurantCommandHandler());
        const bus = new Decorator(promiseBus);

        /**
         * Restaurant data
         * @type {Restaurant}
         */
        const data = new Restaurant(req.body.name, req.body.address, req.body.location);

        /**
         * Handle the action
         */
        bus.handle(new CreateNewRestaurantCommand(data)).then((result) => {
            SuccessResponse(res, 'Successfully create new restaurant!', result);
        }).catch((errResult) => {
            if (errResult instanceof InvalidException) {
                BadRequestResponse(res, errResult.message);
            } else {
                InternalServerErrorResponse(res, errResult.message);
            }
        });
    });

    server.get('/restaurant/list', (req, res) => {
        let coords = [];
        coords[0] = req.query.longitude || 0;
        coords[1] = req.query.latitude || 0;

        /** @namespace req.query.distance */
        const maxDistance = req.query.radius || 3;

        /**
         * Finding nearest restaurant
         */
        RestaurantDB.find({
            location: {
                $near: coords,
                $maxDistance: maxDistance
            }
        }).then((result) => {
            if (result.length >= 1) {
                SuccessResponse(res, 'Places near you', result);
            } else {
                NotFoundResponse(res, 'Couldn\'t find any places near your location!');
            }
        }).catch((errResult) => {
            InternalServerErrorResponse(res, errResult.message);
        });
    });
};