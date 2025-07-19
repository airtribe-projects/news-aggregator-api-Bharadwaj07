const mongoose = require('mongoose');

const { Schema } = mongoose;


const SourceSchema = new mongoose.Schema({
    id: { 
        type: String, 
    },
    name: { 
        type: String, 
    }
}, { _id: false });

const NewsArticleSchema = new mongoose.Schema({
    source: { 
        type: SourceSchema, 
    },
    author: { 
        type: String 
    },
    title: { 
        type: String, 
    },
    description: { 
        type: String 
    },
    url: { 
        type: String,
        required: true,
        unique: true
    },
    urlToImage: { 
        type: String 
    },
    publishedAt: { 
        type: Date, 
    },
    content: { 
        type: String 
    },
});

const NewsArticles = mongoose.model('NewsArticle', NewsArticleSchema);

module.exports = NewsArticles;
