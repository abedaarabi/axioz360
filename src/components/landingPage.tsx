"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BarChart2,
  GitBranch,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const cards = [
    {
      title: "Data Analysis",
      description:
        "Unlock insights from your data with our advanced analysis techniques.",
      icon: BarChart2,
    },
    {
      title: "AI Integration",
      description:
        "Seamlessly integrate AI into your existing systems for smarter decision-making.",
      icon: GitBranch,
    },
    {
      title: "Custom Solutions",
      description:
        "Tailored solutions designed to meet your specific business needs and challenges.",
      icon: Zap,
    },
    {
      title: "Cloud Migration",
      description:
        "Effortlessly transition your operations to the cloud for improved scalability and efficiency.",
      icon: ArrowRight,
    },

    {
      title: "AI Integration",
      description:
        "Seamlessly integrate AI into your existing systems for smarter decision-making.",
      icon: GitBranch,
    },
    {
      title: "Custom Solutions",
      description:
        "Tailored solutions designed to meet your specific business needs and challenges.",
      icon: Zap,
    },
    {
      title: "Cloud Migration",
      description:
        "Effortlessly transition your operations to the cloud for improved scalability and efficiency.",
      icon: ArrowRight,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const chartData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 600 },
    { name: "Apr", value: 800 },
    { name: "May", value: 500 },
    { name: "Jun", value: 700 },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-black dark:text-blue-400"
          >
            Axioz360
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-800 dark:text-gray-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="hidden md:flex space-x-6">
              <Link
                href="#about"
                className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link
                href="#services"
                className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Services
              </Link>
              <Link
                href="#project"
                className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Project
              </Link>
              <Link
                href="#contact"
                className="text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </div>
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
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              onClick={toggleMenu}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#project"
              onClick={toggleMenu}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Project
            </Link>
            <Link
              href="#contact"
              onClick={toggleMenu}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence> */}

      <main className="pt-16">
        <div className="bg-cover min-h-screen flex flex-col justify-center items-center p-4 md:p-8 dark:bg-gray-800 bg-[url('/data.jpg')]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold text-center mb-6 dark:text-white text-white"
          >
            Data and Decision
            <br />
            Intelligence Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-center mb-8 max-w-2xl text-white dark:text-gray-300"
          >
            Empowering businesses with cutting-edge applications and custom
            solutions using Autodesk APS and BIM technology.
          </motion.p>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group flex items-center text-lg md:text-xl bg-white text-black px-6 py-3 rounded-full hover:bg-black-700 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </div>

        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
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
              className="text-xl md:text-2xl text-center mb-12 max-w-3xl mx-auto"
            >
              We are a leading consulting company specializing in Data and
              Decision Intelligence solutions. Our expertise lies in leveraging
              Autodesk APS and BIM technology to build powerful applications,
              seamless integrations, and tailored solutions that drive business
              growth and innovation.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:ease-in"
                >
                  <card.icon className="w-12 h-12 mb-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                  <p>{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Custom Applications",
                  description:
                    "Develop tailored applications that leverage the power of Autodesk APS and BIM technology.",
                },
                {
                  title: "Integrations",
                  description:
                    "Seamlessly connect your existing systems with Autodesk APS for improved workflow and efficiency.",
                },
                {
                  title: "Data Analytics",
                  description:
                    "Transform your data into actionable insights with advanced analytics solutions.",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="project" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-12 text-center"
            >
              Featured Project
            </motion.h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:w-1/2 mb-8 md:mb-0"
              >
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Project+Image"
                  alt="Featured Project"
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
                <h3 className="text-2xl font-bold mb-4">
                  Smart Building Management System
                </h3>
                <p className="text-lg mb-6">
                  Leveraging Autodesk APS and BIM technology, we developed a
                  comprehensive smart building management system that optimizes
                  energy usage, improves occupant comfort, and reduces
                  operational costs.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="/project-details"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  >
                    See More
                  </Link>
                  <Link
                    href="/"
                    className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white px-6 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    <ArrowLeft className="inline-block mr-2" />
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Project Overview
              </h3>
              <div>
                {/* <video
                  src="https://youtu.be/POwIkU2tC7E"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-lg"
                ></video> */}
                <video width="320" height="240" controls preload="none">
                  <source src="/path/to/video.mp4" type="video/mp4" />
                  <track
                    src="https://www.youtube.com/watch?v=bNyUyrR0PHo"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                    className="w-full h-full rounded-lg shadow-lg"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-12 text-center"
            >
              Business Impact
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Productivity Increase",
                  color: "from-green-400 to-blue-500",
                },
                {
                  title: "Cost Reduction",
                  color: "from-purple-400 to-pink-500",
                },
                {
                  title: "Customer Satisfaction",
                  color: "from-yellow-400 to-orange-500",
                },
              ].map((chart, index) => (
                <motion.div
                  key={chart.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${chart.color} p-6 rounded-lg shadow-lg`}
                >
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {chart.title}
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#ffffff" />
                        <YAxis stroke="#ffffff" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
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
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-lg mx-auto"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-lg mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-lg mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-lg mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Axioz360. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
