const moment = require('moment');
const M_topic = require('../models/m_topic');

exports.showTopicList = (req, res, next) => {
  M_topic.findAllTopic((err, data) => {
    if (err) {
      return next(err);
    }
    res.render('index.html', {
      topics: data,
      // user: req.session.user
    });
  });
}

exports.showCreateTopic = (req, res, next) => {
  res.render('topic/create.html');
}

exports.handleCreateTopic = (req, res, next) => {
  const body = req.body;
  // 给body添加新成员
  // 添加时间
  body.createdAt = moment().format();
  // 当前登录用户
  body.userId = req.session.user.id;
  M_topic.addTopic(body, (err, data) => {
    if (err) {
      return next(err);
    };
    console.log(data);

    res.send({
      code: 200,
      msg: '添加成功'
    });
  });
}

exports.showTopicDetail = (req, res, next) => {
  // 获取当前动态路由参数topicID的值
  const topicID = req.params.topicID;
  // console.log(topicID);

  M_topic.findTopicById(topicID, (err, data) => {
    if (err) {
      return next(err);
    };
    // if (data.length === 0) {
    //   return res.send({
    //     code:1,
    //     msg:'该文章已经被删除'
    //   });
    // }
    // if (req.session.user) {
      res.render('topic/show.html', {
        topic: data[0],
        // user: req.session.user,
        // seesionUserId: req.session.user.id
      });
    // }

  })
}
// 删除信息
exports.handleDeleTopic = (req, res, next) => {
  const topicID = req.params.topicID;
  M_topic.deleTopicById(topicID, (err, data) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  })
}

// 编辑信息
exports.showEditTopic = (req, res, next) => {

  const topicID = req.params.topicID;

  // 让M操作数据库 :根据topicID查询数据
  M_topic.findTopicById(topicID, (err, data) => {
      if (err) {
          return next(err);
      }
      if (data.length === 0) {
          return res.send({
              code: 1,
              msg: "该文章已经被删除"
          });
      }
      res.render("topic/edit.html", {
          topic: data[0]
      });
  })

};

// 处理编辑信息
exports.handleEditTopic = (req, res, next) => {
  const topicID = req.params.topicID;
  const body = req.body;
  M_topic.editTopicById(topicID, body, (err, data) => {
    if (err) {
      return next(err);
    }
    res.send({
      code:200,
      msg:'编辑成功'
    })
  })
}