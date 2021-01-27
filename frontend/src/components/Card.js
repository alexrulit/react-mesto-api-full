import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `elements__like-button ${isLiked && 'elements__like-button_active'}`;

    function handleClick() {
        props.onCardClick(props.card);
    } 

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return(
        <li className="elements__item">
          <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
          <div className="elements__description">
            <p className="elements__text">{props.card.name}</p>
            <div className="elements__like">
              <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
              <p className="elements__like-count">{props.card.likes.length}</p>
            </div>
          </div>
          { isOwn &&
              <button type="button" className="elements__delete-button" onClick={handleDeleteClick} />
          }
        </li>
    );
}

export default Card;