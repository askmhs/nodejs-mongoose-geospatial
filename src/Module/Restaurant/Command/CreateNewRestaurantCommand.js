import {Restaurant} from "../Model/Restaurant";
import {InvalidException} from "../../../Exception/InvalidException";

export class CreateNewRestaurantCommand {
    constructor(restaurant) {
        if (restaurant instanceof Restaurant) {
            this.restaurant = restaurant;
        } else {
            throw new InvalidException('restaurant must be instanceof Restaurant class!');
        }
    }
}