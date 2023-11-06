require("./instrumentation");

const Fastify = require("fastify");
const { Queue } = require("bullmq");
const config = require("./config");
const { randomColor } = require("./util");

const PORT = process.env.PORT ?? 3001;
const ADDRESS = process.env.ADDRESS ?? "localhost";

const queue = new Queue(config.queue.name, { connection: config.redis });

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler() {
  return { hello: "world" };
});

fastify.post("/add", async function handler(req, res) {
  const id = Math.random().toString(36).substring(7);
  const color = await randomColor();
  queue.add("cars", { color, id });

  return { id };
});

fastify.get("/colors/random", async function handler(_request, reply) {
  const color = await randomColor();
  reply.header("cache-control", "max-age=31536000, public");

  return { color };
});

(async () => {
  try {
    await fastify.listen({ port: PORT, host: ADDRESS });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
