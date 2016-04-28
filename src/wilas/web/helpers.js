import {emptyFunc} from '../Func.js';
import {BasicApi} from '../api/BasicApi.js';
import {AdapterApi} from '../api/AdapterApi.js';
import {DataAdapter} from '../data/DataAdapter.js';
import {Render} from './Render.js';
import {Template} from './Template.js';
import {TemplateRender} from './TemplateRender.js';
import {RemoteTemplate} from './RemoteTemplate.js';
import {Component} from'./Component.js';
import {Widget} from './Widget.js';
import {config} from './config.js';

export function loadConfigFromName(name,groupName){
	// console.log('load',name,groupName);
	var group = config()[groupName];
	var item = null;
	if (group){
		item = group[name];
		if (!item){
			console.warn(`${name} not found in ${groupName}`)
		}
	}
	return item;
}

export function createOptions(value){
	var optionConfig = value;
	if (typeof (optionConfig) == 'string'){
		optionConfig = loadConfigFromName(optionConfig,'options');
	}
	return optionConfig;
}

export function createAdapter(value){
	// console.log('createAdapter',value);

	var adapterConfig = value;
	if (typeof (adapterConfig) == 'string'){
		adapterConfig = loadConfigFromName(adapterConfig,'adapters');
	}
	if (adapterConfig instanceof DataAdapter){
		return adapterConfig;
	}
	if (!adapterConfig) return null;
	var adapter = new DataAdapter(adapterConfig.adapter);
	return adapter;
}

export function createApi(value){
	// console.log('createApi',value);

	var apiConfig = value;
	if (typeof (apiConfig) == 'string'){
		apiConfig = loadConfigFromName(apiConfig,'apis');
	}
	if (apiConfig instanceof BasicApi){
		return apiConfig;
	}
	if (!apiConfig) return null;
	var api = null
	if (apiConfig.url){
		var url = apiConfig.url;
		if (!apiConfig.standalone){
			if (config().baseUrls){
				url = (config().baseUrls.api || "") + url;
			}
		}
		if (apiConfig.adapter){
			var adapter = createAdapter(apiConfig.adapter);
			api = new AdapterApi(url,apiConfig.params,adapter);
		}
	}
	return api;

}

export function createTemplate(value){
	// console.log('createTemplate',value);
	var templateConfig = value;
	if (typeof (templateConfig) == 'string'){
		templateConfig = loadConfigFromName(templateConfig,'templates');
	}
	if (templateConfig instanceof Template){
		return templateConfig;
	}
	if (!templateConfig) return null;
	var template = null
	if (templateConfig.url){
		if (templateConfig.standalone){
			template = new RemoteTemplate(templateConfig.url);
		}else{
			var url = templateConfig.url;
			if (config().baseUrls){
				url = (config().baseUrls.template || "") + url;
			}
			template = new RemoteTemplate(url);
		}
	}else if (templateConfig.content){
		template = new Template();
		template.content = templateConfig.content;
	}else{
		console.warn(`template config should have url or content`);
		template = null
	}
	return template;
}
export function createRender(value){
	// console.log('createRender',value);
	var renderConfig = value;
	if (typeof(renderConfig) == 'string'){
		renderConfig = loadConfigFromName(renderConfig,'renders');
	}
	if (renderConfig instanceof Render){
		return renderConfig;
	}
	if (!renderConfig) return null;
	var render = null;
	if (renderConfig.template){
		var template = createTemplate(renderConfig.template);
		render = new TemplateRender(template)
	}else{
		render = new Render();
	}
	render.render = renderConfig.render || emptyFunc;
	render.initialize = renderConfig.initialize || emptyFunc;

	var options = null;
	if (renderConfig.options){
		options = createOptions(renderConfig.options);
	}
	render.setOptions(options,true);
	return render;
}

function _createComponent(render,options){
	render = createRender(render);
	options = createOptions(options);
	render.setOptions(options,true);
	return new Component().setRenderer(render);
}
function _createApiComponent(render,options,api){
	var c = _createComponent(render,options);
	var api = createApi(api);
	if (c && api){
		c.api = api;
		api.done(function(){
			c.setData(api.data).render();
		})
	}
	return c;
}

export function createComponent(value){
	var componentConfig = value;
	if (typeof(componentConfig) == 'string'){
		componentConfig = loadConfigFromName(componentConfig,'components');
	}
	if (componentConfig instanceof Component){
		return componentConfig;
	}
	if (!componentConfig) return null;
	var component = null;
	if (componentConfig.api){
		component = _createApiComponent(componentConfig.render,componentConfig.options,componentConfig.api);
	}else{
		component = _createComponent(componentConfig.render,componentConfig.options);
	}
	return component;
}

function _createWidget(render,options){
	render = createRender(render);
	options = createOptions(options);
	render.setOptions(options,true);
	return new Widget().setRenderer(render);
}
function _createApiWidget(render,options,api){
	var c = _createWidget(render,options);
	var api = createApi(api);
	if (c && api){
		c.api = api;
		api.done(function(){
			c.setData(api.data).render();
		})
	}
	return c;
}
export function createWidget(value){
	var widgetConfig = value;
	if (typeof(widgetConfig) == 'string'){
		widgetConfig = loadConfigFromName(widgetConfig,'widgets');
	}
	if (widgetConfig instanceof Widget){
		return widgetConfig;
	}
	if (!widgetConfig) return null;
	var widget = null;
	if (widgetConfig.api){
		widget = _createApiWidget(widgetConfig.render,widgetConfig.options,widgetConfig.api);
	}else{
		widget = _createWidget(widgetConfig.render,widgetConfig.options);
	}
	return widget;
}