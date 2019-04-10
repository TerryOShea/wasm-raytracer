!function(t){function n(n){for(var e,o,i=n[0],a=n[1],u=0,c=[];u<i.length;u++)o=i[u],r[o]&&c.push(r[o][0]),r[o]=0;for(e in a)Object.prototype.hasOwnProperty.call(a,e)&&(t[e]=a[e]);for(s&&s(n);c.length;)c.shift()()}var e={},r={0:0};var o={};var i={6:function(){return{"./wasm_raytracer":{__wbindgen_json_serialize:function(t,n){return e[5].exports.__wbindgen_json_serialize(t,n)},__wbindgen_throw:function(t,n){return e[5].exports.__wbindgen_throw(t,n)}}}}};function a(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.e=function(t){var n=[],e=r[t];if(0!==e)if(e)n.push(e[2]);else{var u=new Promise(function(n,o){e=r[t]=[n,o]});n.push(e[2]=u);var c,f=document.createElement("script");f.charset="utf-8",f.timeout=120,a.nc&&f.setAttribute("nonce",a.nc),f.src=function(t){return a.p+""+t+".main.js"}(t),c=function(n){f.onerror=f.onload=null,clearTimeout(s);var e=r[t];if(0!==e){if(e){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src,a=new Error("Loading chunk "+t+" failed.\n("+o+": "+i+")");a.type=o,a.request=i,e[1](a)}r[t]=void 0}};var s=setTimeout(function(){c({type:"timeout",target:f})},12e4);f.onerror=f.onload=c,document.head.appendChild(f)}return({1:[6]}[t]||[]).forEach(function(t){var e=o[t];if(e)n.push(e);else{var r,u=i[t](),c=fetch(a.p+""+{6:"74d96d4a3cfe3eef8e4d"}[t]+".module.wasm");if(u instanceof Promise&&"function"==typeof WebAssembly.compileStreaming)r=Promise.all([WebAssembly.compileStreaming(c),u]).then(function(t){return WebAssembly.instantiate(t[0],t[1])});else if("function"==typeof WebAssembly.instantiateStreaming)r=WebAssembly.instantiateStreaming(c,u);else{r=c.then(function(t){return t.arrayBuffer()}).then(function(t){return WebAssembly.instantiate(t,u)})}n.push(o[t]=r.then(function(n){return a.w[t]=(n.instance||n).exports}))}}),Promise.all(n)},a.m=t,a.c=e,a.d=function(t,n,e){a.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,n){if(1&n&&(t=a(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(a.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)a.d(e,r,function(n){return t[n]}.bind(null,r));return e},a.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(n,"a",n),n},a.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},a.p="",a.oe=function(t){throw console.error(t),t},a.w={};var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=n,u=u.slice();for(var f=0;f<u.length;f++)n(u[f]);var s=c;a(a.s=4)}([function(t,n,e){var r=e(1),o=e(2),i=e(3);t.exports=function(t,n){return r(t)||o(t,n)||i()}},function(t,n){t.exports=function(t){if(Array.isArray(t))return t}},function(t,n){t.exports=function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(e.push(a.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return e}},function(t,n){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},function(t,n,e){"use strict";e.r(n);var r={camera:{point:{x:0,y:1.8,z:10},fieldOfView:45,vector:{x:0,y:3,z:0}},lights:[{x:-30,y:-10,z:20}],objects:[{point:{x:0,y:3.5,z:-3},color:{x:255,y:230,z:0},lambert:.7,ambient:.5,radius:3},{point:{x:-4,y:2,z:-1},color:{x:153,y:102,z:255},lambert:.9,ambient:.5,radius:.2},{point:{x:-4,y:3,z:-1},color:{x:255,y:255,z:255},lambert:.7,ambient:.5,radius:.1}]},o=e(0),i=e.n(o),a={x:0,y:1,z:0},u={x:255,y:255,z:255},c=function(t,n){return t.x*n.x+t.y*n.y+t.z*n.z},f=function(t,n){return{x:t.y*n.z-t.z*n.y,y:t.z*n.x-t.x*n.z,z:t.x*n.y-t.y*n.x}},s=function(t,n){return{x:t.x*n,y:t.y*n,z:t.z*n}},l=function(t){return s(t,1/function(t){return Math.sqrt(c(t,t))}(t))},y=function(){for(var t={x:0,y:0,z:0},n=arguments.length,e=new Array(n),r=0;r<n;r++)e[r]=arguments[r];return e.forEach(function(n){t.x+=n.x,t.y+=n.y,t.z+=n.z}),t},d=function(t,n){return{x:t.x-n.x,y:t.y-n.y,z:t.z-n.z}},p=function(t,n){var e=m(t,n),r=i()(e,2),o=r[0],a=r[1];if(!a)return u;var c=y(t.point,s(t.vector,o));return v(t,n,a,c,h(a,c))},m=function(t,n){var e=[1/0,null];return n.objects.forEach(function(n){var r=b(n,t);r<e[0]&&(e=[r,n])}),e},b=function(t,n){var e=d(t.point,n.point),r=c(e,n.vector),o=c(e,e),i=t.radius*t.radius-o+r*r;return i<0?1/0:r-Math.sqrt(i)},h=function(t,n){return l(d(n,t.point))},v=function(t,n,e,r,o){var i=0;return e.lambert&&n.lights.forEach(function(t){if(x(r,n,t)){var e=c(l(d(t,r)),o);e>0&&(i+=e)}}),i=Math.min(1,i),y(s(e.color,i*e.lambert),s(e.color,e.ambient))},x=function(t,n,e){return m({point:t,vector:l(d(t,e))},n)[0]>-.005},g=function(t){for(var n=t.camera,e=l(d(n.vector,n.point)),r=l(f(e,a)),o=l(f(r,e)),i=Math.PI*(n.fieldOfView/2)/180,u=Math.tan(i),c=.75*u,m=2*u/319,b=2*c/239,h={point:n.point},v=0,x=Array.from({length:76800}),g=0;g<240;g++)for(var z=0;z<320;z++){var w=s(o,g*b-c),_=s(r,z*m-u);h.vector=l(y(e,w,_));var j=p(h,t);x[v]=j.x,x[v+1]=j.y,x[v+2]=j.z,x[v+3]=255,v+=4}return x},z=document.getElementById("c");z.width=320,z.height=240,z.style.cssText="width:640px;height:480px";var w=z.getContext("2d"),_=w.getImageData(0,0,320,240),j=function(t){_.data.set(t),w.putImageData(_,0,0)},M=!0;e.e(1).then(e.bind(null,5)).then(function(t){var n={x:-4,y:2,z:-1},e={x:-4,y:3,z:-1},o=0,i=0;!function a(){o+=.1,i+=.2,n.x=3.5*Math.sin(o),n.z=3.5*Math.cos(o)-3,e.x=4*Math.sin(i),e.z=4*Math.cos(i)-3,M?j(t.generate_new_data(n,e)):(r.objects[1].point=n,r.objects[2].point=e,j(g(r))),setTimeout(a,10)}()});var E=document.getElementById("js"),A=document.getElementById("wasm");A.style.backgroundColor="blue",E.addEventListener("click",function(){M=!1,A.style.backgroundColor="inherit",E.style.backgroundColor="blue"}),A.addEventListener("click",function(){M=!0,E.style.backgroundColor="inherit",A.style.backgroundColor="blue"})}]);