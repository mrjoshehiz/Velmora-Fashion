"use client";
import { useState } from "react";
import { Rotate3D } from "lucide-react";
import type { Product } from "@/lib/shared";

const fabricByColour:Record<string,{material:string;feel:string;weather:string;care:string}>={
  Ivory:{material:"Draped satin blend",feel:"Fluid with a soft lustre",weather:"Best for indoor and evening wear",care:"Cool hand wash or specialist clean"},
  Wine:{material:"Structured crepe",feel:"Smooth with graceful weight",weather:"Comfortable for evening occasions",care:"Specialist clean; store hanging"},
  Cobalt:{material:"Fluid twill",feel:"Soft movement with gentle structure",weather:"Suitable for day-to-evening wear",care:"Cool gentle wash; steam lightly"},
  Forest:{material:"Satin-back crepe",feel:"Clean drape with a polished surface",weather:"Ideal for evening and air-conditioned events",care:"Specialist clean recommended"},
};
export function ProductStory({product}:{product:Product}){
  const [view,setView]=useState<"front"|"detail">("front");
  const fabric=fabricByColour[product.color]||{material:"Soft-touch woven blend",feel:"Light structure with considered movement",weather:"Designed for occasion and city wear",care:"Follow garment label; steam on low"};
  return <section className="product-story">
    <div className="story-cinema"><div className={`story-view ${view}`}><img src={product.image} alt={`${product.name}, ${view} view`}/></div><div className="story-view-controls"><button className={view==="front"?"active":""} onClick={()=>setView("front")}>Front</button><button className={view==="detail"?"active":""} onClick={()=>setView("detail")}>Texture</button><span><Rotate3D size={17}/> Hover to move</span></div></div>
    <div className="story-copy"><span>THE STORY BEHIND THE PIECE</span><h2>Shape. Colour.<br/>Movement.</h2><p>{product.description} The composition is kept deliberate so the silhouette, rather than excess detail, carries the moment.</p></div>
    <div className="fabric-intelligence"><div><span>FABRIC INTELLIGENCE</span><h2>Why it works.</h2></div><dl><div><dt>Material</dt><dd>{fabric.material}</dd></div><div><dt>Texture & movement</dt><dd>{fabric.feel}</dd></div><div><dt>Weather & occasion</dt><dd>{fabric.weather}</dd></div><div><dt>Care</dt><dd>{fabric.care}</dd></div></dl></div>
    <div className="craft-grid"><article><span>01 / SELECTION</span><h3>Fabric chosen for the silhouette.</h3><p>Weight, recovery and drape are considered together so the garment holds its line while staying comfortable.</p></article><article><span>02 / FORM</span><h3>Cut to move, not restrict.</h3><p>Seam placement and proportion focus attention on the wearer and allow the piece to work from arrival to after dark.</p></article><article><span>03 / FIT NOTE</span><h3>True to size.</h3><p>Shown as a styling reference in size M. Choose your usual size or visit the Fashion Lab for a measurement-based estimate.</p><a href="/fashion-lab#studio">Complete the look →</a></article></div>
  </section>
}
