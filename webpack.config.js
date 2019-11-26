const path=require('path')

//app entry point and where to output 
module.exports={
	entry:'./src/app.js',
	output:{
		path:path.join(__dirname,'public'), //needs to be absolute path 
		filename:'bundle.js'
	},
	module:{
		rules:[{
			loader:'babel-loader',
			test:/\.js$/, //checks if files end with .js
			exclude:/node_modules/  //we dont want to run with node_module
		},{
			test:/\.s?css$/, //looking for files ending with .css
			use:[
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}]
	},
	devtool:'cheap-module-eval-source-map', //from webpack doucmentation
	devServer:{
		contentBase:path.join(__dirname,'public'),
		historyApiFallback: true   //client side routing
	}
}
