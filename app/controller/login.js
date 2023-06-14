
const { Controller } = require('egg');

class UserService extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    try {
      // 获取登录时的 username, password
      const { useName, passWord } = ctx.request.body;
      // useName是否存在
      const sql = `select * from user where useName = '${useName}'`;
      // 根据用户名，在数据库查找相对应的id操作
      const userInfo = await app.mysql.query(sql);
      console.log(userInfo);
      // 1、没找到说明没有该用户
      if (userInfo.length === 0) {
        ctx.body = {
          status: 500,
          desc: '账号不存在',
          data: null,
        };
        return;
      }
      // 2、找到用户，并且判断输入密码与数据库中用户密码
      if (userInfo[0] && passWord !== userInfo[0].passWord) {
        ctx.body = {
          status: 500,
          desc: '账号密码错误',
          data: null,
        };
        return;
      }
      const token = app.jwt.sign({
        id: userInfo[0].id,
        username: userInfo[0].username,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token 有效期为 24 小时
      }, app.config.jwt.secret);
      // 返回 token
      ctx.body = {
        status: 200,
        desc: '登录成功',
        data: { token },
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        desc: '登录失败',
        data: null,
      };
    }
  }

}

module.exports = UserService;
