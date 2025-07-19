const mongoose = require('mongoose');

const UserArticleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewsArticle',
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    favorite: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

UserArticleSchema.index({ userId: 1, articleId: 1 }, { unique: true });

const UserArticle = mongoose.model('UserArticle', UserArticleSchema);

module.exports = UserArticle;
