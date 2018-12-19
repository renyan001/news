// 配置数据库连接

// 1.导包
const mysql = require('mysql');
// 2.配置数据库信息
const connection = mysql.createConnection({
    // 主机名
    host: 'localhost',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 数据库名字
    database: 'news'
});
// 3. 连接数据库
connection.connect();
module.exports = connection;