import { createSelector } from 'reselect'

let selectCategoryReducer = state => state.categories

export let selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export let selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            var { title, items } = category
            acc[title.toLowerCase()] = items
            return acc
        }, {})
)

export let selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)