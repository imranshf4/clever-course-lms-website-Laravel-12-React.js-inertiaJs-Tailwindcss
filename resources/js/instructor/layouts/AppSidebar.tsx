import { usePage } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

// Assume these icons are imported from an icon library
import { ChevronDownIcon, GridIcon, HorizontaLDots, ListIcon } from '@/icons';
import { Link } from '@inertiajs/react';
import { useSidebar } from '../context/SidebarContext';

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
    {
        icon: <GridIcon />,
        name: 'Instructor Dashboard',
        path: '/instructor/dashboard',
    },
    {
        name: 'Course Manage',
        icon: <ListIcon />,
        subItems: [
            { name: 'Add Course', path: '/instructor/add/course' },
            { name: 'All Course', path: '/instructor/all/course' },
        ],
    },
    {
        name: 'Module Manage',
        icon: <ListIcon />,
        subItems: [
            { name: 'Add Module', path: '/instructor/add/module' },
            { name: 'All Module', path: '/instructor/all/module' },
        ],
    },
    {
        name: 'Lesson Manage',
        icon: <ListIcon />,
        subItems: [
            { name: 'Add Lesson', path: '/instructor/add/lesson' },
            { name: 'All Lesson', path: '/instructor/all/lesson' },
        ],
    },
    {
        name: 'Quiz Manage',
        icon: <ListIcon />,
        subItems: [
            { name: 'Add Quiz', path: '/instructor/add/quiz' },
            { name: 'All Quiz', path: '/instructor/all/quiz' },
        ],
    },
    {
        name: 'User Manage',
        icon: <ListIcon />,
        subItems: [
            { name: 'All User', path: '/instructor/all/user' },
        ],
    },
    {
        name: 'Rating Manage',
        icon: <ListIcon />,
        subItems: [
            { name: 'All Rating', path: '/instructor/all/rating' },
        ],
    },
    {
        name: 'Order Manage',
        icon: <ListIcon />,
        subItems: [
            { name: 'All Order', path: '/instructor/all/order' },
        ],
    },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const { url } = usePage();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: 'main' | '';
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => location.pathname === path;
    const isActive = useCallback((path: string) => url.split('?')[0] === path, [url]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: 'main' | '') => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (items: NavItem[], menuType: 'main' | '') => (
        <ul className="flex flex-col gap-4">
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-active' : 'menu-item-inactive'
                            } cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}
                        >
                            <span
                                className={`menu-item-icon-size ${
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? 'menu-item-icon-active'
                                        : 'menu-item-icon-inactive'
                                }`}
                            >
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType && openSubmenu?.index === index ? 'text-brand-500 rotate-180' : ''
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link href={nav.path} className={`menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'}`}>
                                <span className={`menu-item-icon-size ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : '0px',
                            }}
                        >
                            <ul className="mt-2 ml-9 space-y-1">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            href={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path) ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'
                                            }`}
                                        >
                                            {subItem.name}
                                            <span className="ml-auto flex items-center gap-1">
                                                {subItem.new && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path) ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive'
                                                        } menu-dropdown-badge`}
                                                    >
                                                        new
                                                    </span>
                                                )}
                                                {subItem.pro && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path) ? 'menu-dropdown-badge-active' : 'menu-dropdown-badge-inactive'
                                                        } menu-dropdown-badge`}
                                                    >
                                                        pro
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
                isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'
            } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`flex py-8 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
                <Link href="/">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img className="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
                            <img className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
                        </>
                    ) : (
                        <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
                    )}
                </Link>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 flex text-xs leading-[20px] text-gray-400 uppercase ${
                                    !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? 'Menu' : <HorizontaLDots className="size-6" />}
                            </h2>
                            {renderMenuItems(navItems, 'main')}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
