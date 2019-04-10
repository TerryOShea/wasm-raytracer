!function(t){function e(e){for(var n,o,i=e[0],a=e[1],u=0,c=[];u<i.length;u++)o=i[u],r[o]&&c.push(r[o][0]),r[o]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n]);for(s&&s(e);c.length;)c.shift()()}var n={},r={0:0};var o={};var i={6:function(){return{"./wasm_raytracer":{__wbindgen_json_serialize:function(t,e){return n[5].exports.__wbindgen_json_serialize(t,e)},__wbindgen_throw:function(t,e){return n[5].exports.__wbindgen_throw(t,e)}}}}};function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.e=function(t){var e=[],n=r[t];if(0!==n)if(n)e.push(n[2]);else{var u=new Promise(function(e,o){n=r[t]=[e,o]});e.push(n[2]=u);var c,f=document.createElement("script");f.charset="utf-8",f.timeout=120,a.nc&&f.setAttribute("nonce",a.nc),f.src=function(t){return a.p+""+t+".main.js"}(t),c=function(e){f.onerror=f.onload=null,clearTimeout(s);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,a=new Error("Loading chunk "+t+" failed.\n("+o+": "+i+")");a.type=o,a.request=i,n[1](a)}r[t]=void 0}};var s=setTimeout(function(){c({type:"timeout",target:f})},12e4);f.onerror=f.onload=c,document.head.appendChild(f)}return({1:[6]}[t]||[]).forEach(function(t){var n=o[t];if(n)e.push(n);else{var r,u=i[t](),c=fetch(a.p+""+{6:"74d96d4a3cfe3eef8e4d"}[t]+".module.wasm");if(u instanceof Promise&&"function"==typeof WebAssembly.compileStreaming)r=Promise.all([WebAssembly.compileStreaming(c),u]).then(function(t){return WebAssembly.instantiate(t[0],t[1])});else if("function"==typeof WebAssembly.instantiateStreaming)r=WebAssembly.instantiateStreaming(c,u);else{r=c.then(function(t){return t.arrayBuffer()}).then(function(t){return WebAssembly.instantiate(t,u)})}e.push(o[t]=r.then(function(e){return a.w[t]=(e.instance||e).exports}))}}),Promise.all(e)},a.m=t,a.c=n,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/wasm-raytracer/dist/",a.oe=function(t){throw console.error(t),t},a.w={};var u=window.webpackJsonp=window.webpackJsonp||[],c=u.push.bind(u);u.push=e,u=u.slice();for(var f=0;f<u.length;f++)e(u[f]);var s=c;a(a.s=4)}([function(t,e,n){var r=n(1),o=n(2),i=n(3);t.exports=function(t,e){return r(t)||o(t,e)||i()}},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}},function(t,e,n){"use strict";n.r(e);var r={camera:{point:{x:0,y:1.8,z:10},fieldOfView:45,vector:{x:0,y:3,z:0}},lights:[{x:-30,y:-10,z:20}],objects:[{point:{x:0,y:3.5,z:-3},color:{x:255,y:230,z:0},lambert:.7,ambient:.5,radius:3},{point:{x:-4,y:2,z:-1},color:{x:153,y:102,z:255},lambert:.9,ambient:.5,radius:.2},{point:{x:-4,y:3,z:-1},color:{x:255,y:255,z:255},lambert:.7,ambient:.5,radius:.1}]},o=n(0),i=n.n(o),a={x:0,y:1,z:0},u={x:255,y:255,z:255},c=function(t,e){return t.x*e.x+t.y*e.y+t.z*e.z},f=function(t,e){return{x:t.y*e.z-t.z*e.y,y:t.z*e.x-t.x*e.z,z:t.x*e.y-t.y*e.x}},s=function(t,e){return{x:t.x*e,y:t.y*e,z:t.z*e}},l=function(t){return s(t,1/function(t){return Math.sqrt(c(t,t))}(t))},y=function(){for(var t={x:0,y:0,z:0},e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return n.forEach(function(e){t.x+=e.x,t.y+=e.y,t.z+=e.z}),t},p=function(t,e){return{x:t.x-e.x,y:t.y-e.y,z:t.z-e.z}},d=function(t,e){var n=m(t,e),r=i()(n,2),o=r[0],a=r[1];if(!a)return u;var c=y(t.point,s(t.vector,o));return v(t,e,a,c,h(a,c))},m=function(t,e){var n=[1/0,null];return e.objects.forEach(function(e){var r=b(e,t);r<n[0]&&(n=[r,e])}),n},b=function(t,e){var n=p(t.point,e.point),r=c(n,e.vector),o=c(n,n),i=t.radius*t.radius-o+r*r;return i<0?1/0:r-Math.sqrt(i)},h=function(t,e){return l(p(e,t.point))},v=function(t,e,n,r,o){var i=0;return n.lambert&&e.lights.forEach(function(t){if(x(r,e,t)){var n=c(l(p(t,r)),o);n>0&&(i+=n)}}),i=Math.min(1,i),y(s(n.color,i*n.lambert),s(n.color,n.ambient))},x=function(t,e,n){return m({point:t,vector:l(p(t,n))},e)[0]>-.005},g=function(t){for(var e=t.camera,n=l(p(e.vector,e.point)),r=l(f(n,a)),o=l(f(r,n)),i=Math.PI*(e.fieldOfView/2)/180,u=Math.tan(i),c=.75*u,m=2*u/319,b=2*c/239,h={point:e.point},v=0,x=Array.from({length:76800}),g=0;g<240;g++)for(var z=0;z<320;z++){var w=s(o,g*b-c),_=s(r,z*m-u);h.vector=l(y(n,w,_));var j=d(h,t);x[v]=j.x,x[v+1]=j.y,x[v+2]=j.z,x[v+3]=255,v+=4}return x},z=document.getElementById("c");z.width=320,z.height=240,z.style.cssText="width:640px;height:480px";var w=z.getContext("2d"),_=w.getImageData(0,0,320,240),j=function(t){_.data.set(t),w.putImageData(_,0,0)},M=!0;n.e(1).then(n.bind(null,5)).then(function(t){var e={x:-4,y:2,z:-1},n={x:-4,y:3,z:-1},o=0,i=0;!function a(){o+=.1,i+=.2,e.x=3.5*Math.sin(o),e.z=3.5*Math.cos(o)-3,n.x=4*Math.sin(i),n.z=4*Math.cos(i)-3,M?j(t.generate_new_data(e,n)):(r.objects[1].point=e,r.objects[2].point=n,j(g(r))),setTimeout(a,10)}()});var A=document.getElementById("slider"),E=document.getElementById("slider-toggle");A.addEventListener("click",function(){M=!M,A.style.backgroundColor=M?"#b7410e":"#bababa",E.style.left=M?"1px":"21px"})}]);