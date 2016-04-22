(function (global) {
  var babelHelpers = global.babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.jsx = function () {
    var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
    return function createRawReactElement(type, props, key, children) {
      var defaultProps = type && type.defaultProps;
      var childrenLength = arguments.length - 3;

      if (!props && childrenLength !== 0) {
        props = {};
      }

      if (props && defaultProps) {
        for (var propName in defaultProps) {
          if (props[propName] === void 0) {
            props[propName] = defaultProps[propName];
          }
        }
      } else if (!props) {
        props = defaultProps || {};
      }

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 3];
        }

        props.children = childArray;
      }

      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key === undefined ? null : '' + key,
        ref: null,
        props: props,
        _owner: null
      };
    };
  }();

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.defineEnumerableProperties = function (obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    return obj;
  };

  babelHelpers.defaults = function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  };

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers.get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  babelHelpers.inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  babelHelpers.instanceof = function (left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  };

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  };

  babelHelpers.interopRequireWildcard = function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  };

  babelHelpers.newArrowCheck = function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  };

  babelHelpers.objectDestructuringEmpty = function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  };

  babelHelpers.objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  babelHelpers.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  babelHelpers.selfGlobal = typeof global === "undefined" ? self : global;

  babelHelpers.set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  };

  babelHelpers.slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  babelHelpers.slicedToArrayLoose = function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];

      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);

        if (i && _arr.length === i) break;
      }

      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };

  babelHelpers.taggedTemplateLiteral = function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  };

  babelHelpers.taggedTemplateLiteralLoose = function (strings, raw) {
    strings.raw = raw;
    return strings;
  };

  babelHelpers.temporalRef = function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    } else {
      return val;
    }
  };

  babelHelpers.temporalUndefined = {};

  babelHelpers.toArray = function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  };

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };
})(typeof global === "undefined" ? self : global);
;(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.techstudio || (g.techstudio = {})).wilas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.web = exports.data = exports.api = exports.util = undefined;

var _util = require('./wilas/util.js');

var util = babelHelpers.interopRequireWildcard(_util);

var _api = require('./wilas/api.js');

var api = babelHelpers.interopRequireWildcard(_api);

var _data = require('./wilas/data.js');

var data = babelHelpers.interopRequireWildcard(_data);

var _web = require('./wilas/web.js');

var web = babelHelpers.interopRequireWildcard(_web);
exports.util = util;
exports.api = api;
exports.data = data;
exports.web = web;

},{"./wilas/api.js":3,"./wilas/data.js":6,"./wilas/util.js":9,"./wilas/web.js":12}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyFunc = emptyFunc;
function emptyFunc() {};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AdapterApi = exports.BasicApi = undefined;

var _BasicApi = require('./api/BasicApi.js');

var _AdapterApi = require('./api/AdapterApi.js');

exports.BasicApi = _BasicApi.BasicApi;
exports.AdapterApi = _AdapterApi.AdapterApi;

},{"./api/AdapterApi.js":4,"./api/BasicApi.js":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AdapterApi = undefined;

var _BasicApi2 = require("./BasicApi.js");

var _adapter = Symbol("_adapter");

var AdapterApi = exports.AdapterApi = function (_BasicApi) {
	babelHelpers.inherits(AdapterApi, _BasicApi);

	function AdapterApi() {
		babelHelpers.classCallCheck(this, AdapterApi);
		return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(AdapterApi).apply(this, arguments));
	}

	babelHelpers.createClass(AdapterApi, [{
		key: "callApi",
		value: function callApi(params) {
			var _this2 = this;

			return babelHelpers.get(Object.getPrototypeOf(AdapterApi.prototype), "callApi", this).call(this, params).done(function (data) {
				if (_this2.adapter) {
					_this2.data = _this2.adapter.setSrc(data).getData();
				}
			});
		}
	}, {
		key: "adapter",
		set: function set(value) {
			this[_adapter] = value;
		},
		get: function get() {
			return this[_adapter];
		}
	}]);
	return AdapterApi;
}(_BasicApi2.BasicApi);

},{"./BasicApi.js":5}],5:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BasicApi = undefined;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

var _promise = Symbol("_promise");

var BasicApi = exports.BasicApi = function () {
	function BasicApi(url, params) {
		babelHelpers.classCallCheck(this, BasicApi);

		this.ajax = {
			url: url,
			data: null
		};
		this.preData = null;
		this.data = null;
		this.ajax.data = params;
	}

	babelHelpers.createClass(BasicApi, [{
		key: "prop",
		value: function prop(name, value) {
			if (value == null) {
				return this.ajax[name];
			} else {
				this.setProp(name, value);
			}
		}
	}, {
		key: "setProp",
		value: function setProp(name, value) {
			this.ajax[name] = value;
		}
	}, {
		key: "getPromise",
		value: function getPromise() {
			return this[_promise];
		}
	}, {
		key: "callApi",
		value: function callApi(params) {
			var _this = this;

			if (params) {
				this.ajax.data = params;
			}
			this[_promise] = _jquery2.default.ajax(this.ajax);
			return this[_promise].done(function (data) {
				_this.preData = _this.data;
				_this.data = data;
			});
		}
	}]);
	return BasicApi;
}();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DataAdapter = exports.DataSTD = undefined;

var _DataSTD = require('./data/DataSTD.js');

var _DataAdapter = require('./data/DataAdapter.js');

exports.DataSTD = _DataSTD.DataSTD;
exports.DataAdapter = _DataAdapter.DataAdapter;

},{"./data/DataAdapter.js":7,"./data/DataSTD.js":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DataAdapter = undefined;

var _deepExtend = require("../util/deepExtend.js");

var _adapter = Symbol("_adapter");

var DataAdapter = exports.DataAdapter = function () {
	function DataAdapter(src) {
		babelHelpers.classCallCheck(this, DataAdapter);

		this.setSrc(src);
	}

	babelHelpers.createClass(DataAdapter, [{
		key: "setSrc",
		value: function setSrc(src) {
			this.src = src;
			this.data = null;
			return this;
		}
	}, {
		key: "getSrc",
		value: function getSrc() {
			return this.src;
		}
	}, {
		key: "getData",
		value: function getData() {
			if (!this.data) {
				this.data = this.adapter(this.src);
			}
			return this.data;
		}
	}, {
		key: "__adapter",
		value: function __adapter(src) {
			return (0, _deepExtend.deepCopy)(src);
		}
	}, {
		key: "adapter",
		set: function set(func) {
			var _this = this;

			this[_adapter] = function (src) {
				return func(_this.__adapter(src));
			};
		},
		get: function get() {
			return this[_adapter] || this.__adapter;
		}
	}]);
	return DataAdapter;
}();

},{"../util/deepExtend.js":10}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var DataSTD = exports.DataSTD = function () {
	function DataSTD(name) {
		babelHelpers.classCallCheck(this, DataSTD);

		this.setName(name);
	}

	babelHelpers.createClass(DataSTD, [{
		key: "setName",
		value: function setName(name) {
			this.name = name;
		}
	}, {
		key: "setData",
		value: function setData(data) {
			this.data = data;
		}
	}, {
		key: "setLabel",
		value: function setLabel(label) {
			this.label = label;
		}
	}, {
		key: "getName",
		value: function getName() {
			return this.name;
		}
	}, {
		key: "getData",
		value: function getData() {
			return this.Data;
		}
	}, {
		key: "getLabel",
		value: function getLabel() {
			return this.label;
		}
	}]);
	return DataSTD;
}();

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deepExtend = exports.deepCopy = exports.fullScreenReform = exports.exitFullScreen = exports.fullScreen = undefined;

var _fullScreen = require('./util/fullScreen.js');

var _deepExtend = require('./util/deepExtend.js');

// import * as echarts from 'echarts';
// import * as moment from 'moment';

// import * as FileSaver from 'browser-filesaver';
// import JSZip from 'jsZip';
// import {zipDownload} from './util/zipDownload.js';
exports.
// FileSaver,
// JSZip,
// zipDownload,
fullScreen = _fullScreen.fullScreen;
exports.exitFullScreen = _fullScreen.exitFullScreen;
exports.fullScreenReform = _fullScreen.fullScreenReform;
exports.deepCopy = _deepExtend.deepCopy;
exports.deepExtend = _deepExtend.deepExtend;

},{"./util/deepExtend.js":10,"./util/fullScreen.js":11}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
function _deepCopy(source, refs, copys) {
	var target = null;
	if (source && (typeof source === 'undefined' ? 'undefined' : babelHelpers.typeof(source)) == 'object') {
		var idx = refs.indexOf(source);
		if (idx > -1) {
			// stop loop
			target = copys[idx];
		} else {
			refs.push(source);
			if (target == null) {
				target = new source.constructor();
			}
			copys.push(target);
			for (var key in source) {
				target[key] = _deepCopy(source[key], refs, copys);
			}
		}
	} else {
		target = source;
	}
	return target;
}
function deepCopy(source) {
	return _deepCopy(source, [], []);
}
function _deepExtend(target, source, keep, refs, copys) {
	if (target == null || (typeof target === 'undefined' ? 'undefined' : babelHelpers.typeof(target)) != 'object') {
		if (target != null && keep) {
			//dont change target
		} else {
				target = _deepCopy(source, refs, copys);
			}
	} else {
		if (source && (typeof source === 'undefined' ? 'undefined' : babelHelpers.typeof(source)) == 'object') {
			var idx = refs.indexOf(source);
			if (idx > -1) {
				// stop loop
				target = copys[idx];
			} else {
				refs.push(source);
				copys.push(target);
				for (var key in source) {
					target[key] = _deepExtend(target[key], source[key], keep, refs, copys);
				}
			}
		} else {
			if (!keep) {
				target = source;
			}
		}
	}
	return target;
}
function deepExtend(target, source, keep) {
	if (target == null) {
		throw Error('target should not be null,please pass in a empty object or array depends on source type or just use deepCopy function');
		return null;
	}
	if ((typeof target === 'undefined' ? 'undefined' : babelHelpers.typeof(target)) != "object") {
		throw Error('target should not be a primitive type, should be the same type as source(object or array)');
		return null;
	}
	return _deepExtend(target, source, keep, [], []);
}

},{}],11:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fullScreen = fullScreen;
exports.exitFullscreen = exitFullscreen;
exports.fullScreenReform = fullScreenReform;

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

var DEFAULT_FULLSCREEN_CONTAINER = "wilas_fullscreen";

var launchCalls = ["requestFullscreen", "mozRequestFullScreen", "webkitRequestFullscreen", "msRequestFullscreen"];
var exitCalls = ["exitFullscreen", "mozCancelFullScreen", "webkitExitFullscreen", "msExitFullscreen", "mozExitFullScreen"];

var $elements = [];
var div = null;
var created = true;
var className = "";

function fullScreen(element) {
	var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
	if (state) return;
	for (var key in launchCalls) {
		var name = launchCalls[key];
		if (element[name]) {
			element[name].call(element);
			return;
		}
	}
}
function exitFullscreen() {
	for (var key in exitCalls) {
		var name = exitCalls[key];
		if (document[name]) {
			document[name].call(document);
			return;
		}
	}
}
function checkExitFullScreen(element) {
	var $document = (0, _jquery2.default)(document);
	$document.unbind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange');
	$document.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange', function () {
		var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		if (!state) {
			var l = $elements.length;
			for (var i = l - 1; i >= 0; i--) {
				var item = $elements[i];
				var childList = item.p.childNodes;
				if (childList.length <= item.i) {
					item.p.appendChild(item.e);
				} else {
					var refNode = childList[item.i];
					item.p.insertBefore(item.e, refNode);
				}
			}
			(0, _jquery2.default)(div).removeClass(className);
			if (created) {
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
function fullScreenReform(elements, divCLASS) {
	if (divCLASS == null || divCLASS == "") {
		divCLASS = DEFAULT_FULLSCREEN_CONTAINER;
	}
	if ($elements.length > 0) return false;
	if (typeof divCLASS == "string") {
		div = document.createElement("div");
		created = true;
		className = divCLASS;
	} else {
		div = divCLASS;
		created = false;
		className = DEFAULT_FULLSCREEN_CONTAINER;
	}
	var $div = (0, _jquery2.default)(div);
	$div.addClass(className);

	for (var key in elements) {
		var element = elements[key];
		var p = element.parentNode;
		var temp = element;
		var i = 0;
		while ((temp = temp.previousSibling) != null) {
			i++;
		}
		$elements.push({ e: element, p: p, i: i });
		div.appendChild(element);
	}
	if (created) {
		document.body.appendChild(div);
	}
	fullScreen.call(null, div);
	checkExitFullScreen.call(null, div);
	return true;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createRender = exports.createTemplate = exports.config = exports.RemoteTemplate = exports.TemplateRender = exports.Widget = exports.Template = exports.Render = exports.Component = undefined;

var _Component = require('./web/Component.js');

var _Render = require('./web/Render.js');

var _Template = require('./web/Template.js');

var _Widget = require('./web/Widget.js');

var _TemplateRender = require('./web/TemplateRender.js');

var _RemoteTemplate = require('./web/RemoteTemplate.js');

var _config = require('./web/config.js');

var _helpers = require('./web/helpers.js');

exports.Component = _Component.Component;
exports.Render = _Render.Render;
exports.Template = _Template.Template;
exports.Widget = _Widget.Widget;
exports.TemplateRender = _TemplateRender.TemplateRender;
exports.RemoteTemplate = _RemoteTemplate.RemoteTemplate;
exports.config = _config.config;
exports.createTemplate = _helpers.createTemplate;
exports.createRender = _helpers.createRender;

},{"./web/Component.js":13,"./web/RemoteTemplate.js":14,"./web/Render.js":15,"./web/Template.js":16,"./web/TemplateRender.js":17,"./web/Widget.js":18,"./web/config.js":19,"./web/helpers.js":20}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _data = Symbol("_data");
var _render = Symbol("_render");
var _dom = Symbol("_dom");
var _merge = Symbol("_merge");

var Component = exports.Component = function () {
	function Component() {
		babelHelpers.classCallCheck(this, Component);
	}

	babelHelpers.createClass(Component, [{
		key: "init",
		value: function init(dom) {
			this[_dom] = dom;
			this.__initialize();
			return this;
		}
	}, {
		key: "getDom",
		value: function getDom() {
			return this[_dom];
		}
	}, {
		key: "setRenderer",
		value: function setRenderer(render) {
			this[_render] = render;
			this.__initialize();
			return this;
		}
	}, {
		key: "getRenderer",
		value: function getRenderer() {
			return this[_render];
		}
	}, {
		key: "setData",
		value: function setData(data) {
			this[_data] = data;
			return this;
		}
	}, {
		key: "getData",
		value: function getData() {
			return this[_data];
		}
	}, {
		key: "render",
		value: function render() {
			if (this.getRenderer()) {
				this.getRenderer().render(this.getData(), null, this.getDom());
			}
			return this;
		}
	}, {
		key: "__initialize",
		value: function __initialize() {
			if (this.getRenderer() && this.getDom()) {
				this.getRenderer().initialize(this.getDom());
			}
		}
	}]);
	return Component;
}();

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RemoteTemplate = undefined;

var _Template2 = require('./Template.js');

var _BasicApi = require('../api/BasicApi.js');

var _api = Symbol("_api");

var RemoteTemplate = exports.RemoteTemplate = function (_Template) {
	babelHelpers.inherits(RemoteTemplate, _Template);

	function RemoteTemplate(url, params) {
		babelHelpers.classCallCheck(this, RemoteTemplate);

		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(RemoteTemplate).call(this));

		if (url) {
			_this.setApi(new _BasicApi.BasicApi(url, params));
		}
		return _this;
	}

	babelHelpers.createClass(RemoteTemplate, [{
		key: 'setApi',
		value: function setApi(api) {
			this[_api] = api;
			this.content = null;
			return this;
		}
	}, {
		key: 'getApi',
		value: function getApi() {
			return this[_api];
		}
	}, {
		key: 'callRemote',
		value: function callRemote() {
			var _this2 = this;

			if (!this.content) {
				this[_api].callApi().done(function (data) {
					_this2.content = data;
				});
			}
			return this;
		}
	}, {
		key: 'applyDom',
		value: function applyDom(dom) {
			var _this3 = this;

			if (!this.content) {
				return this.done(function (data) {
					dom.innerHTML = _this3.content;
				});
			} else {
				dom.innerHTML = this.content;
				return this;
			}
		}
	}, {
		key: 'done',
		value: function done(func) {
			if (!this[_api].getPromise()) {
				this.callRemote();
			}
			this[_api].getPromise().done(func);
			return this;
		}
	}]);
	return RemoteTemplate;
}(_Template2.Template);

},{"../api/BasicApi.js":5,"./Template.js":16}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Render = undefined;

var _deepExtend = require('../util/deepExtend.js');

var _Func = require('../Func.js');

var _options = Symbol("_options");
var _data = Symbol("_data");
var _render = Symbol("_render");
var _initialize = Symbol("_initialize");

var Render = exports.Render = function () {
	function Render() {
		babelHelpers.classCallCheck(this, Render);

		this.initialize = _Func.emptyFunc;
		this.render = _Func.emptyFunc;
		this.setOptions({});
	}

	babelHelpers.createClass(Render, [{
		key: 'setOptions',
		value: function setOptions(options, merge) {
			if (merge) {
				if (!this[_options]) {
					this[_options] = {};
				}
				(0, _deepExtend.deepExtend)(this[_options], options);
			} else {
				this[_options] = options;
			}
			return this;
		}
	}, {
		key: 'getOptions',
		value: function getOptions() {
			return this[_options];
		}
	}, {
		key: 'getData',
		value: function getData() {
			return this[_data];
		}
	}, {
		key: '__setData',
		value: function __setData(data) {
			if (data) {
				this[_data] = data;
			}
			return this[_data];
		}
	}, {
		key: 'initialize',
		set: function set(func) {
			var _this = this;

			this[_initialize] = function (dom) {
				func(dom, _this.getOptions());
				return _this;
			};
		},
		get: function get() {
			return this[_initialize];
		}
	}, {
		key: 'render',
		set: function set(func) {
			var _this2 = this;

			this[_render] = function (data, options, dom) {
				func(_this2.__setData(data), _this2.getOptions(), dom);
			};
			return this;
		},
		get: function get() {
			return this[_render];
		}
	}]);
	return Render;
}();

},{"../Func.js":2,"../util/deepExtend.js":10}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _template = Symbol("_template");

var Template = exports.Template = function () {
	function Template() {
		babelHelpers.classCallCheck(this, Template);
	}

	babelHelpers.createClass(Template, [{
		key: "setTemplate",
		value: function setTemplate(value) {
			this[_template] = value;
			return this;
		}
	}, {
		key: "getTemplate",
		value: function getTemplate() {
			return this[_template];
		}
	}, {
		key: "applyDom",
		value: function applyDom(dom) {
			if (this.content) {
				dom.innerHTML = this.content;
			}
			return this;
		}
	}, {
		key: "done",
		value: function done(func) {
			if (this.content) {
				func(this.content);
			}
			return this;
		}
	}, {
		key: "content",
		set: function set(value) {
			this[_template] = value;
		},
		get: function get() {
			return this[_template];
		}
	}]);
	return Template;
}();

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TemplateRender = undefined;

var _Render2 = require("./Render.js");

var _template = Symbol("_template");

var TemplateRender = exports.TemplateRender = function (_Render) {
	babelHelpers.inherits(TemplateRender, _Render);

	function TemplateRender(template) {
		babelHelpers.classCallCheck(this, TemplateRender);

		var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(TemplateRender).call(this));

		_this.setTemplate(template);
		return _this;
	}

	babelHelpers.createClass(TemplateRender, [{
		key: "setTemplate",
		value: function setTemplate(template) {
			this[_template] = template;
		}
	}, {
		key: "getTemplate",
		value: function getTemplate() {
			return this[_template];
		}
	}, {
		key: "initialize",
		set: function set(func) {
			var _this2 = this;

			babelHelpers.set(Object.getPrototypeOf(TemplateRender.prototype), "initialize", function (dom) {
				if (_this2.getTemplate()) {
					_this2.getTemplate().applyDom(dom).done(function (data) {
						func(dom, _this2.getOptions());
					});
				}
				return _this2;
			}, this);
		},
		get: function get() {
			return babelHelpers.get(Object.getPrototypeOf(TemplateRender.prototype), "initialize", this);
		}
	}, {
		key: "render",
		set: function set(func) {
			var _this3 = this;

			babelHelpers.set(Object.getPrototypeOf(TemplateRender.prototype), "render", function (data, options, dom) {
				if (_this3.getTemplate()) {
					_this3.getTemplate().done(function () {
						func(_this3.__setData(data), _this3.getOptions(), dom);
					});
				}
			}, this);
			return this;
		},
		get: function get() {
			return babelHelpers.get(Object.getPrototypeOf(TemplateRender.prototype), "render", this);
		}
	}]);
	return TemplateRender;
}(_Render2.Render);

},{"./Render.js":15}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Widget = undefined;

var _Component2 = require('./Component.js');

var Widget = exports.Widget = function (_Component) {
  babelHelpers.inherits(Widget, _Component);

  function Widget() {
    babelHelpers.classCallCheck(this, Widget);
    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Widget).apply(this, arguments));
  }

  return Widget;
}(_Component2.Component);

},{"./Component.js":13}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.config = config;

var _deepExtend = require('../util/deepExtend.js');

var __config = {};
function config(config) {
	if (config) {
		(0, _deepExtend.deepExtend)(__config, config);
	} else {
		return __config;
	}
}

},{"../util/deepExtend.js":10}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createTemplate = createTemplate;
exports.createRender = createRender;

var _Func = require('../Func.js');

var _Render = require('./Render.js');

var _Template = require('./Template.js');

var _TemplateRender = require('./TemplateRender.js');

var _RemoteTemplate = require('./RemoteTemplate.js');

var _config = require('./config.js');

function createTemplate(value) {
	var templateConfig = value;
	if (!templateConfig) return null;
	if (typeof templateConfig == 'string') {
		var templates = (0, _config.config)().templates;
		if (templates) {
			templateConfig = templates[templateConfig];
			if (!templateConfig) {
				return null;
			}
		}
	}
	var template = null;
	if (templateConfig.url) {
		if (templateConfig.standalone) {
			template = new _RemoteTemplate.RemoteTemplate(templateConfig.url);
		} else {
			var url = "";
			if ((0, _config.config)().baseUrls) {
				url = (0, _config.config)().baseUrls.template + templateConfig.url || "";
			}
			template = new _RemoteTemplate.RemoteTemplate(url);
		}
	} else if (templateConfig.content) {
		template = new _Template.Template();
		template.content = templateConfig.content;
	} else {
		template = null;
	}
	return template;
}
function createRender(renderConfig) {
	if (!renderConfig) return null;
	if (typeof renderConfig == 'string') {
		var renders = (0, _config.config)().renders;
		if (renders) {
			renderConfig = renders[renderConfig];
			if (!renderConfig) {
				return null;
			}
		}
	}
	var render = null;
	if (renderConfig.template) {
		var template = createTemplate(renderConfig.template);
		render = new _TemplateRender.TemplateRender(template);
	} else {
		render = new _Render.Render();
	}
	render.render = renderConfig.render || _Func.emptyFunc;
	render.initialize = renderConfig.initialize || _Func.emptyFunc;

	var options = null;
	if (renderConfig.options) {
		if (typeof renderConfig.options == 'string') {
			var optionsList = (0, _config.config)().options;
			if (optionsList) {
				options = optionsList[renderConfig.options];
			} else {
				options = null;
			}
		} else {
			options = renderConfig.options;
		}
	}
	render.setOptions(options, true);
	return render;
}

},{"../Func.js":2,"./RemoteTemplate.js":14,"./Render.js":15,"./Template.js":16,"./TemplateRender.js":17,"./config.js":19}]},{},[1])(1)
});