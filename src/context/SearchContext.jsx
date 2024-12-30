import { useState, useEffect, useContext, createContext } from "react";
import { debounce } from "lodash";
import { useNotificationContext } from "./NotiContext";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
   const { updateNotification } = useNotificationContext();
   const [isSearching, setIsSearching] = useState(false);
   const [results, setResults] = useState([]);
   const [resultNotFound, setResultNotFound] = useState(false);

   const debounceSearch = debounce(async (method, query, updatorFunc) => {
      const { error, data } = await method(query);
      if (error) return updateNotification("error", error);
      // if there is not record found
      if (!data.length) {
         setResults([]);
         updatorFunc && updatorFunc([]);
         return setResultNotFound(true);
      }
      // if there are records present
      setResults(data);
      setResultNotFound(false);
      updatorFunc && updatorFunc([...data]);
   }, 500);

   const handleSearch = (method, query, updatorFunc) => {
      if (!query.trim()) {
         updatorFunc && updatorFunc([]);
         return resetSearch();
      }
      debounceSearch(method, query, updatorFunc);
   };

   const resetSearch = () => {
      setIsSearching(false);
      setResults([]);
      setResultNotFound(false);
   };

   return (
      <SearchContext.Provider
         value={{ handleSearch, resetSearch, isSearching, results, resultNotFound }}
      >
         {children}
      </SearchContext.Provider>
   );
};

export const useSearchContext = () => useContext(SearchContext);
