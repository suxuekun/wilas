import {Component} from './Component.js';
import $ from 'jquery';
import {
	loadConfigFromName,
	// createAdapter,
	// createApi,
	// createTemplate,
	// createRender,
	createComponent,
} from './helpers.js';
export class Widget extends Component{
	__initialize(){
		super.__initialize();
		if (!this.getRenderer() || !this.getDom()) return;

		if (!this.getRenderer().getOptions()) this.getRenderer().setOptions({});
		var options = this.getRenderer().getOptions();
		var children = options.children;
		var components = null;
		if (!options.components){
			options.components = {}
		}
		components = options.components;
		if (!children) return;

		for (var key in children){
			var child = children[key];
			var name = child.name;
			var dom = child.dom;
			// var querytype = child.querytype || "";
			var config = child.config;
			if (components[name]){
				throw Error(`child with same name is no allowed`);
			}
			components[name] = [];
			var target = this.getDom().querySelectorAll(dom);
			if (!target) continue;
			Object.keys(target).map(function(v,i,a){
				var component = createComponent(config);
				component.init(target[v]);
				components[name].push(component);
			})
		}
		
	}
}