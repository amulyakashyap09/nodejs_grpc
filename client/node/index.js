const grpc = require('grpc');

const protoPath = require('path').join(__dirname, '../..', 'proto');
//console.log("proto path : ", protoPath)
const proto = grpc.load({root: protoPath, file: 'employees.proto'});

//Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.employees.EmployeesService('localhost:50050', grpc.credentials.createInsecure());

client.List({}, (error, response) => {
	if (!error) {
		console.log("Response : ", response)
	}
	else {
		console.log("Error:", error.message);
	}
});

client.get({
	employee_id: 1
}, (error, response) => {
	if (
		!error
	) {
		console.log("Response : ", response)
	}
	else {
		console.log("Error:", error.message);
	}
});

client.remove({
	employee_id: 1
}, (error, response) => {
	if (
		!error
	) {
		console.log("Response : ", response)
	}
	else {
		console.log("Error:", error.message);
	}
});

client.Insert({
	employee_id: parseInt(Math.random() * 1000000),
	name: "Amulya Kashyap",
	email: "amulyakashyap09@gmail.com"
}, (error, response) => {
	if (
		!error
	) {
		console.log("Response : ", response)
	}
	else {
		console.log("Error:", error.message);
	}
});
