import React from 'react';
import Navbar from '../frontend/components/Navbar';
import Footer from '../frontend/components/Footer';

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
        </>
    );
};

export default FrontendLayout;
