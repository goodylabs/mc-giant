const cache = require('../cache')

const cacheMiddleware = async (ctx, next) => {
  const meta = cache.getMeta(ctx.params.sku);
  console.log('meta: ', meta);
  if (meta) {
    ctx.productMeta = meta;
    await next();
  } else {
    ctx.status = 404;
    ctx.body = {status: 'error', meta: null, result: null, errmsg: `Unknown ID ${ctx.params.sku}`};
  }
}

module.exports = cacheMiddleware