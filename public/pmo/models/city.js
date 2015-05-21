import Map from 'can/map/';
import List from 'can/list/';
import superMap from 'can-connect/super-map';

/**
 * @parent models
 * @module pmo/models/city City
 *
 * A simple model that is used to retrieve a list of cities for
 * a given state.
 */
const City = Map.extend({});

City.List = List.extend({});

superMap({
  resource: '/api/cities',
  idProp: 'name',
  Map: City,
  List: City.List,
  name: 'cities'
});

export default City;
