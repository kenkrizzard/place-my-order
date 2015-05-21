import can from 'can';
import superMap from 'can-connect/super-map';

/**
 * @parent models
 * @module pmo/models/restaurant Restaurant
 *
 * Model to retrieve retrieve restaurant.
 */
let Restaurant = can.Map.extend({});
Restaurant.List = can.List.extend({Map: Restaurant},{});

superMap({
	resource: "/api/restaurants",
	idProp: '_id',
	Map: Restaurant,
	List: Restaurant.List,
	name: "restaurant"
});

export default Restaurant;
