(()=>{"use strict";var t="true"===new URLSearchParams(window.location.search).get("debug"),e=document.getElementById("game"),n=e.getContext("2d"),r="ontouchstart"in document.documentElement,a=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}],i={state:"paused",width:0,height:0,wormWidth:0,maxWormLength:0,worm:[],heading:0,speed:0,test:null,points:0,level:0,tick:0},o={x:0,y:0,r:0,dx:0,dy:0,selected:null},s=function(t){var e=t.x,n=t.y;return function(t){var r=t.x,a=t.y,i=e-r,o=n-a;return Math.sqrt(i*i+o*o)}},l=function(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)},u=function(t,e,n){var r=(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y);return 0===r?0:r>0?1:2},c=function(){var t,e,n,r,a,o,l,u,c=[],f=3+Math.round(3*Math.random()),h=(e=i.width,n=i.height,r=i.worm,a=i.wormWidth,o=3*a,l=[r[0]],u=function(t){var e=s(t);return l.every((function(t){return e(t)>o}))},function(){for(;;){var t={x:Math.random()*(e-4*a)+2*a,y:Math.random()*(n-4*a)+2*a};if(u(t))return l.push(t),t}}),d=1+Math.floor(5*Math.random()),v=1+Math.floor(5*Math.random()),m=d+v,g=(t=m,function(){for(;;){var e=1+Math.floor(10*Math.random());if(e!==t)return e}});c.push({name:m.toString(10),correct:!0,position:h()});for(var p=0;p<f;p++)c.push({name:g().toString(10),correct:!1,position:h()});return{question:d+" + "+v,answer:""+m,created:i.tick,options:c}},f=!1,h=[],d=!1,v=function(t){var e=new Audio;return h.push([e,"sounds/"+t+".mp3"]),function(){f&&e.play().catch((function(t){return console.error(t)}))}},m=v("crash"),g=v("squeak"),p=v("chaching"),x=function(){return f},w=function(){n.save(),n.lineJoin="round",n.lineCap="round",n.lineWidth=i.wormWidth,n.strokeStyle="run"===i.state?"#ff00ff":"#770077",n.beginPath();var t=i.worm,e=t[0];e&&n.moveTo(e.x,e.y);for(var r=1;r<t.length;r++){var a=t[r],o=a.x,s=a.y;n.lineTo(o,s)}n.stroke(),n.restore()},y=Math.PI,k=2*y,b=.5*y,S=.25*y,M=function(t,e,r){return n.fillText(r,t-.5*function(t){return n.measureText(t).width}(r),e)},P=function(){var t=i.test,e=i.wormWidth,r=i.width;t&&(n.save(),n.font=(1.2*e).toFixed(1)+"px PressStart",n.textBaseline="middle",n.fillStyle="run"===i.state?"#ffffff":"#777777",M(.5*r,e,t.question),n.font=(.8*e).toFixed(1)+"px sans-serif",n.fillStyle="run"===i.state?"#ffffff":"#777777",n.strokeStyle="run"===i.state?"#ffffff":"#777777",n.lineWidth=2,t.options.forEach((function(t){var e=t.name,r=t.position,a=r.x,o=r.y,s=.5*n.measureText(e).width;n.fillText(e,a-s,o),n.beginPath(),n.arc(a,o,i.wormWidth,0,k,!1),n.stroke()})),n.restore())},W=function(){var t=i.wormWidth,e=i.points;n.save(),n.font=(1.2*t).toFixed(1)+"px PressStart",n.textBaseline="middle",n.fillStyle="run"===i.state?"#50ff50":"#207720",n.fillText("Pisteet: "+e,t,t),n.restore()},T=r?function(){var t=o.r,e=o.x,r=o.y,a=o.selected,s="rgba(255, 255, 255, 0.05)",l="rgba(255, 255, 255, 0.1)";n.save(),n.translate(e,r);for(var u=0;u<4;u++)n.fillStyle=u===a?"rgba(255, 255, 255, 0.7)":s,n.strokeStyle=u===a?"rgba(255, 255, 255, 1)":l,n.beginPath(),n.arc(0,0,t,y+S,k-S,!1),n.arc(0,0,.4*t,k-S,y+S,!0),n.closePath(),n.fill(),n.stroke(),n.rotate(b);n.scale(.4*t,.4*t),n.fillStyle=s,n.strokeStyle=l,"run"===i.state?(n.fillRect(-.3,-.6,.2,1.2),n.fillRect(.1,-.6,.2,1.2)):(n.beginPath(),n.moveTo(-.3,-.5),n.lineTo(.6,0),n.lineTo(-.3,.5),n.closePath(),n.fill()),n.restore()}:function(){},L=function(e){var a=i.width,o=i.height,s=i.state;switch(n.clearRect(0,0,a,o),s){case"new":r?function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*i.width,a=1.6*i.wormWidth,o=i.height/2-6*a;n.save(),n.textBaseline="hanging",n.font="32px PressStart",n.fillStyle="rgba(127, 255, 127, "+e+")",M(r,o,"Matikka-Mato"),o+=a,o+=a,o+=a,n.fillStyle="rgb(127, 255, 212)",n.font="16px PressStart",M(r,o,"Ohjaa matoa oikean vastauksen luo."),M(r,o+=a,"Älä törmaa seinään tai matoon."),o+=a,M(r,o+=a,"Ohjaa matoa koskettamalla ohjainta."),M(r,o+=a,"Aloita peli ohjaimen keskeltä."),n.restore()}(e):function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*i.width,a=1.6*i.wormWidth,o=i.height/2-6*a;n.save(),n.textBaseline="hanging",n.font="32px PressStart",n.fillStyle="rgba(127, 255, 127, "+e+")",M(r,o,"Matikka-Mato"),o+=a,o+=a,o+=a,n.fillStyle="rgb(127, 255, 212)",n.font="16px PressStart",M(r,o,"Ohjaa mato oikean vastauksen luo."),M(r,o+=a,"Älä törmaa seinään tai matoon."),o+=a,M(r,o+=a,"Ohjaa matoa nuoli-näppäimillä."),M(r,o+=a,"Aloita peli välilyönnillä."),n.restore()}(e),function(){var t=i.width,e=i.wormWidth,r="rgba(0, 255, 0, 1)",a="rgba(0, 192, 0, 1)";n.save(),n.translate(t-3*e,e),n.scale(2*e,2*e),n.lineWidth=.08,n.lineJoin="round",n.strokeRect(0,0,1,1),n.strokeStyle=x()?r:"rgba(64, 128, 64, 1)",n.fillStyle=a,n.beginPath(),n.moveTo(.1,.35),n.lineTo(.3,.35),n.lineTo(.55,.15),n.lineTo(.55,.85),n.lineTo(.3,.65),n.lineTo(.1,.65),n.closePath(),x()&&n.fill(),n.stroke(),n.beginPath(),n.arc(.5,.5,.3,-1,1,!1),n.stroke(),n.beginPath(),n.arc(.5,.5,.45,-1,1,!1),n.stroke(),n.restore(),n.save(),n.translate(t-2*e,4.5*e),n.scale(e,e),n.lineWidth=.08,n.lineJoin="round",n.strokeStyle=r,n.fillStyle=a;for(var o=0;o<4;o++)n.beginPath(),n.moveTo(1.1,0),n.lineTo(.8,.3),n.lineTo(.8,.2),n.lineTo(.4,.2),n.lineTo(.4,-.2),n.lineTo(.8,-.2),n.lineTo(.8,-.3),n.closePath(),n.stroke(),n.rotate(b);n.restore()}();break;case"run":w(),W(),P();break;case"paused":W(),function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,r=.5*i.width,a=1.6*i.wormWidth,o=i.height/2-2*a;n.save(),n.font="32px PressStart",n.textBaseline="hanging",n.fillStyle="rgba(255, 255, 255, "+e+")",M(r,o,"paused"),o+=a,o+=a,n.font="26px PressStart",M(r,o,"press space or click"),M(r,o+=a,"to continue"),n.restore()}(e);break;case"game-over":w(),P(),function(t){var e=1-Math.abs(t%2e3-1e3)/1e3,a=.5*i.width,o=1.8*i.wormWidth,s=i.height/2-4*o;n.save(),n.font="32px PressStart",n.textBaseline="hanging",n.fillStyle="rgba(127, 255, 127, "+e+")",M(a,s,"game over"),s+=o,s+=o,n.fillStyle="rgba(127, 255, 212, "+e+")",n.font="48px PressStart",M(a,s,"Sait "+i.points+" pistettä"),s+=o,s+=o,n.fillStyle="rgba(127, 255, 127, "+e+")",n.font="26px PressStart",r?(M(a,s,"Aloita uusi peli painamalla"),M(a,s+=o,"ohjaimen keskeltä.")):(M(a,s,"Aloita uusi peli painamalla"),M(a,s+=o,"välilyöntiä.")),n.restore()}(e)}T(),t&&function(){var t=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),a=0;for(e=0;e<n;e++)for(var i=arguments[e],o=0,s=i.length;o<s;o++,a++)r[a]=i[o];return r}(["state:    "+i.state,"speed:    "+i.speed.toFixed(3),"mobile:   "+r,"scale:    "+i.wormWidth.toFixed(1),"screen:   "+i.width+" x "+i.height,"test-age: "+((i.test?i.tick-i.test.created:0)/1e3).toFixed(1),"length:   "+i.maxWormLength.toFixed(1)],i.worm.map((function(t,e){var n=t.x,r=t.y;return(0===e?"worm:    ":"         ")+" ["+e+"] "+n.toFixed(0)+" : "+r.toFixed(0)}))),e=40;n.save(),n.font="16px courier",n.textBaseline="hanging",n.fillStyle="rgba(128, 128, 128, 128)";for(var a=0,o=t;a<o.length;a++){var s=o[a];n.fillText(s,20,e),e+=18}n.restore()}()},E=function(){return(E=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}).apply(this,arguments)},A=function(){var t=.5*i.width,e=.5*i.height;i.state="new",i.maxWormLength=300,i.worm=[{x:t,y:e},{x:t,y:e}],i.heading=0,i.speed=i.width/1200*.07,i.test=c(),i.points=0,i.level=0,i.tick=0},D=[[0,1,0,3],[0,1,2,1],[2,1,2,3],[0,3,2,3]],F=function(t){var e=i.state,n=i.heading;if("run"===e){var r=D[n][t];r!==n&&(i.heading=r,i.worm.unshift(E({},i.worm[0])))}},j=function(){i.tick=0,i.state="run"},B=function(){i.state="paused"},q={new:j,run:B,paused:j,"game-over":A};document.addEventListener("keydown",(function(e){var n=e.code,r=e.repeat;if(!r)switch(n){case"ArrowUp":return e.preventDefault(),F(0);case"ArrowRight":return e.preventDefault(),F(1);case"ArrowDown":return e.preventDefault(),F(2);case"ArrowLeft":return e.preventDefault(),F(3);case"Space":return e.preventDefault(),q[i.state]();case"Escape":return e.preventDefault(),A();case"KeyD":return e.preventDefault(),t=!t;default:console.log("key: "+n+" ("+r+")")}}));var O={new:j,run:B,paused:j,"game-over":A},R=function(t,e){var n=i.width,r=i.wormWidth,a=o.x,s=o.y,l=o.r,u=t-o.dx,c=e-o.dy,v=n-3*r,m=4.5*r,g=m+2*r;if(u>=v&&u<=v+2*r){if(c>=r&&c<=r+2*r)return d||(h.forEach((function(t){var e=t[0],n=t[1];return e.src=n})),d=!0),void(f=!f);if(c>=m&&c<=g)return void console.log("fullscreen!",Date.now())}var p=u-a,x=c-s,w=.2*l;if(Math.abs(p)>l||Math.abs(x)>l)o.selected=null;else{if(Math.abs(x)<w&&Math.abs(p)<w)return o.selected=null,void O[i.state]();Math.abs(x)<Math.abs(p)?o.selected=p<0?3:1:o.selected=x<0?0:2,F(o.selected)}},C=function(t){t.preventDefault(),t.stopPropagation();var e=t.touches[0],n=null==e?void 0:e.clientX,r=null==e?void 0:e.clientY;n&&r&&R(n,r)},I=function(t){t.preventDefault(),t.stopPropagation(),o.selected=null};e.addEventListener("touchstart",C),e.addEventListener("touchmove",C),e.addEventListener("touchend",I),e.addEventListener("mousedown",(function(t){t.preventDefault(),R(t.clientX,t.clientY)})),e.addEventListener("mousemove",(function(t){t.clientX,t.clientY})),e.addEventListener("mouseup",I),e.addEventListener("mouseout",I),e.addEventListener("mouseleave",I);var J=function(){var t=document.documentElement,n=t.clientWidth,r=t.clientHeight,a=e.getBoundingClientRect(),s=.02*n;e.width=n,e.height=r,i.width=n,i.height=r,i.wormWidth=s,o.r=.2*r,o.x=n-o.r-s,o.y=r-o.r-s,o.dx=a.left+4,o.dy=a.top+4,o.selected=null};window.addEventListener("resize",J);var X=function(t){0===i.tick&&(i.tick=t),"run"===i.state&&function(t){var e=t-i.tick;i.tick=t,function(t){var e=i.worm,n=a[i.heading],r=i.speed,o=e[0],s=o.x,c=o.y,f=i.wormWidth,h=f/2,d=i.maxWormLength,v=0,g=s+n.x*r*t,p=c+n.y*r*t;if(o.x=g,o.y=p,g<h||g>i.width-h||p<h||p>i.height-h)return m(),void(i.state="game-over");for(var x=e[0],w=e[1],y=function(t,e){return function(n,r){var a=u(t,e,n),i=u(t,e,r),o=u(n,r,t),s=u(n,r,e);return a!==i&&o!==s||!(0!==a||!l(t,n,e))||!(0!==i||!l(t,r,e))||!(0!==o||!l(n,t,r))||!(0!==s||!l(n,e,r))}}({x:x.x+n.x*f,y:x.y+n.y*f},w),k=3;k<e.length;k++)if(y(e[k-1],e[k]))return m(),void(i.state="game-over");for(k=1;k<e.length;k++){var b=e[k],S=b.x,M=b.y,P=g-S,W=p-M;if((v+=Math.abs(P)+Math.abs(W))>d){var T=d-v;0!==P&&(b.x+=T*(P>0?-1:1)),0!==W&&(b.y+=T*(W>0?-1:1)),e.splice(k+1);break}g=S,p=M}}(e),function(t){var e=i.wormWidth,n=i.test,r=i.worm;if(n){var a,o,l=n.options,u=s(r[0]),f=1.5*e,h=l.findIndex((function(t){var e=t.position;return u(e)<f})),d=l[h];d&&(d.correct?function(t,e,n){p(),i.points+=1,i.speed*=1.06,i.maxWormLength*=1.07,i.test=c(),console.log("correct:",((i.tick-t.created)/1e3).toFixed(1))}(n):(a=h,g(),null===(o=i.test)||void 0===o||o.options.splice(a,1)))}}()}(t),L(t),window.requestAnimationFrame(X)};window.requestAnimationFrame((function(){J(),A(),window.requestAnimationFrame(X)}))})();