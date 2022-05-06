import {Fragment} from 'react'
import {useSelector} from 'react-redux'
import { selectCategoriesMap,selectCategoriesIsLoading } from '../../store/categories/category.selector'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from '../../components/spinner/spinner.component'

let CategoriesPreview = () => {
    var categoriesMap = useSelector(selectCategoriesMap)
    var isLoading = useSelector(selectCategoriesIsLoading)

    return (
        <Fragment>
            {isLoading ? (
                    <Spinner />
                ) : (
                    Object.keys(categoriesMap).map(title => {
                        var products = categoriesMap[title];
                        return ( 
                            <CategoryPreview key={title} title={title} products={products}/>
                        )
                    })
            )}
        </Fragment>
    )
}

export default CategoriesPreview;