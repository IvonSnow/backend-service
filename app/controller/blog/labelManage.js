'use strict'

const BaseController = require('../../core/baseController')

class LabelManageController extends BaseController {
	// 获取标签列表
	async list() {
		const { ctx } = this

		let list = await ctx.service.blog.articleLabel.list()
		this.success(true, '成功', list ? list : [])
	}

	// 推荐
	async recommend() {
		const { ctx } = this

		let list = await ctx.service.blog.articleLabel.recommend()
		this.success(true, '成功', list ? list : [])
	}

	// 返回所有标签名
	async all() {
		const { ctx } = this
		let message = ''

		let list = await ctx.service.blog.articleLabel.all().catch(err => {
			console.error(err)
			message = JSON.stringify(err)
		})

		if (!message) {
			this.success(true, '成功', list ? list : [])
		} else {
			this.success(false, message)
		}
	}

	// 新增标签
	async add() {
		const { ctx, service } = this
		let message = ''

		try {
			ctx.validate({
				name: { type: 'string' },
			})
		} catch (err) {
			console.error(err)
			message = JSON.stringify(err.errors)
		}

		if (!message) {
			const res = await service.blog.articleLabel.add(ctx.request.body).catch(err => {
				if (err && err.errors[0] && err.errors[0].message) {
					message = err.errors[0].message
				}
			})
			console.log(res)
			if (res) {
				return this.success(true, '新建成功')
			}
		}

		this.success(false, message)
	}
	// 更新
	async update() {
		const { ctx, service } = this
		let message = ''

		try {
			ctx.validate({
				id: { type: 'number' },
				name: { type: 'string' },
			})
		} catch (err) {
			console.error(err.errors)
			message = JSON.stringify(err.errors)
		}

		if (!message) {
			const res = await service.blog.articleLabel
				.update(ctx.request.body, ctx.request.body.id)
				.catch(err => {
					message = JSON.stringify(err)
				})
			if (res) {
				return this.success(true, '更新成功')
			}
		}

		this.success(false, message)
	}
	// 删除
	async delete() {
		const { ctx, service } = this
		let message = ''

		try {
			ctx.validate(
				{
					id: { type: 'number', required: true, desc: '标签id' },
				},
				ctx.query
			)
		} catch (err) {
			console.error(err.errors)
			message = JSON.stringify(err.errors)
		}

		if (!message) {
			const res = await service.blog.articleLabel.delete(ctx.query.id).catch(err => {
				message = JSON.stringify(err)
			})

			if (res) {
				return this.success(true, '删除成功')
			} else {
				return this.success(false, '标签不存在')
			}
		} else {
			this.success(false, message)
		}
	}
}

module.exports = LabelManageController
