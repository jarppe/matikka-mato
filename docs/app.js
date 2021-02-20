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

/***/ "./src/geom.ts":
/*!*********************!*\
  !*** ./src/geom.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"distance\": () => (/* binding */ distance),\n/* harmony export */   \"onSegment\": () => (/* binding */ onSegment),\n/* harmony export */   \"COLINEAR\": () => (/* binding */ COLINEAR),\n/* harmony export */   \"CLOCKWISE\": () => (/* binding */ CLOCKWISE),\n/* harmony export */   \"COUNTER_CLOCKWISE\": () => (/* binding */ COUNTER_CLOCKWISE),\n/* harmony export */   \"orientation\": () => (/* binding */ orientation),\n/* harmony export */   \"intersect\": () => (/* binding */ intersect)\n/* harmony export */ });\nconst distance = (line, e) => {\n    const [a, b] = line, ab = { x: b.x - a.x, y: b.y - a.y }, be = { x: e.x - b.x, y: e.y - b.y }, ae = { x: e.x - a.x, y: e.y - a.y }, ab_be = ab.x * be.x + ab.y * be.y, ab_ae = ab.x * ae.x + ab.y * ae.y;\n    if (ab_be > 0) {\n        const y = e.y - b.y, x = e.x - b.x;\n        return Math.sqrt(x * x + y * y);\n    }\n    if (ab_ae < 0) {\n        const y = e.y - a.y, x = e.x - a.x;\n        return Math.sqrt(x * x + y * y);\n    }\n    const x1 = ab.x, y1 = ab.y, x2 = ae.x, y2 = ae.y;\n    return Math.abs(x1 * y2 - y1 * x2) / Math.sqrt(x1 * x1 + y1 * y1);\n};\n// Given three colinear points a, b, c, the function checks if\n// point b lies on line segment 'a-c':\nconst onSegment = (a, b, c) => b.x <= Math.max(a.x, c.x) &&\n    b.x >= Math.min(a.x, c.x) &&\n    b.y <= Math.max(a.y, c.y) &&\n    b.y >= Math.min(a.y, c.y);\n// To find orientation of ordered triplet (a, b, c).\n// The function returns following values\n// 0 --> a, b and c are colinear\n// 1 --> Clockwise\n// 2 --> Counterclockwise\n// See https://www.geeksforgeeks.org/orientation-3-ordered-points/\nconst COLINEAR = 0, CLOCKWISE = 1, COUNTER_CLOCKWISE = 2;\nconst orientation = (a, b, c) => {\n    const val = ((b.y - a.y) * (c.x - b.x)) - ((b.x - a.x) * (c.y - b.y));\n    return (val === 0) ? COLINEAR : (val > 0) ? CLOCKWISE : COUNTER_CLOCKWISE;\n};\n// The function that returns true if line segment 'a1-a2' and 'b1-b2' intersect:\nconst intersect = (a1, a2) => (b1, b2) => {\n    const o1 = orientation(a1, a2, b1), o2 = orientation(a1, a2, b2), o3 = orientation(b1, b2, a1), o4 = orientation(b1, b2, a2);\n    // General case\n    if (o1 !== o2 && o3 !== o4)\n        return true;\n    // Special Cases:\n    // a1, a2 and b1 are colinear and b1 lies on segment a1-a2\n    if (o1 === 0 && onSegment(a1, b1, a2))\n        return true;\n    // a1, a2 and b2 are colinear and b2 lies on segment a1-a2\n    if (o2 === 0 && onSegment(a1, b2, a2))\n        return true;\n    // b1, b2 and a1 are colinear and a1 lies on segment b1-b2\n    if (o3 === 0 && onSegment(b1, a1, b2))\n        return true;\n    // b1, b2 and a2 are colinear and a2 lies on segment b1-b2\n    if (o4 === 0 && onSegment(b1, a2, b2))\n        return true;\n    return false; // Doesn't fall in any of the above cases\n};\n\n\n//# sourceURL=webpack://matikka-mato/./src/geom.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"run\": () => (/* binding */ run)\n/* harmony export */ });\n/* harmony import */ var _geom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geom */ \"./src/geom.ts\");\n\nlet DEBUG = window.location.search.indexOf(\"debug\") > 0;\nconst canvas = document.getElementById(\"canvas\");\nconst ctx = canvas.getContext(\"2d\");\nconst HEADING = [\n    { x: 0, y: -1 },\n    { x: +1, y: 0 },\n    { x: 0, y: +1 },\n    { x: -1, y: 0 },\n];\nconst game = {\n    state: \"paused\",\n    width: 0,\n    height: 0,\n    wormWidth: 0,\n    maxWormLength: 0,\n    worm: [],\n    heading: 0,\n    speed: 0,\n};\nconst initGame = () => {\n    game.state = \"run\";\n    game.maxWormLength = 300;\n    game.worm = [{ x: 200, y: 200 }, { x: 200, y: 200 }];\n    game.heading = 1;\n    game.speed = 1.5;\n};\nconst drawDebugInfo = () => {\n    const debugData = [\n        `state:    ${game.state}`,\n        `speed:    ${game.speed}`,\n        `length:   ${game.maxWormLength}`,\n        ...(game.worm.map(({ x, y }, i) => `${i === 0 ? \"worm:    \" : \"         \"} [${i}] ${x.toFixed(0)} : ${y.toFixed(0)}`)),\n    ];\n    const lineHeight = 18;\n    let y = 20;\n    ctx.save();\n    ctx.font = \"16px courier\";\n    ctx.textBaseline = \"hanging\";\n    ctx.fillStyle = \"rgba(128, 128, 128, 128)\";\n    for (let line of debugData) {\n        ctx.fillText(line, 20, y);\n        y += lineHeight;\n    }\n    ctx.restore();\n};\nconst drawWorm = () => {\n    ctx.save();\n    ctx.lineJoin = \"round\";\n    ctx.lineCap = \"round\";\n    ctx.lineWidth = game.wormWidth;\n    ctx.strokeStyle = \"#ff00ff\";\n    ctx.beginPath();\n    const worm = game.worm;\n    const head = worm[0];\n    if (head)\n        ctx.moveTo(head.x, head.y);\n    for (let i = 1; i < worm.length; i++) {\n        const { x, y } = worm[i];\n        ctx.lineTo(x, y);\n    }\n    ctx.stroke();\n    ctx.restore();\n};\nconst draw = () => {\n    ctx.clearRect(0, 0, game.width, game.height);\n    drawWorm();\n    if (DEBUG)\n        drawDebugInfo();\n};\nconst move = () => {\n    const worm = game.worm, heading = HEADING[game.heading], speed = game.speed, head = worm[0], { x, y } = head, wormWidth = game.wormWidth, reach = wormWidth / 2, maxLen = game.maxWormLength;\n    let len = 0, nx = x + (heading.x * speed), ny = y + (heading.y * speed);\n    head.x = nx;\n    head.y = ny;\n    // Hit border wall?\n    if ((nx < reach) || (nx > game.width - reach) || (ny < reach) || (ny > game.height - reach)) {\n        game.state = \"game-over\";\n        return;\n    }\n    // Run onto itself?\n    const [a1, a2] = worm, a0 = {\n        x: a1.x + (heading.x * wormWidth),\n        y: a1.y + (heading.y * wormWidth),\n    }, cross = (0,_geom__WEBPACK_IMPORTED_MODULE_0__.intersect)(a0, a2);\n    for (let i = 3; i < worm.length; i++) {\n        const b1 = worm[i - 1], b2 = worm[i];\n        if (cross(b1, b2)) {\n            game.state = \"game-over\";\n            return;\n        }\n    }\n    // Keep max-len under limit:\n    for (let i = 1; i < worm.length; i++) {\n        const last = worm[i], { x, y } = last, dx = nx - x, dy = ny - y;\n        len += Math.abs(dx) + Math.abs(dy);\n        if (len > maxLen) {\n            const over = maxLen - len;\n            if (dx !== 0)\n                last.x += over * (dx > 0 ? -1 : +1);\n            if (dy !== 0)\n                last.y += over * (dy > 0 ? -1 : +1);\n            worm.splice(i + 1);\n            break;\n        }\n        nx = x;\n        ny = y;\n    }\n};\nconst run = () => {\n    if (game.state === \"run\")\n        move();\n    draw();\n    window.requestAnimationFrame(run);\n};\nconst resize = () => {\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n    canvas.width = width;\n    canvas.height = height;\n    game.width = width;\n    game.height = height;\n    game.wormWidth = width * 0.02;\n    if (game.state !== \"run\")\n        draw();\n};\nwindow.addEventListener(\"resize\", resize);\nresize();\nconst turn = (direction) => {\n    if (game.state !== \"run\")\n        return;\n    const heading = game.heading, nextHeading = heading + direction;\n    game.heading = (nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading;\n    game.worm.unshift({ ...game.worm[0] });\n};\nconst action = {\n    \"run\": () => game.state = \"paused\",\n    \"paused\": () => game.state = \"run\",\n    \"game-over\": () => initGame(),\n};\ndocument.addEventListener(\"keydown\", ({ code }) => {\n    if (code === \"ArrowRight\") {\n        turn(1);\n    }\n    else if (code === \"ArrowLeft\") {\n        turn(-1);\n    }\n    else if (code === \"Space\") {\n        action[game.state]();\n    }\n    else if (code === \"KeyD\") {\n        DEBUG = !DEBUG;\n    }\n    else {\n        console.log(`key: ${code}`);\n    }\n});\ninitGame();\nrun();\n\n\n//# sourceURL=webpack://matikka-mato/./src/index.ts?");

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