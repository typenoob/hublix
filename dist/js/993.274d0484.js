"use strict";(self["webpackChunkhublix"]=self["webpackChunkhublix"]||[]).push([[993],{789:function(e,l,t){t.d(l,{Z:function(){return V}});var n=t(3396),a=t(7139),o=t(5101),i=t(7229),u=t(6572),r=t(1334),s=t(9234),c=t(1285),d=(t(6699),t(9694)),v=t(9374),m=t(1138),p=t(8717),f=t(7041),h=t(5738),g=t(4870),b=t(1107),y=t(131);const _=(0,b.e)()({name:"VRating",props:{name:String,itemAriaLabel:{type:String,default:"$vuetify.rating.ariaLabel.item"},activeColor:String,color:String,clearable:Boolean,disabled:Boolean,emptyIcon:{type:String,default:"$ratingEmpty"},fullIcon:{type:String,default:"$ratingFull"},halfIncrements:Boolean,hover:Boolean,length:{type:[Number,String],default:5},readonly:Boolean,modelValue:{type:Number,default:0},itemLabels:Array,itemLabelPosition:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},ripple:Boolean,...(0,d.f)(),...(0,v.Z)(),...(0,m.Q)(),...(0,f.x$)()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const{t:a}=(0,h.bU)(),{themeClasses:i}=(0,f.ER)(e),u=(0,p.z)(e,"modelValue"),r=(0,n.Fl)((()=>(0,y.MT)(Number(e.length),1))),s=(0,n.Fl)((()=>r.value.flatMap((l=>e.halfIncrements?[l-.5,l]:[l])))),c=(0,g.iH)(-1),d=(0,g.iH)(-1),v=(0,g.iH)();let m=!1;const b=(0,n.Fl)((()=>s.value.map((l=>{var t;const n=e.hover&&c.value>-1,a=u.value>=l,o=c.value>=l,i=n?o:a,r=i?e.fullIcon:e.emptyIcon,s=null!=(t=e.activeColor)?t:e.color,d=a||o?s:e.color;return{isFilled:a,isHovered:o,icon:r,color:d}})))),_=(0,n.Fl)((()=>[0,...s.value].map((l=>{function t(){c.value=l}function n(){c.value=-1}function a(){var e;0===l&&0===u.value?null==(e=v.value)||e.focus():d.value=l}function o(){m||(d.value=-1)}function i(){e.disabled||e.readonly||(u.value=u.value===l&&e.clearable?0:l)}return{onMouseenter:e.hover?t:void 0,onMouseleave:e.hover?n:void 0,onFocus:a,onBlur:o,onClick:i}}))));function W(){m=!0}function x(){m=!1}const w=(0,n.Fl)((()=>{var l;return null!=(l=e.name)?l:`v-rating-${(0,y.sq)()}`}));function C(l){var i,r;let{value:s,index:c,showStar:d=!0}=l;const{onMouseenter:m,onMouseleave:p,onFocus:f,onBlur:h,onClick:g}=_.value[c+1],y=`${w.value}-${String(s).replace(".","-")}`,C={color:null==(i=b.value[c])?void 0:i.color,density:e.density,disabled:e.disabled,icon:null==(r=b.value[c])?void 0:r.icon,ripple:e.ripple,size:e.size,tag:"span",variant:"plain"};return(0,n.Wm)(n.HY,null,[(0,n.Wm)("label",{for:y,class:{"v-rating__item--half":e.halfIncrements&&s%1>0,"v-rating__item--full":e.halfIncrements&&s%1===0},onMousedown:W,onMouseup:x,onMouseenter:m,onMouseleave:p},[(0,n.Wm)("span",{class:"v-rating__hidden"},[a(e.itemAriaLabel,s,e.length)]),d?t.item?t.item({...b.value[c],props:C,value:s,index:c}):(0,n.Wm)(o.T,C,null):void 0]),(0,n.Wm)("input",{class:"v-rating__hidden",name:w.value,id:y,type:"radio",value:s,checked:u.value===s,onClick:g,onFocus:f,onBlur:h,ref:0===c?v:void 0,readonly:e.readonly,disabled:e.disabled},null)])}function k(e){return t["item-label"]?t["item-label"](e):e.label?(0,n.Wm)("span",null,[e.label]):(0,n.Wm)("span",null,[(0,n.Uk)(" ")])}return()=>{var l;const a=!(null==(l=e.itemLabels)||!l.length)||t["item-label"];return(0,n.Wm)(e.tag,{class:["v-rating",{"v-rating--hover":e.hover,"v-rating--readonly":e.readonly},i.value]},{default:()=>[(0,n.Wm)(C,{value:0,index:-1,showStar:!1},null),r.value.map(((l,t)=>{var o,i;return(0,n.Wm)("div",{class:"v-rating__wrapper"},[a&&"top"===e.itemLabelPosition?k({value:l,index:t,label:null==(o=e.itemLabels)?void 0:o[t]}):void 0,(0,n.Wm)("div",{class:["v-rating__item",{"v-rating__item--focused":Math.ceil(d.value)===l}]},[e.halfIncrements?(0,n.Wm)(n.HY,null,[(0,n.Wm)(C,{value:l-.5,index:2*t},null),(0,n.Wm)(C,{value:l,index:2*t+1},null)]):(0,n.Wm)(C,{value:l,index:t},null)]),a&&"bottom"===e.itemLabelPosition?k({value:l,index:t,label:null==(i=e.itemLabels)?void 0:i[t]}):void 0])}))]})}}});function W(e,l,t,d,v,m){return(0,n.wg)(),(0,n.j4)(i._,{elevation:v.elevation,onTouchstart:l[4]||(l[4]=e=>this.elevation=12),onTouchend:l[5]||(l[5]=e=>this.elevation=6),class:"mx-auto",density:"compact","max-width":m.width,style:{position:"relative"}},{default:(0,n.w5)((()=>[(0,n.Wm)(c.f,{onClick:l[0]||(l[0]=l=>e.$router.push({path:`/video/${t.id}`})),class:"white--text align-end",src:v.src,gradient:"to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)",height:"200px",cover:""},{default:(0,n.w5)((()=>[(0,n.Wm)(u.E,{class:"text-white"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,a.zw)(v.title),1)])),_:1})])),_:1},8,["src"]),(0,n.Wm)(r.h,null,{default:(0,n.w5)((()=>[(0,n.Wm)(_,{readonly:"",modelValue:v.rating,"onUpdate:modelValue":l[1]||(l[1]=e=>v.rating=e),"background-color":"white",color:"yellow accent-4",density:"compact","half-increments":"",hover:"",size:"small"},null,8,["modelValue"]),(0,n.Wm)(s.C),(0,n.Wm)(o.T,{style:(0,a.j5)(`position: absolute; right: ${m.right[0]}px; bottom: 8px`),size:"x-small",color:m.is_collected?"yellow":"#424242",icon:m.is_collected?"mdi-bookmark":"mdi-bookmark-outline",onClick:l[2]||(l[2]=e=>m.is_collected?m.deleteMovie(t.id):m.addMovie(m.collection_id,t.id))},null,8,["style","color","icon"]),(0,n.Wm)(o.T,{size:"x-small",style:(0,a.j5)(`position: absolute; right: ${m.right[1]}px; bottom: 8px`),color:"surface-variant",icon:"mdi-share-variant",onClick:l[3]||(l[3]=e=>this.$store.commit("alertUnfinished"))},null,8,["style"])])),_:1})])),_:1},8,["elevation","max-width"])}var x=t(3020),w=t(9201),C=t(8157),k={created(){this.readInfo(),this.fetchData()},computed:{collection_id(){return this.$store.state.user.info.default_collection},is_collected(){const e=this.$store.state.collections.reduce(((e,l)=>e.concat(l.movies.map((e=>e.id)))),[]);return e.includes(this.id.toString())},width(){const{name:e}=(0,C.AW)();switch(e.value){case"xs":return 160;case"sm":return 250;case"md":return 350;case"lg":return 450;case"xl":return 550}return 0},right(){const{name:e}=(0,C.AW)();switch(e.value){case"xs":return[20,0];case"sm":return[80,40];case"md":return[120,60];case"lg":return[180,100];case"xl":return[240,160]}return 0}},data(){return{elevation:6,title:"标题",src:"",rating:5,like:!1}},watch:{id:function(){this.fetchData()}},props:{id:{type:Number,required:!0}},methods:{async fetchData(){x.Z.detail(this.id).then((e=>{Object.assign(this,e)}))},addMovie:w.Z.addMovie,deleteMovie:w.Z.deleteMovie,readInfo:w.Z.readInfo}},S=t(89);const F=(0,S.Z)(k,[["render",W]]);var V=F},9234:function(e,l,t){t.d(l,{C:function(){return a}});var n=t(1114);const a=(0,n.J)("flex-grow-1","div","VSpacer")},240:function(e,l,t){t.d(l,{r:function(){return W},f:function(){return _}});t(6699);var n=t(3396),a=t(7103),o=t(836),i=t(6052),u=t(1358),r=t(4193),s=t(2902),c=t(6185),d=t(4906),v=t(6199),m=t(5738),p=t(8717),f=t(4870),h=t(3766),g=t(1107),b=t(131),y=t(9888);const _=(0,h.U)({chips:Boolean,closableChips:Boolean,eager:Boolean,hideNoData:Boolean,hideSelected:Boolean,menuIcon:{type:String,default:"$dropdown"},modelValue:{type:[Number,String,Array],default:()=>[]},multiple:Boolean,noDataText:{type:String,default:"$vuetify.noDataText"},openOnClear:Boolean,...(0,c.S1)()},"select"),W=(0,g.e)()({name:"VSelect",props:{..._(),...(0,d.X)({transition:"scale-transition"})},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:t}=l;const{t:d}=(0,m.bU)(),h=(0,f.iH)(),g=(0,f.iH)(),_=(0,f.iH)(!1),{items:W}=(0,c.Ce)(e),x=(0,p.z)(e,"modelValue",[],(e=>(0,b.FT)(e)),(l=>e.multiple?l:l[0])),w=(0,n.Fl)((()=>W.value.filter((e=>x.value.includes(e.value))))),C=(0,n.Fl)((()=>w.value.map((e=>e.value))));function k(l){x.value=[],e.openOnClear&&(_.value=!0)}function S(){e.hideNoData&&!W.value.length||(_.value=!0)}function F(e){["Enter","ArrowDown"," "].includes(e.key)&&(_.value=!0),["Escape","Tab"].includes(e.key)&&(_.value=!1)}function V(l){if(e.multiple){const e=C.value.findIndex((e=>e===l.value));if(-1===e)x.value=[...x.value,l.value];else{const l=[...x.value];l.splice(e,1),x.value=l}}else x.value=[l.value],_.value=!1}return(0,n.YP)((()=>h.value),(e=>{g.value=e.$el.querySelector(".v-input__control")})),(0,y.L)((()=>{const l=!(!e.chips&&!t.chip);return(0,n.Wm)(s.h,{ref:h,class:["v-select",{"v-select--active-menu":_.value,"v-select--chips":!!e.chips,["v-select--"+(e.multiple?"multiple":"single")]:!0}],appendInnerIcon:e.menuIcon,readonly:!0,"onClick:clear":k,"onClick:input":S,"onClick:control":S,onBlur:()=>_.value=!1,modelValue:x.value.join(", "),onKeydown:F},{...t,default:()=>{var s,c;return(0,n.Wm)(n.HY,null,[g.value&&(0,n.Wm)(r.T,{modelValue:_.value,"onUpdate:modelValue":e=>_.value=e,activator:g.value,contentClass:"v-select__content",eager:e.eager,openOnClick:!1,transition:e.transition},{default:()=>[(0,n.Wm)(i.i,{selected:C.value,selectStrategy:e.multiple?"independent":"single-independent"},{default:()=>[!W.value.length&&!e.hideNoData&&(null!=(s=null==(c=t["no-data"])?void 0:c.call(t))?s:(0,n.Wm)(u.l,{title:d(e.noDataText)},null)),W.value.map((e=>(0,n.Wm)(u.l,(0,n.dG)(e,{onMousedown:e=>e.preventDefault(),onClick:()=>V(e)}),null)))]})]}),w.value.map(((i,u)=>{function r(e){e.stopPropagation(),e.preventDefault(),V(i)}const s={"onClick:close":r,modelValue:!0};return(0,n.Wm)("div",{class:"v-select__selection"},[l&&(0,n.Wm)(o.z,{defaults:{VChip:{closable:e.closableChips,size:"small",text:i.title}}},{default:()=>[t.chip?t.chip({props:s,selection:i}):(0,n.Wm)(a.v,s,null)]}),!l&&(t.selection?t.selection({selection:i}):(0,n.Wm)("span",{class:"v-select__selection-text"},[i.title,e.multiple&&u<w.value.length-1&&(0,n.Wm)("span",{class:"v-select__selection-comma"},[(0,n.Uk)(",")])]))])}))])}})})),(0,v.Z)({},h)}})},6185:function(e,l,t){t.d(l,{Ce:function(){return s},Nb:function(){return u},S1:function(){return i}});var n=t(3396),a=t(3766),o=t(131);const i=(0,a.U)({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:String,default:"children"},itemProps:{type:Function,default:e=>({})}},"item");function u(e,l){var t;const n=(0,o.qF)(l,e.itemTitle,l),a=(0,o.qF)(l,e.itemValue,n),i=(0,o.vO)(l,e.itemChildren);return{title:n,value:a,children:Array.isArray(i)?r(e,i):void 0,...null==(t=e.itemProps)?void 0:t.call(e,l)}}function r(e,l){const t=[];for(const n of l)t.push(u(e,n));return t}function s(e){const l=(0,n.Fl)((()=>r(e,e.items)));return{items:l}}}}]);
//# sourceMappingURL=993.274d0484.js.map