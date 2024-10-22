"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import data from "../../public/img/data .jpg";
import dataone from "../../public/img/dataone.jpg";
import {
  Menu,
  X,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  BarChart2,
  GitBranch,
  Zap,
  Cloud,
  Sun,
  Moon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const services = [
    {
      title: "Data Analysis",
      description: "Unlock insights from your data",
      icon: BarChart2,
    },
    {
      title: "AI Integration",
      description: "Enhance systems with AI",
      icon: GitBranch,
    },
    {
      title: "Custom Solutions",
      description: "Tailored to your needs",
      icon: Zap,
    },
    {
      title: "Cloud Migration",
      description: "Seamless cloud transitions",
      icon: Cloud,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-300">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md transition-colors duration-300">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-black dark:text-white flex items-center"
          >
            <svg
              className="w-8 h-8 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Axioz360
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              href="#about"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="#projects"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                ))}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden text-black dark:text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center space-y-8 text-2xl"
          >
            <Link
              href="#about"
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="#projects"
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative ">
        <section className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8 bg-blue-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Data and Decision
              <br />
              Intelligence Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Empowering businesses with cutting-edge applications and custom
              solutions using Autodesk APS and BIM technology.
            </p>
            <Link
              href={"login"}
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-8 text-center"
            >
              About Axioz360
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-left mb-5 max-w-5xl mx-auto text-gray-600 dark:text-gray-400:"
            >
              Axioz360 is a premier consulting firm specializing in Data and
              Decision Intelligence solutions. We empower organizations by
              harnessing the full potential of Autodesk APS and BIM technologies
              to deliver cutting-edge applications, seamless system
              integrations, and bespoke solutions that accelerate business
              growth and innovation. Our expertise extends to enabling
              businesses to integrate advanced AI capabilities within both
              on-premise and cloud environments, driving digital transformation
              and operational excellence.
            </motion.p>
          </div>
        </section>

        <section id="services" className="py-20 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-12 text-center"
            >
              Our Services
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                >
                  <service.icon className="w-12 h-12 mb-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="image-text" className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <Image
                  src={data}
                  alt="Axioz360 Visualization"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2 md:pl-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Innovative Solutions
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  At Axioz360, we combine cutting-edge technology with industry
                  expertise to deliver innovative solutions that transform
                  businesses. Our approach to data and decision intelligence is
                  designed to give you a competitive edge in today's fast-paced
                  digital landscape.
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
          </div>
        </section>

        <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-12 text-center"
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Smart Building Management",
                  description:
                    "Optimized energy usage and improved occupant comfort using Autodesk APS and BIM technology.",
                },
                {
                  title: "Data-Driven Manufacturing",
                  description:
                    "Increased production efficiency by 30% through custom Autodesk APS integrations and analytics.",
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Learn more →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-12 text-center"
            >
              Get in Touch
            </motion.h2>
            <div className="flex flex-col md:flex-row justify-between items-start max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 mr-4 text-blue-600 dark:text-blue-400" />
                    <span>info@axioz360.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 mr-4 text-blue-600 dark:text-blue-400" />
                    {/* <span>+1 (555) 123-4567</span> */}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 mr-4 text-blue-600 dark:text-blue-400" />
                    <span>Copenhagen Denmark</span>
                  </div>
                </div>
              </motion.div>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-[80%] w-[80%] bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg m-auto"
              >
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-lg mb-2 text-gray-600 dark:text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-lg mb-2 text-gray-600 dark:text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-lg mb-2 text-gray-600 dark:text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            &copy; 2024 Axioz360. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
