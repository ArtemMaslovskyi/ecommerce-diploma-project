import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import mainLogo from "../mainLogo.png";
import auction from "../pages/auction.png";
import graphPattern from "../pages/graph.png";
import mission from "../pages/innovation.png";
import adventage from "../pages/competitive.png";

export default function About() {
  return (
    <div className="*:bg-main-yellow/70">
      <Parallax pages={6}>
        <ParallaxLayer offset={0} speed={0.6}>
          <div className="flex justify-center">
            <img src={graphPattern} alt="bg" className="w-full blur-sm" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1.7}
          speed={0.1}
          className="bg-[url('./pages/webb2.png')]"
          style={{
            backgroundRepeat: "repeat",
            mixBlendMode: "multiply",
            height: "1600px",
          }}
        ></ParallaxLayer>
        <ParallaxLayer className="" speed={-0.3}>
          <div className="flex justify-center w-full">
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
        <ParallaxLayer offset={2}>
          <div className="flex">
            <div className="w-1/2">
              <img src={mission} alt="mission" className="m-8" />
            </div>
            <div className="w-1/2">
              <h2 className="m-10 text-6xl font-bold text-center text-main-blue">
                Mission
              </h2>
              <p className="m-8 text-2xl text-neutral-800">
                Our mission is to create an innovative and attractive platform
                for auctions and sales of goods that promotes community
                development and ensures convenience and safety for all users.
                Our values include transparency, trust, innovation and
                accountability to our users.
              </p>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} className="bg-main-blue">
          <h2 className="m-10 text-6xl font-bold text-center text-main-yellow">
            Advantages
          </h2>
          <div className="flex">
            <div className="w-1/2">
              <p className="m-8 text-2xl text-white">
                <span className=" text-main-yellow">Corgi-Wallet Bazaar </span>
                is distinguished by a wide selection of products, a
                user-friendly interface and secure transactions. Our platform
                also offers a unique option to view prices in your chosen
                currency, making the trading process even more convenient for
                our users
              </p>
            </div>
            <div className="w-1/2">
              <img src={adventage} alt="adbatages" />
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
