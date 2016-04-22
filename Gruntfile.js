module.exports = function(grunt) {
	var helper = require('./src/helperBuild.js');
	var config = require('./src/config.js');
	// console.log(config);

	// helper
	// var helpFile = helper.createPaths();
	var helperFile = helper.createHelper();
	// grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean:[
			config.paths.build,
			config.paths.dist
		],
		copy:{
			helper:{
				expand:true,
				src : helperFile,
				dest : config.paths.build+config.helper
			}

		},
		browserify: {
			options: {
				external:config.externals,
				transform: [
					'browserify-shim',
					['babelify',{
						presets:['es2015'],
						plugins:['external-helpers']
					}]
				]
			},
			wilas: {
				src: config.paths.src+config.main,
				dest: config.paths.build+config.main,
				options: {
					browserifyOptions: {
						standalone: config.global.wilas
					}
				},
			},
			wilasFileUtil:{
				src: config.paths.src+config.fileUtil,
				dest: config.paths.build+config.fileUtil,
				options: {
					browserifyOptions: {
						standalone: config.global.fileUtil
					},
				}
			}
		},
 		concat: {
 			options:{
				separator:';'
			},

 			wilas:{
 				src: [helperFile,config.paths.build+config.main],
				dest: '<%=pkg.main%>'
 			},
 			wilasFileUtil:{
 				src: [config.paths.build+config.fileUtil],
				dest: config.paths.dist+config.fileUtil
 			},
 			allInOne:{
 				src: ['<%=pkg.main%>',config.paths.dist+config.fileUtil],
				dest: config.paths.dist + config.allInOne,
			}
		},
		uglify: {
			options: {
				mangle: {
					except: ['jQuery', '$', 'echarts','moment']
				}
			},
			target:{
				files: [{
                    expand:true,
                    cwd:config.paths.dist,
                    src:'**/*.js',
                    dest: config.paths.dist,
                    ext:'.min.js',
                    extDot: 'last'
                }]
			}
		},
		// 'http-server':{
		// 	dev:{
		// 		root:'./',
		// 		port:'8080'
		// 	}
		// },
		watch:{
			scripts: {
				files: ['src/**/*'],
				tasks: ['dev']
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: './'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	// grunt.loadNpmTasks('grunt-http-server');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('dev', ['browserify','concat']);
	grunt.registerTask('build', ['clean','copy','dev','uglify']);
	
	// grunt.registerTask('dev', ['browserify','concat','http-server']);

	grunt.registerTask('debug', ['dev','connect','watch'])
	grunt.registerTask('default', ['build']);
};