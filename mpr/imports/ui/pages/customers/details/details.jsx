import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker, createContainer } from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/imports/modules/client/router_utils";
import {Loading} from "/imports/ui/pages/loading/loading.jsx";
import {mergeObjects} from "/imports/modules/both/object_utils";
import {Customers} from "/imports/api/collections/both/customers.js";
import * as formUtils from "/imports/modules/client/form_utils";
import * as objectUtils from "/imports/modules/both/object_utils";
import * as dateUtils from "/imports/modules/both/date_utils";
import * as stringUtils from "/imports/modules/both/string_utils";


export class CustomersDetailsPage extends Component {
	constructor () {
		super();
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	

	

	render() {
		if(this.props.data.dataLoading) {
			return (
				<Loading />
			);
		} else {
			return (
				<div>
					<div className="page-container container" id="content">
						<div className="row" id="title_row">
							<div className="col-md-12">
							</div>
						</div>
						<CustomersDetailsPageDetailsForm data={this.props.data} routeParams={this.props.routeParams} />
					</div>
				</div>
			);
		}
	}
}

export const CustomersDetailsPageContainer = withTracker(function(props) {



	let isReady = function() {
		

		let subs = [
			Meteor.subscribe("customer_details", props.routeParams.customerId)
		];
		let ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	let data = { dataLoading: true };

	if(isReady()) {
		

		data = {

				customer_details: Customers.findOne({_id:props.routeParams.customerId}, {})
			};
		

		
	}
	return { data: data };

})(CustomersDetailsPage);

export class CustomersDetailsPageDetailsForm extends Component {
	constructor () {
		super();

		this.state = {
			customersDetailsPageDetailsFormErrorMessage: "",
			customersDetailsPageDetailsFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
		
	}

	componentWillMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidMount() {
		

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
		$("input[type='file']").fileinput();
	}

	renderErrorMessage() {
		return(
			<div className="alert alert-warning">
				{this.state.customersDetailsPageDetailsFormErrorMessage}
			</div>
		);
	}

	renderInfoMessage() {
		return(
			<div className="alert alert-success">
				{this.state.customersDetailsPageDetailsFormInfoMessage}
			</div>
		);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ customersDetailsPageDetailsFormInfoMessage: "" });
		this.setState({ customersDetailsPageDetailsFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var customersDetailsPageDetailsFormMode = "read_only";
			if(!$("#customers-details-page-details-form").find("#form-cancel-button").length) {
				switch(customersDetailsPageDetailsFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ customersDetailsPageDetailsFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ customersDetailsPageDetailsFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("customers", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("customers", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	

	

	render() {
		let self = this;
		return (
			<div id="customers-details-page-details-form" className="">
				<h2 id="component-title">
					<span id="form-back-button">
						<a href="#" className="btn btn-default" title="back" onClick={this.onBack}>
							<span className="fa fa-chevron-left">
							</span>
						</a>
						&nbsp;
					</span>
					<span id="component-title-icon" className="">
					</span>
					Details
				</h2>
				<form role="form" onSubmit={this.onSubmit}>
					{this.state.customersDetailsPageDetailsFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.customersDetailsPageDetailsFormInfoMessage ? this.renderInfoMessage() : null}
								<div className="form-group  field-name">
									<label htmlFor="name">
										Name
									</label>
									<div className="input-div">
										<p className="form-control-static  control-field-name">
											{this.props.data.customer_details.name}
										</p>
									</div>
								</div>
										<div className="form-group  field-phone">
						<label htmlFor="phone">
							Phone
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-phone">
								{this.props.data.customer_details.phone}
							</p>
						</div>
					</div>
					<div className="form-group  field-email">
						<label htmlFor="email">
							E-mail
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-email">
								{this.props.data.customer_details.email}
							</p>
						</div>
					</div>
					<div className="form-group  field-note">
						<label htmlFor="note">
							Note
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-note">
								{this.props.data.customer_details.note}
							</p>
						</div>
					</div>
					<div className="form-group  field-invoiced">
						<label htmlFor="invoiced">
							Invoiced
						</label>
						<div className="input-div">
							<p className="form-control-static  control-field-invoiced">
								{this.props.data.customer_details.invoiced}
							</p>
						</div>
					</div>
					<div className="form-group">
						<div className="submit-div btn-toolbar">
							<a href="#" id="form-close-button" className="btn btn-primary" onClick={this.onClose}>
								OK
							</a>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

