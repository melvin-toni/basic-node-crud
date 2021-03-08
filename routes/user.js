const router = require('express').Router();
const controller = require('../controllers/user');
// const validator = require('../validators/auth');

// router.get('/', validator.login, controller.user);
router.post('/', /*validator.login,*/ controller.create);
// router.put('/', validator.login, controller.user);
// router.post('/', validator.login, controller.user);

module.exports = router;