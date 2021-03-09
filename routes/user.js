const router = require('express').Router();
const controller = require('../controllers/user');
// const validator = require('../validators/auth');

router.get('/', /*validator.login,*/ controller.readAll);
router.get('/:id', /*validator.login,*/ controller.readOne);
router.post('/', /*validator.login,*/ controller.create);
router.put('/:id', /*validator.login,*/ controller.update);
router.delete('/:id', /*validator.login,*/ controller.delete);

module.exports = router;