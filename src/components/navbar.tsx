"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hexagon } from "lucide-react";
import { ModeToggle } from "./toggle";
// import { useTheme } from "next-themes";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300  ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="font-bold text-xl flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Hexagon className="h-6 w-6" />
            <span className="text-primary">Axioz360</span>
            <span className="text-muted-foreground"></span>
          </motion.div>
          <div className="hidden md:flex items-center justify-center space-x-16 text-lg	">
            <div className="flex text-2xl">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#services">Services</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <ModeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <motion.button
              onClick={toggleMenu}
              className="focus:outline-none focus:ring-2 focus:ring-ring rounded-md p-2 ml-2 transition-colors duration-200 hover:bg-accent"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
          >
            <div className="flex flex-col items-center py-4 space-y-2">
              <MobileNavLink href="#home" onClick={toggleMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink href="#about" onClick={toggleMenu}>
                About
              </MobileNavLink>
              <MobileNavLink href="#services" onClick={toggleMenu}>
                Services
              </MobileNavLink>
              <MobileNavLink href="#contact" onClick={toggleMenu}>
                Contact
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div className="relative overflow-hidden">
      <motion.a
        href={href}
        className="transition-colors duration-200 px-3 py-2 text-sm font-medium inline-block"
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
          variants={{
            rest: { left: "-100%" },
            hover: { left: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.a>
    </motion.div>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="transition-colors duration-200 px-4 py-2 text-lg font-medium w-full text-center"
      whileHover={{ backgroundColor: "hsl(var(--accent))" }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

// function ThemeToggle() {
//   const { setTheme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
