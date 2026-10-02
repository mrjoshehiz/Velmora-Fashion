"use client";
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
export default function ShaderColour(){return <ShaderGradientCanvas style={{position:'absolute',inset:0}} pixelDensity={1} pointerEvents="none" powerPreference="low-power"><ShaderGradient type="plane" color1="#2346c7" color2="#879dcc" color3="#192e68" lightType="3d" cDistance={3.6} cPolarAngle={90} rotationX={0} rotationY={10} rotationZ={45} uSpeed={.12} uStrength={3} uFrequency={5} grain="off" brightness={1.1}/></ShaderGradientCanvas>}
