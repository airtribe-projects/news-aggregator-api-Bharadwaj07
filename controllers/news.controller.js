const {getNewsArticles, getTopHeadlines} = require('../services/news.service');
const {getPreferences} = require('../services/user.service');
const {addUserArticle, getUserFavoriteArticles, getUserReadArticles} = require('../services/user-articles.service');


const getNewsController = async (req, res) => {
    try {
        const {pageSize, page } = req.query;
        const preferences = await getPreferences(req.user.email);
        if( !preferences.length ) {
            return res.status(400).json({ error: 'No preferences set for user' });
        }
        const newsData = await getNewsArticles(preferences, pageSize, page);
        res.status(200).json(newsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getTopHeadlinesController = async (req, res) => {
    try {
        const { pageSize, page } = req.query;
        const preferences = await getPreferences(req.user.email);
        if( !preferences.length ) {
            return res.status(400).json({ error: 'No preferences set for user' });
        }
        const newsData = await getTopHeadlines(preferences, pageSize, page);
        res.status(200).json(newsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addReadArticleController = async (req, res) => {
    try {
        const { articleId } = req.params;
        const userId = req.user._id;
        const userArticle = await addUserArticle(userId, articleId, true, false);
        res.status(200).json(userArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addFavoriteArticleController = async (req, res) => {
    try {
        const { articleId } = req.params;
        const userId = req.user._id;
        const userArticle = await addUserArticle(userId, articleId, false, true);
        res.status(200).json(userArticle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserReadArticlesController = async (req, res) => {
    try {
        const userId = req.user._id;
        const readArticles = await getUserReadArticles(userId);
        res.status(200).json(readArticles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserFavoriteArticlesController = async (req, res) => {
    try {
        const userId = req.user._id;    
        const favoriteArticles = await getUserFavoriteArticles(userId);
        res.status(200).json(favoriteArticles);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getNewsController,
    getTopHeadlinesController,
    getUserReadArticlesController,
    getUserFavoriteArticlesController,
    addReadArticleController,
    addFavoriteArticleController
};
