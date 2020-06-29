const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const control = require('../controllers/user');
const { getUserById, isSignedIn, isAuthenticated } = require('../middlewares/userAuth');
// const upload = require('../utils/multerConfig');

router.post('/user/signup',
  [
    check('username', 'Username should be atleast 4 char').isLength({ min: 4 }),
    check('email', 'Email is required').isEmail(),
    check('phoneNumber', 'Phone Number must be 10 and in correct format digits').isMobilePhone(),
    check('password', 'Password should be atleast 8 char').isLength({ min: 8 }),
    check('pastPeriodDate', 'Past Period Date should be in YYYY-MM-DD').isLength({ min: 10 }),
    check('menstrualCycleLength', 'Cycle Length should be integer').isInt(),
    check('periodLength', 'Period Length should be Integer ').isInt()
  ], control.signup
);

router.get('/login', control.login);

router.post('/user/signin',
  [
    check('username', 'username is required'),
    check('password', 'password field is required')
  ], control.signin
);

router.get('/about', control.about);

router.param('userId', getUserById);

router.get('/user/signout', control.signout);

router.get('/user/me/:userId', isSignedIn, isAuthenticated, control.userProfile);

router.patch('/user/me/:userId', isSignedIn, isAuthenticated, control.updateUserProfile);

router.delete('/user/deleteUser/:userId', isSignedIn, isAuthenticated, control.deleteUser);

// router.post('/user/me/avatar', isSignedIn, isAuthenticated, upload('avatar'), uploadAvatar, multerErrHandler);

// router.get('/user/me/avatar', isSignedIn, isAuthenticated, getAvatar);

// router.delete('/user/me/avatar', isSignedIn, isAuthenticated, deleteAvatar);

module.exports = router;