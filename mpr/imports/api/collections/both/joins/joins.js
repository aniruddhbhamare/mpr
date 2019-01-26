import {Invoices} from "/imports/api/collections/both/invoices.js";
import {Customers} from "/imports/api/collections/both/customers.js";

// Invoices
Invoices.join(Customers, "customerId", "customer", ["name"]);

