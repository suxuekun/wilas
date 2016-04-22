import {Render} from './Render.js';
const _template = Symbol("_template");
export class TemplateRender extends Render{
	constructor(template){
		super();
		this.setTemplate(template);
	}
	setTemplate(template){
		this[_template] = template;
	}
	getTemplate(){
		return this[_template];
	}
	set initialize(func){
		super.initialize = (dom)=>{
			if (this.getTemplate()){
				this
				.getTemplate()
				.applyDom(dom)
				.done(
					(data)=>{
						func(dom,this.getOptions());
					}
				)
			}
			return this;
		}
	}
	get initialize(){
		return super.initialize;
	}
	set render(func){
		super.render = (data,options,dom) =>{
			if (this.getTemplate())
			{
				this
				.getTemplate()
				.done(
					()=>{
						func(this.__setData(data),this.getOptions(),dom);
					}
				)
			}
		}
		return this;
	}
	get render(){
		return super.render;
	}
}