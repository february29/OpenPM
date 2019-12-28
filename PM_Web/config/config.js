const path = require('path')
/**
 *很多配置还没启用
 目前使用了端口还有db
*/
const config = {

  db_host : 'localhost',
  db_port: 3306,
  db_database : 'pm',
  db_user : 'root',
  db_password : '123qweasd',

  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',
  user_token_name: 'loadingmore',
  session_secret: 'loadingmore',
  upload: {
    path: path.join(__dirname, '/upload'),
    url: '/upload'
  },
  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true
}
module.exports = config
