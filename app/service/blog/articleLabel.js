const { Service } = require('egg')
const { Op } = require('sequelize')

class LabelManageService extends Service {
	// 获取标签列表
	async list() {
		const { ctx } = this

		const list = await ctx.model.Articlelabels.findAll({
			order: [['updated_at', 'DESC']],
		})
		return list
	}

	// 获取推荐的便签
	async recommend() {
		const { ctx } = this

		const list = await ctx.model.Articlelabels.findAll({
			order: [
				['article_count', 'DESC'],
				['updated_at', 'DESC'],
			],
			limit: 15,
		})
		return list
	}

	// 获取所有标签
	async all() {
		const { ctx } = this

		const list = await ctx.model.Articlelabels.findAll({
			order: [['article_count', 'DESC']],
			attributes: ['name'],
		})
		return list
	}

	// 新增文章
	async add(newLabel) {
		const article = await this.ctx.model.Articlelabels.create(newLabel)
		return true
	}
	// 更新
	async update(newLabel, id) {
		const res = await this.ctx.model.Articlelabels.update(newLabel, {
			where: {
				id: id,
			},
		})

		console.log(res)

		return true
	}
	// 删除
	async delete(id) {
		console.log(id)
		const res = await this.ctx.model.Articlelabels.destroy({
			where: {
				id,
			},
		})

		return res ? true : false
	}

	// 检测标签是否存在，不存在则新建
	async checkLabelsExistence(labelsStr) {
		if (!labelsStr) return false

		const labels = labelsStr.split(',')
		labels.forEach(async label => {
			const res = await this.ctx.model.Articlelabels.findOne({
				where: {
					name: label,
				},
			})

			if (!res) {
				// 标签不存在则新建
				this.ctx.model.Articlelabels.create({
					name: label,
				})
			}
		})
	}
}

module.exports = LabelManageService
