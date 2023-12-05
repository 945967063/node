module.exports = () => {
  return async function errorHandler(ctx, next) {
    await next();
    if (ctx.body && ctx.body.success === false) {
      if (ctx.status === 401) {
        ctx.status = 401;
      } else {
        ctx.status = 500;
      }
      ctx.body = {
        ...ctx.body,
      };
    }
  };
};
