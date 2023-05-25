import { useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({ loggedIn, userData, onSignout }) {
  const { email } = userData;
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  // не придумал как реализовать плавное открывания меню на мобилке
  const activeNavStyle = {
    display: 'flex',
  }

  function handleSignOut() {
    setIsBurgerClicked(false);
    onSignout();
  }

  function handleBurgerClick() {
    setIsBurgerClicked(!isBurgerClicked);
  };

  return (
    <header className="header">
      <nav className='header__nav_type_mobile' style={ isBurgerClicked ? activeNavStyle : {}}>
        <ul className='header__list'>
          <li className='header__user'>{loggedIn ? email : ''}</li>
          <li>
            <Link
              to='/'
              className='header__button'
              onClick={handleSignOut}>
              {loggedIn ? 'Выйти' : ''}
            </Link>
          </li>
        </ul>
      </nav>
      <div className='header__bar'>
        <img className="header__logo" src={logo} alt="Логотип Местро" />
        <div className={`${loggedIn ? 'header__burger' : ''} ${isBurgerClicked ? 'active' : ''}`} onClick={handleBurgerClick}>
          <span></span>
        </div>
        <nav className='header__nav'>
          <ul className='header__list'>
            <li className='header__user'>{loggedIn ? email : ''}</li>
            <li>
              <Link
                to='/'
                className='header__button'
                onClick={onSignout}>
                {loggedIn ? 'Выйти' : ''}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
    </header>
  );
}

export default Header; 