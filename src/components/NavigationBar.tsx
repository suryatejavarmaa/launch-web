import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, Calendar, Star, Users, Briefcase, Sparkles, Layers, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function NavigationBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ['application', 'team', 'stories', 'events', 'overview', 'innovation', 'platform'];
            const scrollPosition = window.scrollY + 200;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(sectionId);
                        return;
                    }
                }
            }

            if (window.scrollY < 100) {
                setActiveSection('home');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Program', href: '#overview' },
        { label: 'Events', href: '#events' },
        { label: 'Success Stories', href: '#stories' },
        { label: 'Team', href: '#team' },
    ];

    const dockItems = [
        { id: 'home', sectionId: 'home', icon: Home, label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { id: 'platform', sectionId: 'platform', icon: Sparkles, label: 'Platform', onClick: () => document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'innovation', sectionId: 'innovation', icon: Layers, label: 'Innovation', onClick: () => document.getElementById('innovation')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'program', sectionId: 'overview', icon: Briefcase, label: 'Program', onClick: () => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'events', sectionId: 'events', icon: Calendar, label: 'Events', onClick: () => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'stories', sectionId: 'stories', icon: Star, label: 'Stories', onClick: () => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'team', sectionId: 'team', icon: Users, label: 'Team', onClick: () => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }) },
        { id: 'apply', sectionId: 'application', icon: FileCheck, label: 'Apply', onClick: () => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' }) },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
            style={{
                background: isScrolled
                    ? 'linear-gradient(180deg, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.85) 100%)'
                    : 'linear-gradient(180deg, rgba(10, 15, 30, 0.6) 0%, transparent 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-2xl font-bold lp-text-gradient">Launchpad</span>
                    </motion.div>

                    {/* Desktop Navigation - Premium Glassmorphism Dock */}
                    <motion.div
                        className="hidden md:flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div
                            className="flex items-center gap-2 px-4 py-3 rounded-full"
                            style={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {dockItems.map((item, index) => {
                                const isActive = activeSection === item.sectionId;
                                const isHovered = hoveredItem === item.id;
                                const IconComponent = item.icon;

                                return (
                                    <motion.div
                                        key={item.id}
                                        className="relative"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 * index }}
                                    >
                                        <motion.button
                                            onClick={item.onClick}
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            className="relative w-11 h-11 rounded-full flex items-center justify-center overflow-hidden"
                                            style={{
                                                background: isActive
                                                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)'
                                                    : isHovered
                                                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)'
                                                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                                                border: isActive
                                                    ? '1px solid rgba(59, 130, 246, 0.5)'
                                                    : isHovered
                                                        ? '1px solid rgba(255, 255, 255, 0.3)'
                                                        : '1px solid rgba(255, 255, 255, 0.1)',
                                                boxShadow: isActive
                                                    ? '0 0 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                                                    : isHovered
                                                        ? '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                                                        : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IconComponent
                                                className="w-5 h-5 transition-colors duration-300"
                                                style={{
                                                    color: isActive ? '#60a5fa' : isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'
                                                }}
                                            />

                                            {/* Active indicator dot */}
                                            {isActive && (
                                                <motion.div
                                                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-blue-400"
                                                    layoutId="activeIndicator"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                        </motion.button>

                                        {/* Premium Tooltip */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap z-50"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
                                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                                                        fontSize: '12px',
                                                        fontWeight: 500,
                                                        color: '#ffffff',
                                                        letterSpacing: '0.02em'
                                                    }}
                                                >
                                                    {item.label}
                                                    {/* Tooltip arrow */}
                                                    <div
                                                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                                                        style={{
                                                            borderLeft: '6px solid transparent',
                                                            borderRight: '6px solid transparent',
                                                            borderTop: '6px solid rgba(30, 41, 59, 0.95)'
                                                        }}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isMobileMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden"
                        style={{
                            background: 'linear-gradient(180deg, rgba(10, 15, 30, 0.98) 0%, rgba(10, 15, 30, 0.95) 100%)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        <div className="px-4 pt-2 pb-6 space-y-3">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * index }}
                                    className="block py-3 px-4 rounded-xl text-slate-300 hover:text-white transition-colors"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Button
                                    className="w-full py-3 font-medium text-white rounded-xl"
                                    style={{
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                        border: 'none'
                                    }}
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Apply Now
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
