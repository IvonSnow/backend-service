const { Service } = require('egg')
const jwt = require('jsonwebtoken')
const moment = require('moment')
class UserService extends Service {
	// 获取文章列表
	async login({ username, password }) {
		const { ctx, config } = this

		let message = ''

		const user = await ctx.model.Users.findOne({
			where: {
				name: username,
			},
		}).catch(err => console.error(err))

		if (user) {
			if (password === user.password) {
				// 生成jwt, 数据 密钥 过期时间(s)
				let token = jwt.sign(
					{
						exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
						data: { uid: user.user_id },
					},
					config.privateKey
				)
				return {
					status: true,
					message: '登录成功',
					token,
				}
			} else {
				message = '密码不正确'
			}
		} else {
			message = '该用户不存在'
		}

		return {
			status: false,
			message,
		}
	}
	// 新增文章
	async outLogin(newArticle) {}
}

module.exports = UserService
