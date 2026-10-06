import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/use-scroll';
import Logo from './Logo';

// Icons
import { FiHome, FiUsers, FiCalendar, FiInfo } from 'react-icons/fi';


export default function Navbar() {
	const scrolled = useScroll(10);
	const location = useLocation();
	const isFoundersPit = location.pathname.startsWith('/founders-pit-event');
	const isRecruitment = location.pathname.startsWith('/recruitment-2026');
	const primaryColor = isRecruitment ? '#CCFF00' : isFoundersPit ? '#7B2FBE' : '#05B1DE';
	const primaryHover = isRecruitment ? '#b8e600' : isFoundersPit ? '#5E0C9F' : '#04a0c7';

	const links = [
		{ label: 'Home', href: '/', icon: FiHome },
		{ label: 'Team', href: '/team', icon: FiUsers },
		{ label: 'Events', href: '/events', icon: FiCalendar },
		{ label: 'Recruitment', href: '/recruitment-2026' },
		{ label: 'About', href: '/about', icon: FiInfo },
		{ label: 'Live', href: '/live', icon: null, isLive: true },
	];

	return (
		<>
			{/* =========================================
			    DESKTOP NAVIGATION (Hidden on Mobile)
			========================================== */}
			<header
				className={cn(
					'hidden md:block sticky top-0 z-50 mx-auto w-full max-w-7xl rounded-full border transition-all ease-out duration-500',
					isRecruitment
						? cn(
								'backdrop-blur-xl supports-[backdrop-filter]:bg-[#CCFF00]/15 bg-black/60 border-[#CCFF00]/40 shadow-[0_8px_32px_rgba(0,0,0,0.37),0_0_20px_rgba(204,255,0,0.18)]',
								scrolled
									? 'top-4 max-w-5xl supports-[backdrop-filter]:bg-[#CCFF00]/22 bg-black/75 border-[#CCFF00]/55 shadow-[0_12px_36px_rgba(0,0,0,0.5),0_0_28px_rgba(204,255,0,0.22)]'
									: 'mt-6',
						  )
						: {
								'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg top-4 max-w-5xl shadow border-b border-transparent':
									scrolled,
								'bg-background/70 backdrop-blur-[4px] mt-6 border-b border-transparent': !scrolled,
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
					<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 xl:gap-3 z-10 w-max">
						{links.map((link, i) => {
							const isActive = location.pathname === link.href;

							if (link.isLive) {
								return (
									<Link key={i} to={link.href} className="relative">
										<Button
											variant="ghost"
											className={cn(
												'text-sm xl:text-base px-3 xl:px-4 font-medium transition-colors duration-300 flex items-center gap-1.5 rounded-full',
												isRecruitment
													? isActive
														? 'text-[#CCFF00] bg-[#CCFF00]/15 font-semibold'
														: 'text-white hover:text-[#CCFF00] hover:bg-[#CCFF00]/10'
													: cn(
															isFoundersPit ? 'hover:text-[#7B2FBE]' : 'hover:text-[#05B1DE]',
															isActive && (isFoundersPit ? 'text-[#7B2FBE]' : 'text-[#05B1DE]'),
													  ),
											)}
										>
											<span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
											{link.label}
										</Button>
									</Link>
								);
							}

							return (
								<Link key={i} to={link.href} className="relative">
									<Button
										variant="ghost"
										className={cn(
											'text-sm xl:text-base px-3 xl:px-4 font-medium transition-all duration-300 rounded-full',
											isRecruitment
												? isActive
													? 'text-[#CCFF00] bg-[#CCFF00]/15 border border-[#CCFF00]/40 font-bold shadow-[0_0_12px_rgba(204,255,0,0.2)]'
													: 'text-white hover:text-[#CCFF00] hover:bg-[#CCFF00]/10'
												: cn(
														'hover:bg-transparent',
														isFoundersPit ? 'hover:text-[#7B2FBE]' : 'hover:text-[#05B1DE]',
														isActive && (isFoundersPit ? 'text-[#7B2FBE]' : 'text-[#05B1DE]'),
												  ),
										)}
									>
										{link.label}
									</Button>
								</Link>
							);
						})}
					</div>

					{/* Right Section Buttons */}
					<div className="flex items-center gap-2 z-10">
						<Button
							size="sm"
							className={cn(
								'transition-all duration-300 font-bold rounded-full px-5',
								isRecruitment
									? 'bg-[#CCFF00] text-black hover:bg-[#d4ff1a] hover:scale-105 active:scale-95 shadow-[0_0_18px_rgba(204,255,0,0.4)]'
									: 'text-white'
							)}
							style={!isRecruitment ? { backgroundColor: primaryColor } : undefined}
							onMouseEnter={(e) => {
								if (!isRecruitment) e.currentTarget.style.backgroundColor = primaryHover;
							}}
							onMouseLeave={(e) => {
								if (!isRecruitment) e.currentTarget.style.backgroundColor = primaryColor;
							}}
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
			<header
				className={cn(
					'md:hidden sticky top-0 z-50 w-full backdrop-blur-xl transition-colors duration-300 shadow-sm h-14 px-4 flex items-center justify-between',
					isRecruitment
						? 'supports-[backdrop-filter]:bg-[#CCFF00]/15 bg-black/80 border-b border-[#CCFF00]/40 shadow-[0_4px_20px_rgba(204,255,0,0.15)]'
						: 'bg-background/95 border-b border-border/50'
				)}
			>
				<Logo />

				<Button
					size="sm"
					className={cn(
						'transition-all duration-300 font-bold rounded-full px-4',
						isRecruitment
							? 'bg-[#CCFF00] text-black hover:bg-[#d4ff1a] shadow-[0_0_14px_rgba(204,255,0,0.4)]'
							: 'text-white'
					)}
					style={!isRecruitment ? { backgroundColor: primaryColor } : undefined}
					onMouseEnter={(e) => {
						if (!isRecruitment) e.currentTarget.style.backgroundColor = primaryHover;
					}}
					onMouseLeave={(e) => {
						if (!isRecruitment) e.currentTarget.style.backgroundColor = primaryColor;
					}}
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

