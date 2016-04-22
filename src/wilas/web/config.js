import {deepExtend} from '../util/deepExtend.js';
var __config = {};
export function config(config){
	if (config){
		deepExtend(__config,config);
	}else{
		return __config;
	}
}