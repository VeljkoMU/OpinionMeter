const redis = require('redis');

const redisClient = redis.createClient();

redisClient.ping();

module.exports = redisClient;