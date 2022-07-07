const { Service } = require('egg')
const { Op } = require('sequelize')

class ArticleManageService extends Service {
	// 获取文章列表
	async list() {
		const { ctx } = this

		const list = await ctx.model.Article.findAll({
			order: [['updated_at', 'DESC']],
		})
		return list
	}

	async search(keyword) {
		const { ctx } = this

		const list = await ctx.model.Article.findAll({
			where: {
				[Op.or]: [
					{
						title: {
							[Op.like]: `%${keyword}%`,
						},
					},
					{
						abstract: {
							[Op.like]: `%${keyword}%`,
						},
					},
					{
						content_html: {
							[Op.like]: `%${keyword}%`,
						},
					},
				],
			},
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
		const { ctx } = this

		await ctx.model.Article.create(newArticle)
	}

	// 更新
	async update(newArticle, id) {
		const res = await this.ctx.model.Article.update(newArticle, {
			where: {
				article_id: id,
			},
		})

		return true
	}

	// 通过id查找文章实例
	async findById(id) {
		const { ctx } = this

		const article = await ctx.model.Article.findOne({
			where: {
				article_id: id,
			},
		})

		return article
	}

	// 删除
	async delete(id) {
		const { ctx } = this

		await ctx.model.Article.destroy({
			where: {
				article_id: id,
			},
		})
	}
}

module.exports = ArticleManageService
