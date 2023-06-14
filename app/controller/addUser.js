
const { Controller } = require('egg');

class UserService extends Controller {
  async add_user() {
    const { ctx, app } = this;
    const { useName, passWord } = ctx.request.body;
    // useName是否存在
    const sql = `select * from user where useName = '${useName}'`;
    const result = await app.mysql.query(sql);
    if (result.length > 0) {
      ctx.body = {
        status: 500,
        desc: '用户名已存在',
      };
      return;
    }
    try {
      await app.mysql.insert('user', { useName, passWord });
      ctx.body = {
        status: 200,
        desc: '新增成功',
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        desc: '新增失败',
      };
    }
  }
}

module.exports = UserService;
