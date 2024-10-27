"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import iotimg from "../../public/img/iot-img.png";
import ddrawing from "../../public/img/2d_drawing.png";
// import { ImageSliderComponent } from "./image-slider";
import { useState, useEffect } from "react";

export default function Dynamic3DModelSection() {
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent === null) {
      setShowCookiePopup(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowCookiePopup(false);
    // Here you can add logic to enable cookies or tracking
  };

  const handleDenyCookies = () => {
    localStorage.setItem("cookieConsent", "denied");
    setShowCookiePopup(false);
    // Here you can add logic to disable cookies or tracking
  };

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-center"
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
            className="lg:w-1/2"
          >
            <div className="relative p-1 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 blur-sm"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-2">
                <Image
                  src={iotimg}
                  alt="Dynamic 3D Model Visualization"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-20 lg:mt-32 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full order-2 lg:order-1"
          >
            <iframe
              className="w-full aspect-video rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/POwIkU2tC7E"
              frameBorder="0"
              title="Product Overview Video"
              aria-hidden="true"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full order-1 text-center lg:order-2 mb-8 lg:mb-0  "
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
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-20 lg:mt-32 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Effortless Collaboration and Editing for Your Drawings
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Work seamlessly with powerful, user-friendly markup tools designed
              for easy drawing collaboration. Add and edit markups directly on
              your PDFs, ensuring that feedback is clear and actionable. Store
              documents securely, and share them instantly with your team,
              making it easier than ever to keep everyone aligned and
              up-to-date.
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
            <div className="relative p-1 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 blur-sm"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-xl p-2">
                <Image
                  src={ddrawing}
                  alt="Dynamic 3D Model Visualization"
                  width={800}
                  height={600}
                  className="w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* <div>
        <ImageSliderComponent
          images={[
            { src: iotimg, alt: "2d drawing" },
            { src: ddrawing, alt: "2d drawing" },
          ]}
        />
      </div> */}
      {showCookiePopup && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-50 max-w-md mx-auto"
        >
          <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking &quot;Accept&quot;, you consent to our use of
            cookies.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDenyCookies}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-300"
            >
              Deny
            </button>
            <button
              onClick={handleAcceptCookies}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
