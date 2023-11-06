require("./instrumentation");

const Fastify = require("fastify");
const { Queue } = require("bullmq");
const config = require("./config");

const PORT = process.env.PORT ?? 3001;
const ADDRESS = process.env.ADDRESS ?? "localhost";

const queue = new Queue(config.queue.name, { connection: config.redis });

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler() {
  return { hello: "world" };
});

fastify.post("/add", async function handler() {
  const id = Math.random().toString(36).substring(7);
  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "black",
    "white",
    "pink",
    "purple",
    "orange",
    "brown",
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];

  queue.add("cars", { color, id });

  return { id };
});

(async () => {
  try {
    await fastify.listen({ port: PORT, host: ADDRESS });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
