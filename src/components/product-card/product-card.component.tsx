import {useSelector,useDispatch} from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import {FC} from 'react';
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component'
import { CategoryItem } from '../../store/categories/category.types'; 

import {
    ProductCardContainer,
    Footer,
    Name,
    Price
} from './product-card.styles'

type ProductCardProps = {
    product: CategoryItem;
}

let ProductCard: FC<ProductCardProps> = ({ product }) => {
    var dispatch = useDispatch();
    var {name,price,imageUrl} = product;
    var cartItems = useSelector(selectCartItems)
    var addProductToCart = () => dispatch(addItemToCart(cartItems,product))

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted} 
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </ProductCardContainer>
        )
}

export default ProductCard