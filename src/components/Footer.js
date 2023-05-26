import React from 'react';

function Footer({ loggedIn }) {
  return (
    loggedIn ?
      <footer className="footer">
        <p className="footer__copyright">© 2023 Мой первый сайт на React</p>
      </footer>
      :
      <></>
  );
}

export default Footer; 