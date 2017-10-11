import {Restaurant} from "../Model/Restaurant";
import {InvalidException} from "../../../Exception/InvalidException";

export class CreateNewRestaurantCommand {
    constructor(restaurant) {
        /**
         * Validate data
         */
        if (restaurant instanceof Restaurant) {

            /**
             * Set the restaurant value
             * @type {Restaurant}
             */
            this.restaurant = restaurant;
        } else {

            /**
             * Throwing error if data is not a valid document
             */
            throw new InvalidException('restaurant must be instanceof Restaurant class!');
        }
    }
}