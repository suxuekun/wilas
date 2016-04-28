import {deepCopy} from '../util/deepExtend.js';
const _adapter = Symbol("_adapter");
export class DataAdapter{
	constructor(func){
		this.adapter = func;
	}
	setSrc(src){
		this.src = src;
		this.data = null;
		return this;
	}
	getSrc(){
		return this.src;
	}
	getData(){
		if (!this.data){
			this.data = this.adapter(this.src);
		}
		return this.data;
	}
	__adapter(src){
		return deepCopy(src);
	}
	set adapter(func){
		if (func){
			this[_adapter] = (src) => func(this.__adapter(src));
		}else{
			this[_adapter] = null;
		}
		
	}
	get adapter(){
		return this[_adapter] || this.__adapter;
	}

}