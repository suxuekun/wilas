import $ from 'jquery';
const _promise = Symbol("_promise");
const _done = Symbol("_done");
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
		getData(){
			return this.data;
		}
		getPromise(){
			return this[_promise];
		}
		callApi(params){
			this.__callApi(params);
			this.__addDoneFunc();
			return this.getPromise();
		}
		__callApi(params){
			if (params){
				this.ajax.data = params;
			}
			this[_promise] = $.ajax(this.ajax);
			this[_promise].done(
				(data) =>{
					this.preData = this.data;
					this.data = data;
				}
			)
			return this[_promise];
		}
		__addDoneFunc(){
			if (this[_done]){
				this[_promise].done(this[_done]);
			}
		}
		done(func){
			this[_done] = func;
			if (this[_promise]){
				this[_promise].done(func);
			}
		}
	}
