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
}

const BUILDINGS_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel']; //здания
const CHECKIN_TIMES = ['12:00','13:00','14:00']; //время заезда
const CHECKOUT_TIMES = ['12:00','13:00','14:00']; //время выезда
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_PATH = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg'
  ,'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg'
  ,'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


const createAuthor = ()=>{
  const nom = getRandomInt(1,10);
  if(nom===10){
    return {avatar: `img/avatars/user${nom}.png`};
  }
  return {avatar: `img/avatars/user0${nom}.png`};
};

const createLocation = ()=>({
  lat:getRandomFloat(35.65000,35.70000,5),
  lng: getRandomFloat(139.70000,139.80000,5)
});

const createOffer = (lat,lnd)=>{
  const offer = {};
  offer.title= 'Лучшее предложение';
  offer.address= `${lat},${lnd}`;
  offer.price= getRandomInt(1,10000);
  offer.type= BUILDINGS_TYPES[getRandomInt(0,BUILDINGS_TYPES.length-1)];
  offer.rooms= getRandomInt(1,100);
  offer.guests=  getRandomInt(1,100);
  offer.checkin= CHECKIN_TIMES[getRandomInt(0,CHECKIN_TIMES.length-1)];
  offer.checkout= CHECKOUT_TIMES[getRandomInt(0,CHECKOUT_TIMES.length-1)];

  const featuresStart= getRandomInt(0,FEATURES.length-1);
  const featuresEnd= getRandomInt(featuresStart,FEATURES.length-1);
  offer.features= FEATURES.slice(featuresStart,featuresEnd+1);

  offer.description= 'Лучшие виды в городе';
  offer.photos= Array.from({length:getRandomInt(1,100)},()=>PHOTOS_PATH[getRandomInt(0,PHOTOS_PATH.length-1)]);

  return offer;
};

const createAdvert =()=>{
  const location = createLocation();
  return {
    author: createAuthor(),
    location: location,
    offer: createOffer(location.lat,location.lng)
  };
};


///const ADS =
Array.from({length:10}, createAdvert); // массив из 10 сгенерированных JS-объектов (объявлений)

//console.log(ADS);
