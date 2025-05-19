
import { HelmetProvider } from 'react-helmet-async';
import AppSidebar from './AppSidebar';
import Backdrop from './Backdrop';
import AppHeader from './AppHeader';
import { ThemeProvider } from '../context/ThemeContext';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';


const LayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className="min-h-screen xl:flex dark:bg-gray-900">
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
                } ${isMobileOpen ? 'ml-0' : ''}`}
            >
                <AppHeader />
                <div className="mx-auto max-w-(--breakpoint-2xl) p-4 md:p-6">{children}</div>
            </div>
        </div>
    );
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <SidebarProvider>
                    <LayoutContent>{children}</LayoutContent>
                </SidebarProvider>
            </ThemeProvider>
        </HelmetProvider>
    );
};

export default AppLayout;
