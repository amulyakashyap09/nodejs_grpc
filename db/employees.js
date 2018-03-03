let employeeModel = require('../models/employee')
let Employee = class {
	constructor(payload) {
		this.payload = payload;
	}

	static list(cb) {
		const criteria = {};
		const projections = {
			_id: 1,
			employee_id: 1,
			name: 1,
			email: 1,
		};
		const options = {};
		employeeModel.find(criteria, projections, options, cb);
	}

	add(cb) {
		new employeeModel(this.payload).save(cb);
	}

	fetch(cb) {
		const criteria = this.payload.criteria;
		const projections = this.payload.projections;
		const options = this.payload.options;
		employeeModel.find(criteria, projections, options, cb)
	}

	remove(cb) {
		const criteria = this.payload;
		employeeModel.remove(criteria, cb);
	}
};
module.exports = Employee;