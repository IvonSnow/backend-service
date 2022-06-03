module.exports = options => {
	return async function verifyToken(ctx, next) {
		console.log('verifyToken')

		if (ctx.request.url !== '/api/user/csrf' && ctx.request.url !== '/api/user/login') {
			// todo 验证token  可以根据host区别 前台还是青云
			console.log('验证token')
			console.log(ctx)
		}

		await next()
	}
}
