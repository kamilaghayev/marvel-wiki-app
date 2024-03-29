import { NavLink } from 'react-router-dom';
import './header.scss';

const Header = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink end to="/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink 
                            end 
                            to="/"
                            style={({isActive}) => ({color: isActive ? "#9F0013" : "inherit"})}
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink 
                            end 
                            to="/comics"
                            style={({isActive}) => ({color: isActive ? "#9F0013" : "inherit"})}
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header