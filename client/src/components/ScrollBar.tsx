import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

type TScrollBarProps = {
    children: React.ReactNode;
    className: string;
};

const ScrollBar = ({ children, className }: TScrollBarProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        if (containerRef.current && !location.hash) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [children, location]);

    return (
        <div
            ref={containerRef}
            className={`overflow-y-hidden ${className} hover:overflow-y-auto`}
        >
            {children}
        </div>
    );
};

export default ScrollBar;
