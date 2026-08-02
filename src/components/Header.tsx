import { NavLink } from 'react-router-dom';
import '../styles/header.css';

export function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <span className="header__logo">
          <NavLink
            className="header__logo-link"
            to="/"
            end>
            VIN Decoder
          </NavLink>
        </span>
        <nav className="header__nav" aria-label="Основна навігація">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'header__link header__link--active' : 'header__link'
            }
          >
            Розшифровка
          </NavLink>
          <NavLink
            to="/variables"
            className={({ isActive }) =>
              isActive ? 'header__link header__link--active' : 'header__link'
            }
          >
            Змінні
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
