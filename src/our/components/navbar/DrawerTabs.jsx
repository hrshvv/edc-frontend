import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { MenuIcon, X, Home, Users2, CalendarDays, Info, Rocket } from 'lucide-react';
import Logo from './Logo';
import UpcomingEventButton from './UpcomingEventButton';

const navButtonBase =
  'justify-start w-full h-11 px-3 rounded-lg transition-all hover:translate-x-0.5 hover:bg-accent/60 hover:text-accent-foreground';

const DrawerTabs = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background/70 backdrop-blur-md shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9">
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=right]:w-[50%] data-[vaul-drawer-direction=right]:max-w-xs bg-background/80 backdrop-blur-xl border-l border-border/60">
        {/* Header with logo and close */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <DrawerClose className="inline-flex items-center justify-center rounded-md border bg-background/70 hover:bg-accent hover:text-accent-foreground size-9">
            <X className="size-4" />
          </DrawerClose>
        </div>

        <DrawerHeader className="px-4 pt-4 pb-2"></DrawerHeader>

        <div className="flex flex-col gap-2 p-4">
          <DrawerClose asChild>
            <Link to="/">
              <Button variant="ghost" className={navButtonBase}>
                <Home className="mr-2 size-4" /> Home
              </Button>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link to="/team">
              <Button variant="ghost" className={navButtonBase}>
                <Users2 className="mr-2 size-4" /> Team
              </Button>
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <Link to="/events">
              <Button variant="ghost" className={navButtonBase}>
                <CalendarDays className="mr-2 size-4" /> Events
              </Button>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Link to="/about">
              <Button variant="ghost" className={navButtonBase}>
                <Info className="mr-2 size-4" /> About
              </Button>
            </Link>
          </DrawerClose>
          <DrawerClose asChild>
            <Button
              className="mt-2 w-full bg-[#05B1DE] hover:bg-[#04a0c7] text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_#05B1DE/20] hover:shadow-[0_0_20px_#05B1DE/40]"
              onClick={() => {
                const footer = document.getElementById('footer');
                if (footer) {
                  footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => {
                    const socialLinks = document.querySelectorAll('.social-link');
                    socialLinks.forEach((link, idx) => {
                      setTimeout(() => {
                        link.classList.add('highlight-social');
                        setTimeout(() => link.classList.remove('highlight-social'), 1000);
                      }, idx * 200);
                    });
                  }, 500);
                }
              }}
            >
              Connect with us
            </Button>
          </DrawerClose>
        </div>


        <DrawerFooter className="px-4 pb-4">
          <DrawerClose className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background/70 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 has-[>svg]:px-3">
            Close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerTabs;
