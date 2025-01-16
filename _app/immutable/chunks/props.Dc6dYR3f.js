import{Y as D,Z as k,_ as p,$ as E,a0 as ee,a1 as h,a2 as L,a3 as o,o as y,F,a4 as re,a5 as ae,C as ne,h as A,P as V,b as J,E as Q,a6 as te,a7 as ie,L as fe,K,a8 as Z,d as B,a9 as Y,g as W,n as q,a as M,aa as se,ab as X,ac as ue,ad as le,B as $,ae as _e,t as G,af as ve,ag as de,ah as ce,ai as oe,aj as be,l as ge,ak as he,al as ye,am as Pe,an as Ee}from"./runtime.BWRNu5BE.js";function I(r,i=null,v){if(typeof r!="object"||r===null||D in r)return r;const s=ae(r);if(s!==k&&s!==p)return r;var t=new Map,l=ne(r),b=E(0);l&&t.set("length",E(r.length));var P;return new Proxy(r,{defineProperty(u,e,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&ee();var f=t.get(e);return f===void 0?(f=E(a.value),t.set(e,f)):h(f,I(a.value,P)),!0},deleteProperty(u,e){var a=t.get(e);if(a===void 0)e in u&&t.set(e,E(o));else{if(l&&typeof e=="string"){var f=t.get("length"),n=Number(e);Number.isInteger(n)&&n<f.v&&h(f,n)}h(a,o),H(b)}return!0},get(u,e,a){var c;if(e===D)return r;var f=t.get(e),n=e in u;if(f===void 0&&(!n||(c=L(u,e))!=null&&c.writable)&&(f=E(I(n?u[e]:o,P)),t.set(e,f)),f!==void 0){var _=y(f);return _===o?void 0:_}return Reflect.get(u,e,a)},getOwnPropertyDescriptor(u,e){var a=Reflect.getOwnPropertyDescriptor(u,e);if(a&&"value"in a){var f=t.get(e);f&&(a.value=y(f))}else if(a===void 0){var n=t.get(e),_=n==null?void 0:n.v;if(n!==void 0&&_!==o)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return a},has(u,e){var _;if(e===D)return!0;var a=t.get(e),f=a!==void 0&&a.v!==o||Reflect.has(u,e);if(a!==void 0||F!==null&&(!f||(_=L(u,e))!=null&&_.writable)){a===void 0&&(a=E(f?I(u[e],P):o),t.set(e,a));var n=y(a);if(n===o)return!1}return f},set(u,e,a,f){var m;var n=t.get(e),_=e in u;if(l&&e==="length")for(var c=a;c<n.v;c+=1){var R=t.get(c+"");R!==void 0?h(R,o):c in u&&(R=E(o),t.set(c+"",R))}n===void 0?(!_||(m=L(u,e))!=null&&m.writable)&&(n=E(void 0),h(n,I(a,P)),t.set(e,n)):(_=n.v!==o,h(n,I(a,P)));var g=Reflect.getOwnPropertyDescriptor(u,e);if(g!=null&&g.set&&g.set.call(f,a),!_){if(l&&typeof e=="string"){var S=t.get("length"),O=Number(e);Number.isInteger(O)&&O>=S.v&&h(S,O+1)}H(b)}return!0},ownKeys(u){y(b);var e=Reflect.ownKeys(u).filter(n=>{var _=t.get(n);return _===void 0||_.v!==o});for(var[a,f]of t)f.v!==o&&!(a in u)&&e.push(a);return e},setPrototypeOf(){re()}})}function H(r,i=1){h(r,r.v+i)}function Ie(r,i,v=!1){A&&V();var s=r,t=null,l=null,b=o,P=v?Q:0,u=!1;const e=(f,n=!0)=>{u=!0,a(n,f)},a=(f,n)=>{if(b===(b=f))return;let _=!1;if(A){const c=s.data===te;!!b===c&&(s=ie(),fe(s),K(!1),_=!0)}b?(t?Z(t):n&&(t=B(()=>n(s))),l&&Y(l,()=>{l=null})):(l?Z(l):n&&(l=B(()=>n(s))),t&&Y(t,()=>{t=null})),_&&K(!0)};J(()=>{u=!1,i(e),u||a(null,null)},P),A&&(s=W)}function Se(r,i,v){A&&V();var s=r,t,l;J(()=>{t!==(t=i())&&(l&&(Y(l),l=null),t&&(l=B(()=>v(s,t))))},Q),A&&(s=W)}function Re(r,i,v){if(r==null)return i(void 0),q;const s=M(()=>r.subscribe(i,v));return s.unsubscribe?()=>s.unsubscribe():s}let N=!1;function Oe(r,i,v){const s=v[i]??(v[i]={store:null,source:X(void 0),unsubscribe:q});if(s.store!==r)if(s.unsubscribe(),s.store=r,r==null)s.source.v=void 0,s.unsubscribe=q;else{var t=!0;s.unsubscribe=Re(r,l=>{t?s.source.v=l:h(s.source,l)}),t=!1}return y(s.source)}function Te(r,i){return r.set(i),i}function Ae(){const r={};return se(()=>{for(var i in r)r[i].unsubscribe()}),r}function me(r){var i=N;try{return N=!1,[r(),N]}finally{N=i}}function z(r){for(var i=F,v=F;i!==null&&!(i.f&(ue|le));)i=i.parent;try{return $(i),r()}finally{$(v)}}function Ne(r,i,v,s){var j;var t=(v&be)!==0,l=!ge||(v&he)!==0,b=(v&ye)!==0,P=(v&Ee)!==0,u=!1,e;b?[e,u]=me(()=>r[i]):e=r[i];var a=D in r||Pe in r,f=b&&(((j=L(r,i))==null?void 0:j.set)??(a&&i in r&&(d=>r[i]=d)))||void 0,n=s,_=!0,c=!1,R=()=>(c=!0,_&&(_=!1,P?n=M(s):n=s),n);e===void 0&&s!==void 0&&(f&&l&&_e(),e=R(),f&&f(e));var g;if(l)g=()=>{var d=r[i];return d===void 0?R():(_=!0,c=!1,d)};else{var S=z(()=>(t?G:ve)(()=>r[i]));S.f|=de,g=()=>{var d=y(S);return d!==void 0&&(n=void 0),d===void 0?n:d}}if(!(v&ce))return g;if(f){var O=r.$$legacy;return function(d,w){return arguments.length>0?((!l||!w||O||u)&&f(w?g():d),d):g()}}var m=!1,U=!1,x=X(e),T=z(()=>G(()=>{var d=g(),w=y(x);return m?(m=!1,U=!0,w):(U=!1,x.v=d)}));return t||(T.equals=oe),function(d,w){if(arguments.length>0){const C=w?y(T):l&&b?I(d):d;return T.equals(C)||(m=!0,h(x,C),c&&n!==void 0&&(n=C),M(()=>y(T))),d}return y(T)}}export{I as a,Oe as b,Se as c,Te as d,Ie as i,Ne as p,Ae as s};
