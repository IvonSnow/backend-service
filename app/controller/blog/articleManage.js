'use strict'

const BaseController = require('../../core/baseController')
const moment = require('moment')

class ArticleManageController extends BaseController {
	// 获取文章列表
	async list() {
		const { ctx } = this

		let list = await ctx.service.blog.articles.list()
		ctx.body = list
	}

	// 根据关键词（标题，标签，描述，内容），搜索文章
	async search() {
		const { ctx } = this

		if (ctx.query && ctx.query.keyword) {
			let list = await ctx.service.blog.articles.search(ctx.query.keyword)
			this.success(true, '成功', list ? list : [])
		} 
		else {
			this.success(false, '请传递关键词')
		}
	}

	// 根据id获取文章详情
	async detail() {
		const { ctx } = this
		if (ctx.query && ctx.query.id) {
			let article = await ctx.service.blog.articles.detail(ctx.query.id)
			if (article) {
				this.success(true, '成功', article)
			} else {
				this.success(false, '文章不存在')
			}
		} else {
			this.success(false, '文章id必传')
		}
	}

	// 新增文章
	async add() {
		const { ctx, service } = this

		let newArticle = {
			title: ctx.request.body.title,
			author: 'xueyunfeng',
			abstract: ctx.request.body.abstract,
			labels: ctx.request.body.labelsStr,
			cover_url: ctx.request.body.cover,
			content_md: ctx.request.body.mdContent,
			content_html: ctx.request.body.htmlContent,
			like_count: 0,
			comment_count: 0,
			read_count: 0,
			top_flag: 0,
			status: 0,
		}

		let message = ''
		const res = await service.blog.articles.add(newArticle).catch(err => {
			if (err && err.errors[0] && err.errors[0].message) message = err.errors[0].message
		})
		console.log(res)
		if (res) {
			service.blog.articleLabel.checkLabelsExistence(newArticle.labels)
			this.success(true, '新建成功')
		}
		this.success(false, message)
	}
	// 更新
	async update() {
		const { ctx, service } = this

		let newArticle = {
			title: ctx.request.body.title,
			abstract: ctx.request.body.abstract,
			labels: ctx.request.body.labelsStr,
			cover_url: ctx.request.body.cover,
			content_md: ctx.request.body.mdContent,
			content_html: ctx.request.body.htmlContent,
		}

		const res = await service.blog.articles.update(newArticle, ctx.request.body.id)
		if (res) {
			service.blog.articleLabel.checkLabelsExistence(newArticle.labels)
			this.success(true, '更新成功')
		}
	}
	// 删除
	async delete() {
		const { ctx } = this

		ctx.model.Article.destroy({
			where: {
				article_id: ctx.query.id,
			},
		})

		this.success(true, '删除成功')
	}
}

module.exports = ArticleManageController
