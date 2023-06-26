import React, {useState, useContext, createContext} from 'react'

const SearchContext = createContext();

const SearchProvider = ({children}) => {

    const [search, setSearch] = useState({
        keyword: "",
        products: []
    })

    return (
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

// custom hook
const useSearch = () => useContext(SearchContext);

export {useSearch, SearchProvider}