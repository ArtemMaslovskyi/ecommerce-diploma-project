import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import mainLogo from "../mainLogo.png";
import auction from "../pages/auction.png";

export default function About() {
  return (
    <div className="*:bg-main-yellow/70">
      <Parallax pages={4}>
        <ParallaxLayer
          className="bg-graph-pattern"
          speed={-0.3}
          style={{
            backgroundRepeat: "repeat-x",
            backgroundPositionY: "center",
          }}
        >
          <div className="flex justify-center w-full backdrop-blur-sm">
            <img
              src={mainLogo}
              alt="logo"
              className="w-[600px] h-[600px] "
            ></img>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={0.8} className="bg-main-blue">
          <div className="">
            <h2 className="m-10 text-6xl font-bold text-center text-main-yellow">
              Corgi-Wallet Bazaar
            </h2>
            <div className="flex">
              <div className="w-2/4">
                <p className="m-8 text-2xl text-white">
                  This is a trading platform where you can put your lots up for
                  auction and sell them
                </p>
              </div>
              <img src={auction} alt="auction" className="m-8" />
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
