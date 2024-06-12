import { Navbar } from "./_components/navbar";
import React from 'react';

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <div className="relative h-full w-full">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 object-cover w-full h-full"
            >
                <source src="/video/5510387-hd_1920_1080_30fps.mp4" type="video/mp4" />
            </video>
            <div className="relative h-full w-full flex flex-col gap-y-10 items-center justify-center ">
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default ProtectedLayout;