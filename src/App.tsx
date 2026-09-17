import { useCallback, useEffect, useState } from "react";
import {
  HashRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";

const EASE = [0.22, 1, 0.36, 1] as const;

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function Site() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative min-h-screen bg-ink text-bone"
    >
      <ScrollToTop />
      <Cursor />
      <Navbar />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <BackToTop />
    </motion.div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);

  return (
    <HashRouter>
      <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.95 }}>
        <AnimatePresence>{!ready && <Preloader key="preloader" onDone={done} />}</AnimatePresence>
        {ready ? <Site /> : <div className="min-h-screen bg-ink" />}
      </ReactLenis>
    </HashRouter>
  );
}
