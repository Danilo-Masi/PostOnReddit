import{j as e,a as s,k as a}from"./index-D5s3f66l.js";const o=a("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function i({className:t,variant:r,...n}){return e.jsx("div",{className:s(o({variant:r}),t),...n})}function d({badgeText:t}){return e.jsx(i,{variant:"outline",className:"text-sm w-fit",children:t})}function u({badgeTitle:t,titleHeader:r,descriptionHeader:n}){return e.jsxs("div",{className:"flex items-center justify-center flex-col gap-y-2",children:[e.jsx(d,{badgeText:t}),e.jsx("h1",{className:"text-4xl font-bold text-zinc-900",children:r}),e.jsx("h3",{className:"text-xl font-medium text-zinc-500",children:n})]})}export{u as C};