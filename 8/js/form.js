import {showSuccessMessage, showErrorMessage} from './messages.js';
import {sendData} from './api.js';
import {resetMapMainMarker} from './map.js';

const form = document.querySelector('.ad-form');
const selectedType = form.querySelector('#type');
const priseField = form.querySelector('#price');
const priseSlider = form.querySelector('#slider');
const timeinField = form.querySelector('#timein');
const timeoutField = form.querySelector('#timeout');
const selectedRoom = form.querySelector('#room_number');
const selectedGuest = form.querySelector('#capacity');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');


const MIN_PRISE_LIST =
{
  bungalow : [0,'бунгало'],
  flat : [1000,'квартиру'],
  hotel : [3000,'отель'],
  house : [5000,'дом'],
  palace : [10000,'дворец']
};

const pristine = new Pristine(form,{
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'prestine__error-text'
},
true);

const validatePrise=(valuePrise) => {
  const [minPrise] = MIN_PRISE_LIST[selectedType.value];
  return minPrise <= valuePrise;
};

const getPriseErrorMessage=() => {
  const [minPrise, ruTypeName] = MIN_PRISE_LIST[selectedType.value];
  return `Минимальная цена за ${ruTypeName}: ${minPrise}р.`;
};

pristine.addValidator(priseField, validatePrise, getPriseErrorMessage);

function typeBuildingChange(evt){
  const [minPrise] = MIN_PRISE_LIST[evt.target.value];
  priseField.placeholder = `от ${minPrise}`;
  priseField.min = minPrise;

  if(Number(priseField.value) < minPrise){
    priseSlider.noUiSlider.set(minPrise);
    priseField.value = minPrise;
  }
  pristine.validate(priseField);
}
selectedType.addEventListener('change',typeBuildingChange);

const validateRoomsGuests = ()=>{
  switch(selectedRoom.value){
    case '100': return selectedGuest.value === '0';
    case '1' : return selectedGuest.value === '1';
    case '2' : return Number(selectedGuest.value) <= 2 && Number(selectedGuest.value);
    case '3' : return Number(selectedGuest.value) <= 3 && Number(selectedGuest.value);
    default : return false;
  }
};

pristine.addValidator(selectedRoom, validateRoomsGuests, 'кол-во комнат не сответствует кол-ву гостей');
selectedGuest.addEventListener('change',()=>pristine.validate(selectedRoom));

noUiSlider.create(priseSlider, {
  start: 1000,
  step: 10,
  connect: true,
  range: {
    'min': 0,
    '10%': 500,
    '50%': 4000,
    '70%': 10000,
    'max': 100000
  }
});

priseSlider.noUiSlider.on('slide', ()=>{
  priseField.value = Math.ceil(priseSlider.noUiSlider.get());
  pristine.validate(priseField);
});

priseField.addEventListener('input', (evt)=>{
  priseSlider.noUiSlider.set(Number(evt.target.value));
});

timeinField.addEventListener('change', ()=>{timeoutField.value = timeinField.value;});
timeoutField.addEventListener('change', ()=>{timeinField.value = timeoutField.value;});

const resetForm = ()=>{
  form.reset();
  resetMapMainMarker();
///////////////////////////////
};

const lockSubmitButton = ()=>{
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка данных...';
};

const unlockSubmitButton = ()=>{
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onErrorButtonClick = ()=>{};

form.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid){
    lockSubmitButton(evt.target);

    sendData(()=>{
      showSuccessMessage();
      resetForm();
    },
    ()=>{
      showErrorMessage(onErrorButtonClick);
    },
    form)
      .finally(()=>unlockSubmitButton(evt.target));
  }// else{  }

});


resetButton.addEventListener('click',(evt)=>{
  evt.preventDefault();
  resetForm();
});

