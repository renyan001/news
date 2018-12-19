// 导入m_user.js文件
const M_user = require('../models/m_user');

exports.showSignin = (req, res) => {
  res.render('signin.html');
};

exports.handleSignin = (req, res) => {
  const body = req.body;
  console.log(body);

  // 使用m_user
  M_user.checkEmail(body.email, (err, data) => {  
    if (err) {
      // throw err;
      return res.send({
        code:500,
        msg:'服务器错误!'
      });
    }
    // 此时，只能说明，执行了sql语句之后，没有错误，但是data中不一定有数据，所以需要判断，data中是否有一条数据，因为邮箱是唯一的
    if (data.length === 0) {
      // console.log('邮箱不存在');
      // res.send('邮箱不存在');
      return res.send({
        code:1,
        msg:'邮箱不存在'
      });      
    }
    // 在这时邮箱存在，验证密码
    console.log(data);
    // 此时data是一个数组，数组里边有一个对象，想要拿到对象里边的属性password
    if (data[0].password !== body.password) {
      return res.send({
        code:2,
        msg:'密码错误'
      });
    }
    req.session.user = data[0];
    console.log(req.session.user);
    
    // 此时密码正确，登录成功
    res.send({
      code:200,
      msg:'登录成功'
    }); 
  });
  
  
}

exports.handleSignout = (req, res) => {
  // 清除session的user信息
  delete req.session.user;
  // 回到登录页
  res.redirect("/signin");
}

// 渲染注册页
exports.showSignup = (req, res) => {
  res.render('signup.html');
}

// 处理注册页
exports.handleSignup = (req, res) => {
  const body = req.body;
  // 验证邮箱
  M_user.checkEmail(body.email, (err, data) => {
    if (err) {
      // throw err;
      return res.send({
        code:500,
        msg:'服务器错误!'
      });
    }
    if (data.length !== 0) {
      return res.send({
        code:1,
        msg:'邮箱已存在'
      });      
    }

    // 此时，邮箱不存在，可以继续验证昵称
    M_user.checkNickname(body.nickname, (err, data) => {
      if (err) {
        return res.send({
          code:500,
          msg:'服务器错误!'
        });
      }
      if (data[0]) {
        return res.send({
          code:2,
          msg:'昵称已存在'
        });
      }

      // 此时，昵称不存在，可以注册了
      M_user.addUser(body, (err, data) => {
        if (err) {
          return res.send({
            code:500,
            msg:'服务器错误!'
          });
        }
        // 返回200响应，注册成功
        res.send({
          code:200,
          msg:'注册成功'
        });
      });
    });
  });
}