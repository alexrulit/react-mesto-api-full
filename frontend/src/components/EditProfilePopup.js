import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
      }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDesc(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {

        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    return(
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="popupAuthor" name="popupAuthor" type="text" value={name} onChange={handleChangeName} className="popup__input" placeholder="Имя" minLength="2" maxLength="40" required pattern="[А-Яа-яA-Za-z -]{1,}" />
            <span id="popupAuthor-error" className="popup__input-error"></span>
            <input id="popupDesc" name="popupDesc" type="text" value={description} onChange={handleChangeDesc} className="popup__input" placeholder="Занятие" minLength="2" maxLength="200" required />
            <span id="popupDesc-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;