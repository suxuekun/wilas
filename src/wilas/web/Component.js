const _data = Symbol("_data");
const _render = Symbol("_render");
const _dom = Symbol("_dom");
const _merge = Symbol("_merge");
export class Component{
	constructor(){
	}
	init(dom){
		this[_dom] = dom;
		this.__initialize();
		return this;
	}
	getDom(){
		return this[_dom];
	}
	setRenderer(render){
		this[_render] = render;
		this.__initialize();
		return this;
	}
	getRenderer(){
		return this[_render];
	}
	setData(data){
		this[_data] = data;
		return this;
	}
	getData(){
		return this[_data];
	}
	render(){
		if (this.getRenderer()){
			this.getRenderer().render(this.getData(),null,this.getDom());
		}
		return this;
	}
	__initialize(){
		if (this.getRenderer() && this.getDom()){
			this.getRenderer().initialize(this.getDom());
		}
	}
}