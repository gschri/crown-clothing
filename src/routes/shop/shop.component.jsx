import {useContext} from 'react'

import ProductCard from '../../components/product-card/product-card.component'

import {ProductsContext} from '../../context/products.context'

import './shop.styles.scss'

let Shop = () => {
    var {products} = useContext(ProductsContext)
    console.log('Shop component products: ',products)
    return (
        <div className='products-container'>
            { products.map( product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop;