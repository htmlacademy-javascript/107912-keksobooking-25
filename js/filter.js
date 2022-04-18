import {renderMarkersOnMap} from './map.js';
import {getAdvertsCache} from './data-cache.js';

const COUNT_OF_MARKERS = 10;

const filtersForm = document.querySelector('.map__filters');
const filterHousingType = filtersForm.querySelector('#housing-type');
const filterHousingPrice = filtersForm.querySelector('#housing-price');
const filterHousingRooms = filtersForm.querySelector('#housing-rooms');
const filterHousingGuests = filtersForm.querySelector('#housing-guests');


const returnFintersValues = ()=>{
  const filtersValues = {};

  if(filterHousingType.value !== 'any'){
    filtersValues.type = filterHousingType.value;
  }
  if(filterHousingPrice.value !== 'any'){
    filtersValues.price = filterHousingPrice.value;
  }
  if(filterHousingRooms.value !== 'any'){
    filtersValues.rooms = filterHousingRooms.value;
  }
  if(filterHousingGuests.value !== 'any'){
    filtersValues.guests = filterHousingGuests.value;
  }

  return filtersValues;
};


const getFilteringAdverts = ()=>{
  const adverts = getAdvertsCache();
  return adverts.filter((advert)=>{
    if(filterHousingType.value === 'any') {
      return true;
    }else{
      return advert.offer.type === filterHousingType.value;
    }
  }).slice(0,COUNT_OF_MARKERS);
};

filterHousingType.addEventListener('change',()=>renderMarkersOnMap(getFilteringAdverts()));

const resetFiltersForm = () =>{
  filtersForm.reset();
  renderMarkersOnMap(getFilteringAdverts());
  //getFilteringAdverts
};
//console.log(returnFintersValues());

export {resetFiltersForm, getFilteringAdverts};
