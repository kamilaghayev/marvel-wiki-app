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
                    <li><NavLink end to="/">Characters</NavLink></li>
                    /
                    <li><NavLink end to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header