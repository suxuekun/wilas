import {Template} from './Template.js';
import {BasicApi} from '../api/BasicApi.js';
const _api = Symbol("_api");
export class RemoteTemplate extends Template{
	constructor(url,params){
		super();
		if (url){
			this.setApi(new BasicApi(url,params));
		}
	}
	setApi(api){
		this[_api] = api;
		this.content = null;
		return this;
	}
	getApi(){
		return this[_api];
	}
	callRemote(){
		if (!this.content){
			this[_api].callApi().done( (data) => {this.content = data;})
		}
		return this;
	}
	applyDom(dom){
		if (!this.content){
			return this.done((data) =>{dom.innerHTML = this.content;});
		}else{
			dom.innerHTML = this.content;
			return this;
		}
	}
	done(func){
		if (!this[_api].getPromise()){
			this.callRemote();	
		}
		this[_api].getPromise().done(func);
		return this;
	}
}