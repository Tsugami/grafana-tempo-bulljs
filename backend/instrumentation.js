require("dotenv/config");

const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const {
  BullMQInstrumentation,
} = require("@jenniferplusplus/opentelemetry-instrumentation-bullmq");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");

const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-http");

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new BullMQInstrumentation(),
  ],
});

sdk.start();
