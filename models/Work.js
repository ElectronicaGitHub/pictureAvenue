var mongoose = require('../configs/mongoose.js');
Schema = mongoose.Schema;
ObjectId = Schema.Types.ObjectId;

var Work = new Schema({
	title : String,
	description : String,
	image : String,
	date : {
		type: Date,
		default : Date.now
	},
	tags : {
		type: [String]
	},
	width: Number,
	height: Number, 
	user : {
		type : ObjectId, 
		ref : 'User'
	},
	views : {
		type: Number, 
		default: 0
	},
	likes : {
		type : Number, 
		default : 0
	}
})

module.exports = mongoose.model('Work', Work);
