import{aK as p,r as d,j as e,B as v,aY as w,aH as i}from"./index-leeD8V8Y.js";import{C as z,d as y,e as N,L as C,f as E,g as h,b as g,I as x,h as I,a as L,i as A}from"./card-BnYluhif.js";import{L as P,A as S}from"./AuthHero-C7-HS6CQ.js";const R="https://postonredditserver.vercel.app";function T(){const r=p(),[n,o]=d.useState(""),[c,u]=d.useState(""),m=async()=>{const s=f(n,c);if(s.length<=0)try{const a=await L.post(`${R}/auth/login`,{email:n,password:c},{headers:{"Content-Type":"application/json"}});if(a.status===400){l("Invalid credentials",a.status);return}if(a.status===401){l("Login failed. Please try again later",a.status);return}a.status===200&&b(a.data.token)}catch(a){console.error("CLIENT: Errore generico del server",a.stack),l("Server error. Please try again later",a.status)}else s.map(a=>{i.warning(a)})},f=(s,a)=>{const t=[],j=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,k=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{6,}$/;return s.trim()?j.test(s)||t.push("Email is not valid"):t.push("Email can't be empty"),a.length<6?t.push("Password must be at least 6 characters"):k.test(a)||t.push("Password must contain at least one letter, one number, and one special character"),t},l=(s,a)=>{console.error(`CLIENT: Error status: ${a}`),i.warning(s),o(""),u("")},b=s=>{localStorage.setItem("authToken",s),i.success("Access successful"),r("/")};return e.jsxs(z,{className:"flex flex-col gap-y-1 bg-background shadow-elevation3 shadow-md w-[90%] md:w-1/2 bg-zinc-100 dark:bg-zinc-700",children:[e.jsxs(y,{className:"flex justify-center items-center w-full",children:[e.jsx(N,{children:e.jsx(C,{})}),e.jsx(E,{className:"text-zinc-500 dark:text-zinc-300",children:"Welcome back to postonreddit!"})]}),e.jsxs(h,{className:"flex flex-col gap-y-2",children:[e.jsx(g,{"aria-label":"emailInputId",children:"Email Address"}),e.jsx(x,{"aria-label":"input-email-login",id:"emailInputId",type:"email",placeholder:"Enter your email",required:!0,value:n,onChange:s=>o(s.target.value),className:"bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-700 dark:placeholder:text-zinc-500"})]}),e.jsxs(h,{className:"flex flex-col gap-y-2",children:[e.jsx(g,{children:"Password"}),e.jsx(x,{"aria-label":"input-password-login",id:"passwordInputId",type:"password",placeholder:"••••••••",required:!0,value:c,onChange:s=>u(s.target.value),className:"bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-700 dark:placeholder:text-zinc-500"})]}),e.jsxs(I,{className:"flex flex-col gap-y-2",children:[e.jsxs(v,{"aria-label":"button-login",type:"submit",className:"w-full bg-orange-500 dark:bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-600 text-zinc-50 dark:text-zinc-50",onClick:m,children:[e.jsx(P,{})," Log In to Your Account"]}),e.jsxs(w,{to:"/registration",className:"text-foreground",children:["Don't have an account? ",e.jsx("span",{className:"hover:text-orange-500",children:"Sign up here"})]})]})]})}function q(){const r=p();return d.useEffect(()=>{(async()=>{await A()&&r("/")})()},[r]),e.jsxs("div",{className:"w-screen h-auto md:h-svh flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-800",children:[e.jsx("div",{className:"w-screen md:w-1/2 h-svh flex flex-col items-center justify-center",children:e.jsx(T,{})}),e.jsx(S,{})]})}export{q as default};
