import {deepCopy,deepExtend} from '../util/deepExtend.js';
import {emptyFunc} from '../Func.js';
const _options = Symbol("_options");
const _data = Symbol("_data");
const _render = Symbol("_render");
const _initialize = Symbol("_initialize");
export class Render{
	constructor(){
		this.initialize = emptyFunc;
		this.render = emptyFunc;
		this.setOptions({});
	}
	setOptions(options,merge){
		if (merge){
			if (!this[_options]){
				this[_options] = {};
			}
			deepExtend(this[_options],options);
		}else{
			this[_options] = options;
		}
		return this;
	}
	getOptions(){
		return this[_options];
	}
	set initialize(func){
		this[_initialize] = (dom) =>{
			func(dom,this.getOptions());
			return this;
		}
	}
	get initialize(){
		return this[_initialize];
	}
	set render(func){
		this[_render] = (data,options,dom) => {
			func(this.__setData(data),this.getOptions(),dom)
		};
		return this;
	}
	get render(){
		return this[_render];
	}
	getData(){
		return this[_data];
	}
	__setData(data){
		if (data){
			this[_data] = data;
		}
		return this[_data];
	}
}