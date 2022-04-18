import {renderMarkersOnMap} from './map.js';

const filtersForm = document.querySelector('.map__filters');
const filterHousingType = filtersForm.querySelector('#housing-type');
const filterHousingPrice = filtersForm.querySelector('#housing-price');
const filterHousingRooms = filtersForm.querySelector('#housing-rooms');
const filterHousingGuests = filtersForm.querySelector('#housing-guests');


const getFilteringAdverts = (adverts)=>{
  return adverts.slice(0,10);
};

const resetFiltersForm = () =>{
  filtersForm.reset();
  renderMarkersOnMap(getFilteringAdverts());
  //getFilteringAdverts
};

export {resetFiltersForm, getFilteringAdverts};
