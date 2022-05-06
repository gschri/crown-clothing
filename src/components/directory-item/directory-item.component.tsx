import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import { DirectoryCategory } from '../directory/directory.component'

import {
    DirectoryItemContainer,
    BackgroundImage,
    Body
} from './directory-item.styles'

type DirectoryItemProps = {
    category: DirectoryCategory
}

let DirectoryItem: FC<DirectoryItemProps> = ({category}) => {
    var {imageUrl,title,route} = category
    var navigate = useNavigate();

    var onNavigateHandler = () => navigate(route)
    
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage 
                className="background-image" 
                imageUrl={imageUrl}
            />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;