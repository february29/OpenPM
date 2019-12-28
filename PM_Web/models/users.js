const db = require('./connect')
function User(user) {
    this.id = user.id;
    this.name = user.name;
    this.phone = user.phone;
    this.o_phone = user.o_phone;
    this.e_mail = user.e_mail;
    this.photo = user.photo;
    this.username = user.username;
    this.password = user.password;
    this.info = user.info;





}

/**
 * 获取所有的用户列表信息
 * @param callback
 */
User.getAllUsers = function(callback){

    db.query('select A.* ,B.name as dep_name from oa.users A , oa.deps B where A.dep_id = B.id', function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    })
}


/**
 * 静态方法（由于我只需要获取用户信息，因此没必要在使用这个方法之前先去new 一个USER对象）
 * @param uname
 * @param callback
 */
User.getUserByUsername = function (username, callback) {
    db.query(`select * from user where username = ?`, [username], function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result[0]);
    });
}


/**
 * 根据用户ID编号获取用户详细信息
 * @param uid
 * @param callback
 */
User.getUserById = function (uid, callback) {
    db.query(`select * from users where id = ?`, [uid], function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    })
}

User.deleteUserById = function(id, callback){
    db.query('delete from users where id = ?', [id], function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    })
}

/**
 * 获取所有的用户列表信息
 * @param callback
 */
User.getUserByDepId = function(depId ,callback){
    db.query('select * from users where dep_id = ?', [depId],function (err, result) {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    })
}


/**
 * 函数的原型方法（使用之前需要先new 一个实例对象， 然后就可以在线面直接使用this 这个属性了，  原型方法是子类实例都可以循环调用的）
 * @param callback
 */
User.prototype.save = function (callback) {
    // 这里直接使用mysql中内置的这个now()函数获取当前的时间信息
    db.query('INSERT ignore INTO users SET ?'
        , {
            name:this.name,
            phone:this.phone,
            o_phone:this.o_phone,
            e_mail:this.e_mail,
            photo:this.photo,
            username:this.username,
            password:this.password

        }
        , function (err, result) {
            if (err) {
                return callback(err, null);
            }

            // 返回插入数据的ID编号
            callback(null, result);
        });

}


/**
 * 修改用户信息
 * @param callback
 */
User.prototype.update = function (callback) {
    //console.log('数据库中信息--------------------------', this)
    db.query('update users set  password = ?, e_mail = ?, phone = ?, info = ?, photo = ? where id = ?', [
            this.password, this.e_mail, this.phone, this.info, this.phone, this.id]
        , function (err, result) {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
}




module.exports = User;

