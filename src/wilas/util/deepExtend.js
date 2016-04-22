function _deepCopy(source,refs,copys){
	var target = null;
	if (source && typeof (source) == 'object'){
		var idx = refs.indexOf(source)
		if (idx > -1) {
			// stop loop
			target = copys[idx];
		}else{
			refs.push(source);
			if (target == null) {
				target = new source.constructor();
			}
			copys.push(target);
			for (var key in source){
				target[key] = _deepCopy(source[key],refs,copys);
			}
		}
	}else {
		target = source;
	}
	return target;
}
export function deepCopy(source){
	return _deepCopy(source,[],[])
}
function _deepExtend(target,source,keep,refs,copys){
	if (target == null || typeof(target) !='object'){
		if (target != null && keep){
			//dont change target
		}else{
			target = _deepCopy(source,refs,copys);
		}
	}else{
		if (source && typeof(source) =='object'){
			var idx = refs.indexOf(source)
			if (idx > -1) {
				// stop loop
				target = copys[idx];
			}else{
				refs.push(source);
				copys.push(target);
				for (var key in source){
					target[key] = _deepExtend(target[key],source[key],keep,refs,copys);
				}
			}
		}else{
			if (!keep){
				target = source;
			}
		}
	}
	return target;
}
export function deepExtend(target,source,keep){
	if (target == null){
		throw Error('target should not be null,please pass in a empty object or array depends on source type or just use deepCopy function');
		return null;
	}
	if (typeof(target) != "object"){
		throw Error('target should not be a primitive type, should be the same type as source(object or array)');
		return null;
	}
	return _deepExtend(target,source,keep,[],[]);
}