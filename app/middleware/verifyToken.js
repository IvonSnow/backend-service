const jwt = require('jsonwebtoken')
const moment = require('moment')
module.exports = options => {
	return async function verifyToken(ctx, next) {
		// 对于青云的登录页和前台的路由不进行token校验
		console.log(ctx.request.url)
		if (
			!ctx.request.url.includes('/login') &&
			!ctx.request.url.includes('dsagfsdga') &&
			!ctx.request.url.includes('/front/')
		) {
			console.log('验证token')
			let isValid = false
			const token = ctx?.header?.authorization?.split(' ')[1]
			if (!token) ctx.redirect('/user/login')

			try {
				let decode = jwt.verify(token, ctx.app.config?.privateKey)
				if (decode?.data?.uid) {
					console.log(decode)
					ctx['authUser'] = decode.data
					isValid = true
				} else {
					throw new Error('无效token')
				}
			} catch (err) {
				console.error(err)
				isValid = false
			}

			// token无效则跳转登陆页面
			if (!isValid) ctx.redirect('/user/login')
		}

		await next()
	}
}
