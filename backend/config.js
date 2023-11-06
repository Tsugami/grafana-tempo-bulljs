module.exports = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: process.env.REDIS_PORT ?? 6379,
  },
  queue: {
    concurrency: process.env.QUEUE_CONCURRENCY ?? 1,
    name: process.env.QUEUE_NAME ?? 'COLOR',
  },
};