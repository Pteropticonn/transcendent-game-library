// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
	user: {
	 type: mongoose.Schema.Types.ObjectId,
	 ref: 'User',
	 required: true
 },
	gameTitle: {
		type: String,
		required: true
	},
	playtime: {
		type: Number,
		required: false
	},
	installationStatus: {
		type: String,
		enum: ['NOT INSTALLED', 'INSTALLED'],
		default: 'INSTALLED'
	}
}, {
  timestamps: true
});


module.exports = mongoose.model('Resource', resourceSchema);
