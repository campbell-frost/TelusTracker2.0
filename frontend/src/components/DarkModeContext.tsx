import { createContext, ReactNode, useContext, useState } from "react";

interface DarkModeContextProps {
    dark: boolean;
    toggleDarkMode: () => void;
}
const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider")
    }
    return context;
};

interface DarkModeProviderProps {
    children: ReactNode;
}
export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [dark, setDark] = useState(false);
    const toggleDarkMode = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    };

    return (
        <DarkModeContext.Provider value={{ dark, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
