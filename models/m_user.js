// 导入db_config.js
const connection = require('../config/db_config');

exports.checkEmail = (email, callback) => {
  // 判断邮箱
  const sqlstr = 'select * from `users` where email=?';
  connection.query(sqlstr,email,(err, data) => {
    if (err) {
      // 错误的err
      callback(err, null);
    }else {
      // 正确的data
      callback(null, data);
    }
  })
}

// 验证昵称
exports.checkNickname = (nickname, callback) => {
  const sqlstr = 'select * from `users` where nickname=?';
  connection.query(sqlstr, nickname, (err, data) => {
    if (err) {
      // 错误的err
      callback(err, null);
    }else {
      // 正确的data
      callback(null, data);
    }
  })
}

// 添加新用户
exports.addUser = (body, callback) => {
  sqlstr = 'insert into `users` set ?';
  connection.query(sqlstr, body, (err, data) => {
    if (err) {
      // 错误的err
      callback(err, null);
    }else {
      // 正确的data
      callback(null, data);
    }
  })
}