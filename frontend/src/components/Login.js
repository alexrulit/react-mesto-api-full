import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';


function Login(props) {
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
        
        if (!email || !password){
            return;
        }
        
        props.handleLogin(password, email);
    
    }

    return(
        <div>
            <form name="main-form" action="#" className="main-form" noValidate onSubmit={handleSubmit}>
                <h2 className="main-form__title">Вход</h2>
                <input name="email" type="email" value={email} onChange={handleChangeEmail} className="main-form__input" placeholder="Email"/>
                <input name="password" type="password" value={password} onChange={handleChangePassword} className="main-form__input" placeholder="Пароль"/>
                <button type="submit" name="submit" className="main-form__button">Войти</button>
            </form>
        </div>
        );
}

export default withRouter(Login);