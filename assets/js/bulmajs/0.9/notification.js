(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Bulma", [], factory);
	else if(typeof exports === 'object')
		exports["Bulma"] = factory();
	else
		root["Bulma"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/plugins/notification.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core.js":
/*!*********************!*\
  !*** ./src/core.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar Bulma = {\n    /**\n     * Current BulmaJS version.\n     * @type {String}\n     */\n    VERSION: '0.9.1',\n\n    /**\n     * An index of the registered plugins\n     * @type {Object}\n     */\n    plugins: {},\n\n    /**\n     * Helper method to create a new plugin.\n     * @param  {String} key The plugin's key\n     * @param  {Object} options The options to be passed to the plugin\n     * @return {Object} The newly created plugin instance\n     */\n    create: function create(key, options) {\n        if (!key || !Bulma.plugins.hasOwnProperty(key)) {\n            throw new Error('[BulmaJS] A plugin with the key \\'' + key + '\\' has not been registered.');\n        }\n\n        return Bulma.plugins[key].handler.create(options);\n    },\n\n\n    /**\n     * Register a new plugin\n     * @param  {String} key The key to register the plugin under\n     * @param  {Object} plugin The plugin's main constructor\n     * @param  {number?} priority The priority this plugin has over other plugins. Higher means the plugin is registered before lower.\n     * @return {undefined}\n     */\n    registerPlugin: function registerPlugin(key, plugin) {\n        var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n\n        if (!key) {\n            throw new Error('[BulmaJS] Key attribute is required.');\n        }\n\n        this.plugins[key] = {\n            priority: priority,\n            handler: plugin\n        };\n    },\n\n\n    /**\n     * Parse the HTML DOM searching for data-bulma attributes. We will then pass\n     * each element to the appropriate plugin to handle the required processing.\n     * \n     * @return {undefined}\n     */\n    traverseDOM: function traverseDOM() {\n        var _this = this;\n\n        var elements = document.querySelectorAll(this.getPluginClasses());\n\n        this.each(elements, function (element) {\n            if (element.hasAttribute('data-bulma-attached')) {\n                return;\n            }\n\n            var plugins = _this.findCompatiblePlugins(element);\n\n            _this.each(plugins, function (plugin) {\n                plugin.handler.parse(element);\n            });\n        });\n    },\n\n\n    /**\n     * Return a string of classes to search the DOM for\n     * @returns {string} The string containing the classes\n     */\n    getPluginClasses: function getPluginClasses() {\n        var classes = [];\n\n        for (var key in this.plugins) {\n            if (!this.plugins[key].handler.getRootClass()) {\n                continue;\n            }\n\n            classes.push('.' + this.plugins[key].handler.getRootClass());\n        }\n\n        return classes.join(',');\n    },\n\n\n    /**\n     * Search our plugins and find one that matches the element\n     * @param {HTMLElement} element The element we want to match for\n     * @returns {Object} The plugin that matched\n     */\n    findCompatiblePlugins: function findCompatiblePlugins(element) {\n        var _this2 = this;\n\n        var compatiblePlugins = [];\n\n        var sortedPlugins = Object.keys(this.plugins).sort(function (a, b) {\n            return _this2.plugins[a].priority < _this2.plugins[b].priority;\n        });\n\n        this.each(sortedPlugins, function (key) {\n            if (element.classList.contains(_this2.plugins[key].handler.getRootClass())) {\n                compatiblePlugins.push(_this2.plugins[key]);\n            }\n        });\n\n        return compatiblePlugins;\n    },\n\n\n    /**\n     * Create an element and assign classes\n     * @param {string} name The name of the element to create\n     * @param {array} classes An array of classes to add to the element\n     * @return {HTMLElement} The newly created element\n     */\n    createElement: function createElement(name, classes) {\n        if (!classes) {\n            classes = [];\n        }\n\n        if (typeof classes === 'string') {\n            classes = [classes];\n        }\n\n        var elem = document.createElement(name);\n\n        this.each(classes, function (className) {\n            elem.classList.add(className);\n        });\n\n        return elem;\n    },\n\n\n    /**\n     * Helper method to normalise a plugin finding an element.\n     * @param {string} query The CSS selector to query for\n     * @param {HTMLElement|null} context The element we want to search within\n     * @param {boolean} nullable Do we except a null response?\n     * @returns {null|HTMLElement} The element we found, or null if allowed.\n     * @throws {TypeError}\n     */\n    findElement: function findElement(query) {\n        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;\n        var nullable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n        if (!query && !nullable) {\n            throw new TypeError('First argument to `findElement` required. Null given.');\n        }\n\n        if (!query) {\n            return null;\n        }\n\n        if (query.toString() === '[object HTMLElement]') {\n            return query;\n        }\n\n        return context.querySelector(query);\n    },\n\n\n    /**\n     * Find an element otherwise create a new one.\n     * @param {string} query The CSS selector query to find\n     * @param {HTMLElement|null} parent The parent we want to search/create within\n     * @param {[string]} elemName The name of the element to create\n     * @param {[array]} classes The classes to apply to the element\n     * @returns {HTMLElement} The HTML element we found or created\n     */\n    findOrCreateElement: function findOrCreateElement(query) {\n        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n        var elemName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';\n        var classes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];\n\n        var elem = this.findElement(query, parent);\n\n        if (!elem) {\n            if (classes.length === 0) {\n                classes = query.split('.').filter(function (item) {\n                    return item;\n                });\n            }\n\n            var newElem = this.createElement(elemName, classes);\n\n            if (parent) {\n                parent.appendChild(newElem);\n            }\n\n            return newElem;\n        }\n\n        return elem;\n    },\n\n\n    /**\n     * For loop helper\n     * @param {*} objects The array/object to loop through\n     * @param {*} callback The callback used for each item\n     */\n    each: function each(objects, callback) {\n        var i = void 0;\n\n        for (i = 0; i < objects.length; i++) {\n            callback(objects[i], i);\n        }\n    }\n};\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    Bulma.traverseDOM();\n});\n\nexports.default = Bulma;\n\n//# sourceURL=webpack://Bulma/./src/core.js?");

/***/ }),

/***/ "./src/dismissableComponent.js":
/*!*************************************!*\
  !*** ./src/dismissableComponent.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _plugin = __webpack_require__(/*! ./plugin */ \"./src/plugin.js\");\n\nvar _plugin2 = _interopRequireDefault(_plugin);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @module DismissableComponent\n * @since  0.2.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nvar DismissableComponent = function (_Plugin) {\n    _inherits(DismissableComponent, _Plugin);\n\n    _createClass(DismissableComponent, null, [{\n        key: 'defaultOptions',\n\n        /**\n         * Returns an object containing the default options for this plugin.\n         * @returns {object} The default options object.\n         */\n        value: function defaultOptions() {\n            return {\n                isDismissable: false,\n                destroyOnDismiss: true,\n                element: null\n            };\n        }\n\n        /**\n         * Plugin constructor\n         * @param  {string} name Plugin's name\n         * @param  {Object} options Plugin's options\n         * @return {this} The new plugin instance\n         */\n\n    }]);\n\n    function DismissableComponent(name, options) {\n        _classCallCheck(this, DismissableComponent);\n\n        /**\n         * The name of this component, this will be used as the root class\n         * @type {string}\n         */\n        var _this = _possibleConstructorReturn(this, (DismissableComponent.__proto__ || Object.getPrototypeOf(DismissableComponent)).call(this, options));\n\n        _this.name = name;\n\n        /**\n        * Body text.\n        * @type {string}\n        */\n        _this.body = _this.option('body');\n\n        /**\n        * Color modifier.\n        * @type {string} Possible values are null, primary, info, success, warning, danger\n        */\n        _this.color = _this.option('color');\n\n        /**\n        * How long to wait before auto dismissing the component.\n        * @type {int|null} If null component must be dismissed manually.\n        */\n        _this.dismissInterval = _this.option('dismissInterval') ? _this.createDismissInterval(_this.option('dismissInterval')) : null;\n\n        /**\n        * Does this component have a dismiss button?\n        * @type {Boolean}\n        */\n        _this.isDismissable = _this.option('isDismissable');\n\n        /**\n        * Should this component be destroyed when it is dismissed.\n        * @type {Boolean}\n        */\n        _this.destroyOnDismiss = _this.option('destroyOnDismiss');\n\n        /**\n        * The root element.\n        * @type {HTMLElement|null} If this is not provided a new element will be created.\n        */\n        _this.element = _this.option('element');\n\n        if (!_this.element) {\n            _this.createRootElement();\n            _this.parent.appendChild(_this.element);\n        }\n\n        _this.element.setAttribute('data-bulma-attached', 'attached');\n\n        /**\n        * The element used to close the component.\n        * @type {HTMLElement}\n        */\n        _this.closeButton = _this.option('closeButton', _this.createCloseButton());\n\n        if (_this.body) {\n            _this.insertBody();\n        }\n\n        if (_this.color) {\n            _this.setColor();\n        }\n        return _this;\n    }\n\n    /**\n     * Create the main element.\n     * @return {undefined}\n     */\n\n\n    _createClass(DismissableComponent, [{\n        key: 'createRootElement',\n        value: function createRootElement() {\n            this.element = document.createElement('div');\n\n            this.element.classList.add(this.name);\n            this.hide();\n        }\n\n        /**\n         * Show the component.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'show',\n        value: function show() {\n            this.element.classList.remove('is-hidden');\n        }\n\n        /**\n         * Hide the component.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'hide',\n        value: function hide() {\n            this.element.classList.add('is-hidden');\n        }\n\n        /**\n         * Insert the body text into the component.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'insertBody',\n        value: function insertBody() {\n            this.element.innerHTML = this.body;\n        }\n\n        /**\n         * Create the element that will be used to close the component.\n         * @return {HTMLElement} The newly created close button\n         */\n\n    }, {\n        key: 'createCloseButton',\n        value: function createCloseButton() {\n            var closeButton = document.createElement('button');\n            closeButton.setAttribute('type', 'button');\n            closeButton.classList.add('delete');\n\n            return closeButton;\n        }\n\n        /**\n         * Create an interval to dismiss the component after the set number of ms.\n         * @param  {int} interval The time to wait before dismissing the component\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'createDismissInterval',\n        value: function createDismissInterval(interval) {\n            var _this2 = this;\n\n            return setInterval(function () {\n                _this2.handleCloseEvent();\n            }, interval);\n        }\n\n        /**\n         * Insert the close button before our content.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'prependCloseButton',\n        value: function prependCloseButton() {\n            this.element.insertBefore(this.closeButton, this.element.firstChild);\n        }\n\n        /**\n         * Setup the event listener for the close button.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'setupCloseEvent',\n        value: function setupCloseEvent() {\n            this.closeButton.addEventListener('click', this.handleCloseEvent.bind(this));\n        }\n\n        /**\n         * Handle the event when our close button is clicked.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'handleCloseEvent',\n        value: function handleCloseEvent() {\n            if (this.destroyOnDismiss) {\n                this.destroy();\n            } else {\n                this.hide();\n            }\n        }\n\n        /**\n         * Set the colour of the component.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'setColor',\n        value: function setColor() {\n            this.element.classList.add('is-' + this.color);\n        }\n\n        /**\n         * Destroy the component, removing the event listener, interval and element.\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'destroy',\n        value: function destroy() {\n            if (this.closeButton) {\n                this.closeButton.removeEventListener('click', this.handleCloseEvent.bind(this));\n            }\n\n            clearInterval(this.dismissInterval);\n\n            this.parent.removeChild(this.element);\n            this.parent = null;\n            this.element = null;\n        }\n    }]);\n\n    return DismissableComponent;\n}(_plugin2.default);\n\nexports.default = DismissableComponent;\n\n//# sourceURL=webpack://Bulma/./src/dismissableComponent.js?");

/***/ }),

/***/ "./src/plugin.js":
/*!***********************!*\
  !*** ./src/plugin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Base plugin class. Provides basic, common functionality.\n * @class Plugin\n * @since 0.7.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n */\nvar Plugin = function () {\n    _createClass(Plugin, null, [{\n        key: 'create',\n\n        /**\n         * Helper method used by the Bulma core to create a new instance.\n         * @param  {Object?} options The options object for this instance\n         * @return {Plugin|boolean} The newly created instance or false if method is not used\n         */\n        value: function create() {\n            return false;\n        }\n\n        /**\n         * Handle parsing the DOM elements.\n         * @param {HTMLElement?} element The root element for this instance\n         * @return {Plugin|boolean} The new plugin instance, or false if method is not used\n         */\n\n    }, {\n        key: 'parse',\n        value: function parse() {\n            return false;\n        }\n\n        /**\n         * Returns a string containing the element class this plugin supports.\n         * @returns {string} The class name.\n         * @throws {Error} Thrown if this method has not been replaced.\n         */\n\n    }, {\n        key: 'getRootClass',\n        value: function getRootClass() {\n            throw new Error('The getRootClass method should have been replaced by the plugin being created.');\n        }\n\n        /**\n         * Returns an object containing the default options for this plugin.\n         * @returns {object} The default options object.\n         */\n\n    }, {\n        key: 'defaultOptions',\n        value: function defaultOptions() {\n            return {};\n        }\n\n        /**\n         * Create a plugin.\n         * @param {object} options The options for this plugin\n         */\n\n    }]);\n\n    function Plugin() {\n        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n        _classCallCheck(this, Plugin);\n\n        this.options = _extends({}, this.constructor.defaultOptions(), options);\n\n        this.parent = this.option('parent', document.body);\n    }\n\n    /**\n     * Find an option by key.\n     * @param {string} key The option key to find.\n     * @param {any} defaultValue Default value if an option with key is not found.\n     * @returns {any} The value of the option we found, or defaultValue if none found.\n     */\n\n\n    _createClass(Plugin, [{\n        key: 'option',\n        value: function option(key) {\n            var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n            if (!this.options.hasOwnProperty(key) || this.options[key] === null) {\n                if (typeof defaultValue === 'function') {\n                    return defaultValue();\n                }\n\n                return defaultValue;\n            }\n\n            return this.options[key];\n        }\n    }]);\n\n    return Plugin;\n}();\n\nexports.default = Plugin;\n\n//# sourceURL=webpack://Bulma/./src/plugin.js?");

/***/ }),

/***/ "./src/plugins/notification.js":
/*!*************************************!*\
  !*** ./src/plugins/notification.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! ../core */ \"./src/core.js\");\n\nvar _core2 = _interopRequireDefault(_core);\n\nvar _dismissableComponent = __webpack_require__(/*! ../dismissableComponent */ \"./src/dismissableComponent.js\");\n\nvar _dismissableComponent2 = _interopRequireDefault(_dismissableComponent);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * @module Notification\n * @since  0.1.0\n * @author  Thomas Erbe <vizuaalog@gmail.com>\n * @extends DismissableComponent\n */\nvar Notification = function (_DismissableComponent) {\n    _inherits(Notification, _DismissableComponent);\n\n    _createClass(Notification, null, [{\n        key: 'create',\n\n        /**\n         * Helper method used by the Bulma core to create a new instance.\n         * @param  {Object} options The options object for this instance\n         * @return {Notification} The newly created instance\n         */\n        value: function create(options) {\n            return new Notification(options);\n        }\n\n        /**\n         * Handle parsing the DOMs data attribute API.\n         * @param {HTMLElement} element The root element for this instance\n         * @return {undefined}\n         */\n\n    }, {\n        key: 'parse',\n        value: function parse(element) {\n            var closeBtn = element.querySelector('.delete');\n            var dismissInterval = element.getAttribute('data-dismiss-interval');\n\n            var options = {\n                body: null,\n                parent: element.parentNode,\n                element: element,\n                closeButton: closeBtn,\n                isDismissable: !!closeBtn,\n                destroyOnDismiss: true\n            };\n\n            if (dismissInterval) {\n                options['dismissInterval'] = parseInt(dismissInterval);\n            }\n\n            new Notification(options);\n        }\n\n        /**\n         * Returns a string containing the element class this plugin supports.\n         * @returns {string} The class name.\n         * @throws {Error} Thrown if this method has not been replaced.\n         */\n\n    }, {\n        key: 'getRootClass',\n        value: function getRootClass() {\n            return 'notification';\n        }\n\n        /**\n         * Plugin constructor\n         * @param  {Object} options The options object for this plugin\n         * @return {this} The newly created instance\n         */\n\n    }]);\n\n    function Notification(options) {\n        _classCallCheck(this, Notification);\n\n        // TODO: Move this into the DismissableComponent class. Due to the required\n        // changes between different components, we may need a way to trigger this\n        // when the component is ready.\n        var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, 'notification', options));\n\n        if (_this.isDismissable) {\n            if (!options.hasOwnProperty('closeButton')) {\n                _this.prependCloseButton();\n            }\n\n            _this.setupCloseEvent();\n        }\n        return _this;\n    }\n\n    return Notification;\n}(_dismissableComponent2.default);\n\n_core2.default.registerPlugin('notification', Notification);\n\nexports.default = Notification;\n\n//# sourceURL=webpack://Bulma/./src/plugins/notification.js?");

/***/ })

/******/ })["default"];
});