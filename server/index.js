const grpc = require('grpc');
global.Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/grpc');

const proto = grpc.load('proto/employees.proto');
const server = new grpc.Server();
const employeeServices = require('../db/employees')

//define the callable methods that correspond to the methods defined in the protofile
server.addService(proto.employees.EmployeesService.service, {

	List(call, callback){
		employeeServices.list(callback);
	},

	get(call, callback){
		let payload = {
			criteria: {
				employee_id: call.request.employee_id
			},
			projections: {
				name: 1, id: 1, email: 1, _id: 1
			},
			options: {
				lean: true
			}
		};
		let emp = new employeeServices(payload);
		emp.fetch(callback);
	},

	Insert(call, callback){
		let emp = new employeeServices({
			employee_id: call.request.employee_id,
			name: call.request.name,
			email: call.request.email,
		});
		emp.add(callback);
	},

	remove(callback){
		const criteria = {
			employee_id: call.request.employee_id,
		};
		let emp = new employeeServices(criteria);
		emp.remove(criteria, callback);
	},
});

//Specify the IP and and port to start the grpc Server, no SSL in test environment
server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

//Start the server
server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');