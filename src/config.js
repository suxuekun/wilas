
var paths = {
    src:'src/',
    dist:'dist/',
    build:'build/'
}

var main = 'wilas.js';
var fileUtil = 'wilas.util.fileUtil.js';
var allInOne = 'techstudio.wilas-all.js';
var global={
	wilas:'techstudio.wilas',
	fileUtil:'techstudio.wilas.util.fileUtil'
};
var helper = 'helper.js';
var externals = ['jquery','echarts','moment'];
var config = {
	paths:paths,
	global:global,
	externals:externals,
	helper:helper,
	main:main,
	fileUtil:fileUtil,
	allInOne:allInOne,
	
};
module.exports = config;