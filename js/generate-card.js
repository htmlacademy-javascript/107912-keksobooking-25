import {createAdvert} from './create-advert.js';

//Array.from({length:10}, createAdvert); // массив из 10 сгенерированных JS-объектов (объявлений)

const newCard = createAdvert();

const templateCard = document.querySelector('#card').content.cloneNode(true);

const title = templateCard.querySelector('.popup__title');
if(newCard.offer.title){
  title.textContent = newCard.offer.title;
}else{
  title.remove();
}

const address = templateCard.querySelector('.popup__text--address');
if(newCard.offer.address){
  address.textContent = newCard.offer.address;
}else{
  address.remove();
}

const price = templateCard.querySelector('.popup__text--price');
if(newCard.offer.price){
  price.textContent = `${newCard.offer.price} ₽/ночь`;
}else{
  price.remove();
}

const buildingType = templateCard.querySelector('.popup__type');
switch (newCard.offer.type){
  case 'flat': buildingType.textContent = 'Квартира'; break;
  case 'bungalow': buildingType.textContent = 'Бунгало'; break;
  case 'house': buildingType.textContent = 'Дом'; break;
  case 'palace': buildingType.textContent = 'Дворец'; break;
  case 'hotel': buildingType.textContent = 'Отель'; break;
  case '': buildingType.remove();
}

const capacity = templateCard.querySelector('.popup__text--capacity');
if(newCard.offer.rooms && newCard.offer.guests){
  capacity.textContent = `${newCard.offer.rooms} комнаты для ${newCard.offer.guests} гостей`;
}else{
  capacity.remove();
}

const tyme = templateCard.querySelector('.popup__text--time');
if(newCard.offer.checkin && newCard.offer.checkout){
  tyme.textContent = `Заезд после ${newCard.offer.checkin}, выезд до ${newCard.offer.checkout}`;
}else{
  tyme.remove();
}

/*
const popupFeatures = templateCard.querySelector('.popup__features'); // ul
if(newCard.offer.features.length){
  const features = newCard.offer.features.slice(); // копируем массив фич
  const featureSet = popupFeatures.querySelectorAll('.popup__feature');
  console.log('featureSet.length = '+  featureSet.length);
  features.forEach((item,index)=>{features[index] = `popup__feature--${item}!`;}); // модифицируем массив фич для сравнения
  console.log('массив features: ' + features);
  let removeItem = false;
  let a;
  let b;
  featureSet.forEach((featureListItem)=>{
    removeItem = true;
    for(let i=0; i<features.length; i++){
      a = featureListItem.classList[1];
      b = features[i];

      if(featureListItem.classList[1] === features[i]){

        removeItem = false;
      }
    }

    if(removeItem) {
      featureListItem.remove();
    }


  });

  console.log('массив: ' + features);
  console.log('featureSet.length = '+featureSet.length);
  console.log(featureSet);
}else{
  popupFeatures.remove();
}*/


const popupFeatures = templateCard.querySelector('.popup__features'); // ul
if(newCard.offer.features.length){
  const features = newCard.offer.features;//.slice();
  const featureSet = popupFeatures.querySelectorAll('.popup__feature');

  featureSet.forEach((featureListItem)=>{
    const notRemoveItem = features.some((offerFeature) => featureListItem.classList[1] === (`popup__feature--${offerFeature}`));
    if(!notRemoveItem){
      featureListItem.remove();
    }
  });
//  console.log('массив: ' + features);
//  featureSet.forEach((featureListItem)=>{console.log(featureListItem);});
}else{
  popupFeatures.remove();
}


const description = templateCard.querySelector('.popup__description');
if(newCard.offer.description)
{
  description.textContent = newCard.offer.description;
}else{
  description.remove();
}

const photos = templateCard.querySelector('.popup__photos');
if(newCard.offer.photos.length)
{
  const photo  = photos.querySelector('.popup__photo');
  photo.src = newCard.offer.photos[0];
  for(let i=1;i<newCard.offer.photos.length;i++){
    const newPhoto = photo.cloneNode(true);
    newPhoto.src = newCard.offer.photos[i];
    photos.appendChild(newPhoto);
  }
//  console.log(photo.src);
}else{
  photos.remove();
}

const avatar = templateCard.querySelector('.popup__avatar');
if(newCard.author.avatar){
  avatar.src = newCard.author.avatar;
}else{
  avatar.remove();
}


//console.log('вывод card');
//console.log(newCard);

const map = document.getElementById('map-canvas');
//map = document.querySelector('.map__canvas');
map.append(templateCard);
