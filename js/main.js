function getRandomInt(a,b){
  const diff = b-a;
  if(diff>=0){
    return a + Math.round(Math.random() * diff);
  }else{
    return Error('getRandomInt: Ошибка входных данных');
  }
}

function getRandomFloat(a,b,accuracy){
  const diff = b-a;
  if(diff>0){
    const randNum = a + Math.random() * diff;
    return parseFloat(randNum.toFixed(accuracy));
  }else{
    return Error('getRandomFloat: Ошибка входных данных');
  }
}

getRandomInt(0,100);
getRandomFloat(0.5,15.58,4);
