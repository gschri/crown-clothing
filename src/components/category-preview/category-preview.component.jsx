import { Link } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component'

import {Preview,TitleLink,CategoryPreviewContainer} from './category-preview.styles'

let CategoryPreview = ({title,products}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <TitleLink to={title}>{title.toUpperCase()}</TitleLink>
            </h2>
            <Preview>
            {
                products.filter((_,idx) => idx < 4 ).map(product => (
                    <ProductCard key={product.id} product={product}/>
            ))}
            </Preview>
        </CategoryPreviewContainer>
    )

}

export default CategoryPreview