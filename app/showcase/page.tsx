import Link from "next/link";
import type { Metadata } from "next";
export const metadata:Metadata={title:"VELMORA — Responsive UI Showcase",description:"Desktop and mobile screen presentation for the VELMORA fashion commerce portfolio concept."};

type Screen={number:string;name:string;path:string;note:string};
const groups:{title:string;label:string;intro:string;screens:Screen[]}[]=[
  {title:"Discovery",label:"01 / BROWSE",intro:"An editorial storefront leads into a product catalogue with categories, search, and full product details.",screens:[
    {number:"01",name:"Storefront",path:"/",note:"Hero, dress carousel, catalogue"},
    {number:"02",name:"Collection",path:"/shop",note:"Browse and sort all pieces"},
    {number:"03",name:"Dress edit",path:"/shop?category=Dresses",note:"Category selection"},
    {number:"04",name:"Search",path:"/search",note:"Product discovery"},
    {number:"05",name:"Product detail",path:"/product/adaeze-maxi-dress",note:"Gallery, sizes, price and bag action"},
    {number:"06",name:"Testimonials",path:"/#testimonials",note:"Illustrative concept copy, visibly disclosed"},
  ]},
  {title:"The order journey",label:"02 / BUY",intro:"The shopping bag and checkout show exact prices and delivery totals. Checkout records an order request for this concept.",screens:[
    {number:"07",name:"Bag",path:"/bag?demo=1",note:"Sample selection and totals"},
    {number:"08",name:"Checkout",path:"/checkout?demo=1",note:"Sample delivery details and order summary"},
    {number:"09",name:"Order received",path:"/order-confirmed?id=VM-CONCEPT",note:"Sample confirmation state"},
  ]},
  {title:"Your edit",label:"03 / PERSONAL",intro:"Search, saved pieces, and account states complete the customer journey.",screens:[
    {number:"10",name:"Saved pieces",path:"/saved",note:"Sign-in and saved-item state"},
    {number:"11",name:"Account",path:"/account",note:"Current sign-in screen"},
  ]},
  {title:"Care & brand",label:"04 / INFORMATION",intro:"Practical buying guidance, delivery information, and a pared-back brand page.",screens:[
    {number:"12",name:"Size guide",path:"/size-guide",note:"Measurements"},
    {number:"13",name:"Delivery & returns",path:"/delivery-returns",note:"Shipping guidance"},
    {number:"14",name:"About",path:"/about",note:"Brand page"},
  ]},
];
function ScreenPair({screen}:{screen:Screen}){return <article className="showcase-screen"><div className="showcase-screen-head"><span>{screen.number} / {screen.name.toUpperCase()}</span><small>{screen.note}</small><Link href={screen.path} target="_blank">Open page ↗</Link></div><div className="showcase-pair"><div className="showcase-laptop"><div className="showcase-bezel"><div className="showcase-desktop-window"><iframe loading="lazy" title={`${screen.name} desktop view`} src={screen.path}/></div></div><span className="showcase-device-label">DESKTOP / 1200 PX</span></div><div className="showcase-phone"><div className="showcase-phone-window"><iframe loading="lazy" title={`${screen.name} mobile view`} src={screen.path}/></div><span className="showcase-device-label">MOBILE / 390 PX</span></div></div></article>}
function AdminPreview({view}:{view:"products"|"orders"|"reviews"}){const title={products:"Products",orders:"Orders",reviews:"Reviews"}[view];const rows=view==="products"?[["Adaeze Maxi Dress","Dresses","₦94,000","11 in stock"],["Zuri Wrap Dress","Dresses","₦72,000","15 in stock"],["Sade Draped Midi","Dresses","₦86,000","13 in stock"]]:view==="orders"?[["VM-DEMO01","Sample customer","₦97,500","Requested"],["VM-DEMO02","Sample customer","₦77,500","Requested"]]:[["Sample review","Adaeze Maxi Dress","5 / 5","Pending"],["Sample review","Zuri Wrap Dress","4 / 5","Approved"]];return <div className="showcase-admin-mock"><aside><strong>VELMORA</strong><span>STORE ADMIN</span><b className={view==="orders"?"active":""}>Orders</b><b className={view==="products"?"active":""}>Products</b><b className={view==="reviews"?"active":""}>Reviews</b></aside><main><span>STORE MANAGEMENT</span><h3>{title}</h3><p>Sample data shown for portfolio presentation.</p><div className="showcase-admin-table"><div className="showcase-admin-row head"><span>{view==="orders"?"REFERENCE":view==="reviews"?"REVIEW":"PRODUCT"}</span><span>{view==="orders"?"CUSTOMER":"PIECE"}</span><span>{view==="reviews"?"RATING":"PRICE"}</span><span>STATUS</span></div>{rows.map((row,i)=><div className="showcase-admin-row" key={i}>{row.map((cell,j)=><span key={j}>{cell}</span>)}</div>)}</div></main></div>}
export default function Showcase(){return <main className="showcase-page"><div className="showcase-top"><span>VELMORA / RESPONSIVE COMMERCE</span><Link href="/">OPEN STORE ↗</Link></div><header className="showcase-cover"><div><span>PORTFOLIO CONCEPT · 2026</span><h1>VELMORA<br/><em>on every screen.</em></h1><p>A screen-by-screen view of the fashion shopping experience, arranged by the way a customer moves through it.</p><nav><a href="#discovery">01 DISCOVERY</a><a href="#order">02 ORDER JOURNEY</a><a href="#personal">03 YOUR EDIT</a><a href="#care">04 CARE & BRAND</a><a href="#operations">05 ADMIN</a></nav></div><img src="/wine-maxi.webp" alt="Adaeze Maxi Dress in wine"/></header>{groups.map((group,i)=><section className="showcase-chapter" id={["discovery","order","personal","care"][i]} key={group.title}><div className="showcase-chapter-head"><span>{group.label}</span><h2>{group.title}</h2><p>{group.intro}</p></div>{group.screens.map(screen=><ScreenPair key={screen.number} screen={screen}/>)}</section>)}<section className="showcase-chapter" id="operations"><div className="showcase-chapter-head"><span>05 / OPERATIONS</span><h2>Behind the store.</h2><p>The protected admin area manages products, order requests, and review approvals. These frames use sample data; the actual admin pages require owner sign-in.</p></div>{(["products","orders","reviews"] as const).map((view,i)=><article className="showcase-screen" key={view}><div className="showcase-screen-head"><span>{String(i+15).padStart(2,"0")} / ADMIN {view.toUpperCase()}</span><small>Read-only portfolio preview</small></div><AdminPreview view={view}/></article>)}</section><footer className="showcase-end"><span>VELMORA / END OF SCREEN STUDY</span><Link href="/">EXPLORE THE LIVE STORE ↗</Link></footer></main>}
