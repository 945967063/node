'use strict';

module.exports = secret => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization; // 若是没有 token，返回的是 null 字符串
    let decode = null;
    if (token !== 'null' && token) {
      try {
        // eslint-disable-next-line no-unused-vars
        decode = ctx.app.jwt.verify(token, secret); // 验证token
        await next();
      } catch ({ name, message }) {
        if (name === 'JsonWebTokenError') {
          ctx.status = 401;
          ctx.body = {
            msg: 'token已过期，请重新登录',
            success: false,
            code: 401,
          };
          return;
        }
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
        success: false,
      };
      return;
    }
  };
};
