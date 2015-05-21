import Map from 'can/map/';
import List from 'can/list/';
import superMap from 'can-connect/super-map';

/**
 * @parent models
 * @module pmo/models/state State
 *
 * A simple model that is used to retrieve a list of US states.
 */
const State = Map.extend({});

State.List = List.extend({});

superMap({
  resource: '/api/states',
  idProp: 'short',
  Map: State,
  List: State.List,
  name: 'states'
});

export default State;
