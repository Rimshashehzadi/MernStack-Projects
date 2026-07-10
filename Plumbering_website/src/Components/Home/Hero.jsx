import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import heroImg from "../../assets/hero.png";
import QualityAssurance from "./QualityAssurance";

const Counter = ({ end, title, border }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <div
      ref={ref}
      className={`
        flex flex-col items-center lg:items-start
        text-center lg:text-left
        px-4 py-4
        ${border ? "lg:border-r border-gray-300" : ""}
      `}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
        {inView && <CountUp end={end} duration={2.5} />}
        <span className="text-primary">+</span>
      </h2>

      <p className="mt-2 text-sm sm:text-base lg:text-lg font-semibold text-gray-700 max-w-42.5">
        {title}
      </p>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="bg-white">

      <div className="grid lg:grid-cols-2 items-center">

        {/* Left Image */}
        <div className="order-1 h-75 sm:h-112.5 md:h-137.5 lg:h-200">
          <img
            src={heroImg}
            alt="Plumber"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="order-2 px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-14 lg:py-20">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
            We solve,
            <br />
            you evolve —
            <br />
            plumbing services
          </h1>

          <p className="mt-6 sm:mt-8 text-gray-500 text-base sm:text-lg leading-7 sm:leading-9 max-w-xl">
            At vero eos et accusamus et iusto odio dignissimos ducimus
            qui blanditiis praesentium voluptatum deleniti atque
            corrupti.
          </p>

          <button className="mt-8 sm:mt-10 bg-primary hover:bg-primary/90 text-white px-7 sm:px-10 py-3 sm:py-4 font-semibold transition duration-300 cursor-pointer">
            More Information
          </button>

          {/* Counters */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-12 sm:mt-16">

            <Counter
              end={20}
              title="Parts installed per day"
              border={true}
            />

            <Counter
              end={100}
              title="Happy customers weekly"
              border={true}
            />

            <Counter
              end={10}
              title="New clients daily"
              border={false}
            />

          </div>

        </div>

      </div>

      <QualityAssurance />

    </section>
  );
};

export default Hero;