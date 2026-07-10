import React from "react";
import { motion } from "framer-motion";
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
      className={`flex flex-col items-center lg:items-start text-center lg:text-left px-4 py-4 ${
        border ? "lg:border-r border-gray-300" : ""
      }`}
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
  const counters = [
    {
      end: 20,
      title: "Parts installed per day",
    },
    {
      end: 100,
      title: "Happy customers weekly",
    },
    {
      end: 10,
      title: "New clients daily",
    },
  ];

  return (
    <section className="bg-white">

      <div className="grid lg:grid-cols-2 items-center">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="order-1 h-80 sm:h-112.5 md:h-137.5 lg:h-200"
        >
          <img
            src={heroImg}
            alt="Plumber"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="order-2 px-5 sm:px-8 md:px-10 lg:px-16 py-10 sm:py-14 lg:py-20"
        >

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900"
          >
            We solve,
            <br />
            you evolve —
            <br />
            plumbing services
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 text-gray-500 text-base sm:text-lg leading-7 sm:leading-9 max-w-xl"
          >
            At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum
            deleniti atque corrupti.
          </motion.p>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.7,
              delay: 0.6,
            }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-10 bg-primary hover:bg-primary/90 text-white px-7 sm:px-10 py-3 sm:py-4 font-semibold transition cursor-pointer"
          >
            More Information
          </motion.button>

          {/* Counters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 sm:mt-16"
          >
            {counters.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 60,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <Counter
                  end={item.end}
                  title={item.title}
                  border={index !== counters.length - 1}
                />
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

      </div>

      {/* Next Section */}
      <QualityAssurance />

    </section>
  );
};

export default Hero;