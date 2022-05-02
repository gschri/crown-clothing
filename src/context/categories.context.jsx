import { createContext, useState,useEffect } from "react";

import {getCategoriesAndDocuments} from "../utils/firebase/firebase.utils.js";

export let CategoriesContext = createContext({
    categoriesMap: {}
})

export let CategoriesProvider = ({children}) => {
    var [categoriesMap,setCategoriesMap] = useState({})

    useEffect(() => {
        var getCategoriesMap = async () => {
            var categoryMap = await getCategoriesAndDocuments()
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
    },[])

    var value = {categoriesMap}
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}