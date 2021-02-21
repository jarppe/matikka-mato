(()=>{"use strict";var t="true"===new URLSearchParams(window.location.search).get("debug"),e=document.getElementById("canvas"),n=e.getContext("2d"),r="ontouchstart"in document.documentElement,a=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}],o={state:"paused",width:0,height:0,wormWidth:0,maxWormLength:0,worm:[],heading:0,speed:0,test:null,points:0,level:0,tick:0},i=new Array(30),s=0,l={x:0,y:0,r:0,dx:0,dy:0,selected:null,tx:null,ty:null},u=function(t){var e=t.x,n=t.y;return function(t){var r=t.x,a=t.y,o=e-r,i=n-a;return Math.sqrt(o*o+i*i)}},c=function(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)},f=function(t,e,n){var r=(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y);return 0===r?0:r>0?1:2},h=function(){var t,e,n,r,a,i,s,l,c=[],f=3+Math.round(3*Math.random()),h=(e=o.width,n=o.height,r=o.worm,a=o.wormWidth,i=3*a,s=[r[0]],l=function(t){var e=u(t);return s.every((function(t){return e(t)>i}))},function(){for(;;){var t={x:Math.random()*(e-4*a)+2*a,y:Math.random()*(n-4*a)+2*a};if(l(t))return s.push(t),t}}),d=1+Math.floor(5*Math.random()),v=1+Math.floor(5*Math.random()),x=d+v,m=(t=x,function(){for(;;){var e=1+Math.floor(10*Math.random());if(e!==t)return e}});c.push({name:x.toString(10),correct:!0,position:h()});for(var g=0;g<f;g++)c.push({name:m().toString(10),correct:!1,position:h()});return{question:d+" + "+v,answer:""+x,created:o.tick,options:c}},d=Math.PI,v=2*d,x=.5*d,m=.25*d,g=function(t,e,r){return n.fillText(r,t-.5*function(t){return n.measureText(t).width}(r),e)},y=function(){var t=o.wormWidth,e=o.points;n.save(),n.font=(1.2*t).toFixed(1)+"px PressStart",n.textBaseline="middle",n.fillStyle="run"===o.state?"#50ff50":"#207720",n.fillText("points: "+e,t,t),n.restore()},p=function(){var t=l.r,e=l.x,r=l.y,a=l.selected;n.save();var o=l.tx,i=l.ty;o&&i&&(n.strokeStyle="#ffffff",n.beginPath(),n.arc(o,i,10,0,v,!1),n.stroke()),n.translate(e,r);for(var s=0;s<4;s++)n.fillStyle=s===a?"rgba(255, 255, 255, 0.7)":"rgba(255, 255, 255, 0.05)",n.strokeStyle=s===a?"rgba(255, 255, 255, 1)":"rgba(255, 255, 255, 0.1)",n.beginPath(),n.arc(0,0,t,d+m,v-m,!1),n.arc(0,0,.3*t,v-m,d+m,!0),n.closePath(),n.fill(),n.stroke(),n.rotate(x);n.restore()},w=function(e){var a=o.width,s=o.height,l=o.state;switch(n.clearRect(0,0,a,s),l){case"new":r?(function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.6*o.wormWidth,i=o.height/2-6*a;n.save(),n.textBaseline="hanging",n.font="32px PressStart",n.fillStyle="rgba(127, 255, 127, "+e+")",g(r,i,"Matikka-Mato"),i+=a,i+=a,i+=a,n.fillStyle="rgb(127, 255, 212)",n.font="16px PressStart",g(r,i,"ohjaa matoa oikean vastauksen luo"),g(r,i+=a,"älä törmaa seinään äläkä matoon"),i+=a,g(r,i+=a,"ohjaa matoa ohjaus näppäimillä"),g(r,i+=a,"aloita välilyönnillä"),n.restore()}(e),r&&p()):function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.6*o.wormWidth,i=o.height/2-6*a;n.save(),n.textBaseline="hanging",n.font="32px PressStart",n.fillStyle="rgba(127, 255, 127, "+e+")",g(r,i,"Matikka-Mato"),i+=a,i+=a,i+=a,n.fillStyle="rgb(127, 255, 212)",n.font="16px PressStart",g(r,i,"ohjaa matoa oikean vastauksen luo"),g(r,i+=a,"älä törmaa seinään äläkä matoon"),g(r,i+=a,"mato kääntyy nuoli-näppäimillä"),g(r,i+=a,"välilyönti aloittaa ja lopettaa tauon"),i+=a,g(r,i+=a,"aloita peli välilyönnillä"),n.restore()}(e);break;case"run":!function(){n.save(),n.lineJoin="round",n.lineCap="round",n.lineWidth=o.wormWidth,n.strokeStyle="run"===o.state?"#ff00ff":"#770077",n.beginPath();var t=o.worm,e=t[0];e&&n.moveTo(e.x,e.y);for(var r=1;r<t.length;r++){var a=t[r],i=a.x,s=a.y;n.lineTo(i,s)}n.stroke(),n.restore()}(),y(),function(){var t=o.test,e=o.wormWidth,r=o.width;t&&(n.save(),n.font=(1.2*e).toFixed(1)+"px PressStart",n.textBaseline="middle",n.fillStyle="run"===o.state?"#ffffff":"#777777",g(.5*r,e,t.question),n.font=(.8*e).toFixed(1)+"px sans-serif",n.fillStyle="run"===o.state?"#ffffff":"#777777",n.strokeStyle="run"===o.state?"#ffffff":"#777777",n.lineWidth=2,t.options.forEach((function(t){var e=t.name,r=t.position,a=r.x,i=r.y,s=.5*n.measureText(e).width;n.fillText(e,a-s,i),n.beginPath(),n.arc(a,i,o.wormWidth,0,v,!1),n.stroke()})),n.restore())}(),r&&p();break;case"paused":y(),function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.6*o.wormWidth,i=o.height/2-2*a;n.save(),n.font="32px PressStart",n.textBaseline="hanging",n.fillStyle="rgba(255, 255, 255, "+e+")",g(r,i,"paused"),i+=a,i+=a,n.font="26px PressStart",g(r,i,"press space or click"),g(r,i+=a,"to continue"),n.restore()}(e);break;case"game-over":!function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*o.width,a=1.8*o.wormWidth,i=o.height/2-4*a;n.save(),n.font="32px PressStart",n.textBaseline="hanging",n.fillStyle="rgba(127, 255, 127, "+e+")",g(r,i,"game over"),i+=a,i+=a,n.fillStyle="rgba(127, 255, 212, "+e+")",n.font="48px PressStart",g(r,i,"score "+o.points),i+=a,i+=a,n.fillStyle="rgba(127, 255, 127, "+e+")",n.font="26px PressStart",g(r,i,"press space or click"),g(r,i+=a,"for new game"),n.restore()}(e)}t&&function(){var t=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),a=0;for(e=0;e<n;e++)for(var o=arguments[e],i=0,s=o.length;i<s;i++,a++)r[a]=o[i];return r}(["state:    "+o.state,"speed:    "+o.speed.toFixed(3),"fps:      "+(1e3/(i.reduce((function(t,e){return t+e}),0)/30)).toFixed(0),"mobile:   "+r,"scale:    "+o.wormWidth.toFixed(1),"screen:   "+o.width+" x "+o.height,"test-age: "+((o.test?o.tick-o.test.created:0)/1e3).toFixed(1),"length:   "+o.maxWormLength.toFixed(1)],o.worm.map((function(t,e){var n=t.x,r=t.y;return(0===e?"worm:    ":"         ")+" ["+e+"] "+n.toFixed(0)+" : "+r.toFixed(0)}))),e=40;n.save(),n.font="16px courier",n.textBaseline="hanging",n.fillStyle="rgba(128, 128, 128, 128)";for(var a=0,s=t;a<s.length;a++){var l=s[a];n.fillText(l,20,e),e+=18}n.restore()}()},k="false"!==new URLSearchParams(window.location.search).get("sound")?function(t){var e=new Audio("sounds/"+t+".mp3");return function(){e.play().catch((function(t){return console.error(t)}))}}:function(t){return function(){console.log("play:",t)}},b=k("crash"),S=k("squeak"),M=k("chaching"),W=function(t){var e=t-o.tick;o.tick=t,function(t){i[s++]=t,s>30&&(s=0)}(e),function(t){var e=o.worm,n=a[o.heading],r=o.speed,i=e[0],s=i.x,l=i.y,u=o.wormWidth,h=u/2,d=o.maxWormLength,v=0,x=s+n.x*r*t,m=l+n.y*r*t;if(i.x=x,i.y=m,x<h||x>o.width-h||m<h||m>o.height-h)return b(),void(o.state="game-over");for(var g=e[0],y=e[1],p=function(t,e){return function(n,r){var a=f(t,e,n),o=f(t,e,r),i=f(n,r,t),s=f(n,r,e);return a!==o&&i!==s||!(0!==a||!c(t,n,e))||!(0!==o||!c(t,r,e))||!(0!==i||!c(n,t,r))||!(0!==s||!c(n,e,r))}}({x:g.x+n.x*u,y:g.y+n.y*u},y),w=3;w<e.length;w++)if(p(e[w-1],e[w]))return b(),void(o.state="game-over");for(w=1;w<e.length;w++){var k=e[w],S=k.x,M=k.y,W=x-S,P=m-M;if((v+=Math.abs(W)+Math.abs(P))>d){var L=d-v;0!==W&&(k.x+=L*(W>0?-1:1)),0!==P&&(k.y+=L*(P>0?-1:1)),e.splice(w+1);break}x=S,m=M}}(e),function(t){var e=o.wormWidth,n=o.test,r=o.worm;if(n){var a,i,s=n.options,l=u(r[0]),c=1.5*e,f=s.findIndex((function(t){var e=t.position;return l(e)<c})),d=s[f];d&&(d.correct?function(t,e,n){M(),o.points+=1,o.speed*=1.06,o.maxWormLength*=1.07,o.test=h(),console.log("correct:",((o.tick-t.created)/1e3).toFixed(1))}(n):(a=f,S(),null===(i=o.test)||void 0===i||i.options.splice(a,1)))}}()},P=function(){return(P=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},L=function(){var t=.5*o.width,e=.5*o.height;o.state="new",o.maxWormLength=300,o.worm=[{x:t,y:e},{x:t,y:e}],o.heading=0,o.speed=o.width/1200*.07,o.test=h(),o.points=0,o.level=0,o.tick=0},F=function(t){"run"===o.state&&(o.heading=function(t,e){var n=t+e;return n<0?3:n>3?0:n}(o.heading,t),o.worm.unshift(P({},o.worm[0])))},E={new:function(){o.tick=0,o.state="run"},run:function(){o.state="paused"},paused:function(){o.tick=0,o.state="run"},"game-over":function(){L()}};document.addEventListener("keydown",(function(e){var n=e.code,r=e.repeat;if(!r)switch(n){case"ArrowRight":return F(1);case"ArrowLeft":return F(-1);case"Space":return E[o.state]();case"Escape":return L();case"KeyD":return t=!t;default:console.log("key: "+n+" ("+r+")")}}));var B=function(){var t=e.clientWidth,n=e.clientHeight,r=e.getBoundingClientRect(),a=.02*t;e.width=t,e.height=n,o.width=t,o.height=n,o.wormWidth=a,l.r=.2*n,l.x=t-l.r-a,l.y=n-l.r-a,l.dx=r.left+4,l.dy=r.top+4,l.selected=null};window.addEventListener("resize",B),B();var T=function(t,e){var n=l.x,r=l.y,a=l.r,o=l.dx,i=l.dy,s=t-n-o,u=e-r-i;if(Math.abs(s)>a||Math.abs(u)>a)return l.tx=null,l.ty=null,void(l.selected=null);l.tx=t-o,l.ty=e-i,Math.abs(u)<Math.abs(s)?l.selected=s<0?3:1:l.selected=u<0?0:2},j=function(t){var e=t.touches[0],n=null==e?void 0:e.clientX,r=null==e?void 0:e.clientY;n&&r&&T(n,r)};e.addEventListener("touchstart",j),e.addEventListener("touchmove",j),e.addEventListener("touchend",(function(){l.tx=null,l.ty=null,l.selected=null})),e.addEventListener("mousemove",(function(t){t.preventDefault(),T(t.clientX,t.clientY)}));var A=function(t){0===o.tick&&(o.tick=t),"run"===o.state&&W(t),w(t),window.requestAnimationFrame(A)};L(),window.requestAnimationFrame(A)})();