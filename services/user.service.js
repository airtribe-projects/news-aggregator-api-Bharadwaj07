const User = require('../models/user.model');
const { hashPassword } = require('../utils/password');


const createUser = async (userData) =>{
    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;
    userData.preferences = userData.preferences || [];
    const user = new User(userData);
    return await user.save();
}


const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const getPreferences = async (email) => {   
    const userPreferences =  await  User.findOne({ email }, 'preferences');
    return userPreferences?.preferences || [];
}

const updatePreferences = async (email, preferences) => {
    return await User.findOneAndUpdate(
        { email },
        { preferences },
        { new: true },
    );
}

module.exports = {
    createUser,
    findUserByEmail,
    getPreferences,
    updatePreferences
};