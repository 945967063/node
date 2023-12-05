'use strict';
const Service = require('egg').Service;
class UploadService extends Service {
  // 获取图片
  async query(params) {
    const { app } = this;
    try {
      const result = await app.mysql.get('img', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 增加图片
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('img', params);
      return result.insertId;
    } catch (error) {
      return null;
    }
  }
}
module.exports = UploadService;
