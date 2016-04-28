module.exports = function(grunt) {
	var helper = require('./src/helperBuild.js');
	var config = require('./src/config.js');
	// console.log(config);
	// helper
	var helperFile = helper.createHelper();
	// grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean:{
			init:[
				config.paths.build,
				config.paths.dist
			],
			//del useless file in dist after build
			del:[
				config.paths.dist+config.main,
			]
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
			//main file
			wilas: {
				src: config.paths.src+config.main,
				dest: config.paths.build+config.main,
				options: {
					browserifyOptions: {
						standalone: config.global.wilas
					}
				},
			},
			// addition files
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
			// helper with main file
 			wilas:{
 				src: [helperFile,config.paths.build+config.main],
				dest: '<%=pkg.main%>'
 			},
 			// help will all
 			allInOne:{
 				src: [helperFile,config.paths.build+"**"],
				dest: config.paths.build + config.allInOne,
			}
		},
		copy:{
			// copy to dist
			all:{
				files:[
				{
					expand:true,
					cwd:config.paths.build,
					src:['**'],
					dest:config.paths.dist,
				}
				]
			}
		},
		uglify: {
			options: {
				mangle: {
					except: ['jQuery', '$', 'echarts','moment']
				}
			},
			//minify all in dist
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
		// when debug use watch and server
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('dev', ['clean:init','browserify','concat','copy:all','clean:del']);
	grunt.registerTask('build', ['dev','uglify']);
	grunt.registerTask('run',['connect','watch']);
	grunt.registerTask('debug', ['dev','run']);
	grunt.registerTask('default', ['build']);
};