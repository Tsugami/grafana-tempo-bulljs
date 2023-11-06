require('./instrumentation');

const { Worker } = require("bullmq");
const config = require("./config");
const { delay } = require('./util');


const worker = new Worker(
  config.queue.name,
  async (job) => {
    console.log(`Processing job ${job.id}`);
    await delay(5000);
  },
  {
    connection: config.redis,
    concurrency: config.queue.concurrency,
  }
);

worker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});
