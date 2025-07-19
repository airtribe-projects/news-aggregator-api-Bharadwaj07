const express = require('express');
const { getNewsController, getTopHeadlinesController, addFavoriteArticleController, addReadArticleController, getUserFavoriteArticlesController, getUserReadArticlesController } = require('../controllers/news.controller');

const router = express.Router();


router.get('/', getNewsController);
router.post('/:articleId/read', addReadArticleController);
router.post('/:articleId/favorite', addFavoriteArticleController);
router.get('/read', getUserReadArticlesController);
router.get('/favorites', getUserFavoriteArticlesController);
router.get('/top-headlines', getTopHeadlinesController);


module.exports = router;