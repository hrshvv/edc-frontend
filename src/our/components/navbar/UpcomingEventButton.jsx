import { Rocket, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrambleText } from '@/components/ui/scramble-text';

const UpcomingEventButton = ({ className, onClick, size = 'default' }) => {
  const isSmall = size === 'small';

  return (
    <>
      <style>
        {`
          @keyframes shimmer-sweep {
            0% { transform: translateX(-150%) skewX(-12deg); }
            100% { transform: translateX(350%) skewX(-12deg); }
          }
          .animate-shimmer-sweep {
            animation: shimmer-sweep 2.5s infinite linear;
          }
        `}
      </style>
      <div 
        className={cn("relative group cursor-pointer flex items-center justify-center", className)}
        onClick={onClick}
      >
        {/* Animated Glow Backdrop */}
        <div className={cn(
          "absolute -inset-1 bg-gradient-to-r from-[#05B1DE] via-cyan-400 to-blue-600 rounded-full blur-lg opacity-40 group-hover:opacity-80 transition-all duration-700 group-hover:duration-200 animate-pulse",
          isSmall && "blur-md"
        )}></div>
        
        {/* Main Button Container */}
        <div className="relative w-full p-[1.5px] rounded-full bg-gradient-to-r from-white/10 via-[#05B1DE]/40 to-white/10 overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-[1.03] active:scale-95">
          
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#05B1DE]/5 to-white/5 pointer-events-none"></div>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer-sweep"></div>
          </div>

          {/* Inner Content */}
          <div className={cn(
            "relative w-full flex items-center justify-center gap-3 bg-[#030303]/90 backdrop-blur-3xl rounded-full",
            isSmall ? "px-3 py-1.5 gap-1.5" : "px-6 py-2.5 gap-3"
          )}>
            {/* Icon with Glow */}
            <div className="relative flex items-center justify-center">
              <Rocket className={cn("text-[#05B1DE] transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110", isSmall ? "size-3" : "size-4")} />
              <div className={cn("absolute inset-0 bg-[#05B1DE] blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500", isSmall ? "size-3" : "size-4")}></div>
            </div>

            {/* Text with Premium Gradient & Mystery Effect */}
            <span className={cn(
              "font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-white to-slate-300 group-hover:from-white group-hover:to-[#05B1DE] transition-all duration-300",
              isSmall ? "text-[10px]" : "text-sm xl:text-base"
            )}>
              <ScrambleText text={isSmall ? "EVENT 2026" : "See What’s Coming"} triggerOnHover={true} className="inline-block shrink-0" />
            </span>

            {/* Right indicator (subtle) */}
            <div className={cn("rounded-full bg-[#05B1DE] shadow-[0_0_8px_#05B1DE] animate-pulse", isSmall ? "w-1 h-1" : "w-1.5 h-1.5")}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingEventButton;
