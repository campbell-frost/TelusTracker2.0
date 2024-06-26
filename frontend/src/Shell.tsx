import { ReactNode } from "react";

import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { DarkModeProvider, useDarkMode } from "./components/DarkModeContext";

interface ShellProps {
    children: ReactNode;
}
const Shell: React.FC<ShellProps> = ({ children }) => {
    const { dark, toggleDarkMode } = useDarkMode();


    return (
        <div className="min-h-screen grid mx-auto pt-20 relative">
            <button
                onClick={toggleDarkMode}
                className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
            >
                {dark ? <IoSunny /> : <IoMoon />}
            </button>
            {children}
        </div>
    );
}

const ShellWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (

        <DarkModeProvider>
            <Shell>{children}</Shell>
        </DarkModeProvider>
    );
};
export default ShellWrapper;