const { validationResult } = require('express-validator');
const { createUser, findUserByEmail, getPreferences, updatePreferences } = require('../services/user.service');
const { generateToken } = require('../services/jwt.service');
const { comparePassword } = require('../utils/password');


const createUserController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const userData = req.body;
        const existingUser = await findUserByEmail(userData.email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        await createUser(userData);
        res.status(200).json({ message: 'User signed up successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const loginUserController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = await generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}


const getPreferencesController = async (req, res) => {
    try {
        const email = req.user.email;
        const preferences = await getPreferences(email);
        res.status(200).json({ preferences });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const updatePreferencesController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array().map(err => ({
                    field: err.param,
                    message: err.msg
                }))
            });
        }
        const email = req.user.email;
        const { preferences } = req.body;
        const updatedUser = await updatePreferences(email, preferences);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'Preferences updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createUserController,
    loginUserController,
    getPreferencesController,
    updatePreferencesController
};