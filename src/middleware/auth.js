

module.exports = async (ctx, next) => {
  ctx.auth = {
    user: process.env.GIANT_USER,
    pwd: process.env.GIANT_PWD,
  };
  await next();
}