// src/cache/redisClient.js
const { createClient } = require('redis');

const redis = createClient({
  url: 'redis://localhost:6379',
});

redis.on('error', (err) => {
  console.error('Redis Client Error', err);
});

module.exports = redis;
