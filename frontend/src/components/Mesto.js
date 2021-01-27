import React, { useState } from 'react';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Mesto(props) {


  return (
        <CurrentUserContext.Provider value={props.currentUser}>
          <Main onEditProfile={props.handleEditProfileClick} onAddPlace={props.handleAddPlaceClick} onEditAvatar={props.handleEditAvatarClick} onCardClick={props.handleCardClick} onCardLike={props.handleCardLike} onCardDelete={props.handleCardDelete} cardList={props.cards} />
          <EditProfilePopup isOpen={props.isEditProfilePopupOpen} onClose={props.closeAllPopups} onUpdateUser={props.handleUpdateUser} />
          <AddPlacePopup isOpen={props.isAddPlacePopupOpen} onClose={props.closeAllPopups} onAddPlace={props.handleAddPlace} />
          <EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups} onUpdateAvatar={props.handleUpdateAvatar} />
          <ImagePopup card={props.selectedCard} onClose={props.closeAllPopups} />
        </CurrentUserContext.Provider>
  );
}

export default Mesto;
