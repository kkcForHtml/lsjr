var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
//实现模块化
var named = require("vinyl-named");
var webpack = require('gulp-webpack');
gulp.task("copy",function () {
	gulp.src("src/html/*.html")
		.pipe(gulp.dest("app/html"));
})
gulp.task("copyImg",function () {
	gulp.src("src/img/*")
	.pipe(gulp.dest("app/img"));
})
gulp.task("copyImg1",function () {
	gulp.src("src/images/*")
	.pipe(gulp.dest("app/images"));
})
gulp.task('copyicon',function () {
	gulp.src('src/icons/*')
	.pipe(gulp.dest("app/icons"));
})
gulp.task('copyIndex',function(){
	gulp.src("index.html")
	.pipe(gulp.dest("app"));
})
gulp.task('packjs1',function () {
	gulp.src("src/js/gamejs/*")
	.pipe(named())     //取出每一个js的name ，比如shouye.js ===>name = shouye
	.pipe(webpack({
		output:{
			filename:'[name].js'  //输出对应的实现模块化的js文件,===>shouye.js
		},
		module:{
			loaders:[      //loaders 表示转换器  
				{test:/\.js$/,loader:'imports?define=>false'}
			]
		},
		resolve:{   //当项目文件路径或者文件名称过长过深，做的一些处理
			alias:{  // alias表示别名出来

			}
		},
		devtool:'#eval-source-map'   ////子模块的 js调试
	}))
	.pipe(gulp.dest("app/js/gamejs"))	
})
// js模块化
gulp.task("packjs",function () {
	gulp.src("src/js/*")
	.pipe(named())     //取出每一个js的name ，比如shouye.js ===>name = shouye
	.pipe(webpack({
		output:{
			filename:'[name].js'  //输出对应的实现模块化的js文件,===>shouye.js
		},
		module:{
			loaders:[      //loaders 表示转换器  
				{test:/\.js$/,loader:'imports?define=>false'}
			]
		},
		resolve:{   //当项目文件路径或者文件名称过长过深，做的一些处理
			alias:{  // alias表示别名出来

			}
		},
		devtool:'#eval-source-map'   ////子模块的 js调试
	}))
	.pipe(gulp.dest("app/js"))
})

// 预编译scss文件
var scssFiles = ['src/css/**/*.scss'];
gulp.task('sass',function(){
	return gulp.src(scssFiles)
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('app/css'));
})
//启动服务
gulp.task("webserver",function () {
	gulp.src("./")
		.pipe(webserver({
			livereload:true,
			directoryListing:{
				enable:true,
				path:"./"
			},
			port:"80",
			host:"192.168.1.54"
		}))
})
//监听
gulp.task('watch',function(){
//	gulp.watch("src/html/*.html",["copy"]);
//	gulp.watch("src/images/*",["copyImg1"]);
//	gulp.watch(scssFiles,['sass']);	
//	gulp.watch("src/js/*",["packjs"]);
//	gulp.watch("src/icons/*",["copyicon"]);
//	gulp.watch("index.html",["copyIndex"]);
//	gulp.watch('src/js/gamejs/*',['packjs1'])
})	

gulp.task('default',['watch','webserver']);


