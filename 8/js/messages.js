const onMessageClick = () => closeMessage();

const onEscapePress = (evt)=>{
  if(evt.key === 'Escape')
  {
    closeMessage();
  }
};

const showSuccessMessage = ()=>{
  document.body.appendChild(document.querySelector('#success').content.cloneNode(true));
  document.querySelector('.success').id = 'popup_message';
  document.addEventListener('click',onMessageClick);
  document.addEventListener('keydown', onEscapePress);
};

const showErrorMessage = (errorButtonClikHandler)=>{
  document.body.appendChild(document.querySelector('#error').content.cloneNode(true));
  document.querySelector('.error').id = 'popup_message';
  document.addEventListener('click',onMessageClick);
  document.addEventListener('keydown', onEscapePress);
  document.querySelector('.error__button').addEventListener('click',errorButtonClikHandler,{once:true});
};

function closeMessage(){
  document.querySelector('#popup_message').remove();
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onEscapePress);
}

export{showSuccessMessage, showErrorMessage};
