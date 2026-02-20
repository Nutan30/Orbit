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
    <div className="relative min-h-screen text-white bg-[#0B0B0F]">
      <div className="fixed inset-0 -z-10">
        <Silk
          speed={3.1}
          scale={0.8}
          color="#0c0c0d"
          noiseIntensity={0}
          rotation={0}
        />
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





      {/* ORBIT LOGO */}
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
          <nav className="fixed top-0 left-0 w-full flex justify-end items-center px-10 py-6 bg-[#0B0B0F] z-40">
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
              className="min-h-screen flex flex-col items-center justify-center relative px-10"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-24 text-center tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Engineered for Precision
              </h2>

              <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.5, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute w-72 h-72 rounded-full bg-blue-500/3 blur-3xl"
                ></motion.div>
                <motion.div
                  style={{
                    x: mousePos.x * 20,
                    y: mousePos.y * 20,
                  }}
                  className="relative w-64 h-64 flex items-center justify-center z-20"
                >
                  {/* Glow */}
                  <div className="absolute w-48 h-48 bg-gradient-radial from-blue-500/30 to-transparent blur-2xl"></div>

                  {/* Watch Image */}
                  <img
                    src="/watch.png"
                    alt="Watch"
                    className="relative w-full h-full object-contain drop-shadow-[0_0_35px_rgba(0,150,255,0.35)]"
                  />
                </motion.div>





                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 120,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    x: mousePos.x * 10,
                    y: mousePos.y * 10,
                  }}

                  className="absolute w-full h-full"
                >

                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 600 600"
                  >

                    {/* TOP */}
                    <motion.line
                      x1="300"
                      y1="300"
                      x2="300"
                      y2="120"
                      stroke="rgba(0,150,255,0.25)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 180, strokeDashoffset: 180 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />

                    {/* RIGHT */}
                    <motion.line
                      x1="300"
                      y1="300"
                      x2="480"
                      y2="300"
                      stroke="rgba(0,150,255,0.25)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 180, strokeDashoffset: 180 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />

                    {/* BOTTOM */}
                    <motion.line
                      x1="300"
                      y1="300"
                      x2="300"
                      y2="480"
                      stroke="rgba(0,150,255,0.25)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 180, strokeDashoffset: 180 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />

                    {/* LEFT */}
                    <motion.line
                      x1="300"
                      y1="300"
                      x2="120"
                      y2="300"
                      stroke="rgba(0,150,255,0.25)"
                      strokeWidth="1.5"
                      initial={{ strokeDasharray: 180, strokeDashoffset: 180 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />

                  </svg>


                  {/* TOP */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-[-330px]">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="text-center max-w-[200px] bg-[#111115] border border-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-lg transition duration-300 hover:scale-105 hover:border-blue-400/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.25)]">
                        <div className="w-10 h-[2px] bg-blue-400 mx-auto mb-4 opacity-60"></div>
                        <h3 className="text-xl font-semibold tracking-wide mb-2">Heart Monitoring</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Real-time precision tracking
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* RIGHT */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 translate-x-[140px]">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="text-center max-w-[200px] bg-[#111115] border border-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-lg transition duration-300 hover:scale-105 hover:border-blue-400/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.25)]">
                        <div className="w-10 h-[2px] bg-blue-400 mx-auto mb-4 opacity-60"></div>
                        <h3 className="text-xl font-semibold tracking-wide mb-2">GPS Tracking</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Accurate outdoor routes
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* BOTTOM */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-[180px]">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="text-center max-w-[200px] bg-[#111115] border border-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-lg transition duration-300 hover:scale-105 hover:border-blue-400/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.25)]">
                        <div className="w-10 h-[2px] bg-blue-400 mx-auto mb-4 opacity-60"></div>
                        <h3 className="text-xl font-semibold tracking-wide mb-2">Sleep Analysis</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Deep recovery insights
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* LEFT */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 translate-x-[-340px]">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="text-center max-w-[200px] bg-[#111115] border border-white/5 backdrop-blur-md rounded-xl px-6 py-5 shadow-lg transition duration-300 hover:scale-105 hover:border-blue-400/40 hover:shadow-[0_0_25px_rgba(0,150,255,0.25)]">
                        <div className="w-10 h-[2px] bg-blue-400 mx-auto mb-4 opacity-60"></div>
                        <h3 className="text-xl font-semibold tracking-wide mb-2">14-Day Battery</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Endurance built for athletes
                        </p>
                      </div>
                    </motion.div>
                  </div>

                </motion.div>

              </div>

            </motion.section>


            {/* STATS */}
            <motion.section
              id="stats"
              variants={revealVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="min-h-screen flex flex-col items-center justify-center">
              <h2 className="text-5xl md:text-6xl font-bold mb-24 text-center tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Performance Backed by Data
              </h2>

              <div className="grid grid-cols-4 gap-16 text-center">
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2"><CountUp end={98} />%</h3>
                  <p className="text-gray-400 text-sm">Accuracy</p>
                </div>
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2"><CountUp end={24} /></h3>
                  <p className="text-gray-400 text-sm">Monitoring</p>
                </div>
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2"><CountUp end={50} />+</h3>
                  <p className="text-gray-400 text-sm">Workout Modes</p>
                </div>
                <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105">
                  <h3 className="text-5xl font-bold mb-2"><CountUp end={14} /> Days</h3>
                  <p className="text-gray-400 text-sm">Battery Life</p>
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
              className="min-h-screen flex flex-col items-center justify-center">
              <h2 className="text-4xl font-semibold mb-16">
                Choose Your Orbit
              </h2>

              <div className="flex gap-12">
                <div className="bg-gray-900 p-10 rounded-2xl w-80 text-center">
                  <h3 className="text-2xl mb-4">Orbit Standard</h3>
                  <p className="text-4xl font-bold mb-6">₹9,999</p>
                  <ul className="text-gray-400 space-y-3 mb-6">
                    <li>7-Day Battery</li>
                    <li>50+ Workout Modes</li>
                    <li>Basic AI Insights</li>
                  </ul>
                  <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300">
                    Select Plan
                  </button>
                </div>

                <div className="bg-gray-800 p-10 rounded-2xl w-80 text-center border border-white">
                  <h3 className="text-2xl mb-4">Orbit Pro</h3>
                  <p className="text-4xl font-bold mb-6">₹14,999</p>
                  <ul className="text-gray-400 space-y-3 mb-6">
                    <li>14-Day Battery</li>
                    <li>Advanced AI Insights</li>
                    <li>Premium Titanium Body</li>
                  </ul>
                  <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition duration-300">
                    Select Plan
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