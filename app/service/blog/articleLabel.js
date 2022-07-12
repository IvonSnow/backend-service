const { Service } = require('egg')
const { Op } = require('sequelize')
const _ = require('lodash')
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

	// 通过id查找标签实例
	async findById(id) {
		const labelInstance = await this.ctx.model.Articlelabels.findOne({
			where: {
				id,
			},
		})

		return labelInstance
	}

	// 检测标签是否存在，不存在则新建
	async checkLabelsExistence(labelsStr) {
		if (!labelsStr) return false

		const labels = labelsStr.split(',')
		labels.forEach(async label => {
			const [res, created] = await this.ctx.model.Articlelabels.findOrCreate({
				where: {
					name: label,
				},
				defaults: {
					article_count: 1,
				},
			})

			if (!created) {
				// 存在则对应+1
				res.article_count += 1
				await res.save()
			}
		})
	}

	// 更新labels的计数
	async updateLabelsCount(oldStr, newStr) {
		const { ctx } = this
		let oldLablesArr = oldStr.split(',')
		let newLablesArr = newStr.split(',')
		const delArr = _.difference(oldLablesArr, newLablesArr)
		const addArr = _.difference(newLablesArr, oldLablesArr)

		delArr.forEach(async label => {
			const res = await this.ctx.model.Articlelabels.findOne({
				where: {
					name: label,
				},
			})

			// 存在则对应-1
			if (res && res.article_count > 0) {
				res.article_count -= 1
				await res.save()
			} else {
				throw new Error(`标签${lable}不存在`)
			}
		})

		await this.checkLabelsExistence(addArr.join(','))
	}

	async deleteLableInArticles(id) {
		const label = await this.findById(id)
		const articles = await this.ctx.model.Article.findAll({
			where: {
				labels: {
					[Op.like]: `%${label.name}%`,
				},
			},
		})

		for (let article of articles) {
			let labelsArr = article.labels ? article.labels.split(',') : []

			labelsArr = labelsArr.filter(item => item !== label.name)
			article.labels = labelsArr.join(',')

			await article.save()
		}
	}

	// 总数
	async total() {
		const { ctx } = this

		return await ctx.model.Articlelabels.count()
	}
}

module.exports = LabelManageService
