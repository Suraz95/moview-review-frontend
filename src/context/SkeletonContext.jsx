import { useState, useEffect, useContext, createContext } from "react";
import { useThemeContext } from "./themeContext";

const SkeletonContext = createContext();

export const SkeletonContextProvider = ({ children }) => {
   const { theme } = useThemeContext();
   const [baseColor, setBaseColor] = useState("");
   const [highlightColor, setHighlightColor] = useState("");

   const changeSkeletonColor = () => {
      if (theme === "halloween") {
         setBaseColor("#202020");
         setHighlightColor("#444");
      } else if (theme === "corporate") {
         setBaseColor("");
         setHighlightColor("");
      }
   };

   useEffect(() => {
      changeSkeletonColor();
   }, [theme]);
   return (
      <SkeletonContext.Provider value={{ baseColor, highlightColor }}>
         {children}
      </SkeletonContext.Provider>
   );
};

export const useSkeletonContext = () => useContext(SkeletonContext);
