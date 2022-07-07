const { Controller } = require('egg')
class BaseController extends Controller {
	get user() {
		return this.ctx.session.user
	}

	success(message, data) {
		this.ctx.body = {
			success: true,
			message,
			data,
		}
	}

	error(message) {
		this.ctx.body = {
			success: false,
			message,
		}
	}

	notFound(msg) {
		msg = msg || 'not found'
		this.ctx.throw(404, msg)
	}
}
module.exports = BaseController
