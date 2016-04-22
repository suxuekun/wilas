import $ from 'jquery';
const _promise = Symbol("_promise");
export class BasicApi{
		constructor(url,params){
			this.ajax = {
				url:url,
				data:null,
			};
			this.preData = null;
			this.data = null;
			this.ajax.data = params;
		}
		prop(name,value){
			if (value ==null){
				return this.ajax[name];
			}else{
				this.setProp(name,value);
			}
		}
		setProp(name,value){
			this.ajax[name] = value;
		}
		getPromise(){
			return this[_promise];
		}
		callApi(params){
			if (params){
				this.ajax.data = params;
			}
			this[_promise] = $.ajax(this.ajax);
			return this[_promise].done(
				(data) =>{
					this.preData = this.data;
					this.data = data;
				}
			)
		}
	}
