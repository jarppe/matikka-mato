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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"run\": () => (/* binding */ run)\n/* harmony export */ });\nconst canvas = document.getElementById(\"canvas\");\nconst ctx = canvas.getContext(\"2d\");\nconst GAME_WIDTH = 1000, GAME_HEIGHT = GAME_WIDTH * 0.5625, WORM_WIDTH = 20, HEADING = [\n    [0, -1],\n    [+1, 0],\n    [0, +1],\n    [-1, 0],\n];\nconst scaler = (fromMax, toMax) => {\n    const r = toMax / fromMax;\n    return (x) => x * r;\n};\nconst game = {\n    width: 0,\n    height: 0,\n    scaleX: scaler(0, 0),\n    scaleY: scaler(0, 0),\n    wormWidth: 0,\n    wormLength: 100,\n    head: [700, 50],\n    heading: 1,\n    joints: [[700, 50]],\n};\nconst draw = () => {\n    ctx.clearRect(0, 0, game.width, game.height);\n    ctx.save();\n    const joints = game.joints, [x, y] = game.head;\n    ctx.lineJoin = \"round\";\n    ctx.lineCap = \"round\";\n    ctx.lineWidth = game.wormWidth;\n    ctx.strokeStyle = \"#ff00ff\";\n    ctx.beginPath();\n    ctx.moveTo(game.scaleX(joints[0][0]), game.scaleY(joints[0][1]));\n    for (let i = 1; i < joints.length; i++) {\n        ctx.lineTo(game.scaleX(joints[i][0]), game.scaleY(joints[i][1]));\n    }\n    ctx.lineTo(game.scaleX(x), game.scaleY(y));\n    ctx.stroke();\n    ctx.restore();\n};\nconst move = (ts) => {\n    const [x, y] = game.head, [dx, dy] = HEADING[game.heading], [nx, ny] = [x + dx, y + dy], reach = game.wormWidth * 0.4, joints = game.joints, wormLength = game.wormLength;\n    // let length     = 0,\n    //     jointCount = 0,\n    //     cx         = nx,\n    //     cy         = ny\n    //\n    // do {\n    //   let [x, y] = joints[jointCount]\n    //   length += Math.abs(cx - x) + Math.abs(cy - y)\n    //   cx = x\n    //   cy = y\n    //   jointCount += 1\n    // } while (length < wormLength && jointCount < joints.length)\n    //\n    // if (jointCount < joints.length) {\n    //   game.joints = joints.slice(0, jointCount - 1)\n    // }\n    game.head = [nx, ny];\n    return (nx >= reach)\n        && (nx <= GAME_WIDTH - reach)\n        && (ny >= reach)\n        && (ny <= GAME_HEIGHT - reach);\n};\nconst run = (ts) => {\n    const keepRunning = move(ts);\n    draw();\n    if (keepRunning)\n        window.requestAnimationFrame(run);\n};\nconst resize = () => {\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n    canvas.width = width;\n    canvas.height = height;\n    game.width = width;\n    game.height = height;\n    game.scaleX = scaler(GAME_WIDTH, width);\n    game.scaleY = scaler(GAME_HEIGHT, height);\n    game.wormWidth = game.scaleX(WORM_WIDTH);\n    draw();\n};\nwindow.addEventListener(\"resize\", resize);\nresize();\nconst turn = (direction) => {\n    const { head, heading, joints } = game, nextHeading = heading + direction;\n    joints.push(head);\n    game.heading = (nextHeading < 0) ? 3 : (nextHeading > 3) ? 0 : nextHeading;\n};\ndocument.addEventListener(\"keydown\", ({ code }) => {\n    if (code === \"ArrowRight\") {\n        turn(1);\n    }\n    else if (code == \"ArrowLeft\") {\n        turn(-1);\n    }\n});\nrun(0);\n\n\n//# sourceURL=webpack://matikka-mato/./src/index.ts?");

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