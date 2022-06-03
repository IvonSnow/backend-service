const { Service } = require('egg')
const { Op } = require("sequelize");

class ArticleManageService extends Service {
	// 获取文章列表
	async list() {
		const { ctx } = this

		const list = await ctx.model.Article.findAll({
			order: [['updated_at', 'DESC']]
		})
		return list
	}

	async search(keyword) {
		const { ctx } = this

		const list = await ctx.model.Article.findAll({
			where: {
				[Op.or]: [
					{title: {
						[Op.like]: `%${keyword}%`
					},},
					{abstract: {
						[Op.like]: `%${keyword}%`
					},},
					{content_html: {
						[Op.like]: `%${keyword}%`
					},}
				]
			}
		})

		return list
	}

	// 详情
	async detail(id) {
		const { ctx } = this

		const article = await ctx.model.Article.findByPk(id)
		return article
	}

	// 新增文章
	async add(newArticle) {
		const article = await this.ctx.model.Article.create(newArticle)
		return true
	}
	// 更新
	async update(newArticle, id) {
		const res = await this.ctx.model.Article.update(newArticle, {
			where: {
				article_id: id,
			},
		})

		console.log(res)

		return true
	}
	// 删除
	async delete() {}
}

module.exports = ArticleManageService
