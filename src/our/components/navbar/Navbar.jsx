import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import DrawerTabs from './DrawerTabs';
import UpcomingEventButton from './UpcomingEventButton';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-background/70 backdrop-blur-[4px] py-3 sm:py-4 px-8 border rounded-full">
        {/* Logo Section */}
        <div>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-2 xl:gap-4 items-center">
          <Link to="/">
            <Button
              variant="ghost"
              className="text-sm xl:text-base px-3 xl:px-4 hover:bg-accent/80 hover:scale-110 hover:border-2 hover:border-accent hover:shadow-xl hover:shadow-accent/25 hover:text-accent-foreground transition-all duration-300"
            >
              Home
            </Button>
          </Link>
          <Link to="/team">
            <Button
              variant="ghost"
              className="text-sm xl:text-base px-3 xl:px-4 hover:bg-accent/80 hover:scale-110 hover:border-2 hover:border-accent hover:shadow-xl hover:shadow-accent/25 hover:text-accent-foreground transition-all duration-300"
            >
              Team
            </Button>
          </Link>
          <Link to="/events">
            <Button
              variant="ghost"
              className="text-sm xl:text-base px-3 xl:px-4 hover:bg-accent/80 hover:scale-110 hover:border-2 hover:border-accent hover:shadow-xl hover:shadow-accent/25 hover:text-accent-foreground transition-all duration-300"
            >
              Events
            </Button>
          </Link>
          <Link to="/about">
            <Button
              variant="ghost"
              className="text-sm xl:text-base px-3 xl:px-4 hover:bg-accent/80 hover:scale-110 hover:border-2 hover:border-accent hover:shadow-xl hover:shadow-accent/25 hover:text-accent-foreground transition-all duration-300"
            >
              About
            </Button>
          </Link>
          <Link to="/upcoming-event">
            <UpcomingEventButton />
          </Link>
        </div>

        {/* Right Section - Mobile Menu, Connect Button */}
        <div className="flex items-center gap-2">
          {/* Connect Button - Mobile Only */}


          {/* Mobile Drawer */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/upcoming-event">
              <UpcomingEventButton size="small" />
            </Link>
            <DrawerTabs />
          </div>


          {/* Connect Button - Desktop Only */}
          <Button
            size="sm"
            className="hidden lg:inline-flex text-white"
            style={{
              backgroundColor: '#05B1DE',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#04a0c7';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#05B1DE';
            }}
            onClick={() => {
              const footer = document.getElementById('footer');
              if (footer) {
                footer.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
                // Add highlight effect to social links
                setTimeout(() => {
                  const socialLinks = document.querySelectorAll('.social-link');
                  socialLinks.forEach((link, index) => {
                    setTimeout(() => {
                      link.classList.add('highlight-social');
                      setTimeout(() => {
                        link.classList.remove('highlight-social');
                      }, 1000);
                    }, index * 200);
                  });
                }, 500);
              }
            }}
          >
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
