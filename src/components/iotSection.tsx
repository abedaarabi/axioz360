"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import iotimg from "../../public/img/iot-img.png";
import { useEffect, useRef } from "react";

export default function Dynamic3DModelSection() {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current) {
          const iframe = videoRef.current;
          const src = iframe.src;
          iframe.src = `${src}&autoplay=1&mute=1`;
          observer.unobserve(iframe);
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Dynamic 3D Model Integration
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Seamlessly integrate your internal data into a dynamic 3D model,
              empowering teams to make early, data-driven decisions that add
              real value to every stage of your project. Unlock insights and
              enhance collaboration with a visually intuitive model that brings
              critical information to life, guiding smarter strategies from the
              start.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Learn More
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={iotimg}
                alt="Dynamic 3D Model Visualization"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col items-center justify-between gap-12 mt-20 lg:mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Evaluate CO₂ Emissions Impact in the Design Phase
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Leverage BIM and 3D modeling to assess the environmental impact of
              design choices from the start. By integrating real-time CO₂
              emissions data, you can make informed adjustments that enhance
              sustainability, reduce waste, and optimize material
              usage—ultimately creating designs that are efficient,
              eco-friendly, and future-ready.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Learn More
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            <iframe
              ref={videoRef}
              className="w-full aspect-video rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/POwIkU2tC7E"
              frameBorder="0"
              title="Product Overview Video"
              allow="autoplay; encrypted-media"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
