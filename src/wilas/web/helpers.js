import {emptyFunc} from '../Func.js';
import {Render} from './Render.js';
import {Template} from './Template.js';
import {TemplateRender} from './TemplateRender.js';
import {RemoteTemplate} from './RemoteTemplate.js';
import {config} from './config.js';

export function createTemplate(value){
	var templateConfig = value;
	if (!templateConfig) return null;
	if (typeof (templateConfig) == 'string'){
		var templates = config().templates;
		if (templates){
			templateConfig = templates[templateConfig];
			if (!templateConfig){
				return null;
			}
		}
	}
	var template = null
	if (templateConfig.url){
		if (templateConfig.standalone){
			template = new RemoteTemplate(templateConfig.url);
		}else{
			var url = "";
			if (config().baseUrls){
				url = config().baseUrls.template + templateConfig.url || "";
			}
			template = new RemoteTemplate(url);
		}
	}else if (templateConfig.content){
		template = new Template();
		template.content = templateConfig.content;
	}else{
		template = null
	}
	return template;
}
export function createRender(renderConfig){
	if (!renderConfig) return null;
	if (typeof(renderConfig) == 'string'){
		var renders = config().renders;
		if (renders){
			renderConfig = renders[renderConfig];
			if (!renderConfig){
				return null;
			}
		}
	}
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
		if (typeof(renderConfig.options) == 'string'){
			var optionsList = config().options;
			if (optionsList){
				options = optionsList[renderConfig.options];
			}else{
				options = null;
			}
		}else{
			options = renderConfig.options;
		}
	}
	render.setOptions(options,true);
	return render;
}