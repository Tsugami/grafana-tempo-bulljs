const { trace } = require("@opentelemetry/api");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const randomColor = async () => {
  const tracer = trace.getTracer("util-lib");
  const span = tracer.startSpan("randomColor");

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

  await delay(randomNum(1000, 5000));

  span.setAttribute("result", color);

  span.end();
  return color;
};

module.exports = {
  delay,
  randomNum,
  randomColor,
};
