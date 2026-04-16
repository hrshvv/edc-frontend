import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiInfo, FiRadio } from 'react-icons/fi';
import { Rocket } from 'lucide-react';
import './BottomNavbar.css';

/**
 * BottomNavbar — A mobile-only floating pill navigation bar.
 *
 * Visible only below 768px viewport width.
 * Fixed at the bottom of the screen with safe-area support.
 * 5 navigation items: Home, Team, Events, About, Founders Pit.
 */

const navItems = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Team', href: '/team', icon: FiUsers },
  { label: 'Events', href: '/events', icon: FiCalendar },
  { label: 'Live', href: '/founders-pit/live', icon: FiRadio },
  { label: 'About', href: '/about', icon: FiInfo },
  { label: 'FP', href: '/founders-pit', icon: Rocket },
];

export default function BottomNavbar() {
  const { pathname } = useLocation();

  return (
    <div className="bottom-navbar-wrapper" role="navigation" aria-label="Mobile navigation">
      <nav className="bottom-navbar">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              to={item.href}
              className={`bottom-navbar-item${isActive ? ' active' : ''}${item.label === 'FP' ? ' special-item' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="bottom-navbar-icon">
                <item.icon />
              </span>
              <span className="bottom-navbar-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
