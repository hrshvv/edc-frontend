/* eslint-disable no-unused-vars */
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export function UpcomingEventButton({ 
  label = "🚀 Upcoming Event 2026",
  className,
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/upcoming-event')
  }

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        className={cn(
          "relative text-sm xl:text-base px-4 xl:px-5 py-2 text-white font-bold transition-all duration-300 rounded-lg border-2 border-[#05B1DE]/50 backdrop-blur-md overflow-hidden group hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/40",
          className
        )}
        style={{
          backgroundImage: "linear-gradient(to right, rgba(5, 177, 222, 0.7), rgba(5, 151, 199, 0.7), rgba(4, 125, 170, 0.7))",
        }}
        whileHover={{ scale: 1.11 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Shine effect on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
        
        {/* Subtle glow effect */}
        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-r from-[#05B1DE]/15 via-[#0597C7]/10 to-[#047DAA]/15 animate-pulse"></span>
        
        {/* Outer subtle glow */}
        <span className="absolute -inset-0.5 rounded-lg opacity-0 transition-opacity duration-300 blur-md bg-gradient-to-r from-[#05B1DE] via-[#0597C7] to-[#047DAA] group-hover:opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></span>
        
        <span className="relative flex items-center justify-center gap-2">
          {label}
        </span>
      </motion.button>
    </div>
  )
}
