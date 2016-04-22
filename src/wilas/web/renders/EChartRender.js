import {TemplateRender} from '../TemplateRender.js';
import * as echarts from 'echarts';
export class EchartRender extends TemplateRender{
	constructor(template){
		super(template);
		this.initialize = function(dom,options){
			echarts.init(dom);
		}
	}
}