import {deepExtend} from '../util/deepExtend.js';
var __config = {
	register:function(group,name,item){
		if (!this[group]) this[group] = {};
		this[group][name] = item;
	},
	baseUrls:{},
	adapters:{},
	apis:{},
	options:{},
	renders:{},
	templates:{},
	components:{},
};
export function config(config){
	if (config){
		deepExtend(__config,config);
	}else{
		return __config;
	}
}