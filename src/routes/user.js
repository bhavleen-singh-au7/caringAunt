const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const control = require('../controllers/user');
const { getUserById, isSignedIn, isAuthenticated } = require('../middlewares/userAuth');
// const upload = require('../utils/multerConfig');

router.post('/user/signup',
  [
    check('username', 'Type key as username').exists(),
    check('username', 'You must provide a username').not().isEmpty(),
    check('username', 'Username should be atleast 4 char').isLength({ min: 4 }),
    check('email', 'Type key as email').exists(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Provide Email in proper format').isEmail(),
    check('phoneNumber', 'Type key as phoneNumber').exists(),
    check('phoneNumber', 'Phone Number is required').not().isEmpty(),
    check('phoneNumber', 'Phone Number should contain 10 digits').isLength({ min: 10, max: 10 }),
    check('password', 'Type key as password').exists(),
    check('password', 'Password should be atleast 8 char').isLength({ min: 8 }),
    check('pastPeriodDate', 'Type key as pastPeriodDate').exists(),
    check('pastPeriodDate', 'Past Period Date should be in YYYY-MM-DD').not().isEmpty(),
    check('pastPeriodDate', 'Please provide \'YYYY-MM-DD\' format for date').matches(/^(20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/, "i"),
    check('menstrualCycleLength', 'Type Key as menstrualCycleLength').exists(),
    check('menstrualCycleLength', 'Menstrual Cycle Length is required').not().isEmpty(),
    check('menstrualCycleLength', 'Menstrual Cycle Length should be integer').isNumeric(),
    check('menstrualCycleLength', 'Menstrual Cycle Length should be between 26-31').matches(/[2][6-9]|[3][0-1]/, "i"),
    check('periodLength', 'Type key as periodLength ').exists(),
    check('periodLength', 'Period Length is required ').not().isEmpty(),
    check('periodLength', 'Period Length should be Integer ').isNumeric(),
    check('periodLength', 'Period Length should be between 4-8').matches(/^[4-8]/, "i"),
  ], control.signup
);

router.get('/login', control.login);

router.post('/user/signin',
  [
    check('username', 'Type key as username').exists(),
    check('username', 'You must provide a username').not().isEmpty(),
    check('username', 'Username should be atleast 4 char').isLength({ min: 4 }),
    check('password', 'Type key as password').exists(),
    check('password', 'Password should be atleast 8 char').isLength({ min: 8 })
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