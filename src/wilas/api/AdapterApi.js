import {BasicApi} from './BasicApi.js'
const _adapter = Symbol("_adapter");
export class AdapterApi extends BasicApi{
	set adapter(value){
		this[_adapter] = value;
	}
	get adapter(){
		return this[_adapter];
	}
	callApi(params){
		return super.callApi(params).done(
			(data) =>{
				if (this.adapter){
					this.data = this.adapter.setSrc(data).getData();
				}
			})
	}
}
