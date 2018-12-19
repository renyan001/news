// 导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'news'
};

const sessionStore = new MySQLStore(options);
// 配置
const app = express();
// 配置静态资源
app.use('/public',express.static('./public'));
// 配置第三方包
app.use('/node_modules',express.static('./node_modules'));

app.engine('html',require('express-art-template'));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

// 使用路由
app.use(router);
// 监听端口
app.listen(12348, () => {
  console.log('run it ---');
})