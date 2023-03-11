const router = require('express').Router()
const userController = require('../controllers/user');
const {
    verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} =  require('../controllers/verify');

//update user
router.route('/:id')
    .put( verifyTokenAndAuthorization,  userController.updateUser);

router.route('/:id')
    .delete(verifyTokenAndAuthorization, userController.deleteUser);

router.route('/:id')
    .get(verifyTokenAndAdmin,  userController.getUser);

router.route('/')
    .get(verifyTokenAndAdmin,  userController.getAllUsers);


module.exports = router