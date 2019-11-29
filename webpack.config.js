const path=require('path')
const ExtractTextPlugin=require('extract-text-webpack-plugin')

module.exports=(env)=>{
	const isProduction=env==='production' //check if env is prodiuction
	const CSSExtract=new ExtractTextPlugin('styles.css')
	return {
		entry: './src/app.js',
		output: {
			path: path.join(__dirname, 'public','dist'), //needs to be absolute path 
			filename: 'bundle.js'
		},
		module: {
			rules: [{
				loader: 'babel-loader',
				test: /\.js$/, //checks if files end with .js
				exclude: /node_modules/  //we dont want to run with node_module
			}, {
				test: /\.s?css$/, //looking for files ending with .css
				use: CSSExtract.extract({
					use:[
						{
							loader:'css-loader',
							options:{
								sourceMap:true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						},
					]
				})
			}]
		},
		plugins:[
			CSSExtract
		],
		devtool:isProduction?'source-map':'inline-source-map', //from webpack doucmentation
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true,  //client side routing
			publicPath:'/dist/'
		}
	}

}

