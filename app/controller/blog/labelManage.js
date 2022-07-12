'use strict'

const BaseController = require('../../core/baseController')

class LabelManageController extends BaseController {
	// 获取标签列表
	async list() {
		const { ctx } = this
		let list = []
		try {
			list = await ctx.service.blog.articleLabel.list()
		} catch (err) {
			console.log(err)
			return this.error('获取标签列表失败')
		}

		this.success('成功', list)
	}

	// 推荐
	async recommend() {
		const { ctx } = this
		let list = []
		try {
			list = await ctx.service.blog.articleLabel.recommend()
		} catch (err) {
			console.log(err)
			return this.error('获取推荐标签失败')
		}

		this.success('成功', list)
	}

	// 返回所有标签名
	async all() {
		const { ctx } = this
		let list = []
		try {
			list = await ctx.service.blog.articleLabel.all()
		} catch (err) {
			console.log(err)
			return this.error('获取所有标签名失败')
		}

		this.success('成功', list)
	}

	// 新增标签
	async add() {
		const { ctx, service } = this

		try {
			ctx.validate({
				name: { type: 'string', desc: '标签name' },
			})
		} catch (err) {
			console.error(err)
			return this.error(JSON.stringify(err.errors))
		}

		// 新建标签
		try {
			await service.blog.articleLabel.add(ctx.request.body)
		} catch (err) {
			console.error(err)
			return this.error('新建标签失败')
		}

		this.success('新建成功')
	}

	// 更新标签
	async update() {
		const { ctx, service } = this

		// 必传id和name属性
		try {
			ctx.validate({
				id: { type: 'number', desc: '标签id' },
				name: { type: 'string', desc: '标签name' },
			})
		} catch (err) {
			console.error(err.errors)
			return this.error(JSON.stringify(err.errors))
		}

		try {
			await service.blog.articleLabel.update(ctx.request.body, ctx.request.body.id)
		} catch (err) {
			console.log(err)
			this.error('更新标签失败')
		}

		this.success('更新成功')
	}

	// 删除
	async delete() {
		const { ctx, service } = this
		try {
			ctx.validate(
				{
					id: { type: 'number', required: true, desc: '标签id' },
				},
				ctx.query
			)
		} catch (err) {
			console.error(err.errors)
			return this.error(JSON.stringify(err.errors))
		}

		// 清理文章中的标签
		try {
			console.log('xxx')
			await service.blog.articleLabel.deleteLableInArticles(ctx.query.id)
		} catch (err) {
			console.error(err)

			return this.error('文章标签清理失败')
		}

		try {
			await service.blog.articleLabel.delete(ctx.query.id)
		} catch (error) {
			console.error(err.errors)
			return this.error('删除失败')
		}

		this.success('删除成功')
	}

	async total() {
		const { service } = this
		let total = 0

		try {
			total = await service.blog.articleLabel.total()
		} catch (err) {
			console.error(err)
			return this.error('获取标签总数失败')
		}

		this.success('成功', total)
	}
}

module.exports = LabelManageController
