import { useRef, useEffect } from "react";

type TScrollBarProps = {
    children: React.ReactNode;
    className: string;
};

const ScrollBar = ({ children, className }: TScrollBarProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [children]);

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
