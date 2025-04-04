import React from "react";
import { Button, Card, CardMedia } from "@mui/material";
import carpenter from "../assets/carpenter.jpg";
import electricians from "../assets/electrician.jpeg";
import plumber from "../assets/plumber.jpeg";
import painter from "../assets/painter.jpeg";
import blacksmith from "../assets/blacksmith.jpeg";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-30 py-16 bg-gradient-to-r from-white to-purple-100 overflow-hidden">
      {/* Left Content */}
      <div className="max-w-lg text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          We’re changing <br /> the way people connect
        </h1>
        <p className="mt-4 text-gray-600">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
        <div className="mt-6 flex justify-center md:justify-start gap-4">
          <Button
            variant="contained"
            color="primary"
            className="!bg-purple-600 hover:!bg-purple-700 !text-white !font-semibold !rounded-lg !shadow-md px-6 py-3"
          >
            Get started
          </Button>
          <Button
            variant="outlined"
            className="!border-purple-600 !text-purple-600 !font-semibold !rounded-lg !shadow-md hover:!bg-purple-100 px-6 py-3"
          >
            Live demo →
          </Button>
        </div>
      </div>

      {/* Right Content (Zigzag Layout with Material UI Cards) */}
      <div className="relative mt-12 md:mt-0 grid grid-cols-3 gap-20 max-w-lg md:max-w-xl">
        {/* Third Column (Centered) */}
        <div className="flex flex-col transform -translate-x-16 justify-center items-center gap-4" >
          <Card className="w-40 md:w-48 rounded-2xl shadow-lg transform rotate-12">
            <CardMedia component="img" image={blacksmith} alt="Blacksmith" />
          </Card>
        </div>
        {/* First Column (Shifted Up) */}
        <div className="flex flex-col items-end gap-12 transform -translate-y-12">
          <Card className="w-36 md:w-44 rounded-2xl shadow-lg transform rotate-12">
            <CardMedia component="img" image={carpenter} alt="Carpenter" />
          </Card>
          <Card className="w-36 md:w-44 rounded-2xl shadow-lg transform -rotate-6">
            <CardMedia component="img" image={plumber} alt="Plumber" />
          </Card>
        </div>

        {/* Second Column (Shifted Down) */}
        <div className="flex flex-col items-start gap-12 transform translate-y-15">
          <Card className="w-36 md:w-44 rounded-2xl shadow-lg transform -rotate-6">
            <CardMedia component="img" image={electricians} alt="Electricians" />
          </Card>
          <Card className="w-40 md:w-48 rounded-2xl shadow-lg transform rotate-6">
            <CardMedia component="img" image={painter} alt="Painter" />
          </Card>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
