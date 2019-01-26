import {Meteor} from "meteor/meteor";
import {Customers} from "/imports/api/collections/both/customers.js";
import * as databaseUtils from "/imports/modules/both/database_utils.js";
import * as objectUtils from "/imports/modules/both/object_utils.js";

Meteor.publish("customer_list", function() {
	return Customers.find({ownerId:this.userId}, {sort:{name:1}});
});

Meteor.publish("customers_empty", function() {
	return Customers.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("customer_details", function(customerId) {
	return Customers.find({_id:customerId,ownerId:this.userId}, {});
});

Meteor.publish("customer_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Customers.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions));
});

Meteor.publish("customer_list_paged_count", function(extraOptions) {
	Counts.publish(this, "customer_list_paged_count", Customers.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"customerListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Customers.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{name:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

