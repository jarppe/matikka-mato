/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/draw.ts":
/*!*********************!*\
  !*** ./src/draw.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"draw\": () => (/* binding */ draw)\n/* harmony export */ });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/state.ts\");\nvar __spreadArrays = (undefined && undefined.__spreadArrays) || function () {\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\n            r[k] = a[j];\n    return r;\n};\n\nvar drawDebugInfo = function () {\n    var debugData = __spreadArrays([\n        \"state:    \" + _state__WEBPACK_IMPORTED_MODULE_0__.game.state,\n        \"speed:    \" + _state__WEBPACK_IMPORTED_MODULE_0__.game.speed,\n        \"length:   \" + _state__WEBPACK_IMPORTED_MODULE_0__.game.maxWormLength,\n        \"worm-w:   \" + _state__WEBPACK_IMPORTED_MODULE_0__.game.wormWidth.toFixed(1)\n    ], (_state__WEBPACK_IMPORTED_MODULE_0__.game.worm.map(function (_a, i) {\n        var x = _a.x, y = _a.y;\n        return (i === 0 ? \"worm:    \" : \"         \") + \" [\" + i + \"] \" + x.toFixed(0) + \" : \" + y.toFixed(0);\n    })));\n    var lineHeight = 18;\n    var y = 20;\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.save();\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.font = \"16px courier\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.textBaseline = \"hanging\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"rgba(128, 128, 128, 128)\";\n    for (var _i = 0, debugData_1 = debugData; _i < debugData_1.length; _i++) {\n        var line = debugData_1[_i];\n        _state__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(line, 20, y);\n        y += lineHeight;\n    }\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.restore();\n};\nvar drawWorm = function () {\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.save();\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.lineJoin = \"round\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.lineCap = \"round\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.lineWidth = _state__WEBPACK_IMPORTED_MODULE_0__.game.wormWidth;\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.strokeStyle = _state__WEBPACK_IMPORTED_MODULE_0__.game.state === \"run\" ? \"#ff00ff\" : \"#770077\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\n    var worm = _state__WEBPACK_IMPORTED_MODULE_0__.game.worm;\n    var head = worm[0];\n    if (head)\n        _state__WEBPACK_IMPORTED_MODULE_0__.ctx.moveTo(head.x, head.y);\n    for (var i = 1; i < worm.length; i++) {\n        var _a = worm[i], x = _a.x, y = _a.y;\n        _state__WEBPACK_IMPORTED_MODULE_0__.ctx.lineTo(x, y);\n    }\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.stroke();\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.restore();\n};\nvar PI2 = 2.0 * Math.PI;\nvar drawTest = function () {\n    var test = _state__WEBPACK_IMPORTED_MODULE_0__.game.test, wormWidth = _state__WEBPACK_IMPORTED_MODULE_0__.game.wormWidth;\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.save();\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.font = (wormWidth * 0.6).toFixed(1) + \"px PressStart\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.textBaseline = \"middle\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = _state__WEBPACK_IMPORTED_MODULE_0__.game.state === \"run\" ? \"#ffffff\" : \"#777777\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.strokeStyle = _state__WEBPACK_IMPORTED_MODULE_0__.game.state === \"run\" ? \"#ffffff\" : \"#777777\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.lineWidth = 2;\n    test.options.forEach(function (_a) {\n        var name = _a.name, _b = _a.position, x = _b.x, y = _b.y;\n        var offX = _state__WEBPACK_IMPORTED_MODULE_0__.ctx.measureText(name).width / 2.0;\n        _state__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(name, x - offX, y);\n        _state__WEBPACK_IMPORTED_MODULE_0__.ctx.beginPath();\n        _state__WEBPACK_IMPORTED_MODULE_0__.ctx.arc(x, y, _state__WEBPACK_IMPORTED_MODULE_0__.game.wormWidth, 0, PI2, false);\n        _state__WEBPACK_IMPORTED_MODULE_0__.ctx.stroke();\n    });\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.restore();\n};\nvar drawState = function (stateText) {\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.save();\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.font = \"32px PressStart\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.textBaseline = \"hanging\";\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.fillStyle = \"rgba(192, 192, 192, 192)\";\n    var textWidth = _state__WEBPACK_IMPORTED_MODULE_0__.ctx.measureText(stateText).width;\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.fillText(stateText, (_state__WEBPACK_IMPORTED_MODULE_0__.game.width - textWidth) / 2, _state__WEBPACK_IMPORTED_MODULE_0__.game.height / 2);\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.restore();\n};\nvar draw = function () {\n    var width = _state__WEBPACK_IMPORTED_MODULE_0__.game.width, height = _state__WEBPACK_IMPORTED_MODULE_0__.game.height, state = _state__WEBPACK_IMPORTED_MODULE_0__.game.state;\n    _state__WEBPACK_IMPORTED_MODULE_0__.ctx.clearRect(0, 0, width, height);\n    drawWorm();\n    switch (state) {\n        case \"run\":\n            drawTest();\n            break;\n        case \"paused\":\n            drawState(\"paused\");\n            break;\n        case \"game-over\":\n            drawState(\"game over\");\n            break;\n    }\n    if ((0,_state__WEBPACK_IMPORTED_MODULE_0__.isDebug)())\n        drawDebugInfo();\n};\n\n\n//# sourceURL=webpack://matikka-mato/./src/draw.ts?");

/***/ }),

/***/ "./src/geom.ts":
/*!*********************!*\
  !*** ./src/geom.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"distancer\": () => (/* binding */ distancer),\n/* harmony export */   \"distanceToLine\": () => (/* binding */ distanceToLine),\n/* harmony export */   \"onSegment\": () => (/* binding */ onSegment),\n/* harmony export */   \"COLINEAR\": () => (/* binding */ COLINEAR),\n/* harmony export */   \"CLOCKWISE\": () => (/* binding */ CLOCKWISE),\n/* harmony export */   \"COUNTER_CLOCKWISE\": () => (/* binding */ COUNTER_CLOCKWISE),\n/* harmony export */   \"orientation\": () => (/* binding */ orientation),\n/* harmony export */   \"intersect\": () => (/* binding */ intersect)\n/* harmony export */ });\nvar distancer = function (_a) {\n    var ax = _a.x, ay = _a.y;\n    return function (_a) {\n        var bx = _a.x, by = _a.y;\n        var dx = ax - bx, dy = ay - by;\n        return Math.sqrt((dx * dx) + (dy * dy));\n    };\n};\nvar distanceToLine = function (line, e) {\n    var a = line[0], b = line[1], ab = { x: b.x - a.x, y: b.y - a.y }, be = { x: e.x - b.x, y: e.y - b.y }, ae = { x: e.x - a.x, y: e.y - a.y }, ab_be = ab.x * be.x + ab.y * be.y, ab_ae = ab.x * ae.x + ab.y * ae.y;\n    if (ab_be > 0) {\n        var y = e.y - b.y, x = e.x - b.x;\n        return Math.sqrt(x * x + y * y);\n    }\n    if (ab_ae < 0) {\n        var y = e.y - a.y, x = e.x - a.x;\n        return Math.sqrt(x * x + y * y);\n    }\n    var x1 = ab.x, y1 = ab.y, x2 = ae.x, y2 = ae.y;\n    return Math.abs(x1 * y2 - y1 * x2) / Math.sqrt(x1 * x1 + y1 * y1);\n};\n// Given three colinear points a, b, c, the function checks if\n// point b lies on line segment 'a-c':\nvar onSegment = function (a, b, c) {\n    return b.x <= Math.max(a.x, c.x) &&\n        b.x >= Math.min(a.x, c.x) &&\n        b.y <= Math.max(a.y, c.y) &&\n        b.y >= Math.min(a.y, c.y);\n};\n// To find orientation of ordered triplet (a, b, c).\n// The function returns following values\n// 0 --> a, b and c are colinear\n// 1 --> Clockwise\n// 2 --> Counterclockwise\n// See https://www.geeksforgeeks.org/orientation-3-ordered-points/\nvar COLINEAR = 0, CLOCKWISE = 1, COUNTER_CLOCKWISE = 2;\nvar orientation = function (a, b, c) {\n    var val = ((b.y - a.y) * (c.x - b.x)) - ((b.x - a.x) * (c.y - b.y));\n    return (val === 0) ? COLINEAR : (val > 0) ? CLOCKWISE : COUNTER_CLOCKWISE;\n};\n// The function that returns true if line segment 'a1-a2' and 'b1-b2' intersect:\nvar intersect = function (a1, a2) { return function (b1, b2) {\n    var o1 = orientation(a1, a2, b1), o2 = orientation(a1, a2, b2), o3 = orientation(b1, b2, a1), o4 = orientation(b1, b2, a2);\n    // General case\n    if (o1 !== o2 && o3 !== o4)\n        return true;\n    // Special Cases:\n    // a1, a2 and b1 are colinear and b1 lies on segment a1-a2\n    if (o1 === 0 && onSegment(a1, b1, a2))\n        return true;\n    // a1, a2 and b2 are colinear and b2 lies on segment a1-a2\n    if (o2 === 0 && onSegment(a1, b2, a2))\n        return true;\n    // b1, b2 and a1 are colinear and a1 lies on segment b1-b2\n    if (o3 === 0 && onSegment(b1, a1, b2))\n        return true;\n    // b1, b2 and a2 are colinear and a2 lies on segment b1-b2\n    if (o4 === 0 && onSegment(b1, a2, b2))\n        return true;\n    return false; // Doesn't fall in any of the above cases\n}; };\n\n\n//# sourceURL=webpack://matikka-mato/./src/geom.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \"./src/test.ts\");\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ \"./src/state.ts\");\n/* harmony import */ var _draw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./draw */ \"./src/draw.ts\");\n/* harmony import */ var _move__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./move */ \"./src/move.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\n\n\n\nvar initGame = function () {\n    var x = _state__WEBPACK_IMPORTED_MODULE_1__.game.width * 0.5, y = _state__WEBPACK_IMPORTED_MODULE_1__.game.height * 0.5;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.state = \"run\";\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.maxWormLength = 300;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.worm = [{ x: x, y: y }, { x: x, y: y }];\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.heading = 0;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.speed = 1.5;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.test = _test__WEBPACK_IMPORTED_MODULE_0__.makeTest(Date.now());\n};\nvar applyDirection = function (heading, direction) {\n    var nextHeading = heading + direction;\n    return ((nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading);\n};\nvar turn = function (direction) {\n    if (_state__WEBPACK_IMPORTED_MODULE_1__.game.state !== \"run\")\n        return;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.heading = applyDirection(_state__WEBPACK_IMPORTED_MODULE_1__.game.heading, direction);\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.worm.unshift(__assign({}, _state__WEBPACK_IMPORTED_MODULE_1__.game.worm[0]));\n};\nvar action = {\n    \"run\": function () { return _state__WEBPACK_IMPORTED_MODULE_1__.game.state = \"paused\"; },\n    \"paused\": function () { return _state__WEBPACK_IMPORTED_MODULE_1__.game.state = \"run\"; },\n    \"game-over\": function () { return initGame(); },\n};\nvar TURN_LEFT = -1, TURN_RIGHT = 1;\ndocument.addEventListener(\"keydown\", function (_a) {\n    var code = _a.code;\n    switch (code) {\n        case \"ArrowRight\":\n            return turn(TURN_RIGHT);\n        case \"ArrowLeft\":\n            return turn(TURN_LEFT);\n        case \"Space\":\n            return action[_state__WEBPACK_IMPORTED_MODULE_1__.game.state]();\n        case \"KeyD\":\n            return (0,_state__WEBPACK_IMPORTED_MODULE_1__.toggleDebug)();\n        default:\n            console.log(\"key: \" + code);\n    }\n});\nvar resize = function () {\n    var width = _state__WEBPACK_IMPORTED_MODULE_1__.canvas.clientWidth;\n    var height = _state__WEBPACK_IMPORTED_MODULE_1__.canvas.clientHeight;\n    _state__WEBPACK_IMPORTED_MODULE_1__.canvas.width = width;\n    _state__WEBPACK_IMPORTED_MODULE_1__.canvas.height = height;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.width = width;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.height = height;\n    _state__WEBPACK_IMPORTED_MODULE_1__.game.wormWidth = width * 0.02;\n    if (_state__WEBPACK_IMPORTED_MODULE_1__.game.state !== \"run\")\n        (0,_draw__WEBPACK_IMPORTED_MODULE_2__.draw)();\n};\nwindow.addEventListener(\"resize\", resize);\nresize();\nvar run = function (ts) {\n    if (_state__WEBPACK_IMPORTED_MODULE_1__.game.state === \"run\")\n        (0,_move__WEBPACK_IMPORTED_MODULE_3__.move)(ts);\n    (0,_draw__WEBPACK_IMPORTED_MODULE_2__.draw)();\n    window.requestAnimationFrame(run);\n};\ninitGame();\nrun(Date.now());\n\n\n//# sourceURL=webpack://matikka-mato/./src/index.ts?");

/***/ }),

/***/ "./src/move.ts":
/*!*********************!*\
  !*** ./src/move.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"move\": () => (/* binding */ move)\n/* harmony export */ });\n/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ \"./src/state.ts\");\n/* harmony import */ var _sounds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sounds */ \"./src/sounds.ts\");\n/* harmony import */ var _geom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./geom */ \"./src/geom.ts\");\n\n\n\nvar moveWorm = function () {\n    var worm = _state__WEBPACK_IMPORTED_MODULE_0__.game.worm, heading = _state__WEBPACK_IMPORTED_MODULE_0__.HEADING[_state__WEBPACK_IMPORTED_MODULE_0__.game.heading], speed = _state__WEBPACK_IMPORTED_MODULE_0__.game.speed, head = worm[0], x = head.x, y = head.y, wormWidth = _state__WEBPACK_IMPORTED_MODULE_0__.game.wormWidth, reach = wormWidth / 2, maxLen = _state__WEBPACK_IMPORTED_MODULE_0__.game.maxWormLength;\n    var len = 0, nx = x + (heading.x * speed), ny = y + (heading.y * speed);\n    head.x = nx;\n    head.y = ny;\n    // Hit border wall?\n    if ((nx < reach) || (nx > _state__WEBPACK_IMPORTED_MODULE_0__.game.width - reach) || (ny < reach) || (ny > _state__WEBPACK_IMPORTED_MODULE_0__.game.height - reach)) {\n        _sounds__WEBPACK_IMPORTED_MODULE_1__.crash();\n        _state__WEBPACK_IMPORTED_MODULE_0__.game.state = \"game-over\";\n        return;\n    }\n    // Run onto itself?\n    var a1 = worm[0], a2 = worm[1], a0 = {\n        x: a1.x + (heading.x * wormWidth),\n        y: a1.y + (heading.y * wormWidth),\n    }, cross = (0,_geom__WEBPACK_IMPORTED_MODULE_2__.intersect)(a0, a2);\n    for (var i = 3; i < worm.length; i++) {\n        var b1 = worm[i - 1], b2 = worm[i];\n        if (cross(b1, b2)) {\n            _sounds__WEBPACK_IMPORTED_MODULE_1__.crash();\n            _state__WEBPACK_IMPORTED_MODULE_0__.game.state = \"game-over\";\n            return;\n        }\n    }\n    // Keep max-len under limit:\n    for (var i = 1; i < worm.length; i++) {\n        var last = worm[i], x_1 = last.x, y_1 = last.y, dx = nx - x_1, dy = ny - y_1;\n        len += Math.abs(dx) + Math.abs(dy);\n        if (len > maxLen) {\n            var over = maxLen - len;\n            if (dx !== 0)\n                last.x += over * (dx > 0 ? -1 : +1);\n            if (dy !== 0)\n                last.y += over * (dy > 0 ? -1 : +1);\n            worm.splice(i + 1);\n            break;\n        }\n        nx = x_1;\n        ny = y_1;\n    }\n};\nvar checkTest = function () {\n    var wormWidth = _state__WEBPACK_IMPORTED_MODULE_0__.game.wormWidth, test = _state__WEBPACK_IMPORTED_MODULE_0__.game.test, worm = _state__WEBPACK_IMPORTED_MODULE_0__.game.worm, options = test.options, dist = (0,_geom__WEBPACK_IMPORTED_MODULE_2__.distancer)(worm[0]), optIndex = options.findIndex(function (_a) {\n        var position = _a.position;\n        return dist(position) < wormWidth;\n    }), opt = options[optIndex];\n    if (opt) {\n        if (opt.correct) {\n            console.log(\"CORRECT\", optIndex, opt.name);\n            _sounds__WEBPACK_IMPORTED_MODULE_1__.chaching();\n        }\n        else {\n            console.log(\"WRONG\", optIndex, opt.name);\n            _sounds__WEBPACK_IMPORTED_MODULE_1__.squeak();\n        }\n    }\n};\nvar move = function (ts) {\n    moveWorm();\n    checkTest();\n};\n\n\n//# sourceURL=webpack://matikka-mato/./src/move.ts?");

/***/ }),

/***/ "./src/sounds.ts":
/*!***********************!*\
  !*** ./src/sounds.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"crash\": () => (/* binding */ crash),\n/* harmony export */   \"squeak\": () => (/* binding */ squeak),\n/* harmony export */   \"chaching\": () => (/* binding */ chaching)\n/* harmony export */ });\nvar play = function (name) {\n    var audio = new Audio(\"sounds/\" + name + \".mp3\");\n    return function () { audio.play().catch(function (err) { return console.error(err); }); };\n};\nvar crash = play(\"crash\");\nvar squeak = play(\"squeak\");\nvar chaching = play(\"chaching\");\n\n\n//# sourceURL=webpack://matikka-mato/./src/sounds.ts?");

/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isDebug\": () => (/* binding */ isDebug),\n/* harmony export */   \"toggleDebug\": () => (/* binding */ toggleDebug),\n/* harmony export */   \"canvas\": () => (/* binding */ canvas),\n/* harmony export */   \"ctx\": () => (/* binding */ ctx),\n/* harmony export */   \"HEADING\": () => (/* binding */ HEADING),\n/* harmony export */   \"game\": () => (/* binding */ game)\n/* harmony export */ });\n/* harmony import */ var _test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./test */ \"./src/test.ts\");\n\nvar debug = window.location.search.indexOf(\"debug\") > 0;\nvar isDebug = function () { return debug; };\nvar toggleDebug = function () { return debug = !debug; };\nvar canvas = document.getElementById(\"canvas\");\nvar ctx = canvas.getContext(\"2d\");\nvar HEADING = [\n    { x: 0, y: -1 },\n    { x: +1, y: 0 },\n    { x: 0, y: +1 },\n    { x: -1, y: 0 },\n];\nvar game = {\n    state: \"paused\",\n    width: 0,\n    height: 0,\n    wormWidth: 0,\n    maxWormLength: 0,\n    worm: [],\n    heading: 0,\n    speed: 0,\n    test: _test__WEBPACK_IMPORTED_MODULE_0__.makeTest(0),\n};\n\n\n//# sourceURL=webpack://matikka-mato/./src/state.ts?");

/***/ }),

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"makeTest\": () => (/* binding */ makeTest)\n/* harmony export */ });\n// export type Option = {\n//   name: string\n//   correct: boolean\n//   position: Point\n// }\n//\n// export type Test = {\n//   question: string\n//   answer: string\n//   started: number\n//   timeout: number\n//   options: {\n//     [key: string]: Option\n//   }\n// }\nvar makeTest = function (now) {\n    return {\n        question: \"1 + 3\",\n        answer: \"4\",\n        started: now,\n        timeout: now + 30000,\n        options: [\n            {\n                name: \"4\",\n                correct: true,\n                position: { x: 500, y: 500 }\n            },\n            {\n                name: \"25\",\n                correct: false,\n                position: { x: 600, y: 600 }\n            }\n        ]\n    };\n};\n\n\n//# sourceURL=webpack://matikka-mato/./src/test.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;