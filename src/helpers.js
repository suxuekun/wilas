var config = require('./config.js');
var fs = require('fs');
var sys = require('util');
var exec = require('child_process').exec;

var createORIgnore = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

var createPaths = function(){
    createORIgnore(config.paths.dist);
    createORIgnore(config.paths.build);
}

var helperBuild = config.paths.build + '/helpers.js';

var createHelper = function(file){
    if (!file) file = helperBuild;
    var cmd = './node_modules/.bin/babel-external-helpers > '+file;
    exec(cmd,function(error,stdout,stderr){
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    return file;
}
module.exports= {
    createORIgnore:createORIgnore,
    createPaths:createPaths,
    createHelper:createHelper,

}




