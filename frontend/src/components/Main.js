import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

    return(
      <main className="main">
        <section className="profile">
          <div className="profile__avatar-link" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          </div>
          <div className="profile__info">
            <div className="profile__author">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
        </section>
        <section className="elements">
          <ul className="elements__list">
          {props.cardList.map((item) => {
            return (
              <Card card={item} key={item._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
            );
          })}
          </ul>
        </section>
      </main>
    );
}

export default Main;