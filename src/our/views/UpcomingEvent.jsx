import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { PatternText } from '@/components/ui/pattern-text';
import { cn } from '@/lib/utils';
import { EncryptedText } from '../components/EncryptedText';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Info, Calendar, MapPin } from 'lucide-react';
import { MarqueeAnimation } from '@/components/ui/marquee-effect';
import LightRays from '../../components/LightRays';


const UpcomingEvent = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventDetails = {
    title: 'THE SECRET EVENT 2026',
    date: 'Coming Soon',
    time: 'TBD',
    location: 'JSS University, Noida',
    registrationLink: '#register',
  };

  return (
    <div className="w-full pt-24 pb-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(5,177,222,0.15),transparent_70%)]',
            'blur-[80px]',
          )}
        />
      </div>

      {/* Hero Section */}
      <div className="relative w-full min-h-[75vh] sm:min-h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden z-10 py-8 sm:py-0">
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
            'blur-[30px]',
          )}
        />

        <div className="relative z-10 text-center px-3 sm:px-4 max-w-4xl mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <EncryptedText text="UPCOMING EVENT 2026" />
            <div className="mt-3 sm:mt-4 md:mt-6 text-[10px] sm:text-xs md:text-sm text-foreground/50 tracking-[0.15em] sm:tracking-[0.3em] md:tracking-[0.5em] animate-pulse px-2">
              [ NOT YOUR TYPICAL EVENT, NOT WHAT YOU ARE EXPECTING ]
            </div>
          </div>

          <div className="flex flex-row gap-2 sm:gap-4 md:gap-6 justify-center items-stretch mb-4 sm:mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 px-2 sm:px-0">
            <div className="group relative flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(5,177,222,0.1)]">
              <div className="flex items-center justify-center size-7 sm:size-10 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Calendar className="size-3.5 sm:size-5" />
              </div>
              <div className="text-left">
                <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-cyan-500/60 font-medium whitespace-nowrap">Event Date</p>
                <p className="text-xs sm:text-lg font-semibold text-foreground leading-tight">{eventDetails.date}</p>
              </div>
            </div>

            <div className="group relative flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(5,177,222,0.1)]">
              <div className="flex items-center justify-center size-7 sm:size-10 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <MapPin className="size-3.5 sm:size-5" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-cyan-500/60 font-medium whitespace-nowrap">Location</p>
                <p className="text-xs sm:text-lg font-semibold text-foreground leading-tight truncate">{eventDetails.location}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-3 sm:gap-4 justify-center animate-in fade-in slide-in-from-bottom-12 duration-1000 px-4 sm:px-0">
            <Button
              size="lg"
              className="bg-[#05B1DE] hover:bg-[#0597C7] text-white font-bold text-xs sm:text-base px-5 sm:px-10 py-3 sm:py-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(5,177,222,0.3)] rounded-full"
              onClick={() => setIsPopupOpen(true)}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#05B1DE] text-[#05B1DE] hover:bg-[#05B1DE]/10 font-semibold text-xs sm:text-base px-5 sm:px-8 py-3 sm:py-6 transition-all duration-300 hover:scale-105 rounded-full"
              onClick={() => setIsPopupOpen(true)}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <Drawer open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DrawerContent className="bg-background/80 backdrop-blur-xl border-t border-white/10 pb-12">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-cyan-400" />
              </div>
              <DrawerTitle className="text-2xl font-bold text-foreground">Stay Tuned!</DrawerTitle>
              <DrawerDescription className="text-center text-muted-foreground mt-2 text-lg">
                Registration details and event information will be shared with you soon by <span className="text-cyan-400 font-semibold">Team EDC</span>.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 mt-6">
              <Button
                onClick={() => setIsPopupOpen(false)}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-6 rounded-xl"
              >
                Got it!
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <div className="py-6 sm:py-8 md:py-10 bg-black/40 backdrop-blur-sm border-y border-cyan-500/10 select-none pointer-events-none mb-6 sm:mb-8 md:mb-12">
        <MarqueeAnimation baseVelocity={-1.5} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-cyan-400/80 font-bold">
          [ REDACTED ] • COMING SOON 2026 • THE FUTURE REVEALS •
        </MarqueeAnimation>
        <MarqueeAnimation baseVelocity={1.5} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-cyan-500/60 font-medium">
          [ ACCESS ENCRYPTED ] • PREPARE YOURSELF •
        </MarqueeAnimation>
      </div>

      <Footer />
    </div>
  );
};

export default UpcomingEvent;
