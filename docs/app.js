(()=>{"use strict";var t="true"===new URLSearchParams(window.location.search).get("debug"),e=document.getElementById("canvas"),n=e.getContext("2d"),r="ontouchstart"in document.documentElement,a=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}],o={state:"paused",width:0,height:0,wormWidth:0,maxWormLength:0,worm:[],heading:0,speed:0,test:null,points:0,level:0,tick:0},i={x:0,y:0,r:0,dx:0,dy:0,selected:null,tx:null,ty:null},s=function(t){var e=t.x,n=t.y;return function(t){var r=t.x,a=t.y,o=e-r,i=n-a;return Math.sqrt(o*o+i*i)}},l=function(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)},u=function(t,e,n){var r=(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y);return 0===r?0:r>0?1:2},c=function(){var t,e,n,r,a,i,l,u,c=[],f=3+Math.round(3*Math.random()),h=(e=o.width,n=o.height,r=o.worm,a=o.wormWidth,i=3*a,l=[r[0]],u=function(t){var e=s(t);return l.every((function(t){return e(t)>i}))},function(){for(;;){var t={x:Math.random()*(e-4*a)+2*a,y:Math.random()*(n-4*a)+2*a};if(u(t))return l.push(t),t}}),d=1+Math.floor(5*Math.random()),v=1+Math.floor(5*Math.random()),m=d+v,x=(t=m,function(){for(;;){var e=1+Math.floor(10*Math.random());if(e!==t)return e}});c.push({name:m.toString(10),correct:!0,position:h()});for(var g=0;g<f;g++)c.push({name:x().toString(10),correct:!1,position:h()});return{question:d+" + "+v,answer:""+m,created:o.tick,options:c}},f=Math.PI,h=2*f,d=.5*f,v=.25*f,m=function(t,e,r){return n.fillText(r,t-.5*function(t){return n.measureText(t).width}(r),e)},x=function(){var t=o.wormWidth,e=o.points;n.save(),n.font=(1.2*t).toFixed(1)+"px PressStart",n.textBaseline="middle",n.fillStyle="run"===o.state?"#50ff50":"#207720",n.fillText("points: "+e,t,t),n.restore()},g=function(){var t=i.r,e=i.x,r=i.y,a=i.selected,s="rgba(255, 255, 255, 0.05)",l="rgba(255, 255, 255, 0.1)";n.save(),n.translate(e,r);for(var u=0;u<4;u++)n.fillStyle=u===a?"rgba(255, 255, 255, 0.7)":s,n.strokeStyle=u===a?"rgba(255, 255, 255, 1)":l,n.beginPath(),n.arc(0,0,t,f+v,h-v,!1),n.arc(0,0,.4*t,h-v,f+v,!0),n.closePath(),n.fill(),n.stroke(),n.rotate(d);n.scale(.4*t,.4*t),n.fillStyle=s,n.strokeStyle=l,"run"===o.state?(n.fillRect(-.3,-.6,.2,1.2),n.fillRect(.1,-.6,.2,1.2)):(n.beginPath(),n.moveTo(-.3,-.5),n.lineTo(.6,0),n.lineTo(-.3,.5),n.closePath(),n.fill()),n.restore()},p=function(e){var a=o.width,i=o.height,s=o.state;switch(n.clearRect(0,0,a,i),s){case"new":r?(function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.6*o.wormWidth,i=o.height/2-6*a;n.save(),n.textBaseline="hanging",n.font="32px PressStart",n.fillStyle="rgba(127, 255, 127, "+e+")",m(r,i,"Matikka-Mato"),i+=a,i+=a,i+=a,n.fillStyle="rgb(127, 255, 212)",n.font="16px PressStart",m(r,i,"ohjaa matoa oikean vastauksen luo"),m(r,i+=a,"älä törmaa seinään äläkä matoon"),i+=a,m(r,i+=a,"ohjaa matoa ohjaus näppäimillä"),m(r,i+=a,"aloita välilyönnillä"),n.restore()}(e),r&&g()):function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.6*o.wormWidth,i=o.height/2-6*a;n.save(),n.textBaseline="hanging",n.font="32px PressStart",n.fillStyle="rgba(127, 255, 127, "+e+")",m(r,i,"Matikka-Mato"),i+=a,i+=a,i+=a,n.fillStyle="rgb(127, 255, 212)",n.font="16px PressStart",m(r,i,"ohjaa matoa oikean vastauksen luo"),m(r,i+=a,"älä törmaa seinään äläkä matoon"),m(r,i+=a,"mato kääntyy nuoli-näppäimillä"),m(r,i+=a,"välilyönti aloittaa ja lopettaa tauon"),i+=a,m(r,i+=a,"aloita peli välilyönnillä"),n.restore()}(e);break;case"run":!function(){n.save(),n.lineJoin="round",n.lineCap="round",n.lineWidth=o.wormWidth,n.strokeStyle="run"===o.state?"#ff00ff":"#770077",n.beginPath();var t=o.worm,e=t[0];e&&n.moveTo(e.x,e.y);for(var r=1;r<t.length;r++){var a=t[r],i=a.x,s=a.y;n.lineTo(i,s)}n.stroke(),n.restore()}(),x(),function(){var t=o.test,e=o.wormWidth,r=o.width;t&&(n.save(),n.font=(1.2*e).toFixed(1)+"px PressStart",n.textBaseline="middle",n.fillStyle="run"===o.state?"#ffffff":"#777777",m(.5*r,e,t.question),n.font=(.8*e).toFixed(1)+"px sans-serif",n.fillStyle="run"===o.state?"#ffffff":"#777777",n.strokeStyle="run"===o.state?"#ffffff":"#777777",n.lineWidth=2,t.options.forEach((function(t){var e=t.name,r=t.position,a=r.x,i=r.y,s=.5*n.measureText(e).width;n.fillText(e,a-s,i),n.beginPath(),n.arc(a,i,o.wormWidth,0,h,!1),n.stroke()})),n.restore())}(),r&&g();break;case"paused":x(),function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.6*o.wormWidth,i=o.height/2-2*a;n.save(),n.font="32px PressStart",n.textBaseline="hanging",n.fillStyle="rgba(255, 255, 255, "+e+")",m(r,i,"paused"),i+=a,i+=a,n.font="26px PressStart",m(r,i,"press space or click"),m(r,i+=a,"to continue"),n.restore()}(e),r&&g();break;case"game-over":!function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.8*o.wormWidth,i=o.height/2-4*a;n.save(),n.font="32px PressStart",n.textBaseline="hanging",n.fillStyle="rgba(127, 255, 127, "+e+")",m(r,i,"game over"),i+=a,i+=a,n.fillStyle="rgba(127, 255, 212, "+e+")",n.font="48px PressStart",m(r,i,"score "+o.points),i+=a,i+=a,n.fillStyle="rgba(127, 255, 127, "+e+")",n.font="26px PressStart",m(r,i,"press space or click"),m(r,i+=a,"for new game"),n.restore()}(e)}t&&function(){var t=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),a=0;for(e=0;e<n;e++)for(var o=arguments[e],i=0,s=o.length;i<s;i++,a++)r[a]=o[i];return r}(["state:    "+o.state,"speed:    "+o.speed.toFixed(3),"mobile:   "+r,"scale:    "+o.wormWidth.toFixed(1),"screen:   "+o.width+" x "+o.height,"test-age: "+((o.test?o.tick-o.test.created:0)/1e3).toFixed(1),"length:   "+o.maxWormLength.toFixed(1)],o.worm.map((function(t,e){var n=t.x,r=t.y;return(0===e?"worm:    ":"         ")+" ["+e+"] "+n.toFixed(0)+" : "+r.toFixed(0)}))),e=40;n.save(),n.font="16px courier",n.textBaseline="hanging",n.fillStyle="rgba(128, 128, 128, 128)";for(var a=0,i=t;a<i.length;a++){var s=i[a];n.fillText(s,20,e),e+=18}n.restore()}()},y="false"!==new URLSearchParams(window.location.search).get("sound")?function(t){var e=new Audio("sounds/"+t+".mp3");return function(){e.play().catch((function(t){return console.error(t)}))}}:function(t){return function(){console.log("play:",t)}},w=y("crash"),b=y("squeak"),k=y("chaching"),S=function(){return(S=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},M=function(){var t=.5*o.width,e=.5*o.height;o.state="new",o.maxWormLength=300,o.worm=[{x:t,y:e},{x:t,y:e}],o.heading=0,o.speed=o.width/1200*.07,o.test=c(),o.points=0,o.level=0,o.tick=0},P=[[0,1,0,3],[0,1,2,1],[2,1,2,3],[0,3,2,3]],W=function(t){var e=o.state,n=o.heading;if("run"===e){var r=P[n][t];r!==n&&(o.heading=r,o.worm.unshift(S({},o.worm[0])))}},L=function(){o.tick=0,o.state="run"},E=function(){o.state="paused"},F={new:L,run:E,paused:L,"game-over":M};document.addEventListener("keydown",(function(e){var n=e.code,r=e.repeat;if(!r)switch(n){case"ArrowUp":return W(0);case"ArrowRight":return W(1);case"ArrowDown":return W(2);case"ArrowLeft":return W(3);case"Space":return F[o.state]();case"Escape":return M();case"KeyD":return t=!t;default:console.log("key: "+n+" ("+r+")")}}));var T={new:L,run:E,paused:L,"game-over":M},B=function(t,e){var n=i.x,r=i.y,a=i.r,s=i.dx,l=i.dy,u=t-n-s,c=e-r-l,f=.2*a;return Math.abs(u)>a||Math.abs(c)>a?(i.tx=null,i.ty=null,void(i.selected=null)):(i.tx=t-s,i.ty=e-l,Math.abs(c)<f&&Math.abs(u)<f?(i.selected=null,void T[o.state]()):(Math.abs(c)<Math.abs(u)?i.selected=u<0?3:1:i.selected=c<0?0:2,void W(i.selected)))},A=function(t){t.preventDefault(),t.stopPropagation();var e=t.touches[0],n=null==e?void 0:e.clientX,r=null==e?void 0:e.clientY;n&&r&&B(n,r)},j=function(t){t.preventDefault(),t.stopPropagation(),i.tx=null,i.ty=null,i.selected=null};e.addEventListener("touchstart",A),e.addEventListener("touchmove",A),e.addEventListener("touchend",j),e.addEventListener("mousedown",(function(t){t.preventDefault(),B(t.clientX,t.clientY)})),e.addEventListener("mouseup",j),e.addEventListener("mouseout",j),e.addEventListener("mouseleave",j);var R=function(){var t=e.clientWidth,n=e.clientHeight,r=e.getBoundingClientRect(),a=.02*t;e.width=t,e.height=n,o.width=t,o.height=n,o.wormWidth=a,i.r=.2*n,i.x=t-i.r-a,i.y=n-i.r-a,i.dx=r.left+4,i.dy=r.top+4,i.selected=null};window.addEventListener("resize",R),R();var q=function(t){0===o.tick&&(o.tick=t),"run"===o.state&&function(t){var e=t-o.tick;o.tick=t,function(t){var e=o.worm,n=a[o.heading],r=o.speed,i=e[0],s=i.x,c=i.y,f=o.wormWidth,h=f/2,d=o.maxWormLength,v=0,m=s+n.x*r*t,x=c+n.y*r*t;if(i.x=m,i.y=x,m<h||m>o.width-h||x<h||x>o.height-h)return w(),void(o.state="game-over");for(var g=e[0],p=e[1],y=function(t,e){return function(n,r){var a=u(t,e,n),o=u(t,e,r),i=u(n,r,t),s=u(n,r,e);return a!==o&&i!==s||!(0!==a||!l(t,n,e))||!(0!==o||!l(t,r,e))||!(0!==i||!l(n,t,r))||!(0!==s||!l(n,e,r))}}({x:g.x+n.x*f,y:g.y+n.y*f},p),b=3;b<e.length;b++)if(y(e[b-1],e[b]))return w(),void(o.state="game-over");for(b=1;b<e.length;b++){var k=e[b],S=k.x,M=k.y,P=m-S,W=x-M;if((v+=Math.abs(P)+Math.abs(W))>d){var L=d-v;0!==P&&(k.x+=L*(P>0?-1:1)),0!==W&&(k.y+=L*(W>0?-1:1)),e.splice(b+1);break}m=S,x=M}}(e),function(t){var e=o.wormWidth,n=o.test,r=o.worm;if(n){var a,i,l=n.options,u=s(r[0]),f=1.5*e,h=l.findIndex((function(t){var e=t.position;return u(e)<f})),d=l[h];d&&(d.correct?function(t,e,n){k(),o.points+=1,o.speed*=1.06,o.maxWormLength*=1.07,o.test=c(),console.log("correct:",((o.tick-t.created)/1e3).toFixed(1))}(n):(a=h,b(),null===(i=o.test)||void 0===i||i.options.splice(a,1)))}}()}(t),p(t),window.requestAnimationFrame(q)};M(),window.requestAnimationFrame(q)})();