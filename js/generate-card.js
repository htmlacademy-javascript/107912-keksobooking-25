const generateCard = (advert)=>{

  const templateCard = document.querySelector('#card').content.cloneNode(true);

  const title = templateCard.querySelector('.popup__title');
  if(advert.offer.title){
    title.textContent = advert.offer.title;
  }else{
    title.remove();
  }

  const address = templateCard.querySelector('.popup__text--address');
  if(advert.offer.address){
    address.textContent = advert.offer.address;
  }else{
    address.remove();
  }

  const price = templateCard.querySelector('.popup__text--price');
  if(advert.offer.price){
    price.textContent = `${advert.offer.price} ₽/ночь`;
  }else{
    price.remove();
  }

  const buildingType = templateCard.querySelector('.popup__type');
  switch (advert.offer.type){
    case 'flat': buildingType.textContent = 'Квартира'; break;
    case 'bungalow': buildingType.textContent = 'Бунгало'; break;
    case 'house': buildingType.textContent = 'Дом'; break;
    case 'palace': buildingType.textContent = 'Дворец'; break;
    case 'hotel': buildingType.textContent = 'Отель'; break;
    default : buildingType.remove();
  }

  const capacity = templateCard.querySelector('.popup__text--capacity');
  if(advert.offer.rooms && advert.offer.guests){
    capacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  }else{
    capacity.remove();
  }

  const tyme = templateCard.querySelector('.popup__text--time');
  if(advert.offer.checkin && advert.offer.checkout){
    tyme.textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  }else{
    tyme.remove();
  }

  const popupFeatures = templateCard.querySelector('.popup__features');
  if(advert.offer.features.length){
    const features = advert.offer.features;
    const featureSet = popupFeatures.querySelectorAll('.popup__feature');

    featureSet.forEach((featureListItem)=>{
      const notRemoveItem = features.some((offerFeature) => featureListItem.classList[1] === (`popup__feature--${offerFeature}`));
      if(!notRemoveItem){
        featureListItem.remove();
      }
    });

  }else{
    popupFeatures.remove();
  }

  const description = templateCard.querySelector('.popup__description');
  if(advert.offer.description)
  {
    description.textContent = advert.offer.description;
  }else{
    description.remove();
  }

  const photos = templateCard.querySelector('.popup__photos');
  if(advert.offer.photos.length)
  {
    const photo  = photos.querySelector('.popup__photo');
    photo.src = advert.offer.photos[0];
    for(let i=1;i<advert.offer.photos.length;i++){
      const newPhoto = photo.cloneNode(true);
      newPhoto.src = advert.offer.photos[i];
      photos.appendChild(newPhoto);
    }
  }else{
    photos.remove();
  }

  const avatar = templateCard.querySelector('.popup__avatar');
  if(advert.author.avatar){
    avatar.src = advert.author.avatar;
  }else{
    avatar.remove();
  }

  return templateCard;
};

export{generateCard};
