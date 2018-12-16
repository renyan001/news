// 导包
const express = require('express');
const router = require('./router');
// 配置
const app = express();
// 配置静态资源
app.use('/public',express.static('./public'));
// 配置第三方包
app.use('/node_modules',express.static('./node_modules'));
app.engine('html',require('express-art-template'));
// 使用路由
app.use(router);
// 监听端口
app.listen(12348, () => {
  console.log('run it ---');
})