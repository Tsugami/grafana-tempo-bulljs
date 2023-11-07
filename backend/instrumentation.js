require("dotenv/config");

/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  PeriodicExportingMetricReader,
  // ConsoleMetricExporter,
} = require("@opentelemetry/sdk-metrics");
const {
  BullMQInstrumentation,
} = require("@jenniferplusplus/opentelemetry-instrumentation-bullmq");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");
const {
  OTLPTraceExporter: HTTPOTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");

const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-http");
// const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-node");

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // url: "http://localhost:4318/v1/traces",
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new BullMQInstrumentation(),
  ],
});

sdk.start();
