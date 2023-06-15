'use strict';

const Service = require('egg').Service;

class LoginService extends Service {

  /**
   * 获取openid
   * @param {*} code 前端wx.login获取的code登录码
   */
  async code2Session(code) {

    const { ctx, app } = this;

    const wxApp = this.config.wxApp;
    const url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wxApp.appid + '&secret=' + wxApp.secret + '&js_code=' + code + '&grant_type=authorization_code';

    const res = await ctx.curl(url, {
      dataType: 'json',
    });
    // console.log(res, 'res.data');

    if (res.data.openid) {
      // 查询数据库是否存在该用户
      const sql = `select * from user where useName = '${res.data.openid}'`;
      const result = await app.mysql.query(sql);
      const token = ctx.app.jwt.sign({
        useName: res.data.openid,
      }, app.config.jwt.secret);
      if (result.length === 0) {
        await app.mysql.insert('user', { useName: res.data.openid, passWord: '123456', avatar: '', nickname: '' });
      }
      return {
        msg: '登录成功',
        status: 200,
        data: { token },
      };
    }
    return { // 忽略网络请求失败
      msg: res.data.errmsg,
      sta: false,
    };

  }

}

module.exports = LoginService;

