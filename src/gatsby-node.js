const chokidar = require('chokidar')
const { outputJson, remove } = require('fs-extra')
const touch = require('touch')
const glob = require('globby')

// Add babel plugin
exports.modifyBabelrc = ({ babelrc }) => {
	return {
		...babelrc,
		plugins: babelrc.plugins.concat([
			[
				'styled-jsx/babel',
				{
					'plugins': ['styled-jsx-plugin-postcss']
				}
			]
		]),
	}
}

// Watch CSS files
let copiedConfig = false
exports.modifyWebpackConfig = async ({ config, stage }, options) => {
	if (!copiedConfig) {
		copiedConfig = true
		await outputJson(`.postcssrc`, {
			plugins: {
				'postcss-import': {},
				'postcss-cssnext': {},
				'postcss-nested': {},
				'lost': {},
			}
		}, { spaces: '\t' })
	}
	if (stage === `develop`) {
		options = {
			watchCss: true,
			watch: 'src/**/*.css',
			remove: `node_modules/.cache`,
			touch: `src/**/*.js`,
			...options,
		}
		if (options.watchCss) {
			const watcher = chokidar.watch(options.watch)
			watcher.on(`change`, event => {
				remove(options.remove)
					.then(() => glob(options.touch))
					.then(files => {
						return Promise.all(files.map(file => {
							return touch(file)
						}))
					})
					.catch(console.error)
			})
			process.on(`exit`, () => watcher.close())
		}
	}

	return config
}
