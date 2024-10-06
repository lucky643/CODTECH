const express = require('express');
const router = express.Router();
const {landingPageController, registerPageController, registerController, loginController, logoutController, profilePageController, newHisaabController, hisaabCreatedController} = require('../controllers/index-controller')
const { isLoggedIn } = require("../middlewares/auth-middlewares")

router.get('/', landingPageController);
router.get('/register', registerPageController);
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', logoutController);
router.get('/profile', isLoggedIn, profilePageController);
router.get('/create', newHisaabController);
router.post('/hisaabCreated', hisaabCreatedController);

module.exports = router;
