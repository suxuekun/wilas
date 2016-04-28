import {BasicApi} from './BasicApi.js'
const _adapter = Symbol("_adapter");
export class AdapterApi extends BasicApi{
	constructor(url,params,adapter){
		super(url,params);
		this.adapter = adapter;
	}
	set adapter(value){
		this[_adapter] = value;
	}
	get adapter(){
		return this[_adapter];
	}
	__callApi(params){
		return super.__callApi(params).done(
			(data) =>{
				if (this.adapter){
					this.data = this.adapter.setSrc(data).getData();
				}
			})
	}
}
