import React from 'react';
import { Route } from 'react-router-dom';
import Logo from '../images/logo.svg';

function Header(props) {
    const email = props.userData;

    return(
    <header className="header">
      <img className="header__logo" src={Logo} alt="Место" />
      <Route exact path="/">
        <p className="header__email">{email}</p>
        <a href="" className="header__link" onClick={props.signOut}>Выйти</a>
      </Route>
      <Route path="/sign-up">
        <a href="/sign-in" className="header__link">Войти</a>
      </Route>
      <Route path="/sign-in">
        <a href="/sign-up" className="header__link">Регистрация</a>
      </Route>
    </header>
    );
}

export default Header;