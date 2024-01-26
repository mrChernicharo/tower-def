import { ReactNode, createContext, useEffect, useCallback, useState } from "react";

export type LayoutContextType = {
    isMobile: boolean;
};

export const LayoutContext = createContext<LayoutContextType>({
    isMobile: false,
});

export const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
    const [width, setWidth] = useState(0);

    const onResize = useCallback(() => {
        setWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        onResize();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, [onResize]);

    const value: LayoutContextType = {
        isMobile: width < 500,
    };

    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};
