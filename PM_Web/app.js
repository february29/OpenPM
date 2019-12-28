
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const index = require('./routes/index')
const user = require('./routes/user')
const product = require('./routes/product')
const upload = require('./routes/upload')
const checkToken = require('./middleware/token_vertify')
const CONFIG = require('./config/config')
const app = express()

// upload file static path
app.use('/upload', express.static('upload'))

app.use(session({
  secret: CONFIG.session_secret,
  resave: true,
  saveUninitialized: true,
  name: 'cid'
}))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('X-Powered-By', 'XMLHttpRequest')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  } else {
    next()
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// check token
// app.use(function (req, res, next) {
//   // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
//   if (req.url != '/login' && req.url != '/register' && req.url != '/favicon.ico' && req.url != '/.well-known/apple-app-site-association') {
//
//     var par = req.method == 'GET'?req.query:req.body;
//     var token = req.headers.token;
//     if (!token){
//       token = par.token;
//     }
//
//     if (!token){
//       res.send({status: 403, msg: '请传递参数token'});
//     }else{
//
//       token_verify.verToken(token).then((data)=> {
//         req.data = data;
//         next();
//       }).catch((error)=>{
//         console.log(error.message)
//         res.send({
//           code: 403,
//           msg: '登录已过期,请重新登录'});
//
//       })
//     }
//
//   } else {
//     next();
//   }
// });


// api
app.use('/', index)
app.use('/user', user)
app.use('/product', product)
app.use('/upload', upload)

app.use((req, res, next) => {
  if (res.status(404)) {
    return res.sendStatus('cant find that! 404')
  } else {
    return next()
  }
})

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
//
// app.listen(process.env.PORT || CONFIG.port, () => {
//   console.log('HTTP Server is running in http://localhost:3000' )
// })

module.exports = app;
