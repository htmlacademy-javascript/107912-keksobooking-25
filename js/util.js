const getRandomInt = (min, max)=>{
  const diff = max-min;
  if(diff>=0){
    return min + Math.round(Math.random() * diff);
  }else{
    throw new Error('getRandomInt: Ошибка входных данных');
  }
};

const getRandomFloat = (min, max, accuracy)=>{
  const diff = max-min;
  if(diff>0){
    const randRoundNum = parseFloat((min+Math.random()*diff).toFixed(accuracy));
    if(randRoundNum>max)
    {
      return max;
    }else{
      return randRoundNum;
    }
  }else{
    throw new Error('getRandomFloat: Ошибка входных данных');
  }
};

const roundLatLng = (location,accuracy)=>({
  lat : Number(location.lat.toFixed(accuracy)),
  lng : Number(location.lng.toFixed(accuracy))
});

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export{getRandomInt, getRandomFloat, roundLatLng, showAlert};
