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
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.status(200).json(resources);
  } catch (error) {
    res.status(400).json({message: 'There was an error fetching the Game Library', error});
  }
};

exports.show = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('user');

    res.status(200).json(resource);
  } catch (error) {
    res.status(400).json({message: "There was an error fetching the Game"});
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Game'
  });
};

exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    const resource = await Resource.create({user: user._id, ...req.body});

    res.status(200).json(resource);
  } catch (error) {
    res.status(400).json({message: "There was an error adding the game to the library", error});
  }
};

exports.edit = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: resource.title,
      formData: resource
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this game: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let resource = await Resource.findById(req.body.id);
    if (!resource) throw new Error('Game could not be found');

    const attributes = {user: user._id, ...req.body};
    await Resource.validate(attributes);
    await Resource.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The Game details were updated successfully');
    res.redirect(`/resources/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this Game: ${error}`);
    res.redirect(`/resources/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Resource.deleteOne({_id: req.body.id});
    res.status(200).json({message: "The game was successfuly removed from your library."});
  } catch (error) {
    res.status(400).jason({message: "There was an error deleting the resource"});
  }
};
