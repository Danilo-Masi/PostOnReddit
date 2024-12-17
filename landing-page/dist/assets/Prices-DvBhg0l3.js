import{c as y,r as a,j as e,a as i,B as w,u as N,M as b}from"./index-D5s3f66l.js";import{C as v}from"./CustomHeader-CYL74Nfo.js";/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=y("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]),o=a.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:i("rounded-xl border bg-card text-card-foreground shadow",t),...r}));o.displayName="Card";const l=a.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:i("flex flex-col space-y-1.5 p-6",t),...r}));l.displayName="CardHeader";const n=a.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:i("font-semibold leading-none tracking-tight",t),...r}));n.displayName="CardTitle";const c=a.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:i("text-sm text-muted-foreground",t),...r}));c.displayName="CardDescription";const p=a.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:i("p-6 pt-0",t),...r}));p.displayName="CardContent";const x=a.forwardRef(({className:t,...r},s)=>e.jsx("div",{ref:s,className:i("flex items-center p-6 pt-0",t),...r}));x.displayName="CardFooter";function d({border:t,title:r,description:s,futurePrice:f,price:m,details:u,buttonText:h,onClick:j}){return e.jsxs(o,{className:`w-full md:w-1/3 bg-background text-left ${t&&t}`,children:[e.jsxs(l,{children:[e.jsx(n,{className:"text-3xl font-semibold text-zinc-900",children:r}),e.jsx(c,{className:"text-md font-light text-zinc-500",children:s})]}),e.jsxs(p,{className:"flex flex-col gap-3",children:[e.jsxs("p",{className:"text-2xl font-bold text-zinc-900",children:["€",m,e.jsxs("span",{className:"text-xl font-medium text-zinc-400 line-through ml-2",children:["€",f]})]}),u.map((g,C)=>e.jsxs("div",{className:"flex items-center justify-start gap-x-2 ",children:[e.jsx("div",{className:"w-2 h-2 bg-orange-500 rounded-full"}),e.jsx("p",{children:g})]},C))]}),e.jsx(x,{children:e.jsxs(w,{type:"button",className:"w-full bg-orange-500 hover:bg-orange-600 py-5",onClick:j,children:[e.jsx(k,{}),h]})})]})}function R({id:t}){const{setWaitlistOpen:r}=N(),s=()=>{r(!0)};return e.jsxs(b,{yAlign:"justify-start",id:t,children:[e.jsx(v,{badgeTitle:"PRICES",titleHeader:"Pay-As-You-Go",descriptionHeader:"Only pay for what you need. Simple, flexible, and efficient."}),e.jsxs("div",{className:"w-full h-full flex flex-col md:flex-row items-center justify-center gap-6",children:[e.jsx(d,{title:"Basic pack",description:"Perfect for occasional users who want to schedule posts effortlessly.",futurePrice:"7.5",price:"5.00",details:["10 credits included","€0.50 per credit","Email support with 1-hour response time"],buttonText:"Buy 10 Credits",onClick:s}),e.jsx(d,{border:"border-2 border-orange-500",title:"Premium pack",description:"Ideal for power users who need more credits at a lower cost",futurePrice:"15.00",price:"10.00",details:["25 credits included","€0.40 per credit","Email support with 1-hour response time"],buttonText:"Buy 25 Credits",onClick:s})]})]})}export{R as default};
