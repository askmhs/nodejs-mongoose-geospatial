import RestaurantEntity from "./../Models/Restaurant";

export class RestaurantController {
	
	/**
	 * Get restaurant data
	 * 
	 * @param {*} coordinat 
	 * @param {*} radius 
	 */
	async all(coordinat = [], radius = 3) {
		return RestaurantEntity.find({
			location: {
                $near: coordinat,
                $maxDistance: radius
            }
		}).then(restaurants => {
			return restaurants;
		}).catch(error => {
			throw error;
		});
	}

	/**
	 * Store data
	 * 
	 * @param {*} data 
	 */
	async store(data) {
		return RestaurantEntity.create(data).then(created => {
			return created;
		}).catch(error => {
			throw error;
		});
	}
}