// import { useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({ loggedIn, userData, onSignout }) {
  const { email } = userData;
  

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Местро" />
      <div className='header__burger'>
        <span></span>
      </div>
      <nav className='header__nav'>
        <ul className='header__list'>
          <li>
            <div className='header__user'>{loggedIn ? email : ''}</div>
          </li>
          <li>
            <Link
              to='/'
              className='header__button'
              onClick={onSignout}>
              {loggedIn ? 'Выйти' : '' }
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; 