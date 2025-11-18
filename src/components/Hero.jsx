import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const lines = [
  'We Engineer',
  'Attention,',
  'Emotion,',
  'Action.'
]

function DataTicker() {
  const items = [
    'Currently accepting 3 clients this quarter',
    '127% average conversion lift',
    '50+ brands transformed',
  ]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="mt-10 h-6 overflow-hidden text-[#2C5F4D] font-space text-sm tracking-tight">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5 }}
        className="will-change-transform"
      >
        {items[index]}
      </motion.div>
    </div>
  )
}

function ScrollIndicator() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 3000)
    const onScroll = () => setHidden(true)
    window.addEventListener('scroll', onScroll)
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center text-xs text-[#2C5F4D]"
    >
      <div className="relative h-16">
        <div className="w-px h-14 bg-[#2C5F4D]/80" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1.5 h-1.5 rounded-full bg-[#2C5F4D]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
      <div className="mt-2 opacity-80">Scroll to see psychology in action</div>
    </motion.div>
  )
}

function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const nnScale = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const nnY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#1A1A1A] text-[#FAFAFA] overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* Spline 3D cover on the right */}
      <motion.div
        style={{ scale: nnScale, y: nnY }}
        className="absolute right-0 top-0 h-screen w-[60vw] md:w-[60vw]"
      >
        <Spline scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </motion.div>

      {/* Fluid background mesh underneath */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 h-full w-[60vw]">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(60% 60% at 40% 50%, rgba(44,95,77,0.35) 0%, rgba(26,26,26,0.85) 50%, rgba(26,26,26,1) 100%)'
          }} />
        </div>
      </div>

      {/* Content left aligned */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="pl:[6vw] md:pl-[8vw] pr-[4vw] w-[45vw] max-w-[760px]">
          <motion.h1
            style={{ scale: titleScale, opacity: titleOpacity }}
            className="font-playfair text-[48px] md:text-[64px] leading-[1.1] tracking-[-0.02em] text-white"
          >
            {lines.map((l, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ delay: i * 0.8 + 0.2, duration: 0.8, ease: 'easeOut' }}
                className="block"
              >
                {l}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: lines.length * 0.8 + 1.2, duration: 0.6 }}
            className="mt-6 text-[18px] leading-[1.6] text-[#999999] max-w-[60ch]"
          >
            Psychology-driven design for brands that demand measurable results.
          </motion.p>

          <DataTicker />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: lines.length * 0.8 + 1.6, duration: 0.6 }}
            className="mt-16"
          >
            <a
              href="#framework"
              className="inline-block bg-[#2C5F4D] text-white text-[16px] font-medium px-9 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(44,95,77,0.3)] transition duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1"
            >
              Explore The Framework →
            </a>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />

      {/* Spacer for scroll behavior */}
      <div className="h-[120vh]" />
    </section>
  )
}

export default Hero
