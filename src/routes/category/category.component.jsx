import ProductCard from '../../components/product-card/product-card.component'

import { useContext,useState,useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import { CategoriesContext } from '../../context/categories.context'

import {CategoryContainer,CategoryTitle} from './category.styles'

let Category = () => {
    var {category} = useParams()
    var {categoriesMap} = useContext(CategoriesContext)
    var [products,setProducts] = useState(categoriesMap[category])
    
    useEffect(() => {
        setProducts(categoriesMap[category])
    },[category,categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
            {products &&
                products.map((product) => <ProductCard key={product.id} product={product} />)
            }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category