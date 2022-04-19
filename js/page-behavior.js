const deactivatePage = ()=>{
  const mapFiltersContainer = document.querySelector('.map__filters-container');
  mapFiltersContainer.classList.add('ad-form--disabled');
  const selectElements = mapFiltersContainer.querySelectorAll('select');
  selectElements.forEach((element) => {element.disabled = true;});

  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  const formFieldset = adForm.querySelectorAll('fieldset');
  formFieldset.forEach((element) => {element.disabled = true;});
};

const activatePage = ()=>{
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  const formFieldset = adForm.querySelectorAll('fieldset');
  formFieldset.forEach((element) => {element.disabled = false;});
};

const activateFiltersForm = ()=>{
  const mapFiltersContainer = document.querySelector('.map__filters-container');
  mapFiltersContainer.classList.remove('ad-form--disabled');
  const selectElements = mapFiltersContainer.querySelectorAll('select');
  selectElements.forEach((element) => {element.disabled = false;});
};

export{activatePage, deactivatePage, activateFiltersForm};
