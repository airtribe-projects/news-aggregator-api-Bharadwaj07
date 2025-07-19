require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const redis = require('./cache/redisClient');
const app = express();
const userRoutes = require('./routes/user');
const newsRoutes = require('./routes/news');
const { authMiddleware } = require('./middlewares/auth');
const logger = require('./middlewares/logger');

const port = process.env.PORT || 3000;

const MONGOURL = process.env.MONGO_URL || 'mongodb://localhost:27017/news-aggregator-api';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/users', userRoutes);
app.use('/news', authMiddleware, newsRoutes);


const promises = [
    mongoose.connect(MONGOURL),
    redis.connect()
];

Promise.all(promises)
    .then(() => {
        console.log('Connected to MongoDB and Redis');
        app.listen(port, (err) => {
            if (err) {
                return console.log('Something bad happened', err);
            }
            console.log(`Server is listening on ${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB or Redis:', err);
        process.exit(1);
    });



module.exports = app;