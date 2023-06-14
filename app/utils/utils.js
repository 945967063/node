'use strict';

const env = 'development';
const api =
  env === 'development'
    ? 'localhost:7001/'
    : 'http://127.0.0.1:7001/';
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
