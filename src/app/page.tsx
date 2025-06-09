"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import {
  Camera,
  Upload,
  Scan,
  Recycle,
  CheckCircle,
  Info,
  Sparkles,
  Globe,
  Heart,
  AlertTriangle,
  Droplets,
  Zap,
  TreePine,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PlasticGrade {
  grade: number
  name: string
  fullName: string
  color: string
  recyclable: boolean
  description: string
  examples: string[]
  impact: {
    carbonFootprint: number // kg CO2 per kg plastic
    decompositionYears: number
    waterUsage: number // liters per kg
    energyProduction: number // MJ per kg
    oceanThreat: "Low" | "Medium" | "High" | "Critical"
    recyclingRate: number // percentage
  }
}

const plasticGrades: PlasticGrade[] = [
  {
    grade: 1,
    name: "PET",
    fullName: "Polyethylene Terephthalate",
    color: "from-green-400 to-emerald-600",
    recyclable: true,
    description: "Commonly used for beverage bottles and food containers",
    examples: ["Water bottles", "Soda bottles", "Food jars"],
    impact: {
      carbonFootprint: 2.3,
      decompositionYears: 450,
      waterUsage: 17.5,
      energyProduction: 84,
      oceanThreat: "Medium",
      recyclingRate: 58,
    },
  },
  {
    grade: 2,
    name: "HDPE",
    fullName: "High-Density Polyethylene",
    color: "from-blue-400 to-cyan-600",
    recyclable: true,
    description: "Used for milk jugs, detergent bottles, and shopping bags",
    examples: ["Milk jugs", "Shampoo bottles", "Shopping bags"],
    impact: {
      carbonFootprint: 1.8,
      decompositionYears: 400,
      waterUsage: 15.2,
      energyProduction: 76,
      oceanThreat: "Medium",
      recyclingRate: 31,
    },
  },
  {
    grade: 3,
    name: "PVC",
    fullName: "Polyvinyl Chloride",
    color: "from-yellow-400 to-orange-500",
    recyclable: false,
    description: "Used for pipes, vinyl siding, and some packaging",
    examples: ["Pipes", "Credit cards", "Medical tubing"],
    impact: {
      carbonFootprint: 3.2,
      decompositionYears: 1000,
      waterUsage: 22.8,
      energyProduction: 95,
      oceanThreat: "Critical",
      recyclingRate: 1,
    },
  },
  {
    grade: 4,
    name: "LDPE",
    fullName: "Low-Density Polyethylene",
    color: "from-purple-400 to-pink-500",
    recyclable: false,
    description: "Used for plastic bags, squeeze bottles, and flexible lids",
    examples: ["Plastic bags", "Squeeze bottles", "Bread bags"],
    impact: {
      carbonFootprint: 1.9,
      decompositionYears: 500,
      waterUsage: 16.1,
      energyProduction: 78,
      oceanThreat: "High",
      recyclingRate: 5,
    },
  },
  {
    grade: 5,
    name: "PP",
    fullName: "Polypropylene",
    color: "from-red-400 to-rose-600",
    recyclable: true,
    description: "Used for yogurt containers, bottle caps, and straws",
    examples: ["Yogurt cups", "Bottle caps", "Straws"],
    impact: {
      carbonFootprint: 1.7,
      decompositionYears: 400,
      waterUsage: 14.8,
      energyProduction: 73,
      oceanThreat: "Medium",
      recyclingRate: 3,
    },
  },
]

// Enhanced floating particles with plastic debris
const FloatingDebris = () => {
  const debris = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    type: Math.random() > 0.5 ? "bottle" : "bag",
    size: Math.random() * 20 + 10,
    opacity: Math.random() * 0.3 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {debris.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.type === "bottle" ? "bg-blue-400/20" : "bg-gray-400/20"} rounded-sm`}
          style={{
            width: item.size,
            height: item.size * (item.type === "bottle" ? 2 : 0.5),
            opacity: item.opacity,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360 + 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  )
}

// Ocean wave background
const OceanWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1200 320" preserveAspectRatio="none">
        <motion.path
          d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="rgba(59, 130, 246, 0.1)"
          animate={{
            d: [
              "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="rgba(34, 197, 94, 0.1)"
          animate={{
            d: [
              "M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  )
}

// Environmental stats component
const EnvironmentalStats = () => {
  const stats = [
    { number: "8M", label: "Tons of plastic enter oceans yearly", icon: Globe },
    { number: "500", label: "Years for plastic to decompose", icon: AlertTriangle },
    { number: "1M", label: "Seabirds killed by plastic annually", icon: Heart },
  ]

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 + index * 0.2, type: "spring" }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: index }}
          >
            <stat.icon className="w-6 h-6 text-red-400 mx-auto mb-2" />
          </motion.div>
          <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
          <div className="text-xs text-gray-300">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Quotes component
const EnvironmentalQuotes = () => {
  const quotes = [
    {
      text: "We are the first generation to feel the impact of climate change and the last generation that can do something about it.",
      author: "Barack Obama",
    },
    {
      text: "The Earth does not belong to us; we belong to the Earth. All things are connected like the blood that unites one family.",
      author: "Chief Seattle",
    },
    {
      text: "Every piece of plastic ever made still exists today.",
      author: "Environmental Fact",
    },
  ]

  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="mb-8 min-h-[120px] flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
        >
          <p className="text-gray-200 italic mb-3 text-sm leading-relaxed">"{quotes[currentQuote].text}"</p>
          <p className="text-green-400 font-medium text-xs">— {quotes[currentQuote].author}</p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// Impact Calculator Component
const ImpactCalculator = ({ grade }: { grade: PlasticGrade }) => {
  const [itemWeight, setItemWeight] = useState(0.5) // Default 500g
  const [animatedValues, setAnimatedValues] = useState({
    carbon: 0,
    water: 0,
    energy: 0,
    recycling: 0,
  })

  useEffect(() => {
    // Animate the values
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedValues({
        carbon: grade.impact.carbonFootprint * itemWeight * progress,
        water: grade.impact.waterUsage * itemWeight * progress,
        energy: grade.impact.energyProduction * itemWeight * progress,
        recycling: grade.impact.recyclingRate * progress,
      })

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [grade, itemWeight])

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "Low":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "High":
        return "text-orange-400"
      case "Critical":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const impactMetrics = [
    {
      icon: TreePine,
      label: "Carbon Footprint",
      value: animatedValues.carbon.toFixed(2),
      unit: "kg CO₂",
      color: "text-red-400",
      description: "Greenhouse gases produced",
    },
    {
      icon: Droplets,
      label: "Water Usage",
      value: animatedValues.water.toFixed(1),
      unit: "liters",
      color: "text-blue-400",
      description: "Water needed for production",
    },
    {
      icon: Zap,
      label: "Energy Required",
      value: animatedValues.energy.toFixed(1),
      unit: "MJ",
      color: "text-yellow-400",
      description: "Energy for manufacturing",
    },
    {
      icon: Recycle,
      label: "Recycling Rate",
      value: animatedValues.recycling.toFixed(0),
      unit: "%",
      color: "text-green-400",
      description: "Currently being recycled",
    },
  ]

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <Card className="bg-white/10 backdrop-blur border-white/20 shadow-xl">
        <CardContent className="p-6">
          <motion.div
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <TreePine className="w-6 h-6 text-green-400" />
            <h4 className="font-semibold text-white text-lg">Environmental Impact</h4>
          </motion.div>

          {/* Weight Selector */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <label className="block text-sm font-medium text-gray-300 mb-2">Item Weight: {itemWeight}kg</label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={itemWeight}
              onChange={(e) => setItemWeight(Number.parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100g</span>
              <span>2kg</span>
            </div>
          </motion.div>

          {/* Impact Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                >
                  <metric.icon className={`w-6 h-6 ${metric.color} mx-auto mb-2`} />
                </motion.div>
                <div className={`text-xl font-bold ${metric.color} mb-1`}>
                  {metric.value}
                  <span className="text-sm ml-1">{metric.unit}</span>
                </div>
                <div className="text-xs text-gray-300 mb-1">{metric.label}</div>
                <div className="text-xs text-gray-400">{metric.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Ocean Threat Level */}
          <motion.div
            className="bg-white/5 rounded-xl p-4 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Ocean Threat Level</span>
              </div>
              <Badge className={`${getThreatColor(grade.impact.oceanThreat)} bg-white/10 border-white/20`}>
                {grade.impact.oceanThreat}
              </Badge>
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-400">
                Decomposition time:{" "}
                <span className="text-white font-medium">{grade.impact.decompositionYears} years</span>
              </div>
            </div>
          </motion.div>

          {/* Environmental Tips */}
          <motion.div
            className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-400/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium text-sm">Eco Tip</span>
            </div>
            <p className="text-xs text-gray-300">
              {grade.recyclable
                ? `This plastic can be recycled! Clean it thoroughly and check your local recycling guidelines.`
                : `This plastic is difficult to recycle. Consider reusing it or finding alternatives for future purchases.`}
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function PlasticGradeDetector() {
  const [currentStep, setCurrentStep] = useState<"capture" | "analyzing" | "result">("capture")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [detectedGrade, setDetectedGrade] = useState<PlasticGrade | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    })
  }, [controls])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setStream(mediaStream)
      setCameraActive(true)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setCameraActive(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg")
        setCapturedImage(imageData)
        stopCamera()
        analyzeImage()
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result as string
        setCapturedImage(imageData)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    setCurrentStep("analyzing")
    setIsAnalyzing(true)

    // Simulate AI analysis with random result
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const randomGrade = plasticGrades[Math.floor(Math.random() * plasticGrades.length)]
    setDetectedGrade(randomGrade)
    setIsAnalyzing(false)
    setCurrentStep("result")
  }

  const resetApp = () => {
    setCurrentStep("capture")
    setCapturedImage(null)
    setDetectedGrade(null)
    setIsAnalyzing(false)
    stopCamera()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-green-900 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/40 to-green-900/20" />
      <OceanWaves />
      <FloatingDebris />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-md mx-auto relative z-10 p-4">
        <AnimatePresence mode="wait">
          {currentStep === "capture" && (
            <motion.div
              key="capture"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -50 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Enhanced Header */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center pt-8 relative"
              >
                {/* Animated logo container */}
                <motion.div className="relative inline-block mb-6" animate={controls}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="relative"
                  >
                    <Recycle className="w-16 h-16 text-green-400" />
                    <motion.div
                      className="absolute inset-0 w-16 h-16 border-2 border-green-400/30 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>

                  {/* Floating sparkles around logo */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${Math.sin((i * Math.PI) / 3) * 40 + 50}%`,
                        left: `${Math.cos((i * Math.PI) / 3) * 40 + 50}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.h1
                  className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  PlasticScan AI
                </motion.h1>

                <motion.p
                  className="text-gray-300 text-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Identify • Educate • Protect Our Planet
                </motion.p>
              </motion.div>

              {/* Environmental Stats */}
              <EnvironmentalStats />

              {/* Environmental Quotes */}
              <EnvironmentalQuotes />

              {/* Enhanced Camera View */}
              {cameraActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <Card className="overflow-hidden bg-black/20 backdrop-blur border-white/10 relative">
                    <CardContent className="p-0 relative">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Enhanced Scanning Overlay */}
                      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* Corner brackets */}
                        {[
                          { top: "10px", left: "10px", rotate: "0deg" },
                          { top: "10px", right: "10px", rotate: "90deg" },
                          { bottom: "10px", right: "10px", rotate: "180deg" },
                          { bottom: "10px", left: "10px", rotate: "270deg" },
                        ].map((corner, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-6 h-6 border-l-2 border-t-2 border-green-400"
                            style={{ ...corner, transform: `rotate(${corner.rotate})` }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                          />
                        ))}

                        {/* Scanning line */}
                        <motion.div
                          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                          animate={{ top: ["10%", "90%", "10%"] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                      </motion.div>

                      {/* Enhanced Capture Button */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          onClick={capturePhoto}
                          className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(255,255,255,0.4)",
                              "0 0 0 20px rgba(255,255,255,0)",
                              "0 0 0 0 rgba(255,255,255,0.4)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <motion.div
                            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-green-600 rounded-full"
                            animate={{ scale: [1, 0.9, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Enhanced Action Buttons */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                {!cameraActive && (
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="relative">
                    <Button
                      onClick={startCamera}
                      className="w-full h-16 bg-gradient-to-r from-blue-500 via-green-600 to-teal-500 hover:from-blue-600 hover:via-green-700 hover:to-teal-600 text-white font-semibold rounded-2xl relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <Camera className="w-6 h-6 mr-3" />
                      <span className="text-lg">Scan Plastic</span>
                      <motion.div
                        className="absolute right-4"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                )}

                {cameraActive && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="w-full h-14 border-white/30 text-white hover:bg-white/10 rounded-xl backdrop-blur"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="relative">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full h-16 border-white/30 text-white hover:bg-white/10 rounded-2xl backdrop-blur relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <Upload className="w-6 h-6 mr-3" />
                    <span className="text-lg text-black">Upload Photo</span>
                  </Button>
                </motion.div>
              </motion.div>

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </motion.div>
          )}

          {currentStep === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8 pt-16"
            >
              {capturedImage && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="relative"
                >
                  <img
                    src={capturedImage || "/placeholder.svg"}
                    alt="Captured"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-teal-500/20 rounded-2xl"
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      background: [
                        "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(34, 197, 94, 0.2))",
                        "linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(20, 184, 166, 0.2))",
                        "linear-gradient(45deg, rgba(20, 184, 166, 0.2), rgba(59, 130, 246, 0.2))",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* Scanning grid overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
              )}

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="relative inline-block"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Scan className="w-16 h-16 text-green-400" />
                  <motion.div
                    className="absolute inset-0 w-16 h-16 border-2 border-green-400/30 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>

                <div>
                  <motion.h2
                    className="text-3xl font-bold text-white mb-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Analyzing Plastic
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 text-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    AI is detecting the plastic grade...
                  </motion.p>
                </div>

                {/* Enhanced progress bar */}
                <motion.div
                  className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur relative overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 h-3 rounded-full relative"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>

                {/* Analysis steps */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {["Capturing image features...", "Processing with AI...", "Calculating environmental impact..."].map(
                    (step, index) => (
                      <motion.div
                        key={step}
                        className="text-sm text-gray-400 flex items-center justify-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.8 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full mr-2"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.8 }}
                        />
                        {step}
                      </motion.div>
                    ),
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {currentStep === "result" && detectedGrade && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="space-y-6 pt-8"
            >
              {capturedImage && (
                <motion.img
                  initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
                  animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  src={capturedImage}
                  alt="Analyzed"
                  className="w-full h-48 object-cover rounded-2xl shadow-2xl"
                />
              )}

              <motion.div
                initial={{ y: 50, opacity: 0, rotateX: -10 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              >
                <Card
                  className={`bg-gradient-to-br ${detectedGrade.color} text-white border-0 overflow-hidden relative shadow-2xl`}
                >
                  <CardContent className="p-8 relative">
                    {/* Animated background elements */}
                    <motion.div
                      className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"
                      animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                      }}
                      transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          className="text-8xl font-bold"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                          {detectedGrade.grade}
                        </motion.div>
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle className="w-10 h-10" />
                        </motion.div>
                      </div>

                      <motion.h3
                        className="text-3xl font-bold mb-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {detectedGrade.name}
                      </motion.h3>
                      <motion.p
                        className="text-white/80 mb-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        {detectedGrade.fullName}
                      </motion.p>

                      <motion.div
                        className="flex items-center gap-2 mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Badge
                          variant={detectedGrade.recyclable ? "default" : "destructive"}
                          className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm"
                        >
                          {detectedGrade.recyclable ? "♻️ Recyclable" : "⚠️ Not Recyclable"}
                        </Badge>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Impact Calculator */}
              <ImpactCalculator grade={detectedGrade} />

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card className="bg-white/10 backdrop-blur border-white/20 shadow-xl">
                  <CardContent className="p-6">
                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Info className="w-6 h-6 text-blue-400" />
                      <h4 className="font-semibold text-white text-lg">Details</h4>
                    </motion.div>
                    <motion.p
                      className="text-gray-300 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {detectedGrade.description}
                    </motion.p>

                    <div>
                      <motion.h5
                        className="font-medium text-white mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        Common Examples:
                      </motion.h5>
                      <div className="flex flex-wrap gap-2">
                        {detectedGrade.examples.map((example, index) => (
                          <motion.span
                            key={example}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 backdrop-blur border border-white/10"
                          >
                            {example}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={resetApp}
                  className="w-full h-16 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold rounded-2xl relative overflow-hidden group shadow-2xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <span className="text-lg">Scan Another Item</span>
                  <motion.div
                    className="absolute right-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Recycle className="w-6 h-6" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #34d399;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #34d399;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
        }
      `}</style>
    </div>
  )
}
