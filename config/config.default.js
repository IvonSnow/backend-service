/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {
		privateKey: 'xyf0716',
	})

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1651132345813_7122'

	// add your middleware config here
	config.middleware = ['verifyToken']

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	}

	// egg-sequelize配置
	// host 对应的是docker-compose中service
	config.sequelize = {
		dialect: 'mysql',
		database: 'blog_db',
		host: 'localhost',
		port: '3306',
		username: 'root',
		password: '970716',
		timezone: '+08:00',
	}

	config.validate = {
		convert: true,
	}

	return {
		...config,
		...userConfig,
	}
}
