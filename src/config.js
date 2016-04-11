
var paths = {
    src:'src/',
    dist:'dist/',
    build:'build/'
}
var main = 'wilas.js';
var global={
	wilas:'techstudio.wilas'
};
var externals = ['jquery','echarts','moment'];
var config = {
	paths:paths,
	global:global,
	externals:externals,
	main:main,
};
module.exports = config;