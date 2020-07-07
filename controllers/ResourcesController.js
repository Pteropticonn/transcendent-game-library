// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation
*/

const viewPath = 'resources';
const Resource = require('../models/resource');
const User = require('../models/user');


/*
  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

//no idea why this won't render the page
exports.play = (req, res) => {
  res.render(`${viewPath}/play`, {
    pageTitle: 'Give it a shot'
  });
};


exports.index = async (req, res) => {
	try {
		const resources = await Resource
		.find()
		.populate('user');

		res.render(`${viewPath}/index`, {
			pageTitle: 'Games',
			resources: resources
		});
	} catch (e) {
		req.flash('danger', `Woops! Something went wrong displaying your games ${e}`);
		res.render(`${viewPath}/`);
	}
};

exports.show = async (req, res) => {
	try {
		const resource = await Resouce.findById(req.params.id)
		.populate('user');
		console.log(resource);
		res.render(`${viewPath}/show`, {
			pageTitle: resource.title,
			resource: resource
		});
	} catch (e) {
		req.flash('danger', `There was an error displaying this game: ${e}`);
	}
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Game'
  });
};


exports.create = async (req, res) => {
	try {
		const {user: email } = req.session.passport;
		const user = await User.findOne({email: email});
		const resource = await Resource.create({user: user._id, ...req.body});

		req.flash('success', 'Game added to library!');
		res.redirect(`${viewPath}/`);
	} catch (e) {
		req.flash('danger', `${e}...game unable to be added to library`);
		res.redirect(`${viewPath}/`);
	}
};

exports.edit = async (req, res) => {
	try {
		const resource = await Resource.findById(req.params.id);
		res.render(`${viewPath}/edit`, {
			pageTitle: resource.title,
			formData: resource
		});
	} catch (e) {
		req.flash('danger', `There was an error processing the edit request: ${e}`);
		res.redirect('/');
	}
};

exports.update = async (req, res) => {
	try {
		const {user: email } = req.session.passport;
		const user = await User.findOne({email: email});

		let resource = await Resource.findById(req.body.id);
		if(!resource) throw new Error('Resource could not be found');

		const attributes = {user: user._id, ...req.body};
		await Resource.validate(attributes);
		await Resource.findByIdAndUpdate(attributes.id, attributes);

		req.flash('success', 'The game was successfully updated');
		res.redirect(`/resources/${req.body.id}`);

	} catch (e) {
		req.flash('danger', `Error updating this game: ${e}`);
		res.redirect(`/resources/${req.body.id}/edit`);
	}
};

exports.delete = async (req, res) => {
	try {
		await Resource.deleteOne({_id: req.body.id});
		req.flash('success', 'The game was successfuly removed from your library');
		res.redirect(`/resources`);
	} catch (e) {
		req.flash('danger', `There was an error removing this game from your library: ${e}`);
		res.redirect('/resources')
	}
};
