const UserArticle = require('../models/user-articles.model');
const {getCache,setCache} = require('../cache/cache');

const getUserArticles = async (userId) => {
    return await UserArticle.find({ userId }).populate('articleId');
}

const addUserArticle = async (userId, articleId,read = false, favorite = false ) => {
    return await UserArticle.findOneAndUpdate(
        { userId, articleId },
        { userId, articleId, read, favorite },
        { upsert: true, new: true }
    );
}

const getUserReadArticles = async (userId) => {
    const cacheKey = `getUserReadArticles:${userId}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const userArticles = await UserArticle.find({ userId, read: true }).populate('articleId');
    await setCache(cacheKey, userArticles, 3600);
    return userArticles;
}

const getUserFavoriteArticles = async (userId) => {
    const cacheKey = `getUserFavoriteArticles:${userId}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    const userArticle =  await UserArticle.find({ userId, favorite: true }).populate('articleId');
    await setCache(cacheKey, userArticle, 3600);
    return userArticle;
}

module.exports = {
    getUserArticles,
    addUserArticle,
    getUserReadArticles,
    getUserFavoriteArticles,
};