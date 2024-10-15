import { useState } from "react";
import { createContext } from "react";

export const LanguageCtx = createContext()

const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(
        localStorage.getItem("languageEx")?localStorage.getItem("languageEx"):"en"
    );
    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem("languageEx",newLanguage)
    };
    return <LanguageCtx.Provider value={{ language, changeLanguage }}>
        {children}
    </LanguageCtx.Provider>
}

export default LanguageProvider;

