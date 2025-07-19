const express = require('express');
const { validateCreateUser, validateLoginUser, validateUpdatePreferences } = require('../utils/validators/user.validator');
const { createUserController, loginUserController, getPreferencesController, updatePreferencesController } = require('../controllers/user.controller');

const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', validateCreateUser, createUserController);

router.post('/login', validateLoginUser, loginUserController);

router.get('/preferences', authMiddleware, getPreferencesController);

router.put('/preferences', authMiddleware, validateUpdatePreferences, updatePreferencesController);


module.exports = router;