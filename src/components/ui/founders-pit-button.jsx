/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export function FoundersPitButton({ 
  label = "🚀 Founders Pit 2026",
  className,
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/founders-pit-event')
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={cn(
          "relative text-sm xl:text-base px-4 xl:px-5 py-2 text-white font-bold transition-all duration-300 rounded-lg border-2 border-[#7B2FBE]/50 backdrop-blur-md overflow-hidden group hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40",
          className
        )}
        style={{
          backgroundImage: "linear-gradient(to right, rgba(94, 12, 159, 0.7), rgba(123, 47, 190, 0.7), rgba(215, 118, 255, 0.7))",
        }}
        whileHover={{ scale: 1.11 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Shine effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
        
        {/* Subtle glow effect */}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-r from-[#5E0C9F]/15 via-[#7B2FBE]/10 to-[#D776FF]/15 animate-pulse"></span>
        
        {/* Outer subtle glow */}
        <span className="absolute -inset-0.5 rounded-lg opacity-0 transition-opacity duration-300 blur-md bg-gradient-to-r from-[#5E0C9F] via-[#7B2FBE] to-[#D776FF] group-hover:opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></span>
        
        <span className="relative flex items-center justify-center gap-2">
          {label}
        </span>
      </motion.button>
    </div>
  )
}
