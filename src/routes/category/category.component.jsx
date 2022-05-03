import ProductCard from '../../components/product-card/product-card.component'
import Spinner from '../../components/spinner/spinner.component'

import {useState,useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { selectCategoriesMap,selectCategoriesIsLoading } from '../../store/categories/category.selector'

import {useSelector} from 'react-redux'

import {CategoryContainer,CategoryTitle} from './category.styles'

let Category = () => {
    var {category} = useParams()
    var categoriesMap = useSelector(selectCategoriesMap)
    var isLoading = useSelector(selectCategoriesIsLoading)
    var [products,setProducts] = useState(categoriesMap[category])
    
    useEffect(() => {
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {isLoading ? ( 
                <Spinner />  
            ) : (
                <CategoryContainer>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </CategoryContainer>
            )}
        </Fragment>
    )
}

export default Category