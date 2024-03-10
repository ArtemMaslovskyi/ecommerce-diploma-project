import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import background1 from "../pages/background1.png";

export default function About() {
  return (
    <div className="*:bg-gradient-to-b from-blue-800/80 to-main-yellow/50">
      <Parallax pages={4}>
        <ParallaxLayer speed={0.5}>
          <h2 className="m-6 font-bold text-center text-8xl text-main-yellow">
            Who are we?
          </h2>
          <p className="absolute bottom-0 text-4xl text-center right-2/4 text-white/80">
            We are trading platform that provides
          </p>
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 1, end: 2 }} speed={1}>
          <div className="absolute flex p-6 rounded-2xl w-fit bg-main-yellow right-2/4">
            <h2 className="text-3xl font-bold text-slate-100">Trading of:</h2>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.5}>
          <div>
            <h2>fdsf</h2>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
