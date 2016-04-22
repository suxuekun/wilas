const _template = Symbol("_template");
export class Template{
	constructor(){
	}
	setTemplate(value){
		this[_template] = value;
		return this;
	}
	getTemplate(){
		return this[_template];
	}
	set content(value){
		this[_template] = value;
	}
	get content(){
		return this[_template];
	}
	applyDom(dom){
		if (this.content){
			dom.innerHTML = this.content;
		}
		return this;
	}
	done(func){
		if (this.content){
			func(this.content)
		}
		return this;
	}
}