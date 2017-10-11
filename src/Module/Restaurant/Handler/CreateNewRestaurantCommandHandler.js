import RestaurantDB from "../Projection/RestaurantDB";
import {InvalidException} from "../../../Exception/InvalidException";
import {CreateNewRestaurantCommand} from "../Command/CreateNewRestaurantCommand";
import {InternalServerErrorException} from "../../../Exception/InternalServerErrorException";

export class CreateNewRestaurantCommandHandler {
    execute(command) {
        return new Promise((resolve, reject) => {
            if (command instanceof CreateNewRestaurantCommand) {
                this.command = command;

                this.createNewRestaurant().then((created) => {
                    resolve(created);
                }).catch((errCreated) => {
                    console.log(errCreated);
                    reject(new InternalServerErrorException('An error occurred!'));
                });
            } else {
                reject(new InvalidException('command must be instanceof CreateNewRestaurantCommand!'));
            }
        });
    }

    createNewRestaurant() {
        return RestaurantDB.create(this.command.restaurant);
    }
}