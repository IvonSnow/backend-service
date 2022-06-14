'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app

	/*
	 * 青云平台
	 */
	// 用户相关
	router.post('/api/user/login', controller.user.login)
	router.get('/api/user/info', controller.user.info)

	/* 博客相关 - 文章管理 */
	router.get('/api/blog/articles/list', controller.blog.articleManage.list)
	router.get('/api/blog/articles/search', controller.blog.articleManage.search)
	router.get('/api/blog/articles/detail', controller.blog.articleManage.detail)
	router.post('/api/blog/articles/add', controller.blog.articleManage.add)
	router.post('/api/blog/articles/update', controller.blog.articleManage.update)
	router.delete('/api/blog/articles/delete', controller.blog.articleManage.delete)
	/* 博客相关 - 标签管理 */
	router.get('/api/blog/articleLabels/list', controller.blog.labelManage.list)
	router.post('/api/blog/articleLabels/add', controller.blog.labelManage.add)
	router.post('/api/blog/articleLabels/update', controller.blog.labelManage.update)
	router.delete('/api/blog/articleLabels/delete', controller.blog.labelManage.delete)
	router.get('/api/blog/articleLabels/all', controller.blog.labelManage.all)

	/*
	 * 个人博客
	 */
	router.get('/front/blog/articles/list', controller.blog.articleManage.list)
	router.get('/front/blog/articles/search', controller.blog.articleManage.search)
	router.get('/front/blog/articleLabels/recommend', controller.blog.labelManage.recommend)
}
