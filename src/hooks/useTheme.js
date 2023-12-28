import React, { useState, useEffect } from "react";

const useTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDarkMode ? "dark" : "light";
    const [theme, setTheme] = useState(savedTheme || defaultTheme);

    const saveThemeToLocalStorage = (newTheme) => {
        localStorage.setItem("theme", newTheme);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        saveThemeToLocalStorage(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
            setTheme(savedTheme);
        } else {
            setTheme(defaultTheme);
        }

        // Встановлення поточної теми в атрибут data-theme
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme, defaultTheme]);

    return [theme, toggleTheme];
};

export default useTheme;
