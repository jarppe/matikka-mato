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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"run\": () => (/* binding */ run)\n/* harmony export */ });\nlet DEBUG = window.location.search.indexOf(\"debug\") > 0;\nconst canvas = document.getElementById(\"canvas\");\nconst ctx = canvas.getContext(\"2d\");\nconst GAME_WIDTH = 1000, GAME_HEIGHT = GAME_WIDTH * 0.5625, WORM_WIDTH = 20, HEADING = [\n    { x: 0, y: -1 },\n    { x: +1, y: 0 },\n    { x: 0, y: +1 },\n    { x: -1, y: 0 },\n];\nconst scaler = (fromMax, toMax) => {\n    const r = toMax / fromMax;\n    return (x) => x * r;\n};\nconst game = {\n    state: \"paused\",\n    width: 0,\n    height: 0,\n    wormWidth: 0,\n    maxWormLength: 0,\n    scaleX: scaler(0, 0),\n    scaleY: scaler(0, 0),\n    worm: [],\n    heading: 0,\n};\nconst initGame = () => {\n    game.state = \"run\";\n    game.maxWormLength = 100;\n    game.worm = [{ x: 200, y: 200 }, { x: 200, y: 200 }];\n    game.heading = 1;\n};\nconst drawDebugInfo = () => {\n    const debugData = [\n        `state:    ${game.state}`,\n        ...(game.worm.map(({ x, y }, i) => `${i === 0 ? \"worm:    \" : \"         \"} [${i}] ${x.toFixed(0)} : ${y.toFixed(0)}`)),\n    ];\n    const lineHeight = 18;\n    let y = 20;\n    ctx.save();\n    ctx.font = \"16px courier\";\n    ctx.textBaseline = \"hanging\";\n    ctx.fillStyle = \"rgba(128, 128, 128, 128)\";\n    for (let line of debugData) {\n        ctx.fillText(line, 20, y);\n        y += lineHeight;\n    }\n    ctx.restore();\n};\nconst draw = () => {\n    ctx.clearRect(0, 0, game.width, game.height);\n    ctx.save();\n    ctx.lineJoin = \"round\";\n    ctx.lineCap = \"round\";\n    ctx.lineWidth = game.wormWidth;\n    ctx.strokeStyle = \"#ff00ff\";\n    ctx.beginPath();\n    const worm = game.worm;\n    const head = worm[0];\n    if (head)\n        ctx.moveTo(game.scaleX(head.x), game.scaleX(head.y));\n    for (let i = 1; i < worm.length; i++) {\n        const { x, y } = worm[i];\n        ctx.lineTo(game.scaleX(x), game.scaleY(y));\n    }\n    ctx.stroke();\n    if (DEBUG)\n        drawDebugInfo();\n    ctx.restore();\n};\nconst move = () => {\n    const worm = game.worm, heading = HEADING[game.heading], head = worm[0], { x, y } = head, reach = game.wormWidth * 0.4, maxLen = game.maxWormLength;\n    let len = 0, nx = x + heading.x, ny = y + heading.y;\n    head.x = nx;\n    head.y = ny;\n    if ((nx < reach) || (nx > GAME_WIDTH - reach) || (ny < reach) || (ny > GAME_HEIGHT - reach)) {\n        game.state = \"end\";\n        return;\n    }\n    for (let i = 1; i < worm.length; i++) {\n        const last = worm[i], { x, y } = last, dx = nx - x, dy = ny - y;\n        len += Math.abs(dx) + Math.abs(dy);\n        if (len > maxLen) {\n            const over = maxLen - len;\n            if (dx !== 0)\n                last.x += over * (dx > 0 ? -1 : +1);\n            if (dy !== 0)\n                last.y += over * (dy > 0 ? -1 : +1);\n            worm.splice(i + 1);\n            break;\n        }\n        nx = x;\n        ny = y;\n    }\n};\nconst run = () => {\n    if (game.state === \"run\")\n        move();\n    draw();\n    window.requestAnimationFrame(run);\n};\nconst resize = () => {\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n    canvas.width = width;\n    canvas.height = height;\n    game.width = width;\n    game.height = height;\n    game.scaleX = scaler(GAME_WIDTH, width);\n    game.scaleY = scaler(GAME_HEIGHT, height);\n    game.wormWidth = game.scaleX(WORM_WIDTH);\n    if (game.state !== \"run\")\n        draw();\n};\nwindow.addEventListener(\"resize\", resize);\nresize();\nconst turn = (direction) => {\n    if (game.state !== \"run\")\n        return;\n    const heading = game.heading, nextHeading = heading + direction;\n    game.heading = (nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading;\n    game.worm.unshift({ ...game.worm[0] });\n};\nconst action = {\n    \"run\": () => game.state = \"paused\",\n    \"paused\": () => game.state = \"run\",\n    \"end\": () => initGame(),\n};\ndocument.addEventListener(\"keydown\", ({ code }) => {\n    if (code === \"ArrowRight\") {\n        turn(1);\n    }\n    else if (code === \"ArrowLeft\") {\n        turn(-1);\n    }\n    else if (code === \"Space\") {\n        action[game.state]();\n    }\n    else if (code === \"KeyD\") {\n        DEBUG = !DEBUG;\n    }\n    else {\n        console.log(`key: ${code}`);\n    }\n});\ninitGame();\nrun();\n\n\n//# sourceURL=webpack://matikka-mato/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;