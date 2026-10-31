"use strict";(()=>{var Iu="FCADL01\0",ht=i=>{throw new Error(`Invalid compact CAD: ${i}`)};function Lu(i){if(i<=0)return 0;let e=Math.floor(Math.sqrt(i));for(;e*e>i;)e--;for(;(e+1)*(e+1)<=i;)e++;return 4*i>=4*e*e+4*e+1?e+1:e}function sr(i){(!(i instanceof Uint8Array)||i.byteLength<12)&&ht("header");let e=new DataView(i.buffer,i.byteOffset,i.byteLength);new TextDecoder().decode(i.subarray(0,8))!==Iu&&ht("format");let t=e.getUint32(8,!0),n=12+t;(!t||t>134217728||n>i.byteLength)&&ht("metadata length");let s;try{s=JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(i.subarray(12,n)))}catch{ht("metadata JSON")}(!Array.isArray(s?.meshes)||s.meshes.length>2e4)&&ht("meshes");let r=[],o=0;function l(a){if((!a||!Number.isSafeInteger(a.length)||a.length<0||a.length>3e7)&&ht("array length"),a.type==="ref"){(!Number.isSafeInteger(a.ref)||a.ref<0||a.ref>=r.length||r[a.ref].length!==a.length)&&ht("array reference");let h=r[a.ref].slice();return r.push(h),h}(!Number.isSafeInteger(a.offset)||a.offset!==o||!Number.isSafeInteger(a.bytes)||a.bytes<0||n+a.offset+a.bytes>i.byteLength)&&ht("array bounds"),o+=a.bytes;let c=new Array(a.length),u=n+a.offset+a.bytes,f=n+a.offset;if(a.type==="f64"){a.bytes!==a.length*8&&ht("float length");for(let h=0;h<c.length;h++,f+=8){let p=e.getFloat64(f,!0);Number.isFinite(p)||ht("non-finite float"),c[h]=p}}else{(!Number.isSafeInteger(a.scale)||a.scale<=0||a.scale>1e12||!Number.isSafeInteger(a.channels)||a.channels<1||a.channels>4)&&ht("integer format");let h=new Array(a.channels).fill(0);if(a.type==="delta"){a.bytes<a.length&&ht("integer length");for(let p=0;p<c.length;p++){let _=0,b=1,m=0,d=0;do(f>=u||++d>8)&&ht("truncated varint"),m=i[f++],_+=(m&127)*b,Number.isSafeInteger(_)||ht("varint overflow"),b*=128;while(m&128);let M=_%2?-(_+1)/2:_/2,A=p%a.channels,x=h[A]+M;Number.isSafeInteger(x)||ht("coordinate overflow"),h[A]=x,c[p]=x/a.scale}}else if(a.type==="planes"||a.type==="normals"){let p=a.type==="normals",_=a.length/a.channels;(!Number.isSafeInteger(a.width)||a.width<1||a.width>4||!["raw","delta"].includes(a.mode)||!Number.isInteger(_)||p&&(a.channels!==3||a.scale>1e6)||a.bytes!==a.length*a.width+(p?a.length/3:0))&&ht("plane format");for(let b=0;b<c.length;b++){let m=b%a.channels,d=m*_+Math.floor(b/a.channels),M=0;for(let w=0;w<a.width;w++)M+=i[f+w*a.length+d]*2**(w*8);let x=(M%2?-(M+1)/2:M/2)+(a.mode==="delta"?h[m]:0);Number.isSafeInteger(x)||ht("coordinate overflow"),h[m]=x,c[b]=x}if(f+=a.length*a.width,p)for(let b=0;b<c.length;b+=3){let m=i[f++];m>5&&ht("normal axis");let d=Math.floor(m/2),M=m%2?-1:1,A=c[b],x=c[b+1],w=c[b+2];(Math.abs(A)>a.scale||Math.abs(x)>a.scale)&&ht("normal component");let S=M*Lu(a.scale*a.scale-A*A-x*x)+w,C=[0,1,2].filter(y=>y!==d);c[b+d]=S,c[b+C[0]]=A,c[b+C[1]]=x}for(let b=0;b<c.length;b++)c[b]/=a.scale}else ht("array encoding")}return f!==u&&ht("array trailing bytes"),r.push(c),c}for(let a of s.meshes){(!a?.attributes?.position||!a?.index)&&ht("mesh structure");let c=a.attributes.position.array=l(a.attributes.position.array);c.length%3&&ht("position length"),a.attributes.normal&&(a.attributes.normal.array=l(a.attributes.normal.array)).length!==c.length&&ht("normal length");let u=a.index.array=l(a.index.array);u.length%3&&ht("triangle length");let f=c.length/3;for(let h of u)(!Number.isSafeInteger(h)||h<0||h>=f)&&ht("triangle index")}return n+o!==i.byteLength&&ht("payload trailing bytes"),s}var Qn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rc=0,$a=1,Pc=2;var zs=1,Ic=2,$i=3,ti=0,Dt=1,yt=2,En=0,ji=1,ja=2,Qa=3,el=4,Lc=5;var xi=100,Dc=101,Nc=102,Uc=103,Fc=104,Oc=200,Bc=201,kc=202,zc=203,tl=204,nl=205,Hc=206,Vc=207,Gc=208,Wc=209,Xc=210,qc=211,Yc=212,Zc=213,Kc=214,Lr=0,Dr=1,Nr=2,Hi=3,Ur=4,Fr=5,Or=6,Br=7,ho=0,Jc=1,$c=2,pn=0,il=1,sl=2,rl=3,Hs=4,ol=5,al=6,ll=7;var cl=300,ni=301,yi=302,uo=303,fo=304,Vs=306,kr=1e3,bn=1001,zr=1002,Rt=1003,jc=1004;var Gs=1005;var It=1006,po=1007;var ii=1008;var Kt=1009,hl=1010,ul=1011,Qi=1012,mo=1013,mn=1014,rn=1015,gn=1016,go=1017,_o=1018,es=1020,dl=35902,fl=35899,pl=1021,ml=1022,on=1023,Sn=1026,si=1027,xo=1028,yo=1029,ri=1030,vo=1031;var bo=1033,Ws=33776,Xs=33777,qs=33778,Ys=33779,So=35840,Mo=35841,wo=35842,Eo=35843,Ao=36196,To=37492,Co=37496,Ro=37488,Po=37489,Zs=37490,Io=37491,Lo=37808,Do=37809,No=37810,Uo=37811,Fo=37812,Oo=37813,Bo=37814,ko=37815,zo=37816,Ho=37817,Vo=37818,Go=37819,Wo=37820,Xo=37821,qo=36492,Yo=36494,Zo=36495,Ko=36283,Jo=36284,Ks=36285,$o=36286;var gs=2300,Hr=2301,Pr=2302,Ga=2303,Wa=2400,Xa=2401,qa=2402;var Qc=3200;var Js=0,eh=1,On="",zt="srgb",_s="srgb-linear",xs="linear",nt="srgb";var Ir=7680;var th=519,nh=512,ih=513,sh=514,jo=515,rh=516,oh=517,Qo=518,ah=519,lh=35044;var gl="300 es",dn=2e3,Vi=2001;function Du(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nu(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ys(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ch(){let i=ys("canvas");return i.style.display="block",i}var tc={},Gi=null;function _l(...i){let e="THREE."+i.shift();Gi?Gi("log",e,...i):console.log(e,...i)}function hh(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Le(...i){i=hh(i);let e="THREE."+i.shift();if(Gi)Gi("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Be(...i){i=hh(i);let e="THREE."+i.shift();if(Gi)Gi("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function pi(...i){let e=i.join(" ");e in tc||(tc[e]=!0,Le(...i))}function uh(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var dh={[Lr]:Dr,[Nr]:Or,[Ur]:Br,[Hi]:Fr,[Dr]:Lr,[Or]:Nr,[Br]:Ur,[Fr]:Hi},fn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],nc=1234567,ki=Math.PI/180,Wi=180/Math.PI;function ts(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]).toLowerCase()}function qe(i,e,t){return Math.max(e,Math.min(t,i))}function xl(i,e){return(i%e+e)%e}function Uu(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Fu(i,e,t){return i!==e?(t-i)/(e-i):0}function ms(i,e,t){return(1-t)*i+t*e}function Ou(i,e,t,n){return ms(i,e,1-Math.exp(-t*n))}function Bu(i,e=1){return e-Math.abs(xl(i,e*2)-e)}function ku(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function zu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Hu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Vu(i,e){return i+Math.random()*(e-i)}function Gu(i){return i*(.5-Math.random())}function Wu(i){i!==void 0&&(nc=i);let e=nc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xu(i){return i*ki}function qu(i){return i*Wi}function Yu(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Zu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ku(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ju(i,e,t,n,s){let r=Math.cos,o=Math.sin,l=r(t/2),a=o(t/2),c=r((e+n)/2),u=o((e+n)/2),f=r((e-n)/2),h=o((e-n)/2),p=r((n-e)/2),_=o((n-e)/2);switch(s){case"XYX":i.set(l*u,a*f,a*h,l*c);break;case"YZY":i.set(a*h,l*u,a*f,l*c);break;case"ZXZ":i.set(a*f,a*h,l*u,l*c);break;case"XZX":i.set(l*u,a*_,a*p,l*c);break;case"YXY":i.set(a*p,l*u,a*_,l*c);break;case"ZYZ":i.set(a*_,a*p,l*u,l*c);break;default:Le("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function kt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var An={DEG2RAD:ki,RAD2DEG:Wi,generateUUID:ts,clamp:qe,euclideanModulo:xl,mapLinear:Uu,inverseLerp:Fu,lerp:ms,damp:Ou,pingpong:Bu,smoothstep:ku,smootherstep:zu,randInt:Hu,randFloat:Vu,randFloatSpread:Gu,seededRandom:Wu,degToRad:Xu,radToDeg:qu,isPowerOfTwo:Yu,ceilPowerOfTwo:Zu,floorPowerOfTwo:Ku,setQuaternionFromProperEuler:Ju,normalize:kt,denormalize:Bi},Ue=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Lt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,l){let a=n[s+0],c=n[s+1],u=n[s+2],f=n[s+3],h=r[o+0],p=r[o+1],_=r[o+2],b=r[o+3];if(f!==b||a!==h||c!==p||u!==_){let m=a*h+c*p+u*_+f*b;m<0&&(h=-h,p=-p,_=-_,b=-b,m=-m);let d=1-l;if(m<.9995){let M=Math.acos(m),A=Math.sin(M);d=Math.sin(d*M)/A,l=Math.sin(l*M)/A,a=a*d+h*l,c=c*d+p*l,u=u*d+_*l,f=f*d+b*l}else{a=a*d+h*l,c=c*d+p*l,u=u*d+_*l,f=f*d+b*l;let M=1/Math.sqrt(a*a+c*c+u*u+f*f);a*=M,c*=M,u*=M,f*=M}}e[t]=a,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,s,r,o){let l=n[s],a=n[s+1],c=n[s+2],u=n[s+3],f=r[o],h=r[o+1],p=r[o+2],_=r[o+3];return e[t]=l*_+u*f+a*p-c*h,e[t+1]=a*_+u*h+c*f-l*p,e[t+2]=c*_+u*p+l*h-a*f,e[t+3]=u*_-l*f-a*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,l=Math.cos,a=Math.sin,c=l(n/2),u=l(s/2),f=l(r/2),h=a(n/2),p=a(s/2),_=a(r/2);switch(o){case"XYZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"YXZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"ZXY":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"ZYX":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"YZX":this._x=h*u*f+c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f-h*p*_;break;case"XZY":this._x=h*u*f-c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f+h*p*_;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],l=t[5],a=t[9],c=t[2],u=t[6],f=t[10],h=n+l+f;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-a)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>l&&n>f){let p=2*Math.sqrt(1+n-l-f);this._w=(u-a)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(l>f){let p=2*Math.sqrt(1+l-n-f);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(a+u)/p}else{let p=2*Math.sqrt(1+f-n-l);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(a+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,l=t._x,a=t._y,c=t._z,u=t._w;return this._x=n*u+o*l+s*c-r*a,this._y=s*u+o*a+r*l-n*c,this._z=r*u+o*c+n*a-s*l,this._w=o*u-n*l-s*a-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,l=this.dot(e);l<0&&(n=-n,s=-s,r=-r,o=-o,l=-l);let a=1-t;if(l<.9995){let c=Math.acos(l),u=Math.sin(c);a=Math.sin(a*c)/u,t=Math.sin(t*c)/u,this._x=this._x*a+n*t,this._y=this._y*a+s*t,this._z=this._z*a+r*t,this._w=this._w*a+o*t,this._onChangeCallback()}else this._x=this._x*a+n*t,this._y=this._y*a+s*t,this._z=this._z*a+r*t,this._w=this._w*a+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ic.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ic.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,l=e.z,a=e.w,c=2*(o*s-l*n),u=2*(l*t-r*s),f=2*(r*n-o*t);return this.x=t+a*c+o*f-l*u,this.y=n+a*u+l*c-r*f,this.z=s+a*f+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,l=t.y,a=t.z;return this.x=s*a-r*l,this.y=r*o-n*a,this.z=n*l-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return va.copy(this).projectOnVector(e),this.sub(va)}reflect(e){return this.sub(va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(qe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},va=new U,ic=new Lt,ke=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,l,a,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,l,a,c)}set(e,t,n,s,r,o,l,a,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=l,u[3]=t,u[4]=r,u[5]=a,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],l=n[3],a=n[6],c=n[1],u=n[4],f=n[7],h=n[2],p=n[5],_=n[8],b=s[0],m=s[3],d=s[6],M=s[1],A=s[4],x=s[7],w=s[2],S=s[5],C=s[8];return r[0]=o*b+l*M+a*w,r[3]=o*m+l*A+a*S,r[6]=o*d+l*x+a*C,r[1]=c*b+u*M+f*w,r[4]=c*m+u*A+f*S,r[7]=c*d+u*x+f*C,r[2]=h*b+p*M+_*w,r[5]=h*m+p*A+_*S,r[8]=h*d+p*x+_*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],l=e[5],a=e[6],c=e[7],u=e[8];return t*o*u-t*l*c-n*r*u+n*l*a+s*r*c-s*o*a}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],l=e[5],a=e[6],c=e[7],u=e[8],f=u*o-l*c,h=l*a-u*r,p=c*r-o*a,_=t*f+n*h+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/_;return e[0]=f*b,e[1]=(s*c-u*n)*b,e[2]=(l*n-s*o)*b,e[3]=h*b,e[4]=(u*t-s*a)*b,e[5]=(s*r-l*t)*b,e[6]=p*b,e[7]=(n*a-c*t)*b,e[8]=(o*t-n*r)*b,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,l){let a=Math.cos(r),c=Math.sin(r);return this.set(n*a,n*c,-n*(a*o+c*l)+o+e,-s*c,s*a,-s*(-c*o+a*l)+l+t,0,0,1),this}scale(e,t){return pi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ba.makeScale(e,t)),this}rotate(e){return pi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ba.makeRotation(-e)),this}translate(e,t){return pi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ba.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},ba=new ke,sc=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rc=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $u(){let i={enabled:!0,workingColorSpace:_s,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===nt&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===nt&&(s.r=zi(s.r),s.g=zi(s.g),s.b=zi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===On?xs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return pi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return pi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[_s]:{primaries:e,whitePoint:n,transfer:xs,toXYZ:sc,fromXYZ:rc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:n,transfer:nt,toXYZ:sc,fromXYZ:rc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),i}var Je=$u();function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var wi,Vr=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{wi===void 0&&(wi=ys("canvas")),wi.width=e.width,wi.height=e.height;let s=wi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=wi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ys("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Un(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Un(t[n]/255)*255):t[n]=Un(t[n]);return{data:t,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ju=0,Xi=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=ts(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,l=s.length;o<l;o++)s[o].isDataTexture?r.push(Sa(s[o].image)):r.push(Sa(s[o]))}else r=Sa(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Sa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}var Qu=0,Ma=new U,Yt=class i extends fn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=bn,s=bn,r=It,o=ii,l=on,a=Kt,c=i.DEFAULT_ANISOTROPY,u=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qu++}),this.uuid=ts(),this.name="",this.source=new Xi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=a,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ma).x}get height(){return this.source.getSize(Ma).y}get depth(){return this.source.getSize(Ma).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Le(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Le(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kr:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kr:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=cl;Yt.DEFAULT_ANISOTROPY=1;var _t=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,a=e.elements,c=a[0],u=a[4],f=a[8],h=a[1],p=a[5],_=a[9],b=a[2],m=a[6],d=a[10];if(Math.abs(u-h)<.01&&Math.abs(f-b)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+b)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,x=(p+1)/2,w=(d+1)/2,S=(u+h)/4,C=(f+b)/4,y=(_+m)/4;return A>x&&A>w?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=S/n,r=C/n):x>w?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=S/s,r=y/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=C/r,s=y/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-_)*(m-_)+(f-b)*(f-b)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-_)/M,this.y=(f-b)/M,this.z=(h-u)/M,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gr=class extends fn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new _t(0,0,e,t),this.scissorTest=!1,this.viewport=new _t(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Yt(s),o=n.count;for(let l=0;l<o;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Xi(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Zt=class extends Gr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},vs=class extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Wr=class extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Qe=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,l,a,c,u,f,h,p,_,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,l,a,c,u,f,h,p,_,b,m)}set(e,t,n,s,r,o,l,a,c,u,f,h,p,_,b,m){let d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=l,d[13]=a,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=_,d[11]=b,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Ei.setFromMatrixColumn(e,0).length(),r=1/Ei.setFromMatrixColumn(e,1).length(),o=1/Ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),l=Math.sin(n),a=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){let h=o*u,p=o*f,_=l*u,b=l*f;t[0]=a*u,t[4]=-a*f,t[8]=c,t[1]=p+_*c,t[5]=h-b*c,t[9]=-l*a,t[2]=b-h*c,t[6]=_+p*c,t[10]=o*a}else if(e.order==="YXZ"){let h=a*u,p=a*f,_=c*u,b=c*f;t[0]=h+b*l,t[4]=_*l-p,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-l,t[2]=p*l-_,t[6]=b+h*l,t[10]=o*a}else if(e.order==="ZXY"){let h=a*u,p=a*f,_=c*u,b=c*f;t[0]=h-b*l,t[4]=-o*f,t[8]=_+p*l,t[1]=p+_*l,t[5]=o*u,t[9]=b-h*l,t[2]=-o*c,t[6]=l,t[10]=o*a}else if(e.order==="ZYX"){let h=o*u,p=o*f,_=l*u,b=l*f;t[0]=a*u,t[4]=_*c-p,t[8]=h*c+b,t[1]=a*f,t[5]=b*c+h,t[9]=p*c-_,t[2]=-c,t[6]=l*a,t[10]=o*a}else if(e.order==="YZX"){let h=o*a,p=o*c,_=l*a,b=l*c;t[0]=a*u,t[4]=b-h*f,t[8]=_*f+p,t[1]=f,t[5]=o*u,t[9]=-l*u,t[2]=-c*u,t[6]=p*f+_,t[10]=h-b*f}else if(e.order==="XZY"){let h=o*a,p=o*c,_=l*a,b=l*c;t[0]=a*u,t[4]=-f,t[8]=c*u,t[1]=h*f+b,t[5]=o*u,t[9]=p*f-_,t[2]=_*f-p,t[6]=l*u,t[10]=b*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ed,e,td)}lookAt(e,t,n){let s=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Hn.crossVectors(n,$t),Hn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Hn.crossVectors(n,$t)),Hn.normalize(),rr.crossVectors($t,Hn),s[0]=Hn.x,s[4]=rr.x,s[8]=$t.x,s[1]=Hn.y,s[5]=rr.y,s[9]=$t.y,s[2]=Hn.z,s[6]=rr.z,s[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],l=n[4],a=n[8],c=n[12],u=n[1],f=n[5],h=n[9],p=n[13],_=n[2],b=n[6],m=n[10],d=n[14],M=n[3],A=n[7],x=n[11],w=n[15],S=s[0],C=s[4],y=s[8],E=s[12],R=s[1],I=s[5],F=s[9],O=s[13],P=s[2],k=s[6],K=s[10],Y=s[14],ne=s[3],q=s[7],Z=s[11],J=s[15];return r[0]=o*S+l*R+a*P+c*ne,r[4]=o*C+l*I+a*k+c*q,r[8]=o*y+l*F+a*K+c*Z,r[12]=o*E+l*O+a*Y+c*J,r[1]=u*S+f*R+h*P+p*ne,r[5]=u*C+f*I+h*k+p*q,r[9]=u*y+f*F+h*K+p*Z,r[13]=u*E+f*O+h*Y+p*J,r[2]=_*S+b*R+m*P+d*ne,r[6]=_*C+b*I+m*k+d*q,r[10]=_*y+b*F+m*K+d*Z,r[14]=_*E+b*O+m*Y+d*J,r[3]=M*S+A*R+x*P+w*ne,r[7]=M*C+A*I+x*k+w*q,r[11]=M*y+A*F+x*K+w*Z,r[15]=M*E+A*O+x*Y+w*J,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],l=e[5],a=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],_=e[3],b=e[7],m=e[11],d=e[15],M=a*p-c*h,A=l*p-c*f,x=l*h-a*f,w=o*p-c*u,S=o*h-a*u,C=o*f-l*u;return t*(b*M-m*A+d*x)-n*(_*M-m*w+d*S)+s*(_*A-b*w+d*C)-r*(_*x-b*S+m*C)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],l=e[9],a=e[2],c=e[6],u=e[10];return t*(o*u-l*c)-n*(r*u-l*a)+s*(r*c-o*a)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],l=e[5],a=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],_=e[12],b=e[13],m=e[14],d=e[15],M=t*l-n*o,A=t*a-s*o,x=t*c-r*o,w=n*a-s*l,S=n*c-r*l,C=s*c-r*a,y=u*b-f*_,E=u*m-h*_,R=u*d-p*_,I=f*m-h*b,F=f*d-p*b,O=h*d-p*m,P=M*O-A*F+x*I+w*R-S*E+C*y;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/P;return e[0]=(l*O-a*F+c*I)*k,e[1]=(s*F-n*O-r*I)*k,e[2]=(b*C-m*S+d*w)*k,e[3]=(h*S-f*C-p*w)*k,e[4]=(a*R-o*O-c*E)*k,e[5]=(t*O-s*R+r*E)*k,e[6]=(m*x-_*C-d*A)*k,e[7]=(u*C-h*x+p*A)*k,e[8]=(o*F-l*R+c*y)*k,e[9]=(n*R-t*F-r*y)*k,e[10]=(_*S-b*x+d*M)*k,e[11]=(f*x-u*S-p*M)*k,e[12]=(l*E-o*I-a*y)*k,e[13]=(t*I-n*E+s*y)*k,e[14]=(b*A-_*w-m*M)*k,e[15]=(u*w-f*A+h*M)*k,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,l=e.y,a=e.z,c=r*o,u=r*l;return this.set(c*o+n,c*l-s*a,c*a+s*l,0,c*l+s*a,u*l+n,u*a-s*o,0,c*a-s*l,u*a+s*o,r*a*a+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,l=t._z,a=t._w,c=r+r,u=o+o,f=l+l,h=r*c,p=r*u,_=r*f,b=o*u,m=o*f,d=l*f,M=a*c,A=a*u,x=a*f,w=n.x,S=n.y,C=n.z;return s[0]=(1-(b+d))*w,s[1]=(p+x)*w,s[2]=(_-A)*w,s[3]=0,s[4]=(p-x)*S,s[5]=(1-(h+d))*S,s[6]=(m+M)*S,s[7]=0,s[8]=(_+A)*C,s[9]=(m-M)*C,s[10]=(1-(h+b))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Ei.set(s[0],s[1],s[2]).length(),l=Ei.set(s[4],s[5],s[6]).length(),a=Ei.set(s[8],s[9],s[10]).length();r<0&&(o=-o),cn.copy(this);let c=1/o,u=1/l,f=1/a;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=f,cn.elements[9]*=f,cn.elements[10]*=f,t.setFromRotationMatrix(cn),n.x=o,n.y=l,n.z=a,this}makePerspective(e,t,n,s,r,o,l=dn,a=!1){let c=this.elements,u=2*r/(t-e),f=2*r/(n-s),h=(t+e)/(t-e),p=(n+s)/(n-s),_,b;if(a)_=r/(o-r),b=o*r/(o-r);else if(l===dn)_=-(o+r)/(o-r),b=-2*o*r/(o-r);else if(l===Vi)_=-o/(o-r),b=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,l=dn,a=!1){let c=this.elements,u=2/(t-e),f=2/(n-s),h=-(t+e)/(t-e),p=-(n+s)/(n-s),_,b;if(a)_=1/(o-r),b=o/(o-r);else if(l===dn)_=-2/(o-r),b=-(o+r)/(o-r);else if(l===Vi)_=-1/(o-r),b=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ei=new U,cn=new Qe,ed=new U(0,0,0),td=new U(1,1,1),Hn=new U,rr=new U,$t=new U,oc=new Qe,ac=new Lt,Mn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],l=s[8],a=s[1],c=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(a,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(a,r));break;case"ZYX":this._y=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(a,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return oc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(oc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ac.setFromEuler(this),this.setFromQuaternion(ac,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Mn.DEFAULT_ORDER="XYZ";var bs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},nd=0,lc=new U,Ai=new Lt,Rn=new Qe,or=new U,ls=new U,id=new U,sd=new Lt,cc=new U(1,0,0),hc=new U(0,1,0),uc=new U(0,0,1),dc={type:"added"},rd={type:"removed"},Ti={type:"childadded",child:null},wa={type:"childremoved",child:null},wt=class i extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new U,t=new Mn,n=new Lt,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qe},normalMatrix:{value:new ke}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.premultiply(Ai),this}rotateX(e){return this.rotateOnAxis(cc,e)}rotateY(e){return this.rotateOnAxis(hc,e)}rotateZ(e){return this.rotateOnAxis(uc,e)}translateOnAxis(e,t){return lc.copy(e).applyQuaternion(this.quaternion),this.position.add(lc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cc,e)}translateY(e){return this.translateOnAxis(hc,e)}translateZ(e){return this.translateOnAxis(uc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?or.copy(e):or.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ls,or,this.up):Rn.lookAt(or,ls,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),Ai.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Be("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(dc),Ti.child=e,this.dispatchEvent(Ti),Ti.child=null):Be("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rd),wa.child=e,this.dispatchEvent(wa),wa.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(dc),Ti.child=e,this.dispatchEvent(Ti),Ti.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,id),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,sd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,l=r.length;o<l;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,a){return l[a.uuid]===void 0&&(l[a.uuid]=a.toJSON(e)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let a=l.shapes;if(Array.isArray(a))for(let c=0,u=a.length;c<u;c++){let f=a[c];r(e.shapes,f)}else r(e.shapes,a)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let a=0,c=this.material.length;a<c;a++)l.push(r(e.materials,this.material[a]));s.material=l}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){let a=this.animations[l];s.animations.push(r(e.animations,a))}}if(t){let l=o(e.geometries),a=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),_=o(e.nodes);l.length>0&&(n.geometries=l),a.length>0&&(n.materials=a),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function o(l){let a=[];for(let c in l){let u=l[c];delete u.metadata,a.push(u)}return a}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};wt.DEFAULT_UP=new U(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qt=class extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}},od={type:"move"},qi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,l=this._targetRay,a=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let b of e.hand.values()){let m=t.getJointPose(b,n),d=this._getHandJoint(c,b);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else a!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,a.eventsEnabled&&a.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(od)))}return l!==null&&(l.visible=s!==null),a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},fh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},ar={h:0,s:0,l:0};function Ea(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Fe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Je.workingColorSpace){if(e=xl(e,1),t=qe(t,0,1),n=qe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ea(o,r,e+1/3),this.g=Ea(o,r,e),this.b=Ea(o,r,e-1/3)}return Je.colorSpaceToWorking(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],l=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Le("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){let n=fh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Un(e.r),this.g=Un(e.g),this.b=Un(e.b),this}copyLinearToSRGB(e){return this.r=zi(e.r),this.g=zi(e.g),this.b=zi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return Je.workingToColorSpace(Ft.copy(this),e),Math.round(qe(Ft.r*255,0,255))*65536+Math.round(qe(Ft.g*255,0,255))*256+Math.round(qe(Ft.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.workingToColorSpace(Ft.copy(this),t);let n=Ft.r,s=Ft.g,r=Ft.b,o=Math.max(n,s,r),l=Math.min(n,s,r),a,c,u=(l+o)/2;if(l===o)a=0,c=0;else{let f=o-l;switch(c=u<=.5?f/(o+l):f/(2-o-l),o){case n:a=(s-r)/f+(s<r?6:0);break;case s:a=(r-n)/f+2;break;case r:a=(n-s)/f+4;break}a/=6}return e.h=a,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.workingToColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=zt){Je.workingToColorSpace(Ft.copy(this),e);let t=Ft.r,n=Ft.g,s=Ft.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Vn),this.setHSL(Vn.h+e,Vn.s+t,Vn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vn),e.getHSL(ar);let n=ms(Vn.h,ar.h,t),s=ms(Vn.s,ar.s,t),r=ms(Vn.l,ar.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ft=new Fe;Fe.NAMES=fh;var mi=class extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},hn=new U,Pn=new U,Aa=new U,In=new U,Ci=new U,Ri=new U,fc=new U,Ta=new U,Ca=new U,Ra=new U,Pa=new _t,Ia=new _t,La=new _t,Nn=class i{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),hn.subVectors(e,t),s.cross(hn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){hn.subVectors(s,t),Pn.subVectors(n,t),Aa.subVectors(e,t);let o=hn.dot(hn),l=hn.dot(Pn),a=hn.dot(Aa),c=Pn.dot(Pn),u=Pn.dot(Aa),f=o*c-l*l;if(f===0)return r.set(0,0,0),null;let h=1/f,p=(c*a-l*u)*h,_=(o*u-l*a)*h;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,s,r,o,l,a){return this.getBarycoord(e,t,n,s,In)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(r,In.x),a.addScaledVector(o,In.y),a.addScaledVector(l,In.z),a)}static getInterpolatedAttribute(e,t,n,s,r,o){return Pa.setScalar(0),Ia.setScalar(0),La.setScalar(0),Pa.fromBufferAttribute(e,t),Ia.fromBufferAttribute(e,n),La.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Pa,r.x),o.addScaledVector(Ia,r.y),o.addScaledVector(La,r.z),o}static isFrontFacing(e,t,n,s){return hn.subVectors(n,t),Pn.subVectors(e,t),hn.cross(Pn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),hn.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,l;Ci.subVectors(s,n),Ri.subVectors(r,n),Ta.subVectors(e,n);let a=Ci.dot(Ta),c=Ri.dot(Ta);if(a<=0&&c<=0)return t.copy(n);Ca.subVectors(e,s);let u=Ci.dot(Ca),f=Ri.dot(Ca);if(u>=0&&f<=u)return t.copy(s);let h=a*f-u*c;if(h<=0&&a>=0&&u<=0)return o=a/(a-u),t.copy(n).addScaledVector(Ci,o);Ra.subVectors(e,r);let p=Ci.dot(Ra),_=Ri.dot(Ra);if(_>=0&&p<=_)return t.copy(r);let b=p*c-a*_;if(b<=0&&c>=0&&_<=0)return l=c/(c-_),t.copy(n).addScaledVector(Ri,l);let m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return fc.subVectors(r,s),l=(f-u)/(f-u+(p-_)),t.copy(s).addScaledVector(fc,l);let d=1/(m+b+h);return o=b*d,l=h*d,t.copy(n).addScaledVector(Ci,o).addScaledVector(Ri,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Mt=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=r.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,un):un.fromBufferAttribute(r,o),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),lr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),lr.copy(n.boundingBox)),lr.applyMatrix4(e.matrixWorld),this.union(lr)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cs),cr.subVectors(this.max,cs),Pi.subVectors(e.a,cs),Ii.subVectors(e.b,cs),Li.subVectors(e.c,cs),Gn.subVectors(Ii,Pi),Wn.subVectors(Li,Ii),hi.subVectors(Pi,Li);let t=[0,-Gn.z,Gn.y,0,-Wn.z,Wn.y,0,-hi.z,hi.y,Gn.z,0,-Gn.x,Wn.z,0,-Wn.x,hi.z,0,-hi.x,-Gn.y,Gn.x,0,-Wn.y,Wn.x,0,-hi.y,hi.x,0];return!Da(t,Pi,Ii,Li,cr)||(t=[1,0,0,0,1,0,0,0,1],!Da(t,Pi,Ii,Li,cr))?!1:(hr.crossVectors(Gn,Wn),t=[hr.x,hr.y,hr.z],Da(t,Pi,Ii,Li,cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ln=[new U,new U,new U,new U,new U,new U,new U,new U],un=new U,lr=new Mt,Pi=new U,Ii=new U,Li=new U,Gn=new U,Wn=new U,hi=new U,cs=new U,cr=new U,hr=new U,ui=new U;function Da(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ui.fromArray(i,r);let l=s.x*Math.abs(ui.x)+s.y*Math.abs(ui.y)+s.z*Math.abs(ui.z),a=e.dot(ui),c=t.dot(ui),u=n.dot(ui);if(Math.max(-Math.max(a,c,u),Math.min(a,c,u))>l)return!1}return!0}var St=new U,ur=new Ue,ad=0,Gt=class extends fn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ad++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=lh,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ur.fromBufferAttribute(this,t),ur.applyMatrix3(e),this.setXY(t,ur.x,ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Bi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=kt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Bi(t,this.array)),t}setX(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Bi(t,this.array)),t}setY(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Bi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Bi(t,this.array)),t}setW(e,t){return this.normalized&&(t=kt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),s=kt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=kt(t,this.array),n=kt(n,this.array),s=kt(s,this.array),r=kt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ss=class extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ms=class extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var gt=class extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}},ld=new Mt,hs=new U,Na=new U,Fn=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):ld.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;hs.subVectors(e,this.center);let t=hs.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(hs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Na.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(hs.copy(e.center).add(Na)),this.expandByPoint(hs.copy(e.center).sub(Na))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},cd=0,sn=new Qe,Ua=new wt,Di=new U,jt=new Mt,us=new Mt,Ct=new U,Pt=class i extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Du(e)?Ms:Ss)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return sn.makeRotationFromQuaternion(e),this.applyMatrix4(sn),this}rotateX(e){return sn.makeRotationX(e),this.applyMatrix4(sn),this}rotateY(e){return sn.makeRotationY(e),this.applyMatrix4(sn),this}rotateZ(e){return sn.makeRotationZ(e),this.applyMatrix4(sn),this}translate(e,t,n){return sn.makeTranslation(e,t,n),this.applyMatrix4(sn),this}scale(e,t,n){return sn.makeScale(e,t,n),this.applyMatrix4(sn),this}lookAt(e){return Ua.lookAt(e),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Be("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];jt.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Be('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Be("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let l=t[r];us.setFromBufferAttribute(l),this.morphTargetsRelative?(Ct.addVectors(jt.min,us.min),jt.expandByPoint(Ct),Ct.addVectors(jt.max,us.max),jt.expandByPoint(Ct)):(jt.expandByPoint(us.min),jt.expandByPoint(us.max))}jt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Ct.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Ct));if(t)for(let r=0,o=t.length;r<o;r++){let l=t[r],a=this.morphTargetsRelative;for(let c=0,u=l.count;c<u;c++)Ct.fromBufferAttribute(l,c),a&&(Di.fromBufferAttribute(e,c),Ct.add(Di)),s=Math.max(s,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Be('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Be("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Gt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let l=[],a=[];for(let y=0;y<n.count;y++)l[y]=new U,a[y]=new U;let c=new U,u=new U,f=new U,h=new Ue,p=new Ue,_=new Ue,b=new U,m=new U;function d(y,E,R){c.fromBufferAttribute(n,y),u.fromBufferAttribute(n,E),f.fromBufferAttribute(n,R),h.fromBufferAttribute(r,y),p.fromBufferAttribute(r,E),_.fromBufferAttribute(r,R),u.sub(c),f.sub(c),p.sub(h),_.sub(h);let I=1/(p.x*_.y-_.x*p.y);isFinite(I)&&(b.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(I),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(I),l[y].add(b),l[E].add(b),l[R].add(b),a[y].add(m),a[E].add(m),a[R].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,E=M.length;y<E;++y){let R=M[y],I=R.start,F=R.count;for(let O=I,P=I+F;O<P;O+=3)d(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let A=new U,x=new U,w=new U,S=new U;function C(y){w.fromBufferAttribute(s,y),S.copy(w);let E=l[y];A.copy(E),A.sub(w.multiplyScalar(w.dot(E))).normalize(),x.crossVectors(S,E);let I=x.dot(a[y])<0?-1:1;o.setXYZW(y,A.x,A.y,A.z,I)}for(let y=0,E=M.length;y<E;++y){let R=M[y],I=R.start,F=R.count;for(let O=I,P=I+F;O<P;O+=3)C(e.getX(O+0)),C(e.getX(O+1)),C(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);let s=new U,r=new U,o=new U,l=new U,a=new U,c=new U,u=new U,f=new U;if(e)for(let h=0,p=e.count;h<p;h+=3){let _=e.getX(h+0),b=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,b),o.fromBufferAttribute(t,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),l.fromBufferAttribute(n,_),a.fromBufferAttribute(n,b),c.fromBufferAttribute(n,m),l.add(u),a.add(u),c.add(u),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(b,a.x,a.y,a.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(l,a){let c=l.array,u=l.itemSize,f=l.normalized,h=new c.constructor(a.length*u),p=0,_=0;for(let b=0,m=a.length;b<m;b++){l.isInterleavedBufferAttribute?p=a[b]*l.data.stride+l.offset:p=a[b]*u;for(let d=0;d<u;d++)h[_++]=c[p++]}return new Gt(h,u,f)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let l in s){let a=s[l],c=e(a,n);t.setAttribute(l,c)}let r=this.morphAttributes;for(let l in r){let a=[],c=r[l];for(let u=0,f=c.length;u<f;u++){let h=c[u],p=e(h,n);a.push(p)}t.morphAttributes[l]=a}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let l=0,a=o.length;l<a;l++){let c=o[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let a=this.parameters;for(let c in a)a[c]!==void 0&&(e[c]=a[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let a in n){let c=n[a];e.data.attributes[a]=c.toJSON(e.data)}let s={},r=!1;for(let a in this.morphAttributes){let c=this.morphAttributes[a],u=[];for(let f=0,h=c.length;f<h;f++){let p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(s[a]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],f=r[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,u=o.length;c<u;c++){let f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}let l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());let a=e.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Fa=new U,hd=new U,ud=new ke,Ht=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Fa.subVectors(n,t).cross(hd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Fa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ud.getNormalMatrix(e),s=this.coplanarPoint(Fa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},dd=0,wn=class extends fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=ji,this.side=ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tl,this.blendDst=nl,this.blendEquation=xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Fe(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=th,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ir,this.stencilZFail=Ir,this.stencilZPass=Ir,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Le(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Le(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let l in r){let a=r[l];delete a.metadata,o.push(a)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Fe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Ht().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Dn=new U,Oa=new U,dr=new U,fr=new U,gi=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Oa.copy(e).add(t).multiplyScalar(.5),dr.copy(t).sub(e).normalize(),fr.copy(this.origin).sub(Oa);let r=e.distanceTo(t)*.5,o=-this.direction.dot(dr),l=fr.dot(this.direction),a=-fr.dot(dr),c=fr.lengthSq(),u=Math.abs(1-o*o),f,h,p,_;if(u>0)if(f=o*a-l,h=o*l-a,_=r*u,f>=0)if(h>=-_)if(h<=_){let b=1/u;f*=b,h*=b,p=f*(f+o*h+2*l)+h*(o*f+h+2*a)+c}else h=r,f=Math.max(0,-(o*h+l)),p=-f*f+h*(h+2*a)+c;else h=-r,f=Math.max(0,-(o*h+l)),p=-f*f+h*(h+2*a)+c;else h<=-_?(f=Math.max(0,-(-o*r+l)),h=f>0?-r:Math.min(Math.max(-r,-a),r),p=-f*f+h*(h+2*a)+c):h<=_?(f=0,h=Math.min(Math.max(-r,-a),r),p=h*(h+2*a)+c):(f=Math.max(0,-(o*r+l)),h=f>0?r:Math.min(Math.max(-r,-a),r),p=-f*f+h*(h+2*a)+c);else h=o>0?-r:r,f=Math.max(0,-(o*h+l)),p=-f*f+h*(h+2*a)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Oa).addScaledVector(dr,h),p}intersectSphere(e,t){if(e.radius<0)return null;Dn.subVectors(e.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),l=n-o,a=n+o;return a<0?null:l<0?this.at(a,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,l,a,c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),f>=0?(l=(e.min.z-h.z)*f,a=(e.max.z-h.z)*f):(l=(e.max.z-h.z)*f,a=(e.min.z-h.z)*f),n>a||l>s)||((l>n||n!==n)&&(n=l),(a<s||s!==s)&&(s=a),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,l=this.direction,a=l.x,c=l.y,u=l.z,f=e.x-o.x,h=e.y-o.y,p=e.z-o.z,_=t.x-o.x,b=t.y-o.y,m=t.z-o.z,d=n.x-o.x,M=n.y-o.y,A=n.z-o.z,x=Math.abs(a),w=Math.abs(c),S=Math.abs(u),C,y,E,R,I,F,O,P,k,K,Y,ne;if(x>=w&&x>=S?(E=a,F=f,k=_,ne=d,a>=0?(C=c,y=u,R=h,I=p,O=b,P=m,K=M,Y=A):(C=u,y=c,R=p,I=h,O=m,P=b,K=A,Y=M)):w>=S?(E=c,F=h,k=b,ne=M,c>=0?(C=u,y=a,R=p,I=f,O=m,P=_,K=A,Y=d):(C=a,y=u,R=f,I=p,O=_,P=m,K=d,Y=A)):(E=u,F=p,k=m,ne=A,u>=0?(C=a,y=c,R=f,I=h,O=_,P=b,K=d,Y=M):(C=c,y=a,R=h,I=f,O=b,P=_,K=M,Y=d)),E===0)return null;let q=C/E,Z=y/E,J=1/E,ye=R-q*F,ve=I-Z*F,ze=O-q*k,Ve=P-Z*k,Ee=K-q*ne,G=Y-Z*ne,Q=Ee*Ve-G*ze,ce=ye*G-ve*Ee,Ce=ze*ve-Ve*ye;if(s){if(Q<0||ce<0||Ce<0)return null}else if((Q<0||ce<0||Ce<0)&&(Q>0||ce>0||Ce>0))return null;let oe=Q+ce+Ce;if(oe===0)return null;let Ne=J*(Q*F+ce*k+Ce*ne);return(oe>0?Ne<0:Ne>0)?null:this.at(Ne/oe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ws=class extends wn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},pc=new Qe,di=new gi,pr=new Fn,mc=new U,mr=new U,gr=new U,_r=new U,Ba=new U,xr=new U,gc=new U,yr=new U,ft=class extends wt{constructor(e=new Pt,t=new ws){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let l=this.morphTargetInfluences;if(r&&l){xr.set(0,0,0);for(let a=0,c=r.length;a<c;a++){let u=l[a],f=r[a];u!==0&&(Ba.fromBufferAttribute(f,e),o?xr.addScaledVector(Ba,u):xr.addScaledVector(Ba.sub(t),u))}t.add(xr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(r),di.copy(e.ray).recast(e.near),!(pr.containsPoint(di.origin)===!1&&(di.intersectSphere(pr,mc)===null||di.origin.distanceToSquared(mc)>(e.far-e.near)**2))&&(pc.copy(r).invert(),di.copy(e.ray).applyMatrix4(pc),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,di)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,l=r.index,a=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(l!==null)if(Array.isArray(o))for(let _=0,b=h.length;_<b;_++){let m=h[_],d=o[m.materialIndex],M=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,w=A;x<w;x+=3){let S=l.getX(x),C=l.getX(x+1),y=l.getX(x+2);s=vr(this,d,e,n,c,u,f,S,C,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let _=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let m=_,d=b;m<d;m+=3){let M=l.getX(m),A=l.getX(m+1),x=l.getX(m+2);s=vr(this,o,e,n,c,u,f,M,A,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(a!==void 0)if(Array.isArray(o))for(let _=0,b=h.length;_<b;_++){let m=h[_],d=o[m.materialIndex],M=Math.max(m.start,p.start),A=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=M,w=A;x<w;x+=3){let S=x,C=x+1,y=x+2;s=vr(this,d,e,n,c,u,f,S,C,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let _=Math.max(0,p.start),b=Math.min(a.count,p.start+p.count);for(let m=_,d=b;m<d;m+=3){let M=m,A=m+1,x=m+2;s=vr(this,o,e,n,c,u,f,M,A,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function fd(i,e,t,n,s,r,o,l){let a;if(e.side===Dt?a=n.intersectTriangle(o,r,s,!0,l):a=n.intersectTriangle(s,r,o,e.side===ti,l),a===null)return null;yr.copy(l),yr.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(yr);return c<t.near||c>t.far?null:{distance:c,point:yr.clone(),object:i}}function vr(i,e,t,n,s,r,o,l,a,c){i.getVertexPosition(l,mr),i.getVertexPosition(a,gr),i.getVertexPosition(c,_r);let u=fd(i,e,t,n,mr,gr,_r,gc);if(u){let f=new U;Nn.getBarycoord(gc,mr,gr,_r,f),s&&(u.uv=Nn.getInterpolatedAttribute(s,l,a,c,f,new Ue)),r&&(u.uv1=Nn.getInterpolatedAttribute(r,l,a,c,f,new Ue)),o&&(u.normal=Nn.getInterpolatedAttribute(o,l,a,c,f,new U),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let h={a:l,b:a,c,normal:new U,materialIndex:0};Nn.getNormal(mr,gr,_r,h.normal),u.face=h,u.barycoord=f}return u}var Es=class extends Yt{constructor(e=null,t=1,n=1,s,r,o,l,a,c=Rt,u=Rt,f,h){super(null,o,l,a,c,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var As=class extends Gt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ni=new Qe,_c=new Qe,br=[],xc=new Mt,pd=new Qe,ds=new ft,fs=new Fn,Ts=class extends ft{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new As(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,pd)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ni),xc.copy(e.boundingBox).applyMatrix4(Ni),this.boundingBox.union(xc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ni),fs.copy(e.boundingSphere).applyMatrix4(Ni),this.boundingSphere.union(fs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let l=0;l<n.length;l++)n[l]=s[o+l]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(ds.geometry=this.geometry,ds.material=this.material,ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fs.copy(this.boundingSphere),fs.applyMatrix4(n),e.ray.intersectsSphere(fs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ni),_c.multiplyMatrices(n,Ni),ds.matrixWorld=_c,ds.raycast(e,br);for(let o=0,l=br.length;o<l;o++){let a=br[o];a.instanceId=r,a.object=this,t.push(a)}br.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new As(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Es(new Float32Array(s*this.count),s,this.count,xo,rn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let l=this.geometry.morphTargetsRelative?1:1-o,a=s*e;return r[a]=l,r.set(n,a+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},fi=new Fn,md=new Ue(.5,.5),Sr=new U,Yi=class{constructor(e=new Ht,t=new Ht,n=new Ht,s=new Ht,r=new Ht,o=new Ht){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(s),l[4].copy(r),l[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn,n=!1){let s=this.planes,r=e.elements,o=r[0],l=r[1],a=r[2],c=r[3],u=r[4],f=r[5],h=r[6],p=r[7],_=r[8],b=r[9],m=r[10],d=r[11],M=r[12],A=r[13],x=r[14],w=r[15];if(s[0].setComponents(c-o,p-u,d-_,w-M).normalize(),s[1].setComponents(c+o,p+u,d+_,w+M).normalize(),s[2].setComponents(c+l,p+f,d+b,w+A).normalize(),s[3].setComponents(c-l,p-f,d-b,w-A).normalize(),n)s[4].setComponents(a,h,m,x).normalize(),s[5].setComponents(c-a,p-h,d-m,w-x).normalize();else if(s[4].setComponents(c-a,p-h,d-m,w-x).normalize(),t===dn)s[5].setComponents(c+a,p+h,d+m,w+x).normalize();else if(t===Vi)s[5].setComponents(a,h,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(e){fi.center.set(0,0,0);let t=md.distanceTo(e.center);return fi.radius=.7071067811865476+t,fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Sr.x=s.normal.x>0?e.max.x:e.min.x,Sr.y=s.normal.y>0?e.max.y:e.min.y,Sr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Sr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var qn=class extends wn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Fe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xr=new U,qr=new U,yc=new Qe,ps=new gi,Mr=new Fn,ka=new U,vc=new U,Yr=class extends wt{constructor(e=new Pt,t=new qn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Xr.fromBufferAttribute(t,s-1),qr.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Xr.distanceTo(qr);e.setAttribute("lineDistance",new gt(n,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(s),Mr.radius+=r,e.ray.intersectsSphere(Mr)===!1)return;yc.copy(s).invert(),ps.copy(e.ray).applyMatrix4(yc);let l=r/((this.scale.x+this.scale.y+this.scale.z)/3),a=l*l,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){let p=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let b=p,m=_-1;b<m;b+=c){let d=u.getX(b),M=u.getX(b+1),A=wr(this,e,ps,a,d,M,b);A&&t.push(A)}if(this.isLineLoop){let b=u.getX(_-1),m=u.getX(p),d=wr(this,e,ps,a,b,m,_-1);d&&t.push(d)}}else{let p=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let b=p,m=_-1;b<m;b+=c){let d=wr(this,e,ps,a,b,b+1,b);d&&t.push(d)}if(this.isLineLoop){let b=wr(this,e,ps,a,_-1,p,_-1);b&&t.push(b)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}};function wr(i,e,t,n,s,r,o){let l=i.geometry.attributes.position;if(Xr.fromBufferAttribute(l,s),qr.fromBufferAttribute(l,r),t.distanceSqToSegment(Xr,qr,ka,vc)>n)return;ka.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ka);if(!(c<e.near||c>e.far))return{distance:c,point:vc.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var bc=new U,Sc=new U,_i=class extends Yr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)bc.fromBufferAttribute(t,s),Sc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+bc.distanceTo(Sc);e.setAttribute("lineDistance",new gt(n,1))}else Le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Cs=class extends Yt{constructor(e=[],t=ni,n,s,r,o,l,a,c,u){super(e,t,n,s,r,o,l,a,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Yn=class extends Yt{constructor(e,t,n=mn,s,r,o,l=Rt,a=Rt,c,u=Sn,f=1){if(u!==Sn&&u!==si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:f};super(h,s,r,o,l,a,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Xi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Zr=class extends Yn{constructor(e,t=mn,n=ni,s,r,o=Rt,l=Rt,a,c=Sn){let u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,n,s,r,o,l,a,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Rs=class extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Zn=class i extends Pt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let l=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let a=[],c=[],u=[],f=[],h=0,p=0;_("z","y","x",-1,-1,n,t,e,o,r,0),_("z","y","x",1,-1,n,t,-e,o,r,1),_("x","z","y",1,1,e,n,t,s,o,2),_("x","z","y",1,-1,e,n,-t,s,o,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(a),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(f,2));function _(b,m,d,M,A,x,w,S,C,y,E){let R=x/C,I=w/y,F=x/2,O=w/2,P=S/2,k=C+1,K=y+1,Y=0,ne=0,q=new U;for(let Z=0;Z<K;Z++){let J=Z*I-O;for(let ye=0;ye<k;ye++){let ve=ye*R-F;q[b]=ve*M,q[m]=J*A,q[d]=P,c.push(q.x,q.y,q.z),q[b]=0,q[m]=0,q[d]=S>0?1:-1,u.push(q.x,q.y,q.z),f.push(ye/C),f.push(1-Z/y),Y+=1}}for(let Z=0;Z<y;Z++)for(let J=0;J<C;J++){let ye=h+J+k*Z,ve=h+J+k*(Z+1),ze=h+(J+1)+k*(Z+1),Ve=h+(J+1)+k*Z;a.push(ye,ve,Ve),a.push(ve,ze,Ve),ne+=6}l.addGroup(p,ne,E),p+=ne,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Er=new U,Ar=new U,za=new U,Tr=new Nn,Ps=class extends Pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(ki*t),o=e.getIndex(),l=e.getAttribute("position"),a=o?o.count:l.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},p=[];for(let _=0;_<a;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);let{a:b,b:m,c:d}=Tr;if(b.fromBufferAttribute(l,c[0]),m.fromBufferAttribute(l,c[1]),d.fromBufferAttribute(l,c[2]),Tr.getNormal(za),f[0]=`${Math.round(b.x*s)},${Math.round(b.y*s)},${Math.round(b.z*s)}`,f[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,f[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let M=0;M<3;M++){let A=(M+1)%3,x=f[M],w=f[A],S=Tr[u[M]],C=Tr[u[A]],y=`${x}_${w}`,E=`${w}_${x}`;E in h&&h[E]?(za.dot(h[E].normal)<=r&&(p.push(S.x,S.y,S.z),p.push(C.x,C.y,C.z)),h[E]=null):y in h||(h[y]={index0:c[M],index1:c[A],normal:za.clone()})}}for(let _ in h)if(h[_]){let{index0:b,index1:m}=h[_];Er.fromBufferAttribute(l,b),Ar.fromBufferAttribute(l,m),p.push(Er.x,Er.y,Er.z),p.push(Ar.x,Ar.y,Ar.z)}this.setAttribute("position",new gt(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var Is=class i extends Pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,l=Math.floor(n),a=Math.floor(s),c=l+1,u=a+1,f=e/l,h=t/a,p=[],_=[],b=[],m=[];for(let d=0;d<u;d++){let M=d*h-o;for(let A=0;A<c;A++){let x=A*f-r;_.push(x,-M,0),b.push(0,0,1),m.push(A/l),m.push(1-d/a)}}for(let d=0;d<a;d++)for(let M=0;M<l;M++){let A=M+c*d,x=M+c*(d+1),w=M+1+c*(d+1),S=M+1+c*d;p.push(A,x,S),p.push(x,w,S)}this.setIndex(p),this.setAttribute("position",new gt(_,3)),this.setAttribute("normal",new gt(b,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};function vi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Mc(s))s.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Mc(s[0])){let r=[];for(let o=0,l=s.length;o<l;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Ot(i){let e={};for(let t=0;t<i.length;t++){let n=vi(i[t]);for(let s in n)e[s]=n[s]}return e}function Mc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function gd(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function yl(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}var ph={clone:vi,merge:Ot},_d=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,en=class extends wn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_d,this.fragmentShader=xd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vi(e.uniforms),this.uniformsGroups=gd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Fe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new _t().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Qe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Kr=class extends en{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},it=class extends wn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Fe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ls=class extends it{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Fe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Fe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Fe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ds=class extends wn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Fe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Fe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Js,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=ho,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Jr=class extends wn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},$r=class extends wn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ui(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ha(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Kn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let l=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let l=t[1];e<l&&(n=2,r=l);for(let a=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let l=n+o>>>1;e<t[l]?o=l:n=l+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},jr=class extends Kn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Wa,endingEnd:Wa}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,l=s[r],a=s[o];if(l===void 0)switch(this.getSettings_().endingStart){case Xa:r=e,l=2*t-n;break;case qa:r=s.length-2,l=t+s[r]-s[r+1];break;default:r=e,l=n}if(a===void 0)switch(this.getSettings_().endingEnd){case Xa:o=e,a=2*n-t;break;case qa:o=1,a=n+s[1]-s[0];break;default:o=e-1,a=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-l),this._weightNext=c/(a-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,a=e*l,c=a-l,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,p=this._weightNext,_=(n-t)/(s-t),b=_*_,m=b*_,d=-h*m+2*h*b-h*_,M=(1+h)*m+(-1.5-2*h)*b+(-.5+h)*_+1,A=(-1-p)*m+(1.5+p)*b+.5*_,x=p*m-p*b;for(let w=0;w!==l;++w)r[w]=d*o[u+w]+M*o[c+w]+A*o[a+w]+x*o[f+w];return r}},Qr=class extends Kn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,a=e*l,c=a-l,u=(n-t)/(s-t),f=1-u;for(let h=0;h!==l;++h)r[h]=o[c+h]*f+o[a+h]*u;return r}},eo=class extends Kn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},to=class extends Kn{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,a=e*l,c=a-l,u=this.inTangents,f=this.outTangents;if(!u||!f){let _=(n-t)/(s-t),b=1-_;for(let m=0;m!==l;++m)r[m]=o[c+m]*b+o[a+m]*_;return r}let h=l*2,p=e-1;for(let _=0;_!==l;++_){let b=o[c+_],m=o[a+_],d=p*h+_*2,M=f[d],A=f[d+1],x=e*h+_*2,w=u[x],S=u[x+1],C=vd(n,t,M,w,s);r[_]=mh(C,b,A,S,m)}return r}};function mh(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function yd(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function vd(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let l=mh(r,e,t,n,s)-i;if(Math.abs(l)<1e-10)break;let a=yd(r,e,t,n,s);if(Math.abs(a)<1e-10)break;r=Math.max(0,Math.min(1,r-l/a))}return r}var tn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ui(t,this.TimeBufferType),this.values=Ui(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ui(e.times,Array),values:Ui(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Ha(e.settings)&&(n.settings={inTangents:Ui(e.settings.inTangents,Array),outTangents:Ui(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Qr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new jr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new to(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case gs:t=this.InterpolantFactoryMethodDiscrete;break;case Hr:t=this.InterpolantFactoryMethodLinear;break;case Pr:t=this.InterpolantFactoryMethodSmooth;break;case Ga:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Le("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return gs;case this.InterpolantFactoryMethodLinear:return Hr;case this.InterpolantFactoryMethodSmooth:return Pr;case this.InterpolantFactoryMethodBezier:return Ga}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Ha(this.settings)&&(wc(this.settings.inTangents,e),wc(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let l=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*l,o*l)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Be("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Be("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let l=0;l!==r;l++){let a=n[l];if(typeof a=="number"&&isNaN(a)){Be("KeyframeTrack: Time is not a valid number.",this,l,a),e=!1;break}if(o!==null&&o>a){Be("KeyframeTrack: Out of order keys.",this,l,a,o),e=!1;break}o=a}if(s!==void 0&&Nu(s))for(let l=0,a=s.length;l!==a;++l){let c=s[l];if(isNaN(c)){Be("KeyframeTrack: Value is not a valid number.",this,l,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Pr,r=e.length-1,o=1;for(let l=1;l<r;++l){let a=!1,c=e[l],u=e[l+1];if(c!==u&&(l!==1||c!==e[0]))if(s)a=!0;else{let f=l*n,h=f-n,p=f+n;for(let _=0;_!==n;++_){let b=t[f+_];if(b!==t[h+_]||b!==t[p+_]){a=!0;break}}}if(a){if(l!==o){e[o]=e[l];let f=l*n,h=o*n;for(let p=0;p!==n;++p)t[h+p]=t[f+p]}++o}}if(r>0){e[o]=e[r];for(let l=r*n,a=o*n,c=0;c!==n;++c)t[a+c]=t[l+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Ha(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function wc(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}tn.prototype.ValueTypeName="";tn.prototype.TimeBufferType=Float32Array;tn.prototype.ValueBufferType=Float32Array;tn.prototype.DefaultInterpolation=Hr;var Jn=class extends tn{constructor(e,t,n){super(e,t,n)}};Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=gs;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var no=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}};no.prototype.ValueTypeName="color";var io=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}};io.prototype.ValueTypeName="number";var so=class extends Kn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,a=(n-t)/(s-t),c=e*l;for(let u=c+l;c!==u;c+=4)Lt.slerpFlat(r,0,o,c-l,o,c,a);return r}},Ns=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new so(this.times,this.values,this.getValueSize(),e)}};Ns.prototype.ValueTypeName="quaternion";Ns.prototype.InterpolantFactoryMethodSmooth=void 0;var $n=class extends tn{constructor(e,t,n){super(e,t,n)}};$n.prototype.ValueTypeName="string";$n.prototype.ValueBufferType=Array;$n.prototype.DefaultInterpolation=gs;$n.prototype.InterpolantFactoryMethodLinear=void 0;$n.prototype.InterpolantFactoryMethodSmooth=void 0;var ro=class extends tn{constructor(e,t,n,s){super(e,t,n,s)}};ro.prototype.ValueTypeName="vector";var oo=class{constructor(e,t,n){let s=this,r=!1,o=0,l=0,a,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){l++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,l),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,l),o===l&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),a?a(u):u},this.setURLModifier=function(u){return a=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){let f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){let p=c[f],_=c[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},gh=new oo,ao=class{constructor(e){this.manager=e!==void 0?e:gh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ao.DEFAULT_MATERIAL_NAME="__DEFAULT";var Zi=class extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Fe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Us=class extends Zi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Fe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Va=new Qe,Ec=new U,Ac=new U,Fs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=Kt,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yi,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new _t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ec.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ec),Ac.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ac),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Va,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,l=s?s.w/r.y:1,a=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Vi||e.reversedDepth?t.set(.5*o,0,0,.5*o+a,0,.5*l,0,.5*l+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+a,0,.5*l,0,.5*l+c,0,0,.5,.5,0,0,0,1),t.multiply(Va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Cr=new U,Rr=new Lt,vn=new U,Os=class extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Cr,Rr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Rr,vn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Cr,Rr,vn),vn.x===1&&vn.y===1&&vn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cr,Rr,vn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xn=new U,Tc=new Ue,Cc=new Ue,Vt=class extends Os{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Wi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ki*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wi*2*Math.atan(Math.tan(ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xn.x,Xn.y).multiplyScalar(-e/Xn.z)}getViewSize(e,t){return this.getViewBounds(e,Tc,Cc),t.subVectors(Cc,Tc)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ki*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let a=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/a,t-=o.offsetY*n/c,s*=o.width/a,n*=o.height/c}let l=this.filmOffset;l!==0&&(r+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ya=class extends Fs{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0}},Bs=class extends Zi{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ya}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},jn=class extends Os{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,l=s+t,a=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,l-=u*this.view.offsetY,a=l-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,l,a,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Za=class extends Fs{constructor(){super(new jn(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ki=class extends Zi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new Za}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Fi=-90,Oi=1,lo=class extends wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Vt(Fi,Oi,e,t);s.layers=this.layers,this.add(s);let r=new Vt(Fi,Oi,e,t);r.layers=this.layers,this.add(r);let o=new Vt(Fi,Oi,e,t);o.layers=this.layers,this.add(o);let l=new Vt(Fi,Oi,e,t);l.layers=this.layers,this.add(l);let a=new Vt(Fi,Oi,e,t);a.layers=this.layers,this.add(a);let c=new Vt(Fi,Oi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,l,a]=t;for(let c of t)this.remove(c);if(e===dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(e===Vi)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,l,a,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},co=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var vl="\\[\\]\\.:\\/",bd=new RegExp("["+vl+"]","g"),bl="[^"+vl+"]",Sd="[^"+vl.replace("\\.","")+"]",Md=/((?:WC+[\/:])*)/.source.replace("WC",bl),wd=/(WCOD+)?/.source.replace("WCOD",Sd),Ed=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",bl),Ad=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",bl),Td=new RegExp("^"+Md+wd+Ed+Ad+"$"),Cd=["material","materials","bones","map"],Ka=class{constructor(e,t,n){let s=n||mt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},mt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(bd,"")}static parseTrackName(e){let t=Td.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Cd.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let l=r[o];if(l.name===t||l.uuid===t)return l;let a=n(l.children);if(a)return a}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Le("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Be("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Be("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Be("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Be("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Be("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Be("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;Be("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Be("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}a=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(a=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=Ka;mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray];mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Kg=new Float32Array(1);var Ji=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ja=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};var ks=class extends fn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Sl(i,e,t,n){let s=Rd(n);switch(t){case pl:return i*e;case xo:return i*e/s.components*s.byteLength;case yo:return i*e/s.components*s.byteLength;case ri:return i*e*2/s.components*s.byteLength;case vo:return i*e*2/s.components*s.byteLength;case ml:return i*e*3/s.components*s.byteLength;case on:return i*e*4/s.components*s.byteLength;case bo:return i*e*4/s.components*s.byteLength;case Ws:case Xs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qs:case Ys:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Mo:case Eo:return Math.max(i,16)*Math.max(e,8)/4;case So:case wo:return Math.max(i,8)*Math.max(e,8)/2;case Ao:case To:case Ro:case Po:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Co:case Zs:case Io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Lo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case No:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ko:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case zo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Go:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case qo:case Yo:case Zo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ko:case Jo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ks:case $o:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rd(i){switch(i){case Kt:case hl:return{byteLength:1,components:1};case Qi:case ul:case gn:return{byteLength:2,components:1};case go:case _o:return{byteLength:2,components:4};case mn:case mo:case rn:return{byteLength:4,components:1};case dl:case fl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Bh(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Id(i){let e=new WeakMap;function t(l,a){let c=l.array,u=l.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(a,h),i.bufferData(a,c,u),l.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:f}}function n(l,a,c){let u=a.array,f=a.updateRanges;if(i.bindBuffer(c,l),f.length===0)i.bufferSubData(c,0,u);else{f.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<f.length;p++){let _=f[h],b=f[p];b.start<=_.start+_.count+1?_.count=Math.max(_.count,b.start+b.count-_.start):(++h,f[h]=b)}f.length=h+1;for(let p=0,_=f.length;p<_;p++){let b=f[p];i.bufferSubData(c,b.start*u.BYTES_PER_ELEMENT,u,b.start,b.count)}a.clearUpdateRanges()}a.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);let a=e.get(l);a&&(i.deleteBuffer(a.buffer),e.delete(l))}function o(l,a){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){let u=e.get(l);(!u||u.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}let c=e.get(l);if(c===void 0)e.set(l,t(l,a));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,l,a),c.version=l.version}}return{get:s,remove:r,update:o}}var Ld=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Nd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ud=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Od=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Hd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Xd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Qd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ef=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,tf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,nf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,rf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,of=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,af=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cf="gl_FragColor = linearToOutputTexel( gl_FragColor );",hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,uf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,df=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ff=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_f=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,bf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ef=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Af=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,If=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Lf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Df=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Nf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Uf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ff=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Of=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Gf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Jf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$f=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,jf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,np=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,op=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ap=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,up=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_p=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,xp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,yp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,bp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Mp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ep=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ap=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Tp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Cp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Lp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Np=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,qp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Yp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Zp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$p=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,jp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,em=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,im=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,om=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,am=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,um=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Ld,alphahash_pars_fragment:Dd,alphamap_fragment:Nd,alphamap_pars_fragment:Ud,alphatest_fragment:Fd,alphatest_pars_fragment:Od,aomap_fragment:Bd,aomap_pars_fragment:kd,batching_pars_vertex:zd,batching_vertex:Hd,begin_vertex:Vd,beginnormal_vertex:Gd,bsdfs:Wd,iridescence_fragment:Xd,bumpmap_pars_fragment:qd,clipping_planes_fragment:Yd,clipping_planes_pars_fragment:Zd,clipping_planes_pars_vertex:Kd,clipping_planes_vertex:Jd,color_fragment:$d,color_pars_fragment:jd,color_pars_vertex:Qd,color_vertex:ef,common:tf,cube_uv_reflection_fragment:nf,defaultnormal_vertex:sf,displacementmap_pars_vertex:rf,displacementmap_vertex:of,emissivemap_fragment:af,emissivemap_pars_fragment:lf,colorspace_fragment:cf,colorspace_pars_fragment:hf,envmap_fragment:uf,envmap_common_pars_fragment:df,envmap_pars_fragment:ff,envmap_pars_vertex:pf,envmap_physical_pars_fragment:Ef,envmap_vertex:mf,fog_vertex:gf,fog_pars_vertex:_f,fog_fragment:xf,fog_pars_fragment:yf,gradientmap_pars_fragment:vf,lightmap_pars_fragment:bf,lights_lambert_fragment:Sf,lights_lambert_pars_fragment:Mf,lights_pars_begin:wf,lights_toon_fragment:Af,lights_toon_pars_fragment:Tf,lights_phong_fragment:Cf,lights_phong_pars_fragment:Rf,lights_physical_fragment:Pf,lights_physical_pars_fragment:If,lights_fragment_begin:Lf,lights_fragment_maps:Df,lights_fragment_end:Nf,lightprobes_pars_fragment:Uf,logdepthbuf_fragment:Ff,logdepthbuf_pars_fragment:Of,logdepthbuf_pars_vertex:Bf,logdepthbuf_vertex:kf,map_fragment:zf,map_pars_fragment:Hf,map_particle_fragment:Vf,map_particle_pars_fragment:Gf,metalnessmap_fragment:Wf,metalnessmap_pars_fragment:Xf,morphinstance_vertex:qf,morphcolor_vertex:Yf,morphnormal_vertex:Zf,morphtarget_pars_vertex:Kf,morphtarget_vertex:Jf,normal_fragment_begin:$f,normal_fragment_maps:jf,normal_pars_fragment:Qf,normal_pars_vertex:ep,normal_vertex:tp,normalmap_pars_fragment:np,clearcoat_normal_fragment_begin:ip,clearcoat_normal_fragment_maps:sp,clearcoat_pars_fragment:rp,iridescence_pars_fragment:op,opaque_fragment:ap,packing:lp,premultiplied_alpha_fragment:cp,project_vertex:hp,dithering_fragment:up,dithering_pars_fragment:dp,roughnessmap_fragment:fp,roughnessmap_pars_fragment:pp,shadowmap_pars_fragment:mp,shadowmap_pars_vertex:gp,shadowmap_vertex:_p,shadowmask_pars_fragment:xp,skinbase_vertex:yp,skinning_pars_vertex:vp,skinning_vertex:bp,skinnormal_vertex:Sp,specularmap_fragment:Mp,specularmap_pars_fragment:wp,tonemapping_fragment:Ep,tonemapping_pars_fragment:Ap,transmission_fragment:Tp,transmission_pars_fragment:Cp,uv_pars_fragment:Rp,uv_pars_vertex:Pp,uv_vertex:Ip,worldpos_vertex:Lp,background_vert:Dp,background_frag:Np,backgroundCube_vert:Up,backgroundCube_frag:Fp,cube_vert:Op,cube_frag:Bp,depth_vert:kp,depth_frag:zp,distance_vert:Hp,distance_frag:Vp,equirect_vert:Gp,equirect_frag:Wp,linedashed_vert:Xp,linedashed_frag:qp,meshbasic_vert:Yp,meshbasic_frag:Zp,meshlambert_vert:Kp,meshlambert_frag:Jp,meshmatcap_vert:$p,meshmatcap_frag:jp,meshnormal_vert:Qp,meshnormal_frag:em,meshphong_vert:tm,meshphong_frag:nm,meshphysical_vert:im,meshphysical_frag:sm,meshtoon_vert:rm,meshtoon_frag:om,points_vert:am,points_frag:lm,shadow_vert:cm,shadow_frag:hm,sprite_vert:um,sprite_frag:dm},me={common:{diffuse:{value:new Fe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Fe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Fe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Fe(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},Cn={basic:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Fe(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Ot([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Fe(0)},specular:{value:new Fe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Ot([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Fe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Ot([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Fe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Ot([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Ot([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Ot([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Ot([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Ot([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Ot([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:Ot([me.common,me.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:Ot([me.lights,me.fog,{color:{value:new Fe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};Cn.physical={uniforms:Ot([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Fe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Fe(0)},specularColor:{value:new Fe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};var ea={r:0,b:0,g:0},fm=new Qe,kh=new ke;kh.set(-1,0,0,0,1,0,0,0,1);function pm(i,e,t,n,s,r){let o=new Fe(0),l=s===!0?0:1,a,c,u=null,f=0,h=null;function p(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){let x=M.backgroundBlurriness>0;A=e.get(A,x)}return A}function _(M){let A=!1,x=p(M);x===null?m(o,l):x&&x.isColor&&(m(x,1),A=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(M,A){let x=p(A);x&&(x.isCubeTexture||x.mapping===Vs)?(c===void 0&&(c=new ft(new Zn(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:vi(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fm.makeRotationFromEuler(A.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(kh),c.material.toneMapped=Je.getTransfer(x.colorSpace)!==nt,(u!==x||f!==x.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(a===void 0&&(a=new ft(new Is(2,2),new en({name:"BackgroundMaterial",uniforms:vi(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),a.geometry.deleteAttribute("normal"),Object.defineProperty(a.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(a)),a.material.uniforms.t2D.value=x,a.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,a.material.toneMapped=Je.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),a.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||h!==i.toneMapping)&&(a.material.needsUpdate=!0,u=x,f=x.version,h=i.toneMapping),a.layers.enableAll(),M.unshift(a,a.geometry,a.material,0,0,null))}function m(M,A){M.getRGB(ea,yl(i)),t.buffers.color.setClear(ea.r,ea.g,ea.b,A,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),a!==void 0&&(a.geometry.dispose(),a.material.dispose(),a=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,A=1){o.set(M),l=A,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:_,addToRenderList:b,dispose:d}}function mm(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function l(I,F,O,P,k){let K=!1,Y=f(I,P,O,F);r!==Y&&(r=Y,c(r.object)),K=p(I,P,O,k),K&&_(I,P,O,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,x(I,F,O,P),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function a(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function u(I){return i.deleteVertexArray(I)}function f(I,F,O,P){let k=P.wireframe===!0,K=n[F.id];K===void 0&&(K={},n[F.id]=K);let Y=I.isInstancedMesh===!0?I.id:0,ne=K[Y];ne===void 0&&(ne={},K[Y]=ne);let q=ne[O.id];q===void 0&&(q={},ne[O.id]=q);let Z=q[k];return Z===void 0&&(Z=h(a()),q[k]=Z),Z}function h(I){let F=[],O=[],P=[];for(let k=0;k<t;k++)F[k]=0,O[k]=0,P[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:O,attributeDivisors:P,object:I,attributes:{},index:null}}function p(I,F,O,P){let k=r.attributes,K=F.attributes,Y=0,ne=O.getAttributes();for(let q in ne)if(ne[q].location>=0){let J=k[q],ye=K[q];if(ye===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(ye=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(ye=I.instanceColor)),J===void 0||J.attribute!==ye||ye&&J.data!==ye.data)return!0;Y++}return r.attributesNum!==Y||r.index!==P}function _(I,F,O,P){let k={},K=F.attributes,Y=0,ne=O.getAttributes();for(let q in ne)if(ne[q].location>=0){let J=K[q];J===void 0&&(q==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),q==="instanceColor"&&I.instanceColor&&(J=I.instanceColor));let ye={};ye.attribute=J,J&&J.data&&(ye.data=J.data),k[q]=ye,Y++}r.attributes=k,r.attributesNum=Y,r.index=P}function b(){let I=r.newAttributes;for(let F=0,O=I.length;F<O;F++)I[F]=0}function m(I){d(I,0)}function d(I,F){let O=r.newAttributes,P=r.enabledAttributes,k=r.attributeDivisors;O[I]=1,P[I]===0&&(i.enableVertexAttribArray(I),P[I]=1),k[I]!==F&&(i.vertexAttribDivisor(I,F),k[I]=F)}function M(){let I=r.newAttributes,F=r.enabledAttributes;for(let O=0,P=F.length;O<P;O++)F[O]!==I[O]&&(i.disableVertexAttribArray(O),F[O]=0)}function A(I,F,O,P,k,K,Y){Y===!0?i.vertexAttribIPointer(I,F,O,k,K):i.vertexAttribPointer(I,F,O,P,k,K)}function x(I,F,O,P){b();let k=P.attributes,K=O.getAttributes(),Y=F.defaultAttributeValues;for(let ne in K){let q=K[ne];if(q.location>=0){let Z=k[ne];if(Z===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor)),Z!==void 0){let J=Z.normalized,ye=Z.itemSize,ve=e.get(Z);if(ve===void 0)continue;let ze=ve.buffer,Ve=ve.type,Ee=ve.bytesPerElement,G=Ve===i.INT||Ve===i.UNSIGNED_INT||Z.gpuType===mo;if(Z.isInterleavedBufferAttribute){let Q=Z.data,ce=Q.stride,Ce=Z.offset;if(Q.isInstancedInterleavedBuffer){for(let oe=0;oe<q.locationSize;oe++)d(q.location+oe,Q.meshPerAttribute);I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let oe=0;oe<q.locationSize;oe++)m(q.location+oe);i.bindBuffer(i.ARRAY_BUFFER,ze);for(let oe=0;oe<q.locationSize;oe++)A(q.location+oe,ye/q.locationSize,Ve,J,ce*Ee,(Ce+ye/q.locationSize*oe)*Ee,G)}else{if(Z.isInstancedBufferAttribute){for(let Q=0;Q<q.locationSize;Q++)d(q.location+Q,Z.meshPerAttribute);I.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Q=0;Q<q.locationSize;Q++)m(q.location+Q);i.bindBuffer(i.ARRAY_BUFFER,ze);for(let Q=0;Q<q.locationSize;Q++)A(q.location+Q,ye/q.locationSize,Ve,J,ye*Ee,ye/q.locationSize*Q*Ee,G)}}else if(Y!==void 0){let J=Y[ne];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(q.location,J);break;case 3:i.vertexAttrib3fv(q.location,J);break;case 4:i.vertexAttrib4fv(q.location,J);break;default:i.vertexAttrib1fv(q.location,J)}}}}M()}function w(){E();for(let I in n){let F=n[I];for(let O in F){let P=F[O];for(let k in P){let K=P[k];for(let Y in K)u(K[Y].object),delete K[Y];delete P[k]}}delete n[I]}}function S(I){if(n[I.id]===void 0)return;let F=n[I.id];for(let O in F){let P=F[O];for(let k in P){let K=P[k];for(let Y in K)u(K[Y].object),delete K[Y];delete P[k]}}delete n[I.id]}function C(I){for(let F in n){let O=n[F];for(let P in O){let k=O[P];if(k[I.id]===void 0)continue;let K=k[I.id];for(let Y in K)u(K[Y].object),delete K[Y];delete k[I.id]}}}function y(I){for(let F in n){let O=n[F],P=I.isInstancedMesh===!0?I.id:0,k=O[P];if(k!==void 0){for(let K in k){let Y=k[K];for(let ne in Y)u(Y[ne].object),delete Y[ne];delete k[K]}delete O[P],Object.keys(O).length===0&&delete n[F]}}}function E(){R(),o=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:E,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:m,disableUnusedAttributes:M}}function gm(i,e,t){let n;function s(a){n=a}function r(a,c){i.drawArrays(n,a,c),t.update(c,n,1)}function o(a,c,u){u!==0&&(i.drawArraysInstanced(n,a,c,u),t.update(c,n,u))}function l(a,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,c,0,u);let h=0;for(let p=0;p<u;p++)h+=c[p];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=l}function _m(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==on&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(C){let y=C===gn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Kt&&C!==rn&&!y&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function a(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=a(c);u!==c&&(Le("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,textureFormatReadable:o,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:b,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:x,maxSamples:w,samples:S}}function xm(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Ht,l=new ke,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){let p=f.length!==0||h||n!==0||s;return s=h,n=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){let _=f.clippingPlanes,b=f.clipIntersection,m=f.clipShadows,d=i.get(f);if(!s||_===null||_.length===0||r&&!m)r?u(null):c();else{let M=r?0:n,A=M*4,x=d.clippingState||null;a.value=x,x=u(_,h,A,p);for(let w=0;w!==A;++w)x[w]=t[w];d.clippingState=x,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=M}};function c(){a.value!==t&&(a.value=t,a.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(f,h,p,_){let b=f!==null?f.length:0,m=null;if(b!==0){if(m=a.value,_!==!0||m===null){let d=p+b*4,M=h.matrixWorldInverse;l.getNormalMatrix(M),(m===null||m.length<d)&&(m=new Float32Array(d));for(let A=0,x=p;A!==b;++A,x+=4)o.copy(f[A]).applyMatrix4(M,l),o.normal.toArray(m,x),m[x+3]=o.constant}a.value=m,a.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}var is=4,ym=6,vm=20,bm=256,$s=new jn,_h=new Fe,Ml=null,wl=0,El=0,Al=!1,Sm=new U,bi=new U,rs=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:l=Sm}=r;Ml=this._renderer.getRenderTarget(),wl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),Al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,s,a,l),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ml,wl,El),this._renderer.xr.enabled=Al,e.scissorTest=!1,ns(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ni||e.mapping===yi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ml=this._renderer.getRenderTarget(),wl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),Al=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:gn,format:on,colorSpace:_s,depthBuffer:!1},s=xh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Mm(r)),this._blurMaterial=Em(r,e,t),this._ggxMaterial=wm(r,e,t)}return s}_compileMaterial(e){let t=new ft(new Pt,e);this._renderer.compile(t,$s)}_sceneToCubeUV(e,t,n,s,r){let a=new Vt(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(_h),f.toneMapping=pn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ft(new Zn,new ws({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,m=b.material,d=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,d=!0):(m.color.copy(_h),d=!0);for(let A=0;A<6;A++){let x=A%3;x===0?(a.up.set(0,c[A],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x+u[A],r.y,r.z)):x===1?(a.up.set(0,0,c[A]),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y+u[A],r.z)):(a.up.set(0,c[A],0),a.position.set(r.x,r.y,r.z),a.lookAt(r.x,r.y,r.z+u[A]));let w=this._cubeSize;ns(s,x*w,A>2?w:0,w,w),f.setRenderTarget(s),d&&f.render(b,a),f.render(e,a)}f.toneMapping=p,f.autoClear=h,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===ni||e.mapping===yi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let l=r.uniforms;l.envMap.value=e;let a=this._cubeSize;ns(t,0,0,3*a,2*a),n.setRenderTarget(t),n.render(o,$s)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[n];l.material=o;let a=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),h=c*1.25,p=f*h,{_lodMax:_}=this,b=this._sizeLods[n],m=3*b*(n>_-is?n-_+is:0),d=4*(this._cubeSize-b);a.envMap.value=e.texture,a.roughness.value=p,a.mipInt.value=_-t,ns(r,m,d,3*b,2*b),s.setRenderTarget(r),s.render(l,$s),a.envMap.value=r.texture,a.roughness.value=0,a.mipInt.value=_-n,ns(e,m,d,3*b,2*b),s.setRenderTarget(e),s.render(l,$s)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,l=this._blurMaterial,a=this._lodMeshes[s];a.material=l;let c=l.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let u=this._sizeLods[s],f=3*u*(s>this._lodMax-is?s-this._lodMax+is:0),h=4*(this._cubeSize-u);ns(t,f,h,3*u,2*u),o.setRenderTarget(t),o.render(a,$s)}};function Mm(i){let e=[],t=[],n=i,s=i-is+1+ym;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let l=1/(o-2),a=-l,c=1+l,u=[a,a,c,a,c,c,a,a,c,c,a,c],f=6,h=6,p=3,_=new Float32Array(p*h*f),b=new Float32Array(p*h*f);for(let d=0;d<f;d++){let M=d%3*2/3-1,A=d>2?0:-1,x=[M,A,0,M+2/3,A,0,M+2/3,A+1,0,M,A,0,M+2/3,A+1,0,M,A+1,0];_.set(x,p*h*d);for(let w=0;w<h;w++){let S=u[w*2]*2-1,C=u[w*2+1]*2-1;d===0?bi.set(1,C,S):d===1?bi.set(-S,1,-C):d===2?bi.set(-S,C,1):d===3?bi.set(-1,C,-S):d===4?bi.set(-S,-1,C):bi.set(S,C,-1),bi.toArray(b,(d*h+w)*p)}}let m=new Pt;m.setAttribute("position",new Gt(_,p)),m.setAttribute("outputDirection",new Gt(b,p)),t.push(new ft(m,null)),n>is&&n--}return{lodMeshes:t,sizeLods:e}}function xh(i,e,t){let n=new Zt(i,e,t);return n.texture.mapping=Vs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ns(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function wm(i,e,t){return new en({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Em(i,e,t){return new en({name:"SphericalGaussianBlur",defines:{SAMPLES:vm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:sa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function yh(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function vh(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function sa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var na=class extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Cs(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Zn(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dt,blending:En});r.uniforms.tEquirect.value=t;let o=new ft(s,r),l=t.minFilter;return t.minFilter===ii&&(t.minFilter=It),new lo(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function Am(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,p=!1){return h==null?null:p?o(h):r(h)}function r(h){if(h&&h.isTexture){let p=h.mapping;if(p===uo||p===fo)if(e.has(h)){let _=e.get(h).texture;return l(_,h.mapping)}else{let _=h.image;if(_&&_.height>0){let b=new na(_.height);return b.fromEquirectangularTexture(i,h),e.set(h,b),h.addEventListener("dispose",c),l(b.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let p=h.mapping,_=p===uo||p===fo,b=p===ni||p===yi;if(_||b){let m=t.get(h),d=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return n===null&&(n=new rs(i)),m=_?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let M=h.image;return _&&M&&M.height>0||b&&M&&a(M)?(n===null&&(n=new rs(i)),m=_?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function l(h,p){return p===uo?h.mapping=ni:p===fo&&(h.mapping=yi),h}function a(h){let p=0,_=6;for(let b=0;b<_;b++)h[b]!==void 0&&p++;return p===_}function c(h){let p=h.target;p.removeEventListener("dispose",c);let _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function u(h){let p=h.target;p.removeEventListener("dispose",u);let _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function f(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function Tm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&pi("WebGLRenderer: "+n+" extension not supported."),s}}}function Cm(i,e,t,n){let s={},r=new WeakMap;function o(f){let h=f.target;h.index!==null&&e.remove(h.index);for(let _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete s[h.id];let p=r.get(h);p&&(e.remove(p),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function l(f,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function a(f){let h=f.attributes;for(let p in h)e.update(h[p],i.ARRAY_BUFFER)}function c(f){let h=[],p=f.index,_=f.attributes.position,b=0;if(_===void 0)return;if(p!==null){let M=p.array;b=p.version;for(let A=0,x=M.length;A<x;A+=3){let w=M[A+0],S=M[A+1],C=M[A+2];h.push(w,S,S,C,C,w)}}else{let M=_.array;b=_.version;for(let A=0,x=M.length/3-1;A<x;A+=3){let w=A+0,S=A+1,C=A+2;h.push(w,S,S,C,C,w)}}let m=new(_.count>=65535?Ms:Ss)(h,1);m.version=b;let d=r.get(f);d&&e.remove(d),r.set(f,m)}function u(f){let h=r.get(f);if(h){let p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:l,update:a,getWireframeAttribute:u}}function Rm(i,e,t){let n;function s(f){n=f}let r,o;function l(f){r=f.type,o=f.bytesPerElement}function a(f,h){i.drawElements(n,h,r,f*o),t.update(h,n,1)}function c(f,h,p){p!==0&&(i.drawElementsInstanced(n,h,r,f*o,p),t.update(h,n,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,p);let b=0;for(let m=0;m<p;m++)b+=h[m];t.update(b,n,1)}this.setMode=s,this.setIndex=l,this.render=a,this.renderInstances=c,this.renderMultiDraw=u}function Pm(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,l){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=l*(r/3);break;case i.LINES:t.lines+=l*(r/2);break;case i.LINE_STRIP:t.lines+=l*(r-1);break;case i.LINE_LOOP:t.lines+=l*r;break;case i.POINTS:t.points+=l*r;break;default:Be("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Im(i,e,t){let n=new WeakMap,s=new _t;function r(o,l,a){let c=o.morphTargetInfluences,u=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,f=u!==void 0?u.length:0,h=n.get(l);if(h===void 0||h.count!==f){let E=function(){C.dispose(),n.delete(l),l.removeEventListener("dispose",E)};h!==void 0&&h.texture.dispose();let p=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,b=l.morphAttributes.color!==void 0,m=l.morphAttributes.position||[],d=l.morphAttributes.normal||[],M=l.morphAttributes.color||[],A=0;p===!0&&(A=1),_===!0&&(A=2),b===!0&&(A=3);let x=l.attributes.position.count*A,w=1;x>e.maxTextureSize&&(w=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let S=new Float32Array(x*w*4*f),C=new vs(S,x,w,f);C.type=rn,C.needsUpdate=!0;let y=A*4;for(let R=0;R<f;R++){let I=m[R],F=d[R],O=M[R],P=x*w*4*R;for(let k=0;k<I.count;k++){let K=k*y;p===!0&&(s.fromBufferAttribute(I,k),S[P+K+0]=s.x,S[P+K+1]=s.y,S[P+K+2]=s.z,S[P+K+3]=0),_===!0&&(s.fromBufferAttribute(F,k),S[P+K+4]=s.x,S[P+K+5]=s.y,S[P+K+6]=s.z,S[P+K+7]=0),b===!0&&(s.fromBufferAttribute(O,k),S[P+K+8]=s.x,S[P+K+9]=s.y,S[P+K+10]=s.z,S[P+K+11]=O.itemSize===4?s.w:1)}}h={count:f,texture:C,size:new Ue(x,w)},n.set(l,h),l.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)a.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let b=0;b<c.length;b++)p+=c[b];let _=l.morphTargetsRelative?1:1-p;a.getUniforms().setValue(i,"morphTargetBaseInfluence",_),a.getUniforms().setValue(i,"morphTargetInfluences",c)}a.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),a.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Lm(i,e,t,n,s){let r=new WeakMap;function o(c){let u=s.render.frame,f=c.geometry,h=e.get(c,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function l(){r=new WeakMap}function a(c){let u=c.target;u.removeEventListener("dispose",a),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:l}}var Dm={[il]:"LINEAR_TONE_MAPPING",[sl]:"REINHARD_TONE_MAPPING",[rl]:"CINEON_TONE_MAPPING",[Hs]:"ACES_FILMIC_TONE_MAPPING",[al]:"AGX_TONE_MAPPING",[ll]:"NEUTRAL_TONE_MAPPING",[ol]:"CUSTOM_TONE_MAPPING"};function Nm(i,e,t,n,s,r){let o=new Zt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),l=null,a=null,c=new Pt;c.setAttribute("position",new gt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new gt([0,2,0,0,2,0],2));let u=new Kr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new ft(c,u),h=new jn(-1,1,1,-1,0,1),p=null,_=null,b=!1,m,d=null,M=[],A=!1;this.setSize=function(x,w){o.setSize(x,w),l!==null&&l.setSize(x,w),a!==null&&a.setSize(x,w);for(let S=0;S<M.length;S++){let C=M[S];C.setSize&&C.setSize(x,w)}},this.setEffects=function(x){M=x,A=M.length>0&&M[0].isRenderPass===!0;let w=o.width,S=o.height;M.length>0&&l===null&&(l=new Zt(w,S,{type:gn,depthBuffer:!1,stencilBuffer:!1}),a=new Zt(w,S,{type:gn,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<M.length;C++){let y=M[C];y.setSize&&y.setSize(w,S)}},this.begin=function(x,w){if(b||x.toneMapping===pn&&M.length===0)return!1;if(d=w,w!==null){let S=w.width,C=w.height;(o.width!==S||o.height!==C)&&this.setSize(S,C)}return A===!1&&x.setRenderTarget(o),m=x.toneMapping,x.toneMapping=pn,!0},this.hasRenderPass=function(){return A},this.end=function(x,w){x.toneMapping=m,b=!0;let S=o,C=l;for(let y=0;y<M.length;y++){let E=M[y];E.enabled!==!1&&(E.render(x,C,S,w),E.needsSwap!==!1&&(S=C,C=C===l?a:l))}if(p!==x.outputColorSpace||_!==x.toneMapping){p=x.outputColorSpace,_=x.toneMapping,u.defines={},Je.getTransfer(p)===nt&&(u.defines.SRGB_TRANSFER="");let y=Dm[_];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=S.texture,x.setRenderTarget(d),x.render(f,h),d=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){o.dispose(),l!==null&&l.dispose(),a!==null&&a.dispose(),c.dispose(),u.dispose()}}var zh=new Yt,Rl=new Yn(1,1),Hh=new vs,Vh=new Wr,Gh=new Cs,bh=[],Sh=[],Mh=new Float32Array(16),wh=new Float32Array(9),Eh=new Float32Array(4);function os(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=bh[s];if(r===void 0&&(r=new Float32Array(s),bh[s]=r),e!==0){n.toArray(r,0);for(let o=1,l=0;o!==e;++o)l+=t,i[o].toArray(r,l)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ra(i,e){let t=Sh[e];t===void 0&&(t=new Int32Array(e),Sh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Um(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Fm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function Om(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function Bm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function km(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Eh.set(n),i.uniformMatrix2fv(this.addr,!1,Eh),At(t,n)}}function zm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;wh.set(n),i.uniformMatrix3fv(this.addr,!1,wh),At(t,n)}}function Hm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Et(t,n))return;Mh.set(n),i.uniformMatrix4fv(this.addr,!1,Mh),At(t,n)}}function Vm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Gm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function Wm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function Xm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function qm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ym(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function Zm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function Km(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function Jm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Rl.compareFunction=t.isReversedDepthBuffer()?Qo:jo,r=Rl):r=zh,t.setTexture2D(e||r,s)}function $m(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Vh,s)}function jm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Gh,s)}function Qm(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Hh,s)}function e0(i){switch(i){case 5126:return Um;case 35664:return Fm;case 35665:return Om;case 35666:return Bm;case 35674:return km;case 35675:return zm;case 35676:return Hm;case 5124:case 35670:return Vm;case 35667:case 35671:return Gm;case 35668:case 35672:return Wm;case 35669:case 35673:return Xm;case 5125:return qm;case 36294:return Ym;case 36295:return Zm;case 36296:return Km;case 35678:case 36198:case 36298:case 36306:case 35682:return Jm;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return Qm}}function t0(i,e){i.uniform1fv(this.addr,e)}function n0(i,e){let t=os(e,this.size,2);i.uniform2fv(this.addr,t)}function i0(i,e){let t=os(e,this.size,3);i.uniform3fv(this.addr,t)}function s0(i,e){let t=os(e,this.size,4);i.uniform4fv(this.addr,t)}function r0(i,e){let t=os(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function o0(i,e){let t=os(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function a0(i,e){let t=os(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function l0(i,e){i.uniform1iv(this.addr,e)}function c0(i,e){i.uniform2iv(this.addr,e)}function h0(i,e){i.uniform3iv(this.addr,e)}function u0(i,e){i.uniform4iv(this.addr,e)}function d0(i,e){i.uniform1uiv(this.addr,e)}function f0(i,e){i.uniform2uiv(this.addr,e)}function p0(i,e){i.uniform3uiv(this.addr,e)}function m0(i,e){i.uniform4uiv(this.addr,e)}function g0(i,e,t){let n=this.cache,s=e.length,r=ra(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Rl:o=zh;for(let l=0;l!==s;++l)t.setTexture2D(e[l]||o,r[l])}function _0(i,e,t){let n=this.cache,s=e.length,r=ra(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Vh,r[o])}function x0(i,e,t){let n=this.cache,s=e.length,r=ra(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Gh,r[o])}function y0(i,e,t){let n=this.cache,s=e.length,r=ra(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Hh,r[o])}function v0(i){switch(i){case 5126:return t0;case 35664:return n0;case 35665:return i0;case 35666:return s0;case 35674:return r0;case 35675:return o0;case 35676:return a0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return h0;case 35669:case 35673:return u0;case 5125:return d0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return y0}}var Pl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=e0(t.type)}},Il=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=v0(t.type)}},Ll=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let l=s[r];l.setValue(e,t[l.id],n)}}},Tl=/(\w+)(\])?(\[|\.)?/g;function Ah(i,e){i.seq.push(e),i.map[e.id]=e}function b0(i,e,t){let n=i.name,s=n.length;for(Tl.lastIndex=0;;){let r=Tl.exec(n),o=Tl.lastIndex,l=r[1],a=r[2]==="]",c=r[3];if(a&&(l=l|0),c===void 0||c==="["&&o+2===s){Ah(t,c===void 0?new Pl(l,i,e):new Il(l,i,e));break}else{let f=t.map[l];f===void 0&&(f=new Ll(l),Ah(t,f)),t=f}}}var ss=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let l=e.getActiveUniform(t,o),a=e.getUniformLocation(t,l.name);b0(l,a,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let l=t[r],a=n[l.id];a.needsUpdate!==!1&&l.setValue(e,a.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Th(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var S0=37297,M0=0;function w0(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let l=o+1;n.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return n.join(`
`)}var Ch=new ke;function E0(i){Je._getMatrix(Ch,Je.workingColorSpace,i);let e=`mat3( ${Ch.elements.map(t=>t.toFixed(4))} )`;switch(Je.getTransfer(i)){case xs:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Rh(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let l=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+w0(i.getShaderSource(e),l)}else return r}function A0(i,e){let t=E0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var T0={[il]:"Linear",[sl]:"Reinhard",[rl]:"Cineon",[Hs]:"ACESFilmic",[al]:"AgX",[ll]:"Neutral",[ol]:"Custom"};function C0(i,e){let t=T0[e];return t===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ta=new U;function R0(){Je.getLuminanceCoefficients(ta);let i=ta.x.toFixed(4),e=ta.y.toFixed(4),t=ta.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function I0(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function L0(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,l=1;r.type===i.FLOAT_MAT2&&(l=2),r.type===i.FLOAT_MAT3&&(l=3),r.type===i.FLOAT_MAT4&&(l=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:l}}return t}function Qs(i){return i!==""}function Ph(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ih(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var D0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dl(i){return i.replace(D0,U0)}var N0=new Map;function U0(i,e){let t=Xe[e];if(t===void 0){let n=N0.get(e);if(n!==void 0)t=Xe[n],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Dl(t)}var F0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lh(i){return i.replace(F0,O0)}function O0(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Dh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var B0={[zs]:"SHADOWMAP_TYPE_PCF",[$i]:"SHADOWMAP_TYPE_VSM"};function k0(i){return B0[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var z0={[ni]:"ENVMAP_TYPE_CUBE",[yi]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE_UV"};function H0(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":z0[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var V0={[yi]:"ENVMAP_MODE_REFRACTION"};function G0(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":V0[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var W0={[ho]:"ENVMAP_BLENDING_MULTIPLY",[Jc]:"ENVMAP_BLENDING_MIX",[$c]:"ENVMAP_BLENDING_ADD"};function X0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":W0[i.combine]||"ENVMAP_BLENDING_NONE"}function q0(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Y0(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,l=t.fragmentShader,a=k0(t),c=H0(t),u=G0(t),f=X0(t),h=q0(t),p=P0(t),_=I0(r),b=s.createProgram(),m,d,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Qs).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Qs).join(`
`),d.length>0&&(d+=`
`)):(m=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),d=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+a:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pn?"#define TONE_MAPPING":"",t.toneMapping!==pn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==pn?C0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,A0("linearToOutputTexel",t.outputColorSpace),R0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qs).join(`
`)),o=Dl(o),o=Ph(o,t),o=Ih(o,t),l=Dl(l),l=Ph(l,t),l=Ih(l,t),o=Lh(o),l=Lh(l),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",t.glslVersion===gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let A=M+m+o,x=M+d+l,w=Th(s,s.VERTEX_SHADER,A),S=Th(s,s.FRAGMENT_SHADER,x);s.attachShader(b,w),s.attachShader(b,S),t.index0AttributeName!==void 0?s.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function C(I){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(b)||"",O=s.getShaderInfoLog(w)||"",P=s.getShaderInfoLog(S)||"",k=F.trim(),K=O.trim(),Y=P.trim(),ne=!0,q=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(ne=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,w,S);else{let Z=Rh(s,w,"vertex"),J=Rh(s,S,"fragment");Be("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+Z+`
`+J)}else k!==""?Le("WebGLProgram: Program Info Log:",k):(K===""||Y==="")&&(q=!1);q&&(I.diagnostics={runnable:ne,programLog:k,vertexShader:{log:K,prefix:m},fragmentShader:{log:Y,prefix:d}})}s.deleteShader(w),s.deleteShader(S),y=new ss(s,b),E=L0(s,b)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(b,S0)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=M0++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=w,this.fragmentShader=S,this}var Z0=0,Nl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ul(e),t.set(e,n)),n}},Ul=class{constructor(e){this.id=Z0++,this.code=e,this.usedTimes=0}};function K0(i){return i===ri||i===Zs||i===Ks}function J0(i,e,t,n,s,r){let o=new bs,l=new Nl,a=new Set,c=[],u=new Map,f=n.logarithmicDepthBuffer,h=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return a.add(y),y===0?"uv":`uv${y}`}function b(y,E,R,I,F,O){let P=I.fog,k=F.geometry,K=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,Y=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,ne=e.get(y.envMap||K,Y),q=ne&&ne.mapping===Vs?ne.image.height:null,Z=p[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&Le("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let J=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ye=J!==void 0?J.length:0,ve=0;k.morphAttributes.position!==void 0&&(ve=1),k.morphAttributes.normal!==void 0&&(ve=2),k.morphAttributes.color!==void 0&&(ve=3);let ze,Ve,Ee,G;if(Z){let ut=Cn[Z];ze=ut.vertexShader,Ve=ut.fragmentShader}else{ze=y.vertexShader,Ve=y.fragmentShader;let ut=l.getVertexShaderStage(y),et=l.getFragmentShaderStage(y);l.update(y,ut,et),Ee=ut.id,G=et.id}let Q=i.getRenderTarget(),ce=i.state.buffers.depth.getReversed(),Ce=F.isInstancedMesh===!0,oe=F.isBatchedMesh===!0,Ne=!!y.map,rt=!!y.matcap,Oe=!!ne,W=!!y.aoMap,se=!!y.lightMap,ae=!!y.bumpMap&&y.wireframe===!1,Ge=!!y.normalMap,ot=!!y.displacementMap,at=!!y.emissiveMap,Ye=!!y.metalnessMap,xt=!!y.roughnessMap,N=y.anisotropy>0,$e=y.clearcoat>0,Ze=y.dispersion>0,T=y.retroreflectivity>0,g=y.iridescence>0,B=y.sheen>0,V=y.transmission>0,$=N&&!!y.anisotropyMap,re=$e&&!!y.clearcoatMap,le=$e&&!!y.clearcoatNormalMap,j=$e&&!!y.clearcoatRoughnessMap,te=g&&!!y.iridescenceMap,he=g&&!!y.iridescenceThicknessMap,Re=B&&!!y.sheenColorMap,pe=B&&!!y.sheenRoughnessMap,ue=!!y.specularMap,Pe=!!y.specularColorMap,De=!!y.specularIntensityMap,He=V&&!!y.transmissionMap,D=V&&!!y.thicknessMap,de=!!y.gradientMap,ee=!!y.alphaMap,fe=y.alphaTest>0,xe=!!y.alphaHash,ie=!!y.extensions,Ie=pn;y.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ie=i.toneMapping);let Ae={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:ze,fragmentShader:Ve,defines:y.defines,customVertexShaderID:Ee,customFragmentShaderID:G,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:oe,batchingColor:oe&&F._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&F.instanceColor!==null,instancingMorph:Ce&&F.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Je.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ne,matcap:rt,envMap:Oe,envMapMode:Oe&&ne.mapping,envMapCubeUVHeight:q,aoMap:W,lightMap:se,bumpMap:ae,normalMap:Ge,displacementMap:ot,emissiveMap:at,normalMapObjectSpace:Ge&&y.normalMapType===eh,normalMapTangentSpace:Ge&&y.normalMapType===Js,packedNormalMap:Ge&&y.normalMapType===Js&&K0(y.normalMap.format),metalnessMap:Ye,roughnessMap:xt,anisotropy:N,anisotropyMap:$,clearcoat:$e,clearcoatMap:re,clearcoatNormalMap:le,clearcoatRoughnessMap:j,dispersion:Ze,retroreflection:T,iridescence:g,iridescenceMap:te,iridescenceThicknessMap:he,sheen:B,sheenColorMap:Re,sheenRoughnessMap:pe,specularMap:ue,specularColorMap:Pe,specularIntensityMap:De,transmission:V,transmissionMap:He,thicknessMap:D,gradientMap:de,opaque:y.transparent===!1&&y.blending===ji&&y.alphaToCoverage===!1,alphaMap:ee,alphaTest:fe,alphaHash:xe,combine:y.combine,mapUv:Ne&&_(y.map.channel),aoMapUv:W&&_(y.aoMap.channel),lightMapUv:se&&_(y.lightMap.channel),bumpMapUv:ae&&_(y.bumpMap.channel),normalMapUv:Ge&&_(y.normalMap.channel),displacementMapUv:ot&&_(y.displacementMap.channel),emissiveMapUv:at&&_(y.emissiveMap.channel),metalnessMapUv:Ye&&_(y.metalnessMap.channel),roughnessMapUv:xt&&_(y.roughnessMap.channel),anisotropyMapUv:$&&_(y.anisotropyMap.channel),clearcoatMapUv:re&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:he&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:pe&&_(y.sheenRoughnessMap.channel),specularMapUv:ue&&_(y.specularMap.channel),specularColorMapUv:Pe&&_(y.specularColorMap.channel),specularIntensityMapUv:De&&_(y.specularIntensityMap.channel),transmissionMapUv:He&&_(y.transmissionMap.channel),thicknessMapUv:D&&_(y.thicknessMap.channel),alphaMapUv:ee&&_(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ge||N),vertexNormals:!!k.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!k.attributes.uv&&(Ne||ee),fog:!!P,useFog:y.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||k.attributes.normal===void 0&&Ge===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ce,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ye,morphTextureStride:ve,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ie,decodeVideoTexture:Ne&&y.map.isVideoTexture===!0&&Je.getTransfer(y.map.colorSpace)===nt,decodeVideoTextureEmissive:at&&y.emissiveMap.isVideoTexture===!0&&Je.getTransfer(y.emissiveMap.colorSpace)===nt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===yt,flipSided:y.side===Dt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ie&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ie&&y.extensions.multiDraw===!0||oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ae.vertexUv1s=a.has(1),Ae.vertexUv2s=a.has(2),Ae.vertexUv3s=a.has(3),a.clear(),Ae}function m(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)E.push(R),E.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(d(E,y),M(E,y),E.push(i.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function d(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numSunLights),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numSunLightShadows),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function M(y,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function A(y){let E=p[y.type],R;if(E){let I=Cn[E];R=ph.clone(I.uniforms)}else R=y.uniforms;return R}function x(y,E){let R=u.get(E);return R!==void 0?++R.usedTimes:(R=new Y0(i,E,y,s),c.push(R),u.set(E,R)),R}function w(y){if(--y.usedTimes===0){let E=c.indexOf(y);c[E]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function S(y){l.remove(y)}function C(){l.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:A,acquireProgram:x,releaseProgram:w,releaseShaderCache:S,programs:c,dispose:C}}function $0(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let l=i.get(o);return l===void 0&&(l={},i.set(o,l)),l}function n(o){i.delete(o)}function s(o,l,a){i.get(o)[l]=a}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function j0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Nh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Uh(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function l(h,p,_,b,m,d){let M=i[e];return M===void 0?(M={id:h.id,object:h,geometry:p,material:_,materialVariant:o(h),groupOrder:b,renderOrder:h.renderOrder,z:m,group:d},i[e]=M):(M.id=h.id,M.object=h,M.geometry=p,M.material=_,M.materialVariant=o(h),M.groupOrder=b,M.renderOrder=h.renderOrder,M.z=m,M.group=d),e++,M}function a(h,p,_,b,m,d,M){M.reversedDepth===!0&&(m=-m);let A=l(h,p,_,b,m,d);_.transmission>0?n.push(A):_.transparent===!0?s.push(A):t.push(A)}function c(h,p,_,b,m,d){let M=l(h,p,_,b,m,d);_.transmission>0?n.unshift(M):_.transparent===!0?s.unshift(M):t.unshift(M)}function u(h,p){t.length>1&&t.sort(h||j0),n.length>1&&n.sort(p||Nh),s.length>1&&s.sort(p||Nh)}function f(){for(let h=e,p=i.length;h<p;h++){let _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:f,sort:u}}function Q0(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Uh,i.set(n,[o])):s>=r.length?(o=new Uh,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function eg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new U,color:new Fe};break;case"SpotLight":t={position:new U,direction:new U,color:new Fe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Fe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Fe,groundColor:new Fe};break;case"RectAreaLight":t={color:new Fe,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function tg(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var ng=0;function ig(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function sg(i){let e=new eg,t=tg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);let s=new U,r=new Qe,o=new Qe;function l(c){let u=0,f=0,h=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let p=0,_=0,b=0,m=0,d=0,M=0,A=0,x=0,w=0,S=0,C=0,y=0,E=0,R=0;c.sort(ig);for(let F=0,O=c.length;F<O;F++){let P=c[F],k=P.color,K=P.intensity,Y=P.distance,ne=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ri?ne=P.shadow.map.texture:ne=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)u+=k.r*K,f+=k.g*K,h+=k.b*K;else if(P.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(P.sh.coefficients[q],K);R++}else if(P.isSunLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Z=P.shadow,J=t.get(P);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[_]=J,n.sunShadowMap[_]=ne;let ye=Z.getViewportCount();for(let ve=0;ve<ye;ve++)n.sunShadowMatrix[b+ve]=Z.getMatrix(ve),n.sunShadowCascade[b+ve]=Z._cascadeData[ve];b+=ye,_++}n.sun[p]=q,p++}else if(P.isDirectionalLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Z=P.shadow,J=t.get(P);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,n.directionalShadow[m]=J,n.directionalShadowMap[m]=ne,n.directionalShadowMatrix[m]=P.shadow.matrix,w++}n.directional[m]=q,m++}else if(P.isSpotLight){let q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(k).multiplyScalar(K),q.distance=Y,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,n.spot[M]=q;let Z=P.shadow;if(P.map&&(n.spotLightMap[y]=P.map,y++,Z.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[M]=Z.matrix,P.castShadow){let J=t.get(P);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,n.spotShadow[M]=J,n.spotShadowMap[M]=ne,C++}M++}else if(P.isRectAreaLight){let q=e.get(P);q.color.copy(k).multiplyScalar(K),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),n.rectArea[A]=q,A++}else if(P.isPointLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){let Z=P.shadow,J=t.get(P);J.shadowIntensity=Z.intensity,J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,J.shadowCameraNear=Z.camera.near,J.shadowCameraFar=Z.camera.far,n.pointShadow[d]=J,n.pointShadowMap[d]=ne,n.pointShadowMatrix[d]=P.shadow.matrix,S++}n.point[d]=q,d++}else if(P.isHemisphereLight){let q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(K),q.groundColor.copy(P.groundColor).multiplyScalar(K),n.hemi[x]=q,x++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;let I=n.hash;(I.sunLength!==p||I.directionalLength!==m||I.pointLength!==d||I.spotLength!==M||I.rectAreaLength!==A||I.hemiLength!==x||I.numSunShadows!==_||I.numDirectionalShadows!==w||I.numPointShadows!==S||I.numSpotShadows!==C||I.numSpotMaps!==y||I.numLightProbes!==R)&&(n.sun.length=p,n.directional.length=m,n.spot.length=M,n.rectArea.length=A,n.point.length=d,n.hemi.length=x,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=C,n.spotShadowMap.length=C,n.spotLightMatrix.length=C+y-E,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,I.sunLength=p,I.directionalLength=m,I.pointLength=d,I.spotLength=M,I.rectAreaLength=A,I.hemiLength=x,I.numSunShadows=_,I.numDirectionalShadows=w,I.numPointShadows=S,I.numSpotShadows=C,I.numSpotMaps=y,I.numLightProbes=R,n.version=ng++)}function a(c,u){let f=0,h=0,p=0,_=0,b=0,m=0,d=u.matrixWorldInverse;for(let M=0,A=c.length;M<A;M++){let x=c[M];if(x.isSunLight){let w=n.sun[f];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(d),f++}else if(x.isDirectionalLight){let w=n.directional[h];w.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(d),h++}else if(x.isSpotLight){let w=n.spot[_];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(d),w.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(d),_++}else if(x.isRectAreaLight){let w=n.rectArea[b];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(d),o.identity(),r.copy(x.matrixWorld),r.premultiply(d),o.extractRotation(r),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),b++}else if(x.isPointLight){let w=n.point[p];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(d),p++}else if(x.isHemisphereLight){let w=n.hemi[m];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(d),m++}}}return{setup:l,setupView:a,state:n}}function Fh(i){let e=new sg(i),t=[],n=[],s=[];function r(h){f.camera=h,t.length=0,n.length=0,s.length=0}function o(h){t.push(h)}function l(h){n.push(h)}function a(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let f={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:l,pushLightProbeGrid:a}}function rg(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),l;return o===void 0?(l=new Fh(i),e.set(s,[l])):r>=o.length?(l=new Fh(i),o.push(l)):l=o[r],l}function n(){e=new WeakMap}return{get:t,dispose:n}}var og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ag=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,lg=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],cg=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Oh=new Qe,js=new U,Cl=new U;function hg(i,e,t){let n=new Yi,s=new Ue,r=new Ue,o=new _t,l=new Jr,a=new $r,c={},u=t.maxTextureSize,f={[ti]:Dt,[Dt]:ti,[yt]:yt},h=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:og,fragmentShader:ag}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let _=new Pt;_.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new ft(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zs;let d=this.type;this.render=function(S,C,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Ic&&(Le("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=zs);let E=i.getRenderTarget(),R=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),F=i.state;F.setBlending(En),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let O=d!==this.type;O&&C.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(k=>k.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,k=S.length;P<k;P++){let K=S[P],Y=K.shadow;if(Y===void 0){Le("WebGLShadowMap:",K,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let ne=Y.getFrameExtents();s.multiply(ne),r.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ne.x),s.x=r.x*ne.x,Y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ne.y),s.y=r.y*ne.y,Y.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=q,Y.map===null||O===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===$i){if(K.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new Zt(s.x,s.y,{format:ri,type:gn,minFilter:It,magFilter:It,generateMipmaps:!1}),Y.map.texture.name=K.name+".shadowMap",Y.map.depthTexture=new Yn(s.x,s.y,rn),Y.map.depthTexture.name=K.name+".shadowMapDepth",Y.map.depthTexture.format=Sn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Rt,Y.map.depthTexture.magFilter=Rt}else K.isPointLight?(Y.map=new na(s.x),Y.map.depthTexture=new Zr(s.x,mn)):(Y.map=new Zt(s.x,s.y),Y.map.depthTexture=new Yn(s.x,s.y,mn)),Y.map.depthTexture.name=K.name+".shadowMap",Y.map.depthTexture.format=Sn,this.type===zs?(Y.map.depthTexture.compareFunction=q?Qo:jo,Y.map.depthTexture.minFilter=It,Y.map.depthTexture.magFilter=It):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Rt,Y.map.depthTexture.magFilter=Rt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let Z=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();K.isPointLight!==!0&&Y.updateMatrices(K,y);for(let J=0;J<Z;J++){let ye=Y.getCamera(J);if(K.isPointLight){let ve=Y.camera,ze=Y.matrix,Ve=K.distance||ve.far;Ve!==ve.far&&(ve.far=Ve,ve.updateProjectionMatrix()),js.setFromMatrixPosition(K.matrixWorld),ve.position.copy(js),Cl.copy(ve.position),Cl.add(lg[J]),ve.up.copy(cg[J]),ve.lookAt(Cl),ve.updateMatrixWorld(),ze.makeTranslation(-js.x,-js.y,-js.z),Oh.multiplyMatrices(ve.projectionMatrix,ve.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Oh,ve.coordinateSystem,ve.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,J),i.clear();else{J===0&&(i.setRenderTarget(Y.map),i.clear());let ve=Y.getViewport(J);o.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),F.viewport(o)}n=Y.getFrustum(J),x(C,y,ye,K,this.type)}Y.isPointLightShadow!==!0&&this.type===$i&&M(Y,y),Y.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(E,R,I)};function M(S,C){let y=e.update(b);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null?S.mapPass=new Zt(s.x,s.y,{format:ri,type:gn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value.set(S.map.width,S.map.height),h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(C,null,y,h,b,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value.set(S.map.width,S.map.height),p.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(C,null,y,p,b,null)}function A(S,C,y,E){let R=null,I=y.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(I!==void 0)R=I;else if(R=y.isPointLight===!0?a:l,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let F=R.uuid,O=C.uuid,P=c[F];P===void 0&&(P={},c[F]=P);let k=P[O];k===void 0&&(k=R.clone(),P[O]=k,C.addEventListener("dispose",w)),R=k}if(R.visible=C.visible,R.wireframe=C.wireframe,E===$i?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:f[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let F=i.properties.get(R);F.light=y}return R}function x(S,C,y,E,R){if(S.visible===!1)return;if(S.layers.test(C.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&R===$i)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,S.matrixWorld);let O=e.update(S),P=S.material;if(Array.isArray(P)){let k=O.groups;for(let K=0,Y=k.length;K<Y;K++){let ne=k[K],q=P[ne.materialIndex];if(q&&q.visible){let Z=A(S,q,E,R);S.onBeforeShadow(i,S,C,y,O,Z,ne),i.renderBufferDirect(y,null,O,Z,S,ne),S.onAfterShadow(i,S,C,y,O,Z,ne)}}}else if(P.visible){let k=A(S,P,E,R);S.onBeforeShadow(i,S,C,y,O,k,null),i.renderBufferDirect(y,null,O,k,S,null),S.onAfterShadow(i,S,C,y,O,k,null)}}let F=S.children;for(let O=0,P=F.length;O<P;O++)x(F[O],C,y,E,R)}function w(S){S.target.removeEventListener("dispose",w);for(let y in c){let E=c[y],R=S.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function ug(i,e){function t(){let D=!1,de=new _t,ee=null,fe=new _t(0,0,0,0);return{setMask:function(xe){ee!==xe&&!D&&(i.colorMask(xe,xe,xe,xe),ee=xe)},setLocked:function(xe){D=xe},setClear:function(xe,ie,Ie,Ae,ut){ut===!0&&(xe*=Ae,ie*=Ae,Ie*=Ae),de.set(xe,ie,Ie,Ae),fe.equals(de)===!1&&(i.clearColor(xe,ie,Ie,Ae),fe.copy(de))},reset:function(){D=!1,ee=null,fe.set(-1,0,0,0)}}}function n(){let D=!1,de=!1,ee=null,fe=null,xe=null;return{setReversed:function(ie){if(de!==ie){let Ie=e.get("EXT_clip_control");ie?Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.ZERO_TO_ONE_EXT):Ie.clipControlEXT(Ie.LOWER_LEFT_EXT,Ie.NEGATIVE_ONE_TO_ONE_EXT),de=ie;let Ae=xe;xe=null,this.setClear(Ae)}},getReversed:function(){return de},setTest:function(ie){ie?Q(i.DEPTH_TEST):ce(i.DEPTH_TEST)},setMask:function(ie){ee!==ie&&!D&&(i.depthMask(ie),ee=ie)},setFunc:function(ie){if(de&&(ie=dh[ie]),fe!==ie){switch(ie){case Lr:i.depthFunc(i.NEVER);break;case Dr:i.depthFunc(i.ALWAYS);break;case Nr:i.depthFunc(i.LESS);break;case Hi:i.depthFunc(i.LEQUAL);break;case Ur:i.depthFunc(i.EQUAL);break;case Fr:i.depthFunc(i.GEQUAL);break;case Or:i.depthFunc(i.GREATER);break;case Br:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=ie}},setLocked:function(ie){D=ie},setClear:function(ie){xe!==ie&&(xe=ie,de&&(ie=1-ie),i.clearDepth(ie))},reset:function(){D=!1,ee=null,fe=null,xe=null,de=!1}}}function s(){let D=!1,de=null,ee=null,fe=null,xe=null,ie=null,Ie=null,Ae=null,ut=null;return{setTest:function(et){D||(et?Q(i.STENCIL_TEST):ce(i.STENCIL_TEST))},setMask:function(et){de!==et&&!D&&(i.stencilMask(et),de=et)},setFunc:function(et,ln,xn){(ee!==et||fe!==ln||xe!==xn)&&(i.stencilFunc(et,ln,xn),ee=et,fe=ln,xe=xn)},setOp:function(et,ln,xn){(ie!==et||Ie!==ln||Ae!==xn)&&(i.stencilOp(et,ln,xn),ie=et,Ie=ln,Ae=xn)},setLocked:function(et){D=et},setClear:function(et){ut!==et&&(i.clearStencil(et),ut=et)},reset:function(){D=!1,de=null,ee=null,fe=null,xe=null,ie=null,Ie=null,Ae=null,ut=null}}}let r=new t,o=new n,l=new s,a=new WeakMap,c=new WeakMap,u={},f={},h={},p=new WeakMap,_=[],b=null,m=!1,d=null,M=null,A=null,x=null,w=null,S=null,C=null,y=new Fe(0,0,0),E=0,R=!1,I=null,F=null,O=null,P=null,k=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,ne=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(q)[1]),Y=ne>=1):q.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),Y=ne>=2);let Z=null,J={},ye=i.getParameter(i.SCISSOR_BOX),ve=i.getParameter(i.VIEWPORT),ze=new _t().fromArray(ye),Ve=new _t().fromArray(ve);function Ee(D,de,ee,fe){let xe=new Uint8Array(4),ie=i.createTexture();i.bindTexture(D,ie),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ie=0;Ie<ee;Ie++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(de+Ie,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return ie}let G={};G[i.TEXTURE_2D]=Ee(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=Ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=Ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=Ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),l.setClear(0),Q(i.DEPTH_TEST),o.setFunc(Hi),ae(!1),Ge($a),Q(i.CULL_FACE),W(En);function Q(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function ce(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Ce(D,de){return h[D]!==de?(i.bindFramebuffer(D,de),h[D]=de,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=de),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=de),!0):!1}function oe(D,de){let ee=_,fe=!1;if(D){ee=p.get(de),ee===void 0&&(ee=[],p.set(de,ee));let xe=D.textures;if(ee.length!==xe.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let ie=0,Ie=xe.length;ie<Ie;ie++)ee[ie]=i.COLOR_ATTACHMENT0+ie;ee.length=xe.length,fe=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,fe=!0);fe&&i.drawBuffers(ee)}function Ne(D){return b!==D?(i.useProgram(D),b=D,!0):!1}let rt={[xi]:i.FUNC_ADD,[Dc]:i.FUNC_SUBTRACT,[Nc]:i.FUNC_REVERSE_SUBTRACT};rt[Uc]=i.MIN,rt[Fc]=i.MAX;let Oe={[Oc]:i.ZERO,[Bc]:i.ONE,[kc]:i.SRC_COLOR,[tl]:i.SRC_ALPHA,[Xc]:i.SRC_ALPHA_SATURATE,[Gc]:i.DST_COLOR,[Hc]:i.DST_ALPHA,[zc]:i.ONE_MINUS_SRC_COLOR,[nl]:i.ONE_MINUS_SRC_ALPHA,[Wc]:i.ONE_MINUS_DST_COLOR,[Vc]:i.ONE_MINUS_DST_ALPHA,[qc]:i.CONSTANT_COLOR,[Yc]:i.ONE_MINUS_CONSTANT_COLOR,[Zc]:i.CONSTANT_ALPHA,[Kc]:i.ONE_MINUS_CONSTANT_ALPHA};function W(D,de,ee,fe,xe,ie,Ie,Ae,ut,et){if(D===En){m===!0&&(ce(i.BLEND),m=!1);return}if(m===!1&&(Q(i.BLEND),m=!0),D!==Lc){if(D!==d||et!==R){if((M!==xi||w!==xi)&&(i.blendEquation(i.FUNC_ADD),M=xi,w=xi),et)switch(D){case ji:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ja:i.blendFunc(i.ONE,i.ONE);break;case Qa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Be("WebGLState: Invalid blending: ",D);break}else switch(D){case ji:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ja:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Qa:Be("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case el:Be("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Be("WebGLState: Invalid blending: ",D);break}A=null,x=null,S=null,C=null,y.set(0,0,0),E=0,d=D,R=et}return}xe=xe||de,ie=ie||ee,Ie=Ie||fe,(de!==M||xe!==w)&&(i.blendEquationSeparate(rt[de],rt[xe]),M=de,w=xe),(ee!==A||fe!==x||ie!==S||Ie!==C)&&(i.blendFuncSeparate(Oe[ee],Oe[fe],Oe[ie],Oe[Ie]),A=ee,x=fe,S=ie,C=Ie),(Ae.equals(y)===!1||ut!==E)&&(i.blendColor(Ae.r,Ae.g,Ae.b,ut),y.copy(Ae),E=ut),d=D,R=!1}function se(D,de){D.side===yt?ce(i.CULL_FACE):Q(i.CULL_FACE);let ee=D.side===Dt;de&&(ee=!ee),ae(ee),D.blending===ji&&D.transparent===!1?W(En):W(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let fe=D.stencilWrite;l.setTest(fe),fe&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),at(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function ae(D){I!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),I=D)}function Ge(D){D!==Rc?(Q(i.CULL_FACE),D!==F&&(D===$a?i.cullFace(i.BACK):D===Pc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ce(i.CULL_FACE),F=D}function ot(D){D!==O&&(Y&&i.lineWidth(D),O=D)}function at(D,de,ee){D?(Q(i.POLYGON_OFFSET_FILL),(P!==de||k!==ee)&&(P=de,k=ee,o.getReversed()&&(de=-de),i.polygonOffset(de,ee))):ce(i.POLYGON_OFFSET_FILL)}function Ye(D){D?Q(i.SCISSOR_TEST):ce(i.SCISSOR_TEST)}function xt(D){D===void 0&&(D=i.TEXTURE0+K-1),Z!==D&&(i.activeTexture(D),Z=D)}function N(D,de,ee){ee===void 0&&(Z===null?ee=i.TEXTURE0+K-1:ee=Z);let fe=J[ee];fe===void 0&&(fe={type:void 0,texture:void 0},J[ee]=fe),(fe.type!==D||fe.texture!==de)&&(Z!==ee&&(i.activeTexture(ee),Z=ee),i.bindTexture(D,de||G[D]),fe.type=D,fe.texture=de)}function $e(){let D=J[Z];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Ze(){try{i.compressedTexImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function g(){try{i.texSubImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function B(){try{i.texSubImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function $(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function re(){try{i.texStorage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function le(){try{i.texStorage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function j(){try{i.texImage2D(...arguments)}catch(D){Be("WebGLState:",D)}}function te(){try{i.texImage3D(...arguments)}catch(D){Be("WebGLState:",D)}}function he(D){return f[D]!==void 0?f[D]:i.getParameter(D)}function Re(D,de){f[D]!==de&&(i.pixelStorei(D,de),f[D]=de)}function pe(D){ze.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ze.copy(D))}function ue(D){Ve.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Ve.copy(D))}function Pe(D,de){let ee=c.get(de);ee===void 0&&(ee=new WeakMap,c.set(de,ee));let fe=ee.get(D);fe===void 0&&(fe=i.getUniformBlockIndex(de,D.name),ee.set(D,fe))}function De(D,de){let fe=c.get(de).get(D);a.get(de)!==fe&&(i.uniformBlockBinding(de,fe,D.__bindingPointIndex),a.set(de,fe))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},f={},Z=null,J={},h={},p=new WeakMap,_=[],b=null,m=!1,d=null,M=null,A=null,x=null,w=null,S=null,C=null,y=new Fe(0,0,0),E=0,R=!1,I=null,F=null,O=null,P=null,k=null,ze.set(0,0,i.canvas.width,i.canvas.height),Ve.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),l.reset()}return{buffers:{color:r,depth:o,stencil:l},enable:Q,disable:ce,bindFramebuffer:Ce,drawBuffers:oe,useProgram:Ne,setBlending:W,setMaterial:se,setFlipSided:ae,setCullFace:Ge,setLineWidth:ot,setPolygonOffset:at,setScissorTest:Ye,activeTexture:xt,bindTexture:N,unbindTexture:$e,compressedTexImage2D:Ze,compressedTexImage3D:T,texImage2D:j,texImage3D:te,pixelStorei:Re,getParameter:he,updateUBOMapping:Pe,uniformBlockBinding:De,texStorage2D:re,texStorage3D:le,texSubImage2D:g,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:$,scissor:pe,viewport:ue,reset:He}}function dg(i,e,t,n,s,r,o){let l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,a=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ue,u=new WeakMap,f=new Set,h,p=new WeakMap,_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(T,g){return _?new OffscreenCanvas(T,g):ys("canvas")}function m(T,g,B){let V=1,$=Ze(T);if(($.width>B||$.height>B)&&(V=B/Math.max($.width,$.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let re=Math.floor(V*$.width),le=Math.floor(V*$.height);h===void 0&&(h=b(re,le));let j=g?b(re,le):h;return j.width=re,j.height=le,j.getContext("2d").drawImage(T,0,0,re,le),Le("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+re+"x"+le+")."),j}else return"data"in T&&Le("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function d(T){return T.generateMipmaps}function M(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(T,g,B,V,$,re=!1){if(T!==null){if(i[T]!==void 0)return i[T];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let le;V&&(le=e.get("EXT_texture_norm16"),le||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=g;if(g===i.RED&&(B===i.FLOAT&&(j=i.R32F),B===i.HALF_FLOAT&&(j=i.R16F),B===i.UNSIGNED_BYTE&&(j=i.R8),B===i.UNSIGNED_SHORT&&le&&(j=le.R16_EXT),B===i.SHORT&&le&&(j=le.R16_SNORM_EXT)),g===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.R8UI),B===i.UNSIGNED_SHORT&&(j=i.R16UI),B===i.UNSIGNED_INT&&(j=i.R32UI),B===i.BYTE&&(j=i.R8I),B===i.SHORT&&(j=i.R16I),B===i.INT&&(j=i.R32I)),g===i.RG&&(B===i.FLOAT&&(j=i.RG32F),B===i.HALF_FLOAT&&(j=i.RG16F),B===i.UNSIGNED_BYTE&&(j=i.RG8),B===i.UNSIGNED_SHORT&&le&&(j=le.RG16_EXT),B===i.SHORT&&le&&(j=le.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RG8UI),B===i.UNSIGNED_SHORT&&(j=i.RG16UI),B===i.UNSIGNED_INT&&(j=i.RG32UI),B===i.BYTE&&(j=i.RG8I),B===i.SHORT&&(j=i.RG16I),B===i.INT&&(j=i.RG32I)),g===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGB8UI),B===i.UNSIGNED_SHORT&&(j=i.RGB16UI),B===i.UNSIGNED_INT&&(j=i.RGB32UI),B===i.BYTE&&(j=i.RGB8I),B===i.SHORT&&(j=i.RGB16I),B===i.INT&&(j=i.RGB32I)),g===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),B===i.UNSIGNED_INT&&(j=i.RGBA32UI),B===i.BYTE&&(j=i.RGBA8I),B===i.SHORT&&(j=i.RGBA16I),B===i.INT&&(j=i.RGBA32I)),g===i.RGB&&(B===i.UNSIGNED_SHORT&&le&&(j=le.RGB16_EXT),B===i.SHORT&&le&&(j=le.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),g===i.RGBA){let te=re?xs:Je.getTransfer($);B===i.FLOAT&&(j=i.RGBA32F),B===i.HALF_FLOAT&&(j=i.RGBA16F),B===i.UNSIGNED_BYTE&&(j=te===nt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&le&&(j=le.RGBA16_EXT),B===i.SHORT&&le&&(j=le.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function w(T,g){let B;return T?g===null||g===mn||g===es?B=i.DEPTH24_STENCIL8:g===rn?B=i.DEPTH32F_STENCIL8:g===Qi&&(B=i.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===mn||g===es?B=i.DEPTH_COMPONENT24:g===rn?B=i.DEPTH_COMPONENT32F:g===Qi&&(B=i.DEPTH_COMPONENT16),B}function S(T,g){return d(T)===!0||T.isFramebufferTexture&&T.minFilter!==Rt&&T.minFilter!==It?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function C(T){let g=T.target;g.removeEventListener("dispose",C),E(g),g.isVideoTexture&&u.delete(g),g.isHTMLTexture&&f.delete(g)}function y(T){let g=T.target;g.removeEventListener("dispose",y),I(g)}function E(T){let g=n.get(T);if(g.__webglInit===void 0)return;let B=T.source,V=p.get(B);if(V){let $=V[g.__cacheKey];$.usedTimes--,$.usedTimes===0&&R(T),Object.keys(V).length===0&&p.delete(B)}n.remove(T)}function R(T){let g=n.get(T);i.deleteTexture(g.__webglTexture);let B=T.source,V=p.get(B);delete V[g.__cacheKey],o.memory.textures--}function I(T){let g=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(g.__webglFramebuffer[V]))for(let $=0;$<g.__webglFramebuffer[V].length;$++)i.deleteFramebuffer(g.__webglFramebuffer[V][$]);else i.deleteFramebuffer(g.__webglFramebuffer[V]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[V])}else{if(Array.isArray(g.__webglFramebuffer))for(let V=0;V<g.__webglFramebuffer.length;V++)i.deleteFramebuffer(g.__webglFramebuffer[V]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let V=0;V<g.__webglColorRenderbuffer.length;V++)g.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[V]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let B=T.textures;for(let V=0,$=B.length;V<$;V++){let re=n.get(B[V]);re.__webglTexture&&(i.deleteTexture(re.__webglTexture),o.memory.textures--),n.remove(B[V])}n.remove(T)}let F=0;function O(){F=0}function P(){return F}function k(T){F=T}function K(){let T=F;return T>=s.maxTextures&&Le("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function Y(T){let g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function ne(T,g){let B=n.get(T);if(T.isVideoTexture&&N(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){let V=T.image;if(V===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{ce(B,T,g);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+g)}function q(T,g){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){ce(B,T,g);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+g)}function Z(T,g){let B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){ce(B,T,g);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+g)}function J(T,g){let B=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&B.__version!==T.version){Ce(B,T,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+g)}let ye={[kr]:i.REPEAT,[bn]:i.CLAMP_TO_EDGE,[zr]:i.MIRRORED_REPEAT},ve={[Rt]:i.NEAREST,[jc]:i.NEAREST_MIPMAP_NEAREST,[Gs]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},ze={[nh]:i.NEVER,[ah]:i.ALWAYS,[ih]:i.LESS,[jo]:i.LEQUAL,[sh]:i.EQUAL,[Qo]:i.GEQUAL,[rh]:i.GREATER,[oh]:i.NOTEQUAL};function Ve(T,g){if(g.type===rn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===It||g.magFilter===po||g.magFilter===Gs||g.magFilter===ii||g.minFilter===It||g.minFilter===po||g.minFilter===Gs||g.minFilter===ii)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ye[g.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ye[g.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ye[g.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,ve[g.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,ve[g.minFilter]),g.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ze[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Rt||g.minFilter!==Gs&&g.minFilter!==ii||g.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Ee(T,g){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",C));let V=g.source,$=p.get(V);$===void 0&&($={},p.set(V,$));let re=Y(g);if(re!==T.__cacheKey){$[re]===void 0&&($[re]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),$[re].usedTimes++;let le=$[T.__cacheKey];le!==void 0&&($[T.__cacheKey].usedTimes--,le.usedTimes===0&&R(g)),T.__cacheKey=re,T.__webglTexture=$[re].texture}return B}function G(T,g,B){return Math.floor(Math.floor(T/B)/g)}function Q(T,g,B,V){let re=T.updateRanges;if(re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,B,V,g.data);else{re.sort((Re,pe)=>Re.start-pe.start);let le=0;for(let Re=1;Re<re.length;Re++){let pe=re[le],ue=re[Re],Pe=pe.start+pe.count,De=G(ue.start,g.width,4),He=G(pe.start,g.width,4);ue.start<=Pe+1&&De===He&&G(ue.start+ue.count-1,g.width,4)===De?pe.count=Math.max(pe.count,ue.start+ue.count-pe.start):(++le,re[le]=ue)}re.length=le+1;let j=t.getParameter(i.UNPACK_ROW_LENGTH),te=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let Re=0,pe=re.length;Re<pe;Re++){let ue=re[Re],Pe=Math.floor(ue.start/4),De=Math.ceil(ue.count/4),He=Pe%g.width,D=Math.floor(Pe/g.width),de=De,ee=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,He),t.pixelStorei(i.UNPACK_SKIP_ROWS,D),t.texSubImage2D(i.TEXTURE_2D,0,He,D,de,ee,B,V,g.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,te),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function ce(T,g,B){let V=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(V=i.TEXTURE_3D);let $=Ee(T,g),re=g.source;t.bindTexture(V,T.__webglTexture,i.TEXTURE0+B);let le=n.get(re);if(re.version!==le.__version||$===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let ee=Je.getPrimaries(Je.workingColorSpace),fe=g.colorSpace===On?null:Je.getPrimaries(g.colorSpace),xe=g.colorSpace===On||ee===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let te=m(g.image,!1,s.maxTextureSize);te=$e(g,te);let he=r.convert(g.format,g.colorSpace),Re=r.convert(g.type),pe=x(g.internalFormat,he,Re,g.normalized,g.colorSpace,g.isVideoTexture);Ve(V,g);let ue,Pe=g.mipmaps,De=g.isVideoTexture!==!0,He=le.__version===void 0||$===!0,D=re.dataReady,de=S(g,te);if(g.isDepthTexture)pe=w(g.format===si,g.type),He&&(De?t.texStorage2D(i.TEXTURE_2D,1,pe,te.width,te.height):t.texImage2D(i.TEXTURE_2D,0,pe,te.width,te.height,0,he,Re,null));else if(g.isDataTexture)if(Pe.length>0){De&&He&&t.texStorage2D(i.TEXTURE_2D,de,pe,Pe[0].width,Pe[0].height);for(let ee=0,fe=Pe.length;ee<fe;ee++)ue=Pe[ee],De?D&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,he,Re,ue.data):t.texImage2D(i.TEXTURE_2D,ee,pe,ue.width,ue.height,0,he,Re,ue.data);g.generateMipmaps=!1}else De?(He&&t.texStorage2D(i.TEXTURE_2D,de,pe,te.width,te.height),D&&Q(g,te,he,Re)):t.texImage2D(i.TEXTURE_2D,0,pe,te.width,te.height,0,he,Re,te.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){De&&He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,pe,Pe[0].width,Pe[0].height,te.depth);for(let ee=0,fe=Pe.length;ee<fe;ee++)if(ue=Pe[ee],g.format!==on)if(he!==null)if(De){if(D)if(g.layerUpdates.size>0){let xe=Sl(ue.width,ue.height,g.format,g.type);for(let ie of g.layerUpdates){let Ie=ue.data.subarray(ie*xe/ue.data.BYTES_PER_ELEMENT,(ie+1)*xe/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,ie,ue.width,ue.height,1,he,Ie)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,te.depth,he,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,pe,ue.width,ue.height,te.depth,0,ue.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,ue.width,ue.height,te.depth,he,Re,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,pe,ue.width,ue.height,te.depth,0,he,Re,ue.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{De&&He&&t.texStorage2D(i.TEXTURE_2D,de,pe,Pe[0].width,Pe[0].height);for(let ee=0,fe=Pe.length;ee<fe;ee++)ue=Pe[ee],g.format!==on?he!==null?De?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,he,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,pe,ue.width,ue.height,0,ue.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?D&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ue.width,ue.height,he,Re,ue.data):t.texImage2D(i.TEXTURE_2D,ee,pe,ue.width,ue.height,0,he,Re,ue.data)}else if(g.isDataArrayTexture)if(De){if(He&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,pe,te.width,te.height,te.depth),D)if(g.layerUpdates.size>0){let ee=Sl(te.width,te.height,g.format,g.type);for(let fe of g.layerUpdates){let xe=te.data.subarray(fe*ee/te.data.BYTES_PER_ELEMENT,(fe+1)*ee/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,fe,te.width,te.height,1,he,Re,xe)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,he,Re,te.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,pe,te.width,te.height,te.depth,0,he,Re,te.data);else if(g.isData3DTexture)De?(He&&t.texStorage3D(i.TEXTURE_3D,de,pe,te.width,te.height,te.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,he,Re,te.data)):t.texImage3D(i.TEXTURE_3D,0,pe,te.width,te.height,te.depth,0,he,Re,te.data);else if(g.isFramebufferTexture){if(He)if(De)t.texStorage2D(i.TEXTURE_2D,de,pe,te.width,te.height);else{let ee=te.width,fe=te.height;for(let xe=0;xe<de;xe++)t.texImage2D(i.TEXTURE_2D,xe,pe,ee,fe,0,he,Re,null),ee>>=1,fe>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let ee=i.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),te.parentNode!==ee){ee.appendChild(te),f.add(g),ee.onpaint=fe=>{let xe=fe.changedElements;for(let ie of f)xe.includes(ie.image)&&(ie.needsUpdate=!0)},ee.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,te);else{let xe=i.RGBA,ie=i.RGBA,Ie=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,xe,ie,Ie,te)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(De&&He){let ee=Ze(Pe[0]);t.texStorage2D(i.TEXTURE_2D,de,pe,ee.width,ee.height)}for(let ee=0,fe=Pe.length;ee<fe;ee++)ue=Pe[ee],De?D&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he,Re,ue):t.texImage2D(i.TEXTURE_2D,ee,pe,he,Re,ue);g.generateMipmaps=!1}else if(De){if(He){let ee=Ze(te);t.texStorage2D(i.TEXTURE_2D,de,pe,ee.width,ee.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Re,te)}else t.texImage2D(i.TEXTURE_2D,0,pe,he,Re,te);d(g)&&M(V),le.__version=re.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function Ce(T,g,B){if(g.image.length!==6)return;let V=Ee(T,g),$=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);let re=n.get($);if($.version!==re.__version||V===!0){t.activeTexture(i.TEXTURE0+B);let le=Je.getPrimaries(Je.workingColorSpace),j=g.colorSpace===On?null:Je.getPrimaries(g.colorSpace),te=g.colorSpace===On||le===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let he=g.isCompressedTexture||g.image[0].isCompressedTexture,Re=g.image[0]&&g.image[0].isDataTexture,pe=[];for(let ie=0;ie<6;ie++)!he&&!Re?pe[ie]=m(g.image[ie],!0,s.maxCubemapSize):pe[ie]=Re?g.image[ie].image:g.image[ie],pe[ie]=$e(g,pe[ie]);let ue=pe[0],Pe=r.convert(g.format,g.colorSpace),De=r.convert(g.type),He=x(g.internalFormat,Pe,De,g.normalized,g.colorSpace),D=g.isVideoTexture!==!0,de=re.__version===void 0||V===!0,ee=$.dataReady,fe=S(g,ue);Ve(i.TEXTURE_CUBE_MAP,g);let xe;if(he){D&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,He,ue.width,ue.height);for(let ie=0;ie<6;ie++){xe=pe[ie].mipmaps;for(let Ie=0;Ie<xe.length;Ie++){let Ae=xe[Ie];g.format!==on?Pe!==null?D?ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie,0,0,Ae.width,Ae.height,Pe,Ae.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie,He,Ae.width,Ae.height,0,Ae.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie,0,0,Ae.width,Ae.height,Pe,De,Ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie,He,Ae.width,Ae.height,0,Pe,De,Ae.data)}}}else{if(xe=g.mipmaps,D&&de){xe.length>0&&fe++;let ie=Ze(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,He,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(Re){D?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,pe[ie].width,pe[ie].height,Pe,De,pe[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,He,pe[ie].width,pe[ie].height,0,Pe,De,pe[ie].data);for(let Ie=0;Ie<xe.length;Ie++){let ut=xe[Ie].image[ie].image;D?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie+1,0,0,ut.width,ut.height,Pe,De,ut.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie+1,He,ut.width,ut.height,0,Pe,De,ut.data)}}else{D?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Pe,De,pe[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,He,Pe,De,pe[ie]);for(let Ie=0;Ie<xe.length;Ie++){let Ae=xe[Ie];D?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie+1,0,0,Pe,De,Ae.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ie+1,He,Pe,De,Ae.image[ie])}}}d(g)&&M(i.TEXTURE_CUBE_MAP),re.__version=$.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function oe(T,g,B,V,$,re){let le=r.convert(B.format,B.colorSpace),j=r.convert(B.type),te=x(B.internalFormat,le,j,B.normalized,B.colorSpace),he=n.get(g),Re=n.get(B);if(Re.__renderTarget=g,!he.__hasExternalTextures){let pe=Math.max(1,g.width>>re),ue=Math.max(1,g.height>>re);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,re,te,pe,ue,g.depth,0,le,j,null):t.texImage2D($,re,te,pe,ue,0,le,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),xt(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,$,Re.__webglTexture,0,Ye(g)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,$,Re.__webglTexture,re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(T,g,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),g.depthBuffer){let V=g.depthTexture,$=V&&V.isDepthTexture?V.type:null,re=w(g.stencilBuffer,$),le=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xt(g)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ye(g),re,g.width,g.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye(g),re,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,re,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,T)}else{let V=g.textures;for(let $=0;$<V.length;$++){let re=V[$],le=r.convert(re.format,re.colorSpace),j=r.convert(re.type),te=x(re.internalFormat,le,j,re.normalized,re.colorSpace);xt(g)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ye(g),te,g.width,g.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye(g),te,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,te,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function rt(T,g,B){let V=g.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let $=n.get(g.depthTexture);if($.__renderTarget=g,(!$.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),V){if($.__webglInit===void 0&&($.__webglInit=!0,g.depthTexture.addEventListener("dispose",C)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,g.depthTexture);let he=r.convert(g.depthTexture.format),Re=r.convert(g.depthTexture.type),pe;g.depthTexture.format===Sn?pe=i.DEPTH_COMPONENT24:g.depthTexture.format===si&&(pe=i.DEPTH24_STENCIL8);for(let ue=0;ue<6;ue++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,pe,g.width,g.height,0,he,Re,null)}}else ne(g.depthTexture,0);let re=$.__webglTexture,le=Ye(g),j=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,te=g.depthTexture.format===si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Sn)xt(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,j,re,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,te,j,re,0);else if(g.depthTexture.format===si)xt(g)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,j,re,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,te,j,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Oe(T){let g=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){let V=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),V){let $=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,V.removeEventListener("dispose",$)};V.addEventListener("dispose",$),g.__depthDisposeCallback=$}g.__boundDepthTexture=V}if(T.depthTexture&&!g.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)rt(g.__webglFramebuffer[V],T,V);else{let V=T.texture.mipmaps;V&&V.length>0?rt(g.__webglFramebuffer[0],T,0):rt(g.__webglFramebuffer,T,0)}else if(B){g.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[V]),g.__webglDepthbuffer[V]===void 0)g.__webglDepthbuffer[V]=i.createRenderbuffer(),Ne(g.__webglDepthbuffer[V],T,!1);else{let $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=g.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,re)}}else{let V=T.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Ne(g.__webglDepthbuffer,T,!1);else{let $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,re)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function W(T,g,B){let V=n.get(T);g!==void 0&&oe(V.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Oe(T)}function se(T){let g=T.texture,B=n.get(T),V=n.get(g);T.addEventListener("dispose",y);let $=T.textures,re=T.isWebGLCubeRenderTarget===!0,le=$.length>1;if(le||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=g.version,o.memory.textures++),re){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(g.mipmaps&&g.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let te=0;te<g.mipmaps.length;te++)B.__webglFramebuffer[j][te]=i.createFramebuffer()}else B.__webglFramebuffer[j]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<g.mipmaps.length;j++)B.__webglFramebuffer[j]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(le)for(let j=0,te=$.length;j<te;j++){let he=n.get($[j]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&xt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<$.length;j++){let te=$[j];B.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[j]);let he=r.convert(te.format,te.colorSpace),Re=r.convert(te.type),pe=x(te.internalFormat,he,Re,te.normalized,te.colorSpace,T.isXRRenderTarget===!0),ue=Ye(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,pe,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,B.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),Ne(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,g);for(let j=0;j<6;j++)if(g.mipmaps&&g.mipmaps.length>0)for(let te=0;te<g.mipmaps.length;te++)oe(B.__webglFramebuffer[j][te],T,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,te);else oe(B.__webglFramebuffer[j],T,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);d(g)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let j=0,te=$.length;j<te;j++){let he=$[j],Re=n.get(he),pe=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pe=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(pe,Re.__webglTexture),Ve(pe,he),oe(B.__webglFramebuffer,T,he,i.COLOR_ATTACHMENT0+j,pe,0),d(he)&&M(pe)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(j=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,V.__webglTexture),Ve(j,g),g.mipmaps&&g.mipmaps.length>0)for(let te=0;te<g.mipmaps.length;te++)oe(B.__webglFramebuffer[te],T,g,i.COLOR_ATTACHMENT0,j,te);else oe(B.__webglFramebuffer,T,g,i.COLOR_ATTACHMENT0,j,0);d(g)&&M(j),t.unbindTexture()}T.depthBuffer&&Oe(T)}function ae(T){let g=T.textures;for(let B=0,V=g.length;B<V;B++){let $=g[B];if(d($)){let re=A(T),le=n.get($).__webglTexture;t.bindTexture(re,le),M(re),t.unbindTexture()}}}let Ge=[],ot=[];function at(T){if(T.samples>0){if(xt(T)===!1){let g=T.textures,B=T.width,V=T.height,$=i.COLOR_BUFFER_BIT,re=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(T),j=g.length>1;if(j)for(let he=0;he<g.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);let te=T.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let he=0;he<g.length;he++){if(T.resolveDepthBuffer&&(T.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[he]);let Re=n.get(g[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Re,0)}i.blitFramebuffer(0,0,B,V,0,0,B,V,$,i.NEAREST),a===!0&&(Ge.length=0,ot.length=0,Ge.push(i.COLOR_ATTACHMENT0+he),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(Ge.push(re),ot.push(re),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ot)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ge))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let he=0;he<g.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,le.__webglColorRenderbuffer[he]);let Re=n.get(g[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,Re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&a){let g=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Ye(T){return Math.min(s.maxSamples,T.samples)}function xt(T){let g=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function N(T){let g=o.render.frame;u.get(T)!==g&&(u.set(T,g),T.update())}function $e(T,g){let B=T.colorSpace,V=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==_s&&B!==On&&(Je.getTransfer(B)===nt?(V!==on||$!==Kt)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Be("WebGLTextures: Unsupported texture color space:",B)),g}function Ze(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=O,this.getTextureUnits=P,this.setTextureUnits=k,this.setTexture2D=ne,this.setTexture2DArray=q,this.setTexture3D=Z,this.setTextureCube=J,this.rebindTextures=W,this.setupRenderTarget=se,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=at,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=xt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fg(i,e){function t(n,s=On){let r,o=Je.getTransfer(s);if(n===Kt)return i.UNSIGNED_BYTE;if(n===go)return i.UNSIGNED_SHORT_4_4_4_4;if(n===_o)return i.UNSIGNED_SHORT_5_5_5_1;if(n===dl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===hl)return i.BYTE;if(n===ul)return i.SHORT;if(n===Qi)return i.UNSIGNED_SHORT;if(n===mo)return i.INT;if(n===mn)return i.UNSIGNED_INT;if(n===rn)return i.FLOAT;if(n===gn)return i.HALF_FLOAT;if(n===pl)return i.ALPHA;if(n===ml)return i.RGB;if(n===on)return i.RGBA;if(n===Sn)return i.DEPTH_COMPONENT;if(n===si)return i.DEPTH_STENCIL;if(n===xo)return i.RED;if(n===yo)return i.RED_INTEGER;if(n===ri)return i.RG;if(n===vo)return i.RG_INTEGER;if(n===bo)return i.RGBA_INTEGER;if(n===Ws||n===Xs||n===qs||n===Ys)if(o===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ws)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ws)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ys)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===So||n===Mo||n===wo||n===Eo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===So)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Mo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ao||n===To||n===Co||n===Ro||n===Po||n===Zs||n===Io)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ao||n===To)return o===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Co)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ro)return r.COMPRESSED_R11_EAC;if(n===Po)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Zs)return r.COMPRESSED_RG11_EAC;if(n===Io)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Lo||n===Do||n===No||n===Uo||n===Fo||n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===Vo||n===Go||n===Wo||n===Xo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Lo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Do)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===No)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Oo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ko)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ho)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Go)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xo)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===qo||n===Yo||n===Zo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===qo)return o===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ko||n===Jo||n===Ks||n===$o)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ko)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ks)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$o)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var pg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Fl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Rs(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new en({vertexShader:pg,fragmentShader:mg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ft(new Is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ol=class extends fn{constructor(e,t){super();let n=this,s=null,r=1,o=null,l="local-floor",a=1,c=null,u=null,f=null,h=null,p=null,_=null,b=typeof XRWebGLBinding<"u",m=new Fl,d={},M=t.getContextAttributes(),A=null,x=null,w=[],S=[],C=new Ue,y=null,E=null,R=new Vt;R.viewport=new _t;let I=new Vt;I.viewport=new _t;let F=[R,I],O=new co,P=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let Q=w[G];return Q===void 0&&(Q=new qi,w[G]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(G){let Q=w[G];return Q===void 0&&(Q=new qi,w[G]=Q),Q.getGripSpace()},this.getHand=function(G){let Q=w[G];return Q===void 0&&(Q=new qi,w[G]=Q),Q.getHandSpace()};function K(G){let Q=S.indexOf(G.inputSource);if(Q===-1)return;let ce=w[Q];ce!==void 0&&(ce.update(G.inputSource,G.frame,c||o),ce.dispatchEvent({type:G.type,data:G.inputSource}))}function Y(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",ne);for(let G=0;G<w.length;G++){let Q=S[G];Q!==null&&(S[G]=null,w[G].disconnect(Q))}P=null,k=null,m.reset();for(let G in d)delete d[G];if(e.setRenderTarget(A),p=null,h=null,f=null,s=null,x=null,Ee.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),E!==null){let G=E.camera;G.fov=E.fov,G.zoom=E.zoom,G.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){l=G,n.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",ne),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Ce=null,oe=null;M.depth&&(oe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=M.stencil?si:Sn,Ce=M.stencil?es:mn);let Ne={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ne),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new Zt(h.textureWidth,h.textureHeight,{format:on,type:Kt,depthTexture:new Yn(h.textureWidth,h.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ce={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Zt(p.framebufferWidth,p.framebufferHeight,{format:on,type:Kt,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(a),c=null,o=await s.requestReferenceSpace(l),Ee.setContext(s),Ee.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ne(G){for(let Q=0;Q<G.removed.length;Q++){let ce=G.removed[Q],Ce=S.indexOf(ce);Ce>=0&&(S[Ce]=null,w[Ce].disconnect(ce))}for(let Q=0;Q<G.added.length;Q++){let ce=G.added[Q],Ce=S.indexOf(ce);if(Ce===-1){for(let Ne=0;Ne<w.length;Ne++)if(Ne>=S.length){S.push(ce),Ce=Ne;break}else if(S[Ne]===null){S[Ne]=ce,Ce=Ne;break}if(Ce===-1)break}let oe=w[Ce];oe&&oe.connect(ce)}}let q=new U,Z=new U;function J(G,Q,ce){q.setFromMatrixPosition(Q.matrixWorld),Z.setFromMatrixPosition(ce.matrixWorld);let Ce=q.distanceTo(Z),oe=Q.projectionMatrix.elements,Ne=ce.projectionMatrix.elements,rt=oe[14]/(oe[10]-1),Oe=oe[14]/(oe[10]+1),W=(oe[9]+1)/oe[5],se=(oe[9]-1)/oe[5],ae=(oe[8]-1)/oe[0],Ge=(Ne[8]+1)/Ne[0],ot=rt*ae,at=rt*Ge,Ye=Ce/(-ae+Ge),xt=Ye*-ae;if(Q.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(xt),G.translateZ(Ye),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),oe[10]===-1)G.projectionMatrix.copy(Q.projectionMatrix),G.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let N=rt+Ye,$e=Oe+Ye,Ze=ot-xt,T=at+(Ce-xt),g=W*Oe/$e*N,B=se*Oe/$e*N;G.projectionMatrix.makePerspective(Ze,T,g,B,N,$e),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function ye(G,Q){Q===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(Q.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let Q=G.near,ce=G.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(ce=m.depthFar)),O.near=I.near=R.near=Q,O.far=I.far=R.far=ce,(P!==O.near||k!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),P=O.near,k=O.far),O.layers.mask=G.layers.mask|6,R.layers.mask=O.layers.mask&-5,I.layers.mask=O.layers.mask&-3;let Ce=G.parent,oe=O.cameras;ye(O,Ce);for(let Ne=0;Ne<oe.length;Ne++)ye(oe[Ne],Ce);oe.length===2?J(O,R,I):O.projectionMatrix.copy(R.projectionMatrix),E===null&&G.isPerspectiveCamera&&(E={camera:G,fov:G.fov,zoom:G.zoom}),ve(G,O,Ce)};function ve(G,Q,ce){ce===null?G.matrix.copy(Q.matrixWorld):(G.matrix.copy(ce.matrixWorld),G.matrix.invert(),G.matrix.multiply(Q.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(Q.projectionMatrix),G.projectionMatrixInverse.copy(Q.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Wi*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(h===null&&p===null))return a},this.setFoveation=function(G){a=G,h!==null&&(h.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(G){return d[G]};let ze=null;function Ve(G,Q){if(u=Q.getViewerPose(c||o),_=Q,u!==null){let ce=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let Ce=!1;ce.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let Oe=0;Oe<ce.length;Oe++){let W=ce[Oe],se=null;if(p!==null)se=p.getViewport(W);else{let Ge=f.getViewSubImage(h,W);se=Ge.viewport,Oe===0&&(e.setRenderTargetTextures(x,Ge.colorTexture,Ge.depthStencilTexture),e.setRenderTarget(x))}let ae=F[Oe];ae===void 0&&(ae=new Vt,ae.layers.enable(Oe),ae.viewport=new _t,F[Oe]=ae),ae.matrix.fromArray(W.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(W.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(se.x,se.y,se.width,se.height),Oe===0&&(O.matrix.copy(ae.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(ae)}let oe=s.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){f=n.getBinding();let Oe=f.getDepthInformation(ce[0]);Oe&&Oe.isValid&&Oe.texture&&m.init(Oe,s.renderState)}if(oe&&oe.includes("camera-access")&&b){e.state.unbindTexture(),f=n.getBinding();for(let Oe=0;Oe<ce.length;Oe++){let W=ce[Oe].camera;if(W){let se=d[W];se||(se=new Rs,d[W]=se);let ae=f.getCameraImage(W);se.sourceTexture=ae}}}}for(let ce=0;ce<w.length;ce++){let Ce=S[ce],oe=w[ce];Ce!==null&&oe!==void 0&&oe.update(Ce,Q,c||o)}ze&&ze(G,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),_=null}let Ee=new Bh;Ee.setAnimationLoop(Ve),this.setAnimationLoop=function(G){ze=G},this.dispose=function(){}}},gg=new Qe,Wh=new ke;Wh.set(-1,0,0,0,1,0,0,0,1);function _g(i,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,yl(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,M,A,x){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(r(m,d),_(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),b(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&l(m,d)):d.isPointsMaterial?a(m,d,M,A):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Dt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Dt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let M=e.get(d),A=M.envMap,x=M.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(x)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Wh),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function l(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function a(m,d,M,A){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*M,m.scale.value=A*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,M){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Dt&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function b(m,d){let M=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function xg(i,e,t,n){let s={},r={},o=[],l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function a(x,w){let S=w.program;n.uniformBlockBinding(x,S)}function c(x,w){let S=s[x.id];S===void 0&&(m(x),S=u(x),s[x.id]=S,x.addEventListener("dispose",M));let C=w.program;n.updateUBOMapping(x,C);let y=e.render.frame;r[x.id]!==y&&(h(x),r[x.id]=y)}function u(x){let w=f();x.__bindingPointIndex=w;let S=i.createBuffer(),C=x.__size,y=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,S),S}function f(){for(let x=0;x<l;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Be("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){let w=s[x.id],S=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let y=0,E=S.length;y<E;y++){let R=S[y];if(Array.isArray(R))for(let I=0,F=R.length;I<F;I++)p(R[I],y,I,C);else p(R,y,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,w,S,C){if(b(x,w,S,C)===!0){let y=x.__offset,E=x.value;if(Array.isArray(E)){let R=0;for(let I=0;I<E.length;I++){let F=E[I],O=d(F);_(F,x.__data,R),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(R+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(E,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,x.__data)}}function _(x,w,S){typeof x=="number"||typeof x=="boolean"?w[0]=x:x.isMatrix3?(w[0]=x.elements[0],w[1]=x.elements[1],w[2]=x.elements[2],w[3]=0,w[4]=x.elements[3],w[5]=x.elements[4],w[6]=x.elements[5],w[7]=0,w[8]=x.elements[6],w[9]=x.elements[7],w[10]=x.elements[8],w[11]=0):ArrayBuffer.isView(x)?w.set(new x.constructor(x.buffer,x.byteOffset,w.length)):x.toArray(w,S)}function b(x,w,S,C){let y=x.value,E=w+"_"+S;if(C[E]===void 0)return typeof y=="number"||typeof y=="boolean"?C[E]=y:ArrayBuffer.isView(y)?C[E]=y.slice():C[E]=y.clone(),!0;{let R=C[E];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return C[E]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function m(x){let w=x.uniforms,S=0,C=16;for(let E=0,R=w.length;E<R;E++){let I=Array.isArray(w[E])?w[E]:[w[E]];for(let F=0,O=I.length;F<O;F++){let P=I[F],k=Array.isArray(P.value)?P.value:[P.value];for(let K=0,Y=k.length;K<Y;K++){let ne=k[K],q=d(ne),Z=S%C,J=Z%q.boundary,ye=Z+J;S+=J,ye!==0&&C-ye<q.storage&&(S+=C-ye),P.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=S,S+=q.storage}}}let y=S%C;return y>0&&(S+=C-y),x.__size=S,x.__cache={},this}function d(x){let w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(w.boundary=16,w.storage=x.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",x),w}function M(x){let w=x.target;w.removeEventListener("dispose",M);let S=o.indexOf(w.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function A(){for(let x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:a,update:c,dispose:A}}var yg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Tn=null;function vg(){return Tn===null&&(Tn=new Es(yg,16,16,ri,gn),Tn.name="DFG_LUT",Tn.minFilter=It,Tn.magFilter=It,Tn.wrapS=bn,Tn.wrapT=bn,Tn.generateMipmaps=!1,Tn.needsUpdate=!0),Tn}var ia=class{constructor(e={}){let{canvas:t=ch(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Kt}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=o;let b=p,m=new Set([bo,vo,yo]),d=new Set([Kt,mn,Qi,es,go,_o]),M=new Uint32Array(4),A=new Int32Array(4),x=new U,w=null,S=null,C=[],y=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,F=null,O=null,P=null,k=null;this._outputColorSpace=zt;let K=0,Y=0,ne=null,q=-1,Z=null,J=new _t,ye=new _t,ve=null,ze=new Fe(0),Ve=0,Ee=t.width,G=t.height,Q=1,ce=null,Ce=null,oe=new _t(0,0,Ee,G),Ne=new _t(0,0,Ee,G),rt=!1,Oe=new Yi,W=!1,se=!1,ae=new Qe,Ge=new U,ot=new _t,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ye=!1;function xt(){return ne===null?Q:1}let N=n;function $e(v,L){return t.getContext(v,L)}let Ze,T,g,B,V,$,re,le,j,te,he,Re,pe,ue,Pe,De,He,D,de,ee,fe,xe,ie;try{let v={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:a,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",et,!1),t.addEventListener("webglcontextcreationerror",ln,!1),N===null){let L="webgl2";if(N=$e(L,v),N===null)throw $e(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ie()}catch(v){throw t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",et,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),Be("WebGLRenderer: "+v.message),v}function Ie(){Ze=new Tm(N),Ze.init(),fe=new fg(N,Ze),T=new _m(N,Ze,e,fe),g=new ug(N,Ze),T.reversedDepthBuffer&&h&&g.buffers.depth.setReversed(!0),O=N.createFramebuffer(),P=N.createFramebuffer(),k=N.createFramebuffer(),B=new Pm(N),V=new $0,$=new dg(N,Ze,g,V,T,fe,B),re=new Am(R),le=new Id(N),xe=new mm(N,le),j=new Cm(N,le,B,xe),te=new Lm(N,j,le,xe,B),D=new Im(N,T,$),Pe=new xm(V),he=new J0(R,re,Ze,T,xe,Pe),Re=new _g(R,V),pe=new Q0,ue=new rg(Ze),He=new pm(R,re,g,te,_,a),De=new hg(R,te,T),ie=new xg(N,B,T,g),de=new gm(N,Ze,B),ee=new Rm(N,Ze,B),B.programs=he.programs,R.capabilities=T,R.extensions=Ze,R.properties=V,R.renderLists=pe,R.shadowMap=De,R.state=g,R.info=B}b!==Kt&&(E=new Nm(b,t.width,t.height,l,s,r));let Ae=new Ol(R,N);this.xr=Ae,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let v=Ze.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Ze.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(v){v!==void 0&&(Q=v,this.setSize(Ee,G,!1))},this.getSize=function(v){return v.set(Ee,G)},this.setSize=function(v,L,X=!0){if(Ae.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}Ee=v,G=L,t.width=Math.floor(v*Q),t.height=Math.floor(L*Q),X===!0&&(t.style.width=v+"px",t.style.height=L+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(Ee*Q,G*Q).floor()},this.setDrawingBufferSize=function(v,L,X){Ee=v,G=L,Q=X,t.width=Math.floor(v*X),t.height=Math.floor(L*X),this.setViewport(0,0,v,L)},this.setEffects=function(v){if(b===Kt){Be("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let L=0;L<v.length;L++)if(v[L].isOutputPass===!0){Le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(J)},this.getViewport=function(v){return v.copy(oe)},this.setViewport=function(v,L,X,z){v.isVector4?oe.set(v.x,v.y,v.z,v.w):oe.set(v,L,X,z),g.viewport(J.copy(oe).multiplyScalar(Q).round())},this.getScissor=function(v){return v.copy(Ne)},this.setScissor=function(v,L,X,z){v.isVector4?Ne.set(v.x,v.y,v.z,v.w):Ne.set(v,L,X,z),g.scissor(ye.copy(Ne).multiplyScalar(Q).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(v){g.setScissorTest(rt=v)},this.setOpaqueSort=function(v){ce=v},this.setTransparentSort=function(v){Ce=v},this.getClearColor=function(v){return v.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(v=!0,L=!0,X=!0){let z=0;if(v){let H=!1;if(ne!==null){let _e=ne.texture.format;H=m.has(_e)}if(H){let _e=ne.texture.type,Se=d.has(_e),ge=He.getClearColor(),Me=He.getClearAlpha(),Te=ge.r,We=ge.g,Ke=ge.b;Se?(M[0]=Te,M[1]=We,M[2]=Ke,M[3]=Me,N.clearBufferuiv(N.COLOR,0,M)):(A[0]=Te,A[1]=We,A[2]=Ke,A[3]=Me,N.clearBufferiv(N.COLOR,0,A))}else z|=N.COLOR_BUFFER_BIT}L&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),F=v},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",et,!1),t.removeEventListener("webglcontextcreationerror",ln,!1),He.dispose(),pe.dispose(),ue.dispose(),V.dispose(),re.dispose(),te.dispose(),xe.dispose(),ie.dispose(),he.dispose(),Ae.dispose(),Ae.removeEventListener("sessionstart",ql),Ae.removeEventListener("sessionend",Yl),ci.stop()};function ut(v){v.preventDefault(),_l("WebGLRenderer: Context Lost."),I=!0}function et(){_l("WebGLRenderer: Context Restored."),I=!1;let v=B.autoReset,L=De.enabled,X=De.autoUpdate,z=De.needsUpdate,H=De.type;Ie(),B.autoReset=v,De.enabled=L,De.autoUpdate=X,De.needsUpdate=z,De.type=H}function ln(v){Be("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function xn(v){let L=v.target;L.removeEventListener("dispose",xn),wu(L)}function wu(v){Eu(v),V.remove(v)}function Eu(v){let L=V.get(v).programs;L!==void 0&&(L.forEach(function(X){he.releaseProgram(X)}),v.isShaderMaterial&&he.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,X,z,H,_e){L===null&&(L=at);let Se=H.isMesh&&H.matrixWorld.determinantAffine()<0,ge=Cu(v,L,X,z,H);g.setMaterial(z,Se);let Me=X.index,Te=1;if(z.wireframe===!0){if(Me=j.getWireframeAttribute(X),Me===void 0)return;Te=2}let We=X.drawRange,Ke=X.attributes.position,we=We.start*Te,tt=(We.start+We.count)*Te;_e!==null&&(we=Math.max(we,_e.start*Te),tt=Math.min(tt,(_e.start+_e.count)*Te)),Me!==null?(we=Math.max(we,0),tt=Math.min(tt,Me.count)):Ke!=null&&(we=Math.max(we,0),tt=Math.min(tt,Ke.count));let bt=tt-we;if(bt<0||bt===1/0)return;xe.setup(H,z,ge,X,Me);let pt,ct=de;if(Me!==null&&(pt=le.get(Me),ct=ee,ct.setIndex(pt)),H.isMesh)z.wireframe===!0?(g.setLineWidth(z.wireframeLinewidth*xt()),ct.setMode(N.LINES)):ct.setMode(N.TRIANGLES);else if(H.isLine){let Nt=z.linewidth;Nt===void 0&&(Nt=1),g.setLineWidth(Nt*xt()),H.isLineSegments?ct.setMode(N.LINES):H.isLineLoop?ct.setMode(N.LINE_LOOP):ct.setMode(N.LINE_STRIP)}else H.isPoints?ct.setMode(N.POINTS):H.isSprite&&ct.setMode(N.TRIANGLES);if(H.isBatchedMesh)if(Ze.get("WEBGL_multi_draw"))ct.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Nt=H._multiDrawStarts,be=H._multiDrawCounts,Bt=H._multiDrawCount,je=Me?le.get(Me).bytesPerElement:1,nn=V.get(z).currentProgram.getUniforms();for(let yn=0;yn<Bt;yn++)nn.setValue(N,"_gl_DrawID",yn),ct.render(Nt[yn]/je,be[yn])}else if(H.isInstancedMesh)ct.renderInstances(we,bt,H.count);else if(X.isInstancedBufferGeometry){let Nt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,be=Math.min(X.instanceCount,Nt);ct.renderInstances(we,bt,be)}else ct.render(we,bt)};function Xl(v,L,X,z){F!==null&&v.isNodeMaterial&&F.setObject(z,v),W===!0&&Pe.setState(v,X,!1),v.transparent===!0&&v.side===yt&&v.forceSinglePass===!1?(v.side=Dt,v.needsUpdate=!0,ir(v,L,z),v.side=ti,v.needsUpdate=!0,ir(v,L,z),v.side=yt):ir(v,L,z)}this.compile=function(v,L,X=null){X===null&&(X=v),F!==null&&F.renderStart(v,L,X),S=ue.get(X),S.init(L),y.push(S),X.traverseVisible(function(H){H.isLight&&H.layers.test(L.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),v!==X&&v.traverseVisible(function(H){H.isLight&&H.layers.test(L.layers)&&(S.pushLight(H),H.castShadow&&S.pushShadow(H))}),S.setupLights(),F!==null&&F.updateLights(S.state.lightsArray),se=this.localClippingEnabled,W=Pe.init(this.clippingPlanes,se),W===!0&&Pe.setGlobalState(this.clippingPlanes,L),F!==null&&De.render(S.state.shadowsArray,X,L);let z=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let _e=H.material;if(_e)if(Array.isArray(_e))for(let Se=0;Se<_e.length;Se++){let ge=_e[Se];Xl(ge,X,L,H),z.add(ge)}else Xl(_e,X,L,H),z.add(_e)}),S=y.pop(),F!==null&&F.renderEnd(),z},this.compileAsync=function(v,L,X=null){let z=this.compile(v,L,X);return new Promise(H=>{function _e(){if(z.forEach(function(Se){let Me=V.get(Se).currentProgram;(Me===void 0||Me.isReady())&&z.delete(Se)}),z.size===0){H(v);return}setTimeout(_e,10)}Ze.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let xa=null;function Au(v){xa&&xa(v)}function ql(){ci.stop()}function Yl(){ci.start()}let ci=new Bh;ci.setAnimationLoop(Au),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(v){xa=v,Ae.setAnimationLoop(v),v===null?ci.stop():ci.start()},Ae.addEventListener("sessionstart",ql),Ae.addEventListener("sessionend",Yl),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){Be("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;F!==null&&F.renderStart(v,L);let X=Ae.enabled===!0&&Ae.isPresenting===!0,z=E!==null&&(ne===null||X)&&E.begin(R,ne);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Ae.enabled===!0&&Ae.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ae.cameraAutoUpdate===!0&&Ae.updateCamera(L),L=Ae.getCamera()),v.isScene===!0&&v.onBeforeRender(R,v,L,ne),S=ue.get(v,y.length),S.init(L),S.state.textureUnits=$.getTextureUnits(),y.push(S),ae.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Oe.setFromProjectionMatrix(ae,dn,L.reversedDepth),se=this.localClippingEnabled,W=Pe.init(this.clippingPlanes,se),w=pe.get(v,C.length),w.init(),C.push(w),Ae.enabled===!0&&Ae.isPresenting===!0){let Se=R.xr.getDepthSensingMesh();Se!==null&&ya(Se,L,-1/0,R.sortObjects)}ya(v,L,0,R.sortObjects),w.finish(),F!==null&&F.updateLights(S.state.lightsArray),R.sortObjects===!0&&w.sort(ce,Ce),Ye=Ae.enabled===!1||Ae.isPresenting===!1||Ae.hasDepthSensing()===!1,Ye&&He.addToRenderList(w,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),W===!0&&Pe.beginShadows();let H=S.state.shadowsArray;if(De.render(H,v,L),W===!0&&Pe.endShadows(),(z&&E.hasRenderPass())===!1){let Se=w.opaque,ge=w.transmissive;if(S.setupLights(),L.isArrayCamera){let Me=L.cameras;if(ge.length>0)for(let Te=0,We=Me.length;Te<We;Te++){let Ke=Me[Te];Kl(Se,ge,v,Ke)}Ye&&He.render(v);for(let Te=0,We=Me.length;Te<We;Te++){let Ke=Me[Te];Zl(w,v,Ke,Ke.viewport)}}else ge.length>0&&Kl(Se,ge,v,L),Ye&&He.render(v),Zl(w,v,L)}ne!==null&&Y===0&&($.updateMultisampleRenderTarget(ne),$.updateRenderTargetMipmap(ne)),z&&E.end(R),v.isScene===!0&&v.onAfterRender(R,v,L),xe.resetDefaultState(),q=-1,Z=null,y.pop(),y.length>0?(S=y[y.length-1],$.setTextureUnits(S.state.textureUnits),W===!0&&Pe.setGlobalState(R.clippingPlanes,S.state.camera)):S=null,C.pop(),C.length>0?w=C[C.length-1]:w=null,F!==null&&F.renderEnd()};function ya(v,L,X,z){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)X=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLightProbeGrid)S.pushLightProbeGrid(v);else if(v.isLight)S.pushLight(v),v.castShadow&&S.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||v.intersectsFrustum(Oe)){z&&ot.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ae);let Se=te.update(v),ge=v.material;ge.visible&&w.push(v,Se,ge,X,ot.z,null,L)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||v.intersectsFrustum(Oe))){let Se=te.update(v),ge=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ot.copy(v.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),ot.copy(Se.boundingSphere.center)),ot.applyMatrix4(v.matrixWorld).applyMatrix4(ae)),Array.isArray(ge)){let Me=Se.groups;for(let Te=0,We=Me.length;Te<We;Te++){let Ke=Me[Te],we=ge[Ke.materialIndex];we&&we.visible&&w.push(v,Se,we,X,ot.z,Ke,L)}}else ge.visible&&w.push(v,Se,ge,X,ot.z,null,L)}}let _e=v.children;for(let Se=0,ge=_e.length;Se<ge;Se++)ya(_e[Se],L,X,z)}function Zl(v,L,X,z){let{opaque:H,transmissive:_e,transparent:Se}=v;S.setupLightsView(X),W===!0&&Pe.setGlobalState(R.clippingPlanes,X),z&&g.viewport(J.copy(z)),H.length>0&&nr(H,L,X),_e.length>0&&nr(_e,L,X),Se.length>0&&nr(Se,L,X),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Kl(v,L,X,z){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[z.id]===void 0){let we=Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[z.id]=new Zt(1,1,{generateMipmaps:!0,type:we?gn:Kt,minFilter:ii,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Je.workingColorSpace})}let _e=S.state.transmissionRenderTarget[z.id],Se=z.viewport||J;_e.setSize(Se.z*R.transmissionResolutionScale,Se.w*R.transmissionResolutionScale);let ge=R.getRenderTarget(),Me=R.getActiveCubeFace(),Te=R.getActiveMipmapLevel();R.setRenderTarget(_e),R.getClearColor(ze),Ve=R.getClearAlpha(),Ve<1&&R.setClearColor(16777215,.5),R.clear(),Ye&&He.render(X);let We=R.toneMapping;R.toneMapping=pn;let Ke=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),S.setupLightsView(z),W===!0&&Pe.setGlobalState(R.clippingPlanes,z),nr(v,X,z),$.updateMultisampleRenderTarget(_e),$.updateRenderTargetMipmap(_e),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let tt=0,bt=L.length;tt<bt;tt++){let pt=L[tt],{object:ct,geometry:Nt,material:be,group:Bt}=pt;if(be.side===yt&&ct.layers.test(z.layers)){let je=be.side;be.side=Dt,be.needsUpdate=!0,Jl(ct,X,z,Nt,be,Bt),be.side=je,be.needsUpdate=!0,we=!0}}we===!0&&($.updateMultisampleRenderTarget(_e),$.updateRenderTargetMipmap(_e))}R.setRenderTarget(ge,Me,Te),R.setClearColor(ze,Ve),Ke!==void 0&&(z.viewport=Ke),R.toneMapping=We}function nr(v,L,X){let z=L.isScene===!0?L.overrideMaterial:null;for(let H=0,_e=v.length;H<_e;H++){let Se=v[H],{object:ge,geometry:Me,group:Te}=Se,We=Se.material;We.allowOverride===!0&&z!==null&&(We=z),ge.layers.test(X.layers)&&Jl(ge,L,X,Me,We,Te)}}function Jl(v,L,X,z,H,_e){F!==null&&H.isNodeMaterial&&F.setObject(v,H),v.onBeforeRender(R,L,X,z,H,_e),v.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(R,L,X,z,v,_e),H.transparent===!0&&H.side===yt&&H.forceSinglePass===!1?(H.side=Dt,H.needsUpdate=!0,R.renderBufferDirect(X,L,z,H,v,_e),H.side=ti,H.needsUpdate=!0,R.renderBufferDirect(X,L,z,H,v,_e),H.side=yt):R.renderBufferDirect(X,L,z,H,v,_e),v.onAfterRender(R,L,X,z,H,_e)}function ir(v,L,X){L.isScene!==!0&&(L=at);let z=V.get(v),H=S.state.lights,_e=S.state.shadowsArray,Se=H.state.version,ge=he.getParameters(v,H.state,_e,L,X,S.state.lightProbeGridArray),Me=he.getProgramCacheKey(ge),Te=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?L.environment:null,z.fog=L.fog;let We=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=re.get(v.envMap||z.environment,We),z.envMapRotation=z.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Te===void 0&&(v.addEventListener("dispose",xn),Te=new Map,z.programs=Te);let Ke=Te.get(Me);if(Ke!==void 0){if(z.currentProgram===Ke&&z.lightsStateVersion===Se)return jl(v,ge),Ke}else ge.uniforms=he.getUniforms(v),F!==null&&v.isNodeMaterial&&F.build(v,X,ge),v.onBeforeCompile(ge,R),Ke=he.acquireProgram(ge,Me),Te.set(Me,Ke),z.uniforms=ge.uniforms;let we=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(we.clippingPlanes=Pe.uniform),jl(v,ge),z.needsLights=Pu(v),z.lightsStateVersion=Se,z.needsLights&&(we.ambientLightColor.value=H.state.ambient,we.lightProbe.value=H.state.probe,we.sunLights.value=H.state.sun,we.sunLightShadows.value=H.state.sunShadow,we.directionalLights.value=H.state.directional,we.directionalLightShadows.value=H.state.directionalShadow,we.spotLights.value=H.state.spot,we.spotLightShadows.value=H.state.spotShadow,we.rectAreaLights.value=H.state.rectArea,we.ltc_1.value=H.state.rectAreaLTC1,we.ltc_2.value=H.state.rectAreaLTC2,we.pointLights.value=H.state.point,we.pointLightShadows.value=H.state.pointShadow,we.hemisphereLights.value=H.state.hemi,we.sunShadowMatrix.value=H.state.sunShadowMatrix,we.sunShadowCascade.value=H.state.sunShadowCascade,we.directionalShadowMatrix.value=H.state.directionalShadowMatrix,we.spotLightMatrix.value=H.state.spotLightMatrix,we.spotLightMap.value=H.state.spotLightMap,we.pointShadowMatrix.value=H.state.pointShadowMatrix),z.lightProbeGrid=S.state.lightProbeGridArray.length>0,z.currentProgram=Ke,z.uniformsList=null,Ke}function $l(v){if(v.uniformsList===null){let L=v.currentProgram.getUniforms();v.uniformsList=ss.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function jl(v,L){let X=V.get(v);X.outputColorSpace=L.outputColorSpace,X.batching=L.batching,X.batchingColor=L.batchingColor,X.instancing=L.instancing,X.instancingColor=L.instancingColor,X.instancingMorph=L.instancingMorph,X.skinning=L.skinning,X.morphTargets=L.morphTargets,X.morphNormals=L.morphNormals,X.morphColors=L.morphColors,X.morphTargetsCount=L.morphTargetsCount,X.numClippingPlanes=L.numClippingPlanes,X.numIntersection=L.numClipIntersection,X.vertexAlphas=L.vertexAlphas,X.vertexTangents=L.vertexTangents,X.toneMapping=L.toneMapping}function Tu(v,L){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;x.setFromMatrixPosition(L.matrixWorld);for(let X=0,z=v.length;X<z;X++){let H=v[X];if(H.texture!==null&&H.boundingBox.containsPoint(x))return H}return null}function Cu(v,L,X,z,H){L.isScene!==!0&&(L=at),$.resetTextureUnits();let _e=L.fog,Se=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?L.environment:null,ge=ne===null?R.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Je.workingColorSpace,Me=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Te=re.get(z.envMap||Se,Me),We=z.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ke=!!X.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),we=!!X.morphAttributes.position,tt=!!X.morphAttributes.normal,bt=!!X.morphAttributes.color,pt=pn;z.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(pt=R.toneMapping);let ct=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Nt=ct!==void 0?ct.length:0,be=V.get(z),Bt=S.state.lights;if(W===!0&&(se===!0||v!==Z)){let dt=v===Z&&z.id===q;Pe.setState(z,v,dt)}let je=!1;z.version===be.__version?(be.needsLights&&be.lightsStateVersion!==Bt.state.version||be.outputColorSpace!==ge||H.isBatchedMesh&&be.batching===!1||!H.isBatchedMesh&&be.batching===!0||H.isBatchedMesh&&be.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&be.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&be.instancing===!1||!H.isInstancedMesh&&be.instancing===!0||H.isSkinnedMesh&&be.skinning===!1||!H.isSkinnedMesh&&be.skinning===!0||H.isInstancedMesh&&be.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&be.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&be.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&be.instancingMorph===!1&&H.morphTexture!==null||be.envMap!==Te||z.fog===!0&&be.fog!==_e||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Pe.numPlanes||be.numIntersection!==Pe.numIntersection)||be.vertexAlphas!==We||be.vertexTangents!==Ke||be.morphTargets!==we||be.morphNormals!==tt||be.morphColors!==bt||be.toneMapping!==pt||be.morphTargetsCount!==Nt||!!be.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(je=!0):(je=!0,be.__version=z.version);let nn=be.currentProgram;je===!0&&(nn=ir(z,L,H),F&&z.isNodeMaterial&&F.onUpdateProgram(z,nn,be));let yn=!1,Bn=!1,Si=!1,lt=nn.getUniforms(),vt=be.uniforms;if(g.useProgram(nn.program)&&(yn=!0,Bn=!0,Si=!0),z.id!==q&&(q=z.id,Bn=!0),be.needsLights){let dt=Tu(S.state.lightProbeGridArray,H);be.lightProbeGrid!==dt&&(be.lightProbeGrid=dt,Bn=!0)}if(yn||Z!==v){g.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),lt.setValue(N,"projectionMatrix",v.projectionMatrix),lt.setValue(N,"viewMatrix",v.matrixWorldInverse);let zn=lt.map.cameraPosition;zn!==void 0&&zn.setValue(N,Ge.setFromMatrixPosition(v.matrixWorld)),T.logarithmicDepthBuffer&&lt.setValue(N,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&lt.setValue(N,"isOrthographic",v.isOrthographicCamera===!0),Z!==v&&(Z=v,Bn=!0,Si=!0)}if(be.needsLights&&(Bt.state.sunShadowMap.length>0&&lt.setValue(N,"sunShadowMap",Bt.state.sunShadowMap,$),Bt.state.directionalShadowMap.length>0&&lt.setValue(N,"directionalShadowMap",Bt.state.directionalShadowMap,$),Bt.state.spotShadowMap.length>0&&lt.setValue(N,"spotShadowMap",Bt.state.spotShadowMap,$),Bt.state.pointShadowMap.length>0&&lt.setValue(N,"pointShadowMap",Bt.state.pointShadowMap,$)),H.isSkinnedMesh){lt.setOptional(N,H,"bindMatrix"),lt.setOptional(N,H,"bindMatrixInverse");let dt=H.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),lt.setValue(N,"boneTexture",dt.boneTexture,$))}H.isBatchedMesh&&(lt.setOptional(N,H,"batchingTexture"),lt.setValue(N,"batchingTexture",H._matricesTexture,$),lt.setOptional(N,H,"batchingIdTexture"),lt.setValue(N,"batchingIdTexture",H._indirectTexture,$),lt.setOptional(N,H,"batchingColorTexture"),H._colorsTexture!==null&&lt.setValue(N,"batchingColorTexture",H._colorsTexture,$));let kn=X.morphAttributes;if((kn.position!==void 0||kn.normal!==void 0||kn.color!==void 0)&&D.update(H,X,nn),(Bn||be.receiveShadow!==H.receiveShadow)&&(be.receiveShadow=H.receiveShadow,lt.setValue(N,"receiveShadow",H.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&L.environment!==null&&(vt.envMapIntensity.value=L.environmentIntensity),vt.dfgLUT!==void 0&&(vt.dfgLUT.value=vg()),Bn){if(lt.setValue(N,"toneMappingExposure",R.toneMappingExposure),be.needsLights&&Ru(vt,Si),_e&&z.fog===!0&&Re.refreshFogUniforms(vt,_e),Re.refreshMaterialUniforms(vt,z,Q,G,S.state.transmissionRenderTarget[v.id]),be.needsLights&&be.lightProbeGrid){let dt=be.lightProbeGrid;vt.probesSH.value=dt.texture,vt.probesMin.value.copy(dt.boundingBox.min),vt.probesMax.value.copy(dt.boundingBox.max),vt.probesResolution.value.copy(dt.resolution)}ss.upload(N,$l(be),vt,$)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ss.upload(N,$l(be),vt,$),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&lt.setValue(N,"center",H.center),lt.setValue(N,"modelViewMatrix",H.modelViewMatrix),lt.setValue(N,"normalMatrix",H.normalMatrix),lt.setValue(N,"modelMatrix",H.matrixWorld),z.uniformsGroups!==void 0){let dt=z.uniformsGroups;for(let zn=0,Mi=dt.length;zn<Mi;zn++){let ec=dt[zn];ie.update(ec,nn),ie.bind(ec,nn)}}return nn}function Ru(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.sunLights.needsUpdate=L,v.sunLightShadows.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function Pu(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(v,L,X){let z=V.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(v.texture).__webglTexture=L,V.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:X,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,L){let X=V.get(v);X.__webglFramebuffer=L,X.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(v,L=0,X=0){ne=v,K=L,Y=X;let z=null,H=!1,_e=!1;if(v){let ge=V.get(v);if(ge.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(N.FRAMEBUFFER,ge.__webglFramebuffer),J.copy(v.viewport),ye.copy(v.scissor),ve=v.scissorTest,g.viewport(J),g.scissor(ye),g.setScissorTest(ve),q=-1;return}else if(ge.__webglFramebuffer===void 0)$.setupRenderTarget(v);else if(ge.__hasExternalTextures)$.rebindTextures(v,V.get(v.texture).__webglTexture,V.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let We=v.depthTexture;if(ge.__boundDepthTexture!==We){if(We!==null&&V.has(We)&&(v.width!==We.image.width||v.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(v)}}let Me=v.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(_e=!0);let Te=V.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Te[L])?z=Te[L][X]:z=Te[L],H=!0):v.samples>0&&$.useMultisampledRTT(v)===!1?z=V.get(v).__webglMultisampledFramebuffer:Array.isArray(Te)?z=Te[X]:z=Te,J.copy(v.viewport),ye.copy(v.scissor),ve=v.scissorTest}else J.copy(oe).multiplyScalar(Q).floor(),ye.copy(Ne).multiplyScalar(Q).floor(),ve=rt;if(X!==0&&(z=O),g.bindFramebuffer(N.FRAMEBUFFER,z)&&g.drawBuffers(v,z),g.viewport(J),g.scissor(ye),g.setScissorTest(ve),H){let ge=V.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+L,ge.__webglTexture,X)}else if(_e){let ge=L;for(let Me=0;Me<v.textures.length;Me++){let Te=V.get(v.textures[Me]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Me,Te.__webglTexture,X,ge)}}else if(v!==null&&X!==0){let ge=V.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ge.__webglTexture,X)}q=-1};function Ql(v){let L=V.get(v);return(L.__readFormat!==v.format||L.__readType!==v.type)&&(L.__readFormat=v.format,L.__readType=v.type,L.__formatReadable=T.textureFormatReadable(v.format),L.__typeReadable=T.textureTypeReadable(v.type)),L}this.readRenderTargetPixels=function(v,L,X,z,H,_e,Se,ge=0){if(!(v&&v.isWebGLRenderTarget)){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(Me=Me[Se]),Me){g.bindFramebuffer(N.FRAMEBUFFER,Me);try{let Te=v.textures[ge],We=Te.format,Ke=Te.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge);let we=Ql(Te);if(we.__formatReadable===!1){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(we.__typeReadable===!1){Be("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-z&&X>=0&&X<=v.height-H&&N.readPixels(L,X,z,H,fe.convert(We),fe.convert(Ke),_e)}finally{let Te=ne!==null?V.get(ne).__webglFramebuffer:null;g.bindFramebuffer(N.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(v,L,X,z,H,_e,Se,ge=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&Se!==void 0&&(Me=Me[Se]),Me)if(L>=0&&L<=v.width-z&&X>=0&&X<=v.height-H){g.bindFramebuffer(N.FRAMEBUFFER,Me);let Te=v.textures[ge],We=Te.format,Ke=Te.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+ge);let we=Ql(Te);if(we.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(we.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,tt),N.bufferData(N.PIXEL_PACK_BUFFER,_e.byteLength,N.STREAM_READ),N.readPixels(L,X,z,H,fe.convert(We),fe.convert(Ke),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let bt=ne!==null?V.get(ne).__webglFramebuffer:null;g.bindFramebuffer(N.FRAMEBUFFER,bt);let pt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await uh(N,pt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,tt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,_e),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(tt),N.deleteSync(pt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,L=null,X=0){let z=Math.pow(2,-X),H=Math.floor(v.image.width*z),_e=Math.floor(v.image.height*z),Se=L!==null?L.x:0,ge=L!==null?L.y:0;$.setTexture2D(v,0),N.copyTexSubImage2D(N.TEXTURE_2D,X,0,0,Se,ge,H,_e),g.unbindTexture()},this.copyTextureToTexture=function(v,L,X=null,z=null,H=0,_e=0){let Se,ge,Me,Te,We,Ke,we,tt,bt,pt=v.isCompressedTexture?v.mipmaps[_e]:v.image;if(X!==null)Se=X.max.x-X.min.x,ge=X.max.y-X.min.y,Me=X.isBox3?X.max.z-X.min.z:1,Te=X.min.x,We=X.min.y,Ke=X.isBox3?X.min.z:0;else{let vt=Math.pow(2,-H);Se=Math.floor(pt.width*vt),ge=Math.floor(pt.height*vt),v.isDataArrayTexture?Me=pt.depth:v.isData3DTexture?Me=Math.floor(pt.depth*vt):Me=1,Te=0,We=0,Ke=0}z!==null?(we=z.x,tt=z.y,bt=z.z):(we=0,tt=0,bt=0);let ct=fe.convert(L.format),Nt=fe.convert(L.type),be;L.isData3DTexture?($.setTexture3D(L,0),be=N.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?($.setTexture2DArray(L,0),be=N.TEXTURE_2D_ARRAY):($.setTexture2D(L,0),be=N.TEXTURE_2D),g.activeTexture(N.TEXTURE0),g.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,L.flipY),g.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),g.pixelStorei(N.UNPACK_ALIGNMENT,L.unpackAlignment);let Bt=g.getParameter(N.UNPACK_ROW_LENGTH),je=g.getParameter(N.UNPACK_IMAGE_HEIGHT),nn=g.getParameter(N.UNPACK_SKIP_PIXELS),yn=g.getParameter(N.UNPACK_SKIP_ROWS),Bn=g.getParameter(N.UNPACK_SKIP_IMAGES);g.pixelStorei(N.UNPACK_ROW_LENGTH,pt.width),g.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pt.height),g.pixelStorei(N.UNPACK_SKIP_PIXELS,Te),g.pixelStorei(N.UNPACK_SKIP_ROWS,We),g.pixelStorei(N.UNPACK_SKIP_IMAGES,Ke);let Si=v.isDataArrayTexture||v.isData3DTexture,lt=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){let vt=V.get(v),kn=V.get(L),dt=V.get(vt.__renderTarget),zn=V.get(kn.__renderTarget);g.bindFramebuffer(N.READ_FRAMEBUFFER,dt.__webglFramebuffer),g.bindFramebuffer(N.DRAW_FRAMEBUFFER,zn.__webglFramebuffer);for(let Mi=0;Mi<Me;Mi++)Si&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(v).__webglTexture,H,Ke+Mi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,V.get(L).__webglTexture,_e,bt+Mi)),N.blitFramebuffer(Te,We,Se,ge,we,tt,Se,ge,N.DEPTH_BUFFER_BIT,N.NEAREST);g.bindFramebuffer(N.READ_FRAMEBUFFER,null),g.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||V.has(v)){let vt=V.get(v),kn=V.get(L);g.bindFramebuffer(N.READ_FRAMEBUFFER,P),g.bindFramebuffer(N.DRAW_FRAMEBUFFER,k);for(let dt=0;dt<Me;dt++)Si?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,vt.__webglTexture,H,Ke+dt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vt.__webglTexture,H),lt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,kn.__webglTexture,_e,bt+dt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,kn.__webglTexture,_e),H!==0?N.blitFramebuffer(Te,We,Se,ge,we,tt,Se,ge,N.COLOR_BUFFER_BIT,N.NEAREST):lt?N.copyTexSubImage3D(be,_e,we,tt,bt+dt,Te,We,Se,ge):N.copyTexSubImage2D(be,_e,we,tt,Te,We,Se,ge);g.bindFramebuffer(N.READ_FRAMEBUFFER,null),g.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else lt?v.isDataTexture||v.isData3DTexture?N.texSubImage3D(be,_e,we,tt,bt,Se,ge,Me,ct,Nt,pt.data):L.isCompressedArrayTexture?N.compressedTexSubImage3D(be,_e,we,tt,bt,Se,ge,Me,ct,pt.data):N.texSubImage3D(be,_e,we,tt,bt,Se,ge,Me,ct,Nt,pt):v.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,_e,we,tt,Se,ge,ct,Nt,pt.data):v.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,_e,we,tt,pt.width,pt.height,ct,pt.data):N.texSubImage2D(N.TEXTURE_2D,_e,we,tt,Se,ge,ct,Nt,pt);g.pixelStorei(N.UNPACK_ROW_LENGTH,Bt),g.pixelStorei(N.UNPACK_IMAGE_HEIGHT,je),g.pixelStorei(N.UNPACK_SKIP_PIXELS,nn),g.pixelStorei(N.UNPACK_SKIP_ROWS,yn),g.pixelStorei(N.UNPACK_SKIP_IMAGES,Bn),_e===0&&L.generateMipmaps&&N.generateMipmap(be),g.unbindTexture()},this.initRenderTarget=function(v){V.get(v).__webglFramebuffer===void 0&&$.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?$.setTextureCube(v,0):v.isData3DTexture?$.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?$.setTexture2DArray(v,0):$.setTexture2D(v,0),g.unbindTexture()},this.resetState=function(){K=0,Y=0,ne=null,g.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Je._getDrawingBufferColorSpace(e),t.unpackColorSpace=Je._getUnpackColorSpace()}};var Xh={type:"change"},kl={type:"start"},Yh={type:"end"},oa=new gi,qh=new Ht,bg=Math.cos(70*An.DEG2RAD),Tt=new U,Jt=2*Math.PI,st={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Bl=1e-6,aa=class extends ks{constructor(e,t=null){super(e,t),this.state=st.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qn.ROTATE,MIDDLE:Qn.DOLLY,RIGHT:Qn.PAN},this.touches={ONE:ei.ROTATE,TWO:ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new Lt,this._lastTargetPosition=new U,this._quat=new Lt().setFromUnitVectors(e.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ji,this._sphericalDelta=new Ji,this._scale=1,this._panOffset=new U,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new U,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Mg.bind(this),this._onPointerDown=Sg.bind(this),this._onPointerUp=wg.bind(this),this._onContextMenu=Ig.bind(this),this._onMouseWheel=Tg.bind(this),this._onKeyDown=Cg.bind(this),this._onTouchStart=Rg.bind(this),this._onTouchMove=Pg.bind(this),this._onMouseDown=Eg.bind(this),this._onMouseMove=Ag.bind(this),this._interceptControlDown=Lg.bind(this),this._interceptControlUp=Dg.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=st.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xh),this.update(),this.state=st.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Tt.copy(t).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===st.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Jt:n>Math.PI&&(n-=Jt),s<-Math.PI?s+=Jt:s>Math.PI&&(s-=Jt),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let l=Tt.length();o=this._clampDistance(l*this._scale);let a=l-o;this.object.position.addScaledVector(this._dollyDirection,a),this.object.updateMatrixWorld(),r=!!a}else if(this.object.isOrthographicCamera){let l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object);let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=a!==this.object.zoom;let c=new U(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(l),this.object.updateMatrixWorld(),o=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(oa.origin.copy(this.object.position),oa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oa.direction))<bg?this.object.lookAt(this.target):(qh.setFromNormalAndCoplanarPoint(this.object.up,this.target),oa.intersectPlane(qh,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Bl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Bl||this._lastTargetPosition.distanceToSquared(this.target)>Bl?(this.dispatchEvent(Xh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Jt/60*this.autoRotateSpeed*e:Jt/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Tt.setFromMatrixColumn(t,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,t){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(t,1):(Tt.setFromMatrixColumn(t,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Tt.copy(s).sub(this.target);let r=Tt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,l=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Jt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Jt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Jt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,l=(e.pageY+t.y)*.5;this._updateZoomParameters(o,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Sg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Mg(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function wg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Yh),this.state=st.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Eg(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Qn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=st.DOLLY;break;case Qn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=st.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=st.ROTATE}break;case Qn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=st.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=st.PAN}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(kl)}function Ag(i){switch(this.state){case st.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case st.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case st.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Tg(i){this.enabled===!1||this.enableZoom===!1||this.state!==st.NONE||(i.preventDefault(),this.dispatchEvent(kl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Yh))}function Cg(i){this.enabled!==!1&&this._handleKeyDown(i)}function Rg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case ei.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=st.TOUCH_ROTATE;break;case ei.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=st.TOUCH_PAN;break;default:this.state=st.NONE}break;case 2:switch(this.touches.TWO){case ei.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=st.TOUCH_DOLLY_PAN;break;case ei.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=st.TOUCH_DOLLY_ROTATE;break;default:this.state=st.NONE}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(kl)}function Pg(i){switch(this._trackPointer(i),this.state){case st.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case st.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case st.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case st.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=st.NONE}}function Ig(i){this.enabled!==!1&&i.preventDefault()}function Lg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Dg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var la=class extends mi{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new Zn;e.deleteAttribute("uv");let t=new it({side:Dt}),n=new it,s=new Bs(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ft(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Ts(e,n,6),l=new wt;l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),l.updateMatrix(),o.setMatrixAt(0,l.matrix),l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),l.updateMatrix(),o.setMatrixAt(1,l.matrix),l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),l.updateMatrix(),o.setMatrixAt(2,l.matrix),l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),l.updateMatrix(),o.setMatrixAt(3,l.matrix),l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),l.updateMatrix(),o.setMatrixAt(4,l.matrix),l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),l.updateMatrix(),o.setMatrixAt(5,l.matrix),this.add(o);let a=new ft(e,as(50));a.position.set(-16.116,14.37,8.208),a.scale.set(.1,2.428,2.739),this.add(a);let c=new ft(e,as(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let u=new ft(e,as(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);let f=new ft(e,as(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let h=new ft(e,as(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);let p=new ft(e,as(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function as(i){return new Ds({color:0,emissive:16777215,emissiveIntensity:i})}var ca={housing:13224903,head:14211017,base:12427636,connector:15724779,red:12265504,black:1513755,silver:13225166};function Zh(i,e,t,n){let s={side:yt,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1},r=new it({...s,color:16777215,metalness:.06,roughness:.48});r.onBeforeCompile=d=>{d.uniforms.baseZ={value:t};for(let M of["housing","head","base","connector"])d.uniforms["photo_"+M]={value:new Fe(ca[M])};d.vertexShader=`varying vec3 photoPosition;
`+d.vertexShader,d.vertexShader=d.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
photoPosition = position;`),d.fragmentShader=`varying vec3 photoPosition;
uniform float baseZ;
uniform vec3 photo_housing, photo_head, photo_base, photo_connector;
`+d.fragmentShader,d.fragmentShader=d.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
   float heightFromBody = photoPosition.z - baseZ;
   vec3 photoColor = photo_housing;
   if(heightFromBody > 0.0) photoColor = photo_head;
   if(heightFromBody > 11.9) photoColor = photo_base;
   ${n?"":"if(heightFromBody > 14.94) photoColor = photo_connector;"}
   diffuseColor.rgb *= photoColor;
  `)},r.customProgramCacheKey=()=>n?"photo-plate-v1":"photo-thread-v1";let o=new it({...s,color:ca.red,metalness:0,roughness:.48}),l=new it({...s,color:ca.black,metalness:0,roughness:.48}),a=new it({...s,color:ca.silver,metalness:.65,roughness:.28}),c=[r,o,l,a],u=i.attributes.position.array,f=i.index.array,h=i.brep_faces.map(d=>{let M=[1/0,1/0,1/0],A=[-1/0,-1/0,-1/0];for(let x=d.first*3;x<(d.last+1)*3;x++){let w=f[x]*3;for(let S=0;S<3;S++)M[S]=Math.min(M[S],u[w+S]),A[S]=Math.max(A[S],u[w+S])}return{face:d,min:M,max:A,center:M.map((x,w)=>(x+A[w])/2)}}),p=i.appearanceRole==="wires"?h:h.filter(d=>d.min[2]-t<-50&&d.max[2]-t<-40),_=0,b=0;if(p.length){let d=[0,1].map(M=>[Math.min(...p.map(A=>A.center[M])),Math.max(...p.map(A=>A.center[M]))]);_=d[0][1]-d[0][0]>d[1][1]-d[1][0]?0:1,b=(d[_][0]+d[_][1])/2}e.clearGroups();let m=null;for(let d of h){let M=0,A=d.min[2]-t,x=d.max[2]-t;i.appearanceRole==="fastener"?M=3:i.appearanceRole==="wires"||A<-50&&x<-40?M=d.center[_]<b?1:2:((A>=6.89&&x<=8.91||A>=9.39&&x<=10.91||!n&&A>=5.88&&x<=7.94)&&d.max[0]-d.min[0]<5&&d.max[1]-d.min[1]<5||!i.name&&A>14.85)&&(M=3);let w=d.face.first*3,S=(d.face.last-d.face.first+1)*3;m&&m.materialIndex===M&&m.start+m.count===w?m.count+=S:(e.addGroup(w,S,M),m=e.groups.at(-1))}return c}function Kh(i,e){let t={side:yt,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1},n=[new it({...t,color:9869724,metalness:.85,roughness:.3,envMapIntensity:.8}),new it({...t,color:1052946,metalness:.05,roughness:.7,envMapIntensity:.3}),new it({...t,color:14473419,metalness:0,roughness:.42}),new it({...t,color:1381911,metalness:0,roughness:.58,envMapIntensity:.4})],s=n[0].clone();s.onBeforeCompile=a=>{a.uniforms.rplHeadColor={value:n[2].color},a.vertexShader=`varying float vRplHeadAxis;
`+a.vertexShader,a.vertexShader=a.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vRplHeadAxis=dot(position.yz,vec2(0.9596,0.2814));`),a.fragmentShader=`varying float vRplHeadAxis;
uniform vec3 rplHeadColor;
`+a.fragmentShader,a.fragmentShader=a.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
float headMask=step(50.2,vRplHeadAxis);
diffuseColor.rgb=mix(diffuseColor.rgb,rplHeadColor,headMask);`),a.fragmentShader=a.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor=mix(roughnessFactor,0.42,headMask);`),a.fragmentShader=a.fragmentShader.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
metalnessFactor=mix(metalnessFactor,0.0,headMask);`)},s.customProgramCacheKey=()=>"rpl-p15-head-flange-v1",n.push(s);let r=i.attributes.position.array,o=i.index.array,l=i.brep_faces||[{first:0,last:o.length/3-1}];e.clearGroups();for(let[a,c]of l.entries()){if(c.last<c.first)continue;let u=i.appearanceRole==="motor"?1:i.appearanceRole==="head"?2:i.appearanceRole==="black"?3:0;if(i.appearanceRole==="assembly"){let _=[1/0,1/0,1/0],b=[-1/0,-1/0,-1/0];for(let x=c.first*3;x<(c.last+1)*3;x++){let w=o[x]*3;for(let S=0;S<3;S++)_[S]=Math.min(_[S],r[w+S]),b[S]=Math.max(b[S],r[w+S])}let[m,d,M]=_.map((x,w)=>(x+b[w])/2),A=M-(.294*d-7);d>58&&Math.abs(m)<18&&Math.abs(A)<17&&(u=2),l.length===1585&&((a===0||a>=7&&a<=44||a>=50&&a<=88)&&(u=0),[0,7,8,50,51,52].includes(a)&&(u=2),(a>=1&&a<=6||a>=45&&a<=49)&&(u=2),(a>=247&&a<=256||[258,259,261,262,265].includes(a))&&(u=2),(a===260||a===264)&&(u=4),(a>=89&&a<=93||a>=1360&&a<=1362)&&(u=2),(a>=94&&a<=246||a>=1363&&a<=1515)&&(u=3))}let f=c.first*3,h=(c.last-c.first+1)*3,p=e.groups.at(-1);p&&p.materialIndex===u&&p.start+p.count===f?p.count+=h:e.addGroup(f,h,u)}return n}var Ng={"dpl30-db":[{faceCount:1616,groups:{motorBlack:[[605,610],[612,624],[627,643],[647,647],[650,677],[680,681],[683,687],[690,694],[702,725],[729,730],[732,736],[740,744],[746,747],[752,890]],metal:[[89,90],[92,104],[111,111],[113,126],[140,153],[503,505],[517,523],[530,536],[549,551],[563,569],[574,580],[586,604],[611,611],[625,626],[644,646],[648,649],[891,937],[981,999],[1001,1019],[1034,1052],[1054,1072],[1126,1128],[1133,1137],[1140,1140],[1149,1149],[1152,1152],[1164,1164],[1169,1186],[1189,1196],[1208,1211],[1217,1217],[1284,1286],[1291,1295],[1298,1299],[1373,1373],[1399,1399],[1408,1414],[1419,1422],[1436,1440],[1442,1446],[1448,1456],[1459,1460],[1467,1472],[1479,1481],[1489,1492],[1494,1494],[1496,1500],[1502,1510],[1513,1517],[1519,1527],[1530,1534],[1536,1544]],brass:[[678,679],[682,682],[688,689],[695,701],[726,728],[731,731],[737,739],[745,745],[748,751]],connectorBlack:[[0,14],[16,34],[44,46],[160,160],[1447,1447],[1501,1501],[1518,1518],[1535,1535]]}}],"dpl30-bb":[{faceCount:1398,groups:{motorBlack:[[579,579],[581,602],[605,695]],metal:[[312,313],[315,327],[334,334],[340,353],[363,376],[534,552],[554,572],[696,716],[727,729],[741,747],[754,758],[771,773],[785,791],[796,800],[810,828],[834,852],[916,917],[921,922],[925,929],[938,938],[940,940],[944,944],[957,957],[968,1006],[1009,1009],[1058,1059],[1063,1064],[1066,1070],[1072,1072],[1077,1077],[1082,1082],[1116,1124],[1188,1188],[1199,1199],[1206,1208],[1216,1219],[1224,1229],[1233,1238],[1240,1247],[1250,1250],[1258,1260],[1267,1269],[1277,1279],[1281,1292],[1294,1299],[1302,1309],[1311,1316],[1319,1326],[1328,1333]],connectorBlack:[[267,269],[383,383],[472,505],[1239,1239],[1293,1293],[1310,1310],[1327,1327]]}},{faceCount:158,groups:{connectorBlack:[[0,157]]}}],"dpl60-db":[{faceCount:1573,groups:{motorBlack:[[81,86],[88,100],[103,119],[123,123],[126,153],[156,157],[159,163],[166,170],[178,201],[205,206],[208,212],[216,220],[222,223],[228,366]],metal:[[22,22],[24,26],[31,31],[42,47],[62,80],[87,87],[101,102],[120,122],[124,125],[367,413],[420,420],[422,424],[429,429],[437,442],[505,523],[543,544],[563,580],[680,698],[708,726],[774,774],[776,789],[796,796],[802,815],[825,825],[827,839],[1159,1162],[1165,1165],[1169,1169],[1171,1171],[1262,1264],[1266,1266],[1268,1270],[1272,1272],[1275,1275],[1278,1278],[1300,1301],[1303,1303],[1306,1306],[1310,1310],[1314,1315],[1318,1318],[1322,1322],[1326,1326],[1330,1330],[1334,1334],[1337,1338],[1340,1353],[1384,1384],[1386,1388],[1393,1393],[1396,1400],[1429,1429],[1432,1434],[1439,1439],[1446,1450],[1452,1452],[1454,1455],[1458,1461],[1464,1464],[1474,1477],[1502,1503],[1507,1519],[1523,1535],[1539,1551],[1555,1565]],brass:[[154,155],[158,158],[164,165],[171,177],[202,204],[207,207],[213,215],[221,221],[224,227]]}}],"dpl60-bb":[{faceCount:1367,groups:{motorBlack:[[265,265],[267,288],[290,308],[310,385]],metal:[[29,30],[32,49],[94,112],[114,132],[240,258],[386,406],[455,456],[459,463],[473,474],[476,477],[493,494],[497,501],[508,509],[511,512],[724,724],[726,739],[746,746],[752,765],[775,775],[777,789],[921,921],[923,923],[926,926],[984,984],[986,986],[988,993],[995,996],[1035,1035],[1038,1038],[1051,1051],[1055,1055],[1065,1102],[1104,1105],[1107,1107],[1109,1112],[1114,1115],[1121,1121],[1165,1174],[1240,1240],[1247,1249],[1252,1252],[1254,1259],[1274,1275],[1277,1281],[1283,1286],[1303,1304],[1308,1320],[1324,1336],[1340,1352],[1356,1366]]}},{faceCount:158,groups:{connectorBlack:[[0,157]]}}],"dpl30h-ds":[{faceCount:7,groups:{metal:[[0,6]]}},{faceCount:1288,groups:{metal:[[294,295],[297,316],[366,367],[388,393],[396,445],[483,484],[711,711],[713,726],[735,736],[738,750],[908,909],[911,916],[931,944],[1015,1015],[1017,1017],[1019,1020],[1022,1022],[1024,1026],[1070,1070],[1074,1076],[1081,1082],[1084,1085],[1087,1091],[1093,1094],[1096,1096],[1100,1102],[1106,1107],[1109,1110],[1112,1116],[1118,1124],[1126,1130],[1132,1137]],connectorBlack:[[0,45],[47,47],[49,49],[52,52],[54,54],[56,58],[175,175],[179,179],[182,183],[185,281],[283,288],[346,346],[917,930],[974,1014]]}},{faceCount:123,groups:{}},{faceCount:369,groups:{motorBlack:[[0,13],[15,32],[34,48],[143,170],[174,178],[180,183],[185,189],[197,218],[220,224],[229,237],[245,368]],metal:[[14,14],[33,33],[49,142]],brass:[[171,173],[179,179],[184,184],[190,196],[219,219],[225,228],[238,244]]}},{faceCount:5,groups:{metal:[[0,4]]}},{faceCount:64,groups:{metal:[[0,63]]}},{faceCount:64,groups:{metal:[[0,63]]}},{faceCount:64,groups:{metal:[[0,63]]}},{faceCount:64,groups:{metal:[[0,63]]}}],"dpl30h-bs":[{faceCount:1423,groups:{motorBlack:[[517,569],[574,574],[576,654]],metal:[[121,122],[124,129],[230,243],[304,305],[307,312],[413,426],[493,494],[570,573],[575,575],[657,706],[815,816],[1093,1093],[1095,1108],[1117,1118],[1120,1132],[1191,1191],[1193,1193],[1195,1196],[1198,1198],[1200,1203],[1208,1209],[1213,1215],[1217,1218],[1220,1221],[1223,1225],[1227,1228],[1230,1230],[1235,1236],[1240,1242],[1244,1245],[1247,1251],[1253,1259],[1261,1265],[1267,1272]],connectorBlack:[[99,100],[102,102],[107,107],[111,113],[116,116],[130,229],[282,283],[285,285],[290,290],[294,296],[299,299],[313,412]]}},{faceCount:9,groups:{metal:[[0,8]]}},{faceCount:26,groups:{connectorBlack:[[0,25]]}},{faceCount:123,groups:{}},{faceCount:7,groups:{metal:[[0,6]]}},{faceCount:7,groups:{metal:[[0,6]]}},{faceCount:64,groups:{metal:[[0,63]]}},{faceCount:64,groups:{metal:[[0,63]]}},{faceCount:64,groups:{metal:[[0,63]]}},{faceCount:64,groups:{metal:[[0,63]]}},{faceCount:26,groups:{metal:[[0,25]]}}],"dpgl800-bs":[{faceCount:808,groups:{}},{faceCount:172,groups:{}},{faceCount:26,groups:{metal:[[0,25]]}},{faceCount:26,groups:{metal:[[0,25]]}},{faceCount:6,groups:{metal:[[0,5]]}},{faceCount:2,groups:{metal:[[0,1]]}},{faceCount:2,groups:{metal:[[0,1]]}},{faceCount:2,groups:{metal:[[0,1]]}},{faceCount:2,groups:{metal:[[0,1]]}},{faceCount:2,groups:{metal:[[0,1]]}},{faceCount:2,groups:{metal:[[0,1]]}},{faceCount:2,groups:{metal:[[0,1]]}},{faceCount:6,groups:{metal:[[0,5]]}},{faceCount:23,groups:{metal:[[0,22]]}},{faceCount:23,groups:{metal:[[0,22]]}},{faceCount:23,groups:{metal:[[0,22]]}},{faceCount:23,groups:{metal:[[0,22]]}},{faceCount:34,groups:{metal:[[0,33]]}},{faceCount:34,groups:{metal:[[0,33]]}},{faceCount:34,groups:{metal:[[0,33]]}},{faceCount:34,groups:{metal:[[0,33]]}},{faceCount:84,groups:{}},{faceCount:462,groups:{}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:84,groups:{}},{faceCount:462,groups:{}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:103,groups:{metal:[[0,102]]}},{faceCount:298,groups:{motorBlack:[[19,94],[97,97],[99,99],[101,103],[106,108],[141,151],[158,160],[162,166],[168,172],[174,178],[180,181],[239,248],[250,250],[255,264],[267,279]],metal:[[0,18],[95,96],[98,98],[100,100],[104,105],[109,140],[152,157],[161,161],[167,167],[173,173],[179,179],[182,238],[249,249],[251,254],[265,266],[280,297]]}},{faceCount:7,groups:{motorBlack:[[0,6]]}},{faceCount:7,groups:{motorBlack:[[0,6]]}},{faceCount:7,groups:{motorBlack:[[0,6]]}},{faceCount:7,groups:{motorBlack:[[0,6]]}}]},zl=new Map;function Jh(i,e,t){let n=String(i).toLowerCase(),s=Ng[n]?.[e];if(!s||s.faceCount!==t)throw new Error("Unreviewed diaphragm appearance topology: "+n+"/"+e);let r=n+"/"+e;if(zl.has(r))return zl.get(r);let o=Array(t).fill("plastic");for(let[l,a]of Object.entries(s.groups))for(let[c,u]of a)for(let f=c;f<=u;f++)o[f]=l;return zl.set(r,o),o}function $h(i,e,t,n){let s={side:yt,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1},r={plastic:{color:1382169,metalness:0,roughness:.62,envMapIntensity:.35},motorBlack:{color:1052946,metalness:.15,roughness:.4,envMapIntensity:.55},metal:{color:11449013,metalness:.85,roughness:.3,envMapIntensity:.8},brass:{color:11969387,metalness:.75,roughness:.38,envMapIntensity:.65},connectorBlack:{color:1118997,metalness:0,roughness:.52,envMapIntensity:.35}},o=Object.keys(r),l=o.map(c=>new it({...s,...r[c]})),a=Jh(t,n,i.brep_faces?.length);e.clearGroups();for(let[c,u]of(i.brep_faces||[]).entries()){if(u.last<u.first)continue;let f=Math.max(0,o.indexOf(a?.[c]||"plastic")),h=u.first*3,p=(u.last-u.first+1)*3,_=e.groups.at(-1);_&&_.materialIndex===f&&_.start+_.count===h?_.count+=p:e.addGroup(h,p,f)}return!i.brep_faces?.length&&i.index.array.length&&e.addGroup(0,i.index.array.length,0),l}var Wt={black:0,motor:1,aluminum:2,steel:3,head:4};function Ug(i){let e=i.slice(0,2),t=["EA-2500UL","EA-5000UL","EA-0010ML"].includes(i),n=i==="EA-0010ML"||i==="EA-0020ML",s=e==="SM"?95.5:e==="TM"?71:n?i==="EA-0010ML"?115.5:166:93.8;return{family:e,axis:t?2:1,zUp:t,large:n,head:s,cuts:e==="SM"?[41,s]:e==="TM"?[13,20,34,40,s]:[9.5,29,n?40:38,s]}}function jh(i,e){return i>=e.head?Wt.head:e.family==="SM"?i<41?Wt.motor:Wt.aluminum:e.family==="TM"?i>=13&&i<20||i>=34&&i<40?Wt.aluminum:i>=20&&i<34?Wt.motor:Wt.black:i>=9.5&&i<29?Wt.motor:Wt.black}function Fg(i,e,t,n){let s=i[t.axis],r=e[t.axis],o=t.zUp?[1,0]:[0,2],[l,a]=o.map(f=>(i[f]+e[f])/2),[c,u]=o.map(f=>e[f]-i[f]);if(n===0){if(t.family==="EA"){let f=e[o[1]];if(s>=42.99&&r<=67&&(f<=-21.01||i[o[1]]<-23&&f<=-11.99))return Wt.aluminum;let h=(p,_)=>Math.abs(Math.abs(p)-_)<2;if(c<=6.6&&u<=6.6&&h(l,15.5)&&h(a,15.5)&&(s>=43&&r<=51||s>=0&&r<=3.01)||!t.large&&c<=6.6&&u<=6.6&&h(l,13.79)&&h(a,13.79)&&s>=99.29&&r<=105.81||t.large&&c<=6.6&&u<=6.6&&h(l,13.79)&&h(a,13.79)&&s>=141&&r<=147)return Wt.steel}if(t.family==="SM"&&c<=6.6&&u<=6.6&&(Math.abs(Math.abs(l)-10.5)<1.7&&Math.abs(a)<2&&s>=121&&r<=124.81||Math.abs(Math.abs(l)-11.5)<1.7&&Math.abs(Math.abs(a)-11.5)<1.7&&(s>=53&&r<=56.2||s>=0&&r<=2.01))||t.family==="TM"&&c<=5.6&&u<=5.6&&Math.abs(Math.abs(l)-7.7)<1.6&&Math.abs(Math.abs(a)-7.7)<1.6&&(s>=40.2&&r<=43.2||s>=71&&r<=84.61))return Wt.steel}}function Qh(i,e,t){let n=Ug(e),s=n.axis,r=i.attributes.position.array,o=i.attributes.normal?.array,l=[...r],a=o?[...o]:null,c=i.index.array,u=Array.from({length:5},()=>[]),f=0;function h(m){return{position:r.slice(m*3,m*3+3),normal:o?.slice(m*3,m*3+3)}}function p(m,d,M){let A=[];for(let x=0;x<m.length;x++){let w=m[x],S=m[(x+1)%m.length],C=w.position[s]-d,y=S.position[s]-d,E=M?C>=0:C<=0,R=M?y>=0:y<=0;if(E&&A.push(w),E!==R){let I=C/(C-y),F={position:w.position.map((O,P)=>O+(S.position[P]-O)*I),normal:w.normal?.map((O,P)=>O+(S.normal[P]-O)*I)};F.position[s]=d,A.push(F)}}return A}for(let m of i.brep_faces||[{first:0,last:c.length/3-1}]){let d=[1/0,1/0,1/0],M=[-1/0,-1/0,-1/0];for(let x=m.first*3;x<=m.last*3+2;x++){let w=c[x]*3;for(let S=0;S<3;S++)d[S]=Math.min(d[S],r[w+S]),M[S]=Math.max(M[S],r[w+S])}let A=Fg(d,M,n,t);for(let x=m.first*3;x<=m.last*3;x+=3){let w=c.slice(x,x+3);if(A!==void 0){u[A].push(...w);continue}let S=w.map(I=>r[I*3+s]),C=Math.min(...S),y=Math.max(...S),E=n.cuts.filter(I=>C<I-1e-6&&y>I+1e-6);if(!E.length){u[jh((C+y)/2,n)].push(...w);continue}f++;let R=w.map(h);for(let I of[...E,1/0]){let F=I===1/0?R:p(R,I,!1);if(F.length>=3){let O=jh(F.reduce((k,K)=>k+K.position[s],0)/F.length,n),P=l.length/3;for(let k of F)if(l.push(...k.position),a){let K=Math.hypot(...k.normal)||1;a.push(...k.normal.map(Y=>Y/K))}for(let k=1;k<F.length-1;k++)u[O].push(P,P+k,P+k+1)}I!==1/0&&(R=p(R,I,!0))}}}let _=[],b=[];return u.forEach((m,d)=>{if(m.length){b.push({start:_.length,count:m.length,materialIndex:d});for(let M of m)_.push(M)}}),{positions:l,normals:a,indices:_,groups:b,splitTriangles:f}}function eu(i,e,t,n,s="pmma"){if(typeof i.appearanceRole=="number")e.clearGroups(),e.addGroup(0,i.index.array.length,i.appearanceRole);else{let o=Qh(i,t,i.appearanceRole==="motor-bands"?-1:n);e.setAttribute("position",new gt(o.positions,3)),o.normals&&e.setAttribute("normal",new gt(o.normals,3)),e.setIndex(o.indices),e.clearGroups(),o.groups.forEach(l=>e.addGroup(l.start,l.count,l.materialIndex)),o.normals||e.computeVertexNormals()}let r={side:yt,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1};return[new it({...r,color:1513756,metalness:.25,roughness:.42,envMapIntensity:.65}),new it({...r,color:1052947,metalness:.12,roughness:.68,envMapIntensity:.4}),new it({...r,color:12567237,metalness:.78,roughness:.34,envMapIntensity:.85}),new it({...r,color:13225682,metalness:.95,roughness:.22,envMapIntensity:1}),s==="peek"?new it({...r,color:12891790,metalness:0,roughness:.36,envMapIntensity:.5}):new Ls({...r,color:15988471,metalness:0,roughness:.13,transmission:.88,thickness:2.2,ior:1.49,envMapIntensity:1.1,clearcoat:.65,clearcoatRoughness:.12}),new it({...r,color:15262935,metalness:.05,roughness:.23,envMapIntensity:.7})]}var Og={black:{color:2105894,metalness:.28,roughness:.43},polymer:{color:1513756,metalness:.12,roughness:.62},metal:{color:12567237,metalness:.78,roughness:.34},chrome:{color:13225682,metalness:.95,roughness:.22},pcb:{color:15131,metalness:.12,roughness:.55},connector:{color:15064773,metalness:0,roughness:.58}};function tu(i,e){let t=[],n=new Map;e.clearGroups();for(let s of i.brep_faces||[{first:0,last:i.index.array.length/3-1}]){if(s.last<s.first)continue;let r=Og[s.finish||i.finish],o=s.color||i.color||[.5,.53,.56],l=r?s.finish||i.finish:o.join(",");n.has(l)||(n.set(l,t.length),t.push(new it({...r||{color:new Fe().setRGB(...o,zt),metalness:.15,roughness:.55},envMapIntensity:.8,side:yt,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})));let a=s.first*3,c=(s.last-s.first+1)*3,u=n.get(l),f=e.groups.at(-1);f&&f.materialIndex===u&&f.start+f.count===a?f.count+=c:e.addGroup(a,c,u)}return t}var ha={peek:10850145,natural:9936534,black:2105636,steel:9607582,yellow:13083191};function nu(i,e){i.color.setHex(ha[e]??ha.natural),i.metalness=e==="steel"?.75:0,i.roughness=e==="steel"?.3:.38}function ua(i,e,t){return e.clearGroups(),e.addGroup(0,i.index.array.length,0),[new it({color:ha[t]??ha.natural,metalness:t==="steel"?.75:0,roughness:t==="steel"?.3:.38,envMapIntensity:.55,side:yt,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})]}var _n={geometries:{"flat-bottom-hfl-u28-16":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-u28-16.fcad.gz",sourcePart:"443-00-00078"},"flat-bottom-hfl-u28-30":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-u28-30.fcad.gz",sourcePart:"443-01-00147"},"flat-bottom-hfl-m6-25":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-m6-25.fcad.gz",sourcePart:"443-01-00165"},"flat-bottom-hfl-m6-30":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-m6-30.fcad.gz",sourcePart:"443-01-00006"},"flat-bottom-hf6-u28-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf6-u28-32.fcad.gz",sourcePart:"443-02-00364"},"flat-bottom-hf6-m6-20":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf6-m6-20.fcad.gz",sourcePart:"443-02-00365"},"flat-bottom-hf6-m6-25":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf6-m6-25.fcad.gz",sourcePart:"443-02-00366"},"flat-bottom-hf6-m6-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf6-m6-32.fcad.gz",sourcePart:"443-02-00367"},"flat-bottom-hfl6-u40-16":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-u40-16.fcad.gz",sourcePart:"443-02-00692"},"flat-bottom-hf-u28-20":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf-u28-20.fcad.gz",sourcePart:"443-02-00761"},"flat-bottom-hf-u28-25":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf-u28-25.fcad.gz",sourcePart:"443-02-00357"},"flat-bottom-hf-u28-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf-u28-32.fcad.gz",sourcePart:"443-02-00760"},"flat-bottom-hf-m6-20":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf-m6-20.fcad.gz",sourcePart:"443-02-00359"},"flat-bottom-hf-m6-25":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf-m6-25.fcad.gz",sourcePart:"443-02-00360"},"flat-bottom-hf-m6-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hf-m6-32.fcad.gz",sourcePart:"443-02-00361"},"ferrule-hn6-u28-16":{model3dUrl:"/models/products/fittings/ferrule/cad/ferrule-hn6-u28-16.fcad.gz",sourcePart:"443-02-00749",sourceFile:"443-02-00749-c.stp",sourceSha256:"42929ed33039a1c06a575758d076605bebead742f2bb48f7b247a995b2c72597"},"ferrule-hn6-u28-32":{model3dUrl:"/models/products/fittings/ferrule/cad/ferrule-hn6-u28-32.fcad.gz",sourcePart:"443-02-00678",sourceFile:"443-02-00678-c.stp",sourceSha256:"16a47ce91ee7d8776a18c5c2b7485d06c917e9d07a527784e107de5a1b982360"},"ferrule-hn6-m6-16":{model3dUrl:"/models/products/fittings/ferrule/cad/ferrule-hn6-m6-16.fcad.gz",sourcePart:"443-02-00770",sourceFile:"443-02-00770-c.stp",sourceSha256:"f63ba24b637b0eb7c0de836458c7bd83a93a031faa6dc6989cbda2348df05783"},"ferrule-hn6-m6-32":{model3dUrl:"/models/products/fittings/ferrule/cad/ferrule-hn6-m6-32.fcad.gz",sourcePart:"443-02-00771",sourceFile:"443-02-00771-c.stp",sourceSha256:"f432969cf5d8f12a8a51b550e2eb6f15f125554ccb0ac12e280f4876a5728e7b"},"ferrule-hn-m6-32":{model3dUrl:"/models/products/fittings/ferrule/cad/ferrule-hn-m6-32.fcad.gz",sourcePart:"443-02-00371",sourceFile:"443-02-00371-c.stp",sourceSha256:"4a0eca3962fecbc9f2f08bd512fd53de4aeda6e18f8859cdc3730ba4523eeea4"},"ferrule-hn-m6-16":{model3dUrl:"/models/products/fittings/ferrule/cad/ferrule-hn-m6-16.fcad.gz",sourcePart:"443-02-00435",sourceFile:"443-02-00435-c.stp",sourceSha256:"94f1635b8c357a121f0860d9c97ff50e157f421641db112a96410d103d81163b"},"accessory-ws-46-18-8":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-46-18-8.fcad.gz",source:"catalog-dimensions",outerDiameter:4.6,innerDiameter:1.8,thickness:.8},"accessory-ws-46-18-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-46-18-9.fcad.gz",source:"catalog-dimensions",outerDiameter:4.6,innerDiameter:1.8,thickness:.9},"accessory-ws-46-21-8":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-46-21-8.fcad.gz",source:"catalog-dimensions",outerDiameter:4.6,innerDiameter:2.1,thickness:.8},"accessory-ws-46-21-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-46-21-9.fcad.gz",source:"catalog-dimensions",outerDiameter:4.6,innerDiameter:2.1,thickness:.9},"accessory-ws-46-26-8":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-46-26-8.fcad.gz",source:"catalog-dimensions",outerDiameter:4.6,innerDiameter:2.6,thickness:.8},"accessory-ws-46-26-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-46-26-9.fcad.gz",source:"catalog-dimensions",outerDiameter:4.6,innerDiameter:2.6,thickness:.9},"accessory-ws-46-33-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-46-33-9.fcad.gz",source:"catalog-dimensions",outerDiameter:4.6,innerDiameter:3.3,thickness:.9},"accessory-ws-51-18-8":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-51-18-8.fcad.gz",source:"catalog-dimensions",outerDiameter:5.1,innerDiameter:1.8,thickness:.8},"accessory-ws-51-18-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-51-18-9.fcad.gz",source:"catalog-dimensions",outerDiameter:5.1,innerDiameter:1.8,thickness:.9},"accessory-ws-51-21-8":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-51-21-8.fcad.gz",source:"catalog-dimensions",outerDiameter:5.1,innerDiameter:2.1,thickness:.8},"accessory-ws-51-21-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-51-21-9.fcad.gz",source:"catalog-dimensions",outerDiameter:5.1,innerDiameter:2.1,thickness:.9},"accessory-ws-51-26-8":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-51-26-8.fcad.gz",source:"catalog-dimensions",outerDiameter:5.1,innerDiameter:2.6,thickness:.8},"accessory-ws-51-26-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-51-26-9.fcad.gz",source:"catalog-dimensions",outerDiameter:5.1,innerDiameter:2.6,thickness:.9},"accessory-ws-51-33-9":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-51-33-9.fcad.gz",source:"catalog-dimensions",outerDiameter:5.1,innerDiameter:3.3,thickness:.9},"accessory-ws-27-19-8":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-ws-27-19-8.fcad.gz",source:"catalog-dimensions",outerDiameter:2.7,innerDiameter:1.9,thickness:.8},"accessory-cl-0x-16":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-cl-0x-16.fcad.gz",sourcePart:"443-02-00373",sourceFile:"443-02-00373-c.stp",sourceSha256:"f64f4e1bf768d15dcf8c8260f8a9f40ca3ca9d209cb9d90591c866342bbbcb41",innerDiameter:1.6},"accessory-cl-0x-20":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-cl-0x-20.fcad.gz",sourcePart:"443-02-00376",sourceFile:"443-02-00376-c.stp",sourceSha256:"0a4f35ca0b0c4cc2f8da27d67589ecb4b0ab0a933c90c47d22b57f4b4d446906",innerDiameter:2},"accessory-cl-0x-25":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-cl-0x-25.fcad.gz",sourcePart:"443-02-00377",sourceFile:"443-02-00377-c.stp",sourceSha256:"feaffc58ceaffd1b5aa1c7a8a4f5e330c4d147f1ad7034fa1c4b77d9be7d7089",innerDiameter:2.5},"accessory-cl-0x-30":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-cl-0x-30.fcad.gz",sourcePart:"443-02-00378",sourceFile:"443-02-00378-c.stp",sourceSha256:"324f37d58f56eef37525a768984e7b4e118a540cb0c24ce6b72d77dba0064a14",innerDiameter:3},"accessory-cl-0x-32":{model3dUrl:"/models/products/fittings/accessories/cad/accessory-cl-0x-32.fcad.gz",sourcePart:"443-02-00446",sourceFile:"443-02-00446-c.stp",sourceSha256:"a89b0e712b564e4d79eef73442abbe6b573c9d1ef202c2a4214f2bc40269ad60",innerDiameter:3.2},"flat-bottom-hfl-m6-16":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-m6-16.fcad.gz",sourcePart:"443-01-00164"},"flat-bottom-hfl-m6-20":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-m6-20.fcad.gz",sourcePart:"443-01-00005"},"flat-bottom-hfl-m6-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-m6-32.fcad.gz",sourcePart:"443-01-00166"},"flat-bottom-hfl-u28-20":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-u28-20.fcad.gz",sourcePart:"443-00-00522"},"flat-bottom-hfl-u28-25":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-u28-25.fcad.gz",sourcePart:"443-01-00146"},"flat-bottom-hfl-u28-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl-u28-32.fcad.gz",sourcePart:"443-00-00082"},"flat-bottom-hfl6-m6-16":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-m6-16.fcad.gz",sourcePart:"443-02-00652"},"flat-bottom-hfl6-m6-20":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-m6-20.fcad.gz",sourcePart:"443-02-00649"},"flat-bottom-hfl6-m6-25":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-m6-25.fcad.gz",sourcePart:"443-02-00651"},"flat-bottom-hfl6-m6-30":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-m6-30.fcad.gz",sourcePart:"443-02-00648"},"flat-bottom-hfl6-m6-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-m6-32.fcad.gz",sourcePart:"443-02-00650"},"flat-bottom-hfl6-u28-16":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-u28-16.fcad.gz",sourcePart:"443-02-00647"},"flat-bottom-hfl6-u28-20":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-u28-20.fcad.gz",sourcePart:"443-02-00644"},"flat-bottom-hfl6-u28-25":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-u28-25.fcad.gz",sourcePart:"443-02-00646"},"flat-bottom-hfl6-u28-30":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-u28-30.fcad.gz",sourcePart:"443-02-00643"},"flat-bottom-hfl6-u28-32":{model3dUrl:"/models/products/fittings/flat-bottom/cad/flat-bottom-hfl6-u28-32.fcad.gz",sourcePart:"443-02-00645"}},products:{"hf-m6-20-pk-n":{viewerId:"flat-bottom-hf-m6-20",model:"HF-M6-20-PK-N",part:"443-02-00359",workbookRow:123,finish:"peek",accessoryCodes:["809215","809216","809217","809221","809222","809223"],defaultAccessoryCode:"809221"},"hf-m6-20-ps-b":{viewerId:"flat-bottom-hf-m6-20",model:"HF-M6-20-PS-B",part:"443-02-00413",workbookRow:126,finish:"black",accessoryCodes:["809215","809216","809217","809221","809222","809223"],defaultAccessoryCode:"809221"},"hf-m6-20-pv-n":{viewerId:"flat-bottom-hf-m6-20",model:"HF-M6-20-PV-N",part:"443-02-00412",workbookRow:129,finish:"natural",accessoryCodes:["809215","809216","809217","809221","809222","809223"],defaultAccessoryCode:"809221"},"hf-m6-25-pk-n":{viewerId:"flat-bottom-hf-m6-25",model:"HF-M6-25-PK-N",part:"443-02-00360",workbookRow:124,finish:"peek",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hf-m6-25-ps-b":{viewerId:"flat-bottom-hf-m6-25",model:"HF-M6-25-PS-B",part:"443-02-00415",workbookRow:127,finish:"black",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hf-m6-25-pv-n":{viewerId:"flat-bottom-hf-m6-25",model:"HF-M6-25-PV-N",part:"443-02-00414",workbookRow:130,finish:"natural",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hf-m6-32-pk-n":{viewerId:"flat-bottom-hf-m6-32",model:"HF-M6-32-PK-N",part:"443-02-00361",workbookRow:125,finish:"peek",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hf-m6-32-ps-b":{viewerId:"flat-bottom-hf-m6-32",model:"HF-M6-32-PS-B",part:"443-02-00777",workbookRow:128,finish:"black",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hf-m6-32-pv-n":{viewerId:"flat-bottom-hf-m6-32",model:"HF-M6-32-PV-N",part:"443-02-00416",workbookRow:131,finish:"natural",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hf-u28-20-pk-n":{viewerId:"flat-bottom-hf-u28-20",model:"HF-U28-20-PK-N",part:"443-02-00761",workbookRow:114,finish:"peek",accessoryCodes:["809233","809234","809235","809239","809240","809241"],defaultAccessoryCode:"809239"},"hf-u28-20-ps-b":{viewerId:"flat-bottom-hf-u28-20",model:"HF-U28-20-PS-B",part:"443-02-00775",workbookRow:117,finish:"black",accessoryCodes:["809233","809234","809235","809239","809240","809241"],defaultAccessoryCode:"809239"},"hf-u28-20-pv-n":{viewerId:"flat-bottom-hf-u28-20",model:"HF-U28-20-PV-N",part:"443-02-00756",workbookRow:120,finish:"natural",accessoryCodes:["809233","809234","809235","809239","809240","809241"],defaultAccessoryCode:"809239"},"hf-u28-25-pk-n":{viewerId:"flat-bottom-hf-u28-25",model:"HF-U28-25-PK-N",part:"443-02-00357",workbookRow:115,finish:"peek",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hf-u28-25-ps-b":{viewerId:"flat-bottom-hf-u28-25",model:"HF-U28-25-PS-B",part:"443-02-00776",workbookRow:118,finish:"black",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hf-u28-25-pv-n":{viewerId:"flat-bottom-hf-u28-25",model:"HF-U28-25-PV-N",part:"443-02-00408",workbookRow:121,finish:"natural",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hf-u28-32-pk-n":{viewerId:"flat-bottom-hf-u28-32",model:"HF-U28-32-PK-N",part:"443-02-00760",workbookRow:116,finish:"peek",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hf-u28-32-ps-b":{viewerId:"flat-bottom-hf-u28-32",model:"HF-U28-32-PS-B",part:"443-02-00774",workbookRow:119,finish:"black",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hf-u28-32-pv-n":{viewerId:"flat-bottom-hf-u28-32",model:"HF-U28-32-PV-N",part:"443-02-00755",workbookRow:122,finish:"natural",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hf6-m6-20-pk-n":{viewerId:"flat-bottom-hf6-m6-20",model:"HF6-M6-20-PK-N",part:"443-02-00365",workbookRow:87,finish:"peek",accessoryCodes:["809215","809216","809217","809221","809222","809223"],defaultAccessoryCode:"809221"},"hf6-m6-20-ps-b":{viewerId:"flat-bottom-hf6-m6-20",model:"HF6-M6-20-PS-B",part:"443-02-00425",workbookRow:93,finish:"black",accessoryCodes:["809215","809216","809217","809221","809222","809223"],defaultAccessoryCode:"809221"},"hf6-m6-20-pv-n":{viewerId:"flat-bottom-hf6-m6-20",model:"HF6-M6-20-PV-N",part:"443-02-00763",workbookRow:90,finish:"natural",accessoryCodes:["809215","809216","809217","809221","809222","809223"],defaultAccessoryCode:"809221"},"hf6-m6-25-pk-n":{viewerId:"flat-bottom-hf6-m6-25",model:"HF6-M6-25-PK-N",part:"443-02-00366",workbookRow:88,finish:"peek",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hf6-m6-25-ps-b":{viewerId:"flat-bottom-hf6-m6-25",model:"HF6-M6-25-PS-B",part:"443-02-00773",workbookRow:94,finish:"black",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hf6-m6-25-pv-n":{viewerId:"flat-bottom-hf6-m6-25",model:"HF6-M6-25-PV-N",part:"443-02-00426",workbookRow:91,finish:"natural",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hf6-m6-32-pk-n":{viewerId:"flat-bottom-hf6-m6-32",model:"HF6-M6-32-PK-N",part:"443-02-00367",workbookRow:89,finish:"peek",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hf6-m6-32-ps-b":{viewerId:"flat-bottom-hf6-m6-32",model:"HF6-M6-32-PS-B",part:"443-02-00429",workbookRow:95,finish:"black",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hf6-m6-32-pv-n":{viewerId:"flat-bottom-hf6-m6-32",model:"HF6-M6-32-PV-N",part:"443-02-00428",workbookRow:92,finish:"natural",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hf6-u28-32-pk-n":{viewerId:"flat-bottom-hf6-u28-32",model:"HF6-U28-32-PK-N",part:"443-02-00364",workbookRow:80,finish:"peek",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hf6-u28-32-ps-b":{viewerId:"flat-bottom-hf6-u28-32",model:"HF6-U28-32-PS-B",part:"443-02-00766",workbookRow:86,finish:"black",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hf6-u28-32-pv-n":{viewerId:"flat-bottom-hf6-u28-32",model:"HF6-U28-32-PV-N",part:"443-02-00422",workbookRow:83,finish:"natural",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hfl-m6-25-pv-b":{viewerId:"flat-bottom-hfl-m6-25",model:"HFL-M6-25-PV-B",part:"443-01-00165",workbookRow:20,finish:"black",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hfl-m6-25-pv-n":{viewerId:"flat-bottom-hfl-m6-25",model:"HFL-M6-25-PV-N",part:"443-00-00202",workbookRow:9,finish:"natural",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hfl-m6-30-pv-b":{viewerId:"flat-bottom-hfl-m6-30",model:"HFL-M6-30-PV-B",part:"443-01-00006",workbookRow:21,finish:"black",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hfl-m6-30-pv-n":{viewerId:"flat-bottom-hfl-m6-30",model:"HFL-M6-30-PV-N",part:"443-00-00227",workbookRow:12,finish:"natural",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hfl-u28-16-pv-b":{viewerId:"flat-bottom-hfl-u28-16",model:"HFL-U28-16-PV-B",part:"443-00-00078",workbookRow:13,finish:"black",accessoryCodes:["809233","809234","809235"],defaultAccessoryCode:"809233"},"hfl-u28-16-pv-n":{viewerId:"flat-bottom-hfl-u28-16",model:"HFL-U28-16-PV-N",part:"443-00-00056",workbookRow:3,finish:"natural",accessoryCodes:["809233","809234","809235"],defaultAccessoryCode:"809233"},"hfl-u28-30-pv-b":{viewerId:"flat-bottom-hfl-u28-30",model:"HFL-U28-30-PV-B",part:"443-01-00147",workbookRow:16,finish:"black",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hfl-u28-30-pv-n":{viewerId:"flat-bottom-hfl-u28-30",model:"HFL-U28-30-PV-N",part:"443-00-00225",workbookRow:6,finish:"natural",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hfl6-u40-16-pk-n":{viewerId:"flat-bottom-hfl6-u40-16",model:"HFL6-U40-16-PK-N",part:"443-02-00692",workbookRow:96,finish:"peek",accessoryCodes:["WS-27"],defaultAccessoryCode:"WS-27"},"hn-m6-16-ac-b":{viewerId:"ferrule-hn-m6-16",model:"HN-M6-16-AC-B",part:"443-02-00481",workbookRow:146,finish:"black",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn-m6-16-pk-n":{viewerId:"ferrule-hn-m6-16",model:"HN-M6-16-PK-N",part:"443-02-00370",workbookRow:140,finish:"peek",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn-m6-16-ps-b":{viewerId:"ferrule-hn-m6-16",model:"HN-M6-16-PS-B",part:"443-02-00435",workbookRow:142,finish:"black",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn-m6-16-pv-n":{viewerId:"ferrule-hn-m6-16",model:"HN-M6-16-PV-N",part:"443-02-00434",workbookRow:144,finish:"natural",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn-m6-32-ac-b":{viewerId:"ferrule-hn-m6-32",model:"HN-M6-32-AC-B",part:"443-02-00482",workbookRow:147,finish:"black",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn-m6-32-pk-n":{viewerId:"ferrule-hn-m6-32",model:"HN-M6-32-PK-N",part:"443-02-00371",workbookRow:141,finish:"peek",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn-m6-32-ps-b":{viewerId:"ferrule-hn-m6-32",model:"HN-M6-32-PS-B",part:"443-02-00437",workbookRow:143,finish:"black",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn-m6-32-pv-n":{viewerId:"ferrule-hn-m6-32",model:"HN-M6-32-PV-N",part:"443-02-00753",workbookRow:145,finish:"natural",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-m6-16-ac-b":{viewerId:"ferrule-hn6-m6-16",model:"HN6-M6-16-AC-B",part:"443-02-00483",workbookRow:112,finish:"black",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-m6-16-pk-n":{viewerId:"ferrule-hn6-m6-16",model:"HN6-M6-16-PK-N",part:"443-02-00374",workbookRow:106,finish:"peek",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-m6-16-ps-b":{viewerId:"ferrule-hn6-m6-16",model:"HN6-M6-16-PS-B",part:"443-02-00770",workbookRow:108,finish:"black",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-m6-16-pv-n":{viewerId:"ferrule-hn6-m6-16",model:"HN6-M6-16-PV-N",part:"443-02-00442",workbookRow:110,finish:"natural",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-m6-32-ac-b":{viewerId:"ferrule-hn6-m6-32",model:"HN6-M6-32-AC-B",part:"443-02-00484",workbookRow:113,finish:"black",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-m6-32-pk-n":{viewerId:"ferrule-hn6-m6-32",model:"HN6-M6-32-PK-N",part:"443-02-00375",workbookRow:107,finish:"peek",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-m6-32-ps-b":{viewerId:"ferrule-hn6-m6-32",model:"HN6-M6-32-PS-B",part:"443-02-00771",workbookRow:109,finish:"black",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-u28-16-ac-b":{viewerId:"ferrule-hn6-u28-16",model:"HN6-U28-16-AC-B",part:"443-02-00486",workbookRow:104,finish:"black",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-u28-16-pk-n":{viewerId:"ferrule-hn6-u28-16",model:"HN6-U28-16-PK-N",part:"443-02-00749",workbookRow:97,finish:"peek",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-u28-16-ps-b":{viewerId:"ferrule-hn6-u28-16",model:"HN6-U28-16-PS-B",part:"443-02-00769",workbookRow:99,finish:"black",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-u28-16-pv-n":{viewerId:"ferrule-hn6-u28-16",model:"HN6-U28-16-PV-N",part:"443-02-00438",workbookRow:101,finish:"natural",accessoryCodes:["809731","809820"],defaultAccessoryCode:"809731"},"hn6-u28-32-ac-b":{viewerId:"ferrule-hn6-u28-32",model:"HN6-U28-32-AC-B",part:"443-02-00479",workbookRow:105,finish:"black",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-u28-32-et-n":{viewerId:"ferrule-hn6-u28-32",model:"HN6-U28-32-ET-N",part:"443-02-00780",workbookRow:103,finish:"natural",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-u28-32-pk-b":{viewerId:"ferrule-hn6-u28-32",model:"HN6-U28-32-PK-B",part:"443-02-00678",workbookRow:98,finish:"black",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-u28-32-ps-b":{viewerId:"ferrule-hn6-u28-32",model:"HN6-U28-32-PS-B",part:"443-02-00772",workbookRow:100,finish:"black",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hn6-u28-32-pv-n":{viewerId:"ferrule-hn6-u28-32",model:"HN6-U28-32-PV-N",part:"443-02-00765",workbookRow:102,finish:"natural",accessoryCodes:["809734","809821","809735","809822","809736","809823","809780","809650","809824"],defaultAccessoryCode:"809780"},"hfl-m6-16-pv-b":{viewerId:"flat-bottom-hfl-m6-16",model:"HFL-M6-16-PV-B",part:"443-01-00164",workbookRow:18,finish:"black",accessoryCodes:["809215","809216","809217"],defaultAccessoryCode:"809215"},"hfl-m6-16-pv-n":{viewerId:"flat-bottom-hfl-m6-16",model:"HFL-M6-16-PV-N",part:"443-00-00201",workbookRow:8,finish:"natural",accessoryCodes:["809215","809216","809217"],defaultAccessoryCode:"809215"},"hfl-m6-20-pv-b":{viewerId:"flat-bottom-hfl-m6-20",model:"HFL-M6-20-PV-B",part:"443-01-00005",workbookRow:19,finish:"black",accessoryCodes:["809221","809222","809223"],defaultAccessoryCode:"809221"},"hfl-m6-20-pv-n":{viewerId:"flat-bottom-hfl-m6-20",model:"HFL-M6-20-PV-N",part:"443-00-00204",workbookRow:11,finish:"natural",accessoryCodes:["809221","809222","809223"],defaultAccessoryCode:"809221"},"hfl-m6-32-pv-b":{viewerId:"flat-bottom-hfl-m6-32",model:"HFL-M6-32-PV-B",part:"443-01-00166",workbookRow:22,finish:"black",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hfl-m6-32-pv-n":{viewerId:"flat-bottom-hfl-m6-32",model:"HFL-M6-32-PV-N",part:"443-00-00203",workbookRow:10,finish:"natural",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hfl-u28-20-pv-b":{viewerId:"flat-bottom-hfl-u28-20",model:"HFL-U28-20-PV-B",part:"443-00-00522",workbookRow:14,finish:"black",accessoryCodes:["809239","809240","809241"],defaultAccessoryCode:"809239"},"hfl-u28-20-pv-n":{viewerId:"flat-bottom-hfl-u28-20",model:"HFL-U28-20-PV-N",part:"443-00-00222",workbookRow:5,finish:"natural",accessoryCodes:["809239","809240","809241"],defaultAccessoryCode:"809239"},"hfl-u28-25-pv-b":{viewerId:"flat-bottom-hfl-u28-25",model:"HFL-U28-25-PV-B",part:"443-01-00146",workbookRow:15,finish:"black",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hfl-u28-25-pv-n":{viewerId:"flat-bottom-hfl-u28-25",model:"HFL-U28-25-PV-N",part:"443-00-00221",workbookRow:4,finish:"natural",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hfl-u28-32-pv-b":{viewerId:"flat-bottom-hfl-u28-32",model:"HFL-U28-32-PV-B",part:"443-00-00082",workbookRow:17,finish:"black",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hfl-u28-32-pv-n":{viewerId:"flat-bottom-hfl-u28-32",model:"HFL-U28-32-PV-N",part:"443-00-00057",workbookRow:7,finish:"natural",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hfl6-m6-16-ps-b":{viewerId:"flat-bottom-hfl6-m6-16",model:"HFL6-M6-16-PS-B",part:"443-02-00652",workbookRow:52,finish:"black",accessoryCodes:["809215","809216","809217"],defaultAccessoryCode:"809215"},"hfl6-m6-20-ps-b":{viewerId:"flat-bottom-hfl6-m6-20",model:"HFL6-M6-20-PS-B",part:"443-02-00649",workbookRow:49,finish:"black",accessoryCodes:["809221","809222","809223"],defaultAccessoryCode:"809221"},"hfl6-m6-25-ps-b":{viewerId:"flat-bottom-hfl6-m6-25",model:"HFL6-M6-25-PS-B",part:"443-02-00651",workbookRow:51,finish:"black",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hfl6-m6-25-ps-u":{viewerId:"flat-bottom-hfl6-m6-25",model:"HFL6-M6-25-PS-U",part:"443-02-00667",workbookRow:53,finish:"natural",accessoryCodes:["809226","809227","809228"],defaultAccessoryCode:"809226"},"hfl6-m6-30-ps-b":{viewerId:"flat-bottom-hfl6-m6-30",model:"HFL6-M6-30-PS-B",part:"443-02-00648",workbookRow:48,finish:"black",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hfl6-m6-32-ps-b":{viewerId:"flat-bottom-hfl6-m6-32",model:"HFL6-M6-32-PS-B",part:"443-02-00650",workbookRow:50,finish:"black",accessoryCodes:["809229","809230"],defaultAccessoryCode:"809229"},"hfl6-u28-16-ps-b":{viewerId:"flat-bottom-hfl6-u28-16",model:"HFL6-U28-16-PS-B",part:"443-02-00647",workbookRow:47,finish:"black",accessoryCodes:["809233","809234","809235"],defaultAccessoryCode:"809233"},"hfl6-u28-16-ps-u":{viewerId:"flat-bottom-hfl6-u28-16",model:"HFL6-U28-16-PS-U",part:"443-02-00668",workbookRow:54,finish:"natural",accessoryCodes:["809233","809234","809235"],defaultAccessoryCode:"809233"},"hfl6-u28-20-ps-b":{viewerId:"flat-bottom-hfl6-u28-20",model:"HFL6-U28-20-PS-B",part:"443-02-00644",workbookRow:44,finish:"black",accessoryCodes:["809239","809240","809241"],defaultAccessoryCode:"809239"},"hfl6-u28-20-ps-u":{viewerId:"flat-bottom-hfl6-u28-20",model:"HFL6-U28-20-PS-U",part:"443-02-00676",workbookRow:55,finish:"natural",accessoryCodes:["809239","809240","809241"],defaultAccessoryCode:"809239"},"hfl6-u28-25-ps-b":{viewerId:"flat-bottom-hfl6-u28-25",model:"HFL6-U28-25-PS-B",part:"443-02-00646",workbookRow:46,finish:"black",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hfl6-u28-30-ps-b":{viewerId:"flat-bottom-hfl6-u28-30",model:"HFL6-U28-30-PS-B",part:"443-02-00643",workbookRow:43,finish:"black",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hfl6-u28-32-ps-b":{viewerId:"flat-bottom-hfl6-u28-32",model:"HFL6-U28-32-PS-B",part:"443-02-00645",workbookRow:45,finish:"black",accessoryCodes:["809247","809248","809249"],defaultAccessoryCode:"809247"},"hf6-u28-20-pk-n":{viewerId:"flat-bottom-hf6-m6-20",model:"HF6-U28-20-PK-N",part:"443-02-00750",workbookRow:78,finish:"peek",provisionalGeometry:!0,provisionalSourceModel:"HF6-M6-20-PK-N",provisionalSourceViewerId:"flat-bottom-hf6-m6-20",provisionalReason:"Exact HF6 U28 geometry is not available; temporarily reuse the matching HF6 M6 geometry.",accessoryCodes:["809233","809234","809235","809239","809240","809241"],defaultAccessoryCode:"809239"},"hf6-u28-20-ps-b":{viewerId:"flat-bottom-hf6-m6-20",model:"HF6-U28-20-PS-B",part:"443-02-00767",workbookRow:84,finish:"black",provisionalGeometry:!0,provisionalSourceModel:"HF6-M6-20-PS-B",provisionalSourceViewerId:"flat-bottom-hf6-m6-20",provisionalReason:"Exact HF6 U28 geometry is not available; temporarily reuse the matching HF6 M6 geometry.",accessoryCodes:["809233","809234","809235","809239","809240","809241"],defaultAccessoryCode:"809239"},"hf6-u28-20-pv-n":{viewerId:"flat-bottom-hf6-m6-20",model:"HF6-U28-20-PV-N",part:"443-02-00762",workbookRow:81,finish:"natural",provisionalGeometry:!0,provisionalSourceModel:"HF6-M6-20-PV-N",provisionalSourceViewerId:"flat-bottom-hf6-m6-20",provisionalReason:"Exact HF6 U28 geometry is not available; temporarily reuse the matching HF6 M6 geometry.",accessoryCodes:["809233","809234","809235","809239","809240","809241"],defaultAccessoryCode:"809239"},"hf6-u28-25-pk-n":{viewerId:"flat-bottom-hf6-m6-25",model:"HF6-U28-25-PK-N",part:"443-02-00751",workbookRow:79,finish:"peek",provisionalGeometry:!0,provisionalSourceModel:"HF6-M6-25-PK-N",provisionalSourceViewerId:"flat-bottom-hf6-m6-25",provisionalReason:"Exact HF6 U28 geometry is not available; temporarily reuse the matching HF6 M6 geometry.",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hf6-u28-25-ps-b":{viewerId:"flat-bottom-hf6-m6-25",model:"HF6-U28-25-PS-B",part:"443-02-00768",workbookRow:85,finish:"black",provisionalGeometry:!0,provisionalSourceModel:"HF6-M6-25-PS-B",provisionalSourceViewerId:"flat-bottom-hf6-m6-25",provisionalReason:"Exact HF6 U28 geometry is not available; temporarily reuse the matching HF6 M6 geometry.",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"},"hf6-u28-25-pv-n":{viewerId:"flat-bottom-hf6-m6-25",model:"HF6-U28-25-PV-N",part:"443-02-00764",workbookRow:82,finish:"natural",provisionalGeometry:!0,provisionalSourceModel:"HF6-M6-25-PV-N",provisionalSourceViewerId:"flat-bottom-hf6-m6-25",provisionalReason:"Exact HF6 U28 geometry is not available; temporarily reuse the matching HF6 M6 geometry.",accessoryCodes:["809244","809245","809246"],defaultAccessoryCode:"809244"}},accessories:{"809215":{model:"WS-46-18-08-SS-N",geometryId:"accessory-ws-46-18-8",kind:"washer",finish:"steel"},"809216":{model:"WS-46-18-09-PK-N",geometryId:"accessory-ws-46-18-9",kind:"washer",finish:"peek"},"809217":{model:"WS-46-18-09-PT-N",geometryId:"accessory-ws-46-18-9",kind:"washer",finish:"natural"},"809221":{model:"WS-46-21-08-SS-N",geometryId:"accessory-ws-46-21-8",kind:"washer",finish:"steel"},"809222":{model:"WS-46-21-09-PK-N",geometryId:"accessory-ws-46-21-9",kind:"washer",finish:"peek"},"809223":{model:"WS-46-21-09-PT-N",geometryId:"accessory-ws-46-21-9",kind:"washer",finish:"natural"},"809226":{model:"WS-46-26-08-SS-N",geometryId:"accessory-ws-46-26-8",kind:"washer",finish:"steel"},"809227":{model:"WS-46-26-09-PK-N",geometryId:"accessory-ws-46-26-9",kind:"washer",finish:"peek"},"809228":{model:"WS-46-26-09-PT-N",geometryId:"accessory-ws-46-26-9",kind:"washer",finish:"natural"},"809229":{model:"WS-46-33-09-SS-N",geometryId:"accessory-ws-46-33-9",kind:"washer",finish:"steel"},"809230":{model:"WS-46-33-09-PK-N",geometryId:"accessory-ws-46-33-9",kind:"washer",finish:"peek"},"809233":{model:"WS-51-18-08-SS-N",geometryId:"accessory-ws-51-18-8",kind:"washer",finish:"steel"},"809234":{model:"WS-51-18-09-PK-N",geometryId:"accessory-ws-51-18-9",kind:"washer",finish:"peek"},"809235":{model:"WS-51-18-09-PT-N",geometryId:"accessory-ws-51-18-9",kind:"washer",finish:"natural"},"809239":{model:"WS-51-21-08-SS-N",geometryId:"accessory-ws-51-21-8",kind:"washer",finish:"steel"},"809240":{model:"WS-51-21-09-PK-N",geometryId:"accessory-ws-51-21-9",kind:"washer",finish:"peek"},"809241":{model:"WS-51-21-09-PT-N",geometryId:"accessory-ws-51-21-9",kind:"washer",finish:"natural"},"809244":{model:"WS-51-26-08-SS-N",geometryId:"accessory-ws-51-26-8",kind:"washer",finish:"steel"},"809245":{model:"WS-51-26-09-PK-N",geometryId:"accessory-ws-51-26-9",kind:"washer",finish:"peek"},"809246":{model:"WS-51-26-09-PT-N",geometryId:"accessory-ws-51-26-9",kind:"washer",finish:"natural"},"809247":{model:"WS-51-33-09-SS-N",geometryId:"accessory-ws-51-33-9",kind:"washer",finish:"steel"},"809248":{model:"WS-51-33-09-PK-N",geometryId:"accessory-ws-51-33-9",kind:"washer",finish:"peek"},"809249":{model:"WS-51-33-09-PT-N",geometryId:"accessory-ws-51-33-9",kind:"washer",finish:"natural"},"809650":{model:"CL-0X-32-ET-Y",geometryId:"accessory-cl-0x-32",kind:"ferrule",finish:"yellow"},"809731":{model:"CL-0X-16-ET-N",geometryId:"accessory-cl-0x-16",kind:"ferrule",finish:"natural"},"809734":{model:"CL-0X-20-ET-N",geometryId:"accessory-cl-0x-20",kind:"ferrule",finish:"natural"},"809735":{model:"CL-0X-25-ET-N",geometryId:"accessory-cl-0x-25",kind:"ferrule",finish:"natural"},"809736":{model:"CL-0X-30-ET-N",geometryId:"accessory-cl-0x-30",kind:"ferrule",finish:"natural"},"809780":{model:"CL-0X-32-ET-N",geometryId:"accessory-cl-0x-32",kind:"ferrule",finish:"natural"},"809820":{model:"CL-0X-16-PP-N",geometryId:"accessory-cl-0x-16",kind:"ferrule",finish:"natural"},"809821":{model:"CL-0X-20-PP-N",geometryId:"accessory-cl-0x-20",kind:"ferrule",finish:"natural"},"809822":{model:"CL-0X-25-PP-N",geometryId:"accessory-cl-0x-25",kind:"ferrule",finish:"natural"},"809823":{model:"CL-0X-30-PP-N",geometryId:"accessory-cl-0x-30",kind:"ferrule",finish:"natural"},"809824":{model:"CL-0X-32-PP-N",geometryId:"accessory-cl-0x-32",kind:"ferrule",finish:"natural"},"WS-27":{model:"WS-27",geometryId:"accessory-ws-27-19-8",kind:"washer",finish:"steel"}}};var oi=Math.SQRT1_2,iu=[[-oi,oi,0],[0,0,1],[oi,oi,0]],su=[[0,-oi,oi],[-1,0,0],[0,-oi,-oi]],kg={"dpl30-db":iu,"dpl60-db":iu,"dpl30-bb":su,"dpl60-bb":su,"dpl30h-ds":[[-1,0,0],[0,0,1],[0,1,0]],"dpl30h-bs":[[0,0,1],[1,0,0],[0,1,0]],"dpgl800-bs":[[1,0,0],[0,0,1],[0,-1,0]]},zg=new Set(["EA-2500UL","EA-5000UL","EA-0010ML"]),ru=i=>i.appearance?.piston?i.appearance.fullAssembly?[[1,0,0],[0,1,0],[0,0,1]]:zg.has(i.name)?[[0,1,0],[0,0,1],[1,0,0]]:[[1,0,0],[0,1,0],[0,0,1]]:i.appearance?.diaphragm?kg[i.name.toLowerCase()]:void 0;function da(i,e){let t=ru(i);if(t){let[n,s,r]=t;e.quaternion.setFromRotationMatrix(new Qe().set(...n,0,...s,0,...r,0,0,0,0,1))}else i.rotationEuler?e.rotation.set(...i.rotationEuler):e.rotation.x=i.rotationX??Math.PI/2}function ou(i){let e=ru(i);if(!e)return i;let t=[1/0,1/0,1/0],n=[-1/0,-1/0,-1/0];for(let s of i.meshes){let r=s.attributes.position.array;for(let o=0;o<r.length;o+=3)for(let l=0;l<3;l++){let a=e[l],c=a[0]*r[o]+a[1]*r[o+1]+a[2]*r[o+2];t[l]=Math.min(t[l],c),n[l]=Math.max(n[l],c)}}return{...i,dimensions:{...i.dimensions,axes:e,min:t,max:n,size:n.map((s,r)=>s-t[r])}}}function fa(i,e){let t=new Ps(i,26);if(!e)return t;let n=c=>Uint8Array.from(atob(c),u=>u.charCodeAt(0)).buffer,s=new Int32Array(n(e.order)),r=new Float32Array(n(e.added)),o=t.attributes.position.array,l=new Float32Array(s.length*6);for(let c=0;c<s.length;c++){let u=s[c];if(u<0)l.set(r.subarray((-1-u)*6,-u*6),c*6);else{let f=(u>>>1)*6,h=u&1;l.set(o.subarray(f+(h?3:0),f+(h?6:3)),c*6),l.set(o.subarray(f+(h?0:3),f+(h?3:6)),c*6+3)}}t.dispose();let a=new Pt;return a.setAttribute("position",new Gt(l,3)),a}function pa(i,e,t={}){let n="http://www.w3.org/2000/svg",s=document.createElementNS(n,"svg");s.classList.add("dimension-overlay"),s.setAttribute("aria-hidden","true"),i.append(s);let r,o,l=!0,a=[],c="",u=[null,null,null,null],f=[!0,!0,!0,!0],h=(M,A,x)=>{x=String(x),M.getAttribute(A)!==x&&M.setAttribute(A,x)},p=(M,A)=>{let x=document.createElementNS(n,M);for(let[w,S]of Object.entries(A))x.setAttribute(w,S);return s.append(x),x},_=M=>Number(M.toFixed(2)).toString();function b(M,A){if(r=M.dimensions,o=A,s.replaceChildren(),a=[],c="",u.fill(null),f.fill(!0),!r)return;let x=t.axes||[0,1,2],w=x.map(S=>({axis:S,value:r.size[S]}));r.housing&&Math.abs(r.size[1]-r.housing.width)>=.01&&w.push({axis:1,value:r.housing.width,housing:!0});for(let{axis:S,value:C,housing:y}of w){let E={axis:S,housing:y,extension:p("path",{class:"dimension-extension"}),line:p("path",{class:"dimension-line"}),text:p("text",{"text-anchor":"middle","dominant-baseline":"middle",class:"dimension-label"})};E.text.textContent=(t.diameterAxis===S?`${t.diameterLabel||"\xD8"} `:"")+_(C)+" mm",a.push(E)}}function m(){if(!l||!r)return;let M=i.clientWidth,A=i.clientHeight;o.updateWorldMatrix(!0,!1);let x=[M,A,...e.matrixWorld.elements,...e.projectionMatrix.elements,...o.matrixWorld.elements].map(E=>Number(E).toFixed(6)).join(",");if(x===c)return;c=x,h(s,"viewBox",`0 0 ${M} ${A}`),s.style.width=M+"px",s.style.height=A+"px";let w=E=>Array.from({length:8},(R,I)=>{let F=new U;return r.axes.forEach((O,P)=>F.addScaledVector(new U(...O),I&1<<P?E.max[P]:E.min[P])),o.localToWorld(F),F.project(e),[(F.x+1)*M/2,(1-F.y)*A/2]}),S=w(r),C=r.housing?w(r.housing):S,y;for(let E=0;E<a.length;E++){let R=a[E].axis,I=a[E].housing?C:S,F=I.reduce((Ee,G)=>[Ee[0]+G[0]/8,Ee[1]+G[1]/8],[0,0]),O,P;for(let Ee=0;Ee<8;Ee++){if(Ee&1<<R)continue;let G=I[Ee],Q=I[Ee|1<<R],ce=Q[0]-G[0],Ce=Q[1]-G[1],oe=Math.hypot(ce,Ce);if(oe<.001)continue;let Ne=[-Ce/oe,ce/oe],rt=[(G[0]+Q[0])/2,(G[1]+Q[1])/2],Oe=(rt[0]-F[0])*Ne[0]+(rt[1]-F[1])*Ne[1];Oe<0&&(Ne=Ne.map(Ge=>-Ge),Oe=-Oe);let W=t.side&&Math.abs(ce)>Math.abs(Ce)?(t.side==="top"?F[1]-rt[1]:rt[1]-F[1])*2:t.verticalSide&&Math.abs(Ce)>=Math.abs(ce)?(t.verticalSide==="right"?rt[0]-F[0]:F[0]-rt[0])*2:0,se=Oe+W-(a[E].housing&&y?Math.max(0,Ne[0]*y[0]+Ne[1]*y[1])*1e4:0),ae={a:G,b:Q,n:Ne,len:oe,distance:Oe,score:se,id:Ee};Ee===u[E]&&(P=ae),(!O||se>O.score+.01)&&(O=ae)}P&&O.score-P.score<14&&(O=P),O&&(u[E]=O.id),E===1&&O&&(y=O.n),f[E]=!!(O&&O.len>(t.minSpan??(f[E]?18:30)));let k=a[E];for(let Ee of[k.extension,k.line,k.text])Ee.style.display=f[E]?"":"none";if(!f[E])continue;let{a:K,b:Y,n:ne,len:q}=O,Z=(t.offset??30)+E*5,J=K.map((Ee,G)=>Ee+ne[G]*Z),ye=Y.map((Ee,G)=>Ee+ne[G]*Z),ve=[(ye[0]-J[0])/q,(ye[1]-J[1])/q],ze=Ee=>Ee.map(G=>G.toFixed(2)).join(",");h(k.extension,"d",`M ${ze(K)} L ${ze(J.map((Ee,G)=>Ee+ne[G]*6))} M ${ze(Y)} L ${ze(ye.map((Ee,G)=>Ee+ne[G]*6))}`);let Ve=`M ${ze(J)} L ${ze(ye)}`;for(let[Ee,G]of[[J,1],[ye,-1]]){let Q=Ee.map((Ce,oe)=>Ce+ve[oe]*G*7+ne[oe]*3),ce=Ee.map((Ce,oe)=>Ce+ve[oe]*G*7-ne[oe]*3);Ve+=` M ${ze(Q)} L ${ze(Ee)} L ${ze(ce)}`}h(k.line,"d",Ve),h(k.text,"x",((J[0]+ye[0])/2+ne[0]*14).toFixed(2)),h(k.text,"y",((J[1]+ye[1])/2+ne[1]*14).toFixed(2))}}function d(M){l!==M&&(l=M,s.style.display=l?"":"none",l&&(c=""))}return{set:b,update:m,setVisible:d,dispose(){s.remove()},toggle(){return d(!l),m(),l}}}function au(i,e,t,n){let s=t.geometry.innerDiameter;if(!(s>0))return null;let r="http://www.w3.org/2000/svg",o=document.createElementNS(r,"svg");o.classList.add("dimension-overlay","fitting-bore-dimension"),o.setAttribute("aria-hidden","true"),i.append(o);let l=document.createElementNS(r,"path");l.setAttribute("class","dimension-line"),o.append(l);let a=document.createElementNS(r,"text");a.setAttribute("class","dimension-label"),a.setAttribute("dominant-baseline","middle"),o.append(a);let c={zh:"\u5185\u5F84",en:"ID",es:"DI",fr:"DI",ko:"\uB0B4\uACBD",ru:"\u0412\u043D\u0443\u0442\u0440. \xD8"},u=new URLSearchParams(location.search).get("lang");a.textContent=`${c[u]||c.en}${u==="ru"?"":" \xD8"} ${Number(s.toFixed(2))} mm`;let f=t.data.dimensions,h=t.kind==="washer"?1:2,p=t.kind==="washer"?2:1,_=f.min.map((A,x)=>(A+f.max[x])/2);_[h]=f.max[h];let b=!0,m="",d=(A,x,w)=>{w=String(w),A.getAttribute(x)!==w&&A.setAttribute(x,w)};function M(){if(!b)return;n.updateWorldMatrix(!0,!1);let A=i.clientWidth,x=i.clientHeight,w=[A,x,...e.matrixWorld.elements,...e.projectionMatrix.elements,...n.matrixWorld.elements].map(Z=>Number(Z).toFixed(6)).join(",");if(w===m)return;m=w,d(o,"viewBox",`0 0 ${A} ${x}`),o.style.width=A+"px",o.style.height=x+"px";let S=Z=>{let J=n.localToWorld(new U(...Z)).project(e);return[(J.x+1)*A/2,(1-J.y)*x/2]},C=Array.from({length:32},(Z,J)=>{let ye=[..._],ve=J*Math.PI/16;return ye[0]+=s/2*Math.cos(ve),ye[p]+=s/2*Math.sin(ve),S(ye)}),y=Array.from({length:8},(Z,J)=>S(f.min.map((ye,ve)=>J&1<<ve?f.max[ve]:ye))),E=C.reduce((Z,J)=>J[1]+J[0]*.15>Z[1]+Z[0]*.15?J:Z),R=[An.clamp(Math.max(...C.map(Z=>Z[0]))+34,20,A-132),Math.min(x-35,Math.max(...y.map(Z=>Z[1]))+43)],I=[R[0]+100,R[1]],F=R[0]-E[0],O=R[1]-E[1],P=Math.hypot(F,O),k=[F/P,O/P],K=[-k[1],k[0]],Y=E.map((Z,J)=>Z+k[J]*7+K[J]*3),ne=E.map((Z,J)=>Z+k[J]*7-K[J]*3),q=Z=>Z.map(J=>J.toFixed(2)).join(",");d(l,"d",`M ${q(E)} L ${q(R)} L ${q(I)} M ${q(Y)} L ${q(E)} L ${q(ne)}`),d(a,"x",R[0]),d(a,"y",R[1]+15)}return{update:M,setVisible(A){b!==A&&(b=A,o.style.display=A?"":"none",A&&(m=""))},dispose(){o.remove()}}}var ma=new Map;function er(i){let e=i.get("model"),t=i.get("product"),n=t&&Object.hasOwn(_n.products,t)?_n.products[t]:Object.values(_n.products).find(s=>s.viewerId===e);return n?.viewerId===e?{...n,options:n.accessoryCodes.map(s=>({code:s,..._n.accessories[s]}))}:null}async function Hl(i,e=i.get("accessory")){let t=er(i);if(!t||e==="none")return null;let n=t.accessoryCodes.includes(e)?e:t.defaultAccessoryCode,s=_n.accessories[n];if(!ma.has(s.geometryId)){let r=(async()=>{let o=await fetch(_n.geometries[s.geometryId].model3dUrl,i.has("retry")?{cache:"reload"}:void 0);if(!o.ok)throw Error("Accessory model unavailable");let l=new Uint8Array(await o.arrayBuffer()),a=l[0]===31&&l[1]===139?new Uint8Array(await new Response(new Blob([l]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()):l;return sr(a)})().catch(o=>{throw ma.delete(s.geometryId),o});ma.set(s.geometryId,r)}return{code:n,data:await ma.get(s.geometryId),...s,geometry:_n.geometries[s.geometryId],productModel:t.model}}function lu(i,e){i.startsWith("ferrule-hn6-")||e.quaternion.premultiply(new Lt().setFromAxisAngle(new U(1,0,0),Math.PI)),e.quaternion.premultiply(new Lt().setFromAxisAngle(new U(0,0,1),Math.PI/2))}function Hg(i){i.quaternion.premultiply(new Lt().setFromAxisAngle(new U(0,0,1),-Math.PI/2))}function Vg(i,e){i.updateWorldMatrix(!0,!0),e.updateWorldMatrix(!0,!0);let t=new Mt().setFromObject(i),n=new Mt().setFromObject(e);i.parent&&t.applyMatrix4(new Qe().copy(i.parent.matrixWorld).invert());let s=t.getCenter(new U),r=n.getCenter(new U),o=4;e.position.set(t.max.x+o-n.min.x,s.y-r.y,s.z-r.z),e.userData.gapMillimeters=o}function Vl(i,e,t,n,s,r,o,l){if(!i)return null;let a=new Qt,c=[],u=[];da(i.data,a),Hg(a);for(let M of i.data.meshes){let A=new Pt;A.setAttribute("position",new gt(M.attributes.position.array,3)),M.attributes.normal&&A.setAttribute("normal",new gt(M.attributes.normal.array,3)),A.setIndex(M.index.array),M.attributes.normal||A.computeVertexNormals();let x=ua(M,A,i.finish);n.push(...x),c.push(...x);let w=new ft(A,x);a.add(w);let S=new _i(fa(A),new qn({color:6579551,transparent:!0,opacity:.28}));w.add(S),s.push(S),u.push(S)}Vg(e,a),a.userData.partName=i.model,t.add(a),r.push(a);let f={zh:"\u5916\u5F84",en:"OD",es:"DE",fr:"DE",ko:"\uC678\uACBD",ru:"\u041D\u0430\u0440\u0443\u0436. \xD8"},h=new URLSearchParams(location.search).get("lang"),p=`${f[h]||f.en}${h==="ru"?"":" \xD8"}`,_=pa(o,l,{axes:[0,i.kind==="washer"?1:2],side:"top",verticalSide:"right",offset:24,minSpan:2,diameterAxis:0,diameterLabel:p});_.set(i.data,a);let b=au(o,l,i,a),m=[[e,i.productModel]].map(([M,A])=>{let x=document.createElement("span");return x.className="fitting-part-label",x.textContent=A,o.append(x),{target:M,element:x}}),d=!0;return{geometryId:i.geometryId,setFinish(M){c.forEach(A=>nu(A,M.finish)),a.userData.partName=M.model,a.visible=!0},setDimensionsVisible(M){d=M},update(){_.setVisible(d&&a.visible),_.update(),b?.setVisible(d&&a.visible),b?.update();let M=o.clientWidth,A=o.clientHeight;for(let{target:x,element:w}of m){w.hidden=!x.visible;let S=new Mt().setFromObject(x),C=Array.from({length:8},(R,I)=>new U(I&1?S.max.x:S.min.x,I&2?S.max.y:S.min.y,I&4?S.max.z:S.min.z).project(l)),y=C.reduce((R,I)=>R+I.x,0)/8,E=Math.min(...C.map(R=>R.y));w.style.left=An.clamp((y+1)*M/2,85,M-85)+"px",w.style.top=Math.min(A-26,(1-E)*A/2+70)+"px"}},dispose(){_.dispose(),b?.dispose(),m.forEach(({element:M})=>M.remove()),t.remove(a);for(let[M,A]of[[n,c],[s,u],[r,[a]]])for(let x of A){let w=M.indexOf(x);w>=0&&M.splice(w,1)}a.traverse(M=>{if(M.geometry?.dispose(),M.material)for(let A of Array.isArray(M.material)?M.material:[M.material])A.dispose()})}}}var Gg={washer:"\u57AB\u7247",ferrule:"\u5361\u7B8D",fitting:"\u63A5\u5934",natural:"\u672C\u8272",black:"\u9ED1\u8272",yellow:"\u9EC4\u8272",steel:"SUS \u4E0D\u9508\u94A2",configure:"\u642D\u914D\u9009\u578B",reselect:"\u91CD\u65B0\u9009\u62E9",option:"\u9009\u914D1\uFF1A",optional:"\u53EF\u9009\u914D\u5957\u7684{kind}",paired:"\u914D\u5957{kind}",without:"\u4E0D\u914D\u8D2D{kind}",fittingOnly:"\u4EC5\u8D2D\u4E70\u63A5\u5934",title:"\u786C\u7BA1\u63A5\u5934\u4E0E{kind}\u9009\u578B",description:"\u6BCF\u6B21\u9009\u578B\u642D\u914D\u4E00\u79CD{kind}\u3002\u5982\u9700\u5176\u4ED6\u642D\u914D\uFF0C\u8BF7\u5148\u52A0\u5165\u6E05\u5355\uFF0C\u518D\u9009\u62E9\u4E0B\u4E00\u7EC4\u3002",close:"\u5173\u95ED\u9009\u578B",current:"\u5F53\u524D\u63A5\u5934",code:"\u5546\u54C1\u7F16\u7801",thread:"\u87BA\u7EB9\u89C4\u683C",tube:"\u63A5\u7BA1\u5916\u5F84",bodyMaterial:"\u63A5\u5934\u6750\u8D28",bodyColor:"\u63A5\u5934\u989C\u8272",material:"\u6750\u8D28",color:"\u989C\u8272",chooseMaterial:"\u8BF7\u9009\u62E9{kind}\u6750\u8D28",chooseOne:"\u6BCF\u6B21\u9009\u62E9\u4E00\u79CD\u914D\u5957{kind}",noneThisTime:"\u672C\u6B21\u4E0D\u914D\u8D2D{kind}",configuration:"\u914D\u7F6E\u9009\u62E9",compatibility:"\u9002\u914D {thread} \u87BA\u7EB9 \xB7 {diameters} \u7BA1\u5916\u5F84",pairing:"\u914D\u5957\u65B9\u5F0F",withAccessory:"\u63A5\u5934\uFF0B{kind}",materialSingle:"{kind}\u6750\u8D28\uFF08\u5355\u9009\uFF09",fitsTube:"\u9002\u914D {diameters} \u7BA1\u5916\u5F84",tubeFit:"\u9002\u914D\u7BA1\u5916\u5F84",specs:"{kind}\u89C4\u683C",outer:"\u5916\u5F84",inner:"\u5185\u5F84",height:"\u9AD8\u5EA6",thickness:"\u539A\u5EA6",tubeOd:"\u7BA1\u5916\u5F84",dimensionsNote:"\u5C3A\u5BF8\u968F\u9002\u914D\u578B\u53F7\u786E\u5B9A",selectionNote:"\u4E00\u6B21\u642D\u914D\u4E00\u79CD{kind}\uFF1B\u5982\u9700\u5176\u4ED6\u6750\u8D28\u6216\u7BA1\u5F84\uFF0C\u8BF7\u5148\u5C06\u5F53\u524D\u7EC4\u5408\u52A0\u5165\u6E05\u5355\uFF0C\u518D\u91CD\u65B0\u9009\u62E9\u3002",fittingOnlyNote:"\u4EC5\u8D2D\u4E70\u63A5\u5934\u8868\u793A\u672C\u6B21\u4E0D\u914D\u8D2D{kind}\uFF0C\u88C5\u914D\u65F6\u4ECD\u9700\u4F7F\u7528\u5339\u914D\u7684{kind}\u3002",selected:"\u5DF2\u9009\u7EC4\u5408",copy:"\u590D\u5236\u9009\u578B",copied:"\u5DF2\u590D\u5236",copyFailed:"\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",notIncluded:"\u4E0D\u914D\u8D2D",pendingCode:"\u5F85\u786E\u8BA4",supportBefore:"\u5982\u9700\u9009\u578B\u652F\u6301\uFF0C\u8BF7",contact:"\u8054\u7CFB\u6211\u4EEC",supportAfter:"\uFF0C\u6211\u4EEC\u7684\u6280\u672F\u4EBA\u5458\u53EF\u534F\u52A9\u60A8\u9009\u62E9\u5408\u9002\u7684\u63A5\u5934\u4E0E{kind}\u3002",add:"\u52A0\u5165\u6E05\u5355",added:"\u5DF2\u52A0\u5165\u6E05\u5355",confirm:"\u786E\u8BA4\u5E76\u8FD4\u56DE",source:"\u786C\u7BA1\u63A5\u5934\u914D\u5957\u9009\u578B",accessoryProduct:"{material} {kind}\uFF08\u914D\u5957 {model}\uFF09"},cu={zh:Gg,en:{washer:"Washer",ferrule:"Clamp",fitting:"Fitting",natural:"Natural",black:"Black",yellow:"Yellow",steel:"SUS Stainless Steel",configure:"Select Accessories",reselect:"Change Selection",option:"Option 1:",optional:"Compatible {kind} available",paired:"Matching {kind}",without:"Without {kind}",fittingOnly:"Fitting Only",title:"Rigid Tube Fitting & {kind} Selection",description:"Select one matching {kind} per configuration. Add the current combination to your list before choosing another.",close:"Close Selection",current:"Current Fitting",code:"Product Code",thread:"Thread Size",tube:"Tube OD",bodyMaterial:"Body Material",bodyColor:"Color",material:"Material",color:"Color",chooseMaterial:"Select {kind} material",chooseOne:"Select one matching {kind}",noneThisTime:"No {kind} included",configuration:"Configuration",compatibility:"Fits {thread} threads \xB7 {diameters} tube OD",pairing:"Combination",withAccessory:"Fitting + {kind}",materialSingle:"{kind} Material (Select One)",fitsTube:"For {diameters} tube OD",tubeFit:"Compatible Tube OD",specs:"{kind} Specifications",outer:"Outer Diameter",inner:"Inner Diameter",height:"Height",thickness:"Thickness",tubeOd:"Tube OD",dimensionsNote:"Dimensions depend on the selected model.",selectionNote:"Choose one {kind} at a time. For another material or tube size, add the current combination to your list first.",fittingOnlyNote:"Fitting Only excludes the {kind} from this selection. A compatible {kind} is still required for assembly.",selected:"Selected Combination",copy:"Copy Selection",copied:"Copied",copyFailed:"Copy failed. Try again.",notIncluded:"Not Included",pendingCode:"To Be Confirmed",supportBefore:"For selection support, ",contact:"contact us",supportAfter:". Our technical team can help you select a suitable fitting and {kind}.",add:"Add to List",added:"Added to List",confirm:"Confirm and Return",source:"Rigid Tube Fitting Accessory Selection",accessoryProduct:"{material} {kind} (for {model})"},es:{washer:"Arandela",ferrule:"F\xE9rula",fitting:"Racor",natural:"Natural",black:"Negro",yellow:"Amarillo",steel:"Acero inoxidable SUS",configure:"Elegir accesorios",reselect:"Cambiar selecci\xF3n",option:"Opci\xF3n 1:",optional:"Accesorio compatible disponible: {kind}",paired:"Accesorio: {kind}",without:"Sin {kind}",fittingOnly:"Solo racor",title:"Selecci\xF3n de racor para tubo r\xEDgido y {kind}",description:"Seleccione un accesorio por combinaci\xF3n. A\xF1ada la combinaci\xF3n actual a la lista antes de elegir otra.",close:"Cerrar selecci\xF3n",current:"Racor actual",code:"C\xF3digo de producto",thread:"Tama\xF1o de rosca",tube:"DE del tubo",bodyMaterial:"Material del cuerpo",bodyColor:"Color",material:"Material",color:"Color",chooseMaterial:"Seleccione el material: {kind}",chooseOne:"Seleccione un accesorio compatible: {kind}",noneThisTime:"Sin {kind} en esta selecci\xF3n",configuration:"Configuraci\xF3n",compatibility:"Rosca {thread} \xB7 DE del tubo: {diameters}",pairing:"Combinaci\xF3n",withAccessory:"Racor + {kind}",materialSingle:"Material: {kind} (una opci\xF3n)",fitsTube:"Para tubo de {diameters} de DE",tubeFit:"DE del tubo compatible",specs:"Especificaciones: {kind}",outer:"Di\xE1metro exterior",inner:"Di\xE1metro interior",height:"Altura",thickness:"Espesor",tubeOd:"DE del tubo",dimensionsNote:"Las dimensiones dependen del modelo seleccionado.",selectionNote:"Seleccione un accesorio cada vez. Para otro material o di\xE1metro de tubo, a\xF1ada primero la combinaci\xF3n actual a la lista.",fittingOnlyNote:"\xABSolo racor\xBB excluye el accesorio de esta selecci\xF3n. El montaje sigue requiriendo un accesorio compatible: {kind}.",selected:"Combinaci\xF3n seleccionada",copy:"Copiar selecci\xF3n",copied:"Copiado",copyFailed:"No se pudo copiar. Int\xE9ntelo de nuevo.",notIncluded:"No incluido",pendingCode:"Por confirmar",supportBefore:"Si necesita ayuda, ",contact:"cont\xE1ctenos",supportAfter:". Nuestro equipo t\xE9cnico le ayudar\xE1 a seleccionar el racor y el accesorio compatible.",add:"A\xF1adir a la lista",added:"A\xF1adido a la lista",confirm:"Confirmar y volver",source:"Selecci\xF3n de accesorios para racores de tubo r\xEDgido",accessoryProduct:"{kind} de {material} (para {model})"},fr:{washer:"Rondelle",ferrule:"Bague",fitting:"Raccord",natural:"Naturel",black:"Noir",yellow:"Jaune",steel:"Acier inoxydable SUS",configure:"Choisir les accessoires",reselect:"Modifier la s\xE9lection",option:"Option 1 :",optional:"Accessoire compatible disponible : {kind}",paired:"Accessoire : {kind}",without:"Sans {kind}",fittingOnly:"Raccord seul",title:"S\xE9lection du raccord pour tube rigide et de la {kind}",description:"S\xE9lectionnez un accessoire par combinaison. Ajoutez la combinaison actuelle \xE0 la liste avant d\u2019en choisir une autre.",close:"Fermer la s\xE9lection",current:"Raccord actuel",code:"Code produit",thread:"Dimension du filetage",tube:"DE du tube",bodyMaterial:"Mat\xE9riau du corps",bodyColor:"Couleur",material:"Mat\xE9riau",color:"Couleur",chooseMaterial:"Choisir le mat\xE9riau : {kind}",chooseOne:"S\xE9lectionner un accessoire compatible : {kind}",noneThisTime:"Sans {kind} dans cette s\xE9lection",configuration:"Configuration",compatibility:"Filetage {thread} \xB7 DE du tube : {diameters}",pairing:"Combinaison",withAccessory:"Raccord + {kind}",materialSingle:"Mat\xE9riau : {kind} (un choix)",fitsTube:"Pour tube de {diameters} de DE",tubeFit:"DE du tube compatible",specs:"Caract\xE9ristiques : {kind}",outer:"Diam\xE8tre ext\xE9rieur",inner:"Diam\xE8tre int\xE9rieur",height:"Hauteur",thickness:"\xC9paisseur",tubeOd:"DE du tube",dimensionsNote:"Les dimensions d\xE9pendent du mod\xE8le s\xE9lectionn\xE9.",selectionNote:"S\xE9lectionnez un seul accessoire \xE0 la fois. Pour un autre mat\xE9riau ou diam\xE8tre de tube, ajoutez d\u2019abord la combinaison actuelle \xE0 la liste.",fittingOnlyNote:"\xAB Raccord seul \xBB exclut l\u2019accessoire de cette s\xE9lection. Le montage n\xE9cessite toujours un accessoire compatible : {kind}.",selected:"Combinaison s\xE9lectionn\xE9e",copy:"Copier la s\xE9lection",copied:"Copi\xE9",copyFailed:"\xC9chec de la copie. R\xE9essayez.",notIncluded:"Non inclus",pendingCode:"\xC0 confirmer",supportBefore:"Pour obtenir de l\u2019aide, ",contact:"contactez-nous",supportAfter:". Notre \xE9quipe technique vous aidera \xE0 choisir le raccord et l\u2019accessoire adapt\xE9s.",add:"Ajouter \xE0 la liste",added:"Ajout\xE9 \xE0 la liste",confirm:"Confirmer et revenir",source:"S\xE9lection d\u2019accessoires pour raccords de tube rigide",accessoryProduct:"{kind} en {material} (pour {model})"},ko:{washer:"\uC640\uC154",ferrule:"\uD398\uB8F0",fitting:"\uD53C\uD305",natural:"\uB0B4\uCD94\uB7F4",black:"\uAC80\uC815",yellow:"\uB178\uB791",steel:"SUS \uC2A4\uD14C\uC778\uB9AC\uC2A4\uAC15",configure:"\uC561\uC138\uC11C\uB9AC \uC120\uD0DD",reselect:"\uC120\uD0DD \uBCC0\uACBD",option:"\uC635\uC158 1:",optional:"\uD638\uD658 {kind} \uC120\uD0DD \uAC00\uB2A5",paired:"\uD638\uD658 {kind}",without:"{kind} \uC81C\uC678",fittingOnly:"\uD53C\uD305\uB9CC \uC120\uD0DD",title:"\uACBD\uC9C8 \uD29C\uBE0C \uD53C\uD305 \uBC0F {kind} \uC120\uD0DD",description:"\uAD6C\uC131\uB9C8\uB2E4 \uD638\uD658 \uC561\uC138\uC11C\uB9AC \uD558\uB098\uB97C \uC120\uD0DD\uD558\uC138\uC694. \uB2E4\uB978 \uAD6C\uC131\uC744 \uC120\uD0DD\uD558\uB824\uBA74 \uD604\uC7AC \uAD6C\uC131\uC744 \uBA3C\uC800 \uBAA9\uB85D\uC5D0 \uCD94\uAC00\uD558\uC138\uC694.",close:"\uC120\uD0DD \uCC3D \uB2EB\uAE30",current:"\uD604\uC7AC \uD53C\uD305",code:"\uC81C\uD488 \uCF54\uB4DC",thread:"\uB098\uC0AC \uADDC\uACA9",tube:"\uD29C\uBE0C \uC678\uACBD",bodyMaterial:"\uBCF8\uCCB4 \uC7AC\uC9C8",bodyColor:"\uC0C9\uC0C1",material:"\uC7AC\uC9C8",color:"\uC0C9\uC0C1",chooseMaterial:"{kind} \uC7AC\uC9C8 \uC120\uD0DD",chooseOne:"\uD638\uD658 {kind} \uD558\uB098 \uC120\uD0DD",noneThisTime:"\uC774\uBC88 \uC120\uD0DD\uC5D0\uC11C {kind} \uC81C\uC678",configuration:"\uAD6C\uC131 \uC120\uD0DD",compatibility:"{thread} \uB098\uC0AC \xB7 \uD29C\uBE0C \uC678\uACBD {diameters}",pairing:"\uAD6C\uC131 \uBC29\uC2DD",withAccessory:"\uD53C\uD305 + {kind}",materialSingle:"{kind} \uC7AC\uC9C8 (\uB2E8\uC77C \uC120\uD0DD)",fitsTube:"\uC678\uACBD {diameters} \uD29C\uBE0C\uC6A9",tubeFit:"\uD638\uD658 \uD29C\uBE0C \uC678\uACBD",specs:"{kind} \uC0AC\uC591",outer:"\uC678\uACBD",inner:"\uB0B4\uACBD",height:"\uB192\uC774",thickness:"\uB450\uAED8",tubeOd:"\uD29C\uBE0C \uC678\uACBD",dimensionsNote:"\uCE58\uC218\uB294 \uC120\uD0DD\uD55C \uBAA8\uB378\uC5D0 \uB530\uB77C \uACB0\uC815\uB429\uB2C8\uB2E4.",selectionNote:"\uC561\uC138\uC11C\uB9AC\uB294 \uD55C \uBC88\uC5D0 \uD558\uB098\uC529 \uC120\uD0DD\uD558\uC138\uC694. \uB2E4\uB978 \uC7AC\uC9C8\uC774\uB098 \uD29C\uBE0C \uC678\uACBD\uC744 \uC120\uD0DD\uD558\uB824\uBA74 \uD604\uC7AC \uAD6C\uC131\uC744 \uBA3C\uC800 \uBAA9\uB85D\uC5D0 \uCD94\uAC00\uD558\uC138\uC694.",fittingOnlyNote:"\u2018\uD53C\uD305\uB9CC \uC120\uD0DD\u2019\uC740 \uC774\uBC88 \uAD6C\uC131\uC5D0\uC11C {kind}\uC744(\uB97C) \uC81C\uC678\uD569\uB2C8\uB2E4. \uC870\uB9BD\uD560 \uB54C\uB294 \uD638\uD658 {kind}\uC774(\uAC00) \uD544\uC694\uD569\uB2C8\uB2E4.",selected:"\uC120\uD0DD\uD55C \uAD6C\uC131",copy:"\uC120\uD0DD \uB0B4\uC6A9 \uBCF5\uC0AC",copied:"\uBCF5\uC0AC\uB428",copyFailed:"\uBCF5\uC0AC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",notIncluded:"\uBBF8\uD3EC\uD568",pendingCode:"\uD655\uC778 \uD544\uC694",supportBefore:"\uC120\uC815 \uC9C0\uC6D0\uC774 \uD544\uC694\uD558\uBA74 ",contact:"\uBB38\uC758\uD574 \uC8FC\uC138\uC694",supportAfter:". \uAE30\uC220\uD300\uC774 \uC801\uD569\uD55C \uD53C\uD305\uACFC \uC561\uC138\uC11C\uB9AC \uC120\uC815\uC744 \uB3C4\uC640\uB4DC\uB9BD\uB2C8\uB2E4.",add:"\uBAA9\uB85D\uC5D0 \uCD94\uAC00",added:"\uBAA9\uB85D\uC5D0 \uCD94\uAC00\uB428",confirm:"\uD655\uC778 \uD6C4 \uB3CC\uC544\uAC00\uAE30",source:"\uACBD\uC9C8 \uD29C\uBE0C \uD53C\uD305 \uC561\uC138\uC11C\uB9AC \uC120\uD0DD",accessoryProduct:"{material} {kind} ({model}\uC6A9)"},ru:{washer:"\u0428\u0430\u0439\u0431\u0430",ferrule:"\u0424\u0435\u0440\u0440\u0443\u043B\u0430",fitting:"\u0424\u0438\u0442\u0438\u043D\u0433",natural:"\u041D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439",black:"\u0427\u0451\u0440\u043D\u044B\u0439",yellow:"\u0416\u0451\u043B\u0442\u044B\u0439",steel:"\u041D\u0435\u0440\u0436\u0430\u0432\u0435\u044E\u0449\u0430\u044F \u0441\u0442\u0430\u043B\u044C SUS",configure:"\u041F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442",reselect:"\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440",option:"\u041E\u043F\u0446\u0438\u044F 1:",optional:"\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0439 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442: {kind}",paired:"\u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442: {kind}",without:"\u0411\u0435\u0437 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430: {kind}",fittingOnly:"\u0422\u043E\u043B\u044C\u043A\u043E \u0444\u0438\u0442\u0438\u043D\u0433",title:"\u041F\u043E\u0434\u0431\u043E\u0440 \u0444\u0438\u0442\u0438\u043D\u0433\u0430 \u0434\u043B\u044F \u0436\u0451\u0441\u0442\u043A\u043E\u0439 \u0442\u0440\u0443\u0431\u043A\u0438 \u0438 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430: {kind}",description:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 \u0434\u043B\u044F \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0430. \u041F\u0435\u0440\u0435\u0434 \u0432\u044B\u0431\u043E\u0440\u043E\u043C \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0432 \u0441\u043F\u0438\u0441\u043E\u043A.",close:"\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u0434\u0431\u043E\u0440",current:"\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0444\u0438\u0442\u0438\u043D\u0433",code:"\u041A\u043E\u0434 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430",thread:"\u0420\u0430\u0437\u043C\u0435\u0440 \u0440\u0435\u0437\u044C\u0431\u044B",tube:"\u041D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440 \u0442\u0440\u0443\u0431\u043A\u0438",bodyMaterial:"\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u043A\u043E\u0440\u043F\u0443\u0441\u0430",bodyColor:"\u0426\u0432\u0435\u0442",material:"\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B",color:"\u0426\u0432\u0435\u0442",chooseMaterial:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B: {kind}",chooseOne:"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442: {kind}",noneThisTime:"\u041A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 \u043D\u0435 \u0432\u043A\u043B\u044E\u0447\u0451\u043D: {kind}",configuration:"\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F",compatibility:"\u0420\u0435\u0437\u044C\u0431\u0430 {thread} \xB7 \u041D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440 \u0442\u0440\u0443\u0431\u043A\u0438: {diameters}",pairing:"\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0442",withAccessory:"\u0424\u0438\u0442\u0438\u043D\u0433 + {kind}",materialSingle:"\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B: {kind} (\u043E\u0434\u0438\u043D \u0432\u0430\u0440\u0438\u0430\u043D\u0442)",fitsTube:"\u0414\u043B\u044F \u0442\u0440\u0443\u0431\u043A\u0438 \u0441 \u043D\u0430\u0440\u0443\u0436\u043D\u044B\u043C \u0434\u0438\u0430\u043C\u0435\u0442\u0440\u043E\u043C {diameters}",tubeFit:"\u0421\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B\u0439 \u043D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440 \u0442\u0440\u0443\u0431\u043A\u0438",specs:"\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438: {kind}",outer:"\u041D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440",inner:"\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440",height:"\u0412\u044B\u0441\u043E\u0442\u0430",thickness:"\u0422\u043E\u043B\u0449\u0438\u043D\u0430",tubeOd:"\u041D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440 \u0442\u0440\u0443\u0431\u043A\u0438",dimensionsNote:"\u0420\u0430\u0437\u043C\u0435\u0440\u044B \u0437\u0430\u0432\u0438\u0441\u044F\u0442 \u043E\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438.",selectionNote:"\u0412\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435 \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0443. \u0414\u043B\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 \u0438\u043B\u0438 \u0434\u0438\u0430\u043C\u0435\u0442\u0440\u0430 \u0442\u0440\u0443\u0431\u043A\u0438 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442 \u0432 \u0441\u043F\u0438\u0441\u043E\u043A.",fittingOnlyNote:"\u0412\u0430\u0440\u0438\u0430\u043D\u0442 \xAB\u0422\u043E\u043B\u044C\u043A\u043E \u0444\u0438\u0442\u0438\u043D\u0433\xBB \u043D\u0435 \u0432\u043A\u043B\u044E\u0447\u0430\u0435\u0442 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442. \u0414\u043B\u044F \u0441\u0431\u043E\u0440\u043A\u0438 \u043F\u043E-\u043F\u0440\u0435\u0436\u043D\u0435\u043C\u0443 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442: {kind}.",selected:"\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u043C\u043F\u043B\u0435\u043A\u0442",copy:"\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0431\u043E\u0440",copied:"\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E",copyFailed:"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",notIncluded:"\u041D\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E",pendingCode:"\u0423\u0442\u043E\u0447\u043D\u044F\u0435\u0442\u0441\u044F",supportBefore:"\u0414\u043B\u044F \u043F\u043E\u043C\u043E\u0449\u0438 \u0441 \u043F\u043E\u0434\u0431\u043E\u0440\u043E\u043C ",contact:"\u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438",supportAfter:". \u041D\u0430\u0448\u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B \u043F\u043E\u043C\u043E\u0433\u0443\u0442 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0444\u0438\u0442\u0438\u043D\u0433 \u0438 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442.",add:"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0441\u043F\u0438\u0441\u043E\u043A",added:"\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0432 \u0441\u043F\u0438\u0441\u043E\u043A",confirm:"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0438 \u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F",source:"\u041F\u043E\u0434\u0431\u043E\u0440 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043E\u0432 \u0434\u043B\u044F \u0444\u0438\u0442\u0438\u043D\u0433\u0430 \u0436\u0451\u0441\u0442\u043A\u043E\u0439 \u0442\u0440\u0443\u0431\u043A\u0438",accessoryProduct:"{kind}, {material} (\u0434\u043B\u044F {model})"}};function Gl(i="zh"){return cu[i]||cu.zh}function hu(i,e="zh"){let t=Gl(e);return i==="\u57AB\u7247"||i==="washer"?t.washer:t.ferrule}var uu={zh:{washer:"\u57AB\u7247\u9009\u62E9",ferrule:"\u5361\u7B8D\u9009\u62E9",none:"\u4EC5\u663E\u793A\u63A5\u5934",current:"\u5F53\u524D\u914D\u5957\u4EF6",outer:"\u5916\u5F84",inner:"\u5185\u5F84",height:"\u9AD8\u5EA6",thickness:"\u539A\u5EA6",tube:"\u9002\u914D\u7BA1\u5916\u5F84",natural:"\u672C\u8272",yellow:"\u9EC4\u8272",loading:"\u6B63\u5728\u5207\u6362\u914D\u5957\u4EF6\u2026",error:"\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002"},en:{washer:"Washer selection",ferrule:"Ferrule selection",none:"Fitting only",current:"Selected part",outer:"Outer diameter",inner:"Inner diameter",height:"Height",thickness:"Thickness",tube:"Tube OD",natural:"Natural",yellow:"Yellow",loading:"Loading selected part\u2026",error:"Unable to load. Please select again."},es:{washer:"Selecci\xF3n de arandela",ferrule:"Selecci\xF3n de f\xE9rula",none:"Solo racor",current:"Pieza seleccionada",outer:"Di\xE1metro exterior",inner:"Di\xE1metro interior",height:"Altura",thickness:"Espesor",tube:"DE del tubo",natural:"Natural",yellow:"Amarillo",loading:"Cargando la pieza\u2026",error:"No se pudo cargar. Seleccione de nuevo."},fr:{washer:"Choix de rondelle",ferrule:"Choix de bague",none:"Raccord seul",current:"Pi\xE8ce s\xE9lectionn\xE9e",outer:"Diam\xE8tre ext\xE9rieur",inner:"Diam\xE8tre int\xE9rieur",height:"Hauteur",thickness:"\xC9paisseur",tube:"DE du tube",natural:"Naturel",yellow:"Jaune",loading:"Chargement de la pi\xE8ce\u2026",error:"\xC9chec du chargement. S\xE9lectionnez \xE0 nouveau."},ko:{washer:"\uC640\uC154 \uC120\uD0DD",ferrule:"\uD398\uB8F0 \uC120\uD0DD",none:"\uD53C\uD305\uB9CC \uD45C\uC2DC",current:"\uC120\uD0DD\uD55C \uBD80\uD488",outer:"\uC678\uACBD",inner:"\uB0B4\uACBD",height:"\uB192\uC774",thickness:"\uB450\uAED8",tube:"\uD29C\uBE0C \uC678\uACBD",natural:"\uC790\uC5F0\uC0C9",yellow:"\uB178\uB780\uC0C9",loading:"\uBD80\uD488 \uBD88\uB7EC\uC624\uB294 \uC911\u2026",error:"\uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC120\uD0DD\uD558\uC138\uC694."},ru:{washer:"\u0412\u044B\u0431\u043E\u0440 \u0448\u0430\u0439\u0431\u044B",ferrule:"\u0412\u044B\u0431\u043E\u0440 \u0444\u0435\u0440\u0440\u0443\u043B\u044B",none:"\u0422\u043E\u043B\u044C\u043A\u043E \u0444\u0438\u0442\u0438\u043D\u0433",current:"\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u0434\u0435\u0442\u0430\u043B\u044C",outer:"\u041D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440",inner:"\u0412\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440",height:"\u0412\u044B\u0441\u043E\u0442\u0430",thickness:"\u0422\u043E\u043B\u0449\u0438\u043D\u0430",tube:"\u041D\u0430\u0440\u0443\u0436\u043D\u044B\u0439 \u0434\u0438\u0430\u043C\u0435\u0442\u0440 \u0442\u0440\u0443\u0431\u043A\u0438",natural:"\u041D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0439",yellow:"\u0416\u0451\u043B\u0442\u044B\u0439",loading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0435\u0442\u0430\u043B\u0438\u2026",error:"\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043D\u043E\u0432\u0430."}},Wg={SS:"SUS",PK:"PEEK",PT:"PTFE",ET:"ETFE",PP:"PP"},du=i=>Number(i.toFixed(2))+" mm";function fu(i,e){let t=er(i);if(!t)return null;let n=uu[i.get("lang")]||uu.en,s=i.get("lang")||"en",r=Gl(s),o={zh:"{kind}\u9009\u62E9",en:"{kind} selection",es:"Selecci\xF3n: {kind}",fr:"Choix : {kind}",ko:"{kind} \uC120\uD0DD",ru:"\u0412\u044B\u0431\u043E\u0440: {kind}"},l=(o[s]||o.en).replace("{kind}",hu(t.options[0].kind,s)),a=document.createElement("aside");a.className="fitting-selector",a.setAttribute("aria-label",l);let c=document.createElement("h2");c.textContent=l;let u=document.createElement("select");u.className="fitting-mobile-select",u.setAttribute("aria-label",l);let f=document.createElement("div");f.className="fitting-choices",f.setAttribute("role","radiogroup"),f.setAttribute("aria-label",l);let h=document.createElement("div");h.className="fitting-selected-detail";let p=document.createElement("p");p.className="fitting-selection-status",p.setAttribute("role","status");let _=[],b=[...t.options,{code:"none",model:n.none}];b.forEach((d,M)=>{let A=document.createElement("option");A.value=d.code,A.textContent=d.model,u.append(A);let x=document.createElement("button");x.type="button",x.setAttribute("role","radio"),x.dataset.accessoryCode=d.code;let w=document.createElement("strong");if(w.textContent=d.model,x.append(w),d.kind){let S=d.model.split("-"),C=Wg[S.at(-2)]||(d.finish==="steel"?"SUS":""),y=document.createElement("span");y.textContent=d.kind==="ferrule"?`${C} \xB7 ${S.at(-1)==="Y"?r.yellow:r.natural} \xB7 ${du(Number(S[2])/10)}`:C,x.append(y)}x.onclick=()=>e(d.code),x.onkeydown=S=>{let C=M;if(["ArrowDown","ArrowRight"].includes(S.key))C=(M+1)%b.length;else if(["ArrowUp","ArrowLeft"].includes(S.key))C=(M+b.length-1)%b.length;else if(S.key==="Home")C=0;else if(S.key==="End")C=b.length-1;else return;S.preventDefault(),_[C].focus(),e(b[C].code)},f.append(x),_.push(x)}),u.onchange=()=>e(u.value),a.append(c,u,f,h,p),document.getElementById("viewer").append(a),document.getElementById("viewer").classList.add("has-fitting-selector");function m(d,M){if(u.value=d,_.forEach(A=>{let x=A.dataset.accessoryCode===d;A.setAttribute("aria-checked",String(x)),A.tabIndex=x?0:-1}),h.replaceChildren(),M){let A=document.createElement("h3");A.textContent=n.current;let x=document.createElement("strong");x.textContent=M.model;let w=document.createElement("dl"),S=M.data.dimensions.size,C=M.geometry,y=M.kind==="washer"?[[n.outer,C.outerDiameter],[n.inner,C.innerDiameter],[n.thickness,C.thickness]]:[[n.outer,S[0]],[n.inner,C.innerDiameter],[n.height,S[2]],[n.tube,Number(M.model.split("-")[2])/10]];for(let[E,R]of y){let I=document.createElement("div"),F=document.createElement("dt"),O=document.createElement("dd");F.textContent=E,O.textContent=du(R),I.append(F,O),w.append(I)}h.append(A,x,w)}p.textContent="",a.setAttribute("aria-busy","false")}return{setSelection:m,pending(){a.setAttribute("aria-busy","true"),p.textContent=n.loading},error(){a.setAttribute("aria-busy","false"),p.textContent=n.error}}}var li=new URLSearchParams(location.search).get("lang")||"en",pu={zh:["\u590D\u4F4D","\u81EA\u52A8\u65CB\u8F6C","\u9002\u5E94\u7A97\u53E3","\u64CD\u4F5C\u5E2E\u52A9","\u5168\u5C4F","\u6A21\u578B\u7ED3\u6784","\u5916\u5F62\u5C3A\u5BF8\uFF08\u4E0D\u542B\u7535\u7EBF\uFF09","\u89C2\u5BDF\u89C6\u89D2","\u663E\u793A\u6837\u5F0F","\u7B49\u8F74\u6D4B|\u6B63\u89C6\u56FE|\u540E\u89C6\u56FE|\u53F3\u89C6\u56FE|\u5DE6\u89C6\u56FE|\u4FEF\u89C6\u56FE|\u4EF0\u89C6\u56FE","\u5E26\u8FB9\u7EBF|\u5B9E\u4F53|\u7EBF\u6846","\u62D6\u52A8\u65CB\u8F6C\uFF1B\u6EDA\u8F6E\u6216\u53CC\u6307\u7F29\u653E\u3002\u5C3A\u5BF8\u6309\u6A21\u578B\u6D4B\u91CF\uFF0C\u4E0D\u542B\u7535\u7EBF\u3002","\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5","\u52A0\u8F7D\u4E2D\u2026"],en:["Reset","Auto rotate","Fit","Help","Fullscreen","Parts","Dimensions (excluding wires)","View","Display","Isometric|Front|Back|Right|Left|Top|Bottom","Edges|Solid|Wireframe","Drag to rotate; scroll or pinch to zoom. Model dimensions exclude wires.","Unable to load. Retry","Loading\u2026"],es:["Restablecer","Giro autom\xE1tico","Ajustar","Ayuda","Pantalla completa","Piezas","Cotas sin cables","Vista","Estilo","Isom\xE9trica|Frontal|Posterior|Derecha|Izquierda|Superior|Inferior","Aristas|S\xF3lido|Alambre","Arrastre para girar; rueda o pellizco para ampliar. Cotas del modelo sin cables.","No se pudo cargar. Reintentar","Cargando\u2026"],fr:["R\xE9initialiser","Rotation automatique","Ajuster","Aide","Plein \xE9cran","Pi\xE8ces","Dimensions hors c\xE2bles","Vue","Affichage","Isom\xE9trique|Face|Arri\xE8re|Droite|Gauche|Dessus|Dessous","Ar\xEAtes|Solide|Filaire","Glissez pour tourner ; molette ou pincement pour zoomer. Dimensions du mod\xE8le hors c\xE2bles.","Chargement impossible. R\xE9essayer","Chargement\u2026"],ko:["\uCD08\uAE30\uD654","\uC790\uB3D9 \uD68C\uC804","\uD654\uBA74 \uB9DE\uCDA4","\uB3C4\uC6C0\uB9D0","\uC804\uCCB4 \uD654\uBA74","\uBD80\uD488","\uC678\uD615 \uCE58\uC218 (\uC804\uC120 \uC81C\uC678)","\uC2DC\uC810","\uD45C\uC2DC","\uB4F1\uAC01|\uC815\uBA74|\uD6C4\uBA74|\uC6B0\uCE21|\uC88C\uCE21|\uC0C1\uB2E8|\uD558\uB2E8","\uBAA8\uC11C\uB9AC|\uC194\uB9AC\uB4DC|\uC640\uC774\uC5B4\uD504\uB808\uC784","\uB4DC\uB798\uADF8\uD558\uC5EC \uD68C\uC804\uD558\uACE0 \uD720 \uB610\uB294 \uB450 \uC190\uAC00\uB77D\uC73C\uB85C \uD655\uB300\uD569\uB2C8\uB2E4. \uBAA8\uB378 \uCE58\uC218\uB294 \uC804\uC120\uC744 \uC81C\uC678\uD569\uB2C8\uB2E4.","\uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328. \uB2E4\uC2DC \uC2DC\uB3C4","\uBD88\uB7EC\uC624\uB294 \uC911\u2026"],ru:["\u0421\u0431\u0440\u043E\u0441","\u0410\u0432\u0442\u043E\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0435","\u0412\u043F\u0438\u0441\u0430\u0442\u044C","\u0421\u043F\u0440\u0430\u0432\u043A\u0430","\u041F\u043E\u043B\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D","\u0414\u0435\u0442\u0430\u043B\u0438","\u0413\u0430\u0431\u0430\u0440\u0438\u0442\u044B \u0431\u0435\u0437 \u043F\u0440\u043E\u0432\u043E\u0434\u043E\u0432","\u0412\u0438\u0434","\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435","\u0418\u0437\u043E\u043C\u0435\u0442\u0440\u0438\u044F|\u0421\u043F\u0435\u0440\u0435\u0434\u0438|\u0421\u0437\u0430\u0434\u0438|\u0421\u043F\u0440\u0430\u0432\u0430|\u0421\u043B\u0435\u0432\u0430|\u0421\u0432\u0435\u0440\u0445\u0443|\u0421\u043D\u0438\u0437\u0443","\u0420\u0451\u0431\u0440\u0430|\u0421\u043F\u043B\u043E\u0448\u043D\u043E\u0439|\u041A\u0430\u0440\u043A\u0430\u0441","\u041F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0439\u0442\u0435 \u0434\u043B\u044F \u0432\u0440\u0430\u0449\u0435\u043D\u0438\u044F; \u043A\u043E\u043B\u0435\u0441\u043E \u0438\u043B\u0438 \u0449\u0438\u043F\u043E\u043A \u0434\u043B\u044F \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0430. \u0420\u0430\u0437\u043C\u0435\u0440\u044B \u043C\u043E\u0434\u0435\u043B\u0438 \u0431\u0435\u0437 \u043F\u0440\u043E\u0432\u043E\u0434\u043E\u0432.","\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C","\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430\u2026"]},qt=pu[li]||pu.en,Xg={retry:qt[12]},gu=["rpl-p4","rpl-p635","rpl-p15","drpl-0109"],_u=["dpl30-db","dpl30-bb","dpl60-db","dpl60-bb","dpl30h-ds","dpl30h-bs","dpgl800-bs"],xu=[...[50,100,250,500,1e3,2500,5e3,1e4,2e4].map(i=>"ea-"+i),...[50,100,250,500,1e3].map(i=>"sm-"+i),...[50,100,250,500].map(i=>"tm-"+i)],ga=xu.includes(new URLSearchParams(location.search).get("model")),yu=["smtp2-500","smtp2-510","smtp2-520","smtp4-100ul","smtp4-250ul","smtp4-500ul"],_a=yu.includes(new URLSearchParams(location.search).get("model")),vu=gu.includes(new URLSearchParams(location.search).get("model")),tr=parent!==window&&new URLSearchParams(location.search).get("loader")==="parent",ai=_u.includes(new URLSearchParams(location.search).get("model")),Wl=vu||ai||ga||_a,bu=[...new Set(Object.values(_n.products).map(i=>i.viewerId))],Xt=bu.includes(new URLSearchParams(location.search).get("model")),qg=Xt&&new URLSearchParams(location.search).get("model")?.startsWith("flat-bottom-");if(Wl||Xt){let i={zh:["\u6A21\u578B\u5916\u5F62\u5C3A\u5BF8","\u62D6\u52A8\u65CB\u8F6C\uFF1B\u6EDA\u8F6E\u6216\u53CC\u6307\u7F29\u653E\u3002\u5C3A\u5BF8\u6309\u5F53\u524D\u6A21\u578B\u6D4B\u91CF\uFF0C\u5B89\u88C5\u5C3A\u5BF8\u8BF7\u67E5\u770B\u539F\u59CB\u4E8C\u7EF4\u56FE\u7EB8\u3002"],en:["Model envelope dimensions","Drag to rotate; scroll or pinch to zoom. Dimensions are measured from this model. Refer to the original drawing for mounting dimensions."],es:["Dimensiones del modelo","Arrastre para girar; rueda o pellizco para ampliar. Las dimensiones se miden en este modelo. Consulte el plano original para las dimensiones de montaje."],fr:["Dimensions du mod\xE8le","Glissez pour tourner ; molette ou pincement pour zoomer. Les dimensions sont mesur\xE9es sur ce mod\xE8le. Consultez le plan original pour les dimensions de montage."],ko:["\uBAA8\uB378 \uC678\uD615 \uCE58\uC218","\uB4DC\uB798\uADF8\uD558\uC5EC \uD68C\uC804\uD558\uACE0 \uD720 \uB610\uB294 \uB450 \uC190\uAC00\uB77D\uC73C\uB85C \uD655\uB300\uD569\uB2C8\uB2E4. \uCE58\uC218\uB294 \uC774 \uBAA8\uB378 \uAE30\uC900\uC785\uB2C8\uB2E4. \uC124\uCE58 \uCE58\uC218\uB294 \uC6D0\uBCF8 2D \uB3C4\uBA74\uC744 \uD655\uC778\uD558\uC138\uC694."],ru:["\u0413\u0430\u0431\u0430\u0440\u0438\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438","\u041F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0439\u0442\u0435 \u0434\u043B\u044F \u0432\u0440\u0430\u0449\u0435\u043D\u0438\u044F; \u043A\u043E\u043B\u0435\u0441\u043E \u0438\u043B\u0438 \u0449\u0438\u043F\u043E\u043A \u0434\u043B\u044F \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0430. \u0420\u0430\u0437\u043C\u0435\u0440\u044B \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u044B \u043F\u043E \u044D\u0442\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438. \u041C\u043E\u043D\u0442\u0430\u0436\u043D\u044B\u0435 \u0440\u0430\u0437\u043C\u0435\u0440\u044B \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043D\u0430 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0447\u0435\u0440\u0442\u0435\u0436\u0435."]};if([qt[6],qt[11]]=i[li]||i.en,Xt){let e={zh:["\u63A5\u5934\u4E0E\u914D\u5957\u4EF6\u5C3A\u5BF8","\u62D6\u52A8\u65CB\u8F6C\uFF1B\u6EDA\u8F6E\u6216\u53CC\u6307\u7F29\u653E\u3002\u5DE6\u4FA7\u5207\u6362\u914D\u5957\u4EF6\u3002\u63A5\u5934\u6A2A\u5411\u653E\u7F6E\uFF0C\u914D\u5957\u4EF6\u4F4D\u4E8E\u5B54\u53E3\u524D\u65B9\u5E76\u7559\u6709\u95F4\u9699\uFF0C\u5206\u522B\u6807\u6CE8\u5C3A\u5BF8\u3002\u5B89\u88C5\u5C3A\u5BF8\u8BF7\u67E5\u770B\u539F\u59CB\u4E8C\u7EF4\u56FE\u7EB8\u3002"],en:["Fitting and accessory dimensions","Drag to rotate; scroll or pinch to zoom. Select a matching part on the left. The fitting is horizontal, with the accessory aligned in front of the opening, a gap between them and separate dimensions. Refer to the original drawing for mounting dimensions."],es:["Dimensiones del racor y accesorio","Arrastre para girar; rueda o pellizco para ampliar. Seleccione la pieza a la izquierda. El racor y el accesorio est\xE1n alineados, separados y acotados individualmente. Consulte el plano original para el montaje."],fr:["Dimensions du raccord et de la pi\xE8ce","Glissez pour tourner ; molette ou pincement pour zoomer. S\xE9lectionnez la pi\xE8ce \xE0 gauche. Les pi\xE8ces sont coaxiales, espac\xE9es et cot\xE9es s\xE9par\xE9ment. Consultez le plan original pour le montage."],ko:["\uD53C\uD305 \uBC0F \uBD80\uC18D\uD488 \uCE58\uC218","\uB4DC\uB798\uADF8\uD558\uC5EC \uD68C\uC804\uD558\uACE0 \uD720 \uB610\uB294 \uB450 \uC190\uAC00\uB77D\uC73C\uB85C \uD655\uB300\uD569\uB2C8\uB2E4. \uC67C\uCABD\uC5D0\uC11C \uBD80\uC18D\uD488\uC744 \uC120\uD0DD\uD558\uC138\uC694. \uBD80\uD488\uC740 \uAC19\uC740 \uCD95\uC5D0 \uAC04\uACA9\uC744 \uB450\uACE0 \uBC30\uCE58\uB418\uBA70 \uCE58\uC218\uB294 \uAC01\uAC01 \uD45C\uC2DC\uB429\uB2C8\uB2E4. \uC124\uCE58 \uCE58\uC218\uB294 \uC6D0\uBCF8 \uB3C4\uBA74\uC744 \uD655\uC778\uD558\uC138\uC694."],ru:["\u0420\u0430\u0437\u043C\u0435\u0440\u044B \u0444\u0438\u0442\u0438\u043D\u0433\u0430 \u0438 \u0434\u0435\u0442\u0430\u043B\u0438","\u041F\u0435\u0440\u0435\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0439\u0442\u0435 \u0434\u043B\u044F \u0432\u0440\u0430\u0449\u0435\u043D\u0438\u044F; \u043A\u043E\u043B\u0435\u0441\u043E \u0438\u043B\u0438 \u0449\u0438\u043F\u043E\u043A \u0434\u043B\u044F \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0430. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u0442\u0430\u043B\u044C \u0441\u043B\u0435\u0432\u0430. \u0414\u0435\u0442\u0430\u043B\u0438 \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u044B \u0441\u043E\u043E\u0441\u043D\u043E \u0441 \u0437\u0430\u0437\u043E\u0440\u043E\u043C \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u0440\u0430\u0437\u043C\u0435\u0440\u0430\u043C\u0438. \u041C\u043E\u043D\u0442\u0430\u0436\u043D\u044B\u0435 \u0440\u0430\u0437\u043C\u0435\u0440\u044B \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043D\u0430 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0447\u0435\u0440\u0442\u0435\u0436\u0435."]};[qt[6],qt[11]]=e[li]||e.en}document.title=ai||ga||_a?"FOREACH "+new URLSearchParams(location.search).get("model").toUpperCase().replace("UL"," \u03BCL")+" \xB7 3D":new URLSearchParams(location.search).get("model").startsWith("drpl-")?"FOREACH DRPL \xB7 3D":"FOREACH RPL \xB7 3D",Xt&&(document.title="FOREACH "+new URLSearchParams(location.search).get("model").replace(/^(flat-bottom|ferrule)-/,"").toUpperCase()+" \xB7 3D")}document.documentElement.lang=li;["home","play","fit","help","full","tree","dimensions","views","display"].forEach((i,e)=>{let t=document.getElementById(i);t.title=qt[e],t.setAttribute("aria-label",qt[e])});["views","display"].forEach((i,e)=>qt[9+e].split("|").forEach((t,n)=>document.getElementById(i).options[n].textContent=t));document.querySelector("#help-panel h2").textContent=qt[3];document.querySelector("#tree-panel h2").textContent=qt[5];document.querySelectorAll("#help-panel p").forEach(i=>i.remove());var Su=document.createElement("p");Su.textContent=qt[11];document.getElementById("help-panel").append(Su);document.getElementById("help-close").setAttribute("aria-label",qt[3]);if(Xt){let i={zh:["\u5256\u5207","\u5256\u5207\u89C6\u56FE","\u5256\u5207\u65B9\u5411","\u5256\u5207\u4F4D\u7F6E","\u65B9\u5411","\u79FB\u52A8\u6ED1\u5757\u67E5\u770B\u5185\u90E8\uFF0C\u5207\u53E3\u4E0D\u5C01\u9762\u3002"],en:["Section","Section view","Section axis","Section position","Axis","Move the slider to view the interior. Cut faces are not capped."],es:["Secci\xF3n","Vista en secci\xF3n","Eje de secci\xF3n","Posici\xF3n de secci\xF3n","Eje","Mueva el deslizador para ver el interior. Las caras cortadas quedan abiertas."],fr:["Coupe","Vue en coupe","Axe de coupe","Position de coupe","Axe","D\xE9placez le curseur pour voir l\u2019int\xE9rieur. Les faces coup\xE9es restent ouvertes."],ko:["\uB2E8\uBA74","\uB2E8\uBA74 \uBCF4\uAE30","\uB2E8\uBA74 \uCD95","\uB2E8\uBA74 \uC704\uCE58","\uCD95","\uC2AC\uB77C\uC774\uB354\uB97C \uC6C0\uC9C1\uC5EC \uB0B4\uBD80\uB97C \uD655\uC778\uD558\uC138\uC694. \uC808\uB2E8\uBA74\uC740 \uCC44\uC6CC\uC9C0\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."],ru:["\u0421\u0435\u0447\u0435\u043D\u0438\u0435","\u0412\u0438\u0434 \u0432 \u0441\u0435\u0447\u0435\u043D\u0438\u0438","\u041E\u0441\u044C \u0441\u0435\u0447\u0435\u043D\u0438\u044F","\u041F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0441\u0435\u0447\u0435\u043D\u0438\u044F","\u041E\u0441\u044C","\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0430\u0439\u0442\u0435 \u043F\u043E\u043B\u0437\u0443\u043D\u043E\u043A \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0432\u043D\u0443\u0442\u0440\u0438. \u0421\u0440\u0435\u0437\u044B \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C\u0438."]}[li]||["Section","Section view","Section axis","Section position","Axis","Move the slider to view the interior. Cut faces are not capped."];document.getElementById("section").title=i[0],document.getElementById("section").setAttribute("aria-label",i[0]),document.querySelector("#section-panel h2").textContent=i[1],document.getElementById("section-axis").setAttribute("aria-label",i[2]),document.getElementById("section-range").setAttribute("aria-label",i[3]),document.querySelector("#section-panel label").firstChild.textContent=i[4]+" ",document.querySelector("#section-panel .subtle").textContent=i[5]}var mu={zh:"3D \u6A21\u578B\u52A0\u8F7D\u4E2D",en:"Loading 3D model",es:"Cargando modelo 3D",fr:"Chargement du mod\xE8le 3D",ko:"3D \uBAA8\uB378 \uB85C\uB529 \uC911",ru:"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 3D-\u043C\u043E\u0434\u0435\u043B\u0438"};document.getElementById("loading-label").textContent=mu[li]||mu.en;tr&&parent!==window&&(document.getElementById("loading").hidden=!0);async function Yg(){let i=new URLSearchParams(location.search),e=i.get("model");if(!["base-2nc","base-2no","base-3","threaded-2nc","threaded-2no","threaded-3","barbed-3",...gu,..._u,...xu,...yu,...bu].includes(e))throw new Error("Unknown model");let n=await fetch(Xt?_n.geometries[e].model3dUrl:_a?"/models/products/pumps/pipetting-pumps/cad/"+e+".fcad.gz":ga?"/models/products/pumps/piston-pumps/cad/"+e+(i.get("head")==="peek"?"-peek":"")+".fcad.gz":ai?"/models/products/pumps/diaphragm-pumps/cad/"+e+".fcad.gz":vu?"/models/products/pumps/valveless-pumps/"+e+".fcad.gz":"./"+e+".fcad.gz",tr&&i.has("retry")?{cache:"reload"}:void 0);if(!n.ok)throw new Error("Model unavailable");let s=new Uint8Array(await n.arrayBuffer()),r=s[0]===31&&s[1]===139?new Uint8Array(await new Response(new Blob([s]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()):s,o=[sr(r)],l=Xt?await Hl(i):null,a=W=>document.getElementById(W),c={home:'<path d="m3 11 9-8 9 8M6 9v12h5v-7h3v7h4V9"/>',play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',fit:'<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',view:'<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M8 21h8m-4-4v4"/>',cube:'<path d="m12 2 9 5v10l-9 5-9-5V7zm0 10 9-5m-9 5L3 7m9 5v10"/>',section:'<path d="M4 5h16v14H4zM8 2v20M12 6l-3 3m7-3-7 7m10-6L9 17m10-6-8 8m8-4-4 4"/>',full:'<path d="M3 9V3h6m6 0h6v6m0 6v6h-6M9 21H3v-6"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 0c0 3-3 2-3 5m0 3v1"/>',tree:'<path d="M4 3v16h5M4 8h5M10 5h10v6H10zm0 11h10v6H10z"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>'};for(let W of document.querySelectorAll("[data-icon]"))W.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true">'+c[W.dataset.icon]+"</svg>";let u=a("stage"),f=new mi;f.background=new Fe(16777215);let h=new jn(-50,50,50,-50,.01,1e4),p=new ia({antialias:!0,alpha:!1,preserveDrawingBuffer:!1});if(p.setPixelRatio(Math.min(devicePixelRatio,2)),p.localClippingEnabled=!0,p.setClearColor(16777215),u.appendChild(p.domElement),p.domElement.setAttribute("aria-label",qt[7]+" 3D"),Wl||Xt){let W=new la,se=new rs(p);f.environment=se.fromScene(W,.04).texture,W.dispose(),se.dispose(),p.toneMapping=Hs,p.toneMappingExposure=1}f.add(new Us(16777215,12040637,2));for(let[W,se]of[[[100,150,200],1.8],[[-120,40,-80],1],[[40,-150,70],.8]]){let ae=new Ki(16777215,se);ae.position.set(...W),f.add(ae)}let _=new Ki(16777215,1.6);_.position.set(-1,1,2),_.target.position.set(0,0,-1),h.add(_,_.target),f.add(h);let b=new aa(h,p.domElement);b.enableDamping=!0,b.dampingFactor=.09,b.autoRotateSpeed=1.6,b.minZoom=.15,b.maxZoom=12;let m={zh:"\u5916\u5F84",en:"OD",es:"DE",fr:"DE",ko:"\uC678\uACBD",ru:"\u041D\u0430\u0440\u0443\u0436. \xD8"},d=`${m[li]||m.en}${li==="ru"?"":" \xD8"}`,M=pa(u,h,qg?{side:"bottom",diameterAxis:0,diameterLabel:d}:Xt?{side:"bottom"}:{}),A=!0;a("dimensions").onclick=()=>{let W=M.toggle();A=W,P?.setDimensionsVisible(W),a("dimensions").classList.toggle("active",W),a("dimensions").setAttribute("aria-pressed",String(W))};let x=new Qt;f.add(x);let w=[],S=[],C=[],y=0,E=50,R="edges",I=!1,F="x",O,P,k,K=new Ht(new U(-1,0,0),0);function Y(){let W=u.clientWidth,se=u.clientHeight;if(!W||!se)return;p.setSize(W,se);let ae=W/se;h.left=-E*ae,h.right=E*ae,h.top=E,h.bottom=-E,h.updateProjectionMatrix()}new ResizeObserver(Y).observe(u);function ne(W){h.up.set(0,1,0),W==="top"&&h.up.set(0,0,-1),Xt&&W==="iso"&&h.up.set(0,1,-.35).normalize();let se={iso:Xt?[.5,.35,1]:[1,.65,1],front:[0,0,1],back:[0,0,-1],right:[1,0,0],left:[-1,0,0],top:[0,1,0],bottom:[0,-1,0]};if(h.position.copy(new U(...se[W]||se.iso).normalize().multiplyScalar(E*5)),b.target.set(0,0,0),h.zoom=1,h.updateProjectionMatrix(),b.update(),W==="top"||W==="bottom"||Xt&&W==="iso"){h.updateMatrixWorld();let ae=new Mt().setFromObject(x,ai),Ge=Array.from({length:8},(at,Ye)=>new U(Ye&1?ae.max.x:ae.min.x,Ye&2?ae.max.y:ae.min.y,Ye&4?ae.max.z:ae.min.z).project(h)),ot=at=>Math.max(...Ge.map(Ye=>Ye[at]))-Math.min(...Ge.map(Ye=>Ye[at]));h.zoom=An.clamp(Math.min(1.25/ot("x"),1.25/ot("y")),b.minZoom,b.maxZoom),h.updateProjectionMatrix()}a("views").value=W}function q(){let W=new Mt().setFromObject(x,ai);if(W.isEmpty())return;let se=W.getSize(new U),ae=u.clientWidth/u.clientHeight;E=Math.max(se.length()*(ga||_a?.62:ai?.58:Wl?.49:.62),se.length()*.55/Math.max(.5,ae)),Y(),ne("iso")}function Z(){P?.dispose(),P=null,x.traverse(W=>{if(W.geometry?.dispose(),W.material)for(let se of Array.isArray(W.material)?W.material:[W.material])se.dispose()}),x.clear(),w=[],S=[],C=[]}function J(W){a("tree-content").replaceChildren();let se=document.createElement("div");se.className="tree-root",se.textContent=W.root.children?.[0]?.name||W.name,a("tree-content").append(se),W.exteriorOptimized||C.forEach((ae,Ge)=>{if(!C[Ge])return;let ot=document.createElement("label");ot.className="part";let at=document.createElement("input");at.type="checkbox",at.checked=ae.visible,at.setAttribute("aria-label",qt[5]+" "+(Ge+1)),at.onchange=()=>{C[Ge].visible=at.checked};let Ye=document.createElement("span");Ye.textContent=ae.userData.partName||W.meshes[Ge]?.name||qt[5]+" "+(Ge+1),ot.append(at,Ye),a("tree-content").append(ot)})}function ye(W){Z(),x.position.set(0,0,0),b.autoRotate=!1,a("play").classList.remove("active"),a("play").setAttribute("aria-pressed","false"),y=W;let se=ou(o[W]),ae=new Qt;da(se,ae),Xt&&(lu(e,ae),k=ae),x.add(ae);let Ge=!!se.exteriorOptimized;a("tree").hidden=Ge,Ge&&(a("tree-panel").hidden=!0,a("tree").classList.remove("active"));let ot=document.querySelector('#display option[value="wire"]');ot.disabled=Ge,ot.hidden=Ge,Ge&&R==="wire"&&(R="edges",a("display").value="edges"),a("section").hidden=!!se.exteriorOnly,document.querySelector('#display option[value="transparent"]').disabled=!!se.exteriorOnly,se.exteriorOnly&&(I=!1,a("section-panel").hidden=!0,R==="transparent"&&(R="edges",a("display").value="edges"));let at=se.name.startsWith("SV10-P-")||!!se.appearance?.barbed,Ye=-1/0;for(let $e of se.meshes)for(let Ze=2;Ze<$e.attributes.position.array.length;Ze+=3)Ye=Math.max(Ye,$e.attributes.position.array[Ze]);let xt=se.appearance?.baseZ??(at?0:Ye-30.9);se.meshes.forEach(($e,Ze)=>{let T=se.exteriorOptimized?.edgeReconstruction?.[Ze];if(!$e.index.array.length&&!T)return;let g=new Pt;g.setAttribute("position",new gt($e.attributes.position.array,3)),$e.attributes.normal&&g.setAttribute("normal",new gt($e.attributes.normal.array,3)),g.setIndex($e.index.array),$e.attributes.normal||g.computeVertexNormals();let B=$e.index.array.length?se.appearance?.flatBottom||se.appearance?.fitting?ua($e,g,i.get("finish")):se.appearance?.smtp2||se.appearance?.smtp4?tu($e,g):se.appearance?.piston?eu($e,g,se.name,Ze,new URLSearchParams(location.search).get("head")==="peek"?"peek":"pmma"):se.appearance?.diaphragm?$h($e,g,se.name,Ze):se.appearance?.rpl?Kh($e,g):Zh($e,g,xt,at):[];w.push(...B);let V=$e.index.array.length?new ft(g,B):new Qt;ae.add(V),C[Ze]=V;let $=new _i(fa(g,T),new qn({color:6579551,transparent:!0,opacity:.28}));V.add($),S.push($),$e.index.array.length||g.dispose()}),P=Vl(l,ae,x,w,S,C,u,h),P?.setDimensionsVisible(A);let N=new Mt().setFromObject(x,ai);x.position.sub(N.getCenter(new U)),O=new Mt().setFromObject(x,ai),M.set(se,ae),a("models").value=String(W),a("drawing").alt=se.name+" \u539F\u59CB\u4E8C\u7EF4\u56FE\u7EB8",J(se),a("status").textContent=se.name+(l?" + "+l.model:""),a("section-range").value=50,ze(),ve(),q()}function ve(){w.forEach(W=>{W.wireframe=R==="wire",W.transparent=R==="transparent",W.opacity=R==="transparent"?.28:1,W.depthWrite=R!=="transparent",W.needsUpdate=!0}),S.forEach(W=>W.visible=R==="edges"||R==="transparent")}function ze(){K.normal.set(F==="x"?-1:0,F==="y"?-1:0,F==="z"?-1:0),O&&(K.constant=An.lerp(O.min[F],O.max[F],Number(a("section-range").value)/100)),w.forEach(W=>{W.clippingPlanes=I?[K]:[],W.needsUpdate=!0}),S.forEach(W=>{W.material.clippingPlanes=I?[K]:[],W.material.needsUpdate=!0})}o.forEach((W,se)=>{let ae=document.createElement("option");ae.value=se,ae.textContent=W.name,a("models").append(ae)}),a("models").onchange=W=>ye(Number(W.target.value)),a("home").onclick=()=>{b.autoRotate=!1,a("play").classList.remove("active"),I=!1,a("section").classList.remove("active"),a("section-panel").hidden=!0,C.forEach(W=>W.visible=!0),document.querySelectorAll(".part input").forEach(W=>W.checked=!0),ze(),q()},a("fit").onclick=q,a("views").onchange=W=>ne(W.target.value),a("play").onclick=()=>{b.autoRotate=!b.autoRotate,a("play").classList.toggle("active",b.autoRotate),a("play").setAttribute("aria-pressed",String(b.autoRotate))},a("display").onchange=W=>{R=W.target.value,ve()};function Ve(W,se){a(W).hidden=!a(W).hidden,a(se).classList.toggle("active",!a(W).hidden)}a("tree").onclick=()=>Ve("tree-panel","tree"),a("help").onclick=()=>Ve("help-panel","help"),a("help-close").onclick=()=>Ve("help-panel","help"),a("section").onclick=()=>{I=!I,a("section-panel").hidden=!I,a("section").classList.toggle("active",I),ze()},a("section-range").oninput=ze,a("section-axis").onchange=W=>{F=W.target.value,ze()},a("full").onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await a("viewer").requestFullscreen()}catch{a("viewer").classList.toggle("expanded"),Y()}};function Ee(W){a("stage").hidden=!W,a("drawing-wrap").hidden=W,a("tools").hidden=!W,a("side-tools").hidden=!W,a("tab3d").classList.toggle("selected",W),a("tab2d").classList.toggle("selected",!W),a("tab3d").setAttribute("aria-selected",String(W)),a("tab2d").setAttribute("aria-selected",String(!W)),W?I&&(a("section-panel").hidden=!1):(a("tree-panel").hidden=!0,a("tree").classList.remove("active"),a("section-panel").hidden=!0,a("help-panel").hidden=!0),Y()}a("tab3d").onclick=()=>Ee(!0),a("tab2d").onclick=()=>Ee(!1),window.addEventListener("keydown",W=>{W.defaultPrevented||W.target.matches("select,input")||(W.key==="Home"&&a("home").click(),W.key==="Escape"&&(["tree-panel","help-panel"].forEach(se=>a(se).hidden=!0),["tree","help"].forEach(se=>a(se).classList.remove("active"))))});let G=0;async function Q(W){if(!Xt||W!=="none"&&!er(i)?.accessoryCodes.includes(W))return;let se=++G;if(W===(l?.code||"none")){ce.setSelection(W,l);return}ce.pending();try{let ae=await Hl(i,W);if(se!==G)return;ae&&P?.geometryId===ae.geometryId?P.setFinish(ae):(P?.dispose(),P=Vl(ae,k,x,w,S,C,u,h)),l=ae,P?.setDimensionsVisible(A),O=new Mt().setFromObject(x),J(o[y]),ze(),ve(),a("status").textContent=o[y].name+(ae?" + "+ae.model:""),ce.setSelection(ae?.code||"none",ae)}catch{se===G&&ce.error()}}let ce=Xt?fu(i,Q):null;ye(0),ce?.setSelection(l?.code||"none",l);let Ce=!0,oe=!0,Ne=!1;function rt(){b.update(),p.render(f,h),M.update(),P?.update(),Ne||(Ne=!0,document.getElementById("loading").hidden=!0,document.getElementById("loading").setAttribute("aria-busy","false"),tr&&parent.postMessage({type:"cad-rendered"},location.origin))}function Oe(){p.setAnimationLoop(Ce&&oe&&!document.hidden?rt:null),Ce&&Y()}window.addEventListener("message",W=>{W.origin===location.origin&&W.source===parent&&W.data?.type==="fitting-accessory"&&Q(W.data.code),W.origin===location.origin&&W.source===parent&&W.data?.type==="solenoid-active"&&(Ce=!!W.data.active,Oe(),tr&&Ne&&parent.postMessage({type:"cad-rendered"},location.origin))}),new IntersectionObserver(W=>{oe=W[0].isIntersecting,Oe()}).observe(u),document.addEventListener("visibilitychange",Oe),p.domElement.addEventListener("webglcontextlost",W=>{W.preventDefault(),p.setAnimationLoop(null),Mu()}),parent.postMessage({type:"solenoid-ready"},location.origin),Oe()}function Mu(){tr&&parent.postMessage({type:"cad-error"},location.origin);let i=document.getElementById("loading");i.hidden=!1,i.setAttribute("aria-busy","false"),i.replaceChildren();let e=document.createElement("button");e.textContent=Xg.retry,e.onclick=()=>location.reload(),i.append(e)}Yg().catch(Mu);})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
