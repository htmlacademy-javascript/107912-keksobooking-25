import  {getRandomInt, getRandomFloat} from './util.js';
import {BUILDINGS_TYPES, CHECKIN_TIMES, CHECKOUT_TIMES, FEATURES, PHOTOS_PATH} from './data.js';


const createAuthor = ()=>{
  const number = getRandomInt(1,10);
  if(number===10){
    return {avatar: `img/avatars/user${number}.png`};
  }
  return {avatar: `img/avatars/user0${number}.png`};
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


export {createAdvert};
