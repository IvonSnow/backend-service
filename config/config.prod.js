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
		dialectOptions: {
			charset: 'utf8mb4',
			collate: 'utf8mb4_unicode_ci',
			supportBigNumbers: true,
			bigNumberStrings: true,
		},
		database: 'webapp_db',
		host: 'db',
		port: '3306',
		username: 'root',
		password: '970716',
		timezone: '+08:00',
	}

	return {
		...config,
	}
}
