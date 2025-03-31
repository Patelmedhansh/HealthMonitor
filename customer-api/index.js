const express = require('express');
const client = require('prom-client');

const app = express();
const register = client.register;
client.collectDefaultMetrics(); // Collects default Node metrics

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(8080, () => {
  console.log('Customer API running at http://localhost:8080/metrics');
});