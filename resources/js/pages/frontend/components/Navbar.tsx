import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaBars, FaEnvelope, FaPhone, FaSearch, FaTimes } from 'react-icons/fa';
import { FaFacebook, FaGooglePlus, FaLinkedin, FaSquareTwitter } from 'react-icons/fa6';
import { FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    // Top navigation data
    const topNav = {
        phone: '1800-222-222',
        email: 'contact@clevercourse.com',
        social: [
            { name: 'Facebook', icon: <FaFacebook /> },
            { name: 'Google Plus', icon: <FaGooglePlus /> },
            { name: 'Linkedin', icon: <FaLinkedin /> },
            { name: 'Twitter', icon: <FaSquareTwitter /> },
        ],
    };

    // Main navigation data
    const mainNav = [
        {
            title: 'Home',
            path: '/',
        },
        {
            title: 'LMS',
            path: '/test-lms',
            submenu: [
                { title: 'Instructor List Style 1', path: '/instructor-list-style-1' },
                { title: 'Instructor Profile', path: '/author/rebeccasm' },
                { title: 'Courses Searching', path: '/courses-searching' },
                { title: 'Student Backend', path: '/profile' },
                { title: 'Instructor Backend', path: '/instructor/backend' },
                { title: 'Transaction Backend', path: '/transaction-backend' },
                { title: 'Test LMS', path: '/test-lms' },
                { title: 'Commission Setting', path: '/commission-setting' },
                { title: 'Certificate & Badge', path: '/certificate-badge' },
            ],
        },
        {
            title: 'Courses',     
            path: '/courses',
            megaMenu: true,
            columns: [
                {
                    title: 'Course Columns',
                    items: [
                        { title: 'Course 1 Column', path: '/course-1-column' },
                        { title: 'Course 2 Columns', path: '/course-2-columns' },
                        { title: 'Course 3 Columns', path: '/course-3-columns' },
                        { title: 'Course 4 Columns', path: '/course-4-columns' },
                    ],
                },
                {
                    title: 'Course Modern',
                    items: [
                        {
                            title: 'Course Modern 1 Column',
                            path: '/course-modern-1-column',
                        },
                        {
                            title: 'Course Modern 2 Columns',
                            path: '/course-modern-2-columns',
                        },
                        {
                            title: 'Course Modern 3 Columns',
                            path: '/course-modern-3-columns',
                        },
                        {
                            title: 'Course Modern 4 Columns',
                            path: '/course-modern-4-columns',
                        },
                    ],
                },
                {
                    title: 'Course Medium',
                    items: [
                        {
                            title: 'Course Medium With Right Sidebar',
                            path: '/course-medium-with-right-sidebar',
                        },
                        {
                            title: 'Course Medium With Left Sidebar',
                            path: '/course-medium-with-left-sidebar',
                        },
                        {
                            title: 'Course Medium Without Sidebar',
                            path: '/course-medium-without-sidebar',
                        },
                        {
                            title: 'Course Medium With Both Sidebar',
                            path: '/course-medium-with-both-sidebar',
                        },
                    ],
                },
                {
                    title: 'Course Full',
                    items: [
                        {
                            title: 'Course Full With Right Sidebar',
                            path: '/course-full-with-right-sidebar',
                        },
                        {
                            title: 'Course Full With Left Sidebar',
                            path: '/course-full-with-left-sidebar',
                        },
                        {
                            title: 'Course Full With Both Sidebar',
                            path: '/course-full-with-both-sidebar',
                        },
                    ],
                },
            ],
        },
    ];

    const [isHovered, setIsHovered] = useState(null);
    const [expandedMenuIndex, setExpandedMenuIndex] = useState(null);
    const [expandedMegaSubMenuIndex, setExpandedMegaSubMenuIndex] = useState(null);

    const toggleSubmenu = (index: any) => {
        setExpandedMenuIndex(expandedMenuIndex === index ? null : index);
    };

    const toggleMegaSubmenu = (colIndex: any) => {
        setExpandedMegaSubMenuIndex(expandedMegaSubMenuIndex === colIndex ? null : colIndex);
    };

    return (
        <header className="relative">
            {/* Top Navigation */}
            <div className="top-navigation-wrapper container px-12 md:px-15 mx-auto hidden max-w-screen-2xl py-4 md:block">
                <div className="">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center">
                                    <FaPhone className="mr-2 text-gray-500" />
                                    <span>{topNav.phone}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="mr-2 text-gray-500" />
                                    <span>{topNav.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-4">
                                {topNav.social.map((social, index) => (
                                    <Link href={'#'} key={index}>
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-b-1 border-gray-100" />

            {/* Main Header */}
            <div
                className={`z-50 w-full bg-white py-5 transition duration-300 ease-in-out ${isScrolled ? 'fixed top-0 left-0 shadow-md' : 'shadow-none'}`}
            >
                <div className="container mx-auto max-w-screen-2xl px-12 md:px-15">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="logo">
                            <Link href="/">
                                <img src="/frontend/assets/logo.png" alt="Logo" className="h-5" />
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                            </button>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center lg:flex">
                            <ul className="flex gap-8">
                                {mainNav.map((item, index: any) => (
                                    <li key={index} className="group relative transition-all duration-500 ease-in-out">
                                        <Link
                                            href={item.path}
                                            onMouseEnter={() => setIsHovered(index)}
                                            onMouseLeave={() => setIsHovered(null)}
                                            className={`hover:text-primary flex items-center text-base font-bold text-gray-700 ${
                                                isHovered ? 'transition duration-300' : ''
                                            }`}
                                        >
                                            {item.title}
                                            {(item.submenu || item.megaMenu) && (
                                                <span className={`ml-2 transition-transform duration-300 ${isHovered === index ? 'rotate-180' : ''}`}>
                                                    <FiChevronDown />
                                                </span>
                                            )}
                                        </Link>

                                        {/* Dropdown Menu */}
                                        {item.submenu && (
                                            <ul className="absolute top-full left-0 z-150 hidden w-55 rounded-md bg-black py-2 shadow-lg transition-all duration-500 ease-in-out group-hover:block">
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <li
                                                        key={subIndex}
                                                        className="block w-full px-8 py-2 text-white hover:bg-gray-100 hover:text-gray-900"
                                                    >
                                                        <Link href={subItem.path}>{subItem.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Mega Menu */}
                                        {item.megaMenu && (
                                            <div className="absolute top-full left-4/6 z-150 hidden h-auto w-[1000px] max-w-7xl -translate-x-4/6 transform justify-evenly gap-4 rounded-md bg-black px-6 py-8 shadow-lg transition-all duration-500 ease-in-out group-hover:flex group-hover:flex-row lg:left-45">
                                                {item.columns.map((column, colIndex) => (
                                                    <div key={colIndex} className="space-y-2">
                                                        <h4 className="px-2 text-xl font-bold text-white">{column.title}</h4>
                                                        <ul className="space-y-2">
                                                            {column.items.map((colItem, itemIndex) => (
                                                                <li key={itemIndex}>
                                                                    <Link
                                                                        href={colItem.path}
                                                                        className="block w-full px-2 py-1 text-left text-white hover:bg-gray-100 hover:text-gray-900"
                                                                    >
                                                                        {colItem.title}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleSearch();
                                }}
                                className="hover:text-primary ml-6 cursor-pointer text-gray-700"
                            >
                                <FaSearch className="transition-transform duration-300 ease-in-out" />
                            </button>
                        </nav>

                        <div className="hidden lg:block">
                            {auth.user ? (
                                <>
                                    {auth.user.role === 'admin' ? (
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    ) : auth.user.role === 'instructor' ? (
                                        <Link
                                            href={route('instructor.dashboard')}
                                            className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                        >
                                            Instructor Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <div className="space-x-2 lg:space-x-4">
                                    <Link
                                        href={route('login')}
                                        className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="bg-opacity-75 inset-0 w-full overflow-y-auto lg:hidden" onClick={toggleMenu}>
                    <div className="bg-white p-4 px-8 absolute z-30 w-full" onClick={(e) => e.stopPropagation()}>
                        <ul className="space-y-2">
                            {mainNav.map((item, index) => (
                                <li key={index}>
                                    <div
                                        className="flex items-center justify-between rounded px-4 py-2 text-gray-700 font-bold text-base hover:bg-gray-100"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (item.submenu || item.megaMenu) {
                                                toggleSubmenu(index);
                                            } else {
                                                toggleMenu();
                                            }
                                        }}
                                    >
                                        {item.title}
                                        {(item.submenu || item.megaMenu) && (
                                            <span className={`transition-transform duration-300 ${expandedMenuIndex === index ? 'rotate-180' : ''}`}>
                                                <FiChevronDown />
                                            </span>
                                        )}
                                    </div>

                                    {item.submenu && expandedMenuIndex === index && (
                                        <ul className="mt-1 space-y-1">
                                            {item.submenu.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link href={subItem.path} className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                                                        {subItem.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Mega Menu */}
                                    {item.megaMenu && expandedMenuIndex === index && (
                                        <div className="mt-1 space-y-1" onClick={toggleMegaSubmenu}>
                                            {item.columns.map((column, colIndex) => (
                                                <div key={colIndex} className="space-y-2">
                                                    <h4
                                                        className="mb-2 flex items-center justify-between px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (column.items) {
                                                                toggleMegaSubmenu(colIndex);
                                                            } else {
                                                                toggleMenu();
                                                            }
                                                        }}
                                                    >
                                                        {column.title}

                                                        {column.items && (
                                                            <span
                                                                className={`transition-transform duration-300 ${
                                                                    expandedMegaSubMenuIndex === colIndex ? 'rotate-180' : ''
                                                                }`}
                                                            >
                                                                <FiChevronDown />
                                                            </span>
                                                        )}
                                                    </h4>

                                                    <ul className="space-y-2">
                                                        {column.items &&
                                                            expandedMegaSubMenuIndex === colIndex &&
                                                            column.items.map((colItem, itemIndex) => (
                                                                <li key={itemIndex}>
                                                                    <Link
                                                                        href={colItem.path}
                                                                        className="block rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
                                                                    >
                                                                        {colItem.title}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <div className="block lg:hidden">
                                {auth.user ? (
                                    <>
                                        {auth.user.role === 'admin' ? (
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="lg:py-1.5e rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        ) : auth.user.role === 'instructor' ? (
                                            <Link
                                                href={route('instructor.dashboard')}
                                                className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                            >
                                                Instructor Dashboard
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('dashboard')}
                                                className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                            >
                                                Dashboard
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <div className="space-x-2 lg:space-x-4">
                                        <Link
                                            href={route('login')}
                                            className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-sm border-1 px-4 py-1 text-base leading-normal text-gray-900 transition-colors duration-200 lg:px-5 lg:py-1.5"
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Form */}
            {isSearchOpen && (
                <div className="bg-opacity-75 absolute top-30 z-50 flex w-full items-center justify-center">
                    <div className="w-full bg-gray-50 py-4">
                        <form className="">
                            <div className='container mx-auto max-w-screen-2xl px-12 md:px-15'>
                            <input
                                type="text"
                                placeholder="Type Keywords"
                                className="w-full border-none border-gray-300 font-bold text-black focus:outline-none"
                            />
                            <button type="submit" className="hover:bg-primary-dark absolute top-5 cursor-pointer">
                                <FaSearch className="text-black" />
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
