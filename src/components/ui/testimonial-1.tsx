"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ArrowDown, ArrowUp, MonitorPlay, Code, ShoppingCart, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function Testimonial1() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  interface StatItem {
    percentage: string;
    label: string;
    isIncrease: boolean;
    logo: React.ReactNode;
  }

  const stats: StatItem[] = [
    {
      percentage: "80%",
      label: "manual payment tasks",
      isIncrease: false,
      logo: <MonitorPlay className="w-10 h-10 text-neutral-500 mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out" />,
    },
    {
      percentage: "30%",
      label: "international fees",
      isIncrease: false,
      logo: <Code className="w-10 h-10 text-neutral-500 mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out" />,
    },
    {
      percentage: "25%",
      label: "payment reconciliation",
      isIncrease: false,
      logo: <ShoppingCart className="w-10 h-10 text-neutral-500 mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out" />,
    },
    {
      percentage: "$100K",
      label: "saved per year",
      isIncrease: true,
      logo: <ShoppingBag className="w-10 h-10 text-neutral-500 mx-auto translate-y-0 group-hover:-translate-y-12 opacity-100 group-hover:opacity-0 transition-all duration-300 ease-out" />,
    },
  ];

  return (
    <div className="bg-transparent w-full py-8 md:py-16 relative">
      <div className="max-w-6xl mx-auto">
        {/* Community Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#05B1DE]/10 text-[#05B1DE] border border-[#05B1DE]/20 px-4 py-1 rounded-full text-xs uppercase tracking-wider font-medium">
            Our Community
          </div>
        </div>

        {/* Main Heading with Images */}
        <div className="text-center max-w-screen-xl mx-auto relative text-white">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight">
            We make it easy for <br className="sm:hidden" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle relative">
                    <div className="relative overflow-hidden sm:w-16 w-12 h-12 origin-center transition-all duration-300 md:hover:w-36 hover:-24 rounded-full border-2 border-white/20">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt="Person smiling"
                        className="object-cover w-full h-full"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-[#111] text-white p-4 rounded-lg shadow-lg border border-white/10 z-50"
                >
                  <p className="mb-2 text-sm text-neutral-300">
                    "It's great to have a good sense of where my money is going
                    and be able to adjust as necessary. I love the
                    transparency."
                  </p>
                  <p className="font-medium text-sm text-[#05B1DE]">John Doe</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            companies and
          </h1>

          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight mt-2">
            their
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block mx-2 align-middle">
                    <div className="relative overflow-hidden sm:w-16 w-14 h-14 origin-center transition-all duration-300 lg:hover:w-36 md:hover:w-24 hover:-20 rounded-full border-2 border-white/20">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                        alt="Employee"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-xs bg-[#111] text-white p-4 rounded-lg shadow-lg border border-white/10 z-50"
                >
                  <p className="mb-2 text-sm text-neutral-300">
                    "It's great to have a good sense of where my money is going
                    and be able to adjust as necessary. I love the
                    transparency."
                  </p>
                  <p className="font-medium text-sm text-[#05B1DE]">Jane Smith</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            employees to contribute and
          </h1>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-neutral-400 leading-tight mt-2">
            manage compensation
          </h1>
        </div>
        <div className="sm:flex grid grid-cols-2 gap-8 bg-white/5 backdrop-blur-sm mt-12 w-full mx-auto px-8 py-8 border rounded-2xl border-white/10">
          {stats.map((stat, index) => (
            <div
              key={stat?.label}
              className="flex-1 flex gap-4 pl-0 sm:pl-10 relative"
            >
              {index !== 0 && (
                <div className="hidden sm:block w-px h-12 border-l border-dashed border-white/20 absolute left-0 top-1/2 -translate-y-1/2" />
              )}
              <div className="w-full h-full group relative min-h-[60px]">
                {stat.logo}
                <div className="absolute left-0 top-0 opacity-0 flex flex-col items-center justify-center w-full group-hover:top-0 group-hover:opacity-100 transition-all duration-300 ease-out h-full">
                  <div className="flex items-center justify-center gap-2 relative">
                    {stat.isIncrease ? (
                      <ArrowUp className="md:w-6 md:h-6 w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDown className="md:w-6 md:h-6 w-4 h-4 text-red-400" />
                    )}
                    <span className="md:text-4xl text-2xl font-bold text-white">
                      {stat.percentage}
                    </span>
                  </div>
                  <p className="text-neutral-400 md:text-sm text-xs text-center capitalize mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
