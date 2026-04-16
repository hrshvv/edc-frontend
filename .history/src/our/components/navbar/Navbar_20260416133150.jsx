import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/use-scroll';
import Logo from './Logo';
import FoundersPitButton from './FoundersPitButton';

// Icons
import { FiHome, FiUsers, FiCalendar, FiInfo, FiRadio } from 'react-icons/fi';


export default function Navbar() {
	const scrolled = useScroll(10);
	const location = useLocation();
	const isFoundersPit = location.pathname === '/founders-pit';
	const primaryColor = isFoundersPit ? '#7B2FBE' : '#05B1DE';
	const primaryHover = isFoundersPit ? '#5E0C9F' : '#04a0c7';

	const links = [
		{ label: 'Home', href: '/', icon: FiHome },
		{ label: 'Team', href: '/team', icon: FiUsers },
		{ label: 'Events', href: '/events', icon: FiCalendar },
		{ label: 'Live', href: '/live', icon: FiRadio },
		{ label: 'About', href: '/about', icon: FiInfo },
	];



	return (
		<>
			{/* =========================================
			    DESKTOP NAVIGATION (Hidden on Mobile)
			========================================== */}
			<header
				className={cn(
					'hidden md:block sticky top-0 z-50 mx-auto w-full max-w-7xl border-b border-transparent rounded-full border transition-all ease-out duration-500',
					{
						'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg top-4 max-w-5xl shadow':
							scrolled,
						'bg-background/70 backdrop-blur-[4px] mt-6': !scrolled,
					},
				)}
			>
				<nav
					className={cn(
						'relative flex w-full items-center justify-between px-8 transition-all ease-out duration-500',
						{
							'h-14 px-6': scrolled,
							'h-16': !scrolled,
						},
					)}
				>
					{/* Logo Section */}
					<div className="z-10 flex items-center">
						<Logo />
					</div>

					{/* Desktop Center Links (Absolutely Centered) */}
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 xl:gap-4 z-10 w-max">
						{links.map((link, i) => (
							<Link key={i} to={link.href}>
								<Button
									variant="ghost"
									className={cn(
										"text-sm xl:text-base px-3 xl:px-4 font-medium hover:bg-transparent transition-colors duration-300",
										isFoundersPit ? "hover:text-[#7B2FBE]" : "hover:text-[#05B1DE]"
									)}
								>
									{link.label}
								</Button>
							</Link>
						))}
					</div>

					{/* Right Section Buttons */}
					<div className="flex items-center gap-2 z-10">
						<Link to="/founders-pit" className="mx-2">
							<FoundersPitButton />
						</Link>

						<Button
							size="sm"
							className="text-white transition-colors duration-300"
							style={{ backgroundColor: primaryColor }}
							onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = primaryHover; }}
							onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = primaryColor; }}
							onClick={() => {
								const footer = document.getElementById('footer');
								if (footer) {
									footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
				</nav>
			</header>

			{/* =========================================
			    MOBILE NAVIGATION (Hidden on Desktop)
			========================================== */}

			{/* 1. Mobile Top Navbar (Logo + Connect) */}
			<header className="md:hidden sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm h-14 px-4 flex items-center justify-between">
				<Logo />

				<Button
					size="sm"
					className="text-white transition-colors duration-300"
					style={{ backgroundColor: primaryColor }}
					onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = primaryHover; }}
					onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = primaryColor; }}
					onClick={() => {
						const footer = document.getElementById('footer');
						if (footer) {
							footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
			</header>


		</>
	);
}

