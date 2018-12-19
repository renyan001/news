// 导包
const express = require('express');
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');
// 配置
const router = express.Router();
// 使用路由
router.get('/signin', c_user.showSignin)
      .post('/signin', c_user.handleSignin)
      .get('/', c_topic.showTopicList)
      .get('/topic/create', c_topic.showCreateTopic)
      .post('/createTopic', c_topic.handleCreateTopic)
      .get('/signout', c_user.handleSignout)
      // .get('/detail/topic', c_topic.showTopicDetail);
      .get('/detail/topic/:topicID', c_topic.showTopicDetail)
      .get('/topic/:topicID/delete', c_topic.handleDeleTopic)
      .get('/topic/:topicID/edit', c_topic.showEditTopic)
      .post('/edit/topic/:topicID', c_topic.handleEditTopic)
      .get('/signup', c_user.showSignup)
      .post('/signup',c_user.handleSignup);
// 导出
module.exports = router;