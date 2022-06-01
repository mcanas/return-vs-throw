const process = require('process');
const express = require('express');
const { run, runAsync, runUnhandled, runUnhandledAsync } = require('./test');

const routes = express.Router();
const app = express();

routes.get('/handled/:isThrow', (req, res) => {
  const isThrow = parseInt(req.params.isThrow);
  try {
    run(isThrow);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

routes.get('/handled-async/:isThrow', async (req, res) => {
  const isThrow = parseInt(req.params.isThrow);
  try {
    await runAsync(isThrow);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

routes.get('/unhandled/:isThrow', (req, res) => {
  const isThrow = parseInt(req.params.isThrow);
  try {
    runUnhandled(isThrow);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

routes.get('/unhandled-async/:isThrow', async (req, res) => {
  const isThrow = parseInt(req.params.isThrow);
  try {
    runUnhandledAsync(isThrow);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

app.use(routes);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

process.on('uncaughtException', () => {
  console.log('uncaughtException');
});

process.on('unhandledRejection', () => {
  console.log('unhandledRejection');
});
