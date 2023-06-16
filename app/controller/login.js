'use strict';
const { Controller } = require('egg');

class UserService extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    try {
      // 获取登录时的 username, password
      const { useName, passWord } = ctx.request.body;
      // useName是否存在
      const userInfo = await ctx.service.login.login(useName);
      console.log(userInfo);
      // 1、没找到说明没有该用户
      if (userInfo.length === 0) {
        ctx.body = {
          status: 500,
          msg: '账号不存在',
          data: null,
        };
        return;
      }
      // 2、找到用户，并且判断输入密码与数据库中用户密码
      if (userInfo[0] && passWord !== userInfo[0].passWord) {
        ctx.body = {
          status: 500,
          msg: '账号密码错误',
          data: null,
        };
        return;
      }
      console.log(ctx.request.body.useName);
      const token = ctx.app.jwt.sign({
        useName: ctx.request.body.useName,
        passWord: ctx.request.body.passWord,
      }, app.config.jwt.secret);
      console.log(token, 'token');
      // 返回 token
      ctx.body = {
        status: 200,
        msg: '登录成功',
        data: { token },
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: '登录失败',
        data: null,
      };
    }
  }

  // 新增用户
  async add_user() {
    const { ctx, app } = this;
    const { useName, passWord } = ctx.request.body;
    // useName是否存在
    const result = await ctx.service.login.login(useName);
    if (result.length > 0) {
      ctx.body = {
        status: 500,
        msg: '用户名已存在',
      };
      return;
    }
    try {
      await app.mysql.insert('user', { useName, passWord });
      ctx.body = {
        status: 200,
        msg: '新增成功',
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: '新增失败',
      };
    }
  }
  // 获取微信code
  async get_code() {
    const { ctx } = this;
    const { code } = ctx.request.query;
    const result = await ctx.service.wxApi.code2Session(code);
    ctx.body = result;
  }
  /** 根据token更新用户头像 */
  async update_avatar() {
    const { ctx, app } = this;
    const { avatar } = ctx.request.body;
    const token = ctx.request.header.authorization;
    const decode = ctx.app.jwt.verify(token, app.config.jwt.secret);
    const { useName } = decode;
    try {
      await app.mysql.update('user', { avatar }, { where: { useName } });
      ctx.body = {
        status: 200,
        msg: '更新成功',
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        msg: '更新失败',
      };
    }
  }


}

module.exports = UserService;
