/**
 * Created by soc-mba-32 on 03/03/18.
 */
const Schema = Mongoose.Schema;
let employee = new Schema({
	"employee_id" : {
		type: Number,
		required:true,
		unique:true,
	},
	"email" : {
		type: String,
		required:true
	},
	"name" : {
		type: String,
		required:true
	}
}, {strict: true});

module.exports = Mongoose.model('employees', employee);