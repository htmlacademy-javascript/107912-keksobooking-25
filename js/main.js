function getRandomInt(min, max){
  const diff = max-min;
  if(diff>=0){
    return min + Math.round(Math.random() * diff);
  }else{
    throw new Error('getRandomInt: Ошибка входных данных');
  }
}

function getRandomFloat(min, max, accuracy){
  const diff = max-min;
  if(diff>0){
    const randNum = min + Math.random() * diff;
    return parseFloat(randNum.toFixed(accuracy));
  }else{
    throw new Error('getRandomFloat: Ошибка входных данных');
  }
}

getRandomInt(0,100);
getRandomFloat(0.5,15.58,4);
