'use strict';

const BaseController = require('../core/baseController');
const jwt = require('jsonwebtoken')

class UserController extends BaseController {
  async csrf() {
    const {ctx} = this

    this.success(true, '获取成功', {csrf: ctx.csrf})
  }

  async login() {
    const { ctx, service } = this;

    console.log(ctx.request.body);

    try {
      if(ctx.request.body.loginType === 'account') {
        ctx.validate({
          username: {type: 'string'},
          password: {type: 'string'}
        })
  
        const res = await service.user.login(ctx.request.body)
        if(res.status) {        
          this.success(true, '登陆成功', res.user)
        }else {
          this.success(false, res.message)
        }
      }
    }catch(err) {
      console.error(err);
      this.success(false, '登陆失败')
    }
  }

  async info() {
    const { ctx, service, config } = this;
    let token = ctx.headers.authorization.split(' ')[1]
    console.log('authorization:', token);

    let {uid} = jwt.verify(token, config.privateKey);

    let user = await ctx.model.Users.findOne({
      where: {
        user_id: uid
      }
    })

    let userInfo = {
      name: user.name,
      nickname: user.nickname,
      avatar: user.avatar,
      access: 'admin'
    }

    this.success(true, '获取成功', userInfo)
  }

  async currentUser () {
    const {ctx} = this

    const user = ctx.model.Users.findOne({
      where: {
        name: ctx.query.name
      }
    })

    ctx.body = {}

  }
}

module.exports = UserController;
