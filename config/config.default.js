/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  const path = require('path');
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123';

  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 文件存放路径和文件白名单
  config.uploadDir = 'app/public/img';
  config.multipart = {
    mode: 'file',
    fileSize: 1048576000,
    whitelist: [ '.txt', '.png', '.jpg' ],
  };
  // 文件静态路径
  config.static = {
    prefix: '/app/public', // 访问前缀
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    maxAge: 31536000,
    buffer: true,
  };
  config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许 Cookie 跨域跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456', // 初始化密码，没设置的可以不写
      // 数据库名
      database: 'data', // 新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // jwt 配置
  config.jwt = {
    secret: 'kaimo313', // 自定义加密字符串，secret 是在服务端的，不要泄露
    ignore: [ '/api/add_user', '/api/login' ], // 哪些请求不需要认证
    // enable: true, // default is false
    // match: '/jwt', // optional
    expiresIn: '24h',

  };
  return {
    ...config,
    ...userConfig,
  };
};
