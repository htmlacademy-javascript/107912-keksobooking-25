import {renderMarkersOnMap} from './map.js';
import {getAdvertsCache} from './data-cache.js';
import {debounce} from './util.js';

const ADVERTS_ON_MAP = 10;
const ANY_VALUE = 'any';
const LOW_PRICE_END = 10000;
const HIGH_PRISE_START = 50000;
const DELAY = 500;

const filtersForm = document.querySelector('.map__filters');
const filterHousingType = filtersForm.querySelector('#housing-type');
const filterHousingPrice = filtersForm.querySelector('#housing-price');
const filterHousingRooms = filtersForm.querySelector('#housing-rooms');
const filterHousingGuests = filtersForm.querySelector('#housing-guests');


const filterByBuildingType = (advert)=>
  filterHousingType.value === ANY_VALUE || filterHousingType.value === advert.offer.type;

const filterByPrise = (advert) => {
  switch (filterHousingPrice.value){
    case 'middle' : return advert.offer.price >= LOW_PRICE_END && advert.offer.price <= HIGH_PRISE_START;
    case 'low' : return advert.offer.price < LOW_PRICE_END;
    case 'high' : return advert.offer.price >= HIGH_PRISE_START;
    default: return true;
  }
};

const filterByRooms = (advert) =>
  filterHousingRooms.value === ANY_VALUE || Number(filterHousingRooms.value) === advert.offer.rooms;

const filterByGuests = (advert) =>
  filterHousingGuests.value === ANY_VALUE || Number(filterHousingGuests.value) === advert.offer.guests;

const filterByFeatures = (advert) => {
  const checkedFeatures = filtersForm.querySelectorAll('.map__checkbox:checked');
  const checkedFeaturesArray = Array.from(checkedFeatures,(checkedElement)=>checkedElement.value);
  if(checkedFeaturesArray.length){
    if('features' in advert.offer){
      return checkedFeaturesArray.every((feature)=>advert.offer.features.includes(feature));
    }else{
      return false;
    }
  }else {
    return true;
  }
};


const getFilteringAdverts = ()=>{
  const adverts = getAdvertsCache();
  const filteredAdverts = [];
  for(let i=0; i < adverts.length; i++)
  {
    const currentAdvert = adverts[i];

    if(filterByBuildingType(currentAdvert)
      && filterByPrise(currentAdvert)
      && filterByRooms(currentAdvert)
      && filterByGuests(currentAdvert)
      && filterByFeatures(currentAdvert)){
      filteredAdverts.push(currentAdvert);
    }

    if(filteredAdverts.length === ADVERTS_ON_MAP){
      break;
    }
  }
  return filteredAdverts;
};


const resetFiltersForm = () =>{
  filtersForm.reset();
  renderMarkersOnMap(getAdvertsCache().slice(0,ADVERTS_ON_MAP));
};

const onFiltersChange = debounce(() =>renderMarkersOnMap(getFilteringAdverts()), DELAY);

filtersForm.addEventListener('change',onFiltersChange);

export {resetFiltersForm, getFilteringAdverts};
