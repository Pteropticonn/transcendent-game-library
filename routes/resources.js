const {new: _new, index, show, create, edit, update, delete: _delete} = require('../controllers/ResourcesController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({message: "You must authenticate before using this API call"});
  }
  next();
}

module.exports = router => {
  router.post('/resources',  index);
  router.get('/resources/new', _new);
  router.post('/resources', create);
  router.post('/resources/update', update);
  router.post('/resources/delete', _delete);
  router.get('/resources/:id/edit', edit);
  router.get('/resources/:id', show);
};
