// 导包
const express = require('express');
const c_user = require('./controllers/c_user');
// 配置
const router = express.Router();
// 使用路由
router.get('/', c_user.showSignin);
// 导出
module.exports = router;