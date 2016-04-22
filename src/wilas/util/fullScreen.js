import $ from 'jquery';

var DEFAULT_FULLSCREEN_CONTAINER = "wilas_fullscreen";
	
var launchCalls = ["requestFullscreen","mozRequestFullScreen","webkitRequestFullscreen","msRequestFullscreen"];
var exitCalls = ["exitFullscreen","mozCancelFullScreen","webkitExitFullscreen","msExitFullscreen","mozExitFullScreen"];

var $elements = [];
var div = null;
var created = true;
var className = "";

export function fullScreen(element) {
	var state = (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen);
	if (state) return;
	for (var key in launchCalls){
		var name = launchCalls[key];
		if (element[name]){
			element[name].call(element);
			return;
		}
	}
}  
export function exitFullscreen() {
	for (var key in exitCalls){
		var name = exitCalls[key];
		if (document[name]){
			document[name].call(document);
			return;
		}
	}
}
function checkExitFullScreen(element){
	var $document = $(document);
	$document.unbind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange');
	$document.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange',function(){
		var state = (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen);
		if (!state){
			var l = $elements.length;
			for (var i=l-1;i>=0;i--){
				var item = $elements[i];
				var childList = item.p.childNodes;
				if (childList.length <= item.i){
					item.p.appendChild(item.e);
				}else{
					var refNode = childList[item.i];
					item.p.insertBefore(item.e,refNode);
				}
			}
			$(div).removeClass(className);
			if (created){
				document.body.removeChild(div);
			}
			$elements.length = 0;
			div = null;
			className = '';
		}
	});
}
/**
	
*/
export function fullScreenReform(elements,divCLASS){
	if (divCLASS == null || divCLASS == ""){
		divCLASS = DEFAULT_FULLSCREEN_CONTAINER;
	}
	if ($elements.length > 0) return false;
	if (typeof divCLASS == "string"){
		div = document.createElement("div");
		created = true;
		className = divCLASS;
	}else{
		div = divCLASS;
		created = false;
		className = DEFAULT_FULLSCREEN_CONTAINER;
	}
	var $div = $(div);
	$div.addClass(className);

	for (var key in elements){
		var element = elements[key];
		var p = element.parentNode;
		var temp = element;
		var i = 0;
		while( (temp = temp.previousSibling) != null ) {
			i++;
		}
		$elements.push({e:element,p:p,i:i});
		div.appendChild(element);
	}
	if (created){
		document.body.appendChild(div);
	}
	fullScreen.call(null,div);
	checkExitFullScreen.call(null,div);
	return true;
}