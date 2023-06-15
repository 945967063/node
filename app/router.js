'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // eslint-disable-next-line no-unused-vars
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.get('/', controller.home.index);
  router.post('/api/login', controller.login.login);
  router.post('/api/add_user', controller.login.add_user);
  router.post('/api/upload/upload', _jwt, controller.upload.upload); // 修改用户个性签名
  router.get('/api/login/getCode', controller.login.get_code); // 获取微信code

};
