const connection = require('../config/db_config');

exports.findAllTopic = (callback) => {
  const sqlstr = 'select * from `topics` order by id desc';
  connection.query(sqlstr, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null,data);
  });
}

exports.addTopic = (body, callback) => {
  const sqlstr = 'insert into `topics` set ?';
  connection.query(sqlstr,body, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  })
}

exports.findTopicById = (topicID, callback) => {
  const sqlstr = 'select * from `topics` where id=?';
  connection.query(sqlstr, topicID, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
    // console.log(data);
    
  })
}

// 删除信息
exports.deleTopicById = (topicID, callback) => {
  const sqlstr = 'delete from `topics` where id=?';
  connection.query(sqlstr, topicID, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  })
}


// 编辑信息
exports.editTopicById = (topicID, body, callback) => {
  const sqlstr = 'update `topics` set ? where id=?';
  connection.query(sqlstr, [body,topicID], (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  })
}