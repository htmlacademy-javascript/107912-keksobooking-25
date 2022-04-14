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

export{getRandomInt, getRandomFloat, roundLatLng};
