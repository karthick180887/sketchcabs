'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import Button from './Button';
import { Menu, X, Car } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Offerings', href: '/offerings' },
    { label: 'Locations', href: '/locations' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <header className={clsx(styles.header, scrolled && styles.scrolled)}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Car size={32} className="text-primary" strokeWidth={2.5} />
                    Sketch<span>Cabs</span>
                </Link>

                {/* Desktop Nav */}
                <nav className={styles.nav}>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        styles.navLink,
                                        pathname === item.href && styles.active
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={styles.cta}>
                    <Button href="/contact" size="sm">Book Now</Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu */}
                <div className={clsx(styles.mobileMenu, isOpen && styles.open)}>
                    <ul className={styles.mobileNav}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={styles.mobileNavLink}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li style={{ marginTop: '1rem' }}>
                            <Button
                                href="/contact"
                                size="lg"
                                style={{ width: '100%' }}
                                onClick={() => setIsOpen(false)}
                            >
                                Book Now
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
