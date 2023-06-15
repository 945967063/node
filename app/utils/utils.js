'use strict';

const env = 'development';
const api =
  env === 'development'
    ? 'http://192.168.40.166:7001/'
    : 'http://192.168.40.166:7001/';
// 分页查询
function responseFormat(status, data) {
  if (status) {
    return {
      code: 200,
      msg: '请求成功',
      data,
      success: true,
    };
  }
  return {
    code: 500,
    msg: data,
    success: false,
  };
}
function responseHandleFormat(status) {
  if (status) {
    return {
      code: 200,
      msg: '操作成功',
      success: true,
    };
  }
  return {
    code: 500,
    msg: '操作失败',
    success: false,
  };
}

module.exports = {
  responseFormat,
  responseHandleFormat,
  api,
};
