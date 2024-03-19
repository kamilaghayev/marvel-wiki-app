import { NavLink } from "react-router-dom";

const ComicsListItems = ({comic}) => {
    const {id, title, price, thumbnail} = comic;
    return (
        <li className="comics__item">
            <NavLink to={`/comics/${id}`}>
                <img src={thumbnail} alt={title} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price}</div>
            </NavLink>
        </li>
    )
}

export default ComicsListItems