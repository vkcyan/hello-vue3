/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// v0.1版本订阅发布\r\n// 我们假设Dep是一个具备订阅发布功能的类,他需要具备收集依赖,触发依赖,以及修改,获取值等方法\r\n// 借助get set方法我们就实现了依赖的自动收集与触发\r\nlet currentEffect;\r\nclass Dep {\r\n  constructor(val) {\r\n    this.effects = new Set();\r\n    this._val = val;\r\n  }\r\n\r\n  get value() {\r\n    this.depend();\r\n    return this._val;\r\n  }\r\n\r\n  set value(newVal) {\r\n    this._val = newVal;\r\n    this.notice();\r\n  }\r\n\r\n  // 1. 收集依赖\r\n  depend() {\r\n    if (currentEffect) {\r\n      this.effects.add(currentEffect);\r\n    }\r\n  }\r\n  // 2. 触发依赖\r\n  notice() {\r\n    this.effects.forEach((effect) => effect());\r\n  }\r\n}\r\nconst dep = new Dep(10);\r\n\r\n// 收集依赖\r\nfunction effectWatch(effect) {\r\n  currentEffect = effect;\r\n  effect();\r\n  currentEffect = null;\r\n}\r\n\r\neffectWatch(() => {\r\n  console.log(dep.value);\r\n});\r\n\r\ndep.value = 20;\r\n\r\nconst tartgetMap = new Map(); //\r\n\r\nfunction getDep(target, key) {\r\n  let depsMap = tartgetMap.get(target);\r\n  if (!depsMap) {\r\n    depsMap = new Map();\r\n    tartgetMap.set(target, depsMap);\r\n  }\r\n  let dep = depsMap.get(key);\r\n  if (dep) {\r\n    dep = new Dep();\r\n    depsMap.set(key, dep);\r\n  }\r\n\r\n  return dep;\r\n}\r\n\r\nfunction reactive(raw) {\r\n  return new Proxy(raw, {\r\n    get(target, key) {\r\n      // console.log(target,key);\r\n      let dep = getDep(target, key);\r\n      // 收集依赖\r\n      dep.depend();\r\n      return Reflect.get(target, key);\r\n    },\r\n    set(target, key, value) {\r\n      const dep = getDep(target, key);\r\n      const result = Reflect.set(target, key, value);\r\n      dep.notice();\r\n      return result;\r\n    },\r\n  });\r\n}\r\n\r\nlet data = reactive({ age: 123 });\r\n\r\n// data.age\r\n\r\nconsole.log(123);\r\n\n\n//# sourceURL=webpack://hello-vue3/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;