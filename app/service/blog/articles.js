const { Service } = require('egg')
const { Op } = require('sequelize')
const sequelize = require('sequelize')

class ArticleManageService extends Service {
	// 获取文章列表
	async list({ currentPage, pageSize, label }) {
		const { ctx } = this

		const { count, rows } = await ctx.model.Article.findAndCountAll({
			order: [['updated_at', 'DESC']],
			limit: pageSize,
			offset: (currentPage - 1) * pageSize,
			where: label ? sequelize.fn('FIND_IN_SET', label, sequelize.col('labels')) : {},
		})

		return { count, rows }
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

	// 总数
	async total() {
		const { ctx } = this

		return await ctx.model.Article.count()
	}

	// 热力图
	async heatmap(year) {
		const { ctx } = this
		console.log(parseInt(year) + 1)

		const articles = await ctx.model.Article.findAll({
			attributes: [
				[sequelize.fn('COUNT', sequelize.col('created_at')), 'sum'],
				[
					sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%Y-%m-%d'),
					'created_at',
				],
			],
			where: {
				updated_at: {
					[Op.between]: [year, parseInt(year) + 1 + ''],
				},
			},
			group: [
				sequelize.Sequelize.fn(
					'DATE_FORMAT',
					sequelize.Sequelize.col('created_at'),
					'%Y-%m-%d'
				),
			],
		})

		return articles
	}
}

module.exports = ArticleManageService
