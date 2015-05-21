import 'can/map/define/define';
import can from 'can';
import superMap from 'can-connect/super-map';
import tag from 'can-connect/tag';
import set from 'can-set';
import socket from './socket';

/**
 * @parent models
 * @module pmo/models/order Order
 *
 * Model to retrieve and create orders for a restaurant.
 */
var Order = can.Map.extend({
  /** @prototype */
  define: {
    /**
     * @property {String} status
     *
     * The status of the order. Usually one of `new`, `preparing`, `delivering` or `delivered`
     */
    status: {
      value: 'new'
    },
    /**
     * @property {can.List} items
     *
     * The list of order items
     */
    items: {
      Value: can.List
    },
    /**
     * @property total
     *
     * The total of the order. Will be calculated dynamically.
     */
    total: {
      get() {
        let total = 0.0;
        this.attr('items').forEach(item => total += parseFloat(item.attr('price')));
        return total.toFixed(2);
      }
    }
  },

  /**
   * @function markAs
   *
   * Update the order status and save it to the server.
   *
   * @param {String} status The new status to set
   */
  markAs(status) {
    this.attr('status', status);
    this.save();
  }
});

Order.List = can.List.extend({
	Map: Order
}, {
	totals(){
		return this.map(function(order){
			return order.attr("total");
		});
	}
});

let orderConnection = superMap({
	resource: "/api/orders",
	idProp: '_id',
	Map: Order,
	List: Order.List,
	name: "orders"
	, compare: set.comparators.enum("status", ["new","preparing","delivery","delivered"])
});

if(socket) {
  socket.on('orders created', order => orderConnection.createInstance(order));
  socket.on('orders updated', order => orderConnection.updateInstance(order));
  socket.on('orders removed', order => orderConnection.destroyInstance(order));
}

tag('order-model', orderConnection);

export default Order;
