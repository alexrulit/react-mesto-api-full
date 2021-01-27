import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Mesto from './Mesto';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../utils/mestoAuth';
import api from '../utils/api';
import { withRouter } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function App(props) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isRegisterPopupOpen, SetIsRegisterPopupOpen] = useState(false);
  const [registerPopupStatus, SetRegisterPopupStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  function handleLogin(password, email) {

    mestoAuth.authorize(password, email)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        api.setToken(data.token);
        setLoggedIn(true);
        setUserData(email);
        props.history.push("/");
      }  
    })
    .catch(err => console.log(err));

  } 

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      mestoAuth.getContent(jwt)
      .then((res) => {
        setUserData(res.email);
        setLoggedIn(true);
        props.history.push("/");
      })
      .catch(err => console.log(err));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()]) 
      .then(([result, data]) => {
        setCurrentUser(result);
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }, [loggedIn]);


  function handleRegister(password, email) { 

    mestoAuth.register(password, email)
    .then((res) => {
      if(res.status !== undefined && res.status === 200 || res.status === 201) {
        SetRegisterPopupStatus(true);
      } else {
        SetRegisterPopupStatus(false);
      }
      SetIsRegisterPopupOpen(true);
      })
      .catch(err => {
        console.log(err);
      });

  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    api.cardLike(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user.name, user.about)
    .then(result => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar.avatar)
    .then(result => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }

  function handleAddPlace(card) {
    api.addNewCard(card.name, card.link)
    .then(result => {
      setCards([result, ...cards]);
      closeAllPopups();
    })
    .catch(err => {
      console.log(err);
    });
  }
  
  function closeRegisterPopup() {
    SetIsRegisterPopupOpen(false);

    if(registerPopupStatus) {
        props.history.push('/sign-in');
    }
  }

  function signOut(){
    localStorage.removeItem('jwt');
    props.history.push('/sign-in');
  }

  return (
    <div className="page">
    <Header userData={userData} signOut={signOut} />
    <Switch>
      <Route path="/sign-up">
        <Register handleRegister={handleRegister}/>
        <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeRegisterPopup} status={registerPopupStatus} />
      </Route>
      <Route path="/sign-in">
        <Login handleLogin={handleLogin}/>
      </Route>
      <ProtectedRoute path="/" 
        loggedIn={loggedIn} 
        component={Mesto} 
        currentUser={currentUser} 
        cards={cards} 
        handleCardClick={handleCardClick} 
        handleEditAvatarClick={handleEditAvatarClick} 
        handleEditProfileClick={handleEditProfileClick} 
        handleAddPlaceClick={handleAddPlaceClick} 
        handleCardLike={handleCardLike} 
        handleCardDelete={handleCardDelete} 
        handleUpdateUser={handleUpdateUser} 
        handleUpdateAvatar={handleUpdateAvatar}  
        handleAddPlace={handleAddPlace} 
        isEditProfilePopupOpen={isEditProfilePopupOpen} 
        isAddPlacePopupOpen={isAddPlacePopupOpen} 
        isEditAvatarPopupOpen={isEditAvatarPopupOpen} 
        selectedCard={selectedCard} 
        closeAllPopups={closeAllPopups} />
    </Switch>
    <Footer />
    </div>
    
  );
}

export default withRouter(App);
