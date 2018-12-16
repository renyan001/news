// 导包
const express = require('express');
const router = require('./router');
// 配置
const app = express();
// 使用路由
app.use(router);
// 监听端口
app.listen(12348, () => {
  console.log('run it ---');
})