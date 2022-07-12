'use strict'

const BaseController = require('../../core/baseController')
const moment = require('moment')

class ArticleManageController extends BaseController {
	// 获取文章列表
	async list() {
		const { ctx } = this
		let list = []
		try {
			list = await ctx.service.blog.articles.list()
		} catch (err) {
			return this.error('文章列表获取失败')
		}

		this.success('成功', list)
	}

	// 根据关键词（标题，标签，描述，内容），搜索文章
	async search() {
		const { ctx } = this

		if (ctx.query && ctx.query.keyword) {
			let list = await ctx.service.blog.articles.search(ctx.query.keyword)
			this.success('成功', list ? list : [])
		} else {
			this.error('请传递关键词')
		}
	}

	// 根据id获取文章详情
	async detail() {
		const { ctx } = this
		if (ctx.query && ctx.query.id) {
			let article = await ctx.service.blog.articles.detail(ctx.query.id)
			if (article) {
				this.success('成功', article)
			} else {
				this.error('文章不存在')
			}
		} else {
			this.error('文章id必传')
		}
	}

	// 新增文章
	async add() {
		const { ctx, service } = this

		// 解构文章
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

		// 检测标签, 不存在的就新建
		try {
			await service.blog.articleLabel.checkLabelsExistence(newArticle.labels)
		} catch (err) {
			console.error(err)
			return this.error('创建文章标签失败')
		}

		// 创建文章
		try {
			await service.blog.articles.add(newArticle)
		} catch (err) {
			console.error(err)
			return this.error('文章创建失败')
		}

		this.success('新建成功')
	}

	// 删除
	async delete() {
		const { ctx, service } = this

		const article = await service.blog.articles.findById(ctx.query.id)

		// 对应删除标签
		try {
			await service.blog.articleLabel.updateLabelsCount(article.labels, '')
		} catch (err) {
			console.error(err)
			return this.error('无法清理对应标签')
		}

		// 删除文章
		try {
			await service.blog.articles.delete(ctx.query.id)
		} catch (err) {
			console.error(err)
			return this.error('删除文章失败')
		}

		this.success('删除成功')
	}

	// 更新
	async update() {
		const { ctx, service } = this
		const articleId = ctx.request.body.id

		let newArticle = {
			title: ctx.request.body.title,
			abstract: ctx.request.body.abstract,
			labels: ctx.request.body.labelsStr,
			cover_url: ctx.request.body.cover,
			content_md: ctx.request.body.mdContent,
			content_html: ctx.request.body.htmlContent,
		}

		// 更新标签
		try {
			const article = await service.blog.articles.findById(articleId)
			await service.blog.articleLabel.updateLabelsCount(article.labels, newArticle.labels)
		} catch (err) {
			console.error(err)
			return this.error('更新标签数据失败')
		}

		// 更新文章
		try {
			await service.blog.articles.update(newArticle, articleId)
		} catch (err) {
			console.error(err)
			return this.error('更新文章失败')
		}

		this.success('更新成功')
	}

	async total() {
		const { service } = this
		let total = 0

		try {
			total = await service.blog.articles.total()
		} catch (err) {
			console.error(err)
			return this.error('获取博客总数失败')
		}

		this.success('成功', total)
	}

	async heatmap() {
		const { ctx, service } = this

		const year = ctx.query.year
		if (!year) return this.error('没有传递参数year')
		let data = []

		try {
			data = await service.blog.articles.heatmap(year)
		} catch (err) {
			console.error(err)
			return this.error('获取heatmap数据失败')
		}

		this.success('成功', data)
	}
}

module.exports = ArticleManageController
