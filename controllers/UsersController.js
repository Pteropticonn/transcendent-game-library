const User = require('../models/user');
const Resource = require('../models/resource');
const viewPath = 'users';

exports.new = async (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New User'
  });
};

exports.create = async (req, res) => {
  try {


    const user = new User(req.body);
    await User.register(user, req.body.password);

    const freeGame = await Resource.create({user: user._id, gameTitle: 'The Epic & Free Number Generating Game', playtime: 0, installationStatus: 'INSTALLED', scores: [0], playable: 'yes'});

    req.flash('success', `Welcome, ${user.fullname}. Thank you for registering.`);
    res.redirect('/');
  } catch (error) {
    console.log(error.message);
    req.flash('danger', error.message);
    req.session.formData = req.body;
    res.redirect(`/register`);
  }
};
