import {useContext,Fragment} from 'react'

import {CategoriesContext} from '../../context/categories.context'

import CategoryPreview from '../../components/category-preview/category-preview.component'

let CategoriesPreview = () => {
    var {categoriesMap} = useContext(CategoriesContext)
    return (
        <Fragment>
            {Object.keys(categoriesMap).map(title => {
                var products = categoriesMap[title];
                return ( 
                    <CategoryPreview key={title} title={title} products={products}/>
                )
            })}
        </Fragment>
    )
}

export default CategoriesPreview;