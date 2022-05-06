import { createSelector } from 'reselect'
import { RootState } from '../store'

import {CategoriesState} from './category.reducer'
import {CategoryMap} from './category.types'

let selectCategoryReducer = (state: RootState): CategoriesState => state.categories

export let selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export let selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap =>
        categories.reduce((acc, category) => {
            var { title, items } = category
            acc[title.toLowerCase()] = items
            return acc
        }, {} as CategoryMap)
)

export let selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)