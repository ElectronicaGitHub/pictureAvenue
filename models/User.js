var mongoose = require('../configs/mongoose.js');
var findOrCreate = require('mongoose-findorcreate');

Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var User = new Schema({
	nickname : {
		type : String, 
		unique : true,
		required : true
	},
	vkontakteId : {
		type : String,
		unique : true,
		required : true
	},
	name: String,
	surname :  String,
	gender : String,
	age : String,
	avatar : String,
	reg_date: {
		type: Date,
		default: Date.now
	},
	works : {
		type : [ObjectId],
		ref : 'Work'
	}
});

User.plugin(findOrCreate);

module.exports = mongoose.model('User', User);