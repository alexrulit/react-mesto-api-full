import React from 'react';
import PopupWithForm from './PopupWithForm';




function EditAvatarPopup(props) {

    const avatarRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
  
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }


    return(
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="popupAvatar" name="avatarLink" type="url" ref={avatarRef} className="popup__input" placeholder="Ссылка на картинку" required />
            <span id="popupAvatar-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;