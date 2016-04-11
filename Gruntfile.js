module.exports = function(grunt) {
	var helper = require('./src/helpers.js');
	var config = require('./src/config.js');
	console.log(config);

	// helper
	helper.createPaths();
	var helperFile = helper.createHelper();
	// grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			options: {
				external:config.externals,
				transform: [
					'browserify-shim',
					['babelify',{
						presets:['es2015'],
						plugins:['external-helpers']
					}]
				],
			},
			wilas: {
				src: config.paths.src+config.main,
				dest: config.paths.build+config.main,
				options: {
					browserifyOptions: {
						standalone: config.global.wilas
					},
				},
			},
		},
 		concat: {
 			options:{
				separator:';'
			},
 			main:{
 				src: [helperFile,config.paths.build+config.main],
				dest: '<%=pkg.main%>'
 			}
		},
		uglify: {
			options: {
				mangle: {
					except: ['jQuery', '$', 'echarts','moment']
				}
			},
			target: {
				files: {
				'<%=pkg.minMain%>': ['<%=pkg.main%>'],
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('build', ['browserify','concat','uglify']);
	grunt.registerTask('dev', ['browserify','concat']);
	grunt.registerTask('default', ['build']);
};