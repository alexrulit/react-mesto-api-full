import React from 'react';
import success from '../images/Success.png';
import failed from '../images/Failed.png';

function InfoTooltip(props) {
    return(
      <div className={`popup popup_type_register ${props.isOpen && 'popup_opened'}`}>
          <div className="popup__container">
            <img src={props.status ? success : failed} className="popup__status" alt={props.status ? "Success" : "Failed"} />
            <h2 className="popup__status-title">{props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            <button type="button" className="popup__close" onClick={props.onClose}/>
          </div>
      </div>
    );
}

export default InfoTooltip;