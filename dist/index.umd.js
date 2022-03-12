(function(l,r){typeof exports=="object"&&typeof module!="undefined"?module.exports=r(require("vue")):typeof define=="function"&&define.amd?define(["vue"],r):(l=typeof globalThis!="undefined"?globalThis:l||self,l.PinInput=r(l.Vue))})(this,function(l){"use strict";const r=["onUpdate:modelValue","type","onFocus","onKeydown","onPaste","onInput"],D=l.defineComponent({props:{modelValue:null,length:{default:4},autofocus:{type:Boolean,default:!0},secure:{type:Boolean,default:!1},characterPreview:{type:Boolean,default:!0},charPreviewDuration:{default:300},inputClass:null},emits:["update:modelValue","completed"],setup(i,{emit:f}){const a=i,I="vue-pincode-input",_="^\\d{1}$",$="tel",m="password",y=l.ref(I),c=l.ref(0),u=l.ref([]),h=l.ref({}),g=l.ref({}),C=l.ref({}),b=(e,t)=>{C.value[e]=t},w=l.computed(()=>u.value.reduce((e,t)=>e+t.value,""));l.watch(()=>a.modelValue,()=>{a.modelValue?T():V()}),l.watch(()=>a.length,()=>{V()}),l.watch(w,(e,t)=>{f("update:modelValue",e),t.length!==a.length&&e.length===a.length&&f("completed",e)}),l.onMounted(()=>{P(),T(),a.autofocus&&l.nextTick(()=>p())});const P=()=>{const e=S();for(let t=0;t<a.length;t+=1)F(t),E(t,e),U(t)},F=e=>{u.value[e]={key:e,value:""}},E=(e,t=m)=>{g.value[e]=t},U=e=>{const t=`cells.${e}.value`;h.value[t]=l.watch(()=>u.value[e].value,(n,s)=>{K(e,n,s)})},T=()=>{if(a.modelValue.length!==a.length){f("update:modelValue",w.value);return}a.modelValue.split("").forEach((e,t)=>{u.value[t].value=e||""})},K=(e,t,n)=>{if(!M(t,!1)){u.value[e].value="";return}B(),a.secure&&a.characterPreview&&setTimeout(E,a.charPreviewDuration,e)},R=(e,t)=>{u.value[e].value.length?u.value[e].value="":(k(),u.value[c.value].value="",t.preventDefault())},j=e=>{switch(e.keyCode){case 37:k();break;case 39:B();break}},N=(e,t)=>{t.preventDefault();const n=t.clipboardData.getData("text/plain").split("");let s=0;for(let o=e;o<e+n.length&&!(n[s]===void 0||u.value[o]===void 0);o++)u.value[o].value=n[s],s++},L=(e,t)=>{var s;const n=t;if(console.log(n.data),alert(n.data),((s=n.data)==null?void 0:s.length)===a.length){n.preventDefault();const o=n.data.toString().split("");let v=0;for(let d=e;d<e+o.length&&!(o[v]===void 0||u.value[d]===void 0);d++)u.value[d].value=o[v],v++}},V=()=>{A(),P(),p()},A=()=>{Object.keys(h.value).forEach(t=>h.value[t]())},M=(e,t=!0)=>e?!!e.match(_):t?e==="":!1,S=()=>a.secure&&!a.characterPreview?m:$,k=()=>{!c.value||p(c.value-1)},B=()=>{c.value!==a.length-1&&p(c.value+1)},p=(e=0)=>{const t=`${y.value}${e}`,n=C.value[t];!n||(n.focus(),n.select(),c.value=e)};return(e,t)=>(l.openBlock(),l.createElementBlock("div",null,[(l.openBlock(!0),l.createElementBlock(l.Fragment,null,l.renderList(u.value,(n,s)=>l.withDirectives((l.openBlock(),l.createElementBlock("input",l.mergeProps({key:n.key,ref_for:!0,ref:o=>b(`${y.value}${s}`,o),"onUpdate:modelValue":o=>n.value=o},e.$attrs,{class:`${i.inputClass}`,type:g.value[s],onFocus:o=>c.value=s,onKeydown:[l.withKeys(o=>R(s,o),["delete"]),j],onPaste:o=>N(s,o),onInput:o=>L(s,o)}),null,16,r)),[[l.vModelDynamic,n.value,void 0,{trim:!0}]])),128))]))}});return{install:(i,f={})=>{i.component("pin-input",D)}}});
