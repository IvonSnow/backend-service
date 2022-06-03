const { Service } = require('egg')
const jwt = require('jsonwebtoken')

class UserService extends Service {
	// 获取文章列表
	async login({username, password}) {
		const {ctx, config} = this


		let message = ''

		const user = await ctx.model.Users.findOne({
			where: {
				name: username
			}
		}).catch(err => console.error(err))

		if(user) {
			if(password === user.password) {
				let token = jwt.sign({ uid: user.user_id }, config.privateKey)
				ctx.cookies.set('qingyun-token', token, {
					httpOnly: false,
					signed: false,
				});
				return {
					status: true,
				}
			}else {
				message= '密码不正确'
			}
		}
		else {
				message= '该用户不存在'
		}

		return {
			status: false,
			message,
		}



	}
	// 新增文章
	async outLogin(newArticle) {

	}
}

module.exports = UserService
