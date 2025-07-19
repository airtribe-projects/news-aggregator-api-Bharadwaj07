const axios = require('axios');

const News = require('../models/news.model');
const {getCache,setCache} = require('../cache/cache');

const NEWSAPI_API_KEY = process.env.NEWSAPI_API_KEY;
const NEWSAPI_BASE_URL = process.env.NEWSAPI_BASE_URL;

const getNewsArticles = async (query, pageSize = 10, page = 1) => {
    try {
        const cacheKey = `getNewsArticles:${query}:${pageSize}:${page}`;
        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const response = await axios.get(`${NEWSAPI_BASE_URL}/everything`, {
            params: {
                q: query,
                pageSize,
                page,
                apiKey: NEWSAPI_API_KEY
            }
        });
        let articles = response?.data?.articles || [];
        if (articles.length > 0) {
           articles = await saveNews(articles);
        }
        await setCache(cacheKey, {
            articles,
            totalResults: response?.data?.totalResults || 0
        }, 3600);
        return {
            articles: articles || [],
            totalResults: response?.data?.totalResults || 0,
        };
    } catch (error) {
        throw new Error('Error fetching news articles');
    }
}

const getTopHeadlines = async (query, pageSize = 10, page = 1) => {
    try {
        const response = await axios.get(`${NEWSAPI_BASE_URL}/top-headlines`, {
            params: {
                q: query,
                pageSize,
                page,
                apiKey: NEWSAPI_API_KEY
            }
        });
        return {
            articles: response?.data?.articles || [],
            totalResults: response?.data?.totalResults || 0,
        };
    } catch (error) {
        throw new Error('Error fetching top headlines');
    }
}



const saveNews = async (articles) => {
    try {
        const newsPromises = articles.map(article => {
            return News.findOneAndUpdate(
                { url: article.url },
                { ...article, publishedAt: new Date(article.publishedAt) },
                { upsert: true, new: true }
            );
        });
        return await Promise.all(newsPromises);
    } catch (error) {
        throw new Error('Error saving news articles');
    }
}

module.exports = {
    getNewsArticles,
    getTopHeadlines
};
