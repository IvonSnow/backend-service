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

	// egg-sequelize配置
	// host 对应的是docker-compose中service
	config.sequelize = {
		dialect: 'mysql',
		database: 'webapp_db',
		host: 'db',
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
