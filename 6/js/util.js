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
    if(randRoundNum>max) //при accuracy меньше кол знаков после "." иногда randRoundNum>max (погрешность огругления toFixed());
    {
      return max;
    }else{
      return randRoundNum;
    }
  }else{
    throw new Error('getRandomFloat: Ошибка входных данных');
  }
};

export{getRandomInt, getRandomFloat};
