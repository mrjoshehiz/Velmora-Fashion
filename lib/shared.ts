export type Product = { id:string; slug:string; name:string; category:string; price:number; stock:number; color:string; description:string; image:string; active:number; rank:number };
export const naira=(value:number)=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(value);
export const sizes=["XS","S","M","L","XL"] as const;
