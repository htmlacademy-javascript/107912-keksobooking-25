const deactivatePage = ()=>{
  const mapFiltersContainer = document.querySelector('.map__filters-container');
  mapFiltersContainer.classList.add('ad-form--disabled');
  const selectElements = mapFiltersContainer.querySelectorAll('select');
  selectElements.forEach((element) => {element.disabled = true;});

  const addForm = document.querySelector('.ad-form');
  addForm.classList.add('ad-form--disabled');
  const formFieldsets = addForm.querySelectorAll('fieldset');
  formFieldsets.forEach((element) => {element.disabled = true;});
};

const activatePage = ()=>{
  const mapFiltersContainer = document.querySelector('.map__filters-container');
  mapFiltersContainer.classList.remove('ad-form--disabled');
  const selectElements = mapFiltersContainer.querySelectorAll('select');
  selectElements.forEach((element) => {element.disabled = false;});

  const addForm = document.querySelector('.ad-form');
  addForm.classList.remove('ad-form--disabled');
  const formFieldsets = addForm.querySelectorAll('fieldset');
  formFieldsets.forEach((element) => {element.disabled = false;});
};

export{activatePage,deactivatePage};
