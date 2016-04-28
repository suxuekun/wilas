;(function(_global){
	if(techstudio.wilas.bi==null){
		techstudio.wilas.bi = {}
	}
	var web = techstudio.wilas.web;
	var Data = techstudio.wilas.data.DataSTD;
	var standardDataAdapter = new techstudio.wilas.data.DataAdapter();
	var BasicApi = techstudio.wilas.api.BasicApi;
	var AdapterApi = techstudio.wilas.api.AdapterApi;
	var deepExtend = techstudio.wilas.util.deepExtend;
	var loadConfigFromName = techstudio.wilas.web.loadConfigFromName;
	standardDataAdapter.adapter = function(src){
		var dataIndex = {};
		var dataList = [];
		var labelList = [];
		for (var key in src){
			var item = src[key];
			for (var name in item){
				if (dataIndex[name] == null){
					dataIndex[name] = new Data().setName(name).setData([]).setLabel([]);
				}
				dataIndex[name].getData().push(item[name]);
				dataIndex[name].getLabel().push(key);
			}
		}
		for (var key in dataIndex){
			dataList.push(dataIndex[key]);
			labelList.push(key);
		}
		var data = new Data()
		.setData(dataList)
		.setLabel(labelList);
		return data;
	}

	var adapters = {
		standardDataAdapter:standardDataAdapter,
	}
    var apis = {
    };

	//
	var echartOptions = {
    	echartCoordinateOptions:{
			title:{},
			tooltip : {
				trigger: 'axis',
				axisPointer : {
					type : 'shadow'
				}
			},
			legend: {},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
			    {
					type : 'category',
			    }
			],
			yAxis : [
			    {
			        type : 'value'
			    }
			],
    	}
    }

	var options = {
		widgetRenderOptions:{
			children:[
			],
		},
		echartRenderOptions:{
			echartOption:{
			},
			types:{
			},
			stacks:{
			},
			itemStyles:{
			},
			useLabels:null
		},
	}
	function echartInit(dom,options){
		var chart = echarts.init(dom);
		options.chart = chart;
		if (options.resizeAble){
			$(window).resize(function(){
				chart.resize();
			})
		}
		if (options.showLoading){
			chart.showLoading();
		}
		
	}
	var renders = {
		echartRender:{
			initialize:echartInit,
			render:function(data,options,dom){
				var series = data.series;
				var legend = data.legend;
				var labels = data.labels;
				var title = data.title;

				options.echartOption.series = series;
				options.echartOption.title.text = title;
				options.echartOption.legend.data = legend;
				options.echartOption.xAxis[0].data = labels;
				options.chart.setOption(options.echartOption);
			},
			options:'echartRenderOptions',
			template:'echartTemplate'
		},
		lineBarChartRender:{
			initialize:echartInit,
			render:function(data,options,dom){
				var series = [];
				for (var key in data.getData()){
					var item = data.getData()[key];
					if (!item) continue;
					if (options.useDatas && options.useDatas.indexOf(item.getName()) < 0 ){
						continue;
					}
					item.type = options.types[item.getName()] || "line";
					item.stack = options.stacks[item.getName()] || null;
					item.itemStyle = options.itemStyles[item.getName()] || null;
					series.push(item);
				}

				var legend = data.getLabel() || series.map(function(v){return v.getName()})
				var labels = data.getData()[0].getLabel();
				var title = options.name || null;

				options.echartOption.series = series;
				options.echartOption.title.text = title;
				options.echartOption.legend.data = legend;
				options.echartOption.xAxis[0].data = labels;
				options.chart.setOption(options.echartOption);
				options.chart.hideLoading();
			},
			options:'echartRenderOptions',
			template:'echartTemplate'
		}
	}
	var templates = {
		echartTemplate:{
			content:"<div class='echart'></div>"			}
	}
    var components = {}
	var widgets = {};

	var echartConfig = {
		baseUrls:{
		  template:'templates/',
		},
		adapters:adapters,
		apis:apis,
		options:options,
		renders:renders,
		templates:templates,
		components:components,
		widgets:widgets,
		echartOptions:echartOptions,
	}

	//export
	techstudio.wilas.bi.echartConfig = echartConfig;
	techstudio.wilas.bi.standardDataAdapter = standardDataAdapter;

	// addition
	// test examples
	var testAdapterFunc = function(data){
		var midAdapter = standardDataAdapter;
		return midAdapter.setSrc(data.result).getData();
	}
	adapters.testAdapter={
		adapter:testAdapterFunc,
	}
	var testapi = {
		url:'api/test.json',
		adapter:'testAdapter',
	}
	apis.testapi = testapi;

	var testOptions = {
		echartOption:deepExtend({
			title:{
				show:false,
			},
			xAxis:[{
				show:true,
			}
			]
		},echartOptions.echartCoordinateOptions,true),
		types:{
		  footfall:'bar',
		  footfall1:'bar',
		  footfall2:'bar',
		  dwell:'line',
		},
		stacks:{
		  footfall:'g0',
		  footfall1:'g1',
		  footfall2:'g1',
		},
		itemStyles:{
		  footfall:{
		    normal:{
		    }
		  }
		},
		useDatas:['dwell','footfall','footfall1'],
		name:'testChart',
		resizeAble:true,
		showLoading:true,
	}

	options.testOptions = testOptions;
	var testComponent = {
		render:'lineBarChartRender',
		options:"testOptions",
		api:'testapi',
	}
	components.testComponent = testComponent;
	//widget example
	var testWidgetTemplate = {
		content:'<div class="title"><h1>here is a widget demo</h1></div><div id="t1" class="wtf"></div><div id="t2" class="wtf"></div><div id="t3" class="wtf2"></div>',
	}
	templates.testWidgetTemplate = testWidgetTemplate;

	var testWidgetOptions = {
		children:[
			{
				name:'c1',
				dom:'.wtf',
				config:'testComponent',
			},
			{
				name:'c2',
				dom:'#t3',
				config:deepExtend({
					options:deepExtend({
						useDatas:null
					},testOptions,true)
				},testComponent,true),
			}
		]
	}
	options.testWidgetOptions = testWidgetOptions;

	var testWidgetRender = {
		render:function(data,options,dom){
			if (data.init){
				options.components['c1'].map(function(v){
					v.api.callApi()
				})
				options.components['c2'].map(function(v){
					v.api.callApi();
				});
			}
		},
		template:'testWidgetTemplate',
		options:'testWidgetOptions',
	}
	renders.testWidgetRender = testWidgetRender;

	var testWidget = {
		render:'testWidgetRender',
		options:"testWidgetOptions",
	}
	widgets.testWidget = testWidget;
	


	web.config(echartConfig);
})(window);