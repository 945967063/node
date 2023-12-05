
'use strict';
const Service = require('egg').Service;
class IndexService extends Service {
  async login(useName) {
    const { app } = this;
    try {
      // 通过 app.mysql.update 方法更新 user 表, 通过 id 筛选用户
      const sql = `select * from users where username = '${useName}'`;
      // 根据用户名，在数据库查找相对应的id操作
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = IndexService;
