import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PrismaticBurst from './PrismaticBurst.jsx';
import WatchSpline from "./WatchSpline";
import Silk from "./Silk";

function CountUp({ end, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = end / (duration * 60);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}
function App() {
  const [activated, setActivated] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;

      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const revealVariant = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };
  useEffect(() => {
    const handleWheel = () => {
      if (!activated) {
        setActivated(true);
        setShowContent(true);
      }
    };

    window.addEventListener("wheel", handleWheel, { once: true });

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);


  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-black via-[#0b0b0b] to-black">
      <div className="fixed inset-0 -z-10">

      </div>

      {!showContent && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: activated ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-0"
        >
          <PrismaticBurst
            animationType="rotate3d"
            intensity={0.3}
            speed={0.15}
            distort={0}
            paused={false}
            offset={{ x: 0, y: 0 }}
            hoverDampness={0.25}
            rayCount={0}
            mixBlendMode="lighten"
            colors={["#0ea5e9", "#234eab", "#ffffff"]}
          />
        </motion.div>
      )}





      <motion.h1
        initial={{
          scale: 1,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={
          activated
            ? {
              scale: 0.3,
              top: "-12px",
              left: "-12px",
              x: "0%",
              y: "0%",
            }
            : {
              scale: 1,
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
            }
        }
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed text-8xl font-semibold tracking-wider z-50"
      >
        ORBIT
      </motion.h1>
      {activated && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* NAVBAR */}
          <nav className="fixed top-0 left-0 w-full flex justify-end items-center px-10 py-6 bg-[#000000] z-40">
            <div className="space-x-8 text-sm tracking-wide">
              <a href="#features" className="hover:text-white transition" >Features</a>
              <a href="#" className="hover:text-white transition">Performance</a>
              <a href="#stats" className="hover:text-white transition">Stats</a>
              <a id="pricing" href="#pricing" className="border border-white px-4 py-2 rounded-full">
                Buy Now
              </a>
            </div>
          </nav>
        </motion.nav>
      )}


      {
        showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}

          >



            {/* HERO */}
            <section id="hero" className="min-h-screen flex items-center justify-between px-20 pt-8">
              <div className="w-1/2">
                <h2 className="text-7xl md:text-8xl font-extrabold mb-6 leading-[1.05] bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Track Beyond Limits.
                </h2>
                <p className="text-gray-400 mb-8 max-w-md">
                  The next-gen smart fitness watch built for precision and performance.
                </p>
              </div>
              <div className="w-[500px] h-[600px] ">
                <WatchSpline />
              </div>


            </section>

            {/* FEATURES */}
            <motion.section
              id="features"
              variants={revealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="min-h-screen flex flex-col items-center justify-center px-20 bg-gradient-to-b from-black via-[#0b0b0b] to-black"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-24 text-center tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Crafted for Excellence
              </h2>

              <div className="relative w-full max-w-6xl flex items-center justify-between">

                {/* LEFT FEATURES */}
                <div className="flex flex-col gap-20 w-1/3">

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <h3 className="text-2xl font-medium mb-3 group-hover:text-white transition">
                      Sleep Analysis
                    </h3>
                    <div className="w-12 h-[1px] bg-white/40 mb-4"></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Precision recovery tracking designed for refined performance.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <h3 className="text-2xl font-medium mb-3 group-hover:text-white transition">
                      GPS Tracking
                    </h3>
                    <div className="w-12 h-[1px] bg-white/40 mb-4"></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Advanced route accuracy engineered with sophistication.
                    </p>
                  </motion.div>

                </div>


                {/* CENTER WATCH */}
                <motion.div
                  style={{
                    x: mousePos.x * 10,
                    y: mousePos.y * 10,
                  }}
                  className="relative w-80 h-80 flex items-center justify-center"
                >
                  <div className="absolute w-96 h-96 bg-white/5 blur-[140px] rounded-full"></div>

                  <img
                    src="/watch.png"
                    alt="Luxury Watch"
                    className="relative w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(255,255,255,0.08)]"
                  />
                </motion.div>


                {/* RIGHT FEATURES */}
                <div className="flex flex-col gap-20 w-1/3 text-right">

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <h3 className="text-2xl font-medium mb-3 group-hover:text-white transition">
                      Heart Monitoring
                    </h3>
                    <div className="w-12 h-[1px] bg-white/40 mb-4 ml-auto"></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Continuous biometric intelligence with refined precision.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <h3 className="text-2xl font-medium mb-3 group-hover:text-white transition">
                      14-Day Battery
                    </h3>
                    <div className="w-12 h-[1px] bg-white/40 mb-4 ml-auto"></div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Endurance crafted for timeless reliability.
                    </p>
                  </motion.div>

                </div>

              </div>
            </motion.section>


            {/* STATS */}
            <motion.section
              id="stats"
              variants={revealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="relative min-h-screen flex flex-col items-center justify-center 
  bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] overflow-hidden"
            >

           
              <div className="absolute w-[900px] h-[900px] bg-white/5 blur-[200px] rounded-full -z-10"></div>

              <h2 className="text-5xl md:text-6xl font-bold mb-24 text-center tracking-tight
  bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent">
                Performance Backed by Data
              </h2>

              <div className="grid grid-cols-4 gap-16 text-center">

                {/* CARD */}
                <div className="p-10 rounded-2xl 
      bg-gradient-to-b from-[#111111] to-[#0b0b0b]
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
      transition-all duration-300
      hover:border-white/30
      hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]
      hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2 text-white">
                    <CountUp end={98} />%
                  </h3>
                  <p className="text-gray-400 text-sm tracking-wide">Accuracy</p>
                </div>

                <div className="p-10 rounded-2xl 
      bg-gradient-to-b from-[#111111] to-[#0b0b0b]
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
      transition-all duration-300
      hover:border-white/30
      hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]
      hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2 text-white">
                    <CountUp end={24} />
                  </h3>
                  <p className="text-gray-400 text-sm tracking-wide">Monitoring</p>
                </div>

                <div className="p-10 rounded-2xl 
      bg-gradient-to-b from-[#111111] to-[#0b0b0b]
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
      transition-all duration-300
      hover:border-white/30
      hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]
      hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2 text-white">
                    <CountUp end={50} />+
                  </h3>
                  <p className="text-gray-400 text-sm tracking-wide">Workout Modes</p>
                </div>

                <div className="p-10 rounded-2xl 
      bg-gradient-to-b from-[#111111] to-[#0b0b0b]
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
      transition-all duration-300
      hover:border-white/30
      hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]
      hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2 text-white">
                    <CountUp end={14} /> Days
                  </h3>
                  <p className="text-gray-400 text-sm tracking-wide">Battery Life</p>
                </div>

              </div>
            </motion.section>


            {/* PRICING */}
            <motion.section
              id="pricing"
              variants={revealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="relative min-h-screen flex flex-col items-center justify-center 
  bg-[#050505]"
            >

              <h2 className="text-5xl font-semibold mb-16 
  bg-gradient-to-r from-gray-300 via-white to-gray-400 
  bg-clip-text text-transparent">
                Choose Your Orbit
              </h2>

              <div className="flex gap-16">

             
                <div className="w-80 p-10 rounded-2xl 
      bg-gradient-to-b from-[#111] to-[#0a0a0a]
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
      transition duration-300
      hover:border-white/30
      hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]
      hover:scale-105 text-center">

                  <img
                    src="/watch1.png"   
                    alt="Orbit Standard"
                    className="w-40 mx-auto mb-6 object-contain"
                  />

                  <h3 className="text-2xl text-gray-200 mb-2">Orbit Standard</h3>
                  <p className="text-4xl font-bold text-white mb-6">₹9,999</p>

                  <button className="px-6 py-3 rounded-full 
        bg-white text-black font-medium 
        transition duration-300 
        hover:bg-gray-200">
                    Buy Now
                  </button>
                </div>


      
                <div className="w-80 p-10 rounded-2xl 
      bg-gradient-to-b from-[#111] to-[#0a0a0a]
      border border-white/10
      shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
      transition duration-300
      hover:border-white/30
      hover:shadow-[0_0_35px_rgba(255,255,255,0.15)]
      hover:scale-105 text-center">

               
                  <img
                    src="/watch2.png"  
                    alt="Orbit Pro"
                    className="w-40 mx-auto mb-6 object-contain"
                  />

                  <h3 className="text-2xl text-gray-200 mb-2">Orbit Pro</h3>
                  <p className="text-4xl font-bold text-white mb-6">₹14,999</p>

                  <button className="px-6 py-3 rounded-full 
        bg-white text-black font-medium 
        transition duration-300 
        hover:bg-gray-200">
                    Buy Now
                  </button>
                </div>

              </div>
            </motion.section>

          </motion.div >


        )
      }


    </div >
  );
}
export default App;