import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'; 


function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();
      
        props.handleRegister(password, email);    
    }


    return(
        <div>
            <form name="main-form" action="#" className="main-form" noValidate onSubmit={handleSubmit}>
                <h2 className="main-form__title">Регистрация</h2>
                <input name="email" type="email" value={email} onChange={handleChangeEmail} className="main-form__input" placeholder="Email" required/>
                <input name="password" type="password" value={password} onChange={handleChangePassword} className="main-form__input" placeholder="Пароль" required/>
                <button type="submit" name="submit" className="main-form__button">Зарегистрироваться</button>
                <a href="/sign-in" className="main-form__link">Уже зарегистрированы? Войти</a>
            </form>
        </div>
        );
}

export default withRouter(Register);