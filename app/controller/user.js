'use strict'

const BaseController = require('../core/baseController')
const jwt = require('jsonwebtoken')

class UserController extends BaseController {
	async login() {
		const { ctx, service } = this

		try {
			if (ctx.request.body.loginType === 'account') {
				ctx.validate({
					username: { type: 'string' },
					password: { type: 'string' },
				})

				const res = await service.user.login(ctx.request.body)
				if (res.status) {
					// 登陆成功
					// 调用 rotateCsrfSecret 刷新用户的 CSRF token,防止新用户使用老用户的csrf
					ctx.rotateCsrfSecret()
					this.success(true, res.message, res.token)
				} else {
					this.success(false, res.message)
				}
			} else {
				this.success(false, '未知登录方式')
			}
		} catch (err) {
			console.error(err)
			this.success(false, '登陆失败')
		}
	}

	async info() {
		const { ctx, service, config } = this
		if (ctx.authUser) {
			let { uid } = ctx.authUser

			let user = await ctx.model.Users.findOne({
				where: {
					user_id: uid,
				},
			})

			let userInfo = {
				name: user.name,
				nickname: user.nickname,
				avatar: user.avatar,
				access: 'admin',
			}

			this.success(true, '获取成功', userInfo)
		} else {
			console.error('无效用户')
			ctx.redirect('/user/login')
		}
	}

	async currentUser() {
		const { ctx } = this

		const user = ctx.model.Users.findOne({
			where: {
				name: ctx.query.name,
			},
		})

		ctx.body = {}
	}
}

module.exports = UserController
