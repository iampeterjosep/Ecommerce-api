const router =  require('express').Router();
const authController = require('../controllers/auth');

router.route('/signUp')
    .post(authController.signUp);

router.route('/signIn')
    .post(authController.signIn);


module.exports = router;