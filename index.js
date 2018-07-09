const Koa = require('koa');
const Router = require('koa-router');
const cron = require('node-cron');

const authMw  = require('./src/middleware/auth');
const cacheMw = require('./src/middleware/cache');
const cache = require('./src/cache');
const { getAvailability } = require('./src/giant');

const PORT = 3300;
const app = new Koa();
const router = new Router();
const mw = [ authMw, cacheMw ];

router.get('/giant/availability/:sku', ...mw, getAvailability);

app.use(router.routes());
app.use(router.allowedMethods());

cache.init().then(() => {
  console.log('Cache full');
  cron.schedule('0 0 * * * *', () => {
    console.log('Refreshing cache');
    cache.init().then(() => console.log('Cache refresh complete'));
  });
  app.listen(PORT);
  console.log(`listeneing on port: ${PORT}`);
})

module.exports = app;