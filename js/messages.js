const ALERT_SHOW_TIME = 6000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '8px 2px';
  alertContainer.style.color = 'white';
  alertContainer.style.fontSize = '22px';
  alertContainer.style.fontWeight = 400;
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.querySelector('.map').append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

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

export{showSuccessMessage, showErrorMessage, showAlert};
